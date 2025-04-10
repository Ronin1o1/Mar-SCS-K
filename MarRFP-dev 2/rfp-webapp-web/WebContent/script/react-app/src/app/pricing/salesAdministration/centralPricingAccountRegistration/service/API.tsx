import axios from "../../../../common/components/customaxios";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getFormOptions(year: number) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAccountLeadNames)}`,
      {
        headers: {
          Pragma: Settings.noCache,
        },
        params: {
          period: year,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountLeadNames)
    );

    return res.data;
  },

  async getPeriods() {
    const res = await axios.get(`${Utils.getAPIURI(Settings.api.getPeriods)}`, {
      headers: {
        Pragma: Settings.noCache,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getPeriods));

    return res.data;
  },

  async getAccLeadContact(eid) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.aaeAccountListNumber)}`,
      {
        headers: {
          Pragma: Settings.noCache,
        },
        params: {
          eid: eid,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.aaeAccountListNumber)
    );

    return res.data;
  },

  async getAAEAccList(eid) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.aaeAccountListInfo)}`,
      {
        headers: {
          Pragma: Settings.noCache,
        },
        params: {
          eid: eid,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.aaeAccountListInfo)
    );

    return res.data;
  },

  async postAccount(period, data) {
    const params = {
      strAccReg: JSON.stringify(data),
      period: period,
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.centralAccReg),
      postData,
      {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.centralAccReg));

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
