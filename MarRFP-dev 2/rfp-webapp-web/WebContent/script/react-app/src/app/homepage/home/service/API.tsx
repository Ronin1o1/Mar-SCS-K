import axios from "../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/settings";
import { USERID } from "../../../../../config/user/UserId";
import Utils from "../../../common/utils/Utils";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  //syncSession
  async syncSession() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.syncSession)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.syncSession));
    return res.data;
  },
  async getCongnosUrl() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getCognosUrl)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getCognosUrl));
    return res.data;
  },

  async getTabRequest(tabId, marshaCode) {
    let url;
    switch (tabId) {
      case "cbcRequests":
        url = Settings.api.cbcRequest;
        break;
      case "pricingRequests":
        url = Settings.api.pricingRequests;
        break;
      case "accountStatus":
        url = Settings.api.accountStatus;
        break;
      case "rebidRequests":
        url = Settings.api.rebidRequests;
        break;
    }
    return API.getRequestData(marshaCode, url);
  },

  async getRequestData(marshaCode, url) {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(`${API.getAPIURI()}${url}`, {
      headers: headers,
      params: { marshaCode },
    });
    API.handleErrorResponse(res, url);
    return res.data;
  },

  async getHotelList(name: any, startIndex: number, endIndex: number) {
    const headers = {
      Pragma: "no-cache",
      Range: `items=${startIndex}-${endIndex}`,
    };

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getHotelList}`,
      {
        headers: headers,
        params: { name },
      }
    );
    API.handleErrorResponse(res, Settings.api.getHotelList);
    return res;
  },

  async getMessageList() {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getMessageList}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Settings.api.getMessageList);

    return res.data;
  },

  async getAccountViewData() {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.newAccounts}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Settings.api.newAccounts);
    return res.data;
  },

  async getOverviewReport(paccount) {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.overviewReport}`,
      {
        headers: headers,
        params: { paccount },
      }
    );
    API.handleErrorResponse(res, Settings.api.overviewReport);
    return res.data;
  },

  async deleteNews(infoId: number) {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.deleteNews}?infoid=${infoId}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Settings.api.deleteNews);
    return res.data;
  },

  async getUserDetails() {
   
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getUserDetails}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Settings.api.getUserDetails);
    return res.data;
  },

  async updateHomePref(userPref: any): Promise<any> {
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateHomePrefs),
      Utils.createPostData(userPref),
      {
        headers: headers,
        params: { request_locale: "en" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateHomePrefs));
    return res.data;
  },
  async getHotelaccountspeccentralrates(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getHotelaccountspeccentralrates
      )}?marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}
        &hotelrfpid=${reqParam.hotelrfpid}&period=${
        reqParam.period
      }&hotel_accountinfoid=${reqParam.hotel_accountinfoid}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelaccountspeccentralrates)
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
};

export default API;
