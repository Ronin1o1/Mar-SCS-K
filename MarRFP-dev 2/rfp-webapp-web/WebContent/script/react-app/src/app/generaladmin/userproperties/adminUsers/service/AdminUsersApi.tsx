import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const AdminUsersApi = {
  async getAdminUsersData(postData, pageNumber) {
    let formattedPostData = createPostData(postData, pageNumber);
    const headers = {
      Pragma: "no-cache",
    };
   
    let res = await axios.post(
      Utils.getAPIURI(Settings.api.getAdminUserAccessList),
      formattedPostData,
      {
        headers: headers,
      }
    );
    AdminUsersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAdminUserAccessList)
    );

    return res.data;
  },
  async postAdminUsersData(postData) {
    const headers = {
      Pragma: "no-cache",
    };
    
    let res = await axios.post(
      Utils.getAPIURI(Settings.api.updateAdminUser),
      Utils.createPostData({strInternalnotesMap: JSON.stringify(postData)}),
      {
        headers: headers,
      }
    );
    AdminUsersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateAdminUser)
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

export default AdminUsersApi;
