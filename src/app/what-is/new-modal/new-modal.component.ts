import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { WebServiceService } from '../../services/web-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.css']
})
export class NewModalComponent implements OnInit {

  @Output() totalRowsInDatabase:EventEmitter<number> = new EventEmitter();
  @Output() eventNewProduct:EventEmitter<Product> = new EventEmitter();
  newProduct:Product;

  constructor(private webService:WebServiceService, private activeModal:NgbActiveModal) { }

  PostProduct()
  {
    this.webService.PostProduct(this.newProduct)
      .then(() =>
      {
        console.log("Product Posted.");
        this.eventNewProduct.emit(this.newProduct);
        this.webService.CountAllProducts()
          .then((totalRows:number) =>
          {
            this.totalRowsInDatabase.emit(totalRows);
          })
          .catch((err) =>
          {
            console.log(err);
          });
          })
      .catch((err:string) =>
      {
        console.log(err)
      });

    this.activeModal.close();
  }

  ngOnInit()
  {
    this.newProduct =
    {
      name: "",
      description: "",
      img: "",
      price: 0,
      id: 0
    };
  }
}