import { isBetweenRange, queryStringify } from "../../../../lib";
import type { ValueOf } from "../../../../types";
import type { ParsedXHRResponse, ServerError } from "../types";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type HTTPTransportProps = {
  baseUrl: string;
};

type Options = {
  timeout?: number;
  method?: ValueOf<typeof METHODS>;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
};

type HTTPMethod = (url: string, options?: Options) => Promise<ParsedXHRResponse>;

export class HTTPTransport {
  baseUrl = "";

  constructor(props: HTTPTransportProps) {
    const { baseUrl } = props;
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = async (url, options = {}) => {
    return this._request(url, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = async (url, options = {}) => {
    return this._request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = async (url, options = {}) => {
    return this._request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = async (url, options = {}) => {
    return this._request(url, { ...options, method: METHODS.DELETE });
  };

  _combineHeaders(xhr: XMLHttpRequest): Record<string, string> {
    return xhr
      .getAllResponseHeaders()
      .trim()
      .split(/[\n\r]+/)
      .reduce<Record<string, string>>((accum, entry) => {
        const [key, value] = entry.split(":");

        if (key && value) {
          accum[key] = value.trim();
        }

        return accum;
      }, {});
  }

  _parseXHR(rawXHR: XMLHttpRequest): ParsedXHRResponse {
    return {
      isOK: isBetweenRange(rawXHR.status, [200, 299]),
      statusCode: rawXHR.status,
      statusText: rawXHR.statusText,
      headers: this._combineHeaders(rawXHR),
      rawXHR,
      getData: <T>(): T | ServerError | null => {
        if (rawXHR.responseText === "OK") {
          return null;
        }

        return JSON.parse(rawXHR.responseText) as T | ServerError;
      },
    };
  }

  _request: HTTPMethod = async (url, options = {}) => {
    const { headers = {}, method, query, timeout = 10_000, body } = options;
    const defaultHeaders = body instanceof FormData ? {} : { "Content-Type": "application/json" };
    const requestHeaders = { ...defaultHeaders, ...headers };

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("Не указан метод");

        return;
      }

      const xhr = new XMLHttpRequest();
      const queryString = queryStringify(query ?? {});

      xhr.open(method, `${this.baseUrl}${url}${queryString ? `?${queryString}` : ""}`);
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      Object.entries(requestHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value as string);
      });

      xhr.addEventListener("load", () => {
        resolve(this._parseXHR(xhr));
      });

      xhr.addEventListener("abort", () => {
        reject(this._parseXHR(xhr));
      });

      xhr.addEventListener("error", () => {
        reject(this._parseXHR(xhr));
      });

      xhr.addEventListener("timeout", () => {
        reject(this._parseXHR(xhr));
      });

      if (!body) {
        xhr.send();

        return;
      }

      xhr.send(body instanceof FormData ? body : JSON.stringify(body));
    });
  };
}
