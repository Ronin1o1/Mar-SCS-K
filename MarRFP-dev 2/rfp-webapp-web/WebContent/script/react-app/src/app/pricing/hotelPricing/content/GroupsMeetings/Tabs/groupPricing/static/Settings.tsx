const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    grpprice: "/hotelgrpprice/getRFPGrpPriceTab",
    hotelgrpprice: "/hotelgrpprice/updateGrpPrices",
  },
  instructions: {
    header_pricing: "Group Pricing",
    pricing_label_one:
      "If accepted into the client’s preferred hotel program, what is the maximum negotiated rate per sleeping room for groups of 10-50 rooms per night?",
    pricing_label_two:
      "If accepted into the client’s preferred hotel program, what is the maximum negotiated rate per sleeping room for groups of 51-100 rooms per night?",
    header_concessions: "Group Concessions",
    concession_label_one:
      "If accepted into the client's preferred hotel program, will hotel honor the special negotiated transient rate as the highest rate that the client will pay for group rooms? ",
    concession_lable_two: "Hotel will offer 1 complimentary room for every ",
    concession_lable_two_part: " rooms actualized.",
    concession_lable_three:
      "Will hotel offer a guaranteed discount off of Food & Beverage charges? ",
  },

  alerts: {
    pricing_error: "Error when saving Group Price!",
  },

  groupPricing: {
    grpPriceChg: {
      id: "hotelGroupsMeeting.grpPriceChg",
      name: "hotelGroupsMeeting.grpPriceChg",
      value: "N",
    },
    max_nego_for_10_50: {
      id: "hotelGroupsMeeting.max_nego_for_10_50",
      name: "hotelGroupsMeeting.max_nego_for_10_50",
    },
    max_nego_for_51_100: {
      id: "hotelGroupsMeeting.max_nego_for_51_100",
      name: "hotelGroupsMeeting.max_nego_for_51_100",
    },
    no_compliment_room: {
      id: "hotelGroupsMeeting.no_compliment_room",
      name: "hotelGroupsMeeting.no_compliment_room",
    },
    filter: {
      groupPricingOption: {
        id: "groupPricingOption",
        keyField: "groupPricingType",
        valField: "value",
      },
      foodBeverageDiscount: {
        id: "foodBeverageDiscount",
        keyField: "groupPricingType",
        valField: "value",
      },
      groupPricingOptions: [
        {
          groupPricingType: "",
          value: "",
        },
        {
          groupPricingType: "Y",
          value: "Yes",
        },
        {
          groupPricingType: "N",
          value: "No",
        },
      ],
    },
  },

  loadingMsg: "Please wait loading...",
  /** end of Group Pricing*************** */
};
export default Settings;
