import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SystemUser } from '../models/system-user.model';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  private baseUrl = environment.baseUrl + 'user';

  constructor(
    private http: HttpClient
  ) { }

  registration(request: SystemUser) {
    return this.http.post<SystemUser>(`${this.baseUrl}/registration`, request);
  }

}
