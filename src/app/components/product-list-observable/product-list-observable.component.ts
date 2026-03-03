import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-observable.component.html',
  styleUrls: ['./product-list-observable.component.scss']
})
export class ProductListObservableComponent implements OnInit {
  // Observables using BehaviorSubject
  private showOnlyInStockSubject = new BehaviorSubject<boolean>(false);
  private filterTextSubject = new BehaviorSubject<string>('');

  showOnlyInStock$ = this.showOnlyInStockSubject.asObservable();
  filterText$ = this.filterTextSubject.asObservable();

  // Products observable from service
  products$ = this.productService.getProducts();

  // Combined filtered products observable
  filteredProducts$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    // Combine all observables to create filtered products stream
    this.filteredProducts$ = combineLatest([
      this.filterText$,
      this.showOnlyInStock$,
      this.products$
    ]).pipe(
      map(([filterText, onlyInStock, products]) => {
        const text = filterText.toLowerCase();

        let filtered = products.filter(p =>
          p.name.toLowerCase().includes(text) ||
          p.description.toLowerCase().includes(text)
        );

        if (onlyInStock) {
          filtered = filtered.filter(p => p.inStock);
        }

        return filtered;
      })
    );
  }

  ngOnInit(): void {
    // Initialize with default values
    console.log('Observable-based component initialized');
  }

  toggleInStockFilter(): void {
    this.showOnlyInStockSubject.next(!this.showOnlyInStockSubject.value);
  }

  updateFilter(text: string): void {
    this.filterTextSubject.next(text);
  }

  clearFilter(): void {
    this.filterTextSubject.next('');
  }

  getFilterValue(): string {
    return this.filterTextSubject.value;
  }

  getShowOnlyInStockValue(): boolean {
    return this.showOnlyInStockSubject.value;
  }
}
