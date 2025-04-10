import React, { useEffect, useState } from "react";
import commonStyle from "../../assets/css/commonBase.css";
import moment from "moment";

export function DueDate(props) {
  const payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_dueDate =
    payLoad !== undefined && payLoad !== false && payLoad !== null
      ? payLoad?.searchdueDate
      : "";
  const [stateDueDate, setStateDueDate] = useState(session_dueDate);
  const getDueDateData = () => {
    return props.filterContext.dueDateData?.map((item, key) => {
      return (
        <option
          key={key}
          value={item.pricingperiodid}
          selected={
            props.isUpdateMultiple && item.pricingperiodid === session_dueDate
              ? true
              : false
          }
        >
          {props.isUpdateMultiple
            ? item.duedate === "*"
              ? "*"
              : moment(item.duedate).format("MMMM DD, YYYY")
            : item.duedate}
        </option>
      );
    });
  };
  useEffect(() => {
    if (session_dueDate === undefined) {
      setStateDueDate(
        props.filterContext.updateMutipleRequestPayload.dueDateText
      );
    } else {
      setStateDueDate(session_dueDate);
    }
  }, [session_dueDate]);

  return (
    <td>
      <td className={`${commonStyle.width55px} ${commonStyle.field_Name}`}>
        Due Date:
      </td>
      <td className={commonStyle.FilterFieldName} id="accountduedateselect">
        {props.isUpdateMultiple ? (
          <select
            id="mhacsearch.dueDate"
            name="mhacsearch.dueDate"
            value={stateDueDate}
            onChange={(event) => {
              setStateDueDate(event.target.value);
              props.filterContext.setupdateMutipleRequestInitialChangeEvents({
                ...props.filterContext.updateMutipleRequestEvents,
                dueDateChangeEvent: true,
              });
              props.filterContext.onDueDateChange(event.target.value);
              props.filterContext.setupdateMutipleRequestInitalPayload({
                ...props.filterContext.updateMutipleRequestPayload,
                searchdueDate: event.target.value,
                dueDateText:
                  event.target.options[event.target.selectedIndex].text,
              });
            }}
          >
            {getDueDateData()}
          </select>
        ) : (
          <select
            id="mhacsearch.dueDate"
            name="mhacsearch.dueDate"
            onChange={(event) => {
              props.filterContext.onDueDateChange(event.target.value);
              props.filterContext.setupdateMutipleRequestInitalPayload({
                ...props.filterContext.updateMutipleRequestPayload,
                searchdueDate: event.target.value,
                dueDateText:
                  event.target.options[event.target.selectedIndex].text,
              });
            }}
          >
            {getDueDateData()}
          </select>
        )}
      </td>{" "}
    </td>
  );
}
