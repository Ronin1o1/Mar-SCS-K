import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
import RoomUtills from "../content/RoomUtills";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
    async getEligibilityAminityList(reqParam) {
        
        let res = await axios.get(`${Utils.getAPIURI(Settings.api.getEligibilityAminity)}?marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}&hotelrfpid=${reqParam.hotelrfpid}&period=${reqParam.period}`, {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEligibilityAminity));
        return res.data;
    },
    async updateEligibilityAminity(params) {
        const postData = API.createPostData(params);
        const res = await axios.post(
            `${Utils.getAPIURI(Settings.api.updateEligibilityAminity)}`,
            postData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        API.handleErrorResponse(res, Settings.api.updateEligibilityAminity);
        return res.data;
    },
    async updatePreviousEligibilityAminity(params) {
        const postData = API.createPostData(params);
        const res = await axios.post(
            `${Utils.getAPIURI(Settings.api.previousEligibilityAminity)}`,
            postData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );
        API.handleErrorResponse(res, Settings.api.previousEligibilityAminity);
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
