import React, { useEffect, useContext } from "react";
import styles from "./RequestSpecialReports.css";
import Settings from "../static/Settings";
import CSelect from "../../../../common/components/CSelect";
import SubmitBtnImg from "../../../../common/assets/img/button/btnSubmit.gif";
import classnames from "classnames";
import API from "../service/API";
import btnRetrieve from "../../../../common/assets/img/button/btnRetrieve.gif";
import CIFrame from "../../../../common/components/CIFrame";
import CPageTitle from "../../../../common/components/CPageTitle";
import RequestSpecialReportsContext, {
  IRequestSpecialReportsContext,
} from "../context/RequestSpecialReportsContext";
//import CognosPreload from "../../../../common/components/CognosPreload";

const RequestSpecialReports = (): JSX.Element => {
  const contextType = useContext(
    RequestSpecialReportsContext
  ) as IRequestSpecialReportsContext;

  useEffect(() => {
    API.getReportType().then((data) => {
      contextType.setReportsData(data);
    });

    return () => {
      const stateDataToReset = { ...Settings.initialStateData };
      contextType.setState(stateDataToReset);
    };
  }, []);

  const stringToBoolean = (stringVal) => {
    switch (stringVal) {
      case "On":
        return true;
      case "Y":
        return true;
      case "N":
        return false;
      case null:
        return false;
      default:
        return false;
    }
  };

  return (
    <React.Fragment>
      {contextType.state.isDataLoaded ? (
        <>
          <CPageTitle title={Settings.requestSpecialReports} />
          {contextType.state.isSubmitBtnClicked ? (
            <div>
              <a
                href="javascript:void(0);"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#3166cc",
                }}
                onClick={() => {
                  const selectedData = {
                    ...contextType.state.requestSpecialReportsData.filterValues,
                  };
                  selectedData.emailMe = "N";
                  contextType.setState({
                    ...contextType.state,
                    isSubmitBtnClicked: false,
                    requestSpecialReportsData: {
                      ...contextType.state.requestSpecialReportsData,
                      filterValues: selectedData,
                    },
                  });
                }}
              >
                Back
              </a>
              {contextType.state.isDataError ? (
                <span style={{ display: "block", marginTop: 12 }}>
                  {Settings.errorMessage}
                </span>
              ) : (
                <CIFrame
                  src={contextType.state.reportUrl}
                  // hiddenSrc={contextType.state.hiddenUrl}
                  id={Settings.banner}
                  componentName={"viewReort"}
                  width="100%"
                  height="100%"
                ></CIFrame>
              )}
            </div>
          ) : (
            <div className={styles.padding}>
              {/*-------------------- Report--------------------------- */}
              <tr className={styles.em2TdPaddingBottom}>
                <td className="nowrapCell">{Settings.labels.Report}</td>
                <td>
                  {contextType.state.requestSpecialReportsData.noFilterOptions
                    .noFilterLists.reportlist != null && (
                    <CSelect
                      id={Settings.recorddropdown.id}
                      name={Settings.recorddropdown.name}
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.reportlist
                      }
                      keyField={Settings.ControlKeyValues.cSelectKeyField}
                      valField={Settings.ControlKeyValues.cSelectValueField}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .report != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.report
                          : Settings.blankReport.report_name
                      }
                      onChange={(e) => contextType.chgFilterOnClick(e)}
                    />
                  )}
                </td>
              </tr>

              {/*-------------------- Year--------------------------- */}
              {contextType.state.requestSpecialReportsData.filterValues != null
                ? contextType.state.requestSpecialReportsData.noFilterOptions
                    .reportDetails.allow_period === Settings.yes.value && (
                    <tr className={styles.em2TdPaddingBottom}>
                      <td className="nowrapCell">{Settings.labels.Year}</td>
                      <td>
                        <CSelect
                          id={Settings.period.id}
                          selectedValue={
                            contextType.state.requestSpecialReportsData
                              .filterValues.period
                          }
                          ddnOptions={
                            contextType.state.requestSpecialReportsData
                              .noFilterOptions.noFilterLists.periodList
                          }
                          keyField={Settings.period.keyField}
                          valField={Settings.period.valField}
                          onChange={(e) => contextType.changePeriod(e)}
                          className={classnames(
                            styles.periodfield,
                            styles.yrmargin
                          )}
                        />
                      </td>
                    </tr>
                  )
                : null}

              {/*-------------------- Account Registration--------------------------- */}

              {contextType.state.requestSpecialReportsData.filterValues
                .report != null
                ? contextType.state.requestSpecialReportsData.filterValues.report.startsWith(
                    Settings.accountRegistration
                  ) && (
                    <tr>
                      <td colSpan={2}>
                        <table
                          id={Settings.table1.id}
                          className={styles.field_Name}
                        >
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                id={Settings.allnewregistrations.id}
                                name={Settings.allnewregistrations.name}
                                onChange={contextType.allNew}
                                checked={contextType.state.isAllNew}
                                value={contextType.state.isAllNewValue}
                              />
                              Show New Accounts Only.
                            </td>
                          </tr>

                          <tr>
                            <td height={10}></td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                id={Settings.showchange.id}
                                className={
                                  contextType.state.isAllNew
                                    ? styles.isHidden
                                    : styles.isVisible
                                }
                              >
                                Show accounts entered on or after:
                                <input
                                  className={styles.FilterSelect}
                                  id={Settings.changeDate.id}
                                  name={Settings.changeDate.name}
                                  onChange={contextType.date_onchange}
                                  value={contextType.state.dateChangeVal}
                                />
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  )
                : null}
              {/*-------------------- Account Type--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_accounttype === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.accountType}</td>
                  <td>
                    <CSelect
                      id={Settings.accountType.id}
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.accountSegmentList
                      }
                      keyField={Settings.accountType.keyField}
                      valField={Settings.accountType.valField}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .accountType != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.accountType
                          : Settings.blankAccountSegment.accounttype
                      }
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                      onChange={contextType.changeAccountSegment}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- Account--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_account === Settings.yes.value && (
                <tr className={styles.em2TdPaddingBottom}>
                  <td className="nowrapCell">{Settings.labels.account}</td>
                  <td>
                    <CSelect
                      id={Settings.account.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .accountrecid != null
                          ? parseInt(
                              contextType.state.requestSpecialReportsData
                                .filterValues.accountrecid
                            )
                          : Settings.blankAccount.accountrecid
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.accountList
                      }
                      keyField={Settings.account.keyField}
                      valField={Settings.account.valField}
                      onChange={contextType.changeAccount}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- proximity sub category--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_proximitysubcat === Settings.yes.value && (
                <tr className={styles.em3TdPaddingBottom}>
                  <td className="nowrapCell">
                    {Settings.labels.subCategory}
                    <br /> {Settings.labels.optional}
                  </td>
                  <td>
                    {contextType.state.requestSpecialReportsData.filterValues
                      .retrieveSubCat === Settings.yes.value ? (
                      <CSelect
                        id={Settings.proximityList.id}
                        selectedValue={
                          contextType.state.requestSpecialReportsData
                            .filterValues.proximitySubCatCode != null
                            ? parseInt(
                                contextType.state.requestSpecialReportsData
                                  .filterValues.proximitySubCatCode
                              )
                            : Settings.blankProximity.siccode1
                        }
                        ddnOptions={
                          contextType.state.requestSpecialReportsData
                            .noFilterOptions.noFilterLists.proximityList
                        }
                        keyField={Settings.proximityList.keyField}
                        valField={Settings.proximityList.valField}
                        onChange={contextType.handleChange}
                        className={classnames(
                          styles.periodfield,
                          styles.yrmargin
                        )}
                      />
                    ) : (
                      <div className={styles.margin10PositionAbsolute}>
                        <img
                          className={styles.btnSubmit}
                          onClick={contextType.getSubCatData_onclick}
                          src={btnRetrieve}
                          id={Settings.retrievebtn.id}
                          style={{ height: "20px" }}
                        />

                        <input
                          type="hidden"
                          name={Settings.retrieveSubCat.name}
                          id={Settings.retrieveSubCat.id}
                          value={contextType.state.retrieveSubCat}
                        ></input>
                      </div>
                    )}
                  </td>
                </tr>
              )}

              {/*-------------------- Region--------------------------- */}

              {(contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_region === Settings.yes.value ||
                contextType.state.requestSpecialReportsData.noFilterOptions
                  .reportDetails.allow_region === Settings.l.value) && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.region}</td>
                  <td>
                    <CSelect
                      id={Settings.region.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .regionid != null
                          ? parseInt(
                              contextType.state.requestSpecialReportsData
                                .filterValues.regionid
                            )
                          : Settings.blankRegion.areaid
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.regionList
                      }
                      keyField={Settings.region.keyField}
                      valField={Settings.region.valField}
                      onChange={(e) => contextType.handleChange(e)}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- Hotel--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_onehotel === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.hotel}</td>
                  <td>
                    <CSelect
                      id={Settings.hotel.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .marshaCode != null
                          ? parseInt(
                              contextType.state.requestSpecialReportsData
                                .filterValues.marshaCode
                            )
                          : Settings.blankHotel.marshacode
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.hotelList
                      }
                      keyField={Settings.hotel.keyField}
                      valField={Settings.hotel.valField}
                      onChange={contextType.handleChange}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- EID--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_eid === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.eid}</td>
                  <td>
                    <input
                      type="text"
                      id={Settings.eid.id}
                      name={Settings.eid.name}
                      maxLength={10}
                      value={
                        contextType.state.requestSpecialReportsData.filterValues
                          .eid != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.eid
                          : null
                      }
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- Role--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.req_roles === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.role}</td>
                  <td>
                    <CSelect
                      id={Settings.role.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .role != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.role
                          : Settings.blankRole.role
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.roleList
                      }
                      keyField={Settings.role.keyField}
                      valField={Settings.role.valField}
                      onChange={contextType.handleChange}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- Quarter--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_quarter === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.quarter}</td>
                  <td>
                    <CSelect
                      id={Settings.quarter.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .quarter != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.quarter
                          : Settings.blankQuarter.quartername
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.quarterList
                      }
                      keyField={Settings.quarter.keyField}
                      valField={Settings.quarter.valField}
                      onChange={contextType.handleChange}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- account plan modules--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.acctplan_options === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.module}</td>
                  <td>
                    <CSelect
                      id={Settings.module.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .sappModule != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.sappModule
                          : Settings.blankAccPlanModule.moduleid
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.sappmoduleList
                      }
                      keyField={Settings.module.keyField}
                      valField={Settings.module.valField}
                      onChange={contextType.handleChange}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}
              {/*-------------------- global sales leader modules--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_saleslist === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">
                    {Settings.labels.globalTeamLead}
                  </td>
                  <td>
                    <CSelect
                      id={Settings.globalLeader.id}
                      selectedValue={
                        contextType.state.requestSpecialReportsData.filterValues
                          .globalLeaderEID != null
                          ? contextType.state.requestSpecialReportsData
                              .filterValues.globalLeaderEID
                          : Settings.blankGlobalSales.eid
                      }
                      ddnOptions={
                        contextType.state.requestSpecialReportsData
                          .noFilterOptions.noFilterLists.globalSalesContacts
                      }
                      keyField={Settings.globalLeader.keyField}
                      valField={Settings.globalLeader.valField}
                      onChange={contextType.handleChange}
                      className={classnames(
                        styles.periodfield,
                        styles.yrmargin
                      )}
                    />
                  </td>
                </tr>
              )}

              {/*-------------------- Date Range--------------------------- */}

              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.req_daterange === Settings.yes.value && (
                <tr>
                  <td className="nowrapCell">{Settings.labels.dateRange}</td>
                  <td>
                    <input
                      className={classnames(
                        styles.FilterSelect,
                        styles.yrmargin
                      )}
                      id={Settings.dateRangeFilter.fromDate.id}
                      name={Settings.dateRangeFilter.fromDate.name}
                      onChange={(e) =>
                        contextType.daterange_onchange(e, "from")
                      }
                      onBlur={contextType.validate}
                      defaultValue={
                        "" ||
                        contextType.state.requestSpecialReportsData.filterValues
                          .dateRangeFilter === null
                          ? ""
                          : contextType.state.requestSpecialReportsData
                              .filterValues.dateRangeFilter.strFromDate
                      }
                    />
                    {contextType.state.requestSpecialReportsData.filterValues
                      .report != Settings.eEdieProfileUsage && (
                      <span className={styles.px5marginLeft}>
                        {`To:`}
                        <input
                          className={classnames(
                            styles.FilterSelect,
                            styles.px5marginLeft
                          )}
                          id={Settings.dateRangeFilter.toDate.id}
                          name={Settings.dateRangeFilter.toDate.name}
                          onChange={(e) =>
                            contextType.daterange_onchange(e, "from")
                          }
                          onBlur={contextType.validate}
                          defaultValue={
                            "" ||
                            contextType.state.requestSpecialReportsData
                              .filterValues.dateRangeFilter === null
                              ? ""
                              : contextType.state.requestSpecialReportsData
                                  .filterValues.dateRangeFilter.strToDate
                          }
                        />
                      </span>
                    )}
                  </td>
                </tr>
              )}
              {/*-------------------- PGOOS Status--------------------------- */}
              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.allow_pgoosStatus === Settings.yes.value && (
                <tr
                  className={classnames(
                    styles.em3TdPaddingBottom,
                    styles.em3TdPaddingTop
                  )}
                >
                  <td className="nowrapCell">PGOOS Status:</td>
                  <td className={styles.margin10PositionAbsolute}>
                    <input
                      className={classnames(
                        styles.px5marginLeft,
                        styles.px5marginRight
                      )}
                      type="checkbox"
                      id={Settings.pgoosStatus.statusError.id}
                      name={Settings.pgoosStatus.statusError.name}
                      checked={
                        contextType.state.requestSpecialReportsData.filterValues
                          .pgoosStatus.statusError === null
                          ? contextType.state.statusError
                          : stringToBoolean(
                              contextType.state.requestSpecialReportsData
                                .filterValues.pgoosStatus.statusError
                            )
                      }
                      value={contextType.state.statusErrorVal}
                      onChange={contextType.onChange}
                    />
                    Errors <>&nbsp;</>
                    <input
                      type="checkbox"
                      className={classnames(
                        styles.px5marginLeft,
                        styles.px5marginRight
                      )}
                      id={Settings.pgoosStatus.statusInProgress.id}
                      name={Settings.pgoosStatus.statusInProgress.name}
                      checked={
                        contextType.state.requestSpecialReportsData.filterValues
                          .pgoosStatus.statusInProgress === null
                          ? contextType.state.statusInProgress
                          : stringToBoolean(
                              contextType.state.requestSpecialReportsData
                                .filterValues.pgoosStatus.statusInProgress
                            )
                      }
                      value={contextType.state.statusInProgressVal}
                      onChange={contextType.onChange}
                    />
                    In Progress <>&nbsp;</>
                    <input
                      className={classnames(
                        styles.px5marginLeft,
                        styles.px5marginRight
                      )}
                      type="checkbox"
                      id={Settings.pgoosStatus.statusPublished.id}
                      name={Settings.pgoosStatus.statusPublished.name}
                      checked={
                        contextType.state.requestSpecialReportsData.filterValues
                          .pgoosStatus.statusPublished === null
                          ? contextType.state.statusPublished
                          : stringToBoolean(
                              contextType.state.requestSpecialReportsData
                                .filterValues.pgoosStatus.statusPublished
                            )
                      }
                      value={contextType.state.statusPublishedVal}
                      onChange={contextType.onChange}
                    />
                    Published
                  </td>
                </tr>
              )}

              {/*-------------------- Amenities Schedule Info--------------------------- */}
              {contextType.state.requestSpecialReportsData.noFilterOptions
                .reportDetails.amenity_count > 0 && (
                <tr>
                  <td className="nowrapCell" colSpan={2}>
                    <label className={styles.redColor}>
                      You forgot or what?! You already scheduled the report for
                      today.
                    </label>
                  </td>
                </tr>
              )}

              {/*-------------------- run report--------------------------- */}

              <div
                className={classnames(
                  styles.field_Name,
                  styles.marginTopBottom5px
                )}
              >
                <input
                  type="checkbox"
                  id={Settings.emailMe}
                  name={Settings.emailMe}
                  title={Settings.emailMe}
                  onChange={(e) => contextType.onEmailChange(e)}
                  checked={
                    contextType.state.requestSpecialReportsData.filterValues
                      .emailMe != ""
                      ? stringToBoolean(
                          contextType.state.requestSpecialReportsData
                            .filterValues.emailMe
                        )
                      : contextType.state.emailMe
                  }
                />

                {Settings.labels.emailreport}
              </div>

              <div onClick={contextType.runReport} className={styles.btnSubmit}>
                <img
                  src={SubmitBtnImg}
                  alt={Settings.alttext.submitBtnAltText}
                />
              </div>
            </div>
          )}
        </>
      ) : null}
    </React.Fragment>
  );
};

export default RequestSpecialReports;
