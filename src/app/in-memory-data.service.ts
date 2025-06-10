import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Accessory } from './accessory';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {    const accessories: Accessory[] = [
      {
        id: 1,
        name: 'Car Phone Mount',
        price: 599,
        image: 'dash-cam.jpg', // Using the imported image
        description: 'Universal car phone holder with strong suction cup mount.'
      },
      {
        id: 2,
        name: 'LED Interior Lights',
        price: 899,
        image: 'phone-mount.jpg',
        description: 'RGB LED strip lights for car interior with remote control.'
      },
      {
        id: 3,
        name: 'Dash Camera',
        price: 2999,
        image: 'led-lights.jpg', 
        description: '1080p front and rear dash cam with night vision.'
      },
      {
        id: 4,
        name: 'Floor Mats',
        price: 1499,
        image: 'floor-mats.webp',
        description: 'All-weather rubber floor mats, custom fit.'
      }
    ];
    return { accessories };
  }

  // Overrides the genId method to ensure that an accessory always has an id.
  // If the accessories array is empty, the method below returns the initial number (1).
  // If the accessories array is not empty, the method below returns the highest
  // accessory id + 1.
  genId(accessories: Accessory[]): number {
    return accessories.length > 0 
      ? Math.max(...accessories.map(accessory => accessory.id)) + 1 
      : 1;
  }
}
