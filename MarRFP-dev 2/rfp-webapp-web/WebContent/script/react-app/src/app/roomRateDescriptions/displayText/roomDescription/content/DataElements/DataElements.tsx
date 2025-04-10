import React from "react";
import classnames from "classnames";
import styles from "./DataElements.css";
import CPageContainer from "../../../../../common/components/CPageContainer";
import Settings from "../../static/Settings";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../../context/RoomDescriptionContextProvider";

import RoomUtills from "../RoomUtills";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
export default class DataElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        target: {
          id: "autoSave",
        },
      },
    };
  }

  componentDidMount() {
    localStorage.setItem("setPath", "/roomdeftext/dataElements");
    let params = "";
    if (window.location.href.indexOf("?") > -1) {
      params = window.location.href.split("?")[1];
    }
    localStorage.setItem("setPathParam", params);
    let requestedData;
    if (localStorage?.reqData) {
      requestedData = JSON.parse(localStorage?.reqData);
    }

    const req = {
      languageCode:
        RoomUtills.setQueryParam("languageCode") !== undefined &&
        RoomUtills.setQueryParam("languageCode") !== ""
          ? RoomUtills.setQueryParam("languageCode")
          : requestedData.languageCode,
      languageName:
        RoomUtills.setQueryParam("languageName") !== undefined &&
        RoomUtills.setQueryParam("languageName") !== ""
          ? RoomUtills.setQueryParam("languageName")
          : requestedData.languageName,
      channelName:
        RoomUtills.setQueryParam("channelName") !== undefined &&
        RoomUtills.setQueryParam("channelName") !== ""
          ? RoomUtills.setQueryParam("channelName")
          : requestedData.channelName,
      channelCode:
        RoomUtills.setQueryParam("channelCode") !== undefined &&
        RoomUtills.setQueryParam("channelCode") !== ""
          ? RoomUtills.setQueryParam("channelCode")
          : requestedData.channelCode,
      channelNumber:
        RoomUtills.setQueryParam("channelNumber") !== undefined &&
        RoomUtills.setQueryParam("channelNumber") !== ""
          ? RoomUtills.setQueryParam("channelNumber")
          : requestedData.channelNumber,
      createNew: RoomUtills.setQueryParam("createNew"),
    };

    contextType.state.queryParam = req;
    contextType.getRoomDisplay(req);
    localStorage.setItem("reqData", JSON.stringify(req));
  }

  componentWillUnmount(): void {
    if (
      window.location.pathname !== Settings.windowUrl.dataElements &&
      window.location.pathname !== Settings.url.dataElements &&
      window.location.pathname !== Settings.windowUrl.amenities &&
      window.location.pathname !== Settings.url.amenities
    ) {
      contextType.updateRoomDisplay(this.state.event, this.props.history);
    }
  }

  getElement(element) {
    let name = "";
    if (element.elementCodeName !== null) {
      name = element.elementCodeName;
    } else if (element.elementGroupName.trim() !== "") {
      name = element.elementGroupName;
    } else {
      name = element.elementTypeName;
    }
    return name;
  }

  render() {
    return (
      <RoomDescriptionContextProvider>
        <RoomDescriptionContext.Consumer>
          {(roomDescriptionContext) => {
            contextType = roomDescriptionContext;
            const { queryParam } = contextType && contextType.state;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <form id="thisForm" name="thisForm" autoComplete="off">
                {RoomUtills.header(styles, "Data Elements")}
                <div
                  className={classnames(
                    styles.default_font,
                    styles.mr10,
                    styles.width70,
                    styles.dataelementstable
                  )}
                  style={{ width: "861px" }}
                >
                  <span className={styles.bold}>Channel: </span>
                  <span>{queryParam && queryParam.channelName}</span>
                  <span className={classnames(styles.lang_name, styles.bold)}>
                    Language:{" "}
                  </span>
                  <span>{queryParam && queryParam.languageName}</span>
                  <span className={styles.float_right}>
                    <CPageContainer
                      update={contextType.updateRoomDisplay}
                      currentPage={1}
                      totalPage={this.context.updateRoomDisplay}
                    />
                  </span>
                </div>
                <div
                  id="gridNode"
                  style={{
                    userSelect: "none",
                    overflowX: "hidden",
                    width: "861px",
                    margin: "0px 0px 10px 10px",
                  }}
                  className={styles.grid}
                >
                  <table
                    style={{
                      height: "32px",
                      backgroundColor: "#d6d7ce",
                      width: "100%",
                    }}
                    className={classnames(styles.gridRowTable, styles.font11)}
                    id="gridTableHeader"
                  >
                    <tbody>
                      <tr style={{ textAlign: "left" }}>
                        <th
                          style={{ width: "200px" }}
                          className={styles.gridCellHeader}
                        >
                          Element
                        </th>
                        <th
                          style={{ width: "60px" }}
                          className={styles.gridCellHeader}
                        >
                          Call Out
                        </th>
                        <th
                          style={{ width: "600px" }}
                          className={styles.gridCellHeader}
                        >
                          Text
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    id="gridHeader"
                    style={{
                      width: "857px",
                      overflow: "auto",
                      height: "calc(100vh - 200px)",
                    }}
                    className={styles.gridHeader}
                  >
                    {
                      <React.Fragment>
                        {contextType.state.dataItem &&
                          contextType.state.dataItem.map((data, index) => (
                            <React.Fragment key={index}>
                              <div className={styles.title}>
                                {data.elementTypeName}
                              </div>
                              <table className={styles.font11}>
                                <tbody>
                                  {data.displayElement.map((item, i) => (
                                    <tr
                                      key={i}
                                      style={{ textAlign: "left" }}
                                      className={classnames(
                                        styles.tr,
                                        styles.textColor
                                      )}
                                    >
                                      <td
                                        className={classnames(
                                          styles.gridCell,
                                          i <= 1
                                            ? styles.roomOverBold
                                            : `${
                                                item.elementCodeName === null &&
                                                item.elementGroupName.trim() !==
                                                  ""
                                                  ? styles.roomGroup
                                                  : styles.roomOverNormal
                                              }`
                                        )}
                                      >
                                        <p>{this.getElement(item)}</p>
                                      </td>
                                      <td
                                        style={{ width: "60px" }}
                                        className={styles.gridCell}
                                      >
                                        {item.calloutInd}
                                      </td>
                                      <td
                                        style={{ width: "580px" }}
                                        className={styles.gridCell}
                                      >
                                        <textarea
                                          id={index + "_" + i}
                                          className={styles.textAreaStyle}
                                          onChange={contextType.handleChange}
                                          value={
                                            item.displayText
                                              ? item.displayText
                                              : ""
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    }
                  </div>
                </div>
              </form>
            );
          }}
        </RoomDescriptionContext.Consumer>
      </RoomDescriptionContextProvider>
    );
  }
}
