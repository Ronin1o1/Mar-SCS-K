import React, { Component } from "react";
import styles from "./TermsAndConditions.css";
import btnIAccept from "../../../common/assets/img/button/btnIAccept.gif";
import btnDontAccept from "../../../common/assets/img/button/btnDontAccept.gif";
import btBookingCost from "../../../common/assets/img/bt_booking_cost.png";
import rfplogo_new from "../../../common/assets/img/rfplogo_new.gif";

import TermsAndConditionsContext, {
  TermsAndConditionsProvider,
} from "../context/TermsAndConditionsContext";

let contextType = null;

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //contextType.getAcceptTermsData();
    contextType.getTerms();
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    return (
      <TermsAndConditionsProvider>
        <TermsAndConditionsContext.Consumer>
          {(termsAndConditionsContext) => {
            contextType = termsAndConditionsContext;
            return (
              <React.Fragment>
                <table className={styles.full_height}>
                  <tbody>
                    <tr className={styles.trTop}>
                      {/* Header (Logo, Utilities Bar and Status Bar) */}
                      <td className={styles.tdHeightOne}>
                        <table className={styles.full_height}>
                          <tbody>
                            <tr>
                              {/* Force 800 width */}
                              <td className={styles.tdspace1}></td>
                              <td className={styles.tdspace2}></td>
                            </tr>
                            <tr>
                              <td className={styles.tslogostyle}>
                                {/* Logo */}
                                <img
                                  alt={contextType.state.Title.logo}
                                  src={rfplogo_new}
                                />
                              </td>
                              <td className={styles.tdutility}>
                                {/* Utilities Bar and Status Bar  */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      {/* Menu Navigation */}
                      <td className={styles.tdHeightOne}></td>
                    </tr>

                    <tr>
                      {/* Page Content */}
                      <td className={styles.tdtop}>
                        <table className={styles.maintablestyle}>
                          <tbody>
                            <tr>
                              <td className={styles.tdtop}>
                                <form>
                                  <table
                                    className={`${styles.BGWhiteStyle} ${styles.formstyle}`}
                                  >
                                    <tbody>
                                      <tr>
                                        <td className={styles.tdtop}>
                                          <table
                                            className={`${styles.BGWhiteStyle} ${styles.sectablestyle}`}
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.pageHeader1} ${styles.tdAlignCenter}`}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .termsAndConditionsTitle
                                                  }
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .mainMessage
                                                  }{" "}
                                                  <b>
                                                    <a
                                                      style={{
                                                        fontWeight: "bold",
                                                        color: "#0038AE",
                                                      }}
                                                      href="mailto:PAS@marriott.com"
                                                    >
                                                      {
                                                        contextType.state.data
                                                          .TERMS_EMAIL
                                                      }
                                                    </a>
                                                  </b>
                                                  {contextType.state.Title.dot}{" "}
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.field_Name} ${styles.tdColorRed}`}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .warningMessage
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .marRFPDefinition
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .marRFPDefinitionContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .confidentialityAndPropertyRights
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .confidentialityAndPropertyRightsContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .authorizedAccess
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .authorizedAccessContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .purposeOfAccessAndInterference
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .purposeOfAccessAndInterferenceContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .disclaimers
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .disclaimersContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .protectionOfExistingAgreements
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .protectionOfExistingAgreementsContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .trademarks
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .trademarksContent
                                                  }
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .bTBookingCost
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .bTBookingCostContent1
                                                  }{" "}
                                                  <a>
                                                    <img src={btBookingCost} />
                                                  </a>{" "}
                                                  {
                                                    contextType.state.Title
                                                      .bTBookingCostContent2
                                                  }{" "}
                                                  <p></p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.tdHeightTen}
                                                />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .disputes
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  {
                                                    contextType.state.Title
                                                      .disputesContent1
                                                  }
                                                  <br />
                                                  <b>
                                                    {
                                                      contextType.state.Title
                                                        .disputesContent2
                                                    }{" "}
                                                    <a
                                                      style={{
                                                        fontWeight: "bold",
                                                        color: "#0038AE",
                                                      }}
                                                      href="mailto:privacy@marriott.com"
                                                    >
                                                      {
                                                        contextType.state.Title
                                                          .emailID2
                                                      }
                                                    </a>
                                                    {
                                                      contextType.state.Title
                                                        .dot
                                                    }
                                                  </b>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <>&nbsp;</>
                                                </td>
                                              </tr>
                                              <tr></tr>
                                              <tr>
                                                <td
                                                  className={
                                                    styles.buttonCenter
                                                  }
                                                >
                                                  <table>
                                                    <tbody>
                                                      <tr>
                                                        <td>
                                                          <a href="javascript:void(0);">
                                                            <img
                                                              className={
                                                                styles.button1
                                                              }
                                                              alt={
                                                                contextType
                                                                  .state.Title
                                                                  .btnAccept
                                                              }
                                                              src={btnIAccept}
                                                              onClick={
                                                                contextType.getAcceptTermsData
                                                              }
                                                            />
                                                          </a>
                                                        </td>
                                                        <td
                                                          className={
                                                            styles.tdWidthOne
                                                          }
                                                        />
                                                        <td>
                                                          <a href="javascript:void(0);">
                                                            <img
                                                              className={
                                                                styles.button1
                                                              }
                                                              alt={
                                                                contextType
                                                                  .state.Title
                                                                  .btnReject
                                                              }
                                                              src={
                                                                btnDontAccept
                                                              }
                                                              onClick={
                                                                this.reloadPage
                                                              }
                                                            />
                                                          </a>
                                                        </td>
                                                        <td
                                                          className={
                                                            styles.tdWidthOne
                                                          }
                                                        />
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <>&nbsp;</>
                                                </td>
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
                      </td>
                    </tr>
                    {/* Footer  */}
                    <tr>
                      <td className={`${styles.footer} ${styles.footerInline}`}>
                        {" "}
                        {contextType.state.Title.copyrightInfo}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            );
          }}
        </TermsAndConditionsContext.Consumer>
      </TermsAndConditionsProvider>
    );
  }
}
