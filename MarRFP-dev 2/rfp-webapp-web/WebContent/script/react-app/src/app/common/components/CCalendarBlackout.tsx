import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { getYear, subYears, addYears } from "date-fns";
import styles from "./CCalendar.css";
import moment from "moment";

interface IProps {
  disabledDates?: Date[];
  onSelect?: any;
  id?: any;
  inline?: any;
  onChange?: any;
  onKeyPress?: any;
  name?: any;
  inputId?: any;
  onBlur?: any;
  className?: string;
  value?: any;
  onInput?: any;
  disabled?: boolean;
  inputRef?: any;
  key?: any;
  onHide?: any;
  inputClassName?: string;
  style?: any;
  inputStyle?: any;
  panelStyle?: any;
  showIcon?: any;
  offset?: number;
  selYear?: number;
  minDate?: Date;
  viewDate?: Date;
  icon?: string;
  selectedPeriod?: number;
}
interface IState {}
const disabledDates = [];

let selYear;
let viewDate;
let currValue;
export default class CCalendarBlackout extends Component<IProps, IState> {
  calendar = React.createRef();
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    viewDate = this.props.viewDate;
    currValue = this.props.value;
  }

  yearRange: any = {};

  disabledDates = this.getDates(
    new Date(this.props.selYear - this.props.offset, 0, 1),
    new Date(this.props.selYear + this.props.offset, 11, 31)
  );

  getDates(startDate, stopDate) {
    selYear = this.props.selYear;
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      if (currentDate.getFullYear() !== this.props.selYear) {
        dateArray.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  setYearRange = (date: any) => {
    this.setInitialYearRange();
    // range should be set in all cases, else the functionality breaks
  };

  onYearChange = (currentSel) => {
    const offset = 2;
    const startYear = parseInt(currentSel) - offset;
    this.yearRange.start = startYear;
    const endYear = parseInt(currentSel) + offset;
    this.yearRange.end = endYear;
    this.yearRange.range = `${startYear}:${endYear}`;
  };

  yearNavigatorTemplate = (e: {
    value: string | number | readonly string[];
    onChange: (
      arg0: React.ChangeEvent<HTMLSelectElement>,
      arg1: string
    ) => void;
  }) => {
    return (
      <select
        value={e.value}
        onChange={(event) => {
          this.onYearChange(event.target.value);
          e.onChange(event, event.target.value);
        }}
        className={styles.calendarYearSelect}
      >
        {Array(this.yearRange.end - this.yearRange.start + 1)
          .fill(null)
          .map((_, idx) => {
            return (
              <option key={idx} value={this.yearRange.start + idx}>
                {this.yearRange.start + idx}
              </option>
            );
          })}
      </select>
    );
  };
  dateTemplate(date, e) {
    if (date.year != selYear) {
      return <del>{date.day}</del>;
    } else if (date.day == 1 && date.month == 0) {
      return (
        <div
          style={{
            background: "#fffa90",
            borderRadius: "10%",
            width: "2.3rem",
            height: "2.3rem",
            lineHeight: "2rem",
            padding: 0,
          }}
        >
          {date.day}
        </div>
      );
    } else if (
      currValue == "" &&
      viewDate !== "" &&
      viewDate.getDate() == date.day &&
      viewDate.getMonth() == date.month
    ) {
      return (
        <div
          style={{
            background: "#fffa90",
            borderRadius: "10%",
            width: "2.3rem",
            height: "2.3rem",
            lineHeight: "2rem",
            padding: 0,
          }}
        >
          {date.day}
        </div>
      );
    } else {
      return <>{date.day}</>;
    }
  }

  setInitialYearRange() {
    const offset = this.props.offset ? this.props.offset : 2;
    const startYear = this.props.selYear - offset;
    this.yearRange.start = startYear;
    const endYear = this.props.selYear + offset;
    this.yearRange.end = endYear;
    this.yearRange.range = `${startYear}:${endYear}`;
  }

  onKeyPress(e) {
    e.target.value = e.target.value.replace(/[^/\d]/g, "");

    this.props.onInput(e);
  }

  render() {
    this.setYearRange(this.props.value);
    return (
      <React.Fragment key={this.props.id}>
        <div>
          <Calendar
            ref={this.calendar}
            disabledDates={this.disabledDates}
            readOnlyInput
            id={this.props.id}
            name={this.props.name}
            dateTemplate={this.dateTemplate}
            className={`${styles.datepicker} ${
              this.props.className ?? ""
            }`.trim()}
            style={this.props.style}
            inputStyle={this.props.inputStyle}
            panelStyle={this.props.panelStyle}
            showIcon={this.props.showIcon}
            key={this.props.key}
            inputId={this.props.inputId}
            inline={this.props.inline ? this.props.inline : false}
            value={this.props.value}
            onBlur={this.props.onBlur}
            inputClassName={
              this.props.inputClassName ? this.props.inputClassName : ""
            }
            // @ts-ignore

            onChange={this.props.onChange}
            onSelect={this.props.onSelect}
            onInput={this.onKeyPress}
            disabled={this.props.disabled}
            inputRef={this.props.inputRef}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            viewDate={this.props.viewDate}
            monthNavigator
            yearNavigator
            yearNavigatorTemplate={this.yearNavigatorTemplate}
            yearRange={this.yearRange.range}
            onHide={this.props.onHide}
            icon={styles["ui-icon-calendar"]}
          />
        </div>
      </React.Fragment>
    );
  }
}
