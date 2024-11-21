import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {

  constructor(private router: Router, public authService: AuthService,
    private pservice: PostsService
  ) { }
  first_name: any = "USER";
  username = "";
  posts: any[] = []


  userName: string | null = null;

  ngOnInit() {
    

    this.viewPost();
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userName = `${data.first_name} ${data.last_name}`;
        console.log(this.userName)
      },
    );

  }


  viewPost() {
    this.pservice.view_my_posts().subscribe(
      (res: any) => {
        console.log(res);
        this.posts = res

      });
  }


  editPost(post: any) {
    // Navigate to the edit page with the post ID (assumes you have a route set up for editing)
    console.log(post.id)
    console.log(post)
    this.router.navigate(['/edit-post', post.id]);
  }


  deletePost(postId: number) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.pservice.deletePost(postId).subscribe(
        (response: any) => {
          alert('Post Deleted Successfully');
          this.viewPost();
   
        }
      );
    }
  }



}
