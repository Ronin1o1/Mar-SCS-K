import { isEmpty } from "lodash";
import React, { useContext, useRef } from "react";
import btnAdd2 from "../../../../../common/assets/img/button/btnAdd2.gif";
import btnAddAll2 from "../../../../../common/assets/img/button/btnAddAll2.gif";
import btnRemove2 from "../../../../../common/assets/img/button/btnRemove2.gif";
import btnRemoveAll2 from "../../../../../common/assets/img/button/btnRemoveAll2.gif";
import btnSave from "../../../../../common/assets/img/button/btnSave.gif";
import { CLoader } from "../../../../../common/components/CLoader";
import { RatesRulesWithTop } from "../../centerallyPricedAccount/content/Price/content/Rates&Rules/content/RatesRulesWithTop";
import BTGroupContext from "../context/BTGroupContextProvider";
import Settings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const btMergeData = [];

export function BTGroupWithRules() {
  const contextType = useContext(BTGroupContext);
  const mountedRef = useRef();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const convertArrayToObject = (array) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        ...item,
      };
    }, initialValue);
  };

  const handleSave = (isPagination = false, saveFlag) => {
    const btRatesData = [];
    let isRedirect = true;
    let alertMsg = null;
    if (mountedRef.current) {
      for (let step = 0; step < mountedRef.current; step++) {
        let btData: any = {};
        if (!isEmpty(contextType?.btData)) {
          btData = JSON.parse(
            localStorage.getItem(
              "ratesData_" +
                contextType?.btData?.allHotelRates[step]?.hotel_accountinfoid
            )
          );
        }
        const mountedData = JSON.parse(
          localStorage.getItem("orginalAllRatesData")
        );
        if (mountedData) {
          btData = JSON.parse(
            localStorage.getItem(
              "ratesData_" +
                mountedData?.allHotelRates[step]?.hotel_accountinfoid
            )
          );
        }
        btData?.roompoolflags?.map((item) => {
          item.hotelAccountSpecificPGOOSData?.map((innerData, i) => {
            if (
              innerData?.pgoos === "N" &&
              (innerData?.removalreason === "" ||
                innerData?.removalreason == null ||
                innerData?.removalreason === "No Reason Provided.")
            ) {
              alertMsg =
                "Please select a removal reason for Room Pool Group " +
                innerData?.roomClassSequence +
                " and Room Pool Sequence " +
                Number(i + 1);

              isRedirect = false;
              return false;
            }
          });
        });

        const dynamicRowItems = JSON.parse(
          localStorage.getItem(
            "ratesDynamicRows_" +
              mountedData?.allHotelRates[step]?.hotel_accountinfoid
          )
        );
        const accountUpdateLOS = {};
        const accountUpdateSeason = {};
        const accountSeasonSave = {};
        const accountUpdateRates = {};
        const accountUpdateFixedRates = {};
        const emptySeasonIndexCheck =
          dynamicRowItems !== null &&
          dynamicRowItems !== undefined &&
          dynamicRowItems
            .map((f, i) => {
              if (
                f.accountSeason.startdate == "" ||
                f.accountSeason.enddate == ""
              ) {
                return i;
              }
            })
            .filter((field) => !!field);

        if (emptySeasonIndexCheck.length > 0) {
          emptySeasonIndexCheck.forEach((idx) => {
            dynamicRowItems !== null &&
              dynamicRowItems !== undefined &&
              dynamicRowItems.splice(idx, 1);
          });
        }

        dynamicRowItems !== null &&
          dynamicRowItems !== undefined &&
          dynamicRowItems.slice().forEach((item, index) => {
            item.accountSeason.seasonid = index + 1;
            item.accountSeason.name = item.accountSeason.seasonid.toString();
            Object.assign(accountUpdateSeason, {
              [item.accountSeason.seasonid]: {
                ...item.accountSeason,
              },
            });
            Object.entries(item.accountLOS).forEach(([key, los], losIndex) => {
              const seasonKey = key.split("_")[0];
              const prevKey = key;
              const regex = new RegExp(seasonKey);
              key = key.replace(regex, item.accountSeason.seasonid.toString());
              item.accountLOS[key] = los;
              if (item.accountLOS[prevKey] && prevKey !== key) {
                delete item.accountLOS[prevKey];
              }
              if (
                item.accountLOS[key].hasOwnProperty("isRoomNightsFromChanged")
              ) {
                delete item.accountLOS[key].isRoomNightsFromChanged;
              }
              if (
                item.accountLOS[key].hasOwnProperty("isRoomNightsToChanged")
              ) {
                delete item.accountLOS[key].isRoomNightsToChanged;
              }
            });
            Object.assign(accountUpdateLOS, {
              ...item.accountLOS,
            });
            Object.entries(item.accountRates).forEach(
              ([key, accRates], accRatesIndex) => {
                const seasonKey = key.split("_")[0];
                const prevKey = key;
                const regex = new RegExp(seasonKey);
                key = key.replace(
                  regex,
                  item.accountSeason.seasonid.toString()
                );
                item.accountRates[key] = accRates;
                item.accountRates[key].seasonid = item.accountSeason.seasonid;
                if (item.accountRates[prevKey] && prevKey !== key) {
                  delete item.accountRates[prevKey];
                }
                if (item.accountRates[key].rate == "") {
                  item.accountRates[key].rate = null;
                }
                if (item.accountRates[key].required) {
                  delete item.accountRates[key].required;
                }
              }
            );
            Object.assign(accountUpdateRates, {
              ...item.accountRates,
            });
            Object.entries(item.fixedRates).forEach(
              ([key, fixdRates], fixdRatesIndex) => {
                const seasonKey = key.split("_")[0];
                const prevKey = key;
                const regex = new RegExp(seasonKey);
                key = key.replace(
                  regex,
                  item.accountSeason.seasonid.toString()
                );
                item.fixedRates[key] = fixdRates;
                item.fixedRates[key].seasonid = item.accountSeason.seasonid;
                if (item.fixedRates[prevKey] && prevKey !== key) {
                  delete item.fixedRates[prevKey];
                }
                if (item.fixedRates[key].rate == "") {
                  item.fixedRates[key].rate = null;
                }
              }
            );
            Object.assign(accountUpdateFixedRates, {
              ...item.fixedRates,
            });
          });

        btData.accountSeason = accountUpdateSeason;
        btData.accountLOS = accountUpdateLOS;
        btData.accountRates = accountUpdateRates;
        btData.fixedRates = accountUpdateFixedRates;

        btRatesData.push({ [btData.hotel_accountinfoid]: btData });
      }
      if (isRedirect) {
        contextType.btRatesupdateRates(
          convertArrayToObject(btRatesData),
          isPagination,
          saveFlag
        );
      }
    }
    if (!isRedirect && alertMsg) {
      alert(alertMsg);
    }
    return isRedirect;
  };
  React.useEffect(() => {
    contextType.handleGetBTData();
    return () => {
      handleSave(false, true);
    };
  }, []);

  React.useEffect(() => {
    mountedRef.current = contextType?.btData?.allHotelRates?.length;
  }, [contextType?.btData]);

  const handlePagination = (startum) => {
    if (handleSave(true, false)) {
      contextType.handleGetBTDataWithPagination(startum);
    }
  };
  React.useEffect(() => {
    contextType.setCurrentPage(contextType.btData?.startnum);
  }, [contextType.btData?.startnum]);

  const handleGetPagination = (isFooter = false) => {
    return (
      <table style={{ display: "block", height: isFooter ? "60px" : "10px" }}>
        <tbody>
          <tr>
            <td>
              <table cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    {contextType.btData?.startnum > 1 ? (
                      <>
                        <td width={60}>
                          <img
                            onClick={() => handlePagination(1)}
                            src={btnRemoveAll2}
                          />
                        </td>
                        <td width={60}>
                          <img
                            onClick={() => {
                              const contextNum =
                                contextType.btData?.startnum -
                                contextType.btData?.numIncrement;
                              let num = contextNum;
                              if (num < 0) {
                                num = 1;
                              }
                              handlePagination(num);
                            }}
                            src={btnRemove2}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td width={60}></td>
                        <td width={60}></td>
                      </>
                    )}
                    {contextType.btData?.startnum +
                      contextType.btData?.numIncrement -
                      1 <
                      contextType.btData?.totalnumber && (
                      <>
                        <td width={60}>
                          <img
                            onClick={() =>
                              handlePagination(
                                contextType.btData?.numIncrement +
                                  contextType.btData?.startnum
                              )
                            }
                            src={btnAdd2}
                            alt="Next"
                          />
                        </td>
                        <td width={60}>
                          <img
                            onClick={() =>
                              handlePagination(
                                contextType.btData?.totalnumber -
                                  contextType.btData?.numIncrement +
                                  1
                              )
                            }
                            src={btnAddAll2}
                            alt="Last"
                          />
                        </td>
                      </>
                    )}
                    {appContext.cpacLoader ? (
                      ""
                    ) : (
                      <span>
                        <td>
                          <img src={btnSave} alt="Save" onClick={handleSave} />
                        </td>
                        <td style={{ width: "40px" }} />

                        <td
                          className="field_name"
                          align="right"
                          style={{ fontWeight: "bold" }}
                        >
                          Accounts {contextType.currentPage}-
                          {contextType.btData?.startnum +
                            contextType.btData?.numIncrement -
                            1 >
                          contextType.btData?.totalnumber
                            ? contextType.btData?.totalnumber
                            : contextType.btData?.startnum +
                              contextType.btData?.numIncrement -
                              1}{" "}
                          of {contextType.btData?.totalnumber}
                        </td>
                      </span>
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <tr>
        <td height="15"></td>
      </tr>
      {handleGetPagination()}
      <tr>
        <td height="15"></td>
      </tr>
      {contextType.loader ? (
        <CLoader />
      ) : (
        contextType?.btData?.allHotelRates &&
        contextType?.btData?.allHotelRates?.map((ratesData, index) => {
          return (
            <>
              <RatesRulesWithTop
                ratesData={ratesData}
                isHideBottom={true}
                isShowAccountName={true}
                isBTGroupPage={true}
                btIndex={index}
                allHotelRatesLength={contextType?.btData?.allHotelRates?.length}
                updateBTURL={Settings.api.updateBTDta}
                btMergeData={btMergeData}
              />
              <tr style={{ height: "30px" }}>
                <td>&nbsp;</td>
              </tr>
              <hr color="rgb(0, 60, 130);" style={{ height: "2px" }}></hr>
            </>
          );
        })
      )}
      {handleGetPagination(true)}
    </>
  );
}
