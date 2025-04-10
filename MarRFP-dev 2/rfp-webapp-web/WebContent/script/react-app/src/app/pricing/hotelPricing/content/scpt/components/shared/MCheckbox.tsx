import React from "react";
import styles from "./MCheckbox.module.css";
import BaseCheckbox from "../base/BaseCheckbox";

interface IProps {
  label?: string;
  id?: string;
  isChecked: boolean;
  onClick: any;
  disabled?: boolean;
}

interface IState {}

export default class MCheckBox extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = { checked: this.props.isChecked };

  handleMCheckboxChange = event => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    return (
      <div className={styles.mCheckbox}>
        <label>
          <BaseCheckbox
            id={this.props.id}
            className={styles.baseCheckbox}
            checked={this.props.isChecked}
            onChange={this.handleMCheckboxChange}
            onClick={this.props.onClick}
            disabled={this.props.disabled}
          />
          <span className={styles.labelText}>{this.props.label}</span>
        </label>
      </div>
    );
  }
}
