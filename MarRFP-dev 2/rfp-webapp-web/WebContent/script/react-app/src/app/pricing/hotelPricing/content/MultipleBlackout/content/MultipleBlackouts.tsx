import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBlackout from "./SearchBlackout";
import styles from "./MultipleBlackouts.css";
import existingStyles from "../../../../../common/assets/css/index.css";
import API from "../service/API";
import {
  MultipleBlackoutContextProvider,
  MultpleBlackoutContextConsumer,
} from "../context/multipleBlackoutContextProvider";
import { Layout } from "../../../routing/Layout";
import Settings from "../static/Settings";
import { CLoader } from "../../../../../common/components/CLoader";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

let contextType = null;
let period;
let marshaCode;
let hotelName;
let urlName;
let hotelrfpid;

export default function MultipleBlackouts() {
  const urlParms = useLocation().search;
  urlName = useLocation().pathname;
  marshaCode = new URLSearchParams(urlParms).get(Settings.MarshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.HotelName);
  period = new URLSearchParams(urlParms).get(Settings.Period);
  hotelrfpid = new URLSearchParams(urlParms).get(Settings.Hotelrfpid);
  const params = {
    marshaCode: marshaCode,
    hotelName: "",
    hotelrfpid: hotelrfpid,
    period: period,
    hotel_accountinfoid: "",
    startnum: "",
    searchtype: "A",
  };
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [blackOutAccountGroupData, setBlackOutAccountGroupData] = useState([]);

  useEffect(() => {
    contextType.setBlackoutParams(params);
    contextType.setIsLoading(true);
    appContext.setCpacLoader(true);
    API.getHotelAccountBlackout(params).then((data) => {
      contextType.setBlackoutsData(
        data.accountBlackoutGroup,
        data.numblackouts
      );
      contextType.setIsLoading(false);
      appContext.setCpacLoader(false);
    });
  }, []);

  const appContext: IApplicationContext = useContext(ApplicationContext);

  useEffect(() => {
    //const data = sessionStorage.getItem("accountBlackoutGroupArray");
    if (contextType.accountBlackoutGroup && appContext?.isDataUpdated) {
      setBlackOutAccountGroupData(contextType.accountBlackoutGroup);
    }
  }, [appContext.isDataUpdated]);

  useEffect(() => {
    return () => {
      if (contextType.blackoutDateValidation) {
        contextType.updateBlackouts();
        contextType.setBlackoutDateValidation(false);
      }
    };
  }, []);

  const onSave = () => {
    appContext.setIsDataUpdated(appContext.isDataUpdated + 1);
    contextType.setIsLoading(true);
    appContext.setCpacLoader(true);
    API.getHotelAccountBlackout(params).then((data) => {
      contextType.setBlackoutsData(
        data.accountBlackoutGroup,
        data.numblackouts
      );
      contextType.setIsLoading(false);
      appContext.setCpacLoader(false);
    });
  };

  return (
    <Layout hideButtons={true}>
      <MultipleBlackoutContextProvider>
        <MultpleBlackoutContextConsumer>
          {(multipleBlackoutContext) => {
            contextType = multipleBlackoutContext;

            return contextType.isLoading ? (
              <CLoader />
            ) : (
              <React.Fragment>
                <div className={existingStyles.zeroHeight}>
                  <div className={styles.blackoutsearch}>
                    <SearchBlackout onSave={onSave}></SearchBlackout>
                  </div>
                  <div className={styles.multipleblackouttable}>
                    {(contextType.isMakingRequest || isMakingRequest) && (
                      <CLoader />
                    )}
                    <div
                      style={{
                        height: "auto",
                        userSelect: "none",
                        width: "1009px",
                      }}
                      id="gridNode"
                      className={existingStyles.grid}
                    >
                      <div
                        style={{ width: "1009px" }}
                        className={existingStyles.gridHeader}
                        id="gridHeader"
                      >
                        <table
                          style={{ height: "32px" }}
                          className={existingStyles.gridRowTable}
                          id="gridTableHeader"
                        >
                          <tbody>
                            <tr>
                              <th
                                style={{
                                  width: "480px",
                                  minWidth: "480px;",
                                }}
                                className={existingStyles.gridCell}
                              >
                                Blackouts
                              </th>
                              <th
                                style={{ width: "50px", minWidth: "50px" }}
                                className={existingStyles.gridCell}
                              >
                                Offcycle
                              </th>
                              <th
                                style={{
                                  width: "130px",
                                  minWidth: "130px",
                                }}
                                className={existingStyles.gridCell}
                              >
                                Contract Dates
                              </th>
                              <th
                                style={{
                                  width: "330px",
                                  minWidth: "330px",
                                }}
                                className={existingStyles.gridCell}
                              >
                                Accounts
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        id="gridView"
                        className={`${existingStyles.gridView} ${styles.blackoutgridbody}`}
                      >
                        <div id="da_0">
                          <table
                            style={{ height: "25px" }}
                            className={`${existingStyles.gridRowTable} ${existingStyles.zeroHeight}`}
                            id="gridTableView"
                          >
                            <tbody>
                              {[...blackOutAccountGroupData]?.map(
                                (accountBlackout, accountIndex) => {
                                  return (
                                    <div
                                      className={styles.borderInline}
                                      style={
                                        accountIndex % 2 == 0
                                          ? {
                                              backgroundColor: "#f4f4f2",
                                            }
                                          : {
                                              backgroundColor: "white",
                                            }
                                      }
                                      key={accountIndex}
                                    >
                                      <tr
                                        id={`tr_${accountIndex.toString()}`}
                                        className={`${
                                          accountIndex === contextType.activeRow
                                            ? existingStyles.gridRowbarSelected
                                            : existingStyles.rightPanelRow
                                        }
                                        
                              ${styles.tableContent}`}
                                        onClick={() => {
                                          contextType.handleRowSelection(
                                            accountIndex
                                          );
                                        }}
                                      >
                                        <td
                                          style={{
                                            width: "478px",
                                            verticalAlign: "top",
                                          }}
                                          className={existingStyles.gridCell}
                                        >
                                          <table
                                            className={
                                              existingStyles.zeroHeight
                                            }
                                          >
                                            <tbody>
                                              {{
                                                ...accountBlackout,
                                              }?.blackouts.map(
                                                (blackout, blackoutIndex) => {
                                                  return (
                                                    <tr key={blackoutIndex}>
                                                      <td
                                                        className={
                                                          styles.fieldName
                                                        }
                                                      >
                                                        {blackout.srNo}
                                                      </td>
                                                      <td
                                                        style={{
                                                          width: "80px",
                                                        }}
                                                      >
                                                        <input
                                                          id={`startDate_${accountIndex}_${blackoutIndex}`}
                                                          name="accountBlackoutGroup[0].blackoutList[0].strStartdate"
                                                          defaultValue={
                                                            blackout.startdate
                                                          }
                                                          style={{
                                                            width: "71px",
                                                          }}
                                                          onChange={(e) => {
                                                            contextType.addBlackouts(
                                                              e.target.value,
                                                              accountIndex,
                                                              blackoutIndex,
                                                              Settings.startDate
                                                            );
                                                          }}
                                                          title="Enter the starting Blackout day in the format: mm/dd/yyyy"
                                                          onKeyPress={
                                                            contextType.validateNumberAndForwardSlash
                                                          }
                                                          onBlur={(event) =>
                                                            contextType.validateDateFormat(
                                                              event,
                                                              accountBlackout.contractStartDate,
                                                              accountBlackout.contractEndDate,
                                                              accountIndex,
                                                              Settings.startDate,
                                                              blackoutIndex
                                                            )
                                                          }
                                                        />
                                                        <input
                                                          type="hidden"
                                                          id="orig0_0start"
                                                          name="orig0_0start"
                                                          defaultValue={
                                                            blackout.startdate
                                                          }
                                                        />
                                                      </td>
                                                      <td
                                                        style={{
                                                          width: "80px",
                                                        }}
                                                      >
                                                        <input
                                                          id={`endDate_${accountIndex}_${blackoutIndex}`}
                                                          name="accountBlackoutGroup[0].blackoutList[0].strEnddate"
                                                          defaultValue={
                                                            blackout.enddate
                                                          }
                                                          style={{
                                                            width: "71px",
                                                          }}
                                                          onChange={(e) => {
                                                            contextType.addBlackouts(
                                                              e.target.value,
                                                              accountIndex,
                                                              blackoutIndex,
                                                              Settings.endDate
                                                            );
                                                          }}
                                                          title="Enter the ending Blackout day in the format: mm/dd/yyyy"
                                                          onKeyPress={
                                                            contextType.validateNumberAndForwardSlash
                                                          }
                                                          onBlur={(event) =>
                                                            contextType.validateDateFormat(
                                                              event,
                                                              accountBlackout.contractStartDate,
                                                              accountBlackout.contractEndDate,
                                                              accountIndex,
                                                              Settings.endDate,
                                                              blackoutIndex
                                                            )
                                                          }
                                                        />
                                                        <input
                                                          type="hidden"
                                                          id="orig0_0end"
                                                          name="orig0_0end"
                                                          value="01/06/2022"
                                                        />
                                                      </td>
                                                      <td
                                                        style={{
                                                          width: "310px",
                                                        }}
                                                      >
                                                        <input
                                                          id="accountBlackoutGroup[0].blackoutList[0].blackname"
                                                          name="accountBlackoutGroup[0].blackoutList[0].blackname"
                                                          defaultValue={
                                                            blackout.name
                                                          }
                                                          style={{
                                                            height: "18px",
                                                            width: "300px",
                                                          }}
                                                          title={
                                                            "Blackout " +
                                                            Number(
                                                              accountIndex + 1
                                                            ) +
                                                            " Name"
                                                          }
                                                          onChange={(e) => {
                                                            contextType.addBlackouts(
                                                              e.target.value,
                                                              accountIndex,
                                                              blackoutIndex,
                                                              "name"
                                                            );
                                                          }}
                                                          maxLength={40}
                                                        />
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                          <table
                                            className={`${styles.fieldName} ${existingStyles.zeroHeight}`}
                                          >
                                            <tbody>
                                              <tr>
                                                <td>Total days:</td>
                                                <td>
                                                  <input
                                                    id="TOTAL_BLACKOUTS_0"
                                                    name={`TOTAL_BLACKOUTS_${accountIndex}`}
                                                    style={{
                                                      backgroundColor: "silver",
                                                      height: "18px",
                                                      width: "63px",
                                                    }}
                                                    value={
                                                      accountBlackout.totalDays
                                                    }
                                                    readOnly={true}
                                                    title="Total number of blackout days"
                                                  />
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td
                                          style={{
                                            width: "50px",
                                            verticalAlign: "top",
                                            cursor: "text",
                                            userSelect: "text",
                                          }}
                                          className={existingStyles.gridCell}
                                        >
                                          {accountBlackout.offcycle &&
                                          accountBlackout.offcycle == "Y"
                                            ? "Yes"
                                            : "No"}
                                        </td>
                                        <td
                                          style={{
                                            width: "130px",
                                            verticalAlign: "top",
                                            cursor: "text",
                                            userSelect: "text",
                                          }}
                                          className={existingStyles.gridCell}
                                        >
                                          {accountBlackout.contractStartDate} -{" "}
                                          {accountBlackout.contractEndDate}
                                          <input
                                            type="hidden"
                                            id="accountBlackoutGroup[0].contractstart"
                                            name="accountBlackoutGroup[0].contractstart"
                                            value="01/01/2022"
                                          />
                                          <input
                                            type="hidden"
                                            id="accountBlackoutGroup[0].contractend"
                                            name="accountBlackoutGroup[0].contractend"
                                            value="12/31/2022"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "310px",
                                            cursor: "text",
                                            userSelect: "text",
                                          }}
                                          className={existingStyles.gridCell}
                                          valign="top"
                                        >
                                          <table
                                            style={{
                                              border: "0 px",
                                              borderCollapse: "collapse",
                                              padding: "15px",
                                            }}
                                          >
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div
                                                    style={{
                                                      width: "310px",
                                                      height: "200px",
                                                      overflow: "auto",
                                                    }}
                                                  >
                                                    <table
                                                      id="accountList_0"
                                                      className="zero-Height"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            {accountBlackout.accounts.map(
                                                              (data, i) => (
                                                                <div
                                                                  id={`div${i}`}
                                                                  key={i}
                                                                >
                                                                  {
                                                                    data.accountname
                                                                  }
                                                                </div>
                                                              )
                                                            )}

                                                            <input
                                                              type="hidden"
                                                              id="accountBlackoutGroup[0].hotelaccountlist[0].hotel_accountinfoid"
                                                              name="accountBlackoutGroup[0].hotelaccountlist[0].hotel_accountinfoid"
                                                              value="176022523"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </div>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <style>{`
                  @media only screen and (max-width: 1000px) {
                    .topmainheader{
                      padding-left: 0 !important;
                    }
                    .container{
                      width: 100%;
                    }
                  }
                `}</style>
              </React.Fragment>
            );
          }}
        </MultpleBlackoutContextConsumer>
      </MultipleBlackoutContextProvider>
    </Layout>
  );
}
