import {
  extractDeviceIds,
  buildSiteOutages,
} from "./src/helpers/dataProcessing/dataProcessing";
import getOutages from "./src/requests/getOutages";
import getSiteInfo from "./src/requests/getSiteInfo";

async function main(): Promise<void> {
  try {
    const siteId = "norwich-pear-tree";
    const [outages, siteInfo] = await Promise.all([
      getOutages(),
      getSiteInfo(siteId),
    ]);

    //Extract device IDs
    // const deviceIds = extractDeviceIds(siteInfo);

    //Filter outages for ID and time
    const cutOffTime = new Date("2022-01-01T00:00:00.000Z");
    const filteredOutages = buildSiteOutages(siteInfo, outages, cutOffTime);

    console.log("result: ", filteredOutages);

    //Extra stuff:
    //Console interactive?
    //Tidy
    //Double or single quotes?
    //import orders
  } catch (error) {
    console.log("Something went badly wrong, please try again later");
  }
}

main();
