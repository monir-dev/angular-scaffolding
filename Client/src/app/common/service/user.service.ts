import {Injectable} from "@angular/core";
// import {Http, Response} from "@angular/http";
// import 'rxjs/add/operator/map';
import {User} from "../models/user.model";

@Injectable()
export class UserService {
//   constructor(private http: Http) {}
  constructor() {}

  getUser() {
    return [
        {
            "id":"1",
            "UserName": "monir",
            "EmailAddress": "echomonir@gamil.com",
            "Name": "Monir Hossain",
            "Password": "monir",
            "PhoneNumber": "01836301303"
        },
        {
            "id":"2",
            "UserName": "naim",
            "EmailAddress": "naim@gamil.com",
            "Name": "Naim Chowdhury",
            "Password": "naim",
            "PhoneNumber": "01836301300"
        },
    ];

    // return this.http.get('/api/user')
    //   .map((res: Response) => res.json().response);
  }
}