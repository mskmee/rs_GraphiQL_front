interface IError {
  message: string;
}

export interface IApiResponseError {
  data: string;
  errors: IError[];
}
