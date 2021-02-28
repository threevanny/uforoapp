import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    // const data = this.api.getQuestions
    // // this.http.get('http://localhost:3000/api/v1/questions').subscribe(
    // //   res => console.log(res)
    // // )
  }

  addNewQestion() {
    this.router.navigate(['/question']);
  }
}
