import React, { Component } from "react";
import Settings from "./static/Settings";
import CSelect from "../../../../../../common/components/CSelect";
import styles from "./RFPSettings.css";
import RFPSettingsContext, {
  RFPSettingsContextProvider,
} from "../RFPSettings/context/RFPSettingsContext";
import API from "../RFPSettings/service/API";
import Utils from "../../../../../../common/utils/Utils";
import AccountListContext from "../../../context/AccountListContext";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
//import { CLoader } from "../../../../../../common/components/CLoader";
let contextType = null;

let contextType1 = null;
let initialState;

export default class RFPSettings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const period = contextType1.state.accountListData.selectedAccount.period
      ? contextType1.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");
    const accountrecid = contextType1.state.accountListData.selectedAccount
      .accountrecid
      ? contextType1.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    contextType.setLoader();
    API.getRFPSettingsData(accountrecid, period).then((data) => {
      contextType.setRFPSettingsData(data);
      contextType.resetLoader();
    });
  }

  componentWillUnmount = () => {
    if (contextType.state.formChg) contextType.autoSaveData();
  };

  stringToBoolean(stringVal) {
    switch (stringVal) {
      case "Y":
        return true;
      case "N":
        return false;
      case null:
        return false;
    }
  }

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          contextType1 = accountListContext;
          return (
            <RFPSettingsContext.Consumer>
              {(rfpStettingsContext) => {
                contextType = rfpStettingsContext;
                return (
                  <>
                    {contextType.state.showScreenLoader ? (
                      <div id="loading" className={styles.accountTabLoader}>
                        <div>
                          <img src={screenLoader}></img>
                        </div>
                      </div>
                    ) : null}
                    <React.Fragment>
                      <table className={styles.rfpsetting}>
                        <tbody>
                          <tr style={{ lineHeight: "25px" }}>
                            <td className={styles.fieldName}>
                              {Settings.GBTAFormat.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.gbtaformat
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.gbtaformat
                                  }
                                  id={Settings.GBTAFormat.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.gbtaList
                                  }
                                  keyField={Settings.GBTAFormat.keyField}
                                  valField={Settings.GBTAFormat.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.RFPFieldData.modulesHeading}
                            </td>
                            <td className={styles.fieldName}>
                              <div className={styles.inputChkboxData}>
                                <input
                                  type="checkbox"
                                  id={Settings.checkboxLabel.PB.id}
                                  value={Settings.checkboxLabel.PB.value}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.pb
                                  )}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.PB.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.CS.id}
                                  value={Settings.checkboxLabel.CS.value}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.cs
                                  )}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.CS.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.SS.id}
                                  value={Settings.checkboxLabel.SS.value}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.ss
                                  )}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.SS.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.BD.id}
                                  value={Settings.checkboxLabel.BD.value}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.bd
                                  )}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.BD.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.ES.id}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.es
                                  )}
                                  value={Settings.checkboxLabel.ES.value}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.ES.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.GM.id}
                                  value={Settings.checkboxLabel.GM.value}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.gm
                                  )}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.GM.label}
                                <input
                                  className={styles.marginStyling}
                                  type="checkbox"
                                  id={Settings.checkboxLabel.CSR.id}
                                  checked={this.stringToBoolean(
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.csr
                                  )}
                                  value={Settings.checkboxLabel.CSR.value}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                                {Settings.checkboxLabel.CSR.label}
                              </div>
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.fieldsHeading.label}
                            </td>

                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.num_requiredfields
                                  }
                                </td>
                              ) : (
                                <input
                                  id={Settings.fieldsHeading.id}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.num_requiredfields ===
                                    null
                                      ? ""
                                      : contextType.state.rfpSettingsData
                                          .accountDetailRFP.num_requiredfields
                                  }
                                  type="text"
                                  maxLength={3}
                                  size={3}
                                  onKeyPress={Utils.NumberOnly_onkeypress}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.userDefinedHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <CSelect
                                  id={Settings.userDefinedHeading.id}
                                  className={styles.drpdwnCntr}
                                  ddnOptions={Settings.yesNoOptions}
                                  keyField={
                                    Settings.userDefinedHeading.keyField
                                  }
                                  valField={
                                    Settings.userDefinedHeading.valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.contain_userdefques
                                  }
                                />
                              ) : (
                                <CSelect
                                  id={Settings.userDefinedHeading.id}
                                  ddnOptions={Settings.yesNoOptions}
                                  className={styles.drpdwnCntr}
                                  keyField={
                                    Settings.userDefinedHeading.keyField
                                  }
                                  valField={
                                    Settings.userDefinedHeading.valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.contain_userdefques
                                  }
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td
                              className={styles.fieldName}
                              style={{ verticalAlign: "top" }}
                            >
                              {Settings.addendumHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addquestnotes
                                  }
                                </td>
                              ) : (
                                <textarea
                                  id={Settings.addendumHeading.id}
                                  onKeyPress={contextType.validate}
                                  onBlur={contextType.handleBlur}
                                  className={styles.addendunHeading}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addquestnotes
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                ></textarea>
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.edieRfpHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.edierfp
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.edierfp
                                  }
                                  id={Settings.edieRfpHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.edierfpList
                                  }
                                  keyField={Settings.edieRfpHeading.keyField}
                                  valField={Settings.edieRfpHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>

                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.ediebtHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td></td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.ediebt
                                  }
                                  id={Settings.ediebtHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.edierfpList
                                  }
                                  keyField={Settings.ediebtHeading.keyField}
                                  valField={Settings.ediebtHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.ediegmHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td></td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.edieaq
                                  }
                                  id={Settings.ediegmHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.edierfpList
                                  }
                                  keyField={Settings.ediegmHeading.keyField}
                                  valField={Settings.ediegmHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td
                              className={styles.fieldName}
                              style={{ verticalAlign: "top" }}
                            >
                              {Settings.addReportsHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addrepformat
                                  }
                                </td>
                              ) : (
                                <textarea
                                  id={Settings.addReportsHeading.id}
                                  onKeyPress={contextType.validate}
                                  onBlur={contextType.handleBlur}
                                  className={styles.addendunHeading}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addrepformat
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                ></textarea>
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.maxSeasonsHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxseason
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxseason
                                  }
                                  id={Settings.maxSeasonsHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.maxseasonList
                                  }
                                  keyField={Settings.maxSeasonsHeading.keyField}
                                  valField={Settings.maxSeasonsHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.maxRoomTypesHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxrt
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxrt
                                  }
                                  id={Settings.maxRoomTypesHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.maxrtList
                                  }
                                  keyField={
                                    Settings.maxRoomTypesHeading.keyField
                                  }
                                  valField={
                                    Settings.maxRoomTypesHeading.valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.ratesTypeHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.rtallowed
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.rtallowed
                                  }
                                  id={Settings.ratesTypeHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.rtallowedList
                                  }
                                  keyField={Settings.ratesTypeHeading.keyField}
                                  valField={Settings.ratesTypeHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.rateVisibleHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.ratevisible
                                  }
                                </td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.ratevisible
                                  }
                                  id={Settings.rateVisibleHeading.id}
                                  ddnOptions={
                                    contextType.state.rfpSettingsData
                                      .rfpSettingsDropDowns.ratevisibleList
                                  }
                                  keyField={
                                    Settings.rateVisibleHeading.keyField
                                  }
                                  valField={
                                    Settings.rateVisibleHeading.valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.blackoutFieldsHiddenHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.blackoutdateshidden
                                  }
                                />
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.blackoutdateshidden
                                  }
                                  id={Settings.blackoutFieldsHiddenHeading.id}
                                  ddnOptions={Settings.yesNoOptions}
                                  keyField={
                                    Settings.blackoutFieldsHiddenHeading
                                      .keyField
                                  }
                                  valField={
                                    Settings.blackoutFieldsHiddenHeading
                                      .valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.maxBlackoutDatesHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxnum_blackoutdates
                                  }
                                </td>
                              ) : (
                                <input
                                  id={Settings.maxBlackoutDatesHeading.id}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxnum_blackoutdates ===
                                    null
                                      ? ""
                                      : contextType.state.rfpSettingsData
                                          .accountDetailRFP.maxnum_blackoutdates
                                  }
                                  onKeyPress={Utils.NumberOnly_onkeypress}
                                  onChange={(e) => contextType.handleChange(e)}
                                  type="text"
                                  maxLength={3}
                                  size={3}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.maxBlackoutPeriodsHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.maxnum_blackoutperiod
                                  }
                                </td>
                              ) : (
                                <input
                                  id={Settings.maxBlackoutPeriodsHeading.id}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP
                                      .maxnum_blackoutperiod === null
                                      ? ""
                                      : contextType.state.rfpSettingsData
                                          .accountDetailRFP
                                          .maxnum_blackoutperiod
                                  }
                                  onKeyPress={Utils.NumberOnly_onkeypress}
                                  onChange={(e) => contextType.handleChange(e)}
                                  type="text"
                                  maxLength={2}
                                  size={3}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.hiddenTaxFieldsHeading.label}{" "}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td></td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.taxfields
                                  }
                                  id={Settings.hiddenTaxFieldsHeading.id}
                                  ddnOptions={Settings.yesNoOptions}
                                  keyField={
                                    Settings.hiddenTaxFieldsHeading.keyField
                                  }
                                  valField={
                                    Settings.hiddenTaxFieldsHeading.valField
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td
                              className={styles.fieldName}
                              style={{ verticalAlign: "top" }}
                            >
                              {Settings.additionalNotesHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addnotes_rfp
                                  }
                                </td>
                              ) : (
                                <textarea
                                  id={Settings.additionalNotesHeading.id}
                                  onKeyPress={contextType.validate}
                                  className={styles.addendunHeading}
                                  onBlur={contextType.handleBlur}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.addnotes_rfp
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                ></textarea>
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.presentfcrHeading.label}
                            </td>
                            <td>
                              {" "}
                              {contextType.state.redOnly ? (
                                <td></td>
                              ) : (
                                <CSelect
                                  className={styles.drpdwnCntr}
                                  selectedValue={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.presentfcr
                                  }
                                  id={Settings.presentfcrHeading.id}
                                  ddnOptions={Settings.MPBoptions}
                                  keyField={Settings.presentfcrHeading.keyField}
                                  valField={Settings.presentfcrHeading.valField}
                                  onChange={(e) => contextType.handleChange(e)}
                                />
                              )}
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td
                              className={styles.fieldName}
                              style={{ verticalAlign: "top" }}
                            >
                              {Settings.submissionNotesHeading.label}
                            </td>
                            <td>
                              {contextType.state.redOnly ? (
                                <td>
                                  {
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.filesubmission
                                  }
                                </td>
                              ) : (
                                <textarea
                                  id={Settings.submissionNotesHeading.id}
                                  onKeyPress={contextType.validate}
                                  onBlur={contextType.handleBlur}
                                  className={styles.addendunHeading}
                                  value={
                                    contextType.state.rfpSettingsData
                                      .accountDetailRFP.filesubmission
                                  }
                                  onChange={(e) => contextType.handleChange(e)}
                                ></textarea>
                              )}
                            </td>
                          </tr>
                          <tr className={styles.spaceStyling}></tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              <span style={{ textDecoration: "underline" }}>
                                {Settings.salesHeading.label}{" "}
                              </span>
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.aleaderNameHeading.label}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.accleadname
                              }
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.aleaderPhoneHeading.label}{" "}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.accleadphone
                              }
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.sleaderNameHeading.label}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.sharedaccleadname
                              }
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.sleaderPhoneHeading.label}{" "}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.sharedaccleadphone
                              }
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.btamNameHeading.label}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.btamname
                              }
                            </td>
                          </tr>
                          <tr className={styles.rowStyling}>
                            <td className={styles.fieldName}>
                              {Settings.btamPhoneHeading.label}
                            </td>
                            <td className={styles.fieldValue}>
                              {
                                contextType.state.rfpSettingsData
                                  .accountDetailRFP.btamphone
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </React.Fragment>
                  </>
                );
              }}
            </RFPSettingsContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
