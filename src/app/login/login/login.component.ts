import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogin } from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(user: UserLogin) {
    this.authService.login(user);
  }
}
