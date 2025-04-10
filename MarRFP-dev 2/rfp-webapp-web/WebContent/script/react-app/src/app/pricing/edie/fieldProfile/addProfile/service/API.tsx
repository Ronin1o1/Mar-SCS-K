import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;

const API = {
  async getEdieProfileList() {

    let res = await axios.get(Utils.getAPIURI(Settings.api.getEdieProfileList), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEdieProfileList));

    return res.data;
  },

  async saveProfile(profileId, profileName) {
    const params = {
      copyprofileid: profileId,
      formChg: 'N',
      profile_name: profileName
    };
    const postData = Utils.createPostData(params);

    ; const res = await axios.post(Utils.getAPIURI(Settings.api.addProfile), postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.addProfile));

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
  }
};

export default API;
