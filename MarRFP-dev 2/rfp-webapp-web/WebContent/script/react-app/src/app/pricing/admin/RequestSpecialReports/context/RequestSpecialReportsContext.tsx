import React, { useContext, useState } from "react";
import Utils from "../../utils/Utils";
import Util from "../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

const RequestSpecialReportsContext = React.createContext({});

export const RequestSpecialReportsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    isDataLoaded: false,
    isDataError: false,
    reportId: null,
    requestSpecialReportsData: {
      filterValues: {
        accountrecid: null,
        accountType: null,
        sappModule: null,
        eid: null,
        globalLeaderEID: null,
        marshaCode: null,
        period: null,
        proximitySubCatCode: null,
        quarter: null,
        report: null,
        retrieveSubCat: null,
        role: null,
        regionid: null,
        allnewregistrations: null,
        changeDate: null,
        dateRangeFilter: {
          fromDate: null,
          toDate: null,
          strFromDate: null,
          strToDate: null,
        },
        exceldateformat: "mm/dd/yyyy",
        pgoosStatus: {
          statusError: null,
          statusInProgress: null,
          statusPublished: null,
        },
        emailMe: "",
      },
      noFilterOptions: {
        noFilterLists: {
          periodList: null,
          accountList: null,
          accountSegmentList: null,
          quarterList: null,
          reportlist: [
            {
              report_name: null,
              report_title: null,
              is_electronic: null,
              allow_accounttype: null,
              allow_account: null,
              allow_period: null,
              add_params: null,
              req_account: null,
              req_roles: null,
              allow_region: null,
              allow_proximitysubcat: null,
              schedule_time: null,
              priority: null,
              req_acct_or_region: null,
              req_daterange: null,
              fsale_all_hotels: null,
              allow_account_eligible: null,
              allow_quarter: null,
              acctplan_options: null,
              sale_all_account: null,
              allow_saleslist: null,
              allow_apadminview: null,
              allow_account_solicited: null,
              include_marriott_contact: null,
              allow_onehotel: null,
              allow_eid: null,
              allow_futureopenings: null,
              allow_dateformat: null,
              req_acct_region_brand: null,
              allow_schedule: null,
              allow_cbchotels: null,
              allow_pgoosStatus: null,
              amenity_count: null,
            },
          ],
          sappmoduleList: null,
          proximityList: null,
          globalSalesContacts: null,
          regionList: null,
          roleList: null,
          hotelList: null,
          exceldateformat: null,
        },
        reportDetails: {
          report_name: null,
          report_title: null,
          is_electronic: null,
          allow_accounttype: null,
          allow_account: null,
          allow_period: null,
          add_params: null,
          req_account: null,
          req_roles: null,
          allow_region: null,
          allow_proximitysubcat: null,
          schedule_time: null,
          priority: null,
          req_acct_or_region: null,
          req_daterange: null,
          fsale_all_hotels: null,
          allow_account_eligible: null,
          allow_quarter: null,
          acctplan_options: null,
          sale_all_account: null,
          allow_saleslist: null,
          allow_apadminview: null,
          allow_account_solicited: null,
          include_marriott_contact: null,
          allow_onehotel: null,
          allow_eid: null,
          allow_futureopenings: null,
          allow_dateformat: null,
          req_acct_region_brand: null,
          allow_schedule: null,
          allow_cbchotels: null,
          allow_pgoosStatus: null,
          amenity_count: null,
        },
      },
    },

    selectedValues: {
      accountrecid: null,
      accountType: null,
      sappModule: null,
      eid: null,
      globalLeaderEID: null,
      marshaCode: null,
      period: null,
      proximitySubCatCode: null,
      quarter: null,
      report: null,
      retrieveSubCat: null,
      role: null,
      regionid: null,
      allnewregistrations: null,
      changeDate: null,
      dateRangeFilter: null,
      exceldateformat: "mm/dd/yyyy",
      pgoosStatus: null,
      emailMe: "",
    },
    dateChangeVal: "",
    isAllNew: true,
    isAllNewValue: "Y",
    statusError: true,
    statusErrorVal: "Y",
    statusInProgress: true,
    statusInProgressVal: "Y",
    statusPublished: false,
    statusPublishedVal: "",
    emailMe: false,
    retrieveSubCat: "N",
    isSubmitBtnClicked: false,
    hiddenUrl: null,
    reportUrl: null,
    defaultPeriod: null,
    isSbmtBtnDisable: false,
  });

  const setReportsData = (data) => {
    const reportsData = { ...state.requestSpecialReportsData };
    let defaultPeriod = null;
    const hotelList = [];

    defaultPeriod = state.defaultPeriod;

    if (data.filterValues != null) {
      reportsData.filterValues = data.filterValues;

      if (data.filterValues.dateRangeFilter !== null) {
        if (data.filterValues.dateRangeFilter.fromDate != null)
          reportsData.filterValues.dateRangeFilter.strFromDate =
            Util.getShortDate(data.filterValues.dateRangeFilter.fromDate);
        else {
          reportsData.filterValues.dateRangeFilter.strFromDate = null;
          reportsData.filterValues.dateRangeFilter.fromDate = null;
        }
        if (data.filterValues.dateRangeFilter.toDate !== null)
          reportsData.filterValues.dateRangeFilter.strToDate =
            Util.getShortDate(data.filterValues.dateRangeFilter.toDate);
        else {
          reportsData.filterValues.dateRangeFilter.strToDate = null;
          reportsData.filterValues.dateRangeFilter.toDate = null;
        }
      }

      if (data.filterValues.report === Settings.pgoosError) {
        if (data.filterValues.pgoosStatus === null) {
          reportsData.filterValues.pgoosStatus = {
            statusError: null,
            statusInProgress: null,
            statusPublished: null,
          };
        }
        reportsData.filterValues.pgoosStatus.statusError = Settings.yes.value;
        reportsData.filterValues.pgoosStatus.statusInProgress =
          Settings.yes.value;
      }

      if (data.filterValues.retrieveSubCat === null)
        reportsData.filterValues.retrieveSubCat = "N";
    }

    if (reportsData.filterValues.emailMe === Settings.yes.value)
      reportsData.filterValues.emailMe = Settings.no.value;

    reportsData.noFilterOptions.reportDetails =
      data.noFilterOptions.reportDetails;
    reportsData.noFilterOptions.noFilterLists =
      data.noFilterOptions.noFilterLists;

    if (data.noFilterOptions.noFilterLists.accountSegmentList != null)
      reportsData.noFilterOptions.noFilterLists.accountSegmentList =
        Utils.appendJsonObj(
          Settings.blankAccountSegment,
          data.noFilterOptions.noFilterLists.accountSegmentList
        );

    if (data.noFilterOptions.noFilterLists.reportlist != null)
      reportsData.noFilterOptions.noFilterLists.reportlist =
        Utils.appendJsonObj(
          Settings.blankReport,
          data.noFilterOptions.noFilterLists.reportlist
        );

    if (data.noFilterOptions.noFilterLists.accountList != null)
      reportsData.noFilterOptions.noFilterLists.accountList =
        Utils.appendJsonObj(
          Settings.blankAccount,
          data.noFilterOptions.noFilterLists.accountList
        );
    if (data.noFilterOptions.noFilterLists.periodList != null) {
      defaultPeriod = data.noFilterOptions.noFilterLists.periodList[0].period;
    } else {
      reportsData.filterValues.period = defaultPeriod;
    }
    // if (data.noFilterOptions.noFilterLists.proximityList != null)
    state.requestSpecialReportsData.noFilterOptions.noFilterLists.proximityList =
      Utils.appendJsonObj(
        Settings.blankProximity,
        data.noFilterOptions.noFilterLists.proximityList
      );
    reportsData.noFilterOptions.noFilterLists.proximityList =
      state.requestSpecialReportsData.noFilterOptions.noFilterLists.proximityList;

    if (data.noFilterOptions.noFilterLists.regionList != null)
      reportsData.noFilterOptions.noFilterLists.regionList =
        Utils.appendJsonObj(
          Settings.blankRegion,
          data.noFilterOptions.noFilterLists.regionList
        );

    if (data.noFilterOptions.noFilterLists.hotelList != null)
      data.noFilterOptions.noFilterLists.hotelList.map((hotel) => {
        const jsonPair = {};
        jsonPair[Settings.hotel.keyField] = hotel.marshacode;
        jsonPair[
          Settings.hotel.valField
        ] = `${hotel.marshacode} - ${hotel.name}`;
        hotelList.push(jsonPair);
      });

    reportsData.noFilterOptions.noFilterLists.hotelList = Utils.appendJsonObj(
      Settings.blankHotel,
      hotelList
    );

    if (data.noFilterOptions.noFilterLists.roleList != null)
      reportsData.noFilterOptions.noFilterLists.roleList = Utils.appendJsonObj(
        Settings.blankRole,
        data.noFilterOptions.noFilterLists.roleList
      );

    if (data.noFilterOptions.noFilterLists.quarterList != null)
      reportsData.noFilterOptions.noFilterLists.quarterList =
        Utils.appendJsonObj(
          Settings.blankQuarter,
          data.noFilterOptions.noFilterLists.quarterList
        );

    if (data.noFilterOptions.noFilterLists.globalSalesContacts != null)
      reportsData.noFilterOptions.noFilterLists.globalSalesContacts =
        Utils.appendJsonObj(
          Settings.blankGlobalSales,
          data.noFilterOptions.noFilterLists.globalSalesContacts
        );

    if (data.noFilterOptions.noFilterLists.sappmoduleList != null)
      reportsData.noFilterOptions.noFilterLists.sappmoduleList =
        Utils.appendJsonObj(
          Settings.blankAccPlanModule,
          data.noFilterOptions.noFilterLists.sappmoduleList
        );
    state.isSbmtBtnDisable = false;
    setState({
      ...state,
      requestSpecialReportsData: reportsData,
      isDataLoaded: true,
      isSbmtBtnDisable: state.isSbmtBtnDisable,
      defaultPeriod: defaultPeriod,
    });
  };

  const getFilteredData = (selectedData) => {
    if (
      selectedData.dateRangeFilter != null &&
      selectedData.dateRangeFilter.strFromDate != "" &&
      selectedData.dateRangeFilter.strToDate != ""
    ) {
      selectedData.dateRangeFilter.fromDate =
        selectedData.dateRangeFilter.strFromDate;
      selectedData.dateRangeFilter.toDate =
        selectedData.dateRangeFilter.strToDate;
    }

    API.getFilteredData(selectedData).then((data) => {
      setReportsData(data);
    });
  };

  const chgFilterOnClick = (e) => {
    const selectedData = { ...state.requestSpecialReportsData.filterValues };

    if (e.target.value === "0") selectedData.report = "";
    else selectedData.report = e.target.value;

    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: selectedData,
      },
      selectedValues: selectedData,
    });
    getFilteredData(selectedData);
  };

  const changePeriod = (e) => {
    const stateData = { ...state.requestSpecialReportsData };
    const selectedData = { ...state.requestSpecialReportsData.filterValues };
    selectedData.retrieveSubCat = Settings.no.value;
    selectedData.period = e.target.value;
    if (selectedData.accountrecid != null)
      selectedData.accountrecid = Settings.blankAccount.accountrecid;
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: selectedData,
      },
      selectedValues: selectedData,
    });

    if (
      stateData.noFilterOptions.reportDetails.allow_account ===
      Settings.yes.value
    )
      getFilteredData(selectedData);
  };

  const changeAccountSegment = (e) => {
    const stateData = { ...state.requestSpecialReportsData };
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    filterData.accountType = e.target.value;
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: filterData,
      },
      selectedValues: filterData,
    });

    if (
      stateData.noFilterOptions.reportDetails.allow_account ===
      Settings.yes.value
    )
      getFilteredData(filterData);
  };

  const changeAccount = (e) => {
    const stateData = { ...state.requestSpecialReportsData };
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    filterData.retrieveSubCat = Settings.no.value;
    filterData.accountrecid = e.target.value;
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: filterData,
      },
      selectedValues: filterData,
    });
    if (
      stateData.noFilterOptions.reportDetails.allow_proximitysubcat ===
      Settings.yes.value
    )
      getFilteredData(filterData);

    if (
      stateData.noFilterOptions.reportDetails.allow_saleslist ===
      Settings.yes.value
    ) {
      filterData.globalLeaderEID = "";
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterData,
        },
        selectedValues: filterData,
      });
    }
  };

  const getSubCatData_onclick = () => {
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    const sAccount = filterData.accountrecid;
    if (sAccount == "0" || sAccount == 0 || sAccount == null)
      alert("You must select an account.");
    else {
      filterData.retrieveSubCat = Settings.yes.value;
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterData,
        },
        selectedValues: filterData,
        retrieveSubCat: Settings.yes.value,
      });
      getFilteredData(filterData);
    }
  };

  const handleChange = (e) => {
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    filterData[e.target.id] = e.target.value;
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: filterData,
      },
      selectedValues: filterData,
    });
  };

  const checkPgoosParameters = () => {
    const stateData = { ...state };
    const filterValues = {
      ...state.requestSpecialReportsData.filterValues.pgoosStatus,
    };
    const statusError = stringToBoolean(filterValues.statusError);
    const statusInProgress = stringToBoolean(filterValues.statusInProgress);
    const statusPublished = stringToBoolean(filterValues.statusPublished);
    let bOK = true;

    if (!statusError && !statusInProgress && !statusPublished) {
      alert(" Status Selection Required to Retrieve Data ");

      bOK = false;
    }
    if (statusError && statusInProgress && statusPublished) {
      filterValues.statusError = "N";
      filterValues.statusInProgress = "N";
      filterValues.statusPublished = "N";
      //  alert(selectType);
      setState({
        ...state,
        statusError: false,
        statusInProgress: false,
        statusPublished: false,
        statusErrorVal: "",
        statusInProgressVal: "",
        statusPublishedVal: "",
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: {
            ...state.requestSpecialReportsData.filterValues,
            pgoosStatus: filterValues,
          },
        },
      });
      bOK = false;
    }
    if (statusError && !statusInProgress && statusPublished) {
      filterValues.statusError = "N";
      filterValues.statusInProgress = "N";
      filterValues.statusPublished = "N";
      setState({
        ...state,
        statusError: false,
        statusInProgress: false,
        statusPublished: false,
        statusErrorVal: "",
        statusInProgressVal: "",
        statusPublishedVal: "",
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: {
            ...state.requestSpecialReportsData.filterValues,
            pgoosStatus: filterValues,
          },
        },
      });

      // alert(selectType);
      bOK = false;
    }
    if (!statusError && statusInProgress && statusPublished) {
      filterValues.statusError = "N";
      filterValues.statusInProgress = "N";
      filterValues.statusPublished = "N";
      setState({
        ...state,
        statusError: false,
        statusInProgress: false,
        statusPublished: false,
        statusErrorVal: "",
        statusInProgressVal: "",
        statusPublishedVal: "",
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: {
            ...state.requestSpecialReportsData.filterValues,
            pgoosStatus: filterValues,
          },
        },
      });

      //  alert(selectType);
      bOK = false;
    }

    return bOK;
  };

  const onChange = (event) => {
    const { id, checked } = event.target;
    const filterValues = { ...state.requestSpecialReportsData.filterValues };

    if (id === Settings.pgoosStatus.statusError.id) {
      state.statusError = checked;
      if (checked) filterValues.pgoosStatus.statusError = "Y";
      else filterValues.pgoosStatus.statusError = "N";
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterValues,
        },
        statusError: checked,
      });
    }

    if (id === Settings.pgoosStatus.statusInProgress.id) {
      state.statusInProgress = checked;
      if (checked) filterValues.pgoosStatus.statusInProgress = "Y";
      else filterValues.pgoosStatus.statusInProgress = "N";
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterValues,
        },
        statusError: checked,
      });
    }

    if (id === Settings.pgoosStatus.statusPublished.id) {
      state.statusPublished = checked;
      if (checked) filterValues.pgoosStatus.statusPublished = "Y";
      else filterValues.pgoosStatus.statusPublished = "N";
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterValues,
        },
        statusError: checked,
      });
    }
    checkPgoosParameters();
  };

  const runReport = () => {
    let bOK = true;
    const stateData = {
      ...state.requestSpecialReportsData.noFilterOptions.reportDetails,
    };
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    const sappFilterData = { ...state.requestSpecialReportsData.filterValues };

    if (stateData.amenity_count > 0) {
      alert(
        "This ain't fair. You already scheduled the report right. Don't push the system too far!"
      );
      bOK = false;
    }

    if (stateData.allow_period === Settings.yes.value) {
      if (bOK) {
        const period = filterData.period;
        if (period == 0) {
          alert("Please select a year.");
          bOK = false;
        }
      }
    } else {
      filterData.period = null;
    }

    if (stateData.req_roles === Settings.yes.value) {
      let sRole;
      if (bOK) {
        if (filterData.role === null) sRole = "";
        else sRole = filterData.role;
        if (sRole == "") {
          alert("You must select a role.");
          bOK = false;
        }
      }
    } else {
      filterData.role = null;
    }

    if (stateData.req_account === Settings.yes.value) {
      if (bOK) {
        const sAccount = filterData.accountrecid;
        if (sAccount == "0" || sAccount == 0 || sAccount == null) {
          alert("You must select an account.");
          bOK = false;
        }
      }
    } else {
      filterData.accountrecid = null;
    }

    if (
      (stateData.allow_region === Settings.yes.value ||
        stateData.allow_region === Settings.l.value) &&
      stateData.req_acct_or_region === Settings.yes.value
    ) {
      let sRegion;
      if (bOK) {
        if (filterData.regionid === null) sRegion = "";
        else sRegion = filterData.regionid;
        if (sRegion == "") {
          alert("You must select a region.");
          bOK = false;
        }
      }
    } else {
      filterData.regionid = null;
    }

    if (stateData.acctplan_options === Settings.yes.value) {
      let iModule;
      if (bOK) {
        if (filterData.sappModule === null) iModule = "";
        else iModule = filterData.sappModule;
        if (iModule == "") {
          alert("You must select a module.");
          bOK = false;
        }
      }
    } else {
      filterData.sappModule = null;
    }
    if (stateData.allow_pgoosStatus === Settings.yes.value) {
      if (bOK) bOK = checkPgoosParameters();
      if (bOK) {
        if (filterData.pgoosStatus.statusError !== Settings.yes.value) {
          filterData.pgoosStatus.statusError = null;
          state.statusError = false;
        }
        if (filterData.pgoosStatus.statusInProgress !== Settings.yes.value) {
          filterData.pgoosStatus.statusInProgress = null;
        }
        if (filterData.pgoosStatus.statusPublished !== Settings.yes.value) {
          filterData.pgoosStatus.statusPublished = null;
        }
      }
    } else {
      if (filterData.pgoosStatus != null) {
        filterData.pgoosStatus.statusError = null;
        filterData.pgoosStatus.statusInProgress = null;
        filterData.pgoosStatus.statusPublished = null;
      } else {
        filterData.pgoosStatus = {
          statusError: null,
          statusInProgress: null,
          statusPublished: null,
        };
      }
    }
    if (filterData.dateRangeFilter != null) {
      if (filterData.dateRangeFilter.strFromDate != null) {
        if (Util.checkDate(filterData.dateRangeFilter.strFromDate)) {
          filterData.dateRangeFilter.fromDate = Util.setDatewithYYYY(
            filterData.dateRangeFilter.strFromDate
          );
          filterData.dateRangeFilter.strFromDate = Util.setDatewithYYYY(
            filterData.dateRangeFilter.strFromDate
          );
        }
      } else {
        filterData.dateRangeFilter.fromDate = null;
        filterData.dateRangeFilter.strFromDate = null;
      }

      if (filterData.dateRangeFilter.strToDate != null) {
        filterData.dateRangeFilter.toDate =
          filterData.dateRangeFilter.strToDate;
        filterData.dateRangeFilter.strToDate =
          filterData.dateRangeFilter.strToDate;
      } else {
        filterData.dateRangeFilter.toDate = null;
        filterData.dateRangeFilter.strToDate = null;
      }
    }
    if (filterData.globalLeaderEID === 0) filterData.globalLeaderEID = "";

    if (bOK) {
      state.isSbmtBtnDisable = true;
      setState({ ...state, isSbmtBtnDisable: state.isSbmtBtnDisable });

      let requestParms;
      if (
        filterData.report === "eSAPPKeyContactsInfo" ||
        filterData.report === "eSAPPSegmentTeamLeadInfo" ||
        filterData.report === "eSAPPTeamMembersContactInfo" ||
        filterData.report === "eSCPTDetail" ||
        filterData.report === "eSAPPInitiatives"
      ) {
        requestParms = sappFilterData;
      } else {
        requestParms = filterData;
      }

      API.runReport(requestParms)
        .then((data) => {
          if (data === "error") {
            state.isDataError = true;
          } else {
            state.isDataError = false;
          }
          if (!appContext.cognosURL) {
            API.getCognosServerUrl().then((res) => {
              const reportUrl = `${res.COGNOS_SERVER_URL}__reportName=${filterData.report}${data.reportQueryString}`;

              setState({
                ...state,
                hiddenUrl: res.COGNOS_LOGIN_URL,
                reportUrl: reportUrl,
                isSubmitBtnClicked: true,
              });
            });
          } else {
            const reportUrl = `${appContext.cognosURL.COGNOS_SERVER_URL}__reportName=${filterData.report}${data.reportQueryString}`;
            setState({
              ...state,
              hiddenUrl: appContext.cognosURL.COGNOS_LOGIN_URL,
              reportUrl: reportUrl,
              isSubmitBtnClicked: true,
            });
          }
        })
        .catch((error) => {
          Util.navigateToUrl(Settings.errorUrl);
        });
    }
  };
  const onEmailChange = (event) => {
    const selectedData = { ...state.requestSpecialReportsData.filterValues };
    const { checked } = event.target;
    if (checked) selectedData.emailMe = "Y";
    else {
      selectedData.emailMe = "N";
    }
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: selectedData,
      },
      selectedValues: selectedData,
    });
  };
  const stringToBoolean = (stringVal) => {
    switch (stringVal) {
      case "On":
        return true;
      case "Y":
        return true;
      case "N":
        return false;
      case null:
        return false;
      default:
        return false;
    }
  };

  const allNew = (event) => {
    let isAllNewChecked = false;
    isAllNewChecked = event.target.value;

    setState({
      ...state,
      isAllNew: isAllNewChecked,
      dateChangeVal: "",
    });
  };
  const date_onchange = (e) => {
    let bOK = false;
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    filterData.changeDate = stringToBoolean(e.target.value);
    const strDate = e.target.value;

    if (typeof strDate == "undefined") bOK = true;

    if (bOK) {
      filterData.changeDate = Util.setDatewithYYYY(strDate);
      return bOK;
    }
    setState({
      ...state,
      requestSpecialReportsData: {
        ...state.requestSpecialReportsData,
        filterValues: filterData,
      },
      selectedValues: filterData,
      dateChangeVal: filterData.changeDate,
    });
    return true;
  };

  const daterange_onchange = (e, whichdate) => {
    const filterData = { ...state.requestSpecialReportsData.filterValues };
    const strDate = e.target.value;
    let bOK = true;
    if (typeof strDate == "undefined") bOK = false;

    if (bOK) {
      if (filterData.dateRangeFilter != null) {
        filterData.dateRangeFilter[e.target.id] = strDate;
      }
      setState({
        ...state,
        requestSpecialReportsData: {
          ...state.requestSpecialReportsData,
          filterValues: filterData,
        },
        selectedValues: filterData,
      });
      return true;
    } else return false;
  };

  const validate = (event) => {
    const { value } = event.target;
    Util.checkDate(value);
  };
  const requestSpecialReportsContext = {
    state,
    setState,
    setReportsData,
    changePeriod,
    chgFilterOnClick,
    changeAccountSegment,
    changeAccount,
    date_onchange,
    allNew,
    onEmailChange,
    runReport,
    checkPgoosParameters,
    handleChange,
    getSubCatData_onclick,
    daterange_onchange,
    onChange,
    validate,
  };

  return (
    <RequestSpecialReportsContext.Provider value={requestSpecialReportsContext}>
      {props.children}
    </RequestSpecialReportsContext.Provider>
  );
};

export const RequestSpecialReportsContextConsumer =
  RequestSpecialReportsContext.Consumer;
export default RequestSpecialReportsContext;

export interface IRequestSpecialReportsContext {
  state;
  setState;
  setReportsData;
  changePeriod;
  chgFilterOnClick;
  changeAccountSegment;
  changeAccount;
  date_onchange;
  allNew;
  onEmailChange;
  runReport;
  checkPgoosParameters;
  handleChange;
  getSubCatData_onclick;
  daterange_onchange;
  onChange;
  validate;
}
