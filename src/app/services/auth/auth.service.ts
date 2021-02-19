import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { } from '../../models/user';
import { Router } from '@angular/router';

const API = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
  ) { }

  login(email: String, password: String) {
    return this.http.post(`${this.env.API}/user/login`,
      { email: email, password: password }
    ).subscribe(res => {
      console.log(res);
      if (res) {
        this.router.navigate(["/tabs/profile"]);
      }
    })
  }

  logout() {

  }

  signup(name: String, email: String, password: String) {
    return this.http.post(`${this.env.API}/user/signup`,
      { name: name, email: email, password: password }
    )
  }

  user() {

  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
