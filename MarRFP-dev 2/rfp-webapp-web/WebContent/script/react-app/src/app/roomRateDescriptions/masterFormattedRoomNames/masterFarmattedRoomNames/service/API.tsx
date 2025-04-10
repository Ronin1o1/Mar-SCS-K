import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../settings/Settings";

const API = {
  async getRetrieveRoomPoolList() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getRetrieveRoomPoolList)
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRetrieveRoomPoolList)
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
    const postData = API.createPostData(params);
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

  /**handle error response */
  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },

  /**creat post format data */
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },

  /**roomtypenamemasterdefinition/getRoomNameDefine?roomPool=BAYV&screenid=0102 */
  getRoomNameDefine: async (queryParam) => {
    const getRoomNameDefineDataURL =
      Settings.api.getRoomNameDefineData + queryParam;
    const res = await axios.get(Utils.getAPIURI(getRoomNameDefineDataURL));
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRetrieveRoomPoolList)
    );

    return res.data;
  },
};

export default API;
