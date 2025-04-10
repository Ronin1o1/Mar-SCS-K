import React from "react";
import styles from "../amenities/Table_Amenities.module.css";
import setupStyles from "../../PricingSetup.module.css";
import scptStyles from "../../../../index.css";
import BaseInputText from "../../../../components/base/BaseInputText";
import Utils from "../../../../utils/Utils";
import MSelect from "../../../../components/shared/MSelect";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Settings from "../../../../data/Settings";

interface IProps {
  data: any;
}

interface IState {}

export default class Table_AmenitiesType extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.pricingSetup.amenities.typeTableHeaders.map(
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
      const { id, type, selectList, selectValue, textValue } = data;
      return (
        <tr key={id}>
          <td
            className={[scptStyles.tableRowLabel, styles.tableColumn].join(" ")}
          >
            {type}
          </td>
          <td>
            <MSelect
              id={id + Settings.text.constant.select}
              className={styles.dropDownWidth}
              label={selectList}
              onChange={this.context.onChange}
              value={selectValue}
            />
          </td>
          <td>
            <BaseInputText
              id={id + Settings.text.constant.input}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
              disabled={
                id ==
                Settings.text.compid.pricingSetup.amenities.internetInputId
                  ? Settings.text.constant.booleanTrue
                  : Settings.text.constant.booleanFalse
              }
              value={textValue}
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={styles.amenitiesTable}>
        <table className={scptStyles.scptTable}>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
