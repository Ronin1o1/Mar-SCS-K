const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getAdminUserAccessList: "/useradminaccess/getUserAccessList",
    updateAdminUser: "/useradminaccess/updateStatus",
  },
  UserRole: "MFPADMIN",
  MaxLengthAlertMessage: "You are allowed to enter up to 100 characters.",
  SuccessMessage: "Changes Saved Successfully!",
  SuccessTitle: "Success Message:",
  AlertTitle: "Alert Message:",
  CloseTitle: "OK - Close Message Box",
  ErrorMessage: "Error in saving the record.",
  labels: {
    PageHeader: "Current List of Authorized MarRFP Users: ",
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
        header1: "State/Province/",
        header2:"Country/Region",
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
