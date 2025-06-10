import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccessoryService, Accessory } from '../accessory';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './accessories.html',
  styleUrls: ['./accessories.css']
})
export class AccessoriesComponent implements OnInit {
  accessories: Accessory[] = [];
  filteredAccessories: Accessory[] = [];
  searchTerm: string = '';
  sortField: 'name' | 'price' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private service: AccessoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.service.getAccessories().subscribe(data => {
      this.accessories = data;
      this.applyFilters();
    });
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder.svg';
  }

  applyFilters() {
    this.filteredAccessories = this.accessories
      .filter(acc => 
        acc.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        acc.price.toString().includes(this.searchTerm)
      )
      .sort((a, b) => {
        const modifier = this.sortDirection === 'asc' ? 1 : -1;
        if (this.sortField === 'name') {
          return a.name.localeCompare(b.name) * modifier;
        } else {
          return (a.price - b.price) * modifier;
        }
      });
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  toggleSort(field: 'name' | 'price') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(field: 'name' | 'price'): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  deleteAccessory(accessory: Accessory) {
    if (confirm(`Are you sure you want to delete ${accessory.name}?`)) {
      this.service.deleteAccessory(accessory.id).subscribe({
        next: () => {
          this.accessories = this.accessories.filter(a => a.id !== accessory.id);
          this.applyFilters();
        },
        error: (err) => console.error('Error deleting accessory:', err)
      });
    }
  }

  addToCart(event: Event, accessory: Accessory) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(accessory);
  }
}
