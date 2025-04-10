import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
    async getRateNoteFacility(reqParam) {
        const Param = {
            accountinfoid: reqParam.accountinfoid,
            hotelid: reqParam.hotelid,
            accountid: reqParam.accountid
        }
        let res = await axios.get(`${Utils.getAPIURI(Settings.api.getRateNotesFacilityDetails)}?hotel_accountinfoid=${Param.accountinfoid}&hotelid=${Param.hotelid}&accountid=${Param.accountid}`, {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getRateNotesFacilityDetails));
        return res.data;
    },
    
    async updateRateNoteFacilityDetails(params) {
        const postData = API.createPostData(params);
        let res = await axios.post(`${Utils.getAPIURI(Settings.api.updateRateNotesFacilityDetails)}`,
        postData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        );
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateRateNotesFacilityDetails));
        return res.data;
    },

    async getSelectFacility(reqParam) {
      const Param = {
          accountrecid: reqParam.accountrecid,
          hotelid: reqParam.hotelid
      }
      let res = await axios.get(`${Utils.getAPIURI(Settings.api.getSelectFacilityDetails)}?hotelid=${Param.hotelid}&accountrecid=${Param.accountrecid}`, {
          headers: { Pragma: "no-cache" },
      });
      API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getSelectFacilityDetails));
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