import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
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
  async getAccountReport(paccount) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getAccountOverViewReport
      )}?paccount=${paccount}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountOverViewReport)
    );
    return res.data;
  },
  async getPeriodList(param) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getPeriodList)}?hotelid=${
        param.hotelid
      }&accountid=${param.accountid}&period=${param.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getPeriodList));
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
  async getMultiHotelAccountSpecificRates(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getMultiHotelAccountSpecificRates
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
      Utils.getAPIURI(Settings.api.getMultiHotelAccountSpecificRates)
    );
    return res.data;
  },

  async getHotelFinalPrintReport(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getHotelFinalPrintRepost)}?hotelrfpid=${
        reqParam.hotelrfpid
      }&accountrecid=${reqParam.accountrecid}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelFinalPrintRepost)
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
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};
export default API;
