import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

const API = {
  async getEdieReport() {
    
    let res = await axios.get(Utils.getAPIURI(Settings.api.getEdieReports), {
      headers: {
        Pragma: "no-cache",
      },
    });
    
    
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.getEdieReports));
    
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
