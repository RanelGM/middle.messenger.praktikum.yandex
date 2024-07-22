import { isBetweenRange, queryStringify } from "shared/lib";
import type { ParsedXHRResponse, ServerError } from "./types";
import type { ValueOf } from "shared/types";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Options = {
  timeout?: number;
  method?: ValueOf<typeof METHODS>;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
};

type HTTPMethod = (url: string, options?: Options) => Promise<ParsedXHRResponse>;

export class HTTPTransport {
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
      getData: <T>(): T | ServerError => {
        return JSON.parse(rawXHR.responseText) as T | ServerError;
      },
    };
  }

  _request: HTTPMethod = async (url, options = {}) => {
    const { headers = {}, method, query, timeout = 10_000, body } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("Не указан метод");

        return;
      }

      const xhr = new XMLHttpRequest();
      const queryString = queryStringify(query ?? {});

      xhr.open(method, `${url}${queryString}`);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
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

      xhr.send(body ? JSON.stringify(body) : undefined);
    });
  };
}
