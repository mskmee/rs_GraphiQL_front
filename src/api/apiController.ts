import { getIntrospectionQuery } from 'graphql';
import { api } from './api';
import { IApiController } from '@/types/interfaces/IApiController';

export const apiController: IApiController = {
  getSchema: () => api(getIntrospectionQuery()),
  getGraphQLResponse: function (query, headersString = '', variablesString = '') {
    //todo check entry
    const headers = JSON.parse(`{${headersString}}`) as object;
    const variables = JSON.parse(`{${variablesString}}`) as object;
    return api(query, headers, variables);
  },
};
