/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const GeneralAccountOverviewApi = {
  async getAccountOverview(requestObj: { year: string; accountrecid: string }) {
    const period = requestObj.year;
    const accountrecid = requestObj.accountrecid;

    const res = await axios.get(
      Utils.getAPIURI(Settings.api.selectSappAccount),
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          period,
          accountrecid,
        },
      }
    );

    GeneralAccountOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.selectSappAccount)
    );
    return res.data;
  },
  async submitData(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAcctOverview),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    GeneralAccountOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAcctOverview)
    );
    return res.data;
  },
  async getUserDetails() {
    
    const res = await axios.get(Utils.getAPIURI(Settings.api.getUserDetails), {
      headers: {
        Pragma: "no-cache",
      },
    });

    GeneralAccountOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getUserDetails)
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

export default GeneralAccountOverviewApi;
