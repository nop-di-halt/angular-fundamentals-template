import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from './shared/mocks/mocks';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  constructor(private authService: AuthService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.authService.isAuthorised;
  }

  login(): void {
    this.router.navigateByUrl("/login");
  }

  logout():void{
    this.authService.logout();
  }
}
 
