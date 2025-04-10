import axios from "axios";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

interface hotelParams {
    marshaCode: string,
    hotelName?: string,
    hotelrfpid: string,
    period: string,
    hotel_accountinfoid?: string,
    startnum?: string,
    searchtype?: string
}

const API = {
    async getHotelAccountBlackout(reqParam: hotelParams) {
        let res = await axios.get(`${Utils.getAPIURI(Settings.api.getHotelAccountBlackout)}?marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}&hotelrfpid=${reqParam.hotelrfpid}&period=${reqParam.period}&hotel_accountinfoid=${reqParam.hotel_accountinfoid}&startnum=${reqParam.startnum}&searchtype=${reqParam.searchtype}`,
        {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getHotelAccountBlackout));
        return res.data;
      },
    
    async postMultipleBlackouts(postData) {
    let res = await axios.post(Utils.getAPIURI(Settings.api.updateMultipleBlackoutsUrl), postData, {
        headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateMultipleBlackoutsUrl));

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