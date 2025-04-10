/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
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
  async gethotelrespondent(param) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.gethotelrespondent)}?marshaCode=${
        param.marshaCode
      }&hotelName=${param.hotelName}&period=${param.period}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelrespondent)
    );
    return res.data;
  },
  async generateToolsReport(reportname) {
    let apiUrl;
    if (reportname === Settings.pricingTabs.toolsTabs.GPPAccountList) {
      apiUrl = Settings.api.getGPPAccountList;
    } 
    const res = await axios.get(Utils.getAPIURI(apiUrl), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));
    return res.data;
  },
  async getUserDetails() {
   
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getUserDetails)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getUserDetails));
    return res.data;
  },
  async generateScptSummaryReport(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.postScptSummaryReport)}?hotelid=${
        bodyParam.hotelid
      }&period=${bodyParam.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.postScptSummaryReport)
    );
    return res.data;
  },
  async generateScptHistoryReport(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.postScptHistoryReport)}?hotelid=${
        bodyParam.hotelid
      }&period=${bodyParam.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.postScptHistoryReport)
    );
    return res.data;
  },
  async getNearestAccount(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getHotelNearestFacilityReport)}?hotelid=${
        bodyParam.hotelid
      }&period=${bodyParam.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelNearestFacilityReport)
    );
    return res.data;
  },
  async getNearestAccountExcel(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getHotelNearestFacilityReportExcel
      )}?hotelid=${bodyParam.hotelid}&period=${bodyParam.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelNearestFacilityReportExcel)
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
