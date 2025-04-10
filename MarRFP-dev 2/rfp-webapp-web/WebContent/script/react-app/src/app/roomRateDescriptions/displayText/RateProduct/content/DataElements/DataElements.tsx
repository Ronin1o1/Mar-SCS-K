import React from "react";
import classnames from "classnames";
import styles from "./DataElements.css";
import CPageContainer from "../../../../../common/components/CPageContainer";
import RateProductContext, {
  RateProductContextProvider,
} from "../../context/RateProductContextProvider";

import RateUtils from "../RateUtils";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
export default class DataElements extends React.Component {
  componentDidMount() {
    const req = {
      languageCode: RateUtils.setQueryParam("languageCode"),
      languageName: RateUtils.setQueryParam("languageName"),
      channelName: RateUtils.setQueryParam("channelName"),
      channelCode: RateUtils.setQueryParam("channelCode"),
      channelNumber: RateUtils.setQueryParam("channelNumber"),
      createNew: RateUtils.setQueryParam("createNew"),
    };
    contextType.state.queryParam = req;
    contextType.getProductDisplay(req);
  }
  componentWillUnmount() {
    contextType.updateProductDisplayOnComponentLeave();
  }
  getElement(element) {
    let name = "";
    if (element.RP_CodeName !== null) {
      name = element.RP_CodeName;
    } else if (
      element.RP_GroupName !== null &&
      element.RP_GroupName.trim() !== ""
    ) {
      name = element.RP_GroupName;
    } else {
      name = element.RP_ListName;
    }
    return name;
  }

  render() {
    return (
      <RateProductContextProvider>
        <RateProductContext.Consumer>
          {(rateProductContext) => {
            contextType = rateProductContext;
            const { queryParam } = contextType && contextType.state;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <form id="thisForm" name="thisForm" autoComplete="off">
                {RateUtils.header(styles, "Data Elements")}
                <div
                  className={classnames(
                    styles.default_font,
                    styles.mr10,
                    styles.widthElem
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
                      update={contextType.updateProductDisplay}
                      currentPage={1}
                      totalPage={this.context.updateProductDisplay}
                    />
                  </span>
                </div>
                <div id="gridNode" className={styles.grid}>
                  <div id="gridHeader" className={styles.gridHeader}>
                    <table
                      style={{ height: "32px" }}
                      className={classnames(styles.gridRowTable, styles.font11)}
                      id="gridTableHeader"
                    >
                      <tbody>
                        <tr
                          style={{
                            textAlign: "left",
                            backgroundColor: "transparent",
                          }}
                        >
                          <th
                            style={{ width: "195px" }}
                            className={styles.gridCellHeader}
                          >
                            Element
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
                    <div className={styles.tableContainer}>
                      {
                        <React.Fragment>
                          {contextType.state.dataItem &&
                            contextType.state.dataItem.map((data, index) => (
                              <React.Fragment key={index}>
                                <div className={styles.title}>
                                  {data.RP_ListName}
                                </div>
                                <table
                                  className={`${styles.font11} ${styles.elementdatatable}`}
                                >
                                  <tbody>
                                    {data.displayElement.map((item, i) => (
                                      <div
                                        className={styles.databoubleborder}
                                        key={i}
                                      >
                                        <tr
                                          style={{
                                            textAlign: "left",
                                          }}
                                          className={classnames(
                                            styles.tr,
                                            styles.textColor
                                          )}
                                        >
                                          <td
                                            className={classnames(
                                              styles.gridCell,
                                              i == 0
                                                ? styles.firstTd
                                                : `${
                                                    item.RP_CodeName === null &&
                                                    item.RP_GroupName !==
                                                      null &&
                                                    item.RP_GroupName.trim() !==
                                                      ""
                                                      ? styles.roomGroup
                                                      : styles.tableTd
                                                  }`
                                            )}
                                          >
                                            {this.getElement(item)}
                                          </td>

                                          <td
                                            style={{ width: "600px" }}
                                            className={styles.gridCell}
                                          >
                                            <textarea
                                              id={index + "_" + i}
                                              className={styles.textAreaStyle}
                                              onChange={
                                                contextType.handleChange
                                              }
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
                        </React.Fragment>
                      }
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </RateProductContext.Consumer>
      </RateProductContextProvider>
    );
  }
}
