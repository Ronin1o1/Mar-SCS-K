import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";
import data from "../../../../../data";

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
      byYear: data.strFilterValues.byYear,
      deleteMCB: data.strFilterValues.deleteMCB,
      excludeGPP: data.strFilterValues.excludeGPP,
      hotelSaidDelete: data.strFilterValues.hotelSaidDelete,
      notAccepted: data.strFilterValues.notAccepted,
      stringRPGMList: data.strFilterValues.stringRPGMList,
      pgoosType: data.strFilterValues.pgoosType,
    };

    const params = {
      formChg: data.formChg,
      numItems: data.numItems,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoosPropagationAvail),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
          Accept: Settings.jsonutf8,
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    /*  const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getPgoosPropagationAvail
      )}?updateOtherList=false`
    ); */

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationAvail)
    );

    return res.data;
  },

  async setPgoosPropagationAvailUpdate(param, availGridArray, availData) {
    const accountrecid = param.strFilterValues.accountFilter.accountrecid;
    const numItems = param.numItems;
    const newData = {
      year: param.strFilterValues.year,
      solicittype: param.strFilterValues.solicittype,
      list: param.strFilterValues.list,
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
      byYear: param.strFilterValues.byYear,
      deleteMCB: param.strFilterValues.deleteMCB,
      excludeGPP: param.strFilterValues.excludeGPP,
      hotelSaidDelete: param.strFilterValues.hotelSaidDelete,
      notAccepted: param.strFilterValues.notAccepted,
      stringRPGMList: param.strFilterValues.stringRPGMList,
      pgoosType: param.strFilterValues.pgoosType,
    };

    const params = {
      strPGOOSSelect: JSON.stringify(availGridArray),
      // accountrecid: accountrecid,
      // formChg: "N",
      // numItems: numItems,
      // numberItems: availData.PgoosPropagationAvailList.length,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoosPropagationAvailUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    /* const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPgoosPropagationAvailUpdate)
    ); */

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationAvailUpdate)
    );

    return res.data;
  },

  async setPgoosPropagationSelectUpdate(param, data, availData) {
    const newData = {
      year: param.year,
      solicittype: param.solicittype,
      list: param.list,
      accountFilter: param.accountFilter,
      managed: param.managed,
      franchised: param.franchised,
      stringBrandList: param.stringBrandList,
      areaFilter: param.areaFilter,
      scheduleReport: param.scheduleReport,
      dateRangeFilter: param.dateRangeFilter,
      orderBy: param.orderBy,
      filterString: param.filterString,
      filterMatchType: param.filterMatchType,
      filterMatchField: param.filterMatchField,
      byYear: param.byYear,
      deleteMCB: param.deleteMCB,
      excludeGPP: param.excludeGPP,
      hotelSaidDelete: param.hotelSaidDelete,
      notAccepted: param.notAccepted,
      stringRPGMList: param.stringRPGMList,
      pgoosType: param.pgoosType,
    };
    const params = {
      // formChg: "N",
      // numItems: availData.PgoosPropagationAvailList.length,
      // period: param?.year,
      // accountrecid: param.accountFilter?.accountrecid,
      strPGOOSSelect: JSON.stringify(data),
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelectUpdate)
    );

    return res.data;
  },

  async deleteUpdateData(param, mcbObj) {
    const newData = {
      year: param.year,
      solicittype: param.solicittype,
      list: param.list,
      accountFilter: param.accountFilter,
      managed: param.managed,
      franchised: param.franchised,
      stringBrandList: param.stringBrandList,
      areaFilter: param.areaFilter,
      scheduleReport: param.scheduleReport,
      dateRangeFilter: param.dateRangeFilter,
      orderBy: param.orderBy,
      filterString: param.filterString,
      filterMatchType: param.filterMatchType,
      filterMatchField: param.filterMatchField,
      byYear: param.byYear,
      deleteMCB: mcbObj.deleteMCB,
      excludeGPP: param.excludeGPP,
      hotelSaidDelete: param.hotelSaidDelete,
      notAccepted: param.notAccepted,
      stringRPGMList: param.stringRPGMList,
      pgoosType: mcbObj.pgoosType,
    };
    const params = {
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelectUpdate)
    );

    return res.data;
  },

  async getPgoospropagationselectBatchId(
    param,
    numItemsSelected,
    pgoostypeData,
    sendVrp
  ) {
    const newData = {
      year: param.year,
      solicittype: param.solicittype,
      list: param.list,
      accountFilter: param.accountFilter,
      managed: param.managed,
      franchised: param.franchised,
      stringBrandList: param.stringBrandList,
      areaFilter: param.areaFilter,
      scheduleReport: param.scheduleReport,
      dateRangeFilter: param.dateRangeFilter,
      orderBy: param.orderBy,
      filterString: param.filterString,
      filterMatchType: param.filterMatchType,
      filterMatchField: param.filterMatchField,
      byYear: param.byYear,
      deleteMCB: param.deleteMCB,
      excludeGPP: param.excludeGPP,
      hotelSaidDelete: param.hotelSaidDelete,
      notAccepted: param.notAccepted,
      stringRPGMList: param.stringRPGMList,
      pgoosType: param.pgoosType,
      byAccountorByRPGM: pgoostypeData.byAccountorByRPGM,
    };
    const sendVrpReq = Object.assign(newData, sendVrp);
    const params = {
      totalCount: numItemsSelected,
      strFilterValues: JSON.stringify(sendVrpReq),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoospropagationrun),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoospropagationrun)
    );

    return res.data;
  },

  async getPgoospropagationrun(param, data, sendVrp) {
    const newData = {
      batchId: data.batchId,
      pgoosStatus: data.pgoosStatus,
      pgoosType: data.pgoosType,
    };
    const sendVrpReq = Object.assign(newData, sendVrp);
    const params = {
      totalCount: data.totalCount,
      strFilterValues: JSON.stringify(sendVrpReq),
      prodIter: data.prodIter,
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getPgoospropagationrun),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoospropagationrun)
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
      byYear: param.strFilterValues.byYear,
      deleteMCB: param.strFilterValues.deleteMCB,
      excludeGPP: param.strFilterValues.excludeGPP,
      hotelSaidDelete: param.strFilterValues.hotelSaidDelete,
      notAccepted: param.strFilterValues.notAccepted,
      stringRPGMList: param.strFilterValues.stringRPGMList,
      pgoosType: param.strFilterValues.pgoosType,
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
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelected),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    /*  const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getPgoosPropagationSelected
      )}?updateOtherList=false`
    ); */
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationSelected)
    );

    return res.data;
  },

  async getHotelSolicitaionFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPgoosPropagationFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationFindFilter)
    );
    return res.data;
  },

  async getPgoosStatus() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getPgoosStatus), {
      headers: {
        Pragma: Settings.noCache,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getPgoosStatus));
    return res.data;
  },

  async getPropagationFinish(batchId) {
    const res = await axios.get(
      Utils.getAPIURI(`${Settings.api.getPropagationFinish}?batchId=${batchId}`)
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(`${Settings.api.getPropagationFinish}?batchId=${batchId}`)
    );
    return res.data;
  },

  async getPgoosBatchReset(batchId) {
    const res = await axios.get(
      Utils.getAPIURI(`${Settings.api.getPgoosBatchReset}?batchId=${batchId}`),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(`${Settings.api.getPgoosBatchReset}?batchId=${batchId}`)
    );
    return res.data;
  },

  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getPgoosPropagationPricingFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getPgoosPropagationPricingFilter)
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
