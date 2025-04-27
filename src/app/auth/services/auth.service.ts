import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, LoginResponse, RegisterResponse } from '../../shared/interfaces';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = "http://localhost:4000/";
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(private httpClient: HttpClient, private session: SessionStorageService, private router: Router) { }

    login(user: UserLogin) {
        this.httpClient.post<LoginResponse>(`${this.apiUrl}login`, user)
            .subscribe(response => {
                if (response.successful) {
                    this.session.setToken(response.result);
                    this.router.navigateByUrl("/");
                    this.isAuthorised = true;
                } else {
                    this.router.navigateByUrl("login");
                }
            });
    }

    logout() {
        this.session.deleteToken();
        this.isAuthorised = false;
    }

    register(user: UserLogin) {
        this.httpClient.post<RegisterResponse>(`${this.apiUrl}register`, user)
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
        return `${this.apiUrl}login`;
    }
}
