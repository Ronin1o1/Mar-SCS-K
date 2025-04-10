import React, { useContext } from "react";
import SynchronizeButton from "../../../common/assets/img/button/btnSynchronize.gif";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import SynchronizeUsersContext, {
  SynchronizeUsersContextProvider,
} from "../context/SynchronizeUsersContext";
import Settings from "../static/Settings";
import Api from "../service/SynchronizeUsersApi";
import styles from "./SynchronizeUsers.css";

let synchronizeUsersContextType = null;

const SynchronizeUsers = (): JSX.Element => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const renderMessage = () => {
    if (appContext.isInProgress) {
      return (
        <div className={styles.isInProgress}>
          <p className={styles.pleaseWait}>{Settings.pleaseWait}</p>
          <p>{Settings.inProgressSyncMessage}</p>
          <p className={styles.percentCompleted}>
            {synchronizeUsersContextType.state.percentCompleted &&
              Number(
                synchronizeUsersContextType.state.percentCompleted
              ).toFixed(1)}
            {"% "}
            {Settings.completed}
          </p>
        </div>
      );
    } else if (
      synchronizeUsersContextType.state.synccompleted == Settings.syncComplete
    ) {
      return (
        <div className={styles.syncCompleted}>
          <p className={styles.syncCompleteTitle}>
            {Settings.syncCompleteTitle}
          </p>
          <p>{Settings.completedSyncMessage}</p>
        </div>
      );
    } else {
      return (
        <div className={styles.startSyncMessage}>
          <p>{Settings.startSyncMessage} </p>
        </div>
      );
    }
  };
  return (
    <SynchronizeUsersContextProvider>
      <SynchronizeUsersContext.Consumer>
        {(SynchronizeUsersContext) => {
          synchronizeUsersContextType = SynchronizeUsersContext;
          return (
            <>
              <table className={styles.syncUserTable}>
                <tbody>
                  <tr>
                    <td className={styles.pageHeaderTd}>
                      {Settings.pageHeader}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>{renderMessage()}</td>
                          </tr>
                          <tr className={styles.syncButtonTr}>
                            <td align="center">
                              {appContext.isInProgress ||
                              synchronizeUsersContextType.state.synccompleted ==
                                Settings.syncComplete ? (
                                ""
                              ) : (
                                <a href="javascript:void(0);">
                                <img
                                  src={SynchronizeButton}
                                  onClick={() => {
                                    appContext.setIsInProgress(true);
                                    Api.synchronizeUsers(
                                      synchronizeUsersContextType.state
                                    ).then((data) => {
                                      appContext.setIsInProgress(true);
                                      synchronizeUsersContextType.setState(
                                        data
                                      );
                                    });
                                  }}
                                />
                                </a>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          );
        }}
      </SynchronizeUsersContext.Consumer>
    </SynchronizeUsersContextProvider>
  );
};

export default SynchronizeUsers;
