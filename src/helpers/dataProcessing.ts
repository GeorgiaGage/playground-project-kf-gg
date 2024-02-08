import DeviceId from "../types/DeviceId";
import Outage from "../types/Outage";
import SiteInfo from "../types/SiteInfo";

// Extracts the device IDs belonging to a site
export function extractDeviceIds(siteInfo: SiteInfo): DeviceId[] {
  return siteInfo.devices.map((device, id) => {
    return device.id;
  });
}

export function filterOutages(
  deviceIds: DeviceId[],
  outages: Outage[],
  cutOffTime: Date
): Outage[] {
  const result: Outage[] = [];

  // Cycle through all the outages
  for (let i = 0; i < outages.length; i++) {
    // Find outages that began before 2022-01-01T00:00:00.000Z
    if (
      new Date(outages[i].begin) < cutOffTime &&
      deviceIds.includes(outages[i].id)
    ) {
      result.push(outages[i]);
    }
  }

  return result;
}
