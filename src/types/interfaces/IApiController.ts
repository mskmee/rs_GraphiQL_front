import { GraphQLSchema } from 'graphql';
import { IApiResponse } from './IApiResponse';

export interface IApiController {
  getSchema: () => Promise<GraphQLSchema>;
  getGraphQLResponse: (
    query: string,
    headersString?: string,
    variablesString?: string
  ) => Promise<IApiResponse>;
}
