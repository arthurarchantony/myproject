import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {    const accessories = [
      { 
        id: 1, 
        name: 'Car Cover', 
        price: 500, 
        image: 'assets/placeholder.svg',
        description: 'High-quality waterproof car cover that protects your vehicle from dust, rain, and sun damage. Suitable for all weather conditions.'
      },
      { 
        id: 2, 
        name: 'Floor Mats', 
        price: 1200, 
        image: 'assets/placeholder.svg',
        description: 'Custom-fit all-weather floor mats with anti-slip backing. Provides complete protection for your car\'s floor from dirt and spills.'
      },
      { 
        id: 3, 
        name: 'Mobile Holder', 
        price: 300, 
        image: 'assets/placeholder.svg',
        description: 'Adjustable mobile holder with strong suction cup mount. Perfect for GPS navigation and hands-free phone use.'
      },
      { 
        id: 4, 
        name: 'Car Air Freshener', 
        price: 150, 
        image: 'assets/placeholder.svg',
        description: 'Long-lasting car air freshener with natural fragrances. Keeps your car smelling fresh for up to 60 days.'
      },
      { 
        id: 5, 
        name: 'LED Lights', 
        price: 800, 
        image: 'assets/placeholder.svg',
        description: 'Energy-efficient LED interior lights with multiple color options. Easy to install and includes remote control.'
      },
      { 
        id: 6, 
        name: 'Dash Camera', 
        price: 2500, 
        image: 'assets/placeholder.svg',
        description: '4K Ultra HD dash camera with night vision and GPS tracking. Features loop recording and emergency incident detection.'
      }
    ];
    return { accessories };
  }
}

