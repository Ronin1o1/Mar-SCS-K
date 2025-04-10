import groupsMeeting from "../content/groupsMeeting";

const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    hotelgrpsmtgs: "/hotelgrpsmtgs/getHotelRFPGrpsAndMeetings",
    hotelgrpsmtgsave: "/hotelgrpsmtgs/updateHotelGroupMeetingNoStatus",
    updateHotelGroupMeeting: "/hotelgrpsmtgs/updateHotelGroupMeeting",
  },

  route: {
    Deapthofsale: "Deapthofsale",
    priceContact: "priceContact",
    groupsMeeting: "groupsMeeting",
  },

  instructions: {
    details:
      "The Global Business Travel Association (GBTA) standard Business Transient (BT) RFP format contains the following Groups & Meetings questions. Some of our customers request and use these responses throughout the year as a basis to plan small groups/meetings. Therefore, the responses to the following questions may be offered to the account as a supplement to presented BT rates. You may have the opportunity to adjust these standard responses for certain accounts on the Account Specific screen, depending on the customer's level of need.",
    sub_details_one: "We suggest that you enter the ",
    sub_details_highest: "highest",
    sub_details_two:
      " groups & meetings rates possible for the pricing year, as these will be presented to the client as the ",
    sub_details_starting_point: "starting point",
    sub_details_three: " for negotiations.",
    note: " You will always have the right to evaluate a piece of group/meeting business and decide whether or not to bid on the opportunity.",
    header:
      "Answers to the bolded questions in this section cannot be altered in MarRFP. These responses are pulled directly from Product Catalog and must be adjusted in Product Catalog (changes will be reflected in MarRFP the next day).",
    sub_header:
      "For hotels that do not have meeting space and/or are not willing to offer group or meeting pricing in the BT RFP, answer NO to the question below. (No groups & meetings responses will be presented to MarRFP customers.)",
    drop_down_title:
      "Will the hotel offer MarRFP customers any group or meeting responses in the BT RFP?",
  },

  alerts: {
    pricing_field_required:
      "Please fill out Group Pricing & Concessions required fields",
    meeting_field_required:
      "Please fill out Meeting Price & Concessions required fields",
    payment_field_required:
      "Please fill out Groups & Meeting Payment required fields",
    marRFP_selection_error:
      "Please respond Yes or No to whether hotel will \n offer MarRFP customers any Groups & Meetings \n responses in the BT RFP. ",
  },

  groupMeetingsList: {
    filter: {
      formFields: {
        groupMeetingOption: {
          id: "groupMeetingOption",
          keyField: "groupMeetingType",
          valField: "value",
        },
      },
      groupMeetingOptions: [
        {
          groupMeetingType: "",
          value: "",
        },
        {
          groupMeetingType: "Y",
          value: "Yes",
        },
        {
          groupMeetingType: "N",
          value: "No",
        },
      ],
    },
    tabs: {
      tablist: [
        {
          id: "groupPricing",
          label: "Group Pricing & Concessions",
          tabStatus: "",
        },
        {
          id: "meeting",
          label: "Meeting & Pricing Concessions",
          tabStatus: "",
        },
        {
          id: "groupsMeetingsPayment",
          label: "Groups & Meetings Payment",
          tabStatus: "",
        },
      ],
    },
  },
  tooltipMessages: {
    groupMeetingResponsesid: "groupMeetingResponsesID",
    dayMeetingPackagesid: "DayMeetingPackagesID",
    dayMeetingPackages:
      "Day Meeting Packages or Day Delegate rates are Full or Half Day, per-person packaged meeting pricing, including but not limited to food, beverage, AV and meeting space, not including guest room. Answer must be adjusted in Product Catalog ",
  },
  loadingMsg: "Please wait loading...",
  /** end of Group Meetings*************** */
};
export default Settings;
