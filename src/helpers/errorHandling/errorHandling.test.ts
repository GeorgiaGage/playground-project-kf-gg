import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { axiosRetryCondition, buildError } from "./errorHandling";

describe("axiosRetryCondition", () => {
  const cases = [
    [HttpStatusCode.BadRequest, false],
    [HttpStatusCode.Unauthorized, false],
    [HttpStatusCode.Forbidden, false],
    [HttpStatusCode.NotFound, false],
    [HttpStatusCode.ServiceUnavailable, true],
    [HttpStatusCode.Accepted, false],
    [HttpStatusCode.TooManyRequests, false],
  ];
  it.each(cases)("should return false", (statusCode, expected) => {
    const error = {
      response: { status: statusCode },
    } as AxiosError;
    const result = axiosRetryCondition(error);
    expect(result).toEqual(expected);
  });

  it("should return true if timeout exceeded", () => {
    const error = { code: "ECONNABORTED" } as AxiosError;
    const result = axiosRetryCondition(error);
    expect(result).toBeTruthy();
  });
});

describe("buildError", () => {
  const errorMessage = "Uh oh";
  const expectedError = new Error(errorMessage);
  it("should build the correct Error for an AxiosError input with response body", () => {
    const axiosResponse = { data: { message: errorMessage } } as AxiosResponse;

    const axiosError = {
      response: axiosResponse,
      isAxiosError: true,
      name: "Request failed",
    } as AxiosError<any, any>;

    const result = buildError(axiosError);
    expect(result.message).toEqual(errorMessage);
    expect(result).toEqual(expectedError);
  });
  it("should build the correct Error for an AxiosError input with no response body", () => {
    const axiosError = {
      isAxiosError: true,
      name: "Request failed",
      message: "Double uh oh",
    } as AxiosError;

    const result = buildError(axiosError);
    expect(result.message).toEqual("Double uh oh");
    expect(result).toEqual(new Error("Double uh oh"));
  });
  it("should build the correct Error for an non-axios error", () => {
    const error = new Error(errorMessage);
    const result = buildError(error);
    expect(result).toEqual(expectedError);
  });
});
