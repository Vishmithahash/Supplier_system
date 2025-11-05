import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Supplier { id: number; name: string; }

export interface PurchaseItemInput { item_code: string; qty: number; buy_price: number; }
export interface PurchaseOrderInput {
  po_no: string;
  po_date: string;       // YYYY-MM-DD
  supplier_id: number;
  items: PurchaseItemInput[];
}

export interface PurchaseItem {
  id: number;
  purchase_order_id: number;
  item_code: string;
  qty: number;
  buy_price: number;
  line_cost: number;
}

export interface PurchaseOrder {
  id: number;
  po_no: string;
  po_date: string;
  total_cost: number;
  supplier_id: number;
  supplier?: Supplier;
  items?: PurchaseItem[];
}

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  // fallback if environment.apiUrl is missing
  private readonly baseUrl = `${(environment as any)?.apiUrl ?? 'http://localhost:3008'}/purchase-orders`;

  constructor(private http: HttpClient) {}

  create(dto: PurchaseOrderInput): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.baseUrl, dto);
  }
  list(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.baseUrl);
  }
  get(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseUrl}/${id}`);
  }

  // Optional item-level endpoints (your backend supports these if you added them)
  addItem(orderId: number, body: PurchaseItemInput) {
    return this.http.post<PurchaseOrder>(`${this.baseUrl}/${orderId}/items`, body);
  }
  updateItem(orderId: number, itemId: number, body: Partial<PurchaseItemInput>) {
    return this.http.patch<PurchaseOrder>(`${this.baseUrl}/${orderId}/items/${itemId}`, body);
  }
  removeItem(orderId: number, itemId: number) {
    return this.http.delete<PurchaseOrder>(`${this.baseUrl}/${orderId}/items/${itemId}`);
  }
}
