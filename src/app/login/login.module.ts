import { AuthModule } from '@app/auth/auth.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const routing = RouterModule.forChild([{ path: "", component: LoginComponent }]);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    routing
  ]
})
export class LoginModule { }
