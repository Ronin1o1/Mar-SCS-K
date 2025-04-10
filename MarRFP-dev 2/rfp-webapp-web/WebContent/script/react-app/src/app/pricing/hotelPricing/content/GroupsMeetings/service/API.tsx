import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getHotelRFPGrpsAndMeetings(param: any) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.hotelgrpsmtgs), {
      headers: { Pragma: "no-cache" },
      params: {
        marshaCode: param.marshaCode,
        hotelName: param.hotelName,
        hotelrfpid: param.hotelrfpid,
        period: param.period,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.hotelgrpsmtgs));

    return res.data;
  },

  async updateGroupsAndMeeting(currTab: string, data: any) {
    const params = {
      info: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);

    const reqParams = {
      request_locale: "en",
      nextUrl: "/hotelgrpsmtgs/view.action",
      currtab: currTab,
    };
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.hotelgrpsmtgsave)}?request_locale=${
        reqParams.request_locale
      }&nextUrl=${reqParams.nextUrl}&currtab=${reqParams.currtab}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelgrpsmtgsave)
    );

    return res.data;
  },
  async updateHotelGroupMeeting(
    currTab: string,
    groupMeetingData,
    masterGroupMeetingData
  ) {
    const params = {
      formChg: groupMeetingData.list.formChg,
      hotelrfpid: masterGroupMeetingData.hotelrfpid,
      marshaCode: masterGroupMeetingData.marshaCode,
      period: masterGroupMeetingData.period,
      strHotel: JSON.stringify({
        grpsmtgrespond: groupMeetingData.list.grpsmtgrespond,
        tabgrpgmsflg: groupMeetingData.list.tabgrpgmsflg,
        tabprcgmsflg: groupMeetingData.list.tabprcgmsflg,
        tabpaygmsflg: groupMeetingData.list.tabpaygmsflg,
      }),
    };
    const postData = Utils.createPostData(params);

    const reqParams = {
      request_locale: "en",
      nextUrl: "/hotelgrpsmtgs/view.action",
      currtab: currTab,
    };
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.updateHotelGroupMeeting
      )}?request_locale=${reqParams.request_locale}&nextUrl=${
        reqParams.nextUrl
      }&currtab=${reqParams.currtab}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateHotelGroupMeeting)
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
