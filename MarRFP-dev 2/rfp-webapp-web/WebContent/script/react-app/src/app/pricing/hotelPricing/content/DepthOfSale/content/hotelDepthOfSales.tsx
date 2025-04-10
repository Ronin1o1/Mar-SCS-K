import React, { Suspense } from "react";
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
//import { bool } from "prop-types";

let contextType = null;
export default function HotelDepthOfSales() {
  return (
    <DeapthofsaleAccountContext.Consumer>
      {(CenterallyPricedAccount) => {
        contextType = CenterallyPricedAccount;
        return (
          <React.Fragment>
            <div className={styles.dostabledata}>
              <tr>
                {contextType.state.depthOfSales.GeneralReadOnly ? (
                  <td className={styles.instructions}>
                    {Settings.depthOfSales.readOnlyInstructions1}
                    <b style={{ fontWeight: "bold" }}>
                      {Settings.depthOfSales.readOnlyInstructions1A}
                    </b>
                  </td>
                ) : (
                  <td className={styles.instructions}>
                    <p>{Settings.depthOfSales.readOnlyInstructions2}</p>
                    <p>{Settings.depthOfSales.readOnlyInstructions2Sub1}</p>
                    <p>{Settings.depthOfSales.readOnlyInstructions2Sub2}</p>
                    <p>{Settings.depthOfSales.readOnlyInstructions2Sub3}</p>
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
                                        contextType.state.depthOfSales
                                          .salesDepth.anticipate_inc_retail_pct
                                      }
                                    </span>
                                  ) : (
                                    <input
                                      id={
                                        Settings.depthOfSales.anicipateLabel.id
                                      }
                                      name={
                                        Settings.depthOfSales.anicipateLabel
                                          .name
                                      }
                                      className={styles.anticipate}
                                      value={
                                        contextType.state.depthOfSales
                                          .salesDepth.anticipate_inc_retail_pct
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
                        className={classnames(
                          styles.fieldName,
                          styles.dosWidth
                        )}
                      >
                        {Settings.depthOfSales.dos}
                      </td>
                      {contextType.state.depthOfSales.GeneralReadOnly ? (
                        <td className={styles.fieldName}>
                          {Settings.depthOfSales.standard}
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
                        <p>
                          {Settings.depthOfSales.utilizeMsg}&nbsp;
                          {contextType.state.isStandatard ? null : <br />}
                          {Settings.depthOfSales.utilizeMsg1}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className={`${styles.fieldName} ${styles.allignMDL}`}>
                        {Settings.depthOfSales.hotelPricingLbl}
                      </td>
                      <td className={styles.textareadata}>
                        {contextType.state.depthOfSales.GeneralReadOnly ? (
                          <span className={styles.strategytext}>
                            {contextType.state.depthOfSales?.salesDepth
                              ?.isenhanced === "Y" ? (
                              <b>
                                {
                                  contextType.state.depthOfSales.salesDepth
                                    .bt_price_strategy
                                }
                                &nbsp;
                              </b>
                            ) : (
                              <>
                                {
                                  contextType.state.depthOfSales.salesDepth
                                    .bt_price_strategy
                                }
                              </>
                            )}
                          </span>
                        ) : (
                          <textarea
                            cols={60}
                            id="salesDepth.bt_price_strategy"
                            name="salesDepth.bt_price_strategy"
                            rows={11}
                            onKeyPress={(e) =>
                              Utils.checklen_onkeypress(e, 255)
                            }
                            className={styles.textArea}
                            onChange={(e) => contextType.text_onclick(e, 255)}
                            value={
                              contextType.state.depthOfSales.salesDepth
                                .bt_price_strategy !== null
                                ? contextType.state.depthOfSales.salesDepth
                                    .bt_price_strategy
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
                      {contextType.state.depthOfSales.salesDepth
                        .currencyname !== null ? (
                        <td
                          className={styles.fieldName}
                        >{`${contextType.state.depthOfSales.salesDepth.currencyname}s`}</td>
                      ) : (
                        <td
                          className={classnames(
                            styles.fieldName,
                            styles.redText
                          )}
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
                  <tr className={styles.bottomAlign}>
                    <td className={styles.width24} align="center" rowSpan={2}>
                      <>&nbsp;</>
                    </td>
                    <td
                      className={classnames(
                        styles.fieldName,
                        styles.nonWrap,
                        styles.width132
                      )}
                      align="center"
                    >
                      <div>
                        {Settings.enhancedDOS.annualRoomNight}
                        <br></br> {Settings.enhancedDOS.volumeRange}
                      </div>
                    </td>
                    <td
                      className={`
                      ${styles.fieldName}
                      ${styles.nonWrap}
                      ${styles.raterangalign}
                      ${styles.width132}
                      `}
                      align="center"
                    >
                      <div>{Settings.enhancedDOS.rateRange}</div>
                    </td>
                  </tr>
                </td>
              </tr>
              <tr>
                <td>
                  <tr
                    style={{
                      display: "block",
                      marginLeft: "25px",
                      marginBottom: "-6px",
                    }}
                  >
                    <td
                      className={classnames(styles.fieldName)}
                      style={{
                        width: "64px",
                        minWidth: "64px",
                        textAlign: "center",
                      }}
                    >
                      Min.
                    </td>
                    <td
                      className={classnames(styles.fieldName)}
                      style={{
                        width: "64px",
                        minWidth: "64px",
                        textAlign: "center",
                        marginLeft: "2px",
                      }}
                    >
                      Max.
                    </td>
                    <td
                      className={classnames(styles.fieldName)}
                      style={{
                        width: "64px",
                        minWidth: "64px",
                        textAlign: "center",
                        marginLeft: "2px",
                      }}
                    >
                      Min.
                    </td>
                    <td
                      className={classnames(styles.fieldName)}
                      style={{
                        width: "64px",
                        minWidth: "64px",
                        textAlign: "center",
                        marginLeft: "2px",
                      }}
                    >
                      Max.
                    </td>
                    <td
                      className={classnames(
                        styles.fieldName,
                        styles.paddingleft10
                      )}
                    >
                      {Settings.enhancedDOS.comments}
                    </td>
                  </tr>
                </td>
              </tr>
              {contextType.state.depthOfSales.salesDepth.salesdepth_ranges !==
                null &&
                contextType.state.depthOfSales.salesDepth.salesdepth_ranges.map(
                  (data, i) => {
                    const last_range_index =
                      contextType.state.depthOfSales.salesDepth
                        ?.salesdepth_ranges?.length - 1;
                    let volrmax;
                    if (
                      contextType.firstMaxRowPlusStandard === true &&
                      i == 0
                    ) {
                      volrmax = "+";
                    } else if (contextType.volrmaxChange) {
                      if (isNaN(data?.volrmax)) {
                        if (data?.volrmax === "+") {
                          volrmax = "+";
                        } else {
                          volrmax = "";
                        }
                      } else {
                        volrmax =
                          data?.volrmax === 999999 ? "+" : data?.volrmax;
                      }
                    } else {
                      if (isNaN(data?.volrmax)) {
                        if (i === 0 && data?.volrmax === "+") {
                          volrmax = "";
                        } else {
                          if (isNaN(data?.volrmax)) {
                            if (data?.volrmax === "+") {
                              volrmax = "+";
                            } else {
                              volrmax = "";
                            }
                          } else {
                            data?.volrmax;
                          }
                        }
                      } else if (data?.volrmax == 999999) {
                        if (
                          contextType.firstMaxRowPlus === false &&
                          contextType.volrmaxChange === false &&
                          i == 0
                        ) {
                          volrmax = "";
                        } else {
                          volrmax = "+";
                        }
                      } else if (data?.volrmax == null) {
                        if (i == 0) {
                          volrmax = "+";
                        } else {
                          volrmax = "";
                        }
                      } else {
                        if (i === 0 && data?.volrmax === "+") {
                          volrmax = "";
                        } else {
                          volrmax = data?.volrmax;
                        }
                      }
                    }
                    return (
                      <tr key={i}>
                        <td>
                          <table>
                            <tr
                              className={`${styles.fieldName} ${styles.hdsrowalign}`}
                            >
                              <span
                                style={{
                                  fontWeight: "bold",
                                  width: "24px",
                                  display: "inline-block",
                                }}
                              >{`(${i + 1})`}</span>
                              {contextType.state.depthOfSales
                                .GeneralReadOnly ? (
                                <td
                                  className={`${styles.rigthAlign} ${styles.colwidth}`}
                                >
                                  {data.volrmin}
                                </td>
                              ) : (
                                <td className={styles.rigthAlign}>
                                  <input
                                    id={`salesDepth.salesdepth_ranges[${i}].volrmin`}
                                    name={`salesDepth.salesdepth_ranges[${i}].volrmin`}
                                    value={
                                      isNaN(data.volrmin) ? "" : data.volrmin
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
                                <td
                                  className={`${styles.rigthAlign} ${styles.colwidth}`}
                                >
                                  {volrmax}
                                </td>
                              ) : (
                                <td className={styles.rigthAlign} key={i}>
                                  <input
                                    id={`salesDepth.salesdepth_ranges[${i}].volrmax`}
                                    name={`salesDepth.salesdepth_ranges[${i}].volrmax`}
                                    value={volrmax}
                                    className={
                                      data.readOnly && i !== 0
                                        ? classnames(
                                            styles.fieldRates,
                                            styles.silverBgColor
                                          )
                                        : i == last_range_index
                                        ? classnames(
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
                                      contextType.handleChange(e, i);
                                      contextType.setVolrmaxChange(true);
                                      contextType.setFirstMaxRowPlusStandard(
                                        false
                                      );
                                    }}
                                    title={
                                      Settings.depthOfSales.stringVolMaxTitle
                                    }
                                    onBlur={(e) =>
                                      contextType.onChangeTrigger === true &&
                                      contextType.update_vol(i, "d")
                                    }
                                    tabIndex={data.tabIndex}
                                    readOnly={data.readOnly && i !== 0}
                                    autoFocus={i === 0 ? true : false}
                                  />
                                </td>
                              )}
                              {contextType.state.depthOfSales
                                .GeneralReadOnly ? (
                                <td
                                  className={`${styles.rigthAlign} ${styles.colwidth}`}
                                >
                                  {data.ratermin}
                                </td>
                              ) : (
                                <td className={styles.rigthAlign}>
                                  <input
                                    id={`salesDepth.salesdepth_ranges[${i}].ratermin`}
                                    name={`salesDepth.salesdepth_ranges[${i}].ratermin`}
                                    value={
                                      isNaN(data.ratermin) ? "" : data.ratermin
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
                                        !contextType.NumberOnly_onkeypress(e)
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) =>
                                      contextType.onChangeTrigger === true &&
                                      contextType.update_vol(i, "a")
                                    }
                                    onChange={(e) =>
                                      contextType.handleChange(e, i)
                                    }
                                    tabIndex={i === 0 ? -1 : data.tabIndex}
                                    readOnly={i === 0 ? true : false}
                                  />
                                </td>
                              )}
                              {contextType.state.depthOfSales
                                .GeneralReadOnly ? (
                                <td
                                  className={`${styles.rigthAlign} ${styles.colwidth}`}
                                >
                                  {data.ratermax}
                                </td>
                              ) : (
                                <td className={styles.rigthAlign}>
                                  <input
                                    id={`salesDepth.salesdepth_ranges[${i}].ratermax`}
                                    name={`salesDepth.salesdepth_ranges[${i}].ratermax`}
                                    value={
                                      isNaN(data.ratermax) ? "" : data.ratermax
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
                                        !contextType.NumberOnly_onkeypress(e)
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) =>
                                      contextType.handleChange(e, i)
                                    }
                                    onBlur={(e) =>
                                      contextType.onChangeTrigger === true &&
                                      contextType.update_vol(i, "b")
                                    }
                                    tabIndex={i === 0 ? -1 : data.tabIndex}
                                    readOnly={i === 0 ? true : false}
                                  />
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
                                  {data.comments}
                                </td>
                              ) : (
                                <td className={classnames(styles.rigthAlign)}>
                                  <textarea
                                    id={`salesDepth.salesdepth_ranges[${i}].comments`}
                                    name={`salesDepth.salesdepth_ranges[${i}].comments`}
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
                                      contextType.text_onclick(e, 500)
                                    }
                                    onBlur={(e) =>
                                      contextType.text_onBlur(e, 500)
                                    }
                                    tabIndex={data.tabIndex}
                                    readOnly={data.readOnly}
                                  />
                                </td>
                              )}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    );
                  }
                )}
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
            </div>
          </React.Fragment>
        );
      }}
    </DeapthofsaleAccountContext.Consumer>
  );
}
