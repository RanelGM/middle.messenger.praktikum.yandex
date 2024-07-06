export const queryStringify = (query: Record<string, string>): string => {
  const urlParams = new URLSearchParams();

  Object.entries(query).forEach(([name, value]) => {
    urlParams.set(name, value);
  });

  return urlParams.toString();
};
