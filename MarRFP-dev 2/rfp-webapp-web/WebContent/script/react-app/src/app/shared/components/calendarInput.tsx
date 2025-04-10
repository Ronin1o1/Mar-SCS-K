import React, { useState } from "react";
import Settings from "../static/Settings";
import CCalendarRebid from "../../common/components/CCalendarRebid";
import Styles from "./calendarInput.css";
import moment from "moment";
import calandarIcon from "../../common/assets/img/warning.png";

function CalendarInput(props) {
  const [dateValue, setdateValue] = useState(
    props.defaultValue ? new Date(props.defaultValue) : ""
  );

  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState(null);
  let onChangeUpdate = true;

  const requiredMessage = {
    notValid: "The value entered is not valid.",
    pastDate: "Date cannot be in the past",
  };
  const todayDate = moment().format("MM/DD/YYYY");

  const validateDate = (event) => {
    if (event.target.value.length > 10) {
      alert(Settings.enter10character);
    }
  };
  const onCalander = (e) => {
    const date = moment(e).format("MM/DD/YYYY");
    const isTodaysdate = moment(todayDate).isAfter(date, "days");

    if (isTodaysdate) {
      setAlertText(requiredMessage.pastDate);
      setAlertShow(true);
    } else {
      setAlertShow(false);
      setAlertText(null);
    }
  };
  const checkDate = (data) => {
    if (data) {
      let valid = true;
      const splitData = data.split("/");
      if (
        splitData &&
        ((splitData[0] && parseInt(splitData[0]) >= 13) ||
          (splitData[0].length > 1 && parseInt(splitData[0]) <= 0) || (splitData[0].length > 2))
      ) {
        valid = false;
      }
      if (splitData && splitData[1] && ((parseInt(splitData[1]) >= 32) ||
        ((splitData[1].length > 1 && parseInt(splitData[1]) <= 0)) || (splitData[1].length > 2))) {
        valid = false;
      }
      if (
        splitData &&
        splitData[2] &&
        splitData[2].length > 1 &&
        (parseInt(splitData[2]) > 9999 || parseInt(splitData[2]) <= 0 || splitData[2].length > 4)
      ) {
        valid = false;
      }
      return valid;
    }
    return false;
  };
  const checkValidDate = (value) => {
    if (value) {
      const valid = checkDate(value);

      if (valid) {
        const date = moment(value).format("MM/DD/YYYY");
        const pastDate = moment(todayDate).isAfter(date, "days");
        const splitData = value.split("/");
        if (!pastDate) {
          setAlertText(null);
          setAlertShow(false);
          onChangeUpdate = true;
        } else if (
          pastDate &&
          splitData &&
          splitData.length > 2 &&
          splitData[2].length > 1
        ) {
          setAlertText(requiredMessage.pastDate);
          setAlertShow(true);
          onChangeUpdate = false;
        } else {
          setAlertText(null);
          setAlertShow(false);
          onChangeUpdate = true;
        }
      } else if (value) {
        setAlertShow(true);
        setAlertText(requiredMessage.notValid);
        onChangeUpdate = false;
      }
    }
  };
  const onCalanderChange = (event) => {
    const value = event && event.target.value;
    checkValidDate(value);
    if (value && onChangeUpdate) {
      const date = moment(value).format("MM/DD/YYYY");
      const pastDate = moment(todayDate).isAfter(date, "days");
      if (!pastDate && checkDate(value)) {
        props.onChange(event);
      }
    }
  };
  const calendarHide = () => {
    checkValidDate(dateValue);
    if (dateValue && onChangeUpdate) {
      const date = moment(dateValue).format("MM/DD/YYYY");
      const pastDate = moment(todayDate).isAfter(date, "days");
      if (!pastDate && checkDate(dateValue)) {
        props.onHide();
      }
    }
  };
  const onBlurValidate = (e) => {
    setAlertText(null);
  };
  const onSelect = (e) => {
    setAlertShow(false);
    setAlertText(null);
    props.onSelect(e);
  };

  return (
    <>
      <div>
        {alertShow ? (
          <span className={Styles.calIcon}>
            <img src={calandarIcon}></img>
            {alertText && (
              <span className={Styles.tooltipTextRedbid}>{alertText}</span>
            )}
          </span>
        ) : null}
        <CCalendarRebid
          id={"rebidduedate"}
          selYear={2021}
          onShow={() => {
            onCalander(dateValue);
          }}
          inputId={"rebidduedate"}
          value={dateValue}
          onChange={(e) => {
            setdateValue(e.value);
            onCalanderChange;
          }}
          onBlur={onBlurValidate}
          onInput={onCalanderChange}
          onHide={() => calendarHide}
          inputClassName={Styles.input}
          disabled={props.disabled}
          onSelect={onSelect}
        />
      </div>
    </>
  );
}

export default CalendarInput;
