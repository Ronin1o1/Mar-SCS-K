import React, { useState } from "react";
import Settings from "../static/Settings";

const EligibilityAmenityContext = React.createContext({});
export const EligibilityAmenityContextProvider = (props) => {
  const [state, setState] = useState({
    chargeOptions: [],
    hotelEligibilityList: [],
    checkBoxChange: "N",
    hotelAmenitiesList: [],
    htlstdcxlpolicy: null,
    earlycharge: null,
    earlyDepartureCharge: null,
    earlyChargeOptions: null,
    departurechargeoption: null,
    departurechargevalue: null,
    prevCharge: "",
    prevChargeOption: "",
    prevChargeValue: "",
    earlyDepartureChargeLabel: "",
    departureOptionValueLabel: "",
    earlyDepartureChargeHotel: "Y",
    departurechargeoptionChange: "N",
    departurechargevalueChange: "N",
  });

  const sethotelEligibilityAmenitiesList = (data: any) => {
    let departureOptionValue = data.chargeOptions.filter(function (item) {
      if (data?.earlyDepartureCharge?.departurechargeoption == item.id) {
        return item.options;
      }
    });
    departureOptionValue =
      departureOptionValue.length > 0 ? departureOptionValue[0].options : "";

    setState({
      ...state,
      hotelAmenitiesList: data.hotelAmenitiesList,
      hotelEligibilityList: data.hotelEligibilityList,
      chargeOptions: data.chargeOptions,
      htlstdcxlpolicy: data.htlstdcxlpolicy,
      earlycharge: data.earlycharge,
      prevCharge: data.earlyDepartureCharge.departurecharge,
      prevChargeOption:
        data.earlyDepartureCharge.departurechargeoption === null
          ? null
          : data.earlyDepartureCharge.departurechargeoption,
      prevChargeValue:
        data.earlyDepartureCharge.departurechargevalue === null
          ? null
          : data.earlyDepartureCharge.departurechargevalue,
      earlyDepartureCharge: data.earlyDepartureCharge.departurecharge,
      earlyChargeOptions:
        data.earlyDepartureCharge.departurecharge === "Y" ? true : false,
      departurechargeoption:
        data.earlyDepartureCharge.departurechargeoption === null
          ? null
          : data.earlyDepartureCharge.departurechargeoption,
      departurechargevalue:
        data.earlyDepartureCharge.departurechargevalue === null
          ? null
          : data.earlyDepartureCharge.departurechargevalue,
      earlyDepartureChargeLabel:
        data.earlyDepartureCharge.departurecharge === "Y"
          ? Settings.titles.Yes
          : data.earlyDepartureCharge.departurecharge === "N"
          ? Settings.titles.No
          : "No Answer Selected",
      departureOptionValueLabel: departureOptionValue,
    });
  };
  const getDeparturechargevalue = (data: any) => {
    setState({
      ...state,
      departurechargevalue: data.target.value,
      departurechargevalueChange: "Y",
    });
  };

  const getDeparturechargeoption = (data: any) => {
    setState({
      ...state,
      departurechargeoption: data.target.value,
      departurechargeoptionChange: "Y",
      departurechargevalue: null,
    });
  };

  const earlyChargeOptionsChange = (data: any) => {
    const selectedDeparturechargevalue = { ...state };
    if (data.target.value === "N") {
      setState({
        ...state,

        earlyChargeOptions: false,
        departurechargeoption: null,
        departurechargevalue: selectedDeparturechargevalue.departurechargevalue
          ? selectedDeparturechargevalue.departurechargevalue
          : null,
        earlyDepartureCharge: "N",
        earlyDepartureChargeHotel: "N",
      });
    } else if (data.target.value === "") {
      setState({
        ...state,
        earlyChargeOptions: "",
        departurechargeoption: null,
        departurechargevalue: null,
        earlyDepartureCharge: "",
        earlyDepartureChargeHotel: "N",
      });
    } else {
      setState({
        ...state,
        earlyChargeOptions: true,
        earlyDepartureCharge: "Y",
        departurechargeoption: null,
        departurechargevalue: selectedDeparturechargevalue.departurechargevalue
          ? selectedDeparturechargevalue.departurechargevalue
          : null,
        earlyDepartureChargeHotel: "N",
      });
    }
  };
  const handleEligibilityCheck = (data, index, event) => {
    if (event.target.checked === false) {
      data.value = "N";
    } else {
      data.value = "Y";
    }
    const EligibilityList = state.hotelEligibilityList;
    EligibilityList[index] = data;
    setState({
      ...state,
      hotelEligibilityList: EligibilityList,
      checkBoxChange: "Y",
    });
  };

  const eligibilityamenityContext = {
    state,
    setState,
    sethotelEligibilityAmenitiesList,
    earlyChargeOptionsChange,
    getDeparturechargeoption,
    getDeparturechargevalue,
    handleEligibilityCheck,
  };
  return (
    <EligibilityAmenityContext.Provider value={eligibilityamenityContext}>
      {props.children}
    </EligibilityAmenityContext.Provider>
  );
};
export const EligibilityAmenityContextConsumer =
  EligibilityAmenityContext.Consumer;
export default EligibilityAmenityContext;
