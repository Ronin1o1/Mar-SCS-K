import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const EditAccountPlanSappApi = {
  async getPeriods() {
    const res = await axios.post(Utils.getAPIURI(Settings.api.getPeriods), {
      headers: { Pragma: "no-cache" },
    });
    EditAccountPlanSappApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPeriods)
    );
    return res.data;
  },

  async getAccounts(
    period: number,
    name = "*",
    startIndex: number,
    endIndex: number
  ) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAccounts), {
      headers: {
        Pragma: "no-cache",
        Range: `items=${startIndex}-${endIndex}`,
      },
      params: { period, name },
    });
    EditAccountPlanSappApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccounts)
    );
    return res.data;
  },

  async submitData(requestObj) {
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

    EditAccountPlanSappApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.selectSappAccount)
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

export default EditAccountPlanSappApi;
