import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
    async getHotelGrpMtgPaymentTab(hotelrfpid: number){
        let res = await axios.get(Utils.getAPIURI(Settings.api.grpmtgpay), {
            headers: { Pragma: "no-cache" },
            params: { hotelrfpid: hotelrfpid, 'dojo.preventCache':'1637309318472' },
          });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.grpmtgpay));
          
        return res.data;
    },

    async updateGrpMtgPay(hotelrfpid, data: any) {
      const params = {
        strHotelRFPPayPricing: JSON.stringify(data),
        hotelrfpid: hotelrfpid
      };
      const postData = Utils.createPostData(params);

      const res = await axios.post(`${Utils.getAPIURI(Settings.api.hotelgrpmtgpay)}`, postData, {
        headers: {
          "Content-Type": Settings.api.urlencode
        }
      });
      API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelgrpmtgpay));
      
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
