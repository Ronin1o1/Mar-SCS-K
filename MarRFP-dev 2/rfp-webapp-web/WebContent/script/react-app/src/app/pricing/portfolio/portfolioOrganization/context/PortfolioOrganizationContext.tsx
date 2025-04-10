import React, { useRef, useState } from "react";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
interface IPortfolioOrganizationContext {
  getFindFilter: () => void;
  FindFilterData: any;
  getShowOptions: () => void;
  showFilterOptions: any;
  getPortfolioOrganizationList: (requestPayload: any, orderBy?: number) => void;
  getPortfolioOrganizationListDup: (
    requestPayload: any,
    orderBy?: number
  ) => void;
  availData: any;
  setavailData: (data: any) => void;
  selectData: any;
  setselectData: (data: any) => void;
  getSelectListonLoad: () => void;
  getAvailListonLoad: () => void;
  getAvailList: (data: any) => void;
  getSelectList: (data: any) => void;
  AvailgridRows: any;
  SelectedgridRows: any;
  showQuickSelectTop: boolean;
  showQuickSelectBottom: boolean;
  showadditionalInfo: boolean;
  setAvailgridRows: (data: any) => void;
  setSelectedgridRows: (data: any) => void;
  setshowQuickSelectTop: (data: any) => void;
  setshowQuickSelectBottom: (data: any) => void;
  setshowadditionalInfo: (data: any) => void;
  deselectBtnClicked: (data: any, data2: any, data3: any, data4: any) => void;
  onChangeFeildValue: (
    data: any,
    data2: any,
    data3: any,
    data4: any,
    data5: any,
    data6: any
  ) => void;
  quickSelectTopSaved: (data: any, data2: any, data3: any) => void;
  quickSelectBottomSaved: (data: any, data2: any, data3: any) => void;
  quickSelectGrid1BtnClicked: (data: any) => void;
  quickSelectGrid2BtnClicked: (data: any) => void;
  selectBtnClicked: (data: any, data2: any) => void;
  selectAllBtnClicked: (data: any, data2: any) => void;
  unSelectBtnClicked: (data: any, data2: any) => void;
  unSelectAllBtnClicked: (data: any, data2: any) => void;
  panelData: any;
  setpanelData: (data: any) => void;
  setsendFromList: (data: any) => void;
  saveHandler?: (data: any, data2: any) => void;
  cancelHandler?: (data: any) => void;
  numItemsSelected?: any;
  numItems?: any;
  setnumItemsSelected: (data: any) => void;
  setnumItems: (data: any) => void;
  handleOrderChange: (data: any, data2: any) => void;
  handleOrderChangeSelect: (data: any, data2: any) => void;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  isMakingRequestList: any;
}

const PortfolioOrganizationContext = React.createContext(
  {} as IPortfolioOrganizationContext
);

// const initialPayloadAvail = {
//   "hotelSolicitAvailList": null,
//   "notfound": "",
//   "tempList": []
// };
// const initialPayloadSelect = {
//   "hotelSolicitSelectedlList": null,
//   "emailNotSent": null
// };

export const PortfolioOrganizationContextProvider = (props) => {
  // Set state variables and function

  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [availData, setavailData] = useState([]);
  const [selectData, setselectData] = useState([]);
  const [AvailgridRows, setAvailgridRows] = useState([]);
  const [SelectedgridRows, setSelectedgridRows] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setshowQuickSelectBottom] = useState(false);
  const [showadditionalInfo, setshowadditionalInfo] = useState(false);
  // const [panelData, setpanelData] = useState({});
  const [panelData, setpanelData] = useState({});
  const [sendMail, setSendMailData] = useState([]);
  const [sendMailErrorMessage, setsendMailErrorMessage] = useState("");
  const [senMailMessagePopup, setsenMailPopup] = useState(false);
  const [sendFromList, setsendFromList] = useState({});
  const [numItemsSelected, setnumItemsSelected] = useState(0);
  const [numItems, setnumItems] = useState(0);
  const [subsetData, setSubsetData] = useState([]);
  const [initialLoadAvail, setinitialLoadAvail] = useState(true);
  const [initialLoadSelect, setinitialLoadSelect] = useState(true);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const isMakingRequestList = useRef([]);
  const [prevSelHotelAvail, setPrevSelHotelAvail] = useState();
  const [prevSelHotelSelec, setPrevSelHotelSelec] = useState();

  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    setSubsetData(data);

    if (data && type) {
      if (type == Settings.hotelSolicitationAvail.gethotelSolicitationAvail) {
        setinitialLoadAvail(false);
        if (data > 0) {
          const newData = [];
          data.map((element) => {
            newData.push({
              hotelid: element.hotelid,
              marshacode: element.marshacode,
              hotelname: element.hotelname,
              city: element.city,
              state: element.state,
              country: element.country,
              subset: element.subset,
              hotelid_checkbox: false,
            });
          });
          data = newData;
        }

        setAvailgridRows([]);

        setavailData(data);
        const records = data.length;
        setnumItems(records);
      } else if (
        type == Settings.hotelSolicitationAvail.getHotelSolicitationSelect
      ) {
        setinitialLoadSelect(false);
        if (data > 0) {
          const newData = [];
          data.map((element) => {
            newData.push({
              hotelid: element.hotelid,
              marshacode: element.marshacode,
              hotelname: element.hotelname,
              city: element.city,
              state: element.state,
              country: element.country,
              subset: element.subset,
              hotelid_checkbox: false,
            });
          });

          data = newData;
        }
        setSelectedgridRows([]);

        setselectData(data);
        const records = data.length;
        setnumItemsSelected(records);
      }
    }
  };

  const onChangeFeildValue = (
    rowData,
    field,
    param,
    data,
    selectedRows,
    event
  ) => {
    const { checked } = event.target;
    if (param == Settings.availableValue) {
      const newdata = data;
      let selectedArr;
      if (checked) {
        setPrevSelHotelAvail(rowData.hotelid);
        if (prevSelHotelAvail && event.nativeEvent.shiftKey) {
          const prevSelIndex = data.findIndex(
            (item) => item.hotelid == prevSelHotelAvail
          );
          const currSelIndex = data.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              newdata[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              newdata[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          }
          //Shift double click functionality
          if (prevSelIndex == currSelIndex) {
            for (let i = currSelIndex; i < data.length; i++) {
              data[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          }
          //end
        } else {
          selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
            field,
            checked,
            selectedRows,
            rowData.hotelid
          );
          if (data) {
            for (var element = 0; element < newdata.length; element++) {
              if (newdata[element].hotelid == rowData.hotelid) {
                newdata[element].hotelid_checkbox = checked;
                break;
              }
            }
          }
        }
      } else {
        selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
          field,
          checked,
          selectedRows,
          rowData.hotelid
        );

        if (data) {
          for (var element = 0; element < newdata.length; element++) {
            if (newdata[element].hotelid == rowData.hotelid) {
              newdata[element].hotelid_checkbox = checked;

              break;
            }
          }
        }
      }

      data = newdata;
      setAvailgridRows(selectedArr);

      setavailData([...data]);
    }

    if (param == Settings.selectedValue) {
      const newdataS = data;
      let selectedArrS;
      if (checked) {
        setPrevSelHotelSelec(rowData.hotelid);
        if (prevSelHotelSelec && event.nativeEvent.shiftKey) {
          const prevSelIndex = data.findIndex(
            (item) => item.hotelid == prevSelHotelSelec
          );
          const currSelIndex = data.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              newdataS[i].hotelid_checkbox = checked;
              selectedArrS = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              newdataS[i].hotelid_checkbox = checked;
              selectedArrS = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          }
          //Shift double click functionality
          if (prevSelIndex == currSelIndex) {
            for (let i = currSelIndex; i < data.length; i++) {
              data[i].hotelid_checkbox = checked;
              selectedArrS = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data[i].hotelid
              );
            }
          }
          //end
        } else {
          selectedArrS = FilteredGridSelectUtils.getSelectedCheckboxValue(
            field,
            checked,
            selectedRows,
            rowData.hotelid
          );
          if (data) {
            for (var element = 0; element < newdataS.length; element++) {
              if (newdataS[element].hotelid == rowData.hotelid) {
                newdataS[element].hotelid_checkbox = checked;
                break;
              }
            }
          }
        }
      } else {
        selectedArrS = FilteredGridSelectUtils.getSelectedCheckboxValue(
          field,
          checked,
          selectedRows,
          rowData.hotelid
        );

        if (data) {
          for (var element = 0; element < newdataS.length; element++) {
            if (newdataS[element].hotelid == rowData.hotelid) {
              newdataS[element].hotelid_checkbox = checked;
              break;
            }
          }
        }
      }
      data = newdataS;
      setSelectedgridRows(selectedArrS);
      setselectData([...data]);
    }
  };

  const selectBtnClicked = (param, availGridArray) => {
    if (availGridArray.length > 0) {
      isMakingRequestList.current = [
        ...isMakingRequestList.current,
        "availList",
      ];
      setIsMakingRequest(true);
      API.setHotelSolicitationAvailUpdate(param, availGridArray).then(
        (data) => {
          isMakingRequestList.current = [
            ...isMakingRequestList.current.filter((l) => l != "availList"),
          ];
          setIsMakingRequest(false);
          if (data == Settings.success) {
            getAvailList(param);
            getSelectList(param);
          }
        }
      );
    }
  };
  const unSelectBtnClicked = (param, selectArray) => {
    // //const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    // const selectedArray = selectArray.filter((item) => item.hotelid_checkbox == true)
    //   .map((item) => item.hotelid);
    const selectedArray = [];

    for (let element = 0; element < selectArray.length; element++) {
      if (selectArray[element].hotelid_checkbox == true) {
        selectedArray.push(selectArray[element].hotelid);
      }
      // else {
      //   selectedArray.push({
      //     hotelid: selectArray[element].hotelid,
      //   });
      // }
    }
    API.setHotelSolicitationSelectUpdate(param, selectedArray).then((data) => {
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  // const unSelectBtnClicked = (param, selectArray) => {
  //   const accountrecid = param.strFilterValues.accountFilter.accountrecid;
  //   const selectedArray = selectArray.filter((item) => item.hotelid_checkbox == true)
  //     .map((item) => item.hotelid);

  //   API.setHotelSolicitationSelectUpdate(
  //     accountrecid,
  //     selectedArray
  //   ).then((data) => {
  //     if (data == Settings.success) {
  //       getAvailList(param);
  //       getSelectList(param);
  //     }
  //   });
  // };

  const selectAllBtnClicked = (param, availArray) => {
    const selectedArray = [];
    availArray.forEach((element) => {
      selectedArray.push(element.hotelid);
    });

    selectBtnClicked(param, selectedArray);
  };
  const unSelectAllBtnClicked = (param, selectArray) => {
    //let accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const selectedArray = [];
    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "selectList",
    ];
    setIsMakingRequest(true);
    for (let element = 0; element < selectArray.length; element++) {
      selectedArray.push(
        selectArray[element].hotelid
        //move: Settings.valueYN.Y,
      );
    }

    API.setHotelSolicitationSelectUpdate(param, selectedArray).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "selectList"),
      ];
      setIsMakingRequest(false);
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  const getAvailList = (param) => {
    isMakingRequestList.current = [...isMakingRequestList.current, "availList"];
    setIsMakingRequest(true);
    API.getHotelSolicitationAvail(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "availList"),
      ];
      setIsMakingRequest(false);
      setAPIData(
        data,
        Settings.hotelSolicitationAvail.gethotelSolicitationAvail
      );
    });
  };

  const getSelectList = (param) => {
    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "selectList",
    ];
    setIsMakingRequest(true);
    API.getHotelSolicitationSelect(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "selectList"),
      ];
      setIsMakingRequest(false);
      setAPIData(
        data,
        Settings.hotelSolicitationAvail.getHotelSolicitationSelect
      );
    });
  };
  const getPortfolioOrganizationListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getPortfolioOrganizationList(requestPayload);
  };
  const getPortfolioOrganizationList = (param) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("port_Org", JSON.stringify(param));

    setpanelData(param);
    getAvailList(param);
    getSelectList(param);
  };

  const getAvailListonLoad = () => {
    API.getAvailListonLoad().then((data) => {
      setavailData(data);
    });
  };

  const getSelectListonLoad = () => {
    API.getSelectListonLoad().then((data) => {
      setselectData(data);
    });
  };

  const getFindFilter = () => {
    API.getHotelSolicitaionFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getShowOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const quickSelectGrid1BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setshowQuickSelectTop(value);
  };

  const setsenMailMessagePopup = (closeModal?: boolean) => {
    const value = closeModal ? !senMailMessagePopup : senMailMessagePopup;
    setsenMailPopup(value);
  };

  const quickSelectGrid2BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectBottom : showQuickSelectBottom;
    setshowQuickSelectBottom(value);
  };

  const closeAdditionalInfoButton = (closeModal?: boolean) => {
    const value = closeModal ? !showadditionalInfo : showadditionalInfo;
    setshowadditionalInfo(value);
  };

  const cancelHandler = (closeModal) => {
    const value = closeModal ? !showadditionalInfo : showadditionalInfo;
    setshowadditionalInfo(value);
  };
  const deselectBtnClicked = (
    availGridparam,
    selectGridParam,
    availGridRowArray,
    selectedGridRowArray
  ) => {
    const avail_data = availGridparam;
    const select_data = selectGridParam;
    const newData = FilteredGridSelectUtils.setCheckox(
      avail_data,
      availGridRowArray,
      false
    );
    const newData1 = FilteredGridSelectUtils.setCheckox(
      select_data,
      selectedGridRowArray,
      false
    );
    avail_data.hotelSolicitAvailList = newData;
    select_data.hotelSolicitSelectedlList = newData1;
    setAvailgridRows([]);
    setSelectedgridRows([]);
    setavailData(newData);
    setselectData(newData1);
  };

  const quickSelectTopSaved = (param, availgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        availgridRows.push(element.hotelid);
      });
      setAvailgridRows(availgridRows);
      let newData = [];
      newData = FilteredGridSelectUtils.setCheckox(data, availgridRows, true);
      data = newData;
      setavailData(data);
    }
    quickSelectGrid1BtnClicked(true);
  };

  const quickSelectBottomSaved = (param, selectgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        selectgridRows.push(element.hotelid);
      });
      setSelectedgridRows(selectgridRows);
      let newData = [];
      newData = FilteredGridSelectUtils.setCheckox(data, selectgridRows, true);
      data = newData;
      setselectData(data);
    }
    quickSelectGrid2BtnClicked(true);
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param;

    setpanelData({ ...paneldata });
    getAvailList(paneldata);
  };

  const handleOrderChangeSelect = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param;

    setpanelData({ ...paneldata });
    getSelectList(paneldata);
  };

  const portfolioOrganizationContext = {
    setAPIData,
    onChangeFeildValue,
    selectBtnClicked,
    unSelectBtnClicked,
    selectAllBtnClicked,
    unSelectAllBtnClicked,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    deselectBtnClicked,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    getFindFilter,
    getShowOptions,
    FindFilterData,
    showFilterOptions,
    getPortfolioOrganizationList,
    getAvailList,
    getSelectList,
    availData,
    setavailData,
    selectData,
    setselectData,
    getSelectListonLoad,
    getAvailListonLoad,
    AvailgridRows,
    SelectedgridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    showadditionalInfo,
    setAvailgridRows,
    setSelectedgridRows,
    setshowQuickSelectTop,
    setshowQuickSelectBottom,
    setshowadditionalInfo,
    panelData,
    setpanelData,
    sendMail,
    setSendMailData,
    sendMailErrorMessage,
    setsendMailErrorMessage,
    setsenMailMessagePopup,
    senMailMessagePopup,
    setsenMailPopup,
    sendFromList,
    setsendFromList,
    cancelHandler,
    numItemsSelected,
    numItems,
    setnumItemsSelected,
    setnumItems,
    handleOrderChange,
    handleOrderChangeSelect,
    closeAdditionalInfoButton,
    subsetData,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    setIsMakingRequest,
    isMakingRequestList,
    getPortfolioOrganizationListDup,
  };

  return (
    <PortfolioOrganizationContext.Provider value={portfolioOrganizationContext}>
      {props.children}
    </PortfolioOrganizationContext.Provider>
  );
};

export const PortfolioOrganizationConsumer =
  PortfolioOrganizationContext.Consumer;
export default PortfolioOrganizationContext;
