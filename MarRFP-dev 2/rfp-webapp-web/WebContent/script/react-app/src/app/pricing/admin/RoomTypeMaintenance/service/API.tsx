import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";

const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT; 

const API = {
  async getRoomTyMntcList() {
    
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.getRoomTypeList}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getRoomTypeList}`);
    
    return res.data;
  },
  async getRoomType() {
    
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.getRoomType}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getRoomType}`);
    
    return res.data;
  },
  async getEditRoomtype() {
    
    let res = await axios.get(`${API.getAPIURI()}${Settings.api.getEditRoomtype}`, {
      headers: { Pragma: "no-cache" },
    });
    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.getEditRoomtype}`);
    
    return res.data;
  },
 
  async updateRoomTypeList(data: any) {
    // For API call
      
      const params = {
        strRoomtype: JSON.stringify(data)
      };
      const postData = API.createPostData(params);

      const res = await axios.post(`${API.getAPIURI()}${Settings.api.updateRoomtype}`, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      API.handleErrorResponse(res, Settings.api.updateRoomtype);
      
      return res.data;
  
    
  },

  //  async deleteRoomTyeById(roomtypeid: number) {
  //   let res = await axios.post(`${API.getAPIURI()}${Settings.api.deleteRoomtype}`, {
  //     headers: { Pragma: "no-cache" },
  //     params: { promo_roomtypeid: roomtypeid },
  //   });
  //   API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.deleteRoomtype}`);
  //   
  //   return res.data;
  // },

  
  async deleteRoomTyeById(roomtypeid: number) {

    let res = await axios.post(
      `${API.getAPIURI()}${Settings.api.deleteRoomtype}?promo_roomtypeid=${roomtypeid}`
    );

    API.handleErrorResponse(res, `${API.getAPIURI()}${Settings.api.deleteRoomtype}`);
    
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
