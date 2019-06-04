import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { WebServiceService } from '../services/web-service.service';
import { Product } from '../models/product';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { NewModalComponent } from './new-modal/new-modal.component';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
  styleUrls: ['./what-is.component.css'],
  animations:
  [
    trigger('effect', [
    state('initial', style({
      backgroundColor: 'green',
      transform: 'scale(1)'
    })),
    state('final', style({
      backgroundColor: 'red',
      transform: 'scale(1.5)'
    })),
    transition('final=>initial', animate('1000ms')),
    transition('initial=>final', animate('1500ms'))
    ]),

    trigger('changing-product', [
      state('start', style({
        opacity: 1
      })),
      state('moving', style({
        opacity: 1
      })),
      transition('*<=>*', animate('500ms', style( { opacity: 0.2 })))
    ])
  ]
})
export class WhatIsComponent implements OnInit {

  // Animation
  currentState = 'initial';
  changingProduct = 'start';

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
 

  // Font Awesome
  faPlus = faPlusSquare;
  faMinus = faMinusSquare;

  constructor(private webService:WebServiceService, private editModal:NgbModal) { }

  OpenEditModal() {
    const modalRef = this.editModal.open(EditModalComponent);
    modalRef.componentInstance.currentProduct = this.currentProduct;
    modalRef.componentInstance.newProductEdited.subscribe((a:Product) => {
      this.currentProduct = a;
    });
    modalRef.componentInstance.totalRowsInDatabase.subscribe((a:number) => {
      this.totalRowsInDatabase = a;
      this.PreviousProduct();
    });
  }

  OpenNewModal() {
    const modalRef = this.editModal.open(NewModalComponent);
    modalRef.componentInstance.currentProduct = this.currentProduct;
    modalRef.componentInstance.eventNewProduct.subscribe((a:Product) =>
    {
      this.currentProduct = a;
      this.currentProduct.img = '../assets/img/' + this.currentProduct.img;
    });
    modalRef.componentInstance.totalRowsInDatabase.subscribe((a:number) =>
    {
      this.totalRowsInDatabase = a;
    });
  }

  OnProductEdit(data:Product) {
    this.currentProduct = data;
    console.log(this.currentProduct);
  }

  DecreaseQuantity() {
    if(this.productCounter > 0) { this.productCounter --; }
    else{ this.productCounter = 0; }
  }

  IncreaseQuantity() { 
    if(this.productCounter < 99) { this.productCounter ++; }
    else{ this.productCounter = 99; }
   }

  NextProduct() {
    this.changingProduct = 'moving';
    if(this.productOffset < this.totalRowsInDatabase-1)
    {
      this.productOffset++;
    }
    else
    {
      this.productOffset = 0;
    }

    this.webService.GetProductByOffset(this.productOffset)
      .then((data:Product) =>
      {
        this.currentProduct = data[0]; this.changingProduct = 'start';
      })
      .catch((err:string) => { console.log(err)});
  }

  PreviousProduct()
  {
    this.changingProduct = 'moving';

    if(this.productOffset == 0)
    {
      this.productOffset = this.totalRowsInDatabase-1;
    }
    else
    {
      this.productOffset--;
    };

    this.webService.GetProductByOffset(this.productOffset)
      .then((data:Product) =>
      {
        this.currentProduct = data[0];
        this.changingProduct = 'start';
      })
      .catch((err:string) =>
      {
        console.log(err)
      });
  }

changeState() {
  this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
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