import axios, { AxiosError, HttpStatusCode } from "axios";

// TODO: move the API key somewhere more secure
// TODO: change file structure of API client
const instance = axios.create({
  baseURL: "https://api.krakenflex.systems/interview-tests-mock-api/v1",
  timeout: 1000,
  headers: {
    accept: "application/json",
    "x-api-key": "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23",
  },
});

// This should do the bare minimum to wrap around the API
async function getOutages(): Promise<
  { data: {}; status: HttpStatusCode } | AxiosError | Error
> {
  console.log("Fetching outages...");
  try {
    const response = await instance.get("/outages");
    console.log('Response: ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error: ', error.message);
      return error;
    } else {
      console.log('Error: ', error);
      return new Error("Something went wrong fetching outages");
    }
  }
}

export default getOutages;
