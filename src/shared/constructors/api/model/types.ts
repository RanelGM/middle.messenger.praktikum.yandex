export type ServerError = {
  reason: string;
};

export type ParsedXHRResponse = {
  isOK: boolean;
  statusCode: number;
  statusText: string;
  headers: Record<string, string>;
  rawXHR: XMLHttpRequest;
  getData: <T>() => T | ServerError;
};
