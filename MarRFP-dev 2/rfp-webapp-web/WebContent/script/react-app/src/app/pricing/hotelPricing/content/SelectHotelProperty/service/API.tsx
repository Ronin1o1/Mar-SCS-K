import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
   marshacode:"",
 period:"",
 
  async getHotelSelect() {

    let res = await axios.get(Utils.getAPIURI(Settings.api.getHotelSelect), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getHotelSelect));
  
    return res.data;
  },

  async gethotelrespondent() {

  //  let url = Settings.api.gethotelrespondent + '?marshaCode='+marshacode+'&hotelName='+param2 +'&period='+period;
    let res = await axios.get(Utils.getAPIURI(Settings.api.gethotelrespondent), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.gethotelrespondent));

    return res.data;
  },

  async selectYearPeriod() {

    let res = await axios.get(Utils.getAPIURI(Settings.api.gethotelrespondent), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.gethotelrespondent));

    return res.data;
  },
  async getNobidReason() {
    let res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getNobidReson)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getNobidReson)
    );

    return res.data;

  },

 
  async getAccountGridData(param) {


    const postData = Utils.createPostData(param);

    const res = await axios.post(Utils.getAPIURI(Settings.api.getAccountGridList), postData, {
      headers: {
        "Content-Type": Settings.api.urlencode,
      },
      params: {
        strOrderby: { "orderby": 1 },
        strPage: { "page": 1, "maxpagelen": 1200 }
      }
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getAccountGridList));
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
  }
};

export default API;
