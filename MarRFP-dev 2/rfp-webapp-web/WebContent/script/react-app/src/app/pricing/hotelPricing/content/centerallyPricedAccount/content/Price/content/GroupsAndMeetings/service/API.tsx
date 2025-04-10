import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";

import Settings from "../static/Settings";
import Utils from "../../../../../../../../../common/utils/Utils";

const API = {
  async getHotelAccountSpecificGeneralGroupsTab(params) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getHotelAccountSpecificGeneralGroupsTab
      )}?hotel_accountinfoid=${params.hotelAccountinfoid}&hotelid=${
        params.hotelId
      }`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelAccountSpecificGeneralGroupsTab)
    );

    return res.data;
  },
  async updateGenGroups(bodyParam, hotelAccountInfoid) {
    const body = Utils.createPostData(bodyParam);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.updateGenGroups
      )}?hotel_accountinfoid=${hotelAccountInfoid}`,
      body,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateGenGroups));
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
