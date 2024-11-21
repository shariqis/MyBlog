import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient ,private authService: AuthService, private router: Router) { }

  private baseUrl = 'https://quest123.pythonanywhere.com';


  public add_my_posts(data:any) {

    const headers = this.authService.mypostHeaders();
    console.log(headers)
    // return this.http.post('http://127.0.0.1:8000/posts/', data, { headers: headers })
    return this.http.post(`${this.baseUrl}/posts/`, data, { headers: headers })
  }

  public view_my_posts() {

    const header = this.authService.authHeaders();
    return this.http.get(`${this.baseUrl}/postsss/`, { headers: header })
  }

  public single_posts(postId: number) {

    const header = this.authService.authHeaders();
    return this.http.get(`${this.baseUrl}/postsss/${postId}`, { headers: header })
  }

  public deletePost(postId: number) {
    const header = this.authService.authHeaders();
    // return this.http.delete(`http://127.0.0.1:8000/postsss/${postId}`, { headers: header });
    return this.http.delete(`${this.baseUrl}/postsss/${postId}/`, { headers: header });
  }

  public updatePost(postId: number,data:any) {
    console.log(postId);
    console.log(data);
    const header = this.authService.authHeaders();    
    // return this.http.put(`http://127.0.0.1:8000/postsss/${postId}/`,data, { headers: header });
    return this.http.put(`${this.baseUrl}/postsss/${postId}/`,data, { headers: header });
  }
  public view_other_posts() {

    console.log("//////")
    const header = this.authService.authHeaders();
    // return this.http.get('http://127.0.0.1:8000/other_post/', { headers: header })
    return this.http.get(`${this.baseUrl}/other_post/`, { headers: header })
  }



  public add_comment(data:any,pid:number) {

    const headers = this.authService.mypostHeaders();
    console.log(headers)
    // return this.http.post(`http://127.0.0.1:8000/posts/${pid}/comments/`, data, { headers: headers })
    return this.http.post(`${this.baseUrl}/posts/${pid}/comments/`, data, { headers: headers })
  }



}
