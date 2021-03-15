import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  // getQuestionById(id: String) {
  //   return this.http.get<any>(`${this.env.API}/question/${id}`);
  // }

  getQuestions() {
    return this.http.get<any>(`${this.env.API}/questions/`);
  }

  newQuestion(idAutor: String, question: String, tag: String) {
    return this.http.post<any>(`${this.env.API}/question/new/`,
      { idAutor: idAutor, question: question, tag: tag });
  }

  getQestionById(idQuestion: string) {
    return this.http.get<any>(`${this.env.API}/question/${idQuestion}`)
  }

  getQuestionsByIdAutor(idAutor: string) {
    return this.http.get<any>(`${this.env.API}/questions/autor/${idAutor}`)
  }
  // updateQuestion(id: String, data: any) {
  //   return this.http.put<any>(`${this.env.API}/question/update/${id}`, data);
  // }

  // deleteQuestion(id: String) {
  //   return this.http.delete<any>(`${this.env.API}/question/delete/${id}`);
  // }
}

