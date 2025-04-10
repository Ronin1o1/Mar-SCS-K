import React, { useEffect, useState } from "react";
import styles from "./sendAdditionalInfo.css";
import btnClear from "./../assets/img/button/btnClear.gif";
import btnCancel from "./../assets/img/button/btnCancel.gif";
import btnSave from "./../assets/img/button/btnSave.gif";
import CCalendar from "../../common/components/CCalendar";
import { isPast, isToday } from "date-fns";
import moment from "moment";
import Settings from "../static/Settings";
import Utils from "../../common/utils/Utils";

function SendAdditionalInfo(props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [dateValue, setdateValue] = useState("");
  const [showHideCalendar, setshowHideCalendar] = useState(false);
  const [dropdownValue, setdropdownValue] = useState(null);
  useEffect(() => {
    if (props.sendFromList?.hotelSolicitationAddEmailInfo?.additional_text) {
      setTextareaValue(
        props.sendFromList?.hotelSolicitationAddEmailInfo?.additional_text
      );
    } else {
      setTextareaValue("");
    }
    if (props.sendFromList?.hotelSolicitationAddEmailInfo?.sendfromtype) {
      setdropdownValue(
        props.sendFromList?.hotelSolicitationAddEmailInfo?.sendfromtype
      );
    } else {
      setdropdownValue(1);
    }
    if (
      props.sendFromList?.hotelSolicitationAddEmailInfo?.shortDuedate_foremail
    ) {
      setdateValue(
        props.sendFromList?.hotelSolicitationAddEmailInfo?.shortDuedate_foremail
      );
    } else {
      setdateValue("");
    }
  }, [props.sendFromList]);
  const text_onclick = (event) => {
    const max_len = 1000;
    const objCheck = event.target.value;
    if (objCheck.length > max_len) {
      alert(Settings.youareAllowed + max_len + Settings.characters);
      setTextareaValue(objCheck.substr(0, max_len));
      return false;
    } else {
      setTextareaValue(objCheck);
      return true;
    }
  };

  const ClickshowHideCalendar = () => {
    setshowHideCalendar(!showHideCalendar);
  };

  const setCalendarValue = (param) => {
    const date = moment(param.value).format("MM/DD/YYYY");
    const isPastDate = isPast(param.value);
    if (isPastDate && !isToday(param.value)) {
      alert(Settings.pastDate);
    }
    setdateValue(date);
    ClickshowHideCalendar();
  };

  const validateDate = (event) => {
    if (event.target.value.length > 10) {
      alert(Settings.enter10character);
    }
  };

  const clear = () => {
    setTextareaValue("");
    setdateValue("");
    setshowHideCalendar(false);
    setdropdownValue(
      props.sendFromList.hotelSolicitationAddEmailInfo
        ? props.sendFromList.hotelSolicitationAddEmailInfo.sendfromtype
        : []
    );
  };

  const onChangeDropdown = (e) => {
    setdropdownValue(e.target.value);
  };

  const options = () => {
    const items = [];
    if (props.sendFromList.emailtypelist) {
      for (const element of props.sendFromList.emailtypelist) {
        const row =
          dropdownValue != "" && dropdownValue == element.contacttypeid ? (
            <option value={element.contacttypeid} selected>
              {element.contacttypedesc}
            </option>
          ) : (
            <option value={element.contacttypeid}>
              {element.contacttypedesc}
            </option>
          );
        items.push(row);
      }
    }
    return items;
  };

  const cancelHandler = () => {
    props.cancelAddSentInfo(true);
  };

  const validateDateLength = (event) => {
    if (event.target.value.length > 10) {
      alert(Settings.enter10character);
    } else {
      setdateValue(event.target.value);
    }
  };

  const calendarHide = (param) => {
    let validDate = true;
    validDate = Utils.isDate(dateValue);
    if (validDate) {
      param = Utils.setDatewithYYYY(param);
      setCalendarValue(param);
    }
  };
  const saveHandler = () => {
    let textArea = textareaValue;
    textArea = textArea.replace("%u2013", "–");
    textArea = textArea.replace("%u2018", "‘");
    textArea = textArea.replace("%u2019", "’");
    textArea = textArea.replace("%u201C", "“");
    textArea = textArea.replace("%u201D", "”");
    const screentype = props.sendFromList.hotelSolicitationAddEmailInfo
      ? props.sendFromList.hotelSolicitationAddEmailInfo.addemailtext_screentype
      : "S";

    const data = {
      duedate_foremail: dateValue
        ? moment(dateValue).format("MM/DD/YYYY")
        : null,
      additional_text: textArea ? textArea : "",
      sendfromtype: dropdownValue ? parseInt(dropdownValue, 10) : 1,
      sendfromemail: props.sendFromList.hotelSolicitationAddEmailInfo
        ? props.sendFromList.hotelSolicitationAddEmailInfo.sendfromemail
        : null,
      addemailtext_screentype: screentype ? screentype : Settings.screentype_S,
      shortDuedate_foremail: dateValue
        ? moment(dateValue).format("MM/DD/YYYY")
        : "",
    };
    props.saveAddSentInfo(data);
  };

  const handleBlurDate = (e) => {
    let dt = e.target.value;
    let validDate = true;
    validDate = Utils.isDate(dt);
    if (validDate) {
      dt = Utils.setDatewithYYYY(dt);
      const param = {
        value: dt,
      };
      setCalendarValue(param);
    } else {
      setdateValue("");
    }
  };

  return (
    <>
      <div>
        <div>
          <table>
            <tr>
              <td className={styles.field_Name}>{Settings.additionalData}</td>
              <td className={styles.field_Value}>
                <textarea
                  id={props.additionalData.textareaId}
                  name={props.additionalData.textareaName}
                  cols={props.additionalData.textareaCols}
                  rows={props.additionalData.textareaRows}
                  onChange={text_onclick}
                  className={styles.field_Value_textarea}
                  value={textareaValue}
                  defaultValue={textareaValue}
                ></textarea>
              </td>
            </tr>

            {props.sendFromList.hotelSolicitationAddEmailInfo != null ? (
              props.sendFromList.hotelSolicitationAddEmailInfo
                .addemailtext_screentype == "R" ? (
                <tr>
                  <td className={styles.duedate_value}>
                    <input
                      type="hidden"
                      name={props.additionalData.dateInputName}
                      id={props.additionalData.dateInputId}
                      maxLength={10}
                      defaultValue={dateValue}
                    />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className={styles.solicitation_duedate}>
                    {Settings.solicitationDueDate}
                  </td>
                  <td className={styles.duedate_value}>
                    <CCalendar
                      id={"additionalEmailInfoId"}
                      inputId={"additionalEmailInfoInputId"}
                      value={Utils.convertStrToDate(dateValue)}
                      onChange={setCalendarValue}
                      onInput={validateDateLength}
                      onBlur={handleBlurDate}
                      onHide={() => calendarHide}
                      inputClassName={styles.calendarInput}
                    />
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td className={styles.solicitation_duedate}>
                  {Settings.solicitationDueDate}
                </td>
                <td className={styles.duedate_value}>
                  <div style={{ display: "none" }}>
                    <input type="text" />
                  </div>
                  <CCalendar
                    id={"additionalEmailInfoId"}
                    inputId={"additionalEmailInfoInputId"}
                    value={Utils.convertStrToDate(dateValue)}
                    onChange={setCalendarValue}
                    onInput={validateDateLength}
                    onBlur={handleBlurDate}
                    onHide={() => calendarHide}
                    inputClassName={styles.calendarInput}
                  />
                </td>
              </tr>
            )}

            <tr>
              <td className={styles.solicitation_duedate}>
                {Settings.SendFrom}
              </td>

              <td className={styles.duedate_value}>
                <select
                  name={props.additionalData.sendfromtypeName}
                  id={props.additionalData.sendfromtypeId}
                  value={dropdownValue}
                  onChange={(e) => {
                    onChangeDropdown(e);
                  }}
                >
                  {options()}
                </select>
              </td>
            </tr>
          </table>
        </div>

        <div>
          <table className="menuHght100-Height">
            <tr>
              <td className={styles.clear}>
                <img src={btnClear} onClick={clear} />
              </td>

              <td className={styles.save}>
                <img src={btnSave} onClick={saveHandler} />
              </td>

              <td className={styles.btnCancel}>
                <img src={btnCancel} onClick={cancelHandler} />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <style>
        {`
                          .p-datepicker {
                            width: auto;
                            position: absolute;
                            top: 3px;
                            left: 0;
                            background: white;
                            z-index:999999;
                        }
                        .p-datepicker .p-datepicker-header .p-datepicker-prev, .p-datepicker .p-datepicker-header .p-datepicker-next {
                            width: 2rem;
                            height: 2rem;
                            color: #a6a6a6;
                            border: 0 none;
                            background: transparent;
                            border-radius: 50%;
                            transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
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
                          .p-datepicker .p-datepicker-header {
                            padding: 0.5rem;
                            color: #333333;
                            background: #ffffff;
                            font-weight: 700;
                            margin: 0;
                            border-bottom: 0 none;
                            border-top-right-radius: 3px;
                            border-top-left-radius: 3px;
                        }
                        .p-datepicker-title{
                            display:inline;
                        }
                        .p-datepicker table td span {
                            border:none;
                        }
                        p-datepicker table td {
                            padding: 2px !important;
                            border: 1px solid #c5c5c5 !important;
                            justify-content: flex-end !important;
                            border-radius: 0px !important;
                            width: 1.7rem !important;
                            height: 1.2rem !important;
                        }
                        .pi-calendar:before {
                            content: "";
                        }
                        .p-button:active{
                            border:none;
                            outline:none;
                        }
                     
                        `}
      </style>
    </>
  );
}

export default SendAdditionalInfo;
