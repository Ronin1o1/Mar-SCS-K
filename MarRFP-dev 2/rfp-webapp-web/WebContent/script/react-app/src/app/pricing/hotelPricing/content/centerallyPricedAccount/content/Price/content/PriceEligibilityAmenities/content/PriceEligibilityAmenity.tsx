import React, { useContext, useEffect, useState } from "react";
import styles from "./PriceEligibilityAmenity.css";
import Settings from "../static/Settings";
import { useLocation, useHistory } from "react-router-dom";
import API from "../service/API";
import CModal from "../../../../../../../../../common/components/CModal";
import PriceEligibilityAmenityContext, {
  PriceEligibilityAmenityContextProvider,
} from "../context/PriceEligibilityAmenityContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import HotelPricingContext from "../../../../../../../context/hotelPricingContextProvider";
//import CPACAPI from "../../../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import screenLoader from "../../../../../../../../../common/assets/img/screenloader.gif";

let contextValue = null;
let contextType = null;
let parentContext = null;

function PriceEligibilityAmenity() {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [validateModal, setValidateModal] = useState(false);
  const [showRateIncludes, setShowRateIncludes] = useState(false);
  const [localEligTick, setLocalEligTick] = useState("");
  const localEligTickRef = React.useRef();
  localEligTickRef.current = localEligTick;
  const history = useHistory();
  const accountCenterTabsContext = useContext(AccountCenterTabsContext);
  const hotelContext = useContext(HotelPricingContext);
  const urlParms = useLocation().search;
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );
  const accountName = new URLSearchParams(urlParms).get("AccountName");
  const hotelId = new URLSearchParams(urlParms).get("hotelrfpid");

  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };
  const reqParam = {
    accountinfoid: setQueryParam("AccountInfoId"),
    marshaCode: setQueryParam("MarshaCode"),
    hotelid: setQueryParam("HotelId"),
    hotelrfpid:
      history.location.Hotelrfpid != null
        ? history.location.Hotelrfpid
        : setQueryParam("Hotelrfpid")
        ? setQueryParam("Hotelrfpid")
        : sessionStorage.getItem("hotelrfpid"),
    userDetails:
      history.location.userDetailsRole != null
        ? history.location.userDetailsRole
        : hotelContext &&
          hotelContext.state &&
          hotelContext.state.userDetails &&
          hotelContext.state.userDetails.list,
    isInternational:
      history.location.accountSpecDetail &&
      history.location.accountSpecDetail?.isInternational &&
      history.location.accountSpecDetail?.isInternational != null
        ? history.location.accountSpecDetail?.isInternational
        : JSON.parse(localStorage.getItem("hotelData"))?.IsInternational,
  };
  parentContext = useContext(AccountCenterTabsContext);
  const hotelAccountSpecificData = JSON.parse(
    localStorage.getItem("hotelAccountSpecificData")
  );
  const accountStatus =
    (history.location.accountSpecDetail &&
      history.location.accountSpecDetail?.accountStatus) ||
    setQueryParam("accountStatus");
  useEffect(() => {
    getData();
    validateShowRateInclude();
  }, []);
  const getData = () => {
    contextType.setLoader(true);

    reqParam["isLocked"] = hotelAccountSpecificData.isLocked;
    reqParam["isSelected"] = hotelAccountSpecificData.isSelected;
    reqParam["breakinrates"] = hotelAccountSpecificData.breakinrates;
    API.getEligibilityAmenityPriceList(reqParam).then((res) => {
      contextType.setLoader(false);
      contextValue.getEligibilityAmenityPrice(res);
      const hotelspecificData = JSON.parse(
        localStorage.getItem("hotelAccountSpecificData")
      );
    });
  };
  useEffect(() => {
    return () => {
      setEligTickmark("unmount");
    };
  }, []);
  useEffect(() => {
    setLocalEligTick(appContext?.eligibilitiesTick);
  }, [appContext?.eligibilitiesTick]);

  const handleOnAmenityCheck = (i, index, event) => {
    contextValue.handleAmenityCheck(i, index, event);
    setEligTickmark();
  };
  const setEligTickmark = (type?) => {
    type = type ? type : "unmount";
    if (!parentContext.isRebidDeclined) {
      const amenitycheck = amenity_check();
      if (amenitycheck == "complete" || amenitycheck == "continue") {
        if (amenitycheck == "complete") {
          compute_amenitiesstatus("C");
          const prevrebidobj = sessionStorage.getItem("prevRebidStatus");
        }
        contextValue.updateEligibilityAmenityPrice(reqParam, type);
      }
    }
  };
  const amenity_check = () => {
    const bOK = true;
    let amenitycheckstatus;

    if (!bOK) {
      if (appContext.user?.isPASorAnySales) {
        amenitycheckstatus = "continue";
      } else {
        amenitycheckstatus = "failed";
      }
    } else amenitycheckstatus = "complete";

    return amenitycheckstatus;
  };
  const compute_amenitiesstatus = (newstatus) => {
    let curstatusobj = localEligTickRef.current;
    const curstatus = curstatusobj;
    let calcstatus = newstatus;
    let statusstr = "";
    const changedRates = localStorage.getItem("ratesTableValidData")
      ? JSON.parse(localStorage.getItem("ratesTableValidData"))
      : null;
    const ratesStatus = checkRatesStatus(changedRates);
    const changedAmenities = contextValue?.state?.amenityChng;
    const changedQuestions =
      sessionStorage.getItem("changedQuestions") == "false"
        ? false
        : sessionStorage.getItem("changedQuestions") == "true"
        ? true
        : null;
    //const prevrebidobj = sessionStorage.getItem("prevRebidStatus");
    if (parentContext.isRebidDeclined) {
      if (newstatus != "C") {
        calcstatus = curstatus;
      }
    } else {
      if (curstatus != null && curstatus != "") {
        if (newstatus == "C" && curstatus == "R") {
          if (
            !changedAmenities &&
            (!ratesStatus || ratesStatus == null) &&
            (!changedQuestions || changedQuestions == null)
          ) {
            calcstatus = "R";
          } else {
            calcstatus = "C";
          }
        }
      }
      curstatusobj = calcstatus;
    }
    if (calcstatus == "C") {
      statusstr = "complete";
    } else if (calcstatus == "") {
      statusstr = "";
    } else {
      statusstr = "revisit";
      calcstatus = "R";
    }
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    accountCenterTabsContext.eligibilityStatus = calcstatus;
    accountCenterTabsContext.setEligibilityStatus(calcstatus);
    appContext.eligibilitiesTick = calcstatus;
    appContext.setEligibilitiesTick(calcstatus);
    if (
      hotelspecificData?.showrebid === "Y" &&
      (appContext?.user?.isHotelUser ||
        appContext?.user?.isLimitedSalesUser ||
        (appContext?.user?.isSalesUser && appContext.isMarkAsCompleteChecked))
    ) {
      accountCenterTabsContext.ratesRulesStatus = calcstatus;
      accountCenterTabsContext?.setRatesRulesStatus(
        accountCenterTabsContext.ratesRulesStatus
      );
      appContext.rateRulesTick = calcstatus;
      appContext.setRateRulesTick(appContext.rateRulesTick);
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
  useEffect(() => {
    //call the save api, when save button is clicked.
    if (appContext.saveEligibilityStatusClicked) {
      if (appContext.isActiveTab === "eligibilityAmenity") {
        if (contextValue?.state?.handlechangeValue) {
          setEligTickmark("save");
          if (
            appContext.markAsCompleteErrorAlert.show &&
            appContext?.user?.isHotelUser
          ) {
            if (appContext.markAsCompleteErrorAlert.message !== "") {
              alert(appContext.markAsCompleteErrorAlert.message);
            }
          }
        } else {
          if (
            appContext.markAsCompleteErrorAlert.show &&
            appContext?.user?.isHotelUser
          ) {
            if (appContext.markAsCompleteErrorAlert.message !== "") {
              alert(appContext.markAsCompleteErrorAlert.message);
            }
          }
          contextValue.updateEligibilityAmenityPrice(reqParam, "save");
        }
        //contextValue.updateEligibilityAmenityPrice(reqParam);
        appContext.setSaveEligibilityStatusClicked(false);
      }
    }
  }, [appContext.saveEligibilityStatusClicked]);

  const showValidateMirror = () => {
    API.getHotelQuickAuditamenity(reqParam).then((res) => {
      contextValue.getHotelQuickAuditamenityData(res);
      setValidateModal(!validateModal);
    });
  };

  const validateShowRateInclude = () => {
    const isInternational =
      history.location.accountSpecDetail &&
      history.location.accountSpecDetail?.isInternational &&
      history.location.accountSpecDetail?.isInternational != null
        ? history.location.accountSpecDetail?.isInternational
        : JSON.parse(localStorage.getItem("hotelData"))?.IsInternational;
    if (
      isInternational ||
      (appContext.user.isPASorAnySales &&
        hotelAccountSpecificData.breakinrates === "N")
    ) {
      setShowRateIncludes(true);
    } else {
      setShowRateIncludes(false);
    }
  };

  const renderEligibility = (eligItem, index): JSX.Element => {
    if (
      appContext.user.isReadOnly ||
      contextType.state.isLocked === "Y" ||
      (hotelAccountSpecificData.isLocked === "Y" &&
        eligItem.value === "Y" &&
        !appContext.user.isPASorAnySales)
    ) {
      if (eligItem.value == "Y") {
        return <span className={styles.eligibilitySpan}>X</span>;
      }
    } else {
      let ischecked = false;
      if (accountStatus || accountStatus == "") {
        ischecked =
          accountStatus == "L" || accountStatus == "R" || accountStatus == "A"
            ? eligItem.value === "X"
            : eligItem.value === "Y";
      }
      return (
        <input
          type="checkbox"
          id="EligibilityList"
          name="EligibilityList"
          checked={
            ischecked ||
            (!appContext?.user?.isHotelUser && eligItem.value === "Y")
              ? true
              : false
          }
          disabled={parentContext.isRebidDeclined}
          value={eligItem.eligibilityid}
          onChange={(event) =>
            contextValue.handleEligibilityCheck(
              eligItem,
              index,
              event,
              accountStatus
            )
          }
        />
      );
    }
  };

  const renderAmenity = (amenity, index): JSX.Element => {
    if (amenity.amenityid === Settings.AmmInternetHigh) {
      return (
        <input
          type="checkbox"
          id="amenitiesList"
          name="amenitiesList"
          checked={amenity.value == "Y"}
          disabled={
            (amenity.disabled == "Y" && appContext.user.hasLimitedHotels) ||
            parentContext.isRebidDeclined
          }
          onChange={(event) => handleOnAmenityCheck(amenity, index, event)}
        />
      );
    } else if (
      appContext.user.isReadOnly ||
      contextType.state.isLocked == "Y" ||
      (hotelAccountSpecificData.isLocked == "Y" &&
        amenity.value == "Y" &&
        !appContext.user.isPASorAnySales) ||
      (amenity.locked == "Y" && !appContext.user.isPASAdmin)
    ) {
      if (amenity.value == "Y") {
        return <span className={styles.eligibilitySpan}>X</span>;
      }
    } else {
      return (
        <input
          type="checkbox"
          id="amenitiesList"
          name="amenitiesList"
          checked={amenity.value == "Y"}
          disabled={amenity.disabled == "Y" || parentContext.isRebidDeclined}
          onChange={(event) => handleOnAmenityCheck(amenity, index, event)}
        />
      );
    }
  };

  return (
    <AccountCenterTabsContext.Consumer>
      {(statusaccountpricingContext) => {
        contextType = statusaccountpricingContext;
        return (
          <PriceEligibilityAmenityContextProvider>
            <PriceEligibilityAmenityContext.Consumer>
              {(priceeligibilityamenityContext) => {
                contextValue = priceeligibilityamenityContext;
                return (
                  <>
                    <CModal
                      title="Previous Amenities"
                      onClose={showValidateMirror}
                      show={validateModal}
                      closeImgTitle={"Cancel"}
                      xPosition={-200}
                      yPosition={-300}
                      componentName="PriceEligibilityAmenity"
                      class={"previouseminitismodal"}
                    >
                      <div
                        style={{
                          padding: "10px 10px 0",
                        }}
                      >
                        <table
                          cellSpacing={0}
                          cellPadding={0}
                          style={{ border: "0px" }}
                        >
                          <tbody>
                            <tr>
                              <td className={styles.popHeader}>
                                {accountName}
                              </td>
                            </tr>
                            <div className={styles.previousaminities}>
                              {contextValue.state.quickAuditAmenInfo.map(
                                (quickAuditAmenInfo, index) => {
                                  return (
                                    <table
                                      cellSpacing={0}
                                      cellPadding={0}
                                      style={{ border: "0px" }}
                                      key={index}
                                    >
                                      <tbody>
                                        <tr>
                                          {contextValue.state.numAudits ==
                                            1 && (
                                            <td
                                              className={
                                                styles.InstructionHeader
                                              }
                                            >
                                              {
                                                Settings.amenitiesHeader
                                                  .originalCurrent
                                              }
                                            </td>
                                          )}
                                          {contextValue.state.numAudits &&
                                            contextValue.state.numAudits == 2 &&
                                            (quickAuditAmenInfo.quickauditversion ==
                                            1 ? (
                                              <td
                                                className={
                                                  styles.InstructionHeader
                                                }
                                              >
                                                {
                                                  Settings.amenitiesHeader
                                                    .originalPrevious
                                                }
                                              </td>
                                            ) : (
                                              <td
                                                className={
                                                  styles.InstructionHeader
                                                }
                                              >
                                                {
                                                  Settings.amenitiesHeader
                                                    .current
                                                }
                                              </td>
                                            ))}
                                          {contextValue.state.numAudits == 3 &&
                                            (quickAuditAmenInfo?.quickauditversion ==
                                            1 ? (
                                              <td
                                                className={
                                                  styles.InstructionHeader
                                                }
                                              >
                                                {
                                                  Settings.amenitiesHeader
                                                    .original
                                                }
                                              </td>
                                            ) : index == 1 ? (
                                              <td
                                                className={
                                                  styles.InstructionHeader
                                                }
                                              >
                                                {
                                                  Settings.amenitiesHeader
                                                    .previous
                                                }
                                              </td>
                                            ) : (
                                              <td
                                                className={
                                                  styles.InstructionHeader
                                                }
                                              >
                                                {
                                                  Settings.amenitiesHeader
                                                    .current
                                                }
                                              </td>
                                            ))}
                                        </tr>
                                        {quickAuditAmenInfo.last_updatedrates !=
                                          null && (
                                          <tr>
                                            <td>
                                              <table
                                                cellSpacing={0}
                                                cellPadding={0}
                                                style={{ border: "0px" }}
                                              >
                                                <tr>
                                                  <td
                                                    className={styles.fieldName}
                                                  >
                                                    {Settings.LastUpdatedOn}
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.detailsSpacing
                                                    }
                                                  ></td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                  >
                                                    {
                                                      quickAuditAmenInfo.formattedLast_updatedrates
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.detailsSpacing
                                                    }
                                                  ></td>
                                                  {(reqParam.userDetails.user
                                                    ?.isPASAdmin ||
                                                    reqParam.userDetails.user
                                                      ?.isSalesUser) && (
                                                    <>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {Settings.by}
                                                      </td>
                                                      <td
                                                        className={
                                                          styles.detailsSpacing
                                                        }
                                                      ></td>
                                                      <td
                                                        className={
                                                          styles.fieldValue
                                                        }
                                                      >
                                                        {
                                                          quickAuditAmenInfo.last_updaterateseid
                                                        }
                                                      </td>
                                                    </>
                                                  )}
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        )}
                                        {quickAuditAmenInfo.qaamenities
                                          .length != 0 && (
                                          <tr>
                                            <td>
                                              <div
                                                style={{ width: "355px" }}
                                                className={styles.gridHeader}
                                              >
                                                <table
                                                  style={{
                                                    height: "22px",
                                                    border: "0px",
                                                  }}
                                                  className={
                                                    styles.gridRowTable
                                                  }
                                                  cellSpacing={0}
                                                  cellPadding={0}
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <th
                                                        style={{
                                                          width: "355px",
                                                        }}
                                                        colSpan={3}
                                                        className={
                                                          styles.gridCell
                                                        }
                                                      >
                                                        {Settings.Amenities}
                                                      </th>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              <div
                                                style={{ width: "355px" }}
                                                className={styles.gridHeader}
                                              >
                                                <table
                                                  style={{
                                                    height: "25px",
                                                    border: "0px",
                                                  }}
                                                  className={
                                                    styles.gridRowTable
                                                  }
                                                  cellSpacing={0}
                                                  cellPadding={0}
                                                >
                                                  <tbody>
                                                    {quickAuditAmenInfo.qaamenities?.map(
                                                      (l, lIndex) => {
                                                        return (
                                                          <tr
                                                            className={
                                                              styles.gridRow
                                                            }
                                                            key={lIndex}
                                                          >
                                                            <td
                                                              style={{
                                                                width: "30px",
                                                                color:
                                                                  l.valuediff ==
                                                                    "Y" &&
                                                                  "red",
                                                              }}
                                                              className={
                                                                styles.gridCells
                                                              }
                                                            >
                                                              {l.value == "Y"
                                                                ? "Yes"
                                                                : "No"}
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "355px",
                                                                color:
                                                                  l.valuediff &&
                                                                  l.valuediff ==
                                                                    "Y" &&
                                                                  "red",
                                                              }}
                                                              className={
                                                                styles.gridCells
                                                              }
                                                            >
                                                              {
                                                                l.amenitydescription
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </td>
                                          </tr>
                                        )}

                                        {showRateIncludes && (
                                          <tr>
                                            <td>
                                              <div
                                                style={{ width: "355px" }}
                                                className={styles.gridHeader}
                                              >
                                                <table
                                                  style={{
                                                    height: "22px",
                                                    border: "0px",
                                                  }}
                                                  className={
                                                    styles.gridRowTable
                                                  }
                                                  cellSpacing={0}
                                                  cellPadding={0}
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <th
                                                        style={{
                                                          width: "355px",
                                                        }}
                                                        colSpan={3}
                                                        className={
                                                          styles.gridCell
                                                        }
                                                      >
                                                        {
                                                          Settings.IncludedBreakfastAmenities
                                                        }
                                                      </th>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              {quickAuditAmenInfo.qarateincludes
                                                ?.length != 0 &&
                                                (contextValue.state
                                                  .isInternational ||
                                                  (reqParam.userDetails.user
                                                    ?.isPASorAnySales &&
                                                    contextValue.state
                                                      .breakinrates)) && (
                                                  <div
                                                    style={{
                                                      width: "355px",
                                                    }}
                                                    className={
                                                      styles.gridHeader
                                                    }
                                                  >
                                                    <table
                                                      style={{
                                                        height: "25px",
                                                        border: "0px",
                                                      }}
                                                      className={
                                                        styles.gridRowTable
                                                      }
                                                      cellSpacing={0}
                                                      cellPadding={0}
                                                    >
                                                      <tbody>
                                                        {quickAuditAmenInfo.qarateincludes?.map(
                                                          (k, kKey) => {
                                                            return (
                                                              <tr
                                                                className={
                                                                  styles.gridRow
                                                                }
                                                                key={kKey}
                                                              >
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "30px",
                                                                    color:
                                                                      k.valuediff ==
                                                                        "Y" &&
                                                                      "red",
                                                                  }}
                                                                  className={
                                                                    styles.gridCells
                                                                  }
                                                                >
                                                                  {k.value ==
                                                                  "Y"
                                                                    ? "Yes"
                                                                    : "No"}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "355px",
                                                                    color:
                                                                      k.valuediff ==
                                                                        "Y" &&
                                                                      "red",
                                                                  }}
                                                                  className={
                                                                    styles.gridCells
                                                                  }
                                                                >
                                                                  {
                                                                    k.rateincludesdescription
                                                                  }
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                )}
                                            </td>
                                          </tr>
                                        )}
                                        <tr style={{ height: "3em" }}></tr>
                                      </tbody>
                                    </table>
                                  );
                                }
                              )}
                            </div>
                          </tbody>
                        </table>
                      </div>
                    </CModal>
                    <div
                      className={` ${
                        styles.pageLayoutOutter
                      } ${"updatepriceeliami"}`}
                    >
                      {contextType.state.showScreenLoader ? (
                        <img
                          style={{
                            position: "absolute",
                            top: "55%",
                            left: "45%",
                          }}
                          src={screenLoader}
                        />
                      ) : (
                        <div>
                          <div id="tabStatus" className={styles.pageLayout}>
                            <form
                              id="eligibilityAmenForm"
                              name="eligibilityAmenForm"
                              method="post"
                            >
                              <div className={styles.InstructionHeader}>
                                {Settings.Eligibility}
                              </div>
                              <table
                                cellSpacing={0}
                                cellPadding={0}
                                style={{ border: "0px" }}
                              >
                                <tbody>
                                  {contextValue.state.eligibility.map(
                                    (i, index) => {
                                      return (
                                        <>
                                          <tr>
                                            <td
                                              className={`${styles.fieldValue} ${styles.eligibilityListcheck}`}
                                            >
                                              {renderEligibility(i, index)}
                                            </td>
                                            <td
                                              className={styles.eligibilityList}
                                            ></td>
                                            <td className={styles.fieldName}>
                                              {i.eligibilitydescription}
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    }
                                  )}
                                </tbody>
                              </table>
                              <div className={styles.HeaderSpace}></div>
                              <div className={styles.InstructionHeader}>
                                {Settings.FreeComplimentaryAmenities}
                              </div>
                              <div className={styles.instructions}>
                                {Settings.amenityDesc}
                              </div>
                              {contextValue.state.last_updatedamenities !=
                                null && (
                                <div>
                                  <table
                                    cellSpacing={0}
                                    cellPadding={0}
                                    style={{ border: "0px" }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          className={styles.fieldName}
                                          style={{ width: "100px" }}
                                        >
                                          {Settings.LastUpdatedOn}
                                        </td>
                                        <td className={styles.fieldValue}>
                                          {
                                            contextValue.state
                                              .formattedLast_updatedamenities
                                          }
                                        </td>
                                        <td className={styles.detailsSpace}>
                                          {" "}
                                        </td>
                                        {(appContext?.user?.isPASAdmin ||
                                          appContext?.user?.isAdminRole ||
                                          appContext?.user?.isSalesUser ||
                                          appContext?.user
                                            ?.isLimitedSalesUser ||
                                          appContext?.user?.isHotelUser) && (
                                          <>
                                            {appContext?.user?.isHotelUser ||
                                            appContext?.user
                                              ?.isLimitedSalesUser ? null : (
                                              <>
                                                {" "}
                                                <td
                                                  className={styles.fieldName}
                                                >
                                                  {Settings.by}
                                                </td>
                                                <td
                                                  className={
                                                    styles.detailsSpacing
                                                  }
                                                ></td>
                                                <td
                                                  className={styles.fieldValue}
                                                >
                                                  {
                                                    contextValue.state
                                                      .lastupateameneid
                                                  }
                                                </td>
                                                <td
                                                  className={
                                                    styles.detailsSpace
                                                  }
                                                >
                                                  {" "}
                                                </td>
                                                <td
                                                  className={styles.fieldName}
                                                >
                                                  {Settings.Email}
                                                </td>
                                                <td
                                                  className={
                                                    styles.detailsSpacing
                                                  }
                                                ></td>
                                                <td
                                                  className={styles.fieldValue}
                                                >
                                                  {
                                                    contextValue.state
                                                      .lastupateameneemail
                                                  }
                                                </td>
                                              </>
                                            )}
                                            <td className={styles.detailsSpace}>
                                              {" "}
                                            </td>

                                            {contextValue.state
                                              .AccountSpecificamenity
                                              .isSelected == "Y" && (
                                              <td className={styles.fieldName}>
                                                <a
                                                  href="javascript:void(0);"
                                                  onClick={showValidateMirror}
                                                  style={{
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  Previous Amenities
                                                </a>
                                              </td>
                                            )}
                                          </>
                                        )}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                              <div>
                                <table
                                  cellSpacing={0}
                                  cellPadding={0}
                                  style={{ border: "0px" }}
                                >
                                  <tbody>
                                    <div style={{ width: "600px" }}>
                                      <div
                                        style={{ float: "left", width: "45%" }}
                                      >
                                        {contextValue.state.amenities.map(
                                          (i, index) => {
                                            const dataLength =
                                              contextValue.state.amenities
                                                .length / 2;
                                            if (index < dataLength) {
                                              return (
                                                <>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.fieldName
                                                      }
                                                    >
                                                      {renderAmenity(i, index)}
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
                                                      {i.amenitydescription}
                                                    </td>
                                                  </tr>
                                                </>
                                              );
                                            }
                                          }
                                        )}
                                      </div>
                                      <div>
                                        {contextValue.state.amenities.map(
                                          (i, index) => {
                                            const datalength =
                                              contextValue.state.amenities
                                                .length / 2;
                                            if (index >= datalength) {
                                              return (
                                                <>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.fieldName
                                                      }
                                                    >
                                                      {renderAmenity(i, index)}
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
                                                      {i.amenitydescription}
                                                    </td>
                                                  </tr>
                                                </>
                                              );
                                            }
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </tbody>
                                </table>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              }}
            </PriceEligibilityAmenityContext.Consumer>
            <style>{`
            .previouseminitismodal div:last-child{
              padding-bottom:10px;
            }
            `}</style>
          </PriceEligibilityAmenityContextProvider>
        );
      }}
    </AccountCenterTabsContext.Consumer>
  );
}
export default PriceEligibilityAmenity;
