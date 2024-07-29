import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../../types';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CheckoutComponent } from '../../checkout/checkout/checkout.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
  }
}
