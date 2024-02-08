import axios from "axios";
import secrets from "./secrets";

const Client = axios.create({
  baseURL: "https://api.krakenflex.systems/interview-tests-mock-api/v1",
  timeout: 1000,
  headers: {
    accept: "application/json",
    "x-api-key": secrets.API_KEY,
  },
});

export default Client;
