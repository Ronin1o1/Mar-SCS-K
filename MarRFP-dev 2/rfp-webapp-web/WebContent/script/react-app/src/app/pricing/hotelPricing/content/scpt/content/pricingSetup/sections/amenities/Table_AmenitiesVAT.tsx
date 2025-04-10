import React from "react";
import styles from "../amenities/Table_Amenities.module.css";
import setupStyles from "../../PricingSetup.module.css";
import scptStyles from "../../../../index.css";
import Utils from "../../../../utils/Utils";
import BaseInputText from "../../../../components/base/BaseInputText";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Settings from "../../../../data/Settings";

interface IProps {
  data: any;
  period: number;
}

interface IState {}

export default class Table_AmenitiesVAT extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.pricingSetup.amenities.vatTableHeaders.map(
      (key, index) => {
        return (
          <th className={setupStyles.noWrapText} key={index}>
            {key}
          </th>
        );
      }
    );
  }

  renderTableData() {
    return this.props.data.map((data) => {
      const { type, value } = data;
      return (
        <tr key={type}>
          <td
            className={[scptStyles.tableRowLabel, styles.tableColumn].join(" ")}
          >
            {type}
          </td>
          {type != this.props.period ? (
            <td
              className={[scptStyles.tableTextData, styles.tableColumn].join(
                " "
              )}
            >
              {value}
            </td>
          ) : (
            <td>
              <BaseInputText
                id={Settings.text.compid.pricingSetup.amenities.vatInputId}
                value={value}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onNumberFieldBlur}
              />
            </td>
          )}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={styles.amenitiesTable}>
        <table
          className={[scptStyles.scptTable, styles.vatTable].join(
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
