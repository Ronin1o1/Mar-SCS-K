import React from "react";
import styles from "./Section_GeneralInformation.module.css";
import scptStyles from "../../../../index.css";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";
import MSelect from "../../../../components/shared/MSelect";
import MCheckBox from "../../../../components/shared/MCheckbox";

interface IProps {}

interface IState {}

export default class Table_GeneralInformation extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    return Settings.text.label.accountDetails.generalInfo.tableHeaders.map(
      (key, index) => {
        return <th key={index}>{key}</th>;
      }
    );
  }

  renderTableData() {
    return this.context.state.detailsData.generalInfoData.roomClassData.map(
      data => {
        return (
          <tr key={data.id}>
            <td className={scptStyles.tableTextData}>{data.label}</td>
            <td className={scptStyles.tableTextData}>{data.salesGroup}</td>
            <td className={scptStyles.tableTextData}>{data.salesManager}</td>
            <td className={scptStyles.tableTextData}>{data.dueDate}</td>
            <td>
              <MCheckBox
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.generalInfo.donotprice
                }
                label={Settings.text.constant.stringEmpty}
                isChecked={data.donotprice === Settings.text.constant.stringY}
                onClick={this.context.onChange}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
            <td>
              <MSelect
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.generalInfo.status
                }
                className={styles.dropDownWidth}
                label={
                  Settings.text.label.accountDetails.generalInfo.statusList
                }
                onChange={this.context.onChange}
                value={
                  data.btStatus
                    ? Settings.text.label.btStatusMap[data.btStatus]
                    : data.status
                }
                disabled={
                  data.btStatus || this.context.state.detailsData.disableAll
                }
              />
            </td>
            <td>
              <MCheckBox
                id={
                  data.id +
                  Settings.text.constant.underScoreSymbol +
                  Settings.text.compid.accountDetails.generalInfo.lra
                }
                label={Settings.text.constant.stringEmpty}
                isChecked={data.lra === Settings.text.constant.stringY}
                onClick={this.context.onChange}
                disabled={this.context.state.detailsData.disableAll}
              />
            </td>
          </tr>
        );
      }
    );
  }

  renderTableFooter() {
    const totalData = this.context.state.detailsData.generalInfoData.totalData;
    return (
      <tr>
        <td key={totalData.id} className={scptStyles.footerLabelStyle}>
          {totalData.label}
        </td>
        <td className={scptStyles.footerValueStyle}>{totalData.salesGroup}</td>
        <td className={scptStyles.footerValueStyle}>
          {totalData.salesManager}
        </td>
        <td className={scptStyles.footerValueStyle}>{totalData.dueDate}</td>
        <td className={scptStyles.footerValueStyle}>
          <MCheckBox
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.generalInfo.donotprice
            }
            label={Settings.text.constant.stringEmpty}
            isChecked={totalData.donotprice === Settings.text.constant.stringY}
            onClick={this.context.onChange}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MSelect
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.generalInfo.status
            }
            className={styles.dropDownWidth}
            label={Settings.text.label.accountDetails.generalInfo.statusList}
            onChange={this.context.onChange}
            value={totalData.status}
            disabled={
              totalData.btStatus || this.context.state.detailsData.disableAll
            }
          />
        </td>
        <td className={scptStyles.footerValueStyle}>
          <MCheckBox
            id={
              totalData.id +
              Settings.text.constant.underScoreSymbol +
              Settings.text.compid.accountDetails.generalInfo.lra
            }
            label={Settings.text.constant.stringEmpty}
            isChecked={totalData.lra === Settings.text.constant.stringY}
            onClick={this.context.onChange}
            disabled={this.context.state.detailsData.disableAll}
          />
        </td>
      </tr>
    );
  }

  render() {
    return (
      this.context.state.detailsData && (
        <div className={styles.sectionWrapper}>
          <table className={scptStyles.scptTable}>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
    );
  }
}
