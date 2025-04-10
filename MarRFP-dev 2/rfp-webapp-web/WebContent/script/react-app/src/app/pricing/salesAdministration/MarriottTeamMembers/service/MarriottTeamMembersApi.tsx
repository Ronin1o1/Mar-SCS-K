import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const MarriottTeamMembersApi = {
  async getPeriods() {
    const res = await axios.post(Utils.getAPIURI(Settings.api.getPeriods), {
      headers: { Pragma: "no-cache" },
    });
    MarriottTeamMembersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPeriods)
    );
    return res.data;
  },
  async getAcctContacts(accountrecid, accountname, period) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAcctContacts), {
      headers: { Pragma: "no-cache" },
      params: { accountrecid, accountname, period },
    });
    MarriottTeamMembersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAcctContacts)
    );
    return res.data;
  },

  async updateAcctContacts(strContacts, accrecId, fromChg) {
    const payload = {
      strContacts: JSON.stringify(strContacts),
      accountrecid: accrecId,
      formChg: fromChg,
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAcctContacts),
      Utils.createPostData(payload),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    MarriottTeamMembersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAcctContacts)
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

export default MarriottTeamMembersApi;
