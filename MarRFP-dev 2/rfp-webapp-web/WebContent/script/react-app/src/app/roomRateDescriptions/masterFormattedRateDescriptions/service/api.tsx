import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../common/utils/Utils";
import Settings from "../settings/settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;
let queryString;

const API = {
  async getProductDetails(productData) {
    const apiEndpont = Settings.api.getMasterProductName;
    if (productData.screenid) {
      queryString = `?productCode=${productData.productCode}&level=${productData.level}&screenid=${productData.screenid}`;
    } else {
      queryString = `?productCode=${productData.productCode}&level=${productData.level}`;
    }
    const res = await axios.get(
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    API.handleErrorResponse(
      res,
      `${API.getAPIURI()}${apiEndpont}${queryString}`
    );
    return res.data;
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

  async saveAndUpdateProductName(productData) {
    let payload;
    if (
      productData.productCode != null ||
      productData.productCode != undefined ||
      productData.productCode != ""
    ) {
      payload = {
        formChg: productData.formChg,
        productName: productData.productName,
        productCode: productData.productCode,
        managed: productData.managed,
        level: productData.level,
        entryLevel: productData.level,
      };
    } else {
      payload = {
        formChg: productData.formChg,
        productName: productData.productName,
        managed: productData.managed,
        level: productData.level,
      };
    }
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.saveAndUpdateProductName),
      Utils.createPostData(payload),
      {
        headers: headers,
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.saveAndUpdateProductName)
    );
    return res.data;
  },

  async saveAndUpdateFields(data, payload) {
    const params = {
      formChg: data.formChg,
      productName: data.productName,
      productCode: data.productCode,
      managed: data.managed,
      level: data.entryLevel,
      entryLevel: data.entryLevel,
      marshaCode: "",
      brandCode: "",
      strRateProductDefinition: payload,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.saveAndUpdateProductName)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.saveAndUpdateProductName)
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
export default API;
