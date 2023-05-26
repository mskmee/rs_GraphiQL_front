export const validateHeaders = (data: Record<string, unknown>) => {
  const isDataValid = Object.values(data).every((el) => el && typeof el === 'string');
  if (!isDataValid) {
    throw new Error('Enter a valid JSON');
  }
  return data as Record<string, string>;
};
