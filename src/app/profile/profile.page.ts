import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateIsAuth();
  }

  logout() {
    this.authService.logout();
    console.log("logout")
    this.validateIsAuth();
  }

  validateIsAuth() {
    this.authService.isAuth().then(res => {
      console.log(res)
      if (res) {
        console.log("isAuth: ", res)
        //get user data
        this.authService.getToken("token")
          .then(token => {
            this.authService.getProfile(token)
              .subscribe(res => {
                this.user = res;
                console.log(res)
              })
          })


      } else {
        this.router.navigate(['/login'])
      }
    })
  }
}
