import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question/question.service';
import { ApiService } from '../services/api/api.service';
import { Question } from '../models/question';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  qestionPosts = [];
  question: Question

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private apiService: ApiService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.getQestions();
  }


  getQestions() {
    this.questionService.getQuestions()
      .subscribe(res => {
        res.forEach(q => {
          this.apiService.getUserById(q.idAutor)
            .subscribe(autor => {
              this.question = {
                idQuestion: q._id,
                question: q.question,
                tag: q.tag,
                createdAt: q.createdAt,//(Date.now() - Date.parse(q.createdAt)),
                idAutor: autor._id,
                avatar: autor.avatar,
                autor: autor.name,
                points: autor.points
              }
              this.qestionPosts.push(this.question);
            })
        });
      })
    //console.log(this.qestionPosts)
  }


  doRefresh(event) {
    this.qestionPosts = [];
    this.getQestions();
    setTimeout(() => {
      this.router.navigate([`/dashboard/home`])
      event.target.complete();
    }, 2000);
  }

  goToQuestionPage() {
    this.router.navigate(['/question']);
  }
  goToReplyPage(idQestion: string) {
    this.router.navigate([`/reply/${idQestion}`])
  }
}
