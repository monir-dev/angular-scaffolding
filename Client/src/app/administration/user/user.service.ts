import {Injectable} from "@angular/core";
import {User} from "./user.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Injectable()
export class UserService {
//   constructor(private http: Http) {}
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl: string = 'https://localhost:44355';


  getUsers() {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.get<User[]>(`${this.baseUrl}/api/user`, httpOptions);

    // return this.http.get('/api/user')
    //   .map((res: Response) => res.json().response);
  }

  getUserById(Id: string) {

    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.get<User>(`${this.baseUrl}/api/user/${Id}`, httpOptions);
  }

  createUser(user: User) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.post<User>(`${this.baseUrl}/api/user`, user, httpOptions);
  }


  editUser(user: User) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.put<User>(`${this.baseUrl}/api/user/${user.Id}`, user, httpOptions);
  }


  deleteUser(id: string) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.delete<any>(`${this.baseUrl}/api/user/${id}`, httpOptions);
  }
}