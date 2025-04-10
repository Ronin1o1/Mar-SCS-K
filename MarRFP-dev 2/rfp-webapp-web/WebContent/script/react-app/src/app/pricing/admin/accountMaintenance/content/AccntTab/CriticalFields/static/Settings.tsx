const Settings = {
  criticalFieldsTab: {
    api: {
      getCriticalFields: "/accountmaintedit/getContentOnlyTab1.action",
      updateCriticalFields: "/accountmaintedit/updateTab1.action",
      deleteAccount: "/accountmaintedit/deleteAccount.action",
    },
    title: "Enter the date in the format: mm/dd/yyyy",
    dateLength: 10,
    contentType: "application/x-www-form-urlencoded",
    initialKey: "*",
    accountListPath: "accountList",
    maxEnhancedDiscountLimit: 100,
    accountNameAlertMsg: "You must enter an account name.",
    rpgm_accountNameAlertMsg:
      "You must enter a rate program accountname for the 2 line rate description.",
    accountTypeAlertMsg: "You must select an account type.",
    pricingCycleAlertMsg: "You must select a pricing cycle.",
    accountPricingTypeAlertMsg: "You must select an account pricing type.",
    aerAccountNameAlertMsg:
      "You must enter an aer accountname for the 2 line rate description.",
    aerPercentAlertMsg: "You must enter an aer percent.",
    hotelViewershipAlertMsg: "Please select Hotel Viewership.",
    dueDateWarningMsg:
      "If you do not select a due date, this account will not be displayed on the selection screen. \n\n Do you want to continue?",
    enhancedDiscountLimitAlertMsg:
      "The value you have entered is greater than 100.  Please validate the percentage is less than 100.",
    labels: {
      accountName: {
        name: "Account Name:",
        id: "accountDetailGeneral.accountname",
      },
      marshaAcountName: {
        name: "MARSHA 2-Line Account Name:",
        id: "accountDetailGeneral.rpgm_accountname",
      },
      accountPricingType: {
        name: "Account Pricing Type:",
        key: "accountpricingtype",
        value: "accountpricing",
        typeC: "C",
        typeL: "L",
        typeP: "P",
        initialAccountPricingType: {
          accountpricingtype: "*",
          accountpricing: " ",
        },
      },
      segment: {
        name: "Segment:",
        key: "accounttype",
        value: "accounttypedescription",
        initialAccountType: {
          accounttype: "*",
          accounttypedescription: " ",
        },
      },
      hotelViewerShip: {
        name: "Hotel Viewership:",
        key: "account_hotel_view",
        value: "account_hotel_view_desc",
        viewA: "A",
        viewS: "S",
        initialHotelView: {
          account_hotel_view: "*",
          account_hotel_view_desc: " ",
        },
      },
      btBookingCost: {
        id: "accountDetailGeneral.bt_booking_cost",
        name: "BT Booking Cost Account:",
        key: "shortValue",
        value: "description",
        btReadId: "btReadOnly",
        btSelectId: "btSelect",
      },
      accountPricingCycle: {
        name: "Account Pricing Cycle:",
        key: "accountpricingcycleid",
        value: "accountpricingcycle",
        pricingCycle1: 1,
        pricingCycle2: 2,
        pricingCycle3: 3,
        initialPricingCycle: {
          accountpricingcycleid: "*",
          accountpricingcycle: " ",
        },
      },
      offCycleLogic: {
        name: "Off-Cycle Logic:",
        key: "shortValue",
        value: "description",
      },
      startDate: {
        name: "Start Date:",
        id: "accountDetailGeneral.contractstart",
        calId: "calStartDate",
      },
      endDate: {
        name: "End Date:",
        id: "accountDetailGeneral.contractend",
        calId: "calEndDate",
      },
      maxSeasons: {
        name: "Max Number Of Seasons:",
        noOfSeason4: 4,
        noOfSeason5: 5,
      },
      accountCancellationPolicy: {
        name: "Account Alternate Cancellation Policy:",
        key: "altcancelpolicyid",
        value: "altcancelpolicy",
        policy1: 1,
        policy2: 2,
        policy3: 3,
        id1: "canpolicynote",
        id2: "div_canctimenotes",
      },
      cancellationOption: {
        name: "Cancellation Option:",
        key: "altcancelpolicyoptionid",
        value: "altcancelpolicyoption",
      },
      cancellationTime: {
        name: "Cancellation Time:",
        key: "altcancelpolicytimeid",
        value: "altcancelpolicytime",
      },
      accountCancellationPolicyNotes: {
        name: "Account Cancellation Policy Notes:",
        max_length: 500,
        policyAlertMessage: "You are allowed to enter up to 500 characters.",
      },
      enhancedPGOOS: {
        name: "Enhanced PGOOS:",
        key: "shortValue",
        value: "description",
      },
      enhancedDiscount: "Enhanced Discount:",
      gppEnhancedDiscount: "GPP Enhanced Discount:",
      gppAccount: {
        name: "GPP Account",
        key: "shortValue",
        value: "description",
      },
      gppPercent: {
        name: "GPP Percent",
        key: "allowable_percents",
        value: "allowable_percents",
      },
      discountFirstTierOnly: {
        name: "Discount First Tier Only",
        key: "shortValue",
        value: "description",
      },
      gppMarshaAcountName: {
        name: "GPP MARSHA 2-Line Account Name:",
        id: "accountDetailGeneral.aer_accountname",
      },
      gppLOIAgreementOnFile: {
        name: "GPP LOI Agreement on File:",
        key: "shortValue",
        value: "description",
      },
      governmentAccount: {
        name: "Government Account:",
        key: "shortValue",
        value: "description",
      },
      perDiemAdjustmentsAllowed: {
        name: "Per Diem Adjustment Allowed:",
        key: "shortValue",
        value: "description",
      },
      groupsAndMeetings: {
        name: "Groups & Meetings:",
        key: "shortValue",
        value: "description",
        id: "accountDetailGeneral.groupmeetings",
      },
      noSquatter: {
        name: "No Squatter:",
        key: "noSquatterKey",
        value: "noSquatterValue",
      },
      commissionabilityException: {
        name: "Commissionability Exception",
        id: "checkExceptionBox",
      },
      commissionabilityDefault: "Commissionability Default will be",
      rollover: {
        name: "Rollover",
        key: "rollOverKey",
        value: "rollOverValue",
      },
      accountViewable: {
        name: "Account Viewable:",
        key: "shortValue",
        value: "description",
      },
      dateViewable: "Date Viewable:",
      cbcDueDate: "CBC Due Date:",
      reminderDate: {
        name: "Reminders Date:",
        id: "accountDetailGeneral.remindersdate",
        calId: "calReminderDate",
      },
      marrfpDueDate: {
        name: "MarRFP Due Date:",
        key: "pricingperiodid",
        value: "longDueDate",
        initialMarRFPDueDate: {
          pricingperiodid: null,
          longDueDate: null,
        },
      },
      rfpFullDate: {
        name: "Portfolio Due Date:",
        id: "accountDetailGeneral.rfppulldate",
        calId: "calRfpFullDate",
      },
      pasSubmissionDate: {
        name: "PAS Submission Date:",
        id: "accountDetailGeneral.passubmissiondate",
        calId: "calPasSubDate",
      },
      clientDueDate: {
        name: "Client Due Date:",
        id: "accountDetailGeneral.clientduedate",
        calId: "calClientDueDate",
      },
      rfp: {
        name: "RFP:",
        key: "account_thirdparty_refid",
        value: "account_thirdparty",
        initialThirdPartyRegion: {
          account_thirdparty_refid: 0,
          account_thirdparty: "",
        },
      },
      space: " ",
      yes: "Y",
      no: "N",
      yesDesc: "Yes",
      noDesc: "No",
      globalRecognition: { name: "Global Recognition", value: 10 },
      globalPartner: "Global Partner",
      maxLength: 63,
      altBtnDelete: "Delete Account",
    },
    yesNoList: [
      {
        shortValue: "Y",
        description: "Yes",
      },
      {
        shortValue: "N",
        description: "No",
      },
    ],
    btBookingYesNoList: [
      {
        shortValue: "",
        description: "",
      },
      {
        shortValue: "Y",
        description: "Yes",
      },
      {
        shortValue: "N",
        description: "No",
      },
    ],
    noSquatterList: [
      {
        noSquatterKey: "Y",
        noSquatterValue: "Full",
      },
      {
        noSquatterKey: "M",
        noSquatterValue: "Modified",
      },
      {
        noSquatterKey: "N",
        noSquatterValue: "No",
      },
    ],
    rollOverList: [
      {
        rollOverKey: "N",
        rollOverValue: "Not Applicable",
      },
      {
        rollOverKey: "R",
        rollOverValue: "Replatform",
      },
      {
        rollOverKey: "O",
        rollOverValue: "Rollover",
      },
      {
        rollOverKey: "T",
        rollOverValue: "Traditional",
      },
    ],
    confirmMessage1:
      "Before the conversion, you are REQUIRED to MANUALLY cleanup the AER Product.  \n\n Are you sure you want to change the ACCOUNT Pricing Type?",
    confirmMessage2:
      "Changing the ACCOUNT Pricing Type can be catastrophic.  \n\n Are you sure you want to change the ACCOUNT Pricing Type?",
    defaultCommissionMessage:
      "You cannot change to a tier with a different default commissionability",
    hotelViewMessage:
      " If you switch the account to be viewable only to Solicited hotels, " +
      "\n then any hotels that have not been solicited will no longer be able " +
      "\n to see the account, including hotels that have priced the account.  " +
      "\n Are you sure you want to proceed?",
    btBookingCostMessage:
      "Please select answer for BT Booking Cost before making account viewable.",
    accountPricingCycleMessage:
      "Warning!!!  The off-cycle logic flag cannot be changed!",
    offCycleMessage1:
      "By selecting off-cycle be aware that rate validation logic from the general screens will no longer apply.",
    offCycleMessage2:
      "You cannot select Gov VP Product Enabled and Off-cycle together",
    startEndDateAlertMessage: "The start date of the contract must be after ",
    MaxSeasonsAlertMessage: "You are only allowed to enter 4 or 5",
    enhancedDiscountAlertMessage1: "Enhanced Discount must have a value.",
    enhancedAndGppDiscountAlertMessage2:
      "The value you have entered is greater than 20.  Please validate the percentage is correct.",
    gppEnhancedDiscountAlertMessage1:
      "GPP Enhanced Discount must have a value.",
    gppEnhancedDiscountAlertMessage2:
      "The GPP Enhanced discount is not the same as the GPP Percent.",
    duplicateAccountAlert:
      "Duplicate account name not allowed.  \n\n Please reenter the account name.",
    duplicateError: "Duplicate account name not allowed.",
  },
};
export default Settings;
