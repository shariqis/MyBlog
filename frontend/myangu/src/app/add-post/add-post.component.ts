import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, LoginResponse } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],

  // template: `




  //                            <div class="mb-3">
  //                      <label>{{'Title' | translate }}</label>
  //                       <input type="text" class="form-control " [(ngModel)]="postData.title" name="title" placeholder="{{'Title' | translate }}" ngModel
  //                          required>
  //                   </div>
  //                   <div class="mb-3">
  //                       <label>{{'Content' | translate }}</label>
  //                    <textarea class="form-control" ngModel [(ngModel)]="postData.content" placeholder="{{'Content'| translate}}" name="content" id="exampleFormControlTextarea1" rows="5"></textarea>
  //                   </div>


  // <button (click)="changeLanguage('ml')">Malayalam</button>
  //   <button (click)="changeLanguage('en')">English</button>

  // `

})
export class AddPostComponent {
  constructor( private router: Router, private translate: TranslateService,
    public authService: AuthService, private pservice: PostsService) {

    // this.translate.setDefaultLang('en')
    this.translate.use('en');

  }




  changeLanguage(language: string) {
    this.translate.use(language);
  }

  userName: string | null = null;

  ngOnInit() {
    

    
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userName = `${data.first_name} ${data.last_name}`;
        console.log(this.userName)
      },
    );

  }


  first_name = "USER";
  postData: any = { title: '', content: '' };


  post_content(data: any) {
    console.log(data)
    // this.pservice.my_posts(data);

    this.pservice.add_my_posts(data).subscribe(
      (res: any) => {
        console.log(res)
        // if (res["status"] == 1) {
        alert("Successfully Posted")
         this.router.navigate(['view_post']);
        // window.location.reload();
//this.ngOnInit();

        // }

      });


  }

}
