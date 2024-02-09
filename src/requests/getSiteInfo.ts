import client from "./axiosClient";
import SiteInfo from "../types/SiteInfo";
import { buildError } from "../helpers/errorHandling/errorHandling";

async function getSiteInfo(siteId: string): Promise<SiteInfo> {
  console.log("Fetching site info...");
  try {
    const response = await client.get(`/site-info/${siteId}`);
    return response.data as SiteInfo;
  } catch (error) {
    throw buildError(error);
  }
}

export default getSiteInfo;
