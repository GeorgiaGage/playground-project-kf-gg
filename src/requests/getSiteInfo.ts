import client from "./client";
import SiteInfo from "../types/SiteInfo";
import { handleRequestErrors } from "../helpers/errorHandling/errorHandling";
import { siteInfo } from "../test-data/siteInfo";

//TODO: sort typing on method signature
async function getSiteInfo(siteId: string): Promise<any> {
  console.log("Fetching site info...");
  try {
    const response = await client.get(`/site-info/${siteId}`);
    console.log("Site info: ", siteInfo);
    return response.data as SiteInfo;
  } catch (error) {
    handleRequestErrors(error);
  }
}

export default getSiteInfo;
