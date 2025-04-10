import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

//const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;
const API = {
  async getHotelMirrorList() {
    let res = await axios.get(
      `${API.getAPIURI()}${Settings.api.getHotelMirrorList}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getHotelMirrorList}`
    );
    return res.data;
  },

  async getHotelMirrorListFilter(data, pageNumber) {
    // const orderby = data.orderby == 0 ? "marshacode" : "hotelName";
    const apiEndpont = Settings.api.getHotelMirrorList;

    const searchQueryData = {
      filterType: data.filterString === "" ? "ALL" : data.filterType,
      filterString: data.filterString,
      orderby: data.orderby,
      page: {
        page: pageNumber,
      },
    };

    const getsearchQueryData = {
      totalPages: data.totalPages,
      strMirrorSearchCriteria: JSON.stringify(searchQueryData),
    };

    const postSearchData = API.createPostData(getsearchQueryData);

    let res = await axios.post(
      `${API.getAPIURI()}${apiEndpont}`,
      postSearchData,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.getHotelMirrorList}`
    );
    return res.data;
  },

  async deleteHotelMirrorList(id: number) {
    let res = await axios.post(
      `${API.getAPIURI()}${Settings.api.deleteHotelMirrorList}?hotelid=${id}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${Settings.api.deleteHotelMirrorList}`
    );
    return res.data;
  },

  async findRateOffers(data) {
    // let formData = new FormData();
    // formData.append('hotelid', data.hotelid);
    // formData.append('rateTypeId', data.rateTypeId);
    //const queryString = `hotelid=${data.hotelid}&rateTypeId=${data.rateTypeId}`;
    const postData = API.createPostData(data);
    const apiEndpont = Settings.api.findRateOffers;
    let res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async findRateEntities(data) {
    const postData = API.createPostData(data);
    //const queryString = `hotelid=${data.hotelid}&rateOfferId=${data.rateOfferId}`;
    const apiEndpont = Settings.api.findRateEntities;

    let res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async updateMirror(data) {
    const updateDataInfo = {
      hotelid: data.hotelid,
      mirror_exception_notes: data.mirror_exception_notes,
      roomPoolSeq: data.roomPoolSeq,
      rateProgramCode: data.rateProgramCode,
      rateOfferName: data.rateOfferName,
      rateOfferId: data.rateOfferId,
      rateEntityId: data.rateEntityId,
      mirrorType: data.mirrorType,
      roomClassSeq: data.roomClassSeq,
    };

    const updateRequestData = {
      strMirrorInfo: JSON.stringify(updateDataInfo),
    };

    const postData = API.createPostData(updateRequestData);
    const apiEndpont = Settings.api.updateAction;
    let res = await axios.post(`${API.getAPIURI()}${apiEndpont}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
    return res.data;
  },

  async getExistingUpdateData(data) {
    const mirrorOfferId =
      data.mirrorType === "P"
        ? data.priceRateOfferId
        : data.restrictionRateOfferId;
    const queryString = `hotelid=${data.hotelid}&rateofferId=${mirrorOfferId}&mirrorType=${data.mirrorType}&roomPoolSequence=${data.roomPoolSeq}&roomClassSequence=${data.roomClassSeq}`;
    const apiEndpont = Settings.api.viewAction;
    let res = await axios.get(`${API.getAPIURI()}${apiEndpont}?${queryString}`);
    API.handleErrorResponse(res, `${API.getAPIURI()}${apiEndpont}`);
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
