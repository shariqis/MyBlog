import { Injectable,Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})



export class AuthService {

  private tokenKey = 'authToken';
  private UserId = 'userId';
  public id = 0;
  private loggedin = false;



  constructor(private http: HttpClient) { }

  login(token: string, userId: number): void{
    this.loggedin = true;
    this.id = userId;
    localStorage.setItem("user", "true")
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.UserId, userId.toString());
  }

  logout(){
    this.loggedin = false;
    localStorage.removeItem("user");
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.UserId);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.UserId)
  }


  authHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }


  mypostHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Token ${token}`,
    });
  }


  getUserDetails(): Observable<any> {
    const headers = this.authHeaders();
    // return this.http.get('http://127.0.0.1:8000/user-details/', { headers });
    return this.http.get('https://quest123.pythonanywhere.com/user-details/', { headers });
  }





}
export interface LoginResponse {
  token: string;
  user_id: number;
}