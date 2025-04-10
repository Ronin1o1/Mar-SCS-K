import React, { useContext, useEffect, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import API from "../service/API";
import Settings from "../static/Settings";

const StatusAccountPricingContext = React.createContext({});
export const StatusAccountPricingContextProvider = (props) => {
  const parentContext = useContext(AccountCenterTabsContext);
  const [state, setState] = useState({
    contactareacitycode: null,
    contactcountrycode: null,
    contactemail: null,
    contactname: null,
    contactphonenumber: null,
    boolStringIsLocked: null,
    isSalesContactEditable: null,
    accountStatus: null,
    pgoos: "",
    amenities_exempt: "",
    marketcode: null,
    removalreason: null,
    removalreasonid: null,
    rejectreason: null,
    rejectreasonid: null,
    currrebidstatus: null,
    selected: null,
    accepted: null,
    affiliationid: null,
    hotel_accountinfoid: null,
    hotelid: null,
    hotelrfpid: null,
    isAccepted: null,
    isLocked: null,
    isProgress: null,
    isSelected: null,
    isSolicited: null,
    contactid: null,
    showLoader: false,
  });
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const personalInfo = (data) => {
    setState({
      ...state,
      affiliationid: data.affiliationid,
      hotel_accountinfoid: data.hotel_accountinfoid,
      contactareacitycode: data.salesContact.contactareacitycode,
      contactcountrycode: data.salesContact.contactcountrycode,
      contactemail: data.salesContact.contactemail,
      contactname: data.salesContact.contactname,
      contactphonenumber: data.salesContact.contactphonenumber,
      contactid: data.salesContact.contactid,
      pgoos: data.hotelAccountSpecificAccountFlags.pgoos,
      amenities_exempt: data.hotelAccountSpecificAccountFlags.amenities_exempt,
      marketcode: data.hotelAccountSpecificAccountFlags.marketcode,
      removalreason: data.hotelAccountSpecificAccountFlags.removalreason,
      removalreasonid: data.hotelAccountSpecificAccountFlags.removalreasonid,
      rejectreason: data.hotelAccountSpecificAccountFlags.rejectreason,
      rejectreasonid: data.hotelAccountSpecificAccountFlags.rejectreasonid,
      currrebidstatus: data.hotelAccountSpecificAccountFlags.currrebidstatus,
      selected: data.hotelAccountSpecificAccountFlags.selected,
      accepted: data.hotelAccountSpecificAccountFlags.accepted,
      hotelid: data.hotelid,
      hotelrfpid: data.hotelrfpid,
      isAccepted: data.isAccepted,
      isLocked: data.isLocked,
      isProgress: data.isProgress,
      isSelected: data.isSelected,
      isSolicited: data.isSolicited,
      boolStringIsLocked: data.boolStringIsLocked,
      isSalesContactEditable: data.isSalesContactEditable,
      accountStatus: data.accountStatus,
    });
  };

  useEffect(() => {
    checkEmptyFields();
  }, [
    state?.contactemail,
    state?.contactname,
    state?.contactcountrycode,
    state?.contactphonenumber,
    state?.contactareacitycode,
  ]);

  const checkEmptyFields = () => {
    if (
      state.contactemail == null ||
      state.contactemail == "" ||
      state.contactname == null ||
      state.contactname == "" ||
      state.contactcountrycode == null ||
      state.contactcountrycode == "" ||
      state.contactphonenumber == null ||
      state.contactphonenumber == "" ||
      state.contactareacitycode == null ||
      state.contactareacitycode == ""
    ) {
      sessionStorage.setItem("hassalescontact", "N");
    } else if (
      state.contactemail !== null &&
      state.contactemail !== "" &&
      state.contactname !== null &&
      state.contactname !== "" &&
      state.contactcountrycode !== null &&
      state.contactcountrycode !== "" &&
      state.contactphonenumber !== null &&
      state.contactphonenumber !== "" &&
      state.contactareacitycode !== null &&
      state.contactareacitycode !== ""
    ) {
      sessionStorage.setItem("hassalescontact", "Y");
    }
  };

  const handleOverrideChange = (event) => {
    setState({
      ...state,
      amenities_exempt: event.target.value,
    });
  };
  const onPrimaryContact = (event, field) => {
    const re = /^[0-9\b]+$/;
    const re2 = /^\d*(?:[.]\d*)?$/;
    if (field === "contactname" || field === "contactemail") {
      setState({
        ...state,
        [field]: event.target.value,
      });
    }
    if (field === "contactcountrycode") {
      if (
        re.test(event.target.value) ||
        event.target.value == "" ||
        (event.target.value.charAt(0) == "." &&
          event.target.value.charAt(1) != "." &&
          event.target.value.charAt(2) != ".") ||
        (event.target.value.charAt(0) != "." &&
          event.target.value.charAt(1) == "." &&
          event.target.value.charAt(2) != ".") ||
        (event.target.value.charAt(0) != "." &&
          event.target.value.charAt(1) != "." &&
          event.target.value.charAt(2) == ".")
      ) {
        setState({
          ...state,
          [field]: event.target.value,
        });
      }
    } else if (field == "contactareacitycode") {
      if (re2.test(event.target.value)) {
        setState({
          ...state,
          [field]: event.target.value,
        });
      }
    }
    statusCheck(event, field);
  };

  const onPhoneNumberChange = (event) => {
    //Regex to accept numbers and hyphen
    const re = /(^[0-9]+$|[-]$|[0-9]+$|^$)/;
    if (re.test(event.target.value)) {
      setState({
        ...state,
        contactphonenumber: event.target.value,
      });
    } else {
      const contactNum =
        state.contactphonenumber == null ? "" : state.contactphonenumber;
      setState({
        ...state,
        contactphonenumber: contactNum,
      });
    }
    statusCheck(event, "contactphonenumber");
  };

  const handleUpdate = (reqParam, isSaveClicked) => {
    const strHasd = {};
    setLoader(true);

    const data = {
      affiliationid: state.affiliationid,
      hotel_accountinfoid: reqParam.accountinfoid,
      hotelAccountSpecificAccountFlags: {
        pgoos: state.pgoos,
        amenities_exempt: state.amenities_exempt,
        marketcode: state.marketcode,
        removalreason: state.removalreason,
        removalreasonid: state.rejectreasonid,
        rejectreason: state.rejectreason,
        rejectreasonid: state.rejectreasonid,
        currrebidstatus: state.currrebidstatus,
        selected: state.selected,
        accepted: state.accepted,
      },
      hotelid: state.hotelid,
      hotelrfpid: state.hotelrfpid,
      isAccepted: state.isAccepted,
      isLocked: state.isLocked,
      isProgress: state.isProgress,
      isSelected: state.isSelected,
      isSolicited: state.isSolicited,
      salesContact: {
        contactareacitycode: state.contactareacitycode,
        contactcountrycode: state.contactcountrycode,
        contactemail: state.contactemail,
        contactname: state.contactname,
        contactphonenumber: state.contactphonenumber,
        contactid: state.contactid,
      },
      accountStatus: state.accountStatus,
      boolStringIsLocked: state.boolStringIsLocked,
      isSalesContactEditable: state.isSalesContactEditable,
    };
    strHasd[parseInt(`${reqParam.accountinfoid}`)] = data;
    const params = {
      hotel_accountinfoid: reqParam.accountinfoid,
      strHasd: JSON.stringify(strHasd),
    };

    API.updateStatusAccountDetails(params).then((res) => {
      if (isSaveClicked) {
        API.getStatusAccountPricingList(reqParam).then((res) => {
          personalInfo(res);
          appContext.setPricingTick("C");
          setLoader(false);
        });
      } else {
        setLoader(false);
      }
    });
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showLoader: show,
    });
  };

  const statusCheck = (event, field = "") => {
    let bOK = true;
    let statuscheckstatus = "complete";
    let msg = "";
    const business_case = sessionStorage.getItem("bussinessCase");
    const prevbussinessCase = sessionStorage.getItem("prevbussinessCase");
    const issaleseditableobj = state.isSalesContactEditable;
    if (issaleseditableobj != null && issaleseditableobj == true) {
      if (business_case == "Y" && business_case != prevbussinessCase) {
        if (bOK) {
          if (field != "") {
            if (
              state.contactname === "" ||
              (state.contactname === null &&
                ((field === "contactname" && event.target.value === "") ||
                  event.target.value === null))
            ) {
              bOK = false;
              msg = "true";
            }
            if (
              state.contactemail === "" ||
              (state.contactemail === null &&
                ((field === "contactemail" && event.target.value === "") ||
                  event.target.value === null))
            ) {
              bOK = false;
              msg = "true";
            }
            if (
              state.contactcountrycode === "" ||
              (state.contactcountrycode === null &&
                ((field === "contactcountrycode" &&
                  event.target.value === "") ||
                  event.target.value === null))
            ) {
              bOK = false;
              msg = "true";
            }
            if (
              state.contactphonenumber === "" ||
              (state.contactphonenumber === null &&
                ((field === "contactphonenumber" &&
                  event.target.value === "") ||
                  event.target.value === null))
            ) {
              bOK = false;
              msg = "true";
            }
          } else {
            if (
              state.contactname === "" ||
              state.contactname === null ||
              state.contactemail === "" ||
              state.contactemail === null ||
              state.contactcountrycode === "" ||
              state.contactcountrycode === null ||
              state.contactphonenumber === "" ||
              state.contactphonenumber === null
            ) {
              bOK = false;
              msg = "true";
            }
          }
        }
      }
    }
    if (!bOK) {
      if (appContext?.user?.isPASorAnySales) {
        statuscheckstatus = "continue";
      } else {
        statuscheckstatus = "failed";
        if (msg != "") {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.alertMessage,
            type: "browserAlert",
          });
        }
      }
    } else {
      statuscheckstatus = "complete";
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    if (statuscheckstatus == "complete") {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    return statuscheckstatus;
  };

  const setTickMarkAndUpdate = (reqParam) => {
    if (!parentContext.isRebidDeclined) {
      const statuscheck = statusCheck(event);
      if (statuscheck == "complete" || statuscheck == "continue") {
        handleUpdate(reqParam, false);
        if (statuscheck == "complete") {
          parentContext.setPricingStatus("C");
          appContext.setPricingTick("C");
        }
      }
    }
  };

  const statusaccountpricingContext = {
    state,
    setState,
    personalInfo,
    onPrimaryContact,
    handleOverrideChange,
    handleUpdate,
    setLoader,
    onPhoneNumberChange,
    statusCheck,
    setTickMarkAndUpdate,
  };
  return (
    <StatusAccountPricingContext.Provider value={statusaccountpricingContext}>
      {props.children}
    </StatusAccountPricingContext.Provider>
  );
};
export const StatusAccountPricingContextConsumer =
  StatusAccountPricingContext.Consumer;
export default StatusAccountPricingContext;
