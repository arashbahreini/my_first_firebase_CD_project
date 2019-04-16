export class ResultModel<T> {
  public data: T;
  public hasResult: boolean;
  public isLoading: boolean;
  public errorMessage: string;
  public success: boolean;
  public hasError: boolean;

  setData(data: T) {
    data = data;
    this.hasResult = true;
    this.isLoading = false;
    this.success = true;
    this.hasError = false;
  }

  setError(message: string) {
    this.hasResult = false;
    this.isLoading = false;
    this.success = false;
    this.errorMessage = message;
    this.hasError = true;
  }
}
