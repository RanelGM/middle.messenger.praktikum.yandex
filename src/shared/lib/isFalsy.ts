export const isFalsy = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value && typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return !value;
};
