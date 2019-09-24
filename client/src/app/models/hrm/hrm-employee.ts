import { Deserializable } from '../deserializable.model';
export class hrmEmployee {
  id: number;
  isleader: boolean;
  name: string;
  dateofbirth: string;
  idcard: string;
  address: string;
  userid: string;
  password: string;
  salaryid: number;
  
  constructor() {
    this.id = null;
    this.isleader = false;
    this.name = '';
    this.dateofbirth = null;
    this.idcard = '';
    this.address = '';
    this.userid = '';
    this.salaryid = null;
    this.password = '';
  }
}

export class hrmEmployeeDto extends hrmEmployee implements Deserializable {
  deserialize(input: any) {
    Object.assign(<any>this, input);
    return this;
  }
}