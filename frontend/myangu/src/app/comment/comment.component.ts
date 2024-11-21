import { Component } from '@angular/core';
import { AuthService, LoginResponse } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  postId!: number;

  constructor( private router: Router, private activatedRoute: ActivatedRoute,
    public authService: AuthService, private pservice: PostsService){

    }
    userName: string | null = null;
    ngOnInit() {
      this.postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      console.log('Editing post with ID:', this.postId);

     
      this.authService.getUserDetails().subscribe(
        (data) => {
          this.userName = `${data.first_name} ${data.last_name}`;
          console.log(this.userName)
        },
      );
  
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
            this.router.navigate(['welcome']);
         // window.location.reload();
         //this.ngOnInit();
         //window.location.href = 'https://shari-blog.netlify.app/view_post';
  
  
          // }
  
        });
  
  
    }





}
