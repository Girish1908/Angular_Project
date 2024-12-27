import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  messageClass: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if(this.validateForm()){
    this.http.post<any>('http://localhost:8080/user/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe(
      response => {
      
        this.message = 'Registration successful!';
        this.messageClass = 'success';
        
        
        this.name = '';
        this.email = '';
        this.password = '';
        this.router.navigate(['/login']);
  
        
      },
      error => {
       
        if (error.status === 400 && error.error.message === 'Username already taken') {
          this.message = 'Username already taken. Please choose a different username.';
        } else {
          this.message = 'Registration successful';
        }
        this.messageClass = 'error';
      }
    );
  }else{
    this.messageClass='error';
  }
}
validateForm():boolean{
  let isValid=true;
  if(!this.isEmailValid(this.email)){
    this.message='Please enter a valid email address';
    isValid=false;
  }
  if(!this.isPasswordValid(this.password)){
    this.message='Password must be at least 8 characters long and contain a special character';
    isValid=false;
  }
  return isValid;
}
isEmailValid(email:string):boolean{
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

isPasswordValid(password: string): boolean {
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasSpecialChar;
}
}

