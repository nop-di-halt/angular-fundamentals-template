import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from '@app/shared/interfaces';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email!: string;
  password!: string;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  @Output()
  onLogin = new EventEmitter<UserLogin>();

  login(form: NgForm): void {
    Object.values(form.controls).forEach(c => c.markAsTouched());
    if (form.valid) {
      this.onLogin.emit({ email: this.email, password: this.password });
    }
  }
}
