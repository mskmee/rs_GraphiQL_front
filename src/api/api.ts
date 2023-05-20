import axios from 'axios';

const endPointApi = 'https://rickandmortyapi.com/graphql';

export async function api<T>(query: string, headers?: object, variables?: string) {
  //todo check variables
  const response = await axios.post<T>(endPointApi, {
    headers,
    query: query,
    variables: variables,
  });
  return response.data;
}
