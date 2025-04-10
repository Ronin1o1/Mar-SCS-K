const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getSalesUsersUrl: "/usersalesaccess/getUserAccessList",
    updateSalesUsersUrl: "/usersalesaccess/updateStatus",
    getUserListDialog: "/userlistdialog/getUserListDialog",
    editAccountUser: {
      populateAccounts: "/usereditsalesaccess/getUserEdit",
      updateAccount: "/useredit/updateAccount",
      deleteAccount: "/useredit/deleteAccount",
      updateSelAcct: "/useredit/updateSelAcctList",
      searchAvailAcctList: "/useredit/updateAvailAcctList",
      userEditCopy: "/usereditcopy/getUserEditCopy",
      searchUserEditCopy: "/usereditcopy/getUserEditCopy",
      searchUserEditUpdate: "/usereditcopy/userEditCopyUpdate",
    },
  },
  labels: {
    titleSalesUsers: "Current List of Authorized MarRFP Users:  Sales Users",
    account: "Account",
    selectAccount: "Select Accounts",
    noDataFound: "No Data Found!!",
    allAccountsSelected: "ALL Accounts Selected!!",
    availAccount: "Available Accounts",
    totalAccounts: "Total Accounts: ",
    typeTitle: "Type: ",
    segmentTitle: "Segment: ",
    accountTypeParam: "All Account Types",
    accountSegmentParam: "All Account Segments",
    showAllAccounts: "Show ALL Accounts",
    showAccountsStart: "Show Accounts starting with: ",
    unselectAllAcct: "Unselect All Shown Accounts.",
    returnUserList: "Return to User List",
    userList: "User List",
    loadingMessage: "Please wait loading...",
    currentAuthorizedList:
      "Current List of Authorized MarRFP Users - Sales Users ",
    changesSaved: "Changes saved successfully!",
    accountListFor: "Account List for ",
    accountName: "Account Name",
    hotellistAlt: "Add Hotel to User Access List.",
    showAllUsers: "Show ALL Users",
    sortBy: "Sort by: ",
    startingWith: "starting with: ",
    allValue: "ALL",
    lastNameValue: "LASTNAME",
    filterValue: "FILTER",
  },
  alerts: {
    enterHundredCharsOnly: "You are allowed to enter up to 100 characters.",
  },
  tableColumns: {
    eid: {
      field: "eid",
      header: "EID",
    },
    lname: {
      field: "cn_lastname",
      header: "Last Name",
    },
    fname: {
      field: "cn_firstname",
      header: "First Name",
    },
    city: {
      field: "cn_city",
      header: "City",
    },
    stateprovince: {
      field: "cn_state",
      header1: "State/Province/",
      header2:"Country/Region",
    },
    account: {
      field: "account",
      header: "Account",
    },
    phoneno: {
      field: "cn_phone",
      header: "Phone Number",
    },
    email: {
      field: "cn_mail",
      header: "Email",
    },
    internalNotes: {
      field: "user_internalnotes",
      header: "Internal Notes",
    },
  },
  inputType: {
    checkbox: "checkbox",

    button: "button",

    input: "input",

    radio: "radio",

    hidden: "hidden",
  },
  defaultSortBy: 1
};
export default Settings;
