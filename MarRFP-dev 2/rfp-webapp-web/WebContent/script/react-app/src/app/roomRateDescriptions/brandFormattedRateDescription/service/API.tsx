import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getBrands() {
    const res = await axios.get(`${Utils.getAPIURI(Settings.api.getBrands)}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getBrands));
    return res.data;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getBrandProduct(brandCode: string, brandName: string) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getBrandProductSearch),
      {
        headers: { Pragma: "no-cache" },
        params: { brandCode, brandName },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getBrandProductSearch)
    );
    return res.data;
  },

  async searchProduct(data) {
    const postData = Utils.createPostData(data);

    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.searchProduct)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.searchProduct));

    return res.data;
  },

  async getQuickViewDialog(reqParam) {
    const res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getProductQuickView)}?productCode=${
        reqParam.productCode
      }&level=${reqParam.level}&brandCode=${reqParam.brandCode}
      `,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getProductQuickView)
    );
    return res.data;
  },

  async productDefinition(queryParam) {
    const getproductDefinitionListURL = Settings.api.defineProduct + queryParam;
    const res = await axios.get(
      `${Utils.getAPIURI(getproductDefinitionListURL)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.defineProduct));
    return res.data;
  },

  async updateRateProductData(serviceDetails, strRateProductDefinition) {
    const params = {
      formChg: serviceDetails.formChg,
      productCode: serviceDetails.productCode,
      productName: serviceDetails.productName,
      managed: "",
      level: serviceDetails.level,
      brandCode: serviceDetails.brandCode,
      entryLevel: serviceDetails.entryLevel,
      strRateProductDefinition: strRateProductDefinition,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateProduct)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateProduct);
    return res.data;
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
