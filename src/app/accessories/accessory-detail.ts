import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AccessoryService, Accessory } from '../accessory';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-accessory-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-container" *ngIf="accessory">
      <div class="detail-card">
        <div class="image-container">
          <img [src]="accessory.image || 'assets/placeholder.svg'" 
               [alt]="accessory.name"
               (error)="handleImageError($event)">
        </div>
        <div class="detail-content">
          <h2>{{ accessory.name }}</h2>
          <p class="price">₹{{ accessory.price }}</p>          <p class="description">{{ accessory.description || 'No description available.' }}</p>
          <div class="button-group">
            <button class="back-button" routerLink="/accessories">Back to List</button>
            <button class="add-to-cart-button" (click)="addToCart()">Add to Cart</button>
            <button class="delete-button" (click)="deleteAccessory()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .detail-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      gap: 30px;
    }

    .image-container {
      flex: 0 0 400px;
      height: 400px;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .detail-content {
      flex: 1;
      padding: 30px;
    }

    h2 {
      margin: 0 0 20px 0;
      color: var(--text-color);
    }

    .price {
      font-size: 1.5em;
      font-weight: bold;
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    .description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .button-group {
      display: flex;
      gap: 15px;
    }

    .back-button {
      background: #f5f5f5;
      color: #333;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: all 0.3s ease;
    }

    .back-button:hover {
      background: #e5e5e5;
    }

    .add-to-cart-button {
      background: var(--success-color);
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: all 0.3s ease;
    }

    .add-to-cart-button:hover {
      background: #218838;
    }

    .delete-button {
      background: var(--error-color);
      color: white;
    }

    .delete-button:hover {
      background: #bd2130;
    }

    @media (max-width: 768px) {
      .detail-card {
        flex-direction: column;
      }

      .image-container {
        flex: 0 0 300px;
        height: 300px;
      }
    }
  `]
})
export class AccessoryDetailComponent implements OnInit {
  accessory?: Accessory;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.getAccessory(id).subscribe(acc => this.accessory = acc);
    }
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder.svg';
  }
  deleteAccessory() {
    if (!this.accessory) return;
    
    if (confirm('Are you sure you want to delete this accessory?')) {
      this.service.deleteAccessory(this.accessory.id).subscribe({
        next: () => this.router.navigate(['/accessories']),
        error: (err) => console.error('Error deleting accessory:', err)
      });
    }
  }

  addToCart() {
    if (this.accessory) {
      this.cartService.addToCart(this.accessory);
    }
  }
}
