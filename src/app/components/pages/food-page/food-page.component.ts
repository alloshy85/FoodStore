/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  imports: [NgIf,NgForOf,StarRatingComponent,CurrencyPipe,RouterModule,NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food!:Food;
  constructor(activatedRoute:ActivatedRoute,foodService:FoodService,
    private cartService:CartService,private rouetr:Router){
    activatedRoute.params.subscribe((params)=>{
      if (params.id)
        this.food = foodService.getFoodById(params.id);
    })
  }
  addToCart(){
    this.cartService.addToCart(this.food);
    this.rouetr.navigateByUrl('/cart-page');
  }

}
