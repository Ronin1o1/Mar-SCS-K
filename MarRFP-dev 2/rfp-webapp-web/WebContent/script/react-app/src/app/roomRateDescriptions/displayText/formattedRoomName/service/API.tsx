import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getDisplayText() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getDisplayText)}`
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getDisplayText));
    return res.data;
  },

  async deleteChannelLang(data: any, selectedChannel: any) {
    const splitData = selectedChannel.split("_");
    const strChannel = {
      code: splitData[0].trim(),
      number: splitData[1].trim(),
      name: splitData[2].trim(),
    };
    const splitData2 = data.split("_");
    const strLanguage = {
      code: splitData2[0],
      englisName: splitData2[1].trim(),
    };
    const params = {
      sltChannel: JSON.stringify(selectedChannel),
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.deleteChannelLang)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.getChannelLang);

    return res.data;
  },

  async getChannelLang(data: any) {
    const splitData = data.split("_");
    const strChannel = {
      code: splitData[0],
      number: splitData[1],
      name: splitData[2],
    };

    const params = {
      sltChannel: JSON.stringify(data),
      strChannel: JSON.stringify(strChannel),
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.getChannelLang)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(res, Settings.api.getChannelLang);

    return res.data;
  },
  /** Data Elem -- START */
  async getRoomDisplayAPI(data: any) {
    const strChannel = {
      number: data.channelNumber.trim(),
      name: data.channelName.trim(),
      code: data.channelCode.trim(),
    };
    const strLanguage = {
      code: data.languageCode.trim(),
      englishName: data.languageName.trim(),
    };

    const params = {
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
    };
    if (data.createNew && data.createNew === "true") {
      params["bCreateNew"] = true;
    }

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.getRoomDisplayElem)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    if (res && res.status !== 302) {
      API.handleErrorResponse(res, Settings.api.getRoomDisplayElem);
    }
    return res.data;
  },

  async copyIntoDisplayRooms(data: any) {
    console.log("API", data);
    const strChannel = {
      number: data.channelNumber.trim(),
      name: data.channelName.trim(),
      code: data.channelCode.trim(),
    };
    const strLanguage = {
      code: data.languageCode.trim(),
      englishName: data.languageName.trim(),
    };
    const strCopyChannel = {
      number:
        data?.newChannelLang?.channelCode?.trim() +
        "_" +
        data?.newChannelLang?.channelNumber?.trim() +
        "_" +
        data?.newChannelLang?.channelName?.trim(),
      name: data?.newChannelLang?.channelName?.trim(),
      code: data?.newChannelLang?.channelName?.trim(),
    };
    const strCopyLanguage = {
      code: data?.newChannelLang?.languageCode?.trim(),
      englishName: data?.newChannelLang?.languageName?.trim(),
    };

    const params = {
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
      strCopyChannel: JSON.stringify(strCopyChannel),
      strCopyLanguage: JSON.stringify(strCopyLanguage),
      copy: "on",
      sltChannel:
        data.newChannelLang.channelCode.trim() +
        "_" +
        data.newChannelLang.channelNumber.trim() +
        "_" +
        data.newChannelLang.channelName.trim(),
      sltLang: data.newChannelLang.languageCode.trim(),
      formChg: "N",
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.copyDisplayText)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    return res.data;
  },
  async updateRoomDisplayAPI(data: any, path: any) {
    const strChannel = {
      number: path.channelNumber.trim(),
      name: path.channelName.trim(),
      code: path.channelCode.trim(),
    };
    const strLanguage = {
      code: path.languageCode.trim(),
      englishName: path.languageName.trim(),
    };

    const params = {
      strTheText: JSON.stringify(data),
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
      formChg: "Y",
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateRoomDisplay),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.getRoomDisplayElem);

    return res.data;
  },

  /** Data Elem -- END */
  /** Enter Amenity  */
  async getAmenity(data: any) {
    const strChannel = {
      number: data.channelNumber.trim(),
      name: data.channelName.trim(),
      code: data.channelCode.trim(),
    };
    const strLanguage = {
      code: data.languageCode.trim(),
      englishName: data.languageName.trim(),
    };

    const params = {
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.getAmenity)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    if (res && res.status !== 302) {
      API.handleErrorResponse(res, Settings.api.getRoomDisplayElem);
    }
    return res.data;
  },

  async updateAmenityAPI(data: any, path: any) {
    const strChannel = {
      number: path.channelNumber.trim(),
      name: path.channelName.trim(),
      code: path.channelCode.trim(),
    };
    const strLanguage = {
      code: path.languageCode.trim(),
      englishName: path.languageName.trim(),
    };

    const params = {
      strTheType: JSON.stringify(data.strTheType),
      strTheUOM: JSON.stringify(data.strTheUOM),
      strTheAlternateText: JSON.stringify(data.strTheAlternateText),
      strChannel: JSON.stringify(strChannel),
      strLanguage: JSON.stringify(strLanguage),
      formChg: "Y",
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAmenity),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.getRoomDisplayElem);

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
