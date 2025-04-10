import React, { useState, useContext, useRef } from "react";
import API from "../service/API";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import HotelContext from "../../../context/groupMeetingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import parentSettings from "../../../static/Settings";

const MeetingContext = React.createContext({});

export const MeetingContextProvider = (props) => {
  const history = useHistory();
  const parentContext = useContext(HotelContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    mpc_one: false,
    mpc_two: false,
    isDisabledMeeting: false,
    enableField: null,
    meetingData: {
      list: {
        hotelrfpid: "",
        day_meeting_offered: "",
        type_day_meeting_offered: "",
        fulldaymtgincl: "",
        halfdaymtgincl: "",
        max_full_day_rate_for_10_50: "",
        max_half_day_rate_for_10_50: "",
        max_full_day_rate_for_50_100: "",
        max_half_day_rate_for_50_100: "",
        total_tax__on_day_meeting_offered: "",
        total_tax_on_day_meeting_package_quote: "",
        total_tax_on_day_meeting_package_include_exclude: "",
        banquet_service_amount: "",
        banquet_service_quoted: "",
        banquet_service_charges_taxed: "",
        banquet_service_include_exclude: "",
        max_cost_for_10_person: "",
        max_cost_for_25_person: "",
        complimentary_parking_not_overnight: null,
        free_internet_offer: "",
        high_internet_cost_included: null,
        lcd_cost_included: null,
        standard_screen_included: null,
        in_house_audio_discount: null,
        mtgPriceChg: "",
      },
    },
  });
  const [enableField, setEnableField] = useState(null);
  const [isDisabledMeeting, setIsDisabledMeeting] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const setMeeting = (data) => {
    if (data) {
      const meetingData = { ...state.meetingData };
      meetingData.list = data;

      setState({
        ...state,
        meetingData: meetingData,
      });
    }
  };

  const setGroupMeetingPricingConcessionData = (data) => {
    let is_disabled = false;
    if (data) {
      const meetingDataAPI = { ...state.meetingData };
      meetingDataAPI.list.hotelrfpid = data.hotelRFPSIHMtgPricing.hotelrfpid;
      meetingDataAPI.list.day_meeting_offered =
        data.hotelRFPSIHMtgPricing.meetingdaymeetingpckg;
      meetingDataAPI.list.type_day_meeting_offered =
        data.hotelRFPSIHMtgPricing.typedaymtgpkgs;
      meetingDataAPI.list.fulldaymtgincl =
        data.hotelRFPSIHMtgPricing.fulldaymtgincl;
      meetingDataAPI.list.halfdaymtgincl =
        data.hotelRFPSIHMtgPricing.halfdaymtgincl;
      meetingDataAPI.list.max_full_day_rate_for_10_50 =
        data.hotelRFPMtgPricing.fulldayratefifty;
      meetingDataAPI.list.max_half_day_rate_for_10_50 =
        data.hotelRFPMtgPricing.halfdayratefifty;
      meetingDataAPI.list.max_full_day_rate_for_50_100 =
        data.hotelRFPMtgPricing.fulldayratehund;
      meetingDataAPI.list.max_half_day_rate_for_50_100 =
        data.hotelRFPMtgPricing.halfdayratehund;
      meetingDataAPI.list.total_tax__on_day_meeting_offered =
        data.hotelRFPSIHMtgPricing.fmTaxdaymtgpkgs;
      meetingDataAPI.list.total_tax_on_day_meeting_package_quote =
        data.hotelRFPSIHMtgPricing.taxdaymtgqouteas;
      meetingDataAPI.list.total_tax_on_day_meeting_package_include_exclude =
        data.hotelRFPSIHMtgPricing.taxdaymtginclexcl;
      meetingDataAPI.list.banquet_service_amount =
        data.hotelRFPSIHMtgPricing.banqsvcamt;
      meetingDataAPI.list.banquet_service_quoted =
        data.hotelRFPSIHMtgPricing.banqsvcqtdas;
      meetingDataAPI.list.banquet_service_charges_taxed =
        data.hotelRFPSIHMtgPricing.banqsvcchgtax;
      meetingDataAPI.list.banquet_service_include_exclude =
        data.hotelRFPSIHMtgPricing.banqsvcinclexcl;
      meetingDataAPI.list.max_cost_for_10_person =
        data.hotelRFPMtgPricing.costbrkten;
      meetingDataAPI.list.max_cost_for_25_person =
        data.hotelRFPMtgPricing.costbrktwnfive;
      meetingDataAPI.list.complimentary_parking_not_overnight =
        data.hotelRFPMtgPricing.compparking;
      meetingDataAPI.list.free_internet_offer =
        data.hotelRFPMtgPricing.meetingrmhsiafee;
      meetingDataAPI.list.high_internet_cost_included =
        data.hotelRFPMtgPricing.intfeeincldaymtg;
      meetingDataAPI.list.lcd_cost_included =
        data.hotelRFPMtgPricing.lcdcostincldaymtg;
      meetingDataAPI.list.standard_screen_included =
        data.hotelRFPMtgPricing.scncostincldaymtg;
      meetingDataAPI.list.in_house_audio_discount =
        data.hotelRFPMtgPricing.discav;
      is_disabled =
        parentContext.state.groupMeetingData.list.GeneralReadOnly == true ||
          appContext.user.role == "MFPSALES" ||
          appContext.user.role == "MFPFSALE"
          ? true
          : false;
      setState({
        ...state,
        enableField: true,
        isDisabledMeeting: is_disabled,
        meetingData: meetingDataAPI,
      });
      setIsDisabledMeeting(is_disabled);
      setEnableField(true);
      showMeetingSections();

      //for hotel User
      if (appContext?.user?.isHotelUser) {
        if (
          meetingDataAPI.list.max_cost_for_10_person === "" ||
          meetingDataAPI.list.max_cost_for_10_person === null ||
          meetingDataAPI.list.max_cost_for_25_person === "" ||
          meetingDataAPI.list.max_cost_for_25_person === null ||
          meetingDataAPI.list.complimentary_parking_not_overnight === "" ||
          meetingDataAPI.list.complimentary_parking_not_overnight === null ||
          meetingDataAPI.list.free_internet_offer === "" ||
          meetingDataAPI.list.free_internet_offer === null ||
          meetingDataAPI.list.in_house_audio_discount === "" ||
          meetingDataAPI.list.in_house_audio_discount === null ||
          (meetingDataAPI.list.day_meeting_offered === "Yes" &&
            (meetingDataAPI.list.max_cost_for_10_person === "" ||
              meetingDataAPI.list.max_cost_for_10_person === null ||
              meetingDataAPI.list.max_cost_for_25_person === "" ||
              meetingDataAPI.list.max_cost_for_25_person === null ||
              meetingDataAPI.list.complimentary_parking_not_overnight === "" ||
              meetingDataAPI.list.complimentary_parking_not_overnight ===
              null ||
              meetingDataAPI.list.free_internet_offer === "" ||
              meetingDataAPI.list.free_internet_offer === null ||
              meetingDataAPI.list.in_house_audio_discount === "" ||
              meetingDataAPI.list.in_house_audio_discount === null ||
              meetingDataAPI.list.max_full_day_rate_for_10_50 === "" ||
              meetingDataAPI.list.max_full_day_rate_for_10_50 === null ||
              meetingDataAPI.list.max_half_day_rate_for_10_50 === "" ||
              meetingDataAPI.list.max_half_day_rate_for_10_50 === null ||
              meetingDataAPI.list.max_full_day_rate_for_50_100 === "" ||
              meetingDataAPI.list.max_full_day_rate_for_50_100 === null ||
              meetingDataAPI.list.high_internet_cost_included === "" ||
              meetingDataAPI.list.high_internet_cost_included === null ||
              meetingDataAPI.list.lcd_cost_included === "" ||
              meetingDataAPI.list.lcd_cost_included === null ||
              meetingDataAPI.list.standard_screen_included === "" ||
              meetingDataAPI.list.standard_screen_included === null ||
              meetingDataAPI.list.max_half_day_rate_for_50_100 === "" ||
              meetingDataAPI.list.max_half_day_rate_for_50_100 === null))
        ) {
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
    const selectedMeetingData = state.meetingData;
    const value = event.target.value;
    selectedMeetingData.list.mtgPriceChg = "Y";
    if (str == "complimentaryParking") {
      selectedMeetingData.list.complimentary_parking_not_overnight = value;
    } else if (str == "highInternet") {
      selectedMeetingData.list.high_internet_cost_included = value;
    } else if (str == "lcdOption") {
      selectedMeetingData.list.lcd_cost_included = value;
    } else if (str == "standardScreen") {
      selectedMeetingData.list.standard_screen_included = value;
    } else if (str == "inHouseAudio") {
      selectedMeetingData.list.in_house_audio_discount = value;
    }
    setState({
      ...state,
      meetingData: selectedMeetingData,
    });
    setMeetingAlert("");
    validationCheckOnChange(selectedMeetingData.list);
  };

  const showMeetingSections = () => {
    const selectedMeetingData = { ...state.meetingData };
    if (selectedMeetingData.list.day_meeting_offered == "Yes") {
      setState({
        ...state,
        mpc_one: true,
        mpc_two: true,
        meetingData: { ...state.meetingData },
      });
    } else {
      setState({
        ...state,
        mpc_one: false,
        mpc_two: false,
        meetingData: { ...state.meetingData },
      });
    }
  };

  //Meeting Validation and Saving
  const checkMtgPriceTab = () => {
    if (parentContext.state.groupMeetingData.list.grpsmtgrespond === "Y") {
      const mtgpricecheck = mtgPriceCheck();
      if (mtgpricecheck == "complete" || mtgpricecheck == "continue") {
        if (parentContext.state.groupMeetingData.list.GeneralReadOnly != true) {
          mtgPriceSubmit();
          const updated_group_meeting = {
            ...parentContext.state.groupMeetingData,
          };
          updated_group_meeting.list.formChg = "Y";
          if (mtgpricecheck == "complete") {
            if (parentContext.state.saveGroupMeetingEvent != null) {
              parentContext.setState({
                ...parentContext.state,
                groupMeetingData: updated_group_meeting,
              });
            }
          }
        }
      }
    }
  };

  const validationCheckOnChange = (meetingList?) => {
    const meetingData = meetingList
      ? meetingList
      : { ...state.meetingData.list };
    const updated_group_parent = { ...parentContext.state.groupMeetingData };
    const epicMtgPckg = meetingData.day_meeting_offered;
    if (
      meetingData.max_cost_for_10_person == "" ||
      meetingData.max_cost_for_10_person == null ||
      meetingData.max_cost_for_25_person == "" ||
      meetingData.max_cost_for_25_person == null ||
      meetingData.complimentary_parking_not_overnight == "" ||
      meetingData.complimentary_parking_not_overnight === null ||
      meetingData.free_internet_offer == "" ||
      meetingData.free_internet_offer == null ||
      meetingData.in_house_audio_discount == "" ||
      meetingData.in_house_audio_discount == null ||
      (epicMtgPckg == "Y" &&
        (meetingData.max_cost_for_10_person == "" ||
          meetingData.max_cost_for_10_person == null ||
          meetingData.max_cost_for_25_person == "" ||
          meetingData.max_cost_for_25_person == null ||
          meetingData.complimentary_parking_not_overnight == "" ||
          meetingData.complimentary_parking_not_overnight == null ||
          meetingData.free_internet_offer == "" ||
          meetingData.free_internet_offer == null ||
          meetingData.in_house_audio_discount == "" ||
          meetingData.in_house_audio_discount == null ||
          meetingData.max_full_day_rate_for_10_50 == "" ||
          meetingData.max_full_day_rate_for_10_50 == null ||
          meetingData.max_half_day_rate_for_10_50 == "" ||
          meetingData.max_half_day_rate_for_10_50 == null ||
          meetingData.max_full_day_rate_for_50_100 == "" ||
          meetingData.max_full_day_rate_for_50_100 == null ||
          meetingData.high_internet_cost_included == "" ||
          meetingData.high_internet_cost_included == null ||
          meetingData.lcd_cost_included == "" ||
          meetingData.lcd_cost_included == null ||
          meetingData.standard_screen_included == "" ||
          meetingData.standard_screen_included == null ||
          meetingData.max_half_day_rate_for_50_100 == "" ||
          meetingData.max_half_day_rate_for_50_100 == null))
    ) {
      parentContext?.setMeetPrcConcessionFlag("N");
    } else {
      parentContext?.setMeetPrcConcessionFlag("C");
    }
  };

  const validationCheck = () => {
    const meetingData = { ...state.meetingData.list };
    const updated_group_parent = { ...parentContext.state.groupMeetingData };
    const epicMtgPckg = meetingData.day_meeting_offered;
    if (
      meetingData.max_cost_for_10_person == "" ||
      meetingData.max_cost_for_10_person == null ||
      meetingData.max_cost_for_25_person == "" ||
      meetingData.max_cost_for_25_person == null ||
      meetingData.complimentary_parking_not_overnight == "" ||
      meetingData.complimentary_parking_not_overnight === null ||
      meetingData.free_internet_offer == "" ||
      meetingData.free_internet_offer == null ||
      meetingData.in_house_audio_discount == "" ||
      meetingData.in_house_audio_discount == null ||
      (epicMtgPckg == "Y" &&
        (meetingData.max_cost_for_10_person == "" ||
          meetingData.max_cost_for_10_person == null ||
          meetingData.max_cost_for_25_person == "" ||
          meetingData.max_cost_for_25_person == null ||
          meetingData.complimentary_parking_not_overnight == "" ||
          meetingData.complimentary_parking_not_overnight == null ||
          meetingData.free_internet_offer == "" ||
          meetingData.free_internet_offer == null ||
          meetingData.in_house_audio_discount == "" ||
          meetingData.in_house_audio_discount == null ||
          meetingData.max_full_day_rate_for_10_50 == "" ||
          meetingData.max_full_day_rate_for_10_50 == null ||
          meetingData.max_half_day_rate_for_10_50 == "" ||
          meetingData.max_half_day_rate_for_10_50 == null ||
          meetingData.max_full_day_rate_for_50_100 == "" ||
          meetingData.max_full_day_rate_for_50_100 == null ||
          meetingData.high_internet_cost_included == "" ||
          meetingData.high_internet_cost_included == null ||
          meetingData.lcd_cost_included == "" ||
          meetingData.lcd_cost_included == null ||
          meetingData.standard_screen_included == "" ||
          meetingData.standard_screen_included == null ||
          meetingData.max_half_day_rate_for_50_100 == "" ||
          meetingData.max_half_day_rate_for_50_100 == null))
    ) {
      updated_group_parent.list.tabprcgmsflg = "N";
      sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
    } else {
      updated_group_parent.list.tabprcgmsflg = "C";
      sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
    }
    parentContext.setEmptystateUpdate(true);
  };

  const checkEmptyData = (data) => {
    if (data) {
      for (const key in data) {
        if (
          (data[key] === null || data[key] === "") &&
          key !== "banquet_service_quoted" &&
          key !== "banquet_service_charges_taxed"
        ) {
          sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
            return true;
          }
      }
      sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
      return false;
    }
    return true;
  };
  const mtgPriceCheck = () => {
    let bOK = true;
    let mtgpricecheckstatus = "complete";
    const meetingData = { ...state.meetingData.list };
    const updated_group_parent = parentContext.state.groupMeetingData;
    const epicMtgPckg = meetingData.day_meeting_offered;

    if (
      parentContext.state.groupMeetingData.list.GeneralReadOnly != true &&
      appContext.user.role != "MFPADMIN"
    ) {
          if (
        !meetingData.max_cost_for_10_person ||
        !meetingData.max_cost_for_25_person ||
        !meetingData.complimentary_parking_not_overnight ||
        !meetingData.free_internet_offer ||
        !meetingData.in_house_audio_discount ||
        (epicMtgPckg == "Y" && checkEmptyData(meetingData))
      ) {
        updated_group_parent.list.tabprcgmsflg = "N";
        sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
        bOK = false;
      } else {
        updated_group_parent.list.tabprcgmsflg = "C";
        sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
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
        mtgpricecheckstatus = "continue";
      } else {
        mtgpricecheckstatus = "failed";
      }
    } else {
      mtgpricecheckstatus = "complete";
    }

    return mtgpricecheckstatus;
  };

  const mtgPriceSubmit = () => {
    const meetingData = { ...state.meetingData };
    if (meetingData.list.mtgPriceChg == "Y") {
      const meetingDetails = {
        fulldayratefifty:
          meetingData.list.max_full_day_rate_for_10_50 === ""
            ? null
            : meetingData.list.max_full_day_rate_for_10_50,
        halfdayratefifty:
          meetingData.list.max_half_day_rate_for_10_50 === ""
            ? null
            : meetingData.list.max_half_day_rate_for_10_50,
        fulldayratehund:
          meetingData.list.max_full_day_rate_for_50_100 === ""
            ? null
            : meetingData.list.max_full_day_rate_for_50_100,
        halfdayratehund:
          meetingData.list.max_half_day_rate_for_50_100 === ""
            ? null
            : meetingData.list.max_half_day_rate_for_50_100,
        costbrkten:
          meetingData.list.max_cost_for_10_person === ""
            ? null
            : meetingData.list.max_cost_for_10_person,
        costbrktwnfive:
          meetingData.list.max_cost_for_25_person === ""
            ? null
            : meetingData.list.max_cost_for_25_person,
        compparking: meetingData.list.complimentary_parking_not_overnight,
        meetingrmhsiafee:
          meetingData.list.free_internet_offer === ""
            ? null
            : meetingData.list.free_internet_offer,
        intfeeincldaymtg: meetingData.list.high_internet_cost_included,
        lcdcostincldaymtg: meetingData.list.lcd_cost_included,
        scncostincldaymtg: meetingData.list.standard_screen_included,
        discav: meetingData.list.in_house_audio_discount,
      };
      if (parentContext.isSaveClicked) {
        parentContext.setLoader(true);
      }
      API.updateMtgPrices(
        parentContext.masterData.hotelrfpid,
        meetingDetails,
        meetingData.list.mtgPriceChg
      ).then((res) => {
        if (res === "success") {
          validationCheck();
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }
          meetingData.list.mtgPriceChg = "N";
          setState({
            ...state,
            meetingData: meetingData,
          });
        } else {
          alert(Settings.alerts.meeting_error);
          if (parentContext.isSaveClicked) {
            parentContext.setLoader(false);
          }
        }
      });
    }
  };

  const checkHotelUserAlert = () => {
    checkMtgPriceTab();
    if (appContext?.user?.isHotelUser) {
      if (
        sessionStorage.getItem("UpdateMeetingGrpFlag") == "C" &&
        sessionStorage.getItem("UpdatePaymentGrpFlag") != "C"
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.payment_field_required,
          type: "browserAlert",
        });
      } else if (sessionStorage.getItem("UpdateMeetingGrpFlag") != "C") {
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
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const setMeetingAlert = (alertValid) => {
    const dropDownMeetingData = { ...state.meetingData };
    if (appContext?.user?.isHotelUser) {
      if (alertValid == "Y") {
        sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
        appContext.setErrorMessageAlert({
          show: true,
          message: parentSettings.alerts.meeting_field_required,
          type: "browserAlert",
        });
      } else {
        if (
          dropDownMeetingData.list.complimentary_parking_not_overnight ===
          null ||
          dropDownMeetingData.list.complimentary_parking_not_overnight === "" ||
          dropDownMeetingData.list.in_house_audio_discount === null ||
          dropDownMeetingData.list.in_house_audio_discount === "" ||
          dropDownMeetingData.list.free_internet_offer === null ||
          dropDownMeetingData.list.free_internet_offer === "" ||
          dropDownMeetingData.list.max_cost_for_25_person === null ||
          dropDownMeetingData.list.max_cost_for_25_person === "" ||
          dropDownMeetingData.list.max_cost_for_10_person === "" ||
          dropDownMeetingData.list.max_cost_for_10_person === null
        ) {
          sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.meeting_field_required,
            type: "browserAlert",
          });
        } else if (
          (dropDownMeetingData.list.day_meeting_offered === "Y" ||
            dropDownMeetingData.list.day_meeting_offered === "Yes") &&
          checkEmptyData(dropDownMeetingData.list)
        ) {
          sessionStorage.setItem("UpdateMeetingGrpFlag", "N");
          appContext.setErrorMessageAlert({
            show: true,
            message: parentSettings.alerts.meeting_field_required,
            type: "browserAlert",
          });
        } else {
          sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
          if (sessionStorage.getItem("UpdatePaymentGrpFlag") !== "C") {
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
    if (appContext.saveMeetingStatusClicked) {
      if (parentContext.state.activeTab === "meeting") {
        checkHotelUserAlert();
        appContext.setSaveMeetingStatusClicked(false);
      }
    }
  };

  const componentUnload = () => {
    // appContext.setErrorMessageAlert({
    //   show: false,
    //   message: "",
    //   type: "browserAlert",
    // });
  };
  const meetingContext = {
    state,
    setState,
    setMeeting,
    handleDropdownChange,
    setGroupMeetingPricingConcessionData,
    checkMtgPriceTab,
    isDisabledMeeting,
    checkHotelUserAlert,
    setMeetingAlert,
    onSaveClick,
    focusedIndex,
    setFocusedIndex,
    componentUnload,
    enableField,
    validationCheckOnChange,
  };
  return (
    <MeetingContext.Provider value={meetingContext}>
      {props.children}
    </MeetingContext.Provider>
  );
};

export const MeetingContextConsumer = MeetingContext.Consumer;
export default MeetingContext;
