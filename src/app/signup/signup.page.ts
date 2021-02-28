import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    const { name, email, password } = form.value;
    this.authService.signup(name, email, password)
      .subscribe(
        res => {
          if (res) {
            // show message to user
            console.log(res);
            this.router.navigate(['/login']);
          }
        }
      )
  }
}
