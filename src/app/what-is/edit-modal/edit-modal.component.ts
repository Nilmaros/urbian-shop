import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { WebServiceService } from '../../services/web-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() show = false;
  @Input() customClass = '';
  @Input() closeCallback = () => (false);
  @Input() productToEdit:Product;
  @Output() newProductEdited:EventEmitter<Product> = new EventEmitter();
  editProduct:Product;

  //Update Product
  // updateImg:string = this.productToEdit.img;
  // updateDesc:string = this.productToEdit.description;
  // updateName:string = this.productToEdit.name;
  // updatePrice:number = this.productToEdit.price;

  constructor(private webService:WebServiceService) { }

  UpdateProduct() {
    this.webService.UpdateProduct(this.editProduct.id, this.editProduct.img, this.editProduct.description, this.editProduct.name, this.editProduct.price)
      .then(() =>
      {
        console.log("Product Updated.");
        this.newProductEdited.emit(this.editProduct);
        this.closeCallback();
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
      id: this.productToEdit.id,
      img: this.productToEdit.img,
      description: this.productToEdit.description,
      name: this.productToEdit.name,
      price: this.productToEdit.price
    }
  }

  ngOnChange()
  {
    this.editProduct =
    {
      id: this.productToEdit.id,
      img: this.productToEdit.img,
      description: this.productToEdit.description,
      name: this.productToEdit.name,
      price: this.productToEdit.price
    }
  }

}