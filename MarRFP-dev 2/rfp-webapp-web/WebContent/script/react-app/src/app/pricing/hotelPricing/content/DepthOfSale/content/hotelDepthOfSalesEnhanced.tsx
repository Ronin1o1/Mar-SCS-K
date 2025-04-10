import React, { Suspense,  useContext } from "react";
import styles from "./hotelDepthOfSales.css";
import DeapthofsaleAccountContext from "../context/depthofsaleContextProvider";
import CModal from "../../../../../common/components/CModal";
import classnames from "classnames";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../../common/utils/Utils";
import CSuspense from "../../../../../common/components/CSuspense";
import InfoBTAccountStrategy from "./InfoBTAccountStrategy";
import btnPrevSeasonRed from "../../../../../common/assets/img/button/btnPrevSeasonRed.gif";
import btnNextSeasonRed from "../../../../../common/assets/img/button/btnNextSeasonRed.gif";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

let contextType = null;
export default function hotelDepthOfSalesEnhanced() {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  return (
    <DeapthofsaleAccountContext.Consumer>
      {(enhancedDOSContext) => {
        contextType = enhancedDOSContext;
        return (
          <React.Fragment>
            <tr>
              {/* <input type="Button" onClick={handleChange} value="Save"/> */}

              {contextType.state.depthOfSales.GeneralReadOnly ? (
                <td className={styles.instructions}>
                  {Settings.enhancedDOS.readOnlyInstructions1}
                  <b style={{ fontWeight: "bold" }}>
                    {Settings.enhancedDOS.readOnlyInstructions1A}
                  </b>
                  {Settings.enhancedDOS.readOnlyInstructions1B}
                </td>
              ) : (
                <td className={styles.instructions}>
                  <p>{Settings.enhancedDOS.readOnlyInstructions2}</p>
                  <p>{Settings.enhancedDOS.readOnlyInstructions3}</p>
                  <p>{Settings.enhancedDOS.readOnlyInstructions4}</p>
                  <p>{Settings.enhancedDOS.readOnlyInstructions5}</p>
                </td>
              )}
            </tr>
            <tr className={styles.rowGap}>
              <td>
                <>&nbsp;</>
              </td>
            </tr>
            <tr>
              <td>
                <table className={styles.zeroHeight}>
                  {parseInt(contextType.state.period) <
                    Settings.depthOfSales.period && (
                    <div>
                      {contextType.state.depthOfSales.salesDepth
                        .last_updatedate !== null && (
                        <div>
                          <tr>
                            <td className={styles.fieldName}>
                              {Settings.depthOfSales.lastUpdate}
                            </td>
                            <td className={styles.fieldName} align="left">
                              <>&nbsp;</>
                              {
                                contextType.state.depthOfSales.salesDepth
                                  .formattedLast_updatedate
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldName}>
                              {" "}
                              {`${contextType.state.period - 1} ${
                                Settings.depthOfSales.retailADR.label
                              }`}
                            </td>
                            <td className={styles.fieldValue}>
                              {contextType.state.depthOfSales
                                .GeneralReadOnly ? (
                                <span>
                                  {
                                    contextType.state.depthOfSales.salesDepth
                                      .prevyear_retailadr
                                  }
                                </span>
                              ) : (
                                <input
                                  id={Settings.depthOfSales.retailADR.id}
                                  name={Settings.depthOfSales.retailADR.name}
                                  className={styles.anticipate}
                                  value={
                                    contextType.state.depthOfSales.salesDepth
                                      .prevyear_retailadr
                                  }
                                  onKeyPress={Utils.NumberOnly_onkeypress}
                                  onChange={contextType.calcADR}
                                />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldName}>
                              {" "}
                              {Settings.depthOfSales.anicipateLabel.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <span
                                id={
                                  Settings.depthOfSales.anicipateLabel
                                    .anticipateId
                                }
                              >
                                {contextType.state.depthOfSales
                                  .GeneralReadOnly ? (
                                  <span>
                                    {
                                      contextType.state.depthOfSales.salesDepth
                                        .anticipate_inc_retail_pct
                                    }
                                  </span>
                                ) : (
                                  <input
                                    id={Settings.depthOfSales.anicipateLabel.id}
                                    name={
                                      Settings.depthOfSales.anicipateLabel.name
                                    }
                                    className={styles.anticipate}
                                    value={
                                      contextType.state.depthOfSales.salesDepth
                                        .anticipate_inc_retail_pct
                                    }
                                    onKeyPress={Utils.NumberOnly_onkeypress}
                                    onChange={contextType.calcADR}
                                  />
                                )}
                                %
                              </span>
                              <div>
                                <div>
                                  <span
                                    className={classnames(
                                      styles.fieldValue,
                                      styles.wdth200
                                    )}
                                  >
                                    {Settings.depthOfSales.innstructions}
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldName}> Retail ADR:</td>
                            <td
                              className={classnames(
                                styles.fieldValue,
                                styles.retailADR
                              )}
                            >
                              <div id="retailadr"></div>
                            </td>
                          </tr>
                        </div>
                      )}
                    </div>
                  )}
                  <tr>
                    <td
                      className={classnames(styles.fieldName, styles.dosWidth)}
                    >
                      {" "}
                      {Settings.depthOfSales.dos}
                    </td>
                    {contextType.state.depthOfSales.GeneralReadOnly ? (
                      <td className={styles.fieldName}>
                        {Settings.depthOfSales.enhanced}
                      </td>
                    ) : (
                      <td className={styles.fieldName}>
                        <input
                          type="radio"
                          id={Settings.depthOfSales.radio.id}
                          name={Settings.depthOfSales.radio.name}
                          value="N"
                          checked={contextType.state.isStandatard}
                          onClick={contextType.switchType}
                        />
                        {Settings.depthOfSales.standard} <>&nbsp;</>
                        <>&nbsp;</>
                        <>&nbsp;</>
                        <input
                          type="radio"
                          id={Settings.depthOfSales.radio.id}
                          name={Settings.depthOfSales.radio.name}
                          value="Y"
                          checked={!contextType.state.isStandatard}
                          onClick={contextType.switchType}
                        />
                        {Settings.depthOfSales.enhanced}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td className={styles.instructions} colSpan={2}>
                      {Settings.enhancedDOS.utilizeMsg}&nbsp;
                      {contextType.state.isStandatard ? null : <br />}
                      {Settings.depthOfSales.utilizeMsg1}
                    </td>
                  </tr>
                  <tr>
                    <td className={`${styles.fieldName} ${styles.allignMDL}`}>
                      {Settings.depthOfSales.hotelPricingLbl}
                    </td>
                    <td>
                      {contextType.state.depthOfSales.GeneralReadOnly ? (
                        <span className={styles.strategytext}>
                          {
                            contextType.state.depthOfSales.salesDepth
                              .bt_price_strategy
                          }
                          &nbsp;
                        </span>
                      ) : (
                        <textarea
                          cols={60}
                          id="salesDepth.bt_price_strategy"
                          name="salesDepth.bt_price_strategy"
                          rows={11}
                          onKeyPress={(e) => Utils.checklen_onkeypress(e, 255)}
                          className={styles.textArea}
                          onChange={(e) => contextType.text_onclick(e, 255)}
                          value={
                            contextType.state.depthOfSales.salesDepth
                              .bt_price_strategy !== null
                              ? contextType.state.depthOfSales?.salesDepth
                                  ?.bt_price_strategy
                              : ""
                          }
                          onBlur={(e) => contextType.text_onBlur(e, 255)}
                        ></textarea>
                      )}
                      <a
                        onClick={contextType.btAcctStrategy_popup}
                        href="javascript:void(null)"
                      >
                        <b className={styles.example_margin}>
                          {Settings.depthOfSales.examples}
                        </b>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.fieldName}>
                      {Settings.depthOfSales.currency}
                    </td>
                    {contextType.state.depthOfSales.salesDepth.currencyname !==
                    null ? (
                      <td
                        className={styles.fieldName}
                      >{`${contextType.state.depthOfSales.salesDepth.currencyname}s`}</td>
                    ) : (
                      <td
                        className={classnames(styles.fieldName, styles.redText)}
                      >
                        {Settings.depthOfSales.noCurrency}
                      </td>
                    )}
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table>
                  <tr>
                    <td
                      className={classnames(
                        styles.InstructionHeader,
                        styles.middleAlign,
                        styles.nonWrap
                      )}
                    >
                      <table
                        className={classnames(
                          styles.InstructionHeader,
                          styles.nonWrap
                        )}
                      >
                        <tr>
                          {contextType.state.depthOfSales.salesDepth
                            .totalSeasons > 0 ? (
                            <td className={styles.seasondata}>
                              {contextType.state.depthOfSales.salesDepth
                                .salesdepth_en_season.seasonid > 1 && (
                                <span className={styles.seasonOnePadding}>
                                  <img
                                    src={btnPrevSeasonRed}
                                    onClick={() =>
                                      contextType.switchSeason(
                                        contextType.state.depthOfSales
                                          .salesDepth.salesdepth_en_season
                                          .seasonid - 1
                                      )
                                    }
                                    alt={`${Settings.enhancedDOS.prevAlt} ${
                                      contextType.state.depthOfSales.salesDepth
                                        .salesdepth_en_season.seasonid - 1
                                    }`}
                                  />
                                  <span>
                                    {" "}
                                    {Settings.enhancedDOS.season}{" "}
                                    {`${
                                      contextType.state.depthOfSales.salesDepth
                                        .salesdepth_en_season.seasonid - 1
                                    }`}
                                  </span>
                                </span>
                              )}

                              <span className={styles.middleAlign}>
                                {Settings.enhancedDOS.season}{" "}
                                {`${contextType.state.depthOfSales.salesDepth.salesdepth_en_season.seasonid}`}{" "}
                                {Settings.enhancedDOS.of}{" "}
                                {`${contextType.state.depthOfSales.salesDepth.totalSeasons}`}
                                {Settings.enhancedDOS.colon}{" "}
                                {`${contextType.state.depthOfSales.salesDepth.salesdepth_en_season.longStartdate}`}{" "}
                                {Settings.enhancedDOS.hyphen}{" "}
                                {`${contextType.state.depthOfSales.salesDepth.salesdepth_en_season.longEnddate}`}
                              </span>

                              {contextType.state.depthOfSales.salesDepth
                                .salesdepth_en_season.seasonid <
                                contextType.state.depthOfSales.salesDepth
                                  .totalSeasons && (
                                <span>
                                  {" "}
                                  {Settings.enhancedDOS.season}{" "}
                                  {`${
                                    contextType.state.depthOfSales.salesDepth
                                      .salesdepth_en_season.seasonid + 1
                                  }`}
                                  <img
                                    className={styles.allignMDL}
                                    onClick={() =>
                                      contextType.switchSeason(
                                        contextType.state.depthOfSales
                                          .salesDepth.salesdepth_en_season
                                          .seasonid + 1
                                      )
                                    }
                                    src={btnNextSeasonRed}
                                    alt={`${Settings.enhancedDOS.prevAlt} ${
                                      contextType.state.depthOfSales.salesDepth
                                        .salesdepth_en_season.seasonid + 1
                                    }`}
                                  />
                                </span>
                              )}
                            </td>
                          ) : (
                            <td className={classnames(styles.redText)}>
                              {Settings.enhancedDOS.noSeasons}
                            </td>
                          )}
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table className={styles.depthofsalegrid}>
                        <tr
                          className={classnames(
                            styles.bottomAlign,
                            styles.headarvr
                          )}
                        >
                          <td
                            className={`${styles.fieldName} ${styles.number}`}
                            rowSpan={2}
                            align="center"
                          >
                            <>&nbsp;</>
                          </td>
                          <td
                            className={classnames(
                              styles.fieldName,
                              styles.nonWrap
                            )}
                            colSpan={2}
                            align="center"
                          >
                            <p>{Settings.enhancedDOS.annualRoomNight}</p>
                            <p>{Settings.enhancedDOS.volumeRange}</p>
                          </td>

                          {contextType.state.depthOfSales.salesDepth
                            ?.salesdepth_en_loslist !== null &&
                          contextType.state.depthOfSales.salesDepth
                            .salesdepth_en_loslist.length > 0 ? (
                            contextType.state.depthOfSales.salesDepth.salesdepth_en_loslist.map(
                              (losItem) => {
                                if (
                                  losItem.roomnightsto !==
                                  Settings.enhancedDOS.roomnightsto
                                ) {
                                  return (
                                    <td
                                      className={classnames(
                                        styles.fieldName,
                                        styles.nonWrap
                                      )}
                                      align="center"
                                    >
                                      <div style={{ display: "inline-grid" }}>
                                        <p>{`${Settings.enhancedDOS.losTier}${losItem.losChar}${Settings.enhancedDOS.colon} ${losItem.roomnightsfrom} ${Settings.enhancedDOS.hyphen} ${losItem.roomnightsto}`}</p>
                                        <p>{Settings.enhancedDOS.rateRange}</p>
                                      </div>
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td
                                      className={classnames(
                                        styles.fieldName,
                                        styles.nonWrap
                                      )}
                                      align="center"
                                    >
                                      {Settings.enhancedDOS.rateRange}
                                    </td>
                                  );
                                }
                              }
                            )
                          ) : (
                            <td
                              className={classnames(
                                styles.fieldName,
                                styles.nonWrap,
                                styles.number
                              )}
                              colSpan={2}
                              align="center"
                            >
                              {Settings.enhancedDOS.rateRange}
                            </td>
                          )}
                        </tr>
                        <tr className={styles.minmaxlenth}>
                          <td
                            className={classnames(
                              styles.fieldName,
                              styles.nonWrap
                            )}
                          >
                            <span>{Settings.enhancedDOS.min}</span>
                            <span>{Settings.enhancedDOS.max}</span>
                          </td>
                          {contextType.state.depthOfSales.salesDepth
                            .salesdepth_en_loslist !== null &&
                          contextType.state.depthOfSales.salesDepth
                            .salesdepth_en_loslist.length > 0 ? (
                            contextType.state.depthOfSales.salesDepth.salesdepth_en_loslist.map(
                              (losItem, index) => {
                                return (
                                  <td
                                    align="center"
                                    key={index}
                                    className={classnames(
                                      styles.fieldName,
                                      styles.nonWrap
                                    )}
                                  >
                                    <span>{Settings.enhancedDOS.min}</span>
                                    <span>{Settings.enhancedDOS.max}</span>
                                  </td>
                                );
                              }
                            )
                          ) : (
                            <div>
                              <td
                                className={classnames(
                                  styles.fieldName,
                                  styles.nonWrap
                                )}
                              >
                                {Settings.enhancedDOS.min}
                              </td>
                              <td
                                className={classnames(
                                  styles.fieldName,
                                  styles.nonWrap
                                )}
                              >
                                {Settings.enhancedDOS.max}
                              </td>
                            </div>
                          )}
                          <td
                            className={classnames(
                              styles.fieldName,
                              styles.nonWrap,
                              styles.paddingleft10
                            )}
                          >
                            {Settings.enhancedDOS.comments}
                          </td>
                        </tr>
                        {contextType.state.depthOfSales.salesDepth?.salesdepth_en_ranges?.map(
                          (data, i) => {
                            const last_range_index =
                              contextType.state.depthOfSales.salesDepth
                                ?.salesdepth_en_ranges?.length - 1;
                            let volrmax;
                            if (
                              contextType.firstMaxRowPlus === true &&
                              i == 0
                            ) {
                              volrmax = "+";
                            } else if (contextType.enVolrmaxChange) {
                              volrmax =
                                data?.volrmax == 999999 ? "+" : data?.volrmax;
                            } else if (isNaN(data?.volrmax)) {
                              if (i == 0) {
                                volrmax = "";
                              } else {
                                volrmax = data.volrmax;
                              }
                            } else if (
                              data?.volrmax == 999999 ||
                              (data?.volrmax == "" && !data?.readOnly)
                            ) {
                              volrmax = "";
                            } else if (i === 0 && data?.volrmax === "+") {
                              volrmax = "";
                            } else {
                              volrmax = data.volrmax;
                            }
                            return (
                              <tr key={i} className={styles.minmaxvalues}>
                                <td
                                  className={classnames(
                                    styles.fieldName,
                                    styles.number
                                  )}
                                >{`${"(" + (i + 1) + ")"}`}</td>
                                {contextType.state.depthOfSales
                                  .GeneralReadOnly ? (
                                  <td
                                    className={classnames(
                                      styles.rigthAlign,
                                      styles.readvalues
                                    )}
                                  >
                                    {isNaN(data.volrmin) ? "" : data.volrmin}
                                  </td>
                                ) : (
                                  <td className={styles.rigthAlign}>
                                    {/* Annual roomnight min column */}
                                    <input
                                      id={`salesDepth.salesdepth_en_ranges[${i}].volrmin`}
                                      name={`salesDepth.salesdepth_en_ranges[${i}].volrmin`}
                                      value={
                                        isNaN(data?.volrmin)
                                          ? ""
                                          : data?.volrmin
                                      }
                                      className={classnames(
                                        styles.silverBgColor,
                                        styles.fieldRates
                                      )}
                                      tabIndex={-1}
                                      readOnly={true}
                                    />
                                  </td>
                                )}
                                {contextType.state.depthOfSales
                                  .GeneralReadOnly ? (
                                  data.volrmax ===
                                  Settings.enhancedDOS.volrMaxLimit ? (
                                    <td
                                      className={classnames(
                                        styles.rigthAlign,
                                        styles.readvalues
                                      )}
                                    >
                                      {isNaN(data.volrmax)
                                        ? ""
                                        : data.volrmax === 999999
                                        ? "+"
                                        : data.volrmax}
                                    </td>
                                  ) : (
                                    <td
                                      className={classnames(
                                        styles.rigthAlign,
                                        styles.readvalues
                                      )}
                                    >
                                      {data?.volrmax === "+"
                                        ? data?.volrmax
                                        : isNaN(data?.volrmax)
                                        ? ""
                                        : data?.volrmax}
                                    </td>
                                  )
                                ) : (
                                  <td className={styles.rigthAlign}>
                                    {/* Annual roomnight max column */}
                                    <input
                                      id={`salesDepth.salesdepth_en_ranges[${i}].volrmax`}
                                      name={`salesDepth.salesdepth_en_ranges[${i}].volrmax`}
                                      value={volrmax}
                                      className={
                                        data?.readOnly && i !== 0
                                          ? classnames(
                                              styles.fieldRates,
                                              styles.silverBgColor
                                            )
                                          : i === last_range_index
                                          ? volrmax === "+" &&
                                            classnames(
                                              styles.fieldRates,
                                              styles.silverBgColor
                                            )
                                          : classnames(
                                              styles.fieldRates,
                                              styles.whiteBgColor
                                            )
                                      }
                                      maxLength={6}
                                      onKeyPress={contextType.DOS_onkeypress}
                                      onChange={(e) => {
                                        contextType.onChangeEnhancedHandler(
                                          e,
                                          i
                                        );
                                        contextType.setEnVolrmaxChange(true);
                                        contextType.setFirstMaxRowPlus(false);
                                      }}
                                      onBlur={(e) => {
                                        i !== contextType.maxDOSFromAPI - 1 &&
                                          contextType.update_volEnhanced(
                                            i,
                                            "d"
                                          );
                                      }}
                                      title={
                                        Settings.depthOfSales.stringVolMaxTitle
                                      }
                                      readOnly={
                                        i === last_range_index
                                          ? true
                                          : data.readOnly && i !== 0
                                      }
                                      autoFocus={i === 0 ? true : false}
                                    />
                                  </td>
                                )}
                                {contextType.state.depthOfSales?.salesDepth
                                  ?.salesdepth_en_loslist !== null &&
                                  contextType.state.depthOfSales?.salesDepth
                                    ?.salesdepth_en_loslist[0] && (
                                    <td className={styles.rigthAlign}>
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data?.salesdepth_en_rates[0].ratemin
                                          )
                                            ? ""
                                            : data?.salesdepth_en_rates[0]
                                                .ratemin}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          {/* LOS first min column */}
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[0].ratemin`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[0].ratemin`}
                                            value={
                                              isNaN(
                                                data?.salesdepth_en_rates[0]
                                                  .ratemin
                                              )
                                                ? ""
                                                : data?.salesdepth_en_rates[0]
                                                    .ratemin
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={(e) => {
                                              contextType.onChangeEnhancedHandler(
                                                e,
                                                i
                                              );
                                            }}
                                            onBlur={(e) => {
                                              contextType.update_volEnhanced(
                                                i,
                                                "a"
                                              );
                                            }}
                                            tabIndex={data.tabIndex}
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data.salesdepth_en_rates[0].ratemax
                                          )
                                            ? ""
                                            : data.salesdepth_en_rates[0]
                                                .ratemax}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[0].ratemax`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[0].ratemax`}
                                            value={
                                              isNaN(
                                                data.salesdepth_en_rates[0]
                                                  .ratemax
                                              )
                                                ? ""
                                                : data.salesdepth_en_rates[0]
                                                    .ratemax
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={(e) => {
                                              contextType.onChangeEnhancedHandler(
                                                e,
                                                i
                                              );
                                            }}
                                            onBlur={(e) => {
                                              contextType.update_volEnhanced(
                                                i,
                                                "b"
                                              );
                                            }}
                                            tabIndex={data.tabIndex}
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                    </td>
                                  )}
                                {contextType.state.depthOfSales?.salesDepth
                                  ?.salesdepth_en_loslist !== null &&
                                  contextType.state.depthOfSales.salesDepth
                                    ?.salesdepth_en_loslist[1] && (
                                    <td className={styles.rigthAlign}>
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data?.salesdepth_en_rates[1]
                                              ?.ratemin
                                          )
                                            ? ""
                                            : data?.salesdepth_en_rates[1]
                                                ?.ratemin}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[1].ratemin`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[1].ratemin`}
                                            value={
                                              isNaN(
                                                data?.salesdepth_en_rates[1]
                                                  ?.ratemin
                                              )
                                                ? ""
                                                : data?.salesdepth_en_rates[1]
                                                    ?.ratemin
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "a",
                                                      1
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "a"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data.salesdepth_en_rates[1]?.ratemax
                                          )
                                            ? ""
                                            : data.salesdepth_en_rates[1]
                                                ?.ratemax}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[1].ratemax`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[1].ratemax`}
                                            value={
                                              isNaN(
                                                data.salesdepth_en_rates[1]
                                                  ?.ratemax
                                              )
                                                ? ""
                                                : data.salesdepth_en_rates[1]
                                                    ?.ratemax
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "b",
                                                      1
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "b"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                    </td>
                                  )}
                                {contextType.state.depthOfSales?.salesDepth
                                  ?.salesdepth_en_loslist !== null &&
                                  contextType.state.depthOfSales.salesDepth
                                    ?.salesdepth_en_loslist[2] && (
                                    <td className={styles.rigthAlign}>
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data?.salesdepth_en_rates[2]
                                              ?.ratemin
                                          )
                                            ? ""
                                            : data?.salesdepth_en_rates[2]
                                                ?.ratemin}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[2].ratemin`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[2].ratemin`}
                                            value={
                                              isNaN(
                                                data?.salesdepth_en_rates[2]
                                                  ?.ratemin
                                              )
                                                ? ""
                                                : data?.salesdepth_en_rates[2]
                                                    ?.ratemin
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "a",
                                                      2
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "a"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data.salesdepth_en_rates[2]?.ratemax
                                          )
                                            ? ""
                                            : data.salesdepth_en_rates[2]
                                                ?.ratemax}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[2].ratemax`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[2].ratemax`}
                                            value={
                                              isNaN(
                                                data.salesdepth_en_rates[2]
                                                  ?.ratemax
                                              )
                                                ? ""
                                                : data.salesdepth_en_rates[2]
                                                    ?.ratemax
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "b",
                                                      2
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "b"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                    </td>
                                  )}
                                {contextType.state.depthOfSales?.salesDepth
                                  ?.salesdepth_en_loslist !== null &&
                                  contextType.state.depthOfSales.salesDepth
                                    ?.salesdepth_en_loslist[3] && (
                                    <td className={styles.rigthAlign}>
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data?.salesdepth_en_rates[3]
                                              ?.ratemin
                                          )
                                            ? ""
                                            : data?.salesdepth_en_rates[3]
                                                ?.ratemin}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[3].ratemin`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[3].ratemin`}
                                            value={
                                              isNaN(
                                                data?.salesdepth_en_rates[3]
                                                  ?.ratemin
                                              )
                                                ? ""
                                                : data?.salesdepth_en_rates[3]
                                                    ?.ratemin
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "a",
                                                      3
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "a"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                      {contextType.state.depthOfSales
                                        .GeneralReadOnly ? (
                                        <td
                                          className={classnames(
                                            styles.rigthAlign,
                                            styles.readvalues
                                          )}
                                        >
                                          {isNaN(
                                            data.salesdepth_en_rates[3]?.ratemax
                                          )
                                            ? ""
                                            : data.salesdepth_en_rates[3]
                                                ?.ratemax}
                                        </td>
                                      ) : (
                                        <td className={styles.rigthAlign}>
                                          <input
                                            id={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[3].ratemax`}
                                            name={`salesDepth.salesdepth_en_ranges[${i}].salesdepth_en_rates[3].ratemax`}
                                            value={
                                              isNaN(
                                                data.salesdepth_en_rates[3]
                                                  ?.ratemax
                                              )
                                                ? ""
                                                : data.salesdepth_en_rates[3]
                                                    ?.ratemax
                                            }
                                            className={
                                              data.readOnly && i !== 0
                                                ? classnames(
                                                    styles.fieldRates,
                                                    styles.silverBgColor
                                                  )
                                                  :i === 0
                                          ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                                : classnames(
                                                    styles.fieldRates,
                                                    styles.whiteBgColor
                                                  )
                                            }
                                            maxLength={7}
                                            onKeyPress={(e) => {
                                              if (
                                                !contextType.NumberOnly_onkeypress(
                                                  e
                                                )
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.onChangeEnhancedHandler(
                                                      e,
                                                      i
                                                    );
                                                  }
                                            }
                                            onBlur={
                                              contextType.onChangeEnTrigger ===
                                                true &&
                                              contextType.state.depthOfSales
                                                .salesDepth.numberLOSTiers > 1
                                                ? (e) => {
                                                    contextType.update_vol_los(
                                                      i,
                                                      "b",
                                                      3
                                                    );
                                                  }
                                                : (e) => {
                                                    contextType.update_volEnhanced(
                                                      i,
                                                      "b"
                                                    );
                                                  }
                                            }
                                            readOnly={data.readOnly}
                                          />
                                        </td>
                                      )}
                                    </td>
                                  )}
                                {contextType.state.depthOfSales
                                  .GeneralReadOnly ? (
                                  <td
                                    className={classnames(
                                      styles.rigthAlign,
                                      styles.paddingleft10
                                    )}
                                  >
                                    {data.comments !== null
                                      ? data.comments.replaceAll("+", " ")
                                      : ""}
                                  </td>
                                ) : (
                                  <td className={classnames(styles.rigthAlign)}>
                                    <textarea
                                      id={`salesDepth.salesdepth_en_ranges[${i}].comments`}
                                      name={`salesDepth.salesdepth_en_ranges[${i}].comments`}
                                      rows={11}
                                      value={
                                        data.comments !== null
                                          ? data.comments.replaceAll("+", " ")
                                          : ""
                                      }
                                      className={
                                        data.readOnly && i !== 0
                                          ? classnames(
                                              styles.comments,
                                              styles.silverBgColor
                                            )
                                          : classnames(
                                              styles.comments,
                                              styles.whiteBgColor
                                            )
                                      }
                                      onKeyPress={(e) =>
                                        Utils.checklen_onkeypress(e, 500)
                                      }
                                      onChange={(e) =>
                                        contextType.textEnhanced_onclick(e, 500)
                                      }
                                      onBlur={(e) =>
                                        contextType.textEnhanced_onblur(e, 500)
                                      }
                                      readOnly={data.readOnly}
                                    />
                                  </td>
                                )}
                              </tr>
                            );
                          }
                        )}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <CModal
              title={Settings.depthOfSales.popUpTile}
              onClose={contextType.btAcctStrategy_popup}
              show={contextType.state.showModal}
              class={"BTaccountstrategyinfo"}
              xPosition={-605}
              yPosition={-100}
            >
              <Suspense fallback={<CSuspense />}>
                <InfoBTAccountStrategy />
              </Suspense>
            </CModal>
            <style>{`
            .BTaccountstrategyinfo{
              width:1210px;
            }
            `}</style>
          </React.Fragment>
        );
      }}
    </DeapthofsaleAccountContext.Consumer>
  );
}
