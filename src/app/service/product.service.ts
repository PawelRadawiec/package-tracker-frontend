import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl + 'product';
  constructor(private http: HttpClient) {
  }

  products() {
    return this.http.get<Page>(`${this.baseUrl}/search`);
  }

}