import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'http://localhost:8000/';
  // API_URL = 'http://10.0.2.2:8000/';
  API_URL = 'https://atow-api.emergedigital.com/';
  // API_URL = 'http://atow.test/';

  constructor() { }
}
