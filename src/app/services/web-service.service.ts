import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

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

  CountAllProducts(){
    return new Promise((resolve, reject) => {
      this.httpService.get<number>(this.url+'/all/count').subscribe(
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

  GetProductById(id:any){
    return new Promise((resolve, reject) => {
      this.httpService.get<Product>(this.url+'id/'+id).subscribe(
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

  GetProductByOffset(offset:any){
    return new Promise((resolve, reject) => {
      this.httpService.get<Product>(this.url+'/offset/'+offset).subscribe(
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

  PostProduct(img:string, desc:string, name:string, price:number){
    return new Promise((resolve, reject) => {
      this.httpService.post(this.url+'/new',{ params: { img: img, desc: desc, name: name, price: price }, observe: 'response' }).subscribe(
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

  DeleteProduct(id:any){
    return new Promise((resolve, reject) => {
      this.httpService.delete(this.url+'/'+id).subscribe(
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

  UpdateProduct(id:any, img:string, desc:string, name:string, price:any){

    return new Promise((resolve, reject) => {
      this.httpService.post(this.url+'/update',{ "id": id, "img": img, "desc": desc, "name": name, "price": price }).subscribe(
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