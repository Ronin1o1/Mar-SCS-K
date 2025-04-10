import React, { useState } from "react";
import { initialPayload } from "../../../common/components/filter/context/FilterContext";
import API from "../service/API";

interface IPropertyListContext {
  getHotelPropertyList: (requestPayload: any, orderBy?: number) => void;
  panelData: any;
  isMakingRequest: boolean;
  getPropertyListFindFilter: () => void;
  FindFilterData: any;

  getShowOptions: () => void;
  showFilterOptions: any;
  isMakingDetailRequest: boolean;
  storeRequestPayload: any;
  setStoreRequestPayload: (requestPayload: any) => void;
  setIsMakingRequest: (isRequest: boolean) => void;
  checkInitialLoad: boolean;
}

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const PropertyListContext = React.createContext({} as IPropertyListContext);

export default PropertyListContext;

/* const saveInitialPayload = {
  formChg: "Y",
  numItems: 0,
  period: 0,
  strHotelPGOOSListData: [],
}; */

/**
 * Context provider
 *
 * @param props
 */
export const PropertyListContextProvider = (props) => {
  const [panelData, setPanelData] = useState([]);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [FindFilterData, setFindFilter] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [isMakingDetailRequest] = useState(false);
  const [storeRequestPayload, setStoreRequestPayload] =
    useState(initialPayload);

  const [checkInitialLoad, setCheckInitialLoad] = useState(false);

  // const [saveRequestPayload, setSaveRequestPayload] =
  //   useState(saveInitialPayload);

  const getHotelPropertyList = (requestPayload, orderBy = 0) => {
    setIsMakingRequest(true);
    const requestPayloadData = {
      ...requestPayload,
      strFilterValues: {
        ...requestPayload.strFilterValues,
        orderBy: orderBy,
      },
    };
    setStoreRequestPayload(requestPayloadData);
    API.getHotelPropertyList(requestPayloadData)
      .then((data) => {
        // setPanelData([]);
        if (data === "error") {
          setPanelData([]);
        } else {
          setCheckInitialLoad(data.length === 0);
          localStorage.setItem("panelDataToCompare", JSON.stringify(data));
          setPanelData(data);
        }
        setIsMakingRequest(false);
      })
      .catch((error) => {
        setPanelData([]);

        setCheckInitialLoad(true);

        setIsMakingRequest(false);
      });
  };

  const getPropertyListFindFilter = () => {
    API.getPropertyListFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getShowOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const hotelPropertyListContext = {
    getHotelPropertyList,
    panelData,
    isMakingRequest,
    getPropertyListFindFilter,
    FindFilterData,
    getShowOptions,
    showFilterOptions,
    isMakingDetailRequest,
    storeRequestPayload,
    setStoreRequestPayload,
    setIsMakingRequest,
    checkInitialLoad,
  };

  return (
    <PropertyListContext.Provider value={hotelPropertyListContext}>
      {props.children}
    </PropertyListContext.Provider>
  );
};
