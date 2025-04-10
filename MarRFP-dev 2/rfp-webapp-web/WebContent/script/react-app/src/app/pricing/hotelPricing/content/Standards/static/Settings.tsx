const Settings = {
  api: {
    getHotelRFPStandard: "/hotelstandards/getHotelRFPStandard.action",
    updateHotelStandards: "/hotelstandards/updateHotelStandards.action",
  },
  headers: {
    unitsOfMeasure: "Units of Measure",
    rejectedRateclearnup: "Rejected Rate Clean-up",
    heading1:
      "As most presented MarRFP account rates are pre-loaded before acceptances are received, would you like MarRFP to delete all rejected",
    heading2:
      "rate programs from High Performance Pricing and MARSHA on behalf of your property?",
    heading3:
      "If Yes, any account that rejected the presented rate and was pre-loaded  by PGOOS will have the corresponding rate programs automatically set for deletion in HPP/MARSHA.",
    heading4:
      "If No, any account that rejected the presented rate and was pre-loaded by PGOOS will have the corresponding rate programs automatically unprotected in HPP, giving the property full control to modify the rate programs accordingly.  (Preferred rates for GPP and No Squatter accounts will still have the corresponding rejected rate programs set for deletion.)",
    heading5:
      "As most presented MarRFP account rates are pre-loaded before acceptances are received, any rates that are ultimately rejected by the customer will be set for deletion in HPP/MARSHA.",
    heading6:
      " Refer to the MarRFP Acceptance Status report for details on which rate programs were pre-loaded and which rates have been rejected by the customer.",
    heading7:
      " If your property wishes to maintain a courtesy rate for any rejected account, you may re-instate/re-load the MarRFP managed rate program(s) in HPP.   For Preferred or No Squatter rates, you will need to load to an alternate rate program and will not be able to use the MarRFP loaded rate programs.  Please refer to the courtesy rate strategy process on ",
    heading8: " for further instructions.",
    pdf: "https://mgscloud.marriott.com/mgs/marrdocs/mgs/common/salesmktgrevmgmt/revmgmt/pas/hotelcontacts/revenuestrategy/loadingcourtesybtratesinhpp.pdf",
    gpp: "GPP",
    gppHeader1: `GPP rates will be loaded automatically when your hotel is not accepted into a GPP designated account’s preferred program`,
    gppHeader2: `As a default, GPP rates will be built for all defined room pools in Room Pool Group 1.  If a hotel elects to “enhance” the GPP offering, then the GPP rates will also be loaded to all defined room pools in Room Pool Group 2 as well. No GPP rates will be loaded for Room Pool Group 3.`,
    gppHeading1: `To “enhance” your GPP offering, choose the “Enhanced Logic - All Room Pool Group 1 and 2 defined room pools” option.`,
    gppHeading2: `Marriott Executive Apartments properties do not participate in the GPP program.  For MEA properties, please select the “Default Logic” option below to ensure you can move successfully to the next screen.`,
    roomPoolGrps: "Room Pool Groups",
    roomPoolH1: `Determine your hotel’s BT pricing strategy for the
        upcoming pricing year and carefully decide which room
        pool(s) your hotel wishes to negotiate for the
        centralized BT pricing process. Select the room
        pool(s) below and ensure the set-up matches your
        hotel’s strategy for the entire pricing year. It is
        imperative that hotels carefully review room pool
        set-up at the start of the pricing season, as mid-year
        changes are not always feasible or may require
        extensive on-property work.`,
    roomPoolH2: ` Hotels have the option to price three Room Pool Groups
        with up to two room pools per Group. Room pools within
        a Room Pool Group must be at the same price points;
        each Room Pool Group can be priced differently. Hotels
        must select at least one room pool for Room Pool Group
        1. It is recommended that Room Pool Group 1 be a
        hotel’s standard inventory and lowest price point.
        Subsequent Room Pool Groups can be used for premium
        room types, and these price points must be priced
        equal to or higher than previous Room Pool Groups.`,
    roomPoolH3: `All negotiated rates in MarRFP (which includes VP,
            Float VP, GPP) should mirror the availability
            and rates of the predominant 7-day Retail Rate entity
            that is most often available. If rate or restriction
            mirrors need to be changed, email the PAS `,
    exception: " for an exception. ",
    roomPoolGrp1: "Room Pool Group 1",
    roomPoolsHeader: "Room Pools:",
    roomType: "Room Type:",
    numberOfPhysicalRooms: "Number of Physical Rooms",
    associatedRoomPool: "associated with Room Pool:",
    rateMirror: "Rate Mirror:",
    restrictionMirror: "Restriction Mirror:",
    roomPoolGroup2Header: "Room Pool Group 2",
    roomPoolGroup3Header: "Room Pool Group 3",
    fromDropdown: "dropdown",
  },
  fields: {
    currencyUsedQuotations: {
      label: "Currency used for quotations",
      id: "hotelRFPStandards.currencycode",
    },
    distanceQouted: {
      label: "Distance quoted in",
      title: "Distance unit used for all distances quoted",
    },
    deleteOldRatePrgms: {
      title: "Delete old rate programs",
      id: "hotelRFPStandards.delete_old_rateprogs",
      name: "hotelRFPStandards.delete_old_rateprogs",
    },
    exempt_gpp: { id: "hotelRFPStandards.exempt_gpp" },
    roomPool00: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool",
    },
    roomPool01: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomPool",
    },
    roomType00: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomtypeid",
    },
    roomType01: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomtypeid",
    },
    roomPool10: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomPool",
    },
    roomPool11: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomPool",
    },
    roomType10: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomtypeid",
    },
    roomType11: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomtypeid",
    },
    roomPool20: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomPool",
    },
    roomPool21: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomPool",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomPool",
    },
    roomType20: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomtypeid",
    },
    roomType21: {
      id: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomtypeid",
      name: "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomtypeid",
    },
  },
  titles: {
    currencyRates: "Currency used for all rates quoted.",
  },
  yesNoOptions: [
    {
      id: "",
      value: "",
    },
    {
      id: "Y",
      value: "Yes",
    },
    {
      id: "N",
      value: "No",
    },
  ],
  exempt_gppArray: [
    {
      id: null,
      value: "",
    },
    {
      id: "Y",
      value: "Default Logic – Only Room Pool Group 1 defined room pools",
    },
    {
      id: "N",
      value: "Enhanced Logic – All Room Pool Group 1 and 2 defined room pools",
    },
  ],
  NAObj: {
    roompool: -1,
    roompool: "NA",
  },
  blankRoomType: {
    promo_roomtypeid: -1,
    roomtype: "NA",
  },
  currencyList: {
    keyField: "currencycode",
    valField: "currencyname",
  },
  deleteOldRatePrgms: {
    keyField: "id",
    valField: "value",
  },
  exempt_gpp: {
    keyField: "id",
    valField: "value",
  },
  roompool: {
    keyField: "roompool",
    valField: "roompool",
  },
  roomType: {
    keyField: "promo_roomtypeid",
    valField: "roomtype",
  },
  isPASAdmin: "MFPADMIN",
  isHotelUser: "MFPUSER",
  yesLabel: "Yes",
  yLabel: "Y",
  nLabel: "N",
  noLabel: "No",
  NA: "NA",
  alertMessages: {
    roomPoolFlagChangeAlert: `Before changing the room pool, ensure that the pricing mirror and availability/caps and restrictions mirror are set up for the same room pool.\n\nChanging the room pool will cause all eligible accounts to be resent to HPP.`,
    changeDeleteOldRP: `By changing your answer, all other pricing years will be updated with the same answer.`,
    noCurrency: `No currency has been entered in EPIC for your hotel.\n\nPlease contact`,
  },
  alert: {
    gppQuestion: "The GPP dropdown question must be answered.",
    // PASAlert:
    //   "You must select if PAS is to delete old rate programs for this hotel",
  },
  route: {
    Standards: "Standards",
  },
};

export default Settings;
