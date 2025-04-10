import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

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

  async getHotelPGOOSFindFilter() {
    let res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getHotelPGOOSFindFilter}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getHotelPGOOSFindFilter}`
    );
    return res.data;
  },

  async getRemovalReason(isAreaRemoval: boolean) {
    const apiEndpont = isAreaRemoval
      ? Settings.api.hotelaerremovalreason
      : Settings.api.hotelremovalreason;
    let res = await axios.get(`${API.getAPIURI()}${apiEndpont}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getHotelPGOOSFindFilter}`
    );
    return res.data;
  },

  async getHotelPGOOSList(data) {
    const postData = API.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
    });
    const apiEndpont = Settings.api.getHotelPGOOSList;

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

  async getPGOOSAuditTrailDetail(data) {
    let res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getPGOOSAuditTrailDetail}?marshaCode=${
        data.marshaCode
      }&period=${data.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getPGOOSAuditTrailDetail}`
    );
    return res.data;
  },

  async saveData(data) {
    const postData = API.createPostData({
      ...data,
      strHotelPGOOSListData: JSON.stringify(data.strHotelPGOOSListData),
    });
    const apiEndpont = Settings.api.save;

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
