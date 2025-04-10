import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import styles from "./SelectRoomPool.css";
import API from "../service/API";
import Settings from "../static/Settings";

import { CMasterListTable } from "../../../common/components/CMasterListTable";
import { CLoader } from "../../../common/components/CLoader";
import HotelFormattedTabs from "./HotelFormattedTabs";
import SelectHotelContext from "../context/SelectHotelContext";

//let contextType = null;
let isReadOnly = false;
function SelectRoomPool() {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const contextType = useContext(SelectHotelContext);
  if (appContext && appContext.user) isReadOnly = appContext.user.isReadOnly;
  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };

  const reqParam = {
    marshaCode:
      setQueryParam("marshaCode") != undefined &&
      setQueryParam("marshaCode") != ""
        ? setQueryParam("marshaCode")
        : sessionStorage.getItem("MARSHACODE"),
    hotelName:
      setQueryParam("hotelName") != undefined &&
      setQueryParam("hotelName") != ""
        ? setQueryParam("hotelName")
        : sessionStorage.getItem("HOTELNAME"),
  };

  useEffect(() => {
    if (reqParam && reqParam.marshaCode && reqParam.hotelName) {
      sessionStorage.setItem("MARSHACODE", reqParam.marshaCode);
      sessionStorage.setItem("HOTELNAME", reqParam.hotelName);

      API.getSelectRoomPoolListDetails(reqParam).then((res) => {
        contextType.getSelectRoomPoolList(res);
      });
    } else {
      history.push({
        pathname: `/error`,
      });
    }
  }, []);

  const viewRoomPoolDetails = (roomPoolDetails) => {
    history.push({
      pathname: `${Settings.parentRoute}/getRoomNameDefine`,
      data: roomPoolDetails.roomPool,
      search: `?roomPool=${roomPoolDetails.roomPool}&marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}`,
    });
  };
  return (
    <div>
      <HotelFormattedTabs />
      <div className={styles.tableBody}>
        {reqParam?.marshaCode && reqParam?.marshaCode?.toUpperCase()} -{" "}
        {contextType.state.hotelName}: {Settings.label.HotelRoomPool}
      </div>
      <div className={styles.horizontalLine}></div>
      <form>
        <table className={styles.fullheight}>
          <tbody>
            <tr style={{ verticalAlign: "top" }}>
              <td className={styles.instructions}>
                {Settings.roomPoolInstruction} <br />{" "}
                {Settings.hotelRoomPoolInstruction}
              </td>
            </tr>
            <tr>
              <td style={{ height: "10px" }} />
            </tr>
            <tr>
              <td className={styles.loaderTd}>
                {contextType.state.retrieveRoomPoolListLoader ? (
                  <CLoader />
                ) : (
                  <CMasterListTable
                    isReadOnly={isReadOnly}
                    borderBottom={"8px solid #eff0ec"}
                    retriveList={contextType.state.retrieveRoomPoolList}
                    componentName="HotelFormattedRoomNames"
                    viewHandler={viewRoomPoolDetails}
                    tableWidth="280px"
                  />
                )}
                <style>{`
                        #gridNode{
                          width:264px !important;
                        }
                        `}</style>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SelectRoomPool;
