import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API = 'https://uforoapi.herokuapp.com/api/v1';
  constructor() { }
}
