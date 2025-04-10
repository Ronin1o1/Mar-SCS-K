import React from "react";
import styles from "./Table_Seasons.module.css";
import detailsStyles from "../../AccountDetails.module.css";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import icon from "../../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import BaseInputText from "../../../../components/base/BaseInputText";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface IProps {
  isBrandExtendedStay: string;
  seasonId: any;
  tableData: any;
  redBackground: boolean;
}

interface IState {
  iconStyle: any;
  expansionGroup: Array<boolean>;
}

const downArrow = (
  <use
    x="-30px"
    y="-10px"
    href={icon + "#disclosure-arrow-down"}
    xlinkHref={icon + "#disclosure-arrow-down"}
  />
);

const rightArrow = (
  <use
    x="-10px"
    y="-10px"
    href={icon + "#disclosure-arrow-right"}
    xlinkHref={icon + "#disclosure-arrow-right"}
  />
);

export default class Table_Seasons extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
    let losGrp = [];
    this.props.tableData.roomClassData.map(() => {
      losGrp.push(true);
    });
    this.state = {
      iconStyle: styles.rightArroIconSVG,
      expansionGroup: losGrp
    };
  }

  expandCollapseOnClick(index) {
    this.state.expansionGroup[index] = !this.state.expansionGroup[index];
    this.forceUpdate();
  }

  expandAll = event => {
    let expgrp = [];
    if (this.state.expansionGroup.includes(false)) {
      for (var i = 0; i < this.state.expansionGroup.length; i++) {
        expgrp.push(true);
      }
    } else {
      for (var i = 0; i < this.state.expansionGroup.length; i++) {
        expgrp.push(false);
      }
    }

    this.setState({ expansionGroup: expgrp });
  };

  renderFixedTableHeader() {
    const rows = [];
    const svgEle = (
      <svg className={styles.menuBoxChevronIconSVG} onClick={this.expandAll}>
        {!this.state.expansionGroup.includes(false) ? downArrow : rightArrow}
      </svg>
    );
    rows.push(
      <tr key={1}>
        <th></th>
      </tr>
    );
    rows.push(
      <tr key={2}>
        <th>
          {this.props.isBrandExtendedStay === Settings.text.constant.stringY &&
            svgEle}
          {Settings.text.constant.roomPoolGroup}
        </th>
      </tr>
    );
    return rows;
  }

  renderFixedLOSTable(losData: any, rcId: number) {
    const rows = [];
    losData.map(data => {
      rows.push(
        <tr key={data.losId}>
          <td
            className={[scptStyles.tableTextData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {data.label}
          </td>
        </tr>
      );
    });

    return rows;
  }

  renderFixedTableData() {
    const rows = [];
    this.props.tableData.roomClassData.map((data, index) => {
      const svgEle = (
        <svg
          className={styles.menuBoxChevronIconSVG}
          onClick={() => this.expandCollapseOnClick(index)}
        >
          {this.state.expansionGroup[index] ? downArrow : rightArrow}
        </svg>
      );
      rows.push(
        <tr key={data.id}>
          <td
            className={[scptStyles.tableRowLabel, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
              Settings.text.constant.stringY && svgEle}
            {data.label}
          </td>
        </tr>
      );

      this.props.isBrandExtendedStay === Settings.text.constant.stringY &&
        this.state.expansionGroup[index] &&
        rows.push(this.renderFixedLOSTable(data.losData, data.id));
    });

    return rows;
  }

  renderFixedTableFooter() {
    return (
      <tr>
        <td className={scptStyles.footerLabelStyle}>
          {this.props.tableData.totalData.label}
        </td>
      </tr>
    );
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.seasons.tableHeaders.map(
      (data, index) => (
        <th key={index} rowSpan={data.rowspan} colSpan={data.colspan}>
          {data.label}
        </th>
      )
    );
  }

  renderTableSubHeader() {
    return Settings.text.label.accountDetails.seasons.tableSubHeaders.map(
      (data, index) => (
        <th key={index}>
          {data
            .replace(
              Settings.text.constant.periodPlaceHolder,
              this.context.state.detailsData.period
            )
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              this.context.state.detailsData.prevPeriod
            )}
        </th>
      )
    );
  }

  renderLOSTable(losData: any, rcId: number) {
    const rows = [];
    losData.map(data => {
      rows.push(
        <tr key={data.losId}>
          <td className={scptStyles.tableData}>{data.yearRN}</td>
          <td className={scptStyles.tableData}>{data.prevYearRN}</td>
          <td className={styles.fixedWidthCell}>
            <div className={detailsStyles.percentDiv}>
              <BaseInputText
                id={
                  rcId +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.seasons.rnPct +
                  Settings.text.constant.underScoreSymbol +
                  this.props.seasonId +
                  Settings.text.constant.underScoreSymbol +
                  data.losId
                }
                value={Utils.handleNull(data.rnPct)}
                className={styles.inputTextStyle}
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
          <td className={styles.fixedWidthCell}>
            <BaseInputText
              id={
                rcId +
                Settings.text.constant.underScoreSymbol +
                Settings.text.compid.accountDetails.seasons.prevYearRate +
                Settings.text.constant.underScoreSymbol +
                this.props.seasonId +
                Settings.text.constant.underScoreSymbol +
                data.losId
              }
              value={Utils.handleNull(data.prevYearRate)}
              className={styles.inputTextStyle}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onBlur}
              disabled={this.context.state.detailsData.disableAll}
            />
          </td>
          <td className={styles.fixedWidthCell}>
            <BaseInputText
              id={
                rcId +
                Settings.text.constant.underScoreSymbol +
                Settings.text.compid.accountDetails.seasons.yearOpenRate +
                Settings.text.constant.underScoreSymbol +
                this.props.seasonId +
                Settings.text.constant.underScoreSymbol +
                data.losId
              }
              value={Utils.handleNull(data.yearOpenRate)}
              className={styles.inputTextStyle}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onBlur}
              disabled={this.context.state.detailsData.disableAll}
            />
          </td>
          <td className={styles.fixedWidthCell}>
            <BaseInputText
              id={
                rcId +
                Settings.text.constant.underScoreSymbol +
                Settings.text.compid.accountDetails.seasons.yearTargetRate +
                Settings.text.constant.underScoreSymbol +
                this.props.seasonId +
                Settings.text.constant.underScoreSymbol +
                data.losId
              }
              value={Utils.handleNull(data.yearTargetRate)}
              className={styles.inputTextStyle}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onBlur}
              disabled={this.context.state.detailsData.disableAll}
            />
          </td>
          <td className={styles.fixedWidthCell}>
            <BaseInputText
              id={
                rcId +
                Settings.text.constant.underScoreSymbol +
                Settings.text.compid.accountDetails.seasons.yearFloorRate +
                Settings.text.constant.underScoreSymbol +
                this.props.seasonId +
                Settings.text.constant.underScoreSymbol +
                data.losId
              }
              value={Utils.handleNull(data.yearFloorRate)}
              className={styles.inputTextStyle}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onBlur}
              disabled={this.context.state.detailsData.disableAll}
            />
          </td>
          <td className={scptStyles.tableData}>{data.yearMarRFPRate}</td>
          <td
            className={[
              scptStyles.tableData,
              data.ratePct < 0 && detailsStyles.coloredValue
            ].join(Settings.text.constant.stringSpace)}
          >
            {Utils.formatPercentValue(data.ratePct)}
          </td>
        </tr>
      );
    });

    return rows;
  }

  renderTableData() {
    const rows = [];
    this.props.tableData.roomClassData.map((data, index) => {
      rows.push(
        <tr key={data.id}>
          <td className={scptStyles.tableData}>{data.yearRN}</td>
          <td className={scptStyles.tableData}>{data.prevYearRN}</td>
          <td
            className={[scptStyles.tableData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
            Settings.text.constant.stringY ? (
              Utils.formatPercentValue(data.rnPct)
            ) : (
              <div className={detailsStyles.percentDiv}>
                <BaseInputText
                  id={
                    data.id +
                    Settings.text.constant.underScoreSymbol +
                    Settings.text.compid.accountDetails.seasons.rnPct +
                    Settings.text.constant.underScoreSymbol +
                    this.props.seasonId
                  }
                  value={Utils.handleNull(data.rnPct)}
                  onKeyPress={Utils.numberWithDecimalOnKeyPress}
                  onChange={this.context.onChange}
                  onBlur={this.context.onBlur}
                  disabled={this.context.state.detailsData.disableAll}
                />
                <span className={detailsStyles.percentSpan}>
                  {Settings.text.constant.percentSymbol}
                </span>
              </div>
            )}
          </td>
          <td
            className={[scptStyles.tableData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
            Settings.text.constant.stringY ? (
              data.prevYearRate
            ) : (
              <BaseInputText
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.seasons.prevYearRate +
                  Settings.text.constant.underScoreSymbol +
                  this.props.seasonId
                }
                value={Utils.handleNull(data.prevYearRate)}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onBlur}
                disabled={this.context.state.detailsData.disableAll}
              />
            )}
          </td>
          <td
            className={[scptStyles.tableData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
            Settings.text.constant.stringY ? (
              data.yearOpenRate
            ) : (
              <BaseInputText
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.seasons.yearOpenRate +
                  Settings.text.constant.underScoreSymbol +
                  this.props.seasonId
                }
                value={Utils.handleNull(data.yearOpenRate)}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onBlur}
                disabled={this.context.state.detailsData.disableAll}
              />
            )}
          </td>
          <td
            className={[scptStyles.tableData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
            Settings.text.constant.stringY ? (
              data.yearTargetRate
            ) : (
              <BaseInputText
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.seasons.yearTargetRate +
                  Settings.text.constant.underScoreSymbol +
                  this.props.seasonId
                }
                value={Utils.handleNull(data.yearTargetRate)}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onBlur}
                disabled={this.context.state.detailsData.disableAll}
              />
            )}
          </td>
          <td
            className={[scptStyles.tableData, styles.fixedWidthCell].join(
              Settings.text.constant.stringSpace
            )}
          >
            {this.props.isBrandExtendedStay ===
            Settings.text.constant.stringY ? (
              data.yearFloorRate
            ) : (
              <BaseInputText
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.seasons.yearFloorRate +
                  Settings.text.constant.underScoreSymbol +
                  this.props.seasonId
                }
                value={Utils.handleNull(data.yearFloorRate)}
                onKeyPress={Utils.numberWithDecimalOnKeyPress}
                onChange={this.context.onChange}
                onBlur={this.context.onBlur}
                disabled={this.context.state.detailsData.disableAll}
              />
            )}
          </td>
          <td className={scptStyles.tableData}>{data.yearMarRFPRate}</td>
          <td
            className={[
              scptStyles.tableData,
              data.ratePct < 0 && detailsStyles.coloredValue
            ].join(Settings.text.constant.stringSpace)}
          >
            {Utils.formatPercentValue(data.ratePct)}
          </td>
        </tr>
      );

      this.props.isBrandExtendedStay === Settings.text.constant.stringY &&
        this.state.expansionGroup[index] &&
        rows.push(this.renderLOSTable(data.losData, data.id));
    });

    return rows;
  }

  renderTableFooter() {
    let data = this.props.tableData.totalData;

    return (
      <tr>
        <td className={scptStyles.footerTextStyle}>{data.yearRN}</td>
        <td className={scptStyles.footerTextStyle}>{data.prevYearRN}</td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.rnPct < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          <span
            className={
              this.props.redBackground && data.rnPct
                ? detailsStyles.coloredCell
                : Settings.text.constant.stringEmpty
            }
          >
            {Utils.formatPercentValue(data.rnPct)}
          </span>
        </td>
        <td className={scptStyles.footerTextStyle}>{data.prevYearRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.yearOpenRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.yearTargetRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.yearFloorRate}</td>
        <td className={scptStyles.footerTextStyle}>{data.yearMarRFPRate}</td>
        <td
          className={[
            scptStyles.footerTextStyle,
            data.ratePct < 0 && detailsStyles.coloredValue
          ].join(Settings.text.constant.stringSpace)}
        >
          {Utils.formatPercentValue(data.ratePct)}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className={styles.sectionWrapper}>
        <table
          className={[scptStyles.scptTable, styles.seasonTableFixedColumn].join(
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
            className={[scptStyles.scptTable, styles.seasonTable].join(
              Settings.text.constant.stringSpace
            )}
          >
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              <tr>{this.renderTableSubHeader()}</tr>
              {this.renderTableData()}
              {this.renderTableFooter()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
