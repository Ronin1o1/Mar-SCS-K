import React from "react";
import styles from "./MRadioButtonList.module.css";
import MRadioButton from "./MRadioButton";

interface IProps {
  radioButtonName: string;
  header?: string;
  buttons: string[];
  horizontal?: boolean;
  onChange: (event) => void;
  id: string;
  disabled?: boolean;
  checkSelected: string;
}

interface IState {}

export default class MRadioButtonList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = { selectedValue: "" };

  onCheckboxChange = event => {};

  render() {
    const getRadioButtons = (
      buttonType: string[],
      horizontal: boolean,
      disabled: boolean
    ) => {
      let index = 0;
      return buttonType.map(label => {
        index++;
        return (
          <div
            className={[
              styles.radioButtonSpacing,
              horizontal == true ? styles.horizontal : ""
            ].join(" ")}
            key={label}
          >
            <MRadioButton
              onCheckboxChange={this.props.onChange}
              radioButtonName={this.props.radioButtonName}
              id={this.props.id + index}
              label={label}
              horizontal={horizontal}
              selectedCheck={this.props.checkSelected}
              disabled={disabled}
            />
          </div>
        );
      });
    };

    const initJSX = (
      header: string,
      buttonType: string[],
      horizontal: boolean,
      disabled: boolean
    ) => {
      return (
        <div>
          {horizontal != true ? (
            <div className={styles.spacing}>{header}</div>
          ) : (
            ""
          )}
          {getRadioButtons(buttonType, horizontal, disabled)}
        </div>
      );
    };

    return initJSX(
      this.props.header,
      this.props.buttons,
      this.props.horizontal,
      this.props.disabled
    );
  }
}
