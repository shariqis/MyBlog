import { Component } from '@angular/core';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService,LoginResponse } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router:Router, public authService: AuthService) {

  }
  register(data: any) {
    console.log(data);


    this.userService.signup(data).subscribe(
      (res: any) => {
        console.log(res)
        if (res['response'] == "registered") {
          alert('Successfully Registered')
          this.router.navigate(['log'])

        }
        else {
          alert('Alredy Exist')
        }
      }
    )

    
  }

}
