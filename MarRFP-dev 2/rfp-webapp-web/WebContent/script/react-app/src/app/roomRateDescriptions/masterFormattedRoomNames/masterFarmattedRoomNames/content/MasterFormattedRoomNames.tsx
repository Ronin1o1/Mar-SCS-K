import React, { useEffect } from "react";
import { CLoader } from "../../../../common/components/CLoader";
import { CMasterListTable } from "../../../../common/components/CMasterListTable";
import styles from "../../../../common/assets/css/commonBase.css";
import MasterFarmattedRoomNamesContext from "../context/MasterFormattedRoomNamesContext";
import { useHistory } from "react-router-dom";
import Settings from "../settings/Settings";
import { Layout } from "../routing/Layout";
let context = null;
export function MasterFarmattedRoomNames() {
  const history = useHistory();

  useEffect(() => {
    context.getRetrieveRoomPoolList();
  }, []);

  const viewHandlerMaster = (data) => {
    localStorage.setItem("localStorageRoomName", data.roomPool);
    history.push({
      pathname: `${Settings.parentRoute + Settings.routingUrl.defineRoomName}`,
      data: data.roomPool,
    });
  };

  return (
    <Layout>
      <MasterFarmattedRoomNamesContext.Consumer>
        {(msterFarmattedRoomNamesContext) => {
          context = msterFarmattedRoomNamesContext;
          return (
            <>
              <table
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
                className={styles.fullHeight}
              >
                <tbody>
                  <tr>
                    <td valign="top">
                      <table className={styles.fullHeight}>
                        <tbody>
                          <tr>
                            {/*// Page Content //*/}
                            <td valign="top">
                              <table
                                style={{
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                }}
                                className={styles.fullHeight}
                              >
                                <tbody>
                                  <tr>
                                    <td valign="top">
                                      <table className={styles.fullHeight}>
                                        <tbody>
                                          <tr>
                                            <td className={styles.instructions}>
                                              {Settings.updateRoomPool}
                                              <br />
                                              {Settings.useViewButton}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style={{ height: "10px" }} />
                                          </tr>
                                          <tr>
                                            <td valign="top">
                                              {context.retrieveRoomPoolListLoader ? (
                                                <CLoader />
                                              ) : (
                                                <CMasterListTable
                                                  retriveList={
                                                    context.retrieveRoomPoolList
                                                  }
                                                  componentName={
                                                    Settings.routingUrl
                                                      .MasterFormattedRoomNames
                                                  }
                                                  viewHandler={
                                                    viewHandlerMaster
                                                  }
                                                  tableBodyHeight="calc(100vh - 255px)"
                                                  tableWidth="280px"
                                                />
                                              )}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
      </MasterFarmattedRoomNamesContext.Consumer>
    </Layout>
  );
}
