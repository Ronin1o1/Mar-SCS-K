import axios from "../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../common/utils/Utils";
import Settings from "../static/Settings";

//const isDevMode = process.env.NODE_ENV == "development";

const API = {
  async getEdieHotelProfiles() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEdieHotelProfiles),
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEdieHotelProfiles)
    );
    return res.data;
  },

  async deleteProfile(profile_id: any) {
    const params = {
      profile_id: profile_id,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.deleteProfile),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );
    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.deleteProfile));
    return res.data;
  },

  async addProfile(profile_name: string) {
    const params = {
      profile_name: profile_name,
      formChg: "N",
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.addProfile),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(res, Utils.getAPIURI(Settings.api.addProfile));
    return res.data;
  },

  //updateProfileName
  async updateProfileName(params: any) {
    const postData = Utils.createPostData(params);
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateProfileName),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateProfileName)
    );
    return res.data;
  },

  async getEdieHotelProfileFindFilter() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEdieHotelProfileFindFilter),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEdieHotelProfileFindFilter)
    );
    return res.data;
  },

  async showFilterOptions() {
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.showFilterOptions),
      {
        headers: {
          Pragma: Settings.noCache,
        },
      }
    );
    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.showFilterOptions)
    );
    return res.data;
  },

  async getHotelProfileAvail(data, hotelProfileId) {
    const newData = {
      year: data.strFilterValues.year,
      hotelProfile: hotelProfileId, //3141,
      accountFilter: data.strFilterValues.accountFilter,
      stringBrandList: data.strFilterValues.stringBrandList,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      areaFilter: data.strFilterValues.areaFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      orderBy: data.strFilterValues.orderBy,
      filterString: data.strFilterValues.filterString,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterMatchField: data.strFilterValues.filterMatchField
        ? data.strFilterValues.filterMatchField
        : 1,
    };

    const params = {
      formChg: data.formChg,
      numItems: data.numItems,
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getHotelProfileAvail),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelProfileAvail)
    );

    return res.data;
  },

  async getHotelProfileSelect(data, hotelProfileId) {
    const newData = {
      year: data.strFilterValues.year,
      hotelProfile: hotelProfileId, //3141,
      accountFilter: data.strFilterValues.accountFilter,
      stringBrandList: data.strFilterValues.stringBrandList,
      dateRangeFilter: data.strFilterValues.dateRangeFilter,
      areaFilter: data.strFilterValues.areaFilter,
      scheduleReport: data.strFilterValues.scheduleReport,
      orderBy: data.strFilterValues.orderBy,
      filterString: data.strFilterValues.filterString,
      filterMatchType: data.strFilterValues.filterMatchType,
      filterMatchField: data.strFilterValues.filterMatchField
        ? data.strFilterValues.filterMatchField
        : 1,
    };

    const params = {
      strFilterValues: JSON.stringify(newData),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.getHotelProfileSelect),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
        params: {
          updateOtherList: false,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getHotelProfileSelect)
    );

    return res.data;
  },

  async setEdieHotelProfileAvailUpdate(param, availGridArray, hotelProfileId) {
    const formChg = param.formChg;
    const numItems = param.numItems;
    const data = {
      year: param.strFilterValues.year,
      hotelProfile: hotelProfileId, //3141,
      accountFilter: param.strFilterValues.accountFilter,
      stringBrandList: param.strFilterValues.stringBrandList,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      areaFilter: param.strFilterValues.areaFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      orderBy: param.strFilterValues.orderBy,
      filterString: param.strFilterValues.filterString,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterMatchField: param.strFilterValues.filterMatchField,
    };

    const params = {
      strOrgSelect: JSON.stringify(availGridArray),
      profileid: hotelProfileId,
      formChg: formChg,
      numItems: numItems,
      strFilterValues: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setEdieHotelProfileAvailUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setEdieHotelProfileAvailUpdate)
    );

    return res.data;
  },

  async setEdieHotelProfileselectUpdate(
    param,
    selectGridArray,
    hotelProfileId
  ) {
    const formChg = param.formChg;
    const numItems = param.numItems;
    const data = {
      year: param.strFilterValues.year,
      hotelProfile: hotelProfileId, //3141,
      accountFilter: param.strFilterValues.accountFilter,
      stringBrandList: param.strFilterValues.stringBrandList,
      dateRangeFilter: param.strFilterValues.dateRangeFilter,
      areaFilter: param.strFilterValues.areaFilter,
      scheduleReport: param.strFilterValues.scheduleReport,
      orderBy: param.strFilterValues.orderBy,
      filterString: param.strFilterValues.filterString,
      filterMatchType: param.strFilterValues.filterMatchType,
      filterMatchField: param.strFilterValues.filterMatchField,
    };

    const params = {
      strOrgSelect: JSON.stringify(selectGridArray),
      profileid: hotelProfileId,
      formChg: formChg,
      numItems: numItems,
      strFilterValues: JSON.stringify(data),
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.setEdieHotelProfileselectUpdate),
      postData,
      {
        headers: {
          "Content-Type": Settings.urlencode,
        },
      }
    );

    API.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.setEdieHotelProfileselectUpdate)
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
