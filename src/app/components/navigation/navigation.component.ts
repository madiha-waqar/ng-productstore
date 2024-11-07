import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartItemCount: number = 0;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private cartService: CartService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout() {
    this.authService.logout();
  }
}
