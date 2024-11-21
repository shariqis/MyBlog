import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  postId!: number;
  postData: any = [];

  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService,private router: Router,
    public authService: AuthService, private pservice: PostsService) {

    this.translate.use('en');

  }
  userName: string | null = null;
  ngOnInit(): void {
    // Retrieve the post ID from the route parameters
    this.postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('Editing post with ID:', this.postId);
    this.viewSinglePost(this.postId);
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userName = `${data.first_name} ${data.last_name}`;
        console.log(this.userName)
      },
    );

  }



  

  viewSinglePost(postId: number) {
    this.pservice.single_posts(postId).subscribe(
      (res: any) => {
        console.log(res);
        this.postData = res

      });
  }


  update_content(data: any) {
    console.log(data);
    console.log(data.id);
    // console.log(data);
    this.pservice.updatePost(data.id,data).subscribe(
      (res: any) => {
        console.log(res)
        // if (res["status"] == 1) {
        alert("Successfully Updated Post")
         this.router.navigate(['view_post']);
        // window.location.reload();


        // }

      }
    );
  }


}
