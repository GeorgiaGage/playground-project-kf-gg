import client from "./axiosClient";
import Outage from "../types/Outage";
import { buildError } from "../helpers/errorHandling/errorHandling";

async function getOutages(): Promise<Outage[]> {
  console.log("Fetching outages...");
  try {
    const response = await client.get("/outages");
    return response.data as Outage[];
  } catch (error) {
    throw buildError(error);
  }
}

export default getOutages;
