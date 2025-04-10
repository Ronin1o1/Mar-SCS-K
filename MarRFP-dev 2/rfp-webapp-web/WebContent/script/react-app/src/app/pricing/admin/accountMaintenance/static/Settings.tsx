const Settings = {
  api: {
    getAccountList: "/accountmaintenance/getAccountList.action",
    getFilteredAccountList: "/accountmaintenance/getAccountList.action",
    accountEdit: "/accountmaintenanceedit/view.action",
    getMcadList: "/accountmaintenance/getMcadData.action",
    getAccountFromandTo: "/pricingadmin/complexitymatrix.action",
    //getEmailData: "/accountmaintenanceedit/getRecapEmailData",
    getEmailData: "/accountmaintedit/getAdditionalText.action",
    updateData: "/accountmaintedit/updateAdditionalText.action",
    addData: "/accountmaintenanceedit/addData.action",
    onRecapEmailLaunch: "/accountmaintedit/rfpLaunchEmail.action",
    getCopyAccountInfo: "/accountmaintcopy/getAccountCopyInfo.action",
    updateCopyAccountInfo: "/accountmaintcopy/update.action",
    getUserDetails: "/user/getUserDetails.action",
  },
  yes: {
    label: "Y",
  },
  noCache: "no-cache",
  headerLabels: {
    period: "Period: ",
    accountName: "Name:",
    returnLinkLabel: "Return to Account Maintenance List",
  },
  cModal: {
    cancelImgTitle: "OK - Close Message Box",
  },
  accountList: {
    pageTitle: "Pricing Administration : Account Maintenance",
    C: "C",
    one: "1",
    allAccountTypes: {
      accountpricingtype: "*",
      accountpricing: "All Account Types",
    },
    allAccountSegments: {
      accountsegment: "*",
      accounttypedescription: "All Account Segments",
    },
    criticalFields: "criticalFields",
    accountEditPath: "accountEdit",
    accountListPath: "accountList",
    accountmaintCopyPath: "accountmaintcopy",
    currentPageId: {
      currentPage: "strPage",
    },
    tableColumns: {
      segment: {
        field: "accounttypedescription",
        header: "Segment",
      },
      account: {
        field: "accountname",
        header: "Account",
      },
      dueDate: {
        field: "duedate",
        header: "Due Date",
      },
      accountViewable: {
        field: "hotel_display",
        header: "Account Viewable",
      },
    },
    filter: {
      formFields: {
        period: {
          id: "searchperiod",
          label: "Period: ",
          keyField: "period",
          valField: "period",
        },
        showAll: {
          id: "r_1",
          label: "Show ALL Accounts",
          value: "ALL",
        },
        sort: {
          id: "orderby",
          label: "Sort by: ",
          keyField: "orderBy",
          valField: "value",
        },
        accountType: {
          id: "accountpricingtype",
          label: "Account Type: ",
          keyField: "accountpricingtype",
          valField: "accountpricing",
        },
        showStart: {
          id: "r_1",
          label: "Show Accounts Containing: ",
          textId: "filterString",
          value: "FILTER",
        },
        accountSegment: {
          id: "accountsegment",
          label: "Account Segment: ",
          keyField: "accounttype",
          valField: "accounttypedescription",
        },

        showGroup: "show",
      },
      sortOptions: [
        {
          orderBy: "1",
          value: "Account",
        },
        {
          orderBy: "0",
          value: "Segment",
        },
        {
          orderBy: "2",
          value: "Due Date",
        },
        {
          orderBy: "3",
          value: "Account Viewable",
        },
      ],
    },
  },
  accountEdit: {
    pageTitle: "Pricing Administration : Account Maintenance Edit",
    tabs: [
      { id: "criticalFields", label: "Account Maintenance: Critical Fields" },
      { id: "rateLoading", label: "Account Maintenance: Rate Loading" },
      { id: "rfpSettings", label: "Account Maintenance: RFP Settings" },
      {
        id: "complexityMatrix",
        label: "Account Maintenance: Complexity Matrix",
      },
      { id: "mcadLookup", label: "Account Maintenance MCAD Lookup" },
      { id: "questions", label: "Account Specific Questions Maintenance" },
      {
        id: "groupMeetings",
        label: "Account Specific Group Meetings Questions Maintenance",
      },
    ],
    copyAccountTabs: [
      { id: "criticalFields", label: "Account Maintenance: Critical Fields" },
    ],
    tabList: [
      { id: "criticalFields", label: "Account Maintenance: Critical Fields" },
      { id: "rateLoading", label: "Account Maintenance: Rate Loading" },
      { id: "rfpSettings", label: "Account Maintenance: RFP Settings" },
      {
        id: "complexityMatrix",
        label: "Account Maintenance: Complexity Matrix",
      },
      { id: "mcadLookup", label: "Account Maintenance MCAD Lookup" },
      { id: "questions", label: "Account Specific Questions Maintenance" },
    ],
  },
  complexityMatrix: {
    merger: {
      id: "mergers",
      label: "- Mergers, acquisitions, renames:",
    },
    addendum: {
      id: "addendum",
      label: "- Addendum Questions complexity - grounded in time spent:",
    },
    sales: {
      id: "sales",
      label: "- Sales Account Team rating - grounded in time spent:",
    },
    account: {
      id: "account",
      label: "Account Complexity Matrix – Rating Criteria",
    },
    totalAccount: {
      id: "totalAccount",
      label:
        "- Total account complexity bonus points (not related to metrics above):",
    },
    substantiate: {
      id: "substantiate",
      label: "Comments to substantiate total account complexity bonus points:",
    },
    rfpFiles: {
      id: "rfpFiles",
      label: " RFP files sent (initial + add-ons):",
    },
    renegotiation: {
      id: "renegotiation",
      label: "Renegotiation batches submitted:",
    },
    totalRFP: {
      id: "totalRFP",
      label: "Total RFP files sent:",
    },
    totalRenegotiation: {
      id: "totalRenegotiation",
      label: " Total Renegotiation batches submitted: ",
    },
    rateAudits: {
      id: "rateAudits",
      label: "Rate Audits comments/notes:",
    },
    rfpfilesent: {
      id: "rfpfilesent",
    },
    renegsubmit: {
      id: "renegsubmit",
    },
  },
  RFPEmailLaunch: {
    title: "RFP Launch Recap Email",
    sendEmail: "Email sent successfully",
    saveData: "Additional text saved Successfully",
  },
  EditEmailLaunch: {
    additional_text: {
      id: "additional_text",
      label: "Additional Text(optional):",
    },
    btnSave: {
      label: "btnSave",
    },
    btnClear: {
      label: "btnClear",
    },
    btnSendEmail: {
      label: "btnSendEmail",
    },
    btnCancel: {
      label: "btnCancel",
    },
    maxLength: 500,
    emailLaunchAlertMessage: "You are allowed to enter up to 500 characters.",
  },
  accountmaintcopy: {
    pageTitle: "Pricing Administration : Account Maintenance New",
  },
  copyAccountInfo: {
    modal: {
      modalContent:
        "You must select the account from which the new account is to be created.",
      modalXPosition: -200,
      modalYPosition: 30,
      title: "OK - Close Message Box",
    },
    altNextButton: "Next",
    currentPeriod: { name: "Current Period:", id: "period" },
    copyFromExistingAccount: {
      name: "Copy new account from existing account",
      id: "copyFromExistingAccount",
    },
    copyAccount: {
      id: "copyaccounts",
      copyFrom: "Copy From:",
      period: { name: "Period:", key: "accountid", value: "period" },
      selectPeriodId: "copyFromPeriod",
      selectAcountRecId: "copyFromAccountrecid",
      account: { name: "Account:", key: "accountrecid", value: "accountname" },
      copySAPPId: "copySAPP",
      copySAPPName: "Copy Account Overview/SAPP",
      initialCopyAccount: {
        accountrecid: "*",
        accountname: " ",
      },
      on: "on",
      off: "off",
    },
    instructionPart1: "If you do",
    instructionPart2: "not",
    instructionPart3:
      "copy an account from the prior year, any special rules that were applied in prior years will no longer apply (i.e. KPMG). Also, reports that use data from multiple years, will not associate the new account with the account from the,prior year even if the name is exactly the same (i.e., the PDR report).",
    instructionPart4: "Note:",
    instructionPart5:
      "An existing account can only be copied to once to the current period; therefore, once it has been copied it will drop off the list.",
    space: " ",
  },
};
export default Settings;
