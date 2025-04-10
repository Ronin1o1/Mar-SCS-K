import React from "react";
import styles from "../rates/Table_Rates.module.css";
import detailsStyles from "../../AccountDetails.module.css";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";
import BaseInputText from "../../../../components/base/BaseInputText";
import Utils from "../../../../utils/Utils";

interface IProps {}

interface IState {}

export default class Table_Rates extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderFixedTableHeader() {
    return (
      <tr>
        <th>{Settings.text.constant.roomPoolGroup}</th>
      </tr>
    );
  }

  renderFixedTableData() {
    return this.context.state.detailsData.ratesData.roomClassData.map(data => {
      return (
        <tr key={data.id}>
          <td className={scptStyles.tableTextData}>{data.label}</td>
        </tr>
      );
    });
  }

  renderFixedTableFooter() {
    return (
      <tr>
        <td className={scptStyles.footerLabelStyle}>
          {this.context.state.detailsData.ratesData.totalData.label}
        </td>
      </tr>
    );
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.rates.tableHeaders.map(
      (data, index) => {
        let styleClass = "";
        if (index === 7 || index === 12) {
          styleClass = styles.boldHeaders;
        }
        if (index === 8 || index === 9) {
          styleClass = styles.coloredHeaders;
        }
        return (
          <th className={styleClass} key={index}>
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
        );
      }
    );
  }

  renderTableData() {
    return this.context.state.detailsData.ratesData.roomClassData.map(data => {
      return (
        <tr key={data.id}>
          <td className={scptStyles.tableData}>{data.prevYearMarRFPRate}</td>
          <td className={scptStyles.tableData}>{data.yearMarRFPRate}</td>
          <td className={scptStyles.tableData}>{data.prevYearGrossRate}</td>
          <td className={scptStyles.tableData}>{data.yearGrossRate}</td>
          <td
            className={[
              scptStyles.tableData,
              data.grossPct < 0 && detailsStyles.coloredValue
            ].join(Settings.text.constant.stringSpace)}
          >
            {Utils.formatPercentValue(data.grossPct)}
          </td>
          <td className={scptStyles.tableData}>{data.prevYearNetRate}</td>
          <td className={scptStyles.tableData}>{data.yearNetRate}</td>
          <td
            className={[
              scptStyles.tableData,
              data.netPct < 0 && detailsStyles.coloredValue
            ].join(Settings.text.constant.stringSpace)}
          >
            {Utils.formatPercentValue(data.netPct)}
          </td>
          <td className={scptStyles.tableData}>{data.recMin}</td>
          <td className={scptStyles.tableData}>{data.recMax}</td>
          <td className={scptStyles.tableData}>
            {Utils.formatPercentValue(data.recVar)}
          </td>
          <td className={scptStyles.tableData}>
            {Utils.formatPercentValue(data.retailVar)}
          </td>
          <td className={scptStyles.tableData}>
            {Utils.formatPercentValue(data.recPct)}
          </td>
        </tr>
      );
    });
  }

  renderTableFooter() {
    const data = this.context.state.detailsData.ratesData.totalData;
    return (
      <tr key={data.id}>
        <td className={scptStyles.footerTextStyle}>
          {data.prevYearMarRFPRate}
        </td>
        <td className={scptStyles.footerTextStyle}>{data.yearMarRFPRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.prevYearGrossRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.yearGrossRate}</td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.grossPct < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.grossPct)}
        </td>
        <td className={scptStyles.footerTextStyle}>
          <BaseInputText
            id={
              data.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.rates.prevYearNetRate
            }
            value={Utils.handleNull(data.prevYearNetRate)}
            onKeyPress={Utils.numberWithDecimalOnKeyPress}
            onChange={this.context.onChange}
            onBlur={this.context.onBlur}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.yearNetRate < data.recMin && detailsStyles.underlinedValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {data.yearNetRate}
        </td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.netPct < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.netPct)}
        </td>
        <td className={scptStyles.footerTextStyle}>{data.recMin}</td>
        <td className={scptStyles.footerTextStyle}>{data.recMax}</td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.recVar < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.recVar)}
        </td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.retailVar < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.retailVar)}
        </td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.recPct < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.recPct)}
        </td>
      </tr>
    );
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div className={styles.sectionWrapper}>
          <table
            className={[scptStyles.scptTable, styles.rateTableFixedColumn].join(
              Settings.text.constant.stringSpace
            )}
          >
            <tbody>
              {this.renderFixedTableHeader()}
              {this.renderFixedTableData()}
              {this.renderFixedTableFooter()}
            </tbody>
          </table>
          <div className={styles.tableDiv}>
            <table
              className={[scptStyles.scptTable, styles.ratesTable].join(
                Settings.text.constant.stringSpace
              )}
            >
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
                {this.renderTableFooter()}
              </tbody>
            </table>
          </div>
        </div>
      )
    );
  }
}
