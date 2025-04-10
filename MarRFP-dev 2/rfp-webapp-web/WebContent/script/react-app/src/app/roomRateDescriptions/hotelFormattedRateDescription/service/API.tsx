import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getSelectHotelListDetails() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getHotelRateProductSelectList)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelRateProductSelectList)
    );
    return res.data;
  },

  getRateProductView: async (queryParam) => {
    const getRateProductHotelViewDataURL =
      Settings.api.getRateProductHotelView + queryParam;
    const res = await axios.get(
      Utils.getAPIURI(getRateProductHotelViewDataURL)
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateProductHotelView)
    );

    return res.data;
  },

  getSeachResult: async (rateProgramCode, rateProgramName) => {
    let getSearchResultUrl;
    if (rateProgramCode !== "" && rateProgramName !== "") {
      getSearchResultUrl = `${Settings.api.getSearchList}?brandCode=${rateProgramCode}&brandName=${rateProgramName}`;
    } else {
      getSearchResultUrl = Settings.api.getSearchList;
    }

    const res = await axios.get(Utils.getAPIURI(getSearchResultUrl));
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateProductHotelView)
    );

    return res.data;
  },
  async getRateProductAssignmentReport(parms) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getRateProductAssignmentReport
      )}?&marshaCode=${parms.marshacode}&hotelName=${
        parms.hotelname
      }&brandCode=${parms.branchCode}&brandName=`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateProductAssignmentReport)
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
