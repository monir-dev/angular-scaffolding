import {Deserializable} from "./deserializable.model";

export class User {
    Id: number;
    UserName: string;
    EmailAddress: string;
    Name: string;
    Password: string;
    PhoneNumber: string;

    // deserialize(input: any) {
    //     Object.assign(this, input);
    //     return this;
    //   }
  }