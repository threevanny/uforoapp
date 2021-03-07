import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question/question.service';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question';
import { Reply } from '../models/reply';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ReplyService } from '../services/reply/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {

  idQuestion = this.activatedRoute.snapshot.paramMap.get('idQuestion')
  qestionPosts = []
  replies = []
  question: Question
  reply: Reply

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private apiService: ApiService,
    private authService: AuthService,
    private replyService: ReplyService
  ) { }

  ngOnInit() {
    this.getQestion(this.idQuestion);
    this.getReplies(this.idQuestion);
  }

  getQestion(idQestion: string) {
    this.questionService.getQestionById(idQestion)
      .subscribe(q => {
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
          });
      })
  }

  getReplies(idQestion: string) {
    this.replyService.getReplies(idQestion)
      .subscribe(res => {
        res.forEach(r => {
          this.apiService.getUserById(r.idAutor)
            .subscribe(autor => {
              this.reply = {
                idAutor: r.idAutor,
                idQuestion: r.idQuestion,
                reply: r.reply,
                createdAt: r.createdAt,
                avatar: autor.avatar,
                autor: autor.name,
                points: autor.points
              }
              this.replies.push(this.reply)
            })
        })
      })
    console.log("rp:", this.replies)
  }

  sendReply(form: NgForm) {
    const { reply } = form.value

    this.authService.getToken("idUser")
      .then(idUser => {
        this.replyService.newReply(idUser, this.idQuestion, reply)
          .subscribe(res => {
            if (res.isOk) {
              //refresh page
              console.log(res.message)
            } else {
              //show message error
            }
          })
      })
  }


}