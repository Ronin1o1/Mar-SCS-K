import React, {
 
  useEffect,
  useState,
  useContext,
} from "react";
import styles from "./accBTOverview.css";
import accBTOverviewContext, {
  AccBTOverviewContextProvider,
} from "../context/accBTOverviewContext";
import CModal from "../../../../../common/components/CModal";

import Settings from "../static/Settings";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import { Layout } from "../../../routing/Layout";
import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../../../context/salesAdministartionContextProvider";
import { useLocation } from "react-router-dom";
import accBTOverviewApi from "../service/accBTOverviewApi";
import Utils from "../../../../../common/utils/Utils";
import UtilsShared from "../../../shared/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
let contextType = null;
let parentContextType = null;

const accBTOverview = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const RecID = new URLSearchParams(urlParms).get("accountrecid");
  const yearSel = new URLSearchParams(urlParms).get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");
  const noDataObj = {
    duedate: "",
    hasAccounts: "",
    longDueDate: "No CBC’s Accepted",
    period: "",
    pricingperiodid: "",
    shortDueDate: "01/31/9999",
  };
  useEffect(() => {
    contextType.state.showScreenLoader = true;
    accBTOverviewApi.getOverViewData(RecID, yearSel, accname).then((data) => {
      contextType.state.showScreenLoader = false;
      // data.pricingPeriodList.push(noDataObj);
      contextType.setLoadingOverViewData(data);

      setlastUpdateDateValue(data.lLastupdatedate);
      if (
        appContext?.user?.isSalesUser ||
        appContext?.user?.isLimitedSalesUser
      ) {
        contextType.mandatoryCheck();
      }
    });

    contextType.setInitialUserData();

    return () => {
      if (
        appContext?.user?.isSalesUser ||
        appContext?.user?.isLimitedSalesUser
      ) {
        UpdateAccountOverviewData();
      } else {
        updateAccountOverviewNavigate();
      }
    };
  }, []);

  useEffect(() => {
    if (appContext.navbarClicked) {
      contextType.setState({
        ...contextType.state,
        validateModal: false,
      });
    }
  }, [appContext.navbarClicked]);

  const handleInputValidation = (e, field) => {
    let updatePrimaryList = contextType.state;
    updatePrimaryList = UtilsShared.checkOverviewValidation(
      e,
      field,
      updatePrimaryList
    );
    contextType.setData(updatePrimaryList);
    if (appContext?.user?.isSalesUser || appContext?.user?.isLimitedSalesUser) {
      contextType.mandatoryCheck();
    }
  };

  const handleTabInputValidation = (e, fieldName) => {
    let UpdatedFieldVal = contextType.state;
    UpdatedFieldVal = UtilsShared.checkInputOverviewValidation(
      e,
      fieldName,
      UpdatedFieldVal
    );
    if (UpdatedFieldVal) {
      contextType.setData(UpdatedFieldVal);
    } else {
      contextType.setValidationFunc(
        Settings.accountBTOverviewDetails.AlertRangeMessage
      );
      appContext.setPreventNavigationOnce(true);
    }
    if (appContext?.user?.isSalesUser || appContext?.user?.isLimitedSalesUser) {
      contextType.mandatoryCheck();
    }
  };
  const UpdateAccountOverviewData = () => {
    const validatedUserValidations = contextType.checkUserValidation();

    if (validatedUserValidations) {
      contextType.setLoader(true);
      contextType.updateValue(RecID, yearSel, accname);
      setTimeout(() => {
        contextType.setLoader(false);
        // window.location.reload();
        accBTOverviewApi
          .getOverViewData(RecID, yearSel, accname)
          .then((data) => {
            //data.pricingPeriodList.push(noDataObj);
            contextType.setLoadingOverViewData(data);

            setlastUpdateDateValue(data.lLastupdatedate);
          });
      }, 1000);
    }
  };

  const updateAccountOverviewNavigate = () => {
    const validatedUserValidations = contextType.checkUserValidation();
    if (validatedUserValidations) {
      contextType.setLoader(true);
      contextType.updateValue(RecID, yearSel, accname);
      setTimeout(() => {
        contextType.setLoader(false);
        // window.location.reload();
        accBTOverviewApi
          .getOverViewData(RecID, yearSel, accname)
          .then((data) => {
            // data.pricingPeriodList.push(noDataObj);
            contextType.setLoadingOverViewData(data);

            setlastUpdateDateValue(data.lLastupdatedate);
          });
      }, 1000);
    } else {
      //contextType.setLoader(true);
      contextType.updateValue(RecID, yearSel, accname);
      setTimeout(() => {
        contextType.setLoader(false);
        // window.location.reload();
        accBTOverviewApi
          .getOverViewData(RecID, yearSel, accname)
          .then((data) => {
            // data.pricingPeriodList.push(noDataObj);
            contextType.setLoadingOverViewData(data);

            setlastUpdateDateValue(data.lLastupdatedate);
          });
      }, 1000);
    }
  };

  const handleDropdownSelection = (e, fieldName) => {
    const UpdatedField = contextType.state;
    if (e.target.value != "") {
      UpdatedField[fieldName] = e.target.value;
    } else {
      UpdatedField[fieldName] = null;
    }
    contextType.setData(UpdatedField);
    if (appContext?.user?.isSalesUser || appContext?.user?.isLimitedSalesUser) {
      contextType.mandatoryCheck();
    }
  };

  return (
    <SalesAdministartionContext.Consumer>
      {(SalesAdministartionContext) => {
        parentContextType = SalesAdministartionContext;

        return (
          <Layout
            IsDataUpdate={
              appContext?.user?.isPASAdmin || appContext?.user?.isSAPPAdmin
                ? updateAccountOverviewNavigate
                : UpdateAccountOverviewData
            }
            getlastUpdateDate={lastUpdateDateValue}
            onUpdateValue={lastUpdateDateValueonUpdate}
          >
            <AccBTOverviewContextProvider>
              <accBTOverviewContext.Consumer>
                {(accBTProfileInfoListContext) => {
                  contextType = accBTProfileInfoListContext;

                  return (
                    <React.Fragment>
                      <CModal
                        title="Alert Message"
                        onClose={contextType.ShowValidateModel}
                        show={contextType.state.validateModal}
                        xPosition={-100}
                        yPosition={-120}
                        closeImgTitle={"OK - Close Message Box"}
                        class="customModal"
                        overlayHeight={Math.max(
                          document.body.scrollHeight,
                          document.body.offsetHeight,
                          document.documentElement.clientHeight,
                          document.documentElement.scrollHeight,
                          document.documentElement.offsetHeight
                        )}
                        overlayTopPosition={"-79px"}
                      >
                        <div className={styles.BTprofileAlert}>
                          {contextType.state.message}
                        </div>
                      </CModal>

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
                          <table className={styles.MainTable}>
                            <tbody>
                              <tr>
                                <td valign="top">
                                  <div
                                    id="overlayscreen"
                                    className={styles.OverlayScreenBTProfile}
                                  >
                                    <div className={styles.overlayDiv}>
                                      <img src={screenLoader} />
                                    </div>
                                  </div>

                                  <form
                                    name="thisForm"
                                    id="thisForm"
                                    method="post"
                                    autoComplete="off"
                                  >
                                    <table className={styles.menuWdth100}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.formTable}>
                                            <table className="zero-Height">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    colSpan={2}
                                                    className="nowrapCell"
                                                  >
                                                    <i>
                                                      <span
                                                        className={
                                                          styles.colorClass
                                                        }
                                                      >
                                                        {
                                                          Settings
                                                            .accountBTOverviewDetails
                                                            .RequiredField
                                                        }
                                                      </span>
                                                    </i>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.GppAccountColumn
                                                    }
                                                  >
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td colSpan={2}>
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .BookingToolTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .BookingToolTitle
                                                            }{" "}
                                                          </td>
                                                          <td
                                                            style={{
                                                              height: "20px",
                                                            }}
                                                            className="field_Value nowrapCell"
                                                          >
                                                            <select
                                                              name="acctOverviewBTReqs.online_solut_util"
                                                              id="acctOverviewBTReqs.online_solut_util"
                                                              size={1}
                                                              defaultValue={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  .online_solut_util
                                                              }
                                                              onChange={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "online_solut_util"
                                                                );
                                                              }}
                                                              onBlur={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "online_solut_util"
                                                                );
                                                              }}
                                                            >
                                                              <option value="" />
                                                              <option
                                                                value="Y"
                                                                selected={
                                                                  contextType
                                                                    .state
                                                                    .online_solut_util ===
                                                                  "Y"
                                                                    ? true
                                                                    : false
                                                                }
                                                              >
                                                                Yes
                                                              </option>
                                                              <option
                                                                value="N"
                                                                selected={
                                                                  contextType
                                                                    .state
                                                                    .online_solut_util ===
                                                                  "N"
                                                                    ? true
                                                                    : false
                                                                }
                                                              >
                                                                No
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>

                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .onl_bkg_tool
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .onl_bkg_tool
                                                            }
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              size={50}
                                                              maxLength={50}
                                                              name="acctOverviewBTReqs.onl_bkg_tool"
                                                              id="acctOverviewBTReqs.onl_bkg_tool"
                                                              defaultValue={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  .acctOverviewBTReqs
                                                                  ?.onl_bkg_tool
                                                              }
                                                              value={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  .onl_bkg_tool
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "onl_bkg_tool"
                                                                );
                                                              }}
                                                              onBlur={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "onl_bkg_tool"
                                                                );
                                                              }}
                                                            ></input>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .adopt_rate_bkg_tool_tip
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .adopt_rate_bkg_tool
                                                            }{" "}
                                                          </td>

                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              style={{
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              type="text"
                                                              name="acctOverviewBTReqs.adopt_rate_bkg_tool"
                                                              id="acctOverviewBTReqs.adopt_rate_bkg_tool"
                                                              size={3}
                                                              maxLength={3}
                                                              defaultValue={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.adopt_rate_bkg_tool
                                                              }
                                                              value={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.adopt_rate_bkg_tool
                                                              }
                                                              onKeyPress={
                                                                Utils.NumberOnly_onkeypress
                                                              }
                                                              className="Field_Number"
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "adopt_rate_bkg_tool"
                                                                );
                                                              }}
                                                              onBlur={(e) => {
                                                                handleTabInputValidation(
                                                                  e,
                                                                  "adopt_rate_bkg_tool"
                                                                );
                                                              }}
                                                            ></input>
                                                            %
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .relocat_intermediary_tip
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .relocat_intermediary
                                                            }
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              size={50}
                                                              maxLength={50}
                                                              name="acctOverviewBTReqs.relocat_intermediary"
                                                              id="acctOverviewBTReqs.relocat_intermediary"
                                                              defaultValue={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.acctOverviewBTReqs
                                                                  ?.relocat_intermediary
                                                              }
                                                              value={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.relocat_intermediary
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "relocat_intermediary"
                                                                );
                                                              }}
                                                              onBlur={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "relocat_intermediary"
                                                                );
                                                              }}
                                                            ></input>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .pref_hotel_tip
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .pref_hotel
                                                            }
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              size={100}
                                                              maxLength={150}
                                                              name="acctOverviewBTReqs.pref_hotel"
                                                              id="acctOverviewBTReqs.pref_hotel"
                                                              defaultValue={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.acctOverviewBTReqs
                                                                  ?.pref_hotel
                                                              }
                                                              value={
                                                                "" ||
                                                                contextType
                                                                  .state
                                                                  ?.pref_hotel
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "pref_hotel"
                                                                );
                                                              }}
                                                              onBlur={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "pref_hotel"
                                                                );
                                                              }}
                                                            ></input>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .competitors_bybrand_tip
                                                          }
                                                          align="left"
                                                        >
                                                          {
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .competitors_bybrand
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.competitors_bybrand"
                                                            id="acctOverviewBTReqs.competitors_bybrand"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "competitors_bybrand"
                                                              );
                                                            }}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "competitors_bybrand"
                                                              );
                                                            }}
                                                            onKeyPress={(e) => {
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1024
                                                              );
                                                            }}
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1024
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                .acctOverviewBTReqs
                                                                .competitors_bybrand
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                .competitors_bybrand
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .org_buying_struct_tip
                                                          }
                                                          align="left"
                                                        >
                                                          <span
                                                            className={
                                                              styles.colorClass
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .org_buying_struct
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.org_buying_struct"
                                                            id="acctOverviewBTReqs.org_buying_struct"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "org_buying_struct"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "org_buying_struct"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1024
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1024
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.org_buying_struct
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.org_buying_struct
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .policies_tip
                                                          }
                                                          align="left"
                                                        >
                                                          {
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .policies
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.policies"
                                                            id="acctOverviewBTReqs.policies"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "policies"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "policies"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1024
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1024
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.policies
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.policies
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .reservationstext_tip
                                                          }
                                                          align="left"
                                                        >
                                                          <span
                                                            className={
                                                              styles.colorClass
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .reservationstext
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.reservationstext"
                                                            id="acctOverviewBTReqs.reservationstext"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "reservationstext"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "reservationstext"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1250
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1250
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.reservationstext
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.reservationstext
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>

                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .requiretext_tip
                                                          }
                                                          align="left"
                                                        >
                                                          <span
                                                            className={
                                                              styles.colorClass
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .requiretext
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.requiretext"
                                                            id="acctOverviewBTReqs.requiretext"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "requiretext"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "requiretext"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1250
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1250
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.requiretext
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.requiretext
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .requesttext_tip
                                                          }
                                                          align="left"
                                                        >
                                                          {
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .requesttext
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.requesttext"
                                                            id="acctOverviewBTReqs.requesttext"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "requesttext"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "requesttext"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1250
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1250
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.requesttext
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.requesttext
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>

                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <table>
                                                            <tr>
                                                              <td
                                                                className="field_Name nowrapCell"
                                                                align="left"
                                                              >
                                                                <span
                                                                  className={
                                                                    styles.colorClass
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .accountBTOverviewDetails
                                                                      .busRequiremnts
                                                                  }
                                                                </span>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "150px",
                                                                }}
                                                              ></td>
                                                              <td className="field_Name">
                                                                <span
                                                                  className={
                                                                    styles.colorClass
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .accountBTOverviewDetails
                                                                      .dueDate
                                                                  }
                                                                </span>
                                                              </td>
                                                              <td>
                                                                <select
                                                                  id="acctOverviewBTReqs.strCbc_softduedate"
                                                                  name="acctOverviewBTReqs.strCbc_softduedate"
                                                                  style={{
                                                                    width:
                                                                      "135px",
                                                                  }}
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    handleDropdownSelection(
                                                                      e,
                                                                      "shortCbc_softduedate"
                                                                    );
                                                                  }}
                                                                >
                                                                  {contextType.state?.pricingPeriodList.map(
                                                                    (
                                                                      formatItem
                                                                    ) => {
                                                                      return (
                                                                        <>
                                                                          <option
                                                                            value={
                                                                              formatItem.shortDueDate
                                                                            }
                                                                            selected={
                                                                              formatItem.shortDueDate ===
                                                                                contextType
                                                                                  .state
                                                                                  .cbc ||
                                                                              formatItem.shortDueDate ===
                                                                                contextType
                                                                                  .state
                                                                                  ?.acctOverviewBTReqs
                                                                                  ?.shortCbc_softduedate
                                                                                ? true
                                                                                : false
                                                                            }
                                                                          >
                                                                            {
                                                                              formatItem.longDueDate
                                                                            }
                                                                          </option>
                                                                        </>
                                                                      );
                                                                    }
                                                                  )}
                                                                </select>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          align="left"
                                                        >
                                                          <span
                                                            className={
                                                              styles.colorClass
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .notestext_existinghotel
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.notestext_existinghotel"
                                                            id="acctOverviewBTReqs.notestext_existinghotel"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "notestext_existinghotel"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "notestext_existinghotel"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1500
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1500
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.notestext_existinghotel
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.notestext_existinghotel
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>

                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          align="left"
                                                        >
                                                          {" "}
                                                          <span
                                                            className={
                                                              styles.colorClass
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTOverviewDetails
                                                                .notestext_preopeninghotel
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.notestext_preopeninghotel"
                                                            id="acctOverviewBTReqs.notestext_preopeninghotel"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "notestext_preopeninghotel"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "notestext_preopeninghotel"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1500
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1500
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.notestext_preopeninghotel
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.notestext_preopeninghotel
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                    </table>

                                                    <table
                                                      className={
                                                        styles.menuWdth100
                                                      }
                                                    >
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fieldNameLabel
                                                          }
                                                          title={
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .roomtypetext_tip
                                                          }
                                                          align="left"
                                                        >
                                                          {
                                                            Settings
                                                              .accountBTOverviewDetails
                                                              .roomtypetext
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td className="field_Name nowrapCell">
                                                          <textarea
                                                            name="acctOverviewBTReqs.roomtypetext"
                                                            id="acctOverviewBTReqs.roomtypetext"
                                                            className={
                                                              styles.textAreaCs
                                                            }
                                                            style={{}}
                                                            rows={4}
                                                            cols={188}
                                                            onChange={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "roomtypetext"
                                                              );
                                                            }}
                                                            onBlur={(e) => {
                                                              handleInputValidation(
                                                                e,
                                                                "roomtypetext"
                                                              );
                                                            }}
                                                            onKeyPress={(e) =>
                                                              Utils.checklen_onkeypress(
                                                                e,
                                                                1000
                                                              )
                                                            }
                                                            // onPaste={(e) =>
                                                            //   Utils.checklenchar_onpaste_quest(
                                                            //     e,
                                                            //     1000
                                                            //   )
                                                            // }
                                                            defaultValue={
                                                              "" ||
                                                              contextType.state
                                                                ?.acctOverviewBTReqs
                                                                ?.roomtypetext
                                                            }
                                                            value={
                                                              "" ||
                                                              contextType.state
                                                                ?.roomtypetext
                                                            }
                                                          ></textarea>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                        <td>&nbsp;</td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                  <td>&nbsp;</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </form>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </React.Fragment>
                  );
                }}
              </accBTOverviewContext.Consumer>
            </AccBTOverviewContextProvider>
            <style>{`
          .container{
            min-width:1100px;
          }
        `}</style>
          </Layout>
        );
      }}
    </SalesAdministartionContext.Consumer>
  );
};

export default accBTOverview;
