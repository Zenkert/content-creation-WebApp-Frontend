import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    private url = ''
    
    public getUrl() {
        return this.url
    }
    public setUrl(url:string) {
        this.url = url
    }

    constructor(private http: HttpClient) { }
    userId = localStorage.getItem('id')

    // Create API
    addAll(formData: any, id: string): Observable<any> {
        // let userId = localStorage.getItem('id')
        return this.http.post(`${this.url}/create/${this.userId}/${id}`, formData)
    }

    // Get All API
    getAll() {
        return this.http.get(`${this.url}/`)
    }

    // Get questions by topic ID
    getQuestionByTopic(topic: any) {
        return this.http.get(`${this.url}/get/${this.userId}/${topic}`)
    }

    // Delete questions by question ID
    delete(id: any) {
        return this.http.delete(`${this.url}/delete/${id}`)
    }

    //Update question
    updateQuestion(body: any, id: any) {
        const path = `${this.url}/update/${id}`;
        return this.http.put(path, body)
    }
    // Get question by Id
    getQuestionById(id: any) {
        return this.http.get(`${this.url}/getQuestion/${id}`)
    }
}
