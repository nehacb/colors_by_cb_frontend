import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = new FormGroup({

    username: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required
    ])

  });

  constructor(
    private authService: AuthService
  ){}
  
  login() {

    if(this.form.invalid) {
      return;
    }

    this.authService.login({

      username: this.form.value.username!,

      password: this.form.value.password!

    })
    
    .subscribe({
    
      next: response => {
      
        this.authService.saveToken(
          response.token
        );
      
        console.log('Login successful');
      
      },
    
      error: error => {
      
        console.error(
          'Login failed',
          error
        );
      
      }
    
    });

  }
}
