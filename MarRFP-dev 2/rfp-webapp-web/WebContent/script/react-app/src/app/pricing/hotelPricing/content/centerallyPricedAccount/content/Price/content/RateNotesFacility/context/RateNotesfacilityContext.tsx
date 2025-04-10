import React, { useContext, useEffect, useRef, useState } from "react";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import API from "../service/API";
//import CPACAPI from "../../../../../../../content/centerallyPricedAccount/service/API";
import PricingAPI from "../../../../../../../content/centerallyPricedAccount/content/Price/service/API";
import { useLocation } from "react-router-dom";
import HotelPricingContext from "../../../../../../../context/hotelPricingContextProvider";
import PageSettings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";

const RateNotesFacilityContext = React.createContext({});
export const RateNotesFacilityContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    facility_name: null,
    facility_street: null,
    facility_city: null,
    facility_state_prov: null,
    facility_zip: null,
    facility_country: null,
    distance: null,
    directionstofacility: null,
    shuttle_cost_one_way: null,
    ratenotes: null,
    formattedLast_updateratenotes: "",
    propertyDistanceUnit: null,
    canPickFacility: null,
    showLoader: false,
  });
  const facilityStateRef = useRef();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [hotelAccountSpecificData,setHotelAccountSpecificData] = useState({});
  const [hotelData, setHotelData] = useState({});
  facilityStateRef.current = state;
  const [nearFacilites, setNearFacilites] = useState({
    nearFacility: [],
  });
  const urlParms = useLocation().search;
  const period = new URLSearchParams(urlParms).get("Period");

  const parentContext = useContext(AccountCenterTabsContext);
  const hotelPricingContext = useContext(HotelPricingContext);

  useEffect(() => {
    if (isFormChanged) {
      facility_check();
      setIsFormChanged(false);
    }
  }, [isFormChanged]);
  const getFacilityDetails = (data) => {
    setState({
      ...state,
      facility_name: data.facility_name,
      facility_street: data.facility_street,
      facility_city: data.facility_city,
      facility_state_prov: data.facility_state_prov,
      facility_zip: data.facility_zip,
      facility_country: data.facility_country,
      distance: data.distance,
      directionstofacility: data.directionstofacility,
      shuttle_cost_one_way: data.shuttle_cost_one_way,
      ratenotes: data.ratenotes,
      formattedLast_updateratenotes: data.formattedLast_updateratenotes,
      propertyDistanceUnit: data.propertyDistanceUnit,
      canPickFacility: data.canPickFacility,
    });
  };

  const [showSelctFacilityModal, setShowSelctFacilityModal] = useState(false);

  const onPrimaryContact = (event, field, max) => {
    const re = /^[0-9\b]+$/;
    const re1 = /^(?:0|[1-9]\d+|)?(?:.?\d{0,14})?$/;
    if (
      field === "facility_name" ||
      field === "facility_street" ||
      field === "facility_city" ||
      field === "facility_state_prov" ||
      field === "facility_zip" ||
      field === "facility_country" ||
      field === "directionstofacility" ||
      field === "ratenotes"
    ) {
      setState({
        ...state,
        [field]: event.target.value,
      });
    }
    if (field === "distance" || field === "shuttle_cost_one_way") {
      setState({
        ...state,
        [field]: event.target.value,
      });
    }
    facility_check();
    setIsFormChanged(true);
  };

  const updateRateNotesFacility = () => {
    if (!parentContext.isRebidDeclined) {
      const facilitycheck = facility_check();
      if (facilitycheck == "complete" || facilitycheck == "continue") {
        facility_submit();
        if (facilitycheck === "complete") {
          parentContext.setFacilityStatus("C");
          appContext.setFacilityTick("C");
        }
      }
    }
  };

  const facility_check = () => {
    let bOK = true;
    let facilitycheckstatus = "complete";
    const business_case = sessionStorage.getItem("bussinessCase");
    const prevbussinessCase = sessionStorage.getItem("prevbussinessCase");
    if (business_case == "Y" && business_case != prevbussinessCase) {
      if (
        bOK &&
        (state.facility_name === "" ||
          state.facility_name === null ||
          state.facility_street === "" ||
          state.facility_street === null ||
          state.facility_city === "" ||
          state.facility_city === null ||
          state.facility_zip === "" ||
          state.facility_zip === null ||
          state.facility_country === "" ||
          state.facility_country === null ||
          state.distance === "" ||
          state.distance === null ||
          state.directionstofacility === "" ||
          state.directionstofacility === null)
      ) {
        bOK = false;
      }
    }
    if (!bOK) {
      facilitycheckstatus = "continue";
      if (appContext.user?.isPASorAnySales) {
        facilitycheckstatus = "continue";
      } else {
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.labels.alertMsg,
          type: "browserAlert",
        });
        facilitycheckstatus = "failed";
      }
    } else facilitycheckstatus = "complete";

    if (facilitycheckstatus != "failed") {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      const hotelspecificData = JSON.parse(
        localStorage.getItem("hotelAccountSpecificData")
      );
      //passing undefined for other optional parameters as those aren't required for rates notes and facility
      const status = parentContext.validateDetailsOnMarkAsCompleteChange(
        hotelspecificData,
        "",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "C"
      );
      if (!status.bOK) {
        appContext.setMarkAsCompleteErrorAlert({
          show: true,
          message: status.msg,
          type: "browserAlert",
        });
      } else {
        appContext.setMarkAsCompleteErrorAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
    return facilitycheckstatus;
  };

  const facility_submit = () => {
    const hotel_account_specific_data = hotelAccountSpecificData;
    const strHasd = {};
    const data = {
      ratenotes: state.ratenotes,
      facility_name: state.facility_name,
      facility_street: state.facility_street,
      facility_city: state.facility_city,
      facility_state_prov: state.facility_state_prov,
      facility_zip: state.facility_zip,
      facility_country: state.facility_country,
      distance: parseFloat(state.distance),
      directionstofacility: state.directionstofacility,
      shuttle_cost_one_way: parseFloat(state.shuttle_cost_one_way),
    };
    strHasd[hotel_account_specific_data.hotel_accountinfoid] = data;
    const params = {
      strHasd: JSON.stringify(strHasd),
      acctFacilityChg: "Y",
      hotel_accountinfoid: hotel_account_specific_data.hotel_accountinfoid,
    };
    setLoader(true);
    API.updateRateNoteFacilityDetails(params).then((res) => {
      const param = {
        marshaCode: hotel_account_specific_data.marshacode,
        hotelName: hotelData.hotelName,
        hotelrfpid: hotel_account_specific_data.hotelrfpid,
        period: period,
        hotel_accountinfoid: hotel_account_specific_data.hotel_accountinfoid,
      };
      PricingAPI.getHotelaccountspeccentralrates(param).then((data) => {
        const reqParam = {
          accountinfoid: hotel_account_specific_data.hotel_accountinfoid,
          hotelid: hotel_account_specific_data.hotelid,
          accountid: hotel_account_specific_data.accountid,
          hotelrfpid: hotel_account_specific_data.hotelrfpid,
          marshaCode: hotel_account_specific_data.marshacode,
        };

        if (sessionStorage.getItem("ClickedTabs").includes("rateNotes")) {
          API.getRateNoteFacility(reqParam).then((res) => {
            getFacilityDetails(res);
            setLoader(false);
          });
        }
      });
    });
  };
  const onSelectFacility = (closeModal?: boolean, data) => {
    const value = closeModal ? !showSelctFacilityModal : showSelctFacilityModal;
    if (value) {
      const reqParam = {
        accountrecid:
          data.hotelAccountSpecific.hotelAccountSpecificData.accountrecid,
        hotelid: data.hotelAccountSpecific.hotelAccountSpecificData.hotelid,
      };
      API.getSelectFacility(reqParam).then((res) => {
        setNearestFacilities(res);
      });
    }
    setShowSelctFacilityModal(value);
  };

  const setNearestFacilities = (data: any) => {
    if (data.length > 0) {
      const rateNoteData = { ...nearFacilites };
      rateNoteData.nearFacility = data;
      setNearFacilites(rateNoteData);
    } else {
      const rateNoteData = { ...nearFacilites };
      rateNoteData.nearFacility = [];
      setNearFacilites(rateNoteData);
    }
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showLoader: show,
    });
  };
  const setFacilityParams = (data) => {
    const nearData = { ...state };
    nearData.facility_name = data.businessname;
    nearData.facility_street = data.address;
    nearData.facility_city = data.cityname;
    nearData.facility_state_prov = data.stateabbrev;
    nearData.facility_zip = data.zipcode;
    nearData.facility_country = "";
    nearData.distance = data.distance;
    nearData.directionstofacility = data.direction;
    nearData.shuttle_cost_one_way = "";
    //nearData.ratenotes = "";
    nearData.formattedLast_updateratenotes = "";
    nearData.propertyDistanceUnit = "";
    nearData.canPickFacility = true;
    setState(nearData);
    onSelectFacility(true);
  };

  const onBlurPrimaryContact = (event, field, max) => {
    if (event.target.value.length > max) {
      event.target.value = event.target.value.substring(0, max - 1);
      alert(`You are allowed to enter up to ${max} characters.`);
    }
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const ratenotesfacilityContext = {
    state,
    setState,
    showSelctFacilityModal,
    getFacilityDetails,
    onPrimaryContact,
    updateRateNotesFacility,
    onSelectFacility,
    nearFacilites,
    setNearestFacilities,
    setFacilityParams,
    onBlurPrimaryContact,
    setLoader,
    facility_check,
    setHotelAccountSpecificData,
    setHotelData,
  };
  return (
    <RateNotesFacilityContext.Provider value={ratenotesfacilityContext}>
      {props.children}
    </RateNotesFacilityContext.Provider>
  );
};

export const RateNotesFacilityContextConsumer =
  RateNotesFacilityContext.Consumer;
export default RateNotesFacilityContext;
