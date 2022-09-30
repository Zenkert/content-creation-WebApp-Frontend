import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const api_path_age = `${environment.web_URL}/api/age`;
const api_path_language = `${environment.web_URL}/api/language`;
const api_path_country = `${environment.web_URL}/api/country`;
const api_path_grade = `${environment.web_URL}/api/grade`;
const api_path_type = `${environment.web_URL}/api/type`;
const api_path_subject = `${environment.web_URL}/api/subject`;

@Injectable({
  providedIn: 'root'
})
export class ActivityFormService {

  constructor(private http: HttpClient) { }
  getGeGroup() {
    return this.http.get(`${api_path_age}/get`)
  }

  getAllLanguage() {
    return this.http.get(`${api_path_language}/get`)
  }

  getCountry(): Observable<any> {
    return this.http.get(`${api_path_country}/get`)
  }

  getGrade(): Observable<any> {
    return this.http.get(`${api_path_grade}/get`)
  }

  getQuestionType(): Observable<any> {
    return this.http.get(`${api_path_type}/get`)
  }

  getSubject(): Observable<any> {
    return this.http.get(`${api_path_subject}/get`)
  }
}
