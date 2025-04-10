import React from "react";
import styles from "./Table_HiddenAccounts.module.css";
import MCheckBox from "../../../../components/shared/MCheckbox";
import icon from "../../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import ModalContext from "../../../../context/ModalContext";
import Settings from "../../../../data/Settings";

interface Iprops {}

interface Istate {}

export default class Table_HiddenAccounts extends React.Component<
  Iprops,
  Istate
> {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
  }

  getStatusIcon = (status: string) => {
    switch (status) {
      case Settings.text.constant.statusA:
        return (
          <svg className={styles.acceptedIconSVG}>
            <use
              x="-110px"
              y="-60px"
              href={icon + "#accepted-icon"}
              xlinkHref={icon + "#accepted-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusS:
        return (
          <svg className={styles.requestedIconSVG}>
            <use
              x="-90px"
              y="-60px"
              href={icon + "#requested-icon"}
              xlinkHref={icon + "#requested-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusL:
        return (
          <svg className={styles.pendingIconSVG}>
            <use
              x="-150px"
              y="-60px"
              href={icon + "#pending-icon"}
              xlinkHref={icon + "#pending-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusR:
        return (
          <svg className={styles.declinedIconSVG}>
            <use
              x="-130px"
              y="-60px"
              href={icon + "#declined-icon"}
              xlinkHref={icon + "#declined-icon"}
            />
          </svg>
        );
      default:
        return <svg className={styles.declinedIconSVG}></svg>;
    }
  };

  renderTableData() {
    return this.context.state.hiddenAccountsModalData.hiddenAccountsData.map(
      hiddenAccountsData => {
        const {
          scpt_accountid,
          accountname,
          status,
          selected
        } = hiddenAccountsData;

        return (
          <tr key={scpt_accountid}>
            <td>
              <div className={styles.accountSelect}>
                <MCheckBox
                  id={
                    Settings.text.compid.accountPricing.modal.hiddenAccounts +
                    scpt_accountid
                  }
                  isChecked={selected === Settings.text.constant.stringY}
                  onClick={this.context.onClick}
                />
              </div>
              <div className={styles.statusIconDiv}>
                {this.getStatusIcon(status)}
              </div>
              <span className={styles.accountLabel}>{accountname}</span>
            </td>
          </tr>
        );
      }
    );
  }

  render() {
    return (
      <div>
        <div className={styles.headerLabel}>
          {Settings.text.label.accountPricing.hiddenAccountModal.tableHeader}
        </div>
        <div className={styles.hiddenAccoutsTableDiv}>
          <table className={styles.hiddenAccoutsTable}>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
