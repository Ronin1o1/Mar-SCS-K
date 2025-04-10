import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./finishProduct.css";
import MasterFarmattedRoomNamesContext from "../context/MasterFormattedRoomNamesContext";
import { Layout } from "../routing/Layout";
import Settings from "../settings/Settings";

let contextType = null;
let roomPool;

function finishProduct() {
  const urlParms = useLocation().search;
  roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);

  /**set selected roomNames */
  useEffect(() => {
    if (roomPool) {
      contextType.setRoomNames(roomPool);
    }
  }, [roomPool]);

  return (
    <Layout>
      <MasterFarmattedRoomNamesContext.Consumer>
        {(roomPoolContext) => {
          contextType = roomPoolContext;
          return (
            <div className={styles.bodyContainer}>
              <form>
                <table className={styles.zeroHeight}>
                  <tbody>
                    <tr>
                      <td className={styles.heightTD}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td className={styles.header}>
                        <p>
                          {Settings.finishMsg} {contextType.state.roomNames}.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.heightTD}>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          );
        }}
      </MasterFarmattedRoomNamesContext.Consumer>
    </Layout>
  );
}

export default finishProduct;
