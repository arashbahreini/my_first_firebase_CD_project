export class RpiGeneralInformationModel {
  public name: ValueModel;
  public healthCheckPeriod: ValueModel;
  public moisturePeriod: ValueModel;
  public moistureInformation: MoistureInformation[];
  public key: string;

  constructor() {
    this.name = new ValueModel();
    this.healthCheckPeriod = new ValueModel();
    this.moisturePeriod = new ValueModel();
  }
}

export class ValueModel {
  public value: any;
}

export class MoistureInformation {
  public max: number;
  public min: number;
  name: string;
}
