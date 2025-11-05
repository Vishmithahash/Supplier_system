import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupplierService, Supplier } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(SupplierService);

  submitted = false;
  loading = signal(false);
  listLoading = signal(false);
  errorMsg = signal('');
  suppliers = signal<Supplier[]>([]);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    phone: ['', [Validators.pattern(/^\d{10}$/)]], // exactly 10 digits if provided
    email: ['', [Validators.email, Validators.maxLength(120)]],
  });

  ngOnInit() { this.loadSuppliers(); }

  loadSuppliers() {
    this.listLoading.set(true);
    this.api.list().subscribe({
      next: rows => { this.suppliers.set(rows); this.listLoading.set(false); },
      error: () => { this.listLoading.set(false); }
    });
  }

  digitsOnly(e: Event) {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/\D+/g, '').slice(0, 10);
    this.form.controls.phone.setValue(input.value);
  }

  submit() {
    this.submitted = true;
    this.errorMsg.set('');
    if (this.form.invalid) return;

    this.loading.set(true);
    this.api.create(this.form.value as any).subscribe({
      next: (res) => {
        alert(`Created supplier #${res.id}: ${res.name}`);
        this.form.reset();
        this.submitted = false;
        this.loading.set(false);
        this.loadSuppliers();
      },
      error: (err) => {
        this.errorMsg.set(err?.error?.message || 'Create failed');
        this.loading.set(false);
      }
    });
  }

  invalid(name: 'name'|'phone'|'email') {
    const c = this.form.controls[name];
    return (this.submitted || c.touched || c.dirty) && c.invalid;
  }
}
