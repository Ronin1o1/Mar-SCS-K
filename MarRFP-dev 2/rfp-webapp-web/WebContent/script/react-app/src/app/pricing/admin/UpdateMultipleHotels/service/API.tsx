import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      ...item,
    };
  }, initialValue);
};

const API = {
  async postMultiHotelAccountCenter(data: any, pageNumber, maxpagelen) {
    console.log("data", data);
    const params = {
      accountrecid: data?.strFilterValues?.accountFilter?.accountrecid,
      period: data?.strFilterValues?.year,
      brandlist: data?.brandlist,
      brandAll: "",
      regionfiltervalue: {
        country: data?.strFilterValues?.areaFilter?.country,
        state: data?.strFilterValues?.areaFilter?.state,
        city: data?.strFilterValues?.areaFilter?.city,
        regionid: data?.strFilterValues?.areaFilter?.regionid || 0,
        areaOrRegion: data?.strFilterValues?.areaFilter?.areaOrRegion,
      },
      newAccountsOnly: JSON.stringify(data?.newAccountsOnly),
      accounttype: data?.strFilterValues?.accountFilter?.accountType,
      subset: data?.subset,
      dueDate: data?.searchdueDate || null,
      accountstatus:
        data?.strFilterValues?.accountFilter?.accountstatus == "SOL"
          ? "R"
          : data?.strFilterValues?.accountFilter?.accountstatus,
      strAccountrecid: data?.strFilterValues?.accountFilter?.accountrecid,
    };
    const pageObj = { page: pageNumber, maxpagelen: maxpagelen };
    const requestData: any = {
      strOrderby: JSON.stringify({
        orderby: data?.orderby,
        orderbynewaccounts: "",
        orderbymyaccounts: "",
      }),
      strMhacsearch: JSON.stringify(params),
      strpageby: JSON.stringify(pageObj),
    };
    if (data?.filterString) {
      requestData.filterString = data?.filterString;
    }
    const postData = API.createPostData(requestData);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getMultiHotelAccountCenter),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getMultiHotelAccountCenter)
    );
    return res.data;
  },

  async getNobidReason() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getNobidReson)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getNobidReson));

    return res.data;
  },

  async updateAccountGridData(param, bodyParam) {
    const data = {
      formChg: bodyParam?.formChg,
      strHotelAccountCenterUpdate:
        bodyParam?.strHotelAccountCenterUpdate &&
        bodyParam?.strHotelAccountCenterUpdate?.length > 0 &&
        JSON.stringify(
          convertArrayToObject(bodyParam?.strHotelAccountCenterUpdate)
        ),
    };
    const body = Utils.createPostData(data);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.postUpdate),
      body,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.postUpdate));
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

  async getMultiHotelAccountCenter() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getMultiHotelAccountCenter)}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getMultiHotelAccountCenter)
    );
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
