import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { WebServiceService } from '../../services/web-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Input() currentProduct:Product;
  @Output() newProductEdited:EventEmitter<Product> = new EventEmitter();
  @Output() totalRowsInDatabase:EventEmitter<number> = new EventEmitter();
  editProduct:Product;

  constructor(private webService:WebServiceService, private activeModal:NgbActiveModal) { }

  UpdateProduct() {
    this.webService.UpdateProduct(this.editProduct.id, this.editProduct.img, this.editProduct.description, this.editProduct.name, this.editProduct.price)
      .then(() =>
      {
        console.log("Product Updated.");
        this.newProductEdited.emit(this.editProduct);
        this.activeModal.close();
      })
      .catch((err:string) =>
      {
        console.log(err)
      });
  }

  DeleteProduct()
  {
    this.webService.DeleteProduct(this.editProduct.id)
      .then(() =>
      {
        console.log("Product Deleted.");
        this.webService.CountAllProducts()
          .then((totalRows:number) =>
          {
            this.totalRowsInDatabase.emit(totalRows);
          })
          .catch((err) =>
          {
            console.log(err);
          });
        this.activeModal.close();
      })
      .catch((err:string) =>
      {
        console.log(err)
      });
  }

  ngOnInit()
  {
    this.editProduct =
    {
      id: this.currentProduct.id,
      img: this.currentProduct.img,
      description: this.currentProduct.description,
      name: this.currentProduct.name,
      price: this.currentProduct.price
    }
  }
}