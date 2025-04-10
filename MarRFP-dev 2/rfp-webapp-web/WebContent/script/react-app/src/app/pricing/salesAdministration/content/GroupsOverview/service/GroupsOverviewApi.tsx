import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const GroupsOverviewApi = {
  async getGroupsOverview(accountrecid, accountname, period) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getGroupsOverview),
      {
        headers: { Pragma: "no-cache" },
        params: { accountrecid, accountname, period },
      }
    );
    GroupsOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getGroupsOverview)
    );
    return res.data;
  },
  async updateGroupsOverview(body) {
    const payload = {
      strGrpDetailProfile: JSON.stringify(body.strGrpDetailProfile),
      formChg: body.formChg,
      period: body.period,
      accountrecid: body.accountrecid,
      accountname: body.accountname,
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateGroupsOverview),
      Utils.createPostData(payload),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    GroupsOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateGroupsOverview)
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

export default GroupsOverviewApi;
