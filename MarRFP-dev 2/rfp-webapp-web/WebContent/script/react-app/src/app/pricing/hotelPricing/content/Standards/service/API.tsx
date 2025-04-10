import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getHotelRFPStandard(marshaCode, hotelName, hotelrfpid, period) {

    let res = await axios.get(`${Utils.getAPIURI(Settings.api.getHotelRFPStandard)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        marshaCode:marshaCode,
        hotelName : hotelName,
        hotelrfpid : hotelrfpid,
        period : period
        },
    });
  
    API.handleErrorResponse(res, Settings.api.getHotelRFPStandard);
    return res.data;
  },

  async updateHotelStandards(data: any,roomPoolList, hotelrfpid, marshaCode, period) {
    const params = {
        strHotelRFPStandards: JSON.stringify(roomPoolList),
      formChg: data.formChg,
      hotelrfpid : hotelrfpid,
      marshaCode : marshaCode,
      period :  period
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(Utils.getAPIURI(Settings.api.updateHotelStandards), postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    API.handleErrorResponse(res, Settings.api.updateHotelStandards);
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
