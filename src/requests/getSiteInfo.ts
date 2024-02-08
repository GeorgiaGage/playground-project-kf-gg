import axios, { AxiosError, HttpStatusCode } from "axios";
import Client from "./Client";
import { handleRequestErrors } from "./getOutages";
import SiteInfo from "../types/SiteInfo";

//TODO: sort typing on method signature
async function getSiteInfo(siteId: string): Promise<any> {
  console.log("Fetching site info...");
  try {
    const response = await Client.get(`/site-info/${siteId}`);
    console.log("Site info: ", response.data);
    return response.data as SiteInfo;
  } catch (error) {
    handleRequestErrors(error);
  }
}

export default getSiteInfo;
