import axios from "../../../../../../../common/components/customaxios";
import * as axiosCustom from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "./../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;
let sourceCancelToken;
const API = {
  async getRateLoadingData(accountrecid: any, period: any) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getRateLoadingList
      }?accountrecid=${accountrecid}&period=${period}`,
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${
        Settings.api.getRateLoadingList
      }?accountrecid=${accountrecid}&period=${period}`
    );
    return res.data;
  },

  async updateRateLoadingData(data: any) {
    const params = {
      strAccountDetailBrands: JSON.stringify(data),
      accountrecid: data.accountrecid,
      canprice: false,
      period: data.period,
      gpp_check: data.gpp_check,
      aer_account: data.aer_account,
    };
    const postData = API.createPostData(params);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.updateRateLoadingList}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateRateLoadingList);

    return res.data;
  },

  //API's for Rate Offer Lookup Modal
  async lookUpRateOffer(numRoomPools: number) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.lookUpRateOffer
      }?numroompools=${numRoomPools}`,
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${
        Settings.api.lookUpRateOffer
      }?numroompools=${numRoomPools}`
    );
    return res.data;
  },

  async getRateOffers(name: any, startIndex: number, endIndex: number) {
    try {
      //Check if there are any previous pending requests
      if (typeof sourceCancelToken != typeof undefined) {
        sourceCancelToken.cancel("Operation canceled due to new request.");
      }

      //Save the cancel token for the current request
      sourceCancelToken = axiosCustom.CancelToken.source();
      const res = await axios.get(
        Utils.getAPIURI(Settings.api.getRateOffers),

        {
          cancelToken: sourceCancelToken.token,
          headers: {
            Pragma: "no-cache",
            Range: `items=${startIndex}-${endIndex}`,
          },
          params: {
            name: name ? name + "*" : "*",
            range: `${startIndex}-${endIndex}`,
          },
        }
      );
      API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getRateOffers));
      return res.data;
    } catch (err) {
      if (axiosCustom.isCancel(err)) return { cancelPrevQuery: true };
      return [err];
    }
  },

  async getRatePrograms(rateOfferId: any) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getRatePrograms
      }?rateOfferId=${rateOfferId}`,
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${
        Settings.api.getRateOffers
      }?rateOfferId=${rateOfferId}`
    );
    return res.data;
  },

  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },

  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },

  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};

export default API;
