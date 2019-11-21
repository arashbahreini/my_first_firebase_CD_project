export class RpiGeneralInformationModel {
  public name: ValueModel;
  public healthCheckPeriod: ValueModel;
  public moisturePeriod: ValueModel;
  public moistureInformation: MoistureInformation[];
  public key: string;
}

export class ValueModel {
  public value: any;
}

export class MoistureInformation {
  public max: number;
  public min: number;
  name: string;
}
