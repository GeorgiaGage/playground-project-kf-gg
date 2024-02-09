import DeviceId from "./DeviceId";

type SiteOutage = {
  name: string;
  id: DeviceId;
  begin: string;
  end: string;
};

export default SiteOutage;
