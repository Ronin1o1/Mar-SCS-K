import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

let sourceCancelToken;
const AccountPerspectiveAPI = {
  async getData(accountrecid: string, year: string, accountName: string) {
    try {
      const res = await axios.get(
        Utils.getAPIURI(Settings.api.getaccPerspectiveList),
        {
          headers: {
            Pragma: "no-cache",
          },
          params: { accountrecid, year, accountName },
        }
      );
      AccountPerspectiveAPI.handleErrorResponse(
        res,
        Utils.getAPIURI(Settings.api.getaccPerspectiveList)
      );
      return res.data;
    } catch (err) {
      return [err];
    }
  },

  async submitData(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateaccPerspectiveList),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    AccountPerspectiveAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateaccPerspectiveList)
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

export default AccountPerspectiveAPI;
