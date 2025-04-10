import React from "react";
import styles from "./MSearchBox.module.css";
import BaseInputText from "../base/BaseInputText";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../data/Settings";

interface IProps {
  id: string;
  value: string;
  onChange: (event) => void;
  onClick: (event) => void;
}

interface IState {}

export default class MSearchBox extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  onClick = event => {
    this.props.onClick(event);
  };

  onKeyPress = event => {
    if (event.key === Settings.text.constant.enterKey) {
      this.props.onClick(event);
    }
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        <div>
          <BaseInputText
            id={this.props.id}
            value={this.props.value}
            placeholder={
              Settings.text.label.accountPricing.accountPricingTableHeader
                .accountSearchLabel
            }
            className={styles.searchInput}
            onChange={this.props.onChange}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div
          className={
            this.props.id === "Account Details"
              ? styles.buttonContainer1
              : styles.buttonContainer
          }
        >
          <div
            className={
              this.props.id === "Account Details"
                ? styles.searchIconDiv1
                : styles.searchIconDiv
            }
          >
            <svg
              className={styles.searchIconSVG}
              onClick={this.onClick}
              id={this.props.id}
            >
              <use
                x="-30px"
                y="-60px"
                href={icon + "#magnifying-glass"}
                xlinkHref={icon + "#magnifying-glass"}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
