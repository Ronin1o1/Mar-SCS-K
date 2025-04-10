import React, { Component } from "react";
import styles from "./groupsMeetingsPayment.css";
import Settings from "./static/Settings";
import API from "./service/API";
import HotelContext, {
  HotelContextProvider,
} from "../../context/groupMeetingContextProvider";
import GroupMeetingsPaymentContext, {
  GroupMeetingsPaymentContextProvider,
} from "./context/groupMeetingsPaymentContext";
import CSelect from "../../../../../../common/components/CSelect";
import CToolTip from "../../../../../../common/components/CToolTip";
import { withRouter } from "react-router-dom";

let contextType = null;
let parentContextType = null;
let hotelrfpid = null;

class groupMeetingsPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hotelrfpid = parentContextType.masterData.hotelrfpid;
    API.getHotelGrpMtgPaymentTab(hotelrfpid).then((data) => {
      contextType.setGroupPaymentData(data);
    });
    document.addEventListener("keydown", this.downHandler);
  }

  componentWillUnmount = () => {
    contextType.checkHotelUserAlert();
    document.removeEventListener("keydown", this.downHandler);
  };

  componentDidUpdate = () => {
    if (
      parentContextType.state.activeTab === "groupsMeetingsPayment" &&
      parentContextType.state.saveGroupMeetingEvent != null
    ) {
      contextType.checkPaymentTab();
      parentContextType.setState({
        ...parentContextType.state,
        saveGroupMeetingEvent: null,
      });
    }

    contextType.onSaveClick();
  };

  onChangeHandler() {}

  onValidation_WholeNumberOnly = (e, field) => {
    const re_number = /^[0-9\b]+$/;
    if (
      (e.target.value === "" || re_number.test(e.target.value)) &&
      !e.target.value.includes(".")
    ) {
      const updatedList = contextType.state.paymentData.list;
      if (field === "payment_terms") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.payment_terms = e.target.value;
          contextType.setPaymentAlert("");
        } else {
          contextType.setPaymentAlert("Y");
        }
      }
      updatedList.grpMtgPayChg = "Y";
      contextType.setGroupPaymentValidation(updatedList);
      contextType.validationCheckOnChange(updatedList);
    }
  };

  downHandler = (e) => {
    if (e.key === "Tab" && e.shiftKey === false) {
      e.preventDefault();
      const focusable = document
        .querySelector("#groupPaymentTable")
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
      .querySelector("#groupPaymentTable")
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
            <GroupMeetingsPaymentContextProvider>
              <GroupMeetingsPaymentContext.Consumer>
                {(GroupMeetingPaymentContext) => {
                  contextType = GroupMeetingPaymentContext;
                  return (
                    <table
                      className={`${styles.mainTable} ${styles.meetingmainTable}`}
                      id="groupPaymentTable"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <input
                              id={Settings.groupPayment.grpMtgPayChg.id}
                              type="hidden"
                              name={Settings.groupPayment.grpMtgPayChg.name}
                              value={Settings.groupPayment.grpMtgPayChg.value}
                            />
                          </td>
                        </tr>
                        <tr className={styles.headerBlock}>
                          <td className={styles.headers}>
                            {Settings.instructions.header_payment}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.instructions.require_advance_deposit}
                          </td>
                          <td className={styles.widthSpace}></td>
                          <td className={styles.dropdownlabel}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPayment ? (
                                contextType.state.paymentData.list
                                  .require_advance_deposit === "Y" ? (
                                  "Yes"
                                ) : contextType.state.paymentData.list
                                    .require_advance_deposit === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupPayment.filter
                                      .advanceDepositOption.id
                                  }
                                  selectedValue={
                                    contextType.state.paymentData.list
                                      .require_advance_deposit
                                  }
                                  ddnOptions={
                                    Settings.groupPayment.filter
                                      .groupPaymentOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "advanceDeposit"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupPayment.filter
                                      .advanceDepositOption.keyField
                                  }
                                  valField={
                                    Settings.groupPayment.filter
                                      .advanceDepositOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={`${styles.fieldName} ${styles.paddingTop}`}
                          >
                            {Settings.instructions.allow_direct_billing}
                          </td>
                          <td className={styles.widthSpace}></td>
                          <td className={styles.dropdownlabel}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPayment ? (
                                contextType.state.paymentData.list
                                  .allow_direct_billing === "Y" ? (
                                  "Yes"
                                ) : contextType.state.paymentData.list
                                    .allow_direct_billing === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupPayment.filter
                                      .directBillingOption.id
                                  }
                                  selectedValue={
                                    contextType.state.paymentData.list
                                      .allow_direct_billing
                                  }
                                  ddnOptions={
                                    Settings.groupPayment.filter
                                      .groupPaymentOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "directBilling"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupPayment.filter
                                      .directBillingOption.keyField
                                  }
                                  valField={
                                    Settings.groupPayment.filter
                                      .directBillingOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        {contextType.state.show_payment_terms ? (
                          <tr className={styles.padbtm}>
                            <td
                              className={`${styles.fieldName} ${styles.paddingTop} ${styles.paddingLeft}`}
                            >
                              {Settings.instructions.payment_term_one}"
                              {Settings.instructions.payment_term_two}"
                              {Settings.instructions.payment_term_three}
                            </td>
                            <td className={styles.fieldValue}>
                              {contextType.state.enableField &&
                                (contextType.state.isDisabledPayment ? (
                                  contextType.state.paymentData.list
                                    .payment_terms
                                ) : (
                                  <input
                                    id={Settings.groupPayment.payment_terms.id}
                                    type="text"
                                    name={
                                      Settings.groupPayment.payment_terms.name
                                    }
                                    className={styles.groupPaymentInput}
                                    onChange={(e) => {
                                      this.onValidation_WholeNumberOnly(
                                        e,
                                        "payment_terms"
                                      );
                                    }}
                                    value={
                                      contextType.state.paymentData.list
                                        .payment_terms == null
                                        ? ""
                                        : contextType.state.paymentData.list
                                            .payment_terms
                                    }
                                    maxLength={10}
                                    onFocus={(e) => {
                                      this.handleFocusEvent(e);
                                    }}
                                  />
                                ))}
                              {Settings.instructions.payment_term_four}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                        <tr>
                          <td
                            className={`${styles.fieldName} ${styles.paddingTop}`}
                          >
                            {
                              Settings.instructions
                                .accept_corporate_meeting_card
                            }
                            <span>{Settings.instructions.meeting_card}</span>                         
                            {Settings.instructions.credit_card_msg}
                          </td>
                          <td className={styles.widthSpace}></td>
                          <td className={styles.dropdownlabel}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPayment ? (
                                contextType.state.paymentData.list
                                  .accept_corporate_meeting_card === "Y" ? (
                                  "Yes"
                                ) : contextType.state.paymentData.list
                                    .accept_corporate_meeting_card === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupPayment.filter
                                      .corporateCardOption.id
                                  }
                                  selectedValue={
                                    contextType.state.paymentData.list
                                      .accept_corporate_meeting_card
                                  }
                                  ddnOptions={
                                    Settings.groupPayment.filter
                                      .groupPaymentOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "corporateMeetingCard"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupPayment.filter
                                      .corporateCardOption.keyField
                                  }
                                  valField={
                                    Settings.groupPayment.filter
                                      .corporateCardOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        {contextType.state.show_funds_on_credit ? (
                          <tr className={styles.padbtm}>
                            <td
                              className={`${styles.fieldName} ${styles.paddingTop} ${styles.paddingLeft}`}
                            >
                              {Settings.instructions.payment_term_one}"
                              {Settings.instructions.payment_term_two}"
                              {Settings.instructions.funds_on_credit_one}"
                              {Settings.instructions.funds_on_credit_two}"
                              {Settings.instructions.funds_on_credit_three}
                            </td>
                            <td className={styles.widthSpace}></td>
                            <td className={styles.dropdownlabel}>
                              {contextType.state.enableField &&
                                (contextType.state.isDisabledPayment ? (
                                  contextType.state.paymentData.list
                                    .funds_on_card === "Y" ? (
                                    "Yes"
                                  ) : contextType.state.paymentData.list
                                      .funds_on_card === "N" ? (
                                    "No"
                                  ) : null
                                ) : (
                                  <CSelect
                                    id={
                                      Settings.groupPayment.filter
                                        .fundsdHeldOption.id
                                    }
                                    selectedValue={
                                      contextType.state.paymentData.list
                                        .funds_on_card
                                    }
                                    ddnOptions={
                                      Settings.groupPayment.filter
                                        .groupPaymentOptions
                                    }
                                    onChange={(e) => {
                                      contextType.handleDropdownChange(
                                        e,
                                        "fundsCard"
                                      );
                                    }}
                                    keyField={
                                      Settings.groupPayment.filter
                                        .fundsdHeldOption.keyField
                                    }
                                    valField={
                                      Settings.groupPayment.filter
                                        .fundsdHeldOption.valField
                                    }
                                    onFocus={(e) => {
                                      this.handleFocusEvent(e);
                                    }}
                                  />
                                ))}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>
                  );
                }}
              </GroupMeetingsPaymentContext.Consumer>
            </GroupMeetingsPaymentContextProvider>
          );
        }}
      </HotelContext.Consumer>
    );
  }
}

export default withRouter(groupMeetingsPayment);
