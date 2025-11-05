import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupplierService, Supplier } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  private api = inject(SupplierService);
  loading = signal(false);
  suppliers = signal<Supplier[]>([]);
  q = signal('');

  ngOnInit(){ this.fetch(); }

  fetch(){
    this.loading.set(true);
    this.api.list().subscribe({
      next: rows => { this.suppliers.set(rows); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  get filtered(){
    const s = this.q().trim().toLowerCase();
    if(!s) return this.suppliers();
    return this.suppliers().filter(x =>
      x.name.toLowerCase().includes(s) ||
      (x.email||'').toLowerCase().includes(s) ||
      (x.phone||'').toLowerCase().includes(s)
    );
  }
}
