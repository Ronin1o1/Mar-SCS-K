import React, { useContext, useEffect, useState } from "react";
import styles from "./GroupsAndMeetings.css";
import { useLocation } from "react-router-dom";
import Settings from "../static/Settings";
import API from "../service/API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import GroupsAndMeetingsContext, {
  GroupsAndMeetingsContextProvider,
} from "../context/GroupsAndMeetingsContextProvider";
import classNames from "classnames";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import { CLoader } from "../../../../../../../../../common/components/CLoader";
let contextType = null;
let bGenGroupsOK = true;

function GroupsAndMeetings(parms) {
  const urlParams = useLocation().search;
  const [showLoader, setLoader] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const hotelId = new URLSearchParams(urlParams).get("HotelId");
  const hotelAccountinfoid = new URLSearchParams(urlParams).get(
    "AccountInfoId"
  );
  const rebidStatus = sessionStorage.getItem("rebidStatus");

  useEffect(() => {
    const param = {
      hotelId: hotelId,
      hotelAccountinfoid: hotelAccountinfoid,
    };

    API.getHotelAccountSpecificGeneralGroupsTab(param).then((data) => {
      contextType.setGroupsMeetingsData(data);
      if (appContext?.user?.isPASorAnySales) {
        appContext.setGenGroupMeetingsTick("C");
      }
      const validPage = contextType?.gengroups_check(true);
      if (validPage == "failed") {
        appContext.setGroupsAndMeetingError({
          show: true,
          msg: Settings.alerts.fillAllGroupMeetingDetails,
        });
      } else {
        appContext.setGroupsAndMeetingError({
          show: false,
          msg: "",
        });
      }
    });
    return () => {
      console.log("in unmount");
      checkgengroupstabfromReturn();
      appContext.setGroupsAndMeetingError({
        show: false,
        msg: "",
      });
    };
  }, []);

  useEffect(() => {
    if (appContext.saveGroupMeetingClicked) {
      if (appContext.isActiveTab === "groupsMeetings") {
        checkgengroupstab();
        appContext.setSaveGroupMeetingClicked(false);
      }
    }
  }, [appContext.saveGroupMeetingClicked]);

  const checkgengroupstabfromReturn = () => {
    if (rebidStatus != "2") {
      const gengroupscheck = contextType.gengroups_check(true);
      if (gengroupscheck == "complete" || gengroupscheck == "continue") {
        updateGroups();
        bGenGroupsOK = true;
        if (gengroupscheck == "complete") {
          appContext.setGenGroupMeetingsTick("C");
          parentContext.setGenGroupMeetingsStatus("C");
        }
      }
    }
  };
  const checkgengroupstab = () => {
    if (rebidStatus != "2") {
      const gengroupscheck = contextType.gengroups_check(false);
      if (gengroupscheck == "complete" || gengroupscheck == "continue") {
        updateGroups();
        bGenGroupsOK = true;
        if (gengroupscheck == "complete") {
          appContext.setGenGroupMeetingsTick("C");
          parentContext.setGenGroupMeetingsStatus("C");
        }
      }
    }
  };

  const onDropDownSelect = (e, field) => {
    const editObj = contextType.state.data.list;
    editObj[field] = e.target.value;

    contextType.setGroupsMeetingsData(editObj);
    contextType.setIsFormValueChanged("Y");
    contextType.setIsFormEdited(!contextType.isFormEdited);
  };

  const onInputChange = (e, field) => {
    const editObj = contextType.state.data.list;
    let regex;
    if (field === "negratefifty" || field === "comprooms") {
      regex = /^[0-9]*$/;
    } else {
      regex = /^[0-9]*\.?[0-9]*$/;
    }

    if (e.target.value == "" || !regex.test(e.target.value)) {
      if (!regex.test(e.target.value)) {
        editObj[field] = e.target.value === "" ? null : editObj[field];
      } else {
        editObj[field] = e.target.value;
      }
    } else {
      editObj[field] = e.target.value;
    }

    contextType.setGroupsMeetingsData(editObj);
    contextType.setIsFormValueChanged("Y");
    contextType.setIsFormEdited(!contextType.isFormEdited);
  };

  const updateGroups = () => {
    setLoader(true);
    const param = {
      strHotelAccountSpecificGroups: JSON.stringify({
        negratefifty: parseInt(contextType.state.data.list.negratefifty),
        negratehund: parseInt(contextType.state.data.list.negratehund),
        negtranshighrate: contextType.state.data.list.negtranshighrate,
        comprooms: parseInt(contextType.state.data.list.comprooms),
        oldcomprooms: parseInt(contextType.state.data.list.oldcomprooms),
        discfb: contextType.state.data.list.discfb,
        meetingdaymeetingpckg:
          contextType.state.data.list.meetingdaymeetingpckg,
        fulldayratefifty: parseInt(
          contextType.state.data.list.fulldayratefifty
        ),
        halfdayratefifty: parseInt(
          contextType.state.data.list.halfdayratefifty
        ),
        fulldayratehund: parseInt(contextType.state.data.list.fulldayratehund),
        halfdayratehund: parseInt(contextType.state.data.list.halfdayratehund),
        costbrkten: parseInt(contextType.state.data.list.costbrkten),
        costbrktwnfive: parseInt(contextType.state.data.list.costbrktwnfive),
        intfeeincldaymtg: contextType.state.data.list.intfeeincldaymtg,
        lcdcostincldaymtg: contextType.state.data.list.lcdcostincldaymtg,
        scncostincldaymtg: contextType.state.data.list.scncostincldaymtg,
        acctGenGroupsChg: contextType.state.data.list.acctGenGroupsChg,
      }),
    };

    API.updateGenGroups(param, hotelAccountinfoid)
      .then((res) => {
        setLoader(false);
      })
      .catch((error) => {
        alert(Settings.alerts.errorOnFill);
      });
  };

  return (
    <GroupsAndMeetingsContextProvider>
      <GroupsAndMeetingsContext.Consumer>
        {(report) => {
          contextType = report;

          return (
            <div className={`${styles.GAMContainer} ${"updategroupsandmeeet"}`}>
              {showLoader ? <CLoader></CLoader> : ""}
              <div id="acctGenGroupsForm">
                <div
                  className={classNames(
                    styles.acctGenGroupsDiv,
                    styles.grpPaddingTop
                  )}
                >
                  <div className={styles.labelClass}>
                    {Settings.labels.maxNegotiatedRate_10To50}
                  </div>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.negrateFifty
                    )}
                  >
                    <input
                      id="hotelAccountSpecificGroups.negratefifty"
                      name="hotelAccountSpecificGroups.negratefifty"
                      className={classNames(
                        styles.numberField,
                        styles.grpMeetInputCls
                      )}
                      maxLength={10}
                      disabled={parentContext.isRebidDeclined}
                      value={
                        contextType.state.data.list.negratefifty == null
                          ? ""
                          : contextType.state.data.list.negratefifty
                      }
                      onChange={(e) => {
                        onInputChange(e, "negratefifty");
                      }}
                    />
                  </div>
                </div>
                <div className={styles.acctGenGroupsSpaceDiv_800}>
                  <div className={styles.labelClass}>
                    {Settings.labels.maxNegotiatedRate_51To100}
                  </div>
                  <div
                    className={classNames(styles.Field_Value, styles.floatleft)}
                  >
                    <input
                      id="hotelAccountSpecificGroups.negratehund"
                      name="hotelAccountSpecificGroups.negratehund"
                      className={classNames(
                        styles.numberField,
                        styles.grpMeetInputCls
                      )}
                      disabled={parentContext.isRebidDeclined}
                      maxLength={10}
                      value={
                        contextType.state.data.list.negratehund == null
                          ? ""
                          : contextType.state.data.list.negratehund
                      }
                      onChange={(e) => {
                        onInputChange(e, "negratehund");
                      }}
                    />
                  </div>
                </div>
                <div className={styles.grpMeetSpace}>&nbsp;</div>
                <div className={styles.acctGenGroupsSpaceDiv_800}>
                  <div className={styles.labelClass}>
                    {Settings.labels.specialNegotiatedTransRate}
                  </div>
                  <select
                    name="hotelAccountSpecificGroups.negtranshighrate"
                    id="hotelAccountSpecificGroups.negtranshighrate"
                    value={contextType.state.data.list.negtranshighrate}
                    disabled={parentContext.isRebidDeclined}
                    onChange={(e) => {
                      onDropDownSelect(e, "negtranshighrate");
                    }}
                  >
                    <option selected />
                    <option value="Y">{Settings.labels.yes_label}</option>
                    <option value="N">{Settings.labels.no_label}</option>
                  </select>
                </div>
                <div className={styles.relativeHeight_25}>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_650_Height_20
                    )}
                  >
                    {Settings.labels.compRooms_label1}
                    <input
                      id="hotelAccountSpecificGroups.comprooms"
                      name="hotelAccountSpecificGroups.comprooms"
                      className={styles.grpMeetInputCls}
                      maxLength={10}
                      disabled={parentContext.isRebidDeclined}
                      value={
                        contextType.state.data.list.comprooms == null
                          ? ""
                          : contextType.state.data.list.comprooms
                      }
                      onChange={(e) => {
                        onInputChange(e, "comprooms");
                      }}
                    />
                    <input
                      type="hidden"
                      id="oldcomprooms"
                      name="oldcomprooms"
                    />
                    {Settings.labels.compRooms_label2}
                  </div>
                </div>
                <div className={styles.clear_25}>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_700
                    )}
                  >
                    {" "}
                    {Settings.labels.discountBeverageCharges}
                  </div>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_65
                    )}
                  >
                    <select
                      name="hotelAccountSpecificGroups.discfb"
                      id="hotelAccountSpecificGroups.discfb"
                      value={contextType.state.data.list.discfb}
                      disabled={parentContext.isRebidDeclined}
                      onChange={(e) => {
                        onDropDownSelect(e, "discfb");
                      }}
                    >
                      <option selected />
                      <option value="Y">{Settings.labels.yes_label}</option>
                      <option value="N">{Settings.labels.no_label}</option>
                    </select>
                  </div>
                </div>
                <div className={styles.acctGenGroupsBottomDiv_870}>
                  <div className={styles.labelBold}>
                    <span
                      className={styles.lblTrans}
                      id="label_packages"
                      title={Settings.labels.dayMeetingTitle}
                    >
                      {Settings.labels.dayMeetingOffered}
                    </span>
                  </div>

                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_65
                    )}
                  >
                    {contextType.state.data.list.meetingdaymeetingpckg == "Y"
                      ? Settings.labels.yes_label
                      : Settings.labels.no_label}
                  </div>
                  <input
                    type="hidden"
                    id="hotelAccountSpecificGroups.meetingdaymeetingpckg"
                    name="hotelAccountSpecificGroups.meetingdaymeetingpckg"
                    value={contextType.state.data.list.meetingdaymeetingpckg}
                    onChange={(e) => {
                      onInputChange(e, "meetingdaymeetingpckg");
                    }}
                  />
                </div>
                <div
                  id="packages_offered"
                  className={
                    contextType.state.data.list.meetingdaymeetingpckg == "Y"
                      ? styles.visibleBlock
                      : styles.visibleHidden
                  }
                >
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.maxFullDayDelegate}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <input
                        id="hotelAccountSpecificGroups.fulldayratefifty"
                        name="hotelAccountSpecificGroups.fulldayratefifty"
                        className={classNames(
                          styles.numberField,
                          styles.grpMeetInputCls
                        )}
                        maxLength={10}
                        disabled={parentContext.isRebidDeclined}
                        value={
                          contextType.state.data.list.fulldayratefifty == null
                            ? ""
                            : contextType.state.data.list.fulldayratefifty
                        }
                        onChange={(e) => {
                          onInputChange(e, "fulldayratefifty");
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.maxHalfDayDelegate}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <input
                        id="hotelAccountSpecificGroups.halfdayratefifty"
                        name="hotelAccountSpecificGroups.halfdayratefifty"
                        className={classNames(
                          styles.numberField,
                          styles.grpMeetInputCls
                        )}
                        maxLength={10}
                        disabled={parentContext.isRebidDeclined}
                        value={
                          contextType.state.data.list.halfdayratefifty == null
                            ? ""
                            : contextType.state.data.list.halfdayratefifty
                        }
                        onChange={(e) => {
                          onInputChange(e, "halfdayratefifty");
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.maxFullDayDelegate_51To100}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <input
                        id="hotelAccountSpecificGroups.fulldayratehund"
                        name="hotelAccountSpecificGroups.fulldayratehund"
                        className={classNames(
                          styles.numberField,
                          styles.grpMeetInputCls
                        )}
                        maxLength={10}
                        disabled={parentContext.isRebidDeclined}
                        value={
                          contextType.state.data.list.fulldayratehund == null
                            ? ""
                            : contextType.state.data.list.fulldayratehund
                        }
                        onChange={(e) => {
                          onInputChange(e, "fulldayratehund");
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.maxHalfDayDelegate_51To100}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <input
                        id="hotelAccountSpecificGroups.halfdayratehund"
                        name="hotelAccountSpecificGroups.halfdayratehund"
                        className={classNames(
                          styles.numberField,
                          styles.grpMeetInputCls
                        )}
                        maxLength={10}
                        disabled={parentContext.isRebidDeclined}
                        value={
                          contextType.state.data.list.halfdayratehund == null
                            ? ""
                            : contextType.state.data.list.halfdayratehund
                        }
                        onChange={(e) => {
                          onInputChange(e, "halfdayratehund");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.acctGenGroupsBottomDiv_870}>
                  <div className={styles.labelClass}>
                    {Settings.labels.maxCostBreakOut_10}
                  </div>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_65
                    )}
                  >
                    <input
                      id="hotelAccountSpecificGroups.costbrkten"
                      name="hotelAccountSpecificGroups.costbrkten"
                      className={classNames(
                        styles.numberField,
                        styles.grpMeetInputCls
                      )}
                      maxLength={10}
                      disabled={parentContext.isRebidDeclined}
                      value={
                        contextType.state.data.list.costbrkten == null
                          ? ""
                          : contextType.state.data.list.costbrkten
                      }
                      onChange={(e) => {
                        onInputChange(e, "costbrkten");
                      }}
                    />
                  </div>
                </div>
                <div className={styles.acctGenGroupsBottomDiv_870}>
                  <div className={styles.labelClass}>
                    {Settings.labels.maxCostBreakOut_25}
                  </div>
                  <div
                    className={classNames(
                      styles.Field_Value,
                      styles.floatleft,
                      styles.width_65
                    )}
                  >
                    <input
                      id="hotelAccountSpecificGroups.costbrktwnfive"
                      name="hotelAccountSpecificGroups.costbrktwnfive"
                      className={classNames(
                        styles.numberField,
                        styles.grpMeetInputCls
                      )}
                      maxLength={10}
                      disabled={parentContext.isRebidDeclined}
                      value={
                        contextType.state.data.list.costbrktwnfive == null
                          ? ""
                          : contextType.state.data.list.costbrktwnfive
                      }
                      onChange={(e) => {
                        onInputChange(e, "costbrktwnfive");
                      }}
                    />
                  </div>
                </div>
                <div
                  id="packages_offered2"
                  className={
                    contextType.state.data.list.meetingdaymeetingpckg == "Y"
                      ? styles.visibleBlock
                      : styles.visibleHidden
                  }
                >
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.highSpeedInternetCost}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <select
                        name="hotelAccountSpecificGroups.intfeeincldaymtg"
                        id="hotelAccountSpecificGroups.intfeeincldaymtg"
                        value={contextType.state.data.list.intfeeincldaymtg}
                        disabled={parentContext.isRebidDeclined}
                        onChange={(e) => {
                          onDropDownSelect(e, "intfeeincldaymtg");
                        }}
                      >
                        <option selected />
                        <option value="Y">{Settings.labels.yes_label}</option>
                        <option value="N">{Settings.labels.no_label}</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.lcdCost}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <select
                        name="hotelAccountSpecificGroups.lcdcostincldaymtg"
                        id="hotelAccountSpecificGroups.lcdcostincldaymtg"
                        value={contextType.state.data.list.lcdcostincldaymtg}
                        disabled={parentContext.isRebidDeclined}
                        onChange={(e) => {
                          onDropDownSelect(e, "lcdcostincldaymtg");
                        }}
                      >
                        <option selected />
                        <option value="Y">{Settings.labels.yes_label}</option>
                        <option value="N">{Settings.labels.no_label}</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.acctGenGroupsBottomDiv_870}>
                    <div className={styles.labelClass}>
                      {Settings.labels.standardScreen}
                    </div>
                    <div
                      className={classNames(
                        styles.Field_Value,
                        styles.floatleft,
                        styles.width_65
                      )}
                    >
                      <select
                        name="hotelAccountSpecificGroups.scncostincldaymtg"
                        id="hotelAccountSpecificGroups.scncostincldaymtg"
                        value={contextType.state.data.list.scncostincldaymtg}
                        disabled={parentContext.isRebidDeclined}
                        onChange={(e) => {
                          onDropDownSelect(e, "scncostincldaymtg");
                        }}
                      >
                        <option selected />
                        <option value="Y">{Settings.labels.yes_label}</option>
                        <option value="N">{Settings.labels.no_label}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  id="acctGenGroupsChg"
                  name="acctGenGroupsChg"
                  defaultValue="N"
                />
              </div>
            </div>
          );
        }}
      </GroupsAndMeetingsContext.Consumer>
    </GroupsAndMeetingsContextProvider>
  );
}
export default GroupsAndMeetings;
