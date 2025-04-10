import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async getHotelSolicitationAvail(data) {
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
      Utils.getAPIURI(Settings.api.getCBCRequestAvail),
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

    /*  const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getCBCRequestAvail
      )}?updateOtherList=false`
    ); */

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getCBCRequestAvail)
    );

    return res.data;
  },

  async setCBCRequestAvailUpdate(param, availGridArray, availData) {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const numItems = param.numItems;

    const params = {
      strCheckAvail: JSON.stringify(availGridArray),
      accountrecid: accountrecid,
      formChg: "N",
      numItems: numItems,
      numberItems: availData.CBCRequestAvailList.length,
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.cbcrequestavailAvailUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    /* const res = await axios.get(
      Utils.getAPIURI(Settings.api.cbcrequestavailAvailUpdate)
    ); */

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.cbcrequestavailAvailUpdate)
    );

    return res.data;
  },

  async setCBCRequestSelectUpdate(strData, data, availData) {
    const params = {
      formChg: "N",
      numItems: availData.CBCRequestAvailList.length,
      period: strData?.year,
      accountrecid: strData.accountFilter?.accountrecid,
      strCBCStatusList: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.cbcrequestavailSelectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.cbcrequestavailSelectUpdate)
    );

    return res.data;
  },

  async getHotelSolicitationSelect(param) {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const numItems = param.numItems;
    const period = param.strFilterValues.year;
    const newdata = {
      year: param.strFilterValues.year,
      accountFilter: param.strFilterValues.accountFilter,
      managed: param.strFilterValues.managed,
      franchised: param.strFilterValues.franchised,
      stringBrandList: param.strFilterValues.stringBrandList,
      areaFilter: param.strFilterValues.areaFilter,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      orderBy: param.strFilterValues.orderBy,
      filterMatchField: param.strFilterValues.filterMatchField,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterString: param.strFilterValues.filterString,
    };

    const params = {
      accountrecid: accountrecid,
      formChg: "N",
      numItems: numItems,
      period,
      strFilterValues: JSON.stringify(newdata),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getCBCRequestSelected),
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

    /*  const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getCBCRequestSelected
      )}?updateOtherList=false`
    ); */
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getCBCRequestSelected)
    );

    return res.data;
  },

  async getHotelSolicitaionFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getCBCRequestFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getCBCRequestFindFilter)
    );
    return res.data;
  },

  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getCBCRequestPricingFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getCBCRequestPricingFilter)
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
