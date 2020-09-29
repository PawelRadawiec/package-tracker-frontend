import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { SystemUserAuthorizationInfo } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest) {
    return this.http.post<SystemUserAuthorizationInfo>(`${this.baseUrl}/login`, request);
  }

}
