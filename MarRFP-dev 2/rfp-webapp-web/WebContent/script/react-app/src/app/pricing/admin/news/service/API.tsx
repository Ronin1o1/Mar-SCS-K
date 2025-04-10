import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;


const API = {
  async getNewsList() {
    
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.getNews}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, Settings.api.getNews);
    
    return res.data;
  },
  async getEditNews(infoId: number) {
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.editNews}`, {
      headers: { Pragma: "no-cache" },
      params: { infoid: infoId },
    });
    API.handleErrorResponse(res, Settings.api.editNews);
    
    return res.data;
  },
  async updateNews(data: any) {
    // For API call
   
      const params = {
        info: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(`${API.getAPIURI()}${Settings.api.updateNews}`, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, Settings.api.updateNews);
      
      return res.data;
  
  },
 
  async deleteNews(infoId: number) {
    let res = await axios.post(
      `${API.getAPIURI()}${Settings.api.deleteNews}?infoid=${infoId}`
    );

    API.handleErrorResponse(res, Settings.api.deleteNews);
    
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
  getAPIURI:() => {
    if(!apiURL) {
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
