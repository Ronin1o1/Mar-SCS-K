const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    mtgprice: "/hotelmtgprice/getHotelMtgPriceTab",
    hotelmtgprice: "/hotelmtgprice/updateMtgPrices",
  },

  instructions: {
    header_meeting_pricing: "Meeting Pricing",
    header_meeting_concession: "Meeting Concession",
    day_meetings_offered: "Day Meeting Packages/Delegate Rates offered?",
    meeting_type_offered:
      "What type of Day Meeting Package/Delegate Rates are offered?",
    full_delegate_explanation:
      "Explain what your full Day Delegate rate includes (breakfast, lunch, breaks, meeting space, AV, etc.)",
    half_day_delegate_explanation:
      "Explain what your half Day Delegate rate includes (breakfast, breaks, meeting space, AV, etc.)",
    max_full_day_rate_for_10_50:
      "What is the maximum full Day Delegate rate per person for groups of 10-50 participants?",
    max_half_day_rate_for_10_50:
      "What is the maximum half Day Delegate rate per person for groups of 10-50 participants?",
    max_full_day_rate_for_50_100:
      "What is the maximum full Day Delegate rate per person for groups of 51-100 participants?",
    max_half_day_rate_for_50_100:
      "What is the maximum half Day Delegate rate per person for groups of 51-100 participants?",
    total_tax_on_day_meeting_package:
      "Total tax on Day Meeting Packages/Delegate Rate",
    total_tax_on_day_meeting_package_quote:
      "Total tax on Day Meeting Packages/Delegate Rate quoted as",
    total_tax_on_day_meeting_package_include_exclude:
      "Total tax Day Meeting Packages/Delegate Rate included / excluded?",
    banquet_service_amount: "Banquet service amount",
    banquet_service_quoted: "Banquet service quoted as",
    banquet_service_charges_taxed: "Banquet service charges taxed?",
    banquet_service_include_exclude:
      "Banquet service amount on Day Meeting Packages/Delegate Rate included / excluded?",
    max_cost_for_10_person:
      "What is the maximum cost for a 10 person breakout room?",
    max_cost_for_25_person:
      "What is the maximum cost for a 25 person breakout room?",
    complimentary_parking_offer:
      "Will hotel offer complimentary parking for meeting attendees that are not overnight guests?",
    free_internet_offer:
      "What is the fee for internet in the general session meeting room? (This is the fee for the initial internet line. It is not the fee for individual users. )",
    cost_of_high_internet_included:
      "Is the cost for high speed internet in the general session meeting room included in the Day Delegate rate?",
    lcd_cost_per_day:
      "Is the LCD cost per day included in the Day Delegate rate?",
    standard_screen_cost:
      "Is the standard screen cost per day included in the Day Delegate rate?",
    in_house_visual_department:
      "If there is an in-house audio visual department, will hotel offer a discount on in-house audio visual equipment?",
  },

  alerts: {
    meeting_error: "Error when saving Meeting Price!",
  },

  groupMeeting: {
    mtgPriceChg: {
      id: "hotelGroupsMeeting.mtgPriceChg",
      name: "hotelGroupsMeeting.mtgPriceChg",
      value: "N",
    },
    day_meeting_offered: {
      id: "hotelGroupsMeeting.day_meeting_offered",
      name: "hotelGroupsMeeting.day_meeting_offered",
    },
    meeting_type_offered: {
      id: "hotelGroupsMeeting.meeting_type_offered",
      name: "hotelGroupsMeeting.meeting_type_offered",
    },
    max_full_day_rate_for_10_50: {
      id: "hotelGroupsMeeting.max_full_day_rate_for_10_50",
      name: "hotelGroupsMeeting.max_full_day_rate_for_10_50",
    },
    max_half_day_rate_for_10_50: {
      id: "hotelGroupsMeeting.max_half_day_rate_for_10_50",
      name: "hotelGroupsMeeting.max_half_day_rate_for_10_50",
    },
    max_full_day_rate_for_50_100: {
      id: "hotelGroupsMeeting.max_full_day_rate_for_50_100",
      name: "hotelGroupsMeeting.max_full_day_rate_for_50_100",
    },
    max_half_day_rate_for_50_100: {
      id: "hotelGroupsMeeting.max_half_day_rate_for_50_100",
      name: "hotelGroupsMeeting.max_half_day_rate_for_50_100",
    },
    total_tax__on_day_meeting_offered: {
      id: "hotelGroupsMeeting.total_tax__on_day_meeting_offered",
      name: "hotelGroupsMeeting.total_tax__on_day_meeting_offered",
    },
    total_tax_on_day_meeting_package_quote: {
      id: "hotelGroupsMeeting.total_tax_on_day_meeting_package_quote",
      name: "hotelGroupsMeeting.total_tax_on_day_meeting_package_quote",
    },
    total_tax_on_day_meeting_package_include_exclude: {
      id: "hotelGroupsMeeting.total_tax_on_day_meeting_package_include_exclude",
      name: "hotelGroupsMeeting.total_tax_on_day_meeting_package_include_exclude",
    },
    banquet_service_amount: {
      id: "hotelGroupsMeeting.banquet_service_amount",
      name: "hotelGroupsMeeting.banquet_service_amount",
    },
    banquet_service_quoted: {
      id: "hotelGroupsMeeting.banquet_service_quoted",
      name: "hotelGroupsMeeting.banquet_service_quoted",
    },
    banquet_service_charges_taxed: {
      id: "hotelGroupsMeeting.banquet_service_charges_taxed",
      name: "hotelGroupsMeeting.banquet_service_charges_taxed",
    },
    banquet_service_include_exclude: {
      id: "hotelGroupsMeeting.banquet_service_include_exclude",
      name: "hotelGroupsMeeting.banquet_service_include_exclude",
    },
    max_cost_for_10_person: {
      id: "hotelGroupsMeeting.max_cost_for_10_person",
      name: "hotelGroupsMeeting.max_cost_for_10_person",
    },
    max_cost_for_25_person: {
      id: "hotelGroupsMeeting.max_cost_for_25_person",
      name: "hotelGroupsMeeting.max_cost_for_25_person",
    },
    free_internet_offer: {
      id: "hotelGroupsMeeting.free_internet_offer",
      name: "hotelGroupsMeeting.free_internet_offer",
    },
    filter: {
      complimentaryParkingOption: {
        id: "complimentaryParkingOption",
        keyField: "groupMeetingConcessionType",
        valField: "value",
      },
      highInternetOption: {
        id: "highInternetOption",
        keyField: "groupMeetingConcessionType",
        valField: "value",
      },
      lcdCostOption: {
        id: "lcdCostOption",
        keyField: "groupMeetingConcessionType",
        valField: "value",
      },
      standardScreenOption: {
        id: "standardScreenOption",
        keyField: "groupMeetingConcessionType",
        valField: "value",
      },
      inHouseVisualOption: {
        id: "inHouseVisualOption",
        keyField: "groupMeetingConcessionType",
        valField: "value",
      },
      groupMeetingConcessionOptions: [
        {
          groupMeetingConcessionType: "",
          value: "",
        },
        {
          groupMeetingConcessionType: "Y",
          value: "Yes",
        },
        {
          groupMeetingConcessionType: "N",
          value: "No",
        },
      ],
    },
  },
  tooltipMessages: {
    dayMeetingPackagesid: "DayMeetingPackagesID",
    meetingOffered: "meetingOffered",
    full_delegate: "full_delegate",
    halfDayId: "halfDayId",
  },
  total_tax_on_day_meeting_package: "total_tax_on_day_meeting_package",
  total_tax_on_day_meeting_package_quote:
    "total_tax_on_day_meeting_package_quote",
  total_tax_on_day_meeting_package_include_exclude:
    "total_tax_on_day_meeting_package_include_exclude",
  banquet_service_amount: "banquet_service_amount",
  banquet_service_quoted: "banquet_service_quoted",
  banquet_service_charges_taxed: "banquet_service_charges_taxed",
  banquet_service_include_exclude: "banquet_service_include_exclude",
};
export default Settings;
