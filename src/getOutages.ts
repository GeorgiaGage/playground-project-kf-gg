import axios from "axios";

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

function getOutages(): void {
  console.log("Fetching outages...");
  instance
    .get("/outages")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default getOutages;
