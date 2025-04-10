import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  /**async getAvailListOnLoad() {
    let res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioSelectionAvailOnLoad),
      {
        headers: {
          Pragma: Settings.noCache
        }
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioSelectionAvailOnLoad)
    );
    return res.data;
  },

  async getSelectListOnLoad() {
    let res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioSelectionSelectOnLoad),
      {
        headers: {
          Pragma: Settings.noCache
        }
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioSelectionSelectOnLoad)
    );
    return res.data;
  },*/

  async getPortfolioSelectionAvail(data) {
    const newData = {
      year: data.strFilterValues.year,
      solicittype: data.strFilterValues.solicittype,
      list: data.strFilterValues.list,
      accountFilter: data.strFilterValues.accountFilter,
      managed: data.strFilterValues.managed,
      franchised: data.strFilterValues.franchised,
      stringBrandList: data.strFilterValues.stringBrandList,
      areaFilter: data.strFilterValues.areaFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      orderBy: data.strFilterValues.orderBy,
      filterString: data.strFilterValues.filterString,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterMatchField: data.strFilterValues.filterMatchField,
    };

    const params = {
      formChg: data.formChg,
      numItems: data.numItems,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPortfolioSelectionAvail),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
          Accept: "application/json;charset=UTF-8",
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioSelectionAvail)
    );

    return res.data;
  },

  async setPortfolioSelectionAvailUpdate(param, availGridArray) {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const subset = param.strFilterValues.accountFilter.subset;
    const formChg = param.formChg;
    const numItems = param.numItems;
    const data = {
      year: param.strFilterValues.year,
      solicittype: param.strFilterValues.solicittype,
      accountFilter: param.strFilterValues.accountFilter,
      managed: param.strFilterValues.managed,
      franchised: param.strFilterValues.franchised,
      stringBrandList: param.strFilterValues.stringBrandList,
      areaFilter: param.strFilterValues.areaFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      orderBy: param.strFilterValues.orderBy,
      filterString: param.strFilterValues.filterString,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterMatchField: param.strFilterValues.filterMatchField,
    };

    const params = {
      strOrgSelect: JSON.stringify(availGridArray),
      accountrecid: accountrecid,
      subset: subset,
      formChg: formChg,
      numItems: numItems,
      strFilterValues: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setPortfolioSelectionAvailUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setPortfolioSelectionAvailUpdate)
    );

    return res.data;
  },

  async setPortfolioSelectionSelectUpdate(accountrecid, selectedAccount, data) {
    const params = {
      accountrecid: accountrecid,
      accountpricingtype: selectedAccount.accountpricingtype,
      strOrgSelect: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setPortfolioSelectionSelectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setPortfolioSelectionSelectUpdate)
    );

    return res.data;
  },

  async getPortfolioSelectionSelect(param) {
    const newdata = {
      year: param.strFilterValues.year,
      solicittype: param.strFilterValues.solicittype,
      accountFilter: param.strFilterValues.accountFilter,
      managed: param.strFilterValues.managed,
      franchised: param.strFilterValues.franchised,
      stringBrandList: param.strFilterValues.stringBrandList,
      areaFilter: param.strFilterValues.areaFilter,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      filterString: param.strFilterValues.filterString,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterMatchField: param.strFilterValues.filterMatchField,
      scheduleReport: param.strFilterValues.scheduleReport,
      orderBy: param.strFilterValues.orderBy,
    };

    const params = {
      strFilterValues: JSON.stringify(newdata),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPortfolioSelectionSelect),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
          Accept: "application/json;charset=UTF-8",
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioSelectionSelect)
    );

    return res.data;
  },

  async getPortfolioSelectionFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPortfolioSelectionFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPortfolioSelectionFindFilter)
    );
    return res.data;
  },

  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.showFilterOptions),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.showFilterOptions)
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
