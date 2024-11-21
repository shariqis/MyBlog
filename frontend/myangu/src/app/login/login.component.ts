import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService,LoginResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private http: HttpClient, public authService: AuthService,
    private router: Router
  ) {

  }

  token = "";
  data: any;
  login(data: any) {
    console.log(data);

    this.http.post<LoginResponse>('https://quest123.pythonanywhere.com/login/', data).subscribe(response => {
      console.log('Login successful', response);
      const token = response.token;
      const userId = response.user_id
      if (token) {
        this.authService.login(token, userId);
        alert("Login Success! ")
        this.router.navigate(['welcome']);
      } else {
        console.error('Token not received', response);
      }
    }, error => {
      alert("Login failed! Try signing up if you dont have an account.")
      console.error('Login failed', error);
    });
    

  }







}
