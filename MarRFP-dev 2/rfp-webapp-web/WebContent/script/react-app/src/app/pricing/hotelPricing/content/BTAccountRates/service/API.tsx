import axios from "axios";
import "core-js/stable";
import { useState } from "react";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getBtData(currentPage, marshaCode, hotelrfpid, period) {
    const apiEndpont = Settings.api.getBTData;
    const queryString = `?request_locale=en&nextUrl=/hotelaccountblackout/view.action&startnum=${currentPage}&marshaCode=${marshaCode}&hotelName=&hotelrfpid=${hotelrfpid}&period=${period}&hotel_accountinfoid=`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async getBtDataWithPagination(startNum, marshaCode, hotelrfpid, period) {
    const apiEndpont = Settings.api.getBTData;
    const queryString = `?request_locale=en&nextUrl=/hotelaccountblackout/view.action&startnum=${startNum}&marshaCode=${marshaCode}&hotelName=&hotelrfpid=${hotelrfpid}&period=${period}&hotel_accountinfoid=`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async updateBTRatesData(data) {
    const postData = API.createPostData({
      ...data,
    });
    const apiEndpont = Settings.api.updateBTDta;

    // For live API un comment below code and remove mock get cde

    const res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // For mock, get the values
    // let res = await axios.get(`${API.getAPIURI()}${apiEndpont}`);

    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
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
  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};

export default API;
