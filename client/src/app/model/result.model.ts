export class ResultModel<T> {
  public data: T;
  public hasResult: boolean;
  public isLoading: boolean;
  public errorMessage: string;
  public success: boolean;
  public hasError: boolean;

  load() {
    this.hasResult = false;
    this.isLoading = true;
    this.success = false;
    this.hasError = false;
  }
  setData(data: T) {
    this.data = data;
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
