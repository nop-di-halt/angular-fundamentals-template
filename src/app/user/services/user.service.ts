import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '@app/shared/interfaces';
import { Observable } from 'rxjs';
import { apiUrl } from '@app/shared/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getUser(): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(`${apiUrl}/users/me`);
    }
}
