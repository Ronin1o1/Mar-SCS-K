import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getPeriods() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getPeriods), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getPeriods));

    return res.data;
  },

  async getSourceAccounts(
    fromPeriod: number,
    name: string,
    startIndex: number,
    endIndex: number
  ) {
    name = name ? name + "*" : "*";
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getSourceAccounts),
      {
        headers: {
          Pragma: "no-cache",
          Range: `items=${startIndex}-${endIndex}`,
        },

        params: { fromPeriod, name },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getSourceAccounts)
    );

    return res.data;
  },
  async getTargetAccounts(
    toPeriod: number,
    name: string,
    startIndex: number,
    endIndex: number
  ) {
    name = name ? name + "*" : "*";
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getTargetAccounts),
      {
        headers: {
          Pragma: "no-cache",
          Range: `items=${startIndex}-${endIndex}`,
        },

        params: { toPeriod, name },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getTargetAccounts)
    );

    return res.data;
  },
  async copySAPPData(requestObj) {
    const params = {
      fromPeriod: requestObj.fromPeriod,
      fromAccountrecid: requestObj.fromAccountrecid,
      toPeriod: requestObj.toPeriod,
      toAccountrecid: requestObj.toAccountrecid,
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.copySappAccount),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          nextUrl: Settings.accountSappDetails.nextUrl,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.copySappAccount));

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

export default API;
