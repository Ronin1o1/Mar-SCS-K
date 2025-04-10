import axios from "../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";

let sourceCancelToken;
const AccBTProfileListApi = {
  async getProfileData(
    accountrecid: string,
    year: string,
    accountName: string
  ) {
    try {
      //Check if there are any previous pending requests
      // if (typeof sourceCancelToken != typeof undefined) {
      //   sourceCancelToken.cancel("Operation canceled due to new request.");
      // }
      //Save the cancel token for the current request
      //sourceCancelToken = axios.CancelToken.source();
      const res = await axios.get(Utils.getAPIURI(Settings.api.getBtProfile), {
        // cancelToken: sourceCancelToken.token,
        headers: {
          Pragma: "no-cache",
        },
        params: { accountrecid, year, accountName },
      });
      AccBTProfileListApi.handleErrorResponse(
        res,
        Utils.getAPIURI(Settings.api.getBtProfile)
      );
      return res.data;
    } catch (err) {
      //if (axios.isCancel(err)) return { cancelPrevQuery: true };
      return [err];
    }
  },

  async submitData(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateBtProfile),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    AccBTProfileListApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateBtProfile)
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

export default AccBTProfileListApi;
