import React, { useEffect, useState } from "react";
import API from "../service/API";
import moment from "moment";
import axios from "axios";
import Utils from "../../../utils/Utils";

interface IFilterContext {
  getFilterViewListsData: (isUpdateMultiple: boolean) => void;
  getRegionsData: () => void;
  getCountriesData: () => void;
  getStatesData: (countryCode: string) => void;
  getCitiesData: (countryCode: string, stateCode: string) => void;
  resetData: () => void;
  resetStatesData: () => void;
  resetCitiesData: () => void;
  getEdieProfileList: () => void;
  state: {};
  setState: any;
  filterViewLists: any;
  getRegions: any;
  countries: any;
  states: any;
  cities: any;
  setRequestPayload: (data: any) => void;
  requestPayload: any;
  panelData: any;
  isMakingRequest: boolean;
  isDataChange;
  setIsDataChange: (isDataChange: boolean) => void;
  getAccountSegment: () => void;
  getAccountSubsets: () => void;
  accountSegments: any;
  accountSubsets: any;
  setAccountFilter: (data: any) => void;
  accountFilter;
  getAccountLists: (year: string) => void;
  accountLists: any;
  isMakingDetailsRequest: boolean;
  edieProfileList: any;
  reportList: any;
  getEdieHotelProfiles: () => void;
  getReportLists: () => void;
  hotelProfileList: any;
  highlightedOnly: any;
  emailMe: any;
  setHighlightedOnly: (data: any) => void;
  setemailMe: (data: any) => void;
  // selectedAccountDetails: any;
  getRateProgramList: () => void;
  rateProgramListData;
  rateProgramCheckboxes;
  accountStatus: any;
  setAccountStatus: (accountStatus: any) => void;
  setRateProgramCheckboxes: (data: any) => void;
  pgoosTypesFilter: any;
  setPgoosTypesFilter: (data: any) => void;
  setRateProgramListData: (data: any) => void;
  isShowSpecRtpgm: any;
  setIsShowSpecRtpgm: (data: any) => void;
  aerType: any;
  getAccAerType: (data: any) => void;
  reportDetails: any;
  isAccReq: any;
  getReportInfo: (data: string) => void;
  updateMutipleRequestPayload: any;
  setupdateMutipleRequestInitalPayload: (data: any) => void;
  updateMutipleRequestEvents: any;
  setupdateMutipleRequestInitialChangeEvents: (data: any) => void;
  onDueDateChange: (rest: any, data: any) => void;
  dueDateData: any;
  handleYearChange: () => void;
  setDueDateData: (data: any) => void;
  onIsShowAccountOnly: (data: any) => void;
  setSelectedAccount: (data: string) => void;
}
let axiosRequest;

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const FilterContext = React.createContext({} as IFilterContext);

export default FilterContext;
const todayDate = moment().format("MM/DD/YYYY");

export const initialPayload = {
  formChg: "N",
  numItems: 0,
  period: "",
  strFilterValues: {
    year: 0,
    stringBrandList: "",
    areaFilter: {
      areaOrRegion: "C",
      country: "",
      state: "",
      city: "",
    },
    futureOpeningFilter: {
      allFutureOpenings: "",
      strFromDate: "",
      strToDate: "",
    },
    dateRangeFilter: {
      strFromDate: todayDate,
      strToDate: todayDate,
    },
    // accountFilter: { accountrecid: "" },
    scheduleReport: "N",
    orderBy: 0,
    filterString: "",
    filterMatchType: 0,
    filterMatchField: 0,
  },
};

const updateMutipleRequestInitalPayload = {
  newAccountsOnly: false,
  dueDate: "",
  subset: "",
  orderby: "1",
  allHotels: "ALL",
  startWith: "",
  filterString: "",
  brandlist: {},
  dueDateText: "",
  accounttypedescription: "",
};
const updateMutipleRequestInitialChangeEvents = {
  yearChangeEvent: false,
  accountStatusChangeEvent: false,
  newAccountsChangeEvent: false,
  accountListChangeEvent: false,
  dueDateChangeEvent: false,
  segmentChange: false,
  accountChangeEvent: false,
  subsetChangedEvent: false,
  sortByChangeEvent: false,
  filterStringChangeEvent: false,
  hotelsChangeEvent: null,
  areaOrRegionChangeEvent: null,
  areFilterCountryChnageEvent: false,
  areFilterStateChnageEvent: false,
  areFilterCityChnageEvent: false,
  brandFilterChange: false,
};

/**
 * Context provider
 *
 * @param props
 */
export const FilterContextProvider = (props: any) => {
  const payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const finalYear =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.year
      : "";
  const session_segment_type =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.accountFilter?.accountType
      : "";
  const [state, setState] = useState({});
  const [filterViewLists, setFilterViewLists] = useState([]);
  const [getRegions, setGetRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [requestPayload, setRequestPayload] = useState(initialPayload);
  // @ts-ignore
  const [panelData, setPanelData] = useState([]);
  // @ts-ignore
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [isDataChange, setIsDataChange] = useState(true);
  const [accountSegments, setAccountSegments] = useState([]);
  const [accountSubsets, setAccountSubsets] = useState([]);
  const [accountFilter, setAccountFilter] = useState({
    searchaccounttype: "",
  });
  const [accountLists, setAccountLists] = useState([]);
  const [isMakingDetailsRequest, setIsMakingDetailsRequest] = useState(false);
  const [year, setYear] = useState(0);
  const [edieProfileList, setEdieProfileList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [hotelProfileList, sethotelProfileList] = useState([]);
  const [highlightedOnly, setHighlightedOnly] = useState("N");
  const [emailMe, setemailMe] = useState("N");
  const [rateProgramListData, setRateProgramListData] = useState([]);
  const [rateProgramCheckboxes, setRateProgramCheckboxes] = useState([]);
  const [pgoosTypesFilter, setPgoosTypesFilter] = useState("M");
  const [isShowSpecRtpgm, setIsShowSpecRtpgm] = useState(false);
  const [aerType, setAerType] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isAccReq, setIsAccReq] = useState(false);
  const [accountStatus, setAccountStatus] = useState("");
  const [updateMutipleRequestPayload, setupdateMutipleRequestInitalPayload] =
    useState(updateMutipleRequestInitalPayload);
  const [
    updateMutipleRequestEvents,
    setupdateMutipleRequestInitialChangeEvents,
  ] = useState(updateMutipleRequestInitialChangeEvents);

  const [dueDate, setDueData] = useState("");
  const [dueDateData, setDueDateData] = useState([]);
  const [isSerchNewOnly, setsSerchNewOnly] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(
    requestPayload.strFilterValues?.accountFilter
      ? requestPayload.strFilterValues?.accountFilter.accountstatus
      : "ALL"
  );

  useEffect(() => {
    if (props.componentName === "hotelPgoosMaintenance") {
      setRequestPayload(initialPayload);
    }

    if (props.componentName === "portfolioOrganization") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        managed: true,
        franchised: true,
        accountFilter: {
          accountType: "",
          accountrecid: "",
          subset: "",
          subset2: "",
        },
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (
      props.componentName === "hotelSolicitation" ||
      props.componentName === "PortfolioSelection"
    ) {
      const strBrandList = filterViewLists?.brandlist?.map(
        (item) => item.affiliationid
      );
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        managed: true,
        franchised: true,
        solicittype: "All Hotels",
        accountFilter: { accountType: "", accountrecid: "" },
        list: props.directSelectList,
        stringBrandList: strBrandList,
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "portfolioRebid") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: "",
          subset: "",
        },
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "cbcRequest") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        managed: true,
        franchised: true,
        accountFilter: { accountType: "", accountrecid: "" },
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "requestEdie") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: "",
          subset: "",
        },
        edieProfile: 0,
        exceldateformat: "YYYY-MM-DD",
        hotelProfile: 0,
        highlightedOnly: "N",
        emailMe: "N",
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "requestReport") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: "",
          subset: "",
        },
        highlightedOnly: "N",
        report: "",
        emailMe: "N",
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "PortfolioAcceptance") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: 0,
        },
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (
      props.componentName === "hotelGPPPGOOSMaintenance" ||
      props.componentName === "portfolioCBCStatus"
    ) {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: { accountType: "", accountrecid: 0 },
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "PgoosPropagation") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: { accountType: "", accountrecid: 0 },
        stringRPGMList: "",
        notAccepted: false,
        hotelSaidDelete: false,
        excludeGPP: false,
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "hotelPropertyList") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: "",
          subset: "",
        },
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "EdieHotelProfileView") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: "",
        },
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "UpdateMultipleHotels") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: { accountType: "", accountrecid: "" },
      });

      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }

    if (props.componentName === "UpdateMultipleHotels") {
      const modifiedStrValues = Object.assign(initialPayload.strFilterValues, {
        accountFilter: {
          accountstatus: "ALL",
          accountType: "",
          accountrecid: 0,
          accounttypedescription: "",
        },
      });
      setRequestPayload({
        ...initialPayload,
        strFilterValues: modifiedStrValues,
      });
    }
  }, [props.componentName, props.directSelectList]);

  useEffect(() => {
    if (requestPayload.strFilterValues?.accountFilter) {
      setSelectedAccount(
        requestPayload.strFilterValues?.accountFilter.accountstatus
      );
    }
  }, [requestPayload.strFilterValues?.accountFilter]);

  const getFilterViewListsData = (isUpdateMultiple) => {
    API.getFilterViewLists(props.filterViewLists).then((data) => {
      localStorage.setItem("maxPageLengthUMH", data?.page?.maxpagelen);
      if (isUpdateMultiple) {
        //only for update multiple hotel initial API call is changed to getMultiHotelAccountCenter to get the periodlist and brandlist;
        //as due to authorization earlier API was failing for user roles other than admin
        data = data?.filterlists;
        data["periodList"] = data?.periodlist;
      }
      const brandList = data.brandlist.map((item) => item.affiliationid);
      setFilterViewLists(data);
      setYear(data.periodList[0].period);
      if (isUpdateMultiple) {
        getDueDateData(
          finalYear !== null && finalYear !== undefined && finalYear !== ""
            ? finalYear
            : data.periodList[0].period
        );
      }
      if (props?.componentName == "hotelPropertyList") {
        if (
          props.filterContext?.requestPayload?.strFilterValues?.accountFilter
            ?.accountstatus &&
          props.filterContext?.requestPayload?.strFilterValues?.accountFilter
            ?.accountstatus != "ALL"
        ) {
          getAccountLists("", data.periodList[0].period);
        }
      } else {
        if (props?.componentName == "hotelPGOOSMaintenance") {
          //No call is required as of now
        } else {
          getAccountLists("", data.periodList[0].period);
        }
      }

      setTimeout(() => {
        setRequestPayload({
          ...requestPayload,
          strFilterValues: {
            ...requestPayload.strFilterValues,
            year: data.periodList[0].period,
            stringBrandList: brandList?.toString(),
          },
        });
        if (props.componentName === "UpdateMultipleHotels") {
          const modifedData: any = [];
          data.brandlist.forEach((item) => {
            modifedData.push({
              affiliationid: item?.affiliationid,
              affiliationname: item?.affiliationname || "",
              affiliationstatus: "",
            });
          });
          setupdateMutipleRequestInitalPayload({
            ...updateMutipleRequestPayload,
            brandlist: modifedData,
          });
        }
      }, 1000);
    });
  };

  const getRegionsData = () => {
    API.getRegions().then((data) => {
      setGetRegions(data);
    });
  };

  const getCountriesData = () => {
    API.getCountries().then((data) => {
      setCountries(data);
    });
  };

  const getStatesData = (countryCode: string) => {
    API.getStates(countryCode).then((data) => {
      setStates(data);
    });
  };

  const getCitiesData = (countryCode: string, stateCode: string) => {
    API.getCities(countryCode, stateCode).then((data) => {
      setCities(data);
    });
  };

  const getEdieProfileList = () => {
    API.getEdieProfiles().then((data) => {
      setEdieProfileList(data);
    });
  };

  const getEdieHotelProfiles = () => {
    API.getEdieHotelProfiles().then((data) => {
      sethotelProfileList(data);
    });
  };

  const getReportLists = () => {
    API.getReports().then((data) => {
      setReportList(data.reportList);
    });
  };

  const resetData = () => {
    setStates([]);
    setCities([]);
  };
  const resetCitiesData = () => {
    setCities([]);
  };

  const resetStatesData = () => {
    setStates([]);
  };

  const getAccountSegment = () => {
    API.getAccountSegment().then((data) => {
      data.length > 0 && data.unshift({ accounttypedescription: "*" });
      setAccountSegments(data);
    });
  };

  const getAccAerType = (accountrecId) => {
    API.getAccAerType(accountrecId).then((data) => {
      setAerType(data);
    });
  };

  const getAccountSubsets = () => {
    API.getAccountSubsets().then((data) => {
      setAccountSubsets(data);
    });
  };

  const handleYearChange = async (
    searchaccounttype = "",
    searchperiod = ""
  ) => {
    setDueDateData([]);
    setTimeout(() => {
      setDueData("");
    }, 1000);
    await getDueDateData(searchperiod);
    getAccountLists(searchaccounttype, searchperiod, true);
  };

  const getAccountLists = (
    searchaccounttype = "",
    searchperiod = "",
    isYearChanged = false
  ) => {
    // cancel  previous ajax if exists
    if (axiosRequest) {
      axiosRequest.cancel("cancel");
    }
    // creates a new token for upcomming ajax (overwrite the previous one)
    axiosRequest = axios.CancelToken.source();

    //Removing below call as it doesnt update any data (As part of optimization)
    //getRateProgramList("0");

    const isUpdateMultipleHotel =
      props.componentName === "UpdateMultipleHotels";

    setIsMakingDetailsRequest(true);
    const postData = {
      searchaccounttype:
        isUpdateMultipleHotel &&
        updateMutipleRequestInitialChangeEvents?.segmentChange === false &&
        searchaccounttype === "" &&
        session_segment_type !== null &&
        session_segment_type !== false &&
        session_segment_type !== undefined
          ? session_segment_type
          : searchaccounttype === ""
          ? ""
          : searchaccounttype || accountFilter.searchaccounttype,
      searchperiod:
        isYearChanged === false &&
        isUpdateMultipleHotel &&
        finalYear !== undefined &&
        finalYear !== false
          ? finalYear
          : searchperiod || year,
      searchnewAccountsOnly: isSerchNewOnly,
    };
    if (dueDate) {
      Object.assign(postData, { searchdueDate: !isYearChanged ? dueDate : "" });
    }
    if (searchperiod != "") {
      API.getAccountLists(postData, props.componentName, {
        cancelToken: axiosRequest.token,
      })
        .then((data) => {
          setAccountLists(data);
          sessionStorage.setItem("accountList", JSON.stringify(data));
          setIsMakingDetailsRequest(false);
        })
        .catch((error) => setIsMakingDetailsRequest(false));
    }
  };

  React.useEffect(() => {
    const accountInfo = selectedAccountDetails();
    if (accountInfo.length && accountInfo?.length > 0) {
      setupdateMutipleRequestInitalPayload({
        ...updateMutipleRequestPayload,
        accounttypedescription: accountInfo[0]?.accounttypedescription,
      });
    }
  }, [requestPayload.strFilterValues]);

  const selectedAccountDetails = () => {
    const strValues: any = requestPayload?.strFilterValues;
    return accountLists?.filter(
      (item) => item.accountrecid == strValues?.accountFilter?.accountrecid
    );
  };

  const getDueDateData = (year) => {
    sessionStorage.removeItem("accNameUpdateHotel");
    sessionStorage.removeItem("accRecIdUpdateHotel");
    API.getDueDate(year, 0).then((data) => {
      if (data.length > 0) {
        data.unshift({ duedate: "*" });
      }
      setDueDateData(data);
    });
  };

  const getRateProgramList = (accountCid = "") => {
    if (props.componentName === "PgoosPropagation") {
      setRateProgramListData([]);
      API.getRateProgramListData(
        accountCid,
        requestPayload.strFilterValues
      ).then((data) => {
        setRateProgramListData(data);
      });
    }
  };

  const onDueDateChange = (dueDate) => {
    setDueData(dueDate);
    const dueDataDatas = requestPayload?.strFilterValues;
    setIsMakingDetailsRequest(true);
    API.getAccountLists(
      {
        searchperiod: requestPayload?.strFilterValues?.year,
        searchaccounttype: dueDataDatas["accountFilter"]?.accountType,
        searchdueDate: dueDate,
        searchnewAccountsOnly: isSerchNewOnly,
      },
      props.componentName,
      {}
    )
      .then((data) => {
        setAccountLists(data);
        setIsMakingDetailsRequest(false);
      })
      .catch((error) => setIsMakingDetailsRequest(false));
  };

  const onIsShowAccountOnly = (isShowAccount) => {
    setsSerchNewOnly(isShowAccount);
    const dueDataDatas = requestPayload?.strFilterValues;
    setIsMakingDetailsRequest(true);
    API.getAccountLists(
      {
        searchperiod: requestPayload?.strFilterValues?.year,
        searchaccounttype: dueDataDatas["accountFilter"]?.accountType,
        searchdueDate: dueDate,
        searchnewAccountsOnly: isShowAccount,
      },
      props.componentName,
      {}
    )
      .then((data) => {
        setAccountLists(data);
        setIsMakingDetailsRequest(false);
      })
      .catch((error) => setIsMakingDetailsRequest(false));
  };

  const getReportInfo = (reportName = "") => {
    if (props.componentName === "requestReport") {
      API.getReportDetails(reportName)
        .then((data) => {
          setReportDetails(data);
          if (data === "error") {
            alert("Error when retrieving report details!");
          }
          if (Utils.stringToBoolean(data[0].allow_account)) {
            if (Utils.stringToBoolean(data[0].req_account)) setIsAccReq(true);
            else setIsAccReq(false);
          } else setIsAccReq(false);
        })
        .catch(() => {
          alert("Error when retrieving report details!");
        });
    }
  };

  const hotelPGOOSMaintenanceContext = {
    state,
    getFilterViewListsData,
    setState,
    getRegionsData,
    filterViewLists,
    setFilterViewLists,
    getRegions,
    setGetRegions,
    getCountriesData,
    countries,
    getStatesData,
    states,
    getCitiesData,
    cities,
    resetData,
    resetCitiesData,
    resetStatesData,
    requestPayload,
    setRequestPayload,
    panelData,
    isMakingRequest,
    isDataChange,
    setIsDataChange,
    accountSegments,
    accountSubsets,
    getAccountSegment,
    getAccountSubsets,
    setAccountFilter,
    accountFilter,
    getAccountLists,
    accountLists,
    isMakingDetailsRequest,
    getEdieProfileList,
    edieProfileList,
    getEdieHotelProfiles,
    getReportLists,
    reportList,
    hotelProfileList,
    highlightedOnly,
    emailMe,
    setHighlightedOnly,
    setemailMe,
    // selectedAccountDetails
    getRateProgramList,
    rateProgramListData,
    rateProgramCheckboxes,
    setRateProgramCheckboxes,
    setPgoosTypesFilter,
    pgoosTypesFilter,
    setRateProgramListData,
    isShowSpecRtpgm,
    setIsShowSpecRtpgm,
    aerType,
    getAccAerType,
    getReportInfo,
    reportDetails,
    isAccReq,
    setIsAccReq,
    updateMutipleRequestPayload,
    setupdateMutipleRequestInitalPayload,
    updateMutipleRequestEvents,
    setupdateMutipleRequestInitialChangeEvents,
    onDueDateChange,
    dueDateData,
    handleYearChange,
    setDueDateData,
    onIsShowAccountOnly,
    selectedAccount,
    setSelectedAccount,
    setAccountStatus,
    accountStatus,
  };

  return (
    <FilterContext.Provider value={hotelPGOOSMaintenanceContext}>
      {props.children}
    </FilterContext.Provider>
  );
};
