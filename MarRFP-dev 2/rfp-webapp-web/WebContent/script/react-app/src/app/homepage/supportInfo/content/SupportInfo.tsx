import React, { Component } from "react";
import Settings from "../static/settings";
import styles from "./SupportInfo.css";

import SupportInfoContext, {
  SupportInfoContextProvider,
} from "../context/SupportInfoContext";

let contextType = null;

interface IProps {}

interface IState {}
export default class SupportInfo extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    contextType.getSupportInfoData();
  }

  render() {
    return (
      <SupportInfoContextProvider>
        <SupportInfoContext.Consumer>
          {(supportInfoContext) => {
            contextType = supportInfoContext;

            return (
              <React.Fragment>
                <table className={styles.tbl} id="supportInfo">
                  <table className={styles.tbl2}>
                    <tbody>
                      <tr>
                        <td className={styles.top}>
                          <table
                            className={`${styles.BGWhiteStyle} ${styles.tbl3}`}
                          >
                            <tbody className={styles.tbl3tbdy}>
                              <tr className={styles.top}>
                                <td className={styles.heightOne}>
                                  <table className={styles.tb14}>
                                    <tbody>
                                      <tr>
                                        <td
                                          className={`${styles.DOTTEDHEAD} ${styles.halfWidth}`}
                                        >
                                          <>
                                            <>&nbsp;</>
                                          </>
                                        </td>
                                        <td
                                          className={`${styles.PAGEHEAD} ${styles.spaceRowgap}`}
                                        >
                                          {
                                            Settings.supportInformation
                                              .pageTitle
                                          }
                                        </td>
                                        <td
                                          className={`${styles.DOTTEDHEAD} ${styles.halfWidth}`}
                                        >
                                          <>
                                            <>&nbsp;</>
                                          </>
                                        </td>
                                      </tr>
                                      <tr className={styles.heightFive}>
                                        <td />
                                        <td />
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.top}>
                                <td>
                                  <table className={styles.tbl5}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.heightZero}>
                                          <table className={styles.tbl4}>
                                            <tbody>
                                              <tr className={styles.heightFive}>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEHEAD} ${styles.border}`}
                                                >
                                                  {
                                                    Settings.supportInformation
                                                      .btPricing
                                                  }
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl6}>
                                            <tbody>
                                              <tr>
                                                <td className={styles.td1}>
                                                  <table
                                                    className={styles.tbl6}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.widthFive
                                                          }
                                                        />
                                                        <td
                                                          className={`${styles.MESSAGEBODY} ${styles.top}`}
                                                        >
                                                          <table
                                                            className={
                                                              styles.tbl7
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td>
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactName
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.normalFont
                                                                  }
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .supportInfoData
                                                                      .CONTACT_NAME
                                                                  }
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactEmail
                                                                    }
                                                                    :
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td>
                                                                  <a
                                                                    href={
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactEmailID
                                                                    }
                                                                  >
                                                                    {
                                                                      contextType
                                                                        .state
                                                                        .supportInfoData
                                                                        .CONTACT_EMAIL
                                                                    }
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl8}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEFOOT} ${styles.border2}`}
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.top}>
                                <td>
                                  <table className={styles.tbl9}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.heightZero}>
                                          <table className={styles.tbl4}>
                                            <tbody>
                                              <tr className={styles.heightFive}>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEHEAD} ${styles.border}`}
                                                >
                                                  {
                                                    Settings.supportInformation
                                                      .sapp
                                                  }
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl6}>
                                            <tbody>
                                              <tr>
                                                <td className={styles.td1}>
                                                  <table
                                                    className={styles.tbl6}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.widthFive
                                                          }
                                                        />
                                                        <td
                                                          className={`${styles.MESSAGEBODY} ${styles.top}`}
                                                        >
                                                          <table
                                                            className={
                                                              styles.tbl7
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td>
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .sappEmail
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td>
                                                                  <a
                                                                    href={
                                                                      Settings
                                                                        .supportInformation
                                                                        .sappEmailID_HREF
                                                                    }
                                                                  >
                                                                    {
                                                                      contextType
                                                                        .state
                                                                        .supportInfoData
                                                                        .SAPP_EMAIL
                                                                    }
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl8}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEFOOT} ${styles.border2}`}
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.top}>
                                <td>
                                  <table className={styles.tbl9}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.heightZero}>
                                          <table className={styles.tbl4}>
                                            <tbody>
                                              <tr className={styles.heightFive}>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEHEAD} ${styles.border}`}
                                                >
                                                  {
                                                    Settings.supportInformation
                                                      .hotelRoomDescription
                                                  }
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl6}>
                                            <tbody>
                                              <tr>
                                                <td className={styles.td1}>
                                                  <table
                                                    className={styles.tbl6}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.widthFive
                                                          }
                                                        />
                                                        <td
                                                          className={`${styles.MESSAGEBODY} ${styles.top}`}
                                                        >
                                                          <table
                                                            className={
                                                              styles.tbl7
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                className={
                                                                  styles.spaceAlign
                                                                }>
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactNameRD
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.normalFont
                                                                  }
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .supportInfoData
                                                                      .CONTACT_NAME_RD
                                                                  }
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className={
                                                                    styles.spaceAlign
                                                                  }>
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactEmailRD
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td>
                                                                  <a
                                                                    href={
                                                                      Settings
                                                                        .supportInformation
                                                                        .RDlink
                                                                    }
                                                                  >
                                                                    {" "}
                                                                    Marriott Service Portal
                                                                  </a>
                                                                  {Settings.supportInformation.RDsearch}
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl8}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEFOOT} ${styles.border2}`}
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.top}>
                                <td>
                                  <table className={styles.tbl9}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.heightOne}>
                                          <table className={styles.tbl4}>
                                            <tbody>
                                              <tr className={styles.heightFive}>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEHEAD} ${styles.border}`}
                                                >
                                                  {
                                                    Settings.supportInformation
                                                      .hotelFormattedRoomNames
                                                  }
                                                  <br />
                                                  {
                                                    Settings.supportInformation
                                                      .hotelFormattedRateDescription
                                                  }
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl6}>
                                            <tbody>
                                              <tr>
                                                <td className={styles.td1}>
                                                  <table
                                                    className={styles.tbl6}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.widthFive
                                                          }
                                                        />
                                                        <td
                                                          className={`${styles.MESSAGEBODY} ${styles.top}`}
                                                        >
                                                          <table
                                                            className={
                                                              styles.tbl7
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.spaceAlign
                                                                  }
                                                                >
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactNameFRD
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.normalFont
                                                                  }
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .supportInfoData
                                                                      .CONTACT_NAME_FRD
                                                                  }
                                                                </td>
                                                              </tr>

                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.spaceAlign
                                                                  }
                                                                >
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactEmailFRD
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td>
                                                                  <a
                                                                    href={
                                                                      Settings
                                                                        .supportInformation
                                                                        .FRDlink
                                                                    }
                                                                  >
                                                                    {" "}
                                                                    Marriott Service Portal
                                                                  </a>
                                                                  {Settings.supportInformation.FRDsearch}
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl8}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEFOOT} ${styles.border2}`}
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.top}>
                                <td>
                                  <table className={styles.tbl9}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.heightZero}>
                                          <table className={styles.tbl4}>
                                            <tbody>
                                              <tr className={styles.heightFive}>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEHEAD} ${styles.border}`}
                                                >
                                                  {
                                                    Settings.supportInformation
                                                      .specialCorporatePricingTool
                                                  }
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl6}>
                                            <tbody>
                                              <tr>
                                                <td className={styles.td1}>
                                                  <table
                                                    className={styles.tbl6}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.widthFive
                                                          }
                                                        />
                                                        <td
                                                          className={`${styles.MESSAGEBODY} ${styles.top}`}
                                                        >
                                                          <table
                                                            className={
                                                              styles.tbl7
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.spaceAlign
                                                                  }
                                                                >
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactNameSCPT
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.normalFont
                                                                  }
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .supportInfoData
                                                                      .CONTACT_NAME_SCPT
                                                                  }
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.spaceAlign
                                                                  }
                                                                >
                                                                  <b>
                                                                    {
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactSCPTEmail
                                                                    }
                                                                  </b>
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.widthFive
                                                                  }
                                                                >
                                                                  <>
                                                                    <>&nbsp;</>
                                                                  </>
                                                                </td>
                                                                <td>
                                                                  <a
                                                                    href={
                                                                      Settings
                                                                        .supportInformation
                                                                        .contactSCPTEmailSCPT
                                                                    }
                                                                  >
                                                                    {
                                                                      contextType
                                                                        .state
                                                                        .supportInfoData
                                                                        .CONTACT_SCPT_EMAIL
                                                                    }
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                          <>
                                                            <>&nbsp;</>
                                                          </>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.tbl8}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={`${styles.MESSAGEFOOT} ${styles.border2}`}
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className={styles.height100}>
                                <td />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </table>
                <style>{`
                    nav{
                      display:none!important;
                    } 
                    #subMenu{
                      display:none!important;
                    }
                    #footerID{
                      display: none!important;
                    }
                  `}</style>
              </React.Fragment>
            );
          }}
        </SupportInfoContext.Consumer>
      </SupportInfoContextProvider>
    );
  }
}
