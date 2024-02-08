import DeviceId from "./DeviceId";
import Outage from "./Outage";

type SiteOutage = {
  name: string;
  id: DeviceId;
  begin: string;
  end: string;
};

export default SiteOutage;
