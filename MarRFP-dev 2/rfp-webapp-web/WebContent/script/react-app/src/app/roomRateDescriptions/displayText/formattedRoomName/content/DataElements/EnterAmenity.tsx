import React from "react";
import classnames from "classnames";
import styles from "./DataElements.css";
import CPageContainer from "../../../../../common/components/CPageContainer";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../../context/RoomDescriptionContextProvider";

import RoomUtills from "../RoomUtills";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
export default class EnterAmenity extends React.Component {
  componentDidMount() {
    sessionStorage.removeItem("channelNames");
    sessionStorage.removeItem("listViewDatas");
    const req = {
      languageCode: RoomUtills.setQueryParam("languageCode"),
      languageName: RoomUtills.setQueryParam("languageName"),
      channelName: RoomUtills.setQueryParam("channelName"),
      channelCode: RoomUtills.setQueryParam("channelCode"),
      channelNumber: RoomUtills.setQueryParam("channelNumber"),
      createNew: RoomUtills.setQueryParam("createNew"),
    };
    contextType.state.queryParam = req;
    contextType.getAmenity(req);
  }
  componentWillUnmount() {
    contextType.updateAmenityOnComponentLeave();
  }
  tableRender(data, type, subType, brand, default_code) {
    let header = "alternateTextListName";
    if (type === "unitOfMeasure") {
      header = "uom_Type";
    } else if (type === "type") {
      header = "typeListName";
    }
    return data.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <div
            style={{
              background: "white",
              fontWeight: "bold",
              height: "20px",
              marginBottom: "2px",
              border: "1px solid #dadada",
            }}
          >
            {item[header]}
          </div>
          <table className={styles.font11}>
            <tbody>
              {item[type].map((subItem, j) => {
                return (
                  <>
                    <div className={styles.nthChildDiv}>
                      <tr
                        key={j}
                        style={{ textAlign: "left" }}
                        className={classnames(styles.tr, styles.textColor)}
                      >
                        <td
                          style={{ width: "200px" }}
                          className={`${styles.gridSubItem} ${styles.gridCell}`}
                        >
                          {subItem[subType]}
                        </td>
                        <td
                          style={{
                            width: "50px",
                            textAlign: "center",
                            verticalAlign: "top",
                          }}
                          className={styles.gridCell}
                        >
                          {subItem[brand]}
                        </td>
                        <td
                          style={{
                            width: "60px",
                            textAlign: "center",
                            verticalAlign: "top",
                          }}
                          className={styles.gridCell}
                        >
                          {subItem[default_code] == "true" ? "*" : ""}
                        </td>
                        <td
                          style={{ width: "390px" }}
                          className={styles.gridCell}
                        >
                          <textarea
                            value={subItem.value ? subItem.value : ""}
                            className={`${styles.textAreaStyle} ${styles.textAreaWidthAmenity}`}
                            onChange={(event) =>
                              contextType.handleAmenityChange(event, type, i, j)
                            }
                          ></textarea>
                        </td>
                      </tr>
                    </div>
                  </>
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
                    styles.widthHeadAmenity
                  )}
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
                    width: "940px",
                  }}
                  className={styles.grid}
                >
                  <div id="gridHeader" className={styles.gridHeader}>
                    <table
                      style={{ height: "32px" }}
                      className={classnames(styles.gridRowTable, styles.font11)}
                      id="gridTableHeader"
                    >
                      <tbody>
                        <tr style={{ textAlign: "left" }}>
                          <th
                            style={{ width: "171px" }}
                            className={styles.gridCell}
                          >
                            <b>Element</b>
                          </th>
                          <th
                            style={{ width: "40px" }}
                            className={styles.gridCell}
                          >
                            <b>Brand</b>
                          </th>
                          <th
                            style={{ width: "47px" }}
                            className={styles.gridCell}
                          >
                            <b>Default</b>
                          </th>
                          <th
                            style={{ width: "410px" }}
                            className={styles.gridCell}
                          >
                            <b>Text</b>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <div className={styles.enterAmneityTable}>
                      {
                        <React.Fragment>
                          {contextType.state.entryData &&
                            contextType.state.entryData.unitsOfMeasure && (
                              <React.Fragment>
                                <div className={styles.title}>
                                  {"Units Of Measure"}
                                </div>
                                {this.tableRender(
                                  contextType.state.entryData.unitsOfMeasure,
                                  "unitOfMeasure",
                                  "uom_Name",
                                  "uom_ListBrandCode",
                                  "uom_Default"
                                )}
                              </React.Fragment>
                            )}
                          {contextType.state.entryData &&
                            contextType.state.entryData.typeList && (
                              <React.Fragment>
                                <div className={styles.title}>{"Types"}</div>
                                {this.tableRender(
                                  contextType.state.entryData.typeList,
                                  "type",
                                  "typeName",
                                  "typeNameListBrandCode",
                                  "typeNameDefault"
                                )}
                              </React.Fragment>
                            )}
                          {contextType.state.entryData &&
                            contextType.state.entryData.alternateTextList && (
                              <React.Fragment>
                                <div className={styles.title}>
                                  {"Alternate Text"}
                                </div>
                                {this.tableRender(
                                  contextType.state.entryData.alternateTextList,
                                  "alternateText",
                                  "alternateTextName",
                                  "alternateTextListBrandCode",
                                  "defaultInd"
                                )}
                              </React.Fragment>
                            )}
                        </React.Fragment>
                      }
                    </div>
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
