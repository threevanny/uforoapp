import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API = 'http://localhost:3000/api/v1';
  constructor() { }
}
