import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getRFPSettingsData(accountrecid, period) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getRFPSettingsData)}`,
      {
        headers: { Pragma: "no-cache" },
        params: {
          accountrecid: accountrecid,
          period: period,
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.getRFPSettingsData);
    return res.data;
  },

  async updateRFPData(data: any) {
    // For API call

    const params = {
      strAccountDetailRFP: JSON.stringify(data),
      accountrecid: data.accountrecid
        ? data.accountrecid
        : localStorage.getItem("accountsDataRecId"),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateRFPData),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateRFPData);
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
