import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuth().then(res => {
      console.log("isAuth: ", res);
      if (res) {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  goToSignupPage() {
    this.router.navigate(['/signup']);
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
