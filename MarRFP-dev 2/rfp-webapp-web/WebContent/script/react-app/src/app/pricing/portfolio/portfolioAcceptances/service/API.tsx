import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async getRemovalReason() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getRemovalReason),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRemovalReason)
    );
    return res.data;
  },

  async getRejectionReason() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getRejectionReason),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRejectionReason)
    );
    return res.data;
  },
  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.showFilterOptions),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.showFilterOptions)
    );
    return res.data;
  },

  async getPortfolioStatusFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioStatusFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioStatusFindFilter)
    );
    return res.data;
  },

  async getPortfolioStatusList(data) {
    const postData = Utils.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
    });
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPortfolioStatus),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioStatus)
    );
    return res.data;
  },

  async ajaxSave(data) {
    const postData = Utils.createPostData({
      ...data,
      rawSaveData: JSON.stringify(data.rawSaveData),
    });
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.ajaxSave),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.ajaxSave));
    return res.data;
  },
  async updatePortFolio(recid, data) {
    const postData = Utils.createPostData({
      accountrecid: recid,
      strPortfolioStatusList: JSON.stringify(data),
    });
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updatePortfolio),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updatePortfolio));
    return res.data;
  },
  async rejectAll(data) {
    const postData = Utils.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
      strPortfolioStatusList: JSON.stringify(data.strPortfolioStatusList),
    });
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.rejectAll),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.rejectAll));
    return res.data;
  },

  async acceptAll(data) {
    const postData = Utils.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
      strPortfolioStatusList: JSON.stringify(data.strPortfolioStatusList),
    });
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.acceptAll),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.acceptAll));
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
};

export default API;
