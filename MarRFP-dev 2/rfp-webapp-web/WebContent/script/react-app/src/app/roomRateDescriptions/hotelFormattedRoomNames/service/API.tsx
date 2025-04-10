import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getSelectHotelListDetails() {
    let res = await axios.get(`${Utils.getAPIURI(Settings.api.getSelectHotelList)}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getSelectHotelList));
    return res.data;
  },
  async getSelectRoomPoolListDetails(reqParam) {
    let res = await axios.get(`${Utils.getAPIURI(Settings.api.getRoomPoolHotelList)}?marshaCode=${reqParam.marshaCode}&hotelName=${reqParam.hotelName}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getRoomPoolHotelList));
    return res.data;
  },
  
  getRoomNameDefine: async (queryParam) => {
    const getRoomNameDefineDataURL =
      Settings.api.getRoomNameDefineData + queryParam;
    const res = await axios.get(Utils.getAPIURI(getRoomNameDefineDataURL));
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRoomNameDefineData)
    );

    return res.data;
  },
  async updateRoomServiceTypeData(serviceDetails, roomTypeData) {
    const params = {
      formChg: serviceDetails.formChg,
      roomPool: serviceDetails.roomPool,
      marshaCode: serviceDetails.marshaCode,
      hotelName: serviceDetails.hotelName,
      strRoomTypeNameDefinition: roomTypeData,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateDefinition)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateDefinition);
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
