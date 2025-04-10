/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useContext } from "react";
import styles from "./EligibilityAmenity.css";
import Settings from "../static/Settings";
import API from "../service/API";
import EligibilityAmenityContext, {
  EligibilityAmenityContextProvider,
} from "../context/EligibilityAmenityContext";
import { Layout } from "../../../routing/Layout";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import { CLoader } from "../../../../../common/components/CLoader";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { useHistory } from "react-router-dom";
//import hotelPricingSettings from "../../../../../pricing/hotelPricing/static/Settings";

let contextValue = null;
function EligibilityAmenity(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const contextType = useContext(HotelPricingContext);

  const [isLoading, setIsLoading] = useState(false);
  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };
  const reqParam = {
    marshaCode: setQueryParam("MarshaCode"),
    hotelName: setQueryParam("HotelName"),
    hotelrfpid:
      setQueryParam("Hotelrfpid") == 0 ||
      setQueryParam("Hotelrfpid") == "0" ||
      setQueryParam("Hotelrfpid") == null ||
      setQueryParam("Hotelrfpid") == undefined
        ? contextType?.selectedHotelRfpId
        : setQueryParam("Hotelrfpid"),
    period: setQueryParam("Period"),
  };
  const history = useHistory();

  const fetchEligibilityAmenityData = () => {
    API.getEligibilityAminityList(reqParam).then((res) => {
      contextValue.sethotelEligibilityAmenitiesList(res);
      charge_validate();
      if (res && res?.menu && res?.menu?.pricingmenuList) {
        contextType.setState({
          ...contextType.state,
          gridData: {
            ...contextType.state.gridData,
            list: {
              ...contextType.state.gridData.list,
              menu: res.menu,
            },
          },
        });
      }
      setIsLoading(false);
      appContext.setCpacLoader(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    appContext.setCpacLoader(true);
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("GroupsMeetings") &&
        !history?.location?.prevPath?.includes("Standards") &&
        !history?.location?.prevPath?.includes("PriceContact") &&
        !history?.location?.prevPath?.includes("Seasons") &&
        !history?.location?.prevPath?.includes("DepthOfSale") &&
        !history?.location?.prevPath?.includes("Blackout")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchEligibilityAmenityData();
    }
    const unblock = history.block((location, action) => {
      if (handleUpdate(appContext?.user?.role, reqParam, true)) {
        return true;
      } else {
        return false;
      }
    });

    return () => {
      unblock();
      setIsLoading(false);
      appContext.setCpacLoader(false);
    };
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      contextType?.completionState?.PricingContact == "Y"
    ) {
      fetchEligibilityAmenityData();
      contextType.setCompletionState({
        ...contextType.completionState,
        PricingContact: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Standards") &&
      contextType?.completionState?.Standards == "Y"
    ) {
      fetchEligibilityAmenityData();
      contextType.setCompletionState({
        ...contextType.completionState,
        Standards: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Seasons") &&
      contextType?.completionState?.Seasons == "Y"
    ) {
      fetchEligibilityAmenityData();
      contextType.setCompletionState({
        ...contextType.completionState,
        Seasons: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("DepthOfSale") &&
      contextType?.completionState?.DepthOfSales == "Y"
    ) {
      fetchEligibilityAmenityData();
      contextType.setCompletionState({
        ...contextType.completionState,
        DepthOfSales: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Blackout") &&
      contextType?.completionState?.Blackout == "Y"
    ) {
      fetchEligibilityAmenityData();
      contextType.setCompletionState({
        ...contextType.completionState,
        Blackout: "N",
      });
    }
  }, [
    contextType?.completionState?.PricingContact,
    contextType?.completionState?.Blackout,
    contextType?.completionState?.Standards,
    contextType?.completionState?.Seasons,
    contextType?.completionState?.DepthOfSales,
  ]);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      fetchEligibilityAmenityData();

      if (appContext?.groupMeetingUpdation) {
        appContext?.setGroupMeetingUpdation(false);
      }
    }
  }, [appContext?.groupMeetingUpdation]);

  const final_check = (msg) => {
    const statusid =
      contextType?.state?.gridData?.list?.menu?.pricingmenuList?.find(
        (x) => x.screenid == 12
      ).statusid;

    if (statusid && statusid.toUpperCase() != "C") {
      return true;
    }
    if (msg != "") {
      alert(msg);
      return false;
    }

    setTimeout(() => {
      return true;
    }, 0);
  };

  const charge_validate = (showAlert = false) => {
    let bOK = true;
    const check = contextValue.state.earlycharge;

    if (check != null) {
      if (check == "Y") {
        if (appContext?.user?.isHotelUser) {
          const charge = contextValue?.state?.earlyDepartureCharge;

          if (charge == null || charge == "") {
            if (showAlert) {
              alert(
                "Please indicate whether your hotel charges an Early Departure Charge."
              );
            }
            contextType.setAlertData(
              true,
              "Please indicate whether your hotel charges an Early Departure Charge."
            );

            bOK = false;
          } else {
            if (charge == "Y") {
              const chargeoption = contextValue.state.departurechargeoption;

              if (
                chargeoption == null ||
                chargeoption == "" ||
                chargeoption == "0"
              ) {
                if (showAlert) {
                  alert("Please select an Early Departure Charge option.");
                }
                contextType.setAlertData(
                  true,
                  "Please select an Early Departure Charge option."
                );

                bOK = false;
              } else {
                if (chargeoption == 1 || chargeoption == 3) {
                  const chargevalue = contextValue.state.departurechargevalue;
                  if (
                    chargevalue == null ||
                    chargevalue == "0" ||
                    chargevalue == ""
                  ) {
                    if (showAlert) {
                      alert("Please enter Early Departure Charge value.");
                    }
                    contextType.setAlertData(
                      true,
                      "Please enter Early Departure Charge value."
                    );

                    bOK = false;
                  } else {
                    if (checkLength()) {
                      if (chargeoption == 1) {
                        if (showAlert) {
                          alert(
                            "Too many digits have been entered. Please ensure you have entered a maximum of 8 digits before the decimal and 2 digits after the decimal."
                          );
                        }
                        contextType.setAlertData(
                          true,
                          "Too many digits have been entered. Please ensure you have entered a maximum of 8 digits before the decimal and 2 digits after the decimal."
                        );
                      }
                      if (chargeoption == 3) {
                        if (showAlert) {
                          alert(
                            "Too many digits have been entered. Please ensure you have entered a maximum of 3 digits before the decimal and 2 digits after the decimal."
                          );
                        }
                        contextType.setAlertData(
                          true,
                          "Too many digits have been entered. Please ensure you have entered a maximum of 3 digits before the decimal and 2 digits after the decimal."
                        );
                      }
                      bOK = false;
                    }
                  }
                }
              }
            }
          }
        } else {
          const charge =
            contextValue?.state?.earlyDepartureCharge?.departurecharge;

          if (charge == "Y") {
            const chargeoption =
              contextValue.state.earlyDepartureCharge?.departurechargeoption;

            if (chargeoption == 1 || chargeoption == 3) {
              if (checkLength()) {
                if (chargeoption == 1) {
                  if (showAlert) {
                    alert(
                      "Too many digits have been entered. Please ensure you have entered a maximum of 8 digits before the decimal and 2 digits after the decimal."
                    );
                  }
                  contextType.setAlertData(
                    true,
                    "Too many digits have been entered. Please ensure you have entered a maximum of 8 digits before the decimal and 2 digits after the decimal."
                  );
                }
                if (chargeoption == 3) {
                  if (showAlert) {
                    alert(
                      "Too many digits have been entered. Please ensure you have entered a maximum of 3 digits before the decimal and 2 digits after the decimal."
                    );
                  }
                  contextType.setAlertData(
                    true,
                    "Too many digits have been entered. Please ensure you have entered a maximum of 3 digits before the decimal and 2 digits after the decimal."
                  );
                }
                bOK = false;
              }
            }
          }
        }
      }
    }
    if (bOK) {
      contextType.setAlertData(false, "");
    }
    return bOK;
  };
  const handleUpdate = (userData, reqParam, showAlert = false) => {
    const finalVal = charge_validate(showAlert);
    if (finalVal == true) {
      final_check("");
      const strHotelEligibilityList = [];
      contextValue.state.hotelEligibilityList.forEach((i) => {
        strHotelEligibilityList.push({
          eligibilityid: i.eligibilityid,
          value: i.value,
        });
      });

      const salesUser = ["MFPSALES", "MFPFSALE"];
      const params = {
        strHotelEligibilityList: JSON.stringify(strHotelEligibilityList),
        strEarlyDepartureCharge: JSON.stringify({
          departurecharge:
            contextValue.state.earlyChargeOptions === ""
              ? ""
              : contextValue.state.earlyChargeOptions
              ? "Y"
              : "N",
          departurechargeoption:
            contextValue.state.departurechargeoption === null
              ? null
              : contextValue.state.departurechargeoption === 0
              ? 0
              : String(contextValue.state.departurechargeoption),
          departurechargevalue:
            contextValue.state.departurechargevalue === ""
              ? null
              : contextValue.state.departurechargevalue,
        }),
        formChg: "N",
        hotelrfpid: reqParam.hotelrfpid,
        marshaCode: reqParam.marshaCode,
        period: reqParam.period,
        prevCharge: contextValue.state.prevCharge,
        prevChargeOption: contextValue.state.prevChargeOption,
        prevChargeValue: contextValue.state.prevChargeValue,
        isAnySalesUser: salesUser.includes(userData),
        isHotelUser: userData == "MFPUSER" ? true : false,
        isPASAdmin: userData == "MFPADMIN" ? true : false,
        earlycharge: contextValue.state.earlycharge,
      };

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      API.updateEligibilityAminity(params).then((res) => {
        contextType.setCompletionState({
          ...contextType.completionState,
          EligAmen: "Y",
        });
      });
    } else {
    }
    return finalVal;
  };

  const handleCharge = (e) => {
    contextValue.earlyChargeOptionsChange(e);
    setTimeout(function () {
      charge_validate();
    }, 0);
  };

  const handleChargeType = (e) => {
    contextValue.getDeparturechargeoption(e);
    setTimeout(function () {
      charge_validate();
    }, 0);
  };

  const handleDepatureCharge = (e) => {
    contextValue.getDeparturechargevalue(e);
    setTimeout(function () {
      const isValidated = checkLength();
      if (isValidated) {
        if (
          contextValue.state.departurechargeoption == 1 ||
          contextValue.state.departurechargeoption == "1"
        ) {
          alert(Settings.alerts.fixedAmountAlert);
        }
        if (
          contextValue.state.departurechargeoption == 1 ||
          contextValue.state.departurechargeoption == "1"
        ) {
          alert(Settings.alerts.fixedAmountAlert);
        }
        if (
          contextValue.state.departurechargeoption == 3 ||
          contextValue.state.departurechargeoption == "3"
        ) {
          alert(Settings.alerts.percentageAlert);
        }
      } else {
        if (appContext?.user?.isHotelUser) {
          const prevChargeValue = contextValue.state.prevCharge;
          if (
            prevChargeValue != null &&
            prevChargeValue != "" &&
            contextValue.state.departurechargevalue != prevChargeValue
          ) {
            alert(Settings.alerts.earlyDepartureAlert);
            contextValue.state.departurechargevalue = prevChargeValue;
            charge_validate();
          } else {
            charge_validate();
          }
        } else {
          charge_validate();
        }
      }
    }, 1000);
  };

  const checkLength = () => {
    const chargeoption = contextValue.state.departurechargeoption;
    const chargeval = contextValue.state.departurechargevalue;
    const val = chargeval.toString().split(".");
    const preDecimal = val[0];
    const postDecimal = val[1];
    let bOK = false;
    let n;
    if (chargeoption == 1) {
      n = 8;
    }
    if (chargeoption == 3) {
      n = 3;
    }
    if (preDecimal.length > n) {
      bOK = true;
    }
    if (postDecimal) {
      if (postDecimal.length > 2) {
        bOK = true;
      }
    }
    return bOK;
  };

  const onValidation_NumberOnly = (e) => {
    const charCode = e.charCode ? e.charCode : null;

    if (
      !(
        (charCode > 47 && charCode < 58) ||
        charCode === 8 ||
        charCode === 0 ||
        charCode === 46 ||
        charCode === 13
      )
    ) {
      e.preventDefault();
    }
    const re_number = /^\d{0,10}(\.\d{0,7})?$/;
    const updatedList = contextType.state;
    if (e.target.value === "" || re_number.test(e.target.value)) {
      updatedList.departurechargevalue = e.target.value;
    }
  };

  return (
    <Layout>
      <div>
        <EligibilityAmenityContextProvider>
          <EligibilityAmenityContext.Consumer>
            {(eligibilityamenityContext) => {
              contextValue = eligibilityamenityContext;

              return isLoading ? (
                <CLoader></CLoader>
              ) : (
                <div>
                  <table
                    className={`${styles.fullHeight} ${styles.pageHeight}`}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.pagePosition}>
                          <table className={styles.fullHeight}>
                            <tbody>
                              <tr>
                                <td height="1">
                                  <tr style={{ verticalAlign: "top" }}>
                                    <table
                                      className={`${styles.fullHeight} ${styles.pageHeight}`}
                                    >
                                      <tbody>
                                        <tr>
                                          <td className={styles.pagePosition}>
                                            <form
                                              id="thisform"
                                              name="thisform"
                                              autoComplete="off"
                                              method="post"
                                            >
                                              <table
                                                className={styles.zeroHeight}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                    >
                                                      {
                                                        Settings.titles
                                                          .Eligibility
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.instructions
                                                      }
                                                    >
                                                      {
                                                        Settings.description
                                                          .eligibilityDesc
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    className={
                                                      styles.eligibilityHead
                                                    }
                                                  >
                                                    <td></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        cellSpacing={0}
                                                        cellPadding={0}
                                                        style={{
                                                          border: "0px",
                                                        }}
                                                      >
                                                        <tbody>
                                                          {appContext?.user
                                                            ?.isSalesUser ||
                                                          appContext?.user
                                                            ?.isLimitedSalesUser ? (
                                                            <>
                                                              {contextValue.state.hotelEligibilityList.map(
                                                                (i, index) => {
                                                                  return (
                                                                    <>
                                                                      <tr>
                                                                        <td
                                                                          className={`${styles.fieldValue} ${styles.eligibilityListcheck}`}
                                                                        >
                                                                          {i.value ==
                                                                          "Y" ? (
                                                                            <label
                                                                              className={
                                                                                styles.normalText
                                                                              }
                                                                            >
                                                                              {
                                                                                Settings
                                                                                  .titles
                                                                                  .Yes
                                                                              }
                                                                            </label>
                                                                          ) : (
                                                                            <label
                                                                              className={
                                                                                styles.normalText
                                                                              }
                                                                            >
                                                                              {
                                                                                Settings
                                                                                  .titles
                                                                                  .No
                                                                              }
                                                                            </label>
                                                                          )}
                                                                        </td>
                                                                        <td
                                                                          className={
                                                                            styles.eligibilityList
                                                                          }
                                                                        ></td>
                                                                        <td
                                                                          className={
                                                                            styles.fieldName
                                                                          }
                                                                        >
                                                                          {
                                                                            i.eligibilitydescription
                                                                          }
                                                                        </td>
                                                                      </tr>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </>
                                                          ) : (
                                                            <>
                                                              {contextValue.state.hotelEligibilityList.map(
                                                                (i, index) => {
                                                                  return (
                                                                    <>
                                                                      <tr>
                                                                        <td
                                                                          className={`${styles.fieldValue} ${styles.eligibilityListcheck}`}
                                                                        >
                                                                          <input
                                                                            type="checkbox"
                                                                            id="EligibilityList"
                                                                            name="EligibilityList"
                                                                            checked={
                                                                              i.value ===
                                                                              "Y"
                                                                            }
                                                                            value={
                                                                              i.eligibilityid
                                                                            }
                                                                            onChange={() => {
                                                                              contextValue.handleEligibilityCheck(
                                                                                i,
                                                                                index,
                                                                                event
                                                                              );
                                                                            }}
                                                                          />
                                                                        </td>
                                                                        <td
                                                                          className={
                                                                            styles.eligibilityList
                                                                          }
                                                                        ></td>
                                                                        <td
                                                                          className={
                                                                            styles.fieldName
                                                                          }
                                                                        >
                                                                          {
                                                                            i.eligibilitydescription
                                                                          }
                                                                        </td>
                                                                      </tr>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </>
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    className={
                                                      styles.amenitySection
                                                    }
                                                  >
                                                    <td></td>{" "}
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                    >
                                                      {
                                                        Settings.titles
                                                          .Amenities
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.instructions
                                                      }
                                                    >
                                                      {
                                                        Settings.description
                                                          .AmenitiesDesc
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.instructions
                                                      }
                                                    >
                                                      {
                                                        Settings.description
                                                          .AmenitiesDetails
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    className={
                                                      styles.eligibilityHead
                                                    }
                                                  >
                                                    <td></td>{" "}
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        className={
                                                          styles.zeroHeight
                                                        }
                                                      >
                                                        <tbody>
                                                          {contextValue.state.hotelAmenitiesList.map(
                                                            (i) => {
                                                              return (
                                                                <>
                                                                  <tr>
                                                                    <td
                                                                      className={`${styles.fieldValue} ${styles.amenityList}`}
                                                                    >
                                                                      {i.value ===
                                                                      "Y"
                                                                        ? "Yes"
                                                                        : "No"}
                                                                    </td>
                                                                    <td
                                                                      className={
                                                                        styles.eligibilityList
                                                                      }
                                                                    ></td>
                                                                    <td
                                                                      className={
                                                                        styles.fieldName
                                                                      }
                                                                    >
                                                                      {
                                                                        i.amenitydescription
                                                                      }
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              );
                                                            }
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    className={
                                                      styles.amenitySection
                                                    }
                                                  >
                                                    <td></td>{" "}
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                    >
                                                      {
                                                        Settings.titles
                                                          .EarlyDepature
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.instructions
                                                      }
                                                    >
                                                      {
                                                        Settings.description
                                                          .EarlyDepatureDesc
                                                      }
                                                    </td>
                                                  </tr>
                                                  {appContext.user.role ===
                                                    "MFPSALES" ||
                                                  appContext.user.role ===
                                                    "MFPFSALE" ||
                                                  appContext?.user
                                                    ?.isSalesUser ||
                                                  appContext?.user
                                                    ?.isLimitedSalesUser ||
                                                  (appContext?.user
                                                    ?.isHotelUser &&
                                                    contextValue?.state
                                                      ?.earlyDepartureChargeHotel ===
                                                      "Y" &&
                                                    (contextValue?.state
                                                      ?.earlyDepartureCharge ===
                                                      "Y" ||
                                                      contextValue?.state
                                                        ?.earlyDepartureCharge ===
                                                        "N")) ? (
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {
                                                          Settings.description
                                                            .EarlyDepatureDetails
                                                        }
                                                        <></>
                                                        <span
                                                          className={styles.ml5}
                                                        >
                                                          {
                                                            contextValue.state
                                                              .earlyDepartureChargeLabel
                                                          }
                                                        </span>
                                                      </td>
                                                    </tr>
                                                  ) : (
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {
                                                          Settings.description
                                                            .EarlyDepatureDetails
                                                        }
                                                        <select
                                                          className={styles.ml5}
                                                          onChange={
                                                            handleCharge
                                                          }
                                                        >
                                                          <option value="" />
                                                          <option
                                                            value="Y"
                                                            selected={
                                                              contextValue.state
                                                                .earlyDepartureCharge ===
                                                              "Y"
                                                                ? true
                                                                : false
                                                            }
                                                          >
                                                            {
                                                              Settings.titles
                                                                .Yes
                                                            }
                                                          </option>
                                                          <option
                                                            value="N"
                                                            selected={
                                                              contextValue.state
                                                                .earlyDepartureCharge ===
                                                              "N"
                                                                ? true
                                                                : false
                                                            }
                                                          >
                                                            {Settings.titles.No}
                                                          </option>
                                                        </select>
                                                      </td>
                                                    </tr>
                                                  )}

                                                  {((appContext?.user
                                                    ?.isHotelUser == true &&
                                                    contextValue?.state
                                                      ?.earlyDepartureCharge ===
                                                      "Y" &&
                                                    (contextValue?.state
                                                      ?.departurechargeoption ===
                                                      null ||
                                                      contextValue?.state
                                                        ?.departurechargeoptionChange ===
                                                        "Y")) ||
                                                    (appContext?.user
                                                      ?.isHotelUser == false &&
                                                      appContext?.user
                                                        ?.isSalesUser ==
                                                        false &&
                                                      appContext?.user
                                                        ?.isLimitedSalesUser ==
                                                        false &&
                                                      contextValue?.state
                                                        ?.earlyDepartureCharge ===
                                                        "Y")) &&
                                                    contextValue?.state
                                                      ?.earlyChargeOptions && (
                                                      <tr>
                                                        <td>
                                                          <div
                                                            id="charge_options"
                                                            className={
                                                              styles.pagelayout
                                                            }
                                                          >
                                                            <table
                                                              cellSpacing={0}
                                                              cellPadding={0}
                                                              style={{
                                                                border: "0px",
                                                              }}
                                                            >
                                                              <tbody>
                                                                <tr
                                                                  className={
                                                                    styles.eligibilityHead
                                                                  }
                                                                >
                                                                  <td></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.fieldName
                                                                    }
                                                                  >
                                                                    {
                                                                      Settings
                                                                        .description
                                                                        .AmenitiesDropList
                                                                    }
                                                                    <select
                                                                      className={
                                                                        styles.earlyChargeDrop
                                                                      }
                                                                      onChange={
                                                                        handleChargeType
                                                                      }
                                                                    >
                                                                      <option
                                                                        value={
                                                                          0
                                                                        }
                                                                      ></option>
                                                                      {contextValue.state.chargeOptions.map(
                                                                        (i) => (
                                                                          <option
                                                                            value={
                                                                              i.id
                                                                            }
                                                                            selected={
                                                                              i.id ==
                                                                              contextValue
                                                                                .state
                                                                                .departurechargeoption
                                                                                ? true
                                                                                : false
                                                                            }
                                                                          >
                                                                            {
                                                                              i.options
                                                                            }
                                                                          </option>
                                                                        )
                                                                      )}
                                                                    </select>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    )}

                                                  {(appContext?.user
                                                    ?.isSalesUser ||
                                                    appContext?.user
                                                      ?.isLimitedSalesUser ||
                                                    (appContext?.user
                                                      ?.isHotelUser &&
                                                      contextValue?.state
                                                        ?.departurechargeoption !=
                                                        null &&
                                                      contextValue?.state
                                                        ?.departurechargeoptionChange !==
                                                        "Y")) &&
                                                    contextValue?.state
                                                      ?.earlyDepartureCharge ===
                                                      "Y" &&
                                                    contextValue?.state
                                                      ?.earlyChargeOptions && (
                                                      <tr>
                                                        <td>
                                                          <div
                                                            id="charge_options"
                                                            className={
                                                              styles.pagelayout
                                                            }
                                                          >
                                                            <table
                                                              cellSpacing={0}
                                                              cellPadding={0}
                                                              style={{
                                                                border: "0px",
                                                              }}
                                                            >
                                                              <tbody>
                                                                <tr
                                                                  className={
                                                                    styles.eligibilityHead
                                                                  }
                                                                >
                                                                  <td></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.fieldName
                                                                    }
                                                                  >
                                                                    {
                                                                      Settings
                                                                        .description
                                                                        .AmenitiesDropList
                                                                    }
                                                                    <></>
                                                                    <span
                                                                      className={
                                                                        styles.ml5
                                                                      }
                                                                    >
                                                                      {
                                                                        contextValue
                                                                          .state
                                                                          .departureOptionValueLabel
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    )}

                                                  {((appContext?.user
                                                    ?.isHotelUser == false &&
                                                    appContext?.user
                                                      ?.isSalesUser == false &&
                                                    appContext?.user
                                                      ?.isLimitedSalesUser ==
                                                      false) ||
                                                    (appContext?.user
                                                      ?.isHotelUser == true &&
                                                      (contextValue?.state
                                                        ?.departurechargevalue ===
                                                        null ||
                                                        contextValue?.state
                                                          ?.departurechargevalueChange ===
                                                          "Y"))) &&
                                                    contextValue?.state
                                                      ?.earlyDepartureCharge ===
                                                      "Y" &&
                                                    contextValue?.state
                                                      ?.departurechargeoption !=
                                                      null &&
                                                    contextValue?.state
                                                      ?.departurechargeoption !=
                                                      0 &&
                                                    contextValue?.state
                                                      ?.earlyChargeOptions &&
                                                    contextValue?.state
                                                      ?.departurechargeoption !=
                                                      2 && (
                                                      <tr>
                                                        <td>
                                                          <div
                                                            id="charge_value"
                                                            className={
                                                              styles.pagelayout
                                                            }
                                                          >
                                                            <table
                                                              cellSpacing={0}
                                                              cellPadding={0}
                                                              style={{
                                                                border: "0px",
                                                              }}
                                                            >
                                                              <tbody>
                                                                <tr
                                                                  className={
                                                                    styles.eligibilityHead
                                                                  }
                                                                >
                                                                  <td></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.fieldName
                                                                    }
                                                                  >
                                                                    {
                                                                      Settings
                                                                        .description
                                                                        .AmenitiesValue
                                                                    }
                                                                    <input
                                                                      type="text"
                                                                      value={
                                                                        contextValue
                                                                          .state
                                                                          .departurechargevalue
                                                                      }
                                                                      className={`${styles.earlyChargeValue} ${styles.ml5}`}
                                                                      onKeyPress={(
                                                                        e
                                                                      ) => {
                                                                        onValidation_NumberOnly(
                                                                          e
                                                                        );
                                                                      }}
                                                                      onChange={
                                                                        handleDepatureCharge
                                                                      }
                                                                    />
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    )}

                                                  {((appContext?.user
                                                    ?.isHotelUser &&
                                                    contextValue?.state
                                                      ?.earlyDepartureChargeHotel ===
                                                      "Y" &&
                                                    contextValue?.state
                                                      ?.departurechargevalue !=
                                                      null &&
                                                    contextValue?.state
                                                      ?.departurechargevalueChange ===
                                                      "N") ||
                                                    appContext?.user
                                                      ?.isSalesUser ||
                                                    appContext?.user
                                                      ?.isLimitedSalesUser) &&
                                                    contextValue?.state
                                                      ?.earlyDepartureCharge ===
                                                      "Y" &&
                                                    contextValue?.state
                                                      ?.departurechargeoption !=
                                                      0 &&
                                                    contextValue?.state
                                                      ?.earlyChargeOptions &&
                                                    contextValue?.state
                                                      ?.departurechargeoption !=
                                                      2 && (
                                                      <tr>
                                                        <td>
                                                          <div
                                                            id="charge_value"
                                                            className={
                                                              styles.pagelayout
                                                            }
                                                          >
                                                            <table
                                                              cellSpacing={0}
                                                              cellPadding={0}
                                                              style={{
                                                                border: "0px",
                                                              }}
                                                            >
                                                              <tbody>
                                                                <tr
                                                                  className={
                                                                    styles.eligibilityHead
                                                                  }
                                                                >
                                                                  <td></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.fieldName
                                                                    }
                                                                  >
                                                                    {
                                                                      Settings
                                                                        .description
                                                                        .AmenitiesValue
                                                                    }
                                                                    <span
                                                                      className={
                                                                        styles.ml5
                                                                      }
                                                                    >
                                                                      {
                                                                        contextValue
                                                                          .state
                                                                          .departurechargevalue
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    )}

                                                  <tr
                                                    className={
                                                      styles.amenitySection
                                                    }
                                                  >
                                                    <td></td>{" "}
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                    >
                                                      {
                                                        Settings.titles
                                                          .CancelPolicy
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.instructions
                                                      }
                                                    >
                                                      {
                                                        Settings.titles
                                                          .cancellationPolicyTitle
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.boldText
                                                      }
                                                    >
                                                      {
                                                        contextValue.state
                                                          .htlstdcxlpolicy
                                                      }
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                                          <td
                                                            className={
                                                              styles.fieldName
                                                            }
                                                          >
                                                            6:00 PM
                                                          </td>
                                                        </tr> */}
                                                </tbody>
                                              </table>
                                            </form>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </tr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            }}
          </EligibilityAmenityContext.Consumer>
        </EligibilityAmenityContextProvider>
      </div>
    </Layout>
  );
}
export default EligibilityAmenity;
