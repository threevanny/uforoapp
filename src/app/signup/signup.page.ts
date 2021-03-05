import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private router: Router,
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


  signup(form: NgForm) {
    const { name, email, password } = form.value;

    this.authService.signup(name, email, password)
      .subscribe(
        res => {
          if (res.succes) {
            // show message to user
            console.log(res);
            this.router.navigate(['/login']);
          }
        }
      )
  }
}
