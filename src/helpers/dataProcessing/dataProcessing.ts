import Device from "../../types/Device";
import DeviceId from "../../types/DeviceId";
import Outage from "../../types/Outage";
import SiteInfo from "../../types/SiteInfo";
import SiteOutage from "../../types/SiteOutage";

/**
 * Filters out the outages for a set of devices and before a start time and creates an array of site outages
 * @param devices
 * @param outages
 * @param cutOffTime
 * @returns SiteOutage[]
 */
export function buildSiteOutages(
  siteInfo: SiteInfo,
  outages: Outage[],
  cutOffTime: Date
): SiteOutage[] {
  const devices = siteInfo.devices;
  const deviceMap = createDeviceMap(devices);
  const siteOutages: SiteOutage[] = [];

  // Cycle through all the outages
  for (let i = 0; i < outages.length; i++) {
    // Find outages that began after 2022-01-01T00:00:00.000Z
    if (
      new Date(outages[i].begin) > cutOffTime &&
      extractDeviceIds(devices).includes(outages[i].id)
    ) {
      // Find the name of the device
      const siteOutage = {
        name: deviceMap.get(outages[i].id),
        ...outages[i],
      } as SiteOutage;
      siteOutages.push(siteOutage);
    }
  }

  return siteOutages;
}

/**
 * Extracts the device IDs belonging to a site
 * @param devices
 * @returns Device[]
 */
export function extractDeviceIds(devices: Device[]): DeviceId[] {
  console.log("DEVICES: ", devices);
  return devices.map((device) => {
    return device.id;
  });
}

/**
 * Creates a map of device IDs for device names - ['id', 'name']
 * @param devices
 * @returns Map<string, string>
 */
export function createDeviceMap(devices: Device[]): Map<string, string> {
  const deviceMap: Map<string, string> = new Map();
  devices.map((device) => {
    deviceMap.set(device.id, device.name);
  });

  return deviceMap;
}
