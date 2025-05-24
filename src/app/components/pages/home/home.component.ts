/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { StarRatingComponent } from "../../partials/star-rating/star-rating.component";
import { SearchComponent } from "../../partials/search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";
import { NotFoundComponent } from '../../partials/not-found/not-found.component';


@Component({
  selector: 'app-home',
  imports: [NgForOf, RouterLink, CurrencyPipe, StarRatingComponent, SearchComponent, TagsComponent,NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService,activatedRoute:ActivatedRoute) {
    
    activatedRoute.params.subscribe((params)=>{
      if (params.searchTerm){
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if (params.tag){
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
      }
      else
        this.foods = foodService.getAll();
  })
  }

  ngOnInit(): void {
  }

}
