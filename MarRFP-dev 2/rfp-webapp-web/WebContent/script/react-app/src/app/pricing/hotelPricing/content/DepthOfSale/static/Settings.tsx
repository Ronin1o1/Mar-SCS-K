const Settings = {
  api: {
    gethoteldos: "/hoteldos/getHotelRFPDOS.action",
    updatehoteldos: "/hoteldos/updateHotelRFPDepthOfSales.action",
    urlencode: "application/x-www-form-urlencoded",
    getUserDetails: "/user/getUserDetails.action",
  },
  depthOfSales: {
    seasonsAlert:
      "Please enter values for the selected ranges in all other seasons",
    rangeAlert: "Please enter values for the selected ranges",
    innstructions:
      "The increase in benchmark rate is an important field as it is used in the calculation of the recommended minimum and recommended target rates provided on the Pricing Workbench.",
    readOnlyInstructions1:
      "The Depth of Sales Chart for this property appears below.  Please remember that the chart is for informational purposes only. ",
    readOnlyInstructions1A:
      "Prior to your offering a rate to any account, you must have the expressed approval of the RFP User at the property.",
    readOnlyInstructions2: `Please complete the Depth of Sales Chart below and the Hotel BT Pricing Strategy Box. The chart outlines what discounted transient rates your property may choose to offer to accounts producing differing volumes of annual room nights. The Hotel BT Pricing Strategy will give the sales organization an understanding of what your hotel's strategy is for pricing BT Accounts. This information will be utilized by above property Marriott sales people worldwide for informational purposes only. No rates will be offered to any account without a property's prior approval.`,
    readOnlyInstructions2Sub1: `To enable Seasons and/or LOS Tiers, click the Enhanced radio button.`,
    readOnlyInstructions2Sub2: `Please refer to the Global Pricing Strategy & Reference Document for more information (can be accessed by clicking on the PAS Website tab).`,
    readOnlyInstructions2Sub3: `A plus sign (+) should be entered for the last "Annual Roomnight Volume Range".\n\n`,
    period: 2015,
    lastUpdate: "Last updated on:",
    retailADR: {
      label: "Retail ADR:",
      id: "salesDepth.prevyear_retailadr",
      name: "salesDepth.prevyear_retailadr",
    },
    dos: "Depth of Sales:",
    standard: "Standard",
    enhanced: "Enhanced",
    Y: "Y",
    anicipateLabel: {
      label: "Anticipated increase in Retail Rate:",
      id: "salesDepth.anticipate_inc_retail_pct",
      name: "salesDepth.anticipate_inc_retail_pct",
      anticipateId: "anticipate_inc_retail_pct",
    },
    radio: {
      id: "doslevel",
      name: "doslevel",
    },
    ratermin: "ratermin",
    volrmax: "volrmax",
    ratermax: "ratermax",
    ratemin: "ratemin",
    ratemax: "ratemax",
    bt_price_strategy: "salesDepth.bt_price_strategy",
    dialogAlert:
      "Are you sure you wish to switch?\nYou will lose your current Depth of Sales Data.\nClick OK to continue, or Cancel to go back. ",
    utilizeMsg: `Utilize the box below to communicate your hotel’s BT Pricing Strategy (limit 255 characters): Keep in mind the hotel’s day of week pattern, minimum requirement for a discount and overall strategy based on the hotel’s business plan.`,
    utilizeMsg1: `Click on “Examples” for some ideas.`,
    hotelPricingLbl: "Hotel BT Pricing Strategy:",
    popUpTile: "BT Account Strategy Information",
    modalContent: `Hotel has BT need covered by existing accounts. Stay patterns involving Tue/Wed, quote rack rate.`,
    modalContent1: `Hotel has a need for volume of approximately 1500-2000 BT room nights. Will consider rates between $69 to $109 depending on pattern and volume Hotel Needs BT Business. Will consider accounts with minimum room night volume of X.`,
    modalContent2: `Hotel is limiting BT Business. Will consider accounts with over X amount in room night volume.`,
    modalContent3: `Hotel is looking to grow BT Business during the following seasons:`,
    modalContent4: `Hotel is limiting BT Business. Will consider accounts only that cover a Sunday or Thursday night\n\n `,
    examples: "Examples",
    currency: "Currency:",
    noCurrency: "No currency selected!",
    tabHeading: {
      heading1: "Annual Roomnight",
      heading2: "Rate Range",
      heading3: "Comments",
    },
    comment: "Prevailing Weekday Retail Rate",
    stringVolMaxTitle: "You may enter a numeric value or a '+'.",
  },
  enhancedDOS: {
    readOnlyInstructions1: `The Depth of Sales Chart for this property appears below.  Please remember that the chart is for informational purposes only. `,
    readOnlyInstructions1A: `Prior to your offering a rate to any account, you must have the expressed approval of the RFP User at the property. `,
    readOnlyInstructions1B:
      "Seasons and Length of Stay tiers are determined by the general Seasons and general LOS screens as previously indicated.Please note that peak days will apply to all seasons.",
    readOnlyInstructions2: `Please complete the Depth of Sales Chart below and the Hotel BT Pricing Strategy Box. The chart outlines what discounted transient rates your property may choose to offer to accounts producing differing volumes of annual room nights. The Hotel BT Pricing Strategy will give the sales organization an understanding of what your hotel's strategy is for pricing BT Accounts. This information will be utilized by above property Marriott sales people worldwide for informational purposes only. No rates will be offered to any account without a property's prior approval.\n\n To enable Seasons and/or LOS Tiers, click the Enhanced radio button. The Seasons and LOS are determined by what you entered in the General Season and LOS Screens.\n\n Please refer to the Global Pricing Strategy & Reference Document for more information (can be accessed by clicking on the PAS Website tab).\n\n A plus sign (+) should be entered for the last "Annual Roomnight Volume Range".\n\n`,
    utilizeMsg: `Utilize the box below to communicate your hotel’s BT Pricing Strategy (limit 255 characters): Keep in mind the hotel’s day of week pattern, minimum requirement for a discount and overall strategy based on the hotel’s business plan.\n\n Click on “Examples” for some ideas.`,
    readOnlyInstructions2: `Please complete the Depth of Sales Chart below and the Hotel BT Pricing Strategy Box. The chart outlines what discounted transient rates your property may choose to offer to accounts producing differing volumes of annual room nights. The Hotel BT Pricing Strategy will give the sales organization an understanding of what your hotel's strategy is for pricing BT Accounts. This information will be utilized by above property Marriott sales people worldwide for informational purposes only. No rates will be offered to any account without a property's prior approval.`,
    readOnlyInstructions3: `To enable Seasons and/or LOS Tiers, click the Enhanced radio button. The Seasons and LOS are determined by what you entered in the General Season and LOS Screens.`,
    readOnlyInstructions4: `Please refer to the Global Pricing Strategy & Reference Document for more information (can be accessed by clicking on the PAS Website tab).`,
    readOnlyInstructions5: `A plus sign (+) should be entered for the last "Annual Roomnight Volume Range".\n\n`,
    utilizeMsg: `Utilize the box below to communicate your hotel’s BT Pricing Strategy (limit 255 characters): Keep in mind the hotel’s day of week pattern, minimum requirement for a discount and overall strategy based on the hotel’s business plan.`,
    utilizeMsg1: `Click on “Examples” for some ideas.`,
    noSeasons: "No Seasons Entered",
    prevAlt: "Go to season",
    season: "Season",
    of: "of",
    colon: ":",
    hyphen: "-",
    annualRoomNight: "Annual Roomnight",
    volumeRange: "Volume Range",
    rateRange: "Rate Range",
    roomnightsto: 365,
    losTier: "LOS Tier ",
    comments: "Comments",
    min: "Min.",
    max: "Max.",
    volrMaxLimit: 999999,
    plus: "+",
    rangeAlert:
      "You must enter a value between 29 and 99999999 for Rate Range Min. on row 2.",
  },
  route: {
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
  },
  PriceContactTable: {
    additionalContact:
      "Please indicate additional contacts that should receive key information and updates from the PAS.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    title: "Title",
  },
  PriceContact2: {
    label: "Pricing Contact 2",
    name: {
      name: "respondentEmails['1'].personname",
      id: "respondentEmails['1'].personname",
    },
    emailType: {
      name: "respondentEmails['1'].emailtypeid",
      id: "respondentEmails['1'].emailtypeid",
    },
    email: {
      name: "respondentEmails['1'].email",
      id: "respondentEmails['1'].email",
    },
    phone: {
      name: "respondentEmails['1'].phonenumber",
      id: "respondentEmails['1'].phonenumber",
    },
    persontitle: {
      name: "respondentEmails['1'].persontitle",
      id: "respondentEmails['1'].persontitle",
    },
  },
  respondentEmails2: {
    label: "Pricing Contact 3",
    name: {
      name: "respondentEmails['2'].personname",
      id: "respondentEmails['2'].personname",
    },
    emailType: {
      name: "respondentEmails['2'].emailtypeid",
      id: "respondentEmails['2'].emailtypeid",
    },
    email: {
      name: "respondentEmails['2'].email",
      id: "respondentEmails['2'].email",
    },
    phone: {
      name: "respondentEmails['2'].phonenumber",
      id: "respondentEmails['2'].phonenumber",
    },
    persontitle: {
      name: "respondentEmails['2'].persontitle",
      id: "respondentEmails['2'].persontitle",
    },
  },
  respondentEmails3: {
    label: "Pricing Contact 4",
    name: {
      name: "respondentEmails['3'].personname",
      id: "respondentEmails['3'].personname",
    },
    emailType: {
      name: "respondentEmails['3'].emailtypeid",
      id: "respondentEmails['3'].emailtypeid",
    },
    email: {
      name: "respondentEmails['3'].email",
      id: "respondentEmails['3'].email",
    },
    phone: {
      name: "respondentEmails['3'].phonenumber",
      id: "respondentEmails['3'].phonenumber",
    },
    persontitle: {
      name: "respondentEmails['3'].persontitle",
      id: "respondentEmails['3'].persontitle",
    },
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
  },

  /** end of Price Contact*************** */
};
export default Settings;
