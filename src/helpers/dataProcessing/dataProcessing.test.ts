import { outages } from "../../test-data/outages";
import { siteInfo, siteInfo_noMatch } from "../../test-data/siteInfo";
import { siteOutages } from "../../test-data/siteOutages";
import { extractDeviceIds, buildSiteOutages, createDeviceMap } from "./dataProcessing";

describe("getDeviceIdList", () => {
  it("should return a list of IDs from a list of SiteInfo", () => {
    const result = extractDeviceIds(siteInfo.devices);
    const expected = [siteInfo.devices[0].id, siteInfo.devices[1].id];
    expect(result).toEqual(expected);
  });
});

describe("getRecentOutages", () => {
  const cutOffTime = new Date("2022-07-11T00:00:00.000Z");

  it("should return a correct list of site outages filtered for time and device id", () => {
    const result = buildSiteOutages(siteInfo, outages, cutOffTime);
    expect(result).toEqual(siteOutages);
  });

  it("should return an empty list if none of the site IDs match the outages", () => {
    const result = buildSiteOutages(siteInfo_noMatch, outages, cutOffTime);
    expect(result).toEqual([]);
  });

  it("should return an empty list if none of the outage dates are after the cutoff", () => {
    const earlyCutOffTime = new Date("2026-07-11T00:00:00.000Z");
    const result = buildSiteOutages(siteInfo, outages, earlyCutOffTime);
    expect(result).toEqual([]);
  });
});

describe("createDeviceMap", () => {
  it("should create a map of ID and name given a list of devices", () => {
    const devices = siteInfo.devices;
    const result = createDeviceMap(devices);
    expect(result.get(devices[0].id)).toEqual(devices[0].name);
    expect(result.get(devices[1].id)).toEqual(devices[1].name);
  })
})
