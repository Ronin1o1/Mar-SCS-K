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
  getPgoosPropagationList: (requestPayload: any, orderBy?: number) => void;
  getPgoosPropagationListDup: (requestPayload: any, orderBy?: number) => void;
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

  isMakingRequestList: any;
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
  deleteAPIUpdate: (data: any, mcbObj: any) => void;
  getbatchId: (data: any, sendVrp: any) => void;
  pgoospropsuccess: boolean;
  getPgoosStatus: () => void;
  pgoosStatus: string;
  pgoosRunPropagationData: any;
  pgoosPropagationFinalPage: boolean;
  getResetPgoosBatch: (data: any) => void;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  getResetPgoosAvail: () => void;
  getResetPgoosSelect: () => void;
  setPgoosPropagationFinalPage: (data: any) => void;
}

const PgoosPropagationContext = React.createContext(
  {} as IHotelSolicitMaintenanceContext
);

const initialPayloadAvail = {
  PgoosPropagationAvailList: null,
  notfound: "",
  tempList: [],
};
const initialPayloadSelect = {
  hotelSolicitSelectedlList: null,
  emailNotSent: null,
};

export const PgoosPropagationContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [pgoosStatus, setPgoosStatus] = useState("");
  const [availData, setavailData] = useState(initialPayloadAvail);
  const [selectData, setselectData] = useState(initialPayloadSelect);
  const [AvailgridRows, setAvailgridRows] = useState([]);
  const [SelectedgridRows, setSelectedgridRows] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setshowQuickSelectBottom] = useState(false);
  const [panelData, setpanelData] = useState({});
  const [numItemsSelected, setnumItemsSelected] = useState(0);
  const [numItems, setnumItems] = useState(0);
  const [batchid, setBatchId] = useState(0);
  const [pgoospropsuccess, setpgoospropsuccess] = useState(false);
  const [pgoosRunPropagationData, setPgoosRunPropagationData] = useState({});
  const [pgoosPropagationFinalPage, setPgoosPropagationFinalPage] =
    useState(false);
  const [initialLoadAvail, setinitialLoadAvail] = useState(true);
  const [initialLoadSelect, setinitialLoadSelect] = useState(true);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [prevAvailCheckboxSel, setPrevAvailCheckboxSel] = useState();
  const [prevSelecCheckboxSel, setSelecCheckboxSel] = useState();
  const isMakingRequestList = useRef([]);
  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    if (data && type) {
      if (type == Settings.PgoosPropagation.getPgoosPropagationAvail) {
        const records = data?.pgoosList?.length;
        setinitialLoadAvail(false);
        setAvailgridRows([]);
        setavailData({
          ...availData,
          PgoosPropagationAvailList: data,
          notfound: data.notfound,
          tempList: data.tempList,
        });
        setnumItems(records);
      } else if (
        type == Settings.PgoosPropagation.getPgoosPropagationSelected
      ) {
        setSelectedgridRows([]);
        setinitialLoadSelect(false);
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

      let selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
        field,
        checked,
        selectedRows,
        rowData.hotelid
      );

      if (data) {
        if (event.nativeEvent.shiftKey) {
          if (prevAvailCheckboxSel) {
            const indexOfPrevSel =
              data.PgoosPropagationAvailList.pgoosList.findIndex(
                (item) => item.hotelid == prevAvailCheckboxSel
              );
            const indexOfCurSel =
              data.PgoosPropagationAvailList.pgoosList.findIndex(
                (item) => item.hotelid == rowData.hotelid
              );
            if (indexOfPrevSel < indexOfCurSel) {
              for (let i = indexOfPrevSel; i <= indexOfCurSel; i++) {
                selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                  field,
                  checked,
                  selectedRows,
                  newdata.PgoosPropagationAvailList.pgoosList[i].hotelid
                );
                newdata.PgoosPropagationAvailList.pgoosList[
                  i
                ].hotelid_checkbox = checked;
              }
            } else if (indexOfCurSel < indexOfPrevSel) {
              for (let i = indexOfCurSel; i <= indexOfPrevSel; i++) {
                selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                  field,
                  checked,
                  selectedRows,
                  newdata.PgoosPropagationAvailList.pgoosList[i].hotelid
                );
                newdata.PgoosPropagationAvailList.pgoosList[
                  i
                ].hotelid_checkbox = checked;
              }
            }
          }
        } else {
          for (
            var element = 0;
            element < newdata.PgoosPropagationAvailList.length;
            element++
          ) {
            if (
              newdata.PgoosPropagationAvailList[element].hotelid ==
              rowData.hotelid
            ) {
              newdata.PgoosPropagationAvailList[element].hotelid_checkbox =
                checked;
              break;
            }
          }
        }
      }

      setAvailgridRows(selectedArr);
      setavailData({ ...newdata });
      setPrevAvailCheckboxSel(rowData.hotelid);
    }

    if (param == Settings.selectedValue) {
      const newdata = data;

      let selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
        field,
        checked,
        selectedRows,
        rowData.hotelid
      );

      if (data) {
        if (event.nativeEvent.shiftKey) {
          if (prevSelecCheckboxSel) {
            const indexOfPrevSel = data.hotelSolicitSelectedlList.findIndex(
              (item) => item.hotelid == prevSelecCheckboxSel
            );
            const indexOfCurSel = data.hotelSolicitSelectedlList.findIndex(
              (item) => item.hotelid == rowData.hotelid
            );
            if (indexOfPrevSel < indexOfCurSel) {
              for (let i = indexOfPrevSel; i <= indexOfCurSel; i++) {
                selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                  field,
                  checked,
                  selectedRows,
                  newdata.hotelSolicitSelectedlList[i].hotelid
                );
                newdata.hotelSolicitSelectedlList[i].hotelid_checkbox = checked;
              }
            } else if (indexOfCurSel < indexOfPrevSel) {
              for (let i = indexOfCurSel; i <= indexOfPrevSel; i++) {
                selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                  field,
                  checked,
                  selectedRows,
                  newdata.hotelSolicitSelectedlList[i].hotelid
                );
                newdata.hotelSolicitSelectedlList[i].hotelid_checkbox = checked;
              }
            }
          }
        } else {
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
      setSelecCheckboxSel(rowData.hotelid);
    }
  };

  const selectBtnClicked = (param, availGridArray) => {
    if (availGridArray.length > 0) {
      isMakingRequestList.current = [
        ...isMakingRequestList.current,
        "availList",
      ];
      setIsMakingRequest(true);
      API.setPgoosPropagationAvailUpdate(param, availGridArray, availData).then(
        (data) => {
          isMakingRequestList.current = [
            ...isMakingRequestList.current.filter(
              (l) => l != "availList" && l != "selectList"
            ),
          ];
          setIsMakingRequest(false);
          isMakingRequestList.current = [
            ...isMakingRequestList.current.filter((l) => l != "availList"),
          ];
          getAvailList(param);
          getSelectList(param);
          console.log("context...", isMakingRequestList);
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
          accountdirid:
            selectArray.hotelSolicitSelectedlList[element].accountdirid,
          hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
        });
      } else {
        selectedArray.push({
          accountdirid:
            selectArray.hotelSolicitSelectedlList[element].accountdirid,
        });
      }
    }
    isMakingRequestList.current = [
      ...isMakingRequestList.current,
      "availList",
      "selectList",
    ];
    setIsMakingRequest(true);
    API.setPgoosPropagationSelectUpdate(strData, selectedArray, availData).then(
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
    availArray?.PgoosPropagationAvailList?.pgoosList?.forEach((element) => {
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
    for (
      let element = 0;
      element < selectArray.hotelSolicitSelectedlList.length;
      element++
    ) {
      selectedArray.push({
        accountdirid:
          selectArray.hotelSolicitSelectedlList[element].accountdirid,
        hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
      });
    }

    API.setPgoosPropagationSelectUpdate(
      strValues,
      selectedArray,
      availData
    ).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "selectList"),
      ];
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  const deleteAPIUpdate = (param, mcbObj, isInitial = false) => {
    const strValues = param.strFilterValues;

    API.deleteUpdateData(strValues, mcbObj).then((data) => {
      if (data == Settings.success) {
        // getAvailList(param);
        !isInitial && getSelectList(param);
      }
    });
  };

  const getbatchId = (param, pgoostypeData, sendVrp, isRunMCB = false) => {
    const strValues = param.strFilterValues;
    if (isRunMCB) {
      strValues.pgoosType = "M";
    }
    if (pgoostypeData.pgoosType === "M") {
      let runData = null;
      API.getPgoospropagationselectBatchId(
        strValues,
        numItemsSelected,
        pgoostypeData,
        sendVrp
      ).then((BatchIddata) => {
        setBatchId(BatchIddata);
        setPgoosRunPropagationData(BatchIddata);
        setpgoospropsuccess(BatchIddata);
        const interval = setInterval(() => {
          API.getPgoospropagationrun(
            strValues,
            {
              batchId: BatchIddata?.pgoosLoad?.batchid,
              pgoosStatus: runData
                ? runData?.filterValues?.pgoosStatus
                : BatchIddata?.filterValues?.pgoosStatus,
              pgoosType: pgoostypeData?.pgoosType,
              totalCount: numItemsSelected,
              prodIter: runData?.prodIter
                ? runData?.prodIter
                : BatchIddata?.prodIter,
            },
            sendVrp
          ).then((data) => {
            runData = data;
            setPgoosRunPropagationData(data);

            if (
              data?.pgoosLoad?.status === "DONE" ||
              data?.filterValues?.pgoosStatus === "D"
            ) {
              clearInterval(interval);
              API.getPropagationFinish(data?.pgoosLoad?.batchid).then(
                (data) => {
                  setPgoosPropagationFinalPage(true);
                }
              );
            }
          });
        }, 3000);
      });
    } else {
      const runData = null;
      API.getPgoospropagationselectBatchId(
        strValues,
        numItemsSelected,
        pgoostypeData,
        sendVrp
      ).then((BatchIddata) => {
        setBatchId(BatchIddata);
        setPgoosRunPropagationData(BatchIddata);
        setpgoospropsuccess(BatchIddata);
      });
    }
  };

  const getResetPgoosBatch = (batchId) =>
    API.getPgoosBatchReset(batchId).then((data) => {
      setPgoosPropagationFinalPage(true);
    });

  const getAvailList = (param) => {
    isMakingRequestList.current = [...isMakingRequestList.current, "availList"];
    setIsMakingRequest(true);
    API.getHotelSolicitationAvail(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "availList"),
      ];
      setIsMakingRequest(false);
      setAPIData(data, Settings.PgoosPropagation.getPgoosPropagationAvail);
      getResetPgoosAvail();
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
      setAPIData(data, Settings.PgoosPropagation.getPgoosPropagationSelected);
    });
  };
  const getPgoosPropagationListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getPgoosPropagationList(requestPayload);
  };
  const getPgoosPropagationList = (param, orderBy = 0) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("pgs_Prop", JSON.stringify(param));

    setpanelData(param);
    getAvailList(param);
    getSelectList(param);
  };

  const getResetPgoosSelect = () => {
    //API.getResetPgoosSelect().then(() => {
    //});
  };

  const getResetPgoosAvail = () => {
    const checkboxes = document.getElementsByClassName("availGridPropagation");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = false;
      }
    }
  };

  const getFindFilter = () => {
    API.getHotelSolicitaionFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getPgoosStatus = () => {
    API.getPgoosStatus().then((data) => {
      setPgoosRunPropagationData(data);
      setPgoosStatus(data?.retval);
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
      data.PgoosPropagationAvailList,
      availGridRowArray,
      false
    );
    if (newData !== undefined) {
      data.PgoosPropagationAvailList = newData;
    }
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
        data.PgoosPropagationAvailList,
        availgridRows,
        true
      );
      data.PgoosPropagationAvailList = newData;
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
    paneldata.strFilterValues.orderBy = param;

    setpanelData({ ...paneldata });
    getAvailList(paneldata);
  };

  const handleOrderChangeSelect = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param;

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
    getPgoosPropagationList,
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
    deleteAPIUpdate,
    getbatchId,
    pgoospropsuccess,
    getPgoosStatus,
    pgoosStatus,
    pgoosRunPropagationData,
    pgoosPropagationFinalPage,
    getResetPgoosBatch,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    setIsMakingRequest,
    getResetPgoosAvail,
    getResetPgoosSelect,
    isMakingRequestList,
    setPgoosPropagationFinalPage,
    getPgoosPropagationListDup,
  };

  return (
    <PgoosPropagationContext.Provider value={hotelSolicitationContext}>
      {props.children}
    </PgoosPropagationContext.Provider>
  );
};

export const HotelSolicitationConsumer = PgoosPropagationContext.Consumer;
export default PgoosPropagationContext;
