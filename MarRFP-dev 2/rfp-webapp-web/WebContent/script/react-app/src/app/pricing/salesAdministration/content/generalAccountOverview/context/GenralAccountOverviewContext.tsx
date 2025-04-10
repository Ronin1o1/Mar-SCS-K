import React, { useState, useContext } from "react";
import GeneralAccountOverviewApi from "../service/GeneralAccountOverviewAPI";
import Utils from "../../../../../common/utils/Utils";
import PageSettings from "../static/Settings";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const GeneralAccountOverviewContext = React.createContext({});

export const GeneralAccountOverviewContextProvider = (props) => {
  const salescontext = useContext(SalesAdministartionContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [accountOverviewData, setAccountOverviewData] = useState(null);
  const [state, setState] = useState({
    showScreenLoader: false,
    lastupdateDate: "",
  });
  const [showValidationModal, setShowValidationMOdal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const setData = (list) => {
    setAccountOverviewData({
      ...accountOverviewData,
    });
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const checkEmail = (strValue) => {
    if (
      strValue !== "" &&
      strValue !== null &&
      strValue !== undefined &&
      strValue.indexOf("@") === -1
    ) {
      setShowValidationMOdal(true);
      setValidationMessage(PageSettings.validation.email);
      // appContext.setValidEmail(true);
      return true;
    } else {
      // appContext.setValidEmail(false);
      return false;
    }
  };
  const checkNumLength = (value) => {
    if ((value !== "" && parseInt(value) > 100) || parseInt(value) < 0) {
      setValidationMessage(PageSettings.validation.AlertMessage);
      setShowValidationMOdal(true);
      return true;
    } else {
      setShowValidationMOdal(false);
      return false;
    }
  };
  const validation = (eventType, accountOverviewData) => {
    const Percentages = [];
    const pctCompetitorMap = accountOverviewData?.pctCompetitorMap;
    Object.keys(pctCompetitorMap).map((keys) => {
      if (
        pctCompetitorMap[keys].share_percent !== null &&
        pctCompetitorMap[keys].share_percent !== "" &&
        parseInt(pctCompetitorMap[keys].share_percent) !== 0
      ) {
        Percentages.push(Math.floor(pctCompetitorMap[keys].share_percent));
      } else {
        if (pctCompetitorMap[keys].share_percent === "")
          pctCompetitorMap[keys].share_percent = null;
      }
    });
    const condition = (strValue) => strValue < 101;
    const condtnGraterZero = (strValue) => strValue > 0;
    const isValidPercentage =
      Percentages.length > 0 ? Percentages.every(condition) : true;
    const isValid =
      Percentages.length > 0 ? Percentages.every(condtnGraterZero) : true;
    if (
      userDetails !== null &&
      (userDetails.user.role === "MFPSALES" ||
        userDetails.user.role === "MFPFSALE") &&
      (accountOverviewData?.teamLeader === null ||
        accountOverviewData?.teamLeader?.name === "" ||
        accountOverviewData?.teamLeader?.name === null ||
        accountOverviewData?.teamLeader?.name === undefined ||
        accountOverviewData?.teamLeader?.name === "null%null")
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.name);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.name);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.name,
          type: "custom",
        });
        return false;
      }
    } else if (
      userDetails !== null &&
      (userDetails.user.role === "MFPSALES" ||
        userDetails.user.role === "MFPFSALE") &&
      (accountOverviewData?.teamLeader === null ||
        accountOverviewData?.teamLeader?.title === "" ||
        accountOverviewData?.teamLeader?.title === null ||
        accountOverviewData?.teamLeader?.title === undefined)
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.title);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.title);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.title,
          type: "custom",
        });
        return false;
      }
    } else if (
      userDetails !== null &&
      (userDetails.user.role === "MFPSALES" ||
        userDetails.user.role === "MFPFSALE") &&
      (accountOverviewData?.teamLeader === null ||
        accountOverviewData?.teamLeader?.phone === "" ||
        accountOverviewData?.teamLeader?.phone === null ||
        accountOverviewData?.teamLeader?.phone === undefined)
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.phone);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.phone);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.phone,
          type: "custom",
        });
        return false;
      }
    } else if (
      userDetails !== null &&
      (userDetails.user.role === "MFPSALES" ||
        userDetails.user.role === "MFPFSALE") &&
      (accountOverviewData?.teamLeader === null ||
        accountOverviewData?.teamLeader?.email === "" ||
        accountOverviewData?.teamLeader?.email === null ||
        accountOverviewData?.teamLeader?.email === undefined)
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.emailEmpty);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.emailEmpty);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.emailEmpty,
          type: "custom",
        });
        return false;
      }
    } else if (checkEmail(accountOverviewData?.teamLeader2?.email)) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.email);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.email);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.email,
          type: "custom",
        });
        return false;
      }
    } else if (checkEmail(accountOverviewData?.teamLeader?.email)) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.email);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(true, PageSettings.validation.email);
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.email,
          type: "custom",
        });
        return false;
      }
    } else if (
      checkNumLength(accountOverviewData?.genHistAcct?.formattedMarSpendRev)
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.AlertMessage);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validation.AlertMessage
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.AlertMessage,
          type: "custom",
        });
        return false;
      }
    } else if (!isValidPercentage || !isValid) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validation.AlertMessage);
        setShowValidationMOdal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validation.AlertMessage
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validation.AlertMessage,
          type: "custom",
        });
        return false;
      }
    } else {
      if (eventType === "update") {
        return true;
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(false, "");
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "custom",
        });
        return true;
      }
    }
  };
  const updateValue = (id, year, accname) => {
    if (validation("update", accountOverviewData)) {
      const params = {
        strTeamLeader2: JSON.stringify({
          accountrecid: id,
          accountinfoid: accountOverviewData?.teamLeader2?.accountinfoid,
          name: accountOverviewData?.teamLeader2?.name,
          title: accountOverviewData?.teamLeader2?.title,
          phone: accountOverviewData?.teamLeader2?.phone,
          email: accountOverviewData?.teamLeader2?.email,
          contactTypeID: 1,
        }),
        strTeamLeader: JSON.stringify({
          accountrecid: id,
          accountinfoid: accountOverviewData?.teamLeader?.accountinfoid,
          name: accountOverviewData?.teamLeader?.name,
          title: accountOverviewData?.teamLeader?.title,
          phone: accountOverviewData?.teamLeader?.phone,
          email: accountOverviewData?.teamLeader?.email,
          contactTypeID: 1,
        }),
        strGenHistAcct: JSON.stringify({
          mar_tracking: accountOverviewData?.genHistAcct?.mar_tracking,
          ttlglb_mar_room_rev:
            accountOverviewData?.genHistAcct?.formattedMarRoomRev === ""
              ? 0.0
              : accountOverviewData?.genHistAcct?.formattedMarRoomRev,
          ttlglb_hotelspend_rev:
            accountOverviewData?.genHistAcct?.formattedHotelSpendRev === ""
              ? 0.0
              : accountOverviewData?.genHistAcct?.formattedHotelSpendRev,
          ttlglb_pct_marspend_rev:
            accountOverviewData?.genHistAcct?.formattedMarSpendRev === ""
              ? 0.0
              : parseInt(
                  accountOverviewData?.genHistAcct?.formattedMarSpendRev
                ),
        }),
        strRgnActualSpendMap: JSON.stringify(
          accountOverviewData?.rgnActualSpendMap
        ),
        strPctCompetitorMap: JSON.stringify(
          accountOverviewData?.pctCompetitorMap
        ),
        strHdq: JSON.stringify({
          accountrecid: id,
          accountinfoid: accountOverviewData?.hdq?.accountinfoid,
          phone: accountOverviewData?.hdq?.phone,
          email: null,
          address: accountOverviewData?.hdq?.address,
          city: accountOverviewData?.hdq?.city,
          state: accountOverviewData?.hdq?.state,
          zip: accountOverviewData?.hdq?.zip,
          country: accountOverviewData?.hdq?.country,
          province: accountOverviewData?.hdq?.province,
        }),
        strHdqadr: JSON.stringify({
          accountrecid: id,
          accountinfoid: accountOverviewData?.hdq?.accountinfoid,
          phone: accountOverviewData?.hdqadr?.phone,
          email: null,
          address: accountOverviewData?.hdqadr?.address,
          city: accountOverviewData?.hdqadr?.city,
          state: accountOverviewData?.hdqadr?.state,
          zip: accountOverviewData?.hdqadr?.zip,
          country: accountOverviewData?.hdqadr?.country,
          province: accountOverviewData?.hdqadr?.province,
        }),
        strAccountOverview: JSON.stringify({
          accountname: accname,
          accountrecid: id,
          lastupdatedate: accountOverviewData?.lastupdatedate,
          chairman_ceo: accountOverviewData?.accountOverview?.chairman_ceo,
          accountacronym: accountOverviewData?.accountOverview?.accountacronym,
          account_global_reach: "1",
          glb_region_id: null,
          glb_regional_market: null,
          association_type:
            accountOverviewData?.accountOverview.association_type,
          nyse_symbol: accountOverviewData?.accountOverview?.nyse_symbol,
          url: accountOverviewData?.accountOverview?.url,
          fin_resultfor: "1",
          fin_resultregion: null,
          glb_employee: parseInt(
            accountOverviewData?.accountOverview?.glb_employee
          ),
          num_glb_traveler: parseInt(
            accountOverviewData?.accountOverview?.num_glb_traveler
          ),
          fortunefive_rev: 0,
          rev: parseInt(accountOverviewData?.accountOverview?.rev),
          netincome: 0,
          bus_trvl_toprating: 0,
          annual_trvl_expense: parseInt(
            accountOverviewData?.accountOverview?.annual_trvl_expense
          ),
          annual_airspend: 0,
          ultimatebusinessid:
            accountOverviewData?.accountOverview?.ultimatebusinessid,
          annl_assn_budget: 0,
          rev_conv_mtgs: parseInt(
            accountOverviewData?.accountOverview?.rev_conv_mtgs
          ),
          accounttypedescription:
            accountOverviewData?.accountOverview?.accounttypedescription,
          num_assn_members: parseInt(
            accountOverviewData?.accountOverview?.num_assn_members
          ),
          revstreamid: 1,
        }),
        formChg: "Y",
        period: year,
        accountrecid: id,
        accountname: accname,
      };

      const postData = Utils.createPostData(params);
      setLoader(true);
      GeneralAccountOverviewApi.submitData(postData).then((data) => {
        setLoader(true);
        GeneralAccountOverviewApi.getAccountOverview({
          year: year,
          accountrecid: id,
        }).then((datar) => {
          let contactObj;
          contactObj = datar.teamLeader;
          if (datar.userRef.length > 0) {
            datar.userRef.unshift({ name: null, eid: null });
            if (contactObj !== null) {
              for (let i = 0; i < datar.userRef.length; i++) {
                if (datar.userRef[i].name === contactObj.name) {
                  contactObj.name =
                    datar.userRef[i].name + "%" + datar.userRef[i].eid;
                  contactObj.eid = datar.userRef[i].eid;
                  break;
                } else {
                  if (datar.userRef.length === i + 1) {
                    contactObj.eid = "";
                    contactObj.name = "";
                  }
                }
              }
            }
          } else {
            datar.userRef = [];
            datar.userRef.unshift({ name: "", eid: null });
          }
          let contactObj2;
          contactObj2 = datar.teamLeader2;
          if (datar.userRef.length > 0) {
            datar.userRef.unshift({ name: null, eid: null });
            if (contactObj2 !== null) {
              for (let i = 0; i < datar.userRef.length; i++) {
                if (datar.userRef[i].name === contactObj2.name) {
                  contactObj2.name =
                    datar.userRef[i].name + "%" + datar.userRef[i].eid;
                  contactObj2.eid = datar.userRef[i].eid;
                  break;
                } else {
                  if (datar.userRef.length === i + 1) {
                    contactObj2.eid = "";
                    contactObj2.name = "";
                  }
                }
              }
            }
          } else {
            datar.userRef = [];
            datar.userRef.unshift({ name: "", eid: null });
          }
          setAccountOverviewData(datar);
          setState({
            ...state,
            lastupdateDate: datar.lastupdatedate,
          });
        });
      });
      setLoader(false);
      return true;
    } else {
      setLoader(false);
      return false;
    }
  };
  const getUserDetails = () => {
    setUserDetails(appContext);
  };
  const closeModal = () => {
    setShowValidationMOdal(false);
  };
  const mandatoryCheck = () => {
    validation("navigation", accountOverviewData);
  };
  const accountContext = {
    accountOverviewData,
    setAccountOverviewData,
    setData,
    state,
    setLoader,
    checkEmail,
    updateValue,
    showValidationModal,
    validationMessage,
    closeModal,
    checkNumLength,
    getUserDetails,
    validation,
    mandatoryCheck,
    setValidationMessage,
    setShowValidationMOdal,
  };

  return (
    <GeneralAccountOverviewContext.Provider value={accountContext}>
      {props.children}
    </GeneralAccountOverviewContext.Provider>
  );
};

export const GeneralAccountOverviewContextConsumer =
  GeneralAccountOverviewContext.Consumer;
export default GeneralAccountOverviewContext;
