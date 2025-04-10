import React from "react";
import popUpStyles from "./Table_AddAccount.module.css";
import scptStyles from "../../../../index.css";
import Utils from "../../../../utils/Utils";
import BaseInputText from "../../../../components/base/BaseInputText";
import Settings from "../../../../data/Settings";
import ModalContext from "../../../../context/ModalContext";

interface IProps {
  period: number;
}

interface IState {}

export default class Table_AddAccount extends React.Component<IProps, IState> {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
  }

  renderTableHeader() {
    const tableHeader = [
      Settings.text.constant.stringEmpty,
      this.props.period - 1,
      this.props.period
    ];
    return tableHeader.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  renderTableData() {
    const tableData = [
      {
        id: Settings.text.compid.accountPricing.modal.addAccountModal.fcrn,
        type: Settings.text.label.accountPricing.addAccountModal.fcrn
      },
      {
        id: Settings.text.compid.accountPricing.modal.addAccountModal.fcadr,
        type: Settings.text.label.accountPricing.addAccountModal.fcadr
      }
    ];
    return tableData.map((data, index) => {
      const { id, type } = data;
      return (
        <tr key={id}>
          <td className={scptStyles.tableRowLabel}>{type}</td>
          <td>
            <BaseInputText
              id={Settings.text.constant.prev + id}
              value={Utils.handleNull(
                this.context.state.addAccountModalData.addAccountSaveData[
                  Settings.text.constant.prev + id
                ]
              )}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
            />
          </td>
          <td>
            <BaseInputText
              id={id}
              value={Utils.handleNull(
                this.context.state.addAccountModalData.addAccountSaveData[id]
              )}
              onKeyPress={Utils.numberWithDecimalOnKeyPress}
              onChange={this.context.onChange}
              onBlur={this.context.onNumberFieldBlur}
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className={popUpStyles.addAccountTable}>
        <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
        </tbody>
      </table>
    );
  }
}
