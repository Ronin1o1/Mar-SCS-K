import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";
import HotelContext, {
  HotelContextProvider,
} from "../../../context/groupMeetingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import parentSettings from "../../../static/Settings";

const GroupMeetingsPaymentContext = React.createContext({});

export const GroupMeetingsPaymentContextProvider = (props) => {
  const history = useHistory();

  const parentContext = useContext(HotelContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    show_payment_terms: false,
    show_funds_on_credit: false,
    isDisabledPayment: false,
    enableField: null,
    paymentData: {
      list: {
        hotelrfpid: "",
        require_advance_deposit: null,
        allow_direct_billing: null,
        payment_terms: "",
        accept_corporate_meeting_card: null,
        funds_on_card: null,
        grpMtgPayChg: "",
      },
    },
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const setGroupPaymentValidation = (data) => {
    if (data) {
      const groupPaymentData = { ...state.paymentData };
      groupPaymentData.list = data;

      setState({
        ...state,
        paymentData: groupPaymentData,
      });
    }
  };

  const setGroupPaymentData = (data) => {
    let show_payment_terms = false;
    let show_funds_on_credit = false;
    let is_disabled = false;
    if (data) {
      const paymentData = { ...state.paymentData };
      paymentData.list.hotelrfpid = data.hotelrfpid;
      paymentData.list.require_advance_deposit = data.upfrontdep;
      paymentData.list.allow_direct_billing = data.directbill;
      paymentData.list.payment_terms = data.payterms;
      paymentData.list.accept_corporate_meeting_card = data.corporate_mtngcard;
      paymentData.list.funds_on_card = data.mtngcardfunds;
      show_payment_terms =
        paymentData.list.allow_direct_billing === "Y" ? true : false;
      show_funds_on_credit =
        paymentData.list.accept_corporate_meeting_card === "Y" ? true : false;
      is_disabled =
        parentContext.state.groupMeetingData.list.GeneralReadOnly == true ||
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
          ? true
          : false;

      setState({
        ...state,
        show_payment_terms,
        show_funds_on_credit,
        enableField: true,
        isDisabledPayment: is_disabled,
        paymentData: paymentData,
      });

      if (
        (paymentData.list.require_advance_deposit == null ||
          paymentData.list.require_advance_deposit == "" ||
          paymentData.list.allow_direct_billing == null ||
          paymentData.list.allow_direct_billing == "" ||
          paymentData.list.allow_direct_billing == null ||
          (paymentData.list.allow_direct_billing == "Y" &&
            (paymentData.list.payment_terms == "" ||
              paymentData.list.payment_terms == null)) ||
          paymentData.list.accept_corporate_meeting_card == "" ||
          paymentData.list.accept_corporate_meeting_card == null ||
          (paymentData.list.accept_corporate_meeting_card == "Y" &&
            (paymentData.list.funds_on_card == "" ||
              paymentData.list.funds_on_card == null))) &&
        appContext?.user?.isHotelUser
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.payment_field_required,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
  };

  const handleDropdownChange = (event, str) => {
    const selectedPaymentData = state.paymentData;
    let show_payment_terms = state.show_payment_terms;
    let show_funds_on_credit = state.show_funds_on_credit;
    const value = event.target.value;
    selectedPaymentData.list.grpMtgPayChg = "Y";
    if (str == "advanceDeposit") {
      selectedPaymentData.list.require_advance_deposit = value;
    } else if (str == "directBilling") {
      selectedPaymentData.list.allow_direct_billing = value;
      selectedPaymentData.list.payment_terms =
        value === "N" ? "0" : selectedPaymentData.list.payment_terms;
      show_payment_terms = value === "Y" ? true : false;
    } else if (str == "corporateMeetingCard") {
      selectedPaymentData.list.accept_corporate_meeting_card = value;
      show_funds_on_credit = value === "Y" ? true : false;
    } else if (str == "fundsCard") {
      selectedPaymentData.list.funds_on_card = value;
    }

    setState({
      ...state,
      show_payment_terms,
      show_funds_on_credit,
      paymentData: selectedPaymentData,
    });
    setPaymentAlert("");
    validationCheckOnChange(selectedPaymentData);
  };

  //Payment Validation and Saving
  const checkPaymentTab = () => {
    if (parentContext.state.groupMeetingData.list.grpsmtgrespond == "Y") {
      const paymentcheck = paymentCheck();
      if (paymentcheck == "complete" || paymentcheck == "continue") {
        if (parentContext.state.groupMeetingData.list.GeneralReadOnly != true) {
          paymentSubmit();
          const updated_group_payment = {
            ...parentContext.state.groupMeetingData,
          };
          updated_group_payment.list.formChg = "Y";
          if (paymentcheck == "complete") {
            if (parentContext.state.saveGroupMeetingEvent != null) {
              parentContext.setState({
                ...parentContext.state,
                groupMeetingData: updated_group_payment,
              });
            }
          }
        }
      }
    }
  };

  const checkEmptyData = (paymentData?) => {
    const groupPaymentData = paymentData
      ? paymentData
      : { ...state.paymentData };
    if (
      groupPaymentData.list.require_advance_deposit === null ||
      groupPaymentData.list.require_advance_deposit === "" ||
      groupPaymentData.list.allow_direct_billing === null ||
      groupPaymentData.list.allow_direct_billing === "" ||
      (groupPaymentData.list.allow_direct_billing === "Y" &&
        groupPaymentData.list.payment_terms === "") ||
      groupPaymentData.list.payment_terms === null ||
      groupPaymentData.list.accept_corporate_meeting_card === null ||
      groupPaymentData.list.accept_corporate_meeting_card === "" ||
      (groupPaymentData.list.accept_corporate_meeting_card === "Y" &&
        (groupPaymentData.list.funds_on_card === null ||
          groupPaymentData.list.funds_on_card === ""))
    ) {
      sessionStorage.setItem("UpdatePaymentGrpFlag", "N");
      return true;
    } else {
      return false;
    }
  };

  const paymentCheck = () => {
    let bOK = true;
    let paymentcheckstatus = "complete";

    const updated_group_payment = { ...parentContext.state.groupMeetingData };
    if (
      parentContext.state.groupMeetingData.list.GeneralReadOnly != true &&
      appContext.user.role != "MFPADMIN"
    ) {
      if (checkEmptyData()) {
        updated_group_payment.list.tabpaygmsflg = "N";
        sessionStorage.setItem("UpdatePaymentGrpFlag", "N");
        bOK = false;
      } else {
        updated_group_payment.list.tabpaygmsflg = "C";
        sessionStorage.setItem("UpdatePaymentGrpFlag", "C");
      }
    }

    if (parentContext.state.saveGroupMeetingEvent != null) {
      parentContext.setState({
        ...parentContext.state,
        groupMeetingData: updated_group_payment,
      });
    }

    if (!bOK) {
      if (
        appContext.user.role == "MFPADMIN" ||
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
      ) {
        paymentcheckstatus = "continue";
      } else {
        paymentcheckstatus = "failed";
      }
    } else {
      paymentcheckstatus = "complete";
    }

    return paymentcheckstatus;
  };

  const validationCheck = () => {
    const updated_group_parent = { ...parentContext.state.groupMeetingData };
    if (checkEmptyData()) {
      updated_group_parent.list.tabpaygmsflg = "N";
      sessionStorage.setItem("UpdatePaymentGrpFlag", "N");
    } else {
      updated_group_parent.list.tabpaygmsflg = "C";
      sessionStorage.setItem("UpdatePaymentGrpFlag", "C");
    }
    parentContext.setEmptystateUpdate(true);
  };

  const validationCheckOnChange = (paymentData?) => {
    const updated_group_parent = { ...parentContext.state.groupMeetingData };
    if (checkEmptyData(paymentData)) {
      parentContext?.setGmsPaymentFlag("N");
    } else {
      parentContext?.setGmsPaymentFlag("C");
    }
  };

  const paymentSubmit = () => {
    const groupPaymentData = { ...state.paymentData };
    if (groupPaymentData.list.grpMtgPayChg == "Y") {
      const paymentDetails = {
        upfrontdep: groupPaymentData.list.require_advance_deposit,
        directbill: groupPaymentData.list.allow_direct_billing,
        payterms: groupPaymentData.list.payment_terms,
        corporate_mtngcard: groupPaymentData.list.accept_corporate_meeting_card,
        mtngcardfunds: groupPaymentData.list.funds_on_card,
      };
      if (parentContext.isSaveClicked) {
        parentContext.setLoader(true);
      }
      API.updateGrpMtgPay(
        parentContext.masterData.hotelrfpid,
        paymentDetails,
        groupPaymentData.list.grpMtgPayChg
      ).then((res) => {
        if (res === "success") {
          validationCheck();
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }
          groupPaymentData.list.grpMtgPayChg = "N";
          setState({
            ...state,
            groupPaymentData: groupPaymentData,
          });
        } else {
          alert(Settings.alerts.payment_error);
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }
        }
      });
    }
  };

  const checkHotelUserAlert = () => {
    checkPaymentTab();
    if (appContext?.user?.isHotelUser) {
      const groupPaymentFlag = {
        ...parentContext.state.groupMeetingData,
      };
      if (groupPaymentFlag.list.tabpaygmsflg != "C" || checkEmptyData()) {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.payment_field_required,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const setPaymentAlert = (alertValid) => {
    const dropDownPaymentData = { ...state.paymentData };
    if (appContext?.user?.isHotelUser) {
      if (alertValid == "Y") {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.payment_field_required,
          type: "browserAlert",
        });
      } else {
        if (checkEmptyData()) {
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.payment_field_required,
            type: "browserAlert",
          });
        } else {
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
        }
      }
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const onSaveClick = () => {
    if (appContext.savePaymentStatusClicked) {
      if (parentContext.state.activeTab === "groupsMeetingsPayment") {
        checkHotelUserAlert();
        appContext.setSavePaymentStatusClicked(false);
      }
    }
  };

  const groupMeetingsPaymentContext = {
    state,
    setState,
    setGroupPaymentValidation,
    setGroupPaymentData,
    handleDropdownChange,
    checkPaymentTab,
    checkHotelUserAlert,
    setPaymentAlert,
    onSaveClick,
    focusedIndex,
    setFocusedIndex,
    validationCheckOnChange,
  };
  return (
    <GroupMeetingsPaymentContext.Provider value={groupMeetingsPaymentContext}>
      {props.children}
    </GroupMeetingsPaymentContext.Provider>
  );
};

export const GroupMeetingPaymentContextConsumer =
  GroupMeetingsPaymentContext.Consumer;
export default GroupMeetingsPaymentContext;
