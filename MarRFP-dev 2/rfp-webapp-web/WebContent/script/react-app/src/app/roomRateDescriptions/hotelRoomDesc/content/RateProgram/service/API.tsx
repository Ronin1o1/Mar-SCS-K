import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getRateProgramListDetails(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getRateProgramList)}?marshaCode=${
        reqParam.marshaCode
      }&hotelName=${reqParam.hotelName}&roomPool=${reqParam.roomPool}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getSelectHotelList)
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
};
export default API;
