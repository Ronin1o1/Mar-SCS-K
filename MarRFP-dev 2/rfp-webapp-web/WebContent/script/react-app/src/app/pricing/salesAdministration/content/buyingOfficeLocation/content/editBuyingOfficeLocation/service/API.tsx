import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const API = {
  //get Edit Location API Call
  async getEditLoaction(
    bl_name,
    buyinglocid,
    seqid,
    bl_potentialrn,
    us_location,
    accountrecid
  ) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getEditLoaction), {
      headers: { Pragma: "no-cache" },
      params: {
        bl_name,
        buyinglocid,
        seqid,
        bl_potentialrn,
        us_location,
        accountrecid,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEditLoaction));
    return res.data;
  },

  //to get edit initiative details
  async getEditInitiative(
    initiative_name,
    seqId,
    action,
    buyinglocid,
    accountrecid,
    period,
    revStreamId
  ) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEditInitiative),
      {
        headers: { Pragma: "no-cache" },
        params: {
          initiative_name,
          seqId,
          action,
          buyinglocid,
          accountrecid,
          period,
          revStreamId,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEditInitiative)
    );
    return res.data;
  },

  //to update initiative details
  async updateEditInitiative(body, params) {
    const accountrecid = params.accountrecid;
    const initiative_name = body.initiative_name;
    const period = params.period;
    const action = "AccountPerspective";
    const seqId = body.seqid;
    const revStreamId = params.revStreamId;
    const payload = {
      strAcctInitiative: JSON.stringify(body),
      buyinglocid: body.buyinglocid,
      maxAcctPlanTasks: params.maxAcctPlanTasks,
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateEditInitiative),
      Utils.createPostData(payload),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          initiative_name,
          seqId,
          action,
          accountrecid,
          period,
          revStreamId,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateEditInitiative)
    );
    return res.data;
  },

  //to delete initiative details
  async deleteEditInitiative(body, params) {
    const accountrecid = params.accountrecid;
    const initiative_name = body.initiative_name;
    const period = params.period;
    const action = "AccountPerspective";
    const seqId = body.seqid;
    const buyinglocid = body.buyinglocid;
    const payload = {
      strAcctInitiative: JSON.stringify(body),
      buyinglocid: body.buyinglocid,
      maxAcctPlanTasks: params.maxAcctPlanTasks,
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.deleteEditInitiative),
      Utils.createPostData(payload),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          initiative_name,
          buyinglocid,
          action,
          seqId,
          accountrecid,
          period,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.deleteEditInitiative)
    );
    return res.data;
  },

  //to delete location
  async deleteLocation(body) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.deleteLocation),
      Utils.createPostData(body),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.deleteLocation));
    return res.data;
  },
  //edit location
  async updateLocation(body) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateLocation),
      Utils.createPostData(body),
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateLocation));
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
