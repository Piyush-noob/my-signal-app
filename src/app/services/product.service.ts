import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop for development',
      price: 1299.99,
      inStock: true
    },
    {
      id: 2,
      name: 'Mouse',
      description: 'Wireless ergonomic mouse',
      price: 49.99,
      inStock: true
    },
    {
      id: 3,
      name: 'Keyboard',
      description: 'Mechanical gaming keyboard',
      price: 149.99,
      inStock: false
    },
    {
      id: 4,
      name: 'Monitor',
      description: '4K Ultra HD display',
      price: 499.99,
      inStock: true
    },
    {
      id: 5,
      name: 'Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 299.99,
      inStock: true
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsSync(): Product[] {
    return this.products;
  }
}
