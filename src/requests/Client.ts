import axios, { AxiosError } from "axios";
import secrets from "./secrets";
import axiosRetry from "axios-retry";
import { axiosRetryCondition } from "./errorHandling";

const client = axios.create({
  baseURL: "https://api.krakenflex.systems/interview-tests-mock-api/v1",
  timeout: 2000,
  headers: {
    accept: "application/json",
    "x-api-key": secrets.API_KEY,
  },
});

// Intercepts axios responses and handles retries
axiosRetry(client, {
  retries: 3,
  shouldResetTimeout: true,
  retryCondition: (error) => axiosRetryCondition(error),
  onRetry: (retryCount: number, error: AxiosError) =>
    console.log(
      `Received status: ${error.status}\nCommence retry no. ${retryCount}`
    ),
});

export default client;
