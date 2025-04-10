import React, { useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styles from "./SelectRateProgram.css";
import API from "../service/API";
import Settings from "../static/Settings";
import { CMasterListTable } from "../../../../../common/components/CMasterListTable";
import { CLoader } from "../../../../../common/components/CLoader";
import TabViewPanel from "../../RoomPool/content/TabViewPanel";
// import RateProgramContext, {
//   RateProgramContextProvider,
// } from "../context/RateProgramContext";
import SelectHotelContext, {
  SelectHotelContextProvider,
} from "../../RoomPool/context/SelectHotelContext";

let contextType = null;
function SelectRateProgramComponent(props) {
  const history = useHistory();
  const urlParms = useLocation().search;
  const { path } = useRouteMatch();

  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2]
      ? decodeURI(results[2])
      : "" && results[3]
      ? decodeURI(results[3])
      : "";
  };
  const reqParam = {
    roomPool: new URLSearchParams(urlParms).get("roomPool"),
    marshaCode: new URLSearchParams(urlParms).get("marshaCode"),
    hotelName: new URLSearchParams(urlParms).get("hotelName"),
  };

  useEffect(() => {
    API.getRateProgramListDetails(reqParam).then((res) => {
      contextType.getSelectRateProgramList(res);
    });
  }, []);
  const handleOnClick = async (e) => {
    const prm =
      Settings.queryParam.marshaCode +
      contextType.state.inputmarshacode +
      Settings.queryParam.roomPool +
      contextType.state.roomPool +
      Settings.queryParam.hotelName +
      contextType.state.hotelName +
      Settings.queryParam.screenId +
      e;
    history.push({
      pathname: `${path + Settings.routingUrl.defineRoomName}`,
      search: prm,
    });
  };

  const viewRoomPoolDetails = (roomPoolDetails) => {
    history.push({
      pathname: `${Settings.parentRoute}/getRateProgram`,
      data: roomPoolDetails.roomPool,
      state: true,
      rateProgram: roomPoolDetails.rateProgram,
      search: `?roomPool=${reqParam.roomPool}&marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}`,
    });
  };
  return (
    <SelectHotelContextProvider>
      <SelectHotelContext.Consumer>
        {(selectHotelContext) => {
          contextType = selectHotelContext;

          return (
            <div>
              {/* <HotelFormattedTabs /> */}
              <TabViewPanel
                moduleName="RoomDescription"
                componentName="SelectRateProgram"
                conditional="on"
                programName={props.location.rateProgram}
                screenList={contextType.state.roomDefMenu}
                poolName={reqParam.roomPool}
                onNavigation={handleOnClick}
              ></TabViewPanel>
              <div className={styles.tableBodyRateProgram}>
                <b>
                  {" "}
                  {reqParam.marshaCode} - {reqParam.hotelName}:{" "}
                  {Settings.rateProgramHeader} - {reqParam.roomPool}
                </b>
              </div>
              <div className={styles.horizontalLine}></div>
              <form>
                <table className={styles.fullheight}>
                  <tbody>
                    <tr style={{ verticalAlign: "top" }}>
                      <td className={styles.instructions}>
                        <span className={styles.optionalFeature}>
                          {" "}
                          {Settings.rateProgramInstruction}
                        </span>{" "}
                        <span className={styles.headerInstructionMain}>
                          {Settings.hotelrateProgramInstruction}
                        </span>
                        <span className={styles.headerInstruction}>
                          {Settings.hotelrateProgramInstructionbelow}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {contextType.state.retrieveRateProgramListLoader ? (
                          <CLoader />
                        ) : (
                          <CMasterListTable
                            retriveList={
                              contextType.state.retrieveRateProgramList
                            }
                            componentName="SelectRateProgram"
                            viewHandler={viewRoomPoolDetails}
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
    </SelectHotelContextProvider>
  );
}

export default SelectRateProgramComponent;
