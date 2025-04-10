import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./HotelFormattedTabs.css";
import Settings from "../static/Settings";
import SelectHotelContext from "../context/SelectHotelContext";

function HotelFormattedTabs(props) {
  const history = useHistory();
  const contextType = useContext(SelectHotelContext);
  const urlParms = useLocation().search;
  const roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);
  const handleSwitch = (url, screenId = "") => {
    if (url == Settings.SelectHotel) {
      contextType.clearData();
      contextType.setState({
        ...contextType.state,
        isFinishAndSave: false,
        isSelectHotelClicked: true,
      });
      history.push({
        pathname: `${Settings.parentRoute}/select`,
      });
    } else if (url == Settings.SelectRoomPool) {
      contextType.setState({ ...contextType.state, isFinishAndSave: false });

      if (
        contextType.state.isSelectHotelClicked ||
        history.location.pathname.match(
          Settings.routingUrl.roomTypeNameHotelSelect
        )
      ) {
        history.push({
          pathname: `/error`,
        });
      } else {
        history.push({
          pathname: `${Settings.parentRoute}/getRoomPools`,
        });
      }
    } else if (url == Settings.getRoomNameDefine) {
      props.onNavigation(screenId);
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
          <a href="javascript:void(0);" onClick={() => handleSwitch(Settings.SelectHotel)}>
            {Settings.tabNames.SelectHotelTab}
          </a>
        </li>
        <li className={styles.sublistTitle}>
          <a href="javascript:void(0);" onClick={() => handleSwitch(Settings.SelectRoomPool)}>
            {Settings.tabNames.SelectRoomPoolTab}
          </a>
        </li>
        {history.location.pathname.includes(Settings.getRoomNameDefine) ||
        history.location.pathname.includes(Settings.finishProduct) ? (
          <>
            <li
              className={`${styles.subMenu} ${styles.subnav} ${styles.width60}`}
            >
              {" "}
              <a
                href="javascript:void(0);"
                onClick={(e) =>
                  contextType.state.isFinishAndSave
                    ? e.preventDefault()
                    : handleSwitch(
                        Settings.getRoomNameDefine,
                        Settings.screenId.ServiceType
                      )
                }
              >
                {contextType.state.roomPool
                  ? contextType.state.roomPool
                  : roomPool}
              </a>
              <ul
                className={[styles.subnavigation, styles.submenuList].join(" ")}
              >
                {contextType.state.roomTypeNameMenu.map((data, index) => {
                  return (
                    <li key={index} className={styles.sublistTitle}>
                      <div className={styles.subListEmptySpace}></div>
                      <a
                        onClick={(e) =>
                          contextType.state.isFinishAndSave
                            ? e.preventDefault()
                            : handleSwitch(
                                Settings.getRoomNameDefine,
                                data.screenid
                              )
                        }
                      >
                        {data.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className={styles.sublistTitle}>
              <a href="javascript:void(0);"
                onClick={(e) =>
                  contextType.state.isFinishAndSave
                    ? e.preventDefault()
                    : handleSwitch(Settings.tabNames.FinishSaveTab)
                }
              >
                {Settings.tabNames.FinishSaveTab}
              </a>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default HotelFormattedTabs;
