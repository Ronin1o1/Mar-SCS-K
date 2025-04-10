import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import GPPPGOOSMaintenanceContext from "../context/GPPPGOOSMaintenanceContext";
import styles from "../../../../common/assets/css/commonBase.css";
import { HotelGPPPGOOSRightPanel } from "./HotelGPPPGOOSRightPanel";
import Settings from "../settings/Settings";
import CPageTitle from "../../../../common/components/CPageTitle";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function GPPPGOOSMaintenance() {
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
    setStoreRequestPayload,
    //saveRequestPayload,
    getHotelPGOOSListDup,
  } = useContext(GPPPGOOSMaintenanceContext);

  useEffect(() => {
    getShowOptions();
    getHotelPGOOSFindFilter();
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getHotelPGOOSListDup(localStorage.getItem("pgs_Stat"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("pgs_Stat");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("pgs_Stat");
    };
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

  return (
    <div>
      <div>
        <CPageTitle
          title={"Pricing PGOOS : Hotel GPP PGOOS Maintenance"}
        ></CPageTitle>
        <table style={{ marginTop: "-5px", display: "block" }}>
          <tbody style={{ display: "block" }}>
            <tr id="filterTR" style={{ display: "flex" }}>
              <td className={"leftpanel"}>
                <Filter
                  getPanelData={getHotelPGOOSList}
                  findFilters={PGOOSFindFilterData}
                  showOptions={showFilterOptions}
                  isMakingRequest={isMakingRequest}
                  filterViewLists={Settings.api.getFilterViewLists}
                  numItems={panelData?.length}
                  save={() => { }}
                  componentName={"hotelGPPPGOOSMaintenance"}
                  setRequestPayload={setStoreRequestPayload}
                  height={"calc(100vh - 100px)"}
                  isAccountRequired={true}
                />
              </td>
              <td className={"rightpanel"}>
                <div className={styles.hpprightpanelgrid}>
                  <HotelGPPPGOOSRightPanel
                    panelData={panelData}
                    isMakingRequest={isMakingRequest}
                    removalReasonFunc={getRemovalReason}
                    removalReason={removalReason}
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
        height: calc(100vh - 150px) !important;
      }
      .rightpanel{
        width:calc(100vw - 300px);
        overflow:auto;
        display:block;
        border-top: 2px solid #aca899;
        border-left: 2px solid #aca899;
        margin-top:29px;
      }
      .leftpanel{
        width:300px;
      }
      @media only screen and (max-width: 1175px){
        #gridNode{
          height: calc(100vh - 166px) !important;
        }
        .footerwidget{
          position:fixed;
        }
      }
      `}</style>
    </div>
  );
}
