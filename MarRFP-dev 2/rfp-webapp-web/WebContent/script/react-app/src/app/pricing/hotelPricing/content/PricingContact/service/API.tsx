import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const contextType = null;

const API = {
  async gethotelrespondent(param) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.gethotelrespondent)}?marshaCode=${
        param.marshaCode
      }&hotelName=${param.hotelName}&period=${param.period}`,

      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelrespondent)
    );
    return res.data;
  },

  async getUserDetails() {
    
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getUserDetails)}`,

      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getUserDetails));
    return res.data;
  },

  async updateGridDisplayAPI(inputvalues, data) {
    const request_locale = "en";
    const nextUrl = "/hotelstandards/view.action";
    const params = {
      formChg: inputvalues.formChgr,
      hotelrfpid: inputvalues.hotelrfpid,
      marshaCode: inputvalues.marshaCode,
      period: inputvalues.period,
      max_emails: inputvalues.max_emails,
      acceptbtflg: inputvalues.acceptbtflg,
      maxPeriod: inputvalues.maxPeriod,
      isHotelUser: inputvalues.isHotelUser,
      strRespondentEmails: JSON.stringify(data),
      strHotelRFPRespondent: JSON.stringify({
        personname: inputvalues.personname,
        persontitle: inputvalues.persontitle,
        email: inputvalues.email,
        countrycode: inputvalues.countrycode,
        areacitycode: inputvalues.areacitycode,
        phonenumber: inputvalues.phonenumber,
      }),
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.updatehotelrespondent
      )}?request_locale=${request_locale}&nextUrl=${nextUrl}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updatehotelrespondent);

    return res.data;
  },
  async updateBTFlag(data) {
    const request_locale = "en";
    const nextUrl = "/hotelrespondent/view.action";
    const postData = Utils.createPostData(data);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.updateBTFlag
      )}?request_locale=${request_locale}&nextUrl=${nextUrl}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateBTFlag);

    return res.data;
  },
  async selectYearPeriod() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.gethotelrespondent),
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelrespondent)
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
