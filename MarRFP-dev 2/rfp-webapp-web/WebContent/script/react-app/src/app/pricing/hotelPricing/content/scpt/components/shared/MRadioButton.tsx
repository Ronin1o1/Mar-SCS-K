import React from "react";
import styles from "./MRadioButton.module.css";
import BaseRadioButton from "../base/BaseRadioButton";

interface IProps {
  radioButtonName: string;
  label: string;
  horizontal: boolean;
  onCheckboxChange: (event) => void;
  id: string;
  selectedCheck: string;
  disabled?: boolean;
}

interface IState {}

export default class MRadioButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = { checked: false };

  render() {
    return (
      <div>
        <label>
          <BaseRadioButton
            name={this.props.radioButtonName}
            value={this.props.label}
            checked={this.props.label === this.props.selectedCheck}
            onChange={this.props.onCheckboxChange}
            disabled={this.props.disabled}
            id={this.props.id}
          />
          <span
            className={[
              styles.labelText,
              this.props.horizontal == true ? styles.labelTextHorizontal : ""
            ].join(" ")}
          >
            {this.props.label}
          </span>
        </label>
      </div>
    );
  }
}
