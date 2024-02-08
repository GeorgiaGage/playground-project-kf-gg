import { handleRequestErrors } from "../helpers/errorHandling/errorHandling";
import SiteOutage from "../types/SiteOutage";
import client from "./client";

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
    console.log(response.data);
  } catch (error) {
    handleRequestErrors(error);
  }
}

export default postSiteOutages;
