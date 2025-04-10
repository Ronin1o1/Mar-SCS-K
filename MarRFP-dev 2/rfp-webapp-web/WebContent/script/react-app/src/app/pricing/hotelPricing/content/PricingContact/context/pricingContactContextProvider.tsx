import React, { useContext, useState } from "react";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

import API from "../service/API";
import Settings from "../static/Settings";

const HotelContext = React.createContext({});
export const HotelContextProvider = (props) => {
  const parentContextType = useContext(HotelPricingContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [datastate, setDatastate] = useState({
    hotelRFPRespondent: {
      list: {
        hotelrfpid: "",
        acceptbtflg: "",
        personname: "",
        period: "",
        persontitle: "",
        email: "",
        countrycode: "",
        areacitycode: "",
        phonenumber: "",
      },
    },
  });
  const [state, setState] = useState({
    hotelName: "",
    formChgr: "N",
    marshaCode: "",
    period: "",
    Nextpath: Settings.route.Deapthofsale,

    max_emails: "",
    maxPeriod: "",
    isHotelUser: "",
    selectedYear: "",

    hotelRFPRespondent_list_personname: "",
    showScreenLoader: false,
    gridData: {
      list: [{}],
    },
    periodlist: [],
    selecthotellist: [],
    updateReqData: {},
    hotelRFPRespondentList: {
      list: [{}],
    },
    hotelRFPRespondent: {
      list: {
        hotelrfpid: "",
        acceptbtflg: "",
        personname: "",
        period: "",
        persontitle: "",
        email: "",
        countrycode: "",
        areacitycode: "",
        phonenumber: "",
      },
    },
    totalPages: 0,
    hotelRfpid: "",
    selecthotelData: [],
    searchResult: {
      accountCenterView: {},
    },

    getUserDetails: {
      list: {
        role: "",
      },
    },
    totalapidata: {
      List: {
        max_emails: "",
        hotelRFPRespondentEmails: [
          {
            email: "",
            emailtypeid: 0,
            personname: "",
            persontitle: "",
            phonenumber: "",
            rfprespondentid: 0,
          },
        ],
      },
    },
    hotelData1: {
      hotelList: {},
    },

    hotelRFPRespondentEmails1: {
      list: {
        rfprespondentid: "",
        emailtypeid: "",
        personname: "",
        email: "",
        phonenumber: "",
        persontitle: "",
      },
    },

    data: {},
    showAccountLegend: false,
    showAccountOverview: false,
    onShowpage: false,
    currentSelectedId: null,
  });
  const inputData = { ...state };

  const onInputClick = (event) => {
    setState({ ...state, onShowpage: true });
  };

  function onContentLoad(data) {
    if (appContext?.user?.isHotelUser) {
      state.isHotelUser = "true";
    } else {
      state.isHotelUser = "false";
    }

    const acceptbtflg = data.acceptbtflg;
    const selectedPeriod = state.period;
    const maxPeriod = data.period;
    const hotelUser = state.isHotelUser;

    if (
      acceptbtflg == "N" &&
      hotelUser == "true" &&
      selectedPeriod == maxPeriod
    ) {
      alert(
        Settings.alert.welcome + selectedPeriod + Settings.alert.generalpricing
      );
      const parms = {
        marshaCode: state.marshaCode,
        period: state.period,
      };

      API.updateBTFlag(parms).then((resp) => {});
      state.Nextpath = Settings.route.priceContact;
    }
  }

  function validatePage(listData?) {
    const data = listData?.list
      ? listData?.list
      : state?.hotelRFPRespondentList?.list
      ? state?.hotelRFPRespondentList?.list
      : state.totalapidata.List.hotelRFPRespondentEmails;
    let bOK;
    bOK = true;
    const alertMsgArray = [];
    let invalidSecondaryEmail = false;
    if (bOK && appContext?.user?.isHotelUser) {
      if (
        state.hotelRFPRespondent.list.personname == "" ||
        state.hotelRFPRespondent.list.email == "" ||
        state.hotelRFPRespondent.list.persontitle == "" ||
        state.hotelRFPRespondent.list.phonenumber == "" ||
        state.hotelRFPRespondent.list.countrycode == ""
      ) {
        bOK = false;
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alert.pricingcontact,
          type: "browserAlert",
        });
        state.Nextpath = Settings.route.priceContact;
      }
    }

    if (bOK && appContext?.user?.isHotelUser) {
      const string = state.hotelRFPRespondent.list.email;
      const i = string.indexOf("@");
      const newstring = string.replace("@", "$");
      const j = newstring.indexOf("@");
      if (!(i != -1 && j == -1)) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alert.email,
          type: "browserAlert",
        });
        bOK = false;
        state.Nextpath = Settings.route.priceContact;
      }
    }

    if (bOK && appContext?.user?.isHotelUser && data?.length) {
      let objEmail, objName, objTitle, objPhone;
      for (
        let k = 0;
        k < parseInt(state.totalapidata.List.max_emails) - 1;
        k++
      ) {
        objEmail = data[k]?.email;
        objName = data[k]?.personname;
        objTitle = data[k]?.persontitle;
        objPhone = data[k]?.phonenumber;

        if (
          (objEmail != "" &&
            objEmail != null &&
            (!objName || !objTitle || !objPhone)) ||
          (objName != "" &&
            objName != null &&
            (!objEmail || !objTitle || !objPhone)) ||
          (objTitle != "" &&
            objTitle != null &&
            (!objName || !objEmail || !objPhone)) ||
          (objPhone != "" &&
            objPhone != null &&
            (!objName || !objEmail || !objTitle))
        ) {
          if (!alertMsgArray.includes(Settings.alert.mustfill)) {
            alertMsgArray.push(Settings.alert.mustfill);
          }
          state.Nextpath = Settings.route.priceContact;
          bOK = false;
        }

        if (bOK) {
          const emailStr = objEmail;
          if (!(emailStr == "" || emailStr == null)) {
            const indx = emailStr.indexOf("@");
            const newEmailStr = emailStr.replace("@", "$");
            const newIndx = newEmailStr.indexOf("@");
            if (!(indx != -1 && newIndx == -1)) {
              alertMsgArray.push(Settings.alert.gridEmail + (k + 2) + ".");
              state.Nextpath = Settings.route.priceContact;
              bOK = false;
              invalidSecondaryEmail = true;
            }
          }
        }
      }

      const lastContact = parseInt(state.totalapidata.List.max_emails) - 1;
      if (appContext?.user?.isHotelUser) {
        const k = lastContact;
        const objEmail = data[k]?.email;
        const objName = data[k]?.personname;
        const objTitle = data[k]?.persontitle;
        const objPhone = data[k]?.phonenumber;

        if (
          (objEmail != "" &&
            objEmail != null &&
            (!objName || !objTitle || !objPhone)) ||
          (objName != "" &&
            objName != null &&
            (!objEmail || !objTitle || !objPhone)) ||
          (objTitle != "" &&
            objTitle != null &&
            (!objName || !objEmail || !objPhone)) ||
          (objPhone != "" &&
            objPhone != null &&
            (!objName || !objEmail || !objTitle))
        ) {
          if (!alertMsgArray.includes(Settings.alert.mustfill)) {
            alertMsgArray.push(Settings.alert.mustfill);
          }
          alertMsgArray.push(Settings.alert.pricingcontact5);
          state.Nextpath = Settings.route.priceContact;
          bOK = false;
        } else if (
          (objEmail == null || objEmail == "") &&
          (objName == null || objName == "") &&
          (objTitle == null || objTitle == "") &&
          (objPhone == null || objPhone == "")
        ) {
          alertMsgArray.push(Settings.alert.pricingcontact5);
          bOK = false;
        }

        if (bOK) {
          const emailStr = objEmail;
          if (!(emailStr == "" || emailStr == null)) {
            const indx = emailStr.indexOf("@");
            const newEmailStr = emailStr.replace("@", "$");
            const newIndx = newEmailStr.indexOf("@");
            if (!(indx != -1 && newIndx == -1)) {
              if (!invalidSecondaryEmail) {
                alertMsgArray.push(Settings.alert.gridEmail + (k + 2) + ".");
                state.Nextpath = Settings.route.priceContact;
                bOK = false;
              }
            }
          }
        }
      }

      if (alertMsgArray.length > 0) {
        appContext.setErrorMessageAlert({
          show: true,
          message: "",
          type: "browserAlert",
          isMultipleAlert: true,
          multipleAlertList: [...alertMsgArray],
        });
        bOK = false;
      }
    }

    if (bOK) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
        isMultipleAlert: false,
        multipleAlertList: [],
      });
    }
    return bOK;
  }

  function final_check() {
    let bOK;
    bOK = true;
    if (bOK && appContext?.user?.isHotelUser) {
      if (
        state.hotelRFPRespondent.list.personname == "" ||
        state.hotelRFPRespondent.list.email == "" ||
        state.hotelRFPRespondent.list.persontitle == "" ||
        state.hotelRFPRespondent.list.phonenumber == "" ||
        state.hotelRFPRespondent.list.countrycode == ""
      ) {
        bOK = false;
        parentContextType.setPricingAlert(true, Settings.alert.mustfill);
        state.Nextpath = Settings.route.priceContact;
      }
    }

    if (appContext?.user?.isHotelUser) {
      if (
        state.hotelRFPRespondent.list.personname == "" ||
        state.hotelRFPRespondent.list.email == "" ||
        state.hotelRFPRespondent.list.persontitle == "" ||
        state.hotelRFPRespondent.list.phonenumber == "" ||
        state.hotelRFPRespondent.list.countrycode == ""
      ) {
        appContext.setCommonValidAlert(true);
      }
    }

    if (bOK && appContext?.user?.isHotelUser) {
      const string = state.hotelRFPRespondent.list.email;
      const i = string.indexOf("@");
      const newstring = string.replace("@", "$");
      const j = newstring.indexOf("@");
      if (!(i != -1 && j == -1)) {
        parentContextType.setPricingAlert(true, Settings.alert.email);
        bOK = false;
        state.Nextpath = Settings.route.priceContact;
      }
    }
    if (
      bOK &&
      appContext?.user?.isHotelUser &&
      state.totalapidata.List.hotelRFPRespondentEmails.length
    ) {
      let objEmail, objName, objTitle, objPhone;
      for (let k = 0; k < parseInt(state.totalapidata.List.max_emails); k++) {
        objEmail = state.totalapidata.List.hotelRFPRespondentEmails[k]?.email;
        objName =
          state.totalapidata.List.hotelRFPRespondentEmails[k]?.personname;

        objTitle =
          state.totalapidata.List.hotelRFPRespondentEmails[k]?.persontitle;

        objPhone =
          state.totalapidata.List.hotelRFPRespondentEmails[k]?.phonenumber;

        if (
          (objEmail != "" &&
            objEmail != null &&
            (!objName || !objTitle || !objPhone)) ||
          (objName != "" &&
            objName != null &&
            (!objEmail || !objTitle || !objPhone)) ||
          (objTitle != "" &&
            objTitle != null &&
            (!objName || !objEmail || !objPhone)) ||
          (objPhone != "" &&
            objPhone != null &&
            (!objName || !objEmail || !objTitle))
        ) {
          parentContextType.setPricingAlert(true, Settings.alert.mustfill);
          state.Nextpath = Settings.route.priceContact;
          bOK = false;
        }

        if (bOK) {
          const emailStr = objEmail;
          if (!(emailStr == "" || emailStr == null)) {
            const indx = emailStr.indexOf("@");
            const newEmailStr = emailStr.replace("@", "$");
            const newIndx = newEmailStr.indexOf("@");
            if (!(indx != -1 && newIndx == -1)) {
              parentContextType.setPricingAlert(
                true,
                Settings.alert.gridEmail + (k + 2) + "."
              );

              state.Nextpath = Settings.route.priceContact;
              bOK = false;
            }
          }
        }
      }
    }
    if (bOK) parentContextType.setPricingAlert(false, "");
    return bOK;
  }

  const enteremail = (data) => {
    const string = state.hotelRFPRespondent.list.email;
    const i = string.indexOf("@");
    const newstring = string.replace("@", "$");
    const j = newstring.indexOf("@");
    if (!(i != -1 && j == -1)) {
      alert(Settings.alert.email);
    }
  };

  const totalapidata = (data) => {
    if (data) {
      const totalapidata = state.totalapidata;
      totalapidata.List = data;

      setState({
        ...state,
        totalapidata: totalapidata,
      });
    }
  };

  const getUserDetails = (data) => {
    if (data) {
      const getUserDetails = state.getUserDetails;
      getUserDetails.list = data;

      setState({
        ...state,
        getUserDetails: getUserDetails,
      });
    }
  };

  const setGridDataList = (data) => {
    if (data) {
      const gridData = state.gridData;
      gridData.list = data;

      setState({
        ...state,
        gridData: gridData,
      });
    }
  };
  const sethotelRFPRespondentEmails = (data) => {
    const listData = state.hotelRFPRespondentList;
    listData.list = data;
    const regEx = Settings.validation.emailValidation;

    const tempdata = [];
    const max_emails =
      typeof state.totalapidata.List.max_emails == "string"
        ? parseInt(state.totalapidata.List.max_emails)
        : state.totalapidata.List.max_emails;
    if ((data && data.length === 0) || data === null) {
      for (let i = 0; i < max_emails - 1; i++) {
        tempdata.push({
          rfprespondentid: null,
          emailtypeid: i + 1,
          email: null,
          personname: null,
          persontitle: null,
          phonenumber: null,
          hiddenField: false,
        });
      }
      listData.list = tempdata;
    } else {
      if (data.length == max_emails) {
        listData.list = data;
      } else if (data.length > max_emails) {
        const updatedData = data.map((item, index) => {
          if (index < max_emails - 1) {
            item.hiddenField = false;
          } else {
            if (item.emailtypeid != 4) {
              item.hiddenField = true;
            } else if (item.emailtypeid == 4) {
              item.hiddenField = false;
            }
          }
          return item;
        });
        listData.list = updatedData;
      } else if (data.length < max_emails) {
        let updatedList = [];
        updatedList = data.map((item, index) => {
          item.hiddenField = false;
          return item;
        });
        for (let j = data.length; j < max_emails; j++) {
          updatedList.push({
            rfprespondentid: null,
            emailtypeid: j + 1,
            email: null,
            personname: null,
            persontitle: null,
            phonenumber: null,
            hiddenField: false,
          });
        }
        listData.list = updatedList;
      }
    }
    if (data) {
      if (data.length != 0) {
        for (let i = 0; i < listData.list.length; i++) {
          const validatedEmail = regEx.test(listData.list[i].email);
          if (validatedEmail) {
          } else {
            if (
              appContext.isPricingContactIndex == undefined &&
              listData.list[i].email != null &&
              listData.list[i].personname != null &&
              listData.list[i].persontitle != null &&
              listData.list[i].phonenumber != null
            ) {
              appContext.setPricingContactIndex(i + 1);
              appContext.setSecondayEmailValid(true);
            }
          }
          if (
            (listData.list[i].email != null &&
              listData.list[i].personname != null &&
              listData.list[i].persontitle != null &&
              listData.list[i].phonenumber != null) ||
            (listData.list[i].email == null &&
              listData.list[i].personname == null &&
              listData.list[i].persontitle == null &&
              listData.list[i].phonenumber == null)
          ) {
            appContext.setAllFieldValue(true);
          } else {
            appContext.setCommonValidAlert(true);
            appContext.setGPPSelected(false);
            appContext.setPASSelected(false);
          }
        }
      } else {
        appContext.setAllFieldValue(true);
      }
    }
    const prepondent = listData;
    const lastField = {
      rfprespondentid: null,
      emailtypeid: max_emails,
      email: null,
      personname: null,
      persontitle: null,
      phonenumber: null,
    };

    if (listData.list.length < max_emails) {
      listData.list = listData.list.concat(lastField);
    }
    if (listData) {
      setState({
        ...state,
        hotelRFPRespondentList: listData,
      });
      validatePage(listData);
    }
    return listData;
  };

  const sethotelRFPRespondent = () => {
    if (state.hotelRFPRespondent) {
      validatePage();
    }
  };

  const sethotelPrimaryContact = (data) => {
    if (data) {
      const hotelRFPRespondent = { ...state.hotelRFPRespondent };
      hotelRFPRespondent.list = data;

      setState({
        ...state,
        hotelRFPRespondent: hotelRFPRespondent,
      });
    }
  };

  const handleChange = (event) => {
    const hotelRFPRespondent = { ...state.hotelRFPRespondent };
    setState({ ...state, hotelRFPRespondent: hotelRFPRespondent });
  };

  const updateGridDisplay = (updatedData) => {
    const inputvalues = {
      formChgr: state.formChgr,
      hotelrfpid: state.hotelRFPRespondent.list.hotelrfpid,
      marshaCode: state.marshaCode,
      period: state.period,
      max_emails: state.totalapidata.List.max_emails,
      acceptbtflg: state.hotelRFPRespondent.list.acceptbtflg,
      maxPeriod: state.hotelRFPRespondent.list.period,
      isHotelUser: state.isHotelUser,
      rfprespondentid: state.hotelRFPRespondentEmails1.list.rfprespondentid,

      personname: state.hotelRFPRespondent.list.personname,
      persontitle: state.hotelRFPRespondent.list.persontitle,
      email: state.hotelRFPRespondent.list.email,
      countrycode: state.hotelRFPRespondent.list.countrycode,
      areacitycode: state.hotelRFPRespondent.list.areacitycode,
      phonenumber: state.hotelRFPRespondent.list.phonenumber,
    };

    API.updateGridDisplayAPI(inputvalues, updatedData).then((resp) => {
      //update hotel pricing context
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        PricingContact: "Y",
      });
    });
  };

  const setSelectedYear = (selectedObj) => {
    if (selectedObj) {
      const selectedyear = selectedObj.period;
      const hotelRfpid = selectedObj.hotelrfpid;

      setState({
        ...state,
        selectedYear: selectedyear,
        hotelRfpid: hotelRfpid,
      });
    }
  };
  const setHotelListData = (data) => {
    const hotelData = { ...state.hotelData1 };
    hotelData.hotelList = data;

    setState({
      ...state,
      hotelData1: hotelData,
    });
  };

  const showAccountLegend = (data) => {
    setState({
      ...state,
      showAccountLegend: !state.showAccountLegend,
    });
  };
  const showAccountOverview = (data) => {
    setState({
      ...state,
      showAccountOverview: !state.showAccountOverview,
    });
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const onfieldChange = (e, i) => {
    if (e) {
      console.log(e?.target?.value);
    }
  };

  const rateProgramContext = {
    state,
    setState,
    onfieldChange,
    setGridDataList,
    showAccountLegend,
    sethotelRFPRespondentEmails,
    showAccountOverview,
    getUserDetails,
    final_check,
    sethotelRFPRespondent,
    setHotelListData,
    setSelectedYear,
    enteremail,
    handleChange,
    updateGridDisplay,
    onContentLoad,
    totalapidata,
    setLoader,
    onInputClick,
    validatePage,
  };

  return (
    <HotelContext.Provider value={rateProgramContext}>
      {props.children}
    </HotelContext.Provider>
  );
};
export const RateProgramContextConsumer = HotelContext.Consumer;
export default HotelContext;
