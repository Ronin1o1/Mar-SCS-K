import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import Settings from "../static/Settings";
import {
  CpacBlackoutsContextProvider,
  CpacBlackoutsContextConsumer,
} from "../context/CpacBlackoutsContext";
import API from "../service/CpacBlackoutsApi";
import styles from "./CpacBlackouts.css";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../../../../../common/components/CLoader";

const CpacBlackouts = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  let contextType = null;
  let validationCheck;
  let numdaysBlackout = null;
  const history = useHistory();
  const urlParams = useLocation().search;
  const hotelId = new URLSearchParams(urlParams).get(Settings.hotelId);
  const [showLoader, setShowLoader] = useState(false);
  const hotel_accountinfoid = new URLSearchParams(urlParams).get(
    Settings.hotel_accountinfoid
  );
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get(Settings.MarshaCode);
  const period = new URLSearchParams(urlParms).get(Settings.Period);
  const hotelrfpid = new URLSearchParams(urlParms).get(Settings.Hotelrfpid);
  const accountStatus = new URLSearchParams(urlParms).get(
    Settings.accountStatus
  );

  const blackoutParams = {
    marshaCode: marshaCode,
    hotelName: "",
    hotelrfpid: hotelrfpid,
    period: period,
    hotel_accountinfoid: "",
    startnum: "",
    searchtype: "A",
  };
  const hotelAccountSpecificData = localStorage.getItem(
    "hotelAccountSpecificData"
  );
  let isLocked = "N";
  if (hotelAccountSpecificData) {
    isLocked = JSON.parse(hotelAccountSpecificData)?.isLocked;
  }
  const [isAccountLocked, setAccountLocked] = useState(isLocked);

  useEffect(() => {
    const hotelAccountSpecificData = localStorage.getItem(
      "hotelAccountSpecificData"
    );

    if (hotelAccountSpecificData) {
      const isAccountLocked = JSON.parse(hotelAccountSpecificData)?.isLocked;

      setAccountLocked(isAccountLocked);
    }
  }, [localStorage.getItem("hotelAccountSpecificData")]);

  const params = {
    hotel_accountinfoid: hotel_accountinfoid,
    isLocked: isAccountLocked,
  };

  useEffect(() => {
    setShowLoader(true);
    API.getHotelAccountBlackoutUpdate(blackoutParams).then((res) => {
      setShowLoader(false);
      contextType.setContractDates(res);
    });
    if (!appContext.switchBlackoutTabFlag) {
      setShowLoader(true);
      API.getHotelAccountBlackout(params).then((res) => {
        setShowLoader(false);
        sessionStorage.setItem("totalCPACBlackoutAPIData", JSON.stringify(res));
        if (
          appContext.user.isHotelUser &&
          (accountStatus === "A" || accountStatus === "L") &&
          res &&
          res.blackoutdates &&
          res.blackoutdates.hotelBlackoutDate &&
          res.blackoutdates.hotelBlackoutDate.length == 0
        ) {
          contextType.setState({
            ...contextType.state,
            strHotelBlackoutDatesList: [],
            maxBlackouts: res.maxblackouts,
            numblackouts: 0,
            waiveblackouts: res.waiveblackouts,
            checkNumBlackouts: res.checkNumBlackouts,
          });
        } else {
          contextType.blackoutData(res, true);
        }
        numdaysBlackout = res.numblackouts;
        validationCheck = validateFields();
        appContext.setBlackoutTick("C");
      });
    } else {
      const totalAPIData = sessionStorage.getItem("totalCPACBlackoutAPIData")
        ? JSON.parse(sessionStorage.getItem("totalCPACBlackoutAPIData"))
        : null;
      if (
        appContext.user.isHotelUser &&
        (accountStatus === "A" || accountStatus === "L") &&
        totalAPIData &&
        totalAPIData?.blackoutdates &&
        totalAPIData?.blackoutdates?.hotelBlackoutDate &&
        totalAPIData?.blackoutdates?.hotelBlackoutDate?.length == 0
      ) {
        contextType.setState({
          ...contextType.state,
          strHotelBlackoutDatesList: [],
          maxBlackouts: totalAPIData?.maxblackouts,
          numblackouts: 0,
          waiveblackouts: totalAPIData?.waiveblackouts,
          checkNumBlackouts: totalAPIData?.checkNumBlackouts,
        });
      } else {
        contextType.blackoutData(totalAPIData, true);
      }
      numdaysBlackout = totalAPIData?.numblackouts;
      validationCheck = validateFields();
      appContext.setBlackoutTick("C");
      appContext.setSwitchBlackoutTabFlag(false);
    }
    return () => {
      setTickMarkAndUpdate(true);
    };
  }, []);

  useEffect(() => {
    //call the save api, when save button is clicked.
    if (appContext.saveBlackoutStatusClicked) {
      if (appContext.isActiveTab === "blackouts") {
        if (
          !appContext.errorMessageAlert.show &&
          appContext.isActiveTab === "blackouts"
        ) {
          setShowLoader(true);
          contextType.updateBlackoutData().then((res) => {
            //clearing session storage data after save call to avoid displaying old data
            sessionStorage.removeItem("blackOutdataBackup");
            sessionStorage.removeItem("longDateDisplay");
            sessionStorage.removeItem("totalDays");
            API.getHotelAccountBlackout(params).then((res) => {
              sessionStorage.setItem(
                "totalCPACBlackoutAPIData",
                JSON.stringify(res)
              );
              if (
                appContext.user.isHotelUser &&
                (accountStatus === "A" || accountStatus === "L") &&
                res &&
                res.blackoutdates &&
                res.blackoutdates.hotelBlackoutDate &&
                res.blackoutdates.hotelBlackoutDate.length == 0
              ) {
                contextType.setState({
                  ...contextType.state,
                  strHotelBlackoutDatesList: [],
                  maxBlackouts: res.maxBlackouts,
                  numblackouts: 0,
                  waiveblackouts: res.waiveblackouts,
                  checkNumBlackouts: res.checkNumBlackouts,
                  acctBlackChg: "N",
                });
              } else {
                contextType.blackoutData(res, true);
              }
              numdaysBlackout = res.numblackouts;
              validationCheck = validateFields();
              appContext.setBlackoutTick("C");
              setShowLoader(false);
            });
          });
          const hotelSpecificInfo = JSON.parse(
            localStorage.getItem("hotelAccountSpecificData")
          );
          if (
            !appContext?.user?.isPASAdmin &&
            !appContext?.user?.isReadOnly &&
            hotelSpecificInfo?.accountpricingtype == "C"
          ) {
            if (appContext?.totalmaxBlackouts) {
              if (appContext?.hotelPricingBlackoutmsg) {
                alert(appContext?.hotelPricingBlackoutmsg);
              }
            }
          }
          if (
            !appContext?.user?.isPASAdmin &&
            !appContext?.user?.isReadOnly &&
            hotelSpecificInfo?.accountpricingtype == "C"
          ) {
            if (appContext?.maxBlackoutPeriodAlert != "") {
              alert(appContext?.maxBlackoutPeriodAlert);
            }
          }
        }
        appContext.setSaveBlackoutStatusClicked(false);
      }
    }
  }, [appContext.saveBlackoutStatusClicked]);

  const setTickMarkAndUpdate = (isReturn) => {
    if (!parentContext.isRebidDeclined) {
      const blackoutcheck = blackout_check(isReturn);
      if (blackoutcheck == "complete" || blackoutcheck == "continue") {
        contextType.updateBlackoutData();
        if (blackoutcheck == "complete") {
          parentContext.blackoutStatus = "C";
          parentContext.setBlackoutStatus(parentContext.blackoutStatus);
          appContext.blackoutTick = "C";
          appContext.setBlackoutTick(appContext.blackoutTick);
        }
      }
    } else {
      if (appContext.user?.isPASorAnySales || appContext.user?.isHotelUser) {
        contextType.updateBlackoutData();
      }
    }
  };

  const blackout_check = (isReturn) => {
    let bOK = true;
    let blackcheckstatus;
    const accountPricingType = sessionStorage.getItem("accountpricingtype");
    if (accountPricingType === "C" && !appContext.user?.isReadOnly) {
      bOK = validateFields();
    }

    if (!bOK) {
      if (appContext.user?.isPASorAnySales) {
        blackcheckstatus = "continue";
      } else {
        blackcheckstatus = "failed";
        if (!isReturn) alert("You must enter the reason for the blackout.");
      }
    } else blackcheckstatus = "complete";

    return blackcheckstatus;
  };

  const validateFields = () => {
    let objStart;
    let objEnd;
    let objReason;
    let initialCheck = true;
    const data = JSON.parse(sessionStorage.getItem("blackoutDataAccCenter"));
    for (let i = 0; i < numdaysBlackout; i++) {
      objStart = data !== null && data[i].strStartdate;
      objEnd = data !== null && data[i].strEnddate;
      objReason = data !== null && data[i].blackname;
      if (
        (objStart != "" || objEnd != "") &&
        (objReason == "" || objReason === null)
      ) {
        initialCheck = false;
        break;
      }
    }
    return initialCheck;
  };

  const renderWaiveBlackout = (): JSX.Element => {
    if (
      appContext.user.isReadOnly ||
      (isLocked == "Y" &&
        contextType.state.waiveblackouts === "Y" &&
        !appContext.user.isPASorAnySales)
    ) {
      if (contextType.state.waiveblackouts === "Y") {
        return <span className={styles.descriptionText}>X&nbsp;</span>;
      }
    } else {
      return (
        <input
          type="checkbox"
          id="waiveblackouts"
          name="waiveblackouts"
          checked={
            contextType.state.waiveblackouts === "Y" ||
            contextType.state.waiveblackouts === "X"
              ? true
              : false
          }
          onChange={(e) => contextType.updateWaiveBlackoutsHandler(e)}
          value={contextType.state.waiveblackouts}
          className={styles.alignment}
        />
      );
    }
  };

  return (
    <CpacBlackoutsContextProvider>
      <CpacBlackoutsContextConsumer>
        {(cpacBlackoutsContext) => {
          contextType = cpacBlackoutsContext;
          return (
            <>
              {showLoader ? (
                <CLoader></CLoader>
              ) : (
                <div className={`${styles.scrollDiv} ${"updatecpblackout"}`}>
                  <div>
                    <table
                      className={styles.thisFormTable}
                      cellSpacing={0}
                      cellPadding={0}
                    >
                      <tbody>
                        <tr>
                          <td className={styles.blankRow}></td>
                          <td>{renderWaiveBlackout()}</td>
                          <td className={styles.descriptionText}>
                            {Settings.waiveBlackout}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {contextType.state.waiveblackouts === "N" ? (
                    <div className={styles.thisForm}>
                      <table
                        className={styles.thisFormTable}
                        cellSpacing={0}
                        cellPadding={0}
                      >
                        <tbody>
                          <tr>
                            <td></td>
                          </tr>
                          <tr className={styles.gridTable}>
                            <td>
                              <div className={styles.gridNode}>
                                <table cellSpacing={0} cellPadding={0}>
                                  <thead className={styles.gridHeader}>
                                    <tr className={styles.headerRow}>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "20px" }}
                                      ></th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "80px" }}
                                      >
                                        {Settings.fields.fromText}
                                      </th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "80px" }}
                                      >
                                        {Settings.fields.toText}
                                      </th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "310px" }}
                                      >
                                        {Settings.fields.reasonText}
                                      </th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "250px" }}
                                      >
                                        {Settings.fields.longDateText}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    className={`${styles.gridTableView} ${styles.blackoutGrid}`}
                                  >
                                    {contextType.state
                                      .strHotelBlackoutDatesList &&
                                      contextType.state
                                        .strHotelBlackoutDatesList?.length >
                                        0 &&
                                      contextType.state.strHotelBlackoutDatesList?.map(
                                        (value, idx) => {
                                          return (
                                            <tr
                                              key={idx}
                                              className={styles.gridRow}
                                            >
                                              <td
                                                className={styles.gridBodyCell}
                                              >
                                                {idx + 1}
                                              </td>
                                              <td
                                                className={styles.gridBodyCell}
                                              >
                                                <input
                                                  className={styles.inputCell80}
                                                  id={`hotelBlackoutDatesList[${idx}].strStartdate`}
                                                  name={`hotelBlackoutDatesList[${idx}].strStartdate`}
                                                  value={
                                                    value.strStartdate
                                                      ? value.strStartdate
                                                      : ""
                                                  }
                                                  title={
                                                    Settings.startDateTitle
                                                  }
                                                  onChange={(e) =>
                                                    contextType.dateChangeHandler(
                                                      idx,
                                                      Settings.strStartdate,
                                                      e
                                                    )
                                                  }
                                                  onBlur={(e) =>
                                                    contextType.dateValidationHandler(
                                                      idx,
                                                      Settings.strStartdate,
                                                      e
                                                    )
                                                  }
                                                  onSelect={() =>
                                                    contextType.emptyDateOrBlackoutNameValidate(
                                                      idx
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td
                                                className={styles.gridBodyCell}
                                              >
                                                <input
                                                  className={styles.inputCell80}
                                                  id={`hotelBlackoutDatesList[${idx}].strEnddate`}
                                                  name={`hotelBlackoutDatesList[${idx}].strEnddate`}
                                                  value={
                                                    value.strEnddate
                                                      ? value.strEnddate
                                                      : ""
                                                  }
                                                  title={Settings.endDateTitle}
                                                  onChange={(e) =>
                                                    contextType.dateChangeHandler(
                                                      idx,
                                                      Settings.strEnddate,
                                                      e
                                                    )
                                                  }
                                                  onBlur={(e) =>
                                                    contextType.dateValidationHandler(
                                                      idx,
                                                      Settings.strEnddate,
                                                      e
                                                    )
                                                  }
                                                  onSelect={() =>
                                                    contextType.emptyDateOrBlackoutNameValidate(
                                                      idx
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td
                                                className={styles.gridBodyCell}
                                              >
                                                <input
                                                  className={styles.inputCell}
                                                  name={`hotelBackoutDatesList[${idx}].blackname`}
                                                  id={`hotelBackoutDatesList[${idx}].blackname`}
                                                  title={
                                                    "Blackout " +
                                                    (idx + 1) +
                                                    " Name"
                                                  }
                                                  value={value.blackname}
                                                  onChange={(e) =>
                                                    contextType.nameHandler(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  onBlur={(e) =>
                                                    contextType.onBlurName(e)
                                                  }
                                                  onSelect={() =>
                                                    contextType.emptyDateOrBlackoutNameValidate(
                                                      idx
                                                    )
                                                  }
                                                  maxLength={40}
                                                />
                                              </td>
                                              <td
                                                className={styles.gridBodyCell}
                                              >
                                                {contextType.longDateDisplay[
                                                  idx
                                                ]?.strStartdate &&
                                                  contextType.checkIsValidDate(
                                                    contextType.longDateDisplay[
                                                      idx
                                                    ]?.strStartdate
                                                  ) &&
                                                  `${moment(
                                                    contextType.longDateDisplay[
                                                      idx
                                                    ]?.strStartdate
                                                  ).format(
                                                    Settings.longDateFormat
                                                  )} ${
                                                    contextType.dateSeparatorKey
                                                  } `}
                                                {contextType.longDateDisplay[
                                                  idx
                                                ]?.strStartdate &&
                                                  contextType.longDateDisplay[
                                                    idx
                                                  ]?.strEnddate &&
                                                  contextType.checkIsValidDate(
                                                    contextType.longDateDisplay[
                                                      idx
                                                    ]?.strEnddate
                                                  ) &&
                                                  `${moment(
                                                    contextType.longDateDisplay[
                                                      idx
                                                    ]?.strEnddate
                                                  ).format(
                                                    Settings.longDateFormat
                                                  )}`}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <label
                                  className={styles.totalLabelName}
                                  htmlFor={Settings.totalBlackouts}
                                >
                                  {Settings.fields.totalDays}
                                </label>
                                <input
                                  className={styles.totalInput}
                                  name={Settings.totalBlackouts}
                                  id={Settings.totalBlackouts}
                                  value={contextType.totalDays}
                                  readOnly
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </>
          );
        }}
      </CpacBlackoutsContextConsumer>
    </CpacBlackoutsContextProvider>
  );
};

export default CpacBlackouts;
