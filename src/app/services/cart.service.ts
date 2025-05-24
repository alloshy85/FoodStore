/*
 * Copyright (c) 2025
 * All rights reserved.
 */
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // استيراد isPlatformBrowser
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private cartSubject: BehaviorSubject<Cart>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cart = this.getCartFromLocalStorage();
    } else {
      this.cart = new Cart();
    }
    this.cartSubject = new BehaviorSubject(this.cart);
  }

  addToCart(food: Food) {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      return; 
    }
    this.cart.items.push(new CartItem(food));
    this.setToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(
      item => item.food.id !== foodId 
    );
    this.setToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce(
      (prev_val, current_item) => prev_val + current_item.price, 0);
    this.cart.totalCount = this.cart.items.reduce( 
      (prev_val, current_item) => prev_val + current_item.quantity, 0);

    if (isPlatformBrowser(this.platformId)) {
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart', cartJson);
    }

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }
}
