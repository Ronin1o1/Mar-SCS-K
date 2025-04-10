import React, { useEffect, useState, useRef } from "react";
import styles from "./RequestSpecialReports.css";
import Settings from "../static/Settings";
import RequestSpecialReportsContext, {
  RequestSpecialReportsContextProvider,
} from "../context/RequestSpecialReportsContext";
import screenLoader from "../../../common/assets/img/screenloader.gif";
let contextType = null;

import API from "../service/API";
import CIFrame from "../../../common/components/CIFrame";
import CSelect from "../../../common/components/CSelect";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
let hiddenUrl;

function GARequestSpecialReports(params) {
  const [accountrecid, setAccountrecid] = useState("");
  const [marshaCode, setMarshaCode] = useState("");
  const [isDataError, setIsDataError] = useState(false);
  const [showAccountDropDown, setShowAccountDropDown] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [role, setRole] = useState("");
  const [eid, setEid] = useState("");
  const [isSubmitBtnClicked, setisSubmitBtnClicked] = useState(false);
  const [emailCheckBox, setemailCheckBox] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });
  const getFilterData = (filterValue) => {
    setShowAccountDropDown(false);
    API.getReportFilteredData(filterValue)
      .then((data) => {
        setShowAccountDropDown(true);
        contextType.setReportFilterData(data);
      })
      .catch((error) => {
        contextType.setLoader(false);
      });
  };
  const getData = () => {
    API.getReportType()
      .then((data) => {
        contextType.setReportType(data);
      })
      .catch(() => {
        contextType.setLoader(false);
      });
  };
  const onReport = (e) => {
    const value =
      contextType.state.reportType?.noFilterOptions?.noFilterLists?.reportlist.filter(
        function (item) {
          return item.report_name == e.target.value;
        }
      );

    contextType.setReportValue(value[0].report_name);
    getFilterData(value[0].report_name);
  };
  const onAccount = (e) => {
    const value =
      contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.accountList?.filter(
        function (item) {
          return item.accountname == e.target.value;
        }
      );
    setAccountrecid(value[0].accountrecid);
  };
  const onRole = (e) => {
    const value =
      contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.roleList?.filter(
        function (item) {
          return item.role == e.target.value;
        }
      );

    setRole(value[0].role);
  };
  const onPeriod = (e) => {
    const value =
      contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.periodList.filter(
        function (item) {
          return item.period == e.target.value;
        }
      );

    contextType.setPeriod(value[0].period);
  };
  const onMarshaCode = (e) => {
    if (e.target.value) {
      setMarshaCode(e.target.value);
    }
  };

  const onSubmit = () => {
    let parms;
    if (contextType.reportValue == "eHotelAccountAccess") {
      if (contextType.period == "") {
        contextType.setPeriod(
          contextType.state.reportFilter?.noFilterOptions?.noFilterLists
            ?.periodList[0].period
        );
      }
      const emailme = emailCheckBox ? "Y" : "N";
      parms = {
        report: contextType.reportValue,
        period: contextType.period
          ? contextType.period
          : contextType.state.reportFilter?.noFilterOptions?.noFilterLists
              ?.periodList[0].period,
        accountrecid: accountrecid ? accountrecid : null,
        marshaCode: marshaCode ? marshaCode : "",
        eid: eid,
        emailMe: emailme,
      };
    } else {
      const emailme = emailCheckBox ? "Y" : "N";
      parms = {
        report: contextType.reportValue,
        role: role,
        emailMe: emailme,
      };
    }
    API.runReport(parms)
      .then((data) => {
        setIsDataError(true);
        setReportUrl(data.reportUrl);
        API.getCognosServerUrl().then((res) => {
          hiddenUrl = res.COGNOS_LOGIN_URL;

          setisSubmitBtnClicked(true);
        });
      })
      .catch()
      .catch((error) => {
        contextType.setLoader(false);
      });
  };
  const onBack = () => {
    setisSubmitBtnClicked(false);
    setemailCheckBox(false);
    setAccountrecid("");
    setMarshaCode("");
    setEid("");
  };
  const onEmailChange = () => {
    if (emailCheckBox) {
      setemailCheckBox(false);
    } else {
      setemailCheckBox(true);
    }
  };
  const oneid = (e) => {
    setEid(e.target.value);
  };
  return (
    <RequestSpecialReportsContextProvider>
      <RequestSpecialReportsContext.Consumer>
        {(report) => {
          contextType = report;

          return (
            <div>
              {!showAccountDropDown ? (
                <img className={styles.loaderImg} src={screenLoader}></img>
              ) : (
                ""
              )}
              {!isSubmitBtnClicked ? (
                <div>
                  <div className={styles.header}> {Settings.header}</div>

                  <div className={styles.dropDownContainer}>
                    <span
                      className={styles.dropDownLabel}
                      style={{
                        width:
                          contextType.reportValue == "eHotelAccountAccess"
                            ? "73px"
                            : "38px",
                      }}
                    >
                      {" "}
                      {Settings.label.report}
                    </span>

                    {contextType.state.reportType?.noFilterOptions
                      ?.noFilterLists?.reportlist != null && (
                      <CSelect
                        id={Settings.recorddropdown.id}
                        name={Settings.recorddropdown.name}
                        ddnOptions={
                          contextType.state.reportType?.noFilterOptions
                            ?.noFilterLists?.reportlist
                        }
                        keyField={Settings.ControlKeyValues.cSelectKeyField}
                        valField={Settings.ControlKeyValues.cSelectValueField}
                        className={styles.selectDropdown}
                        selectedValue={
                          contextType.reportValue != null
                            ? contextType.reportValue
                            : Settings.blankReport.report_name
                        }
                        onChange={(e) => onReport(e)}
                      />
                    )}
                    {contextType.reportValue === "eHotelAccountAccess" ? (
                      <div>
                        <div>
                          <span
                            className={`${styles.dropDownLabel} ${styles.yearmr}`}
                          >
                            {" "}
                            {Settings.label.year}
                          </span>

                          {contextType.state.reportFilter?.noFilterOptions
                            ?.noFilterLists?.periodList != null && (
                            <CSelect
                              id={Settings.recorddropdown.id_year}
                              name={Settings.recorddropdown.name_year}
                              ddnOptions={
                                contextType.state.reportFilter?.noFilterOptions
                                  ?.noFilterLists?.periodList
                              }
                              keyField={"period"}
                              valField={"period"}
                              className={styles.selectDropdown}
                              selectedValue={
                                contextType.period != null
                                  ? contextType.period
                                  : "*"
                              }
                              onChange={(e) => onPeriod(e)}
                            />
                          )}
                        </div>
                        <div>
                          <span
                            className={`${styles.dropDownLabel} ${styles.accountmr}`}
                          >
                            {" "}
                            {Settings.label.account}
                          </span>
                          <select
                            defaultValue={"*"}
                            className={styles.selectDropdown}
                            onChange={onAccount}
                          >
                            <option>*</option>
                            {contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.accountList?.map(
                              (data) => (
                                <option
                                  key={data.accountrecid}
                                  value={data.accountname}
                                >
                                  {data.accountname}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <span className={styles.dropDownLabel}>
                            {" "}
                            {Settings.label.marshaCode}
                          </span>

                          <select
                            defaultValue={""}
                            className={styles.selectDropdown}
                            onChange={onMarshaCode}
                          >
                            <option>*</option>
                            {contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.hotelList?.map(
                              (data) => (
                                <option
                                  key={data.marshacode}
                                  value={data.marshacode}
                                >
                                  {data.marshacode} - {data.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <span className={styles.dropDownLabel}>
                            {" "}
                            {Settings.label.eid}
                          </span>

                          <input
                            className={styles.eidHeight}
                            type="text"
                            id="filterValues.eid"
                            name="filterValues.eid"
                            maxLength={10}
                            onChange={(e) => oneid(e)}
                          ></input>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {contextType.reportValue === "eUsers" ? (
                      <div>
                        <span
                          className="dropDownLabel"
                          style={{ marginRight: "11px" }}
                          onChange={onRole}
                        >
                          {" "}
                          {Settings.label.role}
                        </span>
                        <select
                          defaultValue={""}
                          className={styles.selectDropdown}
                          onChange={onRole}
                        >
                          <option>*</option>
                          {contextType.state.reportFilter?.noFilterOptions?.noFilterLists?.roleList?.map(
                            (data) => (
                              <option key={data.role} value={data.role}>
                                {data.role}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="marginTop">
                      <input
                        className={styles.emailCheckbox}
                        type="checkbox"
                        id="filterValues.emailMe"
                        name="filterValues.emailMe"
                        title="filterValues.emailMe"
                        onChange={onEmailChange}
                        checked={emailCheckBox}
                      ></input>
                      <span className={styles.emailLabel}>
                        {Settings.label.email}
                      </span>
                    </div>
                    <style>{`
                      .marginTop {
                        margin-top: 5px
                      }
                    `}</style>
                    <button
                      className={styles.submitBtn}
                      onClick={onSubmit}
                    ></button>
                  </div>
                </div>
              ) : (
                <div>
                  <a href="javascript:void(0);" onClick={onBack}>
                    Back
                  </a>
                  {isDataError ? (
                    <div>
                      <CIFrame
                        src={reportUrl}
                        // hiddenSrc={hiddenUrl}
                        id={"banner"}
                        width="100%"
                        height="100%"
                      ></CIFrame>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          );
        }}
      </RequestSpecialReportsContext.Consumer>
    </RequestSpecialReportsContextProvider>
  );
}

export default GARequestSpecialReports;
