export class RpiGeneralInformationModel {
  public name: string;
  public  healthCheckPeriod: number;
  public  moisturePeriod: number;
  public  moistureInformation: MoistureInformation[];
  public key: string;
}

export  class MoistureInformation {
  public max: number;
  public min: number;
  name: string;
}
