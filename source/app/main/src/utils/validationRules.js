export const isRequired = (error, val) =>
  checkNullUndefinedEmpty(val) ? error : undefined;
