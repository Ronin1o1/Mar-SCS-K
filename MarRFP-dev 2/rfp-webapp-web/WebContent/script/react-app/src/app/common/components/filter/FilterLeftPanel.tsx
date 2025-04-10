import React, { useContext, useEffect, useState } from "react";
import { AreaFilter } from "./AreaFilter";
import { BrandsFilter } from "./BrandsFilter";
import { FutureOpeningsFilter } from "./FutureOpeningsFilter";
import { NumberHotelsCount } from "./NumberHotelsCount";
import { YearFilter } from "./YearFilter";
import styles from "./Filter.css";
import NewWindow from "react-new-window";
import { FilterSortWindow } from "./FilterSortWindow";
import FilterContext, { FilterContextProvider } from "./context/FilterContext";
import { HotelsFilter } from "./HotelsFilter";
import { StatusLegend } from "./StatusLegend";
import { ColorLegend } from "./ColorLegend";
import { AcceptanceFilter } from "./AcceptanceFilter";
import { ManagedFranchisedFilter } from "./ManagedFranchisedFilter";
import { AccountFilter } from "./AccountFilter";
import { ProfileFilter } from "./ProfileFilter";
import { Filterexceldateformat } from "./Filterexceldateformat";
import { Filterhotelprofile } from "./Filterhotelprofile";
import { HighlightedHotel } from "./HighlightedHotel";
import { EmailMeReport } from "./EmailMeReport";
import Settings from "../../static/Settings";
import { PgoosTypeFilter } from "./PgoosTypeFilter";
import { ReportFilter } from "./ReportFilter";
import Utils from "../../utils/Utils";

import commonStyle from "../../assets/css/commonBase.css";
import btnSearchSmall from "../../assets/img/btnSearchSmall.gif";
import btnNew from "../../assets/img/new.gif";
import { DueDate } from "./DueDate";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import { update } from "lodash";

export const FilterLeftPanel: React.FC<any> = (props: any) => {
  const session_payload = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_newaccounts =
    session_payload !== undefined && session_payload !== false
      ? session_payload?.newAccountsOnly
      : false;
  const session_subset =
    session_payload !== undefined && session_payload !== false
      ? session_payload?.subset
      : "";
  const session_orderby =
    session_payload !== undefined && session_payload !== false
      ? session_payload?.orderby
      : "";
  const session_allHotels =
    session_payload !== undefined &&
    session_payload !== false &&
    session_payload !== null
      ? session_payload?.allHotels
      : "ALL";
  const session_filter_hotels =
    session_payload !== undefined &&
    session_payload !== false &&
    session_payload !== null
      ? session_payload?.FILTER
      : "";
  const session_filtervalue =
    session_payload !== undefined && session_payload !== false
      ? session_payload?.filterString
      : "";

  const context = useContext(FilterContext);

  const [openWindow, setOpenWindow] = useState(false);
  const [onLoadRunReport, setonLoadRunReport] = useState(true);
  const [hotelsValue, setHotelsValue] = useState({
    allHotels: "",
    filterString: "",
    FILTER: "",
  });
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const handleSortFilter = (closeopen) => {
    setOpenWindow(closeopen);
  };
  const showOptions = props.showOptions?.pfo?.showOptions;
  // @ts-ignore
  const showRequiredOptions = props.showOptions?.pfo?.requiredOptions;

  useEffect(() => {
    setHotelsValue({
      ...hotelsValue,
      allHotels: session_allHotels,
      FILTER: session_filter_hotels,
    });
  }, []);

  useEffect(() => {
    if (props?.componentName == "portfolioRebid") {
      props.getAccountStatus(context.accountStatus);
    }
  }, [context.accountStatus]);

  useEffect(() => {
    if (showOptions?.showAccountFilter || props.isUpdateMultiple) {
      //Below are common API's on Search Left Panel
      context.getFilterViewListsData(props.isUpdateMultiple);
      context.getRegionsData();
      context.getCountriesData();
      showOptions?.showEdieProfileFilter && context.getEdieProfileList();
      showOptions?.showEdieProfileFilter && context.getEdieHotelProfiles();

      //Uncomment below line if you are using real API
      (showOptions?.showAccountFilter || props.isUpdateMultiple) &&
        context.getAccountSegment();
      (showOptions?.showAccountFilter || props.isUpdateMultiple) &&
        context.getAccountSubsets();
    }
  }, [showOptions?.showAccountFilter]);

  useEffect(() => {
    if (props.componentName == "hotelPGOOSMaintenance") {
      //Below are common API's on Search Left Panel
      context.getFilterViewListsData(props.isUpdateMultiple);
      context.getRegionsData();
      context.getCountriesData();
      showOptions?.showEdieProfileFilter && context.getEdieProfileList();
      showOptions?.showEdieProfileFilter && context.getEdieHotelProfiles();

      //Uncomment below line if you are using real API
      (showOptions?.showAccountFilter || props.isUpdateMultiple) &&
        context.getAccountSegment();
      (showOptions?.showAccountFilter || props.isUpdateMultiple) &&
        context.getAccountSubsets();
    }
  }, [props.componentName]);

  useEffect(() => {
    localStorage.setItem("loadReport", "true");
    localStorage.setItem("isDisabledRetrieve", "true");
    if (props.componentName === "PgoosPropagation") {
      props.deleteAPIUpdate(
        context.requestPayload,
        { deleteMCB: "Y", pgoosType: "R" },
        true
      );
    }
  }, []);

  useEffect(() => {
    if (context.requestPayload) {
      localStorage.setItem(
        "gridPaneldata",
        JSON.stringify(context.requestPayload)
      );
    }
  }, [context.requestPayload]);

  const setRunReport = () => {
    setonLoadRunReport(false);
    localStorage.setItem("loadReport", "false");
    localStorage.setItem("isDisabledRetrieve", "false");

    if (props.componentName === "requestReport")
      props.EdieRunReport(context.isDataChange, context.requestPayload);
    else props.EdieRunReport(context.requestPayload);
  };

  const check_accountregion = () => {
    let stringbrand = "";

    if (
      props.componentName === "requestReport" &&
      context.reportDetails !== "" &&
      context.reportDetails[0]
    ) {
      const req_account_or_region = Utils.stringToBoolean(
        context.reportDetails[0].req_acct_or_region
      );
      const req_account_region_brand = Utils.stringToBoolean(
        context.reportDetails[0].req_acct_region_brand
      );

      if (req_account_or_region || req_account_region_brand) {
        let bHasAccount = true;
        let regionid;
        if (
          context.requestPayload?.strFilterValues?.accountFilter
            ?.accountrecid === null ||
          context.requestPayload?.strFilterValues?.accountFilter
            ?.accountrecid === "" ||
          parseInt(
            context.requestPayload?.strFilterValues?.accountFilter?.accountrecid
          ) === 0
        ) {
          bHasAccount = false;
        }
        if (
          context.requestPayload?.strFilterValues?.areaFilter?.areaOrRegion !=
            "" ||
          context.requestPayload?.strFilterValues?.areaFilter?.areaOrRegion !==
            null
        ) {
          if (
            context.requestPayload?.strFilterValues?.areaFilter
              ?.areaOrRegion === "R"
          )
            regionid =
              context.requestPayload?.strFilterValues?.areaFilter?.regionid;
        }
        if (regionid === "" || regionid === undefined) regionid = 0;
        if (!bHasAccount) {
          if (req_account_region_brand) {
            if (parseInt(regionid) === 0) {
              const brandControls = context.filterViewLists?.brandlist;
              if (brandControls.length > 0) {
                for (let i = 0; i < brandControls.length; i++) {
                  const node = brandControls[i];
                  if (stringbrand != "") {
                    stringbrand += ",";
                  }
                  stringbrand += node;
                }
              }
              if (context.filterViewLists?.brandlist.length === 0) {
                alert("Please select at least one brand.");
                return false;
              }
            }
            if (
              parseInt(regionid) === 0 &&
              (stringbrand === null || stringbrand === "")
            ) {
              alert("Please select an account, region or brand.");
              return false;
            }
          } else {
            if (parseInt(regionid) == 0) {
              alert("Please select an account or region.");
              return false;
            } else if (parseInt(regionid) < 3) {
              alert(
                "Please select a region other than United States or International."
              );
              return false;
            }
          }
        }
      }
    }

    return true;
  };
  const resettingEvents = () => {
    context.setupdateMutipleRequestInitialChangeEvents({
      ...context.updateMutipleRequestEvents,
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
    });
  };
  const searchClick = () => {
    const updateMutipleRequestEvents = {
      ...context.updateMutipleRequestEvents,
    };
    //Intial call when session storage empty
    if (session_payload === null || session_payload === false) {
      if (
        context.requestPayload?.strFilterValues?.accountFilter?.accountrecid ===
          null ||
        context.requestPayload?.strFilterValues?.accountFilter?.accountrecid ===
          "" ||
        parseInt(
          context.requestPayload?.strFilterValues?.accountFilter?.accountrecid
        ) === 0
      ) {
        alert("Please select an account.");
      } else {
        if (
          session_payload?.filterString !== "" &&
          session_payload?.filterString !== null &&
          session_payload?.filterString !== undefined
        ) {
          context.updateMutipleRequestPayload.filterString =
            session_payload?.filterString;
          context.updateMutipleRequestPayload.allHotels = "";
        }
        props.searchUpdateTableData(
          Object.assign(
            context.requestPayload,
            context.updateMutipleRequestPayload
          ),
          1
        );
        resettingEvents();
      }
    }
    //Session is not empty and none of the evenets was filred on page
    else if (
      session_payload !== null &&
      session_payload !== false &&
      !updateMutipleRequestEvents.yearChangeEvent &&
      !updateMutipleRequestEvents.accountStatusChangeEvent &&
      !updateMutipleRequestEvents.newAccountsChangeEvent &&
      !updateMutipleRequestEvents.dueDateChangeEvent &&
      !updateMutipleRequestEvents.segmentChange &&
      !updateMutipleRequestEvents.accountChangeEvent &&
      !updateMutipleRequestEvents.subsetChangedEvent &&
      !updateMutipleRequestEvents.sortByChangeEvent &&
      updateMutipleRequestEvents.hotelsChangeEvent === null &&
      !updateMutipleRequestEvents.filterStringChangeEvent &&
      updateMutipleRequestEvents.areaOrRegionChangeEvent === null &&
      !updateMutipleRequestEvents.areFilterCountryChnageEvent &&
      !updateMutipleRequestEvents.areFilterStateChnageEvent &&
      !updateMutipleRequestEvents.areFilterCityChnageEvent
    ) {
      if (
        session_payload?.strFilterValues?.accountFilter?.accountrecid ===
          null ||
        session_payload?.strFilterValues?.accountFilter?.accountrecid === "" ||
        parseInt(
          session_payload?.strFilterValues?.accountFilter?.accountrecid
        ) === 0
      ) {
        alert("Please select an account.");
      } else {
        if (
          session_payload?.filterString !== "" &&
          session_payload?.filterString !== null &&
          session_payload?.filterString !== undefined
        ) {
          context.updateMutipleRequestPayload.filterString =
            session_payload?.filterString;
          context.updateMutipleRequestPayload.allHotels = "";
        }
        props.searchUpdateTableData(
          Object.assign(session_payload, context.updateMutipleRequestPayload),
          1
        );
        resettingEvents();
      }
    } else if (
      updateMutipleRequestEvents.yearChangeEvent ||
      updateMutipleRequestEvents.accountStatusChangeEvent ||
      updateMutipleRequestEvents.newAccountsChangeEvent ||
      updateMutipleRequestEvents.dueDateChangeEvent ||
      updateMutipleRequestEvents.segmentChange ||
      updateMutipleRequestEvents.accountChangeEvent ||
      updateMutipleRequestEvents.subsetChangedEvent ||
      updateMutipleRequestEvents.sortByChangeEvent ||
      updateMutipleRequestEvents.hotelsChangeEvent !== null ||
      updateMutipleRequestEvents.filterStringChangeEvent ||
      updateMutipleRequestEvents.areaOrRegionChangeEvent !== null ||
      updateMutipleRequestEvents.areFilterCountryChnageEvent ||
      updateMutipleRequestEvents.areFilterStateChnageEvent ||
      updateMutipleRequestEvents.areFilterCityChnageEvent
    ) {
      //Call when onChange event occurs on page if session exist also
      const finalPayload = context.requestPayload;
      finalPayload.strFilterValues.year =
        updateMutipleRequestEvents.yearChangeEvent
          ? finalPayload.strFilterValues.year
          : session_payload.strFilterValues.year;
      finalPayload.strFilterValues.accountFilter.accountstatus =
        updateMutipleRequestEvents.accountStatusChangeEvent
          ? finalPayload.strFilterValues.accountFilter.accountstatus
          : session_payload.strFilterValues.accountFilter.accountstatus;
      finalPayload.newAccountsOnly =
        updateMutipleRequestEvents.newAccountsChangeEvent
          ? finalPayload.newAccountsOnly
          : session_payload.newAccountsOnly;
      finalPayload.dueDateText =
        updateMutipleRequestEvents.yearChangeEvent ||
        updateMutipleRequestEvents.dueDateChangeEvent
          ? finalPayload.dueDateText
          : session_payload.dueDateText;
      finalPayload.searchdueDate =
        updateMutipleRequestEvents.yearChangeEvent ||
        updateMutipleRequestEvents.dueDateChangeEvent
          ? finalPayload.searchdueDate
          : session_payload.searchdueDate;
      finalPayload.strFilterValues.accountFilter.accountType =
        updateMutipleRequestEvents.segmentChange
          ? finalPayload.strFilterValues.accountFilter.accountType
          : session_payload.strFilterValues.accountFilter.accountType;
      finalPayload.strFilterValues.accountFilter.accountrecid =
        updateMutipleRequestEvents.yearChangeEvent ||
        updateMutipleRequestEvents.dueDateChangeEvent ||
        updateMutipleRequestEvents.segmentChange ||
        updateMutipleRequestEvents.accountChangeEvent
          ? finalPayload.strFilterValues.accountFilter.accountrecid
          : session_payload.strFilterValues.accountFilter.accountrecid;
      finalPayload.orderby = updateMutipleRequestEvents.sortByChangeEvent
        ? finalPayload.orderby
        : session_payload.orderby;
      finalPayload.allHotels =
        updateMutipleRequestEvents.hotelsChangeEvent === "ALL"
          ? "ALL"
          : updateMutipleRequestEvents.hotelsChangeEvent === "FILTER"
          ? ""
          : session_payload.allHotels;
      finalPayload.FILTER =
        updateMutipleRequestEvents.hotelsChangeEvent === "FILTER"
          ? "FILTER"
          : updateMutipleRequestEvents.hotelsChangeEvent === "ALL"
          ? ""
          : session_payload.allHotels === "ALL"
          ? ""
          : session_payload.FILTER;
      finalPayload.areaFilter =
        updateMutipleRequestEvents.areaOrRegionChangeEvent !== null ||
        updateMutipleRequestEvents.areFilterCountryChnageEvent ||
        updateMutipleRequestEvents.areFilterStateChnageEvent ||
        updateMutipleRequestEvents.areFilterCityChnageEvent
          ? finalPayload.strFilterValues.areaFilter
          : session_payload.strFilterValues.areaFilter;
      if (
        context.requestPayload?.strFilterValues?.accountFilter?.accountrecid ===
          null ||
        context.requestPayload?.strFilterValues?.accountFilter?.accountrecid ===
          "" ||
        parseInt(
          context.requestPayload?.strFilterValues?.accountFilter?.accountrecid
        ) === 0
      ) {
        alert("Please select an account.");
      } else {
        context.updateMutipleRequestPayload.dueDateText =
          updateMutipleRequestEvents.yearChangeEvent ||
          updateMutipleRequestEvents.dueDateChangeEvent
            ? finalPayload.dueDateText
            : session_payload.dueDateText;
        context.updateMutipleRequestPayload.filterString =
          updateMutipleRequestEvents.filterStringChangeEvent
            ? context.updateMutipleRequestPayload.filterString
            : updateMutipleRequestEvents.hotelsChangeEvent === "ALL"
            ? ""
            : session_payload.filterString;
        context.updateMutipleRequestPayload.allHotels =
          updateMutipleRequestEvents.hotelsChangeEvent === "ALL"
            ? "ALL"
            : updateMutipleRequestEvents.hotelsChangeEvent === "FILTER"
            ? ""
            : session_payload.allHotels;
        context.updateMutipleRequestPayload.FILTER =
          updateMutipleRequestEvents.hotelsChangeEvent === "FILTER"
            ? "FILTER"
            : updateMutipleRequestEvents.hotelsChangeEvent === "ALL"
            ? ""
            : session_payload.FILTER;
        context.updateMutipleRequestPayload.subset =
          updateMutipleRequestEvents.subsetChangedEvent
            ? context.updateMutipleRequestPayload.subset
            : session_payload.subset;
        context.updateMutipleRequestPayload.brandlist =
          updateMutipleRequestEvents.brandFilterChange
            ? context.updateMutipleRequestPayload.brandlist
            : session_payload.brandlist;
        props.searchUpdateTableData(
          Object.assign(finalPayload, context.updateMutipleRequestPayload),
          1
        );
        resettingEvents();
      }
    }
  };
  return (
    <FilterContextProvider>
      {openWindow && (
        <NewWindow
          features={{ left: 800, top: 200, width: 435, height: 130 }}
          onUnload={() => setOpenWindow(false)}
          title="[MarRFP]"
        >
          <FilterSortWindow
            {...props}
            handleSortFilter={handleSortFilter}
            filterContext={context}
          />
        </NewWindow>
      )}
      {props?.isUpdateMultiple ? (
        <>
          <div id="search_wrapper" style={{ display: "block" }}>
            <div className="search_form" id="search_form">
              <div className={commonStyle.search_column}>
                <div className={commonStyle.search_portion}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <table className={commonStyle.zeroHeight}>
                            <tbody>
                              <tr>
                                <td>
                                  <YearFilter
                                    {...props}
                                    filterContext={context}
                                  />
                                </td>
                              </tr>
                              <tr style={{ marginLeft: 0 }}>
                                <td>
                                  <tr>
                                    <td>
                                      <AccountFilter
                                        {...props}
                                        filterContext={context}
                                        showAccountFlags={true}
                                        isShowAccountOnly={false}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div
                                        id="accountdiv"
                                        style={{ display: "block" }}
                                      >
                                        <table
                                          className={commonStyle.borderless}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                className={` ${commonStyle.field_Name} ${commonStyle.nowrrapCell}`}
                                                colSpan={2}
                                              >
                                                <input
                                                  type="checkbox"
                                                  id="mhacsearch.newAccountsOnly"
                                                  name="mhacsearch.newAccountsOnly"
                                                  checked={
                                                    props.isUpdateMultiple &&
                                                    context
                                                      ?.updateMutipleRequestEvents
                                                      ?.newAccountsChangeEvent
                                                      ? context
                                                          ?.updateMutipleRequestPayload
                                                          ?.newAccountsOnly
                                                      : session_newaccounts
                                                  }
                                                  onChange={(event) => {
                                                    props.isUpdateMultiple &&
                                                      context.setupdateMutipleRequestInitialChangeEvents(
                                                        {
                                                          ...context.updateMutipleRequestEvents,
                                                          newAccountsChangeEvent:
                                                            true,
                                                        }
                                                      );
                                                    context.setupdateMutipleRequestInitalPayload(
                                                      {
                                                        ...context.updateMutipleRequestPayload,
                                                        newAccountsOnly:
                                                          event.target.checked,
                                                      }
                                                    );
                                                    context.onIsShowAccountOnly(
                                                      event.target.checked
                                                        ? "Y"
                                                        : ""
                                                    );
                                                  }}
                                                />{" "}
                                                Show <img src={btnNew} />
                                                Accounts Only
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                marginBottom: -6,
                                                marginLeft: 2,
                                              }}
                                            >
                                              <DueDate
                                                {...props}
                                                filterContext={context}
                                              />
                                            </tr>

                                            <tr>
                                              <td>
                                                <AccountFilter
                                                  {...props}
                                                  filterContext={context}
                                                  showAccountFlags={false}
                                                  isShowAccountOnly={true}
                                                />
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                marginTop: -6.5,
                                                marginLeft: 2,
                                              }}
                                            >
                                              {!props.isHotelUser && (
                                                <td>
                                                  <td
                                                    className={`${commonStyle.field_Name} ${commonStyle.width55px}`}
                                                  >
                                                    Subset:
                                                  </td>
                                                  <td
                                                    className={
                                                      commonStyle.FilterFieldName
                                                    }
                                                    id="accountsubsetselect"
                                                  >
                                                    {props.isUpdateMultiple ? (
                                                      <select
                                                        name="mhacsearch.subset"
                                                        id="mhacsearch.subset"
                                                        className={
                                                          commonStyle.FilterSelect
                                                        }
                                                        style={{
                                                          height: 20,
                                                          width: 218,
                                                        }}
                                                        value={
                                                          props.isUpdateMultiple &&
                                                          context
                                                            ?.updateMutipleRequestEvents
                                                            ?.subsetChangedEvent
                                                            ? context
                                                                ?.updateMutipleRequestPayload
                                                                ?.subset
                                                            : session_subset
                                                        }
                                                        onChange={(event) => {
                                                          context.setupdateMutipleRequestInitialChangeEvents(
                                                            {
                                                              ...context.updateMutipleRequestEvents,
                                                              subsetChangedEvent:
                                                                true,
                                                            }
                                                          );
                                                          context.setupdateMutipleRequestInitalPayload(
                                                            {
                                                              ...context.updateMutipleRequestPayload,
                                                              subset:
                                                                event.target
                                                                  .value,
                                                            }
                                                          );
                                                        }}
                                                      >
                                                        <option value="">
                                                          *
                                                        </option>
                                                        {context.accountSubsets?.map(
                                                          (item, key) => {
                                                            return (
                                                              <option
                                                                key={key}
                                                                value={
                                                                  item.regionid
                                                                }
                                                              >
                                                                {
                                                                  item.regionname
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    ) : (
                                                      <select
                                                        name="mhacsearch.subset"
                                                        id="mhacsearch.subset"
                                                        className={
                                                          commonStyle.FilterSelect
                                                        }
                                                        style={{
                                                          height: 20,
                                                          width: 218,
                                                        }}
                                                        onChange={(event) => {
                                                          context.setupdateMutipleRequestInitalPayload(
                                                            {
                                                              ...context.updateMutipleRequestPayload,

                                                              subset:
                                                                event.target
                                                                  .value,
                                                            }
                                                          );
                                                        }}
                                                      >
                                                        <option value="">
                                                          *
                                                        </option>
                                                        {context.accountSubsets?.map(
                                                          (item, key) => {
                                                            return (
                                                              <option
                                                                key={key}
                                                                value={
                                                                  item.regionid
                                                                }
                                                              >
                                                                {
                                                                  item.regionname
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    )}
                                                  </td>
                                                </td>
                                              )}
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div id="accountinfo"></div>
                          <div className={commonStyle.search_portion}>
                            <table className={commonStyle.zeroHeight}>
                              <tbody>
                                <tr>
                                  <td>
                                    <table className={commonStyle.zeroHeight}>
                                      <tbody>
                                        <tr style={{ marginLeft: 5 }}>
                                          <td>
                                            <td className="filtertitle">
                                              Sort by:
                                            </td>
                                            <td
                                              className={
                                                commonStyle.FilterFieldName
                                              }
                                            >
                                              <select
                                                id="orderby.orderby"
                                                name="orderby.orderby"
                                                onChange={(event) => {
                                                  props.isUpdateMultiple &&
                                                    context.setupdateMutipleRequestInitialChangeEvents(
                                                      {
                                                        ...context.updateMutipleRequestEvents,
                                                        sortByChangeEvent: true,
                                                      }
                                                    );
                                                  context.setupdateMutipleRequestInitalPayload(
                                                    {
                                                      ...context.updateMutipleRequestPayload,

                                                      orderby:
                                                        event.target.value,
                                                    }
                                                  );
                                                }}
                                                value={
                                                  props.isUpdateMultiple &&
                                                  context
                                                    ?.updateMutipleRequestEvents
                                                    ?.sortByChangeEvent
                                                    ? context
                                                        ?.updateMutipleRequestPayload
                                                        ?.orderby
                                                    : session_orderby
                                                }
                                              >
                                                <option value={1}>
                                                  {" "}
                                                  Hotel
                                                </option>
                                                <option value={4}>
                                                  Best &amp; Final Submission
                                                </option>
                                                <option value={5}>
                                                  Pricing Products
                                                </option>
                                                <option value={6}>
                                                  Completion Status
                                                </option>
                                                <option value={7}>
                                                  Account Status
                                                </option>
                                                <option value={8}>
                                                  Rebid Status
                                                </option>
                                              </select>
                                            </td>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr style={{ marginLeft: 5 }}>
                                  <td>
                                    <tr>
                                      <td className={commonStyle.field_Name}>
                                        <input
                                          type="radio"
                                          className={styles.margin3}
                                          name="r_1"
                                          id="r_1"
                                          value={"ALL"}
                                          checked={
                                            props.isUpdateMultiple &&
                                            context?.updateMutipleRequestEvents
                                              ?.hotelsChangeEvent === "ALL"
                                              ? hotelsValue?.allHotels === "ALL"
                                              : context
                                                  ?.updateMutipleRequestEvents
                                                  ?.hotelsChangeEvent ===
                                                "FILTER"
                                              ? false
                                              : session_allHotels === "ALL"
                                          }
                                          onChange={(event) => {
                                            props.isUpdateMultiple &&
                                              context.setupdateMutipleRequestInitialChangeEvents(
                                                {
                                                  ...context.updateMutipleRequestEvents,
                                                  hotelsChangeEvent: "ALL",
                                                }
                                              );
                                            props.isUpdateMultiple &&
                                              setHotelsValue({
                                                ...hotelsValue,
                                                allHotels: event.target.value,
                                                FILTER: "",
                                              });
                                            context.setupdateMutipleRequestInitalPayload(
                                              {
                                                ...context.updateMutipleRequestPayload,
                                                allHotels: event.target.value,
                                                filterString: "",
                                                FILTER: "",
                                              }
                                            );
                                          }}
                                        />
                                        Show ALL Hotels
                                      </td>
                                    </tr>
                                    <tr>
                                      {" "}
                                      <td className={commonStyle.field_Name}>
                                        <form autoComplete="off">
                                          <input
                                            type="radio"
                                            className={styles.margin3}
                                            name="r_1"
                                            id="r_1"
                                            value="FILTER"
                                            checked={
                                              props.isUpdateMultiple &&
                                              context
                                                ?.updateMutipleRequestEvents
                                                ?.hotelsChangeEvent === "FILTER"
                                                ? hotelsValue?.FILTER ===
                                                  "FILTER"
                                                : context
                                                    ?.updateMutipleRequestEvents
                                                    ?.hotelsChangeEvent ===
                                                  "ALL"
                                                ? false
                                                : session_filter_hotels ===
                                                  "FILTER"
                                            }
                                            onChange={(event) => {
                                              props.isUpdateMultiple &&
                                                context.setupdateMutipleRequestInitialChangeEvents(
                                                  {
                                                    ...context.updateMutipleRequestEvents,
                                                    hotelsChangeEvent: "FILTER",
                                                    filterStringChangeEvent:
                                                      true,
                                                  }
                                                );
                                              props.isUpdateMultiple &&
                                                setHotelsValue({
                                                  ...hotelsValue,
                                                  allHotels: "",
                                                  FILTER: event.target.value,
                                                });
                                              context.setupdateMutipleRequestInitalPayload(
                                                {
                                                  ...context.updateMutipleRequestPayload,
                                                  allHotels: "",
                                                  filterString: "",
                                                  FILTER: event.target.value,
                                                }
                                              );
                                            }}
                                          />
                                          Show Hotels starting with:{" "}
                                          <div style={{ display: "none" }}>
                                            <input
                                              id="filterString"
                                              type="password"
                                            />
                                          </div>
                                          <span>
                                            <input
                                              autoComplete="auto-off"
                                              maxLength={5}
                                              className={"hotelstartingwith"}
                                              value={
                                                props.isUpdateMultiple &&
                                                context
                                                  ?.updateMutipleRequestEvents
                                                  ?.hotelsChangeEvent ===
                                                  "FILTER" &&
                                                context
                                                  ?.updateMutipleRequestEvents
                                                  ?.filterStringChangeEvent
                                                  ? context
                                                      ?.updateMutipleRequestPayload
                                                      ?.filterString
                                                  : context
                                                      ?.updateMutipleRequestEvents
                                                      ?.hotelsChangeEvent ===
                                                    "ALL"
                                                  ? ""
                                                  : session_filtervalue
                                              }
                                              onChange={(event) => {
                                                props.isUpdateMultiple &&
                                                  context.setupdateMutipleRequestInitialChangeEvents(
                                                    {
                                                      ...context.updateMutipleRequestEvents,
                                                      filterStringChangeEvent:
                                                        true,
                                                      hotelsChangeEvent:
                                                        "FILTER",
                                                    }
                                                  );
                                                props.isUpdateMultiple &&
                                                  setHotelsValue({
                                                    ...hotelsValue,
                                                    allHotels: "",
                                                    FILTER: "FILTER",
                                                  });
                                                context.setupdateMutipleRequestInitalPayload(
                                                  {
                                                    ...context.updateMutipleRequestPayload,
                                                    allHotels: "",
                                                    filterString:
                                                      event.target.value,
                                                    FILTER: "FILTER",
                                                  }
                                                );
                                              }}
                                            />
                                          </span>
                                          <input
                                            type="password"
                                            id="prevent_autofill"
                                            autoComplete="off"
                                            style={{ display: "none" }}
                                            tabIndex={-1}
                                          />
                                        </form>
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                        <td>
                          <div className={commonStyle.search_column2}>
                            <div className={commonStyle.search_portion}>
                              <AreaFilter {...props} filterContext={context} />
                            </div>
                            <div className={commonStyle.search_portion}>
                              <BrandsFilter
                                {...props}
                                filterContext={context}
                              />
                            </div>
                            <div>
                              <div
                                className={commonStyle.search_button}
                                style={{ marginRight: 7 }}
                              >
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <img
                                          onClick={() => {
                                            searchClick();
                                          }}
                                          src={btnSearchSmall}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <td>
          <tr>
            {/*// Page Content //*/}
            <td>
              <table className={styles.fullHeight}>
                <tbody>
                  <tr>
                    <td>
                      <table className={styles.fullHeight}>
                        <tbody>
                          <tr>
                            <td align="center">
                              <table
                                style={{
                                  borderWidth: 0,
                                  width: "100%",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        width: "50%",
                                        paddingTop: "3px",
                                      }}
                                      width="50%"
                                      align="center"
                                    >
                                      <input
                                        id="dataChanged"
                                        type="hidden"
                                        value={context.isDataChange}
                                      />
                                      <input
                                        type="button"
                                        id={
                                          context.isDataChange
                                            ? styles.retrievebtn
                                            : styles.blueButton
                                        }
                                        disabled={
                                          localStorage.getItem(
                                            "isDisabledRetrieve"
                                          ) === "false"
                                        }
                                        defaultValue=" "
                                        className={styles.btnSubmit}
                                        onClick={() => {
                                          if (!check_accountregion()) {
                                          } else if (
                                            showOptions?.showAccountFilter &&
                                            (showRequiredOptions?.accountRequired ||
                                              context.isAccReq) &&
                                            (context.requestPayload
                                              ?.strFilterValues?.accountFilter
                                              ?.accountrecid === null ||
                                              parseInt(
                                                context.requestPayload
                                                  ?.strFilterValues
                                                  ?.accountFilter?.accountrecid
                                              ) === 0 ||
                                              context.requestPayload
                                                ?.strFilterValues?.accountFilter
                                                ?.accountrecid === "")
                                          ) {
                                            alert("Please select an account.");
                                          } else if (
                                            showOptions?.showManagedFranchised &&
                                            !context.requestPayload
                                              .strFilterValues.franchised &&
                                            !context.requestPayload
                                              .strFilterValues.managed
                                          ) {
                                            alert(
                                              "Please select managed and/or franchised."
                                            );
                                          } else if (
                                            showOptions?.showEdieProfileFilter &&
                                            context.requestPayload
                                              .strFilterValues.edieProfile == 0
                                          ) {
                                            alert("Please select a profile.");
                                          } else if (
                                            showOptions?.showReportList &&
                                            context.requestPayload
                                              .strFilterValues.report === ""
                                          ) {
                                            alert("Please select a Report.");
                                          } else if (
                                            context.isShowSpecRtpgm &&
                                            context.requestPayload
                                              .strFilterValues.stringRPGMList
                                              .length === 0
                                          ) {
                                            alert(
                                              "Please select at least one rate program."
                                            );
                                          } else if (
                                            showOptions?.showAccountSubset2 &&
                                            context.requestPayload
                                              .strFilterValues.accountFilter
                                              .subset === ""
                                          ) {
                                            alert("Please select subset A.");
                                          } else if (
                                            showOptions?.showAccountSubset2 &&
                                            context.requestPayload
                                              .strFilterValues.accountFilter
                                              .subset2 === ""
                                          ) {
                                            alert("Please select subset B.");
                                          } else if (
                                            showOptions?.showAccountSubset2 &&
                                            context.requestPayload
                                              .strFilterValues.accountFilter
                                              .subset ===
                                              context.requestPayload
                                                .strFilterValues.accountFilter
                                                .subset2
                                          ) {
                                            alert(
                                              "Please select different subsets for subset A and B."
                                            );
                                          } else {
                                            props.getPanelData(
                                              context.requestPayload
                                              // context.selectedAccountDetails()
                                            );
                                            context.setIsDataChange(false);
                                            appContext.setTableRefersh(true);
                                          }
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td></td>
                          </tr>
                          <tr id="filterTR">
                            <td
                              style={{
                                verticalAlign: "top",
                                display: "block",
                              }}
                              width={300}
                              height="100%"
                            >
                              <div
                                id="filterdiv"
                                className={
                                  props.componentName === "requestEdie"
                                    ? styles.overflowAuto
                                    : ""
                                }
                                style={{
                                  width: "300px",
                                  height: props.height || 470,
                                }}
                              >
                                <table
                                  style={{
                                    borderRight:
                                      "3px solid rgba(128, 128, 128, 0.7)",
                                    width: "100%",
                                    height: "100%",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          width: "100%",
                                          verticalAlign: "top",
                                        }}
                                        className={styles.FilterName}
                                        width="100%"
                                      >
                                        <table
                                          style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  borderTop: "thin groove",
                                                }}
                                              >
                                                <NumberHotelsCount
                                                  {...props}
                                                  filterContext={context}
                                                />
                                              </td>
                                            </tr>

                                            {showOptions?.showReportList && (
                                              <tr>
                                                <td
                                                  style={{
                                                    borderTop: "thin groove",
                                                  }}
                                                >
                                                  <ReportFilter
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </td>
                                              </tr>
                                            )}

                                            {showOptions?.showPgoosFilter && (
                                              <tr>
                                                <td
                                                  style={{
                                                    borderTop: "thin groove",
                                                  }}
                                                >
                                                  <PgoosTypeFilter
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </td>
                                              </tr>
                                            )}

                                            <tr>
                                              <td>
                                                <div
                                                  id="dateRange"
                                                  style={{
                                                    borderTop: "thin groove",
                                                    display: "none",
                                                  }}
                                                >
                                                  <table
                                                    className={
                                                      styles.zeroHeight
                                                    }
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={`${styles.field_Name}, ${styles.Cell}`}
                                                        >
                                                          Date Range
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.Cell
                                                          }
                                                        >
                                                          <table
                                                            className={
                                                              styles.field_Name
                                                            }
                                                            style={{
                                                              width: "100%",
                                                              borderBottom:
                                                                "2px",
                                                            }}
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.field_Name
                                                                  }
                                                                >
                                                                  From:{" "}
                                                                  <input
                                                                    className={
                                                                      styles.FilterSelect
                                                                    }
                                                                    id="filterValues.dateRangeFilter.strFromDate"
                                                                    name="filterValues.dateRangeFilter.strFromDate"
                                                                    style={{
                                                                      height:
                                                                        "22px",
                                                                      width:
                                                                        "85px",
                                                                    }}
                                                                  />
                                                                </td>
                                                                <td
                                                                  className={
                                                                    styles.field_Name
                                                                  }
                                                                >
                                                                  <input
                                                                    className={
                                                                      styles.FilterSelect
                                                                    }
                                                                    id="filterValues.dateRangeFilter.strToDate"
                                                                    name="filterValues.dateRangeFilter.strToDate"
                                                                    style={{
                                                                      height:
                                                                        "22px",
                                                                      width:
                                                                        "85px",
                                                                    }}
                                                                  />
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </td>
                                            </tr>
                                            {showOptions?.showSolicitSelectionFilter && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="yearFilter"
                                                    style={{
                                                      borderTop: "thin groove",
                                                      display: "block",
                                                    }}
                                                  >
                                                    <HotelsFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                            {(props.componentName ===
                                              "hotelSolicitation" ||
                                              props.componentName ===
                                                "PgoosPropagation" ||
                                              props.componentName ===
                                                "PortfolioAcceptance") && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="yearFilter"
                                                    style={{
                                                      borderTop: "thin groove",
                                                      display: "block",
                                                    }}
                                                  >
                                                    <AcceptanceFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}

                                            {showOptions?.showEdieProfileFilter && (
                                              <tr>
                                                <td>
                                                  <div
                                                    style={{
                                                      borderTop: "thin groove",
                                                    }}
                                                  >
                                                    <ProfileFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}

                                            {/* {showRequiredOptions?.yearRequired && ( */}
                                            <tr>
                                              <td>
                                                <div
                                                  id="yearFilter"
                                                  style={{
                                                    borderTop: "thin groove",
                                                  }}
                                                >
                                                  <YearFilter
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                            {/* )} */}

                                            {showOptions?.showAccountFilter && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="accountFilter"
                                                    style={{
                                                      display: "block",
                                                    }}
                                                  >
                                                    <AccountFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}

                                            {showOptions?.showAreaFilter && (
                                              <tr>
                                                <td
                                                  style={{
                                                    borderTop: "thin groove",
                                                    paddingBottom: "5px",
                                                    paddingTop: "5px",
                                                  }}
                                                >
                                                  <AreaFilter
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showBrandFilter && (
                                              <BrandsFilter
                                                {...props}
                                                filterContext={context}
                                              />
                                            )}
                                            {showOptions?.showDateFormat && (
                                              <tr>
                                                <td
                                                  style={{
                                                    borderTop: "thin groove",
                                                  }}
                                                >
                                                  <Filterexceldateformat
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showHotelProfile && (
                                              <tr>
                                                <td
                                                  style={{
                                                    borderTop: "thin groove",
                                                  }}
                                                >
                                                  <Filterhotelprofile
                                                    {...props}
                                                    filterContext={context}
                                                  />
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showManagedFranchised && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="futureOpening"
                                                    style={{
                                                      borderTop: "thin groove",
                                                      paddingTop: "5px",
                                                      paddingBottom: "5px",
                                                    }}
                                                  >
                                                    <ManagedFranchisedFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showFutureOpenings && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="futureOpening"
                                                    style={{
                                                      borderTop: "thin groove",
                                                    }}
                                                  >
                                                    <FutureOpeningsFilter
                                                      {...props}
                                                      filterContext={context}
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                            <tr>
                                              <td>
                                                <div
                                                  id="schedule"
                                                  style={{
                                                    borderTop: "thin groove",
                                                    display: "none",
                                                  }}
                                                >
                                                  <table
                                                    className={
                                                      styles.zeroHeight
                                                    }
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td>
                                                          <table
                                                            className={
                                                              styles.zeroHeight
                                                            }
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.field_Name
                                                                  }
                                                                >
                                                                  Schedule
                                                                </td>
                                                                <td>
                                                                  <input
                                                                    id="filterValues.scheduleReport"
                                                                    name="filterValues.scheduleReport"
                                                                    type="radio"
                                                                    defaultValue="N"
                                                                    defaultChecked
                                                                  />
                                                                  Run Now
                                                                </td>
                                                                <td width={5}>
                                                                  <>&nbsp;</>
                                                                </td>
                                                                <td>
                                                                  <input
                                                                    id="filterValues.scheduleReport"
                                                                    name="filterValues.scheduleReport"
                                                                    type="radio"
                                                                    defaultValue="L"
                                                                  />
                                                                  Run Later
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div
                                                            id="scheduleReport"
                                                            style={{
                                                              display: "none",
                                                            }}
                                                          >
                                                            <table
                                                              className={`${styles.field_Name} ${styles.pad2Height}`}
                                                              style={{
                                                                width: "100%",
                                                              }}
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.field_Name
                                                                    }
                                                                  >
                                                                    Date:{" "}
                                                                    <input
                                                                      className={
                                                                        styles.FilterSelect
                                                                      }
                                                                      id="filterValues.scheduleReportDate"
                                                                      name="filterValues.scheduleReportDate"
                                                                      style={{
                                                                        height:
                                                                          "22px",
                                                                        width:
                                                                          "85px",
                                                                      }}
                                                                    />
                                                                  </td>
                                                                  <td
                                                                    className={
                                                                      styles.field_Name
                                                                    }
                                                                  >
                                                                    Time:
                                                                    <input
                                                                      className={
                                                                        styles.FilterSelect
                                                                      }
                                                                      id="filterValues.scheduleReportTime"
                                                                      name="filterValues.scheduleReportTime"
                                                                      style={{
                                                                        height:
                                                                          "22px",
                                                                        width:
                                                                          "85px",
                                                                      }}
                                                                    />
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  borderTop: "thin groove",
                                                  padding: "2px",
                                                }}
                                              >
                                                <a
                                                  href="javascript:void(0);"
                                                  id="SortFilter"
                                                  className={
                                                    styles.field_NameRed
                                                  }
                                                  onClick={() =>
                                                    handleSortFilter(true)
                                                  }
                                                >
                                                  Find/Filter
                                                </a>
                                              </td>
                                            </tr>

                                            {showOptions?.showHighlightedOnly && (
                                              <HighlightedHotel
                                                {...props}
                                                filterContext={context}
                                              />
                                            )}
                                            {showOptions?.showEmailMe && (
                                              <EmailMeReport
                                                {...props}
                                                filterContext={context}
                                              />
                                            )}
                                            {showOptions?.showRunReport && (
                                              <tr>
                                                <td>
                                                  {localStorage.getItem(
                                                    "loadReport"
                                                  ) === "true" ? (
                                                    <a
                                                      className={
                                                        styles.field_NameRed
                                                      }
                                                      href="javascript:void(0)"
                                                      id="RunReport"
                                                      onClick={() =>
                                                        setRunReport()
                                                      }
                                                    >
                                                      {Settings.RunReport}
                                                    </a>
                                                  ) : (
                                                    <a
                                                      href="javascript:void(0)"
                                                      id="RunReport"
                                                      className={
                                                        styles.field_NameRed
                                                      }
                                                    >
                                                      {Settings.RunReport}
                                                    </a>
                                                  )}
                                                </td>
                                              </tr>
                                            )}
                                            {/* Added If condition here to show Email Me option only in Request Reports screen */}

                                            {showOptions?.showSave && (
                                              <tr>
                                                <td>
                                                  <a
                                                    href="javascript:void(0);"
                                                    id="SaveData"
                                                    className={
                                                      styles.field_NameRed
                                                    }
                                                    onClick={props.save}
                                                  >
                                                    Save
                                                  </a>
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showProductLegend && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="yearFilter"
                                                    style={{
                                                      borderTop: "thin groove",
                                                      display: "block",
                                                    }}
                                                  >
                                                    <ColorLegend />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                            {showOptions?.showAccountStatusLegend && (
                                              <tr>
                                                <td>
                                                  <div
                                                    id="yearFilter"
                                                    style={{
                                                      borderTop: "thin groove",
                                                      display: "block",
                                                    }}
                                                  >
                                                    <StatusLegend />
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </td>
      )}
    </FilterContextProvider>
  );
};
