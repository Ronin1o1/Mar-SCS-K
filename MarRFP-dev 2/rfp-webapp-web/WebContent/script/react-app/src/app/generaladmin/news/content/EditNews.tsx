/* eslint-disable @typescript-eslint/no-empty-interface */
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
  message: string;
  fromDate: any;
  expDate: any;
  title: any;
}

export default class EditNews extends Component<IProps, IState> {
  static contextType = NewsListContext;

  constructor(props) {
    super(props);

    this.state = {
      contextType: NewsListContext,
      message: "",
      fromDate: "",
      expDate: "",
      title: "",
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidMount() {
    this.setState({ fromDate: this.context.state.selectedNews.infodate });
    this.setState({ expDate: this.context.state.selectedNews.infoexpiredate });
    this.setState({ title: this.context.state.selectedNews.infotitle });
    this.setState({ message: this.context.state.selectedNews.infomsg });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onFieldChange(e, field) {
    if (field === "message") {
      this.setState({ message: e.target.value });
    } else if (field === "fromDate") {
      this.setState({ fromDate: e.target.value });
    } else if (field === "expDate") {
      this.setState({ expDate: e.target.value });
    } else if (field === "title") {
      this.setState({ title: e.target.value });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <div className={styles.editNewsContentDiv}>
        <div className={styles.gridContainer}>
          <table>
            <tr>
              <td>
                <span className={styles.fieldName}>
                  {Settings.editNews.formFields.date.label}
                </span>
              </td>
              <td>
                <input
                  autoFocus
                  id={Settings.editNews.formFields.date.id}
                  maxLength={10}
                  onKeyPress={Utils.DateNumberOnly}
                  onChange={(e) => {
                    this.onFieldChange(e, "fromDate");
                  }}
                  onBlur={this.context.validate}
                  value={this.state.fromDate}
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
                  onKeyPress={Utils.DateNumberOnly}
                  onChange={(e) => {
                    this.onFieldChange(e, "expDate");
                  }}
                  onBlur={this.context.validate}
                  value={this.state.expDate}
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
                  onChange={(e) => {
                    this.onFieldChange(e, "title");
                  }}
                  onBlur={(e) => {
                    this.context.onChange(e);
                  }}
                  value={this.state.title}
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
                  onChange={(e) => {
                    this.onFieldChange(e, "message");
                  }}
                  onBlur={(e) => {
                    this.context.onChange(e);
                  }}
                  value={this.state.message}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.colSpan}></div>
        <div
          style={{ height: "20px", width: "40px", marginLeft: "160px" }}
          className={classnames(styles.colSpan, styles.updateBtn)}
          onClick={
            this.context.state.isUpdateBtnDisable
              ? null
              : this.context.updateNews
          }
        >
          <img
            tabIndex={0}
            src={UpdateBtnImg}
            alt={Settings.editNews.updateBtnAltText}
          />
        </div>
      </div>
    );
  }
}
