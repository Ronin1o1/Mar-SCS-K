import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getEligibilityAmenityPriceList(reqParam) {
    const Param = {
      preventCache: 1628587957592,
    };
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getEligibilityAmenityPriceDetails
      )}?hotel_accountinfoid=${reqParam.accountinfoid}&hotelrfpid=${
        reqParam.hotelrfpid
      }&isLocked=${reqParam.isLocked}&isSelected=${
        reqParam.isSelected
      }&breakinrates=${reqParam.breakinrates}&isInternational=${
        reqParam.isInternational
      }&dojo.preventCache=${Param.preventCache}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEligibilityAmenityPriceDetails)
    );
    return res.data;
  },
  async getHotelQuickAuditamenity(reqParam) {
    const Param = {
      preventCache: 1640095507403,
    };
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getHotelQuickAuditamenities
      )}?hotel_accountinfoid=${reqParam.accountinfoid}&hotelid=${
        reqParam.hotelid
      }&marshaCode=${reqParam.marshaCode}&dojo.preventCache=${
        Param.preventCache
      }`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelQuickAuditamenities)
    );
    return res.data;
  },
  async updateEligibilityAmenityPriceDetails(params, reqParam) {
    const postData = API.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.updateEligibilityAmenityPriceDetails
      )}?hotel_accountinfoid=${reqParam.accountinfoid}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateEligibilityAmenityPriceDetails)
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
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};
export default API;
