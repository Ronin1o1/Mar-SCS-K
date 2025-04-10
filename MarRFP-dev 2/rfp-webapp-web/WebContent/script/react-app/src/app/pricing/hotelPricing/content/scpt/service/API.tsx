import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Mock from "./Mock";

const useAPI = true;

const API = {
  async getPricingSetupStatusData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Status data loaded .......................................");
      return res.data;
    } else {
      // For mock data
      return Mock.getPricingSetupStatusData();
    }
  },
  async getPricingSetupLoadData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Setup data loaded ........................................");
      return res.data;
    } else {
      // For mock data
      return Mock.getPricingSetupLoadData();
    }
  },
  async updatePricingSetup(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        marshaCode: endpointDetails.params.marshaCode,
        hotelrfpid: endpointDetails.params.hotelrfpid,
        period: endpointDetails.params.period,
        strScptUpdate: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Setup data saved .........................................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async getAccountPricingLoadData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Pricing data loaded ..............................");

      let totalRes = await axios.get(endpointDetails.nextEndpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Pricing Total data loaded ........................");

      if (totalRes.data && totalRes.data.length == 1)
        res.data.comrates_total = totalRes.data[0];

      return res.data;
    } else {
      //For mock data
      return Mock.getAccountPricingLoadData(endpointDetails);
    }
  },
  async saveAccountPricing(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        marshaCode: endpointDetails.params.marshaCode,
        hotelrfpid: endpointDetails.params.hotelrfpid,
        period: endpointDetails.params.period,
        strCommData: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Pricing data saved ...............................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async refreshAccountPricingRates(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: {
          marshaCode: endpointDetails.params.marshaCode,
          hotelrfpid: endpointDetails.params.hotelrfpid,
          period: endpointDetails.params.period,
          refreshRates: "P"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Pricing Rates Refreshed ..........................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async getAccountHistoryLoadData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account History data loaded ..............................");
      return res.data;
    } else {
      // For mock data
      return Mock.getAccountHistoryLoadData(endpointDetails);
    }
  },
  async getAccountSegmentData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Segment data loaded ..............................");
      return res.data;
    } else {
      // For mock data
      return Mock.getAccountSegmentData();
    }
  },
  async getBTAccounts(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("BT Accounts loaded .......................................");
      return res.data;
    } else {
      // For mock data
      return Mock.getBTAccounts(endpointDetails);
    }
  },
  async saveAccount(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        hotelid: endpointDetails.params.hotelid,
        period: endpointDetails.params.period,
        strAddAccount: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account data saved .......................................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async getHiddenAccountsData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: {
          hotelid: endpointDetails.params.hotelid,
          period: endpointDetails.params.period
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Hidden Accounts data loaded ..............................");
      return res.data;
    } else {
      // For mock data
      return Mock.getHiddenAccountsData();
    }
  },
  async saveHiddenAccounts(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        hotelid: endpointDetails.params.hotelid,
        period: endpointDetails.params.period,
        strSCPTStatus: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Hidden Accounts saved ....................................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async getAccountDetailsLoadData(endpointDetails: any) {
    // For API call
    if (useAPI) {
      let res = await axios.get(endpointDetails.endpoint, {
        headers: { Pragma: "no-cache" },
        params: endpointDetails.params
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account details data loaded ..............................");
      return res.data;
    } else {
      // For mock data
      return Mock.getAccountDetailsLoadData();
    }
  },
  async updateAccountDetails(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        marshaCode: endpointDetails.params.marshaCode,
        hotelrfpid: endpointDetails.params.hotelrfpid,
        period: endpointDetails.params.period,
        strScptcomm: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Account Details data saved ...............................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  async updateShowRoomNights(endpointDetails: any, data: any) {
    // For API call
    if (useAPI) {
      const params = {
        marshaCode: endpointDetails.params.marshaCode,
        hotelrfpid: endpointDetails.params.hotelrfpid,
        period: endpointDetails.params.period,
        strSCPTHotelDetail: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(endpointDetails.endpoint, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, endpointDetails.endpoint);
      console.log("Show Room Nights saved ...................................");
      return res.data;
    } else {
      // For mock data
      return Mock.saveSuccess();
    }
  },
  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error("Error response received from API: " + endpoint);
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  }
};

export default API;
