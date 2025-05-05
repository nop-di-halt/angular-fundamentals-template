import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from "./services/user.service";
import { UserStoreService } from "./services/user-store.service";
import { AdminGuard } from "./guards/admin.guard";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        UserStoreService,
        AdminGuard
    ]
})
export class UserModule { }
