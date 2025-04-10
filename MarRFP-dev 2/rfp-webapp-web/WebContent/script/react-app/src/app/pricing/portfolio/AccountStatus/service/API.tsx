import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

//const isDevMode = process.env.NODE_ENV == "development";

const API = {
  // for popup dropdown values
  async getAllAccountStatus() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getAllAccountStatus),
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAllAccountStatus)
    );
    return res.data;
  },

  //filter data
  async getListOfAccountStatus() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getListOfAccountStatus),
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getListOfAccountStatus)
    );
    return res.data;
  },

  //grid data
  async getGridData(data: any) {
    const body = {
      searchperiod: data.searchperiod,
      accountpricingtype: data.accountpricingtype,
      accountstatus: data.accountstatus,
      r_1: data.isStringSearch ? "FILTER" : data.r_1,
      alphaOrder: data.filterString,
      accountsegment: data.accountsegment,
      orderby: data.orderby,
      showPortfolioType: data.showPortfolioType,
      showPortfolio: data.showPortfolio,
      pasManager: data.pasManager,
      togShowPortfolio: data.togShowPortfolio ? "Y" : "N",
      formChg: "N",
      strPage: JSON.stringify({
        page: data.strPage.page,
        maxpagelen: data.totalPages,
      }),
    };

    const bodyRequest = Utils.createPostData(body);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getListOfAccountStatus),
      bodyRequest,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getListOfAccountStatus)
    );
    return res.data;
  },

  async searchAccountStatusList(data: any) {
    const params = {
      searchperiod: data.searchperiod,
      r_1: data.r_1,
      orderby: data.orderby,
      accountpricingtype: data.accountpricingtype,
      filterString: data.filterString,
      accountsegment: data.accountsegment,
      strPage: JSON.stringify(data.strPage),
      totalPages: data.totalPages,
      period: data.period,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.accountStatusSearch),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.accountStatusSearch)
    );
    return res.data;
  },

  async saveAccountStatusInfo(params: any) {
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAccountStatus),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAccountStatus)
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

export default API;
