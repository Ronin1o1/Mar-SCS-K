const Settings = {
  api: {
    getGroupsOverview: "/groupsoverview/getGroupsOverview",
    updateGroupsOverview:
      "/groupsoverview/updateGroupsOverview?nextUrl=/groupsoverview/view",
  },
  fieldHeadings: {
    hotelProgram: "Does account have a 'Preferred Group' hotel program?",
    hotelChain: "Is MI a 'Preferred Group' hotel chain?",
    otherPreferred: "List other preferred chains:",
    topGroup: "Top Group Competitors by Brand:",
    description: "Description/Criteria of 'Preferred Group' program:",
    onlineRfpTool: "Does the account use an Online RFP Tool?:",
    describeRfpTool: "Please describe RFP tool:",
    smallMeetings: "Small Meetings (10-100):",
    largeMeetings: "Large (non-annual) Meetings (100+):",
    annualMeetings: "Annual Meetings:",
    groupSolutions:
      "What group solutions, services and initiatives have you considered and /or implemented:",
    other: "Other:",
  },
  titles: {
    hotelChain:
      "Is Marriott in their preferred hotel program, specifically for group?",
    otherPreferred:
      "If the customer participates in a  preferred hotel program for group, how many Marriott properties participate?",
    description:
      "Are there specific criteria an account must have in order to participate in the preferred hotel program for group?",
    smallMeetings:
      "What is the structure for Group buying decisions - any specific notes on small meetings?",
    largeMeetings:
      "What is the structure for Group buying decisions - any specific notes on large meetings?",
    annualMeetings:
      "What is the structure for Group buying decisions - any specific notes on annual meetings?",
  },
  headers: {
    online: "Online",
    businessOverview:
      "Business Overview - Organizational Structure for Group Buying/Decisions",
  },
  validationMessages: {
    charExceedingAlert: "You are allowed to enter up to 1024 characters.",
    otherPreferredCharExceedingAlert:
      "You are allowed to enter up to 255 characters.",
    otherPreferred:
      "'List other preferred chains' text cannot exceed 255 characters.",
    topGroup:
      "'Top Group Competitors by Brand' text cannot exceed 1024 characters.",
    description:
      "'Description/Criteria of Preferred Group program' text cannot exceed 1024 characters.",
    describeRfpTool:
      "'RFP tool description' text cannot exceed 1024 characters.",
    smallMeetings: "'Small Meetings' text cannot exceed 1024 characters.",
    largeMeetings: "'Large Meetings' text cannot exceed 1024 characters.",
    annualMeetings: "'Annual Meetings' text cannot exceed 1024 characters.",
    groupSolutions:
      "'What group solutions, services and initiatives' text cannot exceed 1024 characters.",
    otherGroupInfo: "'Other' text cannot exceed 1024 characters.",
  },
  headingNames: {
    modalHeading: "Alert Message",
  },
};
export default Settings;
