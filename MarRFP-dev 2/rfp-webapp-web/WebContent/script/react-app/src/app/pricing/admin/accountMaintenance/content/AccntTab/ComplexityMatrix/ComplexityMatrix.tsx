import React, { Component } from "react";
import styles from "./ComplexityMatrix.css";
//@ts-ignore
import Settings from "./static/Settings";
//@ts-ignore
import ComplexityMatrixContext, {
  ComplexityMatrixContextProvider,
} from "./context/ComplexityMatrixContext";
//@ts-ignore
import API from "./service/API";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import CCalendar from "../../../../../../common/components/CCalendar";
import CSelect from "../../../../../../common/components/CSelect";
import AccountListContext from "../../../context/AccountListContext";
import Utils from "../../../../../../common/utils/Utils";
import CModal from "../../../../../../common/components/CModal";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
//import moment from "moment";
//import { CLoader } from "../../../../../../common/components/CLoader";

let contextType = null;
let parentContextType = null;
let accountRecId = null;
let period = null;
const tabIndex = 0;
interface IProps {}
interface IState {
  valuesRFP: any;
  valuesReg: any;
  countRFP: number;
  countReg: number;
  totalRFP: any;
  counterArray: any;
  data: any;
}

export default class ComplexityMatrix extends Component<IProps, IState> {
  rfpFilesSentRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.rfpFilesSentRef = React.createRef();
    this.state = {
      valuesRFP: [],
      valuesReg: [],
      countRFP: 0,
      countReg: 0,
      totalRFP: 0,
      counterArray: [],
      data: [],
    };
  }

  componentDidMount() {
    accountRecId = parentContextType.state.accountListData.selectedAccount
      .accountrecid
      ? parentContextType.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    period = parentContextType.state.accountListData.selectedAccount.period
      ? parentContextType.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");
    contextType.setLoader();
    API.getComplexityMatrixdata(accountRecId, period).then((data) => {
      contextType.setAccountData(data);
      const accountCompDropDowns = {
        ...contextType.state.accountCompDropDowns,
      };
      accountCompDropDowns.addQuestCompList =
        data.accountCompDropDowns.addQuestCompList;
      accountCompDropDowns.satRatingList =
        data.accountCompDropDowns.satRatingList;
      accountCompDropDowns.tacBonusList =
        data.accountCompDropDowns.tacBonusList;

      accountCompDropDowns.addQuestCompList.splice(0, 0, {
        ratingval: null,
        ratingtext: "",
      });

      accountCompDropDowns.satRatingList.splice(0, 0, {
        ratingval: null,
        ratingtext: "",
      });
      accountCompDropDowns.tacBonusList.splice(0, 0, {
        ratingval: null,
        ratingtext: "",
      });
      contextType.state.accountFromToData.accountdata.accountDetailCompMatrix.rfpfilesent.map(
        (rfpFileSentItem) => {
          contextType.state.accountFromToData.accountdata;
        }
      );
      contextType.state.selectedRfpFilesSent = [];
      contextType.state.selectedRegBatchesSent = [];
      contextType.copyingRfpFilesSentArray();
      contextType.copyingRegBatchesArray();
      contextType.setState({
        ...contextType.state,
        accountCompDropDowns: accountCompDropDowns,
        isComplete: true,
      });
      contextType.resetLoader();
    });
  }

  componentWillUnmount = () => {
    if (contextType.state.formChg) contextType.autoSaveData();
  };

  date = new Date();
  setDate() {}
  fetchAccountRecId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("accountrecid");
  }

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          parentContextType = accountListContext;
          return (
            <ComplexityMatrixContext.Consumer>
              {(complexitycontext) => {
                contextType = complexitycontext;
                if (contextType.state.isComplete) {
                  return (
                    <>
                      {contextType.state.showScreenLoader ? (
                        <div id="loading" className={styles.accountTabLoader}>
                          <div>
                            <img src={screenLoader}></img>
                          </div>
                        </div>
                      ) : null}
                      <>
                        <div tabIndex={tabIndex}>
                          <form name="thisForm" method="post">
                            <table
                              className={styles.Filter_Value_pad2_space2_Height}
                            >
                              <tbody>
                                <tr className={styles.height25} />
                                <tr>
                                  <td
                                    className={
                                      styles.field_Name_Verticalbaseline
                                    }
                                  >
                                    {
                                      Settings.complexityMatrix.mergacqrename
                                        .label
                                    }
                                  </td>
                                  <td>
                                    <div>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <textarea
                                                id={
                                                  Settings.complexityMatrix
                                                    .mergacqrename.id
                                                }
                                                className={styles.mergacqrename}
                                                onKeyPress={(e) =>
                                                  Utils.checklen_onkeypress(
                                                    e,
                                                    255
                                                  )
                                                }
                                                onChange={
                                                  contextType.onMergacqrenameChangeHandler
                                                }
                                                value={
                                                  contextType.state
                                                    .accountFromToData
                                                    .accountdata
                                                    .accountDetailCompMatrix
                                                    .mergacqrename
                                                }
                                                onBlur={
                                                  contextType.onMergacqrenameBlurHandler
                                                }
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {Settings.complexityMatrix.addendum.label}
                                  </td>
                                  <td>
                                    <CSelect
                                      id={
                                        Settings.complexityMatrix.addquestcomp
                                          .id
                                      }
                                      selectedValue={
                                        contextType.state.accountFromToData
                                          .accountdata.accountDetailCompMatrix
                                          .addquestcomp
                                      }
                                      ddnOptions={
                                        contextType.state.accountCompDropDowns
                                          .addQuestCompList
                                      }
                                      keyField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      valField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      onChange={(event) =>
                                        contextType.onChangeData(
                                          Settings.complexityMatrix.addquestcomp
                                            .id,
                                          event
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {Settings.complexityMatrix.sales.label}
                                  </td>

                                  <div>
                                    <CSelect
                                      id={
                                        Settings.complexityMatrix.satrating.id
                                      }
                                      selectedValue={
                                        contextType.state.accountFromToData
                                          .accountdata.accountDetailCompMatrix
                                          .satrating
                                      }
                                      ddnOptions={
                                        contextType.state.accountCompDropDowns
                                          .satRatingList
                                      }
                                      keyField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      valField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      onChange={(event) =>
                                        contextType.onChangeData(
                                          Settings.complexityMatrix.satrating
                                            .id,
                                          event
                                        )
                                      }
                                    />
                                  </div>
                                </tr>

                                <tr>
                                  <td className={styles.field_Name}> </td>
                                  <td>
                                    <div
                                      style={{
                                        textAlign: "right",
                                        width: "100%",
                                      }}
                                    >
                                      <a
                                        href="javascript:void(0);"
                                        className={styles.link}
                                        onClick={
                                          contextType.onlinkExcelDownload
                                        }
                                      >
                                        {
                                          Settings.complexityMatrix.account
                                            .label
                                        }
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {
                                      Settings.complexityMatrix.totalAccount
                                        .label
                                    }
                                  </td>
                                  <td>
                                    <CSelect
                                      id={Settings.complexityMatrix.tacbonus.id}
                                      selectedValue={
                                        contextType.state.accountFromToData
                                          .accountdata.accountDetailCompMatrix
                                          .tacbonus
                                      }
                                      ddnOptions={
                                        contextType.state.accountCompDropDowns
                                          .tacBonusList
                                      }
                                      keyField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      valField={
                                        Settings.complexityMatrix.ratingtext.id
                                      }
                                      onChange={(event) =>
                                        contextType.onChangeData(
                                          Settings.complexityMatrix.tacbonus.id,
                                          event
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {
                                      Settings.complexityMatrix.tacbonuscomments
                                        .label
                                    }
                                  </td>
                                  <td>
                                    <div>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <textarea
                                                id={
                                                  Settings.complexityMatrix
                                                    .tacbonuscomments.id
                                                }
                                                onChange={
                                                  contextType.onTacbonusCommentsChangeHandler
                                                }
                                                onKeyPress={(e) =>
                                                  Utils.checklen_onkeypress(
                                                    e,
                                                    255
                                                  )
                                                }
                                                value={
                                                  contextType.state
                                                    .accountFromToData
                                                    .accountdata
                                                    .accountDetailCompMatrix
                                                    .tacbonuscomments
                                                }
                                                onBlur={
                                                  contextType.onTacbonusCommentsBlurHandler
                                                }
                                                className={styles.mergacqrename}
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {Settings.complexityMatrix.rfpFiles.label}
                                  </td>
                                  <td className={styles.field_Name}>
                                    {
                                      Settings.complexityMatrix.renegotiation
                                        .label
                                    }
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name}>
                                    {
                                      Settings.complexityMatrix.totrfpfilesent
                                        .label
                                    }
                                    &nbsp;
                                    <input
                                      className={styles.field_label}
                                      id={
                                        Settings.complexityMatrix.totrfpfilesent
                                          .id
                                      }
                                      value={
                                        contextType.state.accountFromToData
                                          .accountdata.accountDetailCompMatrix
                                          .totrfpfilesent
                                      }
                                      disabled
                                    />
                                  </td>
                                  <td className={styles.field_Name}>
                                    {
                                      Settings.complexityMatrix.totrenegsubmit
                                        .label
                                    }
                                    <input
                                      className={styles.field_label}
                                      id={
                                        Settings.complexityMatrix.totrenegsubmit
                                          .id
                                      }
                                      value={
                                        contextType.state.accountFromToData
                                          .accountdata.accountDetailCompMatrix
                                          .totrenegsubmit
                                      }
                                      disabled
                                    />
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.verticalAlign}>
                                    <table cellPadding={0} cellSpacing={0}>
                                      <tbody>
                                        {contextType.state.selectedRfpFilesSent
                                          .length === 0 ? (
                                          <tr>
                                            <td>
                                              <label
                                                className={styles.mergerStyle}
                                                title={
                                                  Settings.complexityMatrix
                                                    .rowInserted
                                                }
                                                onClick={
                                                  contextType.addClickNewRFP
                                                }
                                              >
                                                +
                                              </label>
                                            </td>
                                            <td>
                                              <div
                                                className={styles.rfpCalendar}
                                                title={
                                                  Settings.complexityMatrix
                                                    .dateFormatMessage
                                                }
                                              >
                                                <CCalendar
                                                  id={
                                                    Settings.complexityMatrix
                                                      .rfpFiles.id
                                                  }
                                                  inputId={
                                                    Settings.complexityMatrix
                                                      .rfpFiles.id
                                                  }
                                                  value={""}
                                                  onChange={(e) =>
                                                    contextType.rfpCalendarChange(
                                                      e,
                                                      0
                                                    )
                                                  }
                                                  onInput={(e) =>
                                                    contextType.rfpInputChange(
                                                      e,
                                                      0
                                                    )
                                                  }
                                                  onHide={() =>
                                                    contextType.rfpCalendarHide(
                                                      0
                                                    )
                                                  }
                                                  onBlur={(e) =>
                                                    contextType.onDateBlurHandler(
                                                      e
                                                    )
                                                  }
                                                  hasCustomMonth={true}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                        ) : (
                                          <div>
                                            <tr>
                                              {contextType.state.selectedRfpFilesSent.map(
                                                (data, i) => (
                                                  <div
                                                    key={i}
                                                    className={
                                                      styles.addinputrow
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        styles.labelWidth
                                                      }
                                                    >
                                                      <label
                                                        className={
                                                          styles.mergerLoop
                                                        }
                                                        onClick={
                                                          contextType.addClickNewRFP
                                                        }
                                                        title={
                                                          Settings
                                                            .complexityMatrix
                                                            .rowInserted
                                                        }
                                                      >
                                                        + <>&nbsp;</>
                                                      </label>
                                                      {i !== 0 ? (
                                                        <label
                                                          onClick={(e) =>
                                                            contextType.removeClickRfpNew(
                                                              e,
                                                              i
                                                            )
                                                          }
                                                          className={
                                                            styles.padding2
                                                          }
                                                          title={
                                                            Settings
                                                              .complexityMatrix
                                                              .rowDeleted
                                                          }
                                                        >
                                                          - <>&nbsp;</>
                                                        </label>
                                                      ) : null}{" "}
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.loopCalendar
                                                      }
                                                      title={
                                                        Settings
                                                          .complexityMatrix
                                                          .dateFormatMessage
                                                      }
                                                    >
                                                      <CCalendar
                                                        id={`accountDetailCompMatrix.rfpfilesent[${i}].dateinfo`}
                                                        inputId={`accountDetailCompMatrix.rfpfilesent[${i}].dateinfo`}
                                                        value={
                                                          contextType.state
                                                            .selectedRfpFilesSent[
                                                            i
                                                          ].dateinfo !==
                                                          undefined
                                                            ? Utils.convertStrToDate(
                                                                contextType
                                                                  .state
                                                                  .selectedRfpFilesSent[
                                                                  i
                                                                ].dateinfo
                                                              )
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          contextType.rfpCalendarChange(
                                                            e,
                                                            i
                                                          )
                                                        }
                                                        onInput={(e) =>
                                                          contextType.rfpInputChange(
                                                            e,
                                                            i
                                                          )
                                                        }
                                                        onHide={() =>
                                                          contextType.rfpCalendarHide(
                                                            i
                                                          )
                                                        }
                                                        onBlur={(e) =>
                                                          contextType.onDateBlurHandler(
                                                            e,
                                                            i,
                                                            "selectedRfpFilesSent"
                                                          )
                                                        }
                                                        hasCustomMonth={true}
                                                      />
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </tr>
                                          </div>
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                  <td className={styles.verticalAlign}>
                                    <table cellPadding={0} cellSpacing={0}>
                                      <tbody>
                                        {contextType.state
                                          .selectedRegBatchesSent.length ===
                                        0 ? (
                                          <tr>
                                            <td className={styles.padding0}>
                                              <label
                                                className={styles.mergerStyle}
                                                title={
                                                  Settings.complexityMatrix
                                                    .rowInserted
                                                }
                                                onClick={
                                                  contextType.addClicknew
                                                }
                                              >
                                                +
                                              </label>
                                              <div
                                                className={styles.loopCalendar}
                                                title={
                                                  Settings.complexityMatrix
                                                    .dateFormatMessage
                                                }
                                              >
                                                <CCalendar
                                                  id={
                                                    Settings.complexityMatrix
                                                      .renegotiation.id
                                                  }
                                                  inputId={
                                                    Settings.complexityMatrix
                                                      .renegotiation.id
                                                  }
                                                  value={""}
                                                  onChange={(e) =>
                                                    contextType.regBatchCalendarChange(
                                                      e,
                                                      0
                                                    )
                                                  }
                                                  onInput={(e) =>
                                                    contextType.regInputChange(
                                                      e,
                                                      0
                                                    )
                                                  }
                                                  onHide={() =>
                                                    contextType.regBatchCalendarHide(
                                                      0
                                                    )
                                                  }
                                                  onBlur={(e) =>
                                                    contextType.onDateBlurHandler(
                                                      e
                                                    )
                                                  }
                                                  hasCustomMonth={true}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                        ) : (
                                          <div>
                                            <tr>
                                              {contextType.state.selectedRegBatchesSent.map(
                                                (data, i) => (
                                                  <div
                                                    key={i}
                                                    className={
                                                      styles.addinputrow
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        styles.labelWidth
                                                      }
                                                    >
                                                      <label
                                                        onClick={
                                                          contextType.addClicknew
                                                        }
                                                        className={
                                                          styles.mergerLoop
                                                        }
                                                        title={
                                                          Settings
                                                            .complexityMatrix
                                                            .rowInserted
                                                        }
                                                      >
                                                        + <>&nbsp;</>
                                                      </label>
                                                      {i !== 0 ? (
                                                        <label
                                                          onClick={(e) =>
                                                            contextType.removeClickRegNew(
                                                              e,
                                                              i
                                                            )
                                                          }
                                                          className={
                                                            styles.padding2
                                                          }
                                                          title={
                                                            Settings
                                                              .complexityMatrix
                                                              .rowDeleted
                                                          }
                                                        >
                                                          - <>&nbsp;</>
                                                        </label>
                                                      ) : null}{" "}
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.loopCalendar
                                                      }
                                                      title={
                                                        Settings
                                                          .complexityMatrix
                                                          .dateFormatMessage
                                                      }
                                                    >
                                                      <CCalendar
                                                        id={`accountDetailCompMatrix.renegsubmit[${i}].dateinfo`}
                                                        inputId={`accountDetailCompMatrix.renegsubmit[${i}].dateinfo`}
                                                        value={
                                                          contextType.state
                                                            .selectedRegBatchesSent[
                                                            i
                                                          ].dateinfo !==
                                                          undefined
                                                            ? Utils.convertStrToDate(
                                                                contextType
                                                                  .state
                                                                  .selectedRegBatchesSent[
                                                                  i
                                                                ].dateinfo
                                                              )
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          contextType.regBatchCalendarChange(
                                                            e,
                                                            i
                                                          )
                                                        }
                                                        onInput={(e) =>
                                                          contextType.regInputChange(
                                                            e,
                                                            i
                                                          )
                                                        }
                                                        onHide={() =>
                                                          contextType.regBatchCalendarHide(
                                                            i
                                                          )
                                                        }
                                                        onBlur={(e) =>
                                                          contextType.onDateBlurHandler(
                                                            e,
                                                            i,
                                                            "selectedRegBatchesSent"
                                                          )
                                                        }
                                                        hasCustomMonth={true}
                                                      />
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </tr>
                                          </div>
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr className={styles.height5} />
                                <tr>
                                  <td className={styles.field_Name_Paddingleft}>
                                    {
                                      Settings.complexityMatrix
                                        .rateauditcomments.label
                                    }
                                  </td>
                                  <td>
                                    <div>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <textarea
                                                id={
                                                  Settings.complexityMatrix
                                                    .rateauditcomments.id
                                                }
                                                onChange={
                                                  contextType.onRateAuditCommentsChangeHandler
                                                }
                                                onKeyPress={(e) =>
                                                  Utils.checklen_onkeypress(
                                                    e,
                                                    255
                                                  )
                                                }
                                                value={
                                                  contextType.state
                                                    .accountFromToData
                                                    .accountdata
                                                    .accountDetailCompMatrix
                                                    .rateauditcomments
                                                }
                                                onBlur={
                                                  contextType.onRateAuditCommentsBlurHandler
                                                }
                                                className={styles.mergacqrename}
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <style>
                              {`
                          .p-datepicker{
                            padding : 0px !important;
                            border-radius : 3px;
                          }
                          .p-datepicker-inline {
                            flex-direction: column;
                            position: absolute;
                          }
                          .p-datepicker-header{
                            background: #e9e9e9 !important;
                            border-radius: 3px !important;
                            padding: 0px !important
                          }
                          .p-datepicker-group{
                            padding: 3px !important;
                          }
                          .p-datepicker-month{
                            height: 20px;
                            margin-right: 0px !important;
                          }
                          .p-datepicker-year{
                            height: 20px;
                          }
                          .p-datepicker table{
                            font-size: 11px;
                            margin: 0px !important;
                            border-collapse: unset !important;
                          }
                          .p-datepicker table td {
                            padding: 0px !important;
                          }
                          .p-datepicker table td span{
                            border: 1px solid #c5c5c5 !important;
                            justify-content: flex-end !important;
                            border-radius : 0px !important;
                            width: 1.7rem !important;
                            height: 1.2rem !important;
                            padding 3px !important;                          
                          }
                          .p-datepicker table td.p-datepicker-today > span{
                            background: #fffa90;
                          }
                          .p-disabled{
                            display: none !important;
                          }
                          .p-inputtext{
                            width: 135px !important;
                            height: 15px;
                            border-radius: 2px !important;
                            font-size: 11px !important;
                            padding: 0px;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:focus,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:focus{
                            box-shadow: none !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:enabled:hover,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:enabled:hover{
                            color: #e9e9e9 !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-title select:focus{
                            box-shadow: none !important;
                            border-color: #000000 !important;
                          }
                          .pi-chevron-left:before{
                            content: "\\e928";
                            background: #000000;
                            border-color: transparent !important;
                            border-radius: 50%;
                          }
                          .pi-chevron-right:before{
                            content: "\\e92a";
                            background: #000000;
                            border-color: transparent !important;
                            border-radius: 50%;
                          }
                          .p-datepicker table td span{
                            background: #f6f6f6;
                          }
                          .p-datepicker:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled):hover{
                            background:#ededed;
                            border:1px solid #cccccc !important;
                            color:#2b2b2b;
                          }
                        `}
                            </style>
                          </form>
                        </div>
                        {contextType.isAlertMsg ? (
                          <CModal
                            title={"Alert Message"}
                            xPosition={-250}
                            yPosition={-60}
                            onClose={(e) => {
                              contextType.setIsAlertMsg(false);
                            }}
                            show={contextType.isAlertMsg}
                          >
                            <div
                              style={{
                                background: "#fff",
                                borderTop: "1px solid #d3d3d3",
                                padding: "10px",
                              }}
                            >
                              {Settings.complexityMatrix.alertMsg}
                            </div>
                          </CModal>
                        ) : (
                          ""
                        )}
                      </>
                    </>
                  );
                } else {
                  return "";
                }
              }}
            </ComplexityMatrixContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
