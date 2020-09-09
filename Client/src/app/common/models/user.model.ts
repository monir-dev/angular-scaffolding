import {Deserializable} from "./deserializable.model";

export class User {
  
  // constructor(
  //   Id: number,
  //   UserName: string,
  //   Email: string,
  //   PhoneNumber: string,
  //   Password: string
  // ) {  }

    Id: number;
    UserName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
  }

  export class AuthUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}