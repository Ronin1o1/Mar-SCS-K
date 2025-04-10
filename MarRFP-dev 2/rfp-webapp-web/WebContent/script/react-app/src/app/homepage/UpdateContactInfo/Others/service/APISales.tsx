import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../../static/Settings";

const APISales = {
  async getSalesUpdateInfo(alreadyAssigned) {
    const params = {
      alreadyAssigned: alreadyAssigned,
      orderBy: 0,
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.sales.salesupdatedetails)}`,
      postData,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": Settings.api.urlencode,
        },
      }
    );

    APISales.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.sales.salesupdatedetails)
    );

    return res.data;
  },

  async updateSalesAccount(data: any) {
    const params = {
      strSalesMudroom: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.sales.salessavedetails)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.urlencode,
        },
      }
    );
    APISales.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.sales.salessavedetails)
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

export default APISales;
