import axios from "axios";
import Settings from "../static/Settings";
import Utils from "../utils/Utils";
import { USERID } from "./../../../../config/user/UserId";
const API = {
  //Service call for getting the user role.
  async getUser(): Promise<IUser> {
   
    const headers = {
      Pragma: "no-cache",
    };

    if (process.env.NODE_ENV.endsWith("development")) {
      headers["iv-user"] = USERID;
      headers["rfprole"] = USERID;
    }
    const apiURL = Utils.getAPIURI(Settings.getUserDetails);
    const res = await axios.get(apiURL, {
      headers,
    });
    return res.data.user;
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

export interface IUser {
  eid: string;
  fullName: string;
  role: string;
  enhanced_Reporting: string;
  agreedtoTerms: boolean;
  updateContactInfo: boolean;
  epicUrl: string;
  iv_user: string;
  marrformsUrl: string;
  email: string;
  phone: string;
  showPricing: string;
  infoHubUrl: string;
  menus: any;
  travelspendingList: Array<any>;
  isRDAdmin: boolean;
  isPASorAnySales: boolean;
  hasLimitedHotels: boolean;
  isWholesalerAdmin: boolean;
  hasLimitedAccounts: boolean;
  isSAPPAdmin: boolean;
  isHotelUser: boolean;
  isSalesUser: boolean;
  isPASAdmin: boolean;
  shortRole: string;
  isReadOnly: boolean;
  isLimitedSalesUser: boolean;
  isAnySalesUser: boolean;
  isAdminRole: boolean;
  isNotReadOnly: boolean;
  isPricingUser: boolean;
  isDBMarsha: boolean;
  isKORAdmin: boolean;
}
