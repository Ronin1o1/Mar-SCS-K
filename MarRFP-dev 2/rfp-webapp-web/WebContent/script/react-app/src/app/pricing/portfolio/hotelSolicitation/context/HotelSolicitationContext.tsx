import { trim } from "lodash";
import React, { useRef, useState } from "react";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import API from "../service/API";
import Settings from "./../static/Settings";
const prevNode = null;

// Set state variables and function
export interface IHotelSolicitMaintenanceContext {
  getFindFilter: () => void;
  FindFilterData: any;
  getShowOptions: () => void;
  showFilterOptions: any;
  getHotelSolicitationList: (requestPayload: any, orderBy?: number) => void;
  getHotelSolicitationListDup: (requestPayload: any, orderBy?: number) => void;
  availData: any;
  setavailData: (data: any) => void;
  selectData: any;
  setselectData: (data: any) => void;
  getSelectListonLoad: () => void;
  getAvailListonLoad: () => void;
  AvailgridRows: any;
  SelectedgridRows: any;
  initialSelectedgridRows: any;
  setInitialSelectedgridRows: (data: any) => void;
  showQuickSelectTop: boolean;
  showQuickSelectBottom: boolean;
  showDirectSelectBottom: boolean;
  showadditionalInfo: boolean;
  setAvailgridRows: (data: any) => void;
  setSelectedgridRows: (data: any) => void;
  setshowQuickSelectTop: (data: any) => void;
  setshowQuickSelectBottom: (data: any) => void;
  setShowDirectSelectBottom: (data: any) => void;
  setshowadditionalInfo: (data: any) => void;
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
  directSelectBottomSaved: (data: any, data2: any, data3: any) => void;
  quickSelectGrid1BtnClicked: (data: any) => void;
  quickSelectGrid2BtnClicked: (data: any) => void;
  directSelectGrid2BtnClicked: (data: any) => void;
  clearDirectSelect: () => void;
  selectBtnClicked: (data: any, data2: any) => void;
  selectAllBtnClicked: (data: any, data2: any) => void;
  unSelectBtnClicked: (data: any, data2: any) => void;
  unSelectAllBtnClicked: (data: any, data2: any) => void;
  panelData: any;
  setpanelData: (data: any) => void;
  SendEmailOnclick: (data: any, data2: any, data3: any, data4: any) => void;
  sendMailCheckboxUpdated: (
    data: any,
    data2: any,
    data3: any,
    data4: any,
    data5: any
  ) => void;
  sendMail: any;
  setSendMailData: (data: any) => void;
  additionalInfoBtnClicked: (data: any) => void;
  sendMailErrorMessage: any;
  setsendMailErrorMessage: (data: any) => any;
  setsenMailMessagePopup: (data: any) => any;
  senMailMessagePopup: any;
  setsenMailPopup: (data: any) => void;
  sendMailBtnClicked: (data: any, data1: any, data2: any, data3: any) => void;
  sendFromList: any;
  setsendFromList: (data: any) => void;
  saveHandler?: (data: any, data2: any) => void;
  cancelHandler?: (data: any) => void;
  numItemsSelected?: any;
  numItems?: any;
  setnumItemsSelected: (data: any) => void;
  setnumItems: (data: any) => void;
  handleOrderChange: (data: any, data2: any) => void;
  handleOrderChangeSelect: (data: any, data2: any) => void;
  closeAdditionalInfoButton: (data: any) => void;
  getAvailList: any;
  getSelectList: any;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  isMakingRequestAvailList?: boolean;
  setIsMakingRequestAvailList?: (isRequest: boolean) => void;
  isMakingRequestList: any;
}

const HotelSolicitationContext = React.createContext(
  {} as IHotelSolicitMaintenanceContext
);

const initialPayloadAvail = {
  hotelSolicitAvailList: null,
  notfound: "",
  tempList: [],
};
const initialPayloadSelect = {
  hotelSolicitSelectedlList: null,
  emailNotSent: null,
};

export const HotelSolicitationContextProvider = (props) => {
  // Set state variables and function
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [FindFilterData, setFindFilter] = useState([]);
  const [availData, setavailData] = useState(initialPayloadAvail);
  const [selectData, setselectData] = useState(initialPayloadSelect);
  const [AvailgridRows, setAvailgridRows] = useState([]);
  const [SelectedgridRows, setSelectedgridRows] = useState([]);
  const [initialSelectedgridRows, setInitialSelectedgridRows] = useState([]);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setshowQuickSelectBottom] = useState(false);
  const [showDirectSelectBottom, setShowDirectSelectBottom] = useState(false);
  const [showadditionalInfo, setshowadditionalInfo] = useState(false);
  const [panelData, setpanelData] = useState({});
  const [sendMail, setSendMailData] = useState([]);
  const [sendMailErrorMessage, setsendMailErrorMessage] = useState([]);
  const [senMailMessagePopup, setsenMailPopup] = useState(false);
  const [sendFromList, setsendFromList] = useState({});
  const [numItemsSelected, setnumItemsSelected] = useState(0);
  const [numItems, setnumItems] = useState(0);
  const [initialLoadAvail, setinitialLoadAvail] = useState(true);
  const [initialLoadSelect, setinitialLoadSelect] = useState(true);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [isMakingRequestAvailList, setIsMakingRequestAvailList] =
    useState(false);
  const [prevSelHotelAvail, setPrevSelHotelAvail] = useState();
  const [prevSelHotelSelec, setPrevSelHotelSelec] = useState();
  const isMakingRequestList = useRef([]);
  const [contentLoadParam, setContentLoadParam] = useState(null);
  const [prevSelectedChaseEmail, setPrevSelectedChaseEmail] = useState();

  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    if (data && type) {
      if (type == Settings.hotelSolicitationAvail.gethotelSolicitationAvail) {
        setinitialLoadAvail(false);

        if (data.hotelSolicitAvailList.length > 0) {
          const newData = [];
          data.hotelSolicitAvailList.map((element) => {
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
              willnotprice: element.willnotprice,
              status_CBC: element.status_CBC,
              hotelid_checkbox: false,
            });
          });
          data.hotelSolicitAvailList = newData;
        }
        const records = data.hotelSolicitAvailList.length;
        setAvailgridRows([]);
        setavailData({
          ...availData,
          hotelSolicitAvailList: data.hotelSolicitAvailList,
          notfound: data.notfound,
          tempList: data.tempList,
        });
        setnumItems(records);
      } else if (
        type == Settings.hotelSolicitationAvail.getHotelSolicitationSelect
      ) {
        setinitialLoadSelect(false);
        if (data.hotelSolicitSelectedlList.length > 0) {
          const newData = [];
          data.hotelSolicitSelectedlList.map((element) => {
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
              email_sent_flag: element.email_sent_flag,
              to_send_email: element.to_send_email,
              status: element.status,
              check_rate: element.check_rate,
              chasemail_sent_flag: element.chasemail_sent_flag,
              to_send_chasemail: element.to_send_chasemail,
              hotelid_checkbox: false,
            });
          });

          data.hotelSolicitSelectedlList = newData;
        }
        setSelectedgridRows([]);
        setselectData({
          ...selectData,
          hotelSolicitSelectedlList: data.hotelSolicitSelectedlList,
          emailNotSent: data.emailNotSent,
        });
        const records = data.hotelSolicitSelectedlList.length;
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
          const prevSelIndex = data.hotelSolicitAvailList.findIndex(
            (item) => item.hotelid == prevSelHotelAvail
          );
          const currSelIndex = data.hotelSolicitAvailList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if (prevSelIndex < currSelIndex) {
            for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
              newdata.hotelSolicitAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitAvailList[i].hotelid
              );
            }
          } else {
            for (let i = currSelIndex; i < prevSelIndex; i++) {
              newdata.hotelSolicitAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitAvailList[i].hotelid
              );
            }
          }
          //Shift double click functionality
          if (prevSelIndex == currSelIndex) {
            for (
              let i = currSelIndex;
              i < newdata.hotelSolicitAvailList.length;
              i++
            ) {
              newdata.hotelSolicitAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.hotelSolicitAvailList[i].hotelid
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
            for (
              var element = 0;
              element < newdata.hotelSolicitAvailList.length;
              element++
            ) {
              if (
                newdata.hotelSolicitAvailList[element].hotelid ==
                rowData.hotelid
              ) {
                newdata.hotelSolicitAvailList[element].hotelid_checkbox =
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
            element < newdata.hotelSolicitAvailList.length;
            element++
          ) {
            if (
              newdata.hotelSolicitAvailList[element].hotelid == rowData.hotelid
            ) {
              newdata.hotelSolicitAvailList[element].hotelid_checkbox = checked;
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
          //Shift double click functionality
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
          //end
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

    if (param == Settings.chasemail || param == Settings.sendemail) {
      const data = selectData.hotelSolicitSelectedlList;

      const index = data.hotelSolicitSelectedlList.findIndex(
        (item) => item.hotelid === rowData.hotelid
      );

      if (index >= 0 && param == Settings.chasemail) {
        data.hotelSolicitSelectedlList[index].chasemail_sent_flag = checked;
      }

      if (index >= 0 && param == Settings.sendemail) {
        data.hotelSolicitSelectedlList[index].to_send_email = checked;
      }
    }
  };
  const getDuplicateArrayElements = (arr, item) => {
    const uniq = {};
    const uniqArray = [];
    const arrFiltered = arr.filter(
      (obj) => !uniq[obj.hotelid] && (uniq[obj.hotelid] = true)
    );
    arrFiltered.forEach((element) => {
      if (element.hotelid !== item) {
        uniqArray.push(element);
      }
    });
    return uniqArray;
  };

  const sendMailCheckboxUpdated = (
    rowData,
    data,
    feild,
    sendMailArray,
    event
  ) => {
    let sendMailArr = [...sendMail];
    let dataObj = { ...data };
    let updatedDataObj = null;
    const { checked } = event.target;
    if (checked) {
      setPrevSelectedChaseEmail(rowData.hotelid);
      if (
        (event?.shiftKey || event?.nativeEvent?.shiftKey) &&
        sendMailArray.length > 0 &&
        prevSelectedChaseEmail
      ) {
        const prevSelIndex = data.hotelSolicitSelectedlList.findIndex(
          (item) => item.hotelid == prevSelectedChaseEmail
        );
        const currSelIndex = data.hotelSolicitSelectedlList.findIndex(
          (item) => item.hotelid == rowData.hotelid
        );
        if (prevSelIndex < currSelIndex) {
          for (let i = prevSelIndex + 1; i <= currSelIndex; i++) {
            if (currSelIndex >= 0 && feild == Settings.chasemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_email;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.chaseEmailCheckAlert);
                break;
              }
            } else if (currSelIndex >= 0 && feild == Settings.sendemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_chasemail;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.sendMailAlert);
                break;
              }
            }
            updatedDataObj = updateEmailList(
              data.hotelSolicitSelectedlList[i],
              dataObj,
              feild,
              sendMailArr,
              true,
              checked
            );
            sendMailArr = updatedDataObj.sendMailArray;
            dataObj = updatedDataObj.data;
          }
        } else {
          for (let i = currSelIndex; i < prevSelIndex; i++) {
            if (currSelIndex >= 0 && feild == Settings.chasemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_email;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.chaseEmailCheckAlert);
                break;
              }
            } else if (currSelIndex >= 0 && feild == Settings.sendemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_chasemail;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.sendMailAlert);
                break;
              }
            }
            updatedDataObj = updateEmailList(
              data.hotelSolicitSelectedlList[i],
              dataObj,
              feild,
              sendMailArr,
              true,
              checked
            );
            sendMailArr = updatedDataObj.sendMailArray;
            dataObj = updatedDataObj.data;
          }
        }

        //Shift double click functionality
        if (prevSelIndex == currSelIndex) {
          for (
            let i = currSelIndex;
            i < data.hotelSolicitSelectedlList.length;
            i++
          ) {
            if (currSelIndex >= 0 && feild == Settings.chasemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_email;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.chaseEmailCheckAlert);
                break;
              }
            } else if (currSelIndex >= 0 && feild == Settings.sendemail) {
              const chasecheck =
                data.hotelSolicitSelectedlList[currSelIndex].to_send_chasemail;

              if (chasecheck != null && chasecheck == Settings.valueYN.Y) {
                alert(Settings.sendMailAlert);
                break;
              }
            }
            updatedDataObj = updateEmailList(
              data.hotelSolicitSelectedlList[i],
              dataObj,
              feild,
              sendMailArr,
              true,
              checked
            );
            sendMailArr = updatedDataObj.sendMailArray;
            dataObj = updatedDataObj.data;
          }
        }
        //end
      } else {
        updatedDataObj = updateEmailList(
          rowData,
          dataObj,
          feild,
          sendMailArr,
          false,
          checked
        );
        sendMailArr = updatedDataObj.sendMailArray;
        dataObj = updatedDataObj.data;
      }
    } else {
      updatedDataObj = updateEmailList(
        rowData,
        dataObj,
        feild,
        sendMailArr,
        false,
        checked
      );
      sendMailArr = updatedDataObj.sendMailArray;
      dataObj = updatedDataObj.data;
    }

    setSendMailData([...sendMailArr]);
    setselectData({ ...dataObj });
  };

  const updateEmailList = (
    rowData,
    data,
    feild,
    sendMailArray,
    isShiftKeyPressed?,
    checked?
  ) => {
    const index = data.hotelSolicitSelectedlList.findIndex(
      (item) => item.hotelid === rowData.hotelid
    );
    let chasecheck = "";
    if (index >= 0 && feild == Settings.chasemail) {
      chasecheck = data.hotelSolicitSelectedlList[index].to_send_email;

      if (
        chasecheck != null &&
        chasecheck == Settings.valueYN.Y &&
        !isShiftKeyPressed
      ) {
        alert(Settings.chaseEmailCheckAlert);
        data.hotelSolicitSelectedlList[index].to_send_chasemail =
          Settings.valueYN.N;
      } else {
        data.hotelSolicitSelectedlList[index].to_send_chasemail = checked
          ? Settings.valueYN.Y
          : Settings.valueYN.N;
      }
    }

    if (index >= 0 && feild == Settings.sendemail) {
      chasecheck = data.hotelSolicitSelectedlList[index].to_send_chasemail;

      if (
        chasecheck != null &&
        chasecheck == Settings.valueYN.Y &&
        !isShiftKeyPressed
      ) {
        alert(Settings.sendMailAlert);
        data.hotelSolicitSelectedlList[index].to_send_email =
          Settings.valueYN.N;
      } else {
        data.hotelSolicitSelectedlList[index].to_send_email = checked
          ? Settings.valueYN.Y
          : Settings.valueYN.N;
      }
    }

    if (rowData.hotelid_checkbox == true) {
      sendMailArray = getDuplicateArrayElements(sendMailArray, rowData.hotelid);
      sendMailArray.push({
        hotelid: rowData.hotelid,
        move: Settings.valueYN.Y,
        sendemail: data.hotelSolicitSelectedlList[index].to_send_email
          ? data.hotelSolicitSelectedlList[index].to_send_email
          : "N",
        chasemail: data.hotelSolicitSelectedlList[index].to_send_chasemail
          ? data.hotelSolicitSelectedlList[index].to_send_chasemail
          : "N",
      });
    } else {
      sendMailArray = getDuplicateArrayElements(sendMailArray, rowData.hotelid);
      sendMailArray.push({
        hotelid: rowData.hotelid,
        sendemail: data.hotelSolicitSelectedlList[index].to_send_email
          ? data.hotelSolicitSelectedlList[index].to_send_email
          : "N",
        chasemail: data.hotelSolicitSelectedlList[index].to_send_chasemail
          ? data.hotelSolicitSelectedlList[index].to_send_chasemail
          : "N",
      });
    }
    return { sendMailArray: sendMailArray, data: data };
  };

  const selectBtnClicked = (param, availGridArray) => {
    if (availGridArray.length > 0) {
      isMakingRequestList.current = [
        ...isMakingRequestList.current,
        "availList",
      ];
      setIsMakingRequestAvailList(true);
      API.setHotelSolicitationAvailUpdate(param, availGridArray).then(
        (data) => {
          isMakingRequestList.current = [
            ...isMakingRequestList.current.filter((l) => l != "availList"),
          ];
          setIsMakingRequestAvailList(false);
          if (data == Settings.success) {
            getAvailList(param);
            getSelectList(param);
          }
        }
      );
    }
  };
  const unSelectBtnClicked = (param, selectArray) => {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
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

    API.setHotelSolicitationSelectUpdate(accountrecid, selectedArray).then(
      (data) => {
        if (data == Settings.success || data === true) {
          getAvailList(param);
          getSelectList(param);
        }
      }
    );
  };
  const selectAllBtnClicked = (param, availArray) => {
    const selectedArray = [];
    availArray.hotelSolicitAvailList.forEach((element) => {
      selectedArray.push(element.hotelid);
      element.hotelid_checkbox = true;
    });

    selectBtnClicked(param, selectedArray);
  };
  const unSelectAllBtnClicked = (param, selectArray) => {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
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
      const objFmt = document.getElementById(
        "solicitSelect" +
          selectArray.hotelSolicitSelectedlList[element].hotelid +
          "move"
      );
      if (objFmt != null) {
        objFmt.checked = true;
      }
      selectedArray.push({
        hotelid: selectArray.hotelSolicitSelectedlList[element].hotelid,
        move: Settings.valueYN.Y,
      });
    }

    API.setHotelSolicitationSelectUpdate(accountrecid, selectedArray).then(
      (data) => {
        isMakingRequestList.current = [
          ...isMakingRequestList.current.filter((l) => l != "selectList"),
        ];
        setIsMakingRequest(false);
        if (data == Settings.success || data === true) {
          getAvailList(param);
          getSelectList(param);
        }
      }
    );
  };

  const getAvailList = (param) => {
    if (param.strFilterValues.accountFilter.accountrecid != null) {
      param.strFilterValues.accountFilter.accountrecid = parseInt(
        param.strFilterValues.accountFilter.accountrecid
      );
    }
    isMakingRequestList.current = [...isMakingRequestList.current, "availList"];
    setIsMakingRequestAvailList(true);
    API.getHotelSolicitationAvail(param).then((data) => {
      isMakingRequestList.current = [
        ...isMakingRequestList.current.filter((l) => l != "availList"),
      ];
      setIsMakingRequestAvailList(false);
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

      if (
        data.emailNotSent != null &&
        data.emailNotSent != "" &&
        data.emailNotSent.length > 0
      ) {
        sendMail.forEach((element) => {
          element.sendemail = "N";
        });

        const newData = FilteredGridSelectUtils.setCheckox(
          data.hotelSolicitSelectedlList,
          sendMail,
          false
        );
        data.hotelSolicitSelectedlList = newData;
        setSelectedgridRows([]);
        setselectData({
          ...selectData,
          hotelSolicitSelectedlList: data.hotelSolicitSelectedlList,
        });

        onContentLoad(contentLoadParam, data.emailNotSent);
      } else {
        setsendMailErrorMessage([]);
        setSendMailData([]);
      }

      setInitialSelectedgridRows(data.hotelSolicitSelectedlList);
      setIsMakingRequest(false);
      setAPIData(
        data,
        Settings.hotelSolicitationAvail.getHotelSolicitationSelect
      );
    });
  };

  const getDirectSelectList = (data) => {
    const str = data.split(",").map(function (item) {
      const value = item.trim();
      return value;
    });

    return str.toString();
  };

  const getHotelSolicitationListDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getHotelSolicitationList(requestPayload);
  };

  const getHotelSolicitationList = (param, orderBy = 0) => {
    localStorage.setItem("setLocalStorage", "Y");
    localStorage.setItem("Hot_Sol", JSON.stringify(param));

    if (param.strFilterValues.list) {
      param.strFilterValues.list = getDirectSelectList(
        param.strFilterValues.list
      );
    }

    setpanelData(param);
    getAvailList(param);
    getSelectList(param);
    sessionStorage.setItem("paramsforGet", JSON.stringify(param));
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
  const directSelectGrid2BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showDirectSelectBottom : showDirectSelectBottom;
    setShowDirectSelectBottom(value);
  };

  const sendMailBtnClicked = (fileObj, param, sendmailArray, selectdata) => {
    SendEmailOnclick(fileObj, param, sendmailArray, selectdata);
  };

  const SendEmailOnclick = (fileObj, param, sendmailArray, selectdata) => {
    if (Object.keys(param).length > 0) {
      const accountrecid = param.strFilterValues.accountFilter.accountrecid;

      if (accountrecid != "") {
        if (fileObj && fileObj.name) {
          if (FilteredGridSelectUtils.validateFile(fileObj.name)) {
            getContactInfo(fileObj, param, sendmailArray, selectdata);
          }
        } else {
          getContactInfo(fileObj, param, sendmailArray, selectdata);
        }
      }
    } else {
      alert(Settings.alertAccountCheck);
    }
  };

  const getContactInfo = (fileObj, param, sendmailArray, selectdata) => {
    API.getContactType(param.strFilterValues.accountFilter.accountrecid).then(
      (data) => {
        contactInfoCallback(data, fileObj, sendmailArray, param, selectdata);
      }
    );
  };

  const contactInfoCallback = (
    thedata,
    param,
    sendmailArray,
    panelDataParam,
    selectdata
  ) => {
    const contactDetails = thedata.items[0];

    let msg;
    let fileName = "";

    let fileFlag = false;
    if (param.length != 0) {
      fileName = param.name;
      fileFlag = true;
    }

    if (contactDetails != "") {
      if (fileName.length == 0) {
        msg =
          Settings.emailsWillBeSentfrom +
          contactDetails +
          "." +
          "\n\n" +
          Settings.continueWithoutAttachement +
          "\n\n" +
          Settings.clickCancel;
      } else {
        const file = fileName.substring(fileName.lastIndexOf("\\") + 1);
        msg =
          Settings.emailsWillBeSentfrom +
          contactDetails +
          "." +
          "\n\n" +
          Settings.continueWithAttachment +
          file +
          "." +
          "\n\n" +
          Settings.clickOktoContinue +
          "\n\n" +
          Settings.clickCancelToGoBack;
      }

      if (confirm(msg)) {
        API.sendEmailpost(
          sendmailArray,
          panelDataParam,
          fileFlag,
          param,
          fileName
        ).then((data) => {
          setContentLoadParam(param);

          const param1 = JSON.parse(sessionStorage.getItem("paramsforGet"));
          getSelectList(param1);
        });
      }
    }
  };

  const onContentLoad = (param, sendmailArray) => {
    if (param && param.length != 0) {
      if (FilteredGridSelectUtils.validateFile(param.name) == false) {
        alert(Settings.fileCannotBeAttached + "\n\n" + Settings.formatMessage);
      }
    }
    setsendMailErrorMessage(sendmailArray);
    setsenMailMessagePopup(true);
  };

  const additionalInfoBtnClicked = (param, closeModal?: boolean) => {
    if (Object.keys(param).length > 0) {
      API.hotelsolicitationemailinfonew(
        param.strFilterValues.accountFilter.accountrecid,
        Settings.addemailtext_screentype
      ).then((data) => {
        sessionStorage.setItem("sendFromList", JSON.stringify(data));
        sessionStorage.setItem("panelData", JSON.stringify(panelData));
        setsendFromList(data);
        closeAdditionalInfoButton(true);
        const url =
          window.location.origin +
          window.location.pathname.substring(
            0,
            window.location.pathname.lastIndexOf("/")
          ) +
          "/sendAdditionalInfo";
        const pageOpen = window.open(
          url,
          "Additional Email Information",
          "LOCATION=no,MENUBAR=no,SCROLLBARS=no,resizable=no,status=no,toolbar=no,left=500, top=250, width=580, height=300"
        );
        pageOpen.document.title = "Additional Email Information";
      });
    } else {
      alert("Please select an account.");
      closeAdditionalInfoButton(false);
    }
  };

  const closeAdditionalInfoButton = (closeModal?: boolean) => {
    const value = closeModal ? !showadditionalInfo : showadditionalInfo;
    setshowadditionalInfo(value);
  };

  const saveHandler = (param, paneldata) => {
    if (param.duedate_foremail == "Invalid date") {
      param.duedate_foremail = null;
    } else {
      param.duedate_foremail = param.duedate_foremail;
    }
    if (param.shortDuedate_foremail == "Invalid date") {
      param.shortDuedate_foremail = null;
    } else {
      param.shortDuedate_foremail = param.shortDuedate_foremail;
    }
    const accountrecid = paneldata.strFilterValues.accountFilter.accountrecid;
    API.hotelsolicitationAddInfo(accountrecid, param).then((data) => {
      if (data == "success") {
        cancelHandler(true);
      } else {
        cancelHandler(true);
        alert("Error when saving additional email information!");
      }
    });
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
      avail_data.hotelSolicitAvailList,
      availGridRowArray,
      false
    );
    const newData1 = FilteredGridSelectUtils.setCheckox(
      select_data.hotelSolicitSelectedlList,
      selectedGridRowArray,
      false
    );
    avail_data.hotelSolicitAvailList = newData;
    select_data.hotelSolicitSelectedlList = newData1;
    setAvailgridRows([]);
    setSelectedgridRows([]);
    setavailData(avail_data);
    setselectData(select_data);
  };

  const quickSelectTopSaved = (param, availgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        availgridRows.push(element.hotelid);
      });
      setAvailgridRows(availgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.hotelSolicitAvailList,
        availgridRows,
        true
      );
      data.hotelSolicitAvailList = newData;
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

  const clearDirectSelect = () => {
    if (initialSelectedgridRows.length > 0) {
      setSelectedgridRows([]);
      setselectData({
        ...selectData,
        hotelSolicitSelectedlList: initialSelectedgridRows,
      });
    }
    setShowDirectSelectBottom(false);
  };

  const directSelectBottomSaved = (param, initialSelectedgridRows, data) => {
    if (param.length > 0) {
      param = param.filter((p) => p != undefined);
      const flatParam = param.map((p) => p.hotelid);
      const newData = filterPlainArray(initialSelectedgridRows, flatParam);

      data.hotelSolicitSelectedlList = newData;
      setselectData(data);
    }

    directSelectGrid2BtnClicked(true);
  };
  const getValue = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

  const filterPlainArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // // ignores an empty filter
        // if (!filters[key].length) return true;
        return filters.find(
          (filter) => getValue(filter) === getValue(item["hotelid"])
        );
      });
    });
  };
  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;
    if (paneldata.strFilterValues.list) {
      paneldata.strFilterValues.list = getDirectSelectList(
        paneldata.strFilterValues.list
      );
    }
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
    directSelectGrid2BtnClicked,
    clearDirectSelect,
    sendMailBtnClicked,
    additionalInfoBtnClicked,
    deselectBtnClicked,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    directSelectBottomSaved,
    SendEmailOnclick,
    getContactInfo,
    contactInfoCallback,
    getFindFilter,
    getShowOptions,
    FindFilterData,
    showFilterOptions,
    getHotelSolicitationList,
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
    initialSelectedgridRows,
    setInitialSelectedgridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    showDirectSelectBottom,
    showadditionalInfo,
    setAvailgridRows,
    setSelectedgridRows,
    setshowQuickSelectTop,
    setshowQuickSelectBottom,
    setShowDirectSelectBottom,
    setshowadditionalInfo,
    panelData,
    setpanelData,
    sendMailCheckboxUpdated,
    sendMail,
    setSendMailData,
    sendMailErrorMessage,
    setsendMailErrorMessage,
    setsenMailMessagePopup,
    senMailMessagePopup,
    setsenMailPopup,
    sendFromList,
    setsendFromList,
    saveHandler,
    cancelHandler,
    numItemsSelected,
    numItems,
    setnumItemsSelected,
    setnumItems,
    handleOrderChange,
    handleOrderChangeSelect,
    closeAdditionalInfoButton,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    setIsMakingRequest,
    isMakingRequestList,
    setIsMakingRequestAvailList,
    isMakingRequestAvailList,
    getHotelSolicitationListDup,
  };

  return (
    <HotelSolicitationContext.Provider value={hotelSolicitationContext}>
      {props.children}
    </HotelSolicitationContext.Provider>
  );
};

export const HotelSolicitationConsumer = HotelSolicitationContext.Consumer;
export default HotelSolicitationContext;
