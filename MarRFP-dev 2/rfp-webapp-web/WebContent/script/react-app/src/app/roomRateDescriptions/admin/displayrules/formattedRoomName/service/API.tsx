import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getRoomData() {
    const res = await axios.get(`${Utils.getAPIURI(Settings.api.getRooms)}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getRooms));
    return res.data;
  },

  // this for Copy Display Rules From Channel dropdown API
  async copyRoomDrop() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.copyGetRooms)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.copyGetRooms));
    return res.data;
  },

  async getroomentries() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.roomentries)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.roomentries));
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

  async roomentries(data: any) {
    // For API call for post method table
    const params = {
      sltChannel: data,
    };
    const postData = API.createPostData(params);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.roomentries}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.roomentries);

    return res.data;
  },

  async availableElementRules(data: any) {
    const postData = API.createPostData(data);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.availableElementRules}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  },

  async copyRoomsEntry(data: any) {
    const postData = API.createPostData(data);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.getcopyRooms}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.getcopyRooms);
    return res.data;
  },

  async upDataElementRules(data: any) {
    const postData = API.createPostData(data);

    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.upDataElementRules}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.upDataElementRules);

    return res.data;
  },

  async deleteChannelLang(data: any, selectedChannel: any) {
    const splitData = selectedChannel.split("_");
    const strChannel = {
      code: splitData[0],
      number: splitData[1],
      name: splitData[2],
    };
    const splitData2 = data.split("_");
    const strLanguage = { name: splitData2[0], code: splitData2[1] };

    const params = {
      sltChannel: JSON.stringify(selectedChannel),
      strChannel: JSON.stringify(strChannel),
      strEntry: JSON.stringify(strLanguage),
    };
    const postData = API.createPostData(params);
    const res = await axios.post(
      `${API.getAPIURI()}${Settings.api.roomdelete}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.roomdelete);

    return res.data;
  },

  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};

export default API;
