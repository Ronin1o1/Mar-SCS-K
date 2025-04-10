import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import Utils from "../../../../../common/utils/Utils";

const API = {
  async getAnticipatedAccount(params) {
    const postData = Utils.createPostData(params);

    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAnticipatedAccount)}?marshaCode=${
        params.marshaCode
      }&period=${params.period}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAnticipatedAccount)
    );

    return res.data;
  },

  async getAccountOffCycle(params) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAccountOffCycle)}?marshaCode=${
        params.marshaCode
      }&period=${params.period}&accountpricingtype=${
        params.accountpricingtype
      }`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountOffCycle)
    );

    return res.data;
  },
  async getAccountGridData(param, bodyParam) {
    const postData = Utils.createPostData(param);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getAccountGridList),
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
        params: {
          strOrderby: { orderby: bodyParam.orderby },
          strPage: {
            page: bodyParam.pageNumber,
            maxpagelen: bodyParam.maxPageLength,
          },
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountGridList)
    );
    return res.data;
  },
  async updateAccountGridData(param, bodyParam) {
    const postData = Utils.createPostData(param);

    const body = Utils.createPostData(bodyParam);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.postUpdate),
      body,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.postUpdate));
    return res.data;
  },
  async updatePublish(bodyParam) {
    const body = Utils.createPostData(bodyParam);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updatePublish),
      body,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updatePublish));
    return res.data;
  },
  async getNobidReason() {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getNobidReson)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getNobidReson));

    return res.data;
  },
  async getAccountReport(paccount) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getAccountOverViewReport
      )}?paccount=${paccount}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountOverViewReport)
    );
    return res.data;
  },
  async updateAction(bodyParam) {
    const body = Utils.createPostData(bodyParam);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAction),
      body,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateAction));
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
