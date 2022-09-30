import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const api_path = `${environment.web_URL}/api/topic`;
const subject_api = `${environment.web_URL}/api/subject`
@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient) { }


  addTopic(topicForm: any, subId: string, ageId: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.post(`${api_path}/create/${id}/${subId}/${ageId}`, topicForm)
  }

  topicNameCheck(topic: any): Observable<any> {
    console.log(`${api_path}/topicName/${topic}`)
    return this.http.get(`${api_path}/topicName/${topic}`);
  }

  getTopicByAgeId(subject: string, ageId: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}/${ageId}`)
  }

  getTopicBySubject(subject: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}`)
  }

  getTopicByUserId(): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}`)
  }

  getTopicByTopicId(topic: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/getTopic/${id}/${topic}`)
  }
  
  getByTopicId(topic: string): Observable<any> {
    return this.http.get(`${api_path}/getTopicById/${topic}`)
  }

  getAllTopicData(id: string) {
    return this.http.get(`${api_path}/getByTopic/${id}`)
  }

  getAllTopic() {
    return this.http.get(`${api_path}/`)
  }

  getAllTopicByAccess() {
    return this.http.get(`${api_path}/?access=0`)
  }

  deleteTopic(id: string): Observable<any> {
    return this.http.delete(`${api_path}/delete/${id}`, { responseType: 'text' })
  }
  
  getSubject(id: any): Observable<any> {
    return this.http.get(`${subject_api}/getSub/${id}`)
  }
  
  updateTopic(body: any, id: any): Observable<any> {
    const bodyz = {
      name: body.name,
      topic: body.topic,
      ageGroup: body.ageGroup,
      language: body.language,
      country: body.country,
      grade: body.grade,
      noOfQuestions: body.noOfQuestions,
      remainingQuestions: body.remainingQuestions,
      time: body.time,
      access: body.access,
      accessCode: body.accessCode
    }
    const path = `${api_path}/update/${id}`;
    return this.http.put(path, bodyz)
  }
}
