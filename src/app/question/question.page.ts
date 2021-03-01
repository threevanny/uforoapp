import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from '../services/question/question.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
  }

  SendNewQuestion(form: NgForm) {
    console.log(form.value)
    //validate data
    const { question, tag } = form.value;

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
                console.log(res.id)
                this.questionService.newQuestion(this.user.id, question, tag)
                  .subscribe(res => {
                    if (res.OK) {
                      //show OK message
                      this.router.navigate(['/dashboard'])
                    } else {
                      //show error message
                      console.log("Error")
                    }
                  })
              })
          })
      } else {
        this.router.navigate(['/landing'])
      }
    })
  }
}
