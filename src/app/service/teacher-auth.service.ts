import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APPErrors } from 'src/_Error-handler/appError';
import { NotFoundError } from 'src/_Error-handler/notFoundError';
import { UnauthorizedErrors } from 'src/_Error-handler/unauthorizedErrors';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const api_path = `${environment.web_URL}/api/users`;
const api_file = `${environment.web_URL}/api/image`;

@Injectable({
  providedIn: 'root'
})

export class TeacherAuthService {
  isLogin: boolean = false
  roleAs: string;
  token: string;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(registerForm: any): Observable<any> {
    return this.http.post(`${api_path}/create`, registerForm)
      .pipe(catchError((err) => {
        return throwError(this.errorHandler(err))
      }));;
  }

  loginUser(loginForm: any, isVerified: any): Observable<any> {
    return this.http.post(`${api_path}/login`, loginForm, isVerified)
      .pipe(catchError((err) => {
        return throwError(this.errorHandler(err))
      }));
  }

  isLoggedIn() {
    var loginStatus = localStorage.getItem("isLoggedIn")
    return loginStatus == "true";
  }

  onLogout() {
    this.clearAuthData();
    this.router.navigate(["/authenticate/login"]);
  }

  private clearAuthData() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem("token");
    localStorage.removeItem('role');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem("expiration");
  }

  getRoleAdmin() {
    const role = localStorage.getItem('role');
    if(role === 'Admin' || 'SuperAdmin')
    return role
    return ''
  }

  get currentUser(): any {
    let token = localStorage.getItem('token');
    if (!token)
      return null;

    let jwtHelper = new JwtHelperService()
    return jwtHelper.decodeToken(token)
  }

  getUser(): Observable<any> {
    return this.http.get(`${api_path}/`);
  }

  uniqueEmailCheck(email: any): Observable<any> {
    console.log(`${api_path}/userEmail/${email}`)
    return this.http.get(`${api_path}/userEmail/${email}`);
  }

  getUserById(): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/${id}`)
  }

  updateUser(body: any): Observable<any> {
    const bodyz = {
      name: body.name,
    }
    let id = localStorage.getItem('id');
    const path = `${api_path}/update/${id}`;
    return this.http.patch(path, bodyz)
  }

  deleteUser(): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.delete(`${api_path}/delete/${id}`);
  }

  verifyEmail(token: any) {
    return this.http.get(`${api_path}/confirm/${token}`, { responseType: 'text' });
  }

  changePassword(changeForm: any) {
    let id = localStorage.getItem('id');
    return this.http.post(`${api_path}/changePassword/${id}`, changeForm)
  }

  forgotPassword(forgotForm: any): Observable<any> {
    return this.http.post(`${api_path}/forgot-password`, forgotForm);
  }

  resetPassword(userId: any, token: any, resetForm: any): Observable<Object> {
    return this.http.post(`${api_path}/forgot/${userId}/${token}`, resetForm, { responseType: 'text' })
  }

  requestResetPassword(userId: any, token: any): Observable<Object> {
    return this.http.get(`${api_path}/forgot/${userId}/${token}`, { responseType: 'text' })
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let id = localStorage.getItem('id')
    formData.append('file', file);
    const req = new HttpRequest('POST', `${api_file}/upload/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFilesByName(): Observable<any> {
    let name = localStorage.getItem('id')
    return this.http.get(`${api_file}/files/${name}`, { responseType: 'blob' }); // responce type blob
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${api_file}/files`);
  }

  signInWithGoogle(id_token: string): Observable<any> {
    return this.http.post(`${api_path}/google`, id_token)
  }
  private errorHandler(error: Response) {
    if (error.status === 404)
      throw new NotFoundError()
    if (error.status === 401)
      throw new UnauthorizedErrors()
    throw new APPErrors(error);
  }
}
