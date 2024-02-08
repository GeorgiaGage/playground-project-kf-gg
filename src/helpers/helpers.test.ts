import { outages, filteredOutages } from "../dummy-data/outages";
import { siteInfo, deviceIds } from "../dummy-data/siteInfo";
import { extractDeviceIds, filterOutages } from "./helpers";

describe("getDeviceIdList", () => {
  it("should return a list of IDs from a list of SiteInfo", () => {
    const result = extractDeviceIds(siteInfo);
    const expected = [siteInfo.devices[0].id, siteInfo.devices[1].id];
    expect(result).toEqual(expected);
  });
});

describe("getRecentOutages", () => {
  const cutOffTime = new Date("2022-07-11T00:00:00.000Z");

  it("should return a correct list of outages filtered for time and device id", () => {
    const result = filterOutages(deviceIds, outages, cutOffTime);
    expect(result).toEqual(filteredOutages);
  });
});
