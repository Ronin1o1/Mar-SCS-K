import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import HotelPGOOSMaintenanceContext from "../context/HotelPGOOSMaintenanceContext";
import { labels } from "../static/labels";
import { FilterRightPanel } from "./FilterRightPanel";

import styles from "./HotelPGOOSMaintenance.css";
import { isEqual } from "lodash";
import Settings from "../static/Settings";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const HotelPGOOSMaintenance: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const {
    getHotelPGOOSList,
    panelData,
    isMakingRequest,
    getHotelPGOOSFindFilter,
    PGOOSFindFilterData,
    getRemovalReason,
    removalReason,
    getShowOptions,
    showFilterOptions,
    getPGOOSAuditTrailDetail,
    PGOOSAuditTrailDetail,
    setStoreRequestPayload,
    save,
    saveRequestPayload,
  } = useContext(HotelPGOOSMaintenanceContext);

  useEffect(() => {
    getShowOptions();
    getHotelPGOOSFindFilter();
    getRemovalReasonData(false);
    localStorage.removeItem("panelDataToCompare");
  }, []);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });
  const getRemovalReasonData = (isAreaRemoval: boolean) => {
    getRemovalReason(isAreaRemoval);
  };

  const handleSave = () => {
    const isPGOOSAlert = saveRequestPayload.strHotelPGOOSListData.find(
      (item) => item.pgoos === "N" && item.removalreason === labels.noReason
    );

    const isAerpgoosAlert = saveRequestPayload.strHotelPGOOSListData.find(
      (item) =>
        item.aerpgoos === "N" &&
        item.excludeaer === "N" &&
        item.aerremovalreason === labels.noReason
    );
    if (isPGOOSAlert?.hotelid || isAerpgoosAlert?.hotelid) {
      let mCode = "";
      if (isAerpgoosAlert?.hotelid) {
        mCode = isAerpgoosAlert?.marshaCode;
        alert("Please select a GPP PGOOS removal reason for: " + mCode);
      } else {
        mCode = isPGOOSAlert?.marshaCode;
        alert("Please select a PGOOS removal reason for: " + mCode);
      }
    } else {
      save();
    }
  };

  const handleRetrieveList = (requestPayload) => {
    const panelDataToCompare =
      localStorage.getItem("panelDataToCompare") || JSON.stringify([]);
    if (isEqual(panelDataToCompare, JSON.stringify(panelData))) {
      getHotelPGOOSList(requestPayload);
    } else {
      if (
        window.confirm(
          "Your data has not been saved. Press OK to continue and CANCEL to stop."
        )
      ) {
        getHotelPGOOSList(requestPayload);
      }
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.BedTypeContainer}>
        <table className={styles.fullHeight} style={{ marginBottom: "5px" }}>
          <tr>
            <td className={styles.header}>
              Pricing Administration : Hotel PGOOS Maintenance
            </td>
          </tr>
          <tr className="BGDarkBlueStyle">
            <td style={{ height: 2 }} valign="top"></td>
          </tr>
          <tr style={{ height: "2" }}>
            <td></td>
          </tr>
        </table>
        <table className={styles.fullHeight}>
          <tbody>
            <tr id="filterTR">
              <td className={styles.leftfilterpanel}>
                <Filter
                  getPanelData={handleRetrieveList}
                  isMakingRequest={isMakingRequest}
                  findFilters={PGOOSFindFilterData}
                  showOptions={showFilterOptions}
                  filterViewLists={Settings.api.getFilterViewLists}
                  numItems={panelData?.length}
                  save={handleSave}
                  componentName={"hotelPGOOSMaintenance"}
                  setRequestPayload={setStoreRequestPayload}
                  height={574}
                  isAccountRequired={false}
                />
              </td>
              <td className={styles.rightgridpanel}>
                <div className={styles.hotelpogogrid}>
                  <FilterRightPanel
                    panelData={panelData}
                    isMakingRequest={isMakingRequest}
                    removalReasonFunc={getRemovalReasonData}
                    removalReason={removalReason}
                    getPGOOSAuditTrailDetail={getPGOOSAuditTrailDetail}
                    PGOOSAuditTrailDetail={PGOOSAuditTrailDetail}
                    setStoreRequestPayload={setStoreRequestPayload}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style>{`
      #filterdiv{
        height:calc(100vh - 145px) !important;
      }
      #panelCurrentRow td:last-child{
        width:94px !important;
        min-width:94px !important;
      }
      #loading{
        width:903px !important;
        height: calc(100vh - 180px) !important;
        top:87px !important;
      }
      @media only screen and (max-width: 1210px){
        #gridNode{
          height: calc(100vh - 170px) !important;
        }
        #gridView{
          height: calc(100vh - 201px) !important;
        }
        .page_body_container {
          min-height: calc(100vh - 90px) !important;
        }
      }

      `}</style>
    </div>
  );
};
