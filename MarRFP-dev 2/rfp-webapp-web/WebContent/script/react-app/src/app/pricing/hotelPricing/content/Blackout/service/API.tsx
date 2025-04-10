import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getBlackoutData(marshaCode, hotelName, period, hotelrfpid) {
    const seasonId = Settings.seasonId;
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getBlackoutList)}`,
      {
        headers: { Pragma: "no-cache" },
        params: {
          marshaCode: marshaCode,
          hotelName: hotelName,
          hotelrfpid: hotelrfpid,
          period: period,
          seasonid: seasonId,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getBlackoutList));

    return res.data;
  },

  async postBlackoutData(
    strBlackoutList,
    stateData,
    totalDays,
    hotelrfpid,
    marshaCode,
    period
  ) {
    const body = {
      TOTAL_BLACKOUTS: totalDays,
      max_blackouts: stateData.maxBlackouts,
      numblackouts: stateData.numblackouts,
      periodstart: `${Settings.periodstart}${period}`,
      periodend: `${Settings.periodend}${period}`,
      formChg: "Y",
      hotelrfpid: hotelrfpid,
      marshaCode: marshaCode, // dummy data
      period: period,
      strHotelBlackoutDatesList: JSON.stringify(strBlackoutList),
    };

    const postData = Utils.createPostData(body);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.postBlackoutList),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.postBlackoutList)
    );

    return res.data;
  },

  handleErrorResponse(response: any, endpoint: string) {
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
