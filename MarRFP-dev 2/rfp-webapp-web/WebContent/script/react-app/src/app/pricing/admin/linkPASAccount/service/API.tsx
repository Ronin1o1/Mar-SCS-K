import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async getLinkPasAccounts() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getLinkPasAccounts)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getLinkPasAccounts)
    );

    return res.data;
  },
  async getUsersDetails() {
   
    const res = await axios.get(Utils.getAPIURI(Settings.api.getUserDetails), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getUserDetails));

    return res.data;
  },
  async getLinkPasAccountsPasManager(period: any, pasManager: any) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getLinkPasAccounts)}`,
      {
        headers: { Pragma: "no-cache" },
        params: {
          pasManager: pasManager,
          period: period,
        },
      }
    );
    const result = res.data.adminRespondent;
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getLinkPasAccounts)
    );
    return result;
  },
  async getLinkPasAccountsWithFilter(pasManager: any, period: any) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getLinkPasAccountsWithFilter)}`,
      {
        headers: { Pragma: "no-cache" },
        params: {
          pasManager: pasManager,
          period: period,
        },
      }
    );

    const result = res.data.adminRespondent;

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getLinkPasAccountsWithFilter)
    );

    return result;
  },

  async updateLinkPasAccountsWithFilter(
    adminRespondentid: any,
    primeAccountSel2: any,
    secAccountSel2: any,
    origPeriod: any,
    pasManager: any,
    period: any,
    adminRespondent: any
  ) {
    if (true) {
      const data = {
        adminRespondentid: adminRespondentid,
        primeAccountSel2: primeAccountSel2,
        secAccountSel2: secAccountSel2,
      };

      const params1 = {
        strAdminRespondent: JSON.stringify(data),
        origPeriod: period,
        pasManager: pasManager,
        period: period,
      };

      const postData = Utils.createPostData(params1);

      const res = await axios.post(
        `${Utils.getAPIURI(Settings.api.updatePasAccount)}`,
        postData,
        {
          headers: {
            "Content-Type": Settings.pasAccount.contextType,
          },
          params: {
            nextURL: Settings.pasAccount.nextUrl,
          },
        }
      );

      API.handleErrorResponse(
        res,
        Utils.getAPIURI(Settings.api.updatePasAccount)
      );

      return res.data;
    }
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
