import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";



const API = {
  async getUserDetails() {
   
    const res = await axios.get(Utils.getAPIURI(Settings.api.getUserDetails), {
      headers: {
        Pragma: Settings.noCache,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getUserDetails));
    return res.data;
  },
  async getAccountList() {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAccountList), {
      headers: {
        Pragma: Settings.noCache,
      },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getAccountList));
    return res.data;
  },

  async searchAccountList(data: any) {
    const params = {
      searchperiod: data.searchperiod,
      r_1: data.r_1,
      orderby: data.orderby,
      accountpricingtype: data.accountpricingtype,
      filterString: data.filterString,
      accountsegment: data.accountsegment,
      strPage: JSON.stringify(data.strPage),
      totalPages: data.totalPages,
      period: data.period,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getFilteredAccountList),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getFilteredAccountList)
    );
    return res.data;
  },

  async getAccountFromAndTo(accountrecid: any) {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getAccountFromandTo),
      {
        headers: {
          Pragma: Settings.noCache,
        },
        params: { accountrecid: accountrecid },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getAccountFromandTo)
    );
    return res.data;
  },
  async getEmailData(accountrecid: any) {
    
    const res = await axios.get(Utils.getAPIURI(Settings.api.getEmailData), {
      headers: {
        Pragma: Settings.noCache,
      },
      params: { accountrecid: accountrecid },
    });
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEmailData));
    return res.data;
  },
  async onRecapEmailLaunch(
    accountrecid: any,
    additional_text: any,
    period: any
  ) {


    const res = await axios.get(
      Utils.getAPIURI(Settings.api.onRecapEmailLaunch),
      {
        headers: {
          Pragma: Settings.noCache,
        },
        params: {
          accountrecid: accountrecid,
          additional_Text:additional_text,
          period: period,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.onRecapEmailLaunch)
    );

    return res.data;
  },
  async updateEmailData(data: any,period:any) {
    var endpoint = Settings.api.updateData;
        
       
        let res = await axios.get(`${Utils.getAPIURI(endpoint)}`,{
          headers: {
            Pragma: Settings.noCache,
          },
          params:{
            accountrecid:data.accountrecid,
            additional_Text:data.additional_text,
            period:period}
         
        });
        API.handleErrorResponse(res, `${Utils.getAPIURI(endpoint)}`);
        
       
     

   
    API.handleErrorResponse(res, `${Utils.getAPIURI(Settings.api.updateData)}`);

    return res.data;
  },

  async getMCADData(accountrecid: any) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getMcadList), {
      headers: {
        Pragma: Settings.noCache,
      },
      params: { accountrecid: accountrecid },
    });
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getMcadList));
    return res.data;
  },
  async getCopyAccountInfo(data: any) {
    const body = {
      searchperiod: data.searchperiod,
      r_1: data.r_1,
      orderby: data.orderby,
      accountpricingtype: data.accountpricingtype,
      filterString: data.filterString,
      accountsegment: data.accountsegment,
      strPage: data.strPage.page,
      totalPages: data.totalPages,
      period: data.period,
    };

    const bodyRequest = Utils.createPostData(body);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getCopyAccountInfo),
      bodyRequest,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getCopyAccountInfo)
    );
    return res.data;
  },

  async updateCopyAccountInfo(data : any) {
    const body = {
      period: data.period,
      copyFromExistingAccount: data.copyFromExistingAccount,
      copyFromPeriod: data.copyFromPeriod,
      copyFromAccountrecid: data.copyFromAccountRecid,
      copySAPP: data.copySAPP
    }

    const bodyRequest = Utils.createPostData(body);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateCopyAccountInfo),
      bodyRequest,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateCopyAccountInfo)
    );
    return res.data;
  },

  async getCopyAccountInfoByPeriod(period: any, copyFromPeriod: any) {
    const res = await axios.post(
      `${Utils.getAPIURI(
        Settings.api.getCopyAccountInfo
      )}?period=${period}&copyFromPeriod=${copyFromPeriod}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    API.handleErrorResponse(
      res,
      `${Utils.getAPIURI(Settings.api.getCopyAccountInfo)}`
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
