import client from "./client";
import SiteInfo from "../types/SiteInfo";

//TODO: sort typing on method signature
async function getSiteInfo(siteId: string): Promise<any> {
  console.log("Fetching site info...");
  try {
    const response = await client.get(`/site-info/${siteId}`);

    console.log("Site info: ", response.data);
    return response.data as SiteInfo;
  } catch (error) {
    console.log("Error: ");
  }
}

export default getSiteInfo;
