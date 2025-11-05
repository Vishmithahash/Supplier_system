import { Routes } from '@angular/router';

// Suppliers
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

// Purchase Orders
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';

export const routes: Routes = [
  // Default
  { path: '', redirectTo: 'suppliers', pathMatch: 'full' },

  // Suppliers
  { path: 'suppliers/new', component: SupplierFormComponent, title: 'Create Supplier' },
  { path: 'suppliers', component: SupplierListComponent, title: 'Supplier List' },

  // Purchase Orders
  { path: 'orders/new', component: PurchaseOrderFormComponent, title: 'Create Purchase Order' },
  { path: 'orders', component: PurchaseOrderListComponent, title: 'Purchase Orders' },

  // Fallback
  { path: '**', redirectTo: 'suppliers' },
];
