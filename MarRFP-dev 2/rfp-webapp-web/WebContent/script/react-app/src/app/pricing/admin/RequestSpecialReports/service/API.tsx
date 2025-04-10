import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getReportType() {
    
    let res = await axios.get(Utils.getAPIURI(Settings.api.getReports), {
      headers: {
        Pragma: "no-cache",
      },
    });
    
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getReports));
    
    return res.data; 
  },

  async getFilteredData(data) {
    
    const params = {
      strFilterValues: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getData),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getData));
    
    return res.data; 
   
  },

  async runReport (data) {
    
    const params = {
      strFilterValues: JSON.stringify(data),
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.runReport),
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.runReport));
    
    return res.data; 
   
  },

   async getCognosServerUrl () {
    
    let res = await axios.get(Utils.getAPIURI(Settings.api.getCognosUrl), {
      headers: {
        Pragma: "no-cache",
      },
    });
    
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getCognosUrl));
    
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
  }
};

export default API;
