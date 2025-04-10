import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
// @ts-ignore
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getMCADData(accountrecid: number, period: number) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getMcadList)}`,
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          accountrecid: accountrecid,
          period: period,
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getMcadList)}`
    );
    return res.data;
  },

  async updateMCADLookup(data: any, period: any, accountrecid: any, formChng) {
    const params = {
      accountrecid: accountrecid,
      formChg: formChng,
      period: period,
      strUmcadMap: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateMCAD)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.updateMCAD);
    return res.data;
  },

  async getAccountMCADdetails(
    businessid: any,
    parentbusinessid: any,
    ultimatebusinessid: any,
    globalbusinessid: any,
    businesslevel: any,
    accountrecid: any
  ) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAccountMCADdetails)}`,
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          businessid: businessid,
          parentbusinessid: parentbusinessid,
          ultimatebusinessid: ultimatebusinessid,
          globalbusinessid: globalbusinessid,
          businesslevel: businesslevel,
          accountrecid: accountrecid,
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getAccountMCADdetails)}`
    );
    return res.data;
  },
  async getAccountMCADResultID(
    searchtype: any,
    businessid: any,
    businesslevel: any,
    countrycode: any
  ) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAccountMCADResult)}`,
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          searchtype: searchtype,
          businessid: businessid,
          businesslevel: businesslevel,
          countrycode: countrycode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getAccountMCADResult)}`
    );
    return res.data;
  },
 
  async getAccountMCADResult(
    searchtype: any,
    businessname: any,
    businesslevel: any,
    countrycode: any,
    businessid: any,
  ) {
    let res
    let index = businessname ? (businessname.match(/[*?+%^${}[\]().|\\]/) || {}).index : null;
    let params = {
      searchtype: searchtype,
      businesslevel: businesslevel,
      countrycode: countrycode,
    }
    if(searchtype === "search_for_id"){
      params["businessid"] = businessid;
    } else {
      params["businessname"] = index === 0 || index === businessname.length -1 ? JSON.stringify(businessname) : businessname;
    }
    res = await axios.get(
    `${Utils.getAPIURI(Settings.api.getAccountMCADResult)}`,
    {
      headers: {
        Pragma: "no-cache",
      },
      params: params,
    }
  );
    
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getAccountMCADResult)}`
    );
    return res.data;
  },
  async getParentMCADData(
    searchtype: any,
    businessid: any,
    parentbusinesslevel: any,
    childbusinesslevel: any
  ) {
    const params = {
      searchtype: searchtype,
      businessid: businessid,
      parentbusinesslevel: parentbusinesslevel,
      childbusinesslevel: childbusinesslevel,
    };

    const postData = API.createPostData(params);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.getAccountMCADResult}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.MCADlookupscreen.ContentType,
        },
      }
    );

    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getAccountMCADResult}`
    );
    return res.data;
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
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
};

export default API;
