import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";


const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;


const API = {
  async getAccount() {
       let res = await axios.get(`${API.getAPIURI()}${Settings.api.copyAccountInfo}`, {
      headers: { Pragma: "no-cache" }
    })
      ;
  
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.copyAccountInfo}`);
  
    return res.data;
  },
  async accountCopyBtn(requestObj: any) {
    if (true) {
      const params = {
        accountSegment : requestObj.accountSegment,
        fromperiod: requestObj.fromPeriod,
        toperiod: requestObj.toPeriod
      };
      const postData = API.createPostData(params);      

 ;     const res = await axios.post(`${API.getAPIURI()}${Settings.api.copyAccountInfoCopyBtn}`, postData, {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
      });
    
      API.handleErrorResponse(res,`${API.getAPIURI()}${Settings.api.copyAccountInfoCopyBtn}`);
     
      return res.data;
      } 
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
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
  getAPIURI:() => {
    if(!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  }
};

export default API;
