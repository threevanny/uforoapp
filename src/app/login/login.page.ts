import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password);

  }

  validateEmail(email: string) {

  }
  validatePassword(password: string) {

  }

}
