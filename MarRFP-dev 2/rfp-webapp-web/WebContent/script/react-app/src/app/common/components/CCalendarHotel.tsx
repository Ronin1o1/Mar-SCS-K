import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { getYear, subYears, addYears, getMonth } from "date-fns";
import styles from "./CCalendarHotel.css";
import Settings from "../static/Settings";

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
  minDate?: Date;
  viewDate?: Date;
  icon?: string;
  selectedPeriod?: number;
  hasCustomMonth?: boolean;
}
interface IState {}
const disabledDates = [];
export default class CCalendarHotel extends Component<IProps, IState> {
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
    new Date(new Date().getFullYear() - 50, 0, 1),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    )
  );

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
  getDates(startDate, stopDate) {
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  setYearRange = (date: any) => {
    const yearRange =
      this.props?.compName === "CpacSearchResults"
        ? Settings.cCalendar.cpacYearOffset
        : Settings.cCalendar.yearOffset;
    if (this.props.selectedPeriod) {
      this.yearRange.start = this.props.selectedPeriod;
      this.yearRange.start = this.props.selectedPeriod;
      this.yearRange.end = this.props.selectedPeriod;
      this.yearRange.range = `${this.props.selectedPeriod} :${this.props.selectedPeriod}`;
    } else {
      const startYear =
        getYear(this.props.value) === 2000
          ? 2000
          : getYear(subYears(this.props.value, yearRange));
      const endYear = getYear(addYears(this.props.value, yearRange));
      if (date instanceof Date && !isNaN(date.valueOf())) {
        this.yearRange.start = startYear;
        this.yearRange.end = endYear;
        this.yearRange.range = `${startYear}:${endYear}`;
      } else {
        this.setInitialYearRange();
      }
    }

    // range should be set in all cases, else the functionality breaks
  };

  monthNavigatorTemplate = (e: {
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
          this.setState({ selectedMonth: event.target.value });
          e.onChange(event, event.target.value);
        }}
        className={styles.calendarMonthSelect}
      >
        {Settings.months.map((value, key) => {
          return (
            <option key={key} value={key}>
              {Settings.months[key]}
            </option>
          );
        })}
      </select>
    );
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
          this.setState({ selectedYear: event.target.value });
          e.onChange(event, event.target.value);
        }}
        className={
          this.props.hasCustomMonth
            ? styles.calendarMonthSelect
            : styles.calendarYearSelect
        }
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
  dateTemplate(date) {
    if (date.day == 1 && date.month == 0) {
      return (
        <div
          style={{
            backgroundColor: "#bbbca6",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "10%",
            width: "2em",
            height: "2em",
            lineHeight: "2em",
            padding: 0,
          }}
        >
          {date.day}
        </div>
      );
    } else {
      return date.day;
    }
  }
  setInitialYearRange() {
    const offset = this.props.offset ? this.props.offset : 10;
    const startYear = new Date().getFullYear() - offset;
    this.yearRange.start = startYear;
    const endYear = new Date().getFullYear() + offset;
    this.yearRange.end = endYear;
    this.yearRange.range = `${startYear}:${endYear}`;
  }

  onKeyPress(e, props) {
    e.target.value = e.target.value.replace(/[^/\d]/g, "");
    if (props && props.onInput) {
      props.onInput(e);
    }
  }

  onDateChange = (e) => {
    this.setState({
      selectedYear: null,
      selectedMonth: null,
    });

    this.props.onChange(e);
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
    const calendarState = this.calendar.current?.state;
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
      this.setState({
        selectedYear: getYear(date),
        selectedMonth: getMonth(date),
      });
      const calendarState = this.calendar.current?.state;
      this.calendar.current?.setState({
        focused: calendarState?.focused ?? false,
        overlayVisible: calendarState?.overlayVisible ?? false,
        viewDate: date,
      });
    }
  };

  onBlur = (e) => {
    if (this.props.value == "" || this.props.value == undefined) {
      const date = new Date();
      this.setState({
        selectedYear: getYear(date),
        selectedMonth: getMonth(date),
      });
      const calendarState = this.calendar.current?.state;
      this.calendar.current?.setState({
        focused: calendarState?.focused ?? false,
        overlayVisible: calendarState?.overlayVisible ?? false,
        viewDate: date,
      });
    }
    this.props.onBlur(e);
  };

  render() {
    this.setYearRange(this.props.value);
    return (
      <React.Fragment key={this.props.id}>
        <form autoComplete="off">
          <div style={{ display: "none" }}>
            <input type="text" />
          </div>
          <Calendar
            ref={this.calendar}
            id={this.props.id}
            disabledDates={this.disabledDates}
            readOnlyInput
            name={this.props.name}
            dateTemplate={this.dateTemplate}
            className={`${styles.datepicker}  ${
              this.props.className ?? ""
            }`.trim()}
            style={this.props.style}
            inputStyle={this.props.inputStyle}
            panelStyle={this.props.panelStyle}
            showIcon={this.props.showIcon}
            key={this.props.key + this.yearRange.range}
            inputId={this.props.inputId}
            inline={this.props.inline ? this.props.inline : false}
            value={this.props.value}
            onBlur={this.props.onBlur}
            inputClassName={
              this.props.inputClassName ? this.props.inputClassName : ""
            }
            // @ts-ignore

            onChange={this.onDateChange}
            onSelect={this.props.onSelect}
            onInput={(e) => this.onKeyPress(e, this.props)}
            disabled={this.props.disabled}
            inputRef={this.props.inputRef}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            viewDate={this.props.viewDate}
            monthNavigator
            yearNavigator
            yearNavigatorTemplate={this.yearNavigatorTemplate}
            monthNavigatorTemplate={
              this.props.hasCustomMonth ? this.monthNavigatorTemplate : null
            }
            yearRange={this.yearRange.range}
            onHide={this.onHide}
            icon={styles["ui-icon-calendar"]}
            onShow={this.onShow}
          />
          <input
            type="text"
            id="prevent_autofill"
            autoComplete="off"
            style={{ display: "none" }}
            tabIndex={-1}
          />
        </form>
        <style>
          {`
             .p-datepicker-calendar thead th{
              font-weight: bold;
            }
            .p-datepicker select {
              font-weight: bold;
            }
            .p-datepicker option{
              font-weight: bold;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
