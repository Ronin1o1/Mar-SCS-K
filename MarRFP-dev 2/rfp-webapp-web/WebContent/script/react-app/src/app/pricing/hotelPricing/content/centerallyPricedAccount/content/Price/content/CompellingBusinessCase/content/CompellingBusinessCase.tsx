import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import API from "../service/API";
import Styles from "../../../../../../../../../common/assets/css/index.css";
import cbcStyles from "./CompellingBusinessCase.css";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
//import CPACAPI from "../../../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../../../../../common/components/CLoader";

export function CompellingBusinessCase() {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const accountInfoId = new URLSearchParams(urlParms).get("AccountInfoId");
  const history = useHistory();
  const hotelId = new URLSearchParams(urlParms).get("HotelId");
  const [showLoader, setShowLoader] = useState(false);

  const [options, setOptions] = useState([
    { key: "N", value: "No" },
    { key: "Y", value: "Yes" },
  ]);
  const [duppid, setDuppid] = useState(null);
  const [oldCBC, setOldCBC] = useState(null);
  const [caseOld, setCaseOld] = useState(null);
  const [localRateTick, setLocalRateTick] = useState("");
  const localRateTickRef = React.useRef();
  localRateTickRef.current = localRateTick;
  const [cbcDetails, setCbcDetails] = useState({
    typeOfProperty: [],
    hotelAccountSpecificBusinessCase: {
      pid: "",
      notestext_existinghotel: "",
      notestext_preopeninghotel: "",
      isSolicited: "",
      business_case: "N",
      trvler_endorse: "",
      trvler_info: "",
      shortCbc_softduedate: "",
      bus_reason: "",
      competitor_info: "",
      market_notes: "",
      ispastcbc: Settings.noLetter,
      due_date: "",
      cbc_count: 0,
      cbc_request: 0,
      case_old: Settings.noLetter,
    },
  });
  const param = {
    hotel_accountinfoid: accountInfoId,
  };
  const parentContext = useContext(AccountCenterTabsContext);
  const cbcDetailsRef = useRef();
  cbcDetailsRef.current = cbcDetails;

  useEffect(() => {
    setShowLoader(true);
    API.getCBC(param).then((cbcData) => {
      const cbc = {
        typeOfProperty: cbcData.typeofPropertyDropDowns,
        hotelAccountSpecificBusinessCase:
          cbcData.hotelAccountSpecificBusinessCase,
      };
      setCbcDetails(cbc);
      setCaseOld(cbcData.hotelAccountSpecificBusinessCase.business_case);

      appContext.setCompelBisTick("C");
      setShowLoader(false);
    });
    return () => {
      checkcbctab();
      updateCBC(false);
    };
  }, []);
  useEffect(() => {
    setLocalRateTick(appContext.rateRulesTick);
  }, [appContext.rateRulesTick]);

  useEffect(() => {
    if (appContext?.user?.isHotelUser) {
      textValidation();
    }
    setRevisitFlag();
  }, [cbcDetails]);

  useEffect(() => {
    if (
      appContext.saveCompelStatusClicked &&
      ((appContext?.user?.isHotelUser && !appContext.errorMessageAlert.show) ||
        !appContext.user.isHotelUser)
    ) {
      if (appContext.isActiveTab === "CompellingBusiness") {
        updateCBC(true);
        appContext.setSaveCompelStatusClicked(
          !appContext.saveCompelStatusClicked
        );
      }
      checkcbctab();
    } else {
      if (
        appContext?.user?.isHotelUser &&
        appContext.errorMessageAlert.message
      ) {
        alert(appContext.errorMessageAlert.message);
      }
    }
  }, [appContext.saveCompelStatusClicked]);

  function textValidation() {
    if (cbcDetails.hotelAccountSpecificBusinessCase.business_case === "Y") {
      if (cbcDetails.hotelAccountSpecificBusinessCase.trvler_endorse === "Y") {
        if (!cbcDetails.hotelAccountSpecificBusinessCase.trvler_info) {
          appContext.setErrorMessageAlert({
            show: true,
            message:
              "Please enter the information of the traveler, travel arranger or some other employee of this account.",
            type: "browserAlert",
          });
          return false;
        }
      }
      if (!cbcDetails.hotelAccountSpecificBusinessCase.market_notes) {
        appContext.setErrorMessageAlert({
          show: true,
          message:
            "Please enter the description of any mergers, acquisitions, or special projects taking place in your hotel or market.",
          type: "browserAlert",
        });
        return false;
      }
      if (!cbcDetails.hotelAccountSpecificBusinessCase.competitor_info) {
        appContext.setErrorMessageAlert({
          show: true,
          message:
            "Please enter the list of current competitor(s) that account is using.",
          type: "browserAlert",
        });
        return false;
      }
      if (!cbcDetails.hotelAccountSpecificBusinessCase.bus_reason) {
        appContext.setErrorMessageAlert({
          show: true,
          message:
            "Please enter the compelling business case outlining the reason for this account to add you hotel to their program.",
          type: "browserAlert",
        });
        return false;
      }
    }
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
    return true;
  }

  function setTabsRevisit() {
    const revisitFlag = sessionStorage.getItem("RevisitFlagCBC");
    if (
      (oldCBC !== cbcDetails.hotelAccountSpecificBusinessCase.business_case &&
        cbcDetails.hotelAccountSpecificBusinessCase.business_case == "Y" &&
        appContext.rebidStatus === "complete") ||
      revisitFlag
    ) {
      parentContext.setPricingStatus("R");
      appContext.setPricingTick("R");
      parentContext.setFacilityStatus("R");
      appContext.setFacilityTick("R");
      appContext.setRateRulesTick("R");
    }
    if (appContext?.user?.isHotelUser) {
      if (localRateTickRef.current != "C") {
        appContext.setRateRulesTick("R");
      }
      if (appContext.compelBisTick != "C" || appContext.pricingTick != "C") {
        parentContext.setPricingStatus("R");
        appContext.setPricingTick("R");
      }
      if (appContext.facilityTick != "C") {
        parentContext.setFacilityStatus("R");
        appContext.setFacilityTick("R");
      }
    }
  }
  function setRevisitFlag() {
    const flag =
      oldCBC !== cbcDetails.hotelAccountSpecificBusinessCase.business_case &&
      cbcDetails.hotelAccountSpecificBusinessCase.business_case == "Y" &&
      appContext.rebidStatus === "complete";
    const flagStr = flag ? "Yes" : "";
    sessionStorage.setItem("RevisitFlagCBC", flagStr);
  }

  function cbc_onChange(e) {
    setOldCBC(cbcDetails.hotelAccountSpecificBusinessCase.business_case);
    sessionStorage.setItem(
      "prevbussinessCase",
      cbcDetails.hotelAccountSpecificBusinessCase.business_case
    );
    if (e.target.value === "Y") {
      if (caseOld == "N") {
        if (cbcDetails.hotelAccountSpecificBusinessCase.cbc_request != 0) {
          if (duppid === null || duppid === "null") {
            alert(Settings.alert.typeOfPropertyAlert);
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: "N",
              },
            });

            sessionStorage.setItem("bussinessCase", "N");
          } else {
            alert(Settings.alert.requiredFieldAlert);
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: e.target.value,
              },
            });
            sessionStorage.setItem("bussinessCase", e.target.value);
          }
        } else {
          if (
            cbcDetails.hotelAccountSpecificBusinessCase.cbc_count >=
            cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc
          ) {
            alert(
              Settings.alert.cbc_Count1 +
                cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc +
                Settings.alert.cbc_Count2 +
                cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc +
                Settings.alert.cbc_Count3
            );
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: "N",
              },
            });

            sessionStorage.setItem("bussinessCase", "N");
          } else if (duppid === null || duppid === "null") {
            alert(Settings.alert.typeOfPropertyAlert);
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: "N",
              },
            });

            sessionStorage.setItem("bussinessCase", "N");
          } else if (
            (cbcDetails.hotelAccountSpecificBusinessCase?.ispastcbc == "Y" ||
              cbcDetails.hotelAccountSpecificBusinessCase
                ?.shortCbc_softduedate == Settings.maxDueDate) &&
            duppid == Settings.pidE
          ) {
            alert(Settings.alert.cbcSubmissionDueDate);
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: "N",
              },
            });

            sessionStorage.setItem("bussinessCase", "N");
          } else {
            alert(Settings.alert.requiredFieldAlert);
            setCbcDetails({
              ...cbcDetails,
              hotelAccountSpecificBusinessCase: {
                ...cbcDetails.hotelAccountSpecificBusinessCase,
                business_case: e.target.value,
              },
            });
            sessionStorage.setItem("bussinessCase", e.target.value);
          }
        }
      } else if (caseOld == "Y") {
        setCbcDetails({
          ...cbcDetails,
          hotelAccountSpecificBusinessCase: {
            ...cbcDetails.hotelAccountSpecificBusinessCase,
            business_case: e.target.value,
          },
        });
        sessionStorage.setItem("bussinessCase", e.target.value);
      }
    } else {
      setCbcDetails({
        ...cbcDetails,
        hotelAccountSpecificBusinessCase: {
          ...cbcDetails.hotelAccountSpecificBusinessCase,
          business_case: e.target.value,
        },
      });
      sessionStorage.setItem("bussinessCase", e.target.value);
    }
  }

  function cbcend_onChange(e) {
    setCbcDetails({
      ...cbcDetails,
      hotelAccountSpecificBusinessCase: {
        ...cbcDetails.hotelAccountSpecificBusinessCase,
        trvler_endorse: e.target.value,
      },
    });
  }

  function onTextChange(event, fieldName) {
    const textToTest = event.target.value;
    setTextValues(fieldName, textToTest);
    if (appContext?.user?.isHotelUser) {
      textValidation();
    }
  }

  function setTextValues(fieldName, textToTest) {
    if (fieldName === Settings.marketNotes) {
      setCbcDetails((prevState) => ({
        ...prevState,
        hotelAccountSpecificBusinessCase: {
          ...prevState.hotelAccountSpecificBusinessCase,
          market_notes: textToTest,
        },
      }));
    } else if (fieldName === Settings.competitorInfo) {
      setCbcDetails({
        ...cbcDetails,
        hotelAccountSpecificBusinessCase: {
          ...cbcDetails.hotelAccountSpecificBusinessCase,
          competitor_info: textToTest,
        },
      });
    } else if (fieldName === Settings.busReason) {
      setCbcDetails({
        ...cbcDetails,
        hotelAccountSpecificBusinessCase: {
          ...cbcDetails.hotelAccountSpecificBusinessCase,
          bus_reason: textToTest,
        },
      });
    } else if (fieldName === Settings.trvlerInfo) {
      setCbcDetails({
        ...cbcDetails,
        hotelAccountSpecificBusinessCase: {
          ...cbcDetails.hotelAccountSpecificBusinessCase,
          trvler_info: textToTest,
        },
      });
    }
  }

  function updateCBC(isSaveClicked) {
    const businessCaseData = buildBusinessCaseData();
    const bodyParams = {
      hotel_accountinfoid: accountInfoId,
      strHotelAccountSpecificBusinessCase: businessCaseData,
    };
    setShowLoader(true);
    API.updateCBC(bodyParams).then((res) => {
      if (isSaveClicked) {
        API.getCBC(param).then((cbcData) => {
          const cbc = {
            typeOfProperty: cbcData.typeofPropertyDropDowns,
            hotelAccountSpecificBusinessCase:
              cbcData.hotelAccountSpecificBusinessCase,
          };
          setCbcDetails(cbc);

          appContext.setCompelBisTick("C");
          setShowLoader(false);
        });
      } else {
        setShowLoader(false);
      }
    });
  }
  const checkcbctab = () => {
    //setTabsRevisit();
    const prevCBC = sessionStorage.getItem("prevbussinessCase");
    const rm_nights = sessionStorage.getItem("roomnight");
    const hassalescontact = sessionStorage.getItem("hassalescontact");
    const hasfacility = sessionStorage.getItem("hasfacility");
    if (!parentContext.isRebidDeclined) {
      const cbccheck = cbc_check();
      if (cbccheck == "complete" || cbccheck == "continue") {
        if (cbccheck == "complete") {
          parentContext.setCompelBisStatus("C");
          appContext.setCompelBisTick("C");
        }
        if (
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case == "Y" &&
          (rm_nights == "" || rm_nights == null || rm_nights == "null")
        ) {
          const ratestatus = compute_ratesstatus("B", false);
          parentContext.ratesRulesStatus = ratestatus;
          parentContext?.setRatesRulesStatus(parentContext.ratesRulesStatus);
          appContext.rateRulesTick = ratestatus;
          appContext.setRateRulesTick(appContext.rateRulesTick);
        }
        if (
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case == "Y" &&
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case != prevCBC &&
          hassalescontact == "N"
        ) {
          parentContext.setPricingStatus("R");
          appContext.setPricingTick("R");
        }
        if (
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case == "Y" &&
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case != prevCBC &&
          hasfacility == "N"
        ) {
          parentContext.setFacilityStatus("R");
          appContext.setFacilityTick("R");
        }
      }
    }
  };

  const compute_ratesstatus = (newstatus, isrebid) => {
    let curstatus = localRateTickRef.current;
    let calcstatus = newstatus;
    let statusstr = "";
    const prevRebidStatus = sessionStorage.getItem("prevRebidStatus");
    const rm_nights = sessionStorage.getItem("roomnight");
    const changedRates = JSON.parse(
      localStorage.getItem("ratesTableValidData")
    );
    const ratesStatus = checkRatesStatus(changedRates);
    const changedAmenities =
      sessionStorage.getItem("changedAmenities") == "false"
        ? false
        : sessionStorage.getItem("changedAmenities") == "true"
        ? true
        : null;
    const changedQuestions =
      sessionStorage.getItem("changedQuestions") == "false"
        ? false
        : sessionStorage.getItem("changedQuestions") == "true"
        ? true
        : null;
    if (
      prevRebidStatus != null &&
      (prevRebidStatus == 2 || prevRebidStatus == "2")
    ) {
      if (newstatus != "C") {
        calcstatus = newstatus;
      }
    } else {
      if (curstatus != null && curstatus != "") {
        if (curstatus != "C" && newstatus != "C" && curstatus != newstatus) {
          calcstatus = "A";
        } else if (newstatus == "C" && curstatus == "A") {
          if (isrebid) {
            if (ratesStatus || changedAmenities || changedQuestions)
              calcstatus = "C";
            else if (changedAmenities || changedQuestions) calcstatus = "B";
            else calcstatus = "A";
          } else calcstatus = "T";
        } else if (newstatus == "C" && curstatus == "T") {
          if (!ratesStatus) calcstatus = "B";
          else calcstatus = "A";
        } else if (
          newstatus == "C" &&
          curstatus == "B" &&
          cbcDetailsRef.current?.hotelAccountSpecificBusinessCase
            .business_case == "Y"
        ) {
          if (rm_nights == "" || rm_nights == null) {
            calcstatus = "B";
          }
        }
      }
      curstatus = calcstatus;
    }
    if (calcstatus == "C") {
      statusstr = "C";
    } else if (calcstatus == "") {
      statusstr = "";
    } else {
      statusstr = "R";
    }
    return statusstr;
  };
  const checkRatesStatus = (value) => {
    if (value) {
      Object.entries(value).forEach(([key, element]) => {
        if (
          key !== "isAccountRateValid" &&
          key !== "isDateValid" &&
          key !== "isFixedRateValid" &&
          key !== "isLOSValid"
        ) {
          if (element == "Y") {
            return true;
          }
        }
      });
      return false;
    } else {
      return false;
    }
  };
  const cbc_check = () => {
    let bOK = true;
    let cbccheckstatus;
    let msg = "";
    if (bOK) {
      if (cbcDetails.hotelAccountSpecificBusinessCase.business_case == "Y") {
        if (cbcDetails.hotelAccountSpecificBusinessCase.trvler_endorse == "Y") {
          if (cbcDetails.hotelAccountSpecificBusinessCase.trvler_info == "") {
            msg = Settings.alert.traveler_Info;
            bOK = false;
          }
        }
        if (
          bOK &&
          cbcDetails.hotelAccountSpecificBusinessCase.market_notes == ""
        ) {
          msg = Settings.alert.market_Info;
          bOK = false;
        }
        if (
          bOK &&
          cbcDetails.hotelAccountSpecificBusinessCase.competitor_info == ""
        ) {
          msg = Settings.alert.competitor_info;
          bOK = false;
        }
        if (
          bOK &&
          cbcDetails.hotelAccountSpecificBusinessCase.bus_reason == ""
        ) {
          msg = Settings.alert.bus_reason;
          bOK = false;
        }
      }
    }
    if (!bOK) {
      if (appContext?.user?.isPASorAnySales) {
        cbccheckstatus = "continue";
      } else {
        cbccheckstatus = "failed";
        alert(msg);
      }
    } else cbccheckstatus = "complete";

    if (cbccheckstatus == "complete" || cbccheckstatus == "continue") {
      let bOK1 = true;
      let msg1 = "";
      if (cbcDetails.hotelAccountSpecificBusinessCase.business_case == "Y") {
        if (cbcDetails.hotelAccountSpecificBusinessCase.pid == "N") {
          msg1 = Settings.alert.typeProperty;
          bOK1 = false;
        }
        if (
          bOK1 &&
          cbcDetails.hotelAccountSpecificBusinessCase.cbc_count >=
            cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc &&
          cbcDetails.hotelAccountSpecificBusinessCase.case_old == "N" &&
          cbcDetails.hotelAccountSpecificBusinessCase.cbc_request == 0
        ) {
          msg1 =
            Settings.alert.cbc_Count1 +
            cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc +
            Settings.alert.cbc_Count2 +
            cbcDetails?.hotelAccountSpecificBusinessCase?.max_cbc +
            Settings.alert.cbc_Count3;
          bOK1 = false;
        }
      }
      if (!bOK1) {
        cbccheckstatus = "failed";
        alert(msg1);
      }
    }

    return cbccheckstatus;
  };

  function buildBusinessCaseData() {
    const bCase = cbcDetailsRef.current
      ? cbcDetailsRef.current.hotelAccountSpecificBusinessCase
      : cbcDetails.hotelAccountSpecificBusinessCase;
    const postData = {
      pid: bCase.pid,
      business_case: bCase.business_case,
      trvler_endorse: bCase.trvler_endorse,
      trvler_info: bCase.trvler_info,
      market_notes: bCase.market_notes,
      competitor_info: bCase.competitor_info,
      bus_reason: bCase.bus_reason,
      ispastcbc: bCase.ispastcbc,
      due_date: bCase.shortCbc_softduedate,
      cbc_count: bCase.cbc_count,
      cbc_request: bCase.cbc_request,
      case_old: bCase.case_old,
    };
    return JSON.stringify(postData);
  }

  function cbc_pid(e) {
    const pid = e.target.value;
    setCbcDetails({
      ...cbcDetails,
      hotelAccountSpecificBusinessCase: {
        ...cbcDetails.hotelAccountSpecificBusinessCase,
        pid: pid,
      },
    });
    setDuppid(e.target.value);
    if (ifDueDatePassed() && pid == Settings.pidE) {
      const businessCaseElement = document.getElementById(
        "hotelAccountSpecificBusinessCase.business_case"
      ) as HTMLInputElement;
      businessCaseElement.value = Settings.noLetter;
      setBusinessCase(Settings.noLetter);
      alert(Settings.alert.submissionDueDatePassed);
    }
  }

  function setBusinessCase(value) {
    setCbcDetails({
      ...cbcDetails,
      hotelAccountSpecificBusinessCase: {
        ...cbcDetails.hotelAccountSpecificBusinessCase,
        business_case: value,
      },
    });
  }

  function ifDueDatePassed() {
    const dueDate =
      cbcDetails.hotelAccountSpecificBusinessCase.shortCbc_softduedate;
    const isPastCBC = cbcDetails.hotelAccountSpecificBusinessCase.ispastcbc;
    return (
      !!dueDate &&
      dueDate == Settings.maxDueDate &&
      isPastCBC == Settings.noLetter
    );
  }
  const checkMaxLength = (e, type, length) => {
    const obj = { ...cbcDetails };
    obj.hotelAccountSpecificBusinessCase[type] = e.target.value;
    if (obj.hotelAccountSpecificBusinessCase[type].length > length) {
      alert("You are allowed to enter up to " + length + " characters.");
      obj.hotelAccountSpecificBusinessCase[type] =
        obj.hotelAccountSpecificBusinessCase[type].substr(0, length - 1);
      setCbcDetails(obj);
    }
  };

  return (
    <>
      {showLoader ? (
        <CLoader></CLoader>
      ) : (
        <>
          <div className={"compilingbusinesscase"}>
            <div style={{ position: "static" }}>
              <div className={Styles.field_Name}>
                Hotels that enter VP rates and have not been requested by the
                customer must click yes and complete all Compelling Business
                Case fields.
              </div>
              <div style={{ height: "3px" }} />
              <div className={Styles.field_Name}>
                Compelling Business Case Requirements:{" "}
              </div>
              <div className={Styles.field_Name} style={{ paddingTop: "3px" }}>
                &nbsp;&nbsp;&nbsp; a) Existing Hotel (Opened >12 months):
              </div>
              <div
                className={`${Styles.field_Value} ${Styles.nowrapcell}`}
                style={{
                  width: "910px",
                  paddingTop: "3px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {
                  cbcDetails.hotelAccountSpecificBusinessCase
                    .notestext_existinghotel
                }
              </div>
              <div className={Styles.field_Name} style={{ paddingTop: "3px" }}>
                &nbsp;&nbsp;&nbsp; b) Pre-Opening/New Hotel (Opened within the past 12 months):
              </div>
              <div
                className={`${Styles.field_Value} ${Styles.nowrapcell}`}
                style={{
                  width: "910px",
                  paddingTop: "3px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {
                  cbcDetails.hotelAccountSpecificBusinessCase
                    .notestext_preopeninghotel
                }
              </div>
            </div>
            <div style={{ height: "10px" }} />
            {cbcDetails.hotelAccountSpecificBusinessCase.isSolicited ==
            Settings.noLetter ? (
              <div style={{ clear: "both" }}>
                <div
                  className={Styles.field_Name}
                  style={{ paddingTop: "5px" }}
                >
                  Type of Property:
                  <select
                    style={{ position: "relative", left: "20px" }}
                    id="hotelAccountSpecificBusinessCase.pid"
                    name="hotelAccountSpecificBusinessCase.pid"
                    onChange={(e) => cbc_pid(e)}
                    disabled={parentContext.isRebidDeclined}
                  >
                    <option value="null" />
                    {cbcDetails.typeOfProperty.map((propertyType) => {
                      return (
                        <option
                          value={propertyType.pid}
                          selected={
                            cbcDetails.hotelAccountSpecificBusinessCase.pid ==
                            propertyType.pid
                          }
                        >
                          {propertyType.typeOfProperty}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div style={{ height: "10px" }} />
                <div
                  className={`${Styles.field_Name} ${Styles.floatleft}`}
                  style={{ width: "160px", paddingTop: "2px" }}
                >
                  Compelling Business Case?
                </div>
                <div
                  className={`${Styles.field_Value} ${Styles.floatleft}`}
                  style={{ width: "100px" }}
                >
                  <select
                    name="hotelAccountSpecificBusinessCase.business_case"
                    id="hotelAccountSpecificBusinessCase.business_case"
                    onChange={(e) => cbc_onChange(e)}
                    disabled={parentContext.isRebidDeclined}
                    value={
                      cbcDetails.hotelAccountSpecificBusinessCase.business_case
                    }
                  >
                    {options.map((eachOption, index) => {
                      return (
                        <>
                          <option
                            key={index}
                            value={eachOption.key}
                            selected={
                              cbcDetails.hotelAccountSpecificBusinessCase
                                .business_case === eachOption.key
                            }
                          >
                            {eachOption.value}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                {!!cbcDetails.hotelAccountSpecificBusinessCase
                  .shortCbc_softduedate ? (
                  <div>
                    <span className={Styles.field_Name}>Due date:</span>{" "}
                    {cbcDetails.hotelAccountSpecificBusinessCase
                      .shortCbc_softduedate === Settings.maxDueDate
                      ? Settings.noCBC
                      : cbcDetails.hotelAccountSpecificBusinessCase
                          .shortCbc_softduedate}{" "}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <>
                <div
                  className={Styles.field_Name}
                  style={{ paddingTop: "5px" }}
                >
                  Type of Property:{" "}
                  {cbcDetails.typeOfProperty.map((propertyType) => {
                    return (
                      <>
                        {cbcDetails.hotelAccountSpecificBusinessCase.pid ==
                        propertyType.pid
                          ? propertyType.typeOfProperty
                          : ""}
                      </>
                    );
                  })}
                </div>
                <div style={{ height: "10px" }} />
                <div
                  className={`${Styles.field_Name} ${Styles.floatleft}`}
                  style={{ width: "160px" }}
                >
                  Compelling Business Case?
                </div>{" "}
                <div
                  className={`${Styles.field_Value} ${Styles.floatleft}`}
                  style={{ width: "100px" }}
                >
                  {cbcDetails.hotelAccountSpecificBusinessCase.business_case ===
                  "Y"
                    ? "Yes"
                    : "No"}
                </div>
                {cbcDetails.hotelAccountSpecificBusinessCase
                  .shortCbc_softduedate ? (
                  <div style={{ width: "500px" }}>
                    <span className={Styles.field_Name}>
                      {Settings.dueDate}
                    </span>{" "}
                    {""}{" "}
                    {cbcDetails.hotelAccountSpecificBusinessCase
                      .shortCbc_softduedate === Settings.maxDueDate
                      ? Settings.noCBC
                      : cbcDetails.hotelAccountSpecificBusinessCase
                          .shortCbc_softduedate}
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {cbcDetails.hotelAccountSpecificBusinessCase.business_case ==
            Settings.yesLetter ? (
              <div id="cbc_data" style={{ display: "block" }}>
                <div style={{ clear: "both" }}>
                  <div
                    className={`${Styles.field_Name} ${Styles.floatleft}`}
                    style={{ width: "540px", paddingTop: "8px" }}
                  >
                    Do you have endorsement from a traveler, travel arranger, or
                    some other employee with this account?{" "}
                  </div>
                  <div
                    className={`${Styles.field_Value} ${Styles.floatleft}`}
                    style={{
                      position: "relative",
                      left: "20px",
                      paddingTop: "5px",
                    }}
                  >
                    <select
                      name="hotelAccountSpecificBusinessCase.trvler_endorse"
                      id="hotelAccountSpecificBusinessCase.trvler_endorse"
                      onChange={(e) => cbcend_onChange(e)}
                      disabled={parentContext.isRebidDeclined}
                    >
                      <option
                        value="Y"
                        selected={
                          cbcDetails.hotelAccountSpecificBusinessCase
                            .trvler_endorse == Settings.yesLetter
                        }
                      >
                        Yes
                      </option>
                      <option
                        value="N"
                        selected={
                          cbcDetails.hotelAccountSpecificBusinessCase
                            .trvler_endorse == Settings.noLetter
                        }
                      >
                        No
                      </option>
                    </select>
                  </div>
                  {cbcDetails.hotelAccountSpecificBusinessCase.trvler_endorse ==
                  Settings.yesLetter ? (
                    <div style={{ clear: "both" }}>
                      <div id="cbc_end_data" className={cbcStyles.cbcEndData}>
                        <table cellSpacing={0} cellPadding={0}>
                          <tbody>
                            <tr>
                              <td className={Styles.field_Name} colSpan={2}>
                                {" "}
                                Provide their first and last name, title, phone
                                number, and e-mail address.
                              </td>
                            </tr>
                            <tr>
                              {" "}
                              <td style={{ width: "10px" }} />
                              <td className={Styles.field_Value}>
                                <textarea
                                  cols={60}
                                  id="hotelAccountSpecificBusinessCase.trvler_info"
                                  name="hotelAccountSpecificBusinessCase.trvler_info"
                                  rows={3}
                                  className={cbcStyles.cbcTextBoxes}
                                  value={
                                    cbcDetails.hotelAccountSpecificBusinessCase
                                      .trvler_info
                                  }
                                  onChange={(e) =>
                                    onTextChange(e, Settings.trvlerInfo)
                                  }
                                  onKeyPress={(e) =>
                                    Utils.checklen_onkeypress(e, 255)
                                  }
                                  onBlur={(e) =>
                                    checkMaxLength(e, Settings.trvlerInfo, 255)
                                  }
                                  disabled={parentContext.isRebidDeclined}
                                />
                              </td>{" "}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div style={{ clear: "both", paddingTop: "10px" }}>
                    <div className={Styles.field_Name}>
                      Please describe any mergers, acquisitions, or special
                      projects activity being conducted by this account which
                      are taking place in your hotel or market.{" "}
                    </div>
                    <div
                      className={Styles.field_Value}
                      style={{ position: "relative", left: "20px" }}
                    >
                      <textarea
                        cols={60}
                        id="hotelAccountSpecificBusinessCase.market_notes"
                        name="hotelAccountSpecificBusinessCase.market_notes"
                        rows={11}
                        style={{
                          fontFamily: "Arial",
                          fontSize: "8pt",
                          height: "50px",
                          width: "536px",
                        }}
                        value={
                          cbcDetails.hotelAccountSpecificBusinessCase
                            .market_notes
                        }
                        onChange={(e) => onTextChange(e, Settings.marketNotes)}
                        onKeyPress={(e) => Utils.checklen_onkeypress(e, 500)}
                        onBlur={(e) =>
                          checkMaxLength(e, Settings.marketNotes, 500)
                        }
                        disabled={parentContext.isRebidDeclined}
                      />
                    </div>
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <div className={Styles.field_Name}>
                      Please list the current competitor(s) that account is
                      using. Be sure to include rate and amenities competitors
                      are offering.
                    </div>
                    <div
                      className={Styles.field_Value}
                      style={{ position: "relative", left: "20px" }}
                    >
                      <textarea
                        cols={60}
                        id="hotelAccountSpecificBusinessCase.competitor_info"
                        name="hotelAccountSpecificBusinessCase.competitor_info"
                        rows={11}
                        style={{
                          fontFamily: "Arial",
                          fontSize: "8pt",
                          height: "50px",
                          width: "536px",
                        }}
                        value={
                          cbcDetails.hotelAccountSpecificBusinessCase
                            .competitor_info
                        }
                        onChange={(e) =>
                          onTextChange(e, Settings.competitorInfo)
                        }
                        onKeyPress={(e) => Utils.checklen_onkeypress(e, 500)}
                        onBlur={(e) =>
                          checkMaxLength(e, Settings.competitorInfo, 500)
                        }
                        disabled={parentContext.isRebidDeclined}
                      />
                    </div>
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <div className={Styles.field_Name}>
                      Provide a COMPELLING business case that outlines the
                      reason for this account to add your hotel to their
                      program. Be sure to provide specific and persuasive
                      information beyond Hotelligence or MarRFP information.
                    </div>
                    <div
                      className={Styles.field_Value}
                      style={{ position: "relative", left: "20px" }}
                    >
                      <textarea
                        cols={60}
                        id="hotelAccountSpecificBusinessCase.bus_reason"
                        name="hotelAccountSpecificBusinessCase.bus_reason"
                        rows={11}
                        style={{
                          fontFamily: "Arial",
                          fontSize: "8pt",
                          height: "50px",
                          width: "536px",
                        }}
                        value={
                          cbcDetails.hotelAccountSpecificBusinessCase.bus_reason
                        }
                        onChange={(e) => onTextChange(e, Settings.busReason)}
                        onKeyPress={(e) => Utils.checklen_onkeypress(e, 500)}
                        onBlur={(e) =>
                          checkMaxLength(e, Settings.busReason, 500)
                        }
                        disabled={parentContext.isRebidDeclined}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <style>{`
        .compilingbusinesscase{
          overflow: auto;
          border: 1px solid #ccc;
          padding: 5px;
          margin: 1px 0 0 1px;
          height: calc(100vh - 320px);
        }
        .compilingbusinesscase div{
          width:99.6%;
        }
        @media only screen and (min-width: 1920px) {
          .compilingbusinesscase {
          height: calc(100vh - 327px) !important;
          }
        }
        @media only screen and (max-width: 1000px) {
          .compilingbusinesscase {
            height: calc(100vh - 330px) !important;
            }
        }
      `}</style>
        </>
      )}
    </>
  );
}

export default CompellingBusinessCase;
