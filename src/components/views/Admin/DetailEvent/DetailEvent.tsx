import { Tabs, Tab } from "@heroui/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";

function DetailEvent() {
  const { dataEvent } = useDetailEvent();
  return (
    <Tabs aria-label="Option">
      <Tab key="icon" title="Icon">
        <CoverTab currentIcon={dataEvent?.icon} />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab dataEvent={dataEvent} />
      </Tab>
    </Tabs>
  );
}

export default DetailEvent;
