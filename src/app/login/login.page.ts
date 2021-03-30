import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.authService.isAuth().then(res => {
      console.log("isAuth: ", res);
      if (res) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }


  public errorMessages = {
    email: [
      { type: 'required', message: 'Ingrese su correo para Iniciar Sesión' },
      { type: 'pattern', message: 'Se requiere un Correo Univalle valido' }
    ],
    password: [
      { type: 'required', message: 'Ingrese su contaseña para iniciar sesión' },
    ]
  }

  form = this.formBuilder.group({
    email: ["", Validators.compose([Validators.pattern("^[A-Za-z0-9._%+-]+@correounivalle.edu.co$"), Validators.required])],
    password: ["", Validators.compose([Validators.required])],
  })

  login(form: FormGroup) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe(
      res => {
        if (res.notMatch) {
          this.presentWarnigAlert();
        } else {
          if (res.isAuth) {
            this.authService.setToken("token", res.token);
            this.authService.setToken("idUser", res.id);
            this.router.navigate(['/dashboard']);
          }
        }
      }
    )
  }

  async presentWarnigAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'El email o la Contraseña son incorrectos.',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
