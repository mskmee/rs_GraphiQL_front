export const getObjectFromString = (str: string) => {
  return str ? (JSON.parse(str.trim().replace('/n', '')) as object) : {};
};
