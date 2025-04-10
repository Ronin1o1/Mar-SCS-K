import React from "react";
import styles from "./AccountDetailsBodyHeader.module.css";
import AccountDetailsContext from "../../context/AccountDetailsContext";
import Settings from "../../data/Settings";

interface IProps {
  data: any;
}

interface IState {}

export default class AccountDetailsBodyHeader extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.row1}>
          <div className={styles.specialPricingStyle}>
            {Settings.text.label.scptHeader.hotelNameLabel}
            <b>
              {this.props.data.marshaCode +
                Settings.text.constant.dashSymbol +
                this.props.data.hotelName}
            </b>
          </div>
        </div>
        <div className={styles.row2}>
          {Settings.text.label.scptHeader.periodLabel}
          <b>{this.props.data.period}</b>
          <span className={styles.currencyLabel}>
            {Settings.text.label.scptHeader.currencyLabel}
          </span>
          <b>{this.props.data.currencyCode}</b>
        </div>
      </div>
    );
  }
}
