import { Routes } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories';
import { AddAccessoryComponent } from './add-accessory/add-accessory';
import { AccessoryDetailComponent } from './accessories/accessory-detail';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'accessories', pathMatch: 'full' },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'accessories/:id', component: AccessoryDetailComponent },
  { path: 'add', component: AddAccessoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];

