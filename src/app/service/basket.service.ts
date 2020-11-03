import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private baseUrl = environment.baseUrl + 'basket';

  constructor(private http: HttpClient) { }

  count() {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

}
