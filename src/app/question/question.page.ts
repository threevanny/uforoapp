import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from '../services/question/question.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  get tag() {
    return this.form.get('tag');
  }
  get question() {
    return this.form.get('question');
  }

  public errorMessages = {
    tag: [
      { type: 'required', message: 'Selecciona una categoría para tu pregunta' }
    ],
    question: [
      { type: 'required', message: 'Escribe una pregunta' },
    ]
  }

  form = this.formBuilder.group({
    tag: ["", Validators.compose([Validators.required])],
    question: ["", Validators.compose([Validators.required])],
  })

  SendNewQuestion(form: FormGroup) {
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
