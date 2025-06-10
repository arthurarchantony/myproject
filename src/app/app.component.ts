import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="logo">Car Accessories</a>
        <div class="nav-links">
          <a routerLink="/accessories" routerLinkActive="active">Browse</a>
          <a routerLink="/add" routerLinkActive="active">Add New</a>          <a routerLink="/cart" routerLinkActive="active" class="cart-link">
            Cart
            <span class="cart-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </a>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .logo:hover {
      color: var(--primary-dark);
    }

    .nav-links {
      display: flex;
      gap: 20px;
    }

    .nav-links a {
      color: #555;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      background: #f5f5f5;
      color: var(--primary-color);
    }

    .nav-links a.active {
      background: var(--primary-color);
      color: white;
    }

    .cart-link {
      position: relative;
    }    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--error-color);
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    .main-content {
      min-height: calc(100vh - 70px);
      background: var(--background-color);
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });  }
}

