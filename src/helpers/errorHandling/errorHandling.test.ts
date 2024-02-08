import { AxiosError, HttpStatusCode } from "axios";
import { axiosRetryCondition } from "./errorHandling";

describe("axiosRetryCondition", () => {
  const cases = [
    [HttpStatusCode.BadRequest, false],
    [HttpStatusCode.Unauthorized, false],
    [HttpStatusCode.Forbidden, false],
    [HttpStatusCode.NotFound, false],
    [HttpStatusCode.ServiceUnavailable, true],
    [HttpStatusCode.Accepted, false],
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
