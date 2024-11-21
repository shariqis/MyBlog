import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService,LoginResponse } from '../services/auth.service';
import{ PostsService } from '../services/posts.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private http: HttpClient, public authService: AuthService, private pservice:PostsService,
    private router: Router
  ) {

  }

  data = { "Authorization": "" }
  // va={token:""};
  va: string = "";

  posts: any[] = []



  first_name = "USER";
  userName: string | null = null;

  ngOnInit() {
    

    this.viewOTHERPost();
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userName = `${data.first_name} ${data.last_name}`;
        console.log(this.userName)
      },
    );

  }

  viewOTHERPost(){
    this.pservice.view_other_posts().subscribe(
      (res: any) => {
        console.log(res);
        this.posts = res

      });
  }

  text: string = '';

  submitComment(data:any,postId: number): void {
    console.log('Comment for Post ID', postId, ':', this.text);
    // Implement logic to submit the comment (e.g., call a service to save the comment)
    this.text = ''; // Clear the input field after submission


    this.pservice.add_comment(data,postId).subscribe(
      (res: any) => {
        console.log(res)
        // if (res["status"] == 1) {
        alert("Successfully Commented")
          //this.router.navigate(['view_post']);
       // window.location.reload();
       //this.ngOnInit();
       window.location.href = 'https://shari-blog.netlify.app/view_post';


        // }

      });


  }


  
  commentPost(post: any) {
    // Navigate to the edit page with the post ID (assumes you have a route set up for editing)
    console.log(post.id)
    console.log(post)
    this.router.navigate(['/comment-post', post.id]);
  }

}
