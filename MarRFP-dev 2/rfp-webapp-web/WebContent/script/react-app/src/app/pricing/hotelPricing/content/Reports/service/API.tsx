import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getCongnosUrl() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getCognosUrl)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getCognosUrl));
    return res.data;
  },
  async getTopTravelMarkey(param) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getTopTravelMarket)}?period=${
        param.period
      }&hotelid=${param.hotelid}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getTopTravelMarket)
    );
    return res.data;
  },
  async getAccountStatusReport(param, reportname) {
    let apiUrl;
    if (reportname === Settings.reportTabs.acceptanceStatus) {
      apiUrl = Settings.api.getAcceptancestatusReport;
    } else if (reportname === Settings.reportTabs.acceptanceStatusExcel) {
      apiUrl = Settings.api.getAcceptancestatusReportExcel;
    } else if (reportname === Settings.reportTabs.addendumQuestions) {
      apiUrl = Settings.api.getAddendumQuestions;
    } else if (reportname === Settings.reportTabs.accountPricing) {
      apiUrl = Settings.api.getAccountPricing;
    } else if (reportname === Settings.reportTabs.accountDirectory) {
      apiUrl = Settings.api.getAccountDirectory;
    } else if (reportname === Settings.reportTabs.rebidReport) {
      apiUrl = Settings.api.getRebidReport;
    } else if (reportname === Settings.reportTabs.SCPTDetailExtract) {
      apiUrl = Settings.api.getScptDetailExtract;
    } else if (reportname === Settings.reportTabs.SCPTSummaryExtract) {
      apiUrl = Settings.api.getScptSummaryExtract;
    } else if (reportname === Settings.reportTabs.SummaryTax) {
      apiUrl = Settings.api.getSummaryTax;
    }

    const res = await axios.get(
      `${Utils.getAPIURI(apiUrl)}?period=${param.period}&hotelid=${
        param.hotelid
      }`,

      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));
    return res.data;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async generateHotelPricingReports(bodyParam: any, reportname) {
    const body = bodyParam;
    let apiUrl;
    if (reportname === Settings.reportTabs.acceptanceStatus) {
      apiUrl = Settings.api.postAcceptanceStatusReport;
    } else if (reportname === Settings.reportTabs.acceptanceStatusExcel) {
      apiUrl = Settings.api.postAcceptanceStatusReportExcel;
    } else if (reportname === Settings.reportTabs.addendumQuestions) {
      apiUrl = Settings.api.postAddendumQuestions;
    } else if (reportname === Settings.reportTabs.accountPricing) {
      apiUrl = Settings.api.postAccountPricing;
    } else if (reportname === Settings.reportTabs.accountDirectory) {
      apiUrl = Settings.api.postAccoutDirectory;
    } else if (reportname === Settings.reportTabs.rebidReport) {
      apiUrl = Settings.api.postRebidREport;
    } else if (reportname === Settings.reportTabs.SCPTDetailExtract) {
      apiUrl = Settings.api.postScptDetailExtract;
    } else if (reportname === Settings.reportTabs.SCPTSummaryExtract) {
      apiUrl = Settings.api.postScptSummaryExtract;
    } else if (reportname === Settings.reportTabs.SummaryTax) {
      apiUrl = Settings.api.postSummaryTax;
    } else if (reportname === Settings.reportTabs.SpecialCorporatePricing) {
      apiUrl = Settings.api.postScptSummaryReport;
    }

    const payload = Utils.createPostData(bodyParam);
    const res = await axios.post(Utils.getAPIURI(apiUrl), payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));
    return res.data;
  },
  async generateTopTravelReports(bodyParam: any) {
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.postTopTravelMarket),
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.postTopTravelMarket)
    );
    return res.data;
  },
  async getHotelSelfAudit(param, CSR: boolean) {
    let apiUrl;
    if (CSR) {
      apiUrl = Settings.api.getHotelCSRSelfAuditParam;
    } else {
      apiUrl = Settings.api.getHotelSelfAuditParams;
    }
    const res = await axios.get(
      `${Utils.getAPIURI(apiUrl)}?period=${param.period}`,

      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));
    return res.data;
  },
  async submitToolsResourcesSelfAudit(bodyParam: any, CSR: boolean) {
    const body = bodyParam;
    let apiUrl;
    if (CSR) {
      apiUrl = Settings.api.postHotelCSRSelfAuditParam;
    } else {
      apiUrl = Settings.api.postHotelSelfAuditParams;
    }
    const payload = Utils.createPostData(bodyParam);
    const res = await axios.post(Utils.getAPIURI(apiUrl), payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(apiUrl));
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

  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },
};

export default API;
