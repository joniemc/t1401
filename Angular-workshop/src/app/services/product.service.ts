import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = 'http://localhost:3001/api';
  constructor(private httpClient: HttpClient) { }

  getProducts(){
    return this.httpClient.get<ProductResponse>(this.API_URL+'/product/productos')
  }
}
