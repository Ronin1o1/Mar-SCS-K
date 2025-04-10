const Settings = {
  api: {
    getGroupProfile: "/groupsprofile/getGroupsProfile",
    updateGroupProfile: "/groupsprofile/updateGroupsProfile", // "/sappaccountviewlist/findAccounts.action",
    // selectSappAccount: "/acctoverview/getAcctOverview"
  },
  route: {
    NextPage: "accBTProfileList",
    PreviousPage: "accBTProfileList",
  },
  validation_details: {
    regex: /^[0-9]*$/,
  },
  GroupProfileDetails: {
    accountInformation:
      "Information regarding High Impact Meetings for the account can be found in an attachment under the account information in SFA.",
    GroupBudget: "Account Provided Group Spend/Budget",
    GroupLodging: "Annual Group Lodging Spend/Budget:",
    USD: "USD",
    ConventionRoom: "Annual Convention Room Revenue Potential:",
    AnnualConvention: "Annual Convention F & B Revenue Potential:",
    AnnualGroupRoom: "MI's Annual Group Room Revenue (source: MRDW):",
    GroupOverviewMeetings: "Group Overview - Meetings",
    TotalAccountMettings: "What total number of account meetings per year?",
    PercentageOnContracts: "Usual Attrition Percentage on Contracts:",
    NumberOfSmallMeetings: "Number of small meetings 1-300 room on peak:",
    NumberofLargeMeetings:
      "Number of large (non-annual) meetings 301-1000+ rooms on peak:",
    GSA: "Uses Marriott Group Sales Agreement (GSA)?",
    IntermediaryServices:
      " Describe Account use of Traditional Intermediary Services (Full Services, Contracting, site selection, housing, on-site, research, other):",
    ConcessionsMeetings: "Requirements/Concessions for Meetings:",
    ConcessionsAnnualMeetings: " Requirements/Concessions for Annual Meeting:",
    AnnualOverviewMeetings: "Annual Meeting Overview",
    AccountAnnualMeeting:
      "Does Account have an Annual Meeting (Y/N), if yes, please profile below?",
    TimeAnnualMeeting: "Lead time for Annual meeting:",
    Slippage: "Slippage:",
    Intermediaries: "Use of Intermediary(ies):",
    NoOfAttendies: "Number of attendees:",
    PeakRooms: "Peak Rooms:",
    TimeOfYear: "Time of year:",
    Location: "Location/rotation:",
    YearsBooked: "Years Booked:",
    NextOpenYear: "Next Open Year:",
    RoomBudget: "Room Spend/Budget:",
    FBBudget: "F&B Spend/Budget:",
    AVBudget: "AV Spend/Budget:",
    AffiliateBudget: "Affiliate Spend/Budget:",
    GSAs: "Uses Marriott Group Sales Agreements (GSA):",
    CustomizedGroup: "Uses Company/Org Customized group contract:",
    CustomizedGroupClauses: "Uses Company/Org Customized group clauses:",
    AnnualMeetingProfile: "Annual Meeting Profile:",
    RequestGeneralConcessions: " Account Request General Concessions:",
    GroupLodgingTitle: "What is the annual group lodging spend broken down by?",
    ConventionRoomTitle:
      "What percentage of total group spend is on guest rooms?",
    AnnualConventionTitle: "What percentage of total group spend is on F&B?",
    AnnualGroupRoomTitle:
      "What is the share % of the total group lodging spend that Marriott receives ?",
    TotalAccountMettingsTitle:
      "How many meetings a year does this account usually have?",
    PercentageOnContractsTitle:
      "What is the usual Attrition percentage on the contract?",
    NumberOfSmallMeetingsTitle:
      "How many meetings a year does this account usually have with 1-300 peak rooms?",
    NumberofLargeMeetingsTitle:
      "How many meetings a year does this account usually have with 301-1000+ peak rooms?",
    GSATitle:
      "Does this account utilize the Marriott Group Sales Agreement (GSA)?",
    IntermediaryServicesTitle:
      "Describe Account use of Traditional Intermediary Services (Full Services, Contracting, site selection, housing, on-site, research, other)",
    ConcessionsMeetingsTitle: "Requirements/Concessions for Meetings:",
    ConcessionsAnnualMeetingsTitle:
      " Requirements/Concessions for Annual Meeting:",
    AnnualOverviewMeetingsTitle: "Annual Meeting Overview",
    AccountAnnualMeetingTitle:
      "Does Account have an Annual Meeting (Y/N), if yes, please profile below?",
    TimeAnnualMeetingTitle:
      "What is the typical lead time for the account’s annual meeting?",
    SlippageTitle:
      "Does the room block or event number drop - if yes, what is the typical drop?",
    IntermediariesTitle:
      "Does the account use an intermediary for their annual meeting?",
    NoOfAttendiesTitle:
      "What is the typical number of attendees for their annual meeting?",
    PeakRoomsTitle: "What is the typical peak rooms for their annual meeting?",
    TimeOfYearTitle: "What time of year is their annual meeting?",
    LocationTitle:
      "Is the annual meeting at the same place every year? If yes, describe where.  If no, explain if it rotates.",
    YearsBookedTitle: "How many years out is the annual meeting booked for?",
    NextOpenYearTitle:
      "What is the next year that they will be looking to book a property for the annual event?",
    RoomBudgetTitle:
      "What is the average rooms budget spent on the Annual meeting?",
    FBBudgetTitle:
      "What is the average F&B budget spent on the annual meeting?",
    AffiliateBudgetTitle:
      "What is the average affiliate budget spent on the annual meeting?",
    AVBudgetTitle: "What is the average AV budget spent on the annual meeting?",
    GSAsTitle:
      "Does this account utilize the Marriott Group Sales Agreement (GSA) for annual meeting?",
    CustomizedGroupTitle:
      "Is there a company customized group contract that this account utilizes for annual meeting?",
    CustomizedGroupClausesTitle:
      "Is there a company customized group clause that this account utilizes on the contract for annual meeting?",
    AnnualMeetingProfileTitle:
      "Please profile the annual meeting (including history, request, spacing, etc.)",
    RequestGeneralConcessionsTitle:
      "Does the account usually request general concessions?",
    AlertRangeMessage: "Please enter a value between 0 and 100",
    IntermediaryServicesReq:
      "'Describe Account's use of Traditional Intermediary Services' text cannot exceed 255 characters.",
    ConcessionsMeetingsReq:
      "'Requirements/Concessions for Meetings' text cannot exceed 1024 characters",
    ConcessionsAnnualMeetingsReq:
      "'Requirements/Concessions for Annual Meeting' text cannot exceed 1024 characters",
    AnnualMeetingProfileReq:
      "'Annual Meeting Profile' text cannot exceed 1024 characters.",
    RequestGeneralConcessionsReq:
      "'Account Request General Concessions' text cannot exceed 1024 characters",
  },
};
export default Settings;
