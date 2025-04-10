const Settings = {
  api: {
    getRates: "/accountspecrates/getRates.action",
    hotelremovalreason: "/pgoosremovalreason/getRemovalReason",
    hotelrejectreason: "/hotelrejectionreason/getRejectionReason",
    getPreviousRules: "/hotelquickaudit/viewrules",
    quickauditviewcancel: "/hotelquickaudit/viewcancel",
    getPreviousRates: "/hotelquickaudit/getQuickAudit",
    updateRates: "/accountspecrates/updateRates.action",
    updateProduct: "/accountspecrates/updateProduct.action",
    updateCopyGov: "/accountspecrates/updateCopyGov.action",
    updateCopySeason: "/accountspecrates/copySeasons.action",
    getAccountOverViewReport:
      "/hotelaccountoverview/getHotelAccountOverviewReport.action",
  },
  alerts: {
    cancellationExceed:
      "The cancellation policy cannot exceed hotel standard cancellation policy.",
    accountLocked:
      "The account is locked. The cancellation policy can only be decreased, not increased.",
    accountLockedLowHigh:
      "The account is locked.  The rate can only be lowered, not raised.",
    accountRatesDelete:
      "Rates cannot be deleted after they have been presented to the account",
    answerCancellation: "You must answer the cancellation time question",
    accountPercen:
      "The account is locked.  You can only raise the percent off.",
    lraRequiredIfNraIsNotNull:
      "You must fill in the LRA rate fields for any room types with NLRA rates.",
    singleRateLessThanDoubleRate:
      "The Single rate must be less than or equal the Double rate",
    doubleRateGreaterThanSingleRate:
      "The Double rate must be greater than or equal to the Single rate",
    lraGreaterThanNlra: "The LRA rate must be greater than the NLRA rate",
    nlraLessThanLra: "The NLRA rate must be less than the LRA rate",
    lralessThanpool1:
      "The Room pool 1 LRA Double rate must be less  than or equal to the  Room pool 2 LRA Double rate ",
    lralessThanpool2:
      "The Room pool 2 LRA Double rate must be less  than or equal to the  Room pool 3 LRA Double rate ",
    lralessThanpool3:
      "The Room pool 1 LRA Double rate must be less  than or equal to the  Room pool 3 LRA Double rate ",
    emptyPercent: "The percent discount cannot be empty.",
    minumuOnePer: "The percent discount must be minimum of 1%.",
    beforePeriodEndDate: " date must be on or before the period end date. ( ",
    afterPeriodStartDate:
      "  date must be on or after the period start date. ( ",
    deleteSeason:
      "Are you sure you want to delete this season?\n\nPress OK to delete the season.\nPress Cancel to leave the season",
    enterOneSeason: "You must enter a least one season.",
    maxSeason: "You may enter a maximum of ",
    deleteLosTiers:
      "Are you sure you want to delete this LOS Tier?\n\nPress OK to delete the LOS Tier.\nPress Cancel to leave the LOS Tier.",
    losLimit: "The LOS from must be less than 255",
    theRoomPool: "The  Room pool ",
    rate: " rate",
    rateLessThanRP: " rate must be less than or equal the  Room pool ",
    rateGreaterThanRP: " rate must be greater than or equal to the Room pool ",
    rateLessThanEqual: " rate must be less than or equal the ",
    rateGreaterThanEqual: " rate must be greater than or equal to the ",
    oneLosTierRequired: "You must enter at least one length of stay tier",
    losToLessThanEqual: "The LOS to must be less than or equal to 255",
    losTierEnding: "The last LOS tier must end in 255",
    losFromGreaterThanLosTo: "The LOS from must be greater than the LOS To.",
    theLosTier: "The LOS Tier ",
    rateLessThanEqualLos: " rate must be less than or equal to the LOS Tier ",
    rateGreaterThanEqualLos:
      " rate must be greater than or equal to the LOS Tier ",
    seasonStartBeforeSeasonEnd:
      "The season start date must be before the season end date for season ",
    seasonEndDateForSeason: "The season end date for season  ",
    beforeNextSeasonStartDate: "  must be before the next season start date",
    seasonStartDateforSeason: "The season start date for season  ",
    afterEndOfPrevSeason:
      "  must be one day after the end of the previous season",
    firstLosTier: "The first LOS tier must start with 1.",
    losToAfterLosFrom: "The LOS to must be after the LOS from for tier ",
    losFromForTier: "The LOS from for tier ",
    greaterThanLosOfPrevTier:
      " must be one greater than the LOS to of the previous tier",
    lastLosTier: "The last LOS must end with 255",
    fillRequiredRTRateFields:
      "You must complete the Room Type 1 and Room Type 2 rate fields to leave this screen.",
    completeRoomType: "You must complete the Room Type ",
    rateFieldReqToLeaveScreen: " rate fields to leave this screen.",
    fillRequiredRules: "You must fill in all required rules.",
    fillRequiredRateFieldsForRP:
      "You must fill in all required rate fields or all rates for room pools that are not required",
    atleasetOneSeason: "You must have at least one season",
  },
  labels: {
    cancellation:
      "What cancellation time do you agree to extend to the account?",
    timeZone: "America/New_York",
  },
  keys: {
    seasonList: "SeasonList",
    enddate: "enddate",
    hotelSeasonAttrId: "hotelSeason[",
    strEndDateAttrId: "].strEnddate",
    the: "The ",
    endBracket: ")",
    ruleList: "RuleList",
    seasons: " seasons.",
    losTiers: " LOS tiers.",
    losList: "LosList",
    roomNightsFrom: "roomnightsfrom",
    roomNightsTo: "roomnightsto",
    isRoomNightsFromChanged: "isRoomNightsFromChanged",
    isRoomNightsToChanged: "isRoomNightsToChanged",
    lengthofstayid: "lengthofstayid",
    roomtypeList: "roomtypeList",
    lratypeList: "lratypeList",
    roompoollist: "roompoollist",
    lranlratype: "lranlratype",
  },
  routeName: {
    printAccountContainer: "printAccountContainer",
  },
};
export default Settings;
