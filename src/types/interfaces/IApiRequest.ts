export interface IApiRequest {
  query: string;
  headers: Record<string, string>;
  variables: Record<string, unknown>;
}
