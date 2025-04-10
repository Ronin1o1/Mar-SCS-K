import React from "react";
import MPricingSetupButton from "../../components/shared/MPricingSetupButton";
import styles from "./AccountDetailsFooter.module.css";
import AccountDetailsContext from "../../context/AccountDetailsContext";
import Settings from "../../data/Settings";

interface IProps {
  navigateToAccountPricing?: (status: boolean) => {};
}

interface IState {}

export default class AccountDetailsFooter extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountDetailsContext;

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
                Settings.text.label.accountDetails.accountDetailsFooter
                  .cancelButtonLabel
              }
              onClick={this.context.onClick}
            />
          </div>
          <div className={styles.footerButton}>
            <MPricingSetupButton
              id={Settings.text.compid.common.save}
              label={
                Settings.text.label.accountDetails.accountDetailsFooter
                  .saveButtonLabel
              }
              onClick={this.context.onClick}
            />
          </div>
          <div className={styles.footerButton}>
            <MPricingSetupButton
              id={
                Settings.text.compid.accountDetails.accountDetailsFooter
                  .saveClose
              }
              label={
                Settings.text.label.accountDetails.accountDetailsFooter
                  .saveAndCloseLabel
              }
              onClick={event => {
                this.context.onClick(
                  event,
                  this.props.navigateToAccountPricing
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
