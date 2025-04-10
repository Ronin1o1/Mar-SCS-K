import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import API from "../service/API";
import BlackoutContext, {
  BlackoutContextProvider,
} from "../context/BlackoutContext";
import styles from "./Blackout.css";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import { Layout } from "../../../routing/Layout";
import { useLocation } from "react-router-dom";
import Utils from "../../../../../../app/common/utils/Utils";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import calandarIcon from "../../../../../common/assets/img/calendar.gif";
//import OutsideAlerter from "../../../shared/OutsideAlerter";
import CCalendarBlackout from "../../../../../common/components/CCalendarBlackout";
import { CLoader } from "../../../../../common/components/CLoader";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const Blackout = (props) => {
  // const { totalDays, strHotelBlackoutDatesList, generalReadOnly, dateChangeHandler, nameHandler,updateBlackoutData } =
  //   useBlackoutFunctions();

  let contextType = null;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContextType = useContext(HotelPricingContext);
  const urlParms = useLocation().search;
  const [showStDate, setshowStDate] = useState(false);
  const [showCalendar, setshowCalendar] = useState(null);
  const [showEndDateCalendar, setshowEndDateCalendar] = useState(null);
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const [isLoading, setIsLoading] = useState(false);
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContextType?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  const history = useHistory();

  function updateBlackoutDates() {
    contextType.updateBlackoutData();
  }
  const parentContext = useContext(HotelPricingContext);

  const fetchHotelBlackData = () => {
    API.getBlackoutData(marshaCode, hotelName, period, hotelrfpid).then(
      (res) => {
        contextType.blackoutData(res, true);
        if (res.menu) {
          parentContextType.setState({
            ...parentContextType.state,
            gridData: {
              ...parentContextType.state.gridData,
              list: {
                ...parentContextType.state.gridData.list,
                menu: res.menu,
              },
            },
          });
        }
        setIsLoading(false);
        appContext.setCpacLoader(false);
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    appContext.setCpacLoader(true);
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("GroupsMeetings") &&
        !history?.location?.prevPath?.includes("Standards") &&
        !history?.location?.prevPath?.includes("PriceContact") &&
        !history?.location?.prevPath?.includes("Seasons") &&
        !history?.location?.prevPath?.includes("DepthOfSale") &&
        !history?.location?.prevPath?.includes("eligibilityAmenity")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchHotelBlackData();
    }
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      parentContextType?.completionState?.PricingContact == "Y"
    ) {
      fetchHotelBlackData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        PricingContact: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Standards") &&
      parentContextType?.completionState?.Standards == "Y"
    ) {
      fetchHotelBlackData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Standards: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Seasons") &&
      parentContextType?.completionState?.Seasons == "Y"
    ) {
      fetchHotelBlackData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Seasons: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("DepthOfSale") &&
      parentContextType?.completionState?.DepthOfSales == "Y"
    ) {
      fetchHotelBlackData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        DepthOfSales: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("eligibilityAmenity") &&
      parentContextType?.completionState?.EligAmen == "Y"
    ) {
      fetchHotelBlackData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        EligAmen: "N",
      });
    }
  }, [
    parentContextType?.completionState?.PricingContact,
    parentContextType?.completionState?.EligAmen,
    parentContextType?.completionState?.Standards,
    parentContextType?.completionState?.Seasons,
    parentContextType?.completionState?.DepthOfSales,
  ]);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      fetchHotelBlackData();

      if (appContext?.groupMeetingUpdation) {
        appContext?.setGroupMeetingUpdation(false);
      }
    }
  }, [appContext?.groupMeetingUpdation]);

  useEffect(() => {
    return () => {
      if (contextType?.state.formChg) {
        updateBlackoutDates();
      } else {
        parentContext.setCompletionState({
          ...parentContext.completionState,
          Blackout: "Y",
        });
      }
    };
  }, [contextType?.state.formChg]);

  const dateChangeHandler = (idx, id, e) => {
    contextType.dateChangeHandler(idx, id, e);
  };

  const openCalendar = (idx, id, e) => {
    if (idx === parseInt(e.target.id)) {
      setshowCalendar(parseInt(e.target.id));
    } else {
      setshowCalendar(null);
    }
  };
  const onStDateChange = (idx, id, e) => {
    const startdateVal = contextType.state.strHotelBlackoutDatesList;
    const re = Settings.dateFormat;
    if (e.target.value === "" || re.test(e.target.value)) {
      startdateVal[idx][id] = e.target.value;
      contextType.setData(startdateVal);
    }
  };
  const onEndDateChange = (idx, id, e) => {
    const endDateVal = contextType.state.strHotelBlackoutDatesList;
    const re = Settings.dateFormat;
    if (e.target.value === "" || re.test(e.target.value)) {
      endDateVal[idx][id] = e.target.value;
      contextType.setData(endDateVal);
    }
  };
  const openEndDateCalendar = (idx, id, e) => {
    if (idx === parseInt(e.target.id)) {
      setshowEndDateCalendar(parseInt(e.target.id));
    } else {
      setshowEndDateCalendar(null);
    }
  };
  const getStartDate = (startdate, idx) => {
    return (
      <CCalendarBlackout
        inline={true}
        id={`hotelBlackoutDatesList[${idx}].strStartdate`}
        name={`hotelBlackoutDatesList[${idx}].strStartdate`}
        offset={2}
        selYear={parseInt(period)}
        viewDate={
          startdate === undefined || startdate === null || startdate === ""
            ? new Date("01/01/" + period)
            : Utils.convertStrToDate(startdate)
        }
        value={
          startdate === undefined || startdate === null || startdate === ""
            ? ""
            : Utils.convertStrToDate(startdate)
        }
        onHide={(e) => contextType.onStartDateHideHandler(idx, "startdate", e)}
        onInput={(e) => onStartDateInputHandler(idx, "startdate", e)}
        onChange={(e) => {
          dateChangeHandler(idx, "startdate", e), setshowCalendar(null);
        }}
      />
    );
  };
  const onStartDateInputHandler = (event, idx, id) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      const startdateVal = contextType.state.strHotelBlackoutDatesList;
      startdateVal[idx][id] = event.target.value;
      contextType.setData(startdateVal);
    }
  };
  const getEndDate = (startdate, enddate, idx) => {
    return (
      <span>
        <CCalendarBlackout
          inline={true}
          id={`hotelBlackoutDatesList[${idx}].strEnddate`}
          name={`hotelBlackoutDatesList[${idx}].strEnddate`}
          offset={2}
          selYear={parseInt(period)}
          viewDate={
            enddate === undefined || enddate === null || enddate == ""
              ? startdate === undefined || startdate === null || startdate == ""
                ? new Date()
                : Utils.convertStrToDate(startdate)
              : Utils.convertStrToDate(enddate)
          }
          value={
            enddate === undefined || enddate === null || enddate == ""
              ? ""
              : Utils.convertStrToDate(enddate)
          }
          onHide={(e) => contextType.onEndDateHideHandler(idx, "enddate", e)}
          onInput={(e) => onEndDateInputHandler(idx, "enddate", e)}
          onChange={(e) => {
            dateChangeHandler(idx, "enddate", e), setshowEndDateCalendar(null);
          }}
        />
      </span>
    );
  };
  const onEndDateInputHandler = (event, idx, id) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      const endDateVal = contextType.state.strHotelBlackoutDatesList;
      endDateVal[idx][id] = event.target.value;
      contextType.setData(endDateVal);
    }
  };

const handleblackname = (idx,e) =>  {
      if (e.target.value.length > 40) {
        window.alert(
            "Blackout Reason must not exceed 40 characters."
        );
    }else{
      contextType.nameHandler(idx,e);
    }
  };

  return (
    <Layout hideButtons={false}>
      <div>
        <BlackoutContextProvider>
          <BlackoutContext.Consumer>
            {(blackoutContext) => {
              contextType = blackoutContext;
              return isLoading ? (
                <CLoader></CLoader>
              ) : (
                <React.Fragment>
                  <div>
                    <div className={styles.thisForm}>
                      <table
                        className={styles.thisFormTable}
                        cellSpacing={0}
                        cellPadding={0}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <div className={styles.description}>
                                <p>{Settings.fields.description}</p>
                              </div>
                            </td>
                          </tr>

                          <tr className={styles.gridTable}>
                            <td>
                              <div className={styles.gridNode}>
                                <table
                                  className={styles.gridNodeTable}
                                  cellSpacing={0}
                                  cellPadding={0}
                                >
                                  <thead className={styles.gridHeader}>
                                    <tr>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "20px" }}
                                      ></th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "100px" }}
                                      >
                                        {Settings.fields.fromText}
                                      </th>
                                      <th
                                        className={styles.gridCell}
                                        style={{ width: "100px" }}
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
                                        style={{ width: "230px" }}
                                      >
                                        {Settings.fields.longDateText}
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody className={styles.gridTableView}>
                                    {contextType.state.strHotelBlackoutDatesList.map(
                                      (value, idx) => (
                                        <tr
                                          key={idx}
                                          className={styles.gridRow}
                                        >
                                          <td className={styles.gridBodyCell}>
                                            {idx + 1}
                                          </td>
                                          {contextType.state.generalReadOnly ? (
                                            <td
                                              className={styles.readOnlyBorder}
                                            >
                                              {value.startdate}
                                            </td>
                                          ) : (
                                            <td className={styles.gridBodyCell}>
                                              <input
                                                className={styles.calInput}
                                                title={Settings.DateTitle}
                                                id={`hotelBlackoutDatesList[${idx}].strStartdate`}
                                                name={`hotelBlackoutDatesList[${idx}].strStartdate`}
                                                value={
                                                  value.startdate == null ||
                                                  value.startdate == undefined
                                                    ? ""
                                                    : value.startdate
                                                }
                                                type="text"
                                                onKeyPress={
                                                  Utils.DateNumberOnly_onkeypress
                                                }
                                                onBlur={(e) =>
                                                  contextType.validateDate(
                                                    idx,
                                                    "startdate",
                                                    e
                                                  )
                                                }
                                                onChange={(e) =>
                                                  onStDateChange(
                                                    idx,
                                                    "startdate",
                                                    e
                                                  )
                                                }
                                              ></input>
                                              <img
                                                tabIndex={0}
                                                className={styles.calIcon}
                                                src={calandarIcon}
                                                id={idx}
                                                title={`calstart.select(document.getElementById('hotelBlackoutDatesList[${idx}].strStartdate'),'anchors${idx}','MM/dd/yyyy'); return false;`}
                                                onClick={(e) => {
                                                  setshowEndDateCalendar(null);
                                                  openCalendar(
                                                    idx,
                                                    "startDate",
                                                    e
                                                  );
                                                }}
                                              ></img>
                                              {showCalendar === idx ? (
                                                <span
                                                  className={
                                                    styles.calendarContent
                                                  }
                                                >
                                                  {" "}
                                                  {getStartDate(
                                                    value.startdate,
                                                    idx
                                                  )}
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </td>
                                          )}

                                          {contextType.state.generalReadOnly ? (
                                            <td
                                              className={styles.readOnlyBorder}
                                            >
                                              {value.enddate}
                                            </td>
                                          ) : (
                                            <td className={styles.gridBodyCell}>
                                              <input
                                                className={styles.calInput}
                                                title={Settings.DateTitle}
                                                id={`hotelBlackoutDatesList[${idx}].strEnddate`}
                                                name={`hotelBlackoutDatesList[${idx}].strEnddate`}
                                                value={
                                                  value.enddate == null ||
                                                  value.enddate == undefined
                                                    ? ""
                                                    : value.enddate
                                                }
                                                type="text"
                                                onKeyPress={
                                                  Utils.DateNumberOnly_onkeypress
                                                }
                                                onBlur={(e) =>
                                                  contextType.validateDate(
                                                    idx,
                                                    "enddate",
                                                    e
                                                  )
                                                }
                                                onChange={(e) =>
                                                  onEndDateChange(
                                                    idx,
                                                    "enddate",
                                                    e
                                                  )
                                                }
                                              ></input>
                                              <img
                                                tabIndex={0}
                                                className={styles.calIcon}
                                                src={calandarIcon}
                                                id={idx}
                                                title={`calend.select(document.getElementById('hotelBlackoutDatesList[${idx}].strEnddate'),'anchore${idx}','MM/dd/yyyy'); return false;`}
                                                onClick={(e) => {
                                                  setshowCalendar(null);
                                                  openEndDateCalendar(
                                                    idx,
                                                    "enddate",
                                                    e
                                                  );
                                                }}
                                              ></img>
                                              {showEndDateCalendar === idx ? (
                                                <span
                                                  className={
                                                    styles.calendarContent
                                                  }
                                                >
                                                  {" "}
                                                  {getEndDate(
                                                    value.startdate,
                                                    value.enddate,
                                                    idx
                                                  )}
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </td>
                                          )}

                                          {contextType.state.generalReadOnly ? (
                                            <td
                                              className={styles.readOnlyBorder}
                                            >
                                              {value.blackname}
                                            </td>
                                          ) : (
                                            <td className={styles.gridBodyCell}>
                                              <input
                                                className={styles.inputCell}
                                                title={`${
                                                  Settings.ReasonTitle
                                                } ${idx + 1} ${
                                                  Settings.ReasonName
                                                }`}
                                                type="text"
                                                name={`hotelBackoutDatesList[${idx}].blackname`}
                                                id={`hotelBackoutDatesList[${idx}].blackname`}
                                                value={value.blackname}
                                                onChange={(e) =>handleblackname(idx,e)                                                
                                                }
                                              />
                                            </td>
                                          )}

                                          <td className={styles.gridBodyCell}>
                                            {value.startdate &&
                                              `${moment(value.startdate).format(
                                                Settings.longDateFormat
                                              )} to `}
                                            {value.enddate &&
                                              `${moment(value.enddate).format(
                                                Settings.longDateFormat
                                              )}`}
                                          </td>
                                        </tr>
                                      )
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
                                  htmlFor="totalBlackouts"
                                >
                                  {Settings.fields.totalDays}
                                </label>
                                <input
                                  className={styles.totalInput}
                                  title={Settings.totalTitle}
                                  type="text"
                                  name="totalBlackouts"
                                  id="totalBlackouts"
                                  value={contextType.totalDays}
                                  readOnly
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                          .p-inputtext{
                            width: 75px !important;
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
                        `}
                  </style>
                </React.Fragment>
              );
            }}
          </BlackoutContext.Consumer>
        </BlackoutContextProvider>
      </div>
    </Layout>
  );
};

export default Blackout;
