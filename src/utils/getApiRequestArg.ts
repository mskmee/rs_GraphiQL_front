import { parseStringToJSON } from './parseStringToJSON';
import { validateHeaders } from './validateHeaders';
import { validateVariables } from './validateVariables';
import { IApiRequest } from '@/types/interfaces';

export const getApiRequestArg = (
  query: string,
  variablesString: string,
  headersString: string
): IApiRequest => {
  const headersToValidate = parseStringToJSON(headersString || '{}');
  const variables = parseStringToJSON(variablesString || '{}');
  const headers = validateHeaders(headersToValidate);
  validateVariables(variables);
  return { query, headers, variables };
};
