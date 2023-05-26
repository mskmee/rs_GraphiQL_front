export const parseStringToJSON = (str: string) => {
  const data: Record<string, unknown> = JSON.parse(str.trim().replace('/n', ''));
  return data;
};
