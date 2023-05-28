import { IApiResponse } from '@/types/interfaces/IApiResponse';
import { IntrospectionQuery, buildClientSchema } from 'graphql';

export const getSchemaFromResponse = (response: IApiResponse) => {
  const schemaData = response.data as IntrospectionQuery;
  return buildClientSchema(schemaData);
};
