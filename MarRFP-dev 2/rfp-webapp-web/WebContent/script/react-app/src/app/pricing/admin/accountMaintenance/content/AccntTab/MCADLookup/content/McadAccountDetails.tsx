import React, { Component } from "react";
import styles from "./McadAccountDetails.css";

import McadlookupContext, {
  McadlookupContextProvider,
} from "../context/McadlookupContext";
import btnClose from "../../../../../../../common/assets/img/button/btnClose.gif";
import Settings from "../static/Settings";

interface IProps {}
interface IState {
  contextType: any;
}
export default class McadAccountDetails extends Component<IProps, IState> {
  static contextType = McadlookupContext;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.context.setState({ ...this.context.state, mcadDetailLoad: true });
  }

  componentWillUnmount = () => {
    if (this.context.state.formChgStatus) this.context.autoSaveData();
  };
  fetchAccountRecId() {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("accountrecid");
  }

  render() {
    if (this.context.state.mcadDetailLoad === true) {
      return (
        <div>
          <div>
            <table>
              <tr>
                <td>
                  <div className={styles.fieldNamewidth}>
                    <table className={styles.zeroHeight}>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.BusinessName}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.businessname
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.BusinessID}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.businessid
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.BusinessLevel}{" "}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.businessleveldesc
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.ParentBusinessName}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.parentbusinessname
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.ParentBusinessID}{" "}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.parentbusinessid
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.UltimateBusinessName}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.ultimatebusinessname
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.UltimateBusinessID}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.ultimatebusinessid
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.GlobalBusinessID}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.globalbusinessid
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.StreetAddress}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.streetaddress
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.City}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.cityname
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.StateProvince}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.state
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.Zipcode}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.zipcode
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.PrimarySICDescription}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.siccode1desc
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.SiteEmployeeNumber}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.siteemployeenumber
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.AreaCode}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.areacode
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.PhoneNumber}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.phonenumber
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.PrimaryNAICSDescription}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.primarynaicsdesc
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.LocationDescription}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.locationdesc
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.CompanyType}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.companytypedesc
                          }{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.MCADlookupscreen.CBSACodeDescription}
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {
                            this.context.state.mcadAccountDetails
                              .mcadAccountDetaisList.cbsacodedesc
                          }{" "}
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <img
                  src={btnClose}
                  alt={Settings.searchAccount.btnClose}
                  className={styles.serachBtnClick}
                  onClick={this.context.showModalMcadAccount}
                />
              </tr>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <table>
          <tr>
            <td>{Settings.MCADlookupscreen.loadingMcadDetailMessage}</td>
          </tr>
        </table>
      );
    }
  }
}
