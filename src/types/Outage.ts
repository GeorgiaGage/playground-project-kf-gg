import DeviceId from "./DeviceId";

type Outage = {
  id: DeviceId;
  begin: string;
  end: string;
};

export default Outage;
