import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListObservableComponent } from './components/product-list-observable/product-list-observable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductListObservableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Signals App';
  activeTab = signal('signals');
  
  switchTab(tab: string): void {
    this.activeTab.set(tab);
  }
  
  ngOnInit(): void {
    console.log('App initialized');
  }
}
