import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Accessory, AccessoryService } from '../accessory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-accessory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-accessory.html',
  styleUrls: ['./add-accessory.css']
})
export class AddAccessoryComponent {
  newAccessory: Accessory = { id: 0, name: '', price: 0, image: '' };
  isSubmitting = false;

  constructor(private service: AccessoryService, private router: Router) {}
  add() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.service.addAccessory(this.newAccessory).subscribe({
      next: () => {
        this.router.navigate(['/accessories']);
      },
      error: (error) => {
        console.error('Error adding accessory:', error);
        this.isSubmitting = false;
        // Could add error notification here
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

