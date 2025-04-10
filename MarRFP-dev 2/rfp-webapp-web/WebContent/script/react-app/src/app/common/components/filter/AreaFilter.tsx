import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { labels } from "../../../pricing/admin/hotelPGOOSMaintenance/static/labels";

import styles from "./Filter.css";

export function AreaFilter(props) {
  const payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_areaOrRegion =
    payLoad !== undefined && payLoad !== false && payLoad !== null
      ? payLoad?.strFilterValues?.areaFilter?.areaOrRegion
      : "C";
  const session_area_filter =
    payLoad !== undefined && payLoad !== false && payLoad !== null
      ? payLoad?.strFilterValues?.areaFilter
      : null;
  const [showRegions, setShowRegion] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [areaOrRegionState, setAreaOrRegionState] =
    useState(session_areaOrRegion);

  useEffect(() => {
    setCountryData(props.filterContext.countries);
    if (props.isUpdateMultiple) {
      if (session_area_filter !== null && session_area_filter.country) {
        callGetStatesAPI(session_area_filter.country);
      }
      if (session_area_filter !== null && session_area_filter.state) {
        callGetCitiesAPI(session_area_filter.state);
      }
      if (session_areaOrRegion !== null && session_areaOrRegion === "R") {
        setShowRegion(true);
        setCountryData(props.filterContext.getRegions);
      }
    }
  }, [props.filterContext.countries]);

  const getRegionCountries = () => {
    return countryData?.map((item) => {
      return (
        <option value={item.areaid} key={item.areaid}>
          {item.areaname}
        </option>
      );
    });
  };

  const getCountries = () => {
    return countryData?.map((item) => {
      return (
        <option value={item.country} key={item.country}>
          {item.countryname}
        </option>
      );
    });
  };

  const getStates = () => {
    return props.filterContext.states?.map((item) => {
      return (
        <option value={item.state} key={item.state}>
          {item.statename}
        </option>
      );
    });
  };

  const getCities = () => {
    return props.filterContext.cities?.map((city) => {
      return (
        <option value={city} key={city}>
          {city}
        </option>
      );
    });
  };

  const handleRegionSelect = (countryCode = "") => {
    const strFilterValues = props.filterContext.requestPayload.strFilterValues;
    delete strFilterValues.areaFilter.state,
      delete strFilterValues.areaFilter.city,
      delete strFilterValues.areaFilter.country,
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          areaFilter: {
            ...props.filterContext.requestPayload.strFilterValues.areaFilter,
            areaOrRegion: "R",
            regionid: countryCode || 0,
          },
        },
      });
  };

  const getStatesFromAPI = (countryCode: string) => {
    props.filterContext.setIsDataChange(true);
    if (countryCode === labels.stateForCountry) {
      props.filterContext.getStatesData(countryCode);
    } else {
      props.filterContext.getStatesData(countryCode);
      props.filterContext.getCitiesData(countryCode, "");
    }
  };

  const getCitiesFromAPI = (countryCode: string, stateCode: string) => {
    props.filterContext.setIsDataChange(true);
    props.filterContext.getCitiesData(countryCode, stateCode);
  };

  const callGetStatesAPI = (countryCode: string) => {
    setCountryCode(countryCode);
    props.filterContext.resetData();
    if (showRegions) {
      handleRegionSelect(countryCode);
    } else {
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          areaFilter: {
            ...props.filterContext.requestPayload.strFilterValues.areaFilter,
            country: countryCode,
            state: "",
            city: "",
          },
        },
      });

      getStatesFromAPI(countryCode);
    }
  };

  const callGetCitiesAPI = (stateCode: string) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        areaFilter: {
          ...props.filterContext.requestPayload.strFilterValues.areaFilter,
          state: stateCode,
        },
      },
    });

    props.filterContext.resetCitiesData();
    getCitiesFromAPI(countryCode, stateCode);
  };

  return (
    <table className={styles.zeroHeight}>
      <tbody>
        {!props.isUpdateMultiple && (
          <tr>
            <td
              className={
                props.isUpdateMultiple ? styles.noBold : styles.field_Name
              }
            >
              Area
            </td>
          </tr>
        )}
        <tr>
          <td>
            <table
              className={`${styles.menuWdth100Height} ${"cbcreq"} ${
                styles.areafilter
              } ${"updatemultiplehotels"} ${
                props.isUpdateMultiple ? styles.noBold : styles.field_Name
              }`}
            >
              <tbody>
                <tr>
                  {props.isUpdateMultiple && (
                    <td className={styles.isupdate_aera}>Area</td>
                  )}
                  <td
                    id="cr"
                    style={{ paddingRight: props.isUpdateMultiple ? 18 : 1 }}
                  >
                    {props.isUpdateMultiple ? (
                      <input
                        id="filterValues.areaFilter.areaOrRegion"
                        name="filterValues.areaFilter.areaOrRegion"
                        type="radio"
                        className={styles.margin3}
                        value={"C"}
                        checked={
                          props.filterContext?.updateMutipleRequestEvents
                            ?.areaOrRegionChangeEvent === "C"
                            ? areaOrRegionState === "C"
                            : props.filterContext?.updateMutipleRequestEvents
                                ?.areaOrRegionChangeEvent === "R"
                            ? false
                            : session_areaOrRegion === "C"
                        }
                        onChange={(event) => {
                          setAreaOrRegionState(event.target.value);
                          props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                            {
                              ...props.filterContext.updateMutipleRequestEvents,
                              areaOrRegionChangeEvent: "C",
                            }
                          );
                          delete props.filterContext.requestPayload
                            .strFilterValues.areaFilter.regionid,
                            setShowRegion(false);
                          setCountryCode("");
                          setCountryData(props.filterContext.countries);
                          props.filterContext.setIsDataChange(true);
                          props.filterContext.setRequestPayload({
                            ...props.filterContext.requestPayload,
                            strFilterValues: {
                              ...props.filterContext.requestPayload
                                .strFilterValues,
                              areaFilter: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues.areaFilter,
                                areaOrRegion: event.target.value,
                              },
                            },
                          });
                        }}
                      />
                    ) : (
                      <input
                        id="filterValues.areaFilter.areaOrRegion"
                        name="filterValues.areaFilter.areaOrRegion"
                        type="radio"
                        className={classNames(
                          styles.margin3,
                          styles.marginrightleft0
                        )}
                        value={"C"}
                        defaultChecked
                        defaultValue="C"
                        onChange={(event) => {
                          delete props.filterContext.requestPayload
                            .strFilterValues.areaFilter.regionid,
                            setShowRegion(false);
                          setCountryCode("");
                          setCountryData(props.filterContext.countries);
                          props.filterContext.setIsDataChange(true);
                          props.filterContext.setRequestPayload({
                            ...props.filterContext.requestPayload,
                            strFilterValues: {
                              ...props.filterContext.requestPayload
                                .strFilterValues,
                              areaFilter: {
                                ...props.filterContext.requestPayload
                                  .strFilterValues.areaFilter,
                                areaOrRegion: event.target.value,
                              },
                            },
                          });
                        }}
                      />
                    )}
                    {props.componentName &&
                    props.componentName == "requestReport" ? (
                      <b>Country/Region</b>
                    ) : (
                      <>Country/Region</>
                    )}
                  </td>
                  <td id="rr">
                    {props.isUpdateMultiple ? (
                      <input
                        id="filterValues.areaFilter.areaOrRegion"
                        name="filterValues.areaFilter.areaOrRegion"
                        type="radio"
                        className={styles.margin3}
                        value={"R"}
                        checked={
                          props.filterContext?.updateMutipleRequestEvents
                            ?.areaOrRegionChangeEvent === "R"
                            ? areaOrRegionState === "R"
                            : props.filterContext?.updateMutipleRequestEvents
                                ?.areaOrRegionChangeEvent === "C"
                            ? false
                            : session_areaOrRegion === "R"
                        }
                        onChange={(event) => {
                          setAreaOrRegionState(event.target.value);
                          props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                            {
                              ...props.filterContext.updateMutipleRequestEvents,
                              areaOrRegionChangeEvent: "R",
                            }
                          );
                          setShowRegion(true);
                          setCountryCode("");
                          props.filterContext.setIsDataChange(true);
                          props.filterContext.resetData();
                          setCountryData(props.filterContext.getRegions);
                          handleRegionSelect();
                        }}
                      />
                    ) : (
                      <input
                        id="filterValues.areaFilter.areaOrRegion"
                        name="filterValues.areaFilter.areaOrRegion"
                        type="radio"
                        className={classNames(
                          styles.margin3,
                          styles.marginrightleft0
                        )}
                        value={"R"}
                        defaultValue={"R"}
                        onChange={(event) => {
                          setShowRegion(true);
                          setCountryCode("");
                          props.filterContext.setIsDataChange(true);
                          props.filterContext.resetData();
                          setCountryData(props.filterContext.getRegions);
                          handleRegionSelect();
                        }}
                      />
                    )}
                    {props.componentName &&
                    props.componentName == "requestReport" ? (
                      <b>Reporting Region</b>
                    ) : (
                      <>Reporting Region</>
                    )}
                  </td>{" "}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table
              className={
                props.isUpdateMultiple ? styles.noBold : styles.field_Name
              }
              style={{
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <div
                      id="countries"
                      style={{
                        display: "block",
                      }}
                    >
                      <table className={styles.menuWdth100Height}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                width: props.isUpdateMultiple ? "85px" : "50px",
                                minWidth: "50px",
                              }}
                            >
                              {showRegions
                                ? "Reporting region"
                                : "Country/ Region"}
                            </td>
                            <td id="countryselect">
                              {props.isUpdateMultiple ? (
                                <select
                                  name="filterValues.areaFilter.country"
                                  id="filterValues.areaFilter.country"
                                  className={styles.FilterSelect}
                                  style={{
                                    height: "20px",
                                    width: "218px",
                                  }}
                                  onChange={(event) => {
                                    props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                      {
                                        ...props.filterContext
                                          .updateMutipleRequestEvents,
                                        areFilterCountryChnageEvent: true,
                                      }
                                    );
                                    callGetStatesAPI(event.target.value);
                                  }}
                                  value={
                                    props.filterContext
                                      .updateMutipleRequestEvents
                                      .areFilterCountryChnageEvent
                                      ? countryCode
                                      : session_area_filter !== null &&
                                        session_areaOrRegion === "R"
                                      ? session_area_filter?.regionid
                                      : session_area_filter?.country
                                  }
                                >
                                  <option value="">*</option>
                                  {showRegions
                                    ? getRegionCountries()
                                    : getCountries()}
                                </select>
                              ) : (
                                <select
                                  name="filterValues.areaFilter.country"
                                  id="filterValues.areaFilter.country"
                                  className={styles.FilterSelect}
                                  style={{
                                    height: "20px",
                                    width: "218px",
                                  }}
                                  onChange={(event) => {
                                    props.filterContext.setIsDataChange(true);
                                    callGetStatesAPI(event.target.value);
                                  }}
                                  value={countryCode}
                                >
                                  <option value="">*</option>
                                  {showRegions
                                    ? getRegionCountries()
                                    : getCountries()}
                                </select>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="states">
                      {props.filterContext.states?.length > 0 &&
                        !showRegions &&
                        countryCode &&
                        labels.stateForCountry === countryCode && (
                          <table className={styles.menuWdth100Height}>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    width: props.isUpdateMultiple ? 85 : "50px",
                                  }}
                                >
                                  State
                                </td>
                                <td id="stateselect">
                                  {props.isUpdateMultiple ? (
                                    <select
                                      className={styles.FilterSelect}
                                      style={{
                                        height: "20px",
                                        width: "218px",
                                      }}
                                      onChange={(event) => {
                                        !showRegions &&
                                          callGetCitiesAPI(event.target.value);
                                        props.isUpdateMultiple &&
                                          props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                            {
                                              ...props.filterContext
                                                .updateMutipleRequestEvents,
                                              areFilterStateChnageEvent: true,
                                            }
                                          );
                                      }}
                                      value={
                                        props.filterContext
                                          .updateMutipleRequestEvents
                                          .areFilterStateChnageEvent
                                          ? props.filterContext.requestPayload
                                              .strFilterValues.areaFilter.state
                                          : session_area_filter !== null
                                          ? session_area_filter.state
                                          : props.filterContext.requestPayload
                                              .strFilterValues.areaFilter.state
                                      }
                                    >
                                      <option value="">*</option>
                                      {getStates()}
                                    </select>
                                  ) : (
                                    <select
                                      className={styles.FilterSelect}
                                      style={{
                                        height: "20px",
                                        width: "218px",
                                      }}
                                      onChange={(event) => {
                                        !showRegions &&
                                          callGetCitiesAPI(event.target.value);
                                      }}
                                    >
                                      <option value="">*</option>
                                      {getStates()}
                                    </select>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    {((props.isUpdateMultiple &&
                    session_area_filter !== null &&
                    session_area_filter?.state !== ""
                      ? session_area_filter.state
                      : props.filterContext.requestPayload.strFilterValues
                          .areaFilter.state) ||
                      (props.isUpdateMultiple &&
                      session_area_filter !== null &&
                      session_area_filter?.country !== ""
                        ? session_area_filter.country
                        : countryCode &&
                          countryCode !== labels.stateForCountry)) &&
                      !showRegions &&
                      countryCode && (
                        <div id="cities">
                          <table className={styles.menuWdth100Height}>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    width: props.isUpdateMultiple ? 85 : "50px",
                                  }}
                                >
                                  City
                                </td>
                                <td id="cityselect">
                                  {props.isUpdateMultiple ? (
                                    <select
                                      name="filterValues.areaFilter.city"
                                      id="filterValues.areaFilter.city"
                                      className={styles.FilterSelect}
                                      style={{
                                        height: "20px",
                                        width: "218px",
                                      }}
                                      onChange={(event) => {
                                        props.filterContext.setRequestPayload({
                                          ...props.filterContext.requestPayload,
                                          strFilterValues: {
                                            ...props.filterContext
                                              .requestPayload.strFilterValues,
                                            areaFilter: {
                                              ...props.filterContext
                                                .requestPayload.strFilterValues
                                                .areaFilter,
                                              city: event.target.value,
                                            },
                                          },
                                        });
                                        props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                                          {
                                            ...props.filterContext
                                              .updateMutipleRequestEvents,
                                            areFilterCityChnageEvent: true,
                                          }
                                        );
                                      }}
                                      value={
                                        props.filterContext
                                          .updateMutipleRequestEvents
                                          .areFilterCityChnageEvent
                                          ? props.filterContext.requestPayload
                                              .strFilterValues.areaFilter.city
                                          : session_area_filter !== null
                                          ? session_area_filter.city
                                          : props.filterContext.requestPayload
                                              .strFilterValues.areaFilter.city
                                      }
                                    >
                                      <option value="">*</option>
                                      {getCities()}
                                    </select>
                                  ) : (
                                    <select
                                      name="filterValues.areaFilter.city"
                                      id="filterValues.areaFilter.city"
                                      className={styles.FilterSelect}
                                      style={{
                                        height: "20px",
                                        width: "218px",
                                      }}
                                      onChange={(event) => {
                                        props.filterContext.setIsDataChange(
                                          true
                                        );
                                        props.filterContext.setRequestPayload({
                                          ...props.filterContext.requestPayload,
                                          strFilterValues: {
                                            ...props.filterContext
                                              .requestPayload.strFilterValues,
                                            areaFilter: {
                                              ...props.filterContext
                                                .requestPayload.strFilterValues
                                                .areaFilter,
                                              city: event.target.value,
                                            },
                                          },
                                        });
                                      }}
                                    >
                                      <option value="">*</option>
                                      {getCities()}
                                    </select>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      id="regions"
                      style={{
                        display: "none",
                      }}
                    >
                      <table className={styles.menuWdth100Height}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                width: "50px",
                              }}
                            >
                              Reporting Region
                            </td>
                            <td id="regionselect" />
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
  );
}
