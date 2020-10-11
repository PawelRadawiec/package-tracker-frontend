import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { SystemUserAuthorizationInfo } from '../models/login-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private baseUrl = environment.baseUrl + 'auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest) {
    return this.http.post<SystemUserAuthorizationInfo>(`${this.baseUrl}/login`, request);
  }

}
