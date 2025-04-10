import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";

const API = {
  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEdieReportFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEdieReportFilter)
    );
    return res.data;
  },

  async getPricingFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEdieReportFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEdieReportFindFilter)
    );
    return res.data;
  },

  async getFilteredHotelList(data) {
    const newData = {
      year: data.strFilterValues.year,
      edieProfile: data.strFilterValues.edieProfile,
      hotelProfile: data.strFilterValues.hotelProfile,
      accountFilter:
        data.strFilterValues.accountFilter.accountstatus == "ALL"
          ? { accountstatus: data.strFilterValues.accountFilter.accountstatus }
          : data.strFilterValues.accountFilter,
      stringBrandList: data.strFilterValues.stringBrandList,
      exceldateformat: data.strFilterValues.exceldateformat,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      areaFilter: data.strFilterValues.areaFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      orderBy: data.strFilterValues.orderBy,
      filterString: data.strFilterValues.filterString,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterMatchField: data.strFilterValues.filterMatchField,
      highlightedOnly: data.strFilterValues.highlightedOnly,
      emailMe: data.strFilterValues.emailMe,
    };

    const params = {
      formChg: data.formChg,
      numItems: data.numItems,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getFilteredHotelList),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: { updateOtherList: false },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getFilteredHotelList)
    );

    return res.data;
  },

  async getRunReport(strHotelList, data) {
    const newData = {
      year: data.strFilterValues.year,
      edieProfile: data.strFilterValues.edieProfile,
      accountFilter:
        data.strFilterValues.accountFilter.accountstatus == "ALL"
          ? { accountstatus: data.strFilterValues.accountFilter.accountstatus }
          : data.strFilterValues.accountFilter,
      stringBrandList: data.strFilterValues.stringBrandList,
      exceldateformat: data.strFilterValues.exceldateformat,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      areaFilter: data.strFilterValues.areaFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      orderBy: data.strFilterValues.orderBy,
      filterString: data.strFilterValues.filterString,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterMatchField: data.strFilterValues.filterMatchField,
      highlightedOnly: data.strFilterValues.highlightedOnly,
      emailMe: data.strFilterValues.emailMe,
    };

    const params = {
      strHotelList: JSON.stringify(strHotelList),
      formChg: data.formChg,
      numItems: strHotelList.length,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.runReport),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.runReport));

    return res.data;
  },

  async getCognosServerUrl() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getCognosUrl), {
      headers: {
        Pragma: "no-cache",
      },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getCognosUrl));

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
