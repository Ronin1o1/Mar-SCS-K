const Settings = {
  api: {
    gethotelrespondent: "/hotelrespondent/getHotelRespondent.action",
    updatehotelrespondent: "/hotelrespondent/updateHotelRespondent.action",
    getHotelRFPFixedRates: "/hotelfixedrates/getHotelSeasonsLos",
    updateHotelRFPFixedRates: "/hotelfixedrates/updateHotelSeasonsLos.action",
    urlencode: "application/x-www-form-urlencoded",
    getUserDetails: "/user/getUserDetails.action",
  },

  pageDescriptions: {
    rateDefinition:
      "The Fixed rates should be similar to a hotel's predominant Retail Rate. Hotels have the ability to define up to five seasons to take into account seasonality in the market. These rates are non-commissionable and have Last Room Availability. If these rates are offered to an account, they are fixed and cannot be increased. The Fixed rates are the benchmark rate that all other MarRFP account rates are based off.",
    instructionLabel1:
      "If you change the Fixed Corporate Rates, please review all account specific pricing screens to ensure rates and market codes are accurately reflected. If you do not make the necessary updates, the market codes for your accounts may not be accurate in HPP / MARSHA.",
    instructionLabel2:
      " You may refer to the Acceptance Status Report for the current market codes. Please note that all market code changes are reflected the next business day in HPP / MARSHA and on the Acceptance Status Report.",
    instructionLabel3:
      "In order for the mirroring functionality to work accurately in HPP, the MarRFP defined LOS Tiers MUST be exactly the same as your HPP defined flexible Retail Rate LOS Tiers.",
    seasonHeading1:
      "Hotels should define the standard seasons from January 1 through December 31.",
    seasonHeading2:
      "Up to five seasons may be defined, based on seasonality in the market.",
    seasonHeading3:
      "Users may choose to copy these seasons to accounts that are priced on the Centrally Priced Account Center which price from January to December. ",
    losHeading1:
      "To add seasons, click on the “+” sign next to the first season.",
    losHeading2:
      "To add seasons, click on the “+” sign next to the season start date.",
    losHeading3:
      "Hotels should also define their standard LOS Tiers.  The LOS Tiers defined below should match the predominant LOS Tiers of the Flexible Retail Rate in HPP. ",
    losHeading4:
      "If the MarRFP Account Specific LOS Tiers do not match the corresponding Flexible Retail Rate LOS Tiers in HPP, then proper auditing will not occur.  This means that no comparison will occur for the mis-matched LOS Tier(s).  If the Flexible Retail Rate falls below the negotiated MarRFP account rate, the account rate will continue to sell at the MarRFP negotiated rate and not reflect the lower Flexible Retail Rate for the mis-matched LOS Tier(s).",
    losHeading5:
      "These LOS Tiers will be applied to accounts that are priced on the Centrally Priced Account Center.",
    losHeading6:
      "To add LOS Tiers, click on the “+” sign next to the LOS Tier.",
  },
  sectionHeaders: {
    rules: "Rules",
    rates: "Rates",
  },
  hotelRuleItems: {
    commissionable: "Commissionable?",
    LRA: "LRA?",
    ruleValues: {
      yes: "Yes",
      no: "No",
    },
  },
  tooltips: {
    insertSeason: "Insert Season",
    deleteSeason: "Delete Season",
    dateFormat: "(mm/dd/yyyy)",
    insertLengthOfStay: "Insert Length of Stay",
    deleteLengthOfStay: "Delete Length of Stay",
    roomRate: "Type only digits and decimal seperator, if any",
  },
  labels: {
    to: "to",
    LOS: "LOS",
    seasons: "Seasons",
    lostiers: "LOS Tiers",
  },
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  alertMsg: {
    deleteSeason:
      "Are you sure you want to delete this season?\n\nPress OK to delete the season.\nPress Cancel to leave the season",
    enterOneSeason: "You must enter a least one season.",
    afterPeriodStartDate:
      "  date must be on or after the period start date. ( ",
    beforePeriodEndDate: " date must be on or before the period end date. ( ",
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
    fillRequiredRules: "You must fill in all requred rules.",
    fillRequiredRateFieldsForRP:
      "You must fill in all required rate fields or all rates for room pools that are not required",
    atleasetOneSeason: "You must have at least one season",
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
  },
  rateMap: {
    "1_1_2_1_2": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 2,
      roompool: 2,
      rate: "",
    },
    "1_1_2_1_1": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 1,
      roompool: 2,
      rate: "",
    },
    "1_1_3_1_1": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 1,
      roompool: 3,
      rate: "",
    },
    "1_1_1_1_1": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 1,
      roompool: 1,
      rate: "",
    },
    "1_1_3_1_2": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 2,
      roompool: 3,
      rate: "",
    },
    "1_1_1_1_2": {
      seasonid: 1,
      lengthofstayid: 1,
      productid: "1",
      roomtypeid: 2,
      roompool: 1,
      rate: "",
    },
  },
  roompoolList: [
    {
      seq: 1,
      required: "Y",
      room_pool: null,
      roomPoolList: [],
    },
    {
      seq: 2,
      required: "Y",
      room_pool: null,
      roomPoolList: [],
    },
    {
      seq: 3,
      required: "Y",
      room_pool: null,
      roomPoolList: [],
    },
  ],
};
export default Settings;
