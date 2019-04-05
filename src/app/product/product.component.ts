import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedProduct:Product;
  allProducts:Product[];
  id:any;

  constructor(private webService:WebServiceService) { }

  ngOnInit () {
    this.webService.GetAllProducts().then((data:Product[]) => { this.allProducts = data; }).catch((err:string) => { alert("Error de Servidor.")});
  }

  GetProduct() {
    this.webService.GetProduct(this.id).then((data:Product) => { this.selectedProduct = data; }).catch((err:string) => { alert("Error de Servidor.")});
  }
}
