import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../../static/Settings";

const APILimitedSales = {
  async getLimitedSalesUpdateInfo() {
    const parms = {
      pcOrderby: 1,
      strPcpage: JSON.stringify({ page: 1, maxpagelen: 1200 }),
    };
    const postData = Utils.createPostData(parms);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.limitedsales.limitedsalesdetails),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    APILimitedSales.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.limitedsales.limitedsalesdetails)
    );

    return res.data;
  },

  async updateLimitedSalesMAEAccount(
    data: any,
    strPrimeContactData: any,
    strAcctData: any,
    strHotelData: any
  ) {
    const params = {
      strSalesMudroom: JSON.stringify(data),
      strPrimeContact: JSON.stringify(strPrimeContactData),
      strAcctList: JSON.stringify(strAcctData),
      strHotelList: JSON.stringify(strHotelData),
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
    APILimitedSales.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.sales.salessavedetails)
    );

    return res.data;
  },

  async getSalesUpdatePaginationInfo(data) {
    const postData = Utils.createPostData(data);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.sales.salesupdatedetails),
      postData,
      {
        headers: {
          Pragma: "no-cache",
          "Content-Type": Settings.api.urlencode,
        },
      }
    );

    APILimitedSales.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.sales.salesupdatedetails)
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

export default APILimitedSales;
