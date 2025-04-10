import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getCriticalFields(accountrecid: any, period: any) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.criticalFieldsTab.api.getCriticalFields
      }?accountrecid=${accountrecid}&period=${period}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.criticalFieldsTab.api.getCriticalFields}`
    );
    return res.data;
  },

  async deleteAccount(accountrecid: any) {
    const params = {
      accountrecid: accountrecid,
    };
    const postData = API.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.criticalFieldsTab.api.deleteAccount),
      postData,
      {
        headers: {
          "Content-Type": Settings.criticalFieldsTab.contentType,
        },
      }
    );
    API.handleErrorResponse(res, Settings.criticalFieldsTab.api.deleteAccount);
    return res.data;
  },

  async updateCriticalFields(data: any) {
    const newAccountParams = {
      strAccountDetailGeneral: JSON.stringify(data.accountDetailGeneral),
      accountrecid: data.accountDetailGeneral.accountrecid,
      period: data.periodDetails.period,
    };

    const existingAccountParams = {
      strAccountDetailGeneral: JSON.stringify(data.accountDetailGeneral),
      accountrecid: data.accountDetailGeneral.accountrecid,
      oldPricingType: data.accountDetailGeneral.accountpricingtype,
      period: data.periodDetails.period,
      checkExceptionBox: "on",
    };
    const postData = API.createPostData(
      data.accountDetailGeneral.accountrecid === 0
        ? newAccountParams
        : existingAccountParams
    );

    const res = await axios.post(
      Utils.getAPIURI(Settings.criticalFieldsTab.api.updateCriticalFields),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Settings.criticalFieldsTab.api.updateCriticalFields
    );
    return res.data;
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

  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
};

export default API;
