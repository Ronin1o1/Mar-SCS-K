import React, { Component } from "react";
import Settings from "../../static/Settings";
import styles from "./EditEmailLaunch.css";
import AccountListContext from "../../context/AccountListContext";
import btnSave from "../../../../../common/assets/img/btnSave.gif";
import btnClear from "../../../../../common/assets/img/button/btnClear.gif";
import btnSendEmail from "../../../../../common/assets/img/button/btnSendEmail.gif";
import btnCancel from "../../../../../common/assets/img/button/btnCancel.gif";
import Utils from "../../../../../common/utils/Utils";

let parentContextType = null;
interface IProps {}

interface IState {
  contextType: any;
}

export default class EditEmailLaunch extends Component<IProps, IState> {
  static contextType = AccountListContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          parentContextType = accountListContext;
          return (
            <React.Fragment>
              <table className={styles.borderColapse}>
                <tr>
                  <td className={styles.fieldName}>
                    {Settings.EditEmailLaunch.additional_text.label}
                  </td>
                  <td className={styles.height80}>
                    <div className={styles.marginbottom}>
                      <textarea
                        id={Settings.EditEmailLaunch.additional_text.id}
                        onKeyPress={(e) =>
                          Utils.checklen_onkeypress(
                            e,
                            Settings.EditEmailLaunch.maxLength
                          )
                        }
                        onChange={this.context.onChangeEmailLaunch}
                        onBlur={this.context.validate}
                        className={styles.mergacqrename}
                        value={
                          this.context.state.rfpLaunchEmailData.rfpLaunchEmail
                            .additional_text
                        }
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <img
                    src={btnClear}
                    alt={Settings.EditEmailLaunch.btnClear.label}
                    onClick={this.context.onDataClear}
                    className={styles.leftAligned}
                  />

                  <td align="right" className={styles.alignedItems}>
                    <img
                      src={btnSendEmail}
                      onClick={this.context.onSendEmail}
                      alt={Settings.EditEmailLaunch.btnSendEmail.label}
                      className={styles.sendBtn}
                    />

                    <img
                      src={btnSave}
                      alt={Settings.EditEmailLaunch.btnSave.label}
                      onClick={(event) =>
                        this.context.onUpdateEmailLaunchData(event)
                      }
                      className={styles.updateBtn}
                    />

                    <img
                      src={btnCancel}
                      alt={Settings.EditEmailLaunch.btnCancel.label}
                      className={styles.btnCancel}
                      onClick={this.context.onCancel}
                    />
                  </td>
                </tr>
              </table>
            </React.Fragment>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
