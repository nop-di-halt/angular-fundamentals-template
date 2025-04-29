import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest, LoginResponse, RegisterResponse } from '../../shared/interfaces';
import { apiUrl } from '@app/shared/api';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserStoreService } from '@app/user/services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();
    constructor(private httpClient: HttpClient,
        private session: SessionStorageService,
        private router: Router,
        private userStoreService: UserStoreService) { }

    login(user: UserLoginRequest) {
        this.httpClient.post<LoginResponse>(`${apiUrl}/login`, user)
            .subscribe(response => {
                if (response.successful) {
                    this.session.setToken(response.result);
                    this.router.navigateByUrl("/");
                    this.isAuthorised = true;
                    this.userStoreService.getUser();
                } else {
                    this.router.navigateByUrl("login");
                }
            });
    }

    logout() {
        this.session.deleteToken();
        this.isAuthorised = false;
    }

    register(user: UserLoginRequest) {
        this.httpClient.post<RegisterResponse>(`${apiUrl}/register`, user)
            .subscribe(response => {
                if (response.successful) {
                    this.router.navigateByUrl("/login");
                }
                console.log(response.result);
            });
    }

    get isAuthorised() {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return `${apiUrl}/login`;
    }
}
