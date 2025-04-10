/* eslint-disable prefer-const */
import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const APIEdit = {
  async populateAccountList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.populateAccounts)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.populateAccounts)
    );

    return res.data;
  },

  async updateAccountList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.updateAccount)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.updateAccount)
    );

    return res.data;
  },

  async deleteAccountList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.deleteAccount)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.deleteAccount)
    );

    return res.data;
  },

  async updateSelectAccountList(data) {
    const postData = Utils.createPostData(data);
    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.updateSelAcct)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.updateSelAcct)
    );

    return res.data;
  },

  async searchAvailAcctList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      showAccounts: true,
      alphaOrderAcct: searchPropParams.alphaOrderAcct,
      accountpricingtype: searchPropParams.accountpricingtype,
      accountsegment: searchPropParams.accountsegment,
      r_1: searchPropParams.r_1,
      strCurrPageAcct: JSON.stringify({
        page: pageNumber,
        maxpagelen: searchPropParams.strCurrPageAcct.maxpagelen,
      }),
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.searchAvailAcctList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.searchAvailAcctList)
    );

    return res.data;
  },

  async searchSelectAcctList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      showAccounts: true,
      alphaOrderAcct: searchPropParams.alphaOrderAcct,
      accountpricingtype: searchPropParams.accountpricingtype,
      accountsegment: searchPropParams.accountsegment,
      r_1: searchPropParams.r_1,
      strCurrPageAcctSel: JSON.stringify({
        page: pageNumber,
        maxpagelen: searchPropParams.strCurrPageAcct.maxpagelen,
      }),
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.updateSelAcct)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.updateSelAcct)
    );

    return res.data;
  },

  async getSalesUserEditCopy(params) {
    let res = await axios.get(
      Utils.getAPIURI(Settings.api.editAccountUser.userEditCopy),
      {
        headers: { Pragma: "no-cache" },
        params: {
          userid: params.userid,
          role: params.role,
          filterString: "",
          searchBy: "",
          orderby: Settings.defaultSortBy,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.userEditCopy)
    );

    return res.data;
  },

  async getSalesCopySearchData(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.searchUserEditCopy)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.searchUserEditCopy)
    );

    return res.data;
  },

  async updateSalesCopySearchData(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editAccountUser.searchUserEditUpdate)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editAccountUser.searchUserEditUpdate)
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

export default APIEdit;
