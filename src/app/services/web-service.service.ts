import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { ID } from '../models/ID';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor(private httpService: HttpClient) { }

  private url ='http://localhost:8080/product';

  GetAllProducts(){
    return new Promise((resolve, reject) => {
      this.httpService.get<Product[]>(this.url+'/all').subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err.message);
          console.log (err.message);
        }
      );
    });
  }

  GetProduct(id:any){
    return new Promise((resolve, reject) => {
      this.httpService.get<Product>(this.url+'/'+id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err.message);
          console.log (err.message);
        }
      );
    });
  }

  GetIds() {
    return new Promise((resolve, reject) => {
      this.httpService.get<ID[]>(this.url+'/get/ids').subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err.message);
          console.log(err.message);
        }
      );
    });
  }

  AddProduct(img:string, desc:string, name:string, price:number){
    return new Promise((resolve, reject) => {
      this.httpService.post(this.url+'/new/',img+"/"+desc+"/"+name+"/"+price).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err.message);
          console.log (err.message);
        }
      );
    });
  }

  HowManyProducts(){
    return new Promise((resolve, reject) => {
      this.httpService.get<number>(this.url+'/count/products').subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err.message);
          console.log (err.message);
        }
      );
    });
  }
}
