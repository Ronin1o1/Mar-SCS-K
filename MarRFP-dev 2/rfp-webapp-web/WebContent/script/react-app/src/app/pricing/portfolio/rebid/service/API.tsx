import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioPricingFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioPricingFilter)
    );
    return res.data;
  },

  async getPortfolioRebidFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioRebidFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioRebidFindFilter)
    );
    return res.data;
  },

  async getPortfolioRebid(param) {
    const params = {
      strPortfolioRebidList: [],
      formChg: param.formChg,
      numItems: param.numItems,
      accountrecid: param.strFilterValues.accountFilter.accountrecid,
      addemailtext_screentype: "R",
      period: param.period,
      strFilterValues: JSON.stringify(param.strFilterValues),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPortfolioRebid),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioRebid)
    );

    return res.data;
  },

  async update(param, panelData) {
    const params = {
      strPortfolioRebidList: JSON.stringify(param),
      formChg: panelData.formChg,
      numItems: panelData.numItems,
      accountrecid: panelData.strFilterValues.accountFilter.accountrecid,
      addemailtext_screentype: "R",
      period: panelData.period,
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.update),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.update));

    return res.data;
  },

  async getContactType(params) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getContactType), {
      headers: {
        "Content-Type": Settings.urlencode,
      },
      params: {
        accountrecid: params.strFilterValues.accountFilter.accountrecid,
        addemailtext_screentype: "R",
      },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getContactType));

    return res.data;
  },

  async sendMail(params) {
    const para = {
      ...params,
      strFilterValues: JSON.stringify(params.strFilterValues),
      addemailtext_screentype: "R",
      accountrecid: params.strFilterValues.accountFilter.accountrecid,
      period: params.period,
      strPortfolioRebidList: JSON.stringify(
        params.strPortfolioRebidList.portfolioRebidList
      ),
    };
    const postData = Utils.createPostData(para);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.sendMail),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.sendMail));

    return res.data;
  },

  async ajaxSave(params) {
    const para = {
      rawSaveData: JSON.stringify(params.portfolioRebidList),
      accountrecid: params.strFilterValues.accountFilter.accountrecid,
    };
    const postData = Utils.createPostData(para);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.ajaxSave),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.ajaxSave));

    return res.data;
  },

  async hotelsolicitationemailinfonew(accountrecid, addemailtext_screentype) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.gethotelsolicitationemailinfonew),
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          accountrecid: accountrecid,
          addemailtext_screentype: addemailtext_screentype,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelsolicitationemailinfonew)
    );
    return res.data;
  },

  async hotelsolicitationemailinfoupdate(accountrecid, params) {
    const para = {
      defaultRebidDueDate: params.defaultRebidDueDate,
      strHotelSolicitationAddEmailInfo: JSON.stringify(
        params.strHotelSolicitationAddEmailInfo
      ),
    };
    const postData = Utils.createPostData(para);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.hotelsolicitationemailinfoupdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          accountrecid: accountrecid,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelsolicitationemailinfoupdate)
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
