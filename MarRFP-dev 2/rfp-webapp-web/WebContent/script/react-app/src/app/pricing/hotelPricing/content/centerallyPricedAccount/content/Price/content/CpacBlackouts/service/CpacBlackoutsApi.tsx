import axios from "axios";
import Utils from "../../../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

interface hotelParams {
  hotel_accountinfoid: string;
  isLocked?: string;
}

const CpacBlackoutsAPI = {
  async getHotelAccountBlackoutUpdate(reqParam: any) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getHotelAccountBlackoutUpdate
      )}?marshaCode=${reqParam.marshaCode}&hotelName=${
        reqParam.hotelName
      }&hotelrfpid=${reqParam.hotelrfpid}&period=${
        reqParam.period
      }&hotel_accountinfoid=${reqParam.hotel_accountinfoid}&startnum=${
        reqParam.startnum
      }&searchtype=${reqParam.searchtype}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    CpacBlackoutsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelAccountBlackoutUpdate)
    );
    return res.data;
  },
  async getHotelAccountBlackout(reqParam: hotelParams) {
    const hotel_accountinfoid = reqParam.hotel_accountinfoid;
    const isLocked = reqParam.isLocked;
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getHotelAccountBlackout),
      {
        headers: { Pragma: "no-cache" },
        params: {
          hotel_accountinfoid,
          isLocked,
        },
      }
    );
    CpacBlackoutsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelAccountBlackout)
    );
    return res.data;
  },
  async postBlackoutData(
    stateData,
    totalDays,
    hotel_accountinfoid,
    waiveBlackoutData,
    strBlackoutList?
  ) {
    const body = {
      TOTAL_BLACKOUTS: totalDays,
      max_blackouts: stateData.maxBlackouts,
      acctBlackChg: stateData.acctBlackChg,
      waiveblackouts: waiveBlackoutData,
      hotel_accountinfoid: hotel_accountinfoid,
    };

    if (strBlackoutList) {
      body.strHotelBlackoutDate = JSON.stringify(
        Object.assign({}, strBlackoutList)
      );
      body.numblackouts = strBlackoutList.length;
    }

    const postData = Utils.createPostData(body);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateHotelAccountBlackout),
      postData,
      {
        headers: {
          "Content-Type": Settings.fields.urlencode,
        },
      }
    );

    CpacBlackoutsAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateHotelAccountBlackout)
    );
    return res.data;
  },
  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error(Settings.errorMessage);
    else if (
      response.headers &&
      response.headers[Settings.fields.content_Type] &&
      response.headers[Settings.fields.content_Type].includes("html")
    )
      throw Error(`${Settings.errorResponse}: ${endpoint}`);
  },
};
export default CpacBlackoutsAPI;
