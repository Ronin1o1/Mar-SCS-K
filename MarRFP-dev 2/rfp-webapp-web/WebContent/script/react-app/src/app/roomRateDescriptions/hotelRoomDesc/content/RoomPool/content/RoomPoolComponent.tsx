import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./RoomPoolComponent.css";
import API from "../service/API";
import Settings from "../static/Settings";
import SelectHotelContext, {
  SelectHotelContextProvider,
} from "../context/SelectHotelContext";
import { CMasterListTable } from "../../../../../common/components/CMasterListTable";
import { CLoader } from "../../../../../common/components/CLoader";
import TabViewPanel from "./TabViewPanel";
import Util from "../../../../../common/utils/Utils";

let contextType = null;
function RoomPoolComponent() {
  const history = useHistory();

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

      API.getSelectRoomPoolListDetails(reqParam)
        .then((res) => {
          if (res === "error") {
            Util.navigateToUrl(Settings.errorUrl);
          } else {
            contextType.getSelectRoomPoolList(res);
          }
        })
        .catch((error) => {
          Util.navigateToUrl(Settings.errorUrl);
        });
    } else {
      history.push({ pathname: "/error" });
    }
  }, []);

  const viewRoomPoolDetails = (roomPoolDetails) => {
    contextType.state.newInd = !roomPoolDetails.hasRoomDefinition;
    history.push({
      pathname: `${Settings.parentRoute}/defineRoomPool`,
      data: roomPoolDetails.roomPool,
      search: `?roomPool=${roomPoolDetails.roomPool}&marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}`,
    });
  };
  return (
    <SelectHotelContext.Consumer>
      {(selectHotelContext) => {
        contextType = selectHotelContext;

        return (
          <div>
            <TabViewPanel
              moduleName="RoomDescription"
              componentName="selectHotelComponent"
              conditional="off"
            ></TabViewPanel>
            <div className={`${styles.tableBody} ${styles.titleHead}`}>
              <b style={{ fontSize: "12px" }}>
                {" "}
                {reqParam.marshaCode} - {reqParam.hotelName}:{" "}
                {Settings.label.HotelRoomPool}
              </b>
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
                    <td valign="top" height="100%">
                      {contextType.state.retrieveRoomPoolListLoader ? (
                        <CLoader />
                      ) : (
                        <CMasterListTable
                          retriveList={contextType.state.retrieveRoomPoolList}
                          componentName="HotelFormattedRoomNames"
                          viewHandler={viewRoomPoolDetails}
                          borderBottom={"10px solid #f4f4f2"}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
}

export default RoomPoolComponent;
