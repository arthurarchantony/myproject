import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Car Accessories Store</h1>
    <router-outlet></router-outlet>
  `,
  styles: [`
    h1 { 
      color: #336699;
      text-align: center;
      padding: 20px;
      margin-bottom: 20px;
    }
  `]
})
export class App {
  protected title = 'car-accessories-site';
}
