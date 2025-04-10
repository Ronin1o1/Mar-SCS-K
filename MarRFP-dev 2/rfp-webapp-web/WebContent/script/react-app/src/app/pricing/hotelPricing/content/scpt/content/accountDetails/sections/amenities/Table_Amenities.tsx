import React from "react";
import styles from "../amenities/Table_Amenities.module.css";
import detailsStyles from "../../AccountDetails.module.css";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import MSelect from "../../../../components/shared/MSelect";
import BaseInputText from "../../../../components/base/BaseInputText";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface IProps {
  breakfastList: any;
  internetList: any;
}

interface IState {}

export default class Table_Amenities extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.amenities.tableHeaders.map(
      (key, index) => {
        return <th key={index}>{key}</th>;
      }
    );
  }

  renderTableData() {
    return this.context.state.detailsData.amenitiesData.roomClassData.map(
      data => {
        return (
          <tr key={data.id}>
            <td className={scptStyles.tableTextData}>{data.label}</td>
            <td>
              <MSelect
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.amenities.selectType
                    .breakfast
                }
                className={styles.dropDownWidth}
                label={this.props.breakfastList}
                onChange={this.context.onChange}
                value={Utils.handleNull(data.breakfast)}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
            <td>
              <MSelect
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.amenities.selectType
                    .internet
                }
                className={styles.dropDownWidth}
                label={this.props.internetList}
                onChange={this.context.onChange}
                value={Utils.handleNull(data.internet)}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
            <td>
              <MSelect
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.amenities.selectType
                    .transport
                }
                className={styles.dropDownSmallWidth}
                label={Settings.text.label.pricingSetup.amenities.yesNoOptions}
                onChange={this.context.onChange}
                value={Utils.convertYNOptions(data.transport)}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
            <td>
              <MSelect
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.amenities.selectType
                    .parking
                }
                className={styles.dropDownSmallWidth}
                label={Settings.text.label.pricingSetup.amenities.yesNoOptions}
                onChange={this.context.onChange}
                value={Utils.convertYNOptions(data.parking)}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
            <td>
              <div className={detailsStyles.percentDiv}>
                <BaseInputText
                  id={
                    data.id +
                    Settings.text.constant.underScoreSymbol +
                    Settings.text.compid.accountDetails.amenities.inputType.vat
                  }
                  value={Utils.handleNull(data.vat)}
                  onKeyPress={Utils.numberWithDecimalOnKeyPress}
                  onChange={this.context.onChange}
                  onBlur={this.context.onBlur}
                  disabled={this.context.state.detailsData.disableAll}
                />
                <span className={detailsStyles.percentSpan}>
                  {Settings.text.constant.percentSymbol}
                </span>
              </div>
            </td>
            <td>
              <BaseInputText
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.amenities.inputType
                    .totalFixedCost
                }
                value={Utils.handleNull(data.fixedCost)}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onBlur}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
          </tr>
        );
      }
    );
  }

  renderTableFooter() {
    const totalData = this.context.state.detailsData.amenitiesData.totalData;
    return (
      <tr>
        <td key={totalData.id} className={scptStyles.footerLabelStyle}>
          {totalData.label}
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MSelect
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.amenities.selectType.breakfast
            }
            className={styles.dropDownWidth}
            label={this.props.breakfastList}
            onChange={this.context.onChange}
            value={Utils.handleNull(totalData.breakfast)}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MSelect
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.amenities.selectType.internet
            }
            className={styles.dropDownWidth}
            label={this.props.internetList}
            onChange={this.context.onChange}
            value={Utils.handleNull(totalData.internet)}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MSelect
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.amenities.selectType.transport
            }
            className={styles.dropDownSmallWidth}
            label={Settings.text.label.pricingSetup.amenities.yesNoOptions}
            onChange={this.context.onChange}
            value={Utils.convertYNOptions(totalData.transport)}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MSelect
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.amenities.selectType.parking
            }
            className={styles.dropDownSmallWidth}
            label={Settings.text.label.pricingSetup.amenities.yesNoOptions}
            onChange={this.context.onChange}
            value={Utils.convertYNOptions(totalData.parking)}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerTextStyle}>
          {Utils.formatPercentValue(totalData.vat)}
        </td>
        <td className={scptStyles.footerTextStyle}>{totalData.fixedCost}</td>
      </tr>
    );
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div>
          <table className={scptStyles.scptTable}>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
              {this.renderTableFooter()}
            </tbody>
          </table>
        </div>
      )
    );
  }
}
