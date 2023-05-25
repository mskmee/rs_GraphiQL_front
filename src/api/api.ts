import axios, { AxiosHeaders } from 'axios';

const endPointApi = 'https://rickandmortyapi.com/graphql';

export async function api<T>(query: string, headers?: AxiosHeaders, variables?: object) {
  const response = await axios.post<T>(
    endPointApi,
    {
      query,
      variables,
    },
    { headers }
  );
  return response.data;
}
