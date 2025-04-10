import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getProfileDetails(profile_id) {

    let res = await axios.post(Utils.getAPIURI(Settings.api.getEdieProfileDetails), '', {
      headers: { Pragma: "no-cache" },
      params: {
        profile_id
      }
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEdieProfileDetails));

    return res.data;
  },

  async getColumnDescription(column_id: number, profile_id: number) {

    const params = {
      profile_id: profile_id

    };
    const postData = Utils.createPostData(params);
    let res = await axios.post(
      Utils.getAPIURI(Settings.api.getColumnDescription), postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        column_id
      }
    }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getColumnDescription));

    return res.data;
  },
  async saveColumns(params: any) {

    const postData = Utils.createPostData(params);

    const res = await axios.post(Utils.getAPIURI(Settings.api.update), postData, {
      headers: {
        "Content-Type": Settings.urlencode,
      }
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.update));
    return res.data;

  },

  async getAvailableColumnsList(params: any) {

    const postData = Utils.createPostData(params);

    const res = await axios.post(Utils.getAPIURI(Settings.api.getAvailableColumnsList), postData, {
      headers: {
        "Content-Type": Settings.urlencode,
      }
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getAvailableColumnsList));
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
  }
};

export default API;
