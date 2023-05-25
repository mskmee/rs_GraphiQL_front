import { GraphQLSchema } from 'graphql';
import { IApiResponse } from './IApiResponse';
import { IApiRequest } from './IApiRequest';

export interface IApiController {
  getSchema: () => Promise<GraphQLSchema>;
  getGraphQLResponse: (data: IApiRequest) => Promise<IApiResponse>;
}
