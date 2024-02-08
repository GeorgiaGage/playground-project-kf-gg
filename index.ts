import {
  extractDeviceIds,
  buildSiteOutages,
} from "./src/helpers/dataProcessing/dataProcessing";
import getOutages from "./src/requests/getOutages";
import getSiteInfo from "./src/requests/getSiteInfo";
import postSiteOutages from "./src/requests/postSiteOutages";

async function main(): Promise<void> {
  try {
    const siteId = "norwich-pear-tree";

    const [outages, siteInfo] = await Promise.all([
      getOutages(),
      getSiteInfo(siteId),
    ]);

    //Filter outages for ID and time
    const cutOffTime = new Date("2022-01-01T00:00:00.000Z");
    const siteOutages = buildSiteOutages(siteInfo, outages, cutOffTime);

    console.log("result: ", siteOutages);
    postSiteOutages(siteOutages, siteId);

    //Extra stuff:
    //Console interactive?
    //Tidy
    //Double or single quotes?
    //import orders
    // Condense test data into one file?
    // Store api key somewhere safe
  } catch (error) {
    console.log("Something went badly wrong, please try again later");
  }
}

main();
