import client from "./client";
import Outage from "../types/Outage";
import { handleRequestErrors } from "../helpers/errorHandling/errorHandling";



// This should do the bare minimum to wrap around the API
// TODO: sort out Promise<any>
async function getOutages(): Promise<any> {
  console.log("Fetching outages...");
  try {
    const response = await client.get("/outages");

    // If the contract changes, this line will break
    return response.data as Outage[];
  } catch (error) {
    handleRequestErrors(error);
  }
}

export default getOutages;
