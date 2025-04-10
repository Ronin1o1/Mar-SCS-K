import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../settings/settings";

const ModifyRateAPI = {
  async getMasterProduct() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getMasterProductSearch),
      {
        headers: { Pragma: "no-cache" },
      }
    );
    ModifyRateAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getMasterProductSearch)
    );
    return res.data;
  },

  async searchProduct(data) {
    const postData = Utils.createPostData(data);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.getSearchProduct)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );

    ModifyRateAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getSearchProduct)
    );

    return res.data;
  },

  async getQuickViewDialog(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getQuickView)}?productCode=${
        reqParam.productCode
      }&level=${reqParam.level}&brandCode=${reqParam.brandCode}&marshaCode=${
        reqParam.marshaCode
      }`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    ModifyRateAPI.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getQuickView)
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

export default ModifyRateAPI;
