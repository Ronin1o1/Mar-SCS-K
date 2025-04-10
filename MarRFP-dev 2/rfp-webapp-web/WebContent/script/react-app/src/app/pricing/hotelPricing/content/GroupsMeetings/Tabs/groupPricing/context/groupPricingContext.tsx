import React, { useContext, useState } from "react";
import HotelContext from "../../../context/groupMeetingContextProvider";
import API from "../service/API";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import parentSettings from "../../../static/Settings";

const GroupPricingContext = React.createContext({});

export const GroupPricingContextProvider = (props) => {
  const history = useHistory();

  const parentContext = useContext(HotelContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    isDisabledPricing: false,
    enableField: null,
    groupPricingData: {
      list: {
        hotelrfpid: "",
        max_nego_for_10_50: "",
        max_nego_for_51_100: "",
        negotiated_tranisent_rate: null,
        no_compliment_room: "",
        discount_food_beverage: null,
        grpPriceChg: "",
      },
    },
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const setGroupPricingValidation = (data) => {
    if (data) {
      const groupPricingData = { ...state.groupPricingData };
      groupPricingData.list = data;

      setState({
        ...state,
        groupPricingData: groupPricingData,
      });
    }
  };

  const setGroupPricingData = (data) => {
    let is_disabled = false;
    const groupPricingDataAPI = { ...state.groupPricingData };
    if (data) {
      groupPricingDataAPI.list.hotelrfpid = data.hotelrfpid;
      groupPricingDataAPI.list.max_nego_for_10_50 = data.negratefifty;
      groupPricingDataAPI.list.max_nego_for_51_100 = data.negratehund;
      groupPricingDataAPI.list.negotiated_tranisent_rate =
        data.negtranshighrate;
      groupPricingDataAPI.list.no_compliment_room = data.comprooms;
      groupPricingDataAPI.list.discount_food_beverage = data.discfb;
      is_disabled =
        parentContext.state.groupMeetingData.list.GeneralReadOnly == true ||
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
          ? true
          : false;

      setState({
        ...state,
        enableField: true,
        isDisabledPricing: is_disabled,
        groupPricingData: groupPricingDataAPI,
      });
    }

    if (appContext?.user?.isHotelUser) {
      if (
        groupPricingDataAPI.list.max_nego_for_10_50 === "" ||
        groupPricingDataAPI.list.max_nego_for_10_50 === null ||
        groupPricingDataAPI.list.max_nego_for_51_100 === "" ||
        groupPricingDataAPI.list.max_nego_for_51_100 === null ||
        groupPricingDataAPI.list.negotiated_tranisent_rate === "" ||
        groupPricingDataAPI.list.negotiated_tranisent_rate === null ||
        groupPricingDataAPI.list.no_compliment_room === "" ||
        groupPricingDataAPI.list.no_compliment_room === null ||
        groupPricingDataAPI.list.discount_food_beverage === "" ||
        groupPricingDataAPI.list.discount_food_beverage === null
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.pricing_field_required,
          type: "browserAlert",
        });
      } else {
        if (
          sessionStorage.getItem("UpdatePricingGrpFlag") == "C" &&
          sessionStorage.getItem("UpdateMeetingGrpFlag") != "C"
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.meeting_field_required,
            type: "browserAlert",
          });
        } else if (
          sessionStorage.getItem("UpdatePricingGrpFlag") == "C" &&
          sessionStorage.getItem("UpdatePaymentGrpFlag") != "C"
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
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const handleDropdownChange = (event, str) => {
    const selectedPricingData = { ...state.groupPricingData };
    const value = event.target.value;
    selectedPricingData.list.grpPriceChg = "Y";
    if (str == "negotiatedRate") {
      selectedPricingData.list.negotiated_tranisent_rate = value;
    } else if (str == "foodBeverage") {
      selectedPricingData.list.discount_food_beverage = value;
    }
    setState({
      ...state,
      groupPricingData: selectedPricingData,
    });
    setPricingAlert("");
  };

  const validationCheck = () => {
    const groupPricingData = { ...state.groupPricingData };
    const updated_group_pricing = {
      ...parentContext.state.groupMeetingData,
    };
    if (
      groupPricingData.list.max_nego_for_10_50 === "" ||
      groupPricingData.list.max_nego_for_10_50 === null ||
      groupPricingData.list.max_nego_for_51_100 === "" ||
      groupPricingData.list.max_nego_for_51_100 === null ||
      groupPricingData.list.negotiated_tranisent_rate === "" ||
      groupPricingData.list.negotiated_tranisent_rate === null ||
      groupPricingData.list.no_compliment_room === "" ||
      groupPricingData.list.no_compliment_room === null ||
      groupPricingData.list.discount_food_beverage === "" ||
      groupPricingData.list.discount_food_beverage === null
    ) {
      updated_group_pricing.list.tabgrpgmsflg = "N";
      sessionStorage.setItem("UpdatePricingGrpFlag", "N");
    } else {
      updated_group_pricing.list.tabgrpgmsflg = "C";
      sessionStorage.setItem("UpdatePricingGrpFlag", "C");
    }
    parentContext.setEmptystateUpdate(true);
  };

  const checkGrpPricetab = () => {
    if (parentContext.state.groupMeetingData.list.grpsmtgrespond == "Y") {
      const grppricecheck = grpPriceCheck();
      if (grppricecheck == "complete" || grppricecheck == "continue") {
        if (parentContext.state.groupMeetingData.list.GeneralReadOnly != true) {
          grpPriceSubmit();
          const updated_group_pricing = {
            ...parentContext.state.groupMeetingData,
          };
          updated_group_pricing.list.formChg = "Y";
          if (grppricecheck == "complete") {
            if (parentContext.state.saveGroupMeetingEvent != null) {
              parentContext.setState({
                ...parentContext.state,
                groupMeetingData: updated_group_pricing,
              });
            }
          }
        }
      }
    }
  };

  const grpPriceCheck = () => {
    let bOK = true;
    let grppricecheckstatus = "complete";

    const updated_group_parent = { ...parentContext.state.groupMeetingData };
    const groupPricingDataAPI = { ...state.groupPricingData.list };
    if (
      parentContext.state.groupMeetingData.list.GeneralReadOnly != true &&
      appContext.user.role != "MFPADMIN"
    ) {
      if (
        parentContext.state.groupMeetingData.list.grpsmtgrespond == "Y" &&
        (!groupPricingDataAPI.max_nego_for_10_50 ||
          !groupPricingDataAPI.max_nego_for_51_100 ||
          !groupPricingDataAPI.negotiated_tranisent_rate ||
          !groupPricingDataAPI.no_compliment_room ||
          !groupPricingDataAPI.discount_food_beverage)
      ) {
        updated_group_parent.list.tabgrpgmsflg = "N";
        sessionStorage.setItem("UpdatePricingGrpFlag", "N");

        bOK = false;
      } else {
        updated_group_parent.list.tabgrpgmsflg = "C";
        sessionStorage.setItem("UpdatePricingGrpFlag", "C");
      }
    }

    if (parentContext.state.saveGroupMeetingEvent != null) {
      parentContext.setState({
        ...parentContext.state,
        groupMeetingData: updated_group_parent,
      });
    }

    if (!bOK) {
      if (
        appContext.user.role == "MFPADMIN" ||
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
      ) {
        grppricecheckstatus = "continue";
      } else {
        grppricecheckstatus = "failed";
      }
    } else {
      grppricecheckstatus = "complete";
    }

    return grppricecheckstatus;
  };

  const grpPriceSubmit = () => {
    const groupPricingData = { ...state.groupPricingData };
    if (groupPricingData.list.grpPriceChg == "Y") {
      const pricingDetails = {
        negratefifty: groupPricingData.list.max_nego_for_10_50,
        negratehund: groupPricingData.list.max_nego_for_51_100,
        negtranshighrate: groupPricingData.list.negotiated_tranisent_rate,
        comprooms: groupPricingData.list.no_compliment_room,
        discfb: groupPricingData.list.discount_food_beverage,
      };
      if (parentContext.isSaveClicked) {
        parentContext.setLoader(true);
      }

      API.updateGrpPrices(
        parentContext.masterData.hotelrfpid,
        pricingDetails
      ).then((res) => {
        if (res === "success") {
          validationCheck();
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }

          groupPricingData.list.grpPriceChg = "N";
          setState({
            ...state,
            groupPricingData: groupPricingData,
          });
        } else {
          alert(Settings.alerts.pricing_error);
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }
        }
      });
    }
  };

  const checkHotelUserAlert = () => {
    checkGrpPricetab();
    if (appContext?.user?.isHotelUser) {
      if (
        sessionStorage.getItem("responseCustomer") == "" ||
        sessionStorage.getItem("responseCustomer") == null ||
        sessionStorage.getItem("responseCustomer") == undefined
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.marRFP_selection_error,
          type: "browserAlert",
        });
      } else if (sessionStorage.getItem("responseCustomer") == "Y") {
        if (
          sessionStorage.getItem("UpdatePricingGrpFlag") == "C" &&
          sessionStorage.getItem("UpdateMeetingGrpFlag") != "C"
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.meeting_field_required,
            type: "browserAlert",
          });
        } else if (
          sessionStorage.getItem("UpdatePricingGrpFlag") == "C" &&
          sessionStorage.getItem("UpdatePaymentGrpFlag") != "C"
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.payment_field_required,
            type: "browserAlert",
          });
        } else if (sessionStorage.getItem("UpdatePricingGrpFlag") != "C") {
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.pricing_field_required,
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
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const setPricingAlert = (alertValid) => {
    const dropDownPricingData = { ...state.groupPricingData };
    if (appContext?.user?.isHotelUser) {
      if (alertValid == "Y") {
        sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.pricing_field_required,
          type: "browserAlert",
        });
      } else {
        if (
          dropDownPricingData.list.negotiated_tranisent_rate == null ||
          dropDownPricingData.list.negotiated_tranisent_rate == "" ||
          dropDownPricingData.list.discount_food_beverage == null ||
          dropDownPricingData.list.discount_food_beverage == ""
        ) {
          sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.pricing_field_required,
            type: "browserAlert",
          });
        } else {
          if (
            !dropDownPricingData.list.max_nego_for_10_50 ||
            !dropDownPricingData.list.max_nego_for_51_100 ||
            !dropDownPricingData.list.negotiated_tranisent_rate ||
            !dropDownPricingData.list.no_compliment_room ||
            !dropDownPricingData.list.discount_food_beverage
          ) {
            sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
            appContext.setErrorMessageAlert({
              show: true,
              message: parentSettings.alerts.pricing_field_required,
              type: "browserAlert",
            });
          } else {
            if (sessionStorage.getItem("UpdateMeetingGrpFlag") !== "C") {
              appContext.setErrorMessageAlert({
                show: true,
                message: parentSettings.alerts.meeting_field_required,
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
        }
      }
    } else {
      sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const onSaveClick = () => {
    if (appContext.savePricingStatusClicked) {
      if (parentContext.state.activeTab === "groupPricing") {
        checkHotelUserAlert();
        appContext.setSavePricingStatusClicked(false);
      }
    }
  };

  const componentUnload = () => {
    // sessionStorage.setItem("UpdatePricingGrpFlag", "C");
    // sessionStorage.setItem("UpdatePaymentGrpFlag", "C");
    // sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
  };

  const groupPricingContext = {
    state,
    setState,
    componentUnload,
    setGroupPricingValidation,
    handleDropdownChange,
    setGroupPricingData,
    checkGrpPricetab,
    checkHotelUserAlert,
    setPricingAlert,
    onSaveClick,
    focusedIndex,
    setFocusedIndex,
  };
  return (
    <GroupPricingContext.Provider value={groupPricingContext}>
      {props.children}
    </GroupPricingContext.Provider>
  );
};

export const GroupPricingContextConsumer = GroupPricingContext.Consumer;
export default GroupPricingContext;
