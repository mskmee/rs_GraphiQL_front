interface IError {
  message: string;
}

export interface IApiResponseError {
  errors: IError[];
}
