import axios from "../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../static/Settings";
import { SyncUsersState } from "../context/SynchronizeUsersContext";

const SynchronizeUsersApi = {
  async synchronizeUsers(payload: SyncUsersState): Promise<SyncUsersState> {
    const headers = {
      Pragma: "no-cache",
    };

    const previousPercentCompleted = payload.percentCompleted;
    const firstLetter = payload.firstLetter;
    const secondLetter = payload.secondLetter;
    const res = await axios.get(Utils.getAPIURI(Settings.api.syncUsers), {
      headers: headers,
      params: { previousPercentCompleted, firstLetter, secondLetter },
    });
    SynchronizeUsersApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.syncUsers)
    );

    return res.data;
  },

  handleErrorResponse: (response: any, endpoint: string): void => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
};

export default SynchronizeUsersApi;
