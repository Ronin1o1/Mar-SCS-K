import React, { Suspense, useEffect, useState } from "react";
import styles from "./CopyAccountInfo.css";
import Settings from "../static/Settings";
import { Link } from "react-router-dom";
import NextBtnImg from "../../../../common/assets/img/button/btnNext.gif";
import CSelect from "../../../../common/components/CSelect";
import API from "../service/API";
import AccountListContext, {
  AccountListContextProvider,
} from "../context/AccountListContext";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
//import Interceptors from "../../../../common/components/Interceptors";
import { useHistory } from "react-router-dom";
import { CLoader } from "../../../../common/components/CLoader";
let contextType = null;
let copyFromPeriod = null;

export default function CopyAccountInfo() {
  const history = useHistory();
  const currPeriod = JSON.parse(sessionStorage.getItem("localAccountListData"));

  useEffect(() => {
    const data =
      contextType.state.accountListData.selectedAccount.searchperiod === null
        ? JSON.parse(sessionStorage.getItem("localAccountListData"))
        : contextType.state.accountListData.selectedAccount;
    contextType.state.selectedValue = null;
    contextType.state.accountDetails.accountrecid = null;
    contextType.setIsLoading(true);
    API.getCopyAccountInfo(data).then((data) => {
      contextType.setCopyAccountInfoData(data);
      contextType.setIsLoading(false);
    });
  }, []);

  const onPeriodChangeHandler = (event) => {
    const period =
      contextType.state.accountListData.selectedAccount.period === null
        ? JSON.parse(localStorsessionStorageage.getItem("localAccountListData"))
            .period
        : contextType.state.accountListData.selectedAccount.period;
    copyFromPeriod = event.target.value;
    //contextType.setIsLoading(true);
    API.getCopyAccountInfoByPeriod(period, copyFromPeriod).then((data) => {
      contextType.setCopyAccountInfoData(data);
      //contextType.setIsLoading(false);
    });
  };

  const navigateForAccountCopyingOrCreation = () => {
    if (
      contextType.state.isCopyFromExistingAccount === true &&
      (contextType.state.accountDetails.accountrecid === null ||
        contextType.state.accountDetails.accountrecid === "*")
    ) {
      // window.location.href = `/accountmaintenance/${Settings.accountList.accountEditPath}`;
      history.push(
        `/accountmaintenance/${Settings.accountList.accountEditPath}`
      );
    } else {
      const data = { ...contextType.state };
      const copiedData = { ...contextType.copiedAccount };
      data.isCopyFromExistingAccount
        ? (copiedData.copyFromExistingAccount =
            Settings.copyAccountInfo.copyAccount.on)
        : (copiedData.copyFromExistingAccount =
            Settings.copyAccountInfo.copyAccount.off);
      copiedData.period = data.accountListData.selectedAccount.period
        ? data.accountListData.selectedAccount.period
        : contextType.state.copyAccountInfoData.periodList[0].period;
      copiedData.copyFromPeriod =
        copyFromPeriod ??
        contextType.state.copyAccountInfoData.periodList[0].period;
      copiedData.copyFromAccountRecid = data.accountDetails.accountrecid;
      data.isCopySAPP
        ? (copiedData.copySAPP = Settings.copyAccountInfo.copyAccount.on)
        : (copiedData.copySAPP = Settings.copyAccountInfo.copyAccount.off);

      contextType.setCopiedAccount(copiedData);
      contextType.setIsLoading(true);
      API.updateCopyAccountInfo(copiedData).then((generatedAccountRecId) => {
        contextType.state.accountDetails.accountrecid = generatedAccountRecId;
        contextType.selectedAccountData(contextType.state.accountDetails);
        history.push(
          `/accountmaintenance/${Settings.accountList.accountEditPath}?isNew=true`
        );
        contextType.setIsLoading(false);
      });
    }
  };

  return (
    <AccountListContext.Consumer>
      {(accountListContext) => {
        contextType = accountListContext;
        return (
          <>
            {contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <>
                <table className={styles.tableWidth}>
                  <tbody>
                    <tr>
                      <td className={styles.header}>
                        {Settings.accountmaintcopy.pageTitle}
                      </td>
                    </tr>
                    <tr className={styles.bgDarkBlue}>
                      <td className={styles.tdHeight2}></td>
                    </tr>
                    <tr className={styles.trHeight10}>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className={[styles.fullHeight, styles.mainTable].join(" ")}
                >
                  <tbody>
                    <tr>
                      <td className={styles.alignVertical}>
                        <table className={styles.fullHeight}>
                          <tbody>
                            <tr>
                              <td className={styles.alignVertical}>
                                <form>
                                  <table className={styles.zeroHeight}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.imgCenter}>
                                          <Link
                                            onClick={
                                              contextType.state
                                                .isCopyFromExistingAccount ===
                                                true &&
                                              (contextType.state.accountDetails
                                                .accountrecid === null ||
                                                contextType.state.accountDetails
                                                  .accountrecid === "*")
                                                ? contextType.onCopyAccountModalHandler
                                                : navigateForAccountCopyingOrCreation
                                            }
                                            data={contextType.state}
                                          >
                                            <img
                                              src={NextBtnImg}
                                              alt={
                                                Settings.copyAccountInfo
                                                  .altNextButton
                                              }
                                            />
                                          </Link>
                                          <CModal
                                            show={contextType.state.showModal}
                                            onClose={contextType.onShowModal}
                                            xPosition={
                                              Settings.copyAccountInfo.modal
                                                .modalXPosition
                                            }
                                            yPosition={
                                              Settings.copyAccountInfo.modal
                                                .modalYPosition
                                            }
                                            closeImgTitle={
                                              Settings.copyAccountInfo.modal
                                                .title
                                            }
                                          >
                                            <Suspense fallback={<CSuspense />}>
                                              <div
                                                className={styles.modalContent}
                                              >
                                                {
                                                  Settings.copyAccountInfo.modal
                                                    .modalContent
                                                }
                                              </div>
                                            </Suspense>
                                          </CModal>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.instructions}>
                                          {
                                            Settings.copyAccountInfo
                                              .instructionPart1
                                          }{" "}
                                          <b>
                                            <i>
                                              {
                                                Settings.copyAccountInfo
                                                  .instructionPart2
                                              }
                                            </i>
                                          </b>{" "}
                                          {
                                            Settings.copyAccountInfo
                                              .instructionPart3
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.instructions}>
                                          <i>
                                            {
                                              Settings.copyAccountInfo
                                                .instructionPart4
                                            }
                                          </i>
                                          {Settings.copyAccountInfo.space +
                                            Settings.copyAccountInfo
                                              .instructionPart5}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td />
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className={styles.zeroHeight}>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={styles.fieldName}
                                                >
                                                  {
                                                    Settings.copyAccountInfo
                                                      .currentPeriod.name
                                                  }
                                                </td>
                                                <td
                                                  className={
                                                    styles.periodAlignment
                                                  }
                                                >
                                                  {contextType.state
                                                    .accountListData
                                                    .selectedAccount.period
                                                    ? contextType.state
                                                        .accountListData
                                                        .selectedAccount.period
                                                    : currPeriod.period}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.trHeight10} />
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          <input
                                            type="checkbox"
                                            id={
                                              Settings.copyAccountInfo
                                                .copyFromExistingAccount.id
                                            }
                                            defaultChecked
                                            onChange={
                                              contextType.onCopyNewAccountChangeHandler
                                            }
                                          />{" "}
                                          {
                                            Settings.copyAccountInfo
                                              .copyFromExistingAccount.name
                                          }
                                        </td>
                                      </tr>
                                      {contextType.state
                                        .isCopyFromExistingAccount ? (
                                        <div>
                                          <tr>
                                            <td className={styles.trHeight10} />
                                          </tr>
                                          <tr>
                                            <td>
                                              <div
                                                id={
                                                  Settings.copyAccountInfo
                                                    .copyAccount.id
                                                }
                                              >
                                                <table
                                                  className={styles.pad3Height}
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {
                                                          Settings
                                                            .copyAccountInfo
                                                            .copyAccount
                                                            .copyFrom
                                                        }
                                                      </td>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {
                                                          Settings
                                                            .copyAccountInfo
                                                            .copyAccount.period
                                                            .name
                                                        }
                                                      </td>
                                                      <td>
                                                        <CSelect
                                                          id={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .selectPeriodId
                                                          }
                                                          className={
                                                            styles.selectBox50
                                                          }
                                                          keyField={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .period.value
                                                          }
                                                          valField={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .period.value
                                                          }
                                                          ddnOptions={
                                                            contextType.state
                                                              .copyAccountInfoData
                                                              .periodList
                                                          }
                                                          onChange={
                                                            onPeriodChangeHandler
                                                          }
                                                        />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td />
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {
                                                          Settings
                                                            .copyAccountInfo
                                                            .copyAccount.account
                                                            .name
                                                        }
                                                      </td>
                                                      <td>
                                                        <CSelect
                                                          id={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .selectAcountRecId
                                                          }
                                                          className={
                                                            styles.selectBox390
                                                          }
                                                          keyField={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .account.key
                                                          }
                                                          valField={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .account.value
                                                          }
                                                          selectedValue={
                                                            contextType.state
                                                              .selectedValue
                                                          }
                                                          ddnOptions={
                                                            contextType.state
                                                              .copyAccountInfoData
                                                              .accountList
                                                          }
                                                          onChange={
                                                            contextType.onAccountDropdownChangeHandler
                                                          }
                                                        />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td colSpan={3}>
                                                        <input
                                                          type="checkbox"
                                                          id={
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .copySAPPId
                                                          }
                                                          onChange={
                                                            contextType.onCopySAPPChangeHandler
                                                          }
                                                        />
                                                        <b
                                                          className={
                                                            styles.copySappFont
                                                          }
                                                        >
                                                          {
                                                            Settings
                                                              .copyAccountInfo
                                                              .space
                                                          }
                                                          {
                                                            Settings
                                                              .copyAccountInfo
                                                              .copyAccount
                                                              .copySAPPName
                                                          }
                                                        </b>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </td>
                                          </tr>
                                        </div>
                                      ) : null}
                                    </tbody>
                                  </table>
                                </form>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}{" "}
          </>
        );
      }}
    </AccountListContext.Consumer>
  );
}
