export const validateVariables = (data: Record<string, unknown>) => {
  const isValid = Object.values(data).every((el) => {
    if (typeof el === 'object' && el !== null && !Array.isArray(el)) {
      validateVariables(el as Record<string, unknown>);
    }
    if (el && typeof el === 'string') {
      return true;
    }
    return false;
  });
  if (!isValid) {
    throw new Error('Enter a valid JSON');
  }
};
