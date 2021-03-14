import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
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
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.validateIsAuth();
  }

  logout() {
    this.authService.logout();
    console.log("logout")
    this.validateIsAuth();
  }

  goToQuestionPage() {
    this.router.navigate(['/question']);
  }

  validateIsAuth() {
    this.authService.isAuth().then(res => {
      //console.log(res)
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
        this.router.navigate(['/landing'])
      }
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Sesión!',
      message: '¿Estas seguro que deseas <strong>cerrar sesión</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel', blah);
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cerrar Sesión',
        icon: 'log-out-outline',
        handler: () => {
          this.presentAlertConfirm();
        }
      }, {
        text: 'Editar Perfil',
        icon: 'person-circle-outline',
        handler: () => {
          console.log('Editar Perfil');
        }
      }, {
        text: 'Eliminar Cuenta',
        icon: 'trash-outline',
        handler: () => {
          console.log('Eliminar Cuenta');
        }
      }, {
        text: 'Terminos y Condiciones',
        icon: 'receipt-outline',
        handler: () => {
          console.log('T&C');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
