import {Injectable} from "@angular/core";
import {User} from "../../common/models/user.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {
//   constructor(private http: Http) {}
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.get<User[]>(`https://localhost:44355/api/user`, httpOptions);

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

    return this.http.get<User>(`https://localhost:44355/api/user/${Id}`, httpOptions);
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

    return this.http.post<User>(`https://localhost:44355/api/user`, user, httpOptions);
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

    return this.http.put<User>(`https://localhost:44355/api/user/${user.Id}`, user, httpOptions);
  }
}