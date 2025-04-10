import axios from "axios";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getCBC(reqParam) {
    let res = await axios.get(`${Utils.getAPIURI(Settings.api.getCBC)}?hotel_accountinfoid=${reqParam.hotel_accountinfoid}`,
    {
        headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getCBC));
    return res.data;
  },

  async updateCBC(bodyParams) {
    let postData = buildPostData(bodyParams);
    let res = await axios.post(Utils.getAPIURI(Settings.api.updateCbc), postData, {
        headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateCbc));

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
}
function buildPostData (bodyParams) {
  return Utils.createPostData(bodyParams);
}
export default API;