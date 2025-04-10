import React, { Fragment } from "react";
import btnClose from "../assets/img/button/btnClose.gif";
import styles from "../assets/css/commonBase.css";
import localStyles from "./CPreviousCancellation.css";
import CModal from "./CModal";

export const CPreviousCancellation = (props: any) => {
  const previousCancellationData = props?.quickauditviewcancelData;

  return (
    <>
    <CModal
      title="Previous Cancellation"
      onClose={props.closeModal}
      show={props.showModal}
      class={"previouscancellation"}
      xPosition={-192}
      yPosition={-62}
    >
      <div>
        {props.loader ? (
          <div className={localStyles.loaderMessage}>
            Please wait loading...
          </div>
        ) : (
          <table cellSpacing={0} cellPadding={0} style={{ border: 1 }}>
            {props.quickauditviewcancelData?.cancelList?.length === 0 ? (
              <tr>
                {" "}
                <td className={styles.field_Value} style={{ padding: 10 }}>
                  There are no changes in cancellation policy for this hotel and
                  account.
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <div style={{ overflow: "auto" }}>
                    <table
                      cellSpacing={1}
                      cellPadding={1}
                      border={"1"}
                      className={localStyles.mainTable}
                    >
                      <tr>
                        <td colSpan={4} className={styles.InstructionHeader}>
                          Cancellation Policy audit
                        </td>
                      </tr>
                      {props.quickauditviewcancelData?.cancelList?.map(
                        (qaItem, index) => {
                          return (
                            <>
                              {index === 0 ? (
                                <>
                                  <tr>
                                    <td
                                      width="80px"
                                      className={localStyles.fieldName}
                                    >
                                      <b>Updated On</b>
                                    </td>
                                    <td
                                      width="80px"
                                      className={localStyles.fieldName}
                                    >
                                      <b>Updated By</b>
                                    </td>
                                    <td className={localStyles.fieldName}>
                                      <b>Old Cancellation</b>
                                    </td>
                                    <td className={localStyles.fieldName}>
                                      <b>New Cancellation</b>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={localStyles.fieldValue}>
                                      {qaItem.formattedUpdated_on}
                                    </td>
                                    <td className={localStyles.fieldValue}>
                                      {qaItem.eid}
                                    </td>
                                    <td className={localStyles.fieldValue}>
                                      {qaItem.old_cxlpolicy}
                                    </td>
                                    <td className={localStyles.fieldValue}>
                                      {qaItem.new_cxlpolicy}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <tr>
                                  <td className={localStyles.fieldValue}>
                                    {qaItem.formattedUpdated_on}
                                  </td>
                                  <td className={localStyles.fieldValue}>
                                    {qaItem.eid}
                                  </td>
                                  <td className={localStyles.fieldValue}>
                                    {qaItem.old_cxlpolicy}
                                  </td>
                                  <td className={localStyles.fieldValue}>
                                    {qaItem.new_cxlpolicy}
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        }
                      )}
                    </table>
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <td
                align="center"
                valign="bottom"
                className={localStyles.bottomTd}
              >
                <img
                  src={btnClose}
                  style={{ cursor: "pointer" }}
                  onClick={() => props.closeModal()}
                />
              </td>
            </tr>
          </table>
        )}
      </div>
    </CModal>
    <style>{`
      .previouscancellation{
        position:fixed;
      }
    `}</style>
    </>
  );
};

export default CPreviousCancellation;
