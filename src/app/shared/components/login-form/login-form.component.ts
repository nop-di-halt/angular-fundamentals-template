import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email!: string;
  password!: string;


  login(form: NgForm): void {
    Object.values(form.controls).forEach(c => c.markAsTouched());
    if (form.valid) {
      console.log("form submitted");
    }
  }
}
