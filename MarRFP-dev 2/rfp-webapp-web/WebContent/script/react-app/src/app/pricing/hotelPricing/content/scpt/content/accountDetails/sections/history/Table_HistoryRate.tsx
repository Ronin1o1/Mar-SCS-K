import React from "react";
import styles from "../history/Table_History.module.css";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";

interface IProps {}

interface IState {}

export default class Table_HistoryRate extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.history.rateTableHeaders.map(
      (data, index) => (
        <th key={index} className={styles.rateSubHeaders}>
          {data
            .replace(
              Settings.text.constant.periodPlaceHolder,
              this.context.state.detailsData.period
            )
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              this.context.state.detailsData.prevPeriod
            )
            .replace(
              Settings.text.constant.prev2PeriodPlaceHolder,
              this.context.state.detailsData.prev2Period
            )
            .replace(
              Settings.text.constant.prev3PeriodPlaceHolder,
              this.context.state.detailsData.prev3Period
            )}
        </th>
      )
    );
  }

  renderTableData() {
    return this.context.state.detailsData.historyData.rateData.map(
      (data, index) => {
        return (
          <tr key={index}>
            {(() => {
              return data.map((cellData, cellIndex) => {
                return (
                  <td key={cellIndex} className={scptStyles.tableData}>
                    {cellData}
                  </td>
                );
              });
            })()}
          </tr>
        );
      }
    );
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div>
          <table
            className={[scptStyles.scptTable, styles.historyRateTable].join(
              Settings.text.constant.stringSpace
            )}
          >
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
    );
  }
}
