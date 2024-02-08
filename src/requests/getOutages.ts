import axios, { Axios, AxiosError, HttpStatusCode } from "axios";
import Client from "./Client";
import Outage from "../types/Outage";

//TODO: come back for better error handling
//TODO: test and move
export async function handleRequestErrors(error: any) {
  if (axios.isAxiosError(error)) {
    console.log("Axios Error:\n", { error });
    throw(error);
  } else {
    console.log("Error:\n", { error });
    throw(error);
  }
}
// This should do the bare minimum to wrap around the API
// TODO: sort out Promise<any>
async function getOutages(): Promise<any> {
  console.log("Fetching outages...");
  try {
    const response = await Client.get("/outages");

    // If the contract changes, this line will break
    return response.data as Outage[];
  } catch (error) {
    handleRequestErrors(error);
  }
}

export default getOutages;
