import { getIntrospectionQuery } from 'graphql';
import { api } from './api';
import { IApiController, IApiResponse } from '@/types/interfaces';
import { getSchemaFromResponse } from '@/utils/getSchemaFromResponse';
import { getObjectFromString } from '@/utils/getObjectFromString';

export const apiController: IApiController = {
  getSchema: async () => {
    const response = await api<IApiResponse>(getIntrospectionQuery());
    return getSchemaFromResponse(response);
  },
  getGraphQLResponse: function (data) {
    const variables = getObjectFromString(data.variables) as object;
    const headers = getObjectFromString(data.headers) as object;
    return api(data.query, headers, variables);
  },
};
