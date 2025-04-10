import axios from "../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/settings";

const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async signOut() {
    const res = await axios.get(`${API.getAPIURI()}${Settings.api.signOut}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Settings.api.signOut);
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
