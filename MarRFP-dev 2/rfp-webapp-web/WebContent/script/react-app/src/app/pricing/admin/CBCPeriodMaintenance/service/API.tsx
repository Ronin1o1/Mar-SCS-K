import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getCBCPeriodMntcList() {
    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.getPeriodList}`,
      null,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getPeriodList}`
    );

    return res.data;
  },
  async getPeriod(infoId: number) {
    const res = await axios.get(`${API.getAPIURI()}${Settings.api.getPeriod}`, {
      headers: { Pragma: "no-cache" },
      params: { infoid: infoId },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getPeriod}`);

    return res.data;
  },
  async updateDueDate(data: any) {
    const params = {
      periodList: JSON.stringify(data),
    };
    const postData = API.createPostData(params);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.updateDueDate}?duedate=${
        data.duedate
      }&pricingperiodid=${data.pricingperiodid}&period=${data.period}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateDueDate);

    return res.data;
  },

  async deleteDueDate(pricingperiodid: number) {
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
