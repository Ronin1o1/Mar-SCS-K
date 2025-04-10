import React, { useState } from "react";
import { initialPayload } from "../../../../common/components/filter/context/FilterContext";
import API from "../service/API";

interface IGPPPGOOSMaintenanceContext {
  getHotelPGOOSList: (requestPayload: any, orderBy?: number) => void;
  getHotelPGOOSListDup: (requestPayload: any, orderBy?: number) => void;
  panelData: any;
  isMakingRequest: boolean;
  getHotelPGOOSFindFilter: () => void;
  PGOOSFindFilterData: any;
  getRemovalReason: (item: any) => void;
  removalReason: any;
  getShowOptions: () => void;
  showFilterOptions: any;
  isMakingDetailRequest: boolean;
  storeRequestPayload: any;
  setStoreRequestPayload: (requestPayload: any) => void;
  setIsMakingRequest: (isRequest: boolean) => void;
  saveRequestPayload: any;
  setSaveRequestPayload: (data: any) => void;
  saveUpdateReason: () => void;
  checkInitialLoad: boolean;
  setSaveUpdateReasonData: (data: any) => void;
  saveUpdateReasonData: any;
}

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const GPPPGOOSMaintenanceContext = React.createContext(
  {} as IGPPPGOOSMaintenanceContext
);

export default GPPPGOOSMaintenanceContext;
export const initialUpdatePayload = {
  hotelid: 0,
  pgoos: "",
  removalreasonid: 0,
  changed: "N",
};
/**
 * Context provider
 *
 * @param props
 */
export const GPPPGOOSMaintenanceContextProvider = (props) => {
  const [panelData, setPanelData] = useState([]);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [PGOOSFindFilterData, setPGOOSFindFilter] = useState([]);
  const [removalReason, setRemovalReason] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  // eslint-disable-next-line
  const [isMakingDetailRequest] = useState(false);
  const [storeRequestPayload, setStoreRequestPayload] =
    useState(initialPayload);

  const [checkInitialLoad, setCheckInitialLoad] = useState(false);
  const [saveRequestPayload, setSaveRequestPayload] = useState([]);
  const [saveUpdateReasonData, setSaveUpdateReasonData] =
    useState(initialUpdatePayload);

  const getHotelPGOOSListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getHotelPGOOSList(requestPayload);
  };
  const getHotelPGOOSList = (requestPayload, orderBy = 0) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("pgs_Stat", JSON.stringify(requestPayload));

    setIsMakingRequest(true);
    const requestPayloadData = {
      ...requestPayload,
      strFilterValues: {
        ...requestPayload.strFilterValues,
        orderBy: orderBy,
      },
    };
    setStoreRequestPayload(requestPayloadData);
    API.getHotelPGOOSList(requestPayloadData)
      .then((data) => {
        // setPanelData([]);
        setCheckInitialLoad(true);
        setIsMakingRequest(false);
        localStorage.setItem("panelDataToCompare", JSON.stringify(data));
        setPanelData(data);
      })
      .catch((error) => {
        setCheckInitialLoad(true);

        setIsMakingRequest(false);
      });
  };

  const getHotelPGOOSFindFilter = () => {
    API.getGPPPGOOSMaintFindFilter().then((data) => {
      setPGOOSFindFilter(data);
    });
  };

  const getRemovalReason = (item: any) => {
    setRemovalReason([]);
    API.getRemovalReason(item).then((data) => {
      setRemovalReason(data);
    });
  };

  const getShowOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const saveUpdateReason = () => {
    setIsMakingRequest(true);
    API.updateReason(saveUpdateReasonData, storeRequestPayload)
      .then(() => {
        getHotelPGOOSList(storeRequestPayload);
      })
      .catch((error) => {
        setIsMakingRequest(false);
      });
  };

  const GPPPGOOSMaintenanceValue = {
    getHotelPGOOSList,
    getHotelPGOOSListDup,
    panelData,
    isMakingRequest,
    getHotelPGOOSFindFilter,
    PGOOSFindFilterData,
    getRemovalReason,
    removalReason,
    getShowOptions,
    showFilterOptions,
    isMakingDetailRequest,
    storeRequestPayload,
    setStoreRequestPayload,
    setIsMakingRequest,
    saveRequestPayload,
    setSaveRequestPayload,
    checkInitialLoad,
    setSaveUpdateReasonData,
    saveUpdateReason,
    saveUpdateReasonData,
  };

  return (
    <GPPPGOOSMaintenanceContext.Provider value={GPPPGOOSMaintenanceValue}>
      {props.children}
    </GPPPGOOSMaintenanceContext.Provider>
  );
};
