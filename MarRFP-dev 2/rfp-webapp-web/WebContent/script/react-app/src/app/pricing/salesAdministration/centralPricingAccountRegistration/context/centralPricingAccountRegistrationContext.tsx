import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";

const CentralPricingAccountRegistrationContext = React.createContext({});

const centralPricingEmptyObj = {
  eid: "",
  leadName: "",
  accountLeadPhone: "",
  accountLeadEmail: "",
  accountID: "",
  accountName: "",
  clientPreferredName: "",
  accountUrl: "",
  accountType: "",
  salesRegionID: "",
  haspriorprice: "",
  thirdPartyTool: "",
  utilThirdParty: "",
  thirdPartyId: 0,
  otherthirdpartyname: "",
  loginIdReceived: "",
  solicitPricing: "",
  reasonToPrice: "",
  btRoomNightSpan: "",
  roomNight: "",
  rateLoadInstr: "",
  pricingperiodid: "",
  clientDueDate: "",
  twoyearpricing: "",
  offcyclepricing: "",
  commrates: "",
  flatrates: "",
  regPeriod: "",
};

export const CentralPricingAccountRegistrationContextProvider = (
  props
): JSX.Element => {
  const history = useHistory();
  const [centralPricingAccount, setCentralPricingAccount] = useState(
    centralPricingEmptyObj
  );
  const [centralAccountRegistry, setCentralAccountRegistry] = useState(null);
  const [yearSelection, setYearSelection] = useState({
    year: new Date().getFullYear(),
    submitted: false,
  });
  const [accLeadContact, setAccLeadContact] = useState(null);
  const [accAAEAccList, setAccAAEAccList] = useState(null);
  const [periods, setPeriods] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  //sets reg period and account id when a year is selected
  useEffect(() => {
    if (yearSelection.year) {
      handlePricingAccountChange("regPeriod", yearSelection.year);
    }
  }, [yearSelection]);

  //handles validation of form on change
  useEffect(() => {
    if (centralPricingAccount) {
      const validationError = Settings.validationErrors.find((obj) => {
        if (
          centralPricingAccount.hasOwnProperty(obj.key) &&
          centralPricingAccount[obj.key] == ("" || 0)
        ) {
          if (
            obj.key === "thirdPartyId" &&
            centralPricingAccount.thirdPartyTool === "Y"
          ) {
            setValidationMessage(obj.label);
            return obj;
          } else if (obj.key !== "thirdPartyId") {
            setValidationMessage(obj.label);
            return obj;
          }
        } else {
          return false;
        }
      });
      if (validationError) {
        setIsFormValid(false);
      } else {
        setIsFormValid(true);
      }
    }
  }, [centralPricingAccount]);

  const fetchAccLeadNames = async (year) => {
    const data = await API.getFormOptions(year);
    setCentralAccountRegistry(data);
  };

  const fetchAccLeadContact = async (eid) => {
    const data = await API.getAccLeadContact(eid);
    setAccLeadContact(data);
    if (data.phoneNumber || data.emailAddress) {
      setCentralPricingAccount((prevState) => {
        prevState.accountLeadPhone = data.phoneNumber;
        prevState.accountLeadEmail = data.emailAddress;
        return { ...prevState };
      });
    }
  };

  const fetchAAEAccountList = async (eid) => {
    const data = await API.getAAEAccList(eid);
    setAccAAEAccList(data);
  };

  const fetchPeriods = async () => {
    const periods = await API.getPeriods();
    setPeriods(periods);
  };

  const handlePricingAccountChange = (key, data) => {
    if (
      key == "twoyearpricing" ||
      key == "offcyclepricing" ||
      key == "commrates" ||
      key == "flatrates"
    ) {
      setCentralPricingAccount((prevState) => {
        prevState[key] = data ? "Y" : "";
        return { ...prevState };
      });
    } else {
      setCentralPricingAccount((prevState) => {
        prevState[key] = data;
        return { ...prevState };
      });
    }
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      alert(Settings.labels.submitAlert);
      const res = await API.postAccount(
        yearSelection.year,
        centralPricingAccount
      );
      if (res === "success") {
        history.go(0);
      }
    } else {
      setDisplayValidationModal(true);
    }
  };

  const handleYearSelect = (year) => {
    const newYearSelect = { ...yearSelection };
    newYearSelect.year = year;
    setYearSelection(newYearSelect);
  };

  const handleSubmitYear = () => {
    const submitYear = { ...yearSelection };
    submitYear.submitted = true;
    setYearSelection(submitYear);
  };

  useEffect(() => {
    console.log("centralPricingAccount", centralPricingAccount);
  }, [centralPricingAccount]);

  const centralPricingAccountContext = {
    centralAccountRegistry,
    yearSelection,
    setYearSelection,
    centralPricingAccount,
    handlePricingAccountChange,
    handlePricingSubmit: handleSubmit,
    handleYearSelect,
    handleSubmitYear,
    fetchAccLeadNames,
    fetchAccLeadContact,
    fetchAAEAccountList,
    accAAEAccList,
    accLeadContact,
    handleSubmit,
    isFormValid,
    fetchPeriods,
    periods,
    displayValidationModal,
    setDisplayValidationModal,
    validationMessage,
  };

  return (
    <CentralPricingAccountRegistrationContext.Provider
      value={centralPricingAccountContext}
    >
      {props.children}
    </CentralPricingAccountRegistrationContext.Provider>
  );
};

export default CentralPricingAccountRegistrationContext;

export interface ICentralPricingAccRegContext {
  centralAccountRegistry;
  yearSelection;
  setYearSelection;
  centralPricingAccount;
  handlePricingAccountChange;
  handlePricingSubmit;
  handleYearSelect;
  handleSubmitYear;
  fetchAccLeadNames;
  fetchAccLeadContact;
  fetchAAEAccountList;
  accLeadContact;
  accAAEAccList;
  handleSubmit;
  isFormValid;
  fetchPeriods;
  periods;
  setDisplayValidationModal;
  displayValidationModal;
  validationMessage;
}
