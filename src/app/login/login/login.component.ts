import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserLoginRequest } from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(user: UserLoginRequest) {
    this.authService.login(user);
  }
}
