import {
  buildSiteOutages,
} from "./src/helpers/dataProcessing/dataProcessing";
import getOutages from "./src/requests/getOutages";
import getSiteInfo from "./src/requests/getSiteInfo";
import postSiteOutages from "./src/requests/postSiteOutages";

async function main(): Promise<void> {
    const siteId = "norwich-pear-tree";

    // Fetch the outages and site information
    const [outages, siteInfo] = await Promise.all([
      getOutages(),
      getSiteInfo(siteId),
    ]);

    //Filter outages for ID and time
    const cutOffTime = new Date("2022-01-01T00:00:00.000Z");
    const siteOutages = buildSiteOutages(siteInfo, outages, cutOffTime);

    // Post the site outages
    console.log("Result to post:\n", siteOutages);
    postSiteOutages(siteOutages, siteId);

    console.log("Done 🐙");
}

main();
