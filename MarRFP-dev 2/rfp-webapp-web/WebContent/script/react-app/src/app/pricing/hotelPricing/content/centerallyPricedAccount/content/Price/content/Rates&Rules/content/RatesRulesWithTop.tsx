import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { RatesTableList } from "./RatesTableList";
import styles from "./RatesRules.css";
// import CModal from "../../../../../../common/components/CModal";
import RatesRulesContext, {
  RatesRulesContextProvider,
} from "../context/RatesRulesContextProvider";
import PreviousRules from "../../../../../../../../../common/components/PreviousRules";
import { CPreviousRates } from "../../../../../../../../../common/components/CPreviousRates";
import Utils from "../../../../../../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";

import aerlevel1 from "../../../../../../../../../common/assets/img/aer.gif";
import aer from "../../../../../../../../../common/assets/img/aer.gif";
import noSquatter from "../../../../../../../../../common/assets/img/nosquatter.gif";
import noview from "../../../../../../../../../common/assets/img/noview.gif";
import toYear from "../../../../../../../../../common/assets/img/two_year.gif";
import offCycle from "../../../../../../../../../common/assets/img/off_cycle.gif";
import isnew from "../../../../../../../../../common/assets/img/new.gif";
import wifi from "../../../../../../../../../common/assets/img/wifi.gif";
import rollOver from "../../../../../../../../../common/assets/img/roll_over.png";
import btBookingCost from "../../../../../../../../../common/assets/img/bt_booking_cost.png";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import requestImg from "../../../../../../../../../common/assets/img/requested.gif";
import acceptedImg from "../../../../../../../../../common/assets/img/accepted.gif";
import lockedImg from "../../../../../../../../../common/assets/img/locked.gif";
import rejected from "../../../../../../../../../common/assets/img/rejectedD.gif";
import API from "../service/API";
import Settings from "../static/Settings";
import { CLoader } from "../../../../../../../../../common/components/CLoader";

export function RatesRulesWithTop(props) {
  const { ratesData } = props;
  const contextType = useContext(RatesRulesContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const hasd = ratesData?.hotelAccountSpecific?.hotelAccountSpecificData;
  const hasvi = ratesData?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
  const hotel_accountinfoid = props.isBTGroupPage
    ? props.ratesData?.hotel_accountinfoid
    : hasd?.hotel_accountinfoid;

  const aerFlag = hasd?.aer_account === "Y" && hasd?.excludeaer === "N";
  const [currentHotelInfoId, setCurrentHotelInfoId] = useState(false);
  const urlParms = useLocation().search;
  const vpRate = new URLSearchParams(urlParms).get("vpRate");
  const onAccountName = (id) => {
    const popupParms =
      "height=300,width=700,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes";
    API.getAccountReport(id)
      .then((res) => {
        const url = res.reportServer + "&" + res.reportQueryString;
        const popupWindow = window.open(url, "_blank");
        popupWindow.focus();
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const handleGetProductOffered = () => {
    const productOffered = [];

    if (
      !aerFlag &&
      (!(hasd?.isLocked == "Y" && hasd?.ratetype_selected > 1) ||
        appContext?.user?.isAdminRole)
    ) {
      productOffered.push("Fixed");
    }
    if (aerFlag) {
      productOffered.push("GPP");
    }

    if (hasd?.gov_account === "Y" && !hasd?.isInternational) {
      productOffered.push("Gov Volume Producer");
    }
    if (hasd?.allow_floatnociel === "Y") {
      productOffered.push("Float Volume Producer");
    }
    if (hasd?.gov_account === "N" || hasd?.isInternational) {
      productOffered.push("Volume Producer");
    }
    return productOffered;
  };

  const productOfferedDropdownEditable = () => {
    let productOfferedDropdownEditableFlag = false;
    if (appContext?.user?.isHotelUser && hasd?.isSelected === "Y") {
      productOfferedDropdownEditableFlag = true;
    } else if (
      (appContext?.user?.isHotelUser &&
        hasd?.allowHotelcanPriceFloatVP != "Y") ||
      hasd?.allow_floatnociel != "Y"
    ) {
      productOfferedDropdownEditableFlag = true;
    } else {
      productOfferedDropdownEditableFlag = false;
    }
    if (hasd?.allow_floatnociel != "Y") {
      productOfferedDropdownEditableFlag = true;
    }
    return productOfferedDropdownEditableFlag;
  };

  const productOfferedDropdown = (ratetype_selected) => {
    switch (ratetype_selected) {
      case 20:
        return "Float Volume Producer";
        break;
      default:
        return "Volume Producer";
        break;
    }
  };

  const handleRuleChange = (e, ruleName) => {
    const rulevalue = e.target.value;
    let reqData: any = "";
    if (props.isBTGroupPage && hotel_accountinfoid) {
      reqData = JSON.parse(
        localStorage.getItem("ratesData_" + hotel_accountinfoid)
      );
    } else {
      reqData = JSON.parse(localStorage.getItem("ratesData"));
    }
    const ruleIndex = reqData?.accountRules?.findIndex(
      (el) => el.rulename === ruleName
    );
    reqData.accountRules[ruleIndex].rulevalue = rulevalue;

    if (props.isBTGroupPage && hotel_accountinfoid) {
      contextType.setRatesRequestPayload({
        ...contextType.ratesRequestPayload,
        [hotel_accountinfoid]: reqData,
      });

      localStorage.setItem(
        "ratesData_" + hotel_accountinfoid,
        JSON.stringify(reqData)
      );
    } else {
      if (hotel_accountinfoid) {
        contextType.setRatesRequestPayload({
          ...contextType.ratesRequestPayload,
          [hotel_accountinfoid]: reqData,
        });
      } else {
        contextType.setRatesRequestPayload(reqData);
      }
      localStorage.setItem("ratesData", JSON.stringify(reqData));
    }
    const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
    dataCheck.rulesChg = "Y";
    localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
  };

  React.useEffect(() => {
    const pData = handleGetProductOffered();
    contextType.setProductOffered(pData);
  }, [ratesData]);

  const handleChangePercentage = (percentdiscount) => {
    appContext.rateRulesValidationPercentMsg = "";
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        percentdiscount,
      },
    });
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.percentageChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    appContext.setIsPercentDiscountSaved(false);
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };

  const handleBlurPercentage = (percentdiscount) => {
    appContext.rateRulesValidationPercentMsg = "";
    const hasdOrg = JSON.parse(localStorage.getItem("orginalRatesData"));
    const requestHasd = hasdOrg?.hotelAccountSpecific?.hotelAccountSpecificData;
    let bOK = true;
    const previousDiscValue = Number(requestHasd?.percentdiscount);
    if (
      appContext?.user?.hasLimitedHotels &&
      (parseInt(hasd?.ratetype_selected) === 18 ||
        parseInt(hasd?.ratetype_selected) === 20)
    ) {
      if (appContext?.user?.isHotelUser && hasd?.isLocked === "Y") {
        if (Number(percentdiscount) < previousDiscValue && bOK) {
          if (
            appContext?.user.isHotelUser ||
            appContext?.user.isLimitedSalesUser
          ) {
            appContext.rateRulesValidationPercentMsg = "true";
            appContext.rateRulesAllValidationMsg =
              Settings.alerts.accountPercen;
          } else {
            appContext.rateRulesValidationPercentMsg = "";
            appContext.rateRulesAllValidationMsg = "";
          }
          alert(Settings.alerts.accountPercen);
          percentdiscount = previousDiscValue;
          bOK = false;
          contextType.setRatesRequestPayload({
            ...contextType.ratesRequestPayload,
            [hotel_accountinfoid]: {
              ...contextType.ratesRequestPayload[hotel_accountinfoid],
              percentdiscount,
            },
          });
        }
      }
      if (!percentdiscount && bOK) {
        if (
          appContext?.user.isHotelUser ||
          appContext?.user.isLimitedSalesUser
        ) {
          appContext.rateRulesValidationPercentMsg = "true";
          appContext.rateRulesAllValidationMsg = Settings.alerts.emptyPercent;
        } else {
          appContext.rateRulesValidationPercentMsg = "";
          appContext.rateRulesAllValidationMsg = "";
        }
        alert(Settings.alerts.emptyPercent);
        bOK = false;
      } else {
        if (hasd?.aer_account !== "Y" && bOK) {
          if (
            Number(percentdiscount) === 0 ||
            Number(percentdiscount) === 0.0
          ) {
            if (
              appContext?.user.isHotelUser ||
              appContext?.user.isLimitedSalesUser
            ) {
              appContext.rateRulesValidationPercentMsg = "true";
              appContext.rateRulesAllValidationMsg =
                Settings.alerts.minumuOnePer;
            } else {
              appContext.rateRulesValidationPercentMsg = "";
              appContext.rateRulesAllValidationMsg = "";
            }
            alert(Settings.alerts.minumuOnePer);
            bOK = false;
          } else {
            appContext.rateRulesValidationPercentMsg = "";
            appContext.rateRulesAllValidationMsg = "";
          }
        }
      }
      // if (percentdiscount < hasd?.minpercent || percentdiscount > 100) {
      //   const strErrorMsg =
      //     "The percent discount must be between " +
      //     hasd?.minpercent +
      //     " and 100.";
      //   alert(strErrorMsg);
      // }
    }
    if (appContext?.user?.isSalesUser || appContext?.user?.isAdminRole) {
      if (percentdiscount > 100 && bOK) {
        alert("The percent discount cannot be more than 100.");
        bOK = false;
        appContext.setNavigateWithAlert(
          "The percent discount cannot be more than 100."
        );
        appContext.setNavigateWithAlertFlag(true);
      } else {
        appContext.setNavigateWithAlert("");
        appContext.setNavigateWithAlertFlag(false);
        contextType.setRatesRequestPayload({
          ...contextType.ratesRequestPayload,
          [hotel_accountinfoid]: {
            ...contextType.ratesRequestPayload[hotel_accountinfoid],
            percentdiscount,
          },
        });
      }
    } else if (
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isHotelUser
    ) {
      if (
        (percentdiscount < hasd?.minpercent || percentdiscount > 100) &&
        bOK
      ) {
        const strErrorMsg =
        "The percent discount must be between " +
          hasd?.minpercent +
          " and 100.";
        appContext.rateRulesValidationPercentMsg = "true";
        appContext.rateRulesAllValidationMsg = strErrorMsg;
        alert(strErrorMsg);
        bOK = false;
      } else {
        appContext.rateRulesValidationPercentMsg = "";
        appContext.rateRulesAllValidationMsg = "";
        contextType.setRatesRequestPayload({
          ...contextType.ratesRequestPayload,
          [hotel_accountinfoid]: {
            ...contextType.ratesRequestPayload[hotel_accountinfoid],
            percentdiscount,
          },
        });
      }
    } else {
      contextType.setRatesRequestPayload({
        ...contextType.ratesRequestPayload,
        [hotel_accountinfoid]: {
          ...contextType.ratesRequestPayload[hotel_accountinfoid],
          percentdiscount,
        },
      });
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };

  const getAccountStatus = (status) => {
    appContext && appContext.setAccStatus && appContext.setAccStatus(status);
    if (status === "A") {
      return (
        <td>
          {" "}
          <img src={acceptedImg}></img>
        </td>
      );
    } else if (status === "S") {
      return (
        <td>
          {" "}
          <img src={requestImg}></img>
        </td>
      );
    } else if (status === "L") {
      return (
        <td>
          {" "}
          <img src={lockedImg}></img>
        </td>
      );
    } else if (status === "R") {
      return (
        <td>
          {" "}
          <img src={rejected}></img>
        </td>
      );
    } else {
      return "";
    }
  };

  let percentdiscount = "";
  if (appContext?.isPercentDiscountSaved) {
    if (props.isBTGroupPage) {
      if (hasd?.percentdiscount) {
        percentdiscount = hasd?.percentdiscount;
      } else {
        percentdiscount = "";
      }
    } else {
      if (
        appContext?.rateruleData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.percentdiscount
      ) {
        percentdiscount =
          appContext?.rateruleData?.hotelAccountSpecific
            ?.hotelAccountSpecificData?.percentdiscount;
      } else {
        percentdiscount = "";
      }
    }
  } else {
    percentdiscount =
      contextType.ratesRequestPayload[hotel_accountinfoid]?.percentdiscount ||
      "";
  }
  return (
    <>
      {appContext.rulesPageIsSaving && <CLoader />}
      <PreviousRules
        showModal={
          contextType.showRulesModal &&
          currentHotelInfoId === props.ratesData?.hotel_accountinfoid
        }
        userType={appContext?.user}
        closeModal={() => {
          setCurrentHotelInfoId(false);
          contextType.setShowRulesModal(false);
        }}
        previousRulesData={contextType?.previousRulesData}
        previousRulesLoader={contextType?.previousRulesLoader}
      />

      <CPreviousRates
        showModal={
          contextType.showRatesModal &&
          currentHotelInfoId === props.ratesData?.hotel_accountinfoid
        }
        closeModal={() => {
          setCurrentHotelInfoId(false);
          contextType.setShowRatesModal(false);
        }}
        previousRulesData={contextType?.previousRatesData}
        previousRulesLoader={contextType?.previousRatesDataLoader}
      />

      <table
        className={` ${
          !props.isBTGroupPage ? styles.topTable : styles.topTableBTPage
        } ${"updateratesrules"}`}
      >
        <div className={styles.topListWrap}>
          {props.isShowAccountName && (
            <tr>
              <td className={styles.Header}>
                <a
                  href="#"
                  style={{ marginRight: "0px", fontWeight: "bold" }}
                  onClick={() => {
                    event.preventDefault();
                    onAccountName(hasd?.accountrecid);
                  }}
                >
                  {hasd?.accountname}
                </a>
                <span>
                  {getAccountStatus(
                    hasd?.accountStatus != null
                      ? hasd?.accountStatus
                      : history?.location?.data?.accountStatus
                  )}
                </span>
                <span>
                  {!props.isBTGroupPage &&
                  hasd?.aer_account != null &&
                  hasd?.aer_account === "Y" &&
                  (hasd?.excludeaer === null ||
                    hasd?.excludeaer === "" ||
                    (hasd?.excludeaer != null && hasd?.excludeaer === "N")) ? (
                    <span>
                      {hasd?.ismaxaer && hasd?.ismaxaer === "Y" ? (
                        <img src={aerlevel1}></img>
                      ) : (
                        <img src={aer}></img>
                      )}
                    </span>
                  ) : (
                    ""
                  )}

                  {hasd?.noSquatter === "Y" ? <img src={noSquatter}></img> : ""}
                  {hasd?.hotel_display === "N" ? <img src={noview}></img> : ""}
                  {hasd?.accountpricingcycleid == 2 ? (
                    <img src={toYear}></img>
                  ) : (
                    ""
                  )}
                  {hasd?.accountpricingcycleid == 3 ? (
                    <img src={offCycle}></img>
                  ) : (
                    ""
                  )}
                  {hasd?.isNew === "Y" ? <img src={isnew}></img> : ""}
                  {hasd?.top_account === "Y" ? <img src={wifi}></img> : ""}
                  {hasd?.bt_booking_cost === "Y" ? (
                    <img src={btBookingCost}></img>
                  ) : (
                    ""
                  )}
                  {hasd?.roll_over === "Y" || hasd?.rollover === "Y" ? (
                    <img src={rollOver}></img>
                  ) : (
                    ""
                  )}
                </span>
              </td>
            </tr>
          )}

          <tr>
            <div
              style={{
                position: "relative",
                height: props.isBTGroupPage ? "12px" : "32px",
              }}
            >
              <div style={{ position: "absolute", width: "500px" }}>
                <td>
                  <div className={styles.field_Name} style={{ width: "95px" }}>
                    Product Offered
                  </div>
                </td>
                <td>
                  <div className={styles.field_Value}>
                    {contextType.productOffered?.length === 1 ? (
                      contextType.productOffered[0]
                    ) : productOfferedDropdownEditable() ? (
                      <div>
                        {" "}
                        {productOfferedDropdown(hasd?.ratetype_selected)}
                      </div>
                    ) : (
                      <select
                        value={hasd?.ratetype_selected}
                        onChange={(e) => {
                          contextType.updateProductData(e.target.value);
                        }}
                        disabled={
                          productOfferedDropdownEditable() ||
                          parentContext.isRebidDeclined
                        }
                      >
                        <option value={vpRate}>Volume Producer</option>

                        {((appContext?.user?.isHotelUser &&
                          hasd?.allowHotelcanPriceFloatVP === "Y") ||
                          appContext?.user?.isAdminRole ||
                          appContext?.user?.isAnySalesUser) &&
                          hasd?.allow_floatnociel === "Y" && (
                            <option value="20">Float Volume Producer</option>
                          )}
                      </select>
                    )}
                  </div>
                </td>
              </div>
            </div>
          </tr>
          {props.isBTGroupPage && (
            <tr>
              <div
                style={{
                  position: "relative",
                  height: "32px",
                  marginTop: "5px",
                }}
              >
                <div style={{ position: "absolute", width: "500px" }}>
                  <td>
                    <div
                      className={styles.field_Name}
                      style={{ width: "95px" }}
                    >
                      Rate Offer Name:
                    </div>
                  </td>
                  <td>
                    <div>{hasd.rateoffername1}</div>
                  </td>
                </div>
              </div>
            </tr>
          )}
          {props.isBTGroupPage && (
            <>
              <tr>
                <div className={styles.InstructionHeader}>Status</div>
              </tr>
              <tr>
                <div style={{ display: "inline" }}>
                  {appContext?.user?.isPASorAnySales && (
                    <>
                      <td style={{ width: "65px" }}>
                        <span style={{ fontWeight: "bold" }}>Presented</span>
                      </td>
                      <td style={{ width: "20px" }}>
                        <span>{hasd?.isSelected === "Y" ? "Yes" : "No"}</span>
                      </td>
                      <td style={{ width: "20px" }}></td>
                      <td style={{ width: "80px" }}>
                        <span style={{ fontWeight: "bold" }}>Market Code</span>
                      </td>
                      <td style={{ width: "80px" }}>
                        <span>
                          {hasd?.hotelAccountSpecificAccountFlags.marketcode}
                        </span>
                      </td>
                    </>
                  )}
                  {appContext?.user?.isPASAdmin && (
                    <>
                      <td style={{ width: "170px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          2 Year Amenity Logic Override
                        </span>
                      </td>
                      <td style={{ width: "30px" }}>
                        <select
                          name="hasd[140349897].accountRules[1].rulevalue"
                          id="hasd[140349897].accountRules[1].rulevalue"
                          value={
                            contextType?.ratesRequestPayload[
                              hotel_accountinfoid
                            ]?.hotelAccountSpecificAccountFlags
                              ?.amenities_exempt
                          }
                          onChange={(event) => {
                            contextType.setRatesRequestPayload({
                              ...contextType.ratesRequestPayload,
                              [hotel_accountinfoid]: {
                                ...contextType.ratesRequestPayload[
                                  hotel_accountinfoid
                                ],
                                hotelAccountSpecificAccountFlags: {
                                  ...contextType.ratesRequestPayload[
                                    hotel_accountinfoid
                                  ]?.hotelAccountSpecificAccountFlags,
                                  amenities_exempt: event.target.value,
                                },
                              },
                            });
                            if (!props.isBTGroupPage) {
                              const dataCheck = JSON.parse(
                                localStorage.getItem("ratesTableValidData")
                              );
                              dataCheck.amenitiesExemptChg = "Y";
                              localStorage.setItem(
                                "ratesTableValidData",
                                JSON.stringify(dataCheck)
                              );
                            }
                          }}
                        >
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                    </>
                  )}
                </div>
              </tr>
            </>
          )}

          <tr>
            <div className={styles.InstructionHeader}>Rules</div>
          </tr>
          <tr>
            <div
              className={
                props.isBTGroupPage
                  ? styles.rulesSectionDisplayFlex
                  : styles.rulesSectionDisplayInline
              }
            >
              {contextType.ratesRequestPayload[hotel_accountinfoid]
                ?.accountRules?.length > 0 &&
                contextType.ratesRequestPayload[
                  hotel_accountinfoid
                ]?.accountRules?.map((rule, index) => {
                  let readRule = true;
                  let showRule = true;
                  const intRuleId = parseInt(rule?.ruleid);
                  if (intRuleId === 2) {
                    readRule = false;
                    showRule = false;
                  }

                  if (intRuleId === 4) {
                    readRule = false;
                  }

                  if (intRuleId === 3) {
                    if (!appContext?.user?.isPASAdmin) {
                      readRule = false;
                      showRule = false;
                    }
                  }

                  if (
                    (!appContext?.user?.isPASorAnySales &&
                      rule?.hardcoded === "Y") ||
                    appContext?.user?.isReadOnly
                  ) {
                    readRule = false;
                  }

                  return (
                    <>
                      <td>
                        <span
                          style={{
                            width:
                              showRule && rule?.rulename === "Commissionable?"
                                ? "100px"
                                : "165px",
                            marginLeft: props.isBTGroupPage
                              ? showRule && rule?.rulename === "Commissionable?"
                                ? 0
                                : "200px"
                              : 0,
                            fontWeight: "bold",
                            marginRight: 18,
                          }}
                        >
                          {showRule && rule?.rulename}
                        </span>
                      </td>
                      <td>
                        {!readRule ? (
                          showRule && rule?.rulevalue === "Y" ? (
                            "Yes"
                          ) : intRuleId !== 3 ? (
                            "No"
                          ) : (
                            ""
                          )
                        ) : (
                          <select
                            value={rule?.rulevalue}
                            onChange={(e) =>
                              handleRuleChange(e, rule?.rulename)
                            }
                            style={{ marginRight: "40px" }}
                          >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        )}
                      </td>
                    </>
                  );
                })}

              {hasd?.isSelected === "Y" && !props.isBTGroupPage && (
                <>
                  {" "}
                  <td style={{ width: "15px" }}> </td>
                  <td className="Field_Name">
                    <a
                      href="javascript:void(0);"
                      className={styles.ratesLink}
                      onClick={() => {
                        contextType.getPreviousRulesData(
                          props.ratesData?.hotel_accountinfoid
                        );
                        contextType.setShowRulesModal(true);
                        setCurrentHotelInfoId(
                          props.ratesData?.hotel_accountinfoid
                        );
                      }}
                    >
                      Previous Rules
                    </a>
                  </td>{" "}
                </>
              )}
            </div>
          </tr>
          {hasd?.isSelected === "Y" && props.isBTGroupPage && (
            <>
              <tr>
                {" "}
                <td className="Field_Name">
                  <a
                    href="javascript:void(0);"
                    className={styles.ratesLink}
                    onClick={() => {
                      contextType.getPreviousRulesData(
                        props.ratesData?.hotel_accountinfoid
                      );
                      contextType.setShowRulesModal(true);
                      setCurrentHotelInfoId(
                        props.ratesData?.hotel_accountinfoid
                      );
                    }}
                  >
                    Previous Rules
                  </a>
                </td>{" "}
              </tr>
              <tr style={{ height: "12.8px" }}>
                <td>&nbsp;</td>
              </tr>
            </>
          )}
          {hasd?.isSelected === null && props.isBTGroupPage && (
            <tr style={{ height: "12.8px" }}>
              <td>&nbsp;</td>
            </tr>
          )}
          <tr>
            <div className={styles.InstructionHeader}>Rates</div>
          </tr>
          {hasd?.last_updatedrates !== null && (
            <tr>
              <table cellSpacing={0} cellPadding={0}>
                <tr>
                  <td className={styles.field_Name}>Last Updated On:</td>
                  <td style={{ width: "5px" }} />
                  <td className={styles.field_Value}>
                    {!props.isBTGroupPage
                      ? JSON.parse(sessionStorage.getItem("getRatesdata"))
                          ?.hotelAccountSpecific?.hotelAccountSpecificData
                          ?.formattedLast_updatedrates
                      : hasd?.formattedLast_updatedrates}
                  </td>
                  <td style={{ width: "15px" }} />
                  {appContext?.user?.isHotelUser ||
                  appContext?.user?.isLimitedSalesUser ? null : (
                    <>
                      {" "}
                      <td
                        className={
                          appContext?.user?.isPASAdmin ||
                          appContext?.user?.isSalesUser
                            ? styles.field_Name
                            : styles.noDisplay
                        }
                      >
                        By:
                      </td>
                      <td style={{ width: "5px" }} />
                      <td
                        className={
                          appContext?.user?.isPASAdmin ||
                          appContext?.user?.isSalesUser
                            ? styles.field_Value
                            : styles.noDisplay
                        }
                      >
                        {!props.isBTGroupPage
                          ? JSON.parse(sessionStorage.getItem("getRatesdata"))
                              ?.hotelAccountSpecific?.hotelAccountSpecificData
                              ?.lastupaterateeid
                          : hasd?.lastupaterateeid}
                      </td>
                      <td style={{ width: "15px" }} />
                      <td
                        className={
                          appContext?.user?.isPASAdmin ||
                          appContext?.user?.isSalesUser
                            ? styles.field_Name
                            : styles.noDisplay
                        }
                      >
                        Email:
                      </td>
                      <td style={{ width: "5px" }} />
                      <td
                        className={
                          appContext?.user?.isPASAdmin ||
                          appContext?.user?.isSalesUser
                            ? styles.field_Value
                            : styles.noDisplay
                        }
                      >
                        {!props.isBTGroupPage
                          ? JSON.parse(sessionStorage.getItem("getRatesdata"))
                              ?.hotelAccountSpecific?.hotelAccountSpecificData
                              ?.lastupaterateeemail
                          : hasd?.lastupaterateeemail}
                      </td>
                    </>
                  )}
                  <td style={{ width: "10px" }}> </td>
                  {hasd?.isSelected === "Y" && (
                    <>
                      {" "}
                      <td style={{ width: "15px" }}> </td>
                      <td className="Field_Name">
                        <a
                          href="javascript:void(0);"
                          className={styles.ratesLink}
                          onClick={() => {
                            contextType.getPreviousRatesData(
                              props.ratesData?.hotel_accountinfoid
                            );
                            contextType.setShowRatesModal(true);
                            setCurrentHotelInfoId(
                              props.ratesData?.hotel_accountinfoid
                            );
                          }}
                        >
                          Previous Rates
                        </a>
                      </td>{" "}
                    </>
                  )}
                </tr>
              </table>
            </tr>
          )}
          {(parseInt(hasd?.ratetype_selected) === 18 ||
            parseInt(hasd?.ratetype_selected) === 20) && (
            <div>
              <tr>
                <td className={styles.productDis}>
                  Percent Discount:
                  {parseInt(hasd?.ratetype_selected) !== 18 ||
                  parseInt(hasd?.ratetype_selected) === 20 ? (
                    <input
                      onBlur={(event) =>
                        handleBlurPercentage(event.target.value)
                      }
                      onChange={(event) =>
                        handleChangePercentage(event.target.value)
                      }
                      onKeyPress={Utils.NumberAndFloatOnly_onkeypress}
                      title="Type only digits and decimal seperator, if any"
                      type="text"
                      id="hasd[${hotel_accountinfoid}].strPercentdiscount"
                      name="hasd[${hotel_accountinfoid}].strPercentdiscount"
                      value={percentdiscount}
                      className={styles.fieldNumber}
                      style={{
                        width: 33,
                        paddingRight: "3px",
                        marginLeft: "1px",
                      }}
                      disabled={parentContext.isRebidDeclined}
                    />
                  ) : (
                    hasd?.percentdiscount
                  )}
                  <span className={styles.percentSymbol}> %</span>
                </td>
              </tr>
            </div>
          )}

          <tr>
            <div>
              {!hasd?.isInternational &&
                hasd?.ratetype_selected === 19 &&
                hasd?.gov_account === "Y" &&
                hasd?.accountRatesSize === 0 &&
                hasd?.accountStatus !== "L" &&
                hasd?.accountStatus !== "A" &&
                hasd?.accountStatus !== "R" && (
                  <div className={styles.gridHeaderLight}>
                    <div
                      className={styles.Field_Name}
                      style={{ marginTop: 12, marginBottom: 12 }}
                    >
                      If you would like to copy your Government Rates into this
                      account, please select to copy them into the LRA or NLRA
                      rates.
                      <select
                        id="cpRates"
                        name="cpRates"
                        onChange={(event) =>
                          contextType.copyGovAction(
                            props.ratesData?.hotel_accountinfoid ||
                              hasd?.hotel_accountinfoid,
                            event.target.value
                          )
                        }
                      >
                        <option value="neither">Neither</option>
                        <option value="lraRates">LRA Rates</option>
                        <option value="nlraRates">NLRA Rates</option>
                      </select>
                    </div>
                  </div>
                )}
              {props.isBTGroupPage ? (
                <div className={styles.gridHeaderLight}>
                  <i>
                    {" "}
                    If presenting <b>ONLY</b> an NLRA rate, contact the Account
                    Director <b>PRIOR</b> to the pricing deadline.
                  </i>
                </div>
              ) : (
                <>
                  <div className={styles.gridHeaderLight}>
                    <i>
                      {" "}
                      Review the account’s SAPP/Workbook or email solicitation to understand and align with the account’s 
                      specific rate parameters and requirements.
                    </i>
                  </div>
                  <>&nbsp;</>
                  <div className={styles.gridHeaderLight}>
                    <i>
                      {" "}
                      If you wish to <b>ONLY</b> present <b>Static Volume Producer NLRA</b> rates, enter
                      9999999 <b>(7 9's)</b> in the <b>LRA</b> rate fields. In
                      the NLRA rate fields, enter the desired NLRA rates. This
                      will indicate that this is an <b>NLRA Only</b> rate offer.
                    </i>
                  </div>
                  <>&nbsp;</>
                  <div className={styles.gridHeaderLight}>
                    <i>
                      {" "}
                      If the Float VP Product is <b>enabled</b> and you wish to present the <b>Float Volume Producer as NLRA,</b> you will need to respond to the addendum question for
                      Account Leaders to present the Float VP rate as NLRA for consideration.
                    </i>
                  </div>
                  <>&nbsp;</>
                  <div className={styles.gridHeaderLight}>
                    <i>
                      {" "}
                       If the account is not accepting a Float Volume Producer as NLRA, refer to the Account Overview, Workbook, or email solicitation.
                    </i>
                  </div>
                  <>&nbsp;</>
                  <div className={styles.gridHeaderLight}>
                    <i>
                      {" "}
                      Rates entered into MarRFP should match the same tax set-up
                      as how the property sells in MARSHA. For example, if taxes
                      are included in the standard rate set-up in MARSHA, then
                      taxes must be included in the rates entered on MarRFP.
                      Account Leaders should not be requesting hotels to submit rates 
                      in MarRFP that have a different tax set-up than how the property is set-up 
                      and sells in MARSHA.
                    </i>
                  </div>
                  <>&nbsp;</>
                </>
              )}
              {hasd?.ratetype_selected !== 18 &&
                hasd?.ratetype_selected !== 20 &&
                hasd?.maxroompools !== hasd?.availroompools && (
                  <div className={styles.gridHeaderLight}>
                    {`This account allows ${hasd?.availroompools} room pools to be priced. To price
            the other room pools, please enter the information on
            the Standards screen.`}
                  </div>
                )}
            </div>
          </tr>
        </div>
        <RatesTableList
          contextType={contextType}
          ratesData={ratesData}
          isHideBottom={props.isHideBottom}
          isBTGroupPage={props.isBTGroupPage}
          btIndex={props.btIndex}
          allHotelRatesLength={props.allHotelRatesLength}
          updateBTURL={props.updateBTURL}
          btMergeData={props.btMergeData}
        />
      </table>
      <style>{`
      .previoustest{
          position: fixed;
          width: 400px;
          top: 30vh;
          left: 37%;
        }
        .cpreviousrates{
          position: fixed;
          left: 45vh;
          top: 5vh;
         
        }
        .cpreviousrates table th{
          padding: 0 2px 0 2px !important;
        }
        .cpreviousrates table th div{
          border:0 !important;
        }
        
        `}</style>
    </>
  );
}
