import React, { Component } from "react";
import styles from "./CPACTabs.css";
import Completed from "../../../../../../common/assets/img/completed.gif";
import CBCRequest from "../../../../../../common/assets/img/cbc_request.gif";
import CBCAccepted from "../../../../../../common/assets/img/cbc_accepted.gif";
import CBCCompleted from "../../../../../../common/assets/img/cbc_completed.gif";
import CBCRejected from "../../../../../../common/assets/img/cbc_rejected.gif";
import Requested from "../../../../../../common/assets/img/requested.gif";
import Locked from "../../../../../../common/assets/img/locked.gif";
import Accepted from "../../../../../../common/assets/img/accepted.gif";
import Rejected from "../../../../../../common/assets/img/rejected.gif";
import Rebid from "../../../../../../common/assets/img/rebid.gif";
import Rebid2 from "../../../../../../common/assets/img/rebid2.gif";
import Rebid3 from "../../../../../../common/assets/img/rebid3.gif";
import RebidAccept from "../../../../../../common/assets/img/rebid_accept.gif";
import RebidAccept2 from "../../../../../../common/assets/img/rebid_accept2.gif";
import RebidAccept3 from "../../../../../../common/assets/img/rebid_accept3.gif";
import RebidDecline from "../../../../../../common/assets/img/rebid_decline.gif";
import RebidDecline2 from "../../../../../../common/assets/img/rebid_decline2.gif";
import RebidDecline3 from "../../../../../../common/assets/img/rebid_decline3.gif";
import Aer from "../../../../../../common/assets/img/aer.gif";
import New from "../../../../../../common/assets/img/new.gif";
import Nosquatter from "../../../../../../common/assets/img/nosquatter.gif";
import Noview from "../../../../../../common/assets/img/noview.gif";
import OFFCycle from "../../../../../../common/assets/img/off_cycle.gif";
import TWOYear from "../../../../../../common/assets/img/two_year.gif";
import Wifi from "../../../../../../common/assets/img/wifi.gif";
import BTBookingCost from "../../../../../../common/assets/img/bt_booking_cost.png";
import RollOver from "../../../../../../common/assets/img/roll_over.png";
import AERLevel1 from "../../../../../../common/assets/img/aerlevel1.gif";
import Revisita from "../../../../../../common/assets/img/revisita.gif";
import Settings from "../../static/Settings";

interface IProps {
  isUpdateMultiple?: boolean;
  isHotelUser?: boolean;
  user?: any;
}
export default class AccountLegend extends React.Component<IProps> {
  render() {
    return (
      <div>
        <div
          data-dojo-attach-point="containerNode"
          className={styles.dijitDialogPaneContent}
        >
          <table
            style={{
              border: "0px",
              padding: "0px",
              wordSpacing: "0px",
            }}
          >
            <tbody>
              <tr>
                <td>
                  <table
                    style={{
                      border: "0px",
                      padding: "0px",
                      wordSpacing: "0px",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader2} colSpan={3}>
                          {Settings.accountLegend.completionStatus}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name}>
                          <img src={Completed} />{" "}
                          {Settings.accountLegend.completedScreen}
                        </td>
                        <td style={{ width: "130px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td>
                          <img src={Revisita} />{" "}
                          {Settings.accountLegend.revisitScreen}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <table
                    style={{
                      border: "0px",
                      padding: "0px",
                      wordSpacing: "0px",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader2} colSpan={7}>
                          {Settings.accountLegend.compellingBusinessCase}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name}>
                          <img src={CBCRequest} />{" "}
                          {Settings.accountLegend.requested}
                        </td>
                        <td className={styles.Field_Name} style={{ whiteSpace: "nowrap" }}>
                          <img src={CBCCompleted} />
                          {""}
                          Hotel Completed
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name}>
                          <img src={CBCAccepted} />{" "}
                          {Settings.accountLegend.accepted}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td>
                          <img src={CBCRejected} />{" "}
                          {Settings.accountLegend.declined}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <table
                    style={{
                      border: "0px",
                      padding: "0px",
                      wordSpacing: "0px",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader2} colSpan={7}>
                          {Settings.accountLegend.accountStatus}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name}>
                          <img src={Requested} />{" "}
                          {Settings.accountLegend.requested}
                        </td>
                        <td className={styles.Field_Name}>
                          <img src={Locked} />
                          {Settings.accountLegend.pending}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name}>
                          <img src={Accepted} />{" "}
                          {Settings.accountLegend.accepted}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td>
                          <img src={Rejected} />{" "}
                          {Settings.accountLegend.declined}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <table
                    style={{
                      border: "0px",
                      padding: "0px",
                      wordSpacing: "0px",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader2} colSpan={7}>
                          {Settings.accountLegend.rebidStatus}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name2}>
                          <img src={Rebid} /> {Settings.accountLegend.tobeRebid}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name2}>
                          <img src={RebidAccept} />{" "}
                          {Settings.accountLegend.submitRebid}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name2}>
                          <img src={RebidDecline} />{" "}
                          {Settings.accountLegend.declinedRebid}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name2}>
                          <img src={Rebid2} />{" "}
                          {Settings.accountLegend.tobeRebid2}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name2}>
                          <img src={RebidAccept2} />{" "}
                          {Settings.accountLegend.submitRebid2}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name2}>
                          <img src={RebidDecline2} />{" "}
                          {Settings.accountLegend.declinedRebid2}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name2}>
                          <img src={Rebid3} />{" "}
                          {Settings.accountLegend.toberebid3}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name2}>
                          <img src={RebidAccept3} />{" "}
                          {Settings.accountLegend.submitRebid3}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td>
                          <img src={RebidDecline3} />{" "}
                          {Settings.accountLegend.declinedRebid3}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>{" "}
              </tr>

              <tr>
                <td>
                  <table
                    style={{
                      border: "0px",
                      padding: "0px",
                      wordSpacing: "0px",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader2} colSpan={7}>
                          {Settings.accountLegend.accountInformation}
                        </td>
                      </tr>
                      {!this.props.isUpdateMultiple && (
                        <tr style={{ fontWeight: "bold" }}>
                          <td className={styles.Field_Name}>
                            <img src={AERLevel1} />{" "}
                            {Settings.accountLegend.gPPGlobalPartner}
                          </td>
                          <td style={{ width: "10px" }}>
                            <>&nbsp;</>{" "}
                          </td>
                          <td className={styles.Field_Name}>
                            <img src={Aer} />{" "}
                            {Settings.accountLegend.gPPGlobalRecognition}
                          </td>
                        </tr>
                      )}
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name1}>
                          <img src={New} />
                          {Settings.accountLegend.newAccount}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name}>
                          <img src={Nosquatter} />{" "}
                          {Settings.accountLegend.noSquatter}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        {(this.props.user?.isPASAdmin ||
                          this.props.user?.isAnySalesUser) && (
                          <td className={styles.Field_Name}>
                            <img src={Noview} />{" "}
                            {Settings.accountLegend.notViewablebyHotels}
                          </td>
                        )}

                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name1}>
                          <img src={OFFCycle} />{" "}
                          {Settings.accountLegend.offCyclePricing}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td className={styles.Field_Name}>
                          <img src={TWOYear} />{" "}
                          {Settings.accountLegend.twoYearPricing}
                        </td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td className={styles.Field_Name1}>
                          <img src={BTBookingCost} />{" "}
                          {Settings.accountLegend.bTBookingCostAccount}
                        </td>
                        <td style={{ width: "10px" }}>
                          <>&nbsp;</>{" "}
                        </td>
                        <td>
                          <img src={RollOver} />{" "}
                          {Settings.accountLegend.rollOverAccount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <style>
          {`img {
                                        cursor:auto !important;
                                    }
                                    
                                   
                                    `}
        </style>
      </div>
    );
  }
}
