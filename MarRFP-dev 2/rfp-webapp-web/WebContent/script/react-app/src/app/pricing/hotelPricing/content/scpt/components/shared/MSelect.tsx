import React from "react";
import styles from "./MSelect.module.css";
import BaseSelect from "../base/BaseSelect";

interface IProps {
  id: string;
  value: string;
  className?: string;
  onChange: (event) => void;
  disabled?: boolean;
  label: string[];
}

interface IState {}

export default class MSelect extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={[styles.mSelect, this.props.className].join(" ")}>
        <BaseSelect
          id={this.props.id}
          value={this.props.value}
          className={styles.baseSelect}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          labelData={this.props.label}
        />
      </div>
    );
  }
}
