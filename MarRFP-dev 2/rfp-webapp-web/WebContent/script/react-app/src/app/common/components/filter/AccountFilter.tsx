import React, { Fragment, useEffect, useState } from "react";
import styles from "./Filter.css";
import { FilterAccountrateProgram } from "./FilterAccountrateProgram";

export function AccountFilter(props: any) {
  const payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_accountstatus =
    payLoad !== undefined && payLoad !== false && payLoad !== null
      ? payLoad?.strFilterValues?.accountFilter?.accountstatus
      : "";
  const session_segment_type =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.accountFilter?.accountType
      : "";
  const session_account =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.accountFilter?.accountrecid
      : "";
  const finalYear =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.year
      : "";
  const [accountStatusChange, setAccountStatusChange] = useState(false);
  const [showAccountSection, setAccountSection] = useState(false);
  const [displayAccountFlags, setDisplayAccountFlags] = useState(true);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const showOptions = props.showOptions?.pfo?.showOptions;
  const getAccountSegmentList = () => {
    return props.filterContext.accountSegments?.map((item, key) => {
      return (
        <option key={key} value={item.accounttype}>
          {item.accounttypedescription}
        </option>
      );
    });
  };

  const getAccountSubsetsList = () => {
    return props.filterContext.accountSubsets?.map((item, key) => {
      return (
        <option key={key} value={item.regionid}>
          {item.regionname}
        </option>
      );
    });
  };

  const getAccountList = () => {
    if (props.filterContext.accountFilter.searchaccounttype !== 0) {
      return props.filterContext.accountLists?.map((item, key) => {
        return (
          <option key={key} value={item.accountrecid}>
            {item.accountname}
          </option>
        );
      });
    }
  };

  const selectedAccount = (e) => {
    const value = props.filterContext.accountLists?.filter(function (item) {
      return item.accountrecid == e;
    });

    if (value.length > 0) {
      if (props.isUpdateMultiple) {
        localStorage.setItem("accNameUpdateHotel", value[0].accountname);
      }
      sessionStorage.setItem("accRecIdUpdateHotel", value[0].accountrecid);
    } else {
      sessionStorage.setItem("accRecIdUpdateHotel", "0");
    }
  };

  useEffect(() => {
    if (
      props.componentName === "PortfolioSelection" ||
      props.componentName === "portfolioOrganization"
    ) {
      selectedAccount(0);
      props.filterContext.setIsDataChange(true);
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          accountFilter: {
            ...props.filterContext.requestPayload.strFilterValues.accountFilter,
            // subset: "",
          },
        },
      });
    } else {
      selectedAccount(0);
      props.filterContext.setIsDataChange(true);
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          accountFilter: {
            ...props.filterContext.requestPayload.strFilterValues.accountFilter,
            subset: "",
          },
        },
      });
    }
  }, [props?.filterContext?.accountLists]);

  useEffect(() => {
    if (props?.componentName == "hotelPropertyList") {
      const acctype =
        props?.filterContext?.requestPayload?.strFilterValues?.accountFilter
          ?.accountType || "";
      const year =
        props?.filterContext?.requestPayload?.strFilterValues?.year || "";
      if (
        props.filterContext?.requestPayload?.strFilterValues?.accountFilter
          ?.accountstatus &&
        props.filterContext?.requestPayload?.strFilterValues?.accountFilter
          ?.accountstatus != "ALL"
      ) {
        props.filterContext.getAccountLists(acctype, year);
      }
    }
    if (props?.componentName == "portfolioRebid") {
      props.filterContext.setAccountStatus(
        props.filterContext.requestPayload?.strFilterValues?.accountFilter
          ?.accountstatus
      );
    }
  }, [
    props.filterContext.requestPayload?.strFilterValues?.accountFilter
      ?.accountstatus,
  ]);

  useEffect(() => {
    if (props?.componentName == "hotelPropertyList") {
      if (
        props.filterContext?.requestPayload?.strFilterValues?.accountFilter
          ?.accountstatus &&
        props.filterContext?.requestPayload?.strFilterValues?.accountFilter
          ?.accountstatus != "ALL"
      ) {
        props.filterContext.getAccountLists();
      }
    } else {
      props.filterContext.getAccountLists();
    }

    if (showOptions?.showAccountFlags == false) {
      setAccountSection(true);
    }

    if (showOptions?.showByAccountorByHotel == false) {
      setDisplayAccountFlags(true);
    }
  }, [
    props.filterContext.filterViewLists,
    props.showOptions,
    props.isShowAccountOnly,
  ]);

  useEffect(() => {
    if (props) {
      if (props.isShowAccountOnly) {
        setAccountSection(true);
      } else if (props.isUpdateMultiple) {
        setAccountSection(!props.isUpdateMultiple);
      }
    }
  }, [showAccountSection, props.isShowAccountOnly]);

  useEffect(() => {
    if (
      props.filterContext.reportDetails &&
      props.filterContext?.reportDetails[0] &&
      (props.filterContext.reportDetails[0]?.allow_account_eligible === "N" ||
        props.filterContext.reportDetails?.allow_cbchotels === "N")
    ) {
      let accountStatusValue =
        props.filterContext.requestPayload.strFilterValues?.accountFilter;
      let accountTypeValue = "";
      let accountValue = "0";
      let subsetValue = "";

      if (accountStatusValue) {
        if (
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "C" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "E"
        ) {
          if (
            props.filterContext?.reportDetails[0].report_title == "PDR (PDF)" &&
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountstatus == "C"
          ) {
            accountStatusValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountstatus;
            accountTypeValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountType;
            accountValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountrecid;
            subsetValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.subset;
            setAccountSection(true);
          } else {
            accountStatusValue = "ALL";
            accountTypeValue = "";
            accountValue = "0";
            subsetValue = "";
            setAccountSection(false);
          }
        } else {
          accountStatusValue =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountstatus;
          if (accountStatusValue == "ALL") {
            accountTypeValue = "";
            accountValue = "0";
            subsetValue = "";
            setAccountSection(false);
          } else {
            accountTypeValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountType;
            accountValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountrecid;
            subsetValue =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.subset;
            setAccountSection(true);
          }
        }
      } else {
        accountStatusValue = "ALL";
        accountTypeValue = "";
        accountValue = "0";
        subsetValue = "";
        setAccountSection(false);
      }

      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          accountFilter: {
            ...props.filterContext.requestPayload.strFilterValues.accountFilter,
            accountstatus: accountStatusValue,
            accountType: accountTypeValue,
            accountrecid: accountValue,
            subset: subsetValue,
          },
        },
      });
      sessionStorage.setItem("accRecIdUpdateHotel", accountValue);
    } else if (
      props.filterContext.reportDetails &&
      props.filterContext?.reportDetails[0] &&
      (props.filterContext.reportDetails[0]?.allow_account_eligible === "Y" ||
        props.filterContext.reportDetails?.allow_cbchotels === "Y")
    ) {
      let accountStatusValue_AllowEligible_Account =
        props.filterContext.requestPayload.strFilterValues?.accountFilter;
      let accountTypeValue_AllowEligible = "";
      let accountValue_AllowEligible = "0";
      let subsetValue_AllowEligible = "";

      if (accountStatusValue_AllowEligible_Account) {
        if (
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "E" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "V" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "SOL" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "S" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "PEN" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "REJ" ||
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus == "A"
        ) {
          accountStatusValue_AllowEligible_Account =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountstatus;
          accountTypeValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountType;
          accountValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountrecid;
          subsetValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.subset;
          setAccountSection(true);
        } else if (
          props.filterContext?.reportDetails[0].report_title ==
          "Account Summary (Excel)"
        ) {
          accountStatusValue_AllowEligible_Account =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountstatus;
          if (accountStatusValue_AllowEligible_Account == "ALL") {
            accountTypeValue_AllowEligible = "";
            accountValue_AllowEligible = "0";
            subsetValue_AllowEligible = "";
            setAccountSection(false);
          } else {
            accountTypeValue_AllowEligible =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountType;
            accountValue_AllowEligible =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.accountrecid;
            subsetValue_AllowEligible =
              props.filterContext.requestPayload.strFilterValues?.accountFilter
                ?.subset;
            setAccountSection(true);
          }
        } else {
          accountStatusValue_AllowEligible_Account = "ALL";
          accountTypeValue_AllowEligible = "";
          accountValue_AllowEligible = "0";
          subsetValue_AllowEligible = "";
          setAccountSection(false);
        }
      } else {
        accountStatusValue_AllowEligible_Account =
          props.filterContext.requestPayload.strFilterValues?.accountFilter
            ?.accountstatus;
        if (accountStatusValue_AllowEligible_Account == "ALL") {
          accountTypeValue_AllowEligible = "";
          accountValue_AllowEligible = "0";
          subsetValue_AllowEligible = "";
          setAccountSection(false);
        } else {
          accountTypeValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountType;
          accountValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.accountrecid;
          subsetValue_AllowEligible =
            props.filterContext.requestPayload.strFilterValues?.accountFilter
              ?.subset;
          setAccountSection(true);
        }
      }

      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          accountFilter: {
            ...props.filterContext.requestPayload.strFilterValues.accountFilter,
            accountstatus: accountStatusValue_AllowEligible_Account,
            accountType: accountTypeValue_AllowEligible,
            accountrecid: accountValue_AllowEligible,
            subset: subsetValue_AllowEligible,
          },
        },
      });
      sessionStorage.setItem("accRecIdUpdateHotel", accountValue_AllowEligible);
    }
  }, [props.filterContext.reportDetails]);

  return (
    <div id="accountFilter" style={{ display: "" }}>
      {showOptions?.showByAccountorByHotel && (
        <tr>
          <td>
            <table className="zero-Height">
              <tr>
                <td className="field_Name nowrapCell">By</td>
                <td className="ediereq">
                  <td
                    className={`${
                      props.isUpdateMultiple
                        ? styles.updateAccountStatusWrap
                        : styles.nowrapCell
                    }`}
                  >
                    <input
                      id="filterValues.byAccountorByHotel"
                      name="filterValues.byAccountorByHotel"
                      type="radio"
                      className={styles.margin3}
                      value="A"
                      defaultChecked
                      onChange={(event) => {
                        setDisplayAccountFlags(true);
                        props.filterContext.setRequestPayload({
                          ...props.filterContext.requestPayload,
                          strFilterValues: {
                            ...props.filterContext.requestPayload
                              .strFilterValues,
                            accountFilter: {
                              ...props.filterContext.requestPayload
                                .strFilterValues.accountFilter,
                              accountstatus: "ALL",
                              accountType: "",
                              accountrecid: "0",
                              subset: "",
                            },
                          },
                        });
                      }}
                    />
                    Account
                  </td>
                  <td
                    className={`${
                      props.isUpdateMultiple
                        ? styles.updateAccountStatusWrap
                        : styles.nowrapCell
                    }`}
                  >
                    <input
                      id="filterValues.byAccountorByHotel"
                      name="filterValues.byAccountorByHotel"
                      type="radio"
                      className={styles.margin3}
                      value="H"
                      onChange={(event) => {
                        setDisplayAccountFlags(false);
                        setAccountSection(false);
                        sessionStorage.removeItem("accRecIdUpdateHotel");
                        props.filterContext.setRequestPayload({
                          ...props.filterContext.requestPayload,
                          strFilterValues: {
                            ...props.filterContext.requestPayload
                              .strFilterValues,
                            accountFilter: {
                              ...props.filterContext.requestPayload
                                .strFilterValues.accountFilter,
                              accountstatus: "ALL",
                              accountType: "",
                              accountrecid: "0",
                              subset: "",
                            },
                          },
                        });
                      }}
                    />
                    Hotel
                  </td>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      )}

      {displayAccountFlags && (
        <table className={styles.menuWdth100Height}>
          <tbody
            style={{
              borderTop: props?.isUpdateMultiple ? "none" : "thin groove",
            }}
          >
            {!props.isUpdateMultiple && (
              <tr>
                <td className={styles.field_Name_bold}>Account</td>
              </tr>
            )}
            {!props?.isShowAccountOnly &&
              !props.isHotelUser &&
              (showOptions?.showAccountFlags || props.showAccountFlags) && (
                <table
                  className={`${styles.zeroHeight} field_Name ${
                    props.isUpdateMultiple
                      ? "tdBlock, updateaccountfilter"
                      : "nonTdBlock"
                  }`}
                  style={{ width: props.isUpdateMultiple ? "100%" : "95%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                        style={{
                          paddingLeft:
                            props.componentName === "UpdateMultipleHotels" &&
                            "4px",
                        }}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          value="ALL"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "ALL"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "ALL"
                                : session_accountstatus === "ALL"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "ALL"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(false);
                            selectedAccount("0");
                            props.isUpdateMultiple
                              ? props.filterContext.setRequestPayload({
                                  ...props.filterContext.requestPayload,
                                  strFilterValues: {
                                    ...props.filterContext.requestPayload
                                      .strFilterValues,
                                    accountFilter: {
                                      ...props.filterContext.requestPayload
                                        .strFilterValues.accountFilter,
                                      accountstatus: event.target.value,
                                    },
                                  },
                                })
                              : props.filterContext.setRequestPayload({
                                  ...props.filterContext.requestPayload,
                                  strFilterValues: {
                                    ...props.filterContext.requestPayload
                                      .strFilterValues,
                                    accountFilter: {
                                      ...props.filterContext.requestPayload
                                        .strFilterValues.accountFilter,
                                      accountstatus: event.target.value,
                                      accountType: "",
                                      accountrecid: "0",
                                      subset: "",
                                    },
                                  },
                                });
                          }}
                        />
                        All
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                        style={{
                          paddingLeft:
                            props.componentName === "UpdateMultipleHotels" &&
                            "4px",
                        }}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          value="V"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "V"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "V"
                                : session_accountstatus === "V"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "V"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        VP
                      </td>
                      <td style={{ width: "10" }}></td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          value="SOL"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "SOL"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "SOL"
                                : session_accountstatus === "SOL"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "SOL"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Solicited
                      </td>
                      <td style={{ width: "10" }}></td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          style={{ margin: "3px" }}
                          value="S"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "S"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "S"
                                : session_accountstatus === "S"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "S"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Presented
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                        style={{
                          paddingLeft:
                            props.componentName === "UpdateMultipleHotels" &&
                            "4px",
                        }}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          style={{ margin: "3px" }}
                          value="PEN"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "PEN"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "PEN"
                                : session_accountstatus === "PEN"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "PEN"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Pending
                      </td>
                      <td style={{ width: "10" }}></td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          style={{ margin: "3px" }}
                          value="REJ"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "REJ"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "REJ"
                                : session_accountstatus === "REJ"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "REJ"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Rejected
                      </td>
                      <td style={{ width: "10" }}></td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          style={{ margin: "3px" }}
                          value="A"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "A"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "A"
                                : session_accountstatus === "A"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "A"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Accepted
                      </td>
                    </tr>
                    {props.componentName === "UpdateMultipleHotels" &&
                    <tr>
                    <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                        style={{
                          paddingLeft:
                            "4px",
                        }}
                      >
                        <input
                          id="filterValues.accountFilter.accountstatus"
                          name="filterValues.accountFilter.accountstatus"
                          type="radio"
                          className={styles.margin3}
                          value="SOLNB"
                          checked={
                            props.isUpdateMultiple
                              ? props.filterContext?.updateMutipleRequestEvents
                                  ?.accountStatusChangeEvent
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "SOLNB"
                                : session_accountstatus === ""
                                ? props.filterContext.requestPayload
                                    ?.strFilterValues?.accountFilter
                                    ?.accountstatus === "SOLNB"
                                : session_accountstatus === "SOLNB"
                              : props.filterContext.requestPayload
                                  ?.strFilterValues?.accountFilter
                                  ?.accountstatus === "SOLNB"
                          }
                          onChange={(event) => {
                            props.isUpdateMultiple &&
                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                {
                                  ...props.filterContext
                                    .updateMutipleRequestEvents,
                                  accountStatusChangeEvent: true,
                                }
                              );
                            props.filterContext.setIsDataChange(true);
                            setAccountSection(true);
                            props.filterContext.setRequestPayload({
                              ...props.filterContext.requestPayload,
                              strFilterValues: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues,
                                accountFilter: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues.accountFilter,
                                  accountstatus: event.target.value,
                                },
                              },
                            });
                          }}
                        />
                        Solicited - No Bid
                      </td>
                      </tr>
                    }
                    <tr>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                        style={{ display: "none" }}
                      >
                        <div
                          id="solicited"
                          style={{
                            display:
                              props.filterContext.reportDetails &&
                              props.filterContext.reportDetails[0] &&
                              props.filterContext.reportDetails[0]
                                ?.allow_account_solicited === "Y"
                                ? "none"
                                : "none",
                          }}
                        >
                          <input
                            id="filterValues.accountFilter.accountstatus"
                            name="filterValues.accountFilter.accountstatus"
                            type="radio"
                            className={styles.margin3}
                            value="R"
                            onChange={(event) => {
                              props.filterContext.setIsDataChange(true);
                              setAccountSection(true);
                              props.filterContext.setRequestPayload({
                                ...props.filterContext.requestPayload,
                                strFilterValues: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues,
                                  accountFilter: {
                                    ...props.filterContext.requestPayload
                                      .strFilterValues.accountFilter,
                                    accountstatus: event.target.value,
                                  },
                                },
                              });
                            }}
                          />
                          Solicited
                        </div>
                      </td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <div
                          id="allEligible"
                          style={{
                            display:
                              props.filterContext.reportDetails &&
                              props.filterContext.reportDetails[0] &&
                              props.filterContext.reportDetails[0]
                                ?.allow_account_eligible === "Y"
                                ? "block"
                                : "none",
                          }}
                        >
                          <input
                            id="filterValues.accountFilter.accountstatus"
                            name="filterValues.accountFilter.accountstatus"
                            type="radio"
                            className={styles.margin3}
                            value="E"
                            checked={
                              props?.filterContext?.requestPayload
                                ?.strFilterValues?.accountFilter
                                ?.accountstatus == "E"
                            }
                            onChange={(event) => {
                              props.filterContext.setIsDataChange(true);
                              setAccountSection(true);
                              props.filterContext.setRequestPayload({
                                ...props.filterContext.requestPayload,
                                strFilterValues: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues,
                                  accountFilter: {
                                    ...props.filterContext.requestPayload
                                      .strFilterValues.accountFilter,
                                    accountstatus: event.target.value,
                                  },
                                },
                              });
                            }}
                          />
                          All Eligible
                        </div>
                      </td>
                      <td style={{ width: "10" }}></td>
                      <td
                        className={`${
                          props.isUpdateMultiple
                            ? styles.updateAccountStatusWrap
                            : props.componentName === "EdieHotelProfileView"
                            ? styles.nowrapCellEdieHotelProfileView
                            : styles.nowrapCell
                        }`}
                      >
                        <div
                          id="cbcHotels"
                          style={{
                            display:
                              props.filterContext.reportDetails &&
                              props.filterContext.reportDetails[0] &&
                              props.filterContext.reportDetails[0]
                                ?.allow_cbchotels === "Y"
                                ? "block"
                                : "none",
                          }}
                        >
                          <input
                            id="filterValues.accountFilter.accountstatus"
                            name="filterValues.accountFilter.accountstatus"
                            type="radio"
                            className={styles.margin3}
                            value="C"
                            checked={
                              props?.filterContext?.requestPayload
                                ?.strFilterValues?.accountFilter
                                ?.accountstatus == "C"
                            }
                            onChange={(event) => {
                              props.filterContext.setIsDataChange(true);
                              setAccountSection(true);
                              props.filterContext.setRequestPayload({
                                ...props.filterContext.requestPayload,
                                strFilterValues: {
                                  ...props.filterContext.requestPayload
                                    .strFilterValues,
                                  accountFilter: {
                                    ...props.filterContext.requestPayload
                                      .strFilterValues.accountFilter,
                                    accountstatus: event.target.value,
                                  },
                                },
                              });
                            }}
                          />
                          CBC Hotels
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

            {(showAccountSection || props?.isShowAccountOnly) && (
              <tr>
                <td>
                  <table className={styles.pad2_space2Height} width="100%">
                    <tbody>
                      {(showAccountSection || props?.isShowAccountOnly) && (
                        <tr>
                          <td colSpan={2}>
                            <div id="accountTypes" style={{ display: "block" }}>
                              <table className={styles.menuWdth100Height}>
                                <tbody>
                                  <tr>
                                    <td
                                      className={`${
                                        props.isUpdateMultiple
                                          ? styles.field_Name_bold
                                          : styles.Cell
                                      }`}
                                      style={{
                                        width: props.isUpdateMultiple
                                          ? "55px"
                                          : "50px",
                                      }}
                                    >
                                      {props.isUpdateMultiple
                                        ? "Segment:"
                                        : "Type"}
                                    </td>
                                    <td id="accounttypeselect">
                                      {props.isUpdateMultiple ? (
                                        <select
                                          name="filterValues.accountFilter.accountType"
                                          id="filterValues.accountFilter.accountType"
                                          style={{
                                            height: "20px",
                                            width: "218px",
                                            marginLeft: "2px",
                                          }}
                                          value={
                                            props?.filterContext
                                              ?.updateMutipleRequestEvents
                                              ?.segmentChange
                                              ? props?.filterContext
                                                  ?.requestPayload
                                                  ?.strFilterValues
                                                  ?.accountFilter?.accountType
                                              : session_segment_type
                                          }
                                          onChange={(event) => {
                                            props.isUpdateMultiple &&
                                              props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                                {
                                                  ...props.filterContext
                                                    .updateMutipleRequestEvents,
                                                  segmentChange: true,
                                                }
                                              );
                                            props.filterContext.setIsDataChange(
                                              true
                                            );
                                            props.filterContext.setRequestPayload(
                                              {
                                                ...props.filterContext
                                                  .requestPayload,
                                                strFilterValues: {
                                                  ...props.filterContext
                                                    .requestPayload
                                                    .strFilterValues,
                                                  accountFilter: {
                                                    ...props.filterContext
                                                      .requestPayload
                                                      .strFilterValues
                                                      .accountFilter,
                                                    accountType:
                                                      event.target.value,
                                                    accountrecid: 0,
                                                  },
                                                },
                                              }
                                            );
                                            props.filterContext.setAccountFilter(
                                              {
                                                searchaccounttype:
                                                  event.target.value === ""
                                                    ? ""
                                                    : event.target.value,
                                              }
                                            );
                                            props.filterContext.getAccountLists(
                                              event.target.value === "*"
                                                ? ""
                                                : event.target.value,
                                              props?.filterContext
                                                ?.updateMutipleRequestEvents
                                                ?.yearChangeEvent
                                                ? props.filterContext
                                                    .requestPayload
                                                    .strFilterValues.year
                                                : finalYear !== null &&
                                                  finalYear !== "" &&
                                                  finalYear !== undefined
                                                ? finalYear
                                                : props?.filterContext
                                                    ?.requestPayload
                                                    ?.strFilterValues.year,
                                              props?.filterContext
                                                ?.updateMutipleRequestEvents
                                                ?.yearChangeEvent
                                            );
                                          }}
                                        >
                                          {getAccountSegmentList()}
                                        </select>
                                      ) : (
                                        <select
                                          name="filterValues.accountFilter.accountType"
                                          id="filterValues.accountFilter.accountType"
                                          style={{
                                            height: "20px",
                                            width: "218px",
                                            marginLeft: "2px",
                                          }}
                                          onChange={(event) => {
                                            props.filterContext.setIsDataChange(
                                              true
                                            );
                                            props.filterContext.setRequestPayload(
                                              {
                                                ...props.filterContext
                                                  .requestPayload,
                                                strFilterValues: {
                                                  ...props.filterContext
                                                    .requestPayload
                                                    .strFilterValues,
                                                  accountFilter: {
                                                    ...props.filterContext
                                                      .requestPayload
                                                      .strFilterValues
                                                      .accountFilter,
                                                    accountType:
                                                      event.target.value,
                                                    accountrecid: 0,
                                                  },
                                                },
                                              }
                                            );
                                            props.filterContext.setAccountFilter(
                                              {
                                                searchaccounttype:
                                                  event.target.value === ""
                                                    ? ""
                                                    : event.target.value,
                                              }
                                            );
                                            props.filterContext.getAccountLists(
                                              event.target.value === "*"
                                                ? ""
                                                : event.target.value,
                                              props.filterContext.requestPayload
                                                .strFilterValues.year
                                            );
                                          }}
                                        >
                                          {getAccountSegmentList()}
                                        </select>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={2}>
                          <div
                            id="accounts"
                            style={{
                              display: "block",
                              marginLeft: props?.isShowAccountOnly ? 0 : 0,
                            }}
                          >
                            <table className={styles.menuWdth100Height}>
                              <tbody>
                                <tr>
                                  {props.filterContext
                                    .isMakingDetailsRequest ? (
                                    <td>Loading...</td>
                                  ) : (
                                    <Fragment>
                                      <td
                                        className={`${
                                          props.isUpdateMultiple
                                            ? styles.field_Name_bold
                                            : styles.Cell
                                        }`}
                                        style={{
                                          width: props.isUpdateMultiple
                                            ? "55px"
                                            : "50px",
                                        }}
                                      >
                                        {props.isUpdateMultiple
                                          ? "Account:"
                                          : "Account"}
                                      </td>
                                      <td id="accountselect">
                                        {props.isUpdateMultiple ? (
                                          <select
                                            name="filterValues.accountFilter.accountrecid"
                                            id="filterValues.accountFilter.accountrecid"
                                            style={{
                                              height: "20px",
                                              width: props.isUpdateMultiple
                                                ? "250px"
                                                : "218px",
                                              marginLeft: "2px",
                                            }}
                                            value={
                                              props?.filterContext
                                                ?.updateMutipleRequestEvents
                                                ?.accountChangeEvent
                                                ? props?.filterContext
                                                    ?.requestPayload
                                                    ?.strFilterValues
                                                    ?.accountFilter.accountrecid
                                                : props?.filterContext
                                                    ?.updateMutipleRequestEvents
                                                    ?.segmentChange ||
                                                  props?.filterContext
                                                    ?.updateMutipleRequestEvents
                                                    ?.dueDateChangeEvent ||
                                                  props?.filterContext
                                                    ?.updateMutipleRequestEvents
                                                    ?.yearChangeEvent
                                                ? "*"
                                                : session_account === ""
                                                ? props?.filterContext
                                                    ?.requestPayload
                                                    ?.strFilterValues
                                                    ?.accountFilter.accountrecid
                                                : session_account
                                            }
                                            onChange={(event) => {
                                              props.isUpdateMultiple &&
                                                props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                                  {
                                                    ...props.filterContext
                                                      .updateMutipleRequestEvents,
                                                    accountChangeEvent: true,
                                                  }
                                                );
                                              setCheckedBoxes([]);
                                              selectedAccount(
                                                event.target.value
                                              );
                                              props.filterContext.setIsDataChange(
                                                true
                                              );
                                              props.filterContext.getAccAerType(
                                                event.target.value
                                              );
                                              props.filterContext.getRateProgramList(
                                                event.target.value
                                              );
                                              props.filterContext.setRequestPayload(
                                                {
                                                  ...props.filterContext
                                                    .requestPayload,
                                                  strFilterValues: {
                                                    ...props.filterContext
                                                      .requestPayload
                                                      .strFilterValues,
                                                    accountFilter: {
                                                      ...props.filterContext
                                                        .requestPayload
                                                        .strFilterValues
                                                        .accountFilter,

                                                      accountrecid:
                                                        event.target.value ==
                                                        "0"
                                                          ? parseInt(
                                                              event.target.value
                                                            )
                                                          : event.target.value,
                                                    },
                                                    stringRPGMList: "",
                                                  },
                                                }
                                              );
                                            }}
                                          >
                                            <option value="0">*</option>
                                            {getAccountList()}
                                          </select>
                                        ) : (
                                          <select
                                            name="filterValues.accountFilter.accountrecid"
                                            id="filterValues.accountFilter.accountrecid"
                                            style={{
                                              height: "20px",
                                              width: props.isUpdateMultiple
                                                ? "236px"
                                                : "218px",
                                              marginLeft: "2px",
                                            }}
                                            value={sessionStorage.getItem(
                                              "accRecIdUpdateHotel"
                                            )}
                                            onChange={(event) => {
                                              setCheckedBoxes([]);
                                              selectedAccount(
                                                event.target.value
                                              );
                                              props.filterContext.setIsDataChange(
                                                true
                                              );
                                              props.filterContext.getAccAerType(
                                                event.target.value
                                              );
                                              props.filterContext.getRateProgramList(
                                                event.target.value
                                              );
                                              props.filterContext.setRequestPayload(
                                                {
                                                  ...props.filterContext
                                                    .requestPayload,
                                                  strFilterValues: {
                                                    ...props.filterContext
                                                      .requestPayload
                                                      .strFilterValues,
                                                    accountFilter: {
                                                      ...props.filterContext
                                                        .requestPayload
                                                        .strFilterValues
                                                        .accountFilter,

                                                      accountrecid:
                                                        event.target.value ==
                                                        "0"
                                                          ? parseInt(
                                                              event.target.value
                                                            )
                                                          : event.target.value,
                                                    },
                                                    stringRPGMList: "",
                                                  },
                                                }
                                              );
                                            }}
                                          >
                                            <option value="0">*</option>
                                            {getAccountList()}
                                          </select>
                                        )}
                                      </td>
                                    </Fragment>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      {showOptions?.showAccountSubset && (
                        <tr>
                          <td colSpan={2}>
                            <div id="accounts" style={{ display: "block" }}>
                              <table className={styles.menuWdth100Height}>
                                <tbody>
                                  <tr>
                                    <td
                                      className={styles.Cell}
                                      style={{ width: "50px" }}
                                    >
                                      Subset{" "}
                                      {showOptions?.showAccountSubset2 && (
                                        <span>A</span>
                                      )}
                                    </td>
                                    <td id="accountsubsetselect">
                                      <select
                                        name="filterValues.accountFilter.subset"
                                        id="filterValues.accountFilter.subsetA"
                                        style={{
                                          height: "20px",
                                          width: "218px",
                                          marginLeft: "2px",
                                        }}
                                        onChange={(event) => {
                                          props.filterContext.setIsDataChange(
                                            true
                                          );
                                          props.filterContext.setRequestPayload(
                                            {
                                              ...props.filterContext
                                                .requestPayload,
                                              strFilterValues: {
                                                ...props.filterContext
                                                  .requestPayload
                                                  .strFilterValues,
                                                accountFilter: {
                                                  ...props.filterContext
                                                    .requestPayload
                                                    .strFilterValues
                                                    .accountFilter,
                                                  subset: event.target.value,
                                                },
                                              },
                                            }
                                          );
                                        }}
                                      >
                                        <option value="">*</option>
                                        {getAccountSubsetsList()}
                                      </select>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}

                      {showOptions?.showAccountSubset2 && (
                        <tr>
                          <td colSpan={2}>
                            <div id="accounts" style={{ display: "block" }}>
                              <table className={styles.menuWdth100Height}>
                                <tbody>
                                  <tr>
                                    <td
                                      className={styles.Cell}
                                      style={{ width: "50px" }}
                                    >
                                      Subset B
                                    </td>
                                    <td id="accountsubsetselect2">
                                      <select
                                        name="filterValues.accountFilter.subset"
                                        id="filterValues.accountFilter.subsetB"
                                        style={{
                                          height: "20px",
                                          width: "218px",
                                          marginLeft: "2px",
                                        }}
                                        onChange={(event) => {
                                          props.filterContext.setIsDataChange(
                                            true
                                          );
                                          props.filterContext.setRequestPayload(
                                            {
                                              ...props.filterContext
                                                .requestPayload,
                                              strFilterValues: {
                                                ...props.filterContext
                                                  .requestPayload
                                                  .strFilterValues,
                                                accountFilter: {
                                                  ...props.filterContext
                                                    .requestPayload
                                                    .strFilterValues
                                                    .accountFilter,
                                                  subset2: event.target.value,
                                                },
                                              },
                                            }
                                          );
                                        }}
                                      >
                                        <option value="">*</option>
                                        {getAccountSubsetsList()}
                                      </select>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}

                      {showOptions?.showByAccountorByRPGM && (
                        <FilterAccountrateProgram
                          checkedBoxes={checkedBoxes}
                          setCheckedBoxes={setCheckedBoxes}
                          {...props}
                        />
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
