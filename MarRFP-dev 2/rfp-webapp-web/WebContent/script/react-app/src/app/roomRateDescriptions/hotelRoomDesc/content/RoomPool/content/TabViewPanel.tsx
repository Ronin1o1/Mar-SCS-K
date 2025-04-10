import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import Styles from "./TabViewPanel.css";
import { getTabPanel } from "../static/NavigationMenu";
import Settings from "../static/Settings";
import revisit from "../../../../../common/assets/img/revisit.gif";
import complete from "../../../../../common/assets/img/completed.gif";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
//import { NavLink } from "react-router-dom";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import SelectHotelContext from "../context/SelectHotelContext";
import API from "../service/API";
let contextType = null;
let roomPool;
let screenid;
let marshaCode;
let hotelName;

interface KORDefLinkTypes {
  kordefLink: string;
  korworksheetLink: string;
  korinstructionsLink: string;
  korfaqlink: string;
}

const TabViewPanel = (props): JSX.Element => {
  const [tabViewPanel, setTabViewPanel] = useState(null);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const urlParms = useLocation().search;

  const { path } = useRouteMatch();
  roomPool = new URLSearchParams(urlParms).get("roomPool");
  screenid = new URLSearchParams(urlParms).get("screenid");
  marshaCode = new URLSearchParams(urlParms).get("marshaCode");
  hotelName = new URLSearchParams(urlParms).get("hotelName");
  const [korDefLinks, setKorDefLinks] = useState({} as KORDefLinkTypes);

  useEffect(() => {
    contextType.setStateParams(roomPool, marshaCode, hotelName);
    const app = appContext;
  }, [appContext]);

  useEffect(() => {
    const tabViewPanelList = Object.assign(
      [],
      getTabPanel.filter((module) => module.moduleName === props.moduleName)
    );
    const exists = tabViewPanelList[0].pages.some(
      (module) =>
        module.componentName === props?.selectedRateOfferList?.componentName
    );
    if (!exists) {
      if (props.selectedRateOfferList != undefined) {
        tabViewPanelList[0].pages.push(props.selectedRateOfferList);
      }
      setTabViewPanel(tabViewPanelList[0]);
    }
  }, [props.selectedRateOfferList]);

  useEffect(() => {
    const tabViewPanelList = Object.assign(
      [],
      getTabPanel.filter((module) => module.moduleName === props.moduleName)
    );

    setTabViewPanel(tabViewPanelList[0]);
  }, [props.moduleName]);

  useEffect(() => {
    const payload = {
      roomPool: "",
      marshaCode: "",
      hotelName: "",
      screenid: "",
      newInd: true,
    };
    API.getKORDefLinks(payload).then((res) => {
      setKorDefLinks(res.roomDefLinks);
    });
  }, []);

  const handleSwitch = (event, url, screenId = "") => {
    if (props.finalCheck) {
      if (props.finalCheck("", event)) {
        if (url == Settings.SelectHotel) {
          history.push({
            pathname: `${Settings.parentRoute}/select`,
          });
        } else if (url == Settings.SelectRoomPool) {
          history.push({
            pathname: `${Settings.parentRoute}/selectRoomPool`,
          });
        } else if (url == Settings.getRoomNameDefine) {
          props.onNavigation(screenId);
        } else if (url == Settings.getRoomNameDefineProgram) {
          props.onNavigationProgram(screenId);
        } else if (url == Settings.tabNames.FinishSaveTab) {
          props.onFinishAndSave();
        }
      } else {
        event.preventDefault();
      }
    } else {
      if (url == Settings.SelectHotel) {
        history.push({
          pathname: `${Settings.parentRoute}/select`,
        });
      } else if (url == Settings.SelectRoomPool) {
        history.push({
          pathname: `${Settings.parentRoute}/selectRoomPool`,
        });
      } else if (url == Settings.getRoomNameDefine) {
        props.onNavigation(screenId);
      } else if (url == Settings.getRoomNameDefineProgram) {
        props.onNavigationProgram(screenId);
      } else if (url == Settings.tabNames.FinishSaveTab) {
        props?.onFinishAndSave();
      }
    }
  };
  const displayPoolMenu = (screenList) => {
    return screenList.map((tabView) => {
      return (
        <li key={tabView.title}>
          <div className={Styles.subListEmptySpace}></div>
           <span className={Styles.warningimg}>{tabView.status === "C" && <img src={complete} />}
            {tabView.status === "R" && <img src={revisit} />}</span>
            <a
              onClick={(e) =>
                handleSwitch(e, Settings.getRoomNameDefine, tabView.screenid)
              }
            >
              {tabView.title}
            </a>
        </li>
      );
    });
  };

  const displayPoolMenuProgram = (screenList) => {
    return screenList.map((tabView) => {
      return (
        <li key={tabView.title}>
          <a
            onClick={(e) =>
              handleSwitch(
                e,
                Settings.getRoomNameDefineProgram,
                tabView.screenid
              )
            }
          >
            {tabView.title}
          </a>
        </li>
      );
    });
  };

  const onLinkClick = (event, componentName) => {
    const tabViewPanelList = Object.assign([], tabViewPanel);
    if (props.finalCheck) {
      if (props.finalCheck("", componentName)) {
        tabViewPanelList.pages.map((component) => {
          if (component.componentName === componentName) {
            component.isSelected = true;
          } else {
            component.isSelected = false;
          }
        });

        setTabViewPanel(tabViewPanelList);
      } else {
        event.preventDefault();
      }
    } else {
      tabViewPanelList.pages.map((component) => {
        if (component.componentName === componentName) {
          component.isSelected = true;
        } else {
          component.isSelected = false;
        }
      });

      setTabViewPanel(tabViewPanelList);
    }
  };

  return (
    <SelectHotelContext.Consumer>
      {(roomPoolContext) => {
        contextType = roomPoolContext;
        return (
          <div>
            <div>
              <div
                className={`${Styles.subMenu} ${Styles.margin} ${Styles.subnav}`}
              >
                <ul className={Styles.subnavigation}></ul>
                <ul className={`${Styles.subnavigation} ${Styles.subHeadPad}`}>
                  {tabViewPanel != null &&
                    tabViewPanel.pages.map((tabView) => {
                      {
                        return (
                          <>
                            {(tabView.isDisplay === "always" ||
                              (tabView.isDisplay === "conditional" &&
                                props.conditional === "on")) && (
                              <li className={Styles.sublistHeader}>
                                {tabView.label === "ExactPoolName" ? (
                                  <>
                                    <Link
                                      onClick={(e) =>
                                        onLinkClick(e, tabView.componentName)
                                      }
                                      className={
                                        tabView.isSelected
                                          ? Styles.linkSelected
                                          : Styles.link
                                      }
                                    >
                                      {props.poolName}
                                    </Link>
                                    <ul
                                      className={Styles.sublist}
                                      style={{ width: "160px" }}
                                    >
                                      {displayPoolMenu(props.screenList)}
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    {tabView.label === "Select Rate Program" ? (
                                      <Link
                                        to={{
                                          pathname: tabView.link,
                                          search: `?roomPool=${roomPool}&marshaCode=${marshaCode}&hotelName=${hotelName}`,
                                        }}
                                        onClick={(e) =>
                                          onLinkClick(e, tabView.componentName)
                                        }
                                        className={
                                          tabView.isSelected
                                            ? Styles.linkSelected
                                            : Styles.link
                                        }
                                      >
                                        {tabView.label}
                                      </Link>
                                    ) : tabView.label == "Finish and Save" ? (
                                      <a
                                        href="javascript:void(0);"
                                        onClick={(e) =>
                                          handleSwitch(
                                            e,
                                            Settings.tabNames.FinishSaveTab,
                                            ""
                                          )
                                        }
                                      >
                                        {tabView.label}
                                      </a>
                                    ) : (
                                      <span
                                        className={
                                          tabView.label ===
                                          "ExactRateProgramName"
                                            ? Styles.hiddenLabel
                                            : ""
                                        }
                                      >
                                        <Link
                                          to={{
                                            pathname: tabView.link,
                                          }}
                                          onClick={(e) =>
                                            onLinkClick(
                                              e,
                                              tabView.componentName
                                            )
                                          }
                                          className={
                                            tabView.isSelected
                                              ? Styles.linkSelected
                                              : Styles.link
                                          }
                                        >
                                          {tabView.label}
                                        </Link>
                                      </span>
                                    )}
                                    {tabView.label ===
                                    "ExactRateProgramName" ? (
                                      <>
                                        <Link
                                          to={{
                                            pathname: props.programName,
                                          }}
                                          onClick={(e) =>
                                            onLinkClick(
                                              e,
                                              tabView.componentName
                                            )
                                          }
                                          className={
                                            tabView.isSelected
                                              ? Styles.linkSelected
                                              : Styles.link
                                          }
                                        >
                                          {props.programName}
                                        </Link>
                                        <ul
                                          className={Styles.sublist}
                                          style={{ width: "160px" }}
                                        >
                                          {displayPoolMenuProgram(
                                            props.screenList
                                          )}
                                        </ul>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </li>
                            )}
                          </>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
};

export default TabViewPanel;
