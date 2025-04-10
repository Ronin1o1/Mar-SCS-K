import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const API = {
  async getUserDetails() {
    
    const res = await axios.get(Utils.getAPIURI(Settings.api.getUserDetails), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getUserDetails));
    return res.data;
  },
  async gethoteldos(marshaCode, hotelName, hotelrfpid, period, seasonId?: any) {
    if (seasonId === undefined) seasonId = 1;
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.gethoteldos)}`,
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
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.gethoteldos));
    return res.data;
  },

  async updateHotelRFPDepthOfSalesEnhanced(
    stateData,
    periodData,
    salesDepthData
  ) {
    if (salesDepthData?.salesdepth_en_ranges.length > 0) {
      for (let i = 0; i < salesDepthData?.salesdepth_en_ranges.length; i++) {
        if (
          salesDepthData?.salesdepth_en_ranges[i].volrmax == 999999 ||
          salesDepthData?.salesdepth_en_ranges[i].volrmax == "+" ||
          salesDepthData?.salesdepth_en_ranges[i].volrmax == "" ||
          salesDepthData?.salesdepth_en_ranges[i].volrmax == null
        ) {
          salesDepthData.salesdepth_en_ranges[i].volrmax = 999999;
          break;
        }
      }
      for (let i = 0; i < salesDepthData?.salesdepth_ranges.length; i++) {
        if (
          salesDepthData?.salesdepth_ranges[i].volrmax == 999999 ||
          salesDepthData?.salesdepth_ranges[i].volrmax == "+" ||
          salesDepthData?.salesdepth_ranges[i].volrmax == "" ||
          salesDepthData?.salesdepth_ranges[i].volrmax == null
        ) {
          salesDepthData.salesdepth_ranges[i].volrmax = 999999;
          break;
        }
      }
    }
    const {
      salesdepthid,
      hotelrfpid,
      peaknsun,
      peaknmon,
      peakntue,
      peaknwed,
      peaknthu,
      peaknfri,
      peaknsat,
      last_updatedate,
      currencycode,
      currencyname,
      salesdepth_en_season,
      salesdepth_en_loslist,
      prevyear_retailadr,
      anticipate_inc_retail_pct,
      hasLOSTiers,
      totalSeasons,
      peakDays,
      formattedLast_updatedate,
      numberLOSTiers,
      ...dataToSend
    } = salesDepthData;

    dataToSend.salesdepth_en_ranges.map((data, index) => {
      data["seasonid"] = stateData.origseason;
    });
    dataToSend.salesdepth_en_ranges.map((data, index) => {
      data["seasonid"] = stateData.origseason;
    });

    const params = {
      strSalesDepth: JSON.stringify(dataToSend),
      switched: stateData.switched,
      doslevel: stateData.doslevel,
      maxDOS: stateData.depthOfSales.maxDOS,
      formChg: stateData.formChg,
      hotelrfpid: stateData.depthOfSales.salesDepth.hotelrfpid,
      marshaCode: stateData.depthOfSales.hotelData.marshaCode,
      period: periodData,
      LOSCOUNT: stateData.depthOfSales.salesDepth.numberLOSTiers,
      seasonid: stateData.currentSeason,
      origSeason: stateData.origseason,
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updatehoteldos),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updatehoteldos);
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
