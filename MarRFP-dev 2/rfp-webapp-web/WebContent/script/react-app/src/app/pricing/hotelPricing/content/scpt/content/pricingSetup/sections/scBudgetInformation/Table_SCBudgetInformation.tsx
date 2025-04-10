import React from "react";
import scptStyles from "../../../../index.css";
import BaseInputText from "../../../../components/base/BaseInputText";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Utils from "../../../../utils/Utils";
import Settings from "../../../../data/Settings";
import styles from "../thresholds/Table_Thresholds.module.css";
import setupStyles from "../../PricingSetup.module.css";

interface IProps {
  period: number;
}

interface IState {}

export default class Table_SCBudgetInformation extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader(tableData) {
    return tableData.tableHeader.map((key, index) => {
      return (
        <th className={setupStyles.noWrapText} key={index}>
          {key}
        </th>
      );
    });
  }

  renderTableData(tableData) {
    return tableData.rowData.map((data) => {
      const { rowid, rowval, col1val, col2val, datatype } = data;
      return (
        <tr key={rowid}>
          <td
            className={[scptStyles.tableRowLabel, styles.tableColumn].join(" ")}
          >
            {rowval}
          </td>
          <td>
            <BaseInputText
              id={rowid + tableData.col1Id}
              value={
                datatype ==
                Settings.text.compid.pricingSetup.scBudgetInformation.numberType
                  ? Utils.formatNumber(col1val)
                  : col1val
              }
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
              disabled={tableData.allDisabled}
            />
          </td>
          <td>
            <BaseInputText
              id={rowid + tableData.col2Id}
              value={
                datatype ==
                Settings.text.compid.pricingSetup.scBudgetInformation.numberType
                  ? Utils.formatNumber(col2val)
                  : col2val
              }
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
              disabled={tableData.allDisabled}
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    const tableData = this.context.getBudgetData(this.props.period);
    return (
      <div className={styles.scBudgetTable}>
        <table className={scptStyles.scptTable}>
          <tbody>
            <tr>{this.renderTableHeader(tableData)}</tr>
            {this.renderTableData(tableData)}
          </tbody>
        </table>
      </div>
    );
  }
}
