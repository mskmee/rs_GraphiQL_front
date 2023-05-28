import { getIntrospectionQuery } from 'graphql';
import { api } from './api';
import { IApiController, IApiResponse } from '@/types/interfaces';
import { getSchemaFromResponse } from '@/utils/getSchemaFromResponse';

export const apiController: IApiController = {
  getSchema: async () => {
    const response = await api<IApiResponse>(getIntrospectionQuery());
    return getSchemaFromResponse(response);
  },
  getGraphQLResponse: function (data) {
    return api(data.query, data.headers, data.variables);
  },
};
