import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { QuestionService } from '../services/question/question.service';
import { Question } from '../models/question';
import { ReplyService } from '../services/reply/reply.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  qestionPosts = [];
  question: Question

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private questionService: QuestionService,
    private replyService: ReplyService
  ) { }

  ngOnInit() {
    this.validateIsAuth();
  }

  doRefresh(event) {
    this.qestionPosts = [];
    this.validateIsAuth();
    setTimeout(() => {
      this.router.navigate([`/dashboard/profile`])
      event.target.complete();
    }, 2000);
  }

  getQuestions(idAutor: string) {
    this.questionService.getQuestionsByIdAutor(idAutor)
      .subscribe(res => {
        res.forEach(q => {
          this.replyService.getCountReplies(q._id)
            .subscribe(countReplies => {
              this.question = {
                idQuestion: q._id,
                question: q.question,
                tag: q.tag,
                replies: countReplies,
                createdAt: q.createdAt,//(Date.now() - Date.parse(q.createdAt)),
                idAutor: idAutor,
                avatar: "",
                autor: "",
                points: 0,
              }
              this.qestionPosts.push(this.question);
            })
        })
      })
  }

  logout() {
    this.authService.logout();
    console.log("logout")
    this.validateIsAuth();
  }

  goToQuestionPage() {
    this.router.navigate(['/question']);
  }

  goToReplyPage(idQestion: string) {
    this.router.navigate([`/reply/${idQestion}`])
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
                this.getQuestions(res.id);
                //console.log(res)
              })
          })


      } else {
        this.router.navigate(['/landing'])
      }
    })
  }

  async LogoutAlertConfirm() {
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
          this.LogoutAlertConfirm();
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
        text: 'Reportar un problema',
        icon: 'bug-outline',
        handler: () => {
          console.log('Reportar un problema');
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
