/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
// import { CartService } from 'src/app/services/cart.service';
// import { UserService } from 'src/app/services/user.service';
// import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  imports:[NgIf,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity=0;
  // user!:User;
  constructor(cartService:CartService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })}

  //   userService.userObservable.subscribe((newUser) => {
  //     this.user = newUser;
  //   })
  //  }

  ngOnInit():void {

  }

  logout(){
    // this.userService.logout();
  }

  get isAuth(){
    return true;
    // return this.user.token;
  }
}
