import React, { useEffect } from "react";
import { Layout } from "../../../routing/Layout";
import styles from "./FixedSeasons.css";
import Settings from "../static/Settings";
import FixedSeasonsContext, {
  FixedSeasonsContextProvider,
} from "../context/FixedSeasonsContext";
//import CSelect from "../../../../../common/components/CSelect";
//import Utils from "../../../../../common/utils/Utils";
import { Prompt } from "react-router-dom";
import { withRouter } from "react-router";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

let contextType = null;
let tableWidth = {};
let loswidth = {};
let widthrmpl = {};
let widthrmplWithPadding = {};
let widthrmplWithoutPadding = {};
const FixedSeasons = (props): JSX.Element => {
  const onUpdate = async () => {
    const res = contextType.validatePage();
    if (res.strMessage == "") {
      await contextType.updateHotelRFPFixedRates();
    } else {
      contextType.setErrorMessage(res.strMessage);
    }
  };

  useEffect(() => {
    return () => {
      onUpdate();
    };
  }, []);

  return (
    <FixedSeasonsContextProvider>
      <FixedSeasonsContext.Consumer>
        {(fixedSeasonContextValue) => {
          contextType = fixedSeasonContextValue;
          tableWidth = {
            width: 215 + "px",
          };
          loswidth = {
            width: 130 + "px",
          };
          widthrmpl = {
            width: contextType.state.widthrmpl + "px",
          };
          widthrmplWithPadding = {
            width: contextType.state.widthrmpl + "px",
            paddingLeft: "5px",
          };
          widthrmplWithoutPadding = {
            width:
              (parseInt(contextType.state.widthrmpl) + 5).toString() + "px",
          };
          if (
            contextType.state.userDetails.isPASAdmin ||
            contextType.state.userDetails.isHotelUser
          ) {
            if (
              contextType.state.hotelRFPFixedRates?.hotelData
                ?.isbrandextendedstay === "Y"
            ) {
              widthrmpl = {
                width: contextType.state.widthrmpl + "px",
                paddingRight: "4px",
              };
            }
          }
          return (
            <>
              <Prompt
                when={contextType.errorMessage !== ""}
                message={(location, action) => {
                  if (contextType.errorMessage !== "") {
                    alert(contextType.errorMessage);
                  }
                  return false;
                }}
              />
              <>
                <Layout>
                  {contextType.showScreenLoader ? (
                    <img
                      className={styles.screenLoaderIcon}
                      src={screenLoader}
                    />
                  ) : (
                    <div>
                      <table
                        className={styles.fixedSeasonTable}
                        cellPadding={0}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr className={styles.valignTop}>
                            <td className={styles.fixedSeasonInstructions}>
                              {Settings.pageDescriptions.seasonHeading1}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fixedSeasonInstructions}>
                              {Settings.pageDescriptions.seasonHeading2}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fixedSeasonInstructions}>
                              {Settings.pageDescriptions.seasonHeading3}
                            </td>
                          </tr>
                          {contextType.state.hotelRFPFixedRates?.hotelData
                            ?.isbrandextendedstay === "N" ? (
                            <tr>
                              <td className={styles.fixedSeasonInstructions}>
                                {Settings.pageDescriptions.losHeading1}
                              </td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr className={styles.emptyRow}>
                            <td></td>
                          </tr>
                          {contextType.state.hotelRFPFixedRates?.hotelData
                            ?.isbrandextendedstay === "Y" ? (
                            <div>
                              <tr>
                                <td className={styles.fixedSeasonInstructions}>
                                  {Settings.pageDescriptions.losHeading2}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.fixedSeasonInstructions}>
                                  {Settings.pageDescriptions.losHeading3}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.fixedSeasonInstructions}>
                                  {Settings.pageDescriptions.losHeading4}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.fixedSeasonInstructions}>
                                  {Settings.pageDescriptions.losHeading5}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.fixedSeasonInstructions}>
                                  {Settings.pageDescriptions.losHeading6}
                                </td>
                              </tr>
                            </div>
                          ) : (
                            ""
                          )}
                          
                          <tr>
                            <td className={styles.greyLine}></td>
                          </tr>

                          <tr>
                            <td className={styles.sectionHeading}></td>
                          </tr>
                          <tr>
                            <td
                              className={[
                                styles.valignTop,
                                styles.pageBottomPadding,
                              ].join(" ")}
                            >
                              <div
                                className={styles.gridHeader}
                                style={tableWidth}
                              >
                                <table
                                  cellPadding={0}
                                  cellSpacing={0}
                                  className={[
                                    styles.fixedRateTable,
                                    styles.gridRowTable,
                                  ].join(" ")}
                                >
                                  <tbody>
                                    <tr>
                                      {contextType.state.seasonEditable ? (
                                        <th
                                          className={[
                                            styles.width20,
                                            styles.gridCell,
                                          ].join(" ")}
                                          rowSpan={
                                            contextType.state.numrateperroompool
                                          }
                                        >
                                          <div
                                            className={styles.emptyDiv}
                                          ></div>
                                        </th>
                                      ) : (
                                        ""
                                      )}
                                      <th
                                        rowSpan={
                                          contextType.state.numrateperroompool
                                        }
                                        className={[
                                          styles.gridCell,
                                          styles.seasonWidth,
                                        ].join(" ")}
                                      >
                                        <div
                                          className={[
                                            styles.seasonWidth,
                                            styles.pl3,
                                          ].join(" ")}
                                        >
                                          {Settings.labels.seasons}
                                        </div>
                                      </th>
                                      {contextType.state.hotelRFPFixedRates
                                        ?.hotelData?.isbrandextendedstay ===
                                      "Y" ? (
                                        <>
                                          {contextType.state.loseditable ? (
                                            <th
                                              className={[
                                                styles.width20,
                                                styles.gridCell,
                                              ].join(" ")}
                                            >
                                              <div
                                                className={styles.emptyDiv}
                                              ></div>
                                            </th>
                                          ) : (
                                            ""
                                          )}{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </tr>
                                    {contextType.state.hotelRFPFixedRates
                                      ?.hotelData?.isbrandextendedstay !==
                                    "Y" ? (
                                      <tr>
                                        {contextType.state.hotelRFPFixedRates
                                          ?.roompoollist &&
                                        contextType.state.hotelRFPFixedRates
                                          ?.roompoollist.length > 0
                                          ? contextType.state.hotelRFPFixedRates?.roompoollist.map(
                                              (roompoolItem, ind) => {
                                                return (
                                                  <th
                                                    key={ind}
                                                    style={widthrmpl}
                                                    className={styles.gridCell}
                                                  >
                                                    {contextType.state.hotelRFPFixedRates?.lratypeList.map(
                                                      (lratypeItem) => {
                                                        return contextType.state.hotelRFPFixedRates?.roomtypeList.map(
                                                          (roomtypeItem, i) => {
                                                            return (
                                                              <div
                                                                key={i}
                                                                className={
                                                                  styles.roomTypeList
                                                                }
                                                              >
                                                                {
                                                                  roomtypeItem.roomtypedescription
                                                                }
                                                              </div>
                                                            );
                                                          }
                                                        );
                                                      }
                                                    )}
                                                  </th>
                                                );
                                              }
                                            )
                                          : ""}
                                      </tr>
                                    ) : (
                                      ""
                                    )}
                                  </tbody>
                                </table>
                              </div>

                              <div
                                style={tableWidth}
                                className={styles.gridView}
                              >
                                <table
                                  className={[
                                    styles.height20,
                                    styles.gridRowTable,
                                    styles.border0,
                                  ].join(" ")}
                                  cellPadding={0}
                                  cellSpacing={0}
                                  id="gridTableView"
                                >
                                  <tbody>
                                    {contextType.state.hotelRFPFixedRates
                                      ?.SeasonList &&
                                    contextType.state.hotelRFPFixedRates
                                      ?.SeasonList.length > 0
                                      ? contextType.state.hotelRFPFixedRates?.SeasonList.map(
                                          (seasonItem, seasonIndex) => {
                                            const seasonKey =
                                              seasonItem.seasonid;
                                            return (
                                              <tr
                                                key={seasonKey}
                                                className={
                                                  contextType.state
                                                    .hotelRFPFixedRates
                                                    ?.GeneralReadOnly
                                                    ? [
                                                        styles.gridRowCapHeight,
                                                        styles.rowHeightReadOnly,
                                                      ].join(" ")
                                                    : styles.gridRowCapHeight
                                                }
                                                id={`row_${seasonKey}`}
                                              >
                                                {contextType.state
                                                  .seasonEditable ? (
                                                  <td
                                                    className={[
                                                      styles.width20,
                                                      styles.gridCell,
                                                    ].join(" ")}
                                                  >
                                                    <div
                                                      className={
                                                        styles.emptyDiv
                                                      }
                                                    >
                                                      <span>
                                                        <label
                                                          className={
                                                            styles.addDelRow
                                                          }
                                                          onClick={() =>
                                                            contextType.addseasonOnclick(
                                                              seasonIndex
                                                            )
                                                          }
                                                          title={
                                                            Settings.tooltips
                                                              .insertSeason
                                                          }
                                                        >
                                                          +
                                                        </label>
                                                        <label
                                                          className={
                                                            styles.addDelRow
                                                          }
                                                          onClick={() =>
                                                            contextType.delseasonOnclick(
                                                              seasonIndex
                                                            )
                                                          }
                                                          title={
                                                            Settings.tooltips
                                                              .deleteSeason
                                                          }
                                                        >
                                                          -
                                                        </label>{" "}
                                                      </span>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  ""
                                                )}
                                                <td
                                                  className={
                                                    contextType.state
                                                      .seasonEditable
                                                      ? [
                                                          styles.seasonWidth,
                                                          styles.gridCell,
                                                        ].join(" ")
                                                      : [
                                                          styles.seasonWidth,
                                                          styles.gridCell,
                                                          styles.paddingLeftRight,
                                                        ].join(" ")
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      styles.seasonWidth
                                                    }
                                                  >
                                                    {contextType.state
                                                      .seasonEditable ? (
                                                      <>
                                                        <input
                                                          id={
                                                            "hotelSeason[" +
                                                            `${seasonKey}` +
                                                            "].strStartdate"
                                                          }
                                                          name={
                                                            "hotelSeason[" +
                                                            `${seasonKey}` +
                                                            "].strStartdate"
                                                          }
                                                          value={
                                                            seasonItem.startdate
                                                          }
                                                          className={
                                                            seasonIndex === 0
                                                              ? [
                                                                  styles.seasonEntry,
                                                                  styles.readOnlyField,
                                                                ].join(" ")
                                                              : styles.seasonEntry
                                                          }
                                                          onChange={(e) => {
                                                            return contextType.onDateChangeHandler(
                                                              e,
                                                              seasonIndex,
                                                              "startdate"
                                                            );
                                                          }}
                                                          onKeyPress={(event) =>
                                                            contextType.DateNumberOnly_onkeypress(
                                                              event,
                                                              seasonIndex,
                                                              "startdate"
                                                            )
                                                          }
                                                          onBlur={(event) => {
                                                            return contextType.checkStart(
                                                              seasonItem,
                                                              event,
                                                              seasonIndex
                                                            );
                                                          }}
                                                          title={
                                                            Settings.tooltips
                                                              .dateFormat
                                                          }
                                                          readOnly={
                                                            seasonIndex === 0
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        <input
                                                          id={
                                                            "hotelSeason[" +
                                                            `${seasonKey}` +
                                                            "].strEnddate"
                                                          }
                                                          name={
                                                            "hotelSeason[" +
                                                            `${seasonKey}` +
                                                            "].strEnddate"
                                                          }
                                                          value={
                                                            seasonItem.enddate
                                                          }
                                                          className={
                                                            seasonIndex ===
                                                            contextType.state
                                                              .hotelRFPFixedRates
                                                              ?.SeasonList
                                                              .length -
                                                              1
                                                              ? [
                                                                  styles.seasonEntry,
                                                                  styles.readOnlyField,
                                                                  styles.ml3,
                                                                ].join(" ")
                                                              : [
                                                                  styles.seasonEntry,
                                                                  styles.ml3,
                                                                ].join(" ")
                                                          }
                                                          onChange={(e) => {
                                                            return contextType.onDateChangeHandler(
                                                              e,
                                                              seasonIndex,
                                                              "enddate"
                                                            );
                                                          }}
                                                          onKeyPress={(event) =>
                                                            contextType.DateNumberOnly_onkeypress(
                                                              event,
                                                              seasonIndex,
                                                              "enddate"
                                                            )
                                                          }
                                                          onBlur={(event) => {
                                                            return contextType.updateNext(
                                                              seasonItem,
                                                              event,
                                                              seasonIndex
                                                            );
                                                          }}
                                                          title={
                                                            Settings.tooltips
                                                              .dateFormat
                                                          }
                                                          readOnly={
                                                            seasonIndex ===
                                                            contextType.state
                                                              .hotelRFPFixedRates
                                                              ?.SeasonList
                                                              .length -
                                                              1
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                      </>
                                                    ) : (
                                                      <>
                                                        {contextType.converToLongDate(
                                                          seasonItem.startdate
                                                        )}{" "}
                                                        {Settings.labels.to}{" "}
                                                        {contextType.converToLongDate(
                                                          seasonItem.enddate
                                                        )}
                                                      </>
                                                    )}
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      : ""}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          {contextType?.state?.isbrandextendedstayLos && (
                            <div className={styles.loswrapper}>
                              <p className={styles.greyLine}></p>
                              <div className={styles.los_edit}>
                                <tr>
                                  {contextType.state.loseditable && (
                                    <th
                                      className={[
                                        styles.width20,
                                        styles.gridCell,
                                      ].join(" ")}
                                      rowSpan={
                                        contextType.state.numrateperroompool
                                      }
                                    >
                                      <div
                                        className={[
                                          styles.emptyDiv,
                                          styles.losBg,
                                        ].join(" ")}
                                      ></div>
                                    </th>
                                  )}
                                  <th
                                    className={[
                                      styles.gridCell,
                                      styles.seasonWidth,
                                      styles.noborderRight,
                                    ].join(" ")}
                                  >
                                    <div
                                      className={[
                                        styles.seasonWidth,
                                        styles.pl3,
                                        styles.fLeft,
                                        styles.losHeader,
                                      ].join(" ")}
                                    >
                                      {Settings.labels.lostiers}
                                    </div>
                                  </th>
                                </tr>

                                <div className={styles.losbottomheight}>
                                  {contextType.state.hotelRFPFixedRates &&
                                  contextType.state.hotelRFPFixedRates
                                    ?.LosList &&
                                  contextType.state.hotelRFPFixedRates?.LosList
                                    .length > 0
                                    ? contextType.state.hotelRFPFixedRates?.LosList.map(
                                        (losItem, losIndex) => {
                                          return (
                                            <tr key={losIndex}>
                                              {contextType.state
                                                .loseditable && (
                                                <td
                                                  className={[
                                                    styles.width25,
                                                    styles.gridCell,
                                                    styles.borderRight,
                                                  ].join(" ")}
                                                >
                                                  <div
                                                    className={[
                                                      styles.emptyDiv,
                                                      styles.pl1,
                                                    ].join(" ")}
                                                  >
                                                    <label
                                                      className={
                                                        styles.addDelRow
                                                      }
                                                      onClick={() =>
                                                        contextType.addLosOnClick(
                                                          losIndex
                                                        )
                                                      }
                                                      title={
                                                        Settings.tooltips
                                                          .insertLengthOfStay
                                                      }
                                                    >
                                                      +
                                                    </label>
                                                    {losIndex !== 0 ? (
                                                      <label
                                                        className={
                                                          styles.addDelRow
                                                        }
                                                        onClick={() =>
                                                          contextType.delLosOnClick(
                                                            losIndex
                                                          )
                                                        }
                                                        title={
                                                          Settings.tooltips
                                                            .deleteLengthOfStay
                                                        }
                                                      >
                                                        -
                                                      </label>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </td>
                                              )}
                                              <td
                                                style={loswidth}
                                                className={[
                                                  styles.gridCell,
                                                  styles.height100,
                                                  styles.border0,
                                                ].join(" ")}
                                              >
                                                <div
                                                  style={loswidth}
                                                  className={[
                                                    styles.height100,
                                                    styles.pl1,
                                                  ].join(" ")}
                                                >
                                                  {!contextType.state
                                                    .loseditable ? (
                                                    <>
                                                      {
                                                        losItem[
                                                          Settings.keys
                                                            .roomNightsFrom
                                                        ]
                                                      }
                                                      -{" "}
                                                      {
                                                        losItem[
                                                          Settings.keys
                                                            .roomNightsTo
                                                        ]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      <input
                                                        type={"text"}
                                                        id={
                                                          "hotelLos[" +
                                                          `${losIndex}` +
                                                          "].roomnightsfrom"
                                                        }
                                                        name={
                                                          "hotelLOS[" +
                                                          `${losIndex}` +
                                                          "].roomnightsfrom"
                                                        }
                                                        value={
                                                          losItem.roomnightsfrom
                                                        }
                                                        className={
                                                          losIndex === 0
                                                            ? [
                                                                styles.losEntry,
                                                                styles.readOnlyField,
                                                              ].join(" ")
                                                            : styles.losEntry
                                                        }
                                                        onBlur={(e) => {
                                                          return contextType.checkLosStart(
                                                            e,
                                                            losIndex
                                                          );
                                                        }}
                                                        onChange={(e) =>
                                                          contextType.onLosChangeHandler(
                                                            e,
                                                            losIndex,
                                                            "roomnightsfrom"
                                                          )
                                                        }
                                                        maxLength={3}
                                                        readOnly={
                                                          losIndex === 0
                                                            ? true
                                                            : false
                                                        }
                                                      />
                                                      <span>- </span>
                                                      <input
                                                        type={"text"}
                                                        id={
                                                          "hotelLos[" +
                                                          `${losIndex}` +
                                                          "].roomnightsto"
                                                        }
                                                        name={
                                                          "hotelLOS[" +
                                                          `${losIndex}` +
                                                          "].roomnightsto"
                                                        }
                                                        value={
                                                          losItem.roomnightsto
                                                        }
                                                        className={
                                                          styles.losEntry
                                                        }
                                                        onBlur={(e) => {
                                                          return contextType.updateLosNext(
                                                            e,
                                                            losIndex
                                                          );
                                                        }}
                                                        onChange={(e) =>
                                                          contextType.onLosChangeHandler(
                                                            e,
                                                            losIndex,
                                                            "roomnightsto"
                                                          )
                                                        }
                                                        maxLength={3}
                                                      />
                                                    </>
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )
                                    : ""}
                                </div>
                              </div>
                            </div>
                          )}
                          <tr>
                            <td>
                              <input
                                type="hidden"
                                id="num_los"
                                name="num_los"
                                value={
                                  contextType.state.hotelRFPFixedRates?.LosList
                                    ?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="num_season"
                                name="num_season"
                                value={
                                  contextType.state.hotelRFPFixedRates
                                    ?.SeasonList?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="num_product"
                                name="num_product"
                                value={
                                  contextType.state.hotelRFPFixedRates
                                    ?.lratypeList?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="num_rt"
                                name="num_rt"
                                value={
                                  contextType.state.hotelRFPFixedRates
                                    ?.roomtypeList?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="min_rt"
                                name="min_rt"
                                value={
                                  contextType.state.hotelRFPFixedRates
                                    ?.roomtypeList &&
                                  contextType.state.hotelRFPFixedRates
                                    ?.roomtypeList.length > 0
                                    ? contextType.state.hotelRFPFixedRates
                                        ?.roomtypeList[0].roomtypeid
                                    : 0
                                }
                              />
                              <input
                                type="hidden"
                                id="num_rp"
                                name="num_rp"
                                value={contextType.state.num_rp}
                              />

                              <input
                                type="hidden"
                                id="maxLOS"
                                name="maxLOS"
                                value={contextType.state.maxLOS}
                              />
                              <input
                                type="hidden"
                                id="next_los"
                                name="next_los"
                                value={
                                  contextType.state.hotelRFPFixedRates?.LosList
                                    ?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="next_season"
                                name="next_season"
                                value={
                                  contextType.state.hotelRFPFixedRates
                                    ?.SeasonList?.length
                                }
                              />
                              <input
                                type="hidden"
                                id="formChg"
                                name="formChg"
                                value="N"
                              />
                              <input
                                type="hidden"
                                id="seasonChg"
                                name="seasonChg"
                                value="N"
                              />
                              <input
                                type="hidden"
                                id="losChg"
                                name="losChg"
                                value="N"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </Layout>
              </>
            </>
          );
        }}
      </FixedSeasonsContext.Consumer>
    </FixedSeasonsContextProvider>
  );
};

export default withRouter(FixedSeasons);
