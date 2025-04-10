import React, { Fragment } from "react";
import CModal from "../CModal";
import styles from "./Filter.css";
import btnClose from "../../assets/img/button/btnClose.gif";

export const WhosChanged: React.FC<any> = (props: {
  pGOOSAuditTrailDetails: any;
  showWhosChangedModal: {
    show: boolean;
    clickedItem: any;
  };
  closeModal: () => void;
  isMakingDetailRequest: boolean;
}) => {
  const getAuditTrailDetails = () => {
    return props.pGOOSAuditTrailDetails.map((item) => {
      return (
        <tr>
          <td className={styles.Filter_Value}>{item.changeDate}</td>
          <td width="10px"><>&nbsp;</></td>
          <td className={styles.Filter_Value}>{item.eid}</td>
          <td width="10px"><>&nbsp;</></td>
          <td className={styles.Filter_Value}>{item.cn_firstname}</td>
          <td width="10px"><>&nbsp;</></td>
          <td className={styles.Filter_Value}>{item.cn_lastname}</td>
          <td width="10px"><>&nbsp;</></td>
          <td className={styles.Filter_Value} style={{ textAlign: "center" }}>
            {item.pgoos_old}
          </td>
          <td className={styles.Filter_Value} style={{ textAlign: "center" }}>
            {item.pgoos_new}
          </td>
          <td width="10px"><>&nbsp;</></td>
          <td className={styles.Filter_Value} style={{ textAlign: "center" }}>
            {item.aerpgoos_old}
          </td>
          <td className={styles.Filter_Value} style={{ textAlign: "center" }}>
            {item.aerpgoos_new}
          </td>
        </tr>
      );
    });
  };

  return (
    <CModal
      title={`PGOOS Audit Trail for ${props.showWhosChangedModal.clickedItem.marshaCode}`}
      onClose={props.closeModal}
      show={props.showWhosChangedModal.show}
    >
      <div style={{margin:"10px"}}>
        {props.isMakingDetailRequest ? (
          "Please wait loading..."
        ) : (
          <div>
            <table className={styles.zeroHeight}>
              <tbody>
                <tr>
                  <td>
                    <table className={styles.zeroHeight} width={600}>
                      <tbody>
                        <tr>
                          <td
                            className={styles.field_Name}
                            rowSpan={2}
                            width="120px"
                          >
                            Date
                          </td>
                          <td rowSpan={2} width="10px">
                            <>&nbsp;</>
                          </td>
                          <td
                            className={styles.field_Name}
                            rowSpan={2}
                            width="80px"
                          >
                            EID
                          </td>
                          <td rowSpan={2} width="10px">
                            <>&nbsp;</>
                          </td>
                          <td
                            className={styles.field_Name}
                            rowSpan={2}
                            width="100px"
                          >
                            First Name
                          </td>
                          <td rowSpan={2} width="10px">
                            <>&nbsp;</>
                          </td>
                          <td
                            className={styles.field_Name}
                            rowSpan={2}
                            width="100px"
                          >
                            Last Name
                          </td>
                          <td rowSpan={2} width="10px">
                            <>&nbsp;</>
                          </td>
                          <td
                            className={styles.field_Name}
                            colSpan={2}
                            width="30px"
                          >
                            PGOOS
                          </td>
                          <td rowSpan={2} width="10px">
                            <>&nbsp;</>
                          </td>
                          <td
                            className={styles.field_Name}
                            colSpan={2}
                            width="30px"
                          >
                            GPP PGOOS
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}> Old</td>
                          <td className={styles.field_Name}>New</td>
                          <td className={styles.field_Name}> Old</td>
                          <td className={styles.field_Name}>New</td>
                        </tr>
                        <tr className={styles.BGDarkBlueStyle}>
                              <td
                                colSpan={13}
                                style={{ height: "2px" }}
                                height={2}
                              />
                            </tr>
                        {props.pGOOSAuditTrailDetails.length > 0 ? 
                        (
                          getAuditTrailDetails()
                        ) : (
                          <Fragment>
                            <tr>
                              <td valign="middle" align="center">
                                No Data Found!!
                              </td>
                            </tr>
                          </Fragment>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table className={styles.zeroHeight} width={600}>
                      <tbody>
                        <tr className={styles.BGDarkBlueStyle}>
                          <td style={{ height: "2px" }} height={2} />
                        </tr>
                        <tr>
                          <td height="10px"><>&nbsp;</></td>
                        </tr>
                        <tr>
                          {" "}
                          <td align="center">
                            <img
                              src={btnClose}
                              style={{ cursor: "hand" }}
                              onClick={props.closeModal}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CModal>
  );
};
