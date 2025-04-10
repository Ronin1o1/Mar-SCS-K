import React from "react";
import styles from "../accountPricing/AccountPricingHeader.module.css";
import AccountPricingContext from "../../context/AccountPricingContext";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import { Link } from "react-router-dom";
import Settings from "../../data/Settings";

interface IProps {
  data: any;
}

interface IState {}

export default class AccountPricingHeader extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountPricingContext;

  constructor(props) {
    super(props);
  }

  toggleActiveMenu = event => {
    event.target.id = event.currentTarget.id;
    this.context.onClick(event);
  };

  render() {
    return (
      <div>
        <div className={styles.row1}>
          {this.context.state.activeMenuType ===
            Settings.text.compid.accountPricing.headerMenu.pricing && (
            <div className={styles.header}>
              {(() => {
                return (
                  <div className={styles.accountTypesMenu}>
                    {Settings.text.label.accountPricing.accountsMenu.accountTypes.map(
                      data => {
                        {
                          return (
                            <div
                              key={data.key}
                              id={
                                Settings.text.compid.accountPricing.accountsMenu
                                  .accountType + data.key
                              }
                              className={[
                                styles.menuItems,
                                this.context.state.activeAccountType !=
                                  data.key && styles.inactiveMenu
                              ].join(Settings.text.constant.stringSpace)}
                              onClick={this.toggleActiveMenu}
                            >
                              <Link to="#">{data.label}</Link>
                            </div>
                          );
                        }
                      }
                    )}
                  </div>
                );
              })()}
              <div className={styles.addButtonIcon}>
                <svg
                  className={styles.addIconSVG}
                  onClick={event => {
                    this.context.showModal(
                      event,
                      Settings.text.compid.accountPricing.modal.addAccount
                    );
                  }}
                >
                  <use
                    x="-10px"
                    y="-60px"
                    href={icon + "#add-icon-normal"}
                    xlinkHref={icon + "#add-icon-normal"}
                  />
                </svg>
              </div>
              <div
                className={styles.addIconTextSpacing}
                onClick={event => {
                  this.context.showModal(
                    event,
                    Settings.text.compid.accountPricing.modal.addAccount
                  );
                }}
              >
                {Settings.text.label.accountPricing.accountsMenu.newAccountMenu}
              </div>
            </div>
          )}
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
