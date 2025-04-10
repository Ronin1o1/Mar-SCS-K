import React from "react";
import styles from "../history/Table_History.module.css";
import scptStyles from "../../../../index.css";
import icon from "../../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";

interface IProps {}

interface IState {}

export default class Table_HistoryAccounts extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.history.accountTableHeaders.map(
      (data, index) => (
        <th key={index}>
          {data
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              this.context.state.detailsData.prevPeriod
            )
            .replace(
              Settings.text.constant.prev2PeriodPlaceHolder,
              this.context.state.detailsData.prev2Period
            )}
        </th>
      )
    );
  }

  renderTableData() {
    const svgCellIndex =
      Settings.text.label.accountDetails.history.accountTableSVGCellIndex;

    return this.context.state.detailsData.historyData.accountsData.map(
      (data, index) => {
        return (
          <td key={index} className={scptStyles.tableTextData}>
            {svgCellIndex.includes(index) ? this.renderSVG(data) : data}
          </td>
        );
      }
    );
  }

  renderSVG(val) {
    return (
      val === Settings.text.constant.stringY && (
        <svg className={styles.checkMarkIconSVG}>
          <use
            x="-170px"
            y="-60px"
            href={icon + "#check-mark-green"}
            xlinkHref={icon + "#check-mark-green"}
          />
        </svg>
      )
    );
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div>
          <table
            className={[scptStyles.scptTable, styles.accTableWdt].join(
              Settings.text.constant.stringSpace
            )}
          >
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              <tr>{this.renderTableData()}</tr>
            </tbody>
          </table>
        </div>
      )
    );
  }
}
