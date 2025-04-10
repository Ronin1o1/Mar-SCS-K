import React, { useContext, useEffect, useState } from "react";
import { Filter } from "../../../common/components/filter/Filter";
import PropertyListContext from "../context/PropertyListContext";
import { FilterRightPanel } from "./FilterRightPanel";
import styles from "./PropertyList.css";
import { isEqual } from "lodash";
import Settings from "../static/Settings";
import NewWindow from "react-new-window";
import CPageTitle from "../../../common/components/CPageTitle";
import rfplogo_new from "../../../../images/rfplogo_new.gif";

export const PropertyList: React.FC = () => {
  const [showSubNav, setShowSubNav] = useState(true);
  const {
    getHotelPropertyList,
    panelData,
    isMakingRequest,
    getPropertyListFindFilter,
    FindFilterData,
    getShowOptions,
    showFilterOptions,
    setStoreRequestPayload,
  } = useContext(PropertyListContext);

  useEffect(() => {
    getShowOptions();
    getPropertyListFindFilter();
    localStorage.removeItem("panelDataToCompare");
    const url = window.location.href.split("/");
    const urlIndex = url.length - 1;
    const endPoint = url[urlIndex];
    if (endPoint === "propertylist") {
      setShowSubNav(false);
    }
  }, []);

  const handleRetrieveList = (requestPayload) => {
    const panelDataToCompare =
      localStorage.getItem("panelDataToCompare") || JSON.stringify([]);
    if (isEqual(panelDataToCompare, JSON.stringify(panelData))) {
      getHotelPropertyList(requestPayload);
    } else {
      if (
        window.confirm(
          "Your data has not been saved. Press OK to continue and CANCEL to stop."
        )
      ) {
        getHotelPropertyList(requestPayload);
      }
    }
  };

  return (
    // <NewWindow features={{ width: 1500, height: 1000 }} title="[MarRFP]">
    <div className={styles.MainContainer}>
      <div className={styles.BedTypeContainer} style={{paddingLeft:"5px"}}>
        <div className={"propertylistlogo"}>
         <a> <img  src={rfplogo_new} alt="LOGO" /></a>
        </div>
        <table className={styles.fullHeight}>
          <CPageTitle
            title={"Pricing : Property List"}
            showSubNav={showSubNav}
          ></CPageTitle>
        </table>
        <table className={styles.fullHeight}>
          <tbody>
            <tr id="filterTR">
              <Filter
                getPanelData={handleRetrieveList}
                findFilters={FindFilterData}
                showOptions={showFilterOptions}
                isMakingRequest={isMakingRequest}
                filterViewLists={Settings.api.getFilterViewLists}
                numItems={panelData?.length}
                componentName={"hotelPropertyList"}
                setRequestPayload={setStoreRequestPayload}
                isDisplayTwoGridFilter={false}
                height={"calc(100vh - 170px)"}
                isAccountRequired={false}
              />

              <FilterRightPanel
                panelData={panelData}
                isMakingRequest={isMakingRequest}
                setStoreRequestPayload={setStoreRequestPayload}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    // </NewWindow>
  );
};
