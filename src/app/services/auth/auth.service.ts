import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = 'https://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${API}/user/login`, data);
  }

  logout(data: any) {
    return this.http.post(`${API}/user/logout`, data);
  }

  signup(data: any) {
    return this.http.get(`${API}/user/signup`, data);
  }

}
