import React, { useContext, useEffect } from "react";
import CSelect from "../../../../../common/components/CSelect";
import PricingStandardsContext, {
  PricingStandardsContextProvider,
} from "../context/PricingStandardsContext";
import Settings from "../static/Settings";
import styles from "./PricingStandards.css";
import { useLocation } from "react-router-dom";
import API from "../service/API";
import { Layout } from "../../../routing/Layout";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import { CLoader } from "../../../../../common/components/CLoader";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

let contextType = null;

export default function PricingStandard() {
  const parentContextType = useContext(HotelPricingContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContextType?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  const history = useHistory();

  const UpdateHotelStandardsData = () => {
    contextType.onContentBeforeunload();
    const check = contextType.final_check("", "");
    if (check) {
      contextType.updateHotelStandards();
    } else {
      //stop unmount
    }
  };

  const fetchRFPStandardsData = () => {
    appContext.setCpacLoader(true);
    API.getHotelRFPStandard(marshaCode, "", hotelrfpid, period).then((data) => {
      appContext.setCpacLoader(false);
      contextType.setHotelRFPStandard(data);
      contextType.onContentLoad();
      contextType.final_check("", "");

      if (data.menu) {
        parentContextType.setState({
          ...parentContextType.state,
          gridData: {
            ...parentContextType.state.gridData,
            list: {
              ...parentContextType.state.gridData.list,
              menu: data.menu,
            },
          },
        });
      }
      contextType.setPageLoad(true);
    });
  };

  useEffect(() => {
    contextType.flag_onchange();
    contextType.setPageLoad(false);
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("GroupsMeetings") &&
        !history?.location?.prevPath?.includes("Seasons") &&
        !history?.location?.prevPath?.includes("PriceContact") &&
        !history?.location?.prevPath?.includes("DepthOfSale") &&
        !history?.location?.prevPath?.includes("Blackout") &&
        !history?.location?.prevPath?.includes("eligibilityAmenity")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchRFPStandardsData();
    }
    return () => {
      UpdateHotelStandardsData();
      contextType.componentUnload();
    };
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      parentContextType?.completionState?.PricingContact == "Y"
    ) {
      fetchRFPStandardsData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        PricingContact: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Seasons") &&
      parentContextType?.completionState?.Seasons == "Y"
    ) {
      fetchRFPStandardsData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Seasons: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("DepthOfSale") &&
      parentContextType?.completionState?.DepthOfSales == "Y"
    ) {
      fetchRFPStandardsData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        DepthOfSales: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Blackout") &&
      parentContextType?.completionState?.Blackout == "Y"
    ) {
      fetchRFPStandardsData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Blackout: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("eligibilityAmenity") &&
      parentContextType?.completionState?.EligAmen == "Y"
    ) {
      fetchRFPStandardsData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        EligAmen: "N",
      });
    }
  }, [
    parentContextType?.completionState?.PricingContact,
    parentContextType?.completionState?.EligAmen,
    parentContextType?.completionState?.Blackout,
    parentContextType?.completionState?.DepthOfSales,
    parentContextType?.completionState?.Seasons,
  ]);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      fetchRFPStandardsData();
      if (appContext?.groupMeetingUpdation) {
        appContext?.setGroupMeetingUpdation(false);
      }
    }
  }, [appContext?.groupMeetingUpdation]);

  return (
    <Layout>
      <PricingStandardsContextProvider>
        <PricingStandardsContext.Consumer>
          {(pricingStandardContext) => {
            contextType = pricingStandardContext;
            return (
              <React.Fragment>
                {contextType?.state?.pageLoad ? (
                  <table className={styles.container}>
                    <tbody>
                      <tr>
                        <td className={styles.verticalAlignment}>
                          <form
                            id="thisForm"
                            name="thisForm"
                            method="post"
                            autoComplete="off"
                          >
                            <table
                              cellSpacing={0}
                              cellPadding={0}
                              className={[styles.gridBorder].join(" ")}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    className={[
                                      styles.instructionHeader,
                                      styles.fieldName,
                                    ].join(" ")}
                                  >
                                    {Settings.headers.unitsOfMeasure}
                                  </td>
                                </tr>
                                <tr className={styles.tdHeight10}>
                                  <td />
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      cellSpacing={0}
                                      cellPadding={0}
                                      className={styles.gridBorder}
                                    >
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.fields
                                                .currencyUsedQuotations.label
                                            }
                                          </td>
                                          <td className={styles.tdWidth5} />
                                          <td
                                            className={[
                                              styles.fieldName,
                                              styles.fieldValue,
                                            ].join(" ")}
                                            title={
                                              Settings.titles.currencyRates
                                            }
                                          >
                                            {contextType.state.roleDetails
                                              .role === Settings.isPASAdmin ? (
                                              <CSelect
                                                id={
                                                  Settings.fields
                                                    .currencyUsedQuotations.id
                                                }
                                                selectedValue={
                                                  contextType.state.standards
                                                    .hotelRFPStandards
                                                    .currencycode
                                                }
                                                ddnOptions={
                                                  contextType.state.standards
                                                    .currencyList
                                                }
                                                onChange={
                                                  contextType.handleChange
                                                }
                                                keyField={
                                                  Settings.currencyList.keyField
                                                }
                                                valField={
                                                  Settings.currencyList.valField
                                                }
                                              />
                                            ) : (
                                              `${contextType.state.standards.hotelRFPStandards.currencycode}`
                                            )}
                                          </td>{" "}
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.fields.distanceQouted
                                                .label
                                            }
                                          </td>
                                          <td
                                            className={[
                                              styles.fieldName,
                                              styles.fieldValue,
                                            ].join(" ")}
                                            title={
                                              Settings.fields.distanceQouted
                                                .title
                                            }
                                          >
                                            {
                                              contextType.state.standards
                                                .hotelRFPStandards.distanceunit
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr className={styles.trHeight20}>
                                  {" "}
                                  <td>
                                    <>&nbsp;</>
                                  </td>{" "}
                                </tr>
                                <tr>
                                  <td className={styles.instructionHeader}>
                                    {Settings.headers.rejectedRateclearnup}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.instructions}>
                                    {" "}
                                    <b>{Settings.headers.heading5} </b>
                                    <br></br>
                                    <b>{Settings.headers.heading6} </b>
                                    <br></br>
                                    <b>
                                      {Settings.headers.heading7}

                                      <a href={Settings.headers.pdf}>
                                        {" "}
                                        <b>MGS</b>
                                      </a>

                                      {Settings.headers.heading8}
                                    </b>
                                  </td>
                                </tr>

                                <tr className={styles.trHeight20}>
                                  {" "}
                                  <td>
                                    <>&nbsp;</>
                                  </td>{" "}
                                </tr>
                                <tr>
                                  <td className={styles.instructionHeader}>
                                    {Settings.headers.gpp}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.instructions}>
                                    {" "}
                                    <b>
                                      {Settings.headers.gppHeader1} <br></br>
                                      {Settings.headers.gppHeader2}
                                      <div className={styles.gpp}>
                                        {Settings.headers.gppHeading1}
                                      </div>
                                      <div className={styles.gpp}>
                                        {Settings.headers.gppHeading2}
                                      </div>
                                    </b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CSelect
                                      id={Settings.fields.exempt_gpp.id}
                                      onChange={contextType.handleChange}
                                      className={styles.gpp}
                                      selectedValue={
                                        contextType.state.standards
                                          .hotelRFPStandards.exempt_gpp
                                      }
                                      ddnOptions={Settings.exempt_gppArray}
                                      keyField={Settings.exempt_gpp.keyField}
                                      valField={Settings.exempt_gpp.valField}
                                      isDisabled={
                                        contextType.state.isGpppExemptDisabled
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.instructionHeader}>
                                    {Settings.headers.roomPoolGrps}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.instructions}>
                                    <b>
                                      {Settings.headers.roomPoolH1} <br />
                                      <br />
                                      {Settings.headers.roomPoolH2}
                                      <br />
                                      <br />
                                      {Settings.headers.roomPoolH3}{" "}
                                      <b>
                                        (
                                        <a
                                          style={{ fontWeight: "bold" }}
                                          href="mailto:${contextType.state.standards.contactemail}"
                                        >
                                          {
                                            contextType.state.standards
                                              .contactemail
                                          }
                                        </a>
                                        )
                                      </b>
                                      {Settings.headers.exception}
                                    </b>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.instructionHeader}
                                    style={{ paddingLeft: "300px" }}
                                  >
                                    {Settings.headers.roomPoolGrp1}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      style={{
                                        borderSpacing: "5px",
                                        border: "0",
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td className={styles.tdHeight10} />
                                        </tr>
                                        <tr>
                                          <td>
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .roomPoolsHeader
                                                    }
                                                  </td>
                                                  <td
                                                    style={{ width: "175px" }}
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      (contextType.state
                                                        .standards
                                                        .disableSecondaryRoomPool ===
                                                        Settings.nLabel &&
                                                        (contextType.state
                                                          .standards
                                                          .softLaunchEnabled ===
                                                          Settings.yLabel ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[0]
                                                            ?.roomPool ===
                                                            null ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[0]
                                                            ?.roomPool ===
                                                            -1))) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[0]
                                                      ?.roomPools[0]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        className={"selectDiv"}
                                                        id={
                                                          Settings.fields
                                                            .roomPool00.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool00.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            0,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[0]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[0]
                                                                ?.roomPools[0]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolList
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[0]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[0]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[0]?.roomPool}`
                                                    )}
                                                  </td>
                                                  <td
                                                    style={{ width: "175px" }}
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      (contextType.state
                                                        .standards
                                                        .disableSecondaryRoomPool ===
                                                        Settings.nLabel &&
                                                        (contextType.state
                                                          .standards
                                                          .softLaunchEnabled ===
                                                          Settings.yLabel ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            null ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            -1))) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[0]
                                                      ?.roomPools[1]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        id={
                                                          Settings.fields
                                                            .roomPool01.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool01.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            0,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[1]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[0]
                                                                ?.roomPools[1]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolListWithNA
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[1]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[1]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[1]?.roomPool}`
                                                    )}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {Settings.headers.roomType}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ? (
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[0]?.roomtype
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType00.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType00.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            0,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={parseInt(
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[0]
                                                            ?.roomtypeid
                                                        )}
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>{" "}
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ||
                                                    (contextType.state.standards
                                                      .disableSecondaryRoomPool ===
                                                      Settings.yLabel &&
                                                      contextType.state
                                                        .roleDetails.role ===
                                                        Settings.isHotelUser) ? (
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[1]
                                                        ?.roomtype === null ? (
                                                        `${Settings.NA}`
                                                      ) : (
                                                        `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[1]?.roomtype}`
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType01.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType01.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            0,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={parseInt(
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[0]
                                                            ?.roomPools[1]
                                                            ?.roomtypeid
                                                        )}
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={styles.fieldName}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .numberOfPhysicalRooms
                                                    }
                                                    <br />
                                                    {
                                                      Settings.headers
                                                        .associatedRoomPool
                                                    }
                                                  </td>
                                                  <td
                                                    style={{ width: "175px" }}
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .hotelRFPStandards
                                                      .hotelRFPStandardRmPools[0]
                                                      .roomPools[0]
                                                      .actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[0]?.actualNumRooms}`}
                                                  </td>
                                                  <td
                                                    style={{ width: "175px" }}
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[0]
                                                      ?.roomPools[1]
                                                      ?.actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[1]?.actualNumRooms}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .rateMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "350px" }}
                                                  >
                                                    {
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[0]
                                                        ?.roomPools[0]?.rpgm
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "350px" }}
                                                  >
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[0]
                                                      ?.roomPools[1]?.rpgm !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[1]?.rpgm}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .restrictionMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {
                                                      contextType.state
                                                        .standards
                                                        .hotelRFPStandards
                                                        .hotelRFPStandardRmPools[0]
                                                        .roomPools[0]
                                                        .restrictionRpgm
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {" "}
                                                    {(contextType.state
                                                      .standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[0]
                                                      ?.roomPools[1]
                                                      ?.restrictionRpgm !=
                                                      null) !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[1]?.restrictionRpgm}`}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ height: "10px" }} />
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.instructionHeader}
                                    style={{ paddingLeft: "300px" }}
                                  >
                                    {Settings.headers.roomPoolGroup2Header}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      style={{
                                        borderSpacing: "5px",
                                        border: "0",
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td style={{ height: "10px" }} />
                                        </tr>
                                        <tr>
                                          <td>
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .roomPoolsHeader
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      contextType.state
                                                        .standards
                                                        .softLaunchEnabled ===
                                                        Settings.yLabel ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[0]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[0]
                                                        ?.roomPool === -1) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[0]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        id={
                                                          Settings.fields
                                                            .roomPool10.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool10.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            1,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[0]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[1]
                                                                ?.roomPools[0]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolListWithNA
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[0]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[0]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[0]?.roomPool}`
                                                    )}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      (contextType.state
                                                        .standards
                                                        .disableSecondaryRoomPool ===
                                                        Settings.nLabel &&
                                                        (contextType.state
                                                          .standards
                                                          .softLaunchEnabled ===
                                                          Settings.yLabel ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            null ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            -1))) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[1]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        id={
                                                          Settings.fields
                                                            .roomPool11.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool11.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            1,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[1]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[1]
                                                                ?.roomPools[1]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolListWithNA
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[1]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[1]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[1]?.roomPool}`
                                                    )}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {Settings.headers.roomType}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ? (
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[0]?.roomtype
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType10.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType10.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            1,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[0]
                                                            ?.roomtypeid
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ||
                                                    (contextType.state.standards
                                                      .disableSecondaryRoomPool ===
                                                      Settings.yLabel &&
                                                      contextType.state
                                                        .roleDetails.role ===
                                                        Settings.isHotelUser) ? (
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[1]
                                                        ?.roomPools[1]
                                                        ?.roomtype === null ? (
                                                        `${Settings.NA}`
                                                      ) : (
                                                        `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[1]?.roomtype}`
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType11.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType11.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            1,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[1]
                                                            ?.roomPools[1]
                                                            ?.roomtypeid
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>{" "}
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={styles.fieldName}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .numberOfPhysicalRooms
                                                    }
                                                    <br />
                                                    {
                                                      Settings.headers
                                                        .associatedRoomPool
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[0]
                                                      ?.actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[0]?.actualNumRooms}`}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[1]
                                                      ?.actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[1]?.actualNumRooms}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .rateMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {`${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[0]?.rpgm}`}
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[1]?.rpgm !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[1]?.rpgm}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .restrictionMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {" "}
                                                    {`${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[0]?.restrictionRpgm}`}
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {" "}
                                                    {contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[1]
                                                      ?.roomPools[1]
                                                      ?.restrictionRpgm !==
                                                      null &&
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]?.roomPools[1]?.restrictionRpgm}`}
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
                                <tr>
                                  <td style={{ height: "10px" }} />
                                </tr>
                                <tr>
                                  <td
                                    className={styles.instructionHeader}
                                    style={{ paddingLeft: "300px" }}
                                  >
                                    {Settings.headers.roomPoolGroup3Header}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      style={{
                                        borderSpacing: "5px",
                                        border: "0",
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td style={{ height: "10px" }} />
                                        </tr>
                                        <tr>
                                          <td>
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .roomPoolsHeader
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      contextType.state
                                                        .standards
                                                        .softLaunchEnabled ===
                                                        Settings.yLabel ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[0]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[0]
                                                        ?.roomPool === -1) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[0]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        id={
                                                          Settings.fields
                                                            .roomPool20.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool20.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            2,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[0]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[2]
                                                                ?.roomPools[0]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolListWithNA
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[0]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[0]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[0]?.roomPool}`
                                                    )}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {((contextType.state
                                                      .roleDetails.role ===
                                                      Settings.isPASAdmin ||
                                                      (contextType.state
                                                        .standards
                                                        .disableSecondaryRoomPool ===
                                                        Settings.nLabel &&
                                                        (contextType.state
                                                          .standards
                                                          .softLaunchEnabled ===
                                                          Settings.yLabel ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            null ||
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[1]
                                                            ?.roomPool ===
                                                            -1))) &&
                                                      !contextType.state
                                                        .standards
                                                        .generalReadOnly) ||
                                                    contextType.state.standards
                                                      ?.hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[1]
                                                      ?.onChangeEvtTrigger ==
                                                      true ? (
                                                      <CSelect
                                                        id={
                                                          Settings.fields
                                                            .roomPool21.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomPool21.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roompoolflag_onchange(
                                                            e,
                                                            2,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[1]
                                                            ?.roomPool === null
                                                            ? -1
                                                            : contextType.state
                                                                .standards
                                                                ?.hotelRFPStandards
                                                                ?.hotelRFPStandardRmPools[2]
                                                                ?.roomPools[1]
                                                                ?.roomPool
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .hotelroompoolListWithNA
                                                        }
                                                        keyField={
                                                          Settings.roompool
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roompool
                                                            .valField
                                                        }
                                                      />
                                                    ) : contextType.state
                                                        .standards
                                                        .hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[1]
                                                        ?.roomPool === null ||
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[1]
                                                        ?.roomPool === -1 ? (
                                                      `${Settings.NA}`
                                                    ) : (
                                                      `${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[1]?.roomPool}`
                                                    )}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {Settings.headers.roomType}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ? (
                                                      contextType.state
                                                        .standards
                                                        .hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[0]?.roomtype
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType20.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType20.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            2,
                                                            0
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            .hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[0]
                                                            ?.roomtypeid
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {contextType.state.standards
                                                      .generalReadOnly ||
                                                    (contextType.state.standards
                                                      .disableSecondaryRoomPool ===
                                                      Settings.yLabel &&
                                                      contextType.state
                                                        .roleDetails.role ===
                                                        Settings.isHotelUser) ? (
                                                      contextType.state
                                                        .standards
                                                        ?.hotelRFPStandards
                                                        ?.hotelRFPStandardRmPools[2]
                                                        ?.roomPools[1]
                                                        ?.roomtype === null ? (
                                                        `${Settings.NA}`
                                                      ) : (
                                                        `${contextType.state.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[1]?.roomtype}`
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        width={"175px"}
                                                        id={
                                                          Settings.fields
                                                            .roomType21.id
                                                        }
                                                        name={
                                                          Settings.fields
                                                            .roomType21.name
                                                        }
                                                        onChange={(e) =>
                                                          contextType.roomTypeChangeHandler(
                                                            e,
                                                            2,
                                                            1
                                                          )
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .standards
                                                            ?.hotelRFPStandards
                                                            ?.hotelRFPStandardRmPools[2]
                                                            ?.roomPools[1]
                                                            ?.roomtypeid
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .standards
                                                            .roomtypeList
                                                        }
                                                        keyField={
                                                          Settings.roomType
                                                            .keyField
                                                        }
                                                        valField={
                                                          Settings.roomType
                                                            .valField
                                                        }
                                                      />
                                                    )}
                                                  </td>{" "}
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{ height: "3px" }}
                                                  />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={styles.fieldName}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .numberOfPhysicalRooms
                                                    }
                                                    <br />
                                                    {
                                                      Settings.headers
                                                        .associatedRoomPool
                                                    }
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {contextType.state.standards
                                                      .hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[0]
                                                      ?.actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[0]?.actualNumRooms}`}
                                                  </td>
                                                  <td
                                                    className={[
                                                      styles.fieldValue,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {contextType.state.standards
                                                      .hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[1]
                                                      ?.actualNumRooms !==
                                                      null &&
                                                      `${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[1]?.actualNumRooms}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                    style={{ width: "175px" }}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .rateMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {`${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[0]?.rpgm}`}
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {contextType.state.standards
                                                      .hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[1]?.rpgm !==
                                                      null &&
                                                      ` ${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[1]?.rpgm}`}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={[
                                                      styles.fieldName,
                                                      styles.nonWrap,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.headers
                                                        .restrictionMirror
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {` ${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[0]?.restrictionRpgm}`}
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.fieldValue
                                                    }
                                                    style={{ width: "350px" }}
                                                  >
                                                    {contextType.state.standards
                                                      .hotelRFPStandards
                                                      ?.hotelRFPStandardRmPools[2]
                                                      ?.roomPools[1]
                                                      ?.restrictionRpgm !==
                                                      null &&
                                                      ` ${contextType.state.standards.hotelRFPStandards?.hotelRFPStandardRmPools[2]?.roomPools[1]?.restrictionRpgm}`}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ height: "10px" }} />
                                        </tr>
                                        <tr>
                                          <td>
                                            <>&nbsp;</>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <CLoader></CLoader>
                )}
              </React.Fragment>
            );
          }}
        </PricingStandardsContext.Consumer>
      </PricingStandardsContextProvider>
    </Layout>
  );
}
