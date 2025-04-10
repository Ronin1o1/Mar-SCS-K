import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const ViewAccountPlanSappReportApi = {
  async getPeriods() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getPeriods), {
      headers: { Pragma: "no-cache" },
    });
    ViewAccountPlanSappReportApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPeriods)
    );
    return res.data;
  },
  async getAccounts(
    period: number,
    name = "*",
    startIndex: number,
    endIndex: number,
    participate = "H"
  ) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAccounts), {
      headers: {
        Pragma: "no-cache",
        Range: `items=${startIndex}-${endIndex}`,
      },
      params: { period, name, participate },
    });
    ViewAccountPlanSappReportApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccounts)
    );
    return res.data;
  },

  async getModules(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.getModules)}?${payload}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    ViewAccountPlanSappReportApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getModules)
    );
    return res.data;
  },

  async generateHotelPricingReports(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getReport)}?${payload}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    ViewAccountPlanSappReportApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getReport)
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

export default ViewAccountPlanSappReportApi;
