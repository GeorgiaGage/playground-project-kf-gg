import client from "./client";
import SiteInfo from "../types/SiteInfo";
import { buildError } from "../helpers/errorHandling/errorHandling";

//TODO: sort typing on method signature
async function getSiteInfo(siteId: string): Promise<SiteInfo> {
  console.log("Fetching site info...");
  try {
    const response = await client.get(`/site-info/${siteId}`);
    // console.log("Site info: ", response.data);
    return response.data as SiteInfo;
  } catch (error) {
    throw buildError(error);
  }
}

export default getSiteInfo;
