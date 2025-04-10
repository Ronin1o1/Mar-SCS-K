import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

interface GetAccInitiativePayloadType {
  accountRecId: string;
  accountName: string;
  period: string;
}

const AccountInitiativesApi = {
  async getAccInitiatives(payload: GetAccInitiativePayloadType): Promise<any> {
    const headers = {
      Pragma: "no-cache",
    };

    const accountrecid = payload.accountRecId;
    const accountname = payload.accountName;
    const period = payload.period;
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getAccInitiative),
      {
        headers: headers,
        params: { accountrecid, accountname, period },
      }
    );
    AccountInitiativesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccInitiative)
    );

    return res.data;
  },

  async updateAccInitiatives(payload): Promise<any> {
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAccInitiative),
      Utils.createPostData(payload),
      {
        headers: headers,
      }
    );
    AccountInitiativesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAccInitiative)
    );

    return res.data;
  },

  handleErrorResponse: (response: any, endpoint: string): void => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
};

export default AccountInitiativesApi;
