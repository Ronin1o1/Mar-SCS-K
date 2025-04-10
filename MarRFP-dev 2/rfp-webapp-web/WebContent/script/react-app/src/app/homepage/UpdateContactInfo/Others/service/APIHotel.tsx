import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../../static/Settings";

const APIHotel = {
  async getHotelUpdateInfo() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.hotelUser.hoteluserdetails),
      {
        headers: { Pragma: "no-cache" },
      }
    );
    APIHotel.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelUser.hoteluserdetails)
    );

    return res.data;
  },

  async updateHotelAccount(data: any) {
    const params = {
      strHotelRespondent: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.hotelUser.hotelsavedetails)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIHotel.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelUser.hotelsavedetails)
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

export default APIHotel;
