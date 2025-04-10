const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    admin: {
      adminupdatedetails: "/adminmudroom/getAdminMudroomDetails",
      adminsavedetails: "/adminmudroom/updateadminmudroom",
    },
    sales: {
      salesupdatedetails: "/salesmudroom/getSalesMudroomDetails",
      salessavedetails: "/salesmudroom/updatesalesmudroom",
    },
    limitedsales: {
      limitedsalesdetails: "/salesmudroompc/getSalesMudroomPC",
    },
    hotelUser: {
      hoteluserdetails: "/hotelmudroom/getHotelMudroom",
      hotelsavedetails: "/hotelmudroom/updatehotelmudroom",
    },
  },

  updateContactInfo: {
    pageTitle: "Welcome to MarRFP!",
    pageTitleUpdate: "Update Admin Contact Information",
    pageTitleSalesUpdate: "Update Sales Contact Information",
    pageTitleHomeUpdate: "Update Hotel Contact Information",
    name: "Name",
    adminName: "Sonia Gulipalli",
    btnUpdate: "Update",
    instructions:
      "Please complete all contact fields including e-mail address.  It is important that all information be accurate since it will be used to contact you.",
    title: "Title",
    titleName: "Front End Developer",
    email: "Email",
    emailID: "sonia.gulipalli@accenture.com",
    countryCode: "Country Code",
    countryCodeNumber: "080",
    forEg: "For example, US=001",
    area_cityCode: "Area/City Code",
    area_cityCodeNumber: "5309",
    phone: "Phone",
    phoneNumber: "7386410872",
    fax: "Fax",
    faxNumber: "",
    salesLocation: " Sales Location",
    salesTypeSelection: "Please select your Sales Type(s) below.",
    availableSalesType: "Available Sales Types",
    selectedSalesType: "Selected Sales Types",
    yearName:
      "Please choose the year and identify your accounts for that year below.",
    year: "Year",
    period: "period",
    primarySalesTypeSelection: "Available Accounts as Primary Contact:",
    primarySelectedTypeSelection: "Selected Accounts as Primary Contact:",
    secSalesTypeSection: "Available Accounts as Secondary Contact:",
    secSelectedTypeSection: "Selected Accounts as Secondary Contact:",
    hidden: "hidden",
    salesType: " Sales Type",
    salesRegion: "Sales Region",
    salesArea: "Market Sales Area",
    partMarketSalesOrFunded:
      "If you are part of market sales or are funded by particular properties, please identify the MARSHA codes(s) of the hotel(s) that fund you below",
    availableHotels: "Available Hotels",
    hotelsFundingYou: "Hotels funding you",
    fillAllFieldsAlert: "You must fill in all Admin Contact fields.",
    selectOneSalesAlert: "You must select at least one Sales Type",
    noPrimAndSecSameAlert:
      "You cannot be a Primary and Secondary Contact for the account: ",
    salesContactAlert: "You must fill in all Sales Contact fields.",
    hotelContactAlert: "You must fill in all Hotel Contact fields.",
    adminEmailValidationAlert:
      "Please enter a valid email address for the Admin Contact.",
    hotelEmailValidationAlert:
      "Please enter a valid email address for the Hotel Contact.",
    salesEmailValidationAlert:
      "Please enter a valid email address for the Sales Contact.",
    showAll: "*",
    closeMessage: "OK - Close Message Box",
    alertMessage: "Alert Message",
    limitedSalesAcctMAEText:
      "Please select the hotels and accounts for which you are the primary contact. Click on the view primary contact box below to see who has linked themselves to the accounts as primary contact.",
    hotelTitleText: "Hotel (",
    endingBracs: ")",
    noDataFound: "No Data Found!!",
    accountTitleText: "Account (",
    primaryAccountHotelTitle: "Primary Contact for Hotel/Account (",
    hotelText: "Hotel",
    acctText: "Account",
    hotelsNotPresent:
      "You must select the hotel(s) to which you are assigning the primary contact to.",
    accountsNotPresent:
      "You must select the account(s) to which you are assigning the primary contact to.",
    primaryAccountsNotSelected:
      "You must select the hotel/accounts which for which you are no longer the primary contact.",
    salesMudroomModalTitle: "Sales Mudroom Primary Contacts",
    closeText: "Close",
    primaryContactsTitle: "Primary Contacts",
    primaryContactModalInstructions_1:
      "If you are the primary contact for the hotel/account(s) combination listed below, it is your responsibility to inform the individual below to remove themselves from the respective account(s).",
    primaryContactModalInstructions_2:
      "This will enable you to update your profile and make yourself the primary for the hotel/account combination.",
    pcForHA: "Primary Contact for Hotel/Account",
    personText: "Person",
    phoneNumberText: "Phone Number",
    alreadyAssignedAlert:
      "Some of the hotel/account combinations that you tried to assign yourself as the primary contact have already been assigned to someone else. \n\nClick on the view primary contact box below to see who has linked themselves to the accounts as primary contact.",
  },

  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
    radio: "radio",
    hidden: "hidden",
  },

  filter: {
    periodOption: {
      id: "periodOption",
      keyField: "period",
      valField: "period",
    },
  },

  validation_details: {
    re_number: /^[0-9\b]+$/,
    re_phone_fax_number: /(^[0-9]+$|[-]$|[0-9]+$|^$)/,
    re_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    re_country_code: /^\d*\.?(?:\d{1,2})?$/,
    re_area_city_code: /^\d*\.?(?:\d{1,3})?$/,
  },
};
export default Settings;
