import axios, { AxiosError, HttpStatusCode } from "axios";
import Client from "./Client";

// This should do the bare minimum to wrap around the API
async function getOutages(): Promise<
  { data: {}; status: HttpStatusCode } | AxiosError | Error
> {
  console.log("Fetching outages...");
  try {
    const response = await Client.get("/outages");
    console.log("Outages: ", response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) { //TODO: could refactor this out in a function?
      console.log("Axios Error: ", error.message);
      return error;
    } else {
      console.log("Error: ", error);
      return new Error("Something went wrong fetching outages");
    }
  }
}

export default getOutages;
