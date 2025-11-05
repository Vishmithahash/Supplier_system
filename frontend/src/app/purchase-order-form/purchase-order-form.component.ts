import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { SupplierService } from '../services/supplier.service'; // you already have this from supplier feature

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private orderApi = inject(PurchaseOrderService);
  private supplierApi = inject(SupplierService);

  suppliers = signal<{id:number; name:string}[]>([]);
  saving = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    po_no: ['', [Validators.required, Validators.maxLength(50)]],
    po_date: ['', [Validators.required]],
    supplier_id: [null as number | null, [Validators.required]],
    items: this.fb.array<FormGroup>([])
  });

  ngOnInit() {
    this.addRow();
    this.supplierApi.list().subscribe(rows => this.suppliers.set(rows));
  }

  get items() { return this.form.controls.items as FormArray<FormGroup>; }

  addRow() {
    this.items.push(this.fb.group({
      item_code: ['', [Validators.required, Validators.maxLength(50)]],
      qty: [1, [Validators.required, Validators.min(1)]],
      buy_price: [0, [Validators.required, Validators.min(0.01)]],
    }));
  }
  removeRow(i: number) { if (this.items.length > 1) this.items.removeAt(i); }

  lineCost(i: number) {
    const { qty, buy_price } = this.items.at(i).value as any;
    return +(Number(qty || 0) * Number(buy_price || 0)).toFixed(2);
    }
  totalPreview() {
    return this.items.controls.reduce((sum, _, i) => sum + this.lineCost(i), 0);
  }

  submit() {
    this.errorMsg.set('');
    if (this.form.invalid) return;

    this.saving.set(true);
    this.orderApi.create(this.form.value as any).subscribe({
      next: res => {
        alert(`Order ${res.po_no} created. Total: ${res.total_cost.toFixed?.(2) ?? res.total_cost}`);
        this.router.navigateByUrl('/orders');
      },
      error: err => {
        this.errorMsg.set(err?.error?.message || 'Create failed');
        this.saving.set(false);
      }
    });
  }
}
