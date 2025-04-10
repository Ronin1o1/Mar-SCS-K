import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./MasterFormattedTabs.css";
import Settings from "../settings/Settings";
import RoomNamesContext from "../context/MasterFormattedRoomNamesContext";

function MasterFormattedTabs(props) {
  const history = useHistory();
  const parentContextType = useContext(RoomNamesContext);

  /**handle on selected tab Clicked  */
  const handleSwitch = (url) => {
    if (url == Settings.tabNames.SelectRoomPool) {
      parentContextType.setState({
        ...parentContextType.state,
        isFinishAndSave: false,
      });
      history.push({
        pathname: `${Settings.parentRoute + Settings.routingUrl.getRoomPools}`,
      });
    } else if (url == Settings.tabNames.HotelName) {
    } else if (url == Settings.tabNames.FinishSaveTab) {
      props.onFinishAndSave();
    }
  };

  return (
    <div className={`${styles.subMenu} ${styles.subnav}`}>
      <ul
        className={[styles.subnavigation, styles.subnavigationBorder].join(" ")}
      >
        <li className={[styles.sublistTitle, styles.borderLeft].join(" ")}>
          <a href="javascript:void(0);" onClick={() => handleSwitch(Settings.tabNames.SelectRoomPool)}>
            {Settings.selectRoomPoolTab}
          </a>
        </li>
        {(history.location.pathname.match(
          Settings.routingUrl.defineRoomNamePath
        ) ||
          history.location.pathname.includes(Settings.finishProduct)) && (
          <li className={styles.sublistTitle}>
            <a
              href="javascript:void(0);"
              onClick={(e) =>
                parentContextType.state.isFinishAndSave
                  ? e.preventDefault()
                  : handleSwitch(Settings.tabNames.HotelName)
              }
            >
              {parentContextType.state.roomNames
                ? parentContextType.state.roomNames
                : localStorage.getItem("localStorageRoomName")}
            </a>
            <ul
              className={[styles.subnavigation, styles.submenuList].join(" ")}
            >
              {props.data && props.data.length > 0
                ? props.data.map((list) => (
                    <li key={list.title}>
                      <div>
                        <a
                          onClick={(e) =>
                            parentContextType.state.isFinishAndSave
                              ? e.preventDefault()
                              : props.onClick(list.screenid)
                          }
                        >
                          {list.title}
                        </a>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </li>
        )}
        {(history.location.pathname.match(
          Settings.routingUrl.defineRoomNamePath
        ) ||
          history.location.pathname.includes(Settings.finishProduct)) && (
          <li className={styles.sublistTitle}>
            <a href="javascript:void(0);" onClick={() => handleSwitch(Settings.tabNames.FinishSaveTab)}>
              {Settings.finishSaveTab}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MasterFormattedTabs;
