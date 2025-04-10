import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getColumnDesc() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getColumn), {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getColumn));

    return res.data;
  },
  async OnSearch(colfind: any) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getColumn), {
      headers: { Pragma: "no-cache" },
      params: {
        colfind: colfind,
      },
    });

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getColumn));

    return res.data;
  },
  async onUpdateEDIEData(
    c_1: any,
    seqfind: any,
    colfind: any,
    formChg: any,
    prevSearch,
    data: any
  ) {
    const params = {
      c_1: c_1,
      seqfind: seqfind,
      colfind: colfind,
      formChg: formChg,
      prevSearch: prevSearch,
      strEdieColumnsList: JSON.stringify(Object.values(data)),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateColumn),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          nextUrl: Settings.edieColumnDesc.nextURL,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.updateColumn));

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
