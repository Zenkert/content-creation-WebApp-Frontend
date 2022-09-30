import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  public getToken() {
    return localStorage.getItem('token');
  }
}
