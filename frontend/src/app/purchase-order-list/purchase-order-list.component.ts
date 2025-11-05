import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderService, PurchaseOrder } from '../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {
  private api = inject(PurchaseOrderService);
  loading = signal(false);
  q = signal('');
  orders = signal<PurchaseOrder[]>([]);
  expanded = signal<Set<number>>(new Set<number>());

  ngOnInit() { this.fetch(); }

  fetch() {
    this.loading.set(true);
    this.api.list().subscribe({
      next: rows => { this.orders.set(rows); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  toggle(id: number) {
    const s = new Set(this.expanded());
    s.has(id) ? s.delete(id) : s.add(id);
    this.expanded.set(s);
  }

  get filtered(): PurchaseOrder[] {
    const s = this.q().trim().toLowerCase();
    if (!s) return this.orders();
    return this.orders().filter(o =>
      o.po_no.toLowerCase().includes(s) ||
      (o.supplier?.name || '').toLowerCase().includes(s)
    );
  }
}
