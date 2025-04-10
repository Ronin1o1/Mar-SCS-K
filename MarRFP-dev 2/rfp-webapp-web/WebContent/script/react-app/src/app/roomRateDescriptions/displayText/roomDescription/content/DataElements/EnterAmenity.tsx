import React from "react";
import classnames from "classnames";
import styles from "./DataElements.css";
import CPageContainer from "../../../../../common/components/CPageContainer";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../../context/RoomDescriptionContextProvider";
import Settings from "../../static/Settings";

import RoomUtills from "../RoomUtills";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
export default class EnterAmenity extends React.Component {
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
    sessionStorage.removeItem("channelNames");
    sessionStorage.removeItem("listViewDatas");
    localStorage.setItem("setPathAmen", "/roomdeftext/enterAmenity");
    let params = "";
    if (window.location.href.indexOf("?") > -1) {
      params = window.location.href.split("?")[1];
    }
    localStorage.setItem("setPathParamAmen", params);
    let requestedData;
    if (localStorage?.reqDataAmen) {
      requestedData = JSON.parse(localStorage?.reqDataAmen);
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
    contextType.getAmenity(req);
    localStorage.setItem("reqDataAmen", JSON.stringify(req));
  }
  componentWillUnmount(): void {
    if (
      window.location.pathname !== Settings.windowUrl.dataElements &&
      window.location.pathname !== Settings.url.dataElements &&
      window.location.pathname !== Settings.windowUrl.amenities &&
      window.location.pathname !== Settings.url.amenities
    ) {
      contextType.updateAmenity(this.state.event, this.props.history);
    }
  }
  tableRender(data, type, subType) {
    let header = "brandType";
    if (type === "unitOfMeasure") {
      header = "UOM_Type";
    } else if (type === "format") {
      header = "formatType";
    }
    return data.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <div
            style={{
              background: "white",
              fontWeight: "bold",
              height: "21px",
              paddingLeft: "2px",
            }}
          >
            {item[header]}
          </div>
          <table className={styles.font11}>
            <tbody>
              {item[type].map((subItem, j) => {
                return (
                  <tr
                    key={j}
                    style={{ textAlign: "left" }}
                    className={classnames(styles.tr, styles.textColor)}
                  >
                    <td
                      style={{ width: "175px" }}
                      className={`${styles.gridSubItem} ${styles.gridCell}`}
                    >
                      {subItem[subType]}
                    </td>
                    <td style={{ width: "640px" }} className={styles.gridCell}>
                      <textarea
                        value={subItem.value ? subItem.value : ""}
                        className={styles.textAreaStyle}
                        onChange={(event) =>
                          contextType.handleAmenityChange(event, type, i, j)
                        }
                      ></textarea>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      );
    });
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
                {RoomUtills.header(styles, "Amenity Elements")}
                <div
                  className={classnames(
                    styles.default_font,
                    styles.mr10,
                    styles.width70
                  )}
                  style={{ width: "850px" }}
                >
                  <span className={styles.bold}>Channel: </span>
                  <span>{queryParam && queryParam.channelName}</span>
                  <span className={classnames(styles.lang_name, styles.bold)}>
                    Language:{" "}
                  </span>
                  <span>{queryParam && queryParam.languageName}</span>
                  <span className={styles.float_right}>
                    <CPageContainer
                      update={contextType.updateAmenity}
                      currentPage={2}
                      totalPage={this.context.updateAmenity}
                    />
                  </span>
                </div>
                <div
                  id="gridNode"
                  style={{
                    userSelect: "none",
                    width: "850px",
                    margin: "10px 0px 10px 10px",
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
                          style={{ width: "180px" }}
                          className={styles.gridCell}
                        >
                          <b>Element</b>
                        </th>
                        <th
                          style={{ width: "640px" }}
                          className={styles.gridCell}
                        >
                          <b>Text</b>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    id="gridHeader"
                    className={styles.gridHeader}
                    style={{
                      height: "calc(100vh - 200px)",
                      overflow: "hidden auto",
                    }}
                  >
                    {
                      <React.Fragment>
                        {contextType.state.entryData &&
                          contextType.state.entryData.brands && (
                            <React.Fragment>
                              <div className={styles.title}>{"Brands"}</div>
                              {this.tableRender(
                                contextType.state.entryData.brands,
                                "brand",
                                "brandName"
                              )}
                            </React.Fragment>
                          )}
                        {contextType.state.entryData &&
                          contextType.state.entryData.unitsOfMeasure && (
                            <React.Fragment>
                              <div className={styles.title}>
                                {"Units Of Measure"}
                              </div>
                              {this.tableRender(
                                contextType.state.entryData.unitsOfMeasure,
                                "unitOfMeasure",
                                "UOM_Name"
                              )}
                            </React.Fragment>
                          )}
                        {contextType.state.entryData &&
                          contextType.state.entryData.formats && (
                            <React.Fragment>
                              <div className={styles.title}>{"Formats"}</div>
                              {this.tableRender(
                                contextType.state.entryData.formats,
                                "format",
                                "formatName"
                              )}
                            </React.Fragment>
                          )}
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
