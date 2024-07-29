import { Injectable } from '@angular/core';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  getCartItems(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter((item) => item.id !== product.id);
  }

  clearCart(): void {
    this.cart = [];
  }
}
