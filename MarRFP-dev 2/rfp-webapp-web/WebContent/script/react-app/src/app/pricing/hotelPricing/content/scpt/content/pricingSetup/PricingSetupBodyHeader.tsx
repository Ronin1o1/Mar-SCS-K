import React from "react";
import styles from "./PricingSetupBodyHeader.module.css";
import MCheckBox from "../../components/shared/MCheckbox";
import PricingSetupContext from "../../context/PricingSetupContext";
import Utils from "../../utils/Utils";
import Settings from "../../data/Settings";

interface IProps {
  data: any;
}

interface IState {}

export default class PricingSetupBodyHeader extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.row1}>
          <span className={styles.updateUserLabel}>
            {
              Settings.text.label.pricingSetup.pricingSetupHeader
                .updateUserLabel
            }
          </span>
          <span className={styles.lastUpdatedUser}>
            {this.context.state.setupData.lastUpdatedUser}
          </span>
          <span className={styles.updateTimeLabel}>
            {
              Settings.text.label.pricingSetup.pricingSetupHeader
                .updateTimestampLabel
            }
          </span>
          <b className={styles.lastUpdatedUser}>
            {Utils.formatHeaderDate(
              this.context.state.setupData.setuptab_last_updated
            )}
          </b>
          <div className={styles.lockedStyle}>
            <MCheckBox
              id={
                Settings.text.compid.pricingSetup.pricingSetupHeader.stringLock
              }
              label={
                this.context.state.initialState &&
                this.context.state.initialState.isLocked ==
                  Settings.text.constant.stringY
                  ? Settings.text.label.pricingSetup.pricingSetupHeader
                      .lockedLabel
                  : Settings.text.label.pricingSetup.pricingSetupHeader
                      .lockLabel
              }
              isChecked={
                this.context.state.isLocked == Settings.text.constant.stringY
                  ? Settings.text.constant.booleanTrue
                  : Settings.text.constant.booleanFalse
              }
              onClick={this.context.onChange}
              disabled={
                this.context.state.initialState &&
                this.context.state.initialState.isLocked ==
                  Settings.text.constant.stringY &&
                this.context.state.setupData.userRole !=
                  Settings.text.constant.adminRole
                  ? Settings.text.constant.booleanTrue
                  : Settings.text.constant.booleanFalse
              }
            />
          </div>
          <div className={styles.specialPricingStyle}>
            {Settings.text.label.scptHeader.hotelNameLabel}
            <span>
              {this.props.data.marshaCode +
                Settings.text.constant.dashSymbol +
                this.props.data.hotelName}
            </span>
          </div>
        </div>
        <div className={styles.row2}>
          <span className={styles.periodLabel}>
            {" "}
            {Settings.text.label.scptHeader.periodLabel}
          </span>
          <span className={styles.period}>{this.props.data.period}</span>
          <span className={styles.currencyLabel}>
            {Settings.text.label.scptHeader.currencyLabel}
          </span>
          <span className={styles.currencyCode}>
            {this.props.data.currencyCode}
          </span>
        </div>
      </div>
    );
  }
}
