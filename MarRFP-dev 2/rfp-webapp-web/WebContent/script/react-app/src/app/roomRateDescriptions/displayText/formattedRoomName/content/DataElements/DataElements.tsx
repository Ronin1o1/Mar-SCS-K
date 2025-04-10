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
export default class DataElements extends React.Component {
  componentDidMount() {
    const req = {
      languageCode: RoomUtills.setQueryParam("languageCode"),
      languageName: RoomUtills.setQueryParam("languageName"),
      channelName: RoomUtills.setQueryParam("channelName"),
      channelCode: RoomUtills.setQueryParam("channelCode"),
      channelNumber: RoomUtills.setQueryParam("channelNumber"),
      createNew: RoomUtills.setQueryParam("createNew"),
    };
    contextType.state.queryParam = req;
    contextType.getRoomDisplay(req);
  }
  componentWillUnmount() {
    contextType.update();
  }
  getElement(element) {
    let name = "";
    if (element.RTND_CodeName !== null) {
      name = element.RTND_CodeName;
    } else if (
      element.RTND_GroupName !== null &&
      element.RTND_GroupName.trim() !== ""
    ) {
      name = element.RTND_GroupName;
    } else {
      name = element.RTND_ListName;
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
                    styles.widthHead
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
                      update={contextType.updateRoomDisplay}
                      currentPage={1}
                      totalPage={this.context.updateRoomDisplay}
                    />
                  </span>
                </div>
                <div
                  id="gridNode"
                  style={{
                    width: "100%",
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
                            style={{ width: "205px" }}
                            className={styles.gridCell}
                          >
                            <b>Element</b>
                          </th>
                          <th
                            style={{ width: "638px" }}
                            className={styles.gridCell}
                          >
                            <b>Text</b>
                          </th>
                        </tr>
                      </tbody>
                    </table>

                    <div className={styles.mainTable}>
                      {contextType.state.dataItem &&
                        contextType.state.dataItem.map((data, index) => (
                          <React.Fragment key={index}>
                            <div className={styles.title}>
                              {data.RTND_ListName}
                            </div>
                            <table className={styles.font11}>
                              <tbody>
                                {data.displayElement.map((item, i) => (
                                  <div
                                    key={i}
                                    className={`${styles.nthChildColor} ${styles.nthChildDiv}`}
                                  >
                                    <tr
                                      style={{ textAlign: "left" }}
                                      className={classnames(
                                        styles.tr,
                                        styles.textColor
                                      )}
                                    >
                                      <td
                                        className={classnames(
                                          styles.gridCell,

                                          i == 0
                                            ? styles.roomOverBold
                                            : `${
                                                item.RTND_CodeName === null &&
                                                item.RTND_GroupName !== null &&
                                                item.RTND_GroupName.trim() !==
                                                  ""
                                                  ? styles.roomGroup
                                                  : styles.roomOverNormal
                                              }`
                                        )}
                                      >
                                        {this.getElement(item)}
                                      </td>
                                      <td className={styles.gridCell}>
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
                                  </div>
                                ))}
                              </tbody>
                            </table>
                          </React.Fragment>
                        ))}
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
