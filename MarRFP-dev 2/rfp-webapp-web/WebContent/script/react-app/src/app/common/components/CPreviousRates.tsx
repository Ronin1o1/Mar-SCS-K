import React, { Fragment, useContext, useEffect, useState } from "react";
import btnClose from "../assets/img/button/btnClose.gif";
import styles from "../assets/css/commonBase.css";
import rateStyles from "../../pricing/hotelPricing/content/centerallyPricedAccount/content/Price/content/Rates&Rules/content/RatesRules.css";
import CModal from "./CModal";
import Utils from "../utils/Utils";
import ApplicationContext, { IApplicationContext } from "./ApplicationContext";

export function CPreviousRates(props: any) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const numQuickAudits = props.previousRulesData?.quickAuditData?.numAudits;
  const [quickAuditInfo, setquickAuditInfo] = useState(
    props.previousRulesData
      ? props.previousRulesData?.quickAuditData?.quickAuditInfo
      : null
  );

  const lranlratype = props.previousRulesData?.quickAuditData?.lranlratype;
  const roomtypelist = props.previousRulesData?.quickAuditData?.roomtypelist;
  const roompoollist = props.previousRulesData?.quickAuditData?.roompoollist;
  const offcycle = quickAuditInfo ? quickAuditInfo[0]?.offcycle : "";
  const hotelDetailData = props.previousRulesData?.hotelDetailData;
  const isLOSBrand = props.previousRulesData?.hotelDetailData?.isLOSBrand;

  useEffect(() => {
    const list = props.previousRulesData
      ? props.previousRulesData?.quickAuditData?.quickAuditInfo
      : null;

    setquickAuditInfo(list);
  }, [
    props.previousRulesData &&
      props.previousRulesData?.quickAuditData?.quickAuditInfo,
  ]);

  const convertNumComma = (data) => {
    if (data) {
      return data.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return data;
    }
  };

  return (
    <CModal
      title="Previous Rates"
      onClose={props.closeModal}
      show={props.showModal}
      class={"cpreviousrates"}
    >
      <div
        data-dojo-attach-point="containerNode"
        className="dijitDialogPaneContent dijitAlignCenter"
        style={{
          padding: "10px 10px 0px 10px ",
          width: " 740px",
          height: "510px",
          overflow: "auto",
        }}
      >
        <table cellSpacing={0} cellPadding={0} width="100%">
          <tbody>
            {quickAuditInfo && quickAuditInfo?.length === 0 ? (
              <tr>
                <td className={styles.Field_Value}>
                  Previous rates for this hotel and account have not been saved.
                </td>
              </tr>
            ) : (
              <>
                <tr className="header">
                  <td className={styles.popup_header}>
                    {quickAuditInfo && quickAuditInfo[0]?.accountname}
                  </td>
                </tr>
                <tr className={styles.height450}>
                  <td valign="top" style={{ height: "100%", overflow: "auto" }}>
                    <div
                      style={{
                        width: "720px",
                        height: "100%",
                      }}
                    >
                      <table>
                        <tbody>
                          {" "}
                          {quickAuditInfo?.map((qaItem, index) => {
                            const sCount = index + 1;
                            return (
                              <tr key={index}>
                                <table
                                  cellSpacing={0}
                                  cellPadding={0}
                                  style={{ display: "table", width: "100%" }}
                                >
                                  <tbody>
                                    {index != 0 && (
                                      <tr style={{ height: "5px" }}></tr>
                                    )}
                                    <tr>
                                      <td className={styles.InstructionHeader}>
                                        {numQuickAudits === 1 &&
                                          "Original/Current "}
                                        {numQuickAudits === 2 &&
                                          (sCount === 1
                                            ? " Original/Previous"
                                            : "Current")}
                                        {numQuickAudits === 3 &&
                                          (sCount === 1
                                            ? "Original"
                                            : sCount === 2
                                            ? "Previous"
                                            : "Current")}{" "}
                                        Rates
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table cellSpacing={0} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td className={styles.Field_Name}>
                                                Last Updated On:
                                              </td>
                                              <td style={{ width: "5px" }} />
                                              <td
                                                className={styles.Field_Value}
                                              >
                                                {
                                                  qaItem?.formattedLast_updatedrates
                                                }
                                              </td>
                                              <td style={{ width: "15px" }}>
                                                {" "}
                                              </td>
                                              <td
                                                className={
                                                  appContext?.user
                                                    ?.isPASAdmin ||
                                                  appContext?.user?.isSalesUser
                                                    ? styles.Field_Name
                                                    : rateStyles.noDisplay
                                                }
                                              >
                                                By:
                                              </td>
                                              <td style={{ width: "5px" }} />
                                              <td
                                                className={
                                                  appContext?.user
                                                    ?.isPASAdmin ||
                                                  appContext?.user?.isSalesUser
                                                    ? styles.Field_Value
                                                    : rateStyles.noDisplay
                                                }
                                              >
                                                {qaItem?.last_updaterateseid}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table cellSpacing={0} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td className={styles.Field_Name}>
                                                Product:
                                              </td>
                                              <td style={{ width: "5px" }} />
                                              <td>{qaItem?.productdesc}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>

                                    {qaItem?.qarates?.length > 0 && (
                                      <tr
                                        style={{
                                          height: "auto",
                                          display: "block",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        <td>
                                          <div
                                            style={{ clear: "both" }}
                                            className={styles.gridHeader}
                                            id="gridHeader"
                                          >
                                            <table
                                              style={{ height: "32px" }}
                                              className={styles.gridRowTable}
                                              id="gridTableHeader"
                                              cellSpacing={0}
                                              cellPadding={0}
                                            >
                                              <tbody>
                                                <tr>
                                                  <th
                                                    style={{ width: "240px" }}
                                                    rowSpan={3}
                                                    className={styles.gridCell}
                                                  >
                                                    <div
                                                      style={{ width: "240px" }}
                                                    >
                                                      Seasons
                                                    </div>
                                                  </th>
                                                  {isLOSBrand && (
                                                    <th
                                                      style={{ width: "50px" }}
                                                      rowSpan={3}
                                                      className={
                                                        styles.gridCell
                                                      }
                                                    >
                                                      <div
                                                        style={{
                                                          width: "52px",
                                                        }}
                                                      >
                                                        LOS
                                                      </div>
                                                    </th>
                                                  )}

                                                  {roompoollist?.map(
                                                    (roompoolItem, index) => {
                                                      return (
                                                        <th
                                                          key={index}
                                                          colSpan={
                                                            lranlratype?.length *
                                                            roomtypelist?.length
                                                          }
                                                          className={
                                                            styles.gridCell
                                                          }
                                                        >
                                                          Room Pool Group{" "}
                                                          {roompoolItem.seq} - (
                                                          {roompoolItem?.roomPoolList?.toString()}
                                                          )
                                                        </th>
                                                      );
                                                    }
                                                  )}
                                                </tr>
                                                <tr>
                                                  {roompoollist?.map(
                                                    (
                                                      roompoolItem,
                                                      roompoolItemIndex
                                                    ) => {
                                                      return lranlratype?.map(
                                                        (
                                                          lratypeItem,
                                                          lratypeItemIndex
                                                        ) => {
                                                          return roomtypelist?.map(
                                                            (
                                                              roomtypeItem,
                                                              roomtypeItemIndex
                                                            ) => {
                                                              return (
                                                                <th
                                                                  key={
                                                                    roomtypeItemIndex
                                                                  }
                                                                  style={{
                                                                    width:
                                                                      "97px",
                                                                  }}
                                                                  className={
                                                                    styles.gridCell
                                                                  }
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "97px",
                                                                    }}
                                                                    className={
                                                                      styles.gridCell
                                                                    }
                                                                  >
                                                                    {
                                                                      lratypeItem?.productdescription
                                                                    }
                                                                  </div>
                                                                </th>
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  )}
                                                </tr>

                                                <tr
                                                  className={
                                                    isLOSBrand
                                                      ? rateStyles.noDisplay
                                                      : ""
                                                  }
                                                >
                                                  {roompoollist?.map(
                                                    (
                                                      roompoolItem,
                                                      roompoolItemIndex
                                                    ) => {
                                                      return lranlratype?.map(
                                                        (
                                                          lratypeItem,
                                                          roomtypeItemIndex
                                                        ) => {
                                                          return roomtypelist?.map(
                                                            (
                                                              roomtypeItem,
                                                              roomtypeItemIndex
                                                            ) => {
                                                              return (
                                                                <th
                                                                  key={
                                                                    roomtypeItemIndex
                                                                  }
                                                                  style={{
                                                                    width:
                                                                      "97px",
                                                                  }}
                                                                  className={
                                                                    styles.gridCell
                                                                  }
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "97px",
                                                                    }}
                                                                    className={
                                                                      styles.gridCell
                                                                    }
                                                                  >
                                                                    <span
                                                                      className={
                                                                        isLOSBrand
                                                                          ? rateStyles.noDisplay
                                                                          : ""
                                                                      }
                                                                    >
                                                                      {
                                                                        roomtypeItem?.roomtypedescription
                                                                      }
                                                                    </span>
                                                                  </div>
                                                                </th>
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  )}
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <div
                                            style={{ clear: "both" }}
                                            id="gridView"
                                            className="gridView"
                                          >
                                            <table
                                              className={styles.gridRowTable}
                                              style={{ tableLayout: "fixed" }}
                                              id="gridTableView"
                                              cellSpacing={0}
                                              cellPadding={0}
                                            >
                                              <tbody>
                                                {qaItem.qarates?.map(
                                                  (
                                                    qaratesItem,
                                                    qaratesItemIndex
                                                  ) => {
                                                    return (
                                                      <tr
                                                        key={qaratesItemIndex}
                                                        className={
                                                          styles.gridRow
                                                        }
                                                      >
                                                        <td
                                                          style={{
                                                            width: "240px",
                                                          }}
                                                          className={
                                                            styles.gridCell
                                                          }
                                                        >
                                                          {qaratesItem?.seasonstart &&
                                                            qaratesItem?.roomnightsfrom ==
                                                              1 && (
                                                              <div
                                                                style={{
                                                                  width:
                                                                    "236px",
                                                                }}
                                                              >
                                                                <span
                                                                  className={`${
                                                                    qaratesItem?.startdatediff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  {
                                                                    qaratesItem?.seasonstart
                                                                  }
                                                                </span>
                                                                <span
                                                                  className={
                                                                    rateStyles.datesPadding
                                                                  }
                                                                >
                                                                  -
                                                                </span>
                                                                <span
                                                                  className={`${
                                                                    qaratesItem?.startdatediff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  {
                                                                    qaratesItem?.seasonend
                                                                  }
                                                                </span>
                                                              </div>
                                                            )}
                                                        </td>
                                                        {isLOSBrand ? (
                                                          <>
                                                            <td
                                                              style={{
                                                                width: "50px",
                                                              }}
                                                              className={
                                                                styles.gridCell
                                                              }
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "53px",
                                                                }}
                                                              >
                                                                <span
                                                                  className={`${
                                                                    qaratesItem?.startdatediff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  {
                                                                    qaratesItem?.roomnightsfrom
                                                                  }
                                                                </span>{" "}
                                                                <span
                                                                  className={
                                                                    rateStyles.datesPadding
                                                                  }
                                                                >
                                                                  -
                                                                </span>
                                                                <span
                                                                  className={`${
                                                                    qaratesItem?.startdatediff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  {
                                                                    qaratesItem?.roomnightsto
                                                                  }
                                                                </span>
                                                              </div>
                                                            </td>

                                                            {roompoollist?.length >=
                                                              2 &&
                                                              !isLOSBrand && (
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={
                                                                    styles.gridCell
                                                                  }
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_ext_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_ext_rp2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              )}

                                                            {roompoollist?.length >=
                                                              3 &&
                                                              !isLOSBrand && (
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={
                                                                    styles.gridCell
                                                                  }
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_ext_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_ext_rp3
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              )}

                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.lra_ext_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.lra_ext_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.lra_ext_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.nlra_ext_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.nlra_ext_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.nlra_ext_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            {roompoollist?.length >=
                                                              2 && (
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "105px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                                className={`${
                                                                  styles.gridCell
                                                                } ${
                                                                  qaratesItem?.lra_ext_rp2_diff ===
                                                                  "Y"
                                                                    ? styles.Red
                                                                    : ""
                                                                }`}
                                                              >
                                                                <div
                                                                  style={{
                                                                    width:
                                                                      "95px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                >
                                                                  {qaratesItem?.lra_ext_rp2 &&
                                                                    convertNumComma(
                                                                      qaratesItem?.lra_ext_rp2
                                                                    )}
                                                                </div>
                                                              </td>
                                                            )}
                                                            {roompoollist?.length >=
                                                              2 && (
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "105px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                                className={`${
                                                                  styles.gridCell
                                                                } ${
                                                                  qaratesItem?.nlra_ext_rp2_diff ===
                                                                  "Y"
                                                                    ? styles.Red
                                                                    : ""
                                                                }`}
                                                              >
                                                                <div
                                                                  style={{
                                                                    width:
                                                                      "95px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                >
                                                                  {qaratesItem?.nlra_ext_rp2 &&
                                                                    convertNumComma(
                                                                      qaratesItem?.nlra_ext_rp2
                                                                    )}
                                                                </div>
                                                              </td>
                                                            )}
                                                            {roompoollist?.length >=
                                                              3 && (
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "105px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                                className={`${
                                                                  styles.gridCell
                                                                } ${
                                                                  qaratesItem?.lra_ext_rp3_diff ===
                                                                  "Y"
                                                                    ? styles.Red
                                                                    : ""
                                                                }`}
                                                              >
                                                                <div
                                                                  style={{
                                                                    width:
                                                                      "95px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                >
                                                                  {" "}
                                                                  {qaratesItem?.lra_ext_rp3 &&
                                                                    convertNumComma(
                                                                      qaratesItem?.lra_ext_rp3
                                                                    )}
                                                                </div>
                                                              </td>
                                                            )}
                                                            {roompoollist?.length >=
                                                              3 && (
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "105px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                                className={`${
                                                                  styles.gridCell
                                                                } ${
                                                                  qaratesItem?.nlra_ext_rp3_diff ===
                                                                  "Y"
                                                                    ? styles.Red
                                                                    : ""
                                                                }`}
                                                              >
                                                                <div
                                                                  style={{
                                                                    width:
                                                                      "95px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                >
                                                                  {qaratesItem?.nlra_ext_rp3 &&
                                                                    convertNumComma(
                                                                      qaratesItem?.nlra_ext_rp3
                                                                    )}
                                                                </div>
                                                              </td>
                                                            )}
                                                          </>
                                                        ) : (
                                                          <>
                                                            {/* {offcycle === "Y" && (
                                                          <>
                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.fixed_single_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.fixed_single_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.fixed_single_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "97px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.fixed_double_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.fixed_double_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.fixed_double_rp1
                                                                  )}
                                                              </div>
                                                            </td>

                                                            {roompoollist?.length >=
                                                              2 && (
                                                              <>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.fixed_single_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_single_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_single_rp2
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.fixed_double_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_double_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_double_rp2
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              </>
                                                            )}

                                                            {roompoollist?.length >=
                                                              3 && (
                                                              <>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.fixed_single_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_single_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_single_rp3
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.fixed_double_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.fixed_double_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.fixed_double_rp3
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              </>
                                                            )}
                                                          </>
                                                        )} */}

                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.lra_single_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.lra_single_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.lra_single_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.lra_double_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.lra_double_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.lra_double_rp1
                                                                  )}
                                                              </div>
                                                            </td>

                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.nlra_single_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.nlra_single_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.nlra_single_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "105px",
                                                                textAlign:
                                                                  "right",
                                                              }}
                                                              className={`${
                                                                styles.gridCell
                                                              } ${
                                                                qaratesItem?.nlra_double_rp1_diff ===
                                                                "Y"
                                                                  ? styles.Red
                                                                  : ""
                                                              }`}
                                                            >
                                                              <div
                                                                style={{
                                                                  width: "95px",
                                                                  textAlign:
                                                                    "right",
                                                                }}
                                                              >
                                                                {qaratesItem?.nlra_double_rp1 &&
                                                                  convertNumComma(
                                                                    qaratesItem?.nlra_double_rp1
                                                                  )}
                                                              </div>
                                                            </td>
                                                            {roompoollist?.length >=
                                                              2 && (
                                                              <>
                                                                {" "}
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.lra_single_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.lra_single_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.lra_single_rp2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.lra_double_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.lra_double_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.lra_double_rp2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.nlra_single_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.nlra_single_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.nlra_single_rp2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.nlra_double_rp2_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.nlra_double_rp2 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.nlra_double_rp2
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              </>
                                                            )}
                                                            {roompoollist?.length >=
                                                              3 && (
                                                              <>
                                                                {" "}
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.lra_single_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.lra_single_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.lra_single_rp3
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.lra_double_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.lra_double_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.lra_double_rp3
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.nlra_single_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.nlra_single_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.nlra_single_rp3
                                                                      )}
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    width:
                                                                      "105px",
                                                                    textAlign:
                                                                      "right",
                                                                  }}
                                                                  className={`${
                                                                    styles.gridCell
                                                                  } ${
                                                                    qaratesItem?.nlra_double_rp3_diff ===
                                                                    "Y"
                                                                      ? styles.Red
                                                                      : ""
                                                                  }`}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "95px",
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                  >
                                                                    {qaratesItem?.nlra_double_rp3 &&
                                                                      convertNumComma(
                                                                        qaratesItem?.nlra_double_rp3
                                                                      )}
                                                                  </div>
                                                                </td>
                                                              </>
                                                            )}
                                                          </>
                                                        )}
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

                                    {qaItem?.ratetype_selected === 18 ||
                                    qaItem?.ratetype_selected === 20 ? (
                                      <tr className="header">
                                        <td>
                                          <table
                                            cellSpacing={0}
                                            cellPadding={0}
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={styles.Field_Name}
                                                >
                                                  Percent discount:
                                                </td>
                                                <td style={{ width: "5px" }} />
                                                <td
                                                  className={styles.Field_Value}
                                                >
                                                  {`${Utils.percentWithDecimal(
                                                    qaItem?.percentdiscount
                                                  )}%`}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    ) : null}
                                  </tbody>
                                </table>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td valign="bottom" align="center">
                    {" "}
                    <img
                      src={btnClose}
                      style={{ cursor: "pointer" }}
                      onClick={() => props.closeModal()}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </CModal>
  );
}
