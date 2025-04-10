import React, { useState } from "react";
import API from "../service/API";
import { initialPayload } from "../../../../common/components/filter/context/FilterContext";

interface iPortfolioAcceptancesContext {
  getShowOptions: () => void;
  showFilterOptions: any;
  getPortfolioStatusList: (
    requestPayload: any,
    accDetails?: any,
    orderBy?: number
  ) => void;
  getPortfolioStatusListDup: (
    requestPayload: any,
    accDetails?: any,
    orderBy?: number
  ) => void;
  panelData: any;
  setStoreRequestPayload: (requestPayload: any) => void;
  isMakingRequest: boolean;
  storeRequestPayload: any;
  rejectionReasonList: any;
  getRejectionReason: () => void;
  removalReasonList: any;
  getRemovalReason: () => void;
  FindFilterData: any;
  getPortfolioStatusFindFilter: () => void;
  ajaxSave: (data: any) => void;
  ajaxIsMakingRequest: any;
  ajaxSaveResponse: any;
  setHotelList: (data: any) => void;
  hotelList: any;
  AcceptAll: (data: any) => void;
  RejectAll: (data: any) => void;
  showMaxAlert: any;
  totalRecord: any;
  setShowMaxAlert: (data: any) => void;
  portfolioSelectionQuickSelectIndices;
  setPortfolioSelectionQuickSelectIndices;
}

const cPortfolioAcceptancesContext = React.createContext(
  {} as iPortfolioAcceptancesContext
);

export const PortfolioAcceptancesContextProvider = (props) => {
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [panelData, setPanelData] = useState({});
  const [storeRequestPayload, setStoreRequestPayload] =
    useState(initialPayload);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [rejectionReasonList, setRejectionReasonList] = useState([]);
  const [removalReasonList, setRemovalReasonList] = useState([]);
  const [FindFilterData, setFindFilterData] = useState([]);
  const [ajaxIsMakingRequest, setAjaxIsMakingRequest] = useState(false);
  const [ajaxSaveResponse, setAjaxSaveResponse] = useState("");
  const [hotelList, setHotelList] = useState("");
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [
    portfolioSelectionQuickSelectIndices,
    setPortfolioSelectionQuickSelectIndices,
  ] = useState([]);
  const ajaxSave = (data) => {
    setAjaxSaveResponse(null);
    setAjaxIsMakingRequest(true);
    API.ajaxSave(data).then((response) => {
      setAjaxIsMakingRequest(false);
      setAjaxSaveResponse(response);
    });
  };

  const getPortfolioStatusFindFilter = () => {
    API.getPortfolioStatusFindFilter().then((data) => {
      setFindFilterData(data);
    });
  };

  const getRemovalReason = () => {
    API.getRemovalReason().then((data) => {
      setRemovalReasonList(data);
    });
  };

  const getRejectionReason = () => {
    API.getRejectionReason().then((data) => {
      setRejectionReasonList(data);
    });
  };

  const getShowOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };
  const getPortfolioStatusListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getPortfolioStatusList(requestPayload);
  };
  const getPortfolioStatusList = (
    requestPayload,
    accDetails: any = [],
    orderBy = 0
  ) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("port_Acc", JSON.stringify(requestPayload));

    setIsMakingRequest(true);
    const requestPayloadData = {
      ...requestPayload,
      strFilterValues: {
        ...requestPayload.strFilterValues,
        orderBy: orderBy,
      },
    };
    setStoreRequestPayload(requestPayloadData);
    let payload;

    if (requestPayload.strFilterValues.list) {
      const tempPayload = requestPayload;
      let temp = tempPayload.strFilterValues?.list?.replace(/\s/g, "");
      temp = temp.replace(/[0-9]/g, "");
      tempPayload.strFilterValues.list = temp;
      payload = tempPayload;
    } else {
      payload = requestPayloadData;
    }
    API.getPortfolioStatusList(payload).then((data) => {
      if (data.notfound) {
        alert(data.notfound);
      }
      const emptyObj = {
        notfound: "",
        portfolioStatusList: [],
        tempList: [],
      };
      const t = { ...panelData, ...data };
      const temp = { ...panelData, ...emptyObj };
      setIsMakingRequest(false);

      setTotalRecord(data.portfolioStatusList.length);
      if (data.portfolioStatusList.length > 500) {
        setShowMaxAlert(true);
        setPanelData(temp);
      } else {
        setPanelData(t);
      }
    });
  };

  const AcceptAll = (payload) => {
    setAjaxSaveResponse(null);
    setAjaxIsMakingRequest(true);
    API.acceptAll(payload).then((data) => {
      setAjaxIsMakingRequest(false);
      setAjaxSaveResponse(data);
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioStatusList(JSON.parse(localStorage.getItem("port_Acc")));
      }
    });
  };

  const RejectAll = (payload) => {
    setAjaxSaveResponse(null);
    setAjaxIsMakingRequest(true);
    API.rejectAll(payload).then((data) => {
      setAjaxIsMakingRequest(false);
      setAjaxSaveResponse(data);
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioStatusList(JSON.parse(localStorage.getItem("port_Acc")));
      }
    });
  };

  const portfolioAcceptancesContext = {
    getShowOptions,
    showFilterOptions,
    getPortfolioStatusList,
    panelData,
    setStoreRequestPayload,
    isMakingRequest,
    storeRequestPayload,
    getRejectionReason,
    rejectionReasonList,
    getRemovalReason,
    removalReasonList,
    FindFilterData,
    getPortfolioStatusFindFilter,
    ajaxIsMakingRequest,
    ajaxSave,
    ajaxSaveResponse,
    setHotelList,
    hotelList,
    AcceptAll,
    RejectAll,
    getPortfolioStatusListDup,
    showMaxAlert,
    setShowMaxAlert,
    totalRecord,
    setTotalRecord,
    portfolioSelectionQuickSelectIndices,
    setPortfolioSelectionQuickSelectIndices,
  };
  return (
    <cPortfolioAcceptancesContext.Provider value={portfolioAcceptancesContext}>
      {props.children}
    </cPortfolioAcceptancesContext.Provider>
  );
};

export const PortfolioAcceptancesConsumer =
  cPortfolioAcceptancesContext.Consumer;
export default cPortfolioAcceptancesContext;
