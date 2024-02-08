import { extractDeviceIds, filterOutages } from "./src/helpers/dataProcessing";
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
    const deviceIds = extractDeviceIds(siteInfo);

    //Filter outages for ID and time
    const cutOffTime = new Date("2022-01-01T00:00:00.000Z");
    const filteredOutages = filterOutages(deviceIds, outages, cutOffTime);

    console.log("result: ", filteredOutages);

    //Extra shit:
    //Handle time outs
    //Handle retries
    //Efficiency - asynchronousity
    //Make it resillient
    //Conolse interactive?
  } catch (error) {
    console.log("Something went badly wrong, please try again later");
  }
}

main();
