import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
    async getStatusAccountPricingList(reqParam) {
        const Param = {
            preventCache: 1629277471981
        }
        let res = await axios.get(`${Utils.getAPIURI(Settings.api.getStatusAccountDetails)}?hotel_accountinfoid=${reqParam.accountinfoid}&dojo.preventCache=${Param.preventCache}`, {
            headers: { Pragma: "no-cache" },
        });
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getStatusAccountDetails));
        return res.data;
    },
    async updateStatusAccountDetails(params) {
        const postData = API.createPostData(params);
        let res = await axios.post(`${Utils.getAPIURI(Settings.api.updateStatusAccountDetails)}`,
        postData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        );
        API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateStatusAccountDetails));
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
