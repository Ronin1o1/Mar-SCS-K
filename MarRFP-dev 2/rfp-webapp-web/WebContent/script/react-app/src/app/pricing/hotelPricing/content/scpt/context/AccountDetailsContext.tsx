import React, { useState } from "react";
import Settings from "../data/Settings";
import Utils from "../utils/Utils";

// Setup a Global AccountDetailsContext that can be used for every component
// this will be a centralized place to set/get state
const AccountDetailsContext = React.createContext({});

export const AccountDetailsProvider = (props) => {
  const [state, setState] = useState({
    initialDetailsData: null,
    detailsData: null,
    detailsSaveData: null,
    accountTypeSaveData: null,
    accountsData: {
      selectedIndex: 0,
      accountsList: [],
      accountsCount: 40,
      accountsStart: 1,
      selectedAccountName: null,
      searchAccountList: [],
      searchAccountName: Settings.text.constant.stringEmpty,
      searchAccountId: -1,
    },
    hotelid: null,
    resetLoading: null,
    showDialog: null,
    isBrandExtendedStay: null,
    breakfastList: null,
    internetList: null,
  });

  const setDetailsData = (
    data: any,
    accountsDataList?: any,
    hotelid?: number,
    showDialog?: any,
    resetLoading?: any,
    isBrandExtendedStay?: string,
    breakfastList?: any,
    internetList?: any
  ) => {
    const accountsData = { ...state.accountsData };
    accountsData.selectedIndex = accountsDataList.selectedIndex;
    accountsData.accountsList = accountsDataList.accountsList;
    accountsData.selectedAccountName =
      accountsDataList.accountsList[accountsDataList.selectedIndex].accountname;
    accountsData.searchAccountList = [];
    accountsData.searchAccountName = Settings.text.constant.stringEmpty;
    accountsData.searchAccountId = -1;
    accountsData.accountsList.map((data) => {
      accountsData.searchAccountList.push(data);
    });

    const isExtendedStay =
      (isBrandExtendedStay
        ? isBrandExtendedStay
        : state.isBrandExtendedStay) === Settings.text.constant.stringY;

    const historyData = { gradeData: {}, rateData: [], accountsData: {} };
    const generalInfoData = { roomClassData: [], totalData: {} };
    const roomNightsData = { roomClassData: [], totalData: {} };
    const amenitiesData = { roomClassData: [], totalData: {} };
    const ratesData = { roomClassData: [], totalData: {} };
    const seasonsData = [];

    if (data) {
      historyData.gradeData = {
        common: [
          data.scptdetail[0].prevgrade,
          data.scptdetail[0].prevyear_staypatterngrade,
        ],
        dowAmount: [
          data.scptdetail[0].prevyear_rn_sun,
          data.scptdetail[0].prevyear_rn_mon,
          data.scptdetail[0].prevyear_rn_tue,
          data.scptdetail[0].prevyear_rn_wed,
          data.scptdetail[0].prevyear_rn_thu,
          data.scptdetail[0].prevyear_rn_fri,
          data.scptdetail[0].prevyear_rn_sat,
        ],
        dowPct: [
          data.scptdetail[0].prevyear_rn_sunpct,
          data.scptdetail[0].prevyear_rn_monpct,
          data.scptdetail[0].prevyear_rn_tuepct,
          data.scptdetail[0].prevyear_rn_wedpct,
          data.scptdetail[0].prevyear_rn_thupct,
          data.scptdetail[0].prevyear_rn_fripct,
          data.scptdetail[0].prevyear_rn_satpct,
        ],
        behavior: [
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].squatter_book_pct)
          ),
          data.scptdetail[0].squatter_book_grade,
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].elite_rewards_mbr_pct)
          ),
          data.scptdetail[0].elite_rewards_mbr_grade,
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].agency_compliance_pct)
          ),
          data.scptdetail[0].agency_compliance_grade,
        ],
      };

      historyData.rateData = [
        [
          Settings.text.label.accountDetails.history.rateTableRowLabels[0],
          data.scptdetail[0].prevyear_ytd_rn,
          data.scptdetail[0].twoyearprev_ytd_rn,
          data.scptdetail[0].threeyearprev_ytd_rn,
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].yoy_ytd_change_pct)
          ),
          data.scptdetail[0].yoy_ytd_change,
        ],
        [
          Settings.text.label.accountDetails.history.rateTableRowLabels[1],
          Utils.formatAmount(data.scptdetail[0].prevyear_acct_rate_net),
          Utils.formatAmount(data.scptdetail[0].twoyearprev_acct_rate_net),
          Utils.formatAmount(data.scptdetail[0].threeyearprev_acct_rate_net),
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].yoy_ytd_netchange_pct)
          ),
          Utils.formatAmount(data.scptdetail[0].yoy_ytd_netchange),
        ],
        [
          Settings.text.label.accountDetails.history.rateTableRowLabels[2],
          Utils.formatAmount(data.scptdetail[0].prevyear_wgt_retail_rate),
          Utils.formatAmount(data.scptdetail[0].twoyearprev_wgt_retail_rate),
          Utils.formatAmount(data.scptdetail[0].threeyearprev_wgt_retail_rate),
          Settings.text.constant.stringEmpty,
          Settings.text.constant.stringEmpty,
        ],
        [
          Settings.text.label.accountDetails.history.rateTableRowLabels[3],
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].prevyear_dsc_retail_pct)
          ),
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].twoyearprev_dsc_retail_pct)
          ),
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].threeyearprev_dsc_retail_pct)
          ),
          Settings.text.constant.stringEmpty,
          Settings.text.constant.stringEmpty,
        ],
        [
          Settings.text.label.accountDetails.history.rateTableRowLabels[4],
          Utils.formatAmount(data.scptdetail[0].prevyear_acct_rev_net),
          Utils.formatAmount(data.scptdetail[0].twoyearprev_acct_rev_net),
          Utils.formatAmount(data.scptdetail[0].threeyearprev_acct_rev_net),
          Utils.formatPercentValue(
            Utils.formatPercent(data.scptdetail[0].yoy_ytd_revchange_pct)
          ),
          Utils.formatAmount(data.scptdetail[0].yoy_ytd_revchange),
        ],
      ];

      historyData.accountsData = [
        Settings.text.label.accountDetails.history.accountTableRowLabels[0],
        data.scptdetail[0].prevaccepted,
        data.scptdetail[0].twoyearprevaccepted,
      ];

      if (data.seasonList) {
        data.seasonList.map((seasonData) => {
          seasonsData.push({
            seasonId: seasonData.seasonid,
            date:
              Utils.formatSeasonDates(seasonData.startdate) +
              Settings.text.constant.dashSymbol +
              Utils.formatSeasonDates(seasonData.enddate),
            tableData: {
              roomClassData: [],
              totalData: {},
            },
          });
        });
      }

      if (data.commRates) {
        data.commRates.map((rcData) => {
          if (rcData.roomtypeid < 5) {
            if (
              Utils.includeRoomClass(rcData.roomtypeid, data.scptCommSetupInfo)
            ) {
              if (rcData.tiernumber === 1) {
                generalInfoData.roomClassData.push({
                  id: rcData.roomtypeid,
                  label:
                    Settings.text.constant.roomPoolGroup +
                    Settings.text.constant.stringSpace +
                    rcData.roomtypeid,
                  salesGroup: data.accountsegment,
                  salesManager: data.salesperson,
                  dueDate: data.duedate,
                  donotprice: rcData.donotprice,
                  status: Utils.handleNull(rcData.status),
                  lra:
                    rcData.lra === Settings.text.constant.lra ||
                    Utils.isNullOrEmpty(rcData.lra)
                      ? Settings.text.constant.stringY
                      : Settings.text.constant.stringN,
                  btStatus: rcData.roompoolstatus,
                });

                amenitiesData.roomClassData.push({
                  id: rcData.roomtypeid,
                  label:
                    Settings.text.constant.roomPoolGroup +
                    Settings.text.constant.stringSpace +
                    rcData.roomtypeid,
                  breakfast: rcData.breakfastname,
                  internet: rcData.internetname,
                  transport: rcData.translocaloffice,
                  parking: rcData.parking,
                  vat: Utils.formatPercent(rcData.pctroomcosts),
                  fixedCost: Utils.formatPercent(rcData.fixedcosts),
                });

                roomNightsData.roomClassData.push({
                  id: rcData.roomtypeid,
                  label:
                    Settings.text.constant.roomPoolGroup +
                    Settings.text.constant.stringSpace +
                    rcData.roomtypeid,
                  year: Settings.text.constant.stringEmpty,
                  prevYear: Settings.text.constant.stringEmpty,
                  pctChange: Settings.text.constant.stringEmpty,
                });
              }

              if (
                (isExtendedStay && rcData.tiernumber === 5) ||
                (!isExtendedStay && rcData.tiernumber === 1)
              ) {
                const extStayWithNoPctRN =
                  isExtendedStay &&
                  (Utils.isNull(rcData.pct_annual_rn1) ||
                    rcData.pct_annual_rn1 == 0);
                ratesData.roomClassData.push({
                  id: rcData.roomtypeid,
                  label:
                    Settings.text.constant.roomPoolGroup +
                    Settings.text.constant.stringSpace +
                    rcData.roomtypeid,
                  prevYearMarRFPRate: Utils.formatAmount(rcData.prevyear_war),
                  yearMarRFPRate: Utils.formatAmount(rcData.curryear_war),
                  prevYearGrossRate: Utils.formatAmount(
                    rcData.prevyear_weightedrate
                  ),
                  yearGrossRate: Utils.formatAmount(rcData.weightedrate),
                  grossPct: Utils.formatPercent(rcData.weightedrate_chg),
                  prevYearNetRate: extStayWithNoPctRN
                    ? null
                    : Utils.formatAmount(rcData.prev_weightedratenet),
                  yearNetRate: Utils.formatAmount(rcData.weightedratenet),
                  netPct: Utils.formatPercent(rcData.weightedratenet_chg),
                  recMin: extStayWithNoPctRN
                    ? null
                    : Utils.formatAmount(rcData.rcmd_min_rate_net),
                  recMax: extStayWithNoPctRN
                    ? null
                    : Utils.formatAmount(rcData.rcmd_max_rate_net),
                  recVar: Utils.formatPercent(rcData.pct_antc_rcmd_min),
                  retailVar: Utils.formatPercent(
                    rcData.pct_accrate_weighted_retail
                  ),
                  recPct: extStayWithNoPctRN
                    ? null
                    : Utils.formatPercent(rcData.pct_prevrate_rcmd_max),
                });
              }

              seasonsData.map((seasonData) => {
                const seasonId = seasonData.seasonId;
                const tableData = seasonData.tableData;
                const roomClassData = tableData.roomClassData.find(
                  (seasonRcData) => seasonRcData.id == rcData.roomtypeid
                );

                if (roomClassData) {
                  if (
                    (isExtendedStay && rcData.tiernumber === 5) ||
                    (!isExtendedStay && rcData.tiernumber === 1)
                  ) {
                    Utils.getSeasonRoomClassData(
                      roomClassData,
                      rcData,
                      seasonId
                    );
                  } else if (
                    Utils.includeTier(rcData.tiernumber, data.scptCommSetupInfo)
                  ) {
                    roomClassData.losData.push(
                      Utils.getSeasonLOSData(rcData, seasonId)
                    );
                  }
                } else {
                  const rmClassData = {
                    id: rcData.roomtypeid,
                    label:
                      Settings.text.constant.roomPoolGroup +
                      Settings.text.constant.stringSpace +
                      rcData.roomtypeid,
                    losData: [],
                  };
                  if (
                    (isExtendedStay && rcData.tiernumber === 5) ||
                    (!isExtendedStay && rcData.tiernumber === 1)
                  ) {
                    Utils.getSeasonRoomClassData(rmClassData, rcData, seasonId);
                  } else if (
                    Utils.includeTier(rcData.tiernumber, data.scptCommSetupInfo)
                  ) {
                    rmClassData.losData.push(
                      Utils.getSeasonLOSData(rcData, seasonId)
                    );
                  }
                  tableData.roomClassData.push(rmClassData);
                }
              });
            }
          } else {
            generalInfoData.totalData = {
              id: rcData.roomtypeid,
              label: Settings.text.constant.total,
              salesGroup: data.accountsegment,
              salesManager: data.salesperson,
              dueDate: data.duedate,
              donotprice: rcData.donotprice,
              status: Utils.handleNull(rcData.status),
              lra:
                rcData.lra === Settings.text.constant.lra
                  ? Settings.text.constant.stringY
                  : Settings.text.constant.stringN,
              btStatus: rcData.roompoolstatus,
            };

            amenitiesData.totalData = {
              id: rcData.roomtypeid,
              label: Settings.text.constant.total,
              breakfast: rcData.breakfastname,
              internet: rcData.internetname,
              transport: rcData.translocaloffice,
              parking: rcData.parking,
              vat: Utils.formatPercent(rcData.pctroomcosts),
              fixedCost: Utils.formatPercent(rcData.fixedcosts),
            };

            ratesData.totalData = {
              id: rcData.roomtypeid,
              label: Settings.text.constant.total,
              prevYearMarRFPRate: Utils.formatAmount(rcData.prevyear_war),
              yearMarRFPRate: Utils.formatAmount(rcData.curryear_war),
              prevYearGrossRate: Utils.formatAmount(
                rcData.prevyear_weightedrate
              ),
              yearGrossRate: Utils.formatAmount(rcData.weightedrate),
              grossPct: Utils.formatPercent(rcData.weightedrate_chg),
              prevYearNetRate: Utils.formatAmount(rcData.prev_weightedratenet),
              yearNetRate: Utils.formatAmount(rcData.weightedratenet),
              netPct: Utils.formatPercent(rcData.weightedratenet_chg),
              recMin: Utils.formatAmount(rcData.rcmd_min_rate_net),
              recMax: Utils.formatAmount(rcData.rcmd_max_rate_net),
              recVar: Utils.formatPercent(rcData.pct_antc_rcmd_min),
              retailVar: Utils.formatPercent(
                rcData.pct_accrate_weighted_retail
              ),
              recPct: Utils.formatPercent(rcData.pct_prevrate_rcmd_max),
            };

            seasonsData.map((seasonData) => {
              const seasonId = seasonData.seasonId;

              seasonData.tableData.totalData = {
                id: rcData.roomtypeid,
                label: Settings.text.constant.total,
                yearRN:
                  rcData[
                    Settings.text.compid.accountDetails.seasons.fcst_rns +
                      seasonId
                  ],
                prevYearRN:
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .prevyear_fcst_rns + seasonId
                  ],
                rnPct: Utils.formatPercent(
                  rcData[
                    Settings.text.compid.accountDetails.seasons.pct_annual_rn +
                      seasonId
                  ]
                ),
                prevYearRate: Utils.formatAmount(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .prevyear_rate_gross + seasonId
                  ]
                ),
                yearOpenRate: Utils.formatAmount(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .open_rate_gross + seasonId
                  ]
                ),
                yearTargetRate: Utils.formatAmount(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .target_rate_gross + seasonId
                  ]
                ),
                yearFloorRate: Utils.formatAmount(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .floor_rate_gross + seasonId
                  ]
                ),
                yearMarRFPRate: Utils.formatAmount(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .prev_year_marrfp_rate + seasonId
                  ]
                ),
                ratePct: Utils.formatPercent(
                  rcData[
                    Settings.text.compid.accountDetails.seasons
                      .pct_antc_gross_chg + seasonId
                  ]
                ),
              };
            });
          }
        });
      }

      roomNightsData.totalData = {
        id: 5,
        label: Settings.text.constant.total,
        year: data.fy_fcst,
        prevYear: data.prevyear_fy_fcst,
        pctChange: Utils.formatPercent(data.chg_rn_from_ty_pct),
      };
    }

    const accountTypes = [];
    const currentType =
      Settings.text.label.accountDetails.seasons.accountTypes[data.groupid - 1];
    accountTypes.push(currentType);
    if (data.groupid == 2 || data.groupid == 3)
      accountTypes.push(
        Settings.text.label.accountDetails.seasons.accountTypes[0]
      );
    else if (
      data.accountsegment ===
      Settings.text.label.accountDetails.seasons.accountTypes[2]
    )
      accountTypes.push(
        Settings.text.label.accountDetails.seasons.accountTypes[2]
      );
    else
      accountTypes.push(
        Settings.text.label.accountDetails.seasons.accountTypes[1]
      );

    const detailsData = {
      accountid: data.scpt_accountid,
      period: data.period,
      prevPeriod: data.period - 1,
      prev2Period: data.period - 2,
      prev3Period: data.period - 3,
      accountName: data.accountname,
      salesGroup: data.accountsegment,
      scType: data.scptdetail[0].scpt_typename,
      historyData: historyData,
      generalInfoData: generalInfoData,
      roomNightsData: roomNightsData,
      amenitiesData: amenitiesData,
      ratesData: ratesData,
      seasonsData: seasonsData,
      notes: data.comments,
      showYoYComp: data.show_yoy_comp,
      yoyRetailChange: data.yoy_retail_change,
      totalMultiplier: data.scptdetail[0].total_multiplier,
      origGroupId: data.groupid,
      disableAll: false, //data.groupid == 1 ? false : true, commented for MRFP-7741 point 3 and MRFPPSSR-5792
      accountType: currentType,
      accountTypes: accountTypes,
    };

    setState({
      ...state,
      detailsData: Object.assign({}, detailsData),
      initialDetailsData: JSON.parse(JSON.stringify(detailsData)),
      detailsSaveData: {},
      accountTypeSaveData: {},
      accountsData: accountsData,
      hotelid: hotelid ? hotelid : state.hotelid,
      showDialog: showDialog ? showDialog : state.showDialog,
      resetLoading: resetLoading ? resetLoading : state.resetLoading,
      isBrandExtendedStay: isBrandExtendedStay
        ? isBrandExtendedStay
        : state.isBrandExtendedStay,
      breakfastList: breakfastList ? breakfastList : state.breakfastList,
      internetList: internetList ? internetList : state.internetList,
    });
  };

  const loadPreviousAccount = (event) => {
    const accountsData = { ...state.accountsData };
    if (accountsData.selectedIndex > 0) {
      accountsData.selectedIndex = accountsData.selectedIndex - 1;
      const selectedAccount =
        accountsData.accountsList[accountsData.selectedIndex];
      accountsData.selectedAccountName = selectedAccount.accountname;

      saveAndLoadData(selectedAccount.scpt_accountid, accountsData, true);
    }
  };

  const loadNextAccount = (event) => {
    const accountsData = { ...state.accountsData };
    if (accountsData.selectedIndex < accountsData.accountsList.length) {
      accountsData.selectedIndex = accountsData.selectedIndex + 1;
      const selectedAccount =
        accountsData.accountsList[accountsData.selectedIndex];
      accountsData.selectedAccountName = selectedAccount.accountname;

      saveAndLoadData(selectedAccount.scpt_accountid, accountsData, true);
    }
  };

  const searchAccount = (event) => {
    const accountsData = { ...state.accountsData };
    if (accountsData.searchAccountId !== -1) {
      accountsData.selectedIndex = accountsData.accountsList
        .map((data) => data.scpt_accountid)
        .indexOf(accountsData.searchAccountId);
      accountsData.selectedAccountName = accountsData.searchAccountName;

      saveAndLoadData(accountsData.searchAccountId, accountsData, true);
    }
  };

  const onSearchChange = (event) => {
    const { value } = event.target;
    const accountsData = { ...state.accountsData };
    const searchPattern = new RegExp("^" + value, "i");
    accountsData.searchAccountList = accountsData.accountsList.filter(
      (data) => {
        return searchPattern.test(data.accountname);
      }
    );
    accountsData.searchAccountName = value;
    setState({ ...state, accountsData: accountsData });
  };

  const onSearchSelect = (event) => {
    const { id } = event.target;
    const accountsData = { ...state.accountsData };
    let selectedOption;
    if (event.target.id) {
      selectedOption = accountsData.searchAccountList.find(
        (data) => data.scpt_accountid == id
      );
      accountsData.searchAccountName = selectedOption.accountname;
      accountsData.searchAccountId = selectedOption.scpt_accountid;
      accountsData.searchAccountList = [selectedOption];
    } else {
      accountsData.searchAccountId = -1;
    }
    setState({ ...state, accountsData: accountsData });
  };

  const setPrimary = () => {
    setAccountType(0);
  };

  const setSecondary = () => {
    setAccountType(1);
  };

  const setAccountType = (accountType: number) => {
    const detailsData = JSON.parse(JSON.stringify(state.initialDetailsData));
    const accountTypeSaveData = { ...state.accountTypeSaveData };

    detailsData.accountType =
      Settings.text.label.accountDetails.seasons.accountTypes[accountType];
    detailsData.disableAll = false; //accountType === 0 ? false : true;  commented for MRFP-7741 point 3
    if (detailsData.groupid == accountType - 1) {
      accountTypeSaveData.commformChg = Settings.text.constant.stringN;
    } else {
      let comacctpricingchg;
      if (accountType === 0) {
        comacctpricingchg = {
          hotelid: state.hotelid,
          scpt_accountid: detailsData.accountid,
          movetoprimary: Settings.text.constant.stringY,
        };
      } else {
        comacctpricingchg = {
          hotelid: state.hotelid,
          scpt_accountid: detailsData.accountid,
          alt_segment: detailsData.salesGroup,
          moveoutofprimary: Settings.text.constant.stringY,
        };
      }
      accountTypeSaveData.commformChg = Settings.text.constant.stringY;
      accountTypeSaveData.comacctpricingchg = [comacctpricingchg];
    }
    setState({
      ...state,
      detailsData: detailsData,
      detailsSaveData: {},
      accountTypeSaveData: accountTypeSaveData,
    });
  };

  const onChange = (event) => {
    const { id, value, checked } = event.target;
    const idTokens = id.split(Settings.text.constant.underScoreSymbol);
    const roomClassId = Utils.convertToNumber(idTokens[0]);
    const compId = idTokens[1];
    let seasonId = 0;
    if (idTokens.length >= 3) {
      seasonId = Utils.convertToNumber(idTokens[2]);
    }
    let losId = 5;
    if (idTokens.length === 4) {
      losId = Utils.convertToNumber(idTokens[3]);
    }

    const detailsData = { ...state.detailsData };
    let detailsSaveData = { ...state.detailsSaveData };

    const generalInfoData = detailsData.generalInfoData;
    const seasonsData = detailsData.seasonsData;
    const roomNightsData = detailsData.roomNightsData;
    const ratesData = detailsData.ratesData;
    const amenitiesData = detailsData.amenitiesData;

    if (!detailsSaveData.scpt_accountid) {
      detailsSaveData = {
        scpt_accountid: detailsData.accountid,
        period: detailsData.period,
        prevweightednetChg: Settings.text.constant.stringN,
        rateseasonChg: Settings.text.constant.stringN,
        fullyrntschg: Settings.text.constant.stringN,
        hotelcommChg: Settings.text.constant.stringN,
        commentsChg: Settings.text.constant.stringN,
      };
    }

    // Account Type
    if (id === Settings.text.compid.accountDetails.seasons.accountType) {
      let message;
      let okCallback;
      if (
        value === Settings.text.label.accountDetails.seasons.accountTypes[0]
      ) {
        message =
          Settings.text.confirmationMessage.accountDetails.moveToPrimary;
        okCallback = setPrimary;
      } else if (
        value === Settings.text.label.accountDetails.seasons.accountTypes[1]
      ) {
        message =
          Settings.text.confirmationMessage.accountDetails.moveToSecondary;
        okCallback = setSecondary;
      }

      if (
        value === Settings.text.label.accountDetails.seasons.accountTypes[0] ||
        value === Settings.text.label.accountDetails.seasons.accountTypes[1]
      ) {
        state.showDialog({
          type: Settings.text.label.dialog.confirmDialog,
          id: id,
          text: [message],
          okCallback: okCallback,
        });
        return;
      } else {
        setAccountType(2);
        return;
      }
    }

    // General Information
    if (
      compId === Settings.text.compid.accountDetails.generalInfo.lra ||
      compId === Settings.text.compid.accountDetails.generalInfo.donotprice ||
      compId === Settings.text.compid.accountDetails.generalInfo.status
    ) {
      let rmClassData;
      if (roomClassId == 5) {
        rmClassData = generalInfoData.totalData;
      } else {
        rmClassData = generalInfoData.roomClassData.find(
          (rcData) => rcData.id == roomClassId
        );
      }

      if (rmClassData) {
        if (compId === Settings.text.compid.accountDetails.generalInfo.status) {
          rmClassData[compId] = value;
        } else {
          rmClassData[compId] = checked
            ? Settings.text.constant.stringY
            : Settings.text.constant.stringN;
        }
      }

      Utils.setGeneralInfoAmenitiesSaveData(
        generalInfoData,
        amenitiesData,
        detailsSaveData,
        roomClassId,
        state.breakfastList,
        state.internetList,
        false
      );
    }

    // Full Year Room Nights
    if (
      compId === Settings.text.compid.accountDetails.roomNights.year ||
      compId === Settings.text.compid.accountDetails.roomNights.prevYear
    ) {
      // Set value
      const totalData = roomNightsData.totalData;
      totalData[compId] = value;

      // Calculation - Total YOY Fcst RN's % Change
      totalData.pctChange = Utils.calculatePctChange(
        totalData.year,
        totalData.prevYear,
        true
      );

      // Calculation - Season Total Fcst RN's
      seasonsData.map((seasonData) => {
        if (compId === Settings.text.compid.accountDetails.roomNights.year)
          seasonData.tableData.totalData.yearRN = Utils.calculateRoomNights(
            totalData.year,
            seasonData.tableData.totalData.rnPct
          );

        if (compId === Settings.text.compid.accountDetails.roomNights.prevYear)
          seasonData.tableData.totalData.prevYearRN = Utils.calculateRoomNights(
            totalData.prevYear,
            seasonData.tableData.totalData.rnPct
          );
      });

      // Save
      detailsSaveData.fullyrntsChg = Settings.text.constant.stringY;
      detailsSaveData.fy_fcst = Utils.convertToNumber(totalData.year);
      detailsSaveData.prevyear_fy_fcst = Utils.convertToNumber(
        totalData.prevYear
      );
      detailsSaveData.chg_rn_from_ty_pct = Utils.convertToNumber(
        totalData.pctChange
      );
    }

    // Seasons
    const seasonCompIds = Settings.text.compid.accountDetails.seasons;
    if (Object.values({ ...seasonCompIds }).includes(compId)) {
      const seasonDatails = seasonsData.find(
        (seasonData) => seasonData.seasonId == seasonId
      );

      if (seasonDatails) {
        const roomClassData = seasonDatails.tableData.roomClassData;
        const roomClassDatails = roomClassData.find(
          (rcData) => rcData.id == roomClassId
        );
        if (roomClassDatails) {
          if (losId === 5) {
            // Room Class Mode
            // Set value
            roomClassDatails[compId] = value;

            // Calculation
            if (compId === Settings.text.compid.accountDetails.seasons.rnPct) {
              roomClassDatails.yearRN = Utils.calculateRoomNights(
                roomNightsData.totalData.year,
                roomClassDatails.rnPct
              );

              roomClassDatails.prevYearRN = Utils.calculateRoomNights(
                roomNightsData.totalData.prevYear,
                roomClassDatails.rnPct
              );
            }

            if (
              compId ===
                Settings.text.compid.accountDetails.seasons.prevYearRate ||
              compId ===
                Settings.text.compid.accountDetails.yoyRateType[
                  detailsData.showYoYComp
                ]
            ) {
              roomClassDatails.ratePct = Utils.calculatePctChange(
                roomClassDatails[
                  Settings.text.compid.accountDetails.yoyRateType[
                    detailsData.showYoYComp
                  ]
                ],
                roomClassDatails.prevYearRate
              );
            }
          } else {
            // LOS Mode
            const losData = roomClassDatails.losData;
            const losDatails = losData.find((lData) => lData.losId == losId);
            if (losDatails) {
              // Set value
              losDatails[compId] = value;

              // Calculation
              if (
                compId === Settings.text.compid.accountDetails.seasons.rnPct
              ) {
                losDatails.yearRN = Utils.calculateRoomNights(
                  roomNightsData.totalData.year,
                  losDatails.rnPct
                );

                losDatails.prevYearRN = Utils.calculateRoomNights(
                  roomNightsData.totalData.prevYear,
                  losDatails.rnPct
                );
              }

              if (
                compId ===
                  Settings.text.compid.accountDetails.seasons.prevYearRate ||
                compId ===
                  Settings.text.compid.accountDetails.yoyRateType[
                    detailsData.showYoYComp
                  ]
              ) {
                losDatails.ratePct = Utils.calculatePctChange(
                  losDatails[
                    Settings.text.compid.accountDetails.yoyRateType[
                      detailsData.showYoYComp
                    ]
                  ],
                  losDatails.prevYearRate
                );
              }
            }
          }

          Utils.calculateSeasonTotals(
            seasonDatails.tableData,
            state.isBrandExtendedStay === Settings.text.constant.stringY,
            detailsData.showYoYComp
          );

          Utils.calculateRatesTotals(
            ratesData,
            seasonsData,
            amenitiesData,
            roomClassId,
            detailsData.showYoYComp,
            detailsData.yoyRetailChange,
            detailsData.totalMultiplier,
            true,
            true,
            false,
            false
          );

          // Save
          Utils.setSeasonSaveData(
            roomClassDatails,
            detailsSaveData,
            seasonId,
            roomClassId,
            losId
          );
        }
      }
    }

    //Amenities
    const ameneties = Settings.text.compid.accountDetails.amenities;
    const { selectType, inputType } = ameneties;

    if (Object.values({ ...selectType, ...inputType }).includes(compId)) {
      const roomClassData = amenitiesData.roomClassData;

      let roomClassDatails;
      if (roomClassId == 5) {
        roomClassDatails = amenitiesData.totalData;
      } else {
        roomClassDatails = roomClassData.find(
          (rcData) => rcData.id == roomClassId
        );
      }

      if (roomClassDatails) {
        if ([selectType.parking, selectType.transport].includes(compId)) {
          roomClassDatails[compId] = Utils.convertYesNoOptions(value);
        } else {
          roomClassDatails[compId] = value;
        }

        let vatCostUpdated = false;
        if (
          compId === Settings.text.compid.accountDetails.amenities.inputType.vat
        ) {
          vatCostUpdated = true;
          Utils.calculateAmenitiesTotals(amenitiesData, true, false);
        }
        if (
          compId ===
          Settings.text.compid.accountDetails.amenities.inputType.totalFixedCost
        ) {
          vatCostUpdated = true;
          Utils.calculateAmenitiesTotals(amenitiesData, false, true);
        }

        if (vatCostUpdated) {
          Utils.calculateRatesTotals(
            ratesData,
            seasonsData,
            amenitiesData,
            roomClassId,
            detailsData.showYoYComp,
            detailsData.yoyRetailChange,
            detailsData.totalMultiplier,
            true,
            false,
            true,
            false
          );
        }
      }

      Utils.setGeneralInfoAmenitiesSaveData(
        generalInfoData,
        amenitiesData,
        detailsSaveData,
        roomClassId,
        state.breakfastList,
        state.internetList,
        true
      );
    }

    //Full Year Rates
    if (compId === Settings.text.compid.accountDetails.rates.prevYearNetRate) {
      const totalData = ratesData.totalData;
      totalData[compId] = value;
      Utils.calculateRatesTotals(
        ratesData,
        seasonsData,
        amenitiesData,
        roomClassId,
        detailsData.showYoYComp,
        detailsData.yoyRetailChange,
        detailsData.totalMultiplier,
        false,
        false,
        false,
        true
      );
      detailsSaveData.prev_weightedratenet = Utils.convertToNumber(value);
      detailsSaveData.prevweightednetChg = Settings.text.constant.stringY;
    }

    // Notes
    if (id === Settings.text.compid.accountDetails.notes) {
      detailsData[id] = value;
      detailsSaveData.comments = value;
      detailsSaveData.commentsChg = Settings.text.constant.stringY;
    }

    setState({
      ...state,
      detailsData: detailsData,
      detailsSaveData: detailsSaveData,
    });
  };

  const onBlur = (event) => {};

  const onClick = (event, navToAccountPricing) => {
    const id = event.target.id;
    const detailsData = { ...state.detailsData };
    const accountsData = { ...state.accountsData };

    if (id === Settings.text.compid.common.save) {
      saveAndLoadData(detailsData.accountid, accountsData, true);
    }

    if (
      id === Settings.text.compid.accountDetails.accountDetailsFooter.saveClose
    ) {
      saveAndLoadData(
        detailsData.accountid,
        accountsData,
        false,
        navToAccountPricing
      );
    }

    if (id === Settings.text.compid.common.cancel) {
      setState({
        ...state,
        detailsData: JSON.parse(JSON.stringify(state.initialDetailsData)),
        detailsSaveData: {},
        accountTypeSaveData: {},
      });
    }
  };

  const saveAndLoadData = (
    accountId: number,
    accountsData: any,
    reload: boolean,
    navToAccountPricing?: any
  ) => {
    const detailsSaveData = { ...state.detailsSaveData };
    const accountTypeSaveData = { ...state.accountTypeSaveData };
    const saveData = Object.keys(detailsSaveData).length > 0;
    const saveAccountType =
      accountTypeSaveData.commformChg === Settings.text.constant.stringY;

    state.resetLoading(true);
    if (saveData && saveAccountType) {
      Utils.saveAccountDetailsUpdate(detailsSaveData).then((data) => {
        if (data === Settings.text.constant.success) {
          console.log("Save successful ...............................");
          Utils.saveAccountPricingUpdate(accountTypeSaveData).then((data) => {
            if (data === Settings.text.constant.success) {
              console.log("Account Type Save successful ..............");
              if (navToAccountPricing) {
                navToAccountPricing(true);
                console.log(
                  "Move to Account Pricing screen if save is successful"
                );
              } else if (reload) {
                // Reload Pricing Details screen if save is successful"
                Utils.getAccountDetailsLoadData(accountId).then((data) => {
                  console.log("Reload successful ............................");
                  setDetailsData(data, accountsData);
                  state.resetLoading(false);
                });
              }
            } else {
              state.resetLoading(false);
            }
          });
        } else {
          state.resetLoading(false);
        }
      });
    } else if (saveData) {
      Utils.saveAccountDetailsUpdate(detailsSaveData).then((data) => {
        if (data === Settings.text.constant.success) {
          console.log("Save successful ...............................");
          if (navToAccountPricing) {
            navToAccountPricing(true);
            console.log("Move to Account Pricing screen if save is successful");
          } else if (reload) {
            // Reload Pricing Details screen if save is successful"
            Utils.getAccountDetailsLoadData(accountId).then((data) => {
              console.log("Reload successful ............................");
              setDetailsData(data, accountsData);
              state.resetLoading(false);
            });
          }
        } else {
          state.resetLoading(false);
        }
      });
    } else if (saveAccountType) {
      Utils.saveAccountPricingUpdate(accountTypeSaveData).then((data) => {
        if (data === Settings.text.constant.success) {
          console.log("Account Type Save successful ..............");
          if (navToAccountPricing) {
            navToAccountPricing(true);
            console.log("Move to Account Pricing screen if save is successful");
          } else if (reload) {
            // Reload Pricing Details screen if save is successful"
            Utils.getAccountDetailsLoadData(accountId).then((data) => {
              console.log("Reload successful ............................");
              setDetailsData(data, accountsData);
              state.resetLoading(false);
            });
          }
        } else {
          state.resetLoading(false);
        }
      });
    } else {
      if (navToAccountPricing) {
        navToAccountPricing(true);
        console.log("Move to Account Pricing screen");
      } else if (reload) {
        Utils.getAccountDetailsLoadData(accountId).then((data) => {
          console.log("Reload successful ...............................");
          setDetailsData(data, accountsData);
          state.resetLoading(false);
        });
      }
    }
  };

  const onNavigateOut = () => {
    console.log("Navigating out of SCPT Account Details");
    const detailsData = { ...state.detailsData };
    const accountsData = { ...state.accountsData };
    saveAndLoadData(detailsData.accountid, accountsData, false);
    return true;
  };

  const accountDetailsContext = {
    state,
    setState,
    setDetailsData,
    loadPreviousAccount,
    loadNextAccount,
    searchAccount,
    onSearchChange,
    onSearchSelect,
    onChange,
    onBlur,
    onClick,
    saveAndLoadData,
    onNavigateOut,
  };

  return (
    <AccountDetailsContext.Provider value={accountDetailsContext}>
      {props.children}
    </AccountDetailsContext.Provider>
  );
};

export const AccountDetailsConsumer = AccountDetailsContext.Consumer;
export default AccountDetailsContext;
