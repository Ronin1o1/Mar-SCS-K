const Settings = {
  api: {
    getAccountLeadNames: "/centralaccountreg/getCentralAccountReg",
    aaeAccountListNumber: "/aaeAccountList/fetchPhoneNumber",
    aaeAccountListInfo: "/aaeAccountList/getAAEAccountList",
    centralAccReg: "/centralaccountreg/update",
    getPeriods: "/centralaccountregperiod/getAllPeriodsForRole",
  },
  noCache: "no-cache",
  headers: {
    title: "Pricing: Central Pricing Account Registration",
    info: "Please complete each field below and click on the Submit button when finished. By doing so, the data will be sent electronically to the PAS team. Once the information has been processed, you will receive an email from the PAS with your PAS Manager's name and other important information.",
    subTitle: "Central Pricing Account Registration for ",
  },
  yearHeader: "Central Account Registration on MarRFP",
  labels: {
    accountLeadName:
      "1. Account Lead Name (if unable to located the Account Leader Name, please send an email to ",
    accountLeadNameEmail: "ManojKumar.Balakrishnan@marriott-sp.com",
    accountLeadNameTail: ".)",
    accountLeadPhone: "2. Account Lead Phone Number",
    accountLeadEmail: "3. Account Lead Email Address",
    accountName: "4. Account Name",
    clientName: "5. What name will client be looking for when booking?",
    accountWebsite: "6. Account Website",
    accountSegment: "7. Account Segment",
    salesRegion: "8. Sales Region",
    priceOnMarRFP:
      "9. Did the account price on MarRFP in the prior pricing season?",
    thirdPartyTool:
      "10. Is the account utilizing a third party RFP tool to upload/process its RFP's (e.g. Lanyon, ProLodgic, Sabre, etc)?",
    thirdPartyName: "What is the name of the third party?",
    thirdPartyOther:
      "Please state name of third party RFP tool account is using",
    pricingThreshold:
      "11. Does the account expect to solicit pricing from more than 3 Marriott properties?",
    btRoomNightSpan:
      "12. Does the account have 5,000 or more total BT room nights that span at least top 5 markets with a minimum of 300 room nights in each market?",
    regReason:
      "Please select the reason why you feel it is of value to price this account on MarRFP.",
    expectedRoomNightProduction:
      "13. What is the expected room night production for the requested pricing year (accross all chains - not just Marriott)?",
    gdsRateLoading:
      "14. Has the client already provided account GDS rate loading instructions?",
    desiredMarRFPDueDate:
      "15. Select the desired MarRFP hotel pricing due date for the hotels to submit pricing in MarRFP. Allow at least a week between the account being made viewable to hotels on MarRFP and the desired MarRFP hotel pricing due date.",
    clientRFPDueDate:
      "16. Enter client RFP due date (MM/DD/YYYY). If a due date has not been determined, enter 'TBD'. Allow a minimum of three business days after the MarRFP hotel pricing due date to process the information before data can be submitted to the client.",
    specialPricingCircumstances:
      "17. Check any of these special pricing circumstances if they are being requested by the account.",
    specialPricingOptions: {
      twoYearPricing: "Two year pricing",
      offCycle: "Off-cycle (non-calendar year) pricing",
      commissionableRates: "Commisionable rates",
      flatRate: "Flat rates",
    },
    radioOptions: {
      ofValue: {
        label:
          "Group / BT production in my market for this account is of value.",
        value: "G",
      },
      leaderInstructions: {
        label: "My leader instructed me to register the account.",
        value: "L",
      },
      moreEfficient: {
        label: "Pricing process is more efficient through MarRFP.",
        value: "P",
      },
    },
    questions: "For questions regarding this registration, contact PAS at ",
    yes: "Yes",
    no: "No",
    unknown: "Unknown",
    submitAlert:
      "Press OK to complete your account registration.\n\nWe will review your information and reach out soon with further direction on preparing your account for pricing.\n\nIn the interim, access the PAS page on MGS and review the BT pricing resources in order to prepare for your upcoming account call with your assigned PAS Manager.",
    modalTitle: "Alert Message",
  },
  validationErrors: [
    {
      type: "leadName",
      label: "Account Lead name is a required field.",
      key: "leadName",
    },
    {
      type: "accountName",
      label: "Account Name is a required field.",
      key: "accountName",
    },
    {
      type: "accountSegment",
      label: "Account Segment is a required field.",
      key: "accountType",
    },
    {
      type: "salesRegion",
      label: "Sales Region is a required field.",
      key: "salesRegionID",
    },
    {
      type: "accountWebsite",
      label: "Account Website is a required field.",
      key: "accountUrl",
    },
    {
      type: "accountPhone",
      label: "Account Lead Phone Number is a required field.",
      key: "accountLeadPhone",
    },
    {
      type: "thirdPartyTool",
      label: "Third Party is a required field.",
      key: "thirdPartyTool",
    },
    {
      type: "thirdPartyId",
      label: " Please Select Third Party Name.",
      key: "thirdPartyId",
    },
    {
      type: "btRoomNight",
      label: "BT Room Night is a required field.",
      key: "btRoomNightSpan",
    },
    {
      type: "solicitPricing",
      label:
        "Does the account expect to solicit pricing from more than 5 Marriott properties? is a required field.",
      key: "solicitPricing",
    },
    {
      type: "rmNtsProd",
      label:
        "Expected room night production for the requested pricing year is a required field.",
      key: "roomNight",
    },
    {
      type: "clientDueDate",
      label: "Client Due Date is a required field.",
      key: "clientDueDate",
    },
    {
      type: "pricingDueDate",
      label: "MarRFP Pricing Due Date is a required field.",
      key: "pricingperiodid",
    },
  ],
};

export default Settings;
