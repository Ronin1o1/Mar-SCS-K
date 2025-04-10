import React, { useRef, useState } from "react";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
interface IHotelSolicitMaintenanceContext {
  getFindFilter: () => void;
  FindFilterData: any;
  getShowOptions: () => void;
  showFilterOptions: any;
  getCBCRequestList: (requestPayload: any, orderBy?: number) => void;
  getCBCRequestListDup: (requestPayload: any, orderBy?: number) => void;
  availData: any;
  setavailData: (data: any) => void;
  selectData: any;
  setselectData: (data: any) => void;
  AvailgridRows: any;
  SelectedgridRows: any;
  showQuickSelectTop: boolean;
  showQuickSelectBottom: boolean;
  setAvailgridRows: (data: any) => void;
  setSelectedgridRows: (data: any) => void;
  setshowQuickSelectTop: (data: any) => void;
  setshowQuickSelectBottom: (data: any) => void;
  deselectBtnClicked: (data: any, data2: any) => void;
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
  numItemsSelected?: any;
  numItems?: any;
  setnumItemsSelected: (data: any) => void;
  setnumItems: (data: any) => void;
  handleOrderChange: (data: any, data2: any) => void;
  handleOrderChangeSelect: (data: any, data2: any) => void;
  getAvailList: (data: any) => void;
  getSelectList: (data: any) => void;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequestList: any;
}

const CBCrequestContext = React.createContext(
  {} as IHotelSolicitMaintenanceContext
);

const initialPayloadAvail = {
  CBCRequestAvailList: null,
  notfound: "",
  tempList: [],
};
const initialPayloadSelect = {
  hotelSolicitSelectedlList: null,
  emailNotSent: null,
};

export const CBCrequestContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [availData, setavailData] = useState(initialPayloadAvail);
  const [selectData, setselectData] = useState(initialPayloadSelect);
  const [AvailgridRows, setAvailgridRows] = useState([]);
  const [SelectedgridRows, setSelectedgridRows] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setshowQuickSelectBottom] = useState(false);
  const [panelData, setpanelData] = useState({});
  const [numItemsSelected, setnumItemsSelected] = useState(0);
  const [numItems, setnumItems] = useState(0);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [initialLoadAvail, setinitialLoadAvail] = useState(true);
  const [initialLoadSelect, setinitialLoadSelect] = useState(true);
  const [prevSelHotelAvail, setPrevSelHotelAvail] = useState();
  const [prevSelHotelSelec, setPrevSelHotelSelec] = useState();
  const isMakingRequestList = useRef([]);

  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    if (data && type) {
      if (type == Settings.CBCRequest.getCBCRequestAvail) {
        setinitialLoadAvail(false);
        const records = data.length;
        setAvailgridRows([]);
        setavailData({
          ...availData,
          CBCRequestAvailList: data,
          notfound: data.notfound,
          tempList: data.tempList,
        });
        setnumItems(records);
      } else if (type == Settings.CBCRequest.getCBCRequestSelected) {
        setinitialLoadSelect(false);
        setSelectedgridRows([]);
        setselectData({
          ...selectData,
          hotelSolicitSelectedlList: data,
        });
        const records = data?.length;
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
          const prevSelIndex = data.CBCRequestAvailList.findIndex(
            (item) => item.hotelid == prevSelHotelAvail
          );
          const currSelIndex = data.CBCRequestAvailList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              newdata.CBCRequestAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.CBCRequestAvailList[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              newdata.CBCRequestAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.CBCRequestAvailList[i].hotelid
              );
            }
          }
          if (prevSelIndex == currSelIndex) {
            for (
              let i = currSelIndex;
              i < newdata.CBCRequestAvailList.length;
              i++
            ) {
              newdata.CBCRequestAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.CBCRequestAvailList[i].hotelid
              );
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
            for (
              var element = 0;
              element < newdata.CBCRequestAvailList.length;
              element++
            ) {
              if (
                newdata.CBCRequestAvailList[element].hotelid == rowData.hotelid
              ) {
                newdata.CBCRequestAvailList[element].hotelid_checkbox = checked;
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
          for (
            var element = 0;
            element < newdata.CBCRequestAvailList.length;
            element++
          ) {
            if (
              newdata.CBCRequestAvailList[element].hotelid == rowData.hotelid
            ) {
              newdata.CBCRequestAvailList[element].hotelid_checkbox = checked;
              break;
            }
          }
        }
      }

      setAvailgridRows(selectedArr);
      setavailData({ ...newdata });
    }

    if (param == Settings.selectedValue) {
      const newdata = data;
      let selectedArr;
      if (checked) {
        setPrevSelHotelSelec(rowData.hotelid);
        if (prevSelHotelSelec && event.nativeEvent.shiftKey) {
          const prevSelIndex = data.hotelSolicitSelectedlList.findIndex(
            (item) => item.hotelid == prevSelHotelSelec
          );
          const currSelIndex = data.hotelSolicitSelectedlList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              newdata.hotelSolicitSelectedlList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitSelectedlList[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              newdata.hotelSolicitSelectedlList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitSelectedlList[i].hotelid
              );
            }
          }
          if (prevSelIndex == currSelIndex) {
            for (
              let i = currSelIndex;
              i < newdata.hotelSolicitSelectedlList.length;
              i++
            ) {
              newdata.hotelSolicitSelectedlList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitSelectedlList[i].hotelid
              );
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
            for (
              var element = 0;
              element < newdata.hotelSolicitSelectedlList.length;
              element++
            ) {
              if (
                newdata.hotelSolicitSelectedlList[element].hotelid ==
                rowData.hotelid
              ) {
                newdata.hotelSolicitSelectedlList[element].hotelid_checkbox =
                  checked;
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
          for (
            var element = 0;
            element < newdata.hotelSolicitSelectedlList.length;
            element++
          ) {
            if (
              newdata.hotelSolicitSelectedlList[element].hotelid ==
              rowData.hotelid
            ) {
              newdata.hotelSolicitSelectedlList[element].hotelid_checkbox =
                checked;
              break;
            }
          }
        }
      }

      setSelectedgridRows(selectedArr);
      setselectData({ ...newdata });
    }
  };

  const selectBtnClicked = (param, availGridArray) => {
    if (availGridArray.length > 0) {
      isMakingRequestList.current = [
        ...isMakingRequestList.current,
        "availList",
        "selectList",
      ];
      setIsMakingRequest(true);
      API.setCBCRequestAvailUpdate(param, availGridArray, availData).then(
        (data) => {
          isMakingRequestList.current = [
            ...isMakingRequestList.current.filter(
              (l) => l != "availList" && l != "selectList"
            ),
          ];
          setIsMakingRequest(false);
          getAvailList(param);
          getSelectList(param);
        }
      );
    }
  };
  const unSelectBtnClicked = (param, selectArray) => {
    const strData = param.strFilterValues;
    const selectedArray = [];

    for (
      let element = 0;
      element < selectArray.hotelSolicitSelectedlList.length;
      element++
    ) {
      if (
        selectArray.hotelSolicitSelectedlList[element].hotelid_checkbox == true
      ) {
        selectedArray.push({
          hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
          move: Settings.valueYN.Y,
        });
      } else {
        selectedArray.push({
          hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
        });
      }
    }

    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "availList",
      "selectList",
    ];
    setIsMakingRequest(true);
    API.setCBCRequestSelectUpdate(strData, selectedArray, availData).then(
      (data) => {
        isMakingRequestList.current = [
          ...isMakingRequestList.current.filter(
            (l) => l != "availList" && l != "selectList"
          ),
        ];
        setIsMakingRequest(false);
        if (data == Settings.success) {
          getAvailList(param);
          getSelectList(param);
        }
      }
    );
  };
  const selectAllBtnClicked = (param, availArray) => {
    const selectedArray = [];
    availArray.CBCRequestAvailList.forEach((element) => {
      selectedArray.push(element.hotelid);
    });

    selectBtnClicked(param, selectedArray);
  };
  const unSelectAllBtnClicked = (param, selectArray) => {
    const strValues = param.strFilterValues;
    const selectedArray = [];

    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "selectList",
    ];
    setIsMakingRequest(true);

    for (
      let element = 0;
      element < selectArray.hotelSolicitSelectedlList.length;
      element++
    ) {
      selectedArray.push({
        hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
        move: Settings.valueYN.Y,
      });
    }

    API.setCBCRequestSelectUpdate(strValues, selectedArray, availData).then(
      (data) => {
        isMakingRequestList.current = [
          ...isMakingRequestList.current.filter((l) => l != "selectList"),
        ];
        setIsMakingRequest(false);
        if (data == Settings.success) {
          getAvailList(param);
          getSelectList(param);
        }
      }
    );
  };

  const getAvailList = (param) => {
    isMakingRequestList.current = [...isMakingRequestList.current, "availList"];
    setIsMakingRequest(true);
    API.getHotelSolicitationAvail(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "availList"),
      ];
      setIsMakingRequest(false);
      setAPIData(data, Settings.CBCRequest.getCBCRequestAvail);
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
      setAPIData(data, Settings.CBCRequest.getCBCRequestSelected);
    });
  };
  const getCBCRequestListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getCBCRequestList(requestPayload);
  };
  const getCBCRequestList = (param, orderBy = 0) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("port_CBCReq", JSON.stringify(param));

    setpanelData(param);
    getAvailList(param);
    getSelectList(param);
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

  const quickSelectGrid2BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectBottom : showQuickSelectBottom;
    setshowQuickSelectBottom(value);
  };

  const deselectBtnClicked = (param, availGridRowArray) => {
    const data = param;
    const newData = FilteredGridSelectUtils.setCheckox(
      data.CBCRequestAvailList,
      availGridRowArray,
      false
    );
    data.CBCRequestAvailList = newData;
    setAvailgridRows([]);
    setavailData(data);
  };

  const quickSelectTopSaved = (param, availgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        availgridRows.push(element.hotelid);
      });
      setAvailgridRows(availgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.CBCRequestAvailList,
        availgridRows,
        true
      );
      data.CBCRequestAvailList = newData;
      setavailData(data);
    }
    quickSelectGrid1BtnClicked(true);
  };

  const quickSelectBottomSaved = (param, selectedgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        selectedgridRows.push(element.hotelid);
      });
      setSelectedgridRows(selectedgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.hotelSolicitSelectedlList,
        selectedgridRows,
        true
      );
      data.hotelSolicitSelectedlList = newData;
      setselectData(data);
    }

    quickSelectGrid2BtnClicked(true);
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setpanelData({ ...paneldata });
    getAvailList(paneldata);
  };

  const handleOrderChangeSelect = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setpanelData({ ...paneldata });
    getSelectList(paneldata);
  };

  const hotelSolicitationContext = {
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
    getCBCRequestList,
    getAvailList,
    getSelectList,
    availData,
    setavailData,
    selectData,
    setselectData,

    AvailgridRows,
    SelectedgridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    setAvailgridRows,
    setSelectedgridRows,
    setshowQuickSelectTop,
    setshowQuickSelectBottom,
    panelData,
    setpanelData,
    numItemsSelected,
    numItems,
    setnumItemsSelected,
    setnumItems,
    handleOrderChange,
    handleOrderChangeSelect,
    isMakingRequest,
    setIsMakingRequest,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequestList,
    getCBCRequestListDup,
  };

  return (
    <CBCrequestContext.Provider value={hotelSolicitationContext}>
      {props.children}
    </CBCrequestContext.Provider>
  );
};

export const HotelSolicitationConsumer = CBCrequestContext.Consumer;
export default CBCrequestContext;
