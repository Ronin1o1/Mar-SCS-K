import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../common/utils/Utils";

import Settings from "../static/Settings";

const API = {
  async getHotelProductSearchDetails(queryParam) {
    const getHotelProductSearchListURL =
      Settings.api.getHotelProductSearchList + queryParam;
    const res = await axios.get(
      `${Utils.getAPIURI(getHotelProductSearchListURL)}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelProductSearchList)
    );
    return res.data;
  },

  getRateProductView: async (queryParam) => {
    const getRateProductHotelViewDataURL =
      Settings.api.getRateProductHotelView + queryParam;
    const res = await axios.get(
      Utils.getAPIURI(getRateProductHotelViewDataURL)
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateProductHotelView)
    );

    return res.data;
  },

  async getSearchResult(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getSearchList),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getSearchList));

    return res.data;
  },

  async getQuickViewProduct(queryParam) {
    const getQuickViewProductListURL =
      Settings.api.getQuickViewProductList + queryParam;
    const res = await axios.get(
      `${Utils.getAPIURI(getQuickViewProductListURL)}`,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getQuickViewProductList)
    );
    return res.data;
  },

  async getRateDescription(requestObj) {
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getRateDescription),
      requestObj,
      {
        headers: {
          Pragma: "no-cache",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getRateDescription)
    );

    return res.data;
  },

  async updateRateProductData(serviceDetails, strRateProductDefinition) {
    const params = {
      formChg: serviceDetails.formChg,
      productCode: serviceDetails.productCode,
      productName: serviceDetails.productName,
      managed: "",
      level: serviceDetails.level,
      marshaCode: serviceDetails.marshaCode,
      brandCode: serviceDetails.brandCode,
      strRateProductDefinition: strRateProductDefinition,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      `${Utils.getAPIURI(Settings.api.updateproductDefinitionList)}`,
      postData,
      {
        headers: {
          "Content-Type": Settings.api.url_encoded,
        },
      }
    );

    API.handleErrorResponse(res, Settings.api.updateproductDefinitionList);
    return res.data;
  },

  async productDefinition(queryParam) {
    const getproductDefinitionListURL =
      Settings.api.getproductDefinitionList + queryParam;
    const res = await axios.get(
      `${Utils.getAPIURI(getproductDefinitionListURL)}`,
      {
        headers: { Pragma: "no-cache" },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getQuickViewProductList)
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
