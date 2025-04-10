import React from "react";
import MPricingSetupButton from "../../components/shared/MPricingSetupButton";
import styles from "./PricingSetupFooter.module.css";
import PricingSetupContext from "../../context/PricingSetupContext";
import Settings from "../../data/Settings";

interface IProps {
  resetLoading?: any;
  scptSetupCompleted: boolean;
  navigateToAccountPricing?: (status: boolean) => {};
}

interface IState {}

export default class PricingSetupFooter extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.footer__container}>
        <div className={styles.footer}>
          <div className={styles.footerButton}>
            <MPricingSetupButton
              id={Settings.text.compid.common.cancel}
              label={
                Settings.text.label.pricingSetup.pricingSetupFooter
                  .cancelButonLabel
              }
              onClick={this.context.onClick}
            />
          </div>
          {this.props.scptSetupCompleted && (
            <div className={styles.footerButton}>
              <MPricingSetupButton
                id={Settings.text.compid.common.close}
                label={
                  Settings.text.label.pricingSetup.pricingSetupFooter
                    .closeButtonLabel
                }
                onClick={event => {
                  this.context.onClick(
                    event,
                    this.props.resetLoading,
                    this.props.navigateToAccountPricing
                  );
                }}
              />
            </div>
          )}
          <div className={styles.footerButton}>
            <MPricingSetupButton
              id={Settings.text.compid.common.save}
              label={
                Settings.text.label.pricingSetup.pricingSetupFooter
                  .saveButtonLabel
              }
              onClick={event => {
                this.context.onClick(event, this.props.resetLoading);
              }}
            />
          </div>
          {this.context.state.initialState &&
            this.context.state.initialState.isLocked !==
              Settings.text.constant.stringY && (
              <div className={styles.footerButton}>
                <MPricingSetupButton
                  id={
                    Settings.text.compid.pricingSetup.pricingSetupFooter.update
                  }
                  label={
                    Settings.text.label.pricingSetup.pricingSetupFooter
                      .updateButtonLabel
                  }
                  onClick={event => {
                    this.context.onClick(event, this.props.resetLoading);
                  }}
                />
              </div>
            )}
          {this.context.state.initialState &&
            this.context.state.initialState.isLocked !==
              Settings.text.constant.stringY && (
              <div className={styles.footerButton}>
                <MPricingSetupButton
                  id={
                    Settings.text.compid.pricingSetup.pricingSetupFooter
                      .updateClose
                  }
                  label={
                    Settings.text.label.pricingSetup.pricingSetupFooter
                      .updateCloseButtonLabel
                  }
                  onClick={event => {
                    this.context.onClick(
                      event,
                      this.props.resetLoading,
                      this.props.navigateToAccountPricing
                    );
                  }}
                />
              </div>
            )}
        </div>
      </div>
    );
  }
}
