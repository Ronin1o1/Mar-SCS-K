import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./RoomPoolFinishProduct.css";
import SelectHotelContext from "../context/SelectHotelContext";
import btnPrintRoomDefRPool from "../../../../../common/assets/img/button/btnPrintRoomDefRPool.gif";
import btnPrintRoomDefRProg from "../../../../../common/assets/img/button/btnPrintRoomDefRProg.gif";
import Settings from "../static/Settings";
import TabViewPanel from "./TabViewPanel";
//import API from "../service/API";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
let roomPool;
let marshaCode;
let hotelName;
const RoomPoolFinishProduct = () => {
  const urlParms = useLocation().search;
  roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  const [finishData, setFinishData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const prm =
      Settings.queryParam.marshaCode +
      marshaCode +
      Settings.queryParam.roomPool +
      roomPool +
      Settings.queryParam.hotelName +
      hotelName +
      Settings.queryParam.screenId +
      "";

    // API.getFinishRoomPoolView(prm)
    //   .then((data) => {
    //     setFinishData(data);
    //     setLoader(false);
    //   })
    //   .catch((error) => {
    //     setLoader(false);
    //   });
  }, []);

  const handlePoolClick = () => {
    const apiUrl = Settings.api.report;
    let path;
    const locUrl = location.href;
    const isLocal = locUrl
      .split("/")
      .filter((word) => word.indexOf("localhost") > -1);
    if (!isLocal.length) {
      path =
        "/" +
        window.location.pathname.split("/")[1] +
        "/" +
        window.location.pathname.split("/")[2];
    } else {
      path = "";
    }
    const url =
      window.location.origin +
      path +
      "/hotelReports?&ReportName=" +
      "Print Room pool" +
      "&MarshaCode=" +
      marshaCode +
      "&HotelName=" +
      hotelName +
      "&RoomPool=" +
      roomPool +
      "&RoomPoolOnly=" +
      "Y";

    window.open(url, "_blank");
  };

  const handleProgramClick = () => {
    const apiUrl = Settings.api.report;
    let path;
    const locUrl = location.href;
    const isLocal = locUrl
      .split("/")
      .filter((word) => word.indexOf("localhost") > -1);
    if (!isLocal.length) {
      path =
        "/" +
        window.location.pathname.split("/")[1] +
        "/" +
        window.location.pathname.split("/")[2];
    } else {
      path = "";
    }
    const url =
      window.location.origin +
      path +
      "/hotelReports?&ReportName=" +
      "Print Rate Programs" +
      "&MarshaCode=" +
      marshaCode +
      "&HotelName=" +
      hotelName +
      "&RoomPool=" +
      roomPool +
      "&RoomPoolOnly=" +
      "N";

    window.open(url, "_blank");
  };

  return (
    <SelectHotelContext.Consumer>
      {(SelectHotelContext) => {
        contextType = SelectHotelContext;
        return (
          <div>
            {" "}
            <TabViewPanel
              moduleName="RoomDescription"
              componentName="selectHotelComponent"
              conditional="off"
            ></TabViewPanel>
            {loader ? (
              <CLoader />
            ) : (
              <div className={styles.bodyContainer}>
                <form>
                  <table className={styles.zeroHeight}>
                    <tbody>
                      <tr>
                        <td className={styles.heightTD}>
                          <span className={styles.spanHotel}>
                            {marshaCode} - {hotelName}
                            {Settings.label.RoomPoolDescription} {roomPool}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.heightTD30}>&nbsp;</td>
                      </tr>

                      <tr className={styles.BGDarkBlueStyle}>
                        <td colSpan={13} style={{ height: "2px" }}></td>
                      </tr>
                      {finishData === null ? (
                        <tr>
                          <td className={styles.header}>
                            <p className={styles.finishMsg}>
                              {Settings.finishMsg} {roomPool}.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        <>
                          <tr>
                            <td className={styles.header2}>
                              <p className={styles.finishMsg}>
                                {Settings.notCompletedMsg}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.heightTD30}>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.InstructionHeader}>
                              {Settings.errorMsg}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.instructions}>
                              {Settings.incompleteMsg}
                            </td>
                          </tr>
                          {finishData?.map((syncAlert, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  <table className={styles.zeroHeight}>
                                    <tr>
                                      <td className={styles.widthTD}></td>
                                      <td className={styles.fieldName}>
                                        {syncAlert.roomPool}
                                        {syncAlert.rateProgram}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>
                                        <table className={styles.zeroHeight}>
                                          {syncAlert.syncAlerts.map(
                                            (obj, j) => {
                                              return (
                                                <tr key={j}>
                                                  <td
                                                    className={styles.widthTD}
                                                  ></td>
                                                  <td
                                                    className={styles.fieldName}
                                                  >
                                                    {obj}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </table>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className={styles.heightTD10}></td>
                                      <td></td>
                                    </tr>
                                  </table>{" "}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}

                      <tr>
                        <td className={styles.heightTD30}>&nbsp;</td>
                      </tr>

                      <tr className={styles.height5}>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.InstructionHeader}>
                          {Settings.label.PrintHeader}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.instructions}>
                          {Settings.label.PrinDetail} <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            className={styles.PoolBtn}
                            onClick={handlePoolClick}
                            src={btnPrintRoomDefRPool}
                          ></img>

                          <img
                            className={styles.ProgBtn}
                            onClick={handleProgramClick}
                            src={btnPrintRoomDefRProg}
                          ></img>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            )}
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
};

export default RoomPoolFinishProduct;
