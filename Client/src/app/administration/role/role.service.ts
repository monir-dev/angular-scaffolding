import {Injectable} from "@angular/core";
import {Role} from "./role.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Injectable()
export class RoleService {
//   constructor(private http: Http) {}
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl: string = 'https://localhost:44355';


  getRoles() {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.get<Role[]>(`${this.baseUrl}/api/role`, httpOptions);

    // return this.http.get('/api/user')
    //   .map((res: Response) => res.json().response);
  }

  getRoleById(Id: string) {

    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.get<Role>(`${this.baseUrl}/api/role/${Id}`, httpOptions);
  }

  createRole(role: Role) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.post<Role>(`${this.baseUrl}/api/role`, role, httpOptions);
  }


  editRole(role: Role) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.put<Role>(`${this.baseUrl}/api/role/${role.Id}`, role, httpOptions);
  }


  deleteRole(id: string) {
    const currentUser = this.authService.currentUserValue;
    const access_token = currentUser['access_token'];
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${access_token}`
      })
    };

    return this.http.delete<any>(`${this.baseUrl}/api/role/${id}`, httpOptions);
  }
}