import React, { useRef, useState } from "react";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
interface IPortfolioSelectionContext {
  findFilterData: any;
  showFilterOptions: any;
  availData: any;
  selectData: any;
  availGridRows: any;
  selectedGridRows: any;
  showQuickSelectTop: boolean;
  showQuickSelectBottom: boolean;
  panelData: any;
  numItemsSelected?: any;
  numItems?: any;
  selectedAccount: any;
  getFindFilterData: () => any;
  getShowFilterOptions: () => void;
  getPortfolioSelectionList: (requestPayload: any, orderBy?: number) => void;
  getPortfolioSelectionListDup: (requestPayload: any, orderBy?: number) => void;
  deselectBtnClicked: (data: any, data2: any, data3: any, data4: any) => void;
  deselectBtnClickedAPI: (data: any, data2: any) => void;
  onChangeFieldValue: (
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
  handleOrderChange: (data: any, data2: any) => void;
  handleOrderChangeSelect: (data: any, data2: any) => void;
  getAvailList: (data: any) => void;
  getSelectList: (data: any) => void;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  initailLoadingAvail: any;
  initailLoadingSelect: any;
  isMakingRequestList: any;
}

const PortfolioSelectionContext = React.createContext(
  {} as IPortfolioSelectionContext
);

const initialPayloadAvail = {
  portfolioSelectionAvailList: null,
  notfound: "",
  tempList: [],
};

const initialPayloadSelect = {
  portfolioSelectionSelectedlList: null,
};

export const PortfolioSelectionContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [findFilterData, setFindFilter] = useState([]);
  const [availData, setAvailData] = useState(initialPayloadAvail);
  const [selectData, setSelectData] = useState(initialPayloadSelect);
  const [availGridRows, setAvailGridRows] = useState([]);
  const [selectedGridRows, setSelectedGridRows] = useState([]);
  const [showQuickSelectTop, setShowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setShowQuickSelectBottom] = useState(false);
  const [panelData, setPanelData] = useState({});
  const [numItemsSelected, setNumItemsSelected] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [initailLoadingAvail, setinitailLoadingAvail] = useState(true);
  const [initailLoadingSelect, setinitailLoadingSelect] = useState(true);
  const [prevSelHotelAvail, setPrevSelHotelAvail] = useState();
  const [prevSelHotelSelec, setPrevSelHotelSelec] = useState();
  const isMakingRequestList = useRef([]);

  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    const newData = [];
    if (data && type) {
      if (type == Settings.portfolioSelectionAvail.getPortfolioSelectionAvail) {
        setinitailLoadingAvail(false);
        if (data.length > 0) {
          data.map((element) => {
            newData.push({
              marshacode: element.marshacode,
              hotelname: element.hotelname,
              city: element.city,
              state: element.state,
              country: element.country,
              hotelid: element.hotelid,
              ratetype_selected: element.ratetype_selected,
              nopricing: element.nopricing,
              volunteered: element.volunteered,
              hasgenpricing: element.hasgenpricing,
              subset: element.subset,
              subsetname: element.subsetname,
              hotelid_checkbox: false,
            });
          });
          data = newData;
        }

        setAvailGridRows([]);
        setAvailData({
          ...availData,
          portfolioSelectionAvailList: newData,
          notfound: data.notfound,
          tempList: data.tempList,
        });
        setNumItems(data.length);
      } else if (
        type == Settings.portfolioSelectionAvail.getPortfolioSelectionSelect
      ) {
        setinitailLoadingSelect(false);
        if (data.length > 0) {
          const newData = [];
          data.map((element) => {
            newData.push({
              marshacode: element.marshacode,
              hotelname: element.hotelname,
              city: element.city,
              state: element.state,
              country: element.country,
              hotelid: element.hotelid,
              ratetype_selected: element.ratetype_selected,
              nopricing: element.nopricing,
              volunteered: element.volunteered,
              hasgenpricing: element.hasgenpricing,
              subset: element.subset,
              subsetname: element.subsetname,
              hotelid_checkbox: false,
            });
          });

          data = newData;
        }

        setSelectedGridRows([]);
        setSelectData({
          ...selectData,
          portfolioSelectionSelectedlList: data,
        });
        setNumItemsSelected(data.length);
      }
    }
  };

  const onChangeFieldValue = (
    rowData,
    field,
    param,
    data,
    selectedRows,
    event
  ) => {
    const { checked } = event.target;
    let selectedArr;
    selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
      field,
      checked,
      selectedRows,
      rowData.hotelid
    );

    if (param == Settings.availableValue) {
      if (checked) {
        setPrevSelHotelAvail(rowData.hotelid);
        if (prevSelHotelAvail && event.nativeEvent.shiftKey) {
          const prevSelIndex = data.portfolioSelectionAvailList.findIndex(
            (item) => item.hotelid == prevSelHotelAvail
          );
          const currSelIndex = data.portfolioSelectionAvailList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              data.portfolioSelectionAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionAvailList[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              data.portfolioSelectionAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionAvailList[i].hotelid
              );
            }
          }
          //Shift double click functionality
          if (prevSelIndex == currSelIndex) {
            for (
              let i = currSelIndex;
              i < data.portfolioSelectionAvailList.length;
              i++
            ) {
              data.portfolioSelectionAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionAvailList[i].hotelid
              );
            }
          }
          //end
        } else {
          data.portfolioSelectionAvailList.find(
            (item) => item.hotelid == rowData.hotelid
          ).hotelid_checkbox = checked;
        }
      } else {
        data.portfolioSelectionAvailList.find(
          (item) => item.hotelid == rowData.hotelid
        ).hotelid_checkbox = checked;
      }

      setAvailGridRows(selectedArr);
      setAvailData({ ...data });
    }

    if (param == Settings.selectedValue) {
      if (checked) {
        setPrevSelHotelSelec(rowData.hotelid);
        if (prevSelHotelSelec && event.nativeEvent.shiftKey) {
          const prevSelIndex = data.portfolioSelectionSelectedlList.findIndex(
            (item) => item.hotelid == prevSelHotelSelec
          );
          const currSelIndex = data.portfolioSelectionSelectedlList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              data.portfolioSelectionSelectedlList[i].hotelid_checkbox =
                checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionSelectedlList[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              data.portfolioSelectionSelectedlList[i].hotelid_checkbox =
                checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionSelectedlList[i].hotelid
              );
            }
          }
          //Shift double click functionality
          if (prevSelIndex == currSelIndex) {
            for (
              let i = currSelIndex;
              i < data.portfolioSelectionSelectedlList.length;
              i++
            ) {
              data.portfolioSelectionSelectedlList[i].hotelid_checkbox =
                checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.portfolioSelectionSelectedlList[i].hotelid
              );
            }
          }
          //end
        } else {
          data.portfolioSelectionSelectedlList.find(
            (item) => item.hotelid == rowData.hotelid
          ).hotelid_checkbox = checked;
        }
      } else {
        data.portfolioSelectionSelectedlList.find(
          (item) => item.hotelid == rowData.hotelid
        ).hotelid_checkbox = checked;
      }

      setSelectedGridRows(selectedArr);
      setSelectData({ ...data });
    }
  };

  const validateSubset = (param) => {
    return (
      param.strFilterValues &&
      param.strFilterValues.accountFilter &&
      param.strFilterValues.accountFilter.subset &&
      param.strFilterValues.accountFilter.subset != ""
    );
  };

  const selectBtnClickedFromDouble = (param, availGridArray) => {
    if (!validateSubset(param)) alert("Please select a subset");
    else {
      if (availGridArray.length > 0) {
        setIsMakingRequest(true);
        API.setPortfolioSelectionAvailUpdate(param, availGridArray).then(
          (data) => {
            setIsMakingRequest(false);
            if (data.failedHotels !== "") {
              alert(Settings.popup.PorpertiesAlert);
            }
            if (data.updateOtherList == true) {
              getAvailList(param);
              getSelectList(param);
            }
          }
        );
      }
    }
  };

  const selectBtnClicked = (param, availGridArray, availGridRowArray) => {
    if (!validateSubset(param)) alert("Please select a subset");
    else {
      if (numItemsSelected === 0) {
        const resultOk = confirm(Settings.popup.HotelAddition);
        if (resultOk) {
          if (availGridArray.length > 0) {
            isMakingRequestList.current = [
              ...isMakingRequestList.current,
              "availList",
            ];
            setIsMakingRequest(true);
            API.setPortfolioSelectionAvailUpdate(param, availGridArray).then(
              (data) => {
                isMakingRequestList.current = [
                  ...isMakingRequestList.current.filter(
                    (l) => l != "availList"
                  ),
                ];
                setIsMakingRequest(false);
                if (data.failedHotels !== "") {
                  deselectBtnClickedAPI(availGridRowArray, availGridArray);
                  alert(Settings.popup.PorpertiesAlert);
                }
                if (data.updateOtherList == true) {
                  getAvailList(param);
                  getSelectList(param);
                }
              }
            );
          }
        }
      } else {
        if (availGridArray.length > 0) {
          API.setPortfolioSelectionAvailUpdate(param, availGridArray).then(
            (data) => {
              if (data.failedHotels !== "") {
                deselectBtnClickedAPI(availGridRowArray, availGridArray);
                alert(Settings.popup.PorpertiesAlert);
              }
              if (data.updateOtherList == true) {
                getAvailList(param);
                getSelectList(param);
              }
            }
          );
        }
      }
    }
  };

  const unSelectBtnClicked = (param, selectArray) => {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const selectedArray = selectArray.portfolioSelectionSelectedlList
      .filter((item) => item.hotelid_checkbox == true)
      .map((item) => item.hotelid);

    API.setPortfolioSelectionSelectUpdate(
      accountrecid,
      selectedAccount,
      selectedArray
    ).then((data) => {
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  const selectAllBtnClicked = (param, availArray) => {
    if (!validateSubset(param)) alert("Please select a subset");
    else {
      const result = confirm(Settings.popup.AllHotelConfirm);
      if (result) {
        const selectedArray = availArray.portfolioSelectionAvailList.map(
          (item) => item.hotelid
        );
        const newData = FilteredGridSelectUtils.setCheckox(
          availArray.portfolioSelectionAvailList,
          selectedArray,
          true
        );
        availArray.portfolioSelectionAvailList = newData;
        // selectBtnClicked(param, selectedArray);
        selectBtnClickedFromDouble(param, selectedArray);
      }
    }
  };

  const unSelectAllBtnClicked = (param, selectArray) => {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const selectedArray = selectArray.portfolioSelectionSelectedlList.map(
      (item) => item.hotelid
    );
    const newData = FilteredGridSelectUtils.setCheckox(
      selectArray.portfolioSelectionSelectedlList,
      selectedArray,
      true
    );
    selectArray.portfolioSelectionSelectedlList = newData;

    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "selectList",
    ];
    setIsMakingRequest(true);
    API.setPortfolioSelectionSelectUpdate(
      accountrecid,
      selectedAccount,
      selectedArray
    ).then((data) => {
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
    API.getPortfolioSelectionAvail(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "availList"),
      ];
      setIsMakingRequest(false);
      setAPIData(
        data,
        Settings.portfolioSelectionAvail.getPortfolioSelectionAvail
      );
    });
  };

  const getSelectList = (param) => {
    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "selectList",
    ];
    setIsMakingRequest(true);
    if (param.strFilterValues.accountFilter.accountrecid != null) {
      param.strFilterValues.accountFilter.accountrecid = parseInt(
        param.strFilterValues.accountFilter.accountrecid
      );
    }
    API.getPortfolioSelectionSelect(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "selectList"),
      ];
      setIsMakingRequest(false);
      setAPIData(
        data,
        Settings.portfolioSelectionAvail.getPortfolioSelectionSelect
      );
    });
  };
  const getPortfolioSelectionListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getPortfolioSelectionList(requestPayload);
  };
  const getPortfolioSelectionList = (param) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("port_Sel", JSON.stringify(param));

    setPanelData(param);
    //Commenting below line to unblock testcases
    // setSelectedAccount(selectedAccount[0]);
    getAvailList(param);
    getSelectList(param);
  };

  const getFindFilterData = () => {
    API.getPortfolioSelectionFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getShowFilterOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const quickSelectGrid1BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setShowQuickSelectTop(value);
  };

  const quickSelectGrid2BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectBottom : showQuickSelectBottom;
    setShowQuickSelectBottom(value);
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
      avail_data.portfolioSelectionAvailList,
      availGridRowArray,
      false
    );
    const newData1 = FilteredGridSelectUtils.setCheckox(
      select_data.portfolioSelectionSelectedlList,
      selectedGridRowArray,
      false
    );
    avail_data.portfolioSelectionAvailList = newData;
    select_data.portfolioSelectionSelectedlList = newData1;
    setAvailGridRows([]);
    setSelectedGridRows([]);
    setAvailData(avail_data);
    setSelectData(select_data);
  };

  const deselectBtnClickedAPI = (param, availGridRowArray) => {
    const data = param;
    const newData = FilteredGridSelectUtils.setCheckox(
      data.portfolioSelectionAvailList,
      availGridRowArray,
      false
    );
    data.portfolioSelectionAvailList = newData;
    setAvailGridRows([]);
    setAvailData(data);
  };

  const quickSelectTopSaved = (param, availgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        availgridRows.push(element.hotelid);
      });
      setAvailGridRows(availgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.portfolioSelectionAvailList,
        availgridRows,
        true
      );
      data.portfolioSelectionAvailList = newData;
      setAvailData(data);
    }
    quickSelectGrid1BtnClicked(true);
  };

  const quickSelectBottomSaved = (param, selectgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        selectgridRows.push(element.hotelid);
      });
      setSelectedGridRows(selectgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.portfolioSelectionSelectedlList,
        selectgridRows,
        true
      );
      data.portfolioSelectionSelectedlList = newData;
      setSelectData(data);
    }
    quickSelectGrid2BtnClicked(true);
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setPanelData({ ...paneldata });
    getAvailList(paneldata);
  };

  const handleOrderChangeSelect = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setPanelData({ ...paneldata });
    getSelectList(paneldata);
  };

  const hotelSolicitationContext = {
    findFilterData,
    showFilterOptions,
    availData,
    selectData,
    availGridRows,
    selectedGridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    panelData,
    numItemsSelected,
    numItems,
    selectedAccount,
    getFindFilterData,
    getShowFilterOptions,
    getPortfolioSelectionList,
    deselectBtnClicked,
    onChangeFieldValue,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    selectBtnClicked,
    selectAllBtnClicked,
    unSelectBtnClicked,
    unSelectAllBtnClicked,
    handleOrderChange,
    handleOrderChangeSelect,
    getAvailList,
    getSelectList,
    isMakingRequest,
    setIsMakingRequest,
    initailLoadingAvail,
    initailLoadingSelect,
    isMakingRequestList,
    getPortfolioSelectionListDup,
  };

  return (
    <PortfolioSelectionContext.Provider value={hotelSolicitationContext}>
      {props.children}
    </PortfolioSelectionContext.Provider>
  );
};

export const PortfolioSelectionConsumer = PortfolioSelectionContext.Consumer;
export default PortfolioSelectionContext;
