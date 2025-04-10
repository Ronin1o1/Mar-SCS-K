import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import API from "../service/API";
import Settings from "../../../../../static/Settings";
import PageSettings from "../static/Settings";
import SalesAdministartionContext from "../../../../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";

const EditBuyingOfficeContext = React.createContext({});
export const EditBuyingOfficeContextProvider = (props) => {
  const salescontext = useContext(SalesAdministartionContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const urlParms = useLocation().search;

  const [state, setState] = useState({
    intiativesList: [],
    strSelectedAffiliationList: [],
    strContact: [
      {
        contacttypeid: null,
        contactid: null,
        eid: "",
        contactTitle: "",
        contactPhone: "",
        contactEmail: "",
      },
      {
        contacttypeid: null,
        contactid: null,
        eid: "",
        contactTitle: "",
        contactPhone: "",
        contactEmail: "",
      },
    ],
    dataList: {
      data: [{}],
    },
  });
  const [showInitiativeModal, setShowInitiativeModal] = useState(false);
  const [editInitiativeData, setEditInitiativeData] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [methodType, setMethodType] = useState(null);
  const condition_check =
    history.location && history.location.state !== undefined;
  const buying_location_id =
    condition_check && history.location.state.buyinglocid;
  const accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  const period = new URLSearchParams(urlParms).get("year");
  const accountName = new URLSearchParams(urlParms).get("accountName");

  //API calls
  const getEditLocation = () => {
    const location_name = condition_check && history.location.state.bl_name;
    const bl_potentialrn =
      condition_check && history.location.state.bl_potentialrn;
    const seq_id = condition_check && history.location.state.seqid;
    const is_us_location = condition_check && history.location.state.usLocation;
    setShowLoader(true);
    API.getEditLoaction(
      location_name,
      buying_location_id,
      seq_id,
      bl_potentialrn,
      is_us_location,
      accountrecid
    ).then((data) => {
      const marriottKeys = Object.keys(data.contactMap);
      let contactObj;
      contactObj = data.contactMap[marriottKeys[0]];
      if (data.t1_contact.length > 0) {
        for (let i = 0; i < data.t1_contact.length; i++) {
          if (data.t1_contact[i].eid === contactObj.eid) {
            contactObj.eid = data.t1_contact[i].eid;
            break;
          } else {
            if (data.t1_contact.length === i + 1) contactObj.eid = "";
          }
        }
      }
      data.locStates.unshift([]);
      setEditBuyingOfficeData(data);
      validation("navigation", data);
    });
  };
  const prevButtonClick = () => {
    updateLocation("update");
  };
  const deleteLocation = () => {
    if (window.confirm(PageSettings.commontext.deleteWarning)) {
      const stateData = state.dataList.data;
      const body = {
        strLocationinfo: JSON.stringify(stateData),
        formChg: "N",
        period: period,
        accountrecid: accountrecid,
        accountname: accountName,
        bl_name: stateData.bl_name,
        buyinglocid: stateData.buyinglocid,
        seqid: stateData.seqid,
        bl_potentialrn: stateData.bl_potentialrn,
        us_location: stateData.us_location,
        revStreamId: stateData.revStreamId,
      };
      API.deleteLocation(body).then((data) => {
        if (data === "success") {
          history.push({
            pathname: `${Settings.parentRoute}/buyingOfficeLocation`,
            search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
          });
        }
        setValidationMessage("");
        setShowValidationModal(false);
        salescontext.setAlertMsgfunc(false, "");
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "custom",
        });
        return true;
      });
    }
  };

  const componentUnload = () => {
    setTimeout(() => {
      salescontext.setAlertMsgfunc(false, "");
    }, 1000);
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "custom",
    });
  };

  const updateLocation = (methodType) => {
    if (validation("update", state.dataList.data)) {
      const stateData = state.dataList.data;
      const locationInfo = {
        bl_name: stateData.locationinfo.bl_name,
        bl_potentialrn:
          stateData.locationinfo.bl_potentialrn === ""
            ? null
            : parseInt(stateData.locationinfo.bl_potentialrn),
        bl_potentialrev:
          stateData.locationinfo.bl_potentialrev === ""
            ? null
            : parseInt(stateData.locationinfo.bl_potentialrev),
        bl_salesareaid: parseInt(stateData.locationinfo.bl_salesareaid),
        bl_address: stateData.locationinfo.bl_address,
        bl_city: stateData.locationinfo.bl_city,
        bl_state: stateData.locationinfo.bl_state,
        bl_zip: parseInt(stateData.locationinfo.bl_zip),
        bl_overview: stateData.locationinfo.bl_overview,
        bl_objectives: stateData.locationinfo.bl_objectives,
        bl_country: stateData.locationinfo.bl_country,
      };
      const marriottKeys = Object.keys(state.dataList.data.contactMap);
      const contactObj = state.dataList.data.contactMap[marriottKeys[1]];
      if (contactObj.eid === "<Please select a contact>") {
        contactObj.eid = null;
        contactObj.contactName = null;
      }
      const strContact = state.dataList.data.contactMap;
      const strInitiative = stateData.initiatives.reduce((groups, contact) => {
        const seqid = contact.seqid;
        if (seqid !== null) {
          if (!groups[seqid]) {
            groups[seqid] = {};
          }
          groups[seqid] = contact;
        }
        return groups;
      }, {});
      const body = {
        strLocationinfo: JSON.stringify(locationInfo),
        strContact: JSON.stringify(strContact),
        strSelectedAffiliationList: JSON.stringify(
          state.strSelectedAffiliationList
        ),
        strInitiativesMap: JSON.stringify(strInitiative),
        formChg: "Y",
        period: period,
        accountrecid: accountrecid,
        accountname: accountName,
        bl_name: locationInfo.bl_name,
        buyinglocid: stateData.buyinglocid,
        seqid: stateData.seqid,
        bl_potentialrn: locationInfo.bl_potentialrn,
        us_location: stateData.us_location,
        revStreamId: stateData.revStreamId,
      };
      API.updateLocation(body).then((data) => {
        setMethodType(methodType);
        if (methodType === "update") {
          history.push({
            pathname: `${Settings.parentRoute}/buyingOfficeLocation`,
            search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
          });
        }
      });
      return true;
    } else {
      return false;
    }
  };
  //End of API calls
  const validation = (eventType, stateData) => {
    const marriottKeys = Object.keys(stateData.contactMap);
    const contactObj = stateData.contactMap[marriottKeys[0]];
    const contactObj2 = stateData.contactMap[marriottKeys[1]];
    if (
      stateData.locationinfo.bl_name === null ||
      stateData.locationinfo.bl_name === ""
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.locationName);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.locationName
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.locationName,
          type: "custom",
        });
        return false;
      }
    } else if (
      (stateData.us_location === "Y" &&
        stateData.locationinfo.bl_salesareaid === null) ||
      stateData.locationinfo.bl_salesareaid ===
        "<Please Select an Organization>"
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.orgName);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.orgName
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.orgName,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.locationinfo.bl_potentialrn === null ||
      stateData.locationinfo.bl_potentialrn === 0 ||
      stateData.locationinfo.bl_potentialrn === "0" ||
      stateData.locationinfo.bl_potentialrn === ""
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.rmnts);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.rmnts
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.rmnts,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.locationinfo.bl_overview !== null &&
      stateData.locationinfo.bl_overview.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.officeDescription);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.officeDescription
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.officeDescription,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.locationinfo.bl_objectives !== null &&
      stateData.locationinfo.bl_objectives.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.hotels);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.hotels
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.hotels,
          type: "custom",
        });
        return false;
      }
    } else if (
      contactObj.eid === "<Please select a contact>" ||
      contactObj.eid === "" ||
      contactObj.eid === null
    ) {
      if (eventType === "update") {
        setValidationMessage(
          PageSettings.validationMessages.marriottContactone
        );
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.marriottContactone
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.marriottContactone,
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
  const setEditBuyingOfficeData = (data) => {
    if (data) {
      data.locSalesAreas.length > 0 &&
        data.locSalesAreas.unshift({
          salesareaname: "<Please Select an Organization>",
          bl_salesareaid: null,
        });
      data.locCountries !== null &&
        data.locCountries.unshift({
          countryname: "<Please Select a Country/Region>",
        });
      if (data.t1_contact.length > 0) {
        data.t1_contact.unshift({
          name: "<Please select a contact>",
        });
      } else {
        data.t1_contact = [];
        data.t1_contact.unshift({
          name: "<Please select a contact>",
        });
      }
      if (data.initiatives.length > 0) {
        data.initiatives.map((eachInitiative) => {
          if (
            eachInitiative.initiative_name !== null &&
            eachInitiative.initiative_name !== ""
          ) {
            eachInitiative.isReadOnly = true;
          }
        });
      }
      for (let i = data.initiatives.length; i < data.maxInitiatives; i++) {
        data.initiatives.push({
          acctTasks: [],
          initiative_name: null,
          plan_tm_lead: null,
          init_date: null,
          action: null,
          objective: null,
          exec_plan: null,
          results: null,
          comments: null,
          revstreamid: 1,
          seqid: i + 1,
          buyinglocid: 0,
          acctinitiativeid: null,
          accountinfoid: null,
          isReadOnly: false,
        });
      }
      const dataList = { ...state.dataList };
      dataList.data = data;
      setState({
        ...state,
        dataList: dataList,
      });
      setShowLoader(false);
    }
  };
  const handleInitiativeChange = (e, index) => {
    state.dataList.data.initiatives[index].initiative_name = e.target.value;
    setState({
      ...state,
      dataList: state.dataList,
    });
  };
  const handleCommonChange = (event, inputType) => {
    const obj = state.dataList.data.locationinfo;
    if (
      inputType === "bl_potentialrn" ||
      inputType === "bl_potentialrev" ||
      inputType === "bl_zip"
    ) {
      const re = PageSettings.common.numberRegex;
      if (event.target.value === "" || re.test(event.target.value)) {
        obj[inputType] = event.target.value;
      }
    } else {
      obj[inputType] = event.target.value;
    }
    mandatoryCheck();
    setState({
      ...state,
      dataList: state.dataList,
    });
  };
  const handleCheckBoxChange = (e, data) => {
    if (e.target.checked) {
      state.strSelectedAffiliationList.push(data.affiliationid);
      data.affiliationstatus = "Y";
    } else {
      const index = state.strSelectedAffiliationList.indexOf(
        data.affiliationid
      );
      state.strSelectedAffiliationList.splice(index, 1);
      data.affiliationstatus = "N";
    }
    setState({
      ...state,
      strSelectedAffiliationList: state.strSelectedAffiliationList,
      dataList: state.dataList,
    });
  };
  const makeInitiativeLink = (index) => {
    if (
      state.dataList.data.initiatives[index].initiative_name !== null &&
      state.dataList.data.initiatives[index].initiative_name !== ""
    )
      state.dataList.data.initiatives[index].isReadOnly = true;
    setState({
      ...state,
      dataList: state.dataList,
    });
  };
  const taskClick = (initiative) => {
    setShowInitiativeModal(true);
    setEditInitiativeData(initiative);
  };
  const closeModal = () => {
    setShowInitiativeModal(false);
  };
  const closeValidationModal = () => {
    if (showValidationModal) {
      setShowValidationModal(false);
    } else if (appContext.onetimeAlert.show) {
      appContext.setOnetimeAlert({
        show: false,
        message: "",
        type: "custom",
      });
    }
  };
  const handleMarriottContactChange = (event, contacttypeid, inputType) => {
    const data = state.dataList.data;
    const contactsMap = state.dataList.data.contactMap;
    let obj;
    obj = contactsMap[contacttypeid];
    if (inputType === "contactPhone") {
      const re = PageSettings.common.re_phone_number;
      if (event.target.value === "" || re.test(event.target.value)) {
        obj[inputType] = event.target.value;
      }
    } else {
      obj[inputType] = event.target.value;
      if (inputType === "eid") {
        if (data.t1_contact.length > 0) {
          for (let i = 0; i < data.t1_contact.length; i++) {
            if (data.t1_contact[i].eid === obj.eid) {
              obj.contactName = data.t1_contact[i].name;
              break;
            }
          }
        }
      }
    }
    setState({
      ...state,
      dataList: state.dataList,
    });
    if (event.target.value === "") {
      salescontext.setAlertMsgfunc(
        true,
        PageSettings.validationMessages.marriottContactone
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: PageSettings.validationMessages.marriottContactone,
        type: "custom",
      });
      return false;
    } else {
      validation("navigation", state.dataList.data);
    }
  };

  useEffect(() => {
    if (appContext.navbarClicked) {
      setShowValidationModal(false);
    }
  }, [appContext.navbarClicked]);

  const mandatoryCheck = () => {
    validation("navigation", state.dataList.data);
  };
  const checkEmail = (strValue) => {
    let emailCondition;
    if (strValue === "" || strValue === null) {
      emailCondition = false;
    } else {
      if (strValue.indexOf("@") === -1) {
        emailCondition = true;
      } else {
        emailCondition = false;
      }
    }
    if (emailCondition) {
      appContext.setOnetimeAlert({
        show: true,
        message: PageSettings.validationMessages.validEmail,
        type: "custom",
      });
    } else {
      appContext.setOnetimeAlert({
        show: false,
        message: "",
        type: "custom",
      });
    }
  };
  const pricingContext = {
    state,
    setState,
    setEditBuyingOfficeData,
    handleInitiativeChange,
    handleCommonChange,
    makeInitiativeLink,
    getEditLocation,
    editInitiativeData,
    setEditInitiativeData,
    taskClick,
    showLoader,
    closeModal,
    deleteLocation,
    handleCheckBoxChange,
    updateLocation,
    handleMarriottContactChange,
    prevButtonClick,
    validationMessage,
    showValidationModal,
    closeValidationModal,
    showInitiativeModal,
    mandatoryCheck,
    checkEmail,
    methodType,
    componentUnload,
  };

  return (
    <EditBuyingOfficeContext.Provider value={pricingContext}>
      {props.children}
    </EditBuyingOfficeContext.Provider>
  );
};
export const EditBuyingOfficeContextConsumer = EditBuyingOfficeContext.Consumer;
export default EditBuyingOfficeContext;
