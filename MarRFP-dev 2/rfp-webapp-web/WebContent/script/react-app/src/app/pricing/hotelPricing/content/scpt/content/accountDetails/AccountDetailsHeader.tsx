import React from "react";
import styles from "./AccountDetailsHeader.module.css";
import AccountDetailsFooter from "./AccountDetailsFooter";
import MSearchSelect from "../../components/shared/MSearchSelect";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import AccountDetailsContext from "../../context/AccountDetailsContext";
import Settings from "../../data/Settings";

interface IProps {
  navigateToAccountPricing: any;
}

interface IState {}

export default class AccountDetails extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderPreviousInactiveIcon() {
    return (
      <div className={styles.previousIconDiv}>
        <svg className={styles.previousInactiveIconSVG}>
          <use
            x="-50px"
            y="-140px"
            href={icon + "#left-arrow-medium-inactive"}
            xlinkHref={icon + "#left-arrow-medium-inactive"}
          />
        </svg>
      </div>
    );
  }

  renderPreviousActiveIcon() {
    return (
      <div className={styles.previousIconDiv}>
        <svg
          className={styles.previousActiveIconSVG}
          onClick={this.context.loadPreviousAccount}
        >
          <use
            x="-30px"
            y="-140px"
            href={icon + "#left-arrow-medium-normal"}
            xlinkHref={icon + "#left-arrow-medium-normal"}
          />
        </svg>
      </div>
    );
  }

  renderNextInactiveIcon() {
    return (
      <div className={styles.nextIconDiv}>
        <svg className={styles.nextInActiveIconSVG}>
          <use
            x="-70px"
            y="-140px"
            href={icon + "#right-arrow-medium-inactive"}
            xlinkHref={icon + "#right-arrow-medium-inactive"}
          />
        </svg>
      </div>
    );
  }

  renderNextActiveIcon() {
    return (
      <div className={styles.nextIconDiv}>
        <svg
          className={styles.nextActiveIconSVG}
          onClick={this.context.loadNextAccount}
        >
          <use
            x="-90px"
            y="-140px"
            href={icon + "#right-arrow-medium-normal"}
            xlinkHref={icon + "#right-arrow-medium-normal"}
          />
        </svg>
      </div>
    );
  }

  render() {
    let previousIcon;
    let nextIcon;

    if (this.context.state.accountsData.selectedIndex > 0) {
      previousIcon = this.renderPreviousActiveIcon();
    } else {
      previousIcon = this.renderPreviousInactiveIcon();
    }

    if (
      this.context.state.accountsData.selectedIndex <
      this.context.state.accountsData.accountsList.length - 1
    ) {
      nextIcon = this.renderNextActiveIcon();
    } else {
      nextIcon = this.renderNextInactiveIcon();
    }

    return (
      <div>
        <div className={styles.headerContainer}>
          <div className={styles.headerStyle}>
            {previousIcon}
            <span className={styles.accountNameSpan}>
              {this.context.state.accountsData.selectedAccountName}
            </span>
            <span className={styles.headerTextSpan}>
              {Settings.text.label.accountDetails.accountDetailsHeader.label}
            </span>
          </div>
          <div className={styles.searchBoxStyle}>
            <MSearchSelect
              id={"accountSearch"}
              value={this.context.state.accountsData.searchAccountName}
              data={this.context.state.accountsData.searchAccountList}
              onChange={this.context.onSearchChange}
              onSelect={this.context.onSearchSelect}
              onClick={this.context.searchAccount}
            />
          </div>
          <div>{nextIcon}</div>
        </div>
        <AccountDetailsFooter
          navigateToAccountPricing={this.props.navigateToAccountPricing}
        />
      </div>
    );
  }
}
