import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getRates(accountinfoid) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getRates
      }?hotel_accountinfoid=${accountinfoid}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getRates}`);
    return res.data;
  },
  async getRemovalReason() {
    const apiEndpont = Settings.api.hotelremovalreason;
    const queryString = `?currentRemovalReasonid=&currentHaccid=0&pgoosStatus=false`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },
  async getRejectReason() {
    const apiEndpont = Settings.api.hotelrejectreason;
    const queryString = `?currentRejectionReasonid=&currentHaccid=0`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },
  async getPreviousRules(AccountInfoId, marshaCode, hotelId) {
    const apiEndpont = Settings.api.getPreviousRules;
    const queryString = `?hotel_accountinfoid=${AccountInfoId}&hotelid=${hotelId}&marshaCode=${marshaCode}`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async getQuickauditviewcancelData(AccountInfoId, marshaCode, hotelId) {
    const apiEndpont = Settings.api.quickauditviewcancel;
    const queryString = `?hotel_accountinfoid=${AccountInfoId}&hotelid=${hotelId}&marshaCode=${marshaCode}`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async getPreviousData(AccountInfoId, marshaCode, hotelId) {
    const apiEndpont = Settings.api.getPreviousRates;
    const queryString = `?hotel_accountinfoid=${AccountInfoId}&hotelid=${hotelId}&marshaCode=${marshaCode}`;
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async updateProduct(AccountInfoId, newratetype_selected) {
    const apiEndpont = Settings.api.updateProduct;
    const queryString = `?hotel_accountinfoid=${AccountInfoId}&newratetype_selected=${Number(
      newratetype_selected
    )}`;
    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
  },

  async copyGovAction(AccountInfoId, govCopyRates) {
    const data = {
      hotel_accountinfoid: AccountInfoId,
      govCopyRates,
    };
    const apiEndpont = Settings.api.updateCopyGov;
    const postData = API.createPostData(data);
    const res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        Pragma: "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  },
  
  async updateCopySeasons(
    params,
    rfpid: any,
    ratetype: any,
    acctype: any,
    hotel_accountinfoid: any
  ) {
    const apiEndpont = Settings.api.updateCopySeason;
    const queryString = `?hotel_accountinfoid=${hotel_accountinfoid}&newratetype_selected=${Number(
      ratetype
    )}&hotelrfpid=${rfpid}&accounttype=${acctype}`;
    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      params
    );
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async updateRatesandRules(data) {
    const postData = API.createPostData({
      ...data,
    });
    const apiEndpont = Settings.api.updateRates;
    console.debug("updateRates RequestPayload -------------------> ", postData);

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

  async getAccountReport(paccount) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getAccountOverViewReport
      )}?paccount=${paccount}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountOverViewReport)
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
