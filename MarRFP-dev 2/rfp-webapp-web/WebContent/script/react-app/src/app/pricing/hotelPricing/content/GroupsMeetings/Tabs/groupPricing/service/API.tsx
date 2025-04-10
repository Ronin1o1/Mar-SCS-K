import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
    async getRFPGrpPriceTab(hotelrfpid: number){
        let res = await axios.get(Utils.getAPIURI(Settings.api.grpprice), {
            headers: { Pragma: "no-cache" },
            params: { hotelrfpid: hotelrfpid, 'dojo.preventCache':'1637309318472' },
          });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.grpprice));
          
        return res.data;
    },

    async updateGrpPrices(hotelrfpid, data: any) {
      const params = {
        strHRFPGroupsPricing: JSON.stringify(data)
      };
      const postData = Utils.createPostData(params);

      let reqParams = {
        "hotelrfpid": hotelrfpid,
      };
      const res = await axios.post(`${Utils.getAPIURI(Settings.api.hotelgrpprice)}?hotelrfpid=${reqParams.hotelrfpid}`, postData, {
        headers: {
          "Content-Type": Settings.api.urlencode
        }
      });
      API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelgrpprice));
      
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

};

export default API;
