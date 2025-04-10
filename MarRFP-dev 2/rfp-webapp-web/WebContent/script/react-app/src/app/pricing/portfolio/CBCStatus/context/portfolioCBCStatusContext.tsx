import React, { useState } from "react";
import Utils from "../../../../common/utils/Utils";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "./../static/Settings";

// Set state variables and function
interface IPortfolioCBCStatusContext {
  getPortfolioCBCStatusPanelData;
  getPortfolioCBCStatusPanelDataDup;
  FindFilterData: any;
  showFilterOptions: any;
  numItems?: any;
  rejectionReasonsData: any;
  updateAcceptData: any;
  updateAcceptAllData: any;
  updateRejectData: any;
  updateRejectAllData: any;
  updateData: any;
  getFindFilter: () => void;
  getRejectionReasons: () => void;
  getshowFilterOptions: () => void;
  updateAccept: (data: any, data2: any, data3: any) => void;
  updateReject: (data: any, data2: any, data3: any) => void;
  acceptAll: (data: any, data2: any, data3: any) => void;
  rejectAll: (data: any, data2: any, data3: any, data4: any) => void;
  update: (data: any, data2: any, data3: any) => void;
  filteredHotelList: any;
  selectedHotelId: any;
  onChangeFeildValue: (data: any, data2: any, data4: any) => void;
  deselectBtnClicked: () => void;
  showQuickSelectTop: any;
  quickSelectGrid1BtnClicked: (data: any) => void;
  quickSelectTopSaved: (
    data: any,
    data1: any,
    data2: any,
    data3: any,
    data4: any
  ) => void;
  CBCRunReport: (data: any) => void;
  rightPanelViewGrid: any;
  reportUrl: any;
  panelData: any;
  handleOrderChange: (data: any, data1: any) => void;
  saveUpdateReason: (data: any, data1: any) => void;
  setFiltertedList: (data: any) => void;
  saveFormData: (data: any) => any;
  isQuickSelectClickable: (val: boolean) => void;
  setShowRefreshAlert: (val: boolean) => void;
  showRefreshAlert: boolean;
  isAcceptRejectAllClicked: boolean;
  setIAcceptRejectAllClicked: (val: boolean) => void;
  isMakingRequest: any;
}

const PortfolioCBCStatusContext = React.createContext(
  {} as IPortfolioCBCStatusContext
);

export const PortfolioCBCStatusContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [rejectionReasonsData, setRejectionReasonsData] = useState({});
  const [updateAcceptData, setUpdateAcceptData] = useState({});
  const [updateAcceptAllData, setUpdateAcceptAllData] = useState({});
  const [updateRejectData, setUpdateRejectData] = useState({});
  const [updateRejectAllData, setUpdateRejectAllData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [panelData, setpanelData] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [numItems, setnumItems] = useState(0);
  const [filteredHotelList, setFilteredHotelList] = useState([]);
  const [selectedHotelId, setselectedHotelId] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [rightPanelViewGrid, setRightPanelViewGrid] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [isQuickSelectClickable, setIsQuickSelectClickable] = useState(false);
  const [showRefreshAlert, setShowRefreshAlert] = useState(true);
  const [isAcceptRejectAllClicked, setIAcceptRejectAllClicked] =
    useState(false);
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const getshowFilterOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const getFindFilter = () => {
    API.getCBCStatusFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getPortfolioCBCStatusPanelDataDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getPortfolioCBCStatusPanelData(requestPayload);
  };

  const getPortfolioCBCStatusPanelData = (param, orderBy = 0) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("port_CBCStat", JSON.stringify(param));

    if (param) {
      setIsMakingRequest(true);
      setpanelData(param);
      API.getCBCStatusList(param).then((data) => {
        setIsMakingRequest(false);
        setAPIData(data);
        setIsQuickSelectClickable(true);
        setShowRefreshAlert(false);
        setIAcceptRejectAllClicked(false);
        localStorage.setItem("panelDataToCompare", JSON.stringify(data));
        setselectedHotelId([]);
      });
    }
  };

  const saveFormData = (panelData) => {
    API.ajaxSave(panelData, filteredHotelList).then((data) => {
      setUpdateData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const getRejectionReasons = () => {
    API.getRejectionReasons().then((data) => {
      setRejectionReasonsData(data);
    });
  };

  const setFiltertedList = (data) => {
    setFilteredHotelList(data);
  };

  const setAPIData = (data) => {
    const records = data.length;
    setselectedHotelId([]);
    setFilteredHotelList(data);
    setnumItems(records);
    setRightPanelViewGrid(true);
  };

  const updateAccept = (data, panelData, filteredHotelList) => {
    API.updateAccept(data, panelData, filteredHotelList).then((data) => {
      setUpdateAcceptData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const acceptAll = (data, panelData, filteredHotelList) => {
    API.acceptAll(data, panelData, filteredHotelList).then((data) => {
      setUpdateAcceptAllData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const updateReject = (data, panelData, filteredHotelList) => {
    API.updateReject(data, panelData, filteredHotelList).then((data) => {
      setUpdateRejectData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const rejectAll = (
    data,
    selectedRejectedReason,
    panelData,
    filteredHotelList
  ) => {
    API.rejectAll(
      data,
      selectedRejectedReason,
      panelData,
      filteredHotelList
    ).then((data) => {
      setUpdateRejectAllData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const update = (data, panelData, filteredHotelList) => {
    API.update(data, panelData, filteredHotelList).then((data) => {
      setUpdateData(data);
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const onChangeFeildValue = (rowData, selectedRows, event) => {
    const { checked } = event.target;
    const selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
      Settings.inputType.checkbox,
      checked,
      selectedRows,
      rowData.hotelid
    );
    setselectedHotelId([...selectedArr]);
  };

  const deselectBtnClicked = () => {
    setselectedHotelId([]);
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param;
    setpanelData({ ...paneldata });
    getPortfolioCBCStatusPanelData(paneldata, param);
  };

  const quickSelectGrid1BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setshowQuickSelectTop(value);
  };

  const quickSelectTopSaved = (
    radioValue,
    selectedRejectedReason,
    param,
    selectedId,
    panelData
  ) => {
    param.forEach((element) => {
      selectedId.push(element.hotelid);
    });
    setselectedHotelId(selectedId);
    quickSelectGrid1BtnClicked(true);

    if (radioValue === "acc_by_pro") {
      setShowRefreshAlert(false);

      setIAcceptRejectAllClicked(true);
      updateAccept(param, panelData, filteredHotelList);
    }
    if (radioValue === "acc_all_pro") {
      setShowRefreshAlert(false);

      setIAcceptRejectAllClicked(true);
      acceptAll(param, panelData, filteredHotelList);
    }
    if (radioValue === "up_rej_reas")
      update(param, panelData, filteredHotelList);
    if (radioValue === "rej_by_pro")
      updateReject(param, panelData, filteredHotelList);
    if (radioValue === "rej_all_pro")
      rejectAll(param, selectedRejectedReason, panelData, filteredHotelList);
  };

  const saveUpdateReason = (param, selectedOption) => {
    API.update(param, panelData, filteredHotelList).then(() => {
      getPortfolioCBCStatusPanelData(panelData, 1);
    });
  };

  const portfolioCBCStatusContext = {
    getPortfolioCBCStatusPanelData,
    FindFilterData,
    showFilterOptions,
    numItems,
    updateAcceptData,
    updateAcceptAllData,
    updateRejectData,
    updateRejectAllData,
    updateData,
    rejectionReasonsData,
    getshowFilterOptions,
    getFindFilter,
    getRejectionReasons,
    updateAccept,
    updateReject,
    acceptAll,
    rejectAll,
    update,
    filteredHotelList,
    panelData,
    onChangeFeildValue,
    selectedHotelId,
    setAPIData,
    deselectBtnClicked,
    showQuickSelectTop,
    quickSelectGrid1BtnClicked,
    quickSelectTopSaved,
    rightPanelViewGrid,
    reportUrl,
    handleOrderChange,
    saveUpdateReason,
    setFiltertedList,
    saveFormData,
    isQuickSelectClickable,
    setShowRefreshAlert,
    showRefreshAlert,
    isAcceptRejectAllClicked,
    setIAcceptRejectAllClicked,
    isMakingRequest,
    getPortfolioCBCStatusPanelDataDup,
  };

  return (
    <PortfolioCBCStatusContext.Provider value={portfolioCBCStatusContext}>
      {props.children}
    </PortfolioCBCStatusContext.Provider>
  );
};

export const PortfolioCBCStatusConsume = PortfolioCBCStatusContext.Consumer;
export default PortfolioCBCStatusContext;
