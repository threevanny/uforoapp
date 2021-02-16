import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { } from '../../models/user';
import { Router } from '@angular/router';

const API = 'https://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    public http: HttpClient,
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
    //.pipe(
    //   tap(token => {
    //     this.storage.setItem('token', token)
    //       .then(() => {
    //         console.log('Token Stored', token);
    //       },
    //         error => console.error('Error storing item', error)
    //       );
    //     this.token = token;
    //     this.isLoggedIn = true;
    //     return token;
    //   }),
    // );
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + ""
        + this.token["access_token"]
    });

    return this.http.post(`${this.env.API}/user/logout`,
      { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  signup(name: String, email: String, password: String) {
    return this.http.post(`${this.env.API}/user/signup`,
      { name: name, email: email, password: password }
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http.get(`${this.env.API}/user/signup`,
      { headers: headers }).pipe(
        tap(user => {
          return user;
        })
      )
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
