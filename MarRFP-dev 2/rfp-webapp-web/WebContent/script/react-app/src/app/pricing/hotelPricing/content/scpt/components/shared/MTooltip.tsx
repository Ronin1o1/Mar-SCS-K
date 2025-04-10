import React from "react";
import styles from "./MTooltip.module.css";
import Settings from "../../data/Settings";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";

interface IProps {}

interface IState {}

export default class MTooltip extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      displayTooltip: false
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  hideTooltip() {
    this.setState({ displayTooltip: false });
  }
  showTooltip() {
    this.setState({ displayTooltip: true });
  }

  render() {
    return (
      <div className={styles.tooltip}>
        <div className={styles.infoIcon}>
          <svg className={styles.infoIconSVG}>
            <use
              x="-50px"
              y="-60px"
              href={icon + "#info-sign"}
              xlinkHref={icon + "#info-sign"}
            />
          </svg>
        </div>
        <span className={styles.tooltiptext}>
          <div>
            <span className={styles.blockAlign}>
              {
                Settings.text.label.accountPricing.accountPricingTableHeader
                  .legend.legendTexts.grading
              }
            </span>
            <span />
            <table className={styles.tableStyle} cellSpacing={"0"}>
              <tbody>
                <tr className={styles.tableRow}>
                  <td
                    className={[styles.tableCell, styles.bkColorGreen].join(
                      Settings.text.constant.stringSpace
                    )}
                  >
                    <div className={styles.numberText}>1</div>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts
                          .minimalOpp
                      }
                    </div>
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td
                    className={[styles.tableCell, styles.bkColorYellow].join(
                      Settings.text.constant.stringSpace
                    )}
                  >
                    <div className={styles.numberText}>2</div>
                  </td>
                  <td />
                </tr>
                <tr className={styles.tableRow}>
                  <td
                    className={[styles.tableCell, styles.bkColorMagenta].join(
                      Settings.text.constant.stringSpace
                    )}
                  >
                    <div className={styles.numberText}>3</div>
                  </td>
                  <td />
                </tr>
                <tr className={styles.tableRow}>
                  <td
                    className={[styles.tableCell, styles.bkColorOrange].join(
                      Settings.text.constant.stringSpace
                    )}
                  >
                    <div className={styles.numberText}>4</div>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts
                          .recommend
                      }
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <span className={styles.blockAlign}>
              {
                Settings.text.label.accountPricing.accountPricingTableHeader
                  .legend.legendTexts.accountStatus
              }
            </span>
            <table className={styles.tableStyle}>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <svg className={styles.requestedIconSVG}>
                      <use
                        x="-90px"
                        y="-60px"
                        href={icon + "#requested-icon"}
                        xlinkHref={icon + "#requested-icon"}
                      />
                    </svg>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts
                          .requested
                      }
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <svg className={styles.acceptedIconSVG}>
                      <use
                        x="-110px"
                        y="-60px"
                        href={icon + "#accepted-icon"}
                        xlinkHref={icon + "#accepted-icon"}
                      />
                    </svg>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts.accepted
                      }
                    </div>
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <svg className={styles.pendingIconSVG}>
                      <use
                        x="-150px"
                        y="-60px"
                        href={icon + "#pending-icon"}
                        xlinkHref={icon + "#pending-icon"}
                      />
                    </svg>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts.pending
                      }
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <svg className={styles.declinedIconSVG}>
                      <use
                        x="-130px"
                        y="-60px"
                        href={icon + "#declined-icon"}
                        xlinkHref={icon + "#declined-icon"}
                      />
                    </svg>
                  </td>
                  <td>
                    <div className={styles.descText}>
                      {
                        Settings.text.label.accountPricing
                          .accountPricingTableHeader.legend.legendTexts.declined
                      }
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </span>
      </div>
    );
  }
}
