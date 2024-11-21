import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {

  constructor(private htt: HttpClient) { }
  token: any;
  first_name: any;
  user_name: any;
  private baseUrl = 'http://127.0.0.1:8000/posts';

  public signup(data: any) {
    console.log(data);
    return this.htt.post<any>('http://127.0.0.1:8000/register/', data)
  }


  public signin(data: any) {
    console.log("/////////////////////////////////")
    console.log(data);
    return this.htt.post<any>('http://127.0.0.1:8000/login', data)
  }


  public welcome(data: any) {
    console.log(data)
    let header = new HttpHeaders().set(
      "Authorization",
      data
    );
    //console.log(header)
    //  localStorage.getItem("token")
    // console.log(data)
    return this.htt.get<any>('http://127.0.0.1:8000/welcome', { headers: header })
  }


  public getuser() {
    return this.htt.get<any>('http://127.0.0.1:8000/userDetails')
  }

  public set_Token(data: any) {
    this.token = data;
  }






  public login(params: any) {
    console.log("/////////////////////////////////")
    console.log(params);
    return this.htt.get<any>('http://127.0.0.1:8000/login_details/', { params })
  }

  public set_name(uname: any, fname: any) {
    console.log(fname + ";;;;")
    this.user_name = uname;
    this.first_name = fname;
    console.log("setttttttttt")
    console.log(this.first_name)
  }


  public add_post(data: any) {
    data['username'] = this.user_name;
    console.log(data);
    return this.htt.post<any>('http://127.0.0.1:8000/posts/', data)
  }


  public my_posts() {
    // data['username']=this.user_name;
    // console.log(data);

    return this.htt.get<any>('http://127.0.0.1:8000/posts/', this.user_name)
  }

  public deletePost(postId: number) {
    return this.htt.delete(`${this.baseUrl}/${postId}`);
  }

  

}
