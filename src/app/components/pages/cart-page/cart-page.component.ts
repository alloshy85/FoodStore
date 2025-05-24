/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItem';
import { TitleComponent } from "../../partials/title/title.component";
import { RouterModule } from '@angular/router';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-cart-page',
  imports: [TitleComponent,RouterModule,NgForOf,NgIf,CurrencyPipe,NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=>
      {
        this.cart=cart;
      })
      console.log(this.cart);
  }
  removeFromCart(cartItem:CartItem){
    console.log(cartItem.food.name,cartItem.food.id);
    this.cartService.removeFromCart(cartItem.food.id);
  }
  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id,quantity);
  }

}
