import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Accessory } from '../accessory';

export interface CartItem extends Accessory {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  getItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(accessory: Accessory) {
    const existingItem = this.items.find(item => item.id === accessory.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.cartSubject.next([...this.items]);
    } else {
      const newItem = { ...accessory, quantity: 1 };
      this.items.push(newItem);
      this.cartSubject.next([...this.items]);
    }
  }

  removeFromCart(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.cartSubject.next([...this.items]);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.cartSubject.next([...this.items]);
      }
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.items = [];
    this.cartSubject.next([]);
  }

  getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  hasItem(id: number): boolean {
    return this.items.some(item => item.id === id);
  }
}
