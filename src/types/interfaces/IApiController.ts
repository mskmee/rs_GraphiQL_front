import { GraphQLSchema } from 'graphql';
import { IApiResponse } from './IApiRespose';

export interface IApiController {
  getSchema: () => Promise<GraphQLSchema>;
  getGraphQLResponse: (
    query: string,
    headersString?: string,
    variablesString?: string
  ) => Promise<IApiResponse>;
}
