import React, { useState, useContext, useRef } from "react";
import API from "../service/API";
import Settings from "../static/Settings";
import Utils from "../../../../../../../common/utils/Utils";
import Util from "../../../../../../../../app/pricing/admin/utils/Utils";
import AccountDetailGeneral from "./AccountDetailGeneral";
import AccountListContext from "../../../../context/AccountListContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import moment from "moment";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const CriticalFieldsContext = React.createContext({});

export const CriticalFieldsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    formChg: false,
    showScreenLoader: false,
    criticalFieldsData: {
      criticalFieldAccountDetails: {
        accountDetailGeneral: new AccountDetailGeneral(),
        shortNextcontractstart: "",
        shortPrevcontractend: "",
        shortContractend: "",
        shortPassubmissiondate: "",
        shortClientduedate: "",
        shortRemindersdate: "",
        shortContractstart: "",
        shortRfppulldate: "",
        accountDropDowns: {
          accountPricingTypeList: [
            {
              accountpricingid: null,
              accountpricing: null,
              accountpricingtype: null,
              pricingtype_display: null,
            },
          ],
          accountThirdPartyList: [
            {
              account_thirdparty: "",
              account_thirdparty_refid: null,
            },
          ],
          pricingPeriodList: [
            {
              pricingperiodid: null,
              period: null,
              duedate: null,
              hasAccounts: null,
              shortDueDate: null,
              longDueDate: null,
            },
          ],
          accountSegmentList: [
            {
              accounttype: null,
              accounttypedescription: null,
              defaultcom: null,
            },
          ],
          accountPricingCycleList: [
            {
              accountpricingcycleid: null,
              accountpricingcycle: null,
            },
          ],
          allowableAerPercentsList: [
            {
              allowable_percents: null,
            },
          ],
          alternateCancPolicyList: [
            {
              altcancelpolicyid: null,
              altcancelpolicy: null,
              altcancelpolicytimeid: null,
              altcancelpolicytime: null,
              altcancelpolicynotes: null,
              altcancelpolicyoptionid: null,
              altcancelpolicyoption: null,
              cxlorder: null,
            },
          ],
          alternateCancPolicyTimeList: [
            {
              altcancelpolicyid: null,
              altcancelpolicy: null,
              altcancelpolicytimeid: null,
              altcancelpolicytime: null,
              altcancelpolicynotes: null,
              altcancelpolicyoptionid: null,
              altcancelpolicyoption: null,
              cxlorder: null,
            },
          ],
          accountHotelViewList: [
            {
              account_hotel_view: null,
              account_hotel_view_desc: null,
            },
          ],
        },
        periodDetails: {
          period: null,
          startdate: null,
          enddate: null,
          hotelsview: null,
          dueDates: null,
          shortEnddate: null,
          shortStartdate: null,
        },
      },
      pricingType: "",
      trackFlag: "",
      retCode: true,
      isDataLoaded: false,
      showDatePicker: false,
      newAccountName: "",
      thirdPartySelectedValue: [],
      thirdPartySelectedId: "",
      thirdPartyEventValue: null,
      userResponseForAlert: false,
      calendarPickedDate: null,
      startDate: null,
    },
  });
  const [shortContractStart, setShortContractStart] = useState("");
  const [shortContractEnd, setShortContractEnd] = useState("");
  const [startDateShowHideCalendar, setStartDateShowHideCalendar] =
    useState(false);
  const [endDateShowHideCalendar, setEndDateShowHideCalendar] = useState(false);
  const [reminderDateShowHideCalendar, setReminderDateShowHideCalendar] =
    useState(false);
  const [rfpFullDateShowHideCalendar, setRfpFullDateShowHideCalendar] =
    useState(false);
  const [pasSubDateShowHideCalendar, setPasSubDateShowHideCalendar] =
    useState(false);
  const [clientDueDateShowHideCalendar, setClientDueDateShowHideCalendar] =
    useState(false);

  const [dateValue, setDateValue] = useState("");
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const reminderDateRef = useRef(null);
  const rfpFullDateRef = useRef(null);
  const pasSubDateRef = useRef(null);
  const clientDueDateRef = useRef(null);

  const parentContext = useContext(AccountListContext);

  const accountData = { ...state };
  let newAccountName = "";

  const onChangeCalendar = (event) => {
    if (event.value == null) {
      if (
        event.target.id === Settings.criticalFieldsTab.labels.startDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
          "";
        setState(accountData);
        appContext.setStartDateEmpty(true);
        sessionStorage.setItem("setStartDateEmpty", "true");
      }
      if (event.target.id === Settings.criticalFieldsTab.labels.endDate.calId) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
          "";
        setState(accountData);
        appContext.setEndDateEmpty(true);
        sessionStorage.setItem("setEndDateEmpty", "true");
      }
    } else if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id === Settings.criticalFieldsTab.labels.startDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
          date;
        setState(accountData);
        appContext.setStartDateEmpty(false);
        sessionStorage.setItem("setStartDateEmpty", "false");
      }
      if (event.target.id === Settings.criticalFieldsTab.labels.endDate.calId) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
          date;
        setState(accountData);
        appContext.setEndDateEmpty(false);
        sessionStorage.setItem("setEndDateEmpty", "false");
      }
    }
    state.formChg = true;
  };

  const onAccountNameChangeHandler = (event) => {
    state.formChg = true;
    const { id } = event.target;
    //Check for id of account name and based on that set latest value to its input field and state.
    if (id === Settings.criticalFieldsTab.labels.accountName.id) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountname =
        event.target.value;
    }
    //Check for id of marsha account name and based on that set latest value to its input field and state.
    if (id === Settings.criticalFieldsTab.labels.marshaAcountName.id) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.rpgm_accountname =
        event.target.value;
    }
    //Check for id of gpp marsha account name and based on that set latest value to its input field and state.
    if (id === Settings.criticalFieldsTab.labels.gppMarshaAcountName.id) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
        event.target.value;
    }
    state.formChg = true;
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onGppAccountChangeHandler = (event) => {
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_account =
      event.target.value;
    //check if there is no gpp percent value, a default value i.e 10 will be assigned
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.default_percent === null
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent =
        Settings.criticalFieldsTab.labels.globalRecognition.value;
    }
    setEnhancedDiscountGppValue();
    //check for the gpp marsha account name value and based on that setting
    //discount first tier only and gpp loi agreement on file and updating the state.
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.aer_account ===
      Settings.criticalFieldsTab.labels.yes
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.discfirsttieronly =
        Settings.criticalFieldsTab.labels.yes;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.gpploiagreementonfile =
        Settings.criticalFieldsTab.labels.no;
      setAerName();
    }
    else
{
  accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.discfirsttieronly =
  Settings.criticalFieldsTab.labels.no; 
}
    state.formChg = true;
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onGppPercentChangeHandler = (event) => {
    const gppPercentValue = event.target.value;
    const aerAccount =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.aer_account;
    //check for the gpp marsha account name value and based on that further
    //if there is no gpp percent value set to default value i.e 10
    //else assign the latest value to input field and state
    if (aerAccount === Settings.criticalFieldsTab.labels.yes) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
        "";
      gppPercentValue === ""
        ? (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent =
            Settings.criticalFieldsTab.labels.globalRecognition.value)
        : (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent =
            Number(gppPercentValue));
      setState(accountData);
      setAerName();
    }
    state.formChg = true;
    OnChangevalidationCheck();
  };

  const onDiscTierChangeHandler = (event) => {
    const gppDiscountTier = event.target.value;
    if (gppDiscountTier == "Y") {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.discfirsttieronly =
        Settings.criticalFieldsTab.labels.yes;
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.discfirsttieronly =
        Settings.criticalFieldsTab.labels.no;
    }
    setState(accountData);
    state.formChg = true;
    OnChangevalidationCheck();
  };


  const onAccountPricingTypeChangeHandler = (event) => {
    accountData.formChg = true;
    const { account_tracking_only, aerportfolio, accountpricingtype } =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral;
    const oldPricingtype = accountpricingtype;
    accountData.criticalFieldsData.trackFlag = account_tracking_only;
    accountData.criticalFieldsData.pricingType = event.target.value;
    const aerPortFolio = aerportfolio;
    if (oldPricingtype === "") {
      accountData.criticalFieldsData.retCode = true;
    } else {
      //validates whether account pricing type coming from account maintenance search screen and if its "C"
      //confirm pop up message will be shown to user and based on user response assigning value to Account Pricing Type input field
      //else old value of account pricing type will be assigned to input field.
      if (
        oldPricingtype ===
          Settings.criticalFieldsTab.labels.accountPricingType.typeC &&
        aerPortFolio === Settings.criticalFieldsTab.labels.yes
      ) {
        if (parentContext.state.isCopyFromExistingAccount) {
          accountData.criticalFieldsData.retCode = confirm(
            Settings.criticalFieldsTab.confirmMessage1
          );
        }
        if (accountData.criticalFieldsData.retCode) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingtype =
            accountData.criticalFieldsData.pricingType;
        } else {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingtype =
            oldPricingtype;
          event.target.value = oldPricingtype;
          accountData.criticalFieldsData.retCode = true;
        }
      }
      //validates whether account pricing type coming from account maintenance search screen and if its "C" or "L" or "P"
      //confirm pop up message will be shown to user and based on user response assigning value to Account Pricing Type input field
      //else old value of account pricing type will be assigned to input field.
      if (
        accountData.criticalFieldsData.retCode === true &&
        oldPricingtype !== accountData.criticalFieldsData.pricingType
      ) {
        if (parentContext.state.isCopyFromExistingAccount) {
          accountData.criticalFieldsData.retCode = confirm(
            Settings.criticalFieldsTab.confirmMessage2
          );
        }
        if (accountData.criticalFieldsData.retCode) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingtype =
            accountData.criticalFieldsData.pricingType;
        } else {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingtype =
            oldPricingtype;
          event.target.value = oldPricingtype;
          accountData.criticalFieldsData.retCode = true;
        }
      }
      //Checks on the basis of user response to confirm pop up message, if "OK" then sets and disables gpp marsha account name,
      //group meetings, no squatter drop downs.
      if (accountData.criticalFieldsData.retCode) {
        if (
          accountData.criticalFieldsData.pricingType !==
            Settings.criticalFieldsTab.labels.accountPricingType.typeC ||
          accountData.criticalFieldsData.trackFlag ===
            Settings.criticalFieldsTab.labels.yes
        ) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_account =
            Settings.criticalFieldsTab.labels.no;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.groupmeetings =
            Settings.criticalFieldsTab.labels.no;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.nosquatter =
            Settings.criticalFieldsTab.labels.no;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent =
            null;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
            "";
        }
        // If account pricing type value is "L" then set account_tracking_only to No.
        if (
          accountData.criticalFieldsData.pricingType ===
          Settings.criticalFieldsTab.labels.accountPricingType.typeL
        ) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.account_tracking_only =
            Settings.criticalFieldsTab.labels.no;
        }
        // If account pricing type value is "P" then account viewable and marRFP due date dropdowns also gets disabled.
        if (
          accountData.criticalFieldsData.pricingType ===
          Settings.criticalFieldsTab.labels.accountPricingType.typeP
        ) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display =
            Settings.criticalFieldsTab.labels.no;
        }
      }
    }
    setState(accountData);
  };

  const onSegmentChangeHandler = (event) => {
    state.formChg = true;
    const origcommDefault = "";
    let chgcommDefault = "";
    //Prevent changing to a tier with a different default commissionability
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountSegmentList.map(
      (accountSegmentItem) => {
        if (event.target.value === accountSegmentItem.accounttype) {
          chgcommDefault = accountSegmentItem.defaultcom;
        }
      }
    );
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.accounttype !== ""
    ) {
      //validates if default com for any account segment item is not null,
      // then show a alert message and assign previous value to dropdown.
      if (chgcommDefault != null) {
        if (origcommDefault !== chgcommDefault) {
          event.target.value =
            accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accounttype;
          alert(Settings.criticalFieldsTab.defaultCommissionMessage);
        }
      } else {
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accounttype =
          event.target.value;
      }
    }
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onCommissionabiltyExceptionHandler = (event) => {
    state.formChg = true;
    if (event.target.checked) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.commdef_tier =
        Settings.criticalFieldsTab.labels.yes;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.commdef_acct =
        Settings.criticalFieldsTab.labels.yes;
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.commdef_tier =
        Settings.criticalFieldsTab.labels.no;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.commdef_acct =
        "";
    }
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onHotelViewChangeHandler = (event) => {
    state.formChg = true;
    //check if value of account viewable field is yes,
    //then while changing the value of Hotel Viewership a confirm message will be shown.
    //based on that value will be further set to state
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.hotel_display ===
      Settings.criticalFieldsTab.labels.yes
    ) {
      const oldHotelView =
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.account_hotel_view;
      const newHotelView = event.target.value;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.account_hotel_view =
        newHotelView;
      //validates the value of account type for hotel viewership dropdown
      if (
        oldHotelView ===
          Settings.criticalFieldsTab.labels.hotelViewerShip.viewA &&
        newHotelView === Settings.criticalFieldsTab.labels.hotelViewerShip.viewS
      ) {
        if (confirm(Settings.criticalFieldsTab.hotelViewMessage)) {
          event.target.value = newHotelView;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.account_hotel_view =
            newHotelView;
        } else {
          event.target.value = oldHotelView;
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.account_hotel_view =
            oldHotelView;
        }
      }
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.account_hotel_view =
        event.target.value;
    }
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onbtBookingCostChangeHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.bt_booking_cost =
      event.target.value;
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onAccountViewableChangeHandler = (event) => {
    state.formChg = true;
    const currentDate = Utils.getTimezoneIdependentCurrentDate().toString();
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display =
      event.target.value;

    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.hotel_display ===
      Settings.criticalFieldsTab.labels.yes
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display_date =
        currentDate;
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.bt_booking_cost === "" ||
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.bt_booking_cost === null
      ) {
        alert(Settings.criticalFieldsTab.btBookingCostMessage);
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display =
          Settings.criticalFieldsTab.labels.no;
        event.target.value = Settings.criticalFieldsTab.labels.no;
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display_date =
          "";
      }
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.hotel_display_date =
        "";
    }

    setState(accountData);
    OnChangevalidationCheck();
  };

  const onPricingCycleChangeHandler = (event) => {
    state.formChg = true;
    const prevCycleId =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.accountpricingcycleid;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingcycleid =
      event.target.value;
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.offcycleaccountcanchange ===
      Settings.criticalFieldsTab.labels.no
    ) {
      alert(Settings.criticalFieldsTab.accountPricingCycleMessage);
    } else if (
      event.target.value ==
        Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1 &&
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.offcycleaccountcanchange ===
        Settings.criticalFieldsTab.labels.no &&
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.offcycle === Settings.criticalFieldsTab.labels.no
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle =
        Settings.criticalFieldsTab.labels.no;
    } else if (
      Number(
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.accountpricingcycleid
      ) === Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle =
        Settings.criticalFieldsTab.labels.no;

      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle_numseasons =
        Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason4;
      /**MRFP-8263 When change Account pricing cycle to Normal need to revert selected date to
       * default contract date
       */
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
        accountData?.criticalFieldsData?.criticalFieldAccountDetails?.periodDetails?.shortStartdate;
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
        accountData?.criticalFieldsData?.criticalFieldAccountDetails?.periodDetails?.shortEnddate;
    } else {
      if (event.target.value !== "*") {
        if (
          prevCycleId &&
          Number(prevCycleId) ===
            Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1
        ) {
          alert(Settings.criticalFieldsTab.offCycleMessage1);
        }
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle =
          Settings.criticalFieldsTab.labels.yes;
      }
    }
    setState(accountData);
    OnChangevalidationCheck();
  };

  const onOffCycleChangeHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle =
      event.target.value;
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.offcycle ===
        Settings.criticalFieldsTab.labels.yes &&
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.govvpproductenabled ===
        Settings.criticalFieldsTab.labels.yes
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle =
        Settings.criticalFieldsTab.labels.no;
      alert(Settings.criticalFieldsTab.offCycleMessage2);
    }
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.offcycle === Settings.criticalFieldsTab.labels.yes
    ) {
      alert(Settings.criticalFieldsTab.offCycleMessage1);
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingcycleid =
        Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle3;
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountpricingcycleid =
        Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1;
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
        shortContractStart;
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
        shortContractEnd;
    }
    setState(accountData);
  };

  const onStartEndDateChangeHandler = (event) => {
    state.formChg = true;
    const { id } = event.target;
    //Check for id of start date and based on that set latest value to its input field and state.
    if (id === Settings.criticalFieldsTab.labels.startDate.id) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.shortContractstart =
        event.target.value;
    }
    //Check for id of end date and based on that set latest value to its input field and state.
    if (id === Settings.criticalFieldsTab.labels.endDate.id) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.shortContractend =
        event.target.value;
    }
    setState(accountData);
  };

  const onStartDateHideHandler = () => {
    let validDate = true;
    //Checks if entered start date is a valid date.
    validDate =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortContractstart !== ""
        ? Utils.isDate(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortContractstart
          )
        : false;
    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
        "";
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
        Utils.setDatewithYYYY(
          accountData.criticalFieldsData.criticalFieldAccountDetails
            .shortContractstart
        );
    }
    if (validDate) {
      startEndDateValidation();
    }
    setState(accountData);
  };

  const onEndDateHideHandler = () => {
    state.formChg = true;
    let validDate = true;
    //Checks if entered end date is a valid date.
    validDate =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortContractend !== ""
        ? Utils.isDate(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortContractend
          )
        : false;

    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
        "";
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
        Utils.setDatewithYYYY(
          accountData.criticalFieldsData.criticalFieldAccountDetails
            .shortContractend
        );
    }
    if (validDate) {
      startEndDateValidation();
    }
    setState(accountData);
  };

  const startEndDateValidation = () => {
    state.formChg = true;
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortContractstart !== "" &&
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortContractend !== ""
    ) {
      Utils.isValidDate(
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortContractstart,
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortContractend
      );
    }
  };

  const onStartDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractstart =
      event.target.value;
    setState(accountData);
  };

  const onEndDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortContractend =
      event.target.value;
    setState(accountData);
  };
  const onMaxSeasonsChangeHandler = (event) => {
    state.formChg = true;
    const numSeasons = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle_numseasons =
      numSeasons;
    setState(accountData);
  };

  const onMaxSeasonsBlurHandler = (event) => {
    state.formChg = true;
    let numSeasons = event.target.value;
    const accountPricingCycleid =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.accountpricingcycleid;
    //Checks if Max Season is not greater than 4 or 5. Otherwise show alert message.
    if (
      accountPricingCycleid != 2 &&
      accountPricingCycleid != 3 &&
      !(
        Number(numSeasons) ===
          Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason4 ||
        Number(numSeasons) ===
          Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason5
      )
    ) {
      alert(Settings.criticalFieldsTab.MaxSeasonsAlertMessage);

      numSeasons = Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason4;

      event.target.value = numSeasons;

      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle_numseasons =
        numSeasons;
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.offcycle_numseasons =
        numSeasons;
    }

    setState(accountData);
  };

  //Setting MarRFP due date value to react state.
  const onMarRFPDueDateChangeHandler = (event) => {
    accountData.formChg = true;
    event.target.value === ""
      ? (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.pricingperiodid =
          null)
      : (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.pricingperiodid =
          event.target.value);
    setState(accountData);
    warningCheckDueDate();
  };

  const onReminderDateHideHandler = () => {
    state.formChg = true;
    let validDate = true;
    validDate = Utils.isDate(
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortRemindersdate
    );
    //Checks if entered reminder's date is a valid date.
    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortRemindersdate =
        "";
    } else {
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortRemindersdate !== ""
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortRemindersdate =
          Utils.setDatewithYYYY(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortRemindersdate
          );
      }
    }
    setState(accountData);
  };

  const onRfpFullDateHideHandler = () => {
    state.formChg = true;
    let validDate = true;
    validDate = Utils.isDate(
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortRfppulldate
    );
    //Checks if entered rfp full date is a valid date.
    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortRfppulldate =
        "";
    } else {
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortRfppulldate !== ""
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortRfppulldate =
          Utils.setDatewithYYYY(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortRfppulldate
          );
      }
    }
    setState(accountData);
  };

  const onPasSubmissionDateHideHandler = () => {
    state.formChg = true;
    let validDate = true;
    validDate = Utils.isDate(
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortPassubmissiondate
    );
    //Checks if entered rfp full date is a valid date.
    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortPassubmissiondate =
        "";
    } else {
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortPassubmissiondate !== ""
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortPassubmissiondate =
          Utils.setDatewithYYYY(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortPassubmissiondate
          );
      }
    }
    setState(accountData);
  };

  const onClientDueDateHideHandler = () => {
    state.formChg = true;
    let validDate = true;
    validDate = Utils.isDate(
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .shortClientduedate
    );
    //Checks if entered rfp full date is a valid date.
    if (!validDate) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.shortClientduedate =
        "";
    } else {
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .shortClientduedate !== ""
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortClientduedate =
          Utils.setDatewithYYYY(
            accountData.criticalFieldsData.criticalFieldAccountDetails
              .shortClientduedate
          );
      }
    }
    setState(accountData);
  };

  const onReminderDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortRemindersdate =
      event.target.value;
    setState(accountData);
  };

  const onRfpFullDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortRfppulldate =
      event.target.value;
    setState(accountData);
  };

  const onPasSubDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortPassubmissiondate =
      event.target.value;
    setState(accountData);
  };

  const onClientDueDateInputHandler = (event) => {
    state.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.shortClientduedate =
      event.target.value;
    setState(accountData);
  };

  const onAltCanPolicyChangehandler = (event) => {
    accountData.formChg = true;
    const altCanPolicy = event.target.value;

    if (Number(altCanPolicy) === 1 || altCanPolicy === "") {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicyoptionid = 0;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicytimeid = 0;
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicyoptionid = 2;
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicytimeid = 0;
    }
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicyid =
      Number(altCanPolicy);
    setState(accountData);
  };

  const onAltCanPolicyNotesChangeHandler = (event) => {
    accountData.formChg = true;
    const stringNotes = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicynotes =
      stringNotes;
    setState(accountData);
  };

  const onAltCanPolicyNotesBlurHandler = (event) => {
    accountData.formChg = true;
    const stringNotes = event.target.value;
    const max_length =
      Settings.criticalFieldsTab.labels.accountCancellationPolicyNotes
        .max_length;
    if (stringNotes.length > max_length) {
      alert(
        Settings.criticalFieldsTab.labels.accountCancellationPolicyNotes
          .policyAlertMessage
      );
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicynotes =
        stringNotes.substr(0, max_length);
    } else {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.altcancelpolicynotes =
        stringNotes;
    }
    setState(accountData);
    OnChangevalidationCheck();
  };

  const acc_onchange = () => {
    accountData.formChg = true;
    accountData.criticalFieldsData.newAccountName =
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountname;
    sessionStorage.setItem(
      "accountsDataName",
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.accountname
    );
    setRpgmName();
    setAerName();
    OnChangevalidationCheck();
  };

  const setRpgmName = () => {
    state.formChg = true;
    const { accountname, rpgm_accountname } =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral;
    //checks if account name is not null or empty, further validates if marsha account name is empty.
    //then sets account name value to marsha account name after removing some special charcaters like (%,|)
    if (accountname !== "") {
      if (rpgm_accountname === "" || rpgm_accountname === null) {
        newAccountName = Utils.removeMarshaCharacters(accountname);
        if (
          newAccountName.length > Settings.criticalFieldsTab.labels.maxLength
        ) {
          newAccountName = newAccountName.substr(
            0,
            Settings.criticalFieldsTab.labels.maxLength
          );
        }
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.rpgm_accountname =
          newAccountName;
        setState(accountData);
      }
    }
  };

  const setAerName = () => {
    state.formChg = true;
    //checks if account name is not null or empty, further validates if gpp marsha account name is empty.
    //then sets account name value to gpp marsha account name after removing some special charcaters like (%,|)
    //Further validates the gpp percent value and based on that appends "Global Recognition" or "Global Partner".
  const defaultPercent = accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent;
  const globalRecognition = defaultPercent == 8 || defaultPercent == 9 || defaultPercent == Settings.criticalFieldsTab.labels.globalRecognition.value;
    
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.aer_accountname === null
    ) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
        "";
    }
    if (
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.accountname !== ""
    ) {
      if (
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.aer_account ===
          Settings.criticalFieldsTab.labels.yes &&
        (accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.aer_accountname === "" ||
          accountData.criticalFieldsData.criticalFieldAccountDetails
            .accountDetailGeneral.aer_accountname.length === 0)
      ) {
        newAccountName = Utils.removeMarshaCharacters(
          accountData.criticalFieldsData.criticalFieldAccountDetails
            .accountDetailGeneral.accountname
        );
        if (
          newAccountName.length > Settings.criticalFieldsTab.labels.maxLength
        ) {
          newAccountName = newAccountName.substr(
            0,
            Settings.criticalFieldsTab.labels.maxLength
          );
        }

        globalRecognition
          ? (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
              newAccountName +
              Settings.criticalFieldsTab.labels.space +
              Settings.criticalFieldsTab.labels.globalRecognition.name)
          : (accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
              newAccountName +
              Settings.criticalFieldsTab.labels.space +
              Settings.criticalFieldsTab.labels.globalPartner);

        if (
          accountData.criticalFieldsData.criticalFieldAccountDetails
            .accountDetailGeneral.aer_accountname.length >
          Settings.criticalFieldsTab.labels.maxLength
        ) {
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname =
            accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_accountname.substr(
              0,
              Settings.criticalFieldsTab.labels.maxLength
            );
        }
        setState(accountData);
      }
    }
  };

  const onGovtAccountChangeHandler = (event) => {
    state.formChg = true;
    const govValue = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.gov_account =
      govValue;
    if (govValue === Settings.criticalFieldsTab.labels.yes) {
      accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.perdiemadjustmentsallowed =
        Settings.criticalFieldsTab.labels.no;
    }

    setState(accountData);
  };

  const onPerDiemChangeHandler = (event) => {
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.perdiemadjustmentsallowed =
      event.target.value;
    setState(accountData);
  };

  const onEnhancedPGOOSChangeHandler = (event) => {
    accountData.formChg = true;
    const allowEnhancedValue = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.allowEnhanced =
      allowEnhancedValue;
    setEnhancedDiscountGppValue();
    setState(accountData);
  };

  const setEnhancedDiscountGppValue = () => {
    accountData.formChg = true;
    const allowEnhancedValue =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.allowEnhanced;
    const aerValue =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.aer_account;
    const enhancedDiscountGpp =
      accountData.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral.enhancedDiscountGpp;
    if (
      allowEnhancedValue === Settings.criticalFieldsTab.labels.yes &&
      aerValue === Settings.criticalFieldsTab.labels.yes
    ) {
      //@ts-ignore
      if (enhancedDiscountGpp === "" || enhancedDiscountGpp === null) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.enhancedDiscountGpp =
          accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.default_percent;
      }
    }
  };

  const onEnhancedDiscountChangeHandler = (event) => {
    accountData.formChg = true;
    const enhancedDiscount = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.enhancedDiscount =
      enhancedDiscount;
    setState(accountData);
  };

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };

  const onEnhancedDiscountBlurHandler = (event) => {
    state.formChg = true;
    const enhancedDiscount = event.target.value;
    if (enhancedDiscount === null || enhancedDiscount === "") {
      alert(Settings.criticalFieldsTab.enhancedDiscountAlertMessage1);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.criticalFieldsTab.enhancedDiscountAlertMessage1,
        type: "browserAlert",
      });
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    if (Number(enhancedDiscount) > 20) {
      alert(Settings.criticalFieldsTab.enhancedAndGppDiscountAlertMessage2);
    }
    OnChangevalidationCheck();
  };

  const onGppEnhancedDiscountChangeHandler = (event) => {
    accountData.formChg = true;
    const gppEnhancedDiscount = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.enhancedDiscountGpp =
      gppEnhancedDiscount;
    setState(accountData);
  };

  const onGppEnhancedDiscountBlurHandler = (event) => {
    state.formChg = true;
    const gppEnhancedDiscount = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.enhancedDiscountGpp =
      gppEnhancedDiscount;
    if (gppEnhancedDiscount === null || gppEnhancedDiscount === "") {
      alert(Settings.criticalFieldsTab.gppEnhancedDiscountAlertMessage1);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.criticalFieldsTab.gppEnhancedDiscountAlertMessage1,
        type: "browserAlert",
      });
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    if (Number(gppEnhancedDiscount) > 20) {
      alert(Settings.criticalFieldsTab.enhancedAndGppDiscountAlertMessage2);
    }
    if (
      Number(
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.enhancedDiscountGpp
      ) !==
      Number(
        accountData.criticalFieldsData.criticalFieldAccountDetails
          .accountDetailGeneral.default_percent
      )
    ) {
      alert(Settings.criticalFieldsTab.gppEnhancedDiscountAlertMessage2);
    }
    OnChangevalidationCheck();
  };

  const onGroupsAndMeetingChangeHandler = (event) => {
    accountData.formChg = true;
    const groupsAndMeetingValue = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.groupmeetings =
      groupsAndMeetingValue;
    setState(accountData);
  };

  const onSquatterChangeHandler = (event) => {
    accountData.formChg = true;
    const noSquatterValue = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.nosquatter =
      noSquatterValue;
    setState(accountData);
  };

  const onReminderDateChangeHandler = (event) => {
    accountData.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id === Settings.criticalFieldsTab.labels.reminderDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortRemindersdate =
          date;
      }
      setState(accountData);
    }
  };

  const onRfpFullDateChangeHandler = (event) => {
    accountData.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id === Settings.criticalFieldsTab.labels.rfpFullDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortRfppulldate =
          date;
      }
      setState(accountData);
    }
  };

  const onClientDueDateChangeHandler = (event) => {
    accountData.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id ===
        Settings.criticalFieldsTab.labels.clientDueDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortClientduedate =
          date;
      }
      setState(accountData);
    }
  };

  const onDateBlurHandler = (event, property) => {
    state.formChg = true;
    const dateVal = event.target.value;
    let bError;

    if (dateVal == null || dateVal === "") {
      accountData.criticalFieldsData.criticalFieldAccountDetails[property] = "";
      setState(accountData);
      return false;
    }
    const dateValues = dateVal.split("/");
    if (dateValues.length != 3) {
      bError = true;
    }

    if (dateValues == null) return false;
    const dtYear = Number(dateValues[2]);
    const dtMonth = Number(dateValues[0]);
    const dtDay = Number(dateValues[1]);

    if (bError == true) {
      alert(
        `${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      accountData.criticalFieldsData.criticalFieldAccountDetails[property] = "";
      setState(accountData);
      return false;
    } else if (dtDay < 1 || dtDay > 31) {
      alert(
        `Invalid day ${dtDay}. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      accountData.criticalFieldsData.criticalFieldAccountDetails[property] = "";
      setState(accountData);
      return false;
    } else if (dtMonth < 1 || dtMonth > 12) {
      alert(
        `Invalid month (${dtMonth}). ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    } else if (
      (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
      dtDay == 31
    ) {
      alert(
        `Day must be less than 30. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    } else if (dtMonth == 2) {
      const isleap =
        dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);

      if (dtDay > 28 && !isleap)
        alert(
          `Day must be less than 28. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
      else if (dtDay > 29 && isleap)
        alert(
          `Day must be less than 29. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
    }
  };

  const onPasSubmissionDateChangeHandler = (event) => {
    accountData.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id ===
        Settings.criticalFieldsTab.labels.pasSubmissionDate.calId
      ) {
        accountData.criticalFieldsData.criticalFieldAccountDetails.shortPassubmissiondate =
          date;
      }
      setState(accountData);
    }
  };

  const onGppLOIChangeHandler = (event) => {
    accountData.formChg = true;
    const gppLOI = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.gpploiagreementonfile =
      gppLOI;
    setState(accountData);
  };

  const onRolloverChangeHandler = (event) => {
    accountData.formChg = true;
    const rollover = event.target.value;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.acctwifipolicyid =
      rollover;
    setState(accountData);
  };

  const validationCheck = () => {
    const accountDetailsData = {
      ...state.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral,
    };

    let res = true;
    if (accountDetailsData.accountname === "") {
      alert(Settings.criticalFieldsTab.accountNameAlertMsg);
      res = false;
    }
    if (res) {
      if (accountDetailsData.rpgm_accountname === "") {
        alert(Settings.criticalFieldsTab.rpgm_accountNameAlertMsg);
        res = false;
      }
    }
    if (res) {
      if (
        accountDetailsData.accounttype === "*" ||
        accountDetailsData.accounttype === null
      ) {
        alert(Settings.criticalFieldsTab.accountTypeAlertMsg);
        res = false;
      }
    }
    if (res) {
      //@ts-ignore
      if (
        accountDetailsData.accountpricingcycleid === "*" ||
        accountDetailsData.accountpricingcycleid === null
      ) {
        alert(Settings.criticalFieldsTab.pricingCycleAlertMsg);
        res = false;
      }
    }
    if (res) {
      if (
        (accountDetailsData.accountpricingtype === "*" ||
          accountDetailsData.accountpricingtype === null) &&
        accountDetailsData.account_tracking_only !==
          Settings.criticalFieldsTab.labels.yes
      ) {
        alert(Settings.criticalFieldsTab.accountPricingTypeAlertMsg);
        res = false;
      }
    }

    if (res) {
      if (
        accountDetailsData.aer_account === Settings.criticalFieldsTab.labels.yes
      ) {
        if (accountDetailsData.aer_accountname === "") {
          alert(Settings.criticalFieldsTab.aerAccountNameAlertMsg);
          res = false;
        }
        if (accountDetailsData.default_percent === null) {
          alert(Settings.criticalFieldsTab.aerPercentAlertMsg);
          res = false;
        }
      }
    }
    if (res) {
      if (
        accountDetailsData.hotel_display ===
        Settings.criticalFieldsTab.labels.yes
      ) {
        if (
          accountDetailsData.account_hotel_view === "*" ||
          accountDetailsData.account_hotel_view === null
        ) {
          alert(Settings.criticalFieldsTab.hotelViewershipAlertMsg);
          res = false;
        }
      }
    }
    if (res) {
      if (
        accountDetailsData.enhancedDiscount >
        Settings.criticalFieldsTab.maxEnhancedDiscountLimit
      ) {
        alert(Settings.criticalFieldsTab.enhancedDiscountLimitAlertMsg);
        res = false;
      }
      if (
        accountDetailsData.enhancedDiscountGpp >
        Settings.criticalFieldsTab.maxEnhancedDiscountLimit
      ) {
        alert(Settings.criticalFieldsTab.enhancedDiscountLimitAlertMsg);
        res = false;
      }
    }
    return res;
  };

  const OnChangevalidationCheck = () => {
    setState({
      ...state,
      formChg: true,
    });
    const accountDetailsData = {
      ...state.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral,
    };

    let res = true;
    if (
      accountDetailsData.accountname === undefined ||
      accountDetailsData.accountname === ""
    ) {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.criticalFieldsTab.accountNameAlertMsg,
        type: "browserAlert",
      });
      res = false;
    }
    if (res) {
      if (
        accountDetailsData.rpgm_accountname === undefined ||
        accountDetailsData.rpgm_accountname === ""
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.rpgm_accountNameAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
    }
    if (res) {
      if (
        accountDetailsData.accounttype === "*" ||
        accountDetailsData.accounttype === null
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.accountTypeAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
    }
    if (res) {
      //@ts-ignore
      if (
        accountDetailsData.accountpricingcycleid === "*" ||
        accountDetailsData.accountpricingcycleid === null
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.pricingCycleAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
    }
    if (res) {
      if (
        (accountDetailsData.accountpricingtype === "*" ||
          accountDetailsData.accountpricingtype === null) &&
        accountDetailsData.account_tracking_only !==
          Settings.criticalFieldsTab.labels.yes
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.accountPricingTypeAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
    }

    if (res) {
      if (
        accountDetailsData.aer_account === Settings.criticalFieldsTab.labels.yes
      ) {
        if (accountDetailsData.aer_accountname === "") {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.criticalFieldsTab.aerAccountNameAlertMsg,
            type: "browserAlert",
          });
          res = false;
        }
        if (accountDetailsData.default_percent === null) {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.criticalFieldsTab.aerPercentAlertMsg,
            type: "browserAlert",
          });
          res = false;
        }
      }
    }
    if (res) {
      if (
        accountDetailsData.hotel_display ===
        Settings.criticalFieldsTab.labels.yes
      ) {
        if (
          accountDetailsData.account_hotel_view === "*" ||
          accountDetailsData.account_hotel_view === null
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.criticalFieldsTab.hotelViewershipAlertMsg,
            type: "browserAlert",
          });
          res = false;
        }
      }
    }
    if (res) {
      if (
        accountDetailsData.enhancedDiscount >
        Settings.criticalFieldsTab.maxEnhancedDiscountLimit
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.enhancedDiscountLimitAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
      if (
        accountDetailsData.enhancedDiscountGpp >
        Settings.criticalFieldsTab.maxEnhancedDiscountLimit
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.criticalFieldsTab.enhancedDiscountLimitAlertMsg,
          type: "browserAlert",
        });
        res = false;
      }
    }
    if (res) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    warningCheckDueDate();
    return res;
  };

  const warningCheckDueDate = () => {
    const accountDetailsData = {
      ...state.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral,
    };
    if (
      accountDetailsData.pricingperiodid === null &&
      (accountDetailsData.accountpricingtype ===
        Settings.criticalFieldsTab.labels.accountPricingType.typeC ||
        accountDetailsData.accountpricingtype ===
          Settings.criticalFieldsTab.labels.accountPricingType.typeL)
    ) {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.criticalFieldsTab.dueDateWarningMsg,
        type: "confirmAlert",
      });
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "confirmAlert",
      });
    }
  };
  const warningCheck = () => {
    let warn = true;
    const accountDetailsData = {
      ...state.criticalFieldsData.criticalFieldAccountDetails
        .accountDetailGeneral,
    };
    if (
      accountDetailsData.pricingperiodid === null &&
      (accountDetailsData.accountpricingtype ===
        Settings.criticalFieldsTab.labels.accountPricingType.typeC ||
        accountDetailsData.accountpricingtype ===
          Settings.criticalFieldsTab.labels.accountPricingType.typeL)
    ) {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.criticalFieldsTab.dueDateWarningMsg,
        type: "confirmAlert",
      });
      confirm(Settings.criticalFieldsTab.dueDateWarningMsg)
        ? (warn = true)
        : (warn = false);
    }
    return warn;
  };

  const onAccountThirdPartyRegionChangeHandler = (event) => {
    accountData.formChg = true;
    accountData.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountThirdPartyRegion.map(
      (t, index) => {
        accountData.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountThirdPartyList.map(
          (accountThirdParty) => {
            if (
              `accountDetailGeneral.accountThirdPartyRegion[${index}].account_thirdparty_ref_id` ===
              event.target.id
            ) {
              if (
                accountThirdParty.account_thirdparty_refid ===
                Number(event.target.value)
              ) {
                t.account_thirdparty_ref_id =
                  accountThirdParty.account_thirdparty_refid;
              }
            }
          }
        );
      }
    );
    setState(accountData);
  };

  const conversionOfData = (data) => {
    if (data.shortContractstart !== "")
      data.accountDetailGeneral.contractstart = data.shortContractstart;
    else data.accountDetailGeneral.contractstart = null;
    if (data.shortContractend !== "")
      data.accountDetailGeneral.contractend = data.shortContractend;
    else data.accountDetailGeneral.contractend = null;

    data.accountDetailGeneral.prevcontractend = Utils.getShortDate(
      data.accountDetailGeneral.prevcontractend
    );
    data.accountDetailGeneral.nextcontractstart = Utils.getShortDate(
      data.accountDetailGeneral.nextcontractstart
    );
    if (data.shortRfppulldate !== "")
      data.accountDetailGeneral.rfppulldate = data.shortRfppulldate;
    else data.accountDetailGeneral.rfppulldate = null;
    if (data.shortPassubmissiondate !== "")
      data.accountDetailGeneral.passubmissiondate = data.shortPassubmissiondate;
    else data.accountDetailGeneral.passubmissiondate = null;
    if (data.shortClientduedate !== "")
      data.accountDetailGeneral.clientduedate = data.shortClientduedate;
    else data.accountDetailGeneral.clientduedate = null;
    if (data.shortRemindersdate !== "")
      data.accountDetailGeneral.remindersdate = data.shortRemindersdate;
    else data.accountDetailGeneral.remindersdate = null;
    data.accountDetailGeneral.cbcduedate = null;
    if (data.accountDetailGeneral.hotel_display_date === null)
      data.accountDetailGeneral.hotel_display_date = "";
    data.accountDetailGeneral.accountThirdPartyRegion.map(
      (accountThirdPartyRegion) => {
        if (accountThirdPartyRegion.account_thirdparty_ref_id === null) {
          accountThirdPartyRegion.account_thirdparty_ref_id = 0;
        }
      }
    );
  };

  const onAutoSaveData = (callback) => {
    sessionStorage.setItem(
      "isCopyFromExistingAccount",
      parentContext.state.isCopyFromExistingAccount
    );
    setState({
      ...state,
      showScreenLoader: true,
    });

    const data = { ...state.criticalFieldsData.criticalFieldAccountDetails };
    conversionOfData(data);
    Object.keys(data).map((key) => {
      if (typeof data[key] == "boolean") {
        if (data[key]) {
          data[key] = "Y";
        }
      }
    });
    //Processes save functionality if following fields are not empty or null.
    if (
      !parentContext.state.isCopyFromExistingAccount &&
      !data.accountDetailGeneral.accountrecid
    ) {
      //While creating a new account sending account rec id as 0 so that default values are displayed
      //on critical fields tab screen.
      data.accountDetailGeneral.accountrecid = 0;
      data.accountDetailGeneral.accountid = 0;
      data.accountDetailGeneral.strAccountrecid = "0";
      data.accountDetailGeneral.period =
        parentContext.state.accountListData.selectedAccount.period;
      if (
        data.accountDetailGeneral.accountpricingcycleid ==
          Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1 ||
        data.accountDetailGeneral.offcycle_numseasons === ""
      ) {
        data.accountDetailGeneral.offcycle_numseasons =
          Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason5;
      }
      if (data.accountDetailGeneral.altcancelpolicyid === 1) {
        data.accountDetailGeneral.altcancelpolicynotes = "";
      }
      if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
        setState({
          ...state,
          showScreenLoader: false,
        });
      } else {
        API.updateCriticalFields(data).then((response) => {
          setState({
            ...state,
            formChg: false,
            showScreenLoader: false,
          });
          state.formChg = false;
          if (response.baccountnameexists) {
            alert(Settings.criticalFieldsTab.duplicateAccountAlert);
            appContext.setErrorMessageAlert({
              show: true,
              message: Settings.criticalFieldsTab.duplicateAccountAlert,
              type: "browserAlert",
            });
            throw new Error(Settings.criticalFieldsTab.duplicateError);
          }
          parentContext.state.accountListData.selectedAccount.accountrecid =
            response.accountrecid;
          parentContext.state.isCopyFromExistingAccount = true;
          sessionStorage.setItem("isCopyFromExistingAccount", "true");
          accountData.criticalFieldsData.newAccountName = "";
          API.getCriticalFields(
            parentContext.state.accountListData.selectedAccount.accountrecid
              ? parentContext.state.accountListData.selectedAccount.accountrecid
              : sessionStorage.getItem("accountsDataRecId"),
            data.accountDetailGeneral.period
              ? data.accountDetailGeneral.period
              : sessionStorage.getItem("accountsDataPeriod")
          ).then((newAccountData) => {
            parentContext.state.accountListData.selectedAccount.accountName =
              newAccountData.accountDetailGeneral.accountname;
            sessionStorage.setItem(
              "accountsDataRecId",
              newAccountData.accountDetailGeneral.accountrecid
            );
            sessionStorage.setItem(
              "accountsDataPeriod",
              newAccountData.periodDetails.period
            );
            setCriticalFieldsData(newAccountData);
            if (data.shortContractend !== "") {
              appContext.setEndDateEmpty(false);
            } else {
              appContext.setEndDateEmpty(true);
            }
            if (data.shortContractstart !== "") {
              appContext.setStartDateEmpty(false);
            } else {
              appContext.setStartDateEmpty(true);
            }
          });
        });
      }
    } else {
      if (data.accountDetailGeneral.altcancelpolicyid === 1) {
        data.accountDetailGeneral.altcancelpolicynotes = "";
      }
      if (
        data.accountDetailGeneral.accountpricingcycleid ==
          Settings.criticalFieldsTab.labels.accountPricingCycle.pricingCycle1 ||
        data.accountDetailGeneral.offcycle_numseasons === ""
      ) {
        data.accountDetailGeneral.offcycle_numseasons =
          Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason5;
      }
      sessionStorage.setItem("isCopyFromExistingAccount", "true");
      if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
        setState({
          ...state,
          showScreenLoader: false,
        });
      } else {
        API.updateCriticalFields(data).then(() => {
          setState({
            ...state,
            formChg: false,
            showScreenLoader: false,
          });
          callback();
        });
      }
    }
  };

  const setLoader = () => {
    setState({
      ...state,
      showScreenLoader: true,
    });
  };

  const resetLoader = () => {
    setState({
      ...state,
      showScreenLoader: false,
    });
  };

  const setCriticalFieldsData = (data: any) => {
    if (data) {
      const criticalFieldsData = { ...state.criticalFieldsData };
      //To show first option value of account pricing type dropdown as empty.
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingTypeList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.accountPricingType
            .initialAccountPricingType,
          data.accountDropDowns.accountPricingTypeList
        );
      data.accountDropDowns.accountPricingTypeList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingTypeList;

      //To show first option value of account segment dropdown as empty.
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountSegmentList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.segment.initialAccountType,
          data.accountDropDowns.accountSegmentList
        );
      data.accountDropDowns.accountSegmentList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountSegmentList;

      //To show first option value of hotel viewership dropdown as empty.
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountHotelViewList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.hotelViewerShip.initialHotelView,
          data.accountDropDowns.accountHotelViewList
        );
      data.accountDropDowns.accountHotelViewList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountHotelViewList;

      //To show first option value of account pricing cycle dropdown as empty.
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingCycleList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.accountPricingCycle
            .initialPricingCycle,
          data.accountDropDowns.accountPricingCycleList
        );
      data.accountDropDowns.accountPricingCycleList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingCycleList;

      //To show first option value of marRFP due date dropdown as empty.
      // data.accountDropDowns.pricingPeriodList.forEach((elem) => {
      //   elem.longDueDate = moment(elem.duedate).format("MMMM DD, YYYY");
      // });
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.pricingPeriodList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.marrfpDueDate.initialMarRFPDueDate,
          data.accountDropDowns.pricingPeriodList
        );

      data.accountDropDowns.pricingPeriodList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.pricingPeriodList;

      //To show first option value of third parties region as empty.
      criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountThirdPartyList =
        Util.appendJsonObj(
          Settings.criticalFieldsTab.labels.rfp.initialThirdPartyRegion,
          data.accountDropDowns.accountThirdPartyList
        );
      data.accountDropDowns.accountThirdPartyList =
        criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountThirdPartyList;

      //While creating new account if account name, marsha account name, rfp full date, pas submission date,
      //client due date, reminder's date shows some cached value, remove them.
      if (
        !parentContext.state.isCopyFromExistingAccount &&
        !data.accountDetailGeneral.accountrecid
      ) {
        data.accountDetailGeneral.accountname = "";
        data.accountDetailGeneral.rpgm_accountname = "";
        data.accountDetailGeneral.shortRfppulldate = "";
        data.accountDetailGeneral.shortRemindersdate = "";
        data.accountDetailGeneral.shortPassubmissiondate = "";
        data.accountDetailGeneral.shortClientduedate = "";
        criticalFieldsData.newAccountName = "";

        //Setting Alternate Cancellation Policy Id to default value 1, so that while creating new account
        //initial data of Alternate policy cancellation dropdown loads with "Not Applicable" as selected value.
        data.accountDetailGeneral.altcancelpolicyid =
          Settings.criticalFieldsTab.labels.accountCancellationPolicy.policy1;

        //Setting Alternate Cancellation Policy Option Id and Alternate Cancellation Policy Time Id to default
        //value 0 when Alternate Cancellation Policy Id is set to default value 1
        data.accountDetailGeneral.altcancelpolicyoptionid = 0;
        data.accountDetailGeneral.altcancelpolicytimeid = 0;

        //Setting Max no. of seasons to default value 4, so that while creating new account
        //initial data of Max no. of seasons loads with 4 as display value in input field.
        data.accountDetailGeneral.offcycle_numseasons =
          Settings.criticalFieldsTab.labels.maxSeasons.noOfSeason4;
      }

      if (
        data.accountDetailGeneral.altcancelpolicynotes === null ||
        data.accountDetailGeneral.altcancelpolicynotes === ""
      ) {
        data.accountDetailGeneral.altcancelpolicynotes = "";
      }
      criticalFieldsData.criticalFieldAccountDetails = data;
      criticalFieldsData.isDataLoaded = true;
      setShortContractStart(data.shortContractstart);
      setShortContractEnd(data.shortContractend);
      setState({
        ...state,
        criticalFieldsData: criticalFieldsData,
      });
    }
  };

  const criticalFieldsContext = {
    state,
    setState,
    startDateShowHideCalendar,
    endDateShowHideCalendar,
    reminderDateShowHideCalendar,
    rfpFullDateShowHideCalendar,
    pasSubDateShowHideCalendar,
    clientDueDateShowHideCalendar,
    endDateRef,
    startDateRef,
    reminderDateRef,
    rfpFullDateRef,
    clientDueDateRef,
    pasSubDateRef,
    dateValue,
    setDateValue,
    setEndDateShowHideCalendar,
    setStartDateShowHideCalendar,
    setClientDueDateShowHideCalendar,
    setReminderDateShowHideCalendar,
    setPasSubDateShowHideCalendar,
    setRfpFullDateShowHideCalendar,
    setCriticalFieldsData,
    acc_onchange,
    onAccountNameChangeHandler,
    onGppAccountChangeHandler,
    onGppPercentChangeHandler,
    onSegmentChangeHandler,
    onAccountPricingTypeChangeHandler,
    onCommissionabiltyExceptionHandler,
    onHotelViewChangeHandler,
    onbtBookingCostChangeHandler,
    onAccountViewableChangeHandler,
    onPricingCycleChangeHandler,
    onOffCycleChangeHandler,
    onStartEndDateChangeHandler,
    onMaxSeasonsBlurHandler,
    onMaxSeasonsChangeHandler,
    onReminderDateHideHandler,
    onReminderDateChangeHandler,
    onRfpFullDateHideHandler,
    onRfpFullDateChangeHandler,
    onPasSubmissionDateHideHandler,
    onPasSubmissionDateChangeHandler,
    onClientDueDateHideHandler,
    onClientDueDateChangeHandler,
    onAltCanPolicyChangehandler,
    onAltCanPolicyNotesChangeHandler,
    onAltCanPolicyNotesBlurHandler,
    onGovtAccountChangeHandler,
    onPerDiemChangeHandler,
    onEnhancedPGOOSChangeHandler,
    onEnhancedDiscountChangeHandler,
    onEnhancedDiscountBlurHandler,
    onGppEnhancedDiscountChangeHandler,
    onGppEnhancedDiscountBlurHandler,
    onGroupsAndMeetingChangeHandler,
    onSquatterChangeHandler,
    onMarRFPDueDateChangeHandler,
    onAccountThirdPartyRegionChangeHandler,
    onAutoSaveData,
    validationCheck,
    warningCheck,
    onChangeCalendar,
    onStartDateHideHandler,
    onEndDateHideHandler,
    onStartDateInputHandler,
    onEndDateInputHandler,
    onReminderDateInputHandler,
    onClientDueDateInputHandler,
    onPasSubDateInputHandler,
    onRfpFullDateInputHandler,
    onGppLOIChangeHandler,
    onRolloverChangeHandler,
    setShowScreenLoader,
    showScreenLoader,
    setLoader,
    resetLoader,
    onDateBlurHandler,
    OnChangevalidationCheck,
    componentUnload,
    warningCheckDueDate,
    onDiscTierChangeHandler,
  };
  return (
    <CriticalFieldsContext.Provider value={criticalFieldsContext}>
      {props.children}
    </CriticalFieldsContext.Provider>
  );
};

export const CriticalFieldsContextConsumer = CriticalFieldsContext.Consumer;
export default CriticalFieldsContext;
