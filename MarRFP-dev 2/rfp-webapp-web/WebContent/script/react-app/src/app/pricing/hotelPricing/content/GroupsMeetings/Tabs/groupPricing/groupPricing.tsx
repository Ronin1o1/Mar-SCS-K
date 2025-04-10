import React, { Component, useContext } from "react";
import styles from "./groupPricing.css";
import Settings from "./static/Settings";
import API from "./service/API";
import HotelContext, {
  HotelContextProvider,
} from "../../context/groupMeetingContextProvider";
import GroupPricingContext, {
  GroupPricingContextProvider,
} from "./context/groupPricingContext";
import CSelect from "../../../../../../common/components/CSelect";
import { withRouter } from "react-router-dom";

let contextType = null;
let parentContextType = null;
let hotelrfpid = null;

class groupPricing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hotelrfpid = parentContextType.masterData.hotelrfpid;
    API.getRFPGrpPriceTab(hotelrfpid).then((data) => {
      contextType.setGroupPricingData(data);
    });
    document.addEventListener("keydown", this.downHandler);
  }

  componentWillUnmount = () => {
    contextType.checkHotelUserAlert();
    contextType.componentUnload();
    document.removeEventListener("keydown", this.downHandler);
  };

  componentDidUpdate = () => {
    if (
      parentContextType.state.activeTab === "groupPricing" &&
      parentContextType.state.saveGroupMeetingEvent != null
    ) {
      contextType.checkGrpPricetab();
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
      const updatedList = contextType.state.groupPricingData.list;
      if (field === "max_nego_for_10_50") {
        if (
          (e.target.value === "" || re_number.test(e.target.value)) &&
          !e.target.value.includes("e")
        ) {
          updatedList.max_nego_for_10_50 = e.target.value;
          contextType.setPricingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setPricingAlert("Y");
        }
      }
      if (field === "max_nego_for_51_100") {
        if (
          (e.target.value === "" || re_number.test(e.target.value)) &&
          !e.target.value.includes("e")
        ) {
          updatedList.max_nego_for_51_100 = e.target.value;
          contextType.setPricingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setPricingAlert("Y");
        }
      }
      updatedList.grpPriceChg = "Y";
      contextType.setGroupPricingValidation(updatedList);
    }
  };

  onValidation_WholeNumberOnly = (e, field) => {
    const re_number = /^[0-9\b]+$/;
    if (
      (e.target.value === "" || re_number.test(e.target.value)) &&
      !e.target.value.includes(".")
    ) {
      const updatedList = contextType.state.groupPricingData.list;
      if (field === "no_compliment_room") {
        if (e.target.value === "" || re_number.test(e.target.value)) {
          updatedList.no_compliment_room = e.target.value;
          contextType.setPricingAlert(e.target.value === "" ? "Y" : "");
        } else {
          contextType.setPricingAlert("Y");
        }
      }
      updatedList.grpPriceChg = "Y";
      contextType.setGroupPricingValidation(updatedList);
    }
  };

  downHandler = (e) => {
    if (e.key === "Tab" && e.shiftKey === false) {
      e.preventDefault();
      const focusable = document
        .querySelector("#groupPricingTable")
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
      .querySelector("#groupPricingTable")
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
            <GroupPricingContextProvider>
              <GroupPricingContext.Consumer>
                {(GroupPricingContext) => {
                  contextType = GroupPricingContext;
                  return (
                    <table className={`${styles.mainTable} ${styles.meetingmainTable}`} id="groupPricingTable">
                      <tbody>
                        <tr>
                          <td>
                            <input
                              id={Settings.groupPricing.grpPriceChg.id}
                              type="hidden"
                              name={Settings.groupPricing.grpPriceChg.name}
                              value={Settings.groupPricing.grpPriceChg.value}
                            />
                          </td>
                        </tr>
                        <tr className={styles.headers}>
                          <td>{Settings.instructions.header_pricing}</td>
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.instructions.pricing_label_one}
                          </td>
                          <td className={styles.fieldValue}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPricing ? (
                                contextType.state.groupPricingData.list
                                  .max_nego_for_10_50
                              ) : (
                                <input
                                  id={
                                    Settings.groupPricing.max_nego_for_10_50.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupPricing.max_nego_for_10_50
                                      .name
                                  }
                                  className={styles.groupPricingInput}
                                  onChange={(e) => {
                                    this.onValidation_NumberOnly(
                                      e,
                                      "max_nego_for_10_50"
                                    );
                                  }}
                                  value={
                                    contextType.state.groupPricingData.list
                                      .max_nego_for_10_50 == null
                                      ? ""
                                      : contextType.state.groupPricingData.list
                                          .max_nego_for_10_50
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
                          <td className={styles.fieldName}>
                            {Settings.instructions.pricing_label_two}
                          </td>
                          <td className={styles.fieldValue}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPricing ? (
                                contextType.state.groupPricingData.list
                                  .max_nego_for_51_100
                              ) : (
                                <input
                                  id={
                                    Settings.groupPricing.max_nego_for_51_100.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupPricing.max_nego_for_51_100
                                      .name
                                  }
                                  className={styles.groupPricingInput}
                                  onChange={(e) => {
                                    this.onValidation_NumberOnly(
                                      e,
                                      "max_nego_for_51_100"
                                    );
                                  }}
                                  value={
                                    contextType.state.groupPricingData.list
                                      .max_nego_for_51_100 == null
                                      ? ""
                                      : contextType.state.groupPricingData.list
                                          .max_nego_for_51_100
                                  }
                                  maxLength={10}
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr>&nbsp;</tr>
                        <tr className={styles.headers}>
                          <td>{Settings.instructions.header_concessions}</td>
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.instructions.concession_label_one}
                          </td>
                          <td className={styles.dropdownlabel}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPricing ? (
                                contextType.state.groupPricingData.list
                                  .negotiated_tranisent_rate === "Y" ? (
                                  "Yes"
                                ) : contextType.state.groupPricingData.list
                                    .negotiated_tranisent_rate === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupPricing.filter
                                      .groupPricingOption.id
                                  }
                                  selectedValue={
                                    contextType.state.groupPricingData.list
                                      .negotiated_tranisent_rate
                                  }
                                  ddnOptions={
                                    Settings.groupPricing.filter
                                      .groupPricingOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "negotiatedRate"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupPricing.filter
                                      .groupPricingOption.keyField
                                  }
                                  valField={
                                    Settings.groupPricing.filter
                                      .groupPricingOption.valField
                                  }
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.instructions.concession_lable_two}
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPricing ? (
                                contextType.state.groupPricingData.list
                                  .no_compliment_room
                              ) : (
                                <input
                                  id={
                                    Settings.groupPricing.no_compliment_room.id
                                  }
                                  type="text"
                                  name={
                                    Settings.groupPricing.no_compliment_room
                                      .name
                                  }
                                  className={styles.groupPricingInput}
                                  onChange={(e) => {
                                    this.onValidation_WholeNumberOnly(
                                      e,
                                      "no_compliment_room"
                                    );
                                  }}
                                  value={
                                    contextType.state.groupPricingData.list
                                      .no_compliment_room == null
                                      ? ""
                                      : contextType.state.groupPricingData.list
                                          .no_compliment_room
                                  }
                                  maxLength={10}
                                  onFocus={(e) => {
                                    this.handleFocusEvent(e);
                                  }}
                                />
                              ))}
                            {Settings.instructions.concession_lable_two_part}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.instructions.concession_lable_three}
                          </td>
                          <td className={styles.dropdownlabel}>
                            {contextType.state.enableField &&
                              (contextType.state.isDisabledPricing ? (
                                contextType.state.groupPricingData.list
                                  .discount_food_beverage === "Y" ? (
                                  "Yes"
                                ) : contextType.state.groupPricingData.list
                                    .discount_food_beverage === "N" ? (
                                  "No"
                                ) : null
                              ) : (
                                <CSelect
                                  id={
                                    Settings.groupPricing.filter
                                      .foodBeverageDiscount.id
                                  }
                                  selectedValue={
                                    contextType.state.groupPricingData.list
                                      .discount_food_beverage
                                  }
                                  ddnOptions={
                                    Settings.groupPricing.filter
                                      .groupPricingOptions
                                  }
                                  onChange={(e) => {
                                    contextType.handleDropdownChange(
                                      e,
                                      "foodBeverage"
                                    );
                                  }}
                                  keyField={
                                    Settings.groupPricing.filter
                                      .foodBeverageDiscount.keyField
                                  }
                                  valField={
                                    Settings.groupPricing.filter
                                      .foodBeverageDiscount.valField
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
              </GroupPricingContext.Consumer>
            </GroupPricingContextProvider>
          );
        }}
      </HotelContext.Consumer>
    );
  }
}

export default withRouter(groupPricing);
