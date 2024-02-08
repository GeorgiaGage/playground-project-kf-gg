import getOutages from "./src/requests/getOutages";
import getSiteInfo from "./src/requests/getSiteInfo";

async function main(): Promise<void> {
  console.log("hello world");
  getSiteInfo();
}

main();
