import axios, { AxiosError } from "axios";

export function axiosRetryCondition(error: AxiosError): boolean {
  // Retry on timeout because sometimes is slow on first run
  if (error.code === "ECONNABORTED") return true;
  switch (error.response?.status) {
    case 500:
    case 501:
    case 503:
      return true;
    case 400:
      console.log("Received status: 400 - Bad request");
      return false;
    case 401:
      console.log("Received status: 401 - Unauthorized");
      return false;
    case 403:
      console.log("Received status: 403 - Forbidden");
      return false;
    case 404:
      console.log("Received status: 404 - Not found :/");
      return false;
    case 429:
      console.log("Received status: 429 - API Key limit exceeded");
      return false;
    default:
      return false;
  }
}

export function buildError(error: any): Error {
  // Catch axios errors not handled by retry
  if (axios.isAxiosError(error)) {
    return new Error(error.response?.data.message || error.message);
  } else {
    return error;
  }
}
