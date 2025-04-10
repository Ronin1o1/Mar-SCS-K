import axios from "../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

//const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async showFilterOptions() {
    const res = await axios.get(
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

  async getPropertyListFindFilter() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getPropertyListFindFilter}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getPropertyListFindFilter}`
    );
    return res.data;
  },

  async getHotelPropertyList(data) {
    const postData = API.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
    });
    const apiEndpont = Settings.api.getHotelPropertyList;
    // For live API un comment below code and remove mock get cde

    const res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json;charset=UTF-8",
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
