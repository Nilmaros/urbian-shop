import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { WebServiceService } from '../services/web-service.service';
import { Product } from '../models/product';
import { ID } from '../models/ID';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
  styleUrls: ['./what-is.component.css']
})
export class WhatIsComponent implements OnInit {

  quantityAmountOfProduct:number = 1;
  productId:ID = null; // id sent to api
  totalProductsStored:number;
  currentProduct:Product;
  arrayOfIds:ID[];
  currentId:number = 0;

  // New Product

  newImg:string;
  newDesc:string;
  newName:string;
  newPrice:number;

  // Font Awesome
  faPlus = faPlus;
  faMinus = faMinus;
  
  constructor(private webService:WebServiceService) { }

  DecreaseProduct() {
    if(this.quantityAmountOfProduct > 0) {
      this.quantityAmountOfProduct --;
    }else{
      this.quantityAmountOfProduct = 0;
    }
  }

  IncreaseProduct() { this.quantityAmountOfProduct ++; }

  NextProduct() {
    if(this.arrayOfIds[this.currentId] == this.arrayOfIds[this.totalProductsStored-1]) {
      this.productId = this.arrayOfIds[0];
    } else {
      this.currentId++;
    }
    this.GetProduct();
  }

  PreviousProduct() {
    if(this.arrayOfIds[this.currentId] == this.arrayOfIds[0]) {
      this.productId = this.arrayOfIds[this.totalProductsStored-1];
    } else {
      this.currentId--;
    }
    this.GetProduct();
  }

  AddProduct() {
    this.webService.AddProduct(this.newImg, this.newDesc, this.newName, this.newPrice).then(() => { console.log("All goodz."); }).catch((err:string) => { console.log(err) });
  }

  ngOnInit() {
    this.webService.HowManyProducts().then((data:number) => { this.totalProductsStored = data; }).catch((err:string) => { console.log("Error de Servidor")});
    this.GetIds();
  }

  GetProduct() {
    this.webService.GetProduct(this.arrayOfIds[this.productId.id]).then((data:Product) => { this.currentProduct = data; }).catch((err:string) => { console.log("Error de Servidor.")});
  }

  GetIds() {
    this.webService.GetIds()
      .then((data:ID[]) => { this.arrayOfIds = data; this.productId = data[0]; this.GetProduct(); })
      .catch((err:string) => { console.log("Error de Servidor.")});
  }
}
