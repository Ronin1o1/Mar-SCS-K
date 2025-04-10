const Settings = {
  api: {
    getPortfolioRebidFindFilter:
      "/portfoliorebidfindfilter/getPortfolioRebidFindFilter.action",
    getPortfolioPricingFilter:
      "/portfoliorebid/getPortfolioPricingFilter.action",
    getPortfolioRebid: "/portfoliorebidlist/getPortfolioRebid.action",
    getFilterViewLists: "/portfoliorebid/getFilterViewLists.action",
    update: "/portfoliorebidlist/update.action",
    getContactType: "/hotelsolicitationemailinfo/getContactType.action",
    sendMail: "/portfoliorebidlist/sendemail.action",
    ajaxSave: "/portfoliorebidlist/ajaxsave.action",
    gethotelsolicitationemailinfonew:
      "/hotelsolicitationemailinfonew/getHotelSolicitationAddEmail.action",
    hotelsolicitationemailinfoupdate:
      "/hotelsolicitationemailinfo/update.action",
  },
  tableColumns: {
    city: {
      field: "city",
      header: "City",
    },
    country: {
      field: "country",
      header: "Country",
    },
    hotelid: {
      field: "hotelid",
      header: "hotelid",
    },
    hotelname: {
      field: "hotelname",
      header: "Name",
    },
    hotelrfpid: {
      field: "hotelrfpid",
      header: "Hotelrfpid",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    nopricing: {
      field: "nopricing",
      header: "nopricing",
    },
    product_offered: {
      field: "product_offered",
      header: "Product",
    },
    ratetype_selected: {
      field: "ratetype_selected",
      header: "ratetype_selected",
    },
    readonly: {
      field: "readonly",
      header: "readonly",
    },
    rebid_due: {
      field: "rebid_due",
      header: "Rebid Due Date",
    },
    rebid_due2: {
      field: "rebid_due2",
      header: "Rebid Due Date",
    },
    rebid_due3: {
      field: "rebid_due3",
      header: "Rebid Due Date",
    },
    rebid_flag: {
      field: "rebid_flag",
      header: "Rebid",
    },
    rebid_flag2: {
      field: "rebid_flag2",
      header: "Rebid",
    },
    rebid_flag3: {
      field: "rebid_flag3",
      header: "Rebid",
    },
    rebidstatus_desc: {
      field: "rebidstatus_desc",
      header: "Rebid Status",
    },
    rebidstatus_desc2: {
      field: "rebidstatus_desc2",
      header: "Rebid Status",
    },
    rebidstatus_desc3: {
      field: "rebidstatus_desc3",
      header: "Rebid Status",
    },
    rebidstatus_id: {
      field: "rebidstatus_id",
      header: "rebidstatus_id",
    },
    rebidstatus_id2: {
      field: "rebidstatus_id2",
      header: "rebidstatus_id2",
    },
    rebidstatus_id3: {
      field: "rebidstatus_id3",
      header: "rebidstatus_id3",
    },
    regionid: {
      field: "regionid",
      header: "regionid",
    },
    subsetname: {
      field: "subsetname",
      header: "Subset",
    },
    state: {
      field: "state",
      header: "state",
    },
    changed: {
      field: "changed",
      header: "changed",
    },
    selected: {
      field: "selected",
      header: "selected",
    },
    check_respond: {
      field: "check_respond",
      header: "Property Responded",
    },
    chasemail_sent_flag: {
      field: "chasemail_sent_flag",
      header: "Chase Email Sent",
    },
    to_send_chasemail: {
      field: "to_send_chasemail",
      header: "Send Chase Email",
    },
    importance: {
      field: "importance",
      header: "Best & Final",
    },
    shortRebid_due2: {
      field: "shortRebid_due2",
      header: "shortRebid_due2",
    },
    rebidRound1Editable: {
      field: "rebidRound1Editable",
      header: "rebidRound1Editable",
    },
    rebidRound2Editable: {
      field: "rebidRound2Editable",
      header: "rebidRound2Editable",
    },
    shortRebid_due: {
      field: "shortRebid_due",
      header: "shortRebid_due",
    },
    shortRebid_due3: {
      field: "shortRebid_due3",
      header: "shortRebid_due3",
    },
    pricing: {
      field: "pricing",
      header: "pricing",
    },
    rebid1: {
      field: "rebid1",
      header: "Rebid 1",
    },
    rebid2: {
      field: "rebid2",
      header: "Rebid 2",
    },
    rebid3: {
      field: "rebid3",
      header: "Rebid 3",
    },
  },
  inputType: {
    checkbox: "checkbox",
  },
  enter10character: "You are allowed to enter up to 10 characters.",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  gridTR: "gridTR",
  quickselect: {
    heading: "Additional Email Information",
    title:
      "Quick Select - Please ensure the desired due date is entered for Default Rebid Due Date before using the Quick Select functionality.",
  },
  pastDate: "The date must be on or after today.",
  alertMessage: "Alert Message",
  okClose: "Cancel",
  enter200Hotels: "Please enter only 200 hotels at a time.",
  notFoundAlert: "The following MARSHA codes were not found",
  rebidStatusAlert:
    "The following MARSHA codes are already in To Be Rebid status and the Rebid Due Date has not been updated:  ",
  notValidDate:
    " is not a valid date.  Please enter the date in the format mm/dd/yyyy",
  directSelect: "Direct Select",
  clearSelection: "Clear Selection",
  marshacode: "marshacode",
};
export default Settings;
