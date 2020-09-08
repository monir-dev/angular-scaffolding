import {Deserializable} from "./deserializable.model";

export class User {
    Id: number;
    UserName: string;
    EmailAddress: string;
    Name: string;
    Password: string;
    PhoneNumber: string;
  }

  export class AuthUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}