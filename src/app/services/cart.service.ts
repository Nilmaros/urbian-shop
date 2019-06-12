import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:Item[];

  constructor() { }

  SetCartItem(item:Item) {
    localStorage.setItem('cart-items',JSON.stringify(item));
  }

  GetCartItems() {
    this.items = JSON.parse(localStorage.getItem('cart-items'));
    return this.items;
  }
}
