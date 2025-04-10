const Settings = {
  api: {
    getAllAccountStatus: "/changeaccountstatus/getAllAccStatus.action",
    getListOfAccountStatus: "/accountstatus/getListOfAccountStatus.action",
    updateAccountStatus: "/accountstatus/updateaccountstatus.action",
    accountStatusSearch: "/accountstatus/updateaccountstatus.action",
  },
  headerLabels: {
    period: "Period :",
    accountName: "Name:",
    returnLinkLabel: "Return to Account Status List",
  },
  accountStatusList: {
    pageTitle: "Pricing : Account Status",
    C: "C",
    one: "0",
    currentYear: "Current Year",
    allAccountTypes: {
      accountpricingtype: "*",
      accountpricing: "All Account Types",
    },
    allAccountSegments: {
      accountsegment: "*",
      accounttypedescription: "All Account Segments",
    },
    allPASManagers: {
      adminRespondentid: "*",
      personName: "All PAS Managers",
    },
    allaccountStatusRef: {
      accountStatusId: 0,
      accountStatusName: "All Account Status",
    },
    currentPageId: {
      currentPage: "strPage",
    },
    tableColumns: {
      account: {
        field: "accountname",
        header: "Account Name",
      },
      Portfolio: {
        field: "portfolio",
        header: "Portfolio",
      },
      NonPreferredGPP: {
        field: "process_aer",
        header: "Non-Preferred GPP",
      },
      locked: {
        field: "locked",
        header: "Locked",
      },
      lockedDate: {
        field: "lockDate",
        header: "Locked Date",
      },
      status: {
        field: "acctStatusName",
        header: "Status",
      },
      accountNotes: {
        field: "status_text",
        header: "Account Notes",
      },
      internalPasNotes: {
        field: "internalpasnotes",
        header: "Internal PAS notes",
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
        portfolioOption: {
          id: "portfolioOption",
          keyField: "portfolioType",
          valField: "value",
        },
        accountType: {
          id: "accountpricingtype",
          label: "Account Type: ",
          keyField: "accountpricingtype",
          valField: "accountpricing",
        },
        showStart: {
          id: "r_StartsWith",
          label: "Show Accounts starting with: ",
          textId: "filterString",
          value: "FILTER",
        },
        showPortfolio: {
          id: "c_1",
          label: "Show Portfolio ",
          value: "N",
        },
        accountStatusRefList: {
          id: "accountStatusRefList",
          label: "Show Account status with: ",
          keyField: "accountStatusId",
          valField: "accountStatusName",
        },
        accountSegment: {
          id: "accountSegment",
          label: "Account Segment: ",
          keyField: "accounttype",
          valField: "accounttypedescription",
        },
        pasManager: {
          id: "pasManager",
          label: "PAS Manager: ",
          keyField: "adminRespondentid",
          valField: "personName",
        },

        showGroup: "show",
      },
      sortOptions: [
        {
          orderBy: "0",
          value: "Account",
        },
        {
          orderBy: "3",
          value: "Non-Preferred GPP",
        },
        {
          orderBy: "1",
          value: "Locked",
        },
        {
          orderBy: "4",
          value: "Status",
        },
        {
          orderBy: "2",
          value: "Notes",
        },
      ],
      salesRoleSortOptions: [
        {
          orderBy: "0",
          value: "Account",
        },
        {
          orderBy: "1",
          value: "Notes",
        },
      ],
      portfolioOptions: [
        {
          portfolioType: "A",
          value: "Show All",
        },
        {
          portfolioType: "Y",
          value: "Show Only With Portfolio",
        },
      ],
    },
  },
  accountStatusChange: {
    title: "Account Status Change",
    formFields: {
      accountStatus: {
        id: "accountstatusid",
        label: "Change Account Status:",
      },
    },
    saveBtnAltText: "save",
  },
  accountStatusChangeAlert: {
    title: "Alert Message",
    message: "Please select a Status reason",
  },
  urlencode: "application/x-www-form-urlencoded",
};
export default Settings;
