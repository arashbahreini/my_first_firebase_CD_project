export class ChartModel {
  public labels: string[];
  public datasets: DataSetModel[];

  constructor() {
    this.datasets = [];
    this.labels = [];
  }
}

export class DataSetModel {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
}
