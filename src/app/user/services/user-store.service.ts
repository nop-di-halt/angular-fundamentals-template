import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>("");
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    name$ = this.name$$.asObservable();
    isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) { }

    getUser() {
        this.userService.getUser()
            .subscribe(response => {
                if (response.successful) {
                    this.isAdmin = response.result.role === "admin";
                    this.name$$.next(response.result.name || "");
                }
            });
    }

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
