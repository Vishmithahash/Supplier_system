import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <header class="app-bar">
      <div class="brand">ERP • Suppliers & Purchase Orders</div>
      <nav class="nav">
        <a routerLink="/suppliers" routerLinkActive="active">Suppliers</a>
        <a routerLink="/suppliers/new" routerLinkActive="active">Add Supplier</a>
        <a routerLink="/orders" routerLinkActive="active">Orders</a>
        <a routerLink="/orders/new" routerLinkActive="active">New Order</a>
      </nav>
    </header>

    <main class="content">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host { --bg:#0b1020; --bar:#0f172a; --text:#e5e7eb; --muted:#94a3b8; --link:#a5b4fc; }
    .app-bar{position:sticky;top:0;z-index:10;display:flex;gap:16px;align-items:center;
      justify-content:space-between;padding:12px 20px;background:linear-gradient(90deg,#111827,#1f2937);
      color:var(--text);border-bottom:1px solid rgba(255,255,255,.08)}
    .brand{font-weight:800;letter-spacing:.2px}
    .nav{display:flex;gap:12px}
    .nav a{color:var(--link);text-decoration:none;padding:6px 10px;border-radius:8px;opacity:.9}
    .nav a:hover{opacity:1;background:rgba(255,255,255,.06)}
    .nav a.active{background:rgba(255,255,255,.12)}
    .content{padding:16px}
    @media (max-width:700px){ .nav{flex-wrap:wrap} }
  `]
})
export class App {}
