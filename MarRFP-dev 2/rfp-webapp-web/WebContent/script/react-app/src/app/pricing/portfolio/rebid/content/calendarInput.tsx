import React, { useState } from "react";
import Settings from "../static/Settings";
import CCalendar from "../../../../common/components/CCalendar";
import moment from "moment";
import Utils from "../../../../common/utils/Utils";

function CalendarInput(props) {
  const [showHideCalendar, setshowHideCalendar] = useState(false);
  const [dateValue, setdateValue] = useState(
    props.defaultValue ? props.defaultValue : ""
  );

  const ClickshowHideCalendar = () => {
    setshowHideCalendar(!showHideCalendar);
  };

  const setCalendarValue = (param) => {
    const date = moment(param.value).format("MM/DD/YYYY");
    setdateValue(date);
    ClickshowHideCalendar();
  };

  const validateDate = (event) => {
    if (event.target.value.length > 10) {
      alert(Settings.enter10character);
    }
  };

  return (
    <>
      {props.item[props.field] ? (
        <div>
          <input
            type="text"
            onClick={ClickshowHideCalendar}
            id={props.field + "_input_" + props.index}
            maxLength={10}
            onKeyUp={validateDate}
            defaultValue={dateValue}
            style={{ width: "75px" }}
            disabled={props?.disabled}
          />
          {showHideCalendar == true ? (
            <div style={{ position: "absolute" }}>
              <CCalendar
                onChange={setCalendarValue}
                onKeyPress={Utils.isDate}
              ></CCalendar>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null}
    </>
  );
}

export default CalendarInput;
