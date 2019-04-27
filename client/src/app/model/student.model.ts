export class StudentModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public grade: string;
  public age: number;
  public address: AddressModel;
  public workEligible: boolean;
  public dateOfBirth: Date;
}

export class AddressModel {
  public city: string;
  public street: string;
}
