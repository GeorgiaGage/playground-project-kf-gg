import axios, { AxiosError, HttpStatusCode } from "axios";
import Client from "./Client";

async function getSiteInfo(): Promise<
  { data: {}; status: HttpStatusCode } | AxiosError | Error
> {
  const siteId = "norwich-pear-tree";
  console.log("Fetching site info...");
  try {
    const response = await Client.get(`/site-info/${siteId}`);
    console.log("Site info: ", response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios Error: ", error.message);
      return error;
    } else {
      console.log("Error: ", error);
      return new Error("Something went wrong fetching outages");
    }
  }
}

export default getSiteInfo;
