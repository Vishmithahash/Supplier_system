import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Supplier {
  id: number;
  name: string;
  phone?: string; // exactly 10 digits if present
  email?: string;
}
export interface CreateSupplierDto {
  name: string;
  phone?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly base = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  list(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.base);
  }
  get(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.base}/${id}`);
  }
  create(dto: CreateSupplierDto): Observable<Supplier> {
    return this.http.post<Supplier>(this.base, dto);
  }
  update(id: number, dto: Partial<CreateSupplierDto>): Observable<Supplier> {
    return this.http.patch<Supplier>(`${this.base}/${id}`, dto);
  }
  remove(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.base}/${id}`);
  }
}
