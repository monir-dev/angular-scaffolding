import {Injectable} from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { RegistrationModel } from "./registration/registration.model";
import { AuthUser } from './auth-user.model';

@Injectable()
export class AuthService {
    
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;

    baseUrl: string = "https://localhost:44355";

    constructor(private http: HttpClient) { 
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    //https://angular.io/guide/http

    register(registrationModel: RegistrationModel) {
        return this.http.post<RegistrationModel>(`${this.baseUrl}/api/Account/Register`, registrationModel);
    }

    login(username, password) {

        const payload = new HttpParams()
            .set('grant_type', "password")
            .set('username', username)
            .set('password', password);

        return this.http.post<any>(`${this.baseUrl}/token`, payload)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}
