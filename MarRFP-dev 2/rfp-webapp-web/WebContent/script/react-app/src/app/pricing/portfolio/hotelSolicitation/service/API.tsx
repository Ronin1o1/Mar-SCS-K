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
      strCheckAvail: JSON.stringify(availGridArray),
      accountrecid: accountrecid,
      formChg: formChg,
      numItems: numItems,
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
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setHotelSolicitationAvailUpdate)
    );

    return res.data;
  },

  async setHotelSolicitationSelectUpdate(accountrecid, data) {
    const params = {
      accountrecid: accountrecid,
      strSolicitSelect: JSON.stringify(data),
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

  async getHotelSolicitationSelect(param) {
    const newdata = {
      year: param.strFilterValues.year,
      solicittype: param.strFilterValues.solicittype,
      accountFilter: param.strFilterValues.accountFilter,
      managed: param.strFilterValues.managed,
      franchised: param.strFilterValues.franchised,
      stringBrandList: param.strFilterValues.stringBrandList,
      areaFilter: param.strFilterValues.areaFilter,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      orderBy: param.strFilterValues.orderBy,
      filterString: param.strFilterValues.filterString,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterMatchField: param.strFilterValues.filterMatchField,
    };

    const params = {
      addemailtext_screentype: Settings.addemailtext_screentype,
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

  async getContactType(accountrecid) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getContactType), {
      headers: {
        "Content-Type": Settings.urlencode,
      },
      params: {
        accountrecid: accountrecid,
        addemailtext_screentype: Settings.addemailtext_screentype,
      },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getContactType));
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

  async hotelsolicitationemailinfonew(accountrecid, addemailtext_screentype) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.gethotelsolicitationemailinfonew),
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          accountrecid: accountrecid,
          addemailtext_screentype: Settings.addemailtext_screentype,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.gethotelsolicitationemailinfonew)
    );
    return res.data;
  },

  async hotelsolicitationAddInfo(accountrecid, param) {
    const params = {
      strHotelSolicitationAddEmailInfo: JSON.stringify(param),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.hotelsolicitationAddInfo),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          accountrecid,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.hotelsolicitationAddInfo)
    );

    return res.data;
  },

  async sendEmailpost(
    sendmailArray,
    panelDataParam,
    fileFlag,
    param,
    fileName
  ) {
    const formData = new FormData();
    formData.append("myFile", param);
    formData.append("myFileName", fileName);
    formData.append(
      "accountrecid",
      panelDataParam.strFilterValues.accountFilter.accountrecid
    );
    formData.append(
      "accountrecid",
      panelDataParam.strFilterValues.accountFilter.accountrecid
    );
    formData.append("myFileSizeFlag", fileFlag);
    formData.append("period", panelDataParam.strFilterValues.year);
    formData.append("strSolicitSelect", JSON.stringify(sendmailArray));
    const params = {
      accountrecid: panelDataParam.strFilterValues.accountFilter.accountrecid,
      period: panelDataParam.strFilterValues.year,
      myFileSizeFlag: fileFlag,
      strSolicitSelect: JSON.stringify(sendmailArray),
      //strFilterValues: JSON.stringify(panelDataParam),
      myFile: formData,
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.sendEmailpostcall),
      formData,
      {
        params: {
          updateOtherList: false,
        },
        headers: {
          "Content-Type": Settings.multiPart,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.sendEmailpostcall)
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
