import { GraphQLSchema, getIntrospectionQuery } from 'graphql';
import { api } from './api';

interface ICallApi {
  getSchema: () => Promise<GraphQLSchema>;
  getGraphQLResponse: (query: string, headersString?: string, variablesString?: string) => void;
}

export const callApi: ICallApi = {
  getSchema: () => api<GraphQLSchema>(getIntrospectionQuery()),
  getGraphQLResponse: (query, headersString, variablesString) => {
    const headers = JSON.parse(headersString ?? '');
    api(`query ${query}`, headers, variablesString);
    return;
  },
};
