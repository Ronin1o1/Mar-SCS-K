import React from "react";
import styles from "./AccountPricingGearSettings.module.css";
import icon from "../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import AccountPricingContext from "../../../context/AccountPricingContext";
import Settings from "../../../data/Settings";

interface Iprops {
  navigateToPricingSetup?: (status: boolean) => {};
  options: any;
}

interface Istate {
  open: boolean;
}

export default class AccountPricingGearSettings extends React.Component<
  Iprops,
  Istate
> {
  static contextType = AccountPricingContext;

  container = React.createRef();

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  };

  onClick = event => {
    this.setState(state => {
      return { open: !state.open };
    });

    if (event.target.id) {
      if (
        event.target.id ==
        Settings.text.compid.accountPricing.modal.hiddenAccounts
      )
        this.context.showModal(event, event.target.id);
      if (
        event.target.id ==
        Settings.text.compid.accountPricing.accountPricingSettingsOptions.setup
      )
        this.context.saveAndNavigateToPricingSetup(
          this.props.navigateToPricingSetup
        );
      if (
        event.target.id ==
        Settings.text.compid.accountPricing.accountPricingSettingsOptions
          .refreshRates
      )
        this.context.refreshAccountPricingRates();
      if (
        event.target.id ==
        Settings.text.compid.accountPricing.accountPricingSettingsOptions
          .historyReport
      )
        this.context.openHistoryReport();
    }
  };

  render() {
    return (
      <div className={styles.dropDowncontainer} ref={this.container}>
        <ul className={styles.settingsButtonIcon}>
          <li onClick={this.onClick}>
            <svg className={styles.settingsIconSVG}>
              <use
                x="-10px"
                y="-30px"
                href={icon + "#settings-cog-normal"}
                xlinkHref={icon + "#settings-cog-normal"}
              />
            </svg>
            <svg className={styles.settingsRolloverIconSVG}>
              <use
                x="-60px"
                y="-30px"
                href={icon + "#settings-cog-rollover"}
                xlinkHref={icon + "#settings-cog-rollover"}
              />
            </svg>
            {(() => {
              return (
                this.state.open && (
                  <ul className={styles.dropdown}>
                    {this.props.options.map(data => {
                      {
                        return (
                          <li key={data.key} id={data.key}>
                            {data.label}
                          </li>
                        );
                      }
                    })}
                  </ul>
                )
              );
            })()}
          </li>
        </ul>
      </div>
    );
  }
}
