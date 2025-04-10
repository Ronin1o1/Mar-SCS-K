
const Settings = {
  api: {   
    getContentOnlyTab4:"/accountmaintedit/getContentOnlyTab4.action",       
    updateTab4:"/accountmaintedit/updateTab4.action",  
    getExcelLink:"/accountmaintedit/download.action"
  },  
  complexityMatrix:{
    merger:{
      id:"mergers",
      label:"- Mergers, acquisitions, renames:"
    },
    notADate : "NaN/NaN/NaN",
    maxLength: 255,
    alertMsg: "You are only allowed to enter 255 characters.",
    mergacqrename:{
      id:"mergacqrename",
      label:"- Mergers, acquisitions, renames:"
    },
    
    addendum:{
      id:"addendum",
      label:"- Addendum Questions complexity - grounded in time spent:"
      },
    sales:{
      id:"sales",
      label:"- Sales Account Team rating - grounded in time spent:"
    },
    account:{
     id:"account",
     label:"Account Complexity Matrix – Rating Criteria"
    },
    totalAccount:{
      id:"totalAccount",
      label:"- Total account complexity bonus points (not related to metrics above):"
    },
    tacbonuscomments:{
      id:"tacbonuscomments",
      label:"- Rate Code Clean-Up Notes:"
    },

   
    rfpFiles:{
    id:"accountDetailCompMatrix.rfpfilesent[0].strDateinfo",
    label:" RFP files sent (initial + add-ons):"
    },
    renegotiation:{
      id:"accountDetailCompMatrix.renegsubmit[0].strDateinfo",
      label:"Renegotiation batches submitted:"
    },
    totrfpfilesent:{
      id:"totrfpfilesent",
      label:"Total RFP files sent:"
    },
    totrenegsubmit:{
      id:"totrenegsubmit",
      label:" Total Renegotiation batches submitted: "
    },
    rateauditcomments:{
      id:"rateauditcomments",
      label:"Rate Audits comments/notes:"
    } ,
    rfpfilesent:{
      id:"rfpfilesent"
    },
    renegsubmit:{
      id:"renegsubmit"
    },
    addQuestCompList:{
      id:"addQuestCompList"
    },
    addquestcomp:{
      id:"addquestcomp"
    },
    ratingtext:{        
      id:"ratingtext"
    },
    satRatingList:{
      id:"satRatingList"
    },
    satrating:{
      id:"satrating"
    },
    tacbonus:{
      id:"tacbonus"
    },
    alertMessage:{
      label:"Are you sure you want to delete this row?\n\n Press OK to delete the row\n Press Cancel to leave the row"
    },
    filename:"Account_Complexity_Matrix_Rating_Criteria",
    dateFormatMessage:"Enter the date in the format: mm/dd/yyyy",
    rowInserted:"Insert Row",
    rowDeleted: "Delete Row",
    accountCompDropDowns: {
      addQuestCompList: {
        data: [],
      },
      satRatingList: {
        data: [],
      },
      tacBonusList: {
        data: [],
      },
    }

    
  },
 
};
export default Settings;
