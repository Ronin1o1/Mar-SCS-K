import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const GroupsIntermediariesApi = {
  async getGroupsintermediaries(accountrecid, accountname, period) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getGroupsintermediaries),
      {
        headers: { Pragma: "no-cache" },
        params: { accountrecid, accountname, period },
      }
    );
    GroupsIntermediariesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getGroupsintermediaries)
    );
    return res.data;
  },

  async updateGroupsIntermediaries(body) {
    const payload = {
      strGrpDetail: JSON.stringify(body.strGrpDetail),
      formChg: body.formChg,
      period: body.period,
      accountrecid: body.accountrecid,
      accountname: body.accountname,
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateGroupsIntermediaries),
      Utils.createPostData(payload),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    GroupsIntermediariesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateGroupsIntermediaries)
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

export default GroupsIntermediariesApi;
