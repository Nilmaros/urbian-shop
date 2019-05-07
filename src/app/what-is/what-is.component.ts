import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { WebServiceService } from '../services/web-service.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
  styleUrls: ['./what-is.component.css']
})
export class WhatIsComponent implements OnInit {

  // Product variables
  productCounter:number = 1;
  currentProduct:Product;
  productOffset:number = 0;
  totalRowsInDatabase:number;

  // New-Update Product
  newProduct:Product;
  newImg:string;
  newDesc:string;
  newName:string;
  newPrice:number;
  updatingProduct:boolean = false;

  // Font Awesome
  faPlus = faPlus;
  faMinus = faMinus;
  
  constructor(private webService:WebServiceService) { }

  DecreaseQuantity() {
    if(this.productCounter > 0) { this.productCounter --; }
    else{ this.productCounter = 0; }
  }

  IncreaseQuantity() { this.productCounter ++; }

  NextProduct() {
    if(this.productOffset < this.totalRowsInDatabase-1) { this.productOffset++; }
    else { this.productOffset = 0; }

    this.webService.GetProductByOffset(this.productOffset)
      .then((data:Product) => { this.currentProduct = data[0]; })
      .catch((err:string) => { console.log(err)});
  }

  PreviousProduct() {
    if(this.productOffset == 0) { this.productOffset = this.totalRowsInDatabase-1; }
    else { this.productOffset--; };

    this.webService.GetProductByOffset(this.productOffset)
      .then((data:Product) => { this.currentProduct = data[0]; })
      .catch((err:string) => { console.log(err)});
  }

  PostProduct() {
    this.newProduct = { img:this.newImg, description:this.newDesc, price:this.newPrice, name:this.newName, id:0 };
    this.webService.PostProduct(this.newProduct)
      .then(() => { console.log("Product Posted."); })
      .catch((err:string) => { console.log(err) });
    // this.webService.PostProduct(this.newImg, this.newDesc, this.newName, this.newPrice)
    //   .then(() => { console.log("Product Posted."); })
    //   .catch((err:string) => { console.log(err) });

    this.webService.CountAllProducts()
      .then((data:number) => { this.totalRowsInDatabase = data; })
      .catch((err) => { console.log(err); });
  }

  DeleteProduct() {
    this.webService.DeleteProduct(this.currentProduct.id)
      .then(() => { console.log("Product Deleted."); })
      .catch((err:string) => { console.log(err) });

    this.webService.CountAllProducts()
      .then((data:number) => { this.totalRowsInDatabase = data; })
      .catch((err) => { console.log(err); });
  }

  UpdateProduct() {
    if(this.newImg == null) { this.newImg = "empty"; }
    if(this.newDesc == null) { this.newDesc = "empty"; }
    if(this.newName == null) { this.newName = "empty"; }
    if(this.newPrice == null) { this.newPrice = -1; }
    this.webService.UpdateProduct(this.currentProduct.id, this.newImg, this.newDesc, this.newName, this.newPrice)
      .then(() => { console.log("Product Updated."); })
      .catch((err:string) => { console.log(err) });

    this.updatingProduct = false;
  }

  ShowForm() {
    this.updatingProduct = true;
  }

  ngOnInit() {
    this.webService.GetProductByOffset(this.productOffset)
      .then((data:Product) => { this.currentProduct = data[0]; })
      .catch((err:string) => { console.log(err)});

    this.webService.CountAllProducts()
      .then((data:number) => { this.totalRowsInDatabase = data; })
      .catch((err) => { console.log(err); });
  }
}