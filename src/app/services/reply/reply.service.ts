import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service'

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  getReplyById(id: String) {
    return this.http.get(`${this.env.API}/reply/${id}`);
  }

  getReplies(idQuestion: string) {
    return this.http.get<any>(`${this.env.API}/replies/${idQuestion}`);
  }

  newReply(idAutor: string, idQuestion: string, reply: string) {
    return this.http.post<any>(`${this.env.API}/reply/new/`,
      { idAutor: idAutor, idQuestion: idQuestion, reply: reply }
    )
  }

  updateReply(id: String, data: any) {
    return this.http.put(`${this.env.API}/reply/update/${id}`, data);
  }

  deleteReply(id: String) {
    return this.http.delete(`${this.env.API}/reply/delete/${id}`);
  }
}
