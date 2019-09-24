import { Deserializable } from '../deserializable.model';
export class hrmAccount {
  userID: string;
  password: string;
  apiToken: string;

  constructor() {
    this.userID = '';
    this.password = '';
    this.apiToken = null;
  }
}

export class hrmAccountDto extends hrmAccount implements Deserializable {
  deserialize(input: any) {
    Object.assign(<any>this, input);
    return this;
  }
}
