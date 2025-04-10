import Moment from "moment";
import MomentTZ from "moment-timezone";
import Settings from "../data/Settings";
import API from "../service/API";
import CommonUtils from "../../../../../common/utils/Utils";

/**
 * Utils.tsx is used to hold all helper functions
 * Types of functions:
 * Validations
 * Business Logic
 */
const Utils = {
  // Common utility functions
  numberWithDecimalOnKeyPress: (e) => {
    const keyInValue = e.key;
    if (
      !(
        (keyInValue >= 0 && keyInValue <= 9) ||
        keyInValue == Settings.text.constant.dotSymbol
      )
    ) {
      e.preventDefault();
    }
    if (keyInValue == Settings.text.constant.dotSymbol) {
      const currentValue = e.target.value;
      const re = /[.]{1,}/;
      const iNumber = re.exec(currentValue);
      if (iNumber != null && keyInValue == Settings.text.constant.dotSymbol)
        e.preventDefault();
    }
  },
  isNumberWith2Decimals: (strValue: string) => {
    const re = /[.]\d{3,}/;
    const iNumber = re.exec(strValue);
    if (iNumber != null) return false;
    return true;
  },
  convertYesNoOptions: (value: string) => {
    if (value === Settings.text.constant.stringYes)
      return Settings.text.constant.stringY;
    else if (value === Settings.text.constant.stringNo)
      return Settings.text.constant.stringN;
    else return Settings.text.constant.stringEmpty;
  },
  convertYNOptions: (value: string) => {
    if (value === Settings.text.constant.stringY)
      return Settings.text.constant.stringYes;
    else if (value === Settings.text.constant.stringN)
      return Settings.text.constant.stringNo;
    else return Settings.text.constant.stringEmpty;
  },
  convertToNumber: (strValue: string) => {
    if (Utils.isNullOrEmpty(strValue)) return null;
    return parseFloat(strValue);
  },
  formatNumber: (number: any) => {
    if (number != null) {
      const nf = new Intl.NumberFormat();
      return nf.format(
        number.toString().replace(/,/g, Settings.text.constant.stringEmpty)
      );
    }
    return Settings.text.constant.stringEmpty;
  },
  formatInt: (number: any) => {
    if (!Utils.isNullOrEmpty(number)) return parseInt(number);
    return number;
  },
  formatAmount: (number: any) => {
    if (!Utils.isNullOrEmpty(number)) return parseFloat(number).toFixed(2);
    return number;
  },
  formatPercent: (number: any) => {
    if (!Utils.isNullOrEmpty(number)) {
      const retNum = parseFloat(number);
      if (
        Utils.getDecimalPrecision(retNum) === 0 ||
        Utils.getDecimalPrecision(retNum) > 2
      ) {
        return retNum.toFixed(1);
      }
      return retNum;
    }
    return number;
  },
  getDecimalPrecision: (number: number) => {
    const parts = number.toString().split(".");
    return parts[1] ? parts[1].length : 0;
  },
  formatDates: (formatDateInfo: string) => {
    if (Utils.isNullOrEmpty(formatDateInfo))
      return Settings.text.constant.stringEmpty;
    Moment.locale(Settings.text.constant.enLocale);
    return Moment(formatDateInfo).format(Settings.text.constant.dateFormat);
  },
  formatDatesTZ: (formatDateInfo: string) => {
    if (Utils.isNullOrEmpty(formatDateInfo))
      return Settings.text.constant.stringEmpty;
    MomentTZ.locale(Settings.text.constant.enLocale);
    return MomentTZ(formatDateInfo)
      .tz("America/New_York")
      .format(Settings.text.constant.dateFormat);
  },
  formatSeasonDates: (formatDateInfo: string) => {
    if (Utils.isNullOrEmpty(formatDateInfo))
      return Settings.text.constant.stringEmpty;
    Moment.locale(Settings.text.constant.enLocale);
    return MomentTZ(formatDateInfo)
      .tz("America/New_York")
      .format(Settings.text.constant.seasonDateFormat);
  },
  formatHeaderDate: (headerDateInfo: string) => {
    if (
      Utils.isNullOrEmpty(headerDateInfo) ||
      headerDateInfo === Settings.text.constant.stringSpace
    )
      return Settings.text.constant.stringEmpty;
    Moment.locale(Settings.text.constant.enLocale);
    return Moment(headerDateInfo).format(
      Settings.text.constant.timestampFormat
    );
  },
  formatPercentValue: (val: any) => {
    if (!Utils.isNullOrEmpty(val))
      return val + Settings.text.constant.percentSymbol;
    return val;
  },
  handleNull: (data: string) => {
    if (data != null && data !== undefined) return data;
    return Settings.text.constant.stringEmpty;
  },
  handleNullBoolean: (data: boolean) => {
    if (data != null && data !== undefined) return data;
    return false;
  },
  handleNullAmount: (data: any) => {
    if (data != null && data !== undefined) return data;
    return 0;
  },
  isNull: (data: any) => {
    if (data != null && data !== undefined) return false;
    return true;
  },
  isNullOrEmpty: (data: string) => {
    if (
      data != null &&
      data !== undefined &&
      data !== Settings.text.constant.stringEmpty &&
      data !== Settings.text.constant.decimalSymbol
    )
      return false;
    return true;
  },
  isCheckboxSelected: (data: string) => {
    if (data == Settings.text.constant.stringN || Utils.isNull(data))
      return false;
    return true;
  },
  validateChineseJapaneseChars: (value: string) => {
    let retVal = true;
    const REGEX_JAPANESE =
      /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
    const REGEX_CHINESE =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    let val = REGEX_JAPANESE.exec(value);
    if (val != null) retVal = false;
    val = REGEX_CHINESE.exec(value);
    if (val != null) retVal = false;
    return retVal;
  },
  validate2Decimals: (value: string) => {
    if (Number(value) * 100 === Math.floor(Number(value) * 100)) return true;
    return false;
  },
  textTruncate: (str: string) => {
    const truncate = Settings.text.constant.stringTruncate;
    const length = 25;
    if (str.length > length) {
      return str.substring(0, length - truncate.length) + truncate;
    } else {
      return str;
    }
  },
  // Pricing Setup validation functions
  handleSectionThresholdsSubmit: (data: any) => {
    const errorMessage = [];
    const roomNightsBelowHigh = data.thrs_rmnt_mid;
    const roomNightsBelowLow = data.thrs_rmnt_low;
    const retailRateHigh =
      data.thrs_percentage === Settings.text.constant.stringY
        ? data.thrs_perct_rtl_mid
        : data.thrs_curry_rtl_mid;
    const retailRateLow =
      data.thrs_percentage === Settings.text.constant.stringY
        ? data.thrs_perct_rtl_low
        : data.thrs_curry_rtl_low;

    if (Utils.isNullOrEmpty(roomNightsBelowLow))
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.roomNightsBelowLow
      );
    if (Utils.isNullOrEmpty(roomNightsBelowHigh))
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.roomNightsBelowHigh
      );
    if (roomNightsBelowHigh < roomNightsBelowLow)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.roomNightsBelowHighLess
      );
    if (
      Utils.isNullOrEmpty(retailRateHigh) &&
      Utils.isNullOrEmpty(retailRateLow)
    )
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.retailRateHighEquals
      );

    return errorMessage;
  },
  handleSubmitAmentiies: (data: any, vat: string) => {
    if (
      data.brkf_type === Settings.text.constant.stringEmpty ||
      (data.brkf_type !== Settings.text.constant.stringNo &&
        Utils.isNullOrEmpty(data.brkf_fcost)) ||
      data.internet_type === Settings.text.constant.stringEmpty ||
      data.transport === Settings.text.constant.stringEmpty ||
      (data.transport === Settings.text.constant.stringY &&
        Utils.isNullOrEmpty(data.transport_fcost)) ||
      data.parking === Settings.text.constant.stringEmpty ||
      (data.parking === Settings.text.constant.stringY &&
        Utils.isNullOrEmpty(data.parking_fcost)) ||
      (vat === Settings.text.constant.stringY &&
        Utils.isNullOrEmpty(data.vatpercentroomrate))
    )
      return false;
    else return true;
  },
  handleSubmitPricingSetup: (data: any) => {
    let genInfoCheck = true;
    let genInfoRCCheck = true;
    let genInfoTier2Check = true;
    let genInfoTier3Check = true;
    let retailCheck = true;
    let amenCheck = true;
    let thresholdsCheck = true;
    let errorMessage = [];

    if (
      !Utils.isCheckboxSelected(data.scptSetUpGenInfo.rpp_setup2) &&
      Utils.isCheckboxSelected(data.scptSetUpGenInfo.rpp_setup3)
    )
      genInfoRCCheck = false;

    if (
      !Utils.isCheckboxSelected(data.scptSetUpGenInfo.tier_price_tier2) &&
      (Utils.isCheckboxSelected(data.scptSetUpGenInfo.tier_price_tier3) ||
        Utils.isCheckboxSelected(data.scptSetUpGenInfo.tier_price_tier4))
    )
      genInfoTier2Check = false;

    if (
      !Utils.isCheckboxSelected(data.scptSetUpGenInfo.tier_price_tier3) &&
      Utils.isCheckboxSelected(data.scptSetUpGenInfo.tier_price_tier4)
    )
      genInfoTier3Check = false;

    if (
      data.scptSetUpGenInfo.hotel_vat == null ||
      data.scptSetUpGenInfo.show_yoy_comp == null
    ) {
      genInfoCheck = false;
    }

    for (const rate of data.scptSetUpRetailRate) {
      if (
        Utils.isNullOrEmpty(rate.prev_ret_rate) ||
        Utils.isNullOrEmpty(rate.curr_ret_rate)
      ) {
        retailCheck = false;
        break;
      }
    }

    amenCheck = Utils.handleSubmitAmentiies(
      data.scptSetUpAmenities,
      data.scptSetUpGenInfo.hotel_vat
    );

    const thresholdMessages = Utils.handleSectionThresholdsSubmit(
      data.scptSetUpThresholds
    );
    if (thresholdMessages.length > 0) thresholdsCheck = false;

    if (!genInfoCheck)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.generalInfoMissingError
      );

    if (!genInfoRCCheck)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.generalInfoRoomClassError
      );

    if (!genInfoTier2Check)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.generalInfoTier2Error
      );

    if (!genInfoTier3Check)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.generalInfoTier3Error
      );

    if (!retailCheck)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.retailRateMissingError
      );

    if (!amenCheck)
      errorMessage.push(
        Settings.text.validationMessage.pricingSetup.amenitiesMissingError
      );

    if (!thresholdsCheck) errorMessage = errorMessage.concat(thresholdMessages);

    return errorMessage;
  },
  isValidRate: (ratevalue: string) => {
    let bOK = true;
    let strErrorMsg = Settings.text.constant.stringEmpty;

    if (bOK) {
      if (!Utils.isNumberWith2Decimals(ratevalue)) {
        strErrorMsg =
          Settings.text.validationMessage.pricingSetup.invalidRateError;
        bOK = false;
      }
    }

    if (bOK) {
      const minNumber = 10;
      const maxNumber = 99999999;
      if (!Utils.isValidRange(ratevalue, minNumber, maxNumber))
        strErrorMsg =
          Settings.text.validationMessage.pricingSetup.invalidRateRangeError;
    }

    return strErrorMsg;
  },
  validateAmenityNoWithCost: (
    selectValue: string,
    textValue: number,
    selectNo: string,
    showDialog: any
  ) => {
    if (selectValue === selectNo && textValue != null && textValue != 0)
      showDialog({
        type: Settings.text.label.dialog.errorDialog,
        text: [
          Settings.text.confirmationMessage.pricingSetup.amenitiesNoMessage,
        ],
      });
  },
  isValidRange: (strValue: string, minNumber: number, maxNumber: number) => {
    const iNumber = Utils.convertToNumber(strValue);
    if (iNumber < minNumber || iNumber > maxNumber) return false;
    return true;
  },
  // Pricing Setup calculation functions
  calcYoYChange: (currWtd: string, prevWtd: string) => {
    if (
      currWtd === Settings.text.constant.stringEmpty ||
      prevWtd === Settings.text.constant.stringEmpty
    )
      return Settings.text.constant.stringEmpty;
    const currWtdRate = Number(currWtd);
    const prevWtdRate = Number(prevWtd);
    if (prevWtdRate === 0) return Settings.text.constant.stringEmpty;
    return Utils.convertToNumber(
      (((currWtdRate - prevWtdRate) / prevWtdRate) * 100).toFixed(2)
    );
  },
  calWtdRates: (
    bOK: boolean,
    rateId: string,
    wtdRateId: string,
    seasonList: any,
    retailRateData: any,
    wtdRetailRateData: any
  ) => {
    let rateTotal = 0;
    let rmTotal = 0;
    if (bOK) {
      seasonList.map((data, index) => {
        rateTotal = rateTotal + retailRateData[index][rateId] * data.roomNights;
        rmTotal = rmTotal + data.roomNights;
      });
      wtdRetailRateData[wtdRateId] = Utils.convertToNumber(
        (rateTotal / rmTotal).toFixed(2)
      );
      wtdRetailRateData.yoy_retailrate_chg = Utils.calcYoYChange(
        wtdRetailRateData.wtd_retail_rate,
        wtdRetailRateData.wtd_prev_retail_rate
      );
    } else {
      wtdRetailRateData[wtdRateId] = Settings.text.constant.stringEmpty;
      wtdRetailRateData.yoy_retailrate_chg = Settings.text.constant.stringEmpty;
    }
  },
  preCalcWtdRetailRate: (
    retailRateData: any,
    wtdRetailRateData: any,
    seasonList: any
  ) => {
    const rateIds = [
      Settings.text.compid.pricingSetup.retailRate.currYearId,
      Settings.text.compid.pricingSetup.retailRate.prevYearId,
    ];

    const wtdRateIds = [
      Settings.text.compid.pricingSetup.retailRate.currYearWtdId,
      Settings.text.compid.pricingSetup.retailRate.prevYearWtdId,
    ];

    rateIds.map((rateId, rateIdIndex) => {
      let bOK = true;

      retailRateData.map((data) => {
        if (!data[rateId]) {
          bOK = false;
        }
      });
      Utils.calWtdRates(
        bOK,
        rateId,
        wtdRateIds[rateIdIndex],
        seasonList,
        retailRateData,
        wtdRetailRateData
      );
    });
  },
  calcWtdRetailRate: (
    id: string,
    value: string,
    retailRateData: any,
    wtdRetailRateData: any,
    seasonList: any,
    showDialog: any
  ) => {
    let changedVal = Settings.text.constant.stringEmpty;
    let bOK = true;
    let rateId = Settings.text.constant.stringEmpty;
    let wtdRateId = Settings.text.constant.stringEmpty;

    if (id.includes(Settings.text.compid.pricingSetup.retailRate.prevYear)) {
      rateId = Settings.text.compid.pricingSetup.retailRate.prevYearId;
      wtdRateId = Settings.text.compid.pricingSetup.retailRate.prevYearWtdId;
    }
    if (id.includes(Settings.text.compid.pricingSetup.retailRate.currYear)) {
      rateId = Settings.text.compid.pricingSetup.retailRate.currYearId;
      wtdRateId = Settings.text.compid.pricingSetup.retailRate.currYearWtdId;
    }

    retailRateData.map((data, index) => {
      if (Utils.isNullOrEmpty(data[rateId])) {
        bOK = false;
        changedVal = value;
      } else {
        const errorMsg = Utils.isValidRate(data[rateId]);
        if (errorMsg != Settings.text.constant.stringEmpty) {
          showDialog({
            type: Settings.text.label.dialog.errorDialog,
            text: [errorMsg],
          });
          bOK = false;
        }
      }
    });

    Utils.calWtdRates(
      bOK,
      rateId,
      wtdRateId,
      seasonList,
      retailRateData,
      wtdRetailRateData
    );

    if (bOK) {
      changedVal = value;
    }

    return changedVal;
  },
  // Account Pricing utility functions
  updateAccountPricingData: (
    hotelId: number,
    loadData: any,
    saveData: any,
    accountId: number,
    loadAttr: string,
    updateAttr: string,
    updateVal: string
  ) => {
    const updatedAccount = loadData.find((data) => {
      return data.scpt_accountid == accountId;
    });
    if (updatedAccount) {
      updatedAccount[loadAttr] = updateVal;
    }
    if (saveData) {
      const accountToSave = saveData.find((data) => {
        return data.scpt_accountid == accountId;
      });
      if (accountToSave) {
        accountToSave[updateAttr] = updateVal;
      } else {
        saveData.push({
          hotelId: hotelId,
          scpt_accountid: accountId,
          [updateAttr]: updateVal,
        });
      }
    }
  },
  updateBulkAccountPricingData: (
    hotelId: number,
    loadData: any,
    saveData: any,
    statusCheck: boolean,
    loadAttr: string,
    updateAttr: string,
    updateVal: string
  ) => {
    let anyUpdates = false;
    loadData.map((data) => {
      if (data.selected && (!statusCheck || !data.bt_status)) {
        anyUpdates = true;
        data[loadAttr] = updateVal;
        if (saveData) {
          const accountToSave = saveData.find((saveData) => {
            return saveData.scpt_accountid == data.scpt_accountid;
          });
          if (accountToSave) {
            accountToSave[updateAttr] = updateVal;
          } else {
            saveData.push({
              hotelId: hotelId,
              scpt_accountid: data.scpt_accountid,
              [updateAttr]: updateVal,
            });
          }
        }
      }
    });

    return anyUpdates;
  },
  updateBulkMoveAccountsData: (
    hotelId: number,
    loadData: any,
    saveData: any,
    updateAttr: string
  ) => {
    let anyUpdates = false;
    loadData.map((data) => {
      if (data.selected) {
        anyUpdates = true;
        saveData.push({
          hotelId: hotelId,
          scpt_accountid: data.scpt_accountid,
          alt_segment: data.accountsegment,
          [updateAttr]: Settings.text.constant.stringY,
        });
      }
    });

    return anyUpdates;
  },
  updateBulkHideAccountsData: (loadData: any, saveData: any) => {
    let anyUpdates = false;
    loadData.map((data) => {
      if (data.selected) {
        anyUpdates = true;
        saveData.push({
          scpt_accountid: data.scpt_accountid,
          chg: Settings.text.constant.stringY,
          isscaccount: Settings.text.constant.stringN,
        });
      }
    });

    return anyUpdates;
  },
  updateUnhideAccountsData: (
    selectedAccount: any,
    saveData: any,
    selected: boolean
  ) => {
    if (selected) {
      selectedAccount.selected = Settings.text.constant.stringY;
      saveData.push({
        scpt_accountid: selectedAccount.scpt_accountid,
        hotelid: selectedAccount.hotelid,
        period: selectedAccount.period,
        isscaccount: Settings.text.constant.stringY,
        chg: Settings.text.constant.stringY,
        status: selectedAccount.bt_status,
      });
    } else {
      selectedAccount.selected = Settings.text.constant.stringN;
      saveData = saveData.filter((data) => {
        return data.scpt_accountid != selectedAccount.scpt_accountid;
      });
    }

    return saveData;
  },
  hasPricingDataChanged: (saveData: any) => {
    let anyUpdates = false;
    if (saveData.comacctpricingchg.length > 0) {
      saveData.commformChg = Settings.text.constant.stringY;
      anyUpdates = true;
    }
    return anyUpdates;
  },
  areAccountsHidden: (hiddenData: any) => {
    let anyHidden = false;
    if (hiddenData.length > 0) {
      anyHidden = true;
    }
    return anyHidden;
  },
  getBTAccountFilter: (searchStr: string) => {
    let filter;
    if (searchStr && searchStr.length == 1)
      filter = searchStr + Settings.text.constant.astrickSymbol;
    else filter = searchStr;
    return filter;
  },
  // Account Details calculation functions
  calculateSum: (totalVal: number, val: number) => {
    if (!Utils.isNull(val)) {
      if (Utils.isNull(totalVal)) {
        totalVal = val;
      } else {
        totalVal += val;
      }
    }
    return totalVal;
  },
  calculateProduct: (val1: number, val2: number) => {
    if (Utils.isNull(val1) || Utils.isNull(val2)) return null;
    else return val1 * val2;
  },
  calculatePctChange: (
    rate: string,
    prevRate: string,
    formatAsAmount?: boolean
  ) => {
    const rateNum = Utils.convertToNumber(rate);
    const prevRateNum = Utils.convertToNumber(prevRate);
    if (
      Utils.isNullOrEmpty(rate) ||
      Utils.isNullOrEmpty(prevRate) ||
      prevRateNum === 0
    ) {
      return null;
    } else {
      const pct = ((rateNum - prevRateNum) / prevRateNum) * 100;
      if (formatAsAmount) return Utils.formatAmount(pct);
      else return Utils.formatPercent(pct);
    }
  },
  calculateRoomNights: (fcstRoom: string, pctRN: string) => {
    if (Utils.isNullOrEmpty(fcstRoom) || Utils.isNullOrEmpty(pctRN)) {
      return null;
    } else {
      const fcstRoomNum = Utils.convertToNumber(fcstRoom);
      const pctRNNum = Utils.convertToNumber(pctRN);
      return (fcstRoomNum * (pctRNNum / 100)).toFixed(0);
    }
  },
  calculateWtdAverage: (num: number, den: number) => {
    if (Utils.isNull(num) || Utils.isNull(den)) return null;
    return den === 0 ? null : (num / den).toFixed(2);
  },
  calculateNetRate: (rate: number, cost: number, vat: number) => {
    if (rate && rate !== 0) {
      return (
        (rate - Utils.handleNullAmount(cost)) /
        (1 + Utils.handleNullAmount(vat) / 100)
      ).toFixed(2);
    }
    return null;
  },
  calculateSeasonTotals: (
    seasonData: any,
    losMode: boolean,
    yoyCompType: string
  ) => {
    let totalYearRN;
    let totalPrevYearRN;
    let totalRNPct;
    let totalPrevYearRate;
    let totalYearOpenRate;
    let totalYearTargetRate;
    let totalYearFloorRate;
    let totalYearRate;
    seasonData.roomClassData.map((rcData) => {
      if (losMode) {
        let rcYearRN;
        let rcPrevYearRN;
        let rcRNPct;
        let rcPrevYearRate;
        let rcYearOpenRate;
        let rcYearTagetRate;
        let rcYearFloorRate;
        let rcYearRate;
        rcData.losData.map((losData) => {
          const yearRN = Utils.convertToNumber(losData.yearRN);
          const prevYearRN = Utils.convertToNumber(losData.prevYearRN);
          const rnPct = Utils.convertToNumber(losData.rnPct);
          const prevYearRate = Utils.convertToNumber(losData.prevYearRate);
          const openRate = Utils.convertToNumber(losData.yearOpenRate);
          const targetRate = Utils.convertToNumber(losData.yearTargetRate);
          const floorRate = Utils.convertToNumber(losData.yearFloorRate);
          const yearRate = Utils.convertToNumber(
            losData[
              Settings.text.compid.accountDetails.yoyRateType[yoyCompType]
            ]
          );
          rcYearRN = Utils.calculateSum(rcYearRN, yearRN);
          rcPrevYearRN = Utils.calculateSum(rcPrevYearRN, prevYearRN);
          rcRNPct = Utils.calculateSum(rcRNPct, rnPct);
          rcPrevYearRate = Utils.calculateSum(
            rcPrevYearRate,
            Utils.calculateProduct(prevYearRate, prevYearRN)
          );
          rcYearOpenRate = Utils.calculateSum(
            rcYearOpenRate,
            Utils.calculateProduct(openRate, yearRN)
          );
          rcYearTagetRate = Utils.calculateSum(
            rcYearTagetRate,
            Utils.calculateProduct(targetRate, yearRN)
          );
          rcYearFloorRate = Utils.calculateSum(
            rcYearFloorRate,
            Utils.calculateProduct(floorRate, yearRN)
          );
          rcYearRate = Utils.calculateSum(
            rcYearRate,
            Utils.calculateProduct(yearRate, yearRN)
          );
        });
        Utils.setSeasonCalcData(
          rcData,
          rcYearRN,
          rcPrevYearRN,
          rcRNPct,
          rcPrevYearRate,
          rcYearOpenRate,
          rcYearTagetRate,
          rcYearFloorRate,
          rcYearRate,
          yoyCompType
        );
      }
      const yearRN = Utils.convertToNumber(rcData.yearRN);
      const prevYearRN = Utils.convertToNumber(rcData.prevYearRN);
      const rnPct = Utils.convertToNumber(rcData.rnPct);
      const prevYearRate = Utils.convertToNumber(rcData.prevYearRate);
      const openRate = Utils.convertToNumber(rcData.yearOpenRate);
      const targetRate = Utils.convertToNumber(rcData.yearTargetRate);
      const floorRate = Utils.convertToNumber(rcData.yearFloorRate);
      const yearRate = Utils.convertToNumber(
        rcData[Settings.text.compid.accountDetails.yoyRateType[yoyCompType]]
      );

      totalYearRN = Utils.calculateSum(totalYearRN, yearRN);
      totalPrevYearRN = Utils.calculateSum(totalPrevYearRN, prevYearRN);
      totalRNPct = Utils.calculateSum(totalRNPct, rnPct);
      totalPrevYearRate = Utils.calculateSum(
        totalPrevYearRate,
        Utils.calculateProduct(prevYearRate, prevYearRN)
      );
      totalYearOpenRate = Utils.calculateSum(
        totalYearOpenRate,
        Utils.calculateProduct(openRate, yearRN)
      );
      totalYearTargetRate = Utils.calculateSum(
        totalYearTargetRate,
        Utils.calculateProduct(targetRate, yearRN)
      );
      totalYearFloorRate = Utils.calculateSum(
        totalYearFloorRate,
        Utils.calculateProduct(floorRate, yearRN)
      );
      totalYearRate = Utils.calculateSum(
        totalYearRate,
        Utils.calculateProduct(yearRate, yearRN)
      );
    });
    Utils.setSeasonCalcData(
      seasonData.totalData,
      totalYearRN,
      totalPrevYearRN,
      totalRNPct,
      totalPrevYearRate,
      totalYearOpenRate,
      totalYearTargetRate,
      totalYearFloorRate,
      totalYearRate,
      yoyCompType
    );
  },
  calculateRatesTotals: (
    ratesData: any,
    seasonData: any,
    amenitiesData: any,
    roomClassId: number,
    yoyCompType: string,
    yoyRetailChange: number,
    totalMultiplier: number,
    calcRoomClass: boolean,
    seasonsUpdate: boolean,
    amenitiesUpdate: boolean,
    ratesUpdate: boolean
  ) => {
    let rcYearRN = 0;
    let rcPrevYearRN = 0;
    let rcPrevYearRate = 0;
    let rcYearRate = 0;

    let totalYearRN = 0;
    let totalPrevYearRN = 0;
    let totalPrevYearRate = 0;
    let totalYearRate = 0;

    seasonData.map((sData) => {
      const rcSeasonData = sData.tableData.roomClassData.find(
        (rc) => rc.id == roomClassId
      );

      const totalSeasonData = sData.tableData.totalData;

      if (calcRoomClass) {
        const rYearRN = Utils.convertToNumber(rcSeasonData.yearRN);
        const rPrevYearRN = Utils.convertToNumber(rcSeasonData.prevYearRN);
        const rPrevYearRate = Utils.convertToNumber(rcSeasonData.prevYearRate);
        const rYearRate = Utils.convertToNumber(
          rcSeasonData[
            Settings.text.compid.accountDetails.yoyRateType[yoyCompType]
          ]
        );
        rcYearRN = Utils.calculateSum(rcYearRN, rYearRN);
        rcPrevYearRN = Utils.calculateSum(rcPrevYearRN, rPrevYearRN);
        rcPrevYearRate = Utils.calculateSum(
          rcPrevYearRate,
          Utils.calculateProduct(rPrevYearRate, rPrevYearRN)
        );
        rcYearRate = Utils.calculateSum(
          rcYearRate,
          Utils.calculateProduct(rYearRate, rYearRN)
        );
      }

      const tYearRN = Utils.convertToNumber(totalSeasonData.yearRN);
      const tPrevYearRN = Utils.convertToNumber(totalSeasonData.prevYearRN);
      const tPrevYearRate = Utils.convertToNumber(totalSeasonData.prevYearRate);
      const tYearRate = Utils.convertToNumber(
        totalSeasonData[
          Settings.text.compid.accountDetails.yoyRateType[yoyCompType]
        ]
      );
      totalYearRN = Utils.calculateSum(totalYearRN, tYearRN);
      totalPrevYearRN = Utils.calculateSum(totalPrevYearRN, tPrevYearRN);
      totalPrevYearRate = Utils.calculateSum(
        totalPrevYearRate,
        Utils.calculateProduct(tPrevYearRate, tPrevYearRN)
      );
      totalYearRate = Utils.calculateSum(
        totalYearRate,
        Utils.calculateProduct(tYearRate, tYearRN)
      );
    });

    if (calcRoomClass) {
      const rcRatesData = ratesData.roomClassData.find(
        (rc) => rc.id == roomClassId
      );
      const rcAmenitiesData = amenitiesData.roomClassData.find(
        (rc) => rc.id == roomClassId
      );

      if (seasonsUpdate) {
        // Room Class {period - 1} Weighted (Gross)
        rcRatesData.prevYearGrossRate = Utils.calculateWtdAverage(
          rcPrevYearRate,
          rcPrevYearRN
        );
        // Room Class {period} Weighted (Gross)
        rcRatesData.yearGrossRate = Utils.calculateWtdAverage(
          rcYearRate,
          rcYearRN
        );
        // Room Class YOY Wtd % Change
        rcRatesData.grossPct = Utils.calculatePctChange(
          rcRatesData.yearGrossRate,
          rcRatesData.prevYearGrossRate
        );
      }

      if (seasonsUpdate || amenitiesUpdate) {
        // Room Class {period} Weighted (Net)
        rcRatesData.yearNetRate = Utils.calculateNetRate(
          rcRatesData.yearGrossRate,
          rcAmenitiesData.fixedCost,
          rcAmenitiesData.vat
        );
      }
      // Room Class YOY Wtd % Change (Net)
      rcRatesData.netPct = Utils.calculatePctChange(
        rcRatesData.yearNetRate,
        rcRatesData.prevYearNetRate
      );
    }

    const totalRatesData = ratesData.totalData;
    const totalAmenitiesData = amenitiesData.totalData;
    // Total {period - 1} Weighted (Gross)
    if (seasonsUpdate) {
      totalRatesData.prevYearGrossRate = Utils.calculateWtdAverage(
        totalPrevYearRate,
        totalPrevYearRN
      );
      // Total {period} Weighted (Gross)
      totalRatesData.yearGrossRate = Utils.calculateWtdAverage(
        totalYearRate,
        totalYearRN
      );
      // Total YOY Wtd % Change
      totalRatesData.grossPct = Utils.calculatePctChange(
        totalRatesData.yearGrossRate,
        totalRatesData.prevYearGrossRate
      );
    }
    if (seasonsUpdate || amenitiesUpdate) {
      //Total {period} Weighted (Net)
      totalRatesData.yearNetRate = Utils.calculateNetRate(
        totalRatesData.yearGrossRate,
        totalAmenitiesData.fixedCost,
        totalAmenitiesData.vat
      );
    }
    // Total YOY Wtd % Change (Net)
    totalRatesData.netPct = Utils.calculatePctChange(
      totalRatesData.yearNetRate,
      totalRatesData.prevYearNetRate
    );
    if (ratesUpdate) {
      // Total {period} Rec Minimum (Net)
      if (
        !Utils.isNullOrEmpty(totalRatesData.prevYearNetRate) &&
        yoyRetailChange
      )
        totalRatesData.recMin = (
          totalRatesData.prevYearNetRate *
          (1 + yoyRetailChange / 100)
        ).toFixed(2);
      // Total {period} Rec Target (Net)
      if (totalRatesData.recMin && totalMultiplier)
        totalRatesData.recMax = (
          totalRatesData.recMin *
          (1 + totalMultiplier)
        ).toFixed(2);
      // Total {period} % Var. Antic To Rec Min
      totalRatesData.recVar = Utils.calculatePctChange(
        totalRatesData.yearNetRate,
        totalRatesData.recMin
      );
      // Total Rec % Change
      if (
        totalRatesData.recMax &&
        !Utils.isNullOrEmpty(totalRatesData.prevYearNetRate) &&
        totalRatesData.prevYearNetRate != 0
      )
        totalRatesData.recPct = (
          (totalRatesData.recMax / totalRatesData.prevYearNetRate - 1) *
          100
        ).toFixed(1);
    }
  },
  calculateAmenitiesTotals: (
    amenitiesData: any,
    updateVat: boolean,
    updateCost: boolean
  ) => {
    let vatRoom = 0;
    let fixedCost = 0;
    let numRCVat = 0;
    let numRCCost = 0;
    amenitiesData.roomClassData.map((rcData) => {
      if (rcData.vat) numRCVat++;
      if (rcData.fixedCost) numRCCost++;
      vatRoom = Utils.calculateSum(vatRoom, Utils.convertToNumber(rcData.vat));
      fixedCost = Utils.calculateSum(
        fixedCost,
        Utils.convertToNumber(rcData.fixedCost)
      );
    });

    if (updateVat)
      amenitiesData.totalData.vat = Utils.calculateWtdAverage(
        vatRoom,
        numRCVat
      );
    if (updateCost)
      amenitiesData.totalData.fixedCost = Utils.calculateWtdAverage(
        fixedCost,
        numRCCost
      );
  },
  // Account Details utility functions
  includeRoomClass: (roomtypeid: number, scptCommSetupInfo: any) => {
    return (
      (roomtypeid === 1 &&
        scptCommSetupInfo.rpp_setup_primary ===
          Settings.text.constant.stringY) ||
      (roomtypeid === 2 &&
        scptCommSetupInfo.rpp_setup_secondary ===
          Settings.text.constant.stringY) ||
      (roomtypeid === 3 &&
        scptCommSetupInfo.rpp_setup_teritary === Settings.text.constant.stringY)
    );
  },
  includeTier: (tiernumber: number, scptCommSetupInfo: any) => {
    return (
      (tiernumber === 1 &&
        scptCommSetupInfo.tier_price_tier1 ===
          Settings.text.constant.stringY) ||
      (tiernumber === 2 &&
        scptCommSetupInfo.tier_price_tier2 ===
          Settings.text.constant.stringY) ||
      (tiernumber === 3 &&
        scptCommSetupInfo.tier_price_tier3 ===
          Settings.text.constant.stringY) ||
      (tiernumber === 4 &&
        scptCommSetupInfo.tier_price_tier4 === Settings.text.constant.stringY)
    );
  },
  getSeasonRoomClassData: (roomClassData: any, rcData: any, seasonId: any) => {
    roomClassData.yearRN =
      rcData[Settings.text.compid.accountDetails.seasons.fcst_rns + seasonId];
    roomClassData.prevYearRN =
      rcData[
        Settings.text.compid.accountDetails.seasons.prevyear_fcst_rns + seasonId
      ];
    roomClassData.rnPct = Utils.formatPercent(
      rcData[
        Settings.text.compid.accountDetails.seasons.pct_annual_rn + seasonId
      ]
    );
    roomClassData.prevYearRate = Utils.formatAmount(
      rcData[
        Settings.text.compid.accountDetails.seasons.prevyear_rate_gross +
          seasonId
      ]
    );
    roomClassData.yearOpenRate = Utils.formatAmount(
      rcData[
        Settings.text.compid.accountDetails.seasons.open_rate_gross + seasonId
      ]
    );
    roomClassData.yearTargetRate = Utils.formatAmount(
      rcData[
        Settings.text.compid.accountDetails.seasons.target_rate_gross + seasonId
      ]
    );
    roomClassData.yearFloorRate = Utils.formatAmount(
      rcData[
        Settings.text.compid.accountDetails.seasons.floor_rate_gross + seasonId
      ]
    );
    roomClassData.yearMarRFPRate = Utils.formatAmount(
      rcData[
        Settings.text.compid.accountDetails.seasons.prev_year_marrfp_rate +
          seasonId
      ]
    );
    roomClassData.ratePct = Utils.formatPercent(
      rcData[
        Settings.text.compid.accountDetails.seasons.pct_antc_gross_chg +
          seasonId
      ]
    );
  },
  getSeasonLOSData: (rcData: any, seasonId: any) => {
    return {
      losId: rcData.tiernumber,
      label:
        Settings.text.constant.losTier +
        Settings.text.constant.stringSpace +
        rcData.tiernumber,
      yearRN:
        rcData[Settings.text.compid.accountDetails.seasons.fcst_rns + seasonId],
      prevYearRN:
        rcData[
          Settings.text.compid.accountDetails.seasons.prevyear_fcst_rns +
            seasonId
        ],
      rnPct: Utils.formatPercent(
        rcData[
          Settings.text.compid.accountDetails.seasons.pct_annual_rn + seasonId
        ]
      ),
      prevYearRate: Utils.formatAmount(
        rcData[
          Settings.text.compid.accountDetails.seasons.prevyear_rate_gross +
            seasonId
        ]
      ),
      yearOpenRate: Utils.formatAmount(
        rcData[
          Settings.text.compid.accountDetails.seasons.open_rate_gross + seasonId
        ]
      ),
      yearTargetRate: Utils.formatAmount(
        rcData[
          Settings.text.compid.accountDetails.seasons.target_rate_gross +
            seasonId
        ]
      ),
      yearFloorRate: Utils.formatAmount(
        rcData[
          Settings.text.compid.accountDetails.seasons.floor_rate_gross +
            seasonId
        ]
      ),
      yearMarRFPRate: Utils.formatAmount(
        rcData[
          Settings.text.compid.accountDetails.seasons.prev_year_marrfp_rate +
            seasonId
        ]
      ),
      ratePct: Utils.formatPercent(
        rcData[
          Settings.text.compid.accountDetails.seasons.pct_antc_gross_chg +
            seasonId
        ]
      ),
    };
  },
  setSeasonCalcData: (
    data: any,
    yearRN: number,
    prevYearRN: number,
    rnPct: number,
    prevYearRate: number,
    yearOpenRate: number,
    yearTagetRate: number,
    yearFloorRate: number,
    yearRate: number,
    yoyCompType: string
  ) => {
    data.yearRN = yearRN ? yearRN.toFixed(0) : null;
    data.prevYearRN = prevYearRN ? prevYearRN.toFixed(0) : null;
    data.rnPct = rnPct ? rnPct.toFixed(2) : null;
    data.prevYearRate = Utils.calculateWtdAverage(prevYearRate, prevYearRN);
    data.yearOpenRate = Utils.calculateWtdAverage(yearOpenRate, yearRN);
    data.yearTargetRate = Utils.calculateWtdAverage(yearTagetRate, yearRN);
    data.yearFloorRate = Utils.calculateWtdAverage(yearFloorRate, yearRN);
    data[Settings.text.compid.accountDetails.yoyRateType[yoyCompType]] =
      Utils.calculateWtdAverage(yearRate, yearRN);
    data.ratePct = Utils.calculatePctChange(
      data[Settings.text.compid.accountDetails.yoyRateType[yoyCompType]],
      data.prevYearRate
    );
  },
  hasRedBackground: (seasonsData: any) => {
    let pctTotal = 0;
    seasonsData.map((sData) => {
      pctTotal = Utils.calculateSum(
        pctTotal,
        Utils.convertToNumber(sData.tableData.totalData.rnPct)
      );
    });

    if (pctTotal != 100) return true;
    return false;
  },
  updateGeneralInfoAmenitiesSaveData: (
    genInfoData: any,
    amenitiesData: any,
    saveData: any,
    detailsSaveData: any,
    roomClassId: number,
    breakfastList: any,
    internetList: any
  ) => {
    if (!saveData) {
      saveData = {
        roompoolid: roomClassId,
        tierid: 1,
      };
      detailsSaveData.rateamenitiesList.push(saveData);
    }

    let breakfast;
    let internet;
    if (amenitiesData) {
      breakfast = breakfastList.find(
        (data) => data.breakfastname == amenitiesData.breakfast
      );
      internet = internetList.find(
        (data) => data.internetname == amenitiesData.internet
      );
    }

    saveData.scpt_breaktypeid = breakfast ? breakfast.scpt_breaktypeid : null;
    saveData.scpt_internettypeid = internet
      ? internet.scpt_internettypeid
      : null;
    saveData.translocaloffice = amenitiesData ? amenitiesData.transport : null;
    saveData.parking = amenitiesData ? amenitiesData.parking : null;
    saveData.fixedcosts = amenitiesData
      ? Utils.convertToNumber(amenitiesData.fixedCost)
      : null;
    saveData.pctcosts = null;
    saveData.pctfbcosts = null;
    saveData.pctroomcosts = amenitiesData
      ? Utils.convertToNumber(amenitiesData.vat)
      : null;
    saveData.donotprice = genInfoData ? genInfoData.donotprice : null;
    saveData.status = genInfoData ? genInfoData.status : null;
    saveData.lra = genInfoData
      ? genInfoData.lra === Settings.text.constant.stringY
        ? Settings.text.constant.lra
        : Settings.text.constant.nlra
      : null;
  },
  setGeneralInfoAmenitiesSaveData: (
    updatedGeneralInfoData: any,
    updatedAmenitiesData: any,
    detailsSaveData: any,
    roomClassId: number,
    breakfastList: any,
    internetList: any,
    updateTotal: boolean
  ) => {
    detailsSaveData.hotelcommChg = Settings.text.constant.stringY;
    if (!detailsSaveData.rateamenitiesList) {
      detailsSaveData.rateamenitiesList = [];
    }

    let rmClassGenInfoData;
    let rmClassAmenitiesData;
    if (roomClassId < 5) {
      rmClassGenInfoData = updatedGeneralInfoData.roomClassData.find(
        (rcData) => rcData.id == roomClassId
      );
      rmClassAmenitiesData = updatedAmenitiesData.roomClassData.find(
        (rcData) => rcData.id == roomClassId
      );

      const rmClassSaveData = detailsSaveData.rateamenitiesList.find(
        (rcSaveData) => rcSaveData.roompoolid == roomClassId
      );

      Utils.updateGeneralInfoAmenitiesSaveData(
        rmClassGenInfoData,
        rmClassAmenitiesData,
        rmClassSaveData,
        detailsSaveData,
        roomClassId,
        breakfastList,
        internetList
      );
    }

    if (updateTotal || roomClassId == 5) {
      const totalGenInfoData = updatedGeneralInfoData.totalData;
      const totalAmenitiesData = updatedAmenitiesData.totalData;

      const totalSaveData = detailsSaveData.rateamenitiesList.find(
        (rcSaveData) => rcSaveData.roompoolid == 5
      );

      Utils.updateGeneralInfoAmenitiesSaveData(
        totalGenInfoData,
        totalAmenitiesData,
        totalSaveData,
        detailsSaveData,
        5,
        breakfastList,
        internetList
      );
    }
  },
  setSeasonSaveData: (
    updatedData: any,
    detailsSaveData: any,
    seasonId: number,
    roomClassId: number,
    tierId: number
  ) => {
    detailsSaveData.rateseasonChg = Settings.text.constant.stringY;
    if (!detailsSaveData.rateseasonList) {
      detailsSaveData.rateseasonList = [];
    }
    let seasonSaveData = detailsSaveData.rateseasonList.find(
      (rcSaveData) =>
        rcSaveData.seasonid == seasonId &&
        rcSaveData.roompoolid == roomClassId &&
        rcSaveData.tier == tierId
    );
    if (!seasonSaveData) {
      seasonSaveData = {
        seasonid: seasonId,
        roompoolid: roomClassId,
        tier: tierId === 5 ? 1 : tierId,
        chg: Settings.text.constant.stringY,
      };
      detailsSaveData.rateseasonList.push(seasonSaveData);
    }

    let updatedDataToSave;
    if (tierId === 5) {
      updatedDataToSave = updatedData;
    } else {
      updatedDataToSave = updatedData.losData.find(
        (losData) => losData.losId == tierId
      );
    }

    seasonSaveData.prevyear_rate_gross = Utils.convertToNumber(
      updatedDataToSave.prevYearRate
    );
    seasonSaveData.open_rate_gross = Utils.convertToNumber(
      updatedDataToSave.yearOpenRate
    );
    seasonSaveData.target_rate_gross = Utils.convertToNumber(
      updatedDataToSave.yearTargetRate
    );
    seasonSaveData.floor_rate_gross = Utils.convertToNumber(
      updatedDataToSave.yearFloorRate
    );
    seasonSaveData.pct_annual_rn = Utils.convertToNumber(
      updatedDataToSave.rnPct
    );
    seasonSaveData.pct_antc_gross_chg = Utils.convertToNumber(
      updatedDataToSave.ratePct
    );
  },
  // API utility functions
  getAPIEndpointDetails: (
    apiEndpoint: string,
    additionalParams?: object,
    nextApiEndpoint?: string
  ) => {
    // For integrated app with API call

    const urlPrefix: string = CommonUtils.getBaseAPIURI();

    // fetching from sessionstorage
    const marshaCode: string = sessionStorage.getItem(
      Settings.api.params.marshaCodeParam
    );
    const hotelrfpid: string = sessionStorage.getItem(
      Settings.api.params.hotelrfpidParam
    );
    const period: string = sessionStorage.getItem(
      Settings.api.params.periodParam
    );
    const commonParams = {
      marshaCode: marshaCode,
      hotelrfpid: hotelrfpid,
      period: period,
    };

    return {
      endpoint: urlPrefix + apiEndpoint,
      nextEndpoint: urlPrefix + nextApiEndpoint,
      params: { ...commonParams, ...additionalParams },
    };
  },
  getAdditionalParams: (type: string, params: any, passedParams: any) => {
    if (type === Settings.text.compid.accountPricing.headerMenu.pricing)
      return {
        commgroupid: passedParams.activeAccountType
          ? passedParams.activeAccountType
          : params.accountType,
        page: passedParams.currentPage ? passedParams.currentPage : params.page,
        commfilterString: passedParams.searchString
          ? passedParams.searchString
          : params.searchString,
        commorderby: passedParams.sortType
          ? passedParams.sortType
          : params.sortType,
      };
    if (type === Settings.text.compid.accountPricing.headerMenu.history)
      return {
        page: passedParams.currentPage ? passedParams.currentPage : params.page,
        detailfilterString: passedParams.searchString
          ? passedParams.searchString
          : params.searchString,
        detailorderby: passedParams.sortType
          ? passedParams.sortType
          : params.sortType,
      };
    return null;
  },
  // Pricing Setup API functions
  savePricingSetupUpdate: (data: any) => {
    return API.updatePricingSetup(
      Utils.getAPIEndpointDetails(Settings.api.pricingSetupUpdate),
      data
    );
  },
  reloadPricingSetup: () => {
    return API.getPricingSetupLoadData(
      Utils.getAPIEndpointDetails(Settings.api.pricingSetupLoad)
    );
  },
  // Account Pricing/Histoty API functions
  getAccountsTotalReportEndpoint: (hotelId: string) => {
    const endpointDetails = Utils.getAPIEndpointDetails(
      Settings.api.accountsTotalReport
    );
    return (
      endpointDetails.endpoint +
      Settings.text.constant.questionSymbol +
      Settings.api.params.periodParam +
      Settings.text.constant.equalsSymbol +
      endpointDetails.params.period +
      Settings.text.constant.ampersandSymbol +
      Settings.api.params.hotelidParam +
      Settings.text.constant.equalsSymbol +
      hotelId
    );
  },
  getAccountsHistoryReportEndpoint: (hotelId: string) => {
    const endpointDetails = Utils.getAPIEndpointDetails(
      Settings.api.accountsHistoryReport
    );
    return (
      endpointDetails.endpoint +
      Settings.text.constant.questionSymbol +
      Settings.api.params.periodParam +
      Settings.text.constant.equalsSymbol +
      endpointDetails.params.period +
      Settings.text.constant.ampersandSymbol +
      Settings.api.params.hotelidParam +
      Settings.text.constant.equalsSymbol +
      hotelId
    );
  },
  saveAccountPricingUpdate: (saveData: any) => {
    return API.saveAccountPricing(
      Utils.getAPIEndpointDetails(Settings.api.accountPricingUpdate),
      saveData
    );
  },
  saveHiddenAccountsUpdate: (saveData: any, hotelid: string) => {
    const params = {
      hotelid: hotelid,
    };
    return API.saveHiddenAccounts(
      Utils.getAPIEndpointDetails(Settings.api.hiddenAccountsUpdate, params),
      saveData
    );
  },
  saveAddAccountUpdate: (saveData: any, hotelid: string) => {
    const params = {
      hotelid: hotelid,
    };
    return API.saveAccount(
      Utils.getAPIEndpointDetails(Settings.api.addAccountUpdate, params),
      saveData
    );
  },
  reloadAccountPricing: (
    commgroupid: string,
    page: string,
    commfilterString: string,
    commorderby: string
  ) => {
    const params = {
      commgroupid: commgroupid,
      page: page,
      commfilterString: commfilterString,
      commorderby: commorderby,
    };
    return API.getAccountPricingLoadData(
      Utils.getAPIEndpointDetails(
        Settings.api.accountPricingLoad,
        params,
        Settings.api.accountPricingTotalLoad
      )
    );
  },
  reloadAccountHistory: (
    commgroupid: string,
    page: string,
    detailfilterString: string,
    detailorderby: string
  ) => {
    const params = {
      page: page,
      detailfilterString: detailfilterString,
      detailorderby: detailorderby,
    };
    return API.getAccountHistoryLoadData(
      Utils.getAPIEndpointDetails(Settings.api.accountHistoryLoad, params)
    );
  },
  refreshAccountPricingRates: () => {
    return API.refreshAccountPricingRates(
      Utils.getAPIEndpointDetails(Settings.api.accountPricingRefreshRates)
    );
  },
  getBTAccountsData: (
    hotelid: string,
    count: number,
    start: number,
    filter: string
  ) => {
    const params = {
      hotelid: hotelid,
      count: count,
      start: start,
      filter: filter,
    };
    return API.getBTAccounts(
      Utils.getAPIEndpointDetails(Settings.api.findBTAccounts, params)
    );
  },
  getHiddenAccountsData: (hotelid: string) => {
    return API.getHiddenAccountsData(
      Utils.getAPIEndpointDetails(Settings.api.hiddenAccountsLoad, {
        hotelid: hotelid,
      })
    );
  },
  // Account Details API functions
  getAccountDetailsLoadData: (accountId: number) => {
    return API.getAccountDetailsLoadData(
      Utils.getAPIEndpointDetails(Settings.api.accountDetailsLoad, {
        scptaccountid: accountId,
      })
    );
  },
  saveAccountDetailsUpdate: (data: any) => {
    return API.updateAccountDetails(
      Utils.getAPIEndpointDetails(Settings.api.accountDetailsUpdate),
      data
    );
  },
  // Common API functions
  saveShowRoomNightsUpdate: (data: any) => {
    return API.updateShowRoomNights(
      Utils.getAPIEndpointDetails(Settings.api.showRoomNightsUpdate),
      data
    );
  },
};

export default Utils;
