import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      
      <div class="cart-empty" *ngIf="items.length === 0">
        <p>Your cart is empty</p>
        <button routerLink="/accessories" class="continue-shopping">Continue Shopping</button>
      </div>

      <div class="cart-items" *ngIf="items.length > 0">
        <div class="cart-item" *ngFor="let item of items">
          <div class="item-image">
            <img [src]="item.image || 'assets/placeholder.svg'" [alt]="item.name">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="price">₹{{ item.price }}</p>
          </div>
          <div class="item-quantity">            <button (click)="updateQuantity(item, item.quantity - 1)" [disabled]="item.quantity <= 1">-</button>
            <input type="number" [ngModel]="item.quantity" (ngModelChange)="updateQuantity(item, $event)" min="1">
            <button (click)="updateQuantity(item, item.quantity + 1)">+</button>
          </div>
          <div class="item-total">
            ₹{{ item.price * item.quantity }}
          </div>
          <button class="remove-button" (click)="removeFromCart(item.id)">✕</button>
        </div>

        <div class="cart-summary">
          <div class="total">
            <span>Total:</span>
            <span class="total-amount">₹{{ getTotal() }}</span>
          </div>          <div class="actions">
            <button class="clear-cart" (click)="clearCart()">Clear Cart</button>
            <button class="checkout" routerLink="/checkout" [disabled]="items.length === 0">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
    }

    h2 {
      color: var(--text-color);
      margin-bottom: 30px;
    }

    .cart-empty {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .continue-shopping {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      margin-top: 20px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .continue-shopping:hover {
      background: var(--primary-dark);
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .item-image {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 4px;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-details h3 {
      margin: 0 0 10px 0;
      color: var(--text-color);
    }

    .price {
      color: var(--primary-color);
      font-weight: bold;
    }

    .item-quantity {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .item-quantity button {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .item-quantity input {
      width: 50px;
      text-align: center;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .item-total {
      font-weight: bold;
      min-width: 100px;
      text-align: right;
    }

    .remove-button {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      font-size: 1.2em;
      padding: 5px;
    }

    .remove-button:hover {
      color: var(--error-color);
    }

    .cart-summary {
      margin-top: 30px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2em;
      margin-bottom: 20px;
    }

    .total-amount {
      font-weight: bold;
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
    }

    .actions button {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .clear-cart {
      background: #f5f5f5;
      color: #666;
    }

    .clear-cart:hover {
      background: #e5e5e5;
    }

    .checkout {
      background: var(--success-color);
      color: white;
    }

    .checkout:hover {
      background: #218838;
    }

    @media (max-width: 768px) {
      .cart-item {
        flex-wrap: wrap;
      }

      .item-image {
        width: 80px;
        height: 80px;
      }

      .item-details {
        flex: 0 0 calc(100% - 100px);
      }

      .item-quantity {
        order: 3;
        margin-top: 10px;
      }

      .item-total {
        order: 4;
        margin-top: 10px;
      }

      .remove-button {
        order: 2;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item.id, quantity);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  handleQuantityChange(event: Event, item: CartItem) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      const newQuantity = parseInt(input.value, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        this.updateQuantity(item, newQuantity);
      }
    }
  }
}
