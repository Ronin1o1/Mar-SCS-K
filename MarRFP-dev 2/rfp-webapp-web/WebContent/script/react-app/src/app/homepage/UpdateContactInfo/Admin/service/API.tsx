import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../../static/Settings";

const API = {
  async getAdminUpdateInfo(period) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.admin.adminupdatedetails
      )}?period=${period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.admin.adminupdatedetails)
    );

    return res.data;
  },

  async updateAdminAccount(parameters: any, data: any) {
    const params = {
      period: parameters.period,
      origPeriod: parameters.origPeriod,
      changingPeriod: parameters.changingPeriod,
      strAdminRespondent: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.admin.adminsavedetails)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.admin.adminsavedetails)
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
};

export default API;
