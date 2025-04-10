const Settings = {
  api: {
    getEligibilityAminity: "/hoteleligamen/getHotelRFPEligAmen.action",
    updateEligibilityAminity:
      "/hoteleligamen/updateHotelEligAmen.action?request_locale=en&nextUrl=/hotelgrpsmtgs/view.action",
    previousEligibilityAminity:
      "/hoteleligamen/updateHotelEligAmen.action?request_locale=en&nextUrl=/hotelblackout/view.action",
  },
  titles: {
    Eligibility: "Eligibility",
    Amenities: "Amenities",
    EarlyDepature: "Early Departure Charge",
    Yes: "Yes",
    No: "No",
    CancelPolicy: "Hotel Standard Cancellation Policy",
    ScreenDetail:
      "ABEBC - Courtyard Bethlehem Lehigh Valley/I-78: BT Pricing - Eligibilities and Amenities",
    Period: "Period: 2022 ",
    Currency: "Currency used in Quotations:",
    CurrencyType: " U.S. Dollar",
    cancellationPolicyTitle:
      "This information is pulled from Product Catalog. Changes made to cancellation policy in Product Catalog will be reflected in MarRFP the next day.",
  },
  description: {
    eligibilityDesc:
      "The following default eligibility information will be offered to any account which receives your hotel's rates (Volume Producer). When you select an account, this information will be copied into that account's Eligibility section as a baseline.",
    AmenitiesDesc:
      "The following default amenities will be offered to any account which receives your hotel's rates (Volume Producer, GPP). This information is pulled from Product Catalog and all updates must be completed in Product Catalog. Changes made to amenities information in Product Catalog will be reflected in MarRFP the next business day.",
    AmenitiesDetails:
      "When you select an account, this information will be copied into that account's Amenities section on the MarRFP Account Specific as a baseline.  Additional amenities may be offered to an account on the MarRFP Account Specific screen.",
    EarlyDepatureDesc:
      "If your hotel charges an Early Departure Charge for any BT guest who checks out early, please answer Yes below and answer the questions accordingly.  If you answer Yes, you will have the opportunity to waive Early Departure Charges for any account you price.  This information will be populated in the account’s RFP.",
    EarlyDepatureDetails: "Do you charge an Early Departure Charge?",
    AmenitiesDropList: "If so, how much?",
    AmenitiesValue: "How much?",
  },
  alerts: {
    fixedAmountAlert:
      "Too many digits have been entered. Please ensure you have entered a maximum of 8 digits before the decimal and 2 digits after the decimal.",
    percentageAlert:
      "Too many digits have been entered. Please ensure you have entered a maximum of 3 digits before the decimal and 2 digits after the decimal.",
    earlyDepartureAlert: "Early Departure Charge value cannot be modified",
  },
};
export default Settings;
