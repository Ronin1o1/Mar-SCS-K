import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../settings/Settings";

//const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async showFilterOptions() {
    let res = await axios.get(
      `${API.getAPIURI()}${Settings.api.showFilterOptions}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.showFilterOptions}`
    );
    return res.data;
  },

  async getGPPPGOOSMaintFindFilter() {
    let res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getGPPPGOOSMaintFindFilter}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getGPPPGOOSMaintFindFilter}`
    );
    return res.data;
  },

  async getRemovalReason(data) {
    const apiEndpont = Settings.api.hotelremovalreason;
    const queryString = `?currentRemovalReasonid=&currentHaccid=0&pgoosStatus=${data.pgoos}`;
    let res = await axios.get(`${API.getAPIURI()}${apiEndpont}${queryString}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async getHotelPGOOSList(data) {
    const postData = API.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
    });
    const apiEndpont = Settings.api.getGPPPGOOSList;

    // For live API un comment below code and remove mock get cde

    let res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // For mock, get the values
    // let res = await axios.get(`${API.getAPIURI()}${apiEndpont}`);

    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async updateReason(data, queryData) {
    const postData = API.createPostData({
      strHotelGPPPGOOSData: JSON.stringify(data),
    });
    const apiEndpont = Settings.api.updatereason;
    const queryString = `?accountrecid=${queryData?.strFilterValues?.accountFilter?.accountrecid}`;

    // For live API un comment below code and remove mock get cde

    let res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // For mock, get the values
    // let res = await axios.get(`${API.getAPIURI()}${apiEndpont}`);

    // API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
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

  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};

export default API;
