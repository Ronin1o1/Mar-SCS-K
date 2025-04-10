const Settings = {
  api: {   
    copyAccountInfo:"/copyAccountInfoBySegment/copyAccountInfo.action",
    copyAccountInfoCopyBtn:"/copyAccountInfoBySegment/copy.action"
  },
  
  

  accountTierDetails:{
    copyTitle: "Pricing Administration : Copy Account Information by Segment",
    accounttype:"accounttype",
    validationTo:"Please pick a period after ", 
    validationFrom:"Please pick a period before ",
    accountToAlert:"Please select the To Period.",
    accoutFromAlert:"Please select the From Period.",
    accountSegmenttalert:"Please select the Account Tier.",
    copybtn:"copybtn",
    toPeriod:"toPeriod",
    period:"period",
    accountSegment:"accountSegment",
    fromPeriod:"fromPeriod",
    accounttypedescription:"accounttypedescription",
    heading:"Pricing Administration :Copy Account Information by Segment",
    title:"Only accounts marked as account-plan-only = Y will be copied.",
    copyButton:{label:"COPY"},
    formFields:{
      accountTier:{
        id:"accountSegment",
        label:"Account Tier:"
      },
      fromPeriod:{
        id:"fromPeriod",
        label:"From Period:"
      },
      toPeriod:{
        id:"toPeriod",
        label:"To Period:"
      },
      accountTierData:{
        "accounttype": "",
        "accounttypedescription": "",
        "defaultcom": null
      },
      blankData:{
        "period": "",
        "startdate": null,
        "enddate": null,
        "hotelsview": "",
        "dueDates": null,
        "shortStartdate": "",
        "shortEnddate": ""
      },
     
    }
  }
};
export default Settings;
