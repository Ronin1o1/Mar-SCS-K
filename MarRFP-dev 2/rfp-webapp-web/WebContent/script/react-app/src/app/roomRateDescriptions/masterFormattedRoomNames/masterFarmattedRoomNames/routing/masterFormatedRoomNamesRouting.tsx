import React from "react";
import MasterFormattedTabs from "../content/MasterFormattedTabs";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./masterFormatedRoomNamesRouting.css";
import btnPrevious from "../../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../common/assets/img/button/btnNext.gif";
import MasterFarmattedRoomNamesContext from "../context/MasterFormattedRoomNamesContext";
import Settings from "../settings/Settings";

let contextType = null;

export function GlobalHeader() {
  const history = useHistory();
  const { path } = useRouteMatch();

  /** on click of next and Previous */
  const handleOnClick = async (e) => {
    const isValid = contextType.checkMinOccurs();
    if (isValid) {
      const isSaved = contextType.saveRoomPoolDefinition();
      if (isSaved) {
        const prm =
          Settings.queryParam.roomPool +
          (contextType.state.roomNames
            ? contextType.state.roomNames
            : localStorage.getItem("localStorageRoomName")) +
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
      //const isSaved = contextType.saveRoomPoolDefinition();

      const prm =
        Settings.queryParam.roomPool +
        (contextType.state.roomNames
          ? contextType.state.roomNames
          : localStorage.getItem("localStorageRoomName")) +
        Settings.queryParam.screenId;
      contextType.setState({ ...contextType.state, isFinishAndSave: true });
      history.push({
        pathname: Settings.routingUrl.finishProductPath,
        search: prm,
      });
    }
  };

  return (
    <MasterFarmattedRoomNamesContext.Consumer>
      {(roomPoolContext) => {
        contextType = roomPoolContext;
        return (
          <div>
            <MasterFormattedTabs
              data={contextType.state.roomTypeNameDataView?.roomTypeNameMenu}
              onClick={(id) => handleOnClick(id)}
              onFinishAndSave={finishAndSave}
            />
            <div
              className={
                history.location.pathname.match(
                  `${Settings.parentRoute + Settings.routingUrl.getRoomPools}`
                )
                  ? styles.roomPoolHeader
                  : styles.tableBody
              }
            >
              {history.location.pathname.includes(Settings.finishProduct)
                ? `${Settings.FinishAndSave} - ${contextType.state.roomNames}`
                : history.location.pathname.includes(Settings.getRoomPools)
                ? Settings.roomPoolListHeader
                : `${Settings.formattedRoomNames} - 
              ${
                contextType?.state?.roomNames
                  ? contextType?.state?.roomNames
                  : localStorage.getItem("localStorageRoomName")
              } -  
              ${
                contextType.state.roomTypeNameDataView &&
                contextType.state.roomTypeNameDataView
                  .roomTypeNameDefinitionList.rtnd_ListName
              } `}
              {history.location.pathname.match(
                Settings.routingUrl.defineRoomName
              ) && (
                <div className={styles.menuDiv}>
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
    </MasterFarmattedRoomNamesContext.Consumer>
  );
}
