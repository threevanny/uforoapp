import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: string;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage
  ) { }

  login(email: String, password: String) {
    return this.http.post<any>(`${this.env.API}/auth/login`,
      { email: email, password: password, token: this.token }
    )
  }

  logout() {
    this.removeToken("token");
    this.getToken("token").then(token => {
      this.http.post<any>(`${this.env.API}/auth/logout`, { token: token }).subscribe(
        res => {
          console.log(res)
          this.removeToken("token");
        }
      )
    }).catch(err => console.error("ERROR: getToken on logout Failed", err))
  }

  signup(name: String, email: String, password: String) {
    return this.http.post<any>(`${this.env.API}/auth/signup`,
      { name: name, email: email, password: password, password2: password }
    )
  }

  getProfile(token: string) {
    return this.http.post<any>(`${this.env.API}/auth/profile`,
      { token: token }
    )
  }

  setToken(key: string, token: string) {
    this.storage.set(key, token);
  }

  async getToken(key: string) {
    return await this.storage.get(key)
      .then(token => {
        return token
      });
  }

  removeToken(key: string) {
    this.storage.remove(key);
  }

  async isAuth() {
    return await this.getToken("token").then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    }).catch(err => console.error("ERROR: Validating Auth", err))
  }
}
