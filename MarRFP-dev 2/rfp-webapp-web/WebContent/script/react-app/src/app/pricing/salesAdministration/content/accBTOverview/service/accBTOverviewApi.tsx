import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

let sourceCancelToken;
const accBTOverviewApi = {
  async getOverViewData(
    accountrecid: string,
    period: string,
    accountName: string
  ) {
    try {
      const res = await axios.get(Utils.getAPIURI(Settings.api.getBtOverview), {
        headers: {
          Pragma: "no-cache",
        },
        params: { accountrecid, period, accountName },
      });
      accBTOverviewApi.handleErrorResponse(
        res,
        Utils.getAPIURI(Settings.api.getBtOverview)
      );
      return res.data;
    } catch (err) {
      //if (axios.isCancel(err)) return { cancelPrevQuery: true };
      return [err];
    }
  },

  async submitData(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateBtOverview),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accBTOverviewApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateBtOverview)
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

export default accBTOverviewApi;
