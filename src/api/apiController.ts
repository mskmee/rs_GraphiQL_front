import { getIntrospectionQuery } from 'graphql';
import { api } from './api';
import { IApiController } from '@/types/interfaces/IApiController';
import { IApiResponse } from '@/types/interfaces/IApiResponse';
import { getSchemaFromResponse } from '@/utils/getSchemaFromResponse';

export const apiController: IApiController = {
  getSchema: async () => {
    const response = await api<IApiResponse>(getIntrospectionQuery());
    return getSchemaFromResponse(response);
  },
  getGraphQLResponse: function (query, headersString = '', variablesString = '') {
    //todo check entry
    const headers = JSON.parse(`{${headersString}}`) as object;
    const variables = JSON.parse(`{${variablesString}}`) as object;
    return api(query, headers, variables);
  },
};
