import { Component, OnInit, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Signals
  showOnlyInStock = signal(false);
  filterText = signal('');
  
  // Observable from service
  products$ = this.productService.getProducts();
  
  // Computed filtered products signal
  filteredProducts = computed(() => {
    const text = this.filterText().toLowerCase();
    const onlyInStock = this.showOnlyInStock();
    
    const allProducts = this.productService.getProductsSync();
    
    let filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text)
    );

    if (onlyInStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    return filtered;
  });

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // Trigger initial computation
    this.filteredProducts();
  }

  toggleInStockFilter(): void {
    this.showOnlyInStock.set(!this.showOnlyInStock());
  }

  updateFilter(text: string): void {
    this.filterText.set(text);
  }

  clearFilter(): void {
    this.filterText.set('');
  }
}
