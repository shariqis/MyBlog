import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-sir',
  templateUrl: './login-sir.component.html',
  styleUrls: ['./login-sir.component.css']
})
export class LoginSirComponent {

  loginForm: FormGroup;





  constructor(private formbuild: FormBuilder) {
    this.loginForm = formbuild.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

    });

  }


  proceedlogin() {
    // Handle form submission here
    console.log(this.loginForm.value);
  }



}
