import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../common/utils/Utils";
import Settings from "./Settings";

const API = {
  
  async getAccSpec(param: any){
        let res = await axios.get(Utils.getAPIURI(Settings.api.hotelaccountspecquestions), {
            headers: { Pragma: "no-cache" },
            params: { 
                marshaCode: param.marshaCode,
                hotelName: param.hotelName,
                hotelrfpid: param.hotelrfpid,
                period: param.period,
                hotel_accountinfoid: param.hotel_accountinfoid,
                rt: param.rt,
            },
          });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelaccountspecquestions));
          
        return res.data;
    },

    async updateAccountSpecQuestions(data: any, strQuestBT, strQuestAcc) {
          const params = {
            formChg:data.formChg,
            accountrecid:data.accountrecid,
            hotel_accountinfoid:data.hotel_accountinfoid,
            hotelrfpid:data.hotelrfpid,
            marshaCode:data.marshaCode,
            period:data.period,
            strAccountSpecificQandAList: strQuestBT,
            strAccountSpecificGroupQandAList: strQuestAcc
          };
          const postData = Utils.createPostData(params);
    
          const res = await axios.post(`${Utils.getAPIURI(Settings.api.hotelquestsave)}`, postData, {
            headers: {
              "Content-Type": Settings.api.urlencode
            }
          });
          API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelquestsave));
          
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
