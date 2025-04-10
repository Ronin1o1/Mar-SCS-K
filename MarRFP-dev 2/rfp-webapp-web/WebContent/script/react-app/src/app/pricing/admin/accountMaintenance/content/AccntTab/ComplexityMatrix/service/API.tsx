import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
//@ts-ignore
import Settings from "../static/Settings";
//@ts-ignore
import Utils from "../../../../../../../common/utils/Utils";
const FileSaver = require("file-saver");

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getComplexityMatrixdata(accountrecid, period) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getContentOnlyTab4)}`,
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          accountrecid: accountrecid,
          period: period,
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getContentOnlyTab4)}`
    );
    return res.data;
  },
  async updateComplexityMatrixData(data: any, accountrecid: any) {
    const { strAccountrecid, ...dataToSend } = data;
    const params = {
      strAccountDetailCompMatrix: JSON.stringify(dataToSend),
      accountrecid: accountrecid,
      maxrfp: data.totrfpfilesent,
      maxreneg: data.totrenegsubmit,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateTab4)}`,
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateTab4);
    return res.data;
  },

  async getExcelLink() {
    axios({
      url: `${Utils.getAPIURI(Settings.api.getExcelLink)}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute(
      //   "download",
      //   `${Settings.complexityMatrix.filename}.xlsx`
      // );
      // document.body.appendChild(link);
      // link.click();
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.complexityMatrix.filename}.xlsx`);
    });
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
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },
};
export default API;
