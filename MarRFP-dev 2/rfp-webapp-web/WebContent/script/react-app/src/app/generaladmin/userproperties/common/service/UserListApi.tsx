import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const UserListApi = {
  async getUserList(postData, pageNumber) {
    const formattedPostData = createPostData(postData, pageNumber);
    const headers = {
      Pragma: "no-cache",
    };

    const res = await axios.post(
      Utils.getAPIURI(getApiUrlByUserRole(postData.userRole)),
      formattedPostData,
      {
        headers: headers,
      }
    );
    UserListApi.handleErrorResponse(
      res,
      Utils.getAPIURI(getApiUrlByUserRole(postData.userRole))
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
const getApiUrlByUserRole = (role: string):string => {
  let apiUrl = "";
  switch(role){
    case Settings.userRoles.roomDescription:
      apiUrl = Settings.api.getRoomDescAdminUserAccessList;
      break;
      case Settings.userRoles.korAdmin:
        apiUrl = Settings.api.getKorAdminUserAccessList;
        break;
        case Settings.userRoles.dbMarsha:
          apiUrl = Settings.api.getDbMarshaUserAccessList;
          break;
          case Settings.userRoles.readOnly:
            apiUrl = Settings.api.getReadOnlyUserAccessList;
            break;
            case Settings.userRoles.sappAdmin:
              apiUrl = Settings.api.getSappAdminUserAccessList;
              break;
  }
  return apiUrl;
}
function createPostData(data, pageNumber) {
  const params = {
    searchBy: data.searchBy,
    filterString: data.filterString,
    orderby: data.orderby,
    role: data.userRole,
    strPage: JSON.stringify({
      page: pageNumber,
      maxpagelen: data.strPage.maxpagelen,
    }),
  };
  const postData = Utils.createPostData(params);
  return postData;
}

export default UserListApi;
