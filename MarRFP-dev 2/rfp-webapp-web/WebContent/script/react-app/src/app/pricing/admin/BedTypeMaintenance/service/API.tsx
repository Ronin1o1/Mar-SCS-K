import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {

  async getBedTypeMntcList() {
    
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.getBedTypeList}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getBedTypeList}`);
    
    return res.data;
  },


  async updateBedType(data: any) {
    // For API call
      
      const params = {
        strBedtype: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(`${API.getAPIURI()}${Settings.api.updateBedType}`, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, Settings.api.updateBedType);
      
      return res.data;
  
    
  },


  async deleteBedTypeById(bedtypeid: number) {

    let res = await axios.post(
      `${API.getAPIURI()}${Settings.api.deleteBedType}?bedtypeid=${bedtypeid}`
    );

    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.deleteBedType}`);
    
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
  getAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  }
};

export default API;
