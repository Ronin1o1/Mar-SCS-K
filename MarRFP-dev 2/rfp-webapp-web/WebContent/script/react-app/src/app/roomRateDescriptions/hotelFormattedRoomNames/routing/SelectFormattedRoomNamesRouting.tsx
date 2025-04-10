import React from "react";
import HotelFormattedTabs from "../content/HotelFormattedTabs";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import styles from "./SelectFormattedRoomNamesRouting.css";
import btnPrevious from "../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../common/assets/img/button/btnNext.gif";
import SelectHotelContext from "../context/SelectHotelContext";
import Settings from "../static/Settings";

let contextType = null;

export function GlobalHeader() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get(
    Settings.queryId.marshaCode
  );

  const hotelName = new URLSearchParams(urlParms).get(
    Settings.queryId.hotelName
  );

  /** on click of next and Previous */
  const handleOnClick = async (e) => {
    const isValid = contextType.checkMinOccurs();
    if (isValid) {
      const isSaved = contextType.saveRoomPoolDefinition();
      if (isSaved) {
        const prm =
          Settings.queryParam.marshaCode +
          contextType.state.inputmarshacode +
          Settings.queryParam.roomPool +
          contextType.state.roomNames +
          Settings.queryParam.hotelName +
          contextType.state.hotelName +
          Settings.queryParam.screenId +
          e;
        history.push({
          pathname: `${path + Settings.routingUrl.defineRoomName}`,
          search: prm,
        });
      }
    }
  };

  /**on click of finishAndSave */
  const finishAndSave = async () => {
    const isValid = contextType.checkMinOccurs();
    if (isValid) {
      /** call save api */

      const prm =
        Settings.queryParam.marshaCode +
        contextType.state.inputmarshacode +
        Settings.queryParam.roomPool +
        contextType.state.roomNames +
        Settings.queryParam.hotelName +
        contextType.state.hotelName +
        Settings.queryParam.screenId;
      contextType.setState({ ...contextType.state, isFinishAndSave: true });
      history.push({
        pathname: Settings.routingUrl.finishProductPath,
        search: prm,
      });
    }
  };

  return (
    <SelectHotelContext.Consumer>
      {(SelectHotelContext) => {
        contextType = SelectHotelContext;
        return (
          <div>
            <HotelFormattedTabs
              data={contextType.state.roomTypeNameDefinitionGroup}
              onFinishAndSave={finishAndSave}
              onNavigation={handleOnClick}
            />
            <div className={styles.tableBody}>
              {contextType.state.inputmarshacode
                ? contextType.state.inputmarshacode
                : marshaCode}
              -{" "}
              {contextType.state.hotelName
                ? contextType.state.hotelName
                : hotelName}
              :{" "}
              {history.location.pathname.match(
                Settings.routingUrl.defineRoomName
              )
                ? Settings.label.HotelRoomPoolServiceType
                : Settings.label.FinishAndSave}{" "}
              - {contextType.state.roomNames}
              {history.location.pathname.includes(Settings.getRoomNameDefine)
                ? ` - `
                : ` `}
              {history.location.pathname.match(
                Settings.routingUrl.defineRoomName
              ) &&
                contextType.state.roomTypeNameDataView &&
                contextType.state.roomTypeNameDataView
                  .roomTypeNameDefinitionList.rtnd_ListName}{" "}
              {history.location.pathname.match(
                Settings.routingUrl.defineRoomName
              ) && (
                <div className={styles.leftDiv}>
                  {contextType.state.roomTypeNameDataView
                    ?.previousMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnClick(
                          contextType.state.roomTypeNameDataView
                            ?.previousMenuOption
                        )
                      }
                      src={btnPrevious}
                    ></img>
                  )}{" "}
                  {"  "}
                  {contextType.state.roomTypeNameDataView?.nextMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnClick(
                          contextType.state.roomTypeNameDataView?.nextMenuOption
                        )
                      }
                      src={btnNext}
                    ></img>
                  )}
                </div>
              )}
            </div>
            <div
              className={
                contextType.state.isFinishAndSave
                  ? styles.horizontalLineSave
                  : styles.horizontalLine
              }
            ></div>
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
}
