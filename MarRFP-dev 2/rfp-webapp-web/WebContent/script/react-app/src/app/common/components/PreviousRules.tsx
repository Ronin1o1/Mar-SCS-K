import React, { Fragment } from "react";
import btnClose from "../assets/img/button/btnClose.gif";
import styles from "../assets/css/commonBase.css";
import CModal from "./CModal";

export const PreviousRules = (props: any) => {
  console.debug("props PreviousRules", props);
  const previousRulesDataRules = props?.previousRulesData?.rules;

  if (props.previousRulesLoader) {
    return (
      <CModal
        title="Previous Rules"
        onClose={props.closeModal}
        show={props.showModal}
      >
        <div>
          <p>Please wait loading...</p>
        </div>
      </CModal>
    );
  } else {
    return (
      <CModal
        title="Previous Rules"
        onClose={props.closeModal}
        show={props.showModal}
        class={"previoustest"}
      >
        <div style={{ padding: "10px" }}>
          <Fragment>
            <div
              data-dojo-attach-point="containerNode"
              className={styles.dijitDialogPaneContent}
            >
              <table cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td>
                      <div
                        style={{
                          height: "200px",
                          width: "375px",
                          overflow: "auto",
                        }}
                      >
                        {/* {!previousRulesDataRules?.quickAuditRulesInfo? 		
                      <tr><td>Previous rules for this hotel and account have not been saved.</td></tr>
                      : */}
                        <table cellSpacing={0} cellPadding={0}>
                          <tbody>
                            {previousRulesDataRules?.quickAuditRulesInfo?.map(
                              (qaItem, index) => {
                                const sCount = index + 1;
                                return (
                                  <>
                                    <tr>
                                      <td className={styles.InstructionHeader}>
                                        {previousRulesDataRules?.numAudits ===
                                          1 && "Original/Current "}
                                        {previousRulesDataRules?.numAudits ===
                                          2 &&
                                          (sCount === 1
                                            ? " Original/Previous"
                                            : "Current")}
                                        {previousRulesDataRules?.numAudits ===
                                          3 &&
                                          (sCount === 1
                                            ? "Original"
                                            : sCount === 2
                                            ? "Previous"
                                            : "Current")}{" "}
                                        Rules
                                      </td>
                                    </tr>
                                    {qaItem.last_updatedrules && (
                                      <tr>
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
                                                <td style={{ width: "15px" }} />
                                                {!props?.userType?.isLimitedSalesUser && !props?.userType?.isHotelUser && !props?.userType?.isSalesUser &&
                                                <>
                                                <td
                                                  className={styles.Field_Name}
                                                >
                                                  By:
                                                </td>
                                                <td style={{ width: "5px" }} />
                                                <td
                                                  className={styles.Field_Value}
                                                >
                                                  {qaItem?.last_updaterateseid}
                                                </td>
                                                </>
                                                 }
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    )}

                                    <tr>
                                      <td>
                                        <div
                                          style={{ width: "355px" }}
                                          id="gridView"
                                          className={styles.gridView}
                                        >
                                          <table
                                            style={{ height: "25px" }}
                                            className={styles.gridRowTable}
                                            id="gridTableView"
                                            cellSpacing={0}
                                            cellPadding={0}
                                          >
                                            <tbody>
                                              {qaItem?.qarules?.map(
                                                (qarules, index) => {
                                                  const roomListData =
                                                    previousRulesDataRules?.roompoollist?.filter(
                                                      (item) =>
                                                        item.seq ===
                                                        qarules?.roompool
                                                    );
                                                  return (
                                                    <>
                                                      <tr
                                                        className={
                                                          styles.gridRow
                                                        }
                                                      >
                                                        <td
                                                          style={{
                                                            width: "320px",
                                                          }}
                                                          className={`${
                                                            styles.gridCell
                                                          } ${
                                                            qarules?.valuediff ===
                                                            "Y"
                                                              ? styles.Red
                                                              : ""
                                                          }`}
                                                        >
                                                          {qarules?.roompool ===
                                                          0
                                                            ? qarules?.rulename
                                                            : ` ${
                                                                qarules.rulename
                                                              } Room Pool Group ${
                                                                roomListData[0]
                                                                  ?.seq
                                                              } - (${roomListData[0]?.roomPoolList?.toString()}):`}
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: "30px",
                                                          }}
                                                          className={`${
                                                            styles.gridCell
                                                          } ${
                                                            qarules?.valuediff ===
                                                            "Y"
                                                              ? styles.Red
                                                              : ""
                                                          }`}
                                                        >
                                                          {qarules?.rulevalue ===
                                                          "Y"
                                                            ? "Yes"
                                                            : qarules?.rulevalue ===
                                                              "N"
                                                            ? "No"
                                                            : ""}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr style={{ height: "15px" }}>
                                      <td />
                                    </tr>
                                  </>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                        {/* } */}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td valign="bottom" align="center">
                      <img
                        src={btnClose}
                        style={{ cursor: "pointer" }}
                        onClick={() => props.closeModal()}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fragment>
        </div>
      </CModal>
    );
  }
};

export default PreviousRules;
