/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Food } from "./Food";

export class CartItem{
  constructor(public food:Food){
    this.price = this.food.price;
   }
  quantity:number = 1 ;
  price :number;
}
