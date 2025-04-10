import React from "react";

import SelectHotelPricing from "../../../../../shared/components/SelectHotelPricing";
import TabViewPanel from "../../RoomPool/content/TabViewPanel";

function SelectHotelComponent(parms) {
  return (
    <>
      <TabViewPanel
        moduleName="RoomDescription"
        componentName="selectHotelComponent"
        conditional="off"
      ></TabViewPanel>
      <SelectHotelPricing
        title={"Room Description : Hotel - Selection"}
      ></SelectHotelPricing>
    </>
  );
}
export default SelectHotelComponent;
