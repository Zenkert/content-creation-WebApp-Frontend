import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const api_path = `${environment.web_URL}/api/openAnswer`;

@Injectable({
  providedIn: 'root'
})
export class OpenEndedAnswersService {

  constructor(private http: HttpClient, private router: Router) { }

  getOpenEndedAnswers(questionId: any): Observable<any> {
    return this.http.get(`${api_path}/getAnswer/${questionId}`)
  }
}
