export class StudentModel {
  public key: string;
  public firstName: string;
  public lastName: string;
  public grade: string;
  public age: number;
  public address: AddressModel;
  public workEligible: boolean;
  public dateOfBirth: Date;
  public photoUrl: string;
  public photoName: string;
  public photoDirectory: string;
}

export class AddressModel {
  public city: string;
  public street: string;
}
