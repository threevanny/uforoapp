import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isAuth().then(res => {
      console.log("isAuth: ", res);
      if (res) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  login(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe(
      res => {
        if (res.isAuth) {
          this.authService.setToken("token", res.token);
          this.router.navigate(['/dashboard']);
        } else {
          console.error("ERROR: there are not response");
        }
      }
    )
  }
}
