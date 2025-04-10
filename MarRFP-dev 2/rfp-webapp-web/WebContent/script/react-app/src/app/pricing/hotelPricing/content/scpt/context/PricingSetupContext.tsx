import React, { useState } from "react";
import Settings from "../data/Settings";
import Utils from "../utils/Utils";

// Setup a Global PricingSetupContext that can be used for every component
// this will be a centralized place to set/get state
const PricingSetupContext = React.createContext({});

export const PricingSetupProvider = (props) => {
  const [state, setState] = useState({
    initialState: null,
    setupData: {
      brandName: null,
      breakfastList: [
        {
          breakfastname: null,
          scpt_breaktypeid: null,
        },
      ],
      checkUpdateSCPT: null,
      internetList: [
        {
          internetname: null,
          scpt_internettypeid: null,
        },
      ],
      isLocked: null,
      lastUpdatedUser: null,
      scptSetUpAmenities: {
        brkf_fcost: null,
        brkf_type: null,
        histPrevYearVat: null,
        histTwoPrevYearVat: null,
        hotelid: null,
        internet_fcost: null,
        internet_type: null,
        parking: null,
        parking_fcost: null,
        period: null,
        transport: null,
        transport_fcost: null,
        vatpercentrfoodandbeverage: null,
        vatpercentroomrate: null,
      },
      scptSetUpAmenitiesFormChg: null,
      scptSetUpBudgetAndForecastData: {
        curr_yr_adr: null,
        curr_yr_fc_adr: null,
        curr_yr_fc_revenue: null,
        curr_yr_fc_rn: null,
        curr_yr_revenue: null,
        curr_yr_rn: null,
        hotelid: null,
        period: null,
        prev_yr_adr: null,
        prev_yr_revenue: null,
        prev_yr_rn: null,
      },
      scptSetUpBudgetAndForecastFormChg: null,
      scptSetUpFormChg: null,
      scptSetUpGenInfo: {
        hotel_vat: null,
        hotelid: null,
        period: null,
        rpp_setup1: null,
        rpp_setup2: null,
        rpp_setup3: null,
        rpp_setup_total: null,
        show_yoy_comp: null,
        tier_price_tier1: null,
        tier_price_tier2: null,
        tier_price_tier3: null,
        tier_price_tier4: null,
        tier_price_total: null,
      },
      scptSetUpGenInfoFormChg: null,
      scptSetUpRetailRate: [
        {
          curr_ret_rate: null,
          hotelid: null,
          period: null,
          prev_ret_rate: null,
          seasonid: null,
        },
      ],
      scptSetUpRetailRateFormChg: null,
      scptSetUpThresholds: {
        hotelid: null,
        period: null,
        thrs_curry_rtl_low: null,
        thrs_curry_rtl_mid: null,
        thrs_percentage: null,
        thrs_perct_rtl_low: null,
        thrs_perct_rtl_mid: null,
        thrs_rmnt_low: null,
        thrs_rmnt_mid: null,
      },
      scptSetUpThresholdsFormChg: null,
      scptSetUpWtdRetailRate: {
        formattedYoy_retailrate_chg: null,
        hotelid: null,
        period: null,
        wtd_prev_retail_rate: null,
        wtd_retail_rate: null,
        yoy_retailrate_chg: null,
      },
      seasonList: [
        {
          enddate: null,
          hotelrfpid: null,
          rfpseasonid: null,
          roomNights: null,
          seasonid: null,
          startdate: null,
        },
      ],
      setuptab_last_updated: null,
      updateSCPTPricing: null,
      userRole: null,
      isBrandExtendedStay: null,
    },
    rateChanged: false,
    showDialog: null,
    breakfastList: [],
    internetList: [],
    isLocked: Settings.text.constant.stringN,
  });
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const setSetupData = (
    data: any,
    showDialog: any,
    breakfastList?: any,
    internetList?: any
  ) => {
    if (!showDialog) showDialog = state.showDialog;
    data.checkUpdateSCPT = Settings.text.constant.stringN;
    data.updateSCPTPricing = Settings.text.constant.stringN;
    data.scptSetUpFormChg = Settings.text.constant.stringN;
    data.scptSetUpGenInfoFormChg = Settings.text.constant.stringN;
    data.scptSetUpRetailRateFormChg = Settings.text.constant.stringN;
    data.scptSetUpAmenitiesFormChg = Settings.text.constant.stringN;
    data.scptSetUpThresholdsFormChg = Settings.text.constant.stringN;
    data.scptSetUpBudgetAndForecastFormChg = Settings.text.constant.stringN;
    data.checkUpdateSCPT = Settings.text.constant.stringN;

    if (data.scptSetUpGenInfo == null) data.scptSetUpGenInfo = {};
    if (Utils.isNull(data.scptSetUpGenInfo.rpp_setup1))
      data.scptSetUpGenInfo.rpp_setup1 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.rpp_setup2))
      data.scptSetUpGenInfo.rpp_setup2 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.rpp_setup3))
      data.scptSetUpGenInfo.rpp_setup3 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.tier_price_tier1))
      data.scptSetUpGenInfo.tier_price_tier1 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.tier_price_tier2))
      data.scptSetUpGenInfo.tier_price_tier2 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.tier_price_tier3))
      data.scptSetUpGenInfo.tier_price_tier3 = Settings.text.constant.stringN;
    if (Utils.isNull(data.scptSetUpGenInfo.tier_price_tier4))
      data.scptSetUpGenInfo.tier_price_tier4 = Settings.text.constant.stringN;
    if (data.seasonList == null) data.seasonList = [];
    if (data.scptSetUpWtdRetailRate == null) data.scptSetUpWtdRetailRate = {};
    if (data.scptSetUpRetailRate == null) data.scptSetUpRetailRate = [];
    if (data.scptSetUpAmenities == null) data.scptSetUpAmenities = {};
    if (data.scptSetUpThresholds == null) data.scptSetUpThresholds = {};
    if (data.scptSetUpThresholds.thrs_percentage == null)
      data.scptSetUpThresholds.thrs_percentage = Settings.text.constant.stringY;
    data.scptSetUpThresholds.thrs_perct_rtl_low = Utils.handleNullAmount(
      data.scptSetUpThresholds.thrs_perct_rtl_low
    );
    data.scptSetUpThresholds.thrs_perct_rtl_mid = Utils.handleNullAmount(
      data.scptSetUpThresholds.thrs_perct_rtl_mid
    );
    data.scptSetUpThresholds.thrs_curry_rtl_low = Utils.handleNullAmount(
      data.scptSetUpThresholds.thrs_curry_rtl_low
    );
    data.scptSetUpThresholds.thrs_curry_rtl_mid = Utils.handleNullAmount(
      data.scptSetUpThresholds.thrs_curry_rtl_mid
    );

    if (data.scptSetUpBudgetAndForecastData == null)
      data.scptSetUpBudgetAndForecastData = {};

    if (!data.wtdRetailRateData || !data.wtdRetailRateData.yoy_retailrate_chg) {
      // Recalculate weighted total and YoY Change is value is null from API
      Utils.preCalcWtdRetailRate(
        data.scptSetUpRetailRate,
        data.scptSetUpWtdRetailRate,
        data.seasonList
      );
      data.scptSetUpRetailRateFormChg = Settings.text.constant.stringY;
      data.scptSetUpFormChg = Settings.text.constant.stringY;
    }

    setState({
      ...state,
      setupData: Object.assign({}, data),
      initialState: JSON.parse(JSON.stringify(data)),
      showDialog: showDialog,
      breakfastList: breakfastList ? breakfastList : state.breakfastList,
      internetList: internetList ? internetList : state.internetList,
      isLocked: data.isLocked,
    });
  };

  const getGeneralInfoData = () => {
    const setupData = { ...state.setupData };
    const generalInfoData = setupData.scptSetUpGenInfo;
    generalInfoData.rpp_setup1 = Settings.text.constant.stringY;
    if (setupData.isBrandExtendedStay === Settings.text.constant.stringY)
      generalInfoData.tier_price_tier1 = Settings.text.constant.stringY;

    const rmClassInfo = [];
    const tierInfo = [];

    rmClassInfo.push(generalInfoData.rpp_setup1);
    rmClassInfo.push(generalInfoData.rpp_setup2);
    rmClassInfo.push(generalInfoData.rpp_setup3);

    tierInfo.push(generalInfoData.tier_price_tier1);
    tierInfo.push(generalInfoData.tier_price_tier2);
    tierInfo.push(generalInfoData.tier_price_tier3);
    tierInfo.push(generalInfoData.tier_price_tier4);

    const includeVAT = Utils.convertYNOptions(
      Utils.handleNull(generalInfoData.hotel_vat)
    );
    const yoy = Utils.handleNull(generalInfoData.show_yoy_comp);
    const yoyCompare = yoy
      ? yoy.charAt(0).toUpperCase() + yoy.slice(1)
      : Settings.text.constant.stringEmpty;
    const allDisabled =
      state.initialState &&
      state.initialState.isLocked === Settings.text.constant.stringY;

    return {
      rmClassInfo: rmClassInfo,
      tierInfo: tierInfo,
      includeVAT: includeVAT,
      yoyCompare: yoyCompare,
      allDisabled: allDisabled,
    };
  };

  const getRetailRateData = (period: number) => {
    const setupData = { ...state.setupData };
    const retailRateData = setupData.scptSetUpRetailRate;
    const wtdRetailRateData = setupData.scptSetUpWtdRetailRate;
    const seasonList = setupData.seasonList;

    const headerData = [];
    const footerData = {
      footerText: Settings.text.constant.stringEmpty,
      footerVal: Settings.text.constant.stringEmpty,
    };
    const prevYearData = {
      yearData: 0,
      seasonData: [],
      totalData: Settings.text.constant.stringEmpty,
    };
    const currYearData = {
      yearData: 0,
      seasonData: [],
      totalData: Settings.text.constant.stringEmpty,
    };

    // First column
    headerData.push(Settings.text.label.pricingSetup.retailRate.yearLabel);
    prevYearData.yearData = period - 1;
    currYearData.yearData = period;

    // Seasons column
    seasonList.map((data, index) => {
      headerData.push(
        Settings.text.label.pricingSetup.retailRate.seasonLabel +
          data.seasonid +
          Settings.text.constant.newLine +
          Utils.formatDatesTZ(data.startdate) +
          Settings.text.constant.newLine +
          Utils.formatDatesTZ(data.enddate)
      );
      if (retailRateData[index] != null) {
        prevYearData.seasonData.push(
          Utils.handleNull(retailRateData[index].prev_ret_rate)
        );
        currYearData.seasonData.push(
          Utils.handleNull(retailRateData[index].curr_ret_rate)
        );
      } else {
        prevYearData.seasonData.push(Settings.text.constant.stringEmpty);
        currYearData.seasonData.push(Settings.text.constant.stringEmpty);
      }
    });

    headerData.push(
      Settings.text.label.pricingSetup.retailRate.weightedTotalLabel
    );
    prevYearData.totalData = wtdRetailRateData.wtd_prev_retail_rate;
    currYearData.totalData = wtdRetailRateData.wtd_retail_rate;

    footerData.footerText =
      Settings.text.label.pricingSetup.retailRate.yoyChangeLabel;
    footerData.footerVal = Utils.isNullOrEmpty(
      wtdRetailRateData.yoy_retailrate_chg
    )
      ? Settings.text.constant.stringEmpty
      : wtdRetailRateData.yoy_retailrate_chg +
        Settings.text.constant.percentSymbol;

    const allDisabled =
      state.initialState &&
      state.initialState.isLocked === Settings.text.constant.stringY;
    const rowData = [prevYearData, currYearData];
    const tableData = {
      headerData: headerData,
      rowData: rowData,
      footerData: footerData,
      allDisabled: allDisabled,
    };

    return tableData;
  };

  const getAmenitiesData = (period: number) => {
    const setupData = { ...state.setupData };
    const amentiesData = setupData.scptSetUpAmenities;
    const breakfastList = state.breakfastList;
    const internetList = state.internetList;

    const brkFstInfo = [];
    const internetInfo = [];

    brkFstInfo.push(Settings.text.constant.stringEmpty);
    breakfastList.map((data, index) => {
      brkFstInfo.push(data.breakfastname);
    });

    internetInfo.push(Settings.text.constant.stringEmpty);
    internetList.map((data, index) => {
      internetInfo.push(data.internetname);
    });

    const amenitiesTypeData = [
      {
        id: Settings.text.compid.pricingSetup.amenities.breakfastInputId,
        type: Settings.text.label.pricingSetup.amenities.breakfastLabel,
        selectList: brkFstInfo,
        selectValue: Utils.handleNull(amentiesData.brkf_type),
        textValue: Utils.handleNull(amentiesData.brkf_fcost),
      },
      {
        id: Settings.text.compid.pricingSetup.amenities.internetInputId,
        type: Settings.text.label.pricingSetup.amenities.internetLabel,
        selectList: internetInfo,
        selectValue: Utils.handleNull(amentiesData.internet_type),
        textValue: Utils.handleNullAmount(amentiesData.internet_fcost),
      },
      {
        id: Settings.text.compid.pricingSetup.amenities.transportInputId,
        type: Settings.text.label.pricingSetup.amenities.transportLabel,
        selectList: Settings.text.label.pricingSetup.amenities.yesNoOptions,
        selectValue: Utils.convertYNOptions(amentiesData.transport),
        textValue: Utils.handleNull(amentiesData.transport_fcost),
      },
      {
        id: Settings.text.compid.pricingSetup.amenities.parkingInputId,
        type: Settings.text.label.pricingSetup.amenities.parkingLabel,
        selectList: Settings.text.label.pricingSetup.amenities.yesNoOptions,
        selectValue: Utils.convertYNOptions(amentiesData.parking),
        textValue: Utils.handleNull(amentiesData.parking_fcost),
      },
    ];

    const vatData = [
      {
        type: period,
        value: Utils.handleNull(amentiesData.vatpercentroomrate),
      },
      {
        type: period - 1,
        value:
          amentiesData.histPrevYearVat != null
            ? amentiesData.histPrevYearVat.toFixed(1) +
              Settings.text.constant.percentSymbol
            : Settings.text.constant.stringEmpty,
      },
      {
        type: period - 2,
        value:
          amentiesData.histTwoPrevYearVat != null
            ? amentiesData.histTwoPrevYearVat.toFixed(1) +
              Settings.text.constant.percentSymbol
            : Settings.text.constant.stringEmpty,
      },
    ];

    return { amenitiesTypeData: amenitiesTypeData, vatData: vatData };
  };

  const getThresholdData = () => {
    const setupData = { ...state.setupData };
    const thresholdData = setupData.scptSetUpThresholds;

    const tableData = [
      {
        rowid: Settings.text.compid.pricingSetup.thresholds.roomNights,
        rowval: Settings.text.label.pricingSetup.thresholds.rmNightsLabel,
        col1val: Utils.handleNull(thresholdData.thrs_rmnt_low),
        col2val: Utils.handleNull(thresholdData.thrs_rmnt_mid),
        col3val: Settings.text.label.pricingSetup.thresholds.roomsLabel,
      },
      {
        rowid: Settings.text.compid.pricingSetup.thresholds.retailRate,
        rowval: Settings.text.label.pricingSetup.thresholds.retailRateLabel,
        col1val:
          thresholdData.thrs_percentage == Settings.text.constant.stringY
            ? Utils.handleNull(thresholdData.thrs_perct_rtl_low)
            : Utils.handleNull(thresholdData.thrs_curry_rtl_low),
        col2val:
          thresholdData.thrs_percentage == Settings.text.constant.stringY
            ? Utils.handleNull(thresholdData.thrs_perct_rtl_mid)
            : Utils.handleNull(thresholdData.thrs_curry_rtl_mid),
        col3val: Utils.handleNull(thresholdData.thrs_percentage),
      },
    ];

    return tableData;
  };

  const getBudgetData = (period: number) => {
    const setupData = { ...state.setupData };
    const budgetData = setupData.scptSetUpBudgetAndForecastData;

    const tableHeader = [
      Settings.text.constant.stringEmpty,
      period - 1,
      period,
    ];
    const rowData = [
      {
        rowid: Settings.text.compid.pricingSetup.scBudgetInformation.roomNights,
        rowval:
          Settings.text.label.pricingSetup.scBudgetInformation.rmNightLabel,
        col1val: Utils.handleNull(budgetData.prev_yr_rn),
        col2val: Utils.handleNull(budgetData.curr_yr_rn),
      },
      {
        rowid: Settings.text.compid.pricingSetup.scBudgetInformation.adr,
        rowval: Settings.text.label.pricingSetup.scBudgetInformation.adrLabel,
        col1val: Utils.handleNull(budgetData.prev_yr_adr),
        col2val: Utils.handleNull(budgetData.curr_yr_adr),
      },
      {
        rowid: Settings.text.compid.pricingSetup.scBudgetInformation.revenue,
        rowval:
          Settings.text.label.pricingSetup.scBudgetInformation.revenueLabel,
        col1val: Utils.handleNull(budgetData.prev_yr_revenue),
        col2val: Utils.handleNull(budgetData.curr_yr_revenue),
      },
    ];
    const col1Id = budgetData.period - 1;
    const col2Id = budgetData.period;
    const allDisabled = false;
    const tableData = {
      tableHeader: tableHeader,
      rowData: rowData,
      col1Id: col1Id,
      col2Id: col2Id,
      allDisabled: allDisabled,
    };

    return tableData;
  };

  const setLocked = () => {
    setState({ ...state, isLocked: Settings.text.constant.stringY });
  };

  const onChange = (event) => {
    const { id, value, checked } = event.target;
    const setupData = { ...state.setupData };
    const genralInfoData = setupData.scptSetUpGenInfo;
    const retailRateData = setupData.scptSetUpRetailRate;
    const amenityData = setupData.scptSetUpAmenities;
    const thresholdData = setupData.scptSetUpThresholds;
    const budgetData = setupData.scptSetUpBudgetAndForecastData;

    if (
      id === Settings.text.compid.pricingSetup.pricingSetupHeader.stringLock
    ) {
      if (checked) {
        state.showDialog({
          type: Settings.text.label.dialog.confirmDialog,
          id: id,
          text: [
            Settings.text.confirmationMessage.pricingSetup
              .lockedConfirmationMessage,
          ],
          okCallback: setLocked,
        });
        return;
      } else {
        setState({ ...state, isLocked: Settings.text.constant.stringN });
        return;
      }
    }

    if (id.includes(Settings.text.constant.roomClassLabel)) {
      const rmClassAttr =
        Settings.text.constant.roomClassAttr +
        id.replace(
          Settings.text.constant.roomClassLabel,
          Settings.text.constant.stringEmpty
        );
      genralInfoData[rmClassAttr] = checked
        ? Settings.text.constant.stringY
        : Settings.text.constant.stringN;
      setupData.scptSetUpGenInfoFormChg = Settings.text.constant.stringY;
    }
    if (id.includes(Settings.text.constant.tierLabel)) {
      const tierAttr =
        Settings.text.constant.tierAttr +
        id.replace(
          Settings.text.constant.tierLabel,
          Settings.text.constant.stringEmpty
        );
      genralInfoData[tierAttr] = checked
        ? Settings.text.constant.stringY
        : Settings.text.constant.stringN;
      setupData.scptSetUpGenInfoFormChg = Settings.text.constant.stringY;
    }
    if (id.includes(Settings.text.constant.vatLabel)) {
      genralInfoData.hotel_vat = Utils.convertYesNoOptions(value);
      setupData.scptSetUpGenInfoFormChg = Settings.text.constant.stringY;
    }
    if (id.includes(Settings.text.constant.yoyLabel)) {
      genralInfoData.show_yoy_comp = value.toLowerCase();
      setupData.scptSetUpGenInfoFormChg = Settings.text.constant.stringY;
    }

    if (id.includes(budgetData.period - 1)) {
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.roomNights
        )
      )
        budgetData.prev_yr_rn = value;
      if (
        id.includes(Settings.text.compid.pricingSetup.scBudgetInformation.adr)
      )
        budgetData.prev_yr_adr = value;
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.revenue
        )
      )
        budgetData.prev_yr_revenue = value;
      setupData.scptSetUpBudgetAndForecastFormChg =
        Settings.text.constant.stringY;
    }

    if (id.includes(budgetData.period)) {
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.roomNights
        )
      )
        budgetData.curr_yr_rn = value;
      if (
        id.includes(Settings.text.compid.pricingSetup.scBudgetInformation.adr)
      )
        budgetData.curr_yr_adr = value;
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.revenue
        )
      )
        budgetData.curr_yr_revenue = value;
      setupData.scptSetUpBudgetAndForecastFormChg =
        Settings.text.constant.stringY;
    }

    if (id.includes(Settings.text.compid.pricingSetup.thresholds.roomNights)) {
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.low))
        thresholdData.thrs_rmnt_low = value;
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.high))
        thresholdData.thrs_rmnt_mid = value;
      setupData.scptSetUpThresholdsFormChg = Settings.text.constant.stringY;
    }

    if (id.includes(Settings.text.compid.pricingSetup.thresholds.retailRate)) {
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.low))
        thresholdData.thrs_percentage == Settings.text.constant.stringY
          ? (thresholdData.thrs_perct_rtl_low = value)
          : (thresholdData.thrs_curry_rtl_low = value);
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.high))
        thresholdData.thrs_percentage == Settings.text.constant.stringY
          ? (thresholdData.thrs_perct_rtl_mid = value)
          : (thresholdData.thrs_curry_rtl_mid = value);
      setupData.scptSetUpThresholdsFormChg = Settings.text.constant.stringY;
    }

    if (
      id ===
      Settings.text.compid.pricingSetup.thresholds.off +
        Settings.text.constant.string1
    ) {
      thresholdData.thrs_percentage = Settings.text.constant.stringY;
      setupData.scptSetUpThresholdsFormChg = Settings.text.constant.stringY;
    }
    if (
      id ===
      Settings.text.compid.pricingSetup.thresholds.off +
        Settings.text.constant.string2
    ) {
      thresholdData.thrs_percentage = Settings.text.constant.stringN;
      setupData.scptSetUpThresholdsFormChg = Settings.text.constant.stringY;
    }

    if (
      id === Settings.text.compid.pricingSetup.amenities.inputType.breakfast
    ) {
      amenityData.brkf_fcost = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }
    if (id === Settings.text.compid.pricingSetup.amenities.inputType.internet) {
      amenityData.internet_fcost = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }
    if (
      id === Settings.text.compid.pricingSetup.amenities.inputType.transport
    ) {
      amenityData.transport_fcost = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }
    if (id === Settings.text.compid.pricingSetup.amenities.inputType.parking) {
      amenityData.parking_fcost = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }

    if (
      id === Settings.text.compid.pricingSetup.amenities.selectType.breakfast
    ) {
      amenityData.brkf_type = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.brkf_type,
        amenityData.brkf_fcost,
        Settings.text.constant.stringNo,
        state.showDialog
      );
    }
    if (
      id === Settings.text.compid.pricingSetup.amenities.selectType.internet
    ) {
      amenityData.internet_type = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }
    if (
      id === Settings.text.compid.pricingSetup.amenities.selectType.transport
    ) {
      amenityData.transport = Utils.convertYesNoOptions(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.transport,
        amenityData.transport_fcost,
        Settings.text.constant.stringN,
        state.showDialog
      );
    }
    if (id === Settings.text.compid.pricingSetup.amenities.selectType.parking) {
      amenityData.parking = Utils.convertYesNoOptions(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.parking,
        amenityData.parking_fcost,
        Settings.text.constant.stringN,
        state.showDialog
      );
    }
    if (id === Settings.text.compid.pricingSetup.amenities.vatInputId) {
      amenityData.vatpercentroomrate = value;
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }

    let rateChanged = state.rateChanged;
    if (id.includes(Settings.text.compid.pricingSetup.retailRate.seasonRate)) {
      const seasonId = id.substr(id.length - 1);

      retailRateData.map((data, index) => {
        if (data.seasonid == seasonId) {
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.prevYear)
          ) {
            if (data.prev_ret_rate != value) rateChanged = true;
            data.prev_ret_rate = value;
          }
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.currYear)
          ) {
            if (data.curr_ret_rate != value) rateChanged = true;
            data.curr_ret_rate = value;
          }
        }
      });
      setupData.scptSetUpRetailRateFormChg = Settings.text.constant.stringY;
    }

    setupData.scptSetUpFormChg = Settings.text.constant.stringY;
    setState({ ...state, setupData: setupData, rateChanged: rateChanged });
  };

  const onRetailRateBlur = (event) => {
    const { id, value } = event.target;
    const setupData = { ...state.setupData };
    const retailRateData = setupData.scptSetUpRetailRate;
    const wtdRetailRateData = setupData.scptSetUpWtdRetailRate;
    const seasonList = setupData.seasonList;

    if (id.includes(Settings.text.compid.pricingSetup.retailRate.seasonRate)) {
      const seasonId = id.substr(id.length - 1);
      retailRateData.map((data) => {
        if (data.seasonid == seasonId) {
          let rateId = Settings.text.constant.stringEmpty;
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.prevYear)
          )
            rateId = Settings.text.compid.pricingSetup.retailRate.prevYearId;
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.currYear)
          )
            rateId = Settings.text.compid.pricingSetup.retailRate.currYearId;

          if (state.rateChanged) {
            const changedVal = Utils.calcWtdRetailRate(
              id,
              value,
              retailRateData,
              wtdRetailRateData,
              seasonList,
              state.showDialog
            );
            data[rateId] = Utils.convertToNumber(changedVal);
          }
        }
      });
    }

    setState({ ...state, setupData: setupData, rateChanged: false });
  };

  const onNumberFieldBlur = (event) => {
    const { id, value } = event.target;
    const setupData = { ...state.setupData };
    const retailRateData = setupData.scptSetUpRetailRate;
    const amenityData = setupData.scptSetUpAmenities;
    const thresholdData = setupData.scptSetUpThresholds;
    const budgetData = setupData.scptSetUpBudgetAndForecastData;

    if (id.includes(budgetData.period - 1)) {
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.roomNights
        )
      )
        budgetData.prev_yr_rn = Utils.convertToNumber(value);
      if (
        id.includes(Settings.text.compid.pricingSetup.scBudgetInformation.adr)
      )
        budgetData.prev_yr_adr = Utils.convertToNumber(value);
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.revenue
        )
      )
        budgetData.prev_yr_revenue = Utils.convertToNumber(value);
      setupData.scptSetUpBudgetAndForecastFormChg =
        Settings.text.constant.stringY;
    }

    if (id.includes(budgetData.period)) {
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.roomNights
        )
      )
        budgetData.curr_yr_rn = Utils.convertToNumber(value);
      if (
        id.includes(Settings.text.compid.pricingSetup.scBudgetInformation.adr)
      )
        budgetData.curr_yr_adr = Utils.convertToNumber(value);
      if (
        id.includes(
          Settings.text.compid.pricingSetup.scBudgetInformation.revenue
        )
      )
        budgetData.curr_yr_revenue = Utils.convertToNumber(value);
      setupData.scptSetUpBudgetAndForecastFormChg =
        Settings.text.constant.stringY;
    }

    if (id.includes(Settings.text.compid.pricingSetup.thresholds.roomNights)) {
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.low))
        thresholdData.thrs_rmnt_low = Utils.convertToNumber(value);
      if (id.includes(Settings.text.compid.pricingSetup.thresholds.high))
        thresholdData.thrs_rmnt_mid = Utils.convertToNumber(value);
      setupData.scptSetUpThresholdsFormChg = Settings.text.constant.stringY;
    }

    if (
      id === Settings.text.compid.pricingSetup.amenities.inputType.breakfast
    ) {
      amenityData.brkf_fcost = Utils.convertToNumber(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.brkf_type,
        amenityData.brkf_fcost,
        Settings.text.constant.stringNo,
        state.showDialog
      );
    }
    if (id === Settings.text.compid.pricingSetup.amenities.inputType.internet) {
      amenityData.internet_fcost = Utils.convertToNumber(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }
    if (
      id === Settings.text.compid.pricingSetup.amenities.inputType.transport
    ) {
      amenityData.transport_fcost = Utils.convertToNumber(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.transport,
        amenityData.transport_fcost,
        Settings.text.constant.stringN,
        state.showDialog
      );
    }
    if (id === Settings.text.compid.pricingSetup.amenities.inputType.parking) {
      amenityData.parking_fcost = Utils.convertToNumber(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
      Utils.validateAmenityNoWithCost(
        amenityData.parking,
        amenityData.parking_fcost,
        Settings.text.constant.stringN,
        state.showDialog
      );
    }
    if (id === Settings.text.compid.pricingSetup.amenities.vatInputId) {
      amenityData.vatpercentroomrate = Utils.convertToNumber(value);
      setupData.scptSetUpAmenitiesFormChg = Settings.text.constant.stringY;
    }

    let rateChanged = state.rateChanged;
    if (id.includes(Settings.text.compid.pricingSetup.retailRate.seasonRate)) {
      const seasonId = id.substr(id.length - 1);

      retailRateData.map((data, index) => {
        if (data.seasonid == seasonId) {
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.prevYear)
          ) {
            if (data.prev_ret_rate != value) rateChanged = true;
            data.prev_ret_rate = Utils.convertToNumber(value);
          }
          if (
            id.includes(Settings.text.compid.pricingSetup.retailRate.currYear)
          ) {
            if (data.curr_ret_rate != value) rateChanged = true;
            data.curr_ret_rate = Utils.convertToNumber(value);
          }
        }
      });
      setupData.scptSetUpRetailRateFormChg = Settings.text.constant.stringY;
    }

    setupData.scptSetUpFormChg = Settings.text.constant.stringY;
    setState({ ...state, setupData: setupData, rateChanged: rateChanged });
  };

  const onClick = (event, resetLoading, navToAccountPricing) => {
    const id = event.target.id;
    const setupData = { ...state.setupData };

    if (id === Settings.text.compid.pricingSetup.amenities.amenitiesId) {
      const errorMessage = Utils.handleSubmitPricingSetup(setupData);
      if (errorMessage.length > 0) {
        state.showDialog({
          type: Settings.text.label.dialog.errorDialog,
          text: errorMessage,
        });
      } else {
        state.showDialog({
          type: Settings.text.label.dialog.confirmDialog,
          id: id,
          text: [
            Settings.text.confirmationMessage.pricingSetup
              .updateAmenitiesConfirmationMessage,
          ],
          okCallback: saveData,
          resetLoading: resetLoading,
        });
      }
    }

    if (id === Settings.text.compid.pricingSetup.thresholds.thresholdsId) {
      const errorMessage = Utils.handleSubmitPricingSetup(setupData);
      if (errorMessage.length > 0) {
        state.showDialog({
          type: Settings.text.label.dialog.errorDialog,
          text: errorMessage,
        });
      } else {
        state.showDialog({
          type: Settings.text.label.dialog.confirmDialog,
          id: id,
          text: [
            Settings.text.confirmationMessage.pricingSetup
              .updateThresholdsConfirmationMessage,
          ],
          okCallback: saveData,
          resetLoading: resetLoading,
        });
      }
    }

    if (
      id === Settings.text.compid.pricingSetup.pricingSetupFooter.update ||
      id === Settings.text.compid.pricingSetup.pricingSetupFooter.updateClose
    ) {
      const errorMessage = Utils.handleSubmitPricingSetup(setupData);

      if (errorMessage.length > 0) {
        state.showDialog({
          type: Settings.text.label.dialog.errorDialog,
          text: errorMessage,
        });
      } else {
        state.showDialog({
          type: Settings.text.label.dialog.confirmDialog,
          id: id,
          text: [
            Settings.text.confirmationMessage.pricingSetup
              .updateAllConfirmationMessage,
          ],
          okCallback: saveData,
          resetLoading: resetLoading,
          navToAccountPricing: navToAccountPricing,
        });
      }
    }

    if (id === Settings.text.compid.common.cancel) {
      const setupData = JSON.parse(JSON.stringify(state.initialState));
      setState({
        ...state,
        setupData: setupData,
        isLocked: setupData.isLocked,
      });
      return;
    }

    if (id === Settings.text.compid.common.close) {
      navToAccountPricing(true);
    }

    if (id === Settings.text.compid.common.save) {
      saveWithoutValidations(resetLoading, true);
      return;
    }
  };

  const saveData = (id, resetLoading, navToAccountPricing) => {
    const setupData = { ...state.setupData };
    let saveData = false;

    if (id === Settings.text.compid.pricingSetup.amenities.amenitiesId) {
      setupData.checkUpdateSCPT = Settings.text.constant.stringA;
      setupData.updateSCPTPricing = Settings.text.constant.stringY;
      setState({ ...state, setupData: setupData });
      saveData = true;
    }

    if (id === Settings.text.compid.pricingSetup.thresholds.thresholdsId) {
      setupData.checkUpdateSCPT = Settings.text.constant.stringT;
      setupData.updateSCPTPricing = Settings.text.constant.stringY;
      setState({ ...state, setupData: setupData });
      saveData = true;
    }

    if (
      id === Settings.text.compid.pricingSetup.pricingSetupFooter.update ||
      id === Settings.text.compid.pricingSetup.pricingSetupFooter.updateClose
    ) {
      setupData.checkUpdateSCPT = Settings.text.constant.stringU;
      setupData.updateSCPTPricing = Settings.text.constant.stringY;
      setState({ ...state, setupData: setupData });
      saveData = true;
    }

    if (saveData) {
      processSaveData(setupData);
      resetLoading(true);
      setIsMakingRequest(true);
      Utils.savePricingSetupUpdate(setupData).then((data) => {
        setIsMakingRequest(false);
        if (data === Settings.text.constant.success) {
          if (
            id ===
            Settings.text.compid.pricingSetup.pricingSetupFooter.updateClose
          ) {
            resetLoading(false);
            navToAccountPricing(true);
            console.log("Move to Account Pricing screen if save is successful");
          } else {
            console.log("Save successful ...............................");
            // Reload Pricing Setup screen if save is successful"
            setIsMakingRequest(true);
            Utils.reloadPricingSetup().then((data) => {
              setIsMakingRequest(false);
              console.log("Reload successful .............................");
              setSetupData(data, state.showDialog);
              resetLoading(false);
            });
          }
        } else {
          resetLoading(false);
        }
      });
    }
  };

  const saveWithoutValidations = (resetLoading: any, reload: boolean) => {
    const setupData = { ...state.setupData };
    processSaveData(setupData);
    setupData.checkUpdateSCPT = Settings.text.constant.stringN;
    setupData.updateSCPTPricing = Settings.text.constant.stringN;
    setState({ ...state, setupData: setupData });

    resetLoading(true);
    if (reload) {
      Utils.savePricingSetupUpdate(setupData).then((data) => {
        setIsMakingRequest(false);
        if (data === Settings.text.constant.success) {
          console.log("Save without validation is successful");
          // Reload Pricing Setup screen if save is successful"
          setIsMakingRequest(true);
          Utils.reloadPricingSetup().then((data) => {
            setIsMakingRequest(false);
            console.log("Reload successful .............................");
            setSetupData(data, state.showDialog);
            resetLoading(false);
          });
        } else {
          resetLoading(false);
        }
      });
    } else {
      Utils.savePricingSetupUpdate(setupData).then((data) => {
        setIsMakingRequest(false);
        console.log("Navigate out save is ..." + data);
      });
      resetLoading(false);
      return true;
    }
  };

  const onNavigateOut = (resetLoading) => {
    return saveWithoutValidations(resetLoading, false);
  };

  const processSaveData = (setupData: any) => {
    setupData.scptSetUpThresholds.thrs_rmnt_low = Utils.formatInt(
      setupData.scptSetUpThresholds.thrs_rmnt_low
    );
    setupData.scptSetUpThresholds.thrs_rmnt_mid = Utils.formatInt(
      setupData.scptSetUpThresholds.thrs_rmnt_mid
    );
    setupData.scptSetUpBudgetAndForecastData.prev_yr_rn = Utils.formatInt(
      setupData.scptSetUpBudgetAndForecastData.prev_yr_rn
    );
    setupData.scptSetUpBudgetAndForecastData.curr_yr_rn = Utils.formatInt(
      setupData.scptSetUpBudgetAndForecastData.curr_yr_rn
    );
    setupData.scptSetUpWtdRetailRate.wtd_retail_rate = Utils.convertToNumber(
      setupData.scptSetUpWtdRetailRate.wtd_retail_rate
    );
    setupData.scptSetUpWtdRetailRate.wtd_prev_retail_rate =
      Utils.convertToNumber(
        setupData.scptSetUpWtdRetailRate.wtd_prev_retail_rate
      );
    setupData.scptSetUpWtdRetailRate.yoy_retailrate_chg = Utils.convertToNumber(
      setupData.scptSetUpWtdRetailRate.yoy_retailrate_chg
    );

    if (setupData.isLocked !== state.isLocked) {
      setupData.isLocked = state.isLocked;
      setupData.scptSetUpGenInfoFormChg = Settings.text.constant.stringY;
      setupData.scptSetUpFormChg = Settings.text.constant.stringY;
    }
  };

  const pricingSetupContext = {
    state,
    setState,
    setSetupData,
    getGeneralInfoData,
    getRetailRateData,
    getAmenitiesData,
    getThresholdData,
    getBudgetData,
    setLocked,
    onChange,
    onRetailRateBlur,
    onNumberFieldBlur,
    onClick,
    saveData,
    onNavigateOut,
    isMakingRequest,
    setIsMakingRequest,
  };

  return (
    <PricingSetupContext.Provider value={pricingSetupContext}>
      {props.children}
    </PricingSetupContext.Provider>
  );
};

export const PricingSetupConsumer = PricingSetupContext.Consumer;
export default PricingSetupContext;
