import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const API = {
  async getSelectHotelListDetails() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getHotelRateProductSelectList)}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelRateProductSelectList)
    );
    return res.data;
  },

  getRateProductView: async (queryParam) => {
    const getRateProductHotelViewDataURL =
      Settings.api.getRateProductHotelView + queryParam;
    const res = await axios.get(
      Utils.getAPIURI(getRateProductHotelViewDataURL)
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateProductHotelView)
    );

    return res.data;
  },

  async getSearchResult(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getassignments),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getassignments));

    return res.data;
  },

  async getRateDescription(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getRateDescription),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateDescription)
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
