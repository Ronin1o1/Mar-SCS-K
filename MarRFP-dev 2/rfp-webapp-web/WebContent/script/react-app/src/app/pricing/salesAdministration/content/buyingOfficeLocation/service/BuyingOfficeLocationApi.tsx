import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const BuyingOfficeLocationApi = {
  async getAcctLocations(accountrecid, accountname, period) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getAcctLocations),
      {
        headers: { Pragma: "no-cache" },
        params: { accountrecid, accountname, period },
      }
    );
    BuyingOfficeLocationApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAcctLocations)
    );
    return res.data;
  },

  async updateAcctLocations(body) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAcctLocations),
      Utils.createPostData(body),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    BuyingOfficeLocationApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAcctLocations)
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

export default BuyingOfficeLocationApi;
