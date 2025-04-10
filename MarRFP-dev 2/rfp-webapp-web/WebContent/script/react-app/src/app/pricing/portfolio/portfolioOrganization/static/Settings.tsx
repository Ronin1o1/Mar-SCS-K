const Settings = {
  api: {
    getHotelSolicitationAvailonLoad: "/portfolioorgavail/getPortfolioOrganization.action",
    getHotelSolicitationSelectonLoad: "/portfolioorgselect/getPortfolioOrganization.action", 
    getHotelSolicitationPricingFilter: "/portfolioorganization/getPortfolioOrganizationPricingFilter.action",
    getHotelSolicitationAvail: "/portfolioorgavail/getPortfolioOrganization.action",
    getHotelSolicitationSelect: "/portfolioorgselect/getPortfolioOrganization.action",
    setHotelSolicitationAvailUpdate: "/portfolioorgavail/update.action",   
    setHotelSolicitationSelectUpdate: "/portfolioorgselect/update.action?nextUrl=/portfolioorg/refresh.action",
    getHotelSolicitaionFindFilter: "/portfolioorgfindfilter/getPortfolioOrganizationFindFilter.action",
    showFilterOptions: "/portfolioorganization/getPortfolioOrganizationPricingFilter.action",
    getFilterViewLists: "/portfolioorganization/getFilterViewLists.action",
   },
  title : "Pricing : Portfolio Organization",
  hotelSolicitationAvail: {
    gethotelSolicitationAvail: "gethotelSolicitationAvail",
    getHotelSolicitationSelect: "getHotelSolicitationSelect"
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input"
  },
  tableColumns: {
    hasgenpricing: {
      field: "hasgenpricing"
    },
    ratetypeselected:{
      field:"ratetype_selected"
    },
    selected:"selected",
    subsetname:"subsetname",
    hotelid: {
      field: "hotelid",
    },
    hotelidCheckbox : {
      field: "hotelid",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    volunteered:{
      field: "volunteered",
      header: "volunteered",
    },
    hotelname: {
      field: "hotelname",
      header: "Name"
    },
    city: {
      field: "city",
      header: "City"
    },
    state: {
      field: "state",
      header: "State/</br>Province"
    },
    country: {
      field: "country",
      header: "Country/</br>Region"
    },
    nopricing: {
      field: "nopricing",
      header: "Not Pricing"
    },
    subset: {
      field: "subset",
      header: "Subset"
    },
    status_CBC: {
      field: "status_CBC",
      header: "CBC</br>Rejection"
    },
    status: {
      field: "status",
      header: "Status"
    },
    email_sent_flag: {
      field: "email_sent_flag",
      header: "Initial Email</br>Sent"
    },
    send_initial_email: {
      field: "send_initial_email",
      header: "Send Initial</br>Email"
    },
    check_rate: {
      field: "check_rate",
      header: "Property</br>Responded"
    },
    chasemail_sent_flag: {
      field: "chasemail_sent_flag",
      header: "Chase Email Sent"
    },
    sent_chasemail: {
      field: "sent_chasemail",
      header: "Send Chase Email"
    }
  },
  nextUrl:"/portfolioorgavail/refresh.action",
  componentName : "portfolioOrganization",
  checkAvail: "checkAvail",
  solicitSelect: "solicitSelect",
  sendemail: "sendemail",
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N"
  },

  chasemail: "chasemail",
  move: "move",
  gridTR: "gridTR",
  selectedValue: "selectedValue",
  availableValue: "availableValue",
  quickSelectObject :  {
    label: "Hotel List:",
    textareaId: "hotellist2",
    row: 10,
    cols: 100,
    textareaName: "hoteldlist2"
  },
  width730:"694px",
  width180 : "168px",
  width220 : "202px",
  width210 : "246px",
  width98 : "694px",
  chaseEmailCheckAlert : 'The Send Initial Email box is already checked.\nYou cannot send both an initial email and a chase email at the same time.',
  sendMailAlert : 'The Send Chase Email box is already checked. \n You cannot send both an initial email and a chase email at the same time.',
  success : "success",
  alertAccountCheck : "Please select an account.",
  emailsWillBeSentfrom : "The emails will be sent from the ",
  continueWithoutAttachement : "Click on OK to continue without an attachment.",
  clickCancel : "Click on Cancel to go back to Hotel Solicitation screen.",
  continueWithAttachment : "The emails will be sent with the following attachment: ",
  clickOktoContinue : "Click on OK to continue.",
  clickCancelToGoBack : "Click on Cancel to go back to Hotel Solicitation screen.",
  fileCannotBeAttached : "Selected file cannot be successfully attached.",
  formatMessage : "Please ensure the file is a Word, Excel, or Adobe Acrobat (PDF) files and that 		it is less than 10MB.",
  hotelsMatchingCriteria : "Subset A:",
  hotelsSelectedCriteria : "Hotels selected to price",
  SubsetB : "Subset B:",
  addemailtext_screentype : "S",
  urlencode : "application/x-www-form-urlencoded",
  noCache : "no-cache",
  additionalSendMail : {
    textareaId : "hotelSolicitationAddEmailInfo.additional_text",
    textareaName : "hotelSolicitationAddEmailInfo.additional_text",
    textareaCols : "80",
    textareaRows : "5",
    dateInputId : "hotelSolicitationAddEmailInfo.additional_text",
    dateInputName : "hotelSolicitationAddEmailInfo.additional_text",
    dateInputMaxLength : "10",
    sendfromtypeId : "hotelSolicitationAddEmailInfo.sendfromtype",
    sendfromtypeName : "hotelSolicitationAddEmailInfo.sendfromtypeName",
  }
};
export default Settings;