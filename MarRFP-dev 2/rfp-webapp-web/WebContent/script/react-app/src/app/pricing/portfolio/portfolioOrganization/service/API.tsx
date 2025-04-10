import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async getHotelSolicitationPricingFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getHotelSolicitationPricingFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelSolicitationPricingFilter)
    );
    return res.data;
  },

  async getAvailListonLoad() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getHotelSolicitationAvailonLoad),
      {
        headers: {
          Pragma: Settings.noCache,
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelSolicitationAvailonLoad)
    );
    return res.data;
  },

  async getSelectListonLoad() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getHotelSolicitationSelectonLoad),
      {
        headers: {
          Pragma: Settings.noCache,
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelSolicitationSelectonLoad)
    );
    return res.data;
  },

  async getHotelSolicitationAvail(data) {
    const newdata = {
      year: data.strFilterValues.year,
      accountFilter: data.strFilterValues.accountFilter,
      managed: data.strFilterValues.managed,
      franchised: data.strFilterValues.franchised,
      stringBrandList: data.strFilterValues.stringBrandList,
      areaFilter: data.strFilterValues.areaFilter,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      filterMatchField: data.strFilterValues.filterMatchField,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterString: data.strFilterValues.filterString,
      orderBy: data.strFilterValues.orderBy,
    };
    const params = {
      formChg: data.formChg,
      numItems: data.numItems,
      accountrecid: data.strFilterValues.accountFilter.accountrecid,
      subset: data.strFilterValues.accountFilter.subset,
      strFilterValues: JSON.stringify(newdata),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getHotelSolicitationAvail),
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
      Utils.getAPIURI(Settings.api.getHotelSolicitationAvail)
    );

    return res.data;
  },

  async setHotelSolicitationAvailUpdate(param, availGridArray) {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const formChg = param.formChg;
    const numItems = param.numItems;
    const subset = param.strFilterValues.accountFilter.subset2;
    const data = {
      year: param.strFilterValues.year,
      accountFilter: param.strFilterValues.accountFilter,
      managed: param.strFilterValues.managed,
      franchised: param.strFilterValues.franchised,
      stringBrandList: param.strFilterValues.stringBrandList,
      areaFilter: param.strFilterValues.areaFilter,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      filterMatchField: param.strFilterValues.filterMatchField,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterString: param.strFilterValues.filterString,
      orderBy: param.strFilterValues.orderBy,
    };

    const params = {
      strOrgSelect: JSON.stringify(availGridArray),
      accountrecid: accountrecid,
      formChg: formChg,
      numItems: numItems,
      subset: subset,
      strFilterValues: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setHotelSolicitationAvailUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          nextUrl: Settings.nextUrl,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setHotelSolicitationAvailUpdate)
    );

    return res.data;
  },

  async setHotelSolicitationSelectUpdate(data, selectGridArray) {
    const accountrecid = data.strFilterValues.accountFilter.accountrecid;
    const formChg = data.formChg;
    const numItems = data.numItems;
    const subset = data.strFilterValues.accountFilter.subset;
    const newdata = {
      year: data.strFilterValues.year,
      accountFilter: data.strFilterValues.accountFilter,
      managed: data.strFilterValues.managed,
      franchised: data.strFilterValues.franchised,
      stringBrandList: data.strFilterValues.stringBrandList,

      areaFilter: data.strFilterValues.areaFilter,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      filterMatchField: data.strFilterValues.filterMatchField,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterString: data.strFilterValues.filterString,
      orderBy: data.strFilterValues.orderBy,
    };
    const params = {
      strOrgSelect: JSON.stringify(selectGridArray),
      accountrecid: accountrecid,
      formChg: formChg,
      numItems: numItems,
      subset: subset,
      strFilterValues: JSON.stringify(newdata),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setHotelSolicitationSelectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setHotelSolicitationSelectUpdate)
    );

    return res.data;
  },

  async getHotelSolicitationSelect(data) {
    const newdata = {
      year: data.strFilterValues.year,
      accountFilter: data.strFilterValues.accountFilter,
      managed: data.strFilterValues.managed,
      franchised: data.strFilterValues.franchised,
      stringBrandList: data.strFilterValues.stringBrandList,
      areaFilter: data.strFilterValues.areaFilter,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      filterMatchField: data.strFilterValues.filterMatchField,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterString: data.strFilterValues.filterString,
      orderBy: data.strFilterValues.orderBy,
    };
    const params = {
      formChg: data.formChg,
      numItems: data.numItems,

      accountrecid: data.strFilterValues.accountFilter.accountrecid,
      subset: data.strFilterValues.accountFilter.subset,
      strFilterValues: JSON.stringify(newdata),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getHotelSolicitationSelect),
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
      Utils.getAPIURI(Settings.api.getHotelSolicitationSelect)
    );

    return res.data;
  },

  async getHotelSolicitaionFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getHotelSolicitaionFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelSolicitaionFindFilter)
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
