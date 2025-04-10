import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getRebidData(hotelAccInfoId) {
    const res = await axios.get(`${Utils.getAPIURI(Settings.api.rebid)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        hotel_accountinfoid: hotelAccInfoId,
      },
    });

    API.handleErrorResponse(res, Settings.api.rebid);
    return res.data;
  },

  async updateRebid(data, acctRebidChg, hotel_accountinfoid) {
    // For API call

    const params = {
      strHasd: JSON.stringify(data),
      acctRebidChg: acctRebidChg,
      hotel_accountinfoid: hotel_accountinfoid,
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateRebid),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateRebid);
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
