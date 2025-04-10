import axios from "axios";
import "core-js/stable";
import { components } from "react-select";
import "regenerator-runtime/runtime";
import { PropertyList } from "../../../../pricing/hotelPropertyList/content/PropertyList";
import Settings from "../static/Settings";

//const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getFilterViewLists(apiEndpont: string) {
    const headers = {
      Pragma: "no-cache",
    };
    if (
      apiEndpont ===
      "/multihotelaccountcenter/getMultiHotelAccountCenter.action"
    ) {
      headers.Accept = "application/json;charset=UTF-8";
    }
    const res = await axios.get(`${API.getAPIURI()}${apiEndpont}`, {
      headers: headers,
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async getRegions() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getRegions}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getRegions}`
    );
    return res.data;
  },

  async getCountries() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getCountries}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getCountries}`
    );
    return res.data;
  },

  async getStates(countryCode) {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getStates}?country=${countryCode}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getStates}`);
    return res.data;
  },

  async getCities(countryCode, stateCode) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getCities
      }?country=${countryCode}&state=${stateCode}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getCities}`);
    return res.data;
  },

  async getEdieProfiles() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getEdieProfiles}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getEdieProfiles}`
    );
    return res.data;
  },

  async getAccountSegment() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getAccountSegment}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getAccountSegment}`
    );
    return res.data;
  },

  async getAccountSubsets() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getAccountSubsets}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getAccountSubsets}`
    );
    return res.data;
  },

  async getAccountLists(data, componentName = "", axiosRequest) {
    let queryString;
    if (componentName === "UpdateMultipleHotels") {
      if (data.searchnewAccountsOnly) {
        queryString = `?searchperiod=${data.searchperiod}&searchaccounttype=${
          data?.searchaccounttype != "*" ? data?.searchaccounttype : ""
        }&searchdueDate=${data.searchdueDate || ""}&searchnewAccountsOnly=${
          data.searchnewAccountsOnly
        }`;
      } else {
        queryString = `?searchperiod=${data.searchperiod}&searchaccounttype=${
          data?.searchaccounttype != "*" ? data?.searchaccounttype : ""
        }&searchdueDate=${data.searchdueDate || ""}`;
      }
    } else if (componentName != "hotelGPPPGOOSMaintenance") {
      queryString = `?searchperiod=${data.searchperiod}&searchaccounttype=${
        data?.searchaccounttype != "*" ? data?.searchaccounttype : ""
      }`;
    } else {
      queryString = `?searchperiod=${data.searchperiod}&searchaccounttype=${
        data?.searchaccounttype != "*" ? data?.searchaccounttype : ""
      }&searchgppaccountsonly=Y`;
    }

    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getAccountLists}${queryString}`,
      axiosRequest
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getAccountLists}`
    );
    return res.data;
  },

  async getEdieHotelProfiles() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getEdieHotelProfiles}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getEdieHotelProfiles}`
    );
    return res.data;
  },

  async getRateProgramListData(accountCid, strFilterValues) {
    const id = accountCid
      ? accountCid
      : strFilterValues?.accountFilter?.accountrecid
      ? strFilterValues?.accountFilter?.accountrecid
      : "0";
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getRateProgramList
      }?searchaccountrecid=${id}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getRateProgramList}`
    );
    return res.data;
  },

  async getReports() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getReportTypes}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getReportTypes}`
    );
    return res.data;
  },

  async getDueDate(searchperiod, searchdueDate) {
    const queryString = `searchperiod=${searchperiod}&searchdueDate=${searchdueDate}`;
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getDueDate}?${queryString}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getDueDate}${queryString}`
    );
    return res.data;
  },

  async getReportDetails(reportName) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getReportdetail
      }?reportName=${reportName}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getReportdetail}`
    );
    return res.data;
  },

  async getAccAerType(accountrecId) {
    const res = await axios.get(
      `${API.getAPIURI()}${
        Settings.api.getAccAerType
      }?accountrecid=${accountrecId}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getAccAerType}`
    );
    return res.data;
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

  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
};

export default API;
