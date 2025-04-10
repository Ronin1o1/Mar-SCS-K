import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { getYear, subYears, addYears, getMonth } from "date-fns";
import styles from "./CCalendarRebid.css";
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
  onShow?: any;
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
  toolTip: any;
  alertText: any;
}
interface IState {}
const disabledDates = [];
let initialRange = true;
let selYear;
export default class CCalendarRebid extends Component<IProps, IState> {
  calendar = React.createRef();
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
  }
  state = {
    selectedYear: null,
    selectedMonth: null,
  };
  yearRange: any = {};

  disabledDates = this.getDates(
    new Date(new Date().getFullYear() - 10, 0, 1),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    )
  );

  getDates(startDate, stopDate) {
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  onYearChange = (currentSel) => {
    initialRange = false;
    const offset = 10;
    const startYear = parseInt(currentSel) - offset;
    this.yearRange.start = startYear;
    const endYear = parseInt(currentSel) + offset;
    this.yearRange.end = endYear;
    this.yearRange.range = `${startYear}:${endYear}`;
  };

  setYearRange = (date: any) => {
    if (initialRange) this.setInitialYearRange();
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
          //this.onYearChange(event.target.value);
          this.setState({ selectedYear: event.target.value });
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
    if (date.year < new Date().getFullYear()) {
      return <del>{date.day}</del>;
    }
    if (
      date.year === new Date().getFullYear() &&
      date.month < new Date().getMonth()
    ) {
      return <del>{date.day}</del>;
    }
    if (
      date.year === new Date().getFullYear() &&
      date.month === new Date().getMonth() &&
      date.day < new Date().getDate()
    ) {
      return <del>{date.day}</del>;
    }
    return <> {date.day}</>;
  }
  setInitialYearRange() {
    const offset = 100;
    const startYear = new Date().getFullYear() - offset;
    this.yearRange.start = startYear;
    const endYear = new Date().getFullYear() + offset;
    this.yearRange.end = endYear;
    this.yearRange.range = `${startYear}:${endYear}`;
  }

  onKeyPress = (e) => {
    e.target.value = e.target.value.replace(/[^/\d]/g, "");
    this.setState({
      selectedYear: getYear(e.target.value),
    });
    this.props && this.props.onInput && this.props.onInput(e);
  };

  onHide = () => {
    let date;
    if (this.props.value == "" || this.props.value == undefined) {
      date = new Date();
    } else {
      date = new Date(this.props.value);
    }
    this.setState({
      selectedYear: getYear(date),
      selectedMonth: getMonth(date),
    });
    let calendarState = this.calendar.current?.state;
    this.calendar.current?.setState({
      focused: calendarState?.focused ?? false,
      overlayVisible: calendarState?.overlayVisible ?? false,
      viewDate: date,
    });

    this.props.onHide();
  };

  onShow = () => {
    if (this.props.value == "" || this.props.value == undefined) {
      const date = new Date();
      console.log("date:", date);
      this.setState({
        selectedYear: getYear(date),
        selectedMonth: getMonth(date),
      });
      let calendarState = this.calendar.current?.state;
      this.calendar.current?.setState({
        focused: calendarState?.focused ?? false,
        overlayVisible: calendarState?.overlayVisible ?? false,
        viewDate: date,
      });
    }
    this.props.onShow();
  };

  render() {
    this.setYearRange(this.props.value);
    return (
      <React.Fragment key={this.props.id}>
        <div>
          <Calendar
            ref={this.calendar}
            disabledDates={this.disabledDates}
            // readOnlyInput
            id={this.props.id}
            name={this.props.name}
            dateTemplate={this.dateTemplate}
            className={this.props.toolTip ? styles.datepickeerbg : ""}
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
            onShow={this.onShow}
            onHide={this.onHide}
            icon={styles["ui-icon-calendar"]}
          />
        </div>
      </React.Fragment>
    );
  }
}
