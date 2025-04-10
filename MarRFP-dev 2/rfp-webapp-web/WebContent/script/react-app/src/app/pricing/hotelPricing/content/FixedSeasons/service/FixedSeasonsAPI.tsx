import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

export interface hotelAPIParams {
  marshaCode: string;
  hotelName: string;
  period: string;
}

const FixedSeasonsAPI = {
  async gethotelrespondent(param: hotelAPIParams): Promise<any> {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.gethotelrespondent)}?marshaCode=${
        param.marshaCode
      }&hotelName=${param.hotelName}&period=${param.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    FixedSeasonsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelrespondent)
    );
    return res.data;
  },

  async getUserDetails(): Promise<any> {
   
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getUserDetails)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    FixedSeasonsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getUserDetails)
    );
    return res.data;
  },

  async getHotelRFPFixedRates(param: hotelAPIParams): Promise<any> {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getHotelRFPFixedRates)}`,
      {
        headers: { Pragma: "no-cache" },
        params: param,
      }
    );

    FixedSeasonsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelRFPFixedRates)
    );
    return res.data;
  },

  async updateHotelRFPFixedRates(payload): Promise<any> {
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateHotelRFPFixedRates),
      Utils.createPostData(payload),
      {
        headers: headers,
        params: { request_locale: "en" },
      }
    );
    FixedSeasonsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateHotelRFPFixedRates)
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

export default FixedSeasonsAPI;
