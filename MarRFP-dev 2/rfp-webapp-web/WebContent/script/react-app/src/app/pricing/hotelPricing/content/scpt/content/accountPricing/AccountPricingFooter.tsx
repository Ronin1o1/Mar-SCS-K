import React from "react";
import MAccountPricingButton from "../../components/shared/MAccountPricingButton";
import styles from "./AccountPricingFooter.module.css";
import Settings from "../../data/Settings";
import AccountPricingContext from "../../context/AccountPricingContext";

interface IProps {}

interface IState {}

export default class AccountPricingFooter extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountPricingContext;

  render() {
    return (
      <div className={styles.footer__container}>
        <div className={styles.footer}>
          <div className={styles.footerButton}>
            <MAccountPricingButton
              id={Settings.text.compid.common.cancel}
              label={
                Settings.text.label.accountPricing.accountPricingFooter
                  .cancelButtonLabel
              }
              onClick={this.context.onClick}
            />
          </div>
          {this.context.state.activeMenuType ===
            Settings.text.compid.accountPricing.headerMenu.pricing && (
            <div className={styles.footerButton}>
              <MAccountPricingButton
                id={Settings.text.compid.common.save}
                label={
                  Settings.text.label.accountPricing.accountPricingFooter
                    .saveButtonLabel
                }
                onClick={this.context.onClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
