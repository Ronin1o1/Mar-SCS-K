import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async showFilterOptions() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getCBCReportFilter}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getCBCReportFilter}`
    );
    return res.data;
  },

  async getCBCStatusFindFilter() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getCBCReportFindFilter}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getCBCReportFindFilter}`
    );
    return res.data;
  },

  async getCBCStatusList(data) {
    const postData = API.createPostData({
      ...data,
      strFilterValues: JSON.stringify(data.strFilterValues),
    });
    const apiEndpont = Settings.api.getFilteredHotelList;
    // For live API un comment below code and remove mock get cde

    const res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json;charset=UTF-8",
      },
    });

    // For mock, get the values
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async getRejectionReasons() {
    const res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getRejectionResonList}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getRejectionResonList}`
    );

    return res.data;
  },

  async ajaxSave(panelData, filteredHotelList) {
    const postData = API.createSaveDataParams(panelData, filteredHotelList);
    const apiEndpont = Settings.api.update;

    const res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  },

  createSaveDataParams: (paneldata, filteredHotelList) => {
    const arr = [];
    filteredHotelList.map((x) => {
      arr.push({
        checkCBC: x.hotelid,
        changed: x.changed ? x.changed : "N",
        hotelid: x.hotelid,
        hotelname: x.hotelname,
        marshacode: x.marshacode,
        rejectionreason: x.rejectionreason,
        rejectreasonid: x.rejectreasonid,
        status: x.status,
      });
    });

    const postData = API.createPostData({
      chkreject_1: "on",
      formChg: paneldata.formChg,
      numItems: arr.length,
      accountrecid: paneldata.strFilterValues.accountFilter.accountrecid,
      period: paneldata.strFilterValues.year,
      strCBCStatusList: JSON.stringify(arr),
    });

    return postData;
  },

  createPostDataParams: (
    data,
    paneldata,
    filteredHotelList,
    selectedRejectedReason = -1
  ) => {
    const arr = [];
    const checkCBCList = [];
    filteredHotelList.map((x) => {
      const item = data.find((d) => d.hotelid === x.hotelid);
      if (item) {
        checkCBCList.push(x.hotelid);
        arr.push({
          changed: item.changed ?? "Y",
          hotelid: x.hotelid,
          hotelname: x.hotelname,
          marshacode: x.marshacode,
          rejectionreason: item.rejectionreason,
          rejectreasonid: item.rejectreasonid,
          status: item.status,
        });
      }
    });

    const postData = API.createPostData({
      chkreject_1: "on",
      formChg: paneldata.formChg,
      numItems: arr.length,
      rejectionReasonID: selectedRejectedReason,
      accountrecid: paneldata.strFilterValues.accountFilter.accountrecid,
      period: paneldata.strFilterValues.year,
      strCBCStatusList: JSON.stringify(arr),
      checkCBC: JSON.stringify(checkCBCList),
    });

    return postData;
  },

  async updateAccept(data, paneldata, filteredHotelList) {
    const postData = API.createPostDataParams(
      data,
      paneldata,
      filteredHotelList
    );
    const apiEndpont = Settings.api.updateAccept;
    const queryString = `?nextUrl=/cbcstatuslist/refresh.action`;

    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  },

  async acceptAll(data, paneldata, filteredHotelList) {
    const postData = API.createPostDataParams(
      filteredHotelList,
      paneldata,
      filteredHotelList
    );
    const apiEndpont = Settings.api.acceptAll;
    const queryString = `?nextUrl=/cbcstatuslist/refresh.action`;

    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  },

  async updateReject(data, paneldata, filteredHotelList) {
    const postData = API.createPostDataParams(
      data,
      paneldata,
      filteredHotelList
    );
    const apiEndpont = Settings.api.updateReject;
    const queryString = `?nextUrl=/cbcstatuslist/refresh.action`;

    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  },

  async rejectAll(data, selectedRejectedReason, paneldata, filteredHotelList) {
    filteredHotelList.map((prop) => {
      if (prop.status == "C") {
        // update only property with pending status
        prop.rejectreasonid = selectedRejectedReason;
      }
    });

    const postData = API.createPostDataParams(
      filteredHotelList,
      paneldata,
      filteredHotelList,
      selectedRejectedReason
    );
    const apiEndpont = Settings.api.rejectAll;
    const queryString = `?nextUrl=/cbcstatuslist/refresh.action`;

    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  },

  async update(data, paneldata, filteredHotelList) {
    const postData = API.createPostDataParams(
      data,
      paneldata,
      filteredHotelList
    );
    const apiEndpont = Settings.api.update;
    const queryString = `?nextUrl=/cbcstatuslist/refresh.action`;

    const res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}${queryString}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
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
