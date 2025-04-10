import React, { Component, useState } from "react";
import styles from "./meeting.css";
import Settings from "./static/Settings";
import API from "./service/API";
import HotelContext, {
  HotelContextProvider,
} from "../../context/groupMeetingContextProvider";
import MeetingContext, {
  MeetingContextProvider,
} from "./context/meetingContext";
import CSelect from "../../../../../../common/components/CSelect";
import { withRouter } from "react-router-dom";

let contextType = null;
let parentContextType = null;
let hotelrfpid = null;
class Meeting extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hotelrfpid = parentContextType.masterData.hotelrfpid;
    API.getHotelMtgPriceTab(hotelrfpid).then((data) => {
      contextType.setGroupMeetingPricingConcessionData(data);
    });
    document.addEventListener("keydown", this.downHandler);
  }

  componentWillUnmount = () => {
    contextType.checkHotelUserAlert();
    document.removeEventListener("keydown", this.downHandler);
    contextType.componentUnload();
  };

  componentDidUpdate = () => {
    if (
      parentContextType.state.activeTab === "meeting" &&
      parentContextType.state.saveGroupMeetingEvent != null
    ) {
      contextType.checkMtgPriceTab();
      parentContextType.setState({
        ...parentContextType.state,
        saveGroupMeetingEvent: null,
      });
    }

    contextType.onSaveClick();
  };

  onChangeHandler() {}

  onValidation_NumberOnly = (e, field) => {
    const re_number = /^\d{0,10}(\.\d{0,7})?$/;
    if (
      (e.target.value === "" || re_number.test(e.target.value)) &&
      !e.target.value.includes("e")
    ) {
      const updatedList = contextType.state.meetingData.list;
      if (field === "max_full_day_rate_for_10_50") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_full_day_rate_for_10_50 = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "max_half_day_rate_for_10_50") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_half_day_rate_for_10_50 = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "max_full_day_rate_for_50_100") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_full_day_rate_for_50_100 = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "max_half_day_rate_for_50_100") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_half_day_rate_for_50_100 = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "max_cost_for_10_person") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_cost_for_10_person = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "max_cost_for_25_person") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.max_cost_for_25_person = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      if (field === "free_internet_offer") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.free_internet_offer = e.target.value;
          contextType.setMeetingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setMeetingAlert("Y");
        }
      }
      updatedList.mtgPriceChg = "Y";
      contextType.setMeeting(updatedList);
      contextType.validationCheckOnChange(updatedList);
    }
  };

  downHandler = (e) => {
    if (e.key === "Tab" && e.shiftKey === false) {
      e.preventDefault();
      const focusable = document
        .querySelector("#groupMeetingTable")
        .querySelectorAll("input,button,select,textarea");
      if (focusable.length) {
        if (contextType.focusedIndex == -1) {
          let c = 0;
          for (let i = 0; i < focusable.length; i++) {
            if (
              focusable[i] == e.target &&
              focusable[i + 1]?.readOnly != true
            ) {
              if (i < focusable.length - 1) {
                if (focusable[i + 1].innerHTML != "Cancel") {
                  if (focusable[i + 1].nodeName == "INPUT") {
                    contextType.setFocusedIndex(i + 1);
                    focusable[i + 1].focus();
                    focusable[i + 1].select();
                  } else {
                    contextType.setFocusedIndex(i + 1);
                    focusable[i + 1].focus();
                  }
                } else {
                  contextType.setFocusedIndex(i + 2);
                  focusable[i + 2].focus();
                }
              } else {
                if (i == focusable.length - 1) {
                  contextType.setFocusedIndex(0);
                  focusable[0].focus();
                }
              }
            } else if (
              focusable[i] == e.target &&
              focusable[i + 1]?.readOnly == true
            ) {
              //find next index with disabled false
              c = i;
              while (focusable[c + 1]?.readOnly == true) {
                c++;
              }
              if (c < focusable.length - 1) {
                if (focusable[c + 1].innerHTML != "Cancel") {
                  if (focusable[c + 1].nodeName == "INPUT") {
                    contextType.setFocusedIndex(c + 1);
                    focusable[c + 1].focus();
                    focusable[c + 1].select();
                  } else {
                    contextType.setFocusedIndex(c + 1);
                    focusable[c + 1].focus();
                  }
                } else {
                  contextType.setFocusedIndex(c + 2);
                  focusable[c + 2].focus();
                }
              } else {
                if (c == focusable.length - 1) {
                  contextType.setFocusedIndex(0);
                  focusable[0].focus();
                }
              }
            }
          }
        } else {
          let d = 0;
          if (contextType.focusedIndex < focusable.length - 1) {
            if (focusable[contextType.focusedIndex + 1]?.readOnly != true) {
              if (
                focusable[contextType.focusedIndex + 1].innerHTML != "Cancel"
              ) {
                if (
                  focusable[contextType.focusedIndex + 1].nodeName == "INPUT"
                ) {
                  let idx = contextType.focusedIndex;
                  idx = idx + 1;
                  contextType.setFocusedIndex(idx);
                  focusable[idx].focus();
                  focusable[idx].select();
                } else {
                  let idx = contextType.focusedIndex;
                  idx = idx + 1;
                  contextType.setFocusedIndex(idx);
                  focusable[idx].focus();
                }
              } else {
                let indx = contextType.focusedIndex;
                indx = indx + 2;
                contextType.setFocusedIndex(indx);
                focusable[indx].focus();
              }
            } else if (
              focusable[contextType.focusedIndex + 1]?.readOnly == true
            ) {
              //find next index with disabled false
              d = contextType.focusedIndex;
              while (focusable[d + 1]?.readOnly == true) {
                d++;
              }
              if (d < focusable.length - 1) {
                if (focusable[d + 1].innerHTML != "Cancel") {
                  if (focusable[d + 1].nodeName == "INPUT") {
                    contextType.setFocusedIndex(d + 1);
                    focusable[d + 1].focus();
                    focusable[d + 1].select();
                  } else {
                    contextType.setFocusedIndex(d + 1);
                    focusable[d + 1].focus();
                  }
                } else {
                  contextType.setFocusedIndex(d + 2);
                  focusable[d + 2].focus();
                }
              } else {
                if (d == focusable.length - 1) {
                  contextType.setFocusedIndex(0);
                  focusable[0].focus();
                }
              }
            }
          } else {
            if (contextType.focusedIndex == focusable.length - 1) {
              contextType.setFocusedIndex(0);
              focusable[0].focus();
            }
          }
        }
      }
    }
  };

  handleFocusEvent = (event) => {
    const focusable = document
      .querySelector("#groupMeetingTable")
      .querySelectorAll("input,button,select,textarea");
    if (focusable.length) {
      for (let i = 0; i < focusable.length; i++) {
        if (focusable[i] == event.target) {
          contextType.setFocusedIndex(i);
        }
      }
    }
  };

  render() {
    return (
      <HotelContext.Consumer>
        {(GroupMeetingContext) => {
          parentContextType = GroupMeetingContext;
          return (
            <MeetingContextProvider>
              <MeetingContext.Consumer>
                {(MeetingContext) => {
                  contextType = MeetingContext;
                  return (
                    <table
                      className={styles.meetingpricingmainTable}
                      id="groupMeetingTable"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <input
                              id={Settings.groupMeeting.mtgPriceChg.id}
                              type="hidden"
                              name={Settings.groupMeeting.mtgPriceChg.name}
                              value={Settings.groupMeeting.mtgPriceChg.value}
                            />
                          </td>
                        </tr>
                        <tr className={styles.blockDisplay}>
                          <td className={styles.headersMeetingPricing}>
                            {Settings.instructions.header_meeting_pricing}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span className={styles.fieldNameBoldFirst}>
                                {Settings.instructions.day_meetings_offered}
                              </span>
                            </div>
                          </td>
                          <td className={styles.fieldValue}>
                            <input
                              id={Settings.groupMeeting.day_meeting_offered.id}
                              type="text"
                              name={
                                Settings.groupMeeting.day_meeting_offered.name
                              }
                              className={styles.groupMeetingInputLabel}
                              value={
                                contextType.state.meetingData.list
                                  .day_meeting_offered
                              }
                              maxLength={10}
                              readOnly
                              tabIndex={-1}
                            />
                          </td>
                        </tr>
                        {contextType.state.mpc_one ? (
                          <React.Fragment>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {Settings.instructions.meeting_type_offered}
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting.meeting_type_offered
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.meeting_type_offered
                                      .name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .type_day_meeting_offered
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .full_delegate_explanation
                                    }
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr></tr>
                            <tr>
                              <td>
                                <div className={styles.divValue}>
                                  <div
                                    className={styles.meginleft}
                                    style={{ width: "80px" }}
                                  ></div>
                                  <div
                                    className={styles.meginleft}
                                    style={{ height: "50px" }}
                                  >
                                    {
                                      contextType.state.meetingData.list
                                        .fulldaymtgincl
                                    }
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .half_day_delegate_explanation
                                    }
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr></tr>
                            <tr>
                              <td>
                                <div className={styles.divValue}>
                                  <div
                                    className={styles.meginleft}
                                    style={{ width: "80px" }}
                                  ></div>
                                  <div
                                    className={styles.meginleft}
                                    style={{ height: "50px" }}
                                  >
                                    {
                                      contextType.state.meetingData.list
                                        .halfdaymtgincl
                                    }
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.instructions
                                    .max_full_day_rate_for_10_50
                                }
                              </td>
                              <td className={styles.fieldValue}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .max_full_day_rate_for_10_50
                                  ) : (
                                    <input
                                      id={
                                        Settings.groupMeeting
                                          .max_full_day_rate_for_10_50.id
                                      }
                                      type="text"
                                      name={
                                        Settings.groupMeeting
                                          .max_full_day_rate_for_10_50.name
                                      }
                                      className={styles.groupMeetingInput}
                                      onChange={(e) => {
                                        this.onValidation_NumberOnly(
                                          e,
                                          "max_full_day_rate_for_10_50"
                                        );
                                      }}
                                      value={
                                        contextType.state.meetingData.list
                                          .max_full_day_rate_for_10_50 == null
                                          ? ""
                                          : contextType.state.meetingData.list
                                              .max_full_day_rate_for_10_50
                                      }
                                      maxLength={10}
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.instructions
                                    .max_half_day_rate_for_10_50
                                }
                              </td>
                              <td className={styles.fieldValue}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .max_half_day_rate_for_10_50
                                  ) : (
                                    <input
                                      id={
                                        Settings.groupMeeting
                                          .max_half_day_rate_for_10_50.id
                                      }
                                      type="text"
                                      name={
                                        Settings.groupMeeting
                                          .max_half_day_rate_for_10_50.name
                                      }
                                      className={styles.groupMeetingInput}
                                      onChange={(e) => {
                                        this.onValidation_NumberOnly(
                                          e,
                                          "max_half_day_rate_for_10_50"
                                        );
                                      }}
                                      value={
                                        contextType.state.meetingData.list
                                          .max_half_day_rate_for_10_50 == null
                                          ? ""
                                          : contextType.state.meetingData.list
                                              .max_half_day_rate_for_10_50
                                      }
                                      maxLength={10}
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.instructions
                                    .max_full_day_rate_for_50_100
                                }
                              </td>
                              <td className={styles.fieldValue}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .max_full_day_rate_for_50_100
                                  ) : (
                                    <input
                                      id={
                                        Settings.groupMeeting
                                          .max_full_day_rate_for_50_100.id
                                      }
                                      type="text"
                                      name={
                                        Settings.groupMeeting
                                          .max_full_day_rate_for_50_100.name
                                      }
                                      className={styles.groupMeetingInput}
                                      onChange={(e) => {
                                        this.onValidation_NumberOnly(
                                          e,
                                          "max_full_day_rate_for_50_100"
                                        );
                                      }}
                                      value={
                                        contextType.state.meetingData.list
                                          .max_full_day_rate_for_50_100 == null
                                          ? ""
                                          : contextType.state.meetingData.list
                                              .max_full_day_rate_for_50_100
                                      }
                                      maxLength={10}
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.instructions
                                    .max_half_day_rate_for_50_100
                                }
                              </td>
                              <td className={styles.fieldValue}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .max_half_day_rate_for_50_100
                                  ) : (
                                    <input
                                      id={
                                        Settings.groupMeeting
                                          .max_half_day_rate_for_50_100.id
                                      }
                                      type="text"
                                      name={
                                        Settings.groupMeeting
                                          .max_half_day_rate_for_50_100.name
                                      }
                                      className={styles.groupMeetingInput}
                                      onChange={(e) => {
                                        this.onValidation_NumberOnly(
                                          e,
                                          "max_half_day_rate_for_50_100"
                                        );
                                      }}
                                      value={
                                        contextType.state.meetingData.list
                                          .max_half_day_rate_for_50_100 == null
                                          ? ""
                                          : contextType.state.meetingData.list
                                              .max_half_day_rate_for_50_100
                                      }
                                      maxLength={10}
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .total_tax_on_day_meeting_package
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting
                                      .total_tax__on_day_meeting_offered.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting
                                      .total_tax__on_day_meeting_offered.name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .total_tax__on_day_meeting_offered
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .total_tax_on_day_meeting_package_quote
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting
                                      .total_tax_on_day_meeting_package_quote.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting
                                      .total_tax_on_day_meeting_package_quote
                                      .name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .total_tax_on_day_meeting_package_quote
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .total_tax_on_day_meeting_package_include_exclude
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting
                                      .total_tax_on_day_meeting_package_include_exclude
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting
                                      .total_tax_on_day_meeting_package_include_exclude
                                      .name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .total_tax_on_day_meeting_package_include_exclude
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .banquet_service_amount
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting.banquet_service_amount
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.banquet_service_amount
                                      .name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .banquet_service_amount
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .banquet_service_quoted
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting.banquet_service_quoted
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.banquet_service_quoted
                                      .name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .banquet_service_quoted
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .banquet_service_charges_taxed
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting
                                      .banquet_service_charges_taxed.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting
                                      .banquet_service_charges_taxed.name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .banquet_service_charges_taxed
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  <span className={styles.fieldNameBold}>
                                    {
                                      Settings.instructions
                                        .banquet_service_include_exclude
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={styles.fieldValue}>
                                <input
                                  id={
                                    Settings.groupMeeting
                                      .banquet_service_include_exclude.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting
                                      .banquet_service_include_exclude.name
                                  }
                                  className={styles.groupMeetingInputLabel}
                                  value={
                                    contextType.state.meetingData.list
                                      .banquet_service_include_exclude
                                  }
                                  maxLength={10}
                                  readOnly
                                  tabIndex={-1}
                                />
                              </td>
                            </tr>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                        <tr className={styles.width_100}>
                          <td className={styles.fieldName}>
                            {Settings.instructions.max_cost_for_10_person}
                          </td>
                          <td className={styles.fieldValue}>
                            {contextType.enableField &&
                              (contextType.isDisabledMeeting === true ? (
                                contextType.state.meetingData.list
                                  .max_cost_for_10_person
                              ) : (
                                <input
                                  id={
                                    Settings.groupMeeting.max_cost_for_10_person
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.max_cost_for_10_person
                                      .name
                                  }
                                  className={styles.groupMeetingInput}
                                  onChange={(e) => {
                                    this.onValidation_NumberOnly(
                                      e,
                                      "max_cost_for_10_person"
                                    );
                                  }}
                                  value={
                                    contextType.state.meetingData.list
                                      .max_cost_for_10_person == null
                                      ? ""
                                      : contextType.state.meetingData.list
                                          .max_cost_for_10_person
                                  }
                                  maxLength={10}
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr className={styles.width_100}>
                          <td className={styles.fieldName}>
                            {Settings.instructions.max_cost_for_25_person}
                          </td>
                          <td className={styles.fieldValue}>
                            {contextType.enableField &&
                              (contextType.isDisabledMeeting === true ? (
                                contextType.state.meetingData.list
                                  .max_cost_for_25_person
                              ) : (
                                <input
                                  id={
                                    Settings.groupMeeting.max_cost_for_25_person
                                      .id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.max_cost_for_25_person
                                      .name
                                  }
                                  className={styles.groupMeetingInput}
                                  onChange={(e) => {
                                    this.onValidation_NumberOnly(
                                      e,
                                      "max_cost_for_25_person"
                                    );
                                  }}
                                  value={
                                    contextType.state.meetingData.list
                                      .max_cost_for_25_person == null
                                      ? ""
                                      : contextType.state.meetingData.list
                                          .max_cost_for_25_person
                                  }
                                  maxLength={10}
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr></tr>
                        <tr
                          className={`${styles.blockDisplay} ${styles.marginTop}`}
                        >
                          <td className={styles.headersMeetingPricing}>
                            {Settings.instructions.header_meeting_concession}
                          </td>
                        </tr>
                        <tr className={styles.width_100_first}>
                          <td className={styles.fieldName}>
                            {Settings.instructions.complimentary_parking_offer}
                          </td>
                          <td className={styles.dropdownlabel}>
                            {contextType.enableField &&
                              (contextType.isDisabledMeeting === true ? (
                                contextType.state.meetingData.list
                                  .complimentary_parking_not_overnight ===
                                "Y" ? (
                                  "Yes"
                                ) : contextType.state.meetingData.list
                                    .complimentary_parking_not_overnight ===
                                  "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupMeeting.filter
                                      .complimentaryParkingOption.id
                                  }
                                  selectedValue={
                                    contextType.state.meetingData.list
                                      .complimentary_parking_not_overnight
                                  }
                                  ddnOptions={
                                    Settings.groupMeeting.filter
                                      .groupMeetingConcessionOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "complimentaryParking"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupMeeting.filter
                                      .complimentaryParkingOption.keyField
                                  }
                                  valField={
                                    Settings.groupMeeting.filter
                                      .complimentaryParkingOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr className={styles.width_100}>
                          <td className={styles.fieldName}>
                            {Settings.instructions.free_internet_offer}
                          </td>
                          <td className={styles.fieldValue}>
                            {contextType.enableField &&
                              (contextType.isDisabledMeeting === true ? (
                                contextType.state.meetingData.list
                                  .free_internet_offer
                              ) : (
                                <input
                                  id={
                                    Settings.groupMeeting.free_internet_offer.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupMeeting.free_internet_offer
                                      .name
                                  }
                                  className={styles.groupMeetingInput}
                                  onChange={(e) => {
                                    this.onValidation_NumberOnly(
                                      e,
                                      "free_internet_offer"
                                    );
                                  }}
                                  value={
                                    contextType.state.meetingData.list
                                      .free_internet_offer == null
                                      ? ""
                                      : contextType.state.meetingData.list
                                          .free_internet_offer
                                  }
                                  maxLength={10}
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        {contextType.state.mpc_two ? (
                          <React.Fragment>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.instructions
                                    .cost_of_high_internet_included
                                }
                              </td>
                              <td className={styles.widthSpace}></td>
                              <td className={styles.dropdownlabel}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .high_internet_cost_included === "Y" ? (
                                      "Yes"
                                    ) : contextType.state.meetingData.list
                                        .high_internet_cost_included === "N" ? (
                                      "No"
                                    ) : null
                                  ) : (
                                    <CSelect
                                      id={
                                        Settings.groupMeeting.filter
                                          .highInternetOption.id
                                      }
                                      selectedValue={
                                        contextType.state.meetingData.list
                                          .high_internet_cost_included
                                      }
                                      ddnOptions={
                                        Settings.groupMeeting.filter
                                          .groupMeetingConcessionOptions
                                      }
                                      onChange={(e) => {
                                        contextType.handleDropdownChange(
                                          e,
                                          "highInternet"
                                        );
                                      }}
                                      keyField={
                                        Settings.groupMeeting.filter
                                          .highInternetOption.keyField
                                      }
                                      valField={
                                        Settings.groupMeeting.filter
                                          .highInternetOption.valField
                                      }
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {Settings.instructions.lcd_cost_per_day}
                              </td>
                              <td className={styles.widthSpace}></td>
                              <td className={styles.dropdownlabel}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .lcd_cost_included === "Y" ? (
                                      "Yes"
                                    ) : contextType.state.meetingData.list
                                        .lcd_cost_included === "N" ? (
                                      "No"
                                    ) : null
                                  ) : (
                                    <CSelect
                                      id={
                                        Settings.groupMeeting.filter
                                          .lcdCostOption.id
                                      }
                                      selectedValue={
                                        contextType.state.meetingData.list
                                          .lcd_cost_included
                                      }
                                      ddnOptions={
                                        Settings.groupMeeting.filter
                                          .groupMeetingConcessionOptions
                                      }
                                      onChange={(e) => {
                                        contextType.handleDropdownChange(
                                          e,
                                          "lcdOption"
                                        );
                                      }}
                                      keyField={
                                        Settings.groupMeeting.filter
                                          .lcdCostOption.keyField
                                      }
                                      valField={
                                        Settings.groupMeeting.filter
                                          .lcdCostOption.valField
                                      }
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                            <tr className={styles.width_100}>
                              <td className={styles.fieldName}>
                                {Settings.instructions.standard_screen_cost}
                              </td>
                              <td className={styles.widthSpace}></td>
                              <td className={styles.dropdownlabel}>
                                {contextType.enableField &&
                                  (contextType.isDisabledMeeting === true ? (
                                    contextType.state.meetingData.list
                                      .standard_screen_included === "Y" ? (
                                      "Yes"
                                    ) : contextType.state.meetingData.list
                                        .standard_screen_included === "N" ? (
                                      "No"
                                    ) : null
                                  ) : (
                                    <CSelect
                                      id={
                                        Settings.groupMeeting.filter
                                          .standardScreenOption.id
                                      }
                                      selectedValue={
                                        contextType.state.meetingData.list
                                          .standard_screen_included
                                      }
                                      ddnOptions={
                                        Settings.groupMeeting.filter
                                          .groupMeetingConcessionOptions
                                      }
                                      onChange={(e) => {
                                        contextType.handleDropdownChange(
                                          e,
                                          "standardScreen"
                                        );
                                      }}
                                      keyField={
                                        Settings.groupMeeting.filter
                                          .standardScreenOption.keyField
                                      }
                                      valField={
                                        Settings.groupMeeting.filter
                                          .standardScreenOption.valField
                                      }
                                      onFocus={(e) => {
                                        this.handleFocusEvent(e);
                                      }}
                                    />
                                  ))}
                              </td>
                            </tr>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                        <tr className={styles.width_100}>
                          <td className={styles.fieldName}>
                            {Settings.instructions.in_house_visual_department}
                          </td>
                          <td className={styles.widthSpace}></td>
                          <td className={styles.dropdownlabel}>
                            {contextType.enableField &&
                              (contextType.isDisabledMeeting === true ? (
                                contextType.state.meetingData.list
                                  .in_house_audio_discount === "Y" ? (
                                  "Yes"
                                ) : contextType.state.meetingData.list
                                    .in_house_audio_discount === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupMeeting.filter
                                      .inHouseVisualOption.id
                                  }
                                  selectedValue={
                                    contextType.state.meetingData.list
                                      .in_house_audio_discount
                                  }
                                  ddnOptions={
                                    Settings.groupMeeting.filter
                                      .groupMeetingConcessionOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "inHouseAudio"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupMeeting.filter
                                      .inHouseVisualOption.keyField
                                  }
                                  valField={
                                    Settings.groupMeeting.filter
                                      .inHouseVisualOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                }}
              </MeetingContext.Consumer>
            </MeetingContextProvider>
          );
        }}
      </HotelContext.Consumer>
    );
  }
}

export default withRouter(Meeting);
