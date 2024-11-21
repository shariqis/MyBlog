import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { LoginSirComponent } from './login-sir/login-sir.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [

  {path:'',component:RegisterComponent},
  {path:'log',component:LoginComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'add_post',component:AddPostComponent},
  {path:'view_post',component:ViewPostComponent},
  {path:'edit-post/:id',component:EditPostComponent},
  {path:'sir',component:LoginSirComponent},
  {path:'comment-post/:id',component:CommentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
