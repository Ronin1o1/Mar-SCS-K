import React from "react";
import styles from "../retailRate/Table_RetailRate.module.css";
import setupStyles from "../../PricingSetup.module.css";
import scptStyles from "../../../../index.css";
import Utils from "../../../../utils/Utils";
import BaseInputText from "../../../../components/base/BaseInputText";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Settings from "../../../../data/Settings";

interface IProps {
  period: number;
}

interface IState {}

export default class RetailRateTable extends React.Component<IProps, IState> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader(tableData) {
    return tableData.headerData.map((data, index) => {
      return (
        <th className={setupStyles.noWrapText} key={index}>
          {data}
        </th>
      );
    });
  }

  renderTableData(tableData) {
    return tableData.rowData.map((data, idx) => {
      return (
        <tr key={idx}>
          <td
            className={[scptStyles.tableRowLabel, styles.tableColumn].join(" ")}
          >
            {data.yearData}
          </td>
          {data.seasonData.map((data, index) => {
            return (
              <td key={index}>
                <BaseInputText
                  id={
                    (idx == 0
                      ? Settings.text.compid.pricingSetup.retailRate.prevYear
                      : Settings.text.compid.pricingSetup.retailRate.currYear) +
                    Settings.text.compid.pricingSetup.retailRate.seasonRate +
                    (index + 1)
                  }
                  value={data}
                  onChange={this.context.onChange}
                  onBlur={this.context.onRetailRateBlur}
                  onKeyPress={Utils.numberWithDecimalOnKeyPress}
                  disabled={tableData.allDisabled}
                />
              </td>
            );
          })}
          <td
            id={Settings.text.compid.pricingSetup.retailRate.weightedTotal}
            className={[scptStyles.tableData, styles.tableColumn].join(" ")}
          >
            {data.totalData}
          </td>
        </tr>
      );
    });
  }

  renterTableFooter(tableData) {
    return (
      <tr key={Settings.text.compid.pricingSetup.retailRate.yoyPerChange}>
        <td
          className={[scptStyles.footerLabelStyle, styles.tableColumnBold].join(
            " "
          )}
          colSpan={tableData.rowData[0].seasonData.length}
        />
        <td
          className={[scptStyles.footerLabelStyle, styles.tableColumnBold].join(
            " "
          )}
        >
          {tableData.footerData.footerText}
        </td>
        <td
          id={Settings.text.compid.pricingSetup.retailRate.yoyPerChange}
          className={[scptStyles.footerTextStyle, styles.tableColumnBold].join(
            " "
          )}
        >
          {tableData.footerData.footerVal}
        </td>
      </tr>
    );
  }

  render() {
    const tableData = this.context.getRetailRateData(this.props.period);
    return (
      <div className={styles.retailTable}>
        <table
          className={[scptStyles.scptTable, styles.rateTable].join(
            Settings.text.constant.stringSpace
          )}
        >
          <tbody>
            <tr>{this.renderTableHeader(tableData)}</tr>
            {this.renderTableData(tableData)}
            {this.renterTableFooter(tableData)}
          </tbody>
        </table>
      </div>
    );
  }
}
