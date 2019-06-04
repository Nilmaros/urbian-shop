import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BaseCartItem } from 'ng-shopping-cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent {
  title = 'online-shop';
  faShoppingCart = faShoppingCart;
  

  constructor()
  {
    const item = new BaseCartItem();
    item.setId(1);
    item.setName('Test item');
    item.setPrice(10);
    item.setQuantity(10);
    console.log(item.total());
  }
}
