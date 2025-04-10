import React, { Component } from "react";
import classnames from "classnames";
import NewsListContext from "../context/NewsListContext";
import Settings from "../static/Settings";
import UpdateBtnImg from "../../../common/assets/img/btnUpdate.gif";
import styles from "./Editnews.css";
import Utils from "../../../common/utils/Utils";
interface IProps {}

interface IState {
  contextType: any;
}

export default class EditNews extends Component<IProps, IState> {
  static contextType = NewsListContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.editNewsContentDiv}>
        <div className={styles.gridContainer}>
          <table>
            <tr>
              <td>
                <span id="test" className={styles.fieldName}>
                  {Settings.editNews.formFields.date.label}
                </span>
              </td>
              <td>
                <input
                  autoFocus
                  id={Settings.editNews.formFields.date.id}
                  maxLength={10}
                  onKeyPress={Utils.DateNumberOnly_onkeypress}
                  onChange={this.context.onChange}
                  onBlur={this.context.validate}
                  value={this.context.state.selectedNews.infodate}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span className={styles.fieldName}>
                  {Settings.editNews.formFields.expireDate.label}
                </span>
              </td>
              <td>
                <input
                  id={Settings.editNews.formFields.expireDate.id}
                  maxLength={10}
                  onKeyPress={Utils.DateNumberOnly_onkeypress}
                  onChange={this.context.onChange}
                  onBlur={this.context.validate}
                  value={this.context.state.selectedNews.infoexpiredate}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span className={styles.fieldName}>
                  {Settings.editNews.formFields.title.label}
                </span>
              </td>
              <td>
                <input
                  id={Settings.editNews.formFields.title.id}
                  size={48}
                  maxLength={48}
                  style={{ width: "280px" }}
                  onChange={this.context.onChange}
                  value={this.context.state.selectedNews.infotitle}
                />
              </td>
            </tr>
            <tr>
              <td valign="top">
                <span
                  className={styles.fieldName}
                  style={{ alignItems: "baseline" }}
                >
                  {Settings.editNews.formFields.message.label}
                </span>
              </td>
              <td>
                <textarea
                  id={Settings.editNews.formFields.message.id}
                  className={styles.textarea}
                  rows={4}
                  cols={60}
                  onKeyPress={(e) => {
                    if (this.context.state.selectedNews.infomsg.length > 255) {
                      Utils.checkMaxChar(e.target?.value, 255);
                    }
                  }}
                  onChange={this.context.onChange}
                  value={this.context.state.selectedNews.infomsg}
                />
              </td>
            </tr>
          </table>
        </div>
        <div
          style={{ height: "20px", width: "40px", marginLeft: "160px" }}
          className={classnames(styles.colSpan, styles.updateBtn)}
          onClick={this.context.updateNews}
        >
          <img src={UpdateBtnImg} alt={Settings.editNews.updateBtnAltText} />
        </div>
      </div>
    );
  }
}
