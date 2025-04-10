import React, { Component } from "react";
import classnames from "classnames";
import NewsListContext from "../context/NewsListContext";
import Settings from "../static/Settings";
import UpdateBtnImg from "../../../../common/assets/img/btnUpdate.gif";
import styles from "./Editnews.css";
import Utils from "../../../../common/utils/Utils";
interface IProps {}

interface IState {}

let context = null;
export default class EditNews extends Component<IProps, IState> {
  //static contextType = NewsListContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NewsListContext.Consumer>
        {(newsListContext) => {
          context = newsListContext;
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
                        onChange={context.onChange}
                        onBlur={context.validate}
                        value={context.state.selectedNews.infodate}
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
                        onChange={context.onChange}
                        onBlur={context.validate}
                        value={context.state.selectedNews.infoexpiredate}
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
                        style={{ width: "252px" }}
                        onChange={context.onChange}
                        value={context.state.selectedNews.infotitle}
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
                        style={{
                          width: "306px",
                          height: "90px",
                        }}
                        rows={4}
                        cols={60}
                        onKeyPress={context.validate}
                        onChange={context.onChange}
                        value={context.state.selectedNews.infomsg}
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <div className={styles.colSpan}></div>
              <div className={classnames(styles.colSpan, styles.fieldName)}>
                {Settings.editNews.formFields.roles.label}
              </div>
              <div className={styles.colSpan}>
                <input
                  type="checkbox"
                  id={Settings.editNews.formFields.pasAdmin.id}
                  onChange={context.onChange}
                  checked={context.state.selectedNews.MFPADMIN}
                />
                {Settings.editNews.formFields.pasAdmin.label}
              </div>
              <div className={styles.colSpan}>
                <input
                  type="checkbox"
                  id={Settings.editNews.formFields.sappAdmin.id}
                  onChange={context.onChange}
                  checked={context.state.selectedNews.MFPAPADM}
                />
                {Settings.editNews.formFields.sappAdmin.label}
              </div>
              <div className={styles.colSpan}>
                <input
                  type="checkbox"
                  id={Settings.editNews.formFields.salesUsers.id}
                  onChange={context.onChange}
                  checked={context.state.selectedNews.MFPSALES}
                />
                {Settings.editNews.formFields.salesUsers.label}
              </div>
              <div className={styles.colSpan}>
                <input
                  type="checkbox"
                  id={Settings.editNews.formFields.ltdSalesUser.id}
                  onChange={context.onChange}
                  checked={context.state.selectedNews.MFPFSALE}
                />
                {Settings.editNews.formFields.ltdSalesUser.label}
              </div>
              <div className={styles.colSpan}>
                <input
                  type="checkbox"
                  id={Settings.editNews.formFields.hotelUsers.id}
                  onChange={context.onChange}
                  checked={context.state.selectedNews.MFPUSER}
                />
                {Settings.editNews.formFields.hotelUsers.label}
              </div>
              <div
                style={{ height: "20px", width: "40px", marginLeft: "160px" }}
                className={classnames(styles.colSpan, styles.updateBtn)}
                onClick={
                  context.state.isUpdateBtnDisable ? null : context.updateNews
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
        }}
      </NewsListContext.Consumer>
    );
  }
}
