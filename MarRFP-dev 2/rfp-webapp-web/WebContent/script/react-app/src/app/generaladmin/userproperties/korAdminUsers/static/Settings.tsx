const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getRoomDescAdminUserAccessList: "/userrdadminaccess/getUserRDAdminAccess",
  },
  UserRole: "MFPKORAD",
  labels: {
    PageHeader:
      "Current List of Authorized MarRFP Users:  Room Definition Administrative Users",
    ShowAllUsers: "Show ALL Users",
    SortBy: "Sort by:",
    Search: "Search",
    All: "ALL",
    ShowAll: "ShowAll",
    Id: "id",
    Value: "value",
  },
  gridDetails: {
    columns: {
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
        header: "State/Province/Country/Region",
      },
      phoneno: {
        field: "cn_phone",
        header: "Phone Number",
      },
      email: {
        field: "cn_mail",
        header: "Email",
      },
    },
    NoDataMessage: "No Data Found",
  },
  sortByOptions: [
    {
      id: "1",
      value: "EID",
    },
    {
      id: "2",
      value: "Last Name",
    },
    {
      id: "3",
      value: "First Name",
    },
    {
      id: "4",
      value: "City",
    },
    {
      id: "5",
      value: "State/Province/Country/Region",
    },
  ],
};
export default Settings;
