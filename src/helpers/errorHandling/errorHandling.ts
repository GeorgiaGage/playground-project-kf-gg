import axios, { AxiosError } from "axios";

export function axiosRetryCondition(error: AxiosError): boolean {
  // Retry on timeout - this is a questionable addition
  if (error.code === 'ECONNABORTED') return true;
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
    default:
      return false;
  }
}

export function handleRequestErrors(error: any) {
  // Catch other axios errors not caught by retry
  if (axios.isAxiosError(error)) {
    console.log(error.message);
  } else {
    const err = new Error(error);
    console.log(err.message);
  }
}
