import React from "react";
import styles from "./MCheckboxList.module.css";
import MCheckbox from "./MCheckbox";
import Settings from "../../data/Settings";

interface IProps {
  id: string;
  header: string;
  checkboxes: string[];
  details: string[];
  disabled: boolean[];
  onClick: string;
}

interface IState {}

export default class MCheckboxList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  toggleCheckbox = (label: string) => {};

  render() {
    const getCheckboxes = (
      id: string,
      boxType: string[],
      boxInfo: string[],
      disabled: boolean[],
      onClick: string
    ) => {
      return boxType.map(function(label, index) {
        return (
          <div className={styles.checkBoxSpacing} key={index}>
            <MCheckbox
              id={id + (index + 1)}
              label={label}
              isChecked={boxInfo[index] === Settings.text.constant.stringY}
              disabled={disabled[index]}
              onClick={onClick}
            />
          </div>
        );
      });
    };

    const initJSX = (
      id: string,
      header: string,
      boxType: string[],
      boxInfo: string[],
      disabled: boolean[],
      onClick: string
    ) => {
      return (
        <div>
          <div className={styles.headerSpacing}>{header}</div>
          <div>{getCheckboxes(id, boxType, boxInfo, disabled, onClick)}</div>
        </div>
      );
    };

    return initJSX(
      this.props.id,
      this.props.header,
      this.props.checkboxes,
      this.props.details,
      this.props.disabled,
      this.props.onClick
    );
  }
}
