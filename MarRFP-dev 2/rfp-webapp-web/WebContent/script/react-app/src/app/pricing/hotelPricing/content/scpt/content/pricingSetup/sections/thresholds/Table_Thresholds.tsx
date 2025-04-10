import React from "react";
import styles from "../thresholds/Table_Thresholds.module.css";
import setupStyles from "../../PricingSetup.module.css";
import scptStyles from "../../../../index.css";
import MRadioButtonList from "../../../../components/shared/MRadioButtonList";
import BaseInputText from "../../../../components/base/BaseInputText";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Utils from "../../../../utils/Utils";
import Settings from "../../../../data/Settings";

interface IProps {}

interface IState {}

export default class ThresholdTable extends React.Component<IProps, IState> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    const tableHeader =
      Settings.text.label.pricingSetup.thresholds.tableHeaders;
    return tableHeader.map((key, index) => {
      return (
        <th className={setupStyles.noWrapText} key={index}>
          {key}
        </th>
      );
    });
  }

  renderTableData() {
    const thresholdData = this.context.getThresholdData();

    return thresholdData.map((data, index) => {
      const { rowid, rowval, col1val, col2val, col3val } = data;
      return (
        <tr key={rowid}>
          <td className={[scptStyles.tableData, styles.tableColumn].join(" ")}>
            {rowval}
          </td>
          <td>
            <BaseInputText
              id={rowid + Settings.text.compid.pricingSetup.thresholds.low}
              value={col1val}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
            />
          </td>
          <td>
            <BaseInputText
              id={rowid + Settings.text.compid.pricingSetup.thresholds.high}
              value={col2val}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
            />
          </td>
          {col3val == Settings.text.label.pricingSetup.thresholds.roomsLabel ? (
            <td
              className={[scptStyles.tableRowLabel, styles.tableColumn].join(
                " "
              )}
            >
              {col3val}
            </td>
          ) : (
            <td>
              <div className={styles.spacingForRadioButton}>
                <MRadioButtonList
                  radioButtonName={rowid}
                  buttons={
                    Settings.text.label.pricingSetup.thresholds.offLabels
                  }
                  horizontal={Settings.text.constant.booleanTrue}
                  onChange={this.context.onChange}
                  id={Settings.text.compid.pricingSetup.thresholds.off}
                  checkSelected={
                    col3val
                      ? col3val == Settings.text.constant.stringY
                        ? Settings.text.label.pricingSetup.thresholds
                            .offLabels[0]
                        : Settings.text.label.pricingSetup.thresholds
                            .offLabels[1]
                      : Settings.text.constant.stringEmpty
                  }
                />
              </div>
            </td>
          )}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={styles.thresholdTable}>
        <table
          className={[scptStyles.scptTable, styles.thresholdTable].join(
            Settings.text.constant.stringSpace
          )}
        >
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
