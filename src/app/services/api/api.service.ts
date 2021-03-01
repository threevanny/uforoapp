import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  //get a user by ID
  getUserById(id: String) {
    return this.http.get<any>(`${this.env.API}/user/${id}`);
  }
  //Replies request
  getReplyById(id: String) {
    return this.http.get(`${this.env.API}/reply/${id}`);
  }

  getReplies() {
    return this.http.get(`${this.env.API}/replies/`);
  }

  newReply(data: any) {
    return this.http.post(`${this.env.API}/reply/new/`, data);
  }

  updateReply(id: String, data: any) {
    return this.http.put(`${this.env.API}/reply/update/${id}`, data);
  }

  deleteReply(id: String) {
    return this.http.delete(`${this.env.API}/reply/delete/${id}`);
  }

  //Avatar request
  getAvatarById(id: String) {
    return this.http.get(`${this.env.API}/avatar/${id}`);
  }

  getAvatars() {
    return this.http.get(`${this.env.API}/avatars/`);
  }

  newAvatar(data: any) {
    return this.http.post(`${this.env.API}/avatar/new/`, data);
  }

  updateAvatar(id: String, data: any) {
    return this.http.put(`${this.env.API}/avatar/update/${id}`, data);
  }

  deleteAvatar(id: String) {
    return this.http.delete(`${this.env.API}/avatar/delete/${id}`);
  }

}