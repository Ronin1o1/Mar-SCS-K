import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import styles from "./CCalanderDefaultDate.css";
import "primeicons/primeicons.css";
interface IProps {
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
  yearRange?: any;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {}
export interface CalendarProps {
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  value?: Date | Date[];
  viewDate?: Date;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: object;
  className?: string;
  inline?: boolean;
  selectionMode?: string;
  inputId?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  inputStyle?: object;
  inputClassName?: string;
  required?: boolean;
  readOnlyInput?: boolean;
  keepInvalid?: boolean;
  mask?: string;
  tabIndex?: number;
  placeholder?: string;
  showIcon?: boolean;
  icon?: string;
  showOnFocus?: boolean;
  numberOfMonths?: number;
  view?: string;
  touchUI?: boolean;
  showTime?: boolean;
  timeOnly?: boolean;
  showSeconds?: boolean;
  showMillisec?: boolean;
  hourFormat?: string;
  stepHour?: number;
  stepMinute?: number;
  stepSecond?: number;
  stepMillisec?: number;
  shortYearCutoff?: string;
  hideOnDateTimeSelect?: boolean;
  showWeek?: boolean;
  locale?: string;
  dateFormat?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  panelStyle?: object;
  panelClassName?: string;
  monthNavigator?: boolean;
  yearNavigator?: boolean;
  yearRange?: string;
  disabledDates?: Date[];
  disabledDays?: number[];
  minDate?: Date;
  maxDate?: Date;
  maxDateCount?: number;
  showOtherMonths?: boolean;
  selectOtherMonths?: boolean;
  showButtonBar?: boolean;
  todayButtonClassName?: string;
  clearButtonClassName?: string;
  autoZIndex?: boolean;
  baseZIndex?: number;

  tooltip?: string;

  ariaLabelledBy?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  transitionOptions?: object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onKeyPress?: object;
  headerTemplate?(): React.ReactNode;
  footerTemplate?(): React.ReactNode;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  onInput?(event: React.FormEvent<HTMLInputElement>): void;

  onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onShow?(): void;
  onHide?(): void;
  onClick?(): void;
}

export default class CCalanderDefaultDate extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Calendar
            className={styles.datepicker}
            id={this.props.id}
            inputId={this.props.inputId}
            inline={this.props.inline ? this.props.inline : false}
            value={this.props.value}
            name={this.props.name}
            onBlur={this.props.onBlur}
            showIcon={true}
            tooltip={"Enter the due date from in the format: mm/dd/yyyy"}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onKeyPress={this.props.onKeyPress}
            onChange={this.props.onChange}
            onSelect={this.props.onSelect}
            onInput={this.props.onInput}
            disabled={this.props.disabled}
            monthNavigator
            yearNavigator
            yearRange={this.props.yearRange}
            // yearRange="2015:2025"
          />
        </div>
      </div>
    );
  }
}
