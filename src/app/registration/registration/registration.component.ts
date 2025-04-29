import { Component } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { UserLoginRequest } from '@app/shared/interfaces';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private authService: AuthService) { }

  register(user: UserLoginRequest) {
    this.authService.register(user);
  }
}
