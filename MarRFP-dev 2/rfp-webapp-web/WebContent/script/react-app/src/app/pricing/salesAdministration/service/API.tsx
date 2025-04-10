import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
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

  async generateAccntOverViewReports(apiUrl) {
    const res = await axios.get(`${Utils.getAPIURI(apiUrl)}`, {
      headers: { Pragma: "no-cache" },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));

    return res.data;
  },
};

export default API;
