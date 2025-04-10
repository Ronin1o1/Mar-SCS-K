import Settings from "../data/Settings";
import Data_PricingSetup from "../data/scptsetup";
import Data_PricingStatus from "../data/scptstatus";
import Data_AccountPricing from "../data/scptpricing";
import Data_AccountPricingTotal from "../data/scptpricingtotal";
import Data_AccountHistory from "../data/scpthistory";
import Data_AccountSegment from "../data/accountsegments";
import Data_BTAccount from "../data/btaccounts";
import Data_HiddenAccount from "../data/hiddenaccounts";
import Data_AccountDetails from "../data/accountdetails";
import Data_AccountDetails_Extended from "../data/accountdetails_extended";

export default {
  async getPricingSetupStatusData() {
    // For mock data
    console.log("Status data loaded .........................................");
    return Data_PricingStatus;
  },
  async getPricingSetupLoadData() {
    // For mock data
    console.log("Setup data loaded ..........................................");
    return Data_PricingSetup;
  },
  async getAccountPricingLoadData(endpointDetails: any) {
    //For mock data
    let returnData = JSON.parse(JSON.stringify(Data_AccountPricing));
    returnData.comrates_total = Data_AccountPricingTotal[0];
    if (
      returnData.comrates === null ||
      returnData.comrates.length === 0 ||
      returnData.comrates[0].accountname === null
    ) {
      return returnData;
    } else {
      if (endpointDetails.params.commfilterString) {
        returnData.comrates = returnData.comrates.filter(data =>
          data.accountname
            .toLowerCase()
            .startsWith(endpointDetails.params.commfilterString.toLowerCase())
        );
      }
      returnData.comrates.map(data => {
        if (endpointDetails.params.commgroupid == 2) {
          data.accountname =
            data.accountname +
            "_S_" +
            endpointDetails.params.page +
            "_" +
            endpointDetails.params.commorderby;
          return data;
        }
        if (endpointDetails.params.commgroupid == 3) {
          data.accountname =
            data.accountname +
            "_G_" +
            endpointDetails.params.page +
            "_" +
            endpointDetails.params.commorderby;
          return data;
        }
        data.accountname =
          data.accountname +
          "_" +
          endpointDetails.params.page +
          "_" +
          endpointDetails.params.commorderby;
        return data;
      });
      console.log("Account Pricing data loaded ..............................");
      console.log("Account Pricing Total data loaded ........................");
      return returnData;
    }
  },
  async getAccountHistoryLoadData(endpointDetails: any) {
    // For mock data
    let returnData = JSON.parse(JSON.stringify(Data_AccountHistory));
    if (
      returnData.scptdetail === null ||
      returnData.scptdetail.length === 0 ||
      returnData.scptdetail[0].accountname === null
    ) {
      return returnData;
    } else {
      if (endpointDetails.params.detailfilterString) {
        returnData.scptdetail = returnData.scptdetail.filter(data =>
          data.accountname
            .toLowerCase()
            .startsWith(endpointDetails.params.detailfilterString.toLowerCase())
        );
      }
      returnData.scptdetail.map(data => {
        data.accountname =
          data.accountname +
          "_" +
          endpointDetails.params.page +
          "_" +
          endpointDetails.params.detailorderby;
        return data;
      });
      console.log("Account History data loaded ..............................");
      return returnData;
    }
  },
  async getAccountSegmentData() {
    // For mock data
    console.log("Account Segment data loaded ................................");
    return Data_AccountSegment;
  },
  async getBTAccounts(endpointDetails: any) {
    // For mock data
    let returnData = JSON.parse(JSON.stringify(Data_BTAccount));
    if (endpointDetails.params.filter) {
      returnData = returnData.filter(data =>
        data.name
          .toLowerCase()
          .startsWith(
            endpointDetails.params.filter.toLowerCase().replace("*", "")
          )
      );
    }

    if (returnData.length > 0) {
      returnData.map(data => {
        data.name = data.name + "_" + endpointDetails.params.start;
        return data;
      });
    }
    console.log("BT Accounts loaded .........................................");
    return returnData;
  },
  async getHiddenAccountsData() {
    // For mock data
    console.log("Hidden Accounts data loaded ................................");
    return Data_HiddenAccount;
  },
  async saveSuccess() {
    // For mock data
    console.log("Save successful ............................................");
    return Settings.text.constant.success;
  },
  async getAccountDetailsLoadData() {
    // For mock data
    console.log("Account Details data loaded ................................");
    return Data_AccountDetails;
  }
};
