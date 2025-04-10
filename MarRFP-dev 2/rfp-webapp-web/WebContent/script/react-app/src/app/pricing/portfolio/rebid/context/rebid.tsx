import React, { useState, useContext } from "react";
import Utils from "../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "./../static/Settings";
import { format } from "date-fns";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
// Set state variables and function
interface IRebidContext {
  FindFilterData: any;
  showFilterOptions: any;
  showMaxAlert: any;
  totalRecord: any;
  loader: any;
  setShowMaxAlert: (data: any) => void;
  setHideNoData: (data: any) => void;
  numItems?: any;
  panelData: any;
  getRequestPanelData: (requestPayload: any, orderBy?: number) => void;
  getRequestPanelDataDup: (requestPayload: any, orderBy?: number) => void;
  getFindFilter: () => void;
  getshowFilterOptions: () => void;
  filteredHotelList: any;
  initialHotelList: any;
  handleOrderChange: (data: any, data1: any) => void;
  onChangeFieldValue: (data: any, data1: any, field: any, data3: any) => void;
  lastUpdated: any;
  save: (data1: any, data2: any, data3: any) => void;
  getContactType: (data: any) => void;
  contactTypes: any;
  sendMail: (data: any) => void;
  ajaxSaveInprogress: any;
  ajaxSave: (data: any) => void;
  defaultDueDate: any;
  setDefaultDueDate: (data: any) => void;
  sendFromList: any;
  additionalInfoBtnClicked: (data: any) => void;
  additionalEmailInfoUpdateInprogress: any;
  hotelsolicitationemailinfoupdate: (data: any, data2: any) => void;
  setContactTypes: (data: any) => any;
  isMakingRequest: any;
  clearDirectSelect: () => void;
  setAPIData?: (data: any) => void;
  setInitialData?: (data: any) => void;
}

const RebidContext = React.createContext({} as IRebidContext);

export const RebidContextProvider = (props) => {
  // Set state variables and function
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [panelData, setpanelData] = useState({});
  const [loader, showLoader] = useState(false);
  const [FindFilterData, setFindFilter] = useState([]);
  const [numItems, setnumItems] = useState(0);
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [hideNoData, setHideNoData] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [filteredHotelList, setFilteredHotelList] = useState();
  const [initialHotelList, setinitialHotelList] = useState();
  const [lastUpdated, setlastUpdated] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);

  const [ajaxSaveInprogress, setAjaxSaveInprogress] = useState({
    progress: false,
    status: "failed",
  });
  const [defaultDueDate, setDefaultDueDate] = useState(Utils.getDefaultDate(5));
  const [sendFromList, setSendFromList] = useState([]);
  const [
    additionalEmailInfoUpdateInprogress,
    setAdditionalEmailInfoUpdateInprogress,
  ] = useState(false);
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const getshowFilterOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  const getFindFilter = () => {
    API.getPortfolioRebidFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getRequestPanelDataDup = (requestPayload) => {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      requestPayload = JSON.parse(requestPayload);
    }
    getRequestPanelData(requestPayload);
  };
  const getRequestPanelData = (param, orderBy = 0, mailInd = "") => {
    try {
      setIsMakingRequest(true);
      const emptyObj = {
        portfolioRebidList: [],
        emailNotSent: [],
      };
      localStorage.setItem("setLocalStorage", "Y");
      localStorage.setItem("port_Rebid", JSON.stringify(param));

      const activeIndex = appContext?.activeRowPortfolio;
      const s =
        filteredHotelList && filteredHotelList.portfolioRebidList[activeIndex];
      if (
        filteredHotelList &&
        activeIndex != null &&
        s &&
        s.changed == "Y" &&
        mailInd == ""
      ) {
        const paramObj = {
          portfolioRebidList: [s],
          strFilterValues: {
            ...param.strFilterValues,
            orderBy: orderBy,
          },
        };

        ajaxSave(paramObj).then(() => {
          const requestPayloadData = {
            ...param,
            period: param.strFilterValues.year,
            strFilterValues: {
              ...param.strFilterValues,
              orderBy: orderBy,
            },
          };
          setpanelData(requestPayloadData);
          API.getPortfolioRebid(requestPayloadData).then((data) => {
            setTotalRecord(data.portfolioRebidList.length);
            if (data.portfolioRebidList.length > 750) {
              setShowMaxAlert(true);
              setHideNoData(true);
              setAPIData(emptyObj);
            } else {
              setHideNoData(false);
              setInitialData(data);
              setAPIData(data);
            }
            setIsMakingRequest(false);
          });
        });
      } else {
        const requestPayloadData = {
          ...param,
          period: param.strFilterValues.year,
          strFilterValues: {
            ...param.strFilterValues,
            orderBy: orderBy,
          },
        };
        setpanelData(requestPayloadData);
        API.getPortfolioRebid(requestPayloadData).then((data) => {
          setIsMakingRequest(false);
          setTotalRecord(data.portfolioRebidList.length);
          if (data.portfolioRebidList.length > 750) {
            setShowMaxAlert(true);
            setHideNoData(true);
            setAPIData(emptyObj);
          } else {
            setHideNoData(false);
            setInitialData(data);
            setAPIData(data);
          }
        });
      }
    } catch (err) {
      console.log(err);
      setIsMakingRequest(false);
    }
  };

  const setAPIData = (data) => {
    const records = data.length;

    data?.portfolioRebidList?.forEach((rec) => {
      rec["rebid_due"] = rec.shortRebid_due ? rec.shortRebid_due : "";
      rec["rebid_due2"] = rec.shortRebid_due2 ? rec.shortRebid_due2 : "";
      rec["rebid_due3"] = rec.shortRebid_due3 ? rec.shortRebid_due3 : "";
    });
    setFilteredHotelList(data);
    setnumItems(records);
  };

  const setInitialData = (data) => {
    const records = data.length;

    data?.portfolioRebidList?.forEach((rec) => {
      rec["rebid_due"] = rec.shortRebid_due ? rec.shortRebid_due : "";
      rec["rebid_due2"] = rec.shortRebid_due2 ? rec.shortRebid_due2 : "";
      rec["rebid_due3"] = rec.shortRebid_due3 ? rec.shortRebid_due3 : "";
    });
    setinitialHotelList(data);
    setnumItems(records);
  };

  const handleOrderChange = (paneldata, param) => {
    if (paneldata.strFilterValues) {
      paneldata.strFilterValues.orderBy = param;
      getRequestPanelData(paneldata, param);
    }
  };

  const setValueCheckboxField = (
    item,
    checked,
    rebidstatus_idIndex,
    index,
    field
  ) => {
    const obj = {};

    if (item["rebidstatus_id"] && item["rebidstatus_id"] > 1) {
      obj["rebid_flag"] = checked == true ? "Y" : "N";
      if (checked == true) {
        obj["rebid_due"] = item["rebid_due" + rebidstatus_idIndex]
          ? new Date(item["rebid_due" + rebidstatus_idIndex]).getTime()
          : defaultDueDate;
      } else {
        obj["rebid_due"] = defaultDueDate;
      }
    } else {
      obj["rebid_flag"] = checked == true ? "Y" : "N";
      obj["rebid_due"] =
        checked == true
          ? new Date(item["rebid_due" + rebidstatus_idIndex]).getTime()
          : defaultDueDate;
    }
    obj["rebidstatus_desc"] = checked == true ? "To be Rebid" : "";
    return obj;
  };

  const onChangeFieldValue = (rowData, data, field, event) => {
    const { checked } = event.target || event;
    data.portfolioRebidList.map((item) => {
      if (item.hotelid == rowData.hotelid) {
        if (field == "rebid_flag") {
          item.rebid_flag = checked ? "Y" : "N";
          item.rebid_due = defaultDueDate;
          //item.rebidstatus_desc = checked ? "To be Rebid" : "";

          item.rebid_flag2 = null;
          item.rebid_due2 = null;
          item.rebidstatus_desc2 = null;

          item.rebid_flag3 = null;
          item.rebid_due3 = null;
          item.rebidstatus_desc3 = null;
        }

        if (field == "rebid_flag2") {
          const value2 = setValueCheckboxField(item, checked, 2, 1, field);
          item.rebid_flag2 = value2["rebid_flag"];
          item.rebid_due2 = value2["rebid_due"];
          item.rebidstatus_desc2 = value2["rebidstatus_desc"];

          item.rebid_flag3 = null;
          item.rebid_due3 = null;
          item.rebidstatus_desc3 = null;
          //item.rebidRound1Editable = true;
        }

        if (field == "rebid_flag3") {
          const value = setValueCheckboxField(item, checked, 3, 2, field);
          item.rebid_flag3 = value["rebid_flag"];
          item.rebid_due3 = value["rebid_due"];
          item.rebidstatus_desc3 = value["rebidstatus_desc"];

          //item.rebidRound2Editable = true;
        }

        if (field == "to_send_chasemail") {
          item.to_send_chasemail = checked == true ? "Y" : "N";
        }
        switch (field) {
          case Settings.tableColumns.rebid_due.field:
            item.rebid_due = event?.target?.value || event.value;
            break;
          case Settings.tableColumns.rebid_due2.field:
            item.rebid_due2 = event?.target?.value || event.value;
            break;
          case Settings.tableColumns.rebid_due3.field:
            item.rebid_due3 = event?.target?.value || event.value;
            break;
        }
        item.changed = "Y";
      }
      return item;
    });

    setFilteredHotelList(data);
  };

  const save = (data, index, panelData) => {
    setAjaxSaveInprogress({ progress: true, status: "failed" });
    API.update(data[index], panelData).then((data) => {
      setAjaxSaveInprogress({ progress: false, status: "success" });
      setAPIData(data);
    });
  };

  const getContactType = (params) => {
    API.getContactType(params).then((data) => {
      setContactTypes(data.items);
    });
  };

  const sendMail = (params) => {
    const sendMailParams = Object.create(params);
    try {
      sendMailParams.strPortfolioRebidList.portfolioRebidList.forEach(
        (data) => {
          data.changed = data.changed === null ? "N" : data.changed;
          data.strRebid_due =
            data.rebid_due === "" || data.rebid_due === null
              ? null
              : format(new Date(data.rebid_due), "MM/dd/yyyy");
          data.strRebid_due2 =
            data.rebid_due2 === "" || data.rebid_due2 === null
              ? null
              : format(new Date(data.rebid_due2), "MM/dd/yyyy");
          data.strRebid_due3 =
            data.rebid_due3 === "" || data.rebid_due3 === null
              ? null
              : format(new Date(data.rebid_due3), "MM/dd/yyyy");
          delete data.rebid_due;
          delete data.rebid_due2;
          delete data.rebid_due3;
        }
      );

      API.sendMail(sendMailParams).then((data) => {
        getRequestPanelData(panelData, "", "mail");
        const elm = document.getElementById("hotelname");
        if (elm !== undefined && elm !== null) elm.scrollIntoView(true);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const ajaxSave = (params) => {
    try {
      setAjaxSaveInprogress({ status: "failed", progress: true });
      if (params.portfolioRebidList) {
        params.portfolioRebidList?.forEach((data) => {
          data.changed = data.changed === null ? "N" : data.changed;
          delete data.shortRebid_due;
          delete data.shortRebid_due2;
          delete data.shortRebid_due3;
          data.strRebid_due =
            data.strRebid_due === "" ||
            data.strRebid_due === null ||
            data.strRebid_due === undefined
              ? null
              : format(new Date(data.strRebid_due), "MM/dd/yyyy");
          data.strRebid_due2 =
            data.strRebid_due2 === "" ||
            data.strRebid_due2 === null ||
            data.strRebid_due2 === undefined
              ? null
              : format(new Date(data.strRebid_due2), "MM/dd/yyyy");
          data.strRebid_due3 =
            data.strRebid_due3 === "" ||
            data.strRebid_due3 === null ||
            data.strRebid_due3 === undefined
              ? null
              : format(new Date(data.strRebid_due3), "MM/dd/yyyy");

          data.rebid_due =
            data.rebid_due === "" ||
            data.rebid_due === null ||
            data.rebid_due === undefined
              ? null
              : format(new Date(data.rebid_due), "MM/dd/yyyy");
          data.rebid_due2 =
            data.rebid_due2 === "" ||
            data.rebid_due2 === null ||
            data.rebid_due2 === undefined
              ? null
              : format(new Date(data.rebid_due2), "MM/dd/yyyy");
          data.rebid_due3 =
            data.rebid_due3 === "" ||
            data.rebid_due3 === null ||
            data.rebid_due3 === undefined
              ? null
              : format(new Date(data.rebid_due3), "MM/dd/yyyy");
        });
        if (params.portfolioRebidList.length > 1) {
          showLoader(true);
        }
        return API.ajaxSave(params).then((data) => {
          if (
            data.items &&
            params.portfolioRebidList.length == data.items.length
          ) {
            showLoader(false);
            params.portfolioRebidList?.forEach((data) => {
              data.changed = data.changed === null ? "N" : data.changed;
              data.rebidstatus_desc =
                (data.strRebid_due || data.rebid_due) &&
                data.rebidstatus_desc != "Submit Rebid" &&
                data.rebidstatus_desc != "Decline to Rebid"
                  ? "To be Rebid"
                  : data.rebidstatus_desc;
              data.rebidstatus_desc2 =
                (data.strRebid_due2 || data.rebid_due2) &&
                data.rebidstatus_desc2 != "Submit Rebid" &&
                data.rebidstatus_desc2 != "Decline to Rebid"
                  ? "To be Rebid"
                  : data.rebidstatus_desc2;
              data.rebidstatus_desc3 =
                (data.strRebid_due3 || data.rebid_due3) &&
                data.rebidstatus_desc3 != "Submit Rebid" &&
                data.rebidstatus_desc3 != "Decline to Rebid"
                  ? "To be Rebid"
                  : data.rebidstatus_desc3;
            });
            setAjaxSaveInprogress({ status: "success", progress: false });
          } else {
            setAjaxSaveInprogress({ status: "failed", progress: false });
          }
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const additionalInfoBtnClicked = (param, closeModal?: boolean) => {
    API.hotelsolicitationemailinfonew(
      param?.strFilterValues?.accountFilter.accountrecid,
      "R"
    ).then((data) => {
      if (!data.hotelSolicitationAddEmailInfo) {
        data.hotelSolicitationAddEmailInfo = {};
      }
      data.hotelSolicitationAddEmailInfo.addemailtext_screentype = "R";
      setSendFromList(data);
    });
  };

  const hotelsolicitationemailinfoupdate = (accountrecid, params) => {
    setAdditionalEmailInfoUpdateInprogress(true);
    API.hotelsolicitationemailinfoupdate(accountrecid, params).then((data) => {
      setAdditionalEmailInfoUpdateInprogress(false);
    });
  };

  const clearDirectSelect = () => {
    setAPIData(initialHotelList);
  };

  const rebidContext = {
    getRequestPanelData,
    FindFilterData,
    showFilterOptions,
    numItems,
    getshowFilterOptions,
    getFindFilter,
    filteredHotelList,
    panelData,
    setAPIData,
    handleOrderChange,
    onChangeFieldValue,
    lastUpdated,
    save,
    getContactType,
    contactTypes,
    setContactTypes,
    sendMail,
    ajaxSaveInprogress,
    ajaxSave,
    defaultDueDate,
    setDefaultDueDate,
    sendFromList,
    additionalInfoBtnClicked,
    additionalEmailInfoUpdateInprogress,
    hotelsolicitationemailinfoupdate,
    isMakingRequest,
    setFilteredHotelList,
    getRequestPanelDataDup,
    showMaxAlert,
    setShowMaxAlert,
    hideNoData,
    setHideNoData,
    totalRecord,
    loader,
    showLoader,
    setTotalRecord,
    clearDirectSelect,
    initialHotelList,
    setInitialData,
  };

  return (
    <RebidContext.Provider value={rebidContext}>
      {props.children}
    </RebidContext.Provider>
  );
};

export const RebidConsume = RebidContext.Consumer;
export default RebidContext;
