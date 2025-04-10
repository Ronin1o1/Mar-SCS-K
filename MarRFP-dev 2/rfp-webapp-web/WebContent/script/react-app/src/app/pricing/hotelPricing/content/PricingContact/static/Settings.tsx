import priceContact from "../content/priceContact";

const Settings = {
  api: {
    gethotelrespondent: "/hotelrespondent/getHotelRespondent.action",
    updatehotelrespondent: "/hotelrespondent/updateHotelRespondent.action",
    urlencode: "application/x-www-form-urlencoded",
    getUserDetails: "/user/getUserDetails.action",
    updateBTFlag: "/hotelrespondent/updateBTflag.action",
  },

  route: {
    Deapthofsale: "Deapthofsale",
    priceContact: "priceContact",
  },

  address: {
    label: "Address",
  },
  phoneNumber: {
    label: "Phone Number",
  },
  instructions: {
    details:
      " Please input correct information into all respondent fields including e-mail address. It is very important that all information be accurate since it will be used as the primary way to contact you throughout the pricing season.",
  },
  alert: {
    email: "Please enter a valid email address for the Pricing Contact.",
    gridEmail: "Please enter a valid email address for the Pricing Contact ",
    pricingcontact: "You must fill in all Pricing Contact fields.",
    mustfill: "You must fill in all information of a Pricing Contact",
    pricingcontact5: "Pricing Contact 5 Information Must be Filled Out",

    welcome: "Welcome to ",
    generalpricing:
      " pricing! Please complete your property’s General Pricing screens as soon as possible.  Contact PAS@Marriott.com with any MarRFP-related questions.",
  },
  pricingContact: {
    name: {
      label: "Pricing Contact Name",
      id: "hotelRFPRespondent.personname",
      name: "hotelRFPRespondent.personname",
    },
    title: {
      label: "Pricing Contact Title",
      id: "hotelRFPRespondent.persontitle",
      name: "hotelRFPRespondent.persontitle",
    },
    email: {
      label: "Pricing Contact Email",
      id: "hotelRFPRespondent.email",
      name: "hotelRFPRespondent.email",
    },
    countryCode: {
      label: " Pricing Contact Country Code",
      id: "hotelRFPRespondent.countrycode",
      name: "hotelRFPRespondent.countrycode",
    },
    cityCode: {
      label: "Pricing Contact Area/City Code",
      id: "hotelRFPRespondent.areacitycode",
      name: "hotelRFPRespondent.areacitycode",
    },
    contactPhone: {
      label: "Pricing Contact Phone",
      id: "hotelRFPRespondent.phonenumber",
      name: "hotelRFPRespondent.phonenumber",
    },
    pricingContacts: "Pricing Contact",
  },
  PriceContactTable: {
    additionalContact:
      "Please indicate additional contacts that should receive key information and updates from the PAS.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    title: "Title",
  },

  specialNote: {
    label: "Special Note:",
    priciingContact1:
      " Pricing Contact 1 - will receive ALL communications in the course of the pricing season.",
    priciingContact2:
      " Pricing Contact 2 - will receive ALL communications in the course of the pricing season.",
    priciingContact3:
      "Pricing Contact 3 - will receive initial account solicitation and reminder communications only (not renegotiations) as well as PAS communications.",
    priciingContact4:
      " Pricing Contact 4 - will receive initial account solicitation and reminder communications only (not renegotiations) as well as PAS communications.",
    priciingContact5:
      " Pricing Contact 5 - will only receive delinquent notifications and escalation emails.",
    contact5:
      "Pricing Escalation Contact - Will receive delinquent notifications and escalation emails.",
  },
  pricingTabs: {
    selectHotel: "Select Hotel/Period",
    generalPricing: "General Pricing",
    centrallyPricedAccountCenter: "Centrally Priced Account Center",
    bTAccountRates: "BT Account Rates",
    multipleBlackoutDatesEditor: "Multiple Blackout Dates Editor",
    finishandSave: "Finish and Save",
    reports: "Reports",
    tools: "Tools/Resources",
  },
  validation: {
    emailValidation:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    name: /^[0-9\b]+$/,
    re_phone_number: /(^[0-9]+$|[-]$|[0-9]+$|^$)/,
  },
  loadingMsg: "Please wait loading...",
  pricingcontact5Index: 5,
  /** end of Price Contact*************** */
};
export default Settings;
