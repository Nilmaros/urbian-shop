import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from '../../models/product';
import { WebServiceService } from '../../services/web-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  @Input() show = false;
  @Input() customClass = '';
  @Input() closeCallback = () => (false);
  @Input() productToEdit:Product;

  //Update Product
  // updateImg:string = this.productToEdit.img;
  // updateDesc:string = this.productToEdit.description;
  // updateName:string = this.productToEdit.name;
  // updatePrice:number = this.productToEdit.price;

  updateImg:string;
  updateDesc:string;
  updateName:string;
  updatePrice:number;


  constructor(private webService:WebServiceService) { }

  UpdateProduct() {
    if(this.updateImg == null || this.updateImg == this.productToEdit.img) { this.updateImg = "empty"; }
    if(this.updateDesc == null || this.updateDesc == this.productToEdit.description) { this.updateDesc = "empty"; }
    if(this.updateName == null || this.updateName == this.productToEdit.name) { this.updateName = "empty"; }
    if(this.updatePrice == null || this.updatePrice == this.productToEdit.price) { this.updatePrice = -1; }
    this.webService.UpdateProduct(this.productToEdit.id, this.updateImg, this.updateDesc, this.updateName, this.updatePrice)
      .then(() => { console.log("Product Updated."); })
      .catch((err:string) => { console.log(err) });

  }

  ngOnInit() {
  }

}