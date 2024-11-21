import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://quest123.pythonanywhere.com';

  public signup(data: any) {
    
    // return this.http.post<any>('http://127.0.0.1:8000/register/', data)
    return this.http.post<any>(`${this.baseUrl}/register/`, data)
  }



}
