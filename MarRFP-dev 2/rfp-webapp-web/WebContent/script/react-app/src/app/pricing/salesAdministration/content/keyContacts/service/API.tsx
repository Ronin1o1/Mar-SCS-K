import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { USERID } from "../../../../../../../config/user/UserId";
import Utils from "../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const headers = {
  Pragma: "no-cache",
};

const API = {
  async getKeyContacts(recID, yearSel, accName, revStreamId) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getKeyContacts
      )}?accountrecid=${recID}&accountname=${accName}&period=${yearSel}&revStreamId=${revStreamId}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getKeyContacts));
    return res.data;
  },
  async updateKeyContacts(postParams) {
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.postKeyContacts
      )}`,
      postParams,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getKeyContacts));
    return res.data;
  },
  async getEditKeyContact(contactName, contactRevStreamId, recID, period) {
    const res = await axios.get(
      `${Utils.getAPIURI(
        Settings.api.getEditKeyContact
      )}?contact_name=${encodeURIComponent(contactName)}&field_seq=${1}&accountId=${0}&revstream_id=${contactRevStreamId}&accountrecid=${recID}&period=${period}`,
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getKeyContacts));
    return res.data;
  },
  async updateKeyContact(params, postData) {
    let contactDetails = Utils.createPostData({strTravelManager: JSON.stringify(postData)});
    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateKeyContact)}?contact_name=${encodeURIComponent(params.contact_name)}&field_seq=${params.field_seq}&accountId=${params.accountId}&revstream_id=${params.revstream_id}&accountrecid=${params.accountrecid}&period=${params.period}`, 
      contactDetails, 
      {
        headers: headers,
      });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateKeyContact));
    return res.data;
  },
  async deleteKeyContact(params, postData) {
    let contactDetails = Utils.createPostData({strTravelManager: JSON.stringify(postData)});
    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.deleteKeyContact)}?contact_name=${encodeURIComponent(params.contact_name)}&field_seq=${params.field_seq}&accountId=${params.accountId}&revstream_id=${params.revstream_id}&accountrecid=${params.accountrecid}&period=${params.period}`, 
      contactDetails, 
      {
        headers: headers,
      });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.deleteKeyContact));
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
