import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../../common/utils/Utils";
import Settings from "./Settings";

const API = {
  async getBTSpecQuest(param: any) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.accountspecquest),
      {
        headers: { Pragma: "no-cache" },
        params: {
          hotel_accountinfoid: param,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.accountspecquest)
    );

    return res.data;
  },

  async updateAccBTSpecQuestions(data: any, strQuest) {
    const hotel_accountinfoid = data.hotel_accountinfoid;
    const params = {
      strAccountSpecificQandAList: strQuest,
      acctQuestChg: "Y",
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.hotelquestsave
      )}?hotel_accountinfoid=${hotel_accountinfoid}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelquestsave));

    return res.data;
  },

  async getMeetSpecQuest(param: any) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.accountspecgroups),
      {
        headers: { Pragma: "no-cache" },
        params: {
          hotel_accountinfoid: param,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.accountspecgroups)
    );

    return res.data;
  },

  async updateAccMeetSpecQuestions(data: any, strQuest) {
    const hotel_accountinfoid = data.hotel_accountinfoid;
    const params = {
      strAccountSpecificGroupQandAList: strQuest,
      acctQuestChg: "Y",
    };

    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.hotelgroupquestsave
      )}?hotel_accountinfoid=${hotel_accountinfoid}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelgroupquestsave)
    );

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
