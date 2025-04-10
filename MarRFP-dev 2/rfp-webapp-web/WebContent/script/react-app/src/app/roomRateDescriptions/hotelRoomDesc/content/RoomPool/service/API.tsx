import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { USERID } from "../../../../../../../config/user/UserId";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getSelectHotelListDetails() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getSelectHotelList)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getSelectHotelList)
    );
    return res.data;
  },
  async getSelectRoomPoolListDetails(reqParam) {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getRoomPoolHotelList)}?marshaCode=${
        reqParam.marshaCode
      }&hotelName=${reqParam.hotelName}`,
      {
        // headers: { Pragma: "no-cache" },
        headers: headers,
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRoomPoolHotelList)
    );
    return res.data;
  },

  updateRoomPool: async (data, formChg) => {
    const params = {
      roomPool: data.roomPool,
      newInd: data.newInd,
      marshaCode: data.marshaCode,
      hotelName: data.hotelName,
      screenid: data.screenid,
      strRoomDefDefinition: JSON.stringify(data.mainMap),
      strRoomDefDefinition1: data.mainMap,
      formChg: formChg,
    };
    const postData = Utils.createPostData(params);
    const getRoomNameDefineDataURL = Settings.api.updateDefinitionPool;
    const res = await axios.post(
      `${Utils.getAPIURI(getRoomNameDefineDataURL)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(getRoomNameDefineDataURL));

    return res.data;
  },
  async getRateProgramView(reqParam) {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getDefinition)}?roomPool=${
        reqParam.roomPool
      }&rateProgram=${reqParam.rateProgram}&marshaCode=${
        reqParam.marshaCode
      }&hotelName=${reqParam.hotelName}&screenid=${reqParam.screenid}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRoomPoolHotelList)
    );
    return res.data;
  },

  getRoomPoolView: async (data) => {
    const params = {
      roomPool: data.roomPool,
      newInd: data.newInd,
      marshaCode: data.marshaCode,
      hotelName: data.hotelName,
      screenid: data.screenid,
    };
    const postData = Utils.createPostData(params);
    const getRoomNameDefineDataURL = Settings.api.getRoomPoolView;
    const res = await axios.post(
      `${Utils.getAPIURI(getRoomNameDefineDataURL)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(getRoomNameDefineDataURL));

    return res.data;
  },

  getFinishRoomPoolView: async (data) => {
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.finishProduct)}${data}`,
      {
        // headers: { Pragma: "no-cache" },
        headers: headers,
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRoomPoolHotelList)
    );
    return res.data;
  },

  getKORDefLinks: async (data) => {
    const params = {
      roomPool: data.roomPool,
      newInd: data.newInd,
      marshaCode: data.marshaCode,
      hotelName: data.hotelName,
      screenid: data.screenid,
    };
    const getRoomNameDefineDataURL = Settings.api.getRoomPoolView;
    const res = await axios.get(
      `${Utils.getAPIURI(getRoomNameDefineDataURL)}`,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
        params: params,
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(getRoomNameDefineDataURL));

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
  async generatePoolReports(apiUrl) {
    const res = await axios.get(`${Utils.getAPIURI(apiUrl)}`, {
      headers: { Pragma: "no-cache" },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));

    return res.data;
  },
  updateRoomProgram: async (data) => {
    const params = {
      roomPool: data.roomPool,
      newInd: data.newInd,
      marshaCode: data.marshaCode,
      hotelName: data.hotelName,
      screenid: data.screenid,
      rateProgram: data.rateProgram,
      strRoomDefDefinition: JSON.stringify(data.mainMap),
      strRoomDefDefinition1: data.mainMap,
      formChg: "Y",
    };
    const postData = Utils.createPostData(params);
    const getRoomNameDefineDataURL = Settings.api.updateDefinition;
    const res = await axios.post(
      `${Utils.getAPIURI(getRoomNameDefineDataURL)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(getRoomNameDefineDataURL));

    return res.data;
  },
};
export default API;
