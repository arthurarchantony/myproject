import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../cart/cart.service';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>
      
      <div class="checkout-content">
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="items-list">
            <div class="item" *ngFor="let item of items">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>₹{{ item.price * item.quantity }}</span>
            </div>
          </div>
          <div class="total">
            <span>Total Amount:</span>
            <span class="amount">₹{{ total }}</span>
          </div>
        </div>

        <form class="checkout-form" (submit)="submitOrder()">
          <div class="form-section">
            <h3>Shipping Information</h3>
            <div class="form-field">
              <label for="name">Full Name</label>
              <input id="name" type="text" [(ngModel)]="form.name" name="name" required>
            </div>
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" type="email" [(ngModel)]="form.email" name="email" required>
            </div>
            <div class="form-field">
              <label for="address">Address</label>
              <textarea id="address" [(ngModel)]="form.address" name="address" required></textarea>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label for="city">City</label>
                <input id="city" type="text" [(ngModel)]="form.city" name="city" required>
              </div>
              <div class="form-field">
                <label for="zipCode">ZIP Code</label>
                <input id="zipCode" type="text" [(ngModel)]="form.zipCode" name="zipCode" required>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Payment Information</h3>
            <div class="form-field">
              <label for="cardNumber">Card Number</label>
              <input id="cardNumber" type="text" [(ngModel)]="form.cardNumber" name="cardNumber" required
                     pattern="[0-9]{16}" maxlength="16">
            </div>
            <div class="form-row">
              <div class="form-field">
                <label for="expiryDate">Expiry Date</label>
                <input id="expiryDate" type="text" [(ngModel)]="form.expiryDate" name="expiryDate" required
                       placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" maxlength="5">
              </div>
              <div class="form-field">
                <label for="cvv">CVV</label>
                <input id="cvv" type="text" [(ngModel)]="form.cvv" name="cvv" required
                       pattern="[0-9]{3,4}" maxlength="4">
              </div>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="back-button" routerLink="/cart">Back to Cart</button>
            <button type="submit" class="submit-button" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Processing...' : 'Place Order' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
    }

    h2 {
      color: var(--text-color);
      margin-bottom: 30px;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 30px;
    }

    .order-summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .items-list {
      margin: 20px 0;
    }

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: var(--text-color);
    }

    .total {
      border-top: 1px solid #eee;
      margin-top: 20px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
    }

    .amount {
      color: var(--primary-color);
    }

    .checkout-form {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 30px;
    }

    .form-section h3 {
      margin-bottom: 20px;
      color: var(--text-color);
    }

    .form-field {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--text-color);
    }

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1em;
      transition: border-color 0.3s ease;
    }

    textarea {
      height: 100px;
      resize: vertical;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .button-group {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }

    button {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: all 0.3s ease;
    }

    .back-button {
      background: #f5f5f5;
      color: #666;
    }

    .back-button:hover {
      background: #e5e5e5;
    }

    .submit-button {
      flex: 1;
      background: var(--success-color);
      color: white;
    }

    .submit-button:hover {
      background: #218838;
    }

    .submit-button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  isSubmitting = false;

  form: CheckoutForm = {
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  submitOrder() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    // Simulate order processing
    setTimeout(() => {
      alert('Order placed successfully!');
      this.cartService.clearCart();
      this.router.navigate(['/accessories']);
    }, 1500);
  }
}
