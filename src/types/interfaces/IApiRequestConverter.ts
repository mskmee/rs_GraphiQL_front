import { IApiRequest } from './IApiRequest';
import { IApiRequestConverterErrors } from './IApiRequestConverterErrors';

export interface IApiRequestConverter {
  requestArg: IApiRequest;
  error: IApiRequestConverterErrors;
}
