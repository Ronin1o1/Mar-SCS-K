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
export default class EnterAmenity extends React.Component {
  componentDidMount() {
    sessionStorage.removeItem("channelNames");
    sessionStorage.removeItem("listViewDatas");
    const req = {
      languageCode: RateUtils.setQueryParam("languageCode"),
      languageName: RateUtils.setQueryParam("languageName"),
      channelName: RateUtils.setQueryParam("channelName"),
      channelCode: RateUtils.setQueryParam("channelCode"),
      channelNumber: RateUtils.setQueryParam("channelNumber"),
      createNew: RateUtils.setQueryParam("createNew"),
    };
    contextType.state.queryParam = req;
    contextType.getAmenity(req);
  }
  componentWillUnmount() {
    contextType.updateAmenityOnComponentLeave();
  }
  tableRender(data, type, subType) {
    let header = "brandType";
    if (type === "unitOfMeasure") {
      header = "UOM_Type";
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
              border: "1px solid #ebeadb",
              marginBottom: "1px",
            }}
          >
            {item[header]}
          </div>
          <table
            className={`${styles.font11} ${styles.nexttable} ${styles.elementdatatable}`}
          >
            <tbody>
              {item[type].map((subItem, j) => {
                return (
                  <div className={styles.databoubleborder} key={j}>
                    <tr
                      style={{ textAlign: "left" }}
                      className={classnames(styles.tr, styles.textColor)}
                    >
                      <td
                        style={{ width: "180px", paddingLeft: "20px" }}
                        className={styles.gridCell}
                      >
                        {subItem[subType]}
                      </td>
                      <td
                        style={{ width: "580px" }}
                        className={styles.gridCell}
                      >
                        <textarea
                          defaultValue={subItem.value ? subItem.value : ""}
                          className={styles.textAreaStyle}
                          onChange={(event) =>
                            contextType.handleAmenityChange(event, type, i, j)
                          }
                        ></textarea>
                      </td>
                    </tr>
                  </div>
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
      <RateProductContextProvider>
        <RateProductContext.Consumer>
          {(rateProductContext) => {
            contextType = rateProductContext;
            const { queryParam } = contextType && contextType.state;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <form id="thisForm" name="thisForm" autoComplete="off">
                {RateUtils.header(styles, "Amenity Elements")}
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
                      update={contextType.updateAmenity}
                      currentPage={2}
                      totalPage={this.context.updateAmenity}
                    />
                  </span>
                </div>
                <div
                  id="gridNode"
                  style={{
                    height: "445px",
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
                            style={{ width: "210px" }}
                            className={styles.gridCellHeader}
                          >
                            Element
                          </th>
                          <th
                            style={{ width: "640px" }}
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
                            contextType.state.entryData.typeList && (
                              <React.Fragment>
                                <div className={styles.title}>{"Types"}</div>
                                {this.tableRender(
                                  contextType.state.entryData.typeList,
                                  "type",
                                  "typeName"
                                )}
                              </React.Fragment>
                            )}

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
