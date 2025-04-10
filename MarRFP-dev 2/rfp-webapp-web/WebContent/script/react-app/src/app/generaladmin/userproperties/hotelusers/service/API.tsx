/* eslint-disable prefer-const */
import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getHotelUsersData(postData, pageNumber) {
    let formattedPostData = createPostData(postData, pageNumber);
    let res = await axios.post(
      Utils.getAPIURI(Settings.api.getHotelUsersUrl),
      formattedPostData,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelUsersUrl)
    );

    return res.data;
  },

  async postHotelUsersData(data) {
    const params = {
      strInternalnotesMap: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);

    let res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateHotelUsersUrl)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateHotelUsersUrl)
    );

    return res.data;
  },

  async getUserListDialog(reqParam) {
    let res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getUserListDialog)}?userid=${
        reqParam.userid
      }&userRole=${reqParam.userRole}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getUserListDialog)
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

function createPostData(data, pageNumber) {
  const params = {
    searchBy: data.searchBy,
    filterString: data.filterString,
    orderby: data.orderby,
    userRole: data.userRole,
    strPage: JSON.stringify({
      page: pageNumber,
      maxpagelen: data.strPage.maxpagelen,
    }),
  };
  const postData = Utils.createPostData(params);
  return postData;
}

export default API;
