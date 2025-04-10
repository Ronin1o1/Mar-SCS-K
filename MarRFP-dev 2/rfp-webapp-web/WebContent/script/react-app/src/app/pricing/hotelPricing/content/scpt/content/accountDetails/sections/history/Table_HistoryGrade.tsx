import React from "react";
import styles from "../history/Table_History.module.css";
import scptStyles from "../../../../index.css";
import MRadioButtonList from "../../../../components/shared/MRadioButtonList";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";

interface IProps {
  dowViewAs: string;
  franchFlag: string;
  onChange: any;
}

interface IState {}

export default class Table_HistoryGrade extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    const commonHeaders =
      Settings.text.label.accountDetails.history.gradeTableHeaders;
    const behaviorHeaders =
      this.props.franchFlag === Settings.text.constant.managedProperty
        ? Settings.text.label.accountDetails.history.behaviourHeaders
        : [];
    const allHeaders = [...commonHeaders, ...behaviorHeaders];

    return allHeaders.map((data, index) => {
      return (
        <th key={index} colSpan={data.colspan}>
          {data.label.replace(
            Settings.text.constant.prevPeriodPlaceHolder,
            this.context.state.detailsData.prevPeriod
          )}
          {(() => {
            return (
              data.radio && (
                <div>
                  <div className={styles.dowRadioBtns}>
                    {Settings.text.label.historyViewAs.viewAsLabel}
                  </div>
                  <div className={styles.radioButtonStyle}>
                    <MRadioButtonList
                      id={Settings.text.compid.historyViewAs}
                      radioButtonName={Settings.text.compid.historyViewAs}
                      horizontal={true}
                      buttons={Settings.text.label.historyViewAs.viewAsOptions}
                      onChange={this.props.onChange}
                      checkSelected={
                        this.props.dowViewAs === Settings.text.constant.stringY
                          ? Settings.text.label.historyViewAs.viewAsOptions[0]
                          : Settings.text.label.historyViewAs.viewAsOptions[1]
                      }
                    />
                  </div>
                </div>
              )
            );
          })()}
        </th>
      );
    });
  }

  renderTableSubHeader() {
    const commonSubHeaders =
      Settings.text.label.accountDetails.history.gradeTableSubHeaders;
    const behaviorSubHeaders =
      this.props.franchFlag === Settings.text.constant.managedProperty
        ? Settings.text.label.accountDetails.history.behaviourSubHeaders
        : [];
    const allSubHeaders = [...commonSubHeaders, ...behaviorSubHeaders];

    return allSubHeaders.map((data, index) => (
      <th key={index} className={styles.gradeSubHeaders}>
        {data.replace(
          Settings.text.constant.prevPeriodPlaceHolder,
          this.context.state.detailsData.prevPeriod
        )}
      </th>
    ));
  }

  renderTableData() {
    const commonData = this.context.state.detailsData.historyData.gradeData
      .common;
    const dowData =
      this.props.dowViewAs === Settings.text.constant.stringY
        ? this.context.state.detailsData.historyData.gradeData.dowAmount
        : this.context.state.detailsData.historyData.gradeData.dowPct;
    const behaviorData =
      this.props.franchFlag === Settings.text.constant.managedProperty
        ? this.context.state.detailsData.historyData.gradeData.behavior
        : [];
    const allData = [...commonData, ...dowData, ...behaviorData];

    const coloredCellIndex =
      Settings.text.label.accountDetails.history.gradeTableColoredCellIndex;

    return allData.map((data, index) => {
      return (
        <td
          key={index}
          className={[
            scptStyles.tableTextData,
            coloredCellIndex.includes(index) && this.renderBGColor(data)
          ].join(Settings.text.constant.stringSpace)}
        >
          {data}
        </td>
      );
    });
  }

  renderBGColor(val) {
    let colorStyle;
    switch (val) {
      case 1:
        colorStyle = styles.bkColorGreen;
        break;
      case 2:
        colorStyle = styles.bkColorYellow;
        break;
      case 3:
        colorStyle = styles.bkColorMagenta;
        break;
      case 4:
        colorStyle = styles.bkColorOrange;
        break;
      default:
        colorStyle = null;
    }
    return colorStyle;
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div>
          <table
            className={[scptStyles.scptTable, styles.historyGradeTable].join(
              Settings.text.constant.stringSpace
            )}
          >
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              <tr>{this.renderTableSubHeader()}</tr>
              <tr>{this.renderTableData()}</tr>
            </tbody>
          </table>
        </div>
      )
    );
  }
}
