import React from "react";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import BaseInputText from "../../../../components/base/BaseInputText";
import detailsStyles from "../../AccountDetails.module.css";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface IProps {}

interface IState {}

export default class Table_RoomNights extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.roomNights.tableHeaders.map(
      (key, index) => {
        return (
          <th key={index}>
            {key
              .replace(
                Settings.text.constant.periodPlaceHolder,
                this.context.state.detailsData.period
              )
              .replace(
                Settings.text.constant.prevPeriodPlaceHolder,
                this.context.state.detailsData.prevPeriod
              )}
          </th>
        );
      }
    );
  }

  renderTableData() {
    return this.context.state.detailsData.roomNightsData.roomClassData.map(
      data => {
        return (
          <tr key={data.id}>
            <td className={scptStyles.tableTextData}>{data.label}</td>
            <td>{data.year}</td>
            <td>{data.prevYear}</td>
            <td>{data.pctChange}</td>
          </tr>
        );
      }
    );
  }

  renderTableFooter() {
    const data = this.context.state.detailsData.roomNightsData.totalData;
    return (
      <tr key={data.id}>
        <td className={scptStyles.footerLabelStyle}>{data.label}</td>
        <td className={scptStyles.footerTextStyle}>
          <BaseInputText
            id={
              data.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.roomNights.year
            }
            value={Utils.handleNull(data.year)}
            onKeyPress={Utils.numberWithDecimalOnKeyPress}
            onChange={this.context.onChange}
            onBlur={this.context.onBlur}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerTextStyle}>
          <BaseInputText
            id={
              data.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.roomNights.prevYear
            }
            value={Utils.handleNull(data.prevYear)}
            onKeyPress={Utils.numberWithDecimalOnKeyPress}
            onChange={this.context.onChange}
            onBlur={this.context.onBlur}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.pctChange < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.pctChange)}
        </td>
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
