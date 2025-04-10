const Settings = {
  loaderMessage: "Please wait loading...",
  api: {
    getHotelSelect: "/roomdefhotelselect/getRDHotelSelect",
  },
  pleaseSelect: "Please Select a Property",
  label: {
    btPrice: "BT Pricing",
    selectProperty: "Please select a Property:\n\n",
    propertySelectDefoultOption: "Please Select a Property\n\n",
    propertyCodeInter: "Or enter a Property code:",
  },
  alertMsgs: {
    alert1:
      "For the 2020 pricing period, the automated rate load functionality from MarRFP to HPP / MARSHA has been turned off.  \n\nThis means that any changes made in MarRFP for the 2020 pricing period will also need to be manually made in HPP / MARSHA, as necessary.",
    alert2: "Please select a period.",
    invalidAlert:
      "Invalid Marshacode.  Please enter a marshacode that you have access to.",
    selectProperty: "Please select a property",
    rebidAlert: "Please select the No Bid Reason for each highlighted row.",
    updateAdminAlert: "You must fill in all Admin Contact fields.",
    updateSalesAlert: "You must fill in all Sales Contact fields.",
    adminEmailValidationAlert:
      "Please enter a valid email address for the Admin Contact.",
    hotelEmailValidationAlert:
      "Please enter a valid email address for the Hotel Contact.",
    salesEmailValidationAlert:
      "Please enter a valid email address for the Sales Contact.",
    updateHotelUserAlert: "You must fill in all Hotel Contact fields.",
    emptyProdNameAlert: "Please enter the name of the product.",
    maxLength1024ValidationAlert:
      "'Intermediary Strategy' text cannot exceed 1024 characters.",
    extendedStayNeedsMaxLengthAlert:
      "'What is Majority of Extended Stay Needs?' text cannot exceed 1024 characters.",
    orgStructureMaxLengthAlert:
      "'Organizational Structure for buying' text cannot exceed 1024 characters.",
    extendedStaySolutionsMaxLengthAlert:
      "'What extended stay solutions, services and initiative have you considered and/or implemented' text cannot exceed 1024 characters.",
    accountPoliciesMaxLengthAlert:
      "'Account Policies, Procedures and/or Mandates' text cannot exceed 1024 characters.",
    prefrredMarriottBrandsMaxLengthAlert:
      "'Preferred Marriott Brands' text cannot exceed 1024 characters.",
    topExtStayMaxLengthAlert:
      "'Top Ext Stay Competitors (by brand)' text cannot exceed 1024 characters.",
    totRevenueRangeAlert:
      "Please enter a value between 0 and 100 for Share of Total Rm Nts (Marriott mix)",
    totRmNtsAlert:
      "Please enter a value between 0 and 100 for Share of Total Rm Nts (Marriott mix)",
    totExtRmNtsAlert:
      "Please enter a value between 0 and 100 for Share of Total Ext Stay Rm Nts (Total Account)",
    adoptionRateAlert:
      "Please enter a value between 0 and 100 for Adoption Rate of Booking Tool",
    relocationProvider_alert:
      "'Preferred Relocation Provider description' text cannot exceed 1024 characters.",
    grpIntermediariesFullServiceAlert:
      "'Full Service' text cannot exceed 1024 characters.",
    grpIntermediariesContractingAlert:
      "'Contracting' text cannot exceed 1024 characters.",
    grpIntermediariesSiteSelectionAlert:
      "'Site Selection' text cannot exceed 1024 characters.",
    grpIntermediariesHousingAlert:
      "'Housing' text cannot exceed 1024 characters.",
    grpIntermediariesOnsiteAlert:
      "'Onsite' text cannot exceed 1024 characters.",
    grpIntermediariesResearchAlert:
      "'Research' text cannot exceed 1024 characters.",
    grpIntermediariesOtherAlert: "'Other' text cannot exceed 1024 characters.",
    acctPerspectiveOverViewAlert:
      "'Account Business Overview' text cannot exceed 1024 characters.",
    acctPerspectiveOutlookPerspectiveAlert:
      "'Customer Travel Outlook' text cannot exceed 2000 characters.",
    acctPerspectiveDivisionsAlert:
      "'Regional Account Insights' text cannot exceed 2000 characters.",
    acctPerspectiveStrategyAlert:
      "'Current Account Business Environment' text cannot exceed 2000 characters.",
    acctPerspectiveVulnerabilitiesAlert:
      "'Payments' text cannot exceed 1500 characters.",
    btOverviewByBrandAlert:
      "'Account Travel Policy' text cannot exceed 1024 characters.",
    btOverviewBuyingDecisionsLengthAlert:
      "'Booking Tool Details' text cannot exceed 1024 characters.",
    emailAlertMsg: "Please enter a valid email.",
    fillRatesAndRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information .",
    // PASAlert:
    //   "You must select if PAS is to delete old rate programs for this hotel",
    GPPAlert: "The GPP dropdown question must be answered.",
    sameRoomPoolAlert:
      "You cannot have the same room pool across room pool groups ",
    commonSeasonAlert: "You must enter the seasons first.",
    emtrySecondaryField:
      "You must fill in all information of a Pricing Contact",
    rpgonerponeSelected:
      "You must select Room Pool for Room Pool Group 1 - Room Pool 1 before selecting Room Type",
    rpgonerptwoSelected:
      "You must select Room Pool for Room Pool Group 1 - Room Pool 2 before selecting Room Type",
    rpgtworponeSelected:
      "You must select Room Pool for Room Pool Group 2 - Room Pool 1 before selecting Room Type",
    rpgtworptwoSelected:
      "You must select Room Pool for Room Pool Group 2 - Room Pool 2 before selecting Room Type",
    rpgthreerponeSelected:
      "You must select Room Pool for Room Pool Group 3 - Room Pool 1 before selecting Room Type",
    rpgthreerptwoSelected:
      "You must select Room Pool for Room Pool Group 3 - Room Pool 2 before selecting Room Type",
    rtrpgonerponeSelected:
      "You must enter your Room Type for Room Pool Group 1 - Room Pool 1",
    rtrpgonerptwoSelected:
      "You must enter your Room Type for Room Pool Group 1 - Room Pool 2",
    rtrpgtworponeSelected:
      "You must enter your Room Type for Room Pool Group 2 - Room Pool 1",
    rtrpgtworptwoSelected:
      "You must enter your Room Type for Room Pool Group 2 - Room Pool 2",
    rtrpgthreerponeSelected:
      "You must enter your Room Type for Room Pool Group 3 - Room Pool 1",
    rtrpgthreerptwoSelected:
      "You must enter your Room Type for Room Pool Group 3 - Room Pool 2",
    rponerpgoneMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 1 ",
    rponerpgtwoMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 2 ",
    rponerpgoneMustSelected: "You must select Room Pool 1 of Room Pool Group 1",
    rponerpgthreeMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 3 ",
    InvalidEmail: "Please enter a valid email address for the Pricing Contact",
    InvalidEmail1:
      "Please enter a valid email address for the Pricing Contact.",
    emptyField: "You must fill in all Pricing Contact fields.",
    emptryAlert: "You must fill in all question fields",
    rateRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information ",
    accountSpecQuestNotFilled:
      "You must visit the Account Specific Questions  tab and fill out the appropriate information.",
    groupsAndMeetingAlert:
      "You must complete all required fields for Groups and Meetings.",
    pricingContactMandatory: "Pricing Contact 5 Information Must be Filled Out",
  },
  period: {
    identifier: "period",
    items: [
      { period: 2022 },
      { period: 2021 },
      { period: 2020 },
      { period: 2019 },
      { period: 2018 },
      { period: 2017 },
      { period: 2016 },
      { period: 2015 },
    ],
    numRows: null,
    totalRecordsFound: null,
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  noHotelsAlert: "There are no hotels available to select.",
  retrieveList: "Please retrieve the lists",
  alertMarshacodeNotfound: "The following MARSHA codes were not found: \n",
  quickSelect: "Quick Select",
  directSelect: "Direct Select",
  clearSelect: "Clear Selection",
  alertMessage: "Alert Message",
  okClose: "OK - Close Message Box",
  marshacodeSeparatedByComma: "Please enter only marshacodes seperated by a ,",
  NotSentEmail: "Hotels Not Sent Email",
  emailNotSenMessage: "An email was not sent to the following hotels.",
  enter200Hotels: "Please enter only 200 hotels at a time.",
  youareAllowed: "You are allowed to enter up to ",
  characters: " characters.",
  enter10character: "You are allowed to enter up to 10 characters.",
  fileFormatAlert:
    "Only Word, Excel, and PDF files are allowed to be attached.",
  fileUploadLabel: "Select a file to attach with email",
  colorCode: {
    color_d90000: "#d90000",
    color_b95c00: "#b95c00",
    color_0057c1: "#0057c1",
    color_640000: "#640000",
    color_008040: "#008040",
    color_purple: "purple",
  },
  screentype_S: "S",
  solicitationDueDate: "Solicitation Due Date:",
  SendFrom: "Send From:",
  additionalData: "Additional Text:",
  requestEdie: "requestEdie",
  hotelSolicitation: "HotelSolicitation",
  marshaCode: "marshaCode",
  marshacode: "marshacode",
  logoTitle: "MarRFP Application",
  errorMessage: "There has been a technical error.Please try again later.",
  SyncConfirmMessage: "Are you sure you want to stop the synchronization?",
  MenuTitle: "Project Codes",
  pastDate: "The date must be on or after today.",
  selectPropertyMsg: "Please select a property",
  additionalEmailInfo: "Additional Email Information",
  additionalSendMail: {
    textareaId: "hotelSolicitationAddEmailInfo.additional_text",
    textareaName: "hotelSolicitationAddEmailInfo.additional_text",
    textareaCols: 50,
    textareaRows: 8,
    dateInputId: "hotelSolicitationAddEmailInfo.additional_text",
    dateInputName: "hotelSolicitationAddEmailInfo.additional_text",
    dateInputMaxLength: "10",
    sendfromtypeId: "hotelSolicitationAddEmailInfo.sendfromtype",
    sendfromtypeName: "hotelSolicitationAddEmailInfo.sendfromtypeName",
  },
  onlyMarshaCodeNotFoundAlert: "The following MARSHA code was not found: ",
  marshaCodeNotFoundAlert: "The following MARSHA codes were not found: ",
};
export default Settings;
