/* eslint-disable prefer-const */
import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const APIEdit = {
  async populatePropertyList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.populateProperty)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.populateProperty)
    );

    return res.data;
  },

  async updatePropertyList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateProperty)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateProperty)
    );

    return res.data;
  },

  async deletePropertyList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.deleteProperty)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.deleteProperty)
    );

    return res.data;
  },

  async searchAvailPropList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      alphaOrderProp: searchPropParams.alphaOrderProp,
      filterByMorF: searchPropParams.filterByMorF,
      strCurrPageProp: JSON.stringify({
        page: pageNumber,
        maxpagelen: searchPropParams.strCurrPageProp.maxpagelen,
      }),
      p_1: searchPropParams.searchBy,
      radioSel: searchPropParams.optSel,
      totPropSelPageLen: searchPropParams.totPropSelPageLen,
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)
    );

    return res.data;
  },

  async searchSelectPropList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      alphaOrderProp: searchPropParams.alphaOrderProp,
      filterByMorF: searchPropParams.filterByMorF,
      strCurrPagePropSel: JSON.stringify({
        page: pageNumber,
        maxpagelen: searchPropParams.strCurrPageProp.maxpagelen,
      }),
      p_1: searchPropParams.searchBy,
      radioSel: searchPropParams.optSel,
      totPropSelPageLen: searchPropParams.totPropSelPageLen,
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)
    );

    return res.data;
  },

  async searchPropList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      alphaOrderProp: searchPropParams.alphaOrderProp,
      filterByMorF: searchPropParams.filterByMorF,
      strCurrPageProp: JSON.stringify({
        page: pageNumber,
        maxpagelen: searchPropParams.strCurrPageProp.maxpagelen,
      }),
      p_1: searchPropParams.p_1,
      radioSel: searchPropParams.optSel,
      optSel: searchPropParams.optSel,
      totPropSelPageLen: searchPropParams.totPropSelPageLen,
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)
    );

    return res.data;
  },

  async resetRegionList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.resetRegions)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.resetRegions)
    );

    return res.data;
  },

  async resetBrandList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.resetBrands)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.resetBrands)
    );

    return res.data;
  },

  async resetFranchiseList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.resetFranchises)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.resetFranchises)
    );

    return res.data;
  },

  async updateBrandList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateBrands)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateBrands)
    );

    return res.data;
  },

  async updateRegionList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateRegions)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateRegions)
    );

    return res.data;
  },

  async updateFranchiseList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateFranchise)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateFranchise)
    );

    return res.data;
  },

  async updateAll(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateAllProperties)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateAllProperties)
    );

    return res.data;
  },

  async updateSelectPropList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)
    );

    return res.data;
  },

  async updateAvailPropList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.searchAvailPropList)
    );

    return res.data;
  },

  async getHotelUserEditCopy(params) {
    let res = await axios.get(
      Utils.getAPIURI(Settings.api.editLimitedUser.userEditCopy),
      {
        headers: { Pragma: "no-cache" },
        params: {
          userid: params.userid,
          role: params.role,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.userEditCopy)
    );

    return res.data;
  },

  async getCopySearchData(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.searchUserEditCopy)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.searchUserEditCopy)
    );

    return res.data;
  },

  async updateCopySearchData(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.searchUserEditUpdate)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.searchUserEditUpdate)
    );

    return res.data;
  },

  async searchSelectRegBrandFranList(userDetail, searchPropParams, pageNumber) {
    const params = {
      userid: userDetail.userid,
      role: userDetail.role,
      ...(searchPropParams.optSel == "B" && {
        strSelectedAffiliationList: JSON.stringify(
          searchPropParams.selectedParams
        ),
      }),
      ...(searchPropParams.optSel == "R" && {
        strSelectedRegionList: JSON.stringify(searchPropParams.selectedParams),
      }),
      ...(searchPropParams.optSel == "F" && {
        strSelectedFranchiseList: JSON.stringify(
          searchPropParams.selectedParams
        ),
      }),
      regFound: searchPropParams.regFound,
      braFound: searchPropParams.braFound,
      fraFound: searchPropParams.fraFound,
      aHotels: searchPropParams.allHotels,
      alphaOrderProp: searchPropParams.alphaOrderProp,
      filterByMorF: searchPropParams.filterByMorF,
      strCurrPagePropSel: JSON.stringify({
        page: pageNumber,
      }),
      p_1: searchPropParams.searchBy,
      radioSel: searchPropParams.optSel,
      optSel: searchPropParams.optSel,
      totPropSelPageLen: searchPropParams.totPropSelPageLen,
    };
    if (searchPropParams?.enhancedReporting) {
      params["enhancedReporting"] = searchPropParams?.enhancedReporting;
    }
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.updateSelPropList)
    );

    return res.data;
  },

  async populatePropList(data) {
    const postData = Utils.createPostData(data);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.editLimitedUser.populatePropertyList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APIEdit.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.editLimitedUser.populatePropertyList)
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
