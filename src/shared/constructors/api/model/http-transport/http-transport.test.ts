import { expect } from "chai";
import Sinon from "sinon";
import { HTTPTransport } from "./http-transport";

const BASE_TEST_URL = "/foo";

const compareUrl = (url: string) => {
  return `${BASE_TEST_URL}${url}`;
};

describe("HTTP Transport", () => {
  let request: Sinon.SinonFakeXMLHttpRequestStatic;
  let requests: Sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    request = Sinon.useFakeXMLHttpRequest();
    requests = [];

    request.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    request.restore();
  });

  describe("Methods", () => {
    it("should use GET method with correct url", (done) => {
      const url = "/bar";
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.get(url).then(() => {
        done();
      });

      const [currentRequest] = requests;
      expect(currentRequest?.method).to.be.eq("GET");
      expect(currentRequest?.url).to.be.eq(compareUrl(url));

      currentRequest?.respond(200, {}, "");
    });

    it("should use POST method with correct url", (done) => {
      const url = "/bar";
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.post(url).then(() => {
        done();
      });

      const [currentRequest] = requests;

      expect(currentRequest?.method).to.be.eq("POST");
      expect(currentRequest?.url).to.be.eq(compareUrl(url));

      currentRequest?.respond(200, {}, "");
    });

    it("should use PUT method with correct url", (done) => {
      const url = "/bar";
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.put(url).then(() => {
        done();
      });

      const [currentRequest] = requests;

      expect(currentRequest?.method).to.be.eq("PUT");
      expect(currentRequest?.url).to.be.eq(compareUrl(url));

      currentRequest?.respond(200, {}, "");
    });

    it("should use DELETE method with correct url", (done) => {
      const url = "/bar";
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.delete(url).then(() => {
        done();
      });

      const [currentRequest] = requests;

      expect(currentRequest?.method).to.be.eq("DELETE");
      expect(currentRequest?.url).to.be.eq(compareUrl(url));

      currentRequest?.respond(200, {}, "");
    });
  });

  describe("Options", () => {
    it("should pass headers correctly", (done) => {
      const url = "/bar";
      const headers = { "Content-Type": "multipart/form-data;charset=utf-8" };
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.get(url, { headers }).then(() => {
        done();
      });

      const [currentRequest] = requests;
      expect(JSON.stringify(currentRequest?.requestHeaders)).to.be.eq(JSON.stringify(headers));

      currentRequest?.respond(200, headers, "");
    });

    it("should pass query correctly", (done) => {
      const url = "/bar";
      const query = { foo: "1", bar: "2" };
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.get(url, { query }).then(() => {
        done();
      });

      const [currentRequest] = requests;

      expect(currentRequest?.url).to.be.eq(`${compareUrl(url)}?foo=${query.foo}&bar=${query.bar}`);

      currentRequest?.respond(200, {}, "");
    });

    it("should pass body correctly", (done) => {
      const url = "/bar";
      const body = { foo: "1", bar: "2" };
      const httpTransport = new HTTPTransport({ baseUrl: BASE_TEST_URL });

      void httpTransport.get(url, { body }).then(() => {
        done();
      });

      const [currentRequest] = requests;

      expect(currentRequest?.requestBody).to.be.eq(JSON.stringify(body));

      currentRequest?.respond(200, {}, "");
    });
  });
});
