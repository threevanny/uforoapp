import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'https://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  //Questions request 
  getQuestionById(id: String) {
    return this.http.get(`${API}/question/${id}`);
  }

  getQuestions() {
    return this.http.get(`${API}/questions/`);
  }

  newQuestion(data: any) {
    return this.http.post(`${API}/question/new/`, data);
  }

  updateQuestion(id: String, data: any) {
    return this.http.put(`${API}/question/update/${id}`, data);
  }

  deleteQuestion(id: String) {
    return this.http.delete(`${API}/question/delete/${id}`);
  }

  //Replies request
  getReplyById(id: String) {
    return this.http.get(`${API}/reply/${id}`);
  }

  getReplies() {
    return this.http.get(`${API}/replies/`);
  }

  newReply(data: any) {
    return this.http.post(`${API}/reply/new/`, data);
  }

  updateReply(id: String, data: any) {
    return this.http.put(`${API}/reply/update/${id}`, data);
  }

  deleteReply(id: String) {
    return this.http.delete(`${API}/reply/delete/${id}`);
  }

  //Avatar request
  getAvatarById(id: String) {
    return this.http.get(`${API}/avatar/${id}`);
  }

  getAvatars() {
    return this.http.get(`${API}/avatars/`);
  }

  newAvatar(data: any) {
    return this.http.post(`${API}/avatar/new/`, data);
  }

  updateAvatar(id: String, data: any) {
    return this.http.put(`${API}/avatar/update/${id}`, data);
  }

  deleteAvatar(id: String) {
    return this.http.delete(`${API}/avatar/delete/${id}`);
  }

}