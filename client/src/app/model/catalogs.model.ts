export class DbCatalogsModel {
  public rpiHealth: CatalogValueModel;
  public rpiMoisture: CatalogValueModel;
}

export class CatalogValueModel {
  public count: number;
  // tslint:disable-next-line:variable-name
  public lastUpdate: string;
}
