import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./FinishProduct.css";
import SelectHotelContext from "../context/SelectHotelContext";
import { Layout } from "../routing/Layout";
import Settings from "../static/Settings";

let contextType = null;
let roomPool;
let marshaCode;
let hotelName;
const FinishProduct = () => {
  const urlParms = useLocation().search;
  roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  /**set selected roomNames */
  useEffect(() => {
    if (roomPool) {
      contextType.setStateParams(roomPool, marshaCode, hotelName);
      contextType.setRoomNames(roomPool);
    }
  }, [roomPool]);

  return (
    <Layout>
      <SelectHotelContext.Consumer>
        {(SelectHotelContext) => {
          contextType = SelectHotelContext;
          return (
            <div className={styles.bodyContainer}>
              <form>
                <table className={styles.zeroHeight}>
                  <tbody>
                    <tr>
                      <td className={styles.heightTD}>
                        <span className={styles.spanHotel}>
                          {Settings.label.Hotel}:{" "}
                        </span>
                        {marshaCode} - {hotelName}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.header}>
                        <p className={styles.finishMsg}>
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
      </SelectHotelContext.Consumer>
    </Layout>
  );
};

export default FinishProduct;
