import axios from "axios";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

interface paramsType {
    marshaCode: string,
    hotelName?: string,
    hotelrfpid: string,
    period: string
}

const API = {
    async getHotelRFPFinish(reqParam: paramsType) {
        let res = await axios.get(`${Utils.getAPIURI(Settings.api.getHotelRFPFinish)}?marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}&hotelrfpid=${reqParam.hotelrfpid}&period=${reqParam.period}`,
        {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getHotelRFPFinish));
        return res.data;
      },
    
      async getHotelRFPFinishScreens(bodyParams) {
        let postData = buildPostData(bodyParams);
        let res = await axios.post(Utils.getAPIURI(Settings.api.getHotelRFPFinish), postData, {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getHotelRFPFinish));
    
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
function buildPostData (bodyParams) {
    return Utils.createPostData(bodyParams);
}
export default API;