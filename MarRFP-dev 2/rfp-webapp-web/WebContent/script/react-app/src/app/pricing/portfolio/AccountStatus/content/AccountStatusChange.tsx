import React, { Suspense } from "react";
import { Component } from "react";
import CSelect from "../../../../common/components/CSelect";
import SaveBtnImg from "../../../../common/assets/img/button/btnSave.gif";
import AccountStatusListContext from "../context/AccountStatusListContext";
import Settings from "../static/Settings";
import styles from "./AccountStatusChange.css";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import API from "../service/API";

export default class AccountStatusChange extends Component {
  static contextType = AccountStatusListContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    API.getAllAccountStatus().then((data) => {
      data.unshift({ accountStatusId: 0, accountStatusName: "" });
      this.context.setState({
        ...this.context.state,
        accountChangeOptions: data,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <table className={styles.accountStatusChangeTable}>
            <tbody>
              <tr>
                <td align="left" className={styles.field_Name}>
                  {Settings.accountStatusChange.formFields.accountStatus.label}
                </td>
                <td align="left" className={styles.field_Value}>
                  <CSelect
                    id={
                      Settings.accountStatusChange.formFields.accountStatus.id
                    }
                    ddnOptions={this.context.state.accountChangeOptions}
                    keyField={
                      Settings.accountStatusList.filter.formFields
                        .accountStatusRefList.keyField
                    }
                    valField={
                      Settings.accountStatusList.filter.formFields
                        .accountStatusRefList.valField
                    }
                    onChange={(e) => this.context.accountStatusUpdateHandler(e)}
                  />
                </td>
              </tr>
              <tr style={{ height: "10px" }}>
                <td />
              </tr>
              <tr>
                <td align="center" valign="bottom" colSpan={2}>
                  <img
                    onClick={this.context.saveChangeAccountStatus}
                    src={SaveBtnImg}
                    className={styles.accountStatusChangeSaveBtn}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.accountStatusChangePopupAlert}>
            <CModal
              title={Settings.accountStatusChangeAlert.title}
              onClose={this.context.closeAlertModal} //method
              show={this.context.state.accountStatusChangeAlert.showAlertModal} //property
            >
              <Suspense fallback={<CSuspense />}>
                <div className={styles.accountStatusChangeAlert}>
                  {Settings.accountStatusChangeAlert.message}
                </div>
              </Suspense>
            </CModal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
