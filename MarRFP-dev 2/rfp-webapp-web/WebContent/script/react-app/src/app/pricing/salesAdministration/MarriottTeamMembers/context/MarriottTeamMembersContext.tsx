import React, { useState, useContext } from "react";
import Settings from "../static/Settings";
//import MarriottTeamMembersApi from "../service/MarriottTeamMembersApi";
import SalesAdministartionContext from "../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

const MarriottTeamMembersContext = React.createContext({});

export const MarriottTeamMembersContextProvider = (props) => {
  const salescontext = useContext(SalesAdministartionContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [state, setState] = useState({
    formChg: "N",
    showEmailModal: false,
    showAddButtonModal: false,
    contactList: [],
    contactType: null,
    availableContactTypes: [],
    showScreenLoader: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const addContact = () => {
    let contactTypeID;
    if (state.contactType === null) {
      setState({ ...state, showAddButtonModal: true });
    } else {
      state.availableContactTypes.map((eachContact) => {
        if (eachContact.heading === state.contactType) {
          contactTypeID = eachContact.contactTypeID;
        }
      });
      const obj = {
        heading: state.contactType,
        name: null,
        title: null,
        phone: null,
        email: null,
        contactTypeID: contactTypeID,
      };
      state.contactList.push(obj);
      const filteredavailableContactTypes = state.availableContactTypes.filter(
        (item) => item.heading !== state.contactType
      );
      setState({
        ...state,
        contactList: state.contactList,
        availableContactTypes: filteredavailableContactTypes,
        contactType: null,
      });
    }
  };

  const onContactChange = (event) => {
    setState({ ...state, contactType: event.target.value });
  };

  const handleCommonChange = (e, key, inputType) => {
    const re = Settings.commonContent.re_phone_number;
    if (inputType === "phone") {
      if (e.target.value === "" || re.test(e.target.value)) {
        const obj = state.contactList[key];
        obj[inputType] = e.target.value;
      }
    } else {
      const obj = state.contactList[key];
      obj[inputType] = e.target.value;
    }
    setState({ ...state, contactList: state.contactList });
  };

  const checkEmail = () => {
    if (allEmailsAreValid()) {
      setState({ ...state, showEmailModal: false });
      salescontext.setAlertMsgfunc(false, "");
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "custom",
      });
      return true;
    } else {
      setState({ ...state, showEmailModal: true });
      salescontext.setAlertMsgfunc(
        true,
        Settings.marriottTeamMembers.emailAlert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.marriottTeamMembers.emailAlert,
        type: "custom",
      });
      return false;
    }
  };

  const allEmailsAreValid = () => {
    const strContacts = state.contactList;
    const Emails = [];
    strContacts.length > 0 &&
      strContacts.map((eachContact) => {
        if (eachContact.email !== null && eachContact.email !== "")
          Emails.push(eachContact.email);
      });
    const emailCondition = (strValue) => strValue.indexOf("@") !== -1;
    const isValidEmail = Emails.every(emailCondition);
    return isValidEmail;
  };

  const closeEmailModal = () => {
    setState({ ...state, showEmailModal: !state.showEmailModal });
  };

  const closeAddButtonModal = () => {
    setState({ ...state, showAddButtonModal: !state.showAddButtonModal });
  };

  const marriottTeamMembersContext = {
    state,
    setState,
    addContact,
    handleCommonChange,
    checkEmail,
    closeEmailModal,
    closeAddButtonModal,
    onContactChange,
    allEmailsAreValid,
    setLoader,
  };

  return (
    <MarriottTeamMembersContext.Provider value={marriottTeamMembersContext}>
      {props.children}
    </MarriottTeamMembersContext.Provider>
  );
};

export const MarriottTeamMembersContextConsumer =
  MarriottTeamMembersContext.Consumer;
export default MarriottTeamMembersContext;
