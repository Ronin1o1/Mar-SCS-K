const Settings = {
  api: {
    getHotelSolicitationAvailonLoad:
      "/hotelsolicitationavail/getHotelSolicitationAvail.action",
    getHotelSolicitationSelectonLoad:
      "/hotelsolicitationselect/getHotelSolicitationSelected.action",
    getContactType: "/hotelsolicitationemailinfo/getContactType.action",
    sendEmailpostcall:
      "/hotelsolicitationselect/sendEmail.action?nextUrl=/hotelsolicitationselect/refresh.action",
    getHotelSolicitationPricingFilter:
      "/hotelsolicitation/getHotelSolicitationPricingFilter.action",
    getHotelSolicitationAvail:
      "/hotelsolicitationavail/getHotelSolicitationAvail.action",
    getHotelSolicitationSelect:
      "/hotelsolicitationselect/getHotelSolicitationSelected.action",
    setHotelSolicitationAvailUpdate:
      "/hotelsolicitationavail/update.action?nextUrl=/hotelsolicitationavail/refresh.action",
    setHotelSolicitationSelectUpdate:
      "/hotelsolicitationselect/update.action?nextUrl=/hotelsolicitationselect/refresh.action",
    getHotelSolicitaionFindFilter:
      "/hotelsolicitationfindfilter/getHotelSolicitationFindFilter.action",
    showFilterOptions:
      "/hotelsolicitation/getHotelSolicitationPricingFilter.action",
    gethotelsolicitationemailinfonew:
      "/hotelsolicitationemailinfonew/getHotelSolicitationAddEmail.action",
    hotelsolicitationAddInfo: "/hotelsolicitationemailinfonew/update.action",
    getFilterViewLists: "/hotelsolicitation/getFilterViewLists.action",
  },
  title: "Pricing : Hotel Solicitation",
  hotelSolicitationAvail: {
    gethotelSolicitationAvail: "gethotelSolicitationAvail",
    getHotelSolicitationSelect: "getHotelSolicitationSelect",
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  tableColumns: {
    hotelid: {
      field: "hotelid",
    },
    hotelidCheckbox: {
      field: "hotelid",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    hotelname: {
      field: "hotelname",
      header: "Name",
    },
    city: {
      field: "city",
      header: "City",
    },
    hasgenpricing: {
      field: "hasgenpricing",
      header: "hasgenpricing",
    },
    state: {
      field: "state",
      header: "State/</br>Province",
    },
    country: {
      field: "country",
      header: "Country/</br>Region",
    },
    nopricing: {
      field: "nopricing",
      header: "Not Pricing",
    },
    status_CBC: {
      field: "status_CBC",
      header: "CBC</br>Rejection",
    },
    status: {
      field: "status",
      header: "Status",
    },
    email_sent_flag: {
      field: "email_sent_flag",
      header: "Initial Email</br>Sent",
    },
    send_initial_email: {
      field: "send_initial_email",
      header: "Send Initial</br>Email",
    },
    check_rate: {
      field: "check_rate",
      header: "Property</br>Responded",
    },
    chasemail_sent_flag: {
      field: "chasemail_sent_flag",
      header: "Chase Email Sent",
    },
    sent_chasemail: {
      field: "sent_chasemail",
      header: "Send Chase Email",
    },
    ratetype_selected: {
      field: "ratetype_selected",
      header: "ratetype_selected",
    },
    volunteered: {
      field: "volunteered",
      header: "volunteered",
    },
  },
  componentName: "HotelSolicitation",
  checkAvail: "checkAvail",
  solicitSelect: "solicitSelect",
  sendemail: "sendemail",
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N",
  },
  chasemail: "chasemail",
  move: "move",
  gridTR: "gridTR",
  selectedValue: "selectedValue",
  availableValue: "availableValue",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    row: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  width730: "730px",
  width700: "700px",
  width180: "160px",
  width220: "202px",
  width210: "214px",
  width98: "978px",
  chaseEmailCheckAlert:
    "The Send Initial Email box is already checked.\nYou cannot send both an initial email and a chase email at the same time.",
  sendMailAlert:
    "The Send Chase Email box is already checked. \n You cannot send both an initial email and a chase email at the same time.",
  success: "success",
  alertAccountCheck: "Please select an account.",
  emailsWillBeSentfrom: "The emails will be sent from the ",
  continueWithoutAttachement: "Click on OK to continue without an attachment.",
  clickCancel: "Click on Cancel to go back to Hotel Solicitation screen.",
  continueWithAttachment:
    "The emails will be sent with the following attachment: ",
  clickOktoContinue: "Click on OK to continue.",
  clickCancelToGoBack:
    "Click on Cancel to go back to Hotel Solicitation screen.",
  fileCannotBeAttached: "Selected file cannot be successfully attached.",
  formatMessage:
    "Please ensure the file is a Word, Excel, or Adobe Acrobat (PDF) files and that 		it is less than 10MB.",
  hotelsMatchingCriteria: "Hotels matching criteria",
  hotelsSelectedCriteria: "Hotels selected to price",
  hotelsSelectedToPrice: "Hotels selected to price",
  addemailtext_screentype: "S",
  multiPart: "multipart/form-data",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  additionalSendMail: {
    textareaId: "hotelSolicitationAddEmailInfo.additional_text",
    textareaName: "hotelSolicitationAddEmailInfo.additional_text",
    textareaCols: "50",
    textareaRows: "8",
    dateInputId: "hotelSolicitationAddEmailInfo.additional_text",
    dateInputName: "hotelSolicitationAddEmailInfo.additional_text",
    dateInputMaxLength: "10",
    sendfromtypeId: "hotelSolicitationAddEmailInfo.sendfromtype",
    sendfromtypeName: "hotelSolicitationAddEmailInfo.sendfromtypeName",
  },
};
export default Settings;
