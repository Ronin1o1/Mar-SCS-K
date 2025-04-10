import React, { useState } from "react";
import { initialPayload } from "../../../../common/components/filter/context/FilterContext";
import API from "../service/API";

interface IHotelPGOOSMaintenanceContext {
  getHotelPGOOSList: (requestPayload: any, orderBy?: number) => void;
  panelData: any;
  isMakingRequest: boolean;
  getHotelPGOOSFindFilter: () => void;
  PGOOSFindFilterData: any;
  getRemovalReason: (isAerRemoval: boolean) => void;
  removalReason: any;
  getShowOptions: () => void;
  showFilterOptions: any;
  getPGOOSAuditTrailDetail: (data: any) => void;
  PGOOSAuditTrailDetail: any;
  isMakingDetailRequest: boolean;
  storeRequestPayload: any;
  setStoreRequestPayload: (requestPayload: any) => void;
  setIsMakingRequest: (isRequest: boolean) => void;
  saveRequestPayload: any;
  setSaveRequestPayload: (data: any) => void;
  save: () => void;
  checkInitialLoad: boolean;
}

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const HotelPGOOSMaintenanceContext = React.createContext(
  {} as IHotelPGOOSMaintenanceContext
);

export default HotelPGOOSMaintenanceContext;

const saveInitialPayload = {
  formChg: "Y",
  numItems: 0,
  period: 0,
  strHotelPGOOSListData: [],
};

/**
 * Context provider
 *
 * @param props
 */
export const HotelPGOOSMaintenanceContextProvider = (props) => {
  const [panelData, setPanelData] = useState([]);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [PGOOSFindFilterData, setPGOOSFindFilter] = useState([]);
  const [removalReason, setRemovalReason] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [PGOOSAuditTrailDetail, setPGOOSAuditTrailDetail] = useState([]);
  const [isMakingDetailRequest, setIsMakingDetailRequest] = useState(false);
  const [storeRequestPayload, setStoreRequestPayload] =
    useState(initialPayload);

  const [checkInitialLoad, setCheckInitialLoad] = useState(false);

  const [saveRequestPayload, setSaveRequestPayload] =
    useState(saveInitialPayload);

  const getHotelPGOOSList = (requestPayload, orderBy: number = 0) => {
    setIsMakingRequest(true);
    const requestPayloadData = {
      ...requestPayload,
      strFilterValues: {
        ...requestPayload.strFilterValues,
        orderBy: orderBy,
      },
    };
     setPanelData([]);
    setStoreRequestPayload(requestPayloadData);
    API.getHotelPGOOSList(requestPayloadData)
      .then((data) => {
        setCheckInitialLoad(data.length === 0);
        setIsMakingRequest(false);
         setPanelData([]);
        localStorage.setItem("panelDataToCompare", JSON.stringify(data));
        setPanelData(data);
      })
      .catch((error) => {
        setCheckInitialLoad(true);
        
        setIsMakingRequest(false);
      });
  };

  const getHotelPGOOSFindFilter = () => {
    API.getHotelPGOOSFindFilter().then((data) => {
      setPGOOSFindFilter(data);
    });
  };

  const getRemovalReason = (isAerRemoval: boolean) => {
    setRemovalReason([]);
    API.getRemovalReason(isAerRemoval).then((data) => {
      setRemovalReason(data);
    });
  };

  const getShowOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const getPGOOSAuditTrailDetail = (marshaCode) => {
    setIsMakingDetailRequest(true);
    const payload = {
      marshaCode: marshaCode,
      period: storeRequestPayload.strFilterValues.year,
    };
    API.getPGOOSAuditTrailDetail(payload).then((data) => {
      setPGOOSAuditTrailDetail(data);
      setIsMakingDetailRequest(false);
    });
  };

  const save = () => {
    setIsMakingRequest(true);
    API.saveData({
      ...saveRequestPayload,
      period: storeRequestPayload.strFilterValues.year,
      numItems: panelData.length,
    })
      .then((data) => {
        setIsMakingRequest(false);
        getHotelPGOOSList(storeRequestPayload);
      })
      .catch((error) => {
        setIsMakingRequest(false);
      });
  };

  const hotelPGOOSMaintenanceContext = {
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
    isMakingDetailRequest,
    storeRequestPayload,
    setStoreRequestPayload,
    setIsMakingRequest,
    saveRequestPayload,
    setSaveRequestPayload,
    save,
    checkInitialLoad,
  };

  return (
    <HotelPGOOSMaintenanceContext.Provider value={hotelPGOOSMaintenanceContext}>
      {props.children}
    </HotelPGOOSMaintenanceContext.Provider>
  );
};
