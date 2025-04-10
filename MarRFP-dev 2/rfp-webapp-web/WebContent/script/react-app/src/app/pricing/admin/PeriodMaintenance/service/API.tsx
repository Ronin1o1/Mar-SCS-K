import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getPricingPeriod() {
    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.getPricingPeriod}`,
      null,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.getPricingPeriod);

    return res.data;
  },
  async getEditDueDate(pricingperiodid: number) {
    const res = await axios.get(`${apiURL}${Settings.api.getEditDueDate}`, {
      headers: { Pragma: "no-cache" },
      params: { pricingperiodid: pricingperiodid },
    });
    API.handleErrorResponse(res, Settings.api.getEditDueDate);

    return res.data;
  },
  async updatePeriod(data: any) {
    // const params = {
    //   periodList: JSON.stringify(data)
    // };
    //const postData = API.createPostData(params);

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.updateDueDate}?duedate=${
        data.shortDueDate
      }&pricingperiodid=${data.pricingperiodid}&period=${data.period}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateDueDate);

    return res.data;
  },
  async deletePeriod(pricingperiodid: number) {
    const res = await axios.post(
      `${API.getAPIURI()}${
        Settings.api.deleteDueDate
      }?pricingperiodid=${pricingperiodid}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.deleteDueDate}`
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

  async updateHotelView(data: any) {
    // For API call
    const params = {
      strPeriodList: JSON.stringify(data),
    };
    const postData = API.createPostData(params);
    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.updateHotelView}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateHotelView);

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
};

export default API;
