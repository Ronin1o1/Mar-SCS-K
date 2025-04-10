const Settings = {
  api: {
    getBtOverview: "/acctbtoverview/getAcctBTOverview.action",
    updateBtOverview: "/acctbtoverview/updateAcctBTOverview.action",
  },
  route: {
    NextPage: "cityMarkets",
    PreviousPage: "accBTProfileList",
  },
  validation_details: {
    regex: /^[0-9]*$/,
  },
  accountBTOverviewDetails: {
    by_brandlength:
      "'Account Travel Policy' text cannot exceed 1024 characters.",
    org_buying_structlength:
      "'Booking Tool Details' text cannot exceed 1024 characters.",
    policieslength:
      "'Customer Marketing Opportunities' text cannot exceed 1024 characters.",
    reservationstextlength:
      "'RFP Requirements and Requests' text cannot exceed 1250 characters.",
    requiretextlength:
      "'Pricing Products' text cannot exceed 1250 characters.",
    requesttextlength:
      "'Critical Considerations for Hotel Prgoram' text cannot exceed 1250 characters.",
    notestext_existinghotellength:
      "'Compelling Business Case Requirements' text cannot exceed 1500 characters.",
    notestext_preopeninghotellength:
      "'Compelling Business Case Requirements' text cannot exceed 1500 characters.",
    roomtypetextlength:
      "'Room Pool Requirements and Considerations' text cannot exceed 1000 characters.",

    org_buying_struct_require: "'Booking Tool Details' is a required field.",
    reservationstext_require: "'RFP Requirements and Requests' is a required field.",
    requiretext_require: "'Pricing Products' is a required field.",
    dueDate_require: "'Due Date' is a required field",
    notestext_existinghotel_require:
      "'CBC Requirements for Existing Hotels (Opened > 12 Months)' is a required field.",
    notestext_preopeninghotel_require:
      "'CBC Requirements for New Hotels (Pre-Open / Open < 12 Months)' is a required field.",
    AlertRangeMessage: "Please enter a value between 0 and 100",
    RequiredField: "* Required Fields are in red",
    BookingToolTitle: "Does account use an online booking tool?",
    onl_bkg_tool: "Which online booking tool do they use?",
    adopt_rate_bkg_tool:
      "Compliance to Travel Policy: ",
    adopt_rate_bkg_tool_tip:
      "What is the rate that the company's travelers utilize their own booking tool?",
    relocat_intermediary: "Relocation Intermediary: ",
    relocat_intermediary_tip:
      "What  relocation intermediary does the account have, if any?",
    pref_hotel: "Preferred Hotel Partners: ",
    pref_hotel_tip: "What are the account's preferred hotel partners?",
    competitors_bybrand: "Account Travel Policy:  ",
    competitors_bybrand_tip: "List the BT competitors by brand.",
    org_buying_struct: "Booking Tool Details: ",
    org_buying_struct_tip:
      "Please describe how this customer buys or describe who has the final buying power.",
    policies_tip:
      "Are there any specific policies or procedures that the properties need to follow regarding this account?",
    policies: "Customer Marketing Opportunities: ",
    reservationstext_tip:
      "Does the account book online, through a third party, etc.?",
    reservationstext: "RFP Requirements and Requests:",
    requiretext: "Pricing Products: ",
    requiretext_tip:
      "Does this account have any specific booking or contractual requirements?",
    requesttext: "Critical Considerations for Hotel Program:",
    requesttext_tip: "Describe this accounts typical requests, if any.",
    notestext_existinghotel: "CBC Requirements for Existing Hotels (Opened > 12 Months):",
    notestext_preopeninghotel:
      "CBC Requirements for New Hotels (Pre-Open / Open < 12 Months):",
    roomtypetext_tip: "Describe this accounts typical requests, if any.",
    roomtypetext: "Room Pool Requirements and Considerations: ",
    dueDate: "Due Date:",
    busRequiremnts: "",
  },
};
export default Settings;
