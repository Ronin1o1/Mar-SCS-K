import React, { useContext, useState } from "react";
import Utils from "../../utils/Utils";
import commonUtils from "../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "../static/Settings";
//import { isNull } from "lodash";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import { useCookies } from "react-cookie";

const ViewReportsContext = React.createContext({});

export const ViewReportsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [, setCookies] = useCookies(["MARFPAUTH", "CODE"]);
  const [, setCookie1] = useCookies(["COGNOS_LOGED_IN"]);
  const [state, setState] = useState({
    resetAccount: 1,
    baseReportUrl: null,
    reportUrl: null,
    hiddenUrl: null,
    reportId: null,
    showLoader: false,
    viewReportsData: {
      currentReport: null,
      currentReportModel: {
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

      reportList: [
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
      filterLists: {
        periodList: [
          {
            period: null,
            startdate: null,
            enddate: null,
            hotelsview: null,
            dueDates: null,
          },
        ],
        accountList: [
          {
            accountid: null,
            accountname: null,
            accountpricingtype: null,
            accountrecid: null,
            accounttypedescription: null,
            duedate: null,
            groupmeetings: null,
            hotel_display: null,
            period: null,
            top_account: null,
          },
        ],
        brandlist: null,
        reportlist: null,
        edieprofilelist: null,
        ediehotelprofilelist: null,
        exceldateformat: null,
      },
      initialFilterLists: {
        periodList: [
          {
            period: null,
            startdate: null,
            enddate: null,
            hotelsview: null,
            dueDates: null,
          },
        ],
        accountList: [
          {
            accountid: null,
            accountname: null,
            accountpricingtype: null,
            accountrecid: null,
            accounttypedescription: null,
            duedate: null,
            groupmeetings: null,
            hotel_display: null,
            period: null,
            top_account: null,
          },
        ],
        brandlist: null,
        reportlist: null,
        edieprofilelist: null,
        ediehotelprofilelist: null,
        exceldateformat: null,
      },
    },
    periodList: [],
    blankAccount: {
      accountid: null,
      accountname: "*",
      accountpricingtype: null,
      accountrecid: 0,
      accounttypedescription: null,
      duedate: null,
      groupmeetings: null,
      hotel_display: null,
      period: null,
      top_account: null,
    },
    selectedData: {
      selectedAccount: {
        accountid: null,
        accountname: null,
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: null,
        hotel_display: null,
        period: null,
        top_account: null,
      },
      selectedPeriod: null,
      selectedReport: null,
    },
    isValueChange: false,
    defaultPeriod: null,
  });

  const setFilterFromSession = () => {
    if (localStorage.getItem("VIEW_REPORT_FILTER")) {
      const selectedData = JSON.parse(
        localStorage.getItem("VIEW_REPORT_FILTER")
      );

      setState((prev) => ({
        ...prev,
        selectedData,
        isValueChange: true,
      }));
    }
  };

  const getFilterFromSession = () =>
    (localStorage.getItem("VIEW_REPORT_FILTER") &&
      JSON.parse(localStorage.getItem("VIEW_REPORT_FILTER"))) ||
    null;

  const setViewReportsData = (data) => {
    const reportsData = { ...state.viewReportsData };
    const selectedData = { ...state.selectedData };
    reportsData.filterLists = { ...state.viewReportsData.initialFilterLists };
    let reportUrl;
    let periodListData;
    let period = null;
    let accountrecid = null;
    let accountname = null;
    let defaultPeriod = null;

    defaultPeriod = state.defaultPeriod;
    reportsData.currentReport = data.currentReport;
    reportsData.currentReportModel = data.currentReportModel;
    reportsData.reportList = data.reportList;
    if (data.filterLists !== null) {
      reportsData.filterLists.periodList = data.filterLists.periodList;
      periodListData = Utils.getPeriodLst(data.filterLists.periodList);
      reportsData.filterLists.accountList = Utils.appendJsonObj(
        state.blankAccount,
        data.filterLists.accountList
      );

      reportsData.filterLists.brandlist = data.filterLists.brandlist;
      reportsData.filterLists.reportlist = data.filterLists.reportlist;
      reportsData.filterLists.edieprofilelist =
        data.filterLists.edieprofilelist;
      reportsData.filterLists.ediehotelprofilelist =
        data.filterLists.ediehotelprofilelist;
      reportsData.filterLists.exceldateformat =
        data.filterLists.exceldateformat;
      if (!state.isValueChange && !localStorage.getItem("VIEW_REPORT_FILTER")) {
        selectedData.selectedAccount = reportsData.filterLists.accountList[0];
        selectedData.selectedPeriod = periodListData[0].period;
        selectedData.selectedReport = data.currentReportModel.report_name;
        period = periodListData[0].period;
        defaultPeriod = periodListData[0].period;
        accountrecid = state.blankAccount.accountrecid;
      } else {
        period = selectedData.selectedPeriod;
        accountrecid = selectedData.selectedAccount.accountrecid;
        accountname = selectedData.selectedAccount.accountname;
      }
    } else {
      reportsData.filterLists = data.filterLists;
      selectedData.selectedAccount = state.blankAccount;
      selectedData.selectedPeriod = state.defaultPeriod;
      selectedData.selectedReport = selectedData.selectedReport
        ? selectedData.selectedReport
        : data.currentReportModel.report_name;
    }

    const currentReport = selectedData.selectedReport
      ? selectedData.selectedReport
      : data.currentReportModel.report_name;
    if (accountrecid === 0) accountrecid = null;

    if (accountrecid === null && period === null && state.baseReportUrl) {
      reportUrl = `${state.baseReportUrl}__reportName=${currentReport}`;
    }
    if (accountrecid !== null && period !== null && state.baseReportUrl) {
      reportUrl = `${
        state.baseReportUrl
      }__reportName=${currentReport}&p_pAccountname=${commonUtils.replaceWildForFilename(
        accountname
      )}&p_period=${period}`;
    }
    if (accountrecid === null && period !== null && state.baseReportUrl) {
      reportUrl = `${state.baseReportUrl}__reportName=${currentReport}&p_period=${period}`;
    }
    if (accountrecid !== null && period === null && state.baseReportUrl) {
      reportUrl = `${
        state.baseReportUrl
      }__reportName=${currentReport}&p_pAccountname=${commonUtils.replaceWildForFilename(
        accountname
      )}`;
    }
    if (
      currentReport != null &&
      (currentReport === Settings.GPP_PGOOS_Status ||
        currentReport === Settings.eSCPTDetail_ExtendedStay ||
        currentReport === Settings.eSCPTPricingSummaryBatch)
    )
      reportUrl += "&p_pReportType=Scheduled";
    setState({
      ...state,
      resetAccount: Math.random(),
      viewReportsData: reportsData,
      selectedData: selectedData,
      periodList: periodListData,
      reportUrl: reportUrl,
      isValueChange: false,
      defaultPeriod: defaultPeriod,
    });
  };

  const onChangeReport = (event) => {
    const selectedData = { ...state.selectedData };

    let currentReport;
    let accountrecid = null;
    let period = null;

    if (event.target.id === "accountrecid") {
      const selectedAccountObj =
        state.viewReportsData.filterLists.accountList.filter(
          (data) => data.accountrecid === parseInt(event.target.value)
        );
      state.selectedData.selectedAccount = selectedAccountObj[0];

      selectedData.selectedAccount = state.selectedData.selectedAccount;
      accountrecid = event.target.value;
      currentReport = selectedData.selectedReport;
      period = selectedData.selectedPeriod;
    } else {
      state.selectedData.selectedReport = event.target.value;
      selectedData.selectedReport = state.selectedData.selectedReport;
      currentReport = event.target.value;
      if (state.viewReportsData.filterLists != null) {
        accountrecid = state.selectedData.selectedAccount.accountrecid;
        period = selectedData.selectedPeriod;
      }
    }

    state.isValueChange = true;

    setState({
      ...state,
      selectedData: selectedData,
      isValueChange: state.isValueChange,
    });
    if (
      JSON.stringify(selectedData) !=
      JSON.stringify(localStorage.getItem("VIEW_REPORT_FILTER"))
    ) {
      localStorage.setItem("VIEW_REPORT_FILTER", JSON.stringify(selectedData));
    }

    if (accountrecid == null) accountrecid = "";
    if (period == null) period = "";
    if (currentReport != undefined) {
      setState({
        ...state,
        showLoader: true,
      });
      API.getViewReportsData(accountrecid, currentReport, period)
        .then((res) => {
          setState({
            ...state,
            showLoader: false,
          });
          setViewReportsData(res);
        })
        .catch((error) => {
          setState({
            ...state,
            showLoader: false,
          });
        });
    }
  };
  const checkCognos = () => {
    console.log("in check cognos function");
    setCookies("CODE", "");
    setCookie1("COGNOS_LOGED_IN", "");
  };
  const setReportURL = () => {
    if (!appContext?.cognosURL) {
      API.getCognosServerUrl().then((res) => {
        setState({
          ...state,
          baseReportUrl: res.COGNOS_EXCEL_LOC,
          hiddenUrl: res.COGNOS_LOGIN_URL,
        });
      });
    } else {
      setState({
        ...state,
        baseReportUrl: appContext?.cognosURL.COGNOS_EXCEL_LOC,
        hiddenUrl: appContext?.cognosURL.COGNOS_LOGIN_URL,
      });
    }
  };

  const periodChangeHandler = (event) => {
    const selectedData = { ...state.selectedData };

    let currentReport;
    let accountrecid = null;
    let period = null;

    state.selectedData.selectedPeriod = event.target.value;
    currentReport = selectedData.selectedReport;
    selectedData.selectedPeriod = state.selectedData.selectedPeriod;
    state.selectedData.selectedAccount = state.blankAccount;
    selectedData.selectedAccount = state.selectedData.selectedAccount;
    period = event.target.value;

    accountrecid = state.blankAccount.accountrecid;

    state.isValueChange = true;
    setState({
      ...state,
      selectedData: selectedData,
      isValueChange: state.isValueChange,
    });
    if (
      JSON.stringify(selectedData) !=
      JSON.stringify(localStorage.getItem("VIEW_REPORT_FILTER"))
    ) {
      localStorage.setItem("VIEW_REPORT_FILTER", JSON.stringify(selectedData));
    }
    if (accountrecid == null) accountrecid = "";
    if (period == null) period = "";
    if (currentReport != undefined) {
      API.getViewReportsData(accountrecid, currentReport, period).then(
        (res) => {
          setViewReportsData(res);
        }
      );
    }
  };

  const viewReportsContext = {
    state,
    setState,
    setViewReportsData,
    onChangeReport,
    periodChangeHandler,
    setReportURL,
    checkCognos,
    getFilterFromSession,
    setFilterFromSession,
  };

  return (
    <ViewReportsContext.Provider value={viewReportsContext}>
      {props.children}
    </ViewReportsContext.Provider>
  );
};

export const ViewReportsContextConsumer = ViewReportsContext.Consumer;
export default ViewReportsContext;
