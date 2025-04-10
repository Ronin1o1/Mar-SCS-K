import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getEdieProfileList() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEdieProfileList),
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEdieProfileList)
    );

    return res.data;
  },

  async deleteProfile(profile_id: number) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.deleteProfile),
      "",
      {
        params: {
          profile_id,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.deleteProfile));
    console.log(
      "Profile Name data deleted ......................................."
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
