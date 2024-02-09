import { buildError } from "../helpers/errorHandling/errorHandling";
import SiteOutage from "../types/SiteOutage";
import client from "./axiosClient";

// This endpoint is broken I believe
async function postSiteOutages(
  siteOutages: SiteOutage[],
  siteId: string
): Promise<any> {
  console.log("Posting site outages...");
  try {
    const response = await client.post(
      `/site-outages/${siteId}`,
      JSON.stringify(siteOutages)
    );
    console.log("Response: ", response.data);
  } catch (error) {
    throw buildError(error);
  }
}

export default postSiteOutages;
