import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {

  }

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  // get cpassword() {
  //   return this.form.get('cpassword');
  // }


  public errorMessages = {
    name: [
      { type: 'required', message: 'Ingrese su nombre' },
      { type: 'maxlength', message: 'El nombre debe contener menos de 64 caracteres' }
    ],
    email: [
      { type: 'required', message: 'Un correo es requerido' },
      { type: 'pattern', message: 'Se requiere un Correo Univalle valido' }
    ],
    password: [
      { type: 'required', message: 'Se requiere una contraseña' },
      { type: 'minlength', message: 'La contraseña debe contener al menos 8 caracteres' }
    ],
    // cpassword: [
    //   { type: 'required', message: 'Por favor, confirme su contraseña' },
    //   { type: 'passwordsMatch', message: 'La contraseñas no coinciden' },
    //   { type: 'minlength', message: 'La contraseña debe contener al menos 8 caracteres' }
    // ],
  }


  form = this.formBuilder.group({
    name: ["", Validators.compose([Validators.maxLength(64), Validators.required])],
    email: ["", Validators.compose([Validators.pattern("^[A-Za-z0-9._%+-]+@correounivalle.edu.co$"), Validators.required])],
    password: ["", Validators.compose([Validators.minLength(8), Validators.required])],
    // cpassword: ["", Validators.compose([Validators.minLength(8), Validators.required])]
  })


  signup(form: FormGroup) {
    const { name, email, password } = form.value;

    this.authService.signup(name, email, password)
      .subscribe(
        res => {
          if (res.userExists) {
            this.presentWarnigAlert();
          } else {
            if (res.isOk) {
              this.presentAlertConfirm();

              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }
          }
        }
      )
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro Exitoso!',
      message: 'Inicia sesión para difrutar de Uforo',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentWarnigAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Este email ya esta registrado. NO puedes tener más de una cuenta asociada al mismo email. Intenta iniciar sesión.',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
