import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { AuthService, LoginResponse } from '../services/auth.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  //selector: 'app-user-info',
  template: `<div *ngIf="userName">
               Welcome, {{ userName }}
             </div>`,

  
})
export class AppComponent {
  title = 'myangu';

constructor(private translate:TranslateService,public authService: AuthService,){
  translate.setDefaultLang('ml')

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

}
