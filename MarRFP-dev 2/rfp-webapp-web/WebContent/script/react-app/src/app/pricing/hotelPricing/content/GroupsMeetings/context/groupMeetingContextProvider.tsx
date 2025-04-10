import React, { useContext, useState } from "react";
import API from "../service/API";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const HotelContext = React.createContext({});
export const HotelContextProvider = (props) => {
  const history = useHistory();
  const parentContextType = useContext(HotelPricingContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [masterData, setMasterData] = useState({
    marshaCode: "",
    hotelName: "",
    period: "",
    hotelrfpid: "",
  });

  const [state, setState] = useState({
    formChg: "N",
    currtab: "",

    showScreenLoader: false,
    activeTab: "groupPricing",
    showTab: false,
    isDisabledGrpCon: false,

    userRoleDetails: {
      eid: null,
      role: null,
      fullName: null,
      email: null,
    },

    groupMeetingData: {
      list: {
        GeneralReadOnly: false,
        offer_in_bt_rfp: null,
        offer_in_bt_rfp_text: "",
        tabgrpgmsflg: "",
        tabprcgmsflg: "",
        tabpaygmsflg: "",
        grpsmtgrespond: "",
        formChg: "N",
      },
    },

    data: {},
    saveGroupMeetingEvent: null,
  });

  const [emptyStateUpdate, setEmptystateUpdate] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [meetPrcConcessionFlag, setMeetPrcConcessionFlag] = useState(null);
  const [gmsPaymentFlag, setGmsPaymentFlag] = useState(null);
  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const switchTab = (event) => {
    if (
      event.target.innerText ===
      Settings.groupMeetingsList.tabs.tablist[1].label
    ) {
      setState({
        ...state,
        activeTab: Settings.groupMeetingsList.tabs.tablist[1].id,
      });
    } else {
      setState({ ...state, activeTab: event.target.id });
    }
  };

  const handleDropdownChange = (event) => {
    const selectedTabData = { ...state.groupMeetingData.list };
    const { id, value } = event.target;
    selectedTabData[id] = value;
    const prevGrpMeeting = appContext.grpMeetingsPrevSelect;
    appContext.setGrpMeetingsPrevSelect(prevGrpMeeting);
    if (value == "" && prevGrpMeeting != "") {
      selectedTabData.grpsmtgrespond = value;
      selectedTabData.offer_in_bt_rfp = value;
      if (value == "") {
        selectedTabData.offer_in_bt_rfp_text = value;
      } else {
        selectedTabData.offer_in_bt_rfp_text = value == "Y" ? "YES" : "NO";
      }
      sessionStorage.setItem("responseCustomer", value);
    } else {
      selectedTabData.grpsmtgrespond = value;
      selectedTabData.offer_in_bt_rfp = value;
      selectedTabData.offer_in_bt_rfp_text = value == "Y" ? "YES" : "NO";
      sessionStorage.setItem("responseCustomer", value);
    }
    selectedTabData.formChg = "Y";

    if (value === "Y") {
      setState({
        ...state,
        showTab: true,
        groupMeetingData: {
          ...state.groupMeetingData,
          list: selectedTabData,
        },
      });
      if (state.activeTab == "groupPricing" && appContext?.user?.isHotelUser) {
        if (
          selectedTabData.tabgrpgmsflg == "C" &&
          selectedTabData.tabprcgmsflg != "C"
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.alerts.meeting_field_required,
            type: "browserAlert",
          });
        } else if (
          selectedTabData.tabgrpgmsflg == "C" &&
          selectedTabData.tabpaygmsflg != "C"
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.alerts.payment_field_required,
            type: "browserAlert",
          });
        } else if (selectedTabData.tabgrpgmsflg != "C") {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.alerts.pricing_field_required,
            type: "browserAlert",
          });
        } else {
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
        }
      }
    } else {
      (selectedTabData.tabgrpgmsflg = ""),
        (selectedTabData.tabpaygmsflg = ""),
        (selectedTabData.tabprcgmsflg = "");
      setState({
        ...state,
        showTab: false,
        groupMeetingData: { ...state.groupMeetingData, list: selectedTabData },
      });

      if ((value === "" || value == null) && appContext?.user?.isHotelUser) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alerts.marRFP_selection_error,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
  };

  const setGroupsAndMeetingData = (data) => {
    let showTab = false;
    const loggedInRole = appContext.user.role;
    let is_disabled = false;
    if (data) {
      const groupsAndMeetingDataAPI = { ...state.groupMeetingData };
      groupsAndMeetingDataAPI.list.GeneralReadOnly = data.GeneralReadOnly;
      groupsAndMeetingDataAPI.list.offer_in_bt_rfp =
        data.hotelRFPRespond.grpsmtgrespond;
      if (data.hotelRFPRespond.grpsmtgrespond == "Y") {
        groupsAndMeetingDataAPI.list.offer_in_bt_rfp_text = "YES";
      } else if (data.hotelRFPRespond.grpsmtgrespond == "N") {
        groupsAndMeetingDataAPI.list.offer_in_bt_rfp_text = "NO";
      } else {
        groupsAndMeetingDataAPI.list.offer_in_bt_rfp_text = "";
      }

      groupsAndMeetingDataAPI.list.grpsmtgrespond =
        data.hotelRFPRespond.grpsmtgrespond;
      groupsAndMeetingDataAPI.list.tabgrpgmsflg =
        data.hotelRFPRespond.tabgrpgmsflg;
      groupsAndMeetingDataAPI.list.tabprcgmsflg =
        data.hotelRFPRespond.tabprcgmsflg;
      groupsAndMeetingDataAPI.list.tabpaygmsflg =
        data.hotelRFPRespond.tabpaygmsflg;
      showTab = data.hotelRFPRespond.grpsmtgrespond === "Y" ? true : false;
      is_disabled =
        data.GeneralReadOnly == true ||
        loggedInRole == "MFPSALES" ||
        loggedInRole == "MFPFSALE"
          ? true
          : false;

      setState({
        ...state,
        showTab: data.hotelRFPRespond.grpsmtgrespond === "Y" ? true : false,
        userRoleDetails: { ...state.userRoleDetails, role: loggedInRole },
        isDisabledGrpCon: is_disabled,
        groupMeetingData: groupsAndMeetingDataAPI,
      });
      setGmsPaymentFlag(data.hotelRFPRespond.tabpaygmsflg);
      setMeetPrcConcessionFlag(data.hotelRFPRespond.tabprcgmsflg);

      sessionStorage.setItem(
        "responseCustomer",
        data.hotelRFPRespond.grpsmtgrespond
      );

      sessionStorage.setItem(
        "UpdatePricingGrpFlag",
        data.hotelRFPRespond.tabgrpgmsflg
      );
      sessionStorage.setItem(
        "UpdateMeetingGrpFlag",
        data.hotelRFPRespond.tabprcgmsflg
      );
      sessionStorage.setItem(
        "UpdatePaymentGrpFlag",
        data.hotelRFPRespond.tabpaygmsflg
      );

      if (
        data.hotelRFPRespond.grpsmtgrespond == "Y" &&
        appContext?.user?.isHotelUser
      ) {
        if (state.activeTab == "groupPricing") {
          if (
            data.hotelRFPRespond.tabgrpgmsflg == "C" &&
            data.hotelRFPRespond.tabprcgmsflg != "C"
          ) {
            appContext.setErrorMessageAlert({
              show: true,
              message: Settings.alerts.meeting_field_required,
              type: "browserAlert",
            });
          } else if (
            data.hotelRFPRespond.tabgrpgmsflg == "C" &&
            data.hotelRFPRespond.tabpaygmsflg != "C"
          ) {
            appContext.setErrorMessageAlert({
              show: true,
              message: Settings.alerts.payment_field_required,
              type: "browserAlert",
            });
          } else if (data.hotelRFPRespond.tabgrpgmsflg != "C") {
            appContext.setErrorMessageAlert({
              show: true,
              message: Settings.alerts.pricing_field_required,
              type: "browserAlert",
            });
          } else {
            appContext.setErrorMessageAlert({
              show: false,
              message: "",
              type: "browserAlert",
            });
          }
        }
      } else if (
        (data.hotelRFPRespond.grpsmtgrespond === "" ||
          data.hotelRFPRespond.grpsmtgrespond == null) &&
        appContext?.user?.isHotelUser
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alerts.marRFP_selection_error,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
  };

  const saveGroupsAndMeeting = (e, isSaveClicked = false) => {
    setIsSaveClicked(isSaveClicked);
    const groupMeetingData = { ...state.groupMeetingData };
    if (
      state.groupMeetingData.list.GeneralReadOnly == true ||
      state.userRoleDetails.role == "MFPADMIN" ||
      state.userRoleDetails.role == "MFPUSER"
    ) {
      const selectedTabData = { ...state.groupMeetingData.list };
      if (
        sessionStorage.getItem("responseCustomer") == "" ||
        sessionStorage.getItem("responseCustomer") == null
      ) {
        if (appContext.grpMeetingsPrevSelect != "") {
          if (selectedTabData.grpsmtgrespond == "") {
            selectedTabData.grpsmtgrespond = "";
            selectedTabData.offer_in_bt_rfp = "";
          } else {
            selectedTabData.grpsmtgrespond = appContext.grpMeetingsPrevSelect;
            selectedTabData.offer_in_bt_rfp = appContext.grpMeetingsPrevSelect;
          }

          if (
            appContext.grpMeetingsPrevSelect == "Y" &&
            selectedTabData.grpsmtgrespond != ""
          ) {
            selectedTabData.offer_in_bt_rfp_text = "YES";
          } else if (
            appContext.grpMeetingsPrevSelect == "N" &&
            selectedTabData.grpsmtgrespond != ""
          ) {
            selectedTabData.offer_in_bt_rfp_text = "NO";
          } else {
            selectedTabData.offer_in_bt_rfp_text = "";
          }
          selectedTabData.formChg = "Y";
          if (selectedTabData.grpsmtgrespond) {
            sessionStorage.setItem(
              "responseCustomer",
              appContext.grpMeetingsPrevSelect
            );
          } else {
            sessionStorage.setItem(
              "responseCustomer",
              selectedTabData.grpsmtgrespond
            );
          }
          const showTabValue =
            selectedTabData.grpsmtgrespond == "Y" ? true : false;
          setState({
            ...state,
            showTab: showTabValue,
            groupMeetingData: {
              ...state.groupMeetingData,
              list: selectedTabData,
            },
          });
        }

        if (
          state.activeTab == "groupPricing" &&
          appContext?.user?.isHotelUser
        ) {
          if (selectedTabData.grpsmtgrespond == "Y") {
            if (
              selectedTabData.tabgrpgmsflg == "C" &&
              selectedTabData.tabprcgmsflg != "C"
            ) {
              alert(Settings.alerts.meeting_field_required);
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alerts.meeting_field_required,
                type: "browserAlert",
              });
            } else if (
              selectedTabData.tabgrpgmsflg == "C" &&
              selectedTabData.tabpaygmsflg != "C"
            ) {
              alert(Settings.alerts.payment_field_required);
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alerts.payment_field_required,
                type: "browserAlert",
              });
            } else if (selectedTabData.tabgrpgmsflg != "C") {
              alert(Settings.alerts.pricing_field_required);
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alerts.pricing_field_required,
                type: "browserAlert",
              });
            } else {
              appContext.setErrorMessageAlert({
                show: false,
                message: "",
                type: "browserAlert",
              });
            }
          }

          updateHotelGroupMeeting().then((res) => {
            appContext.setGroupMeetingUpdation(true);
          });
        } else {
          updateHotelGroupMeeting().then((res) => {
            appContext.setGroupMeetingUpdation(true);
          });
        }
      } else {
        if (
          selectedTabData.grpsmtgrespond == "Y" &&
          state.currtab == "tabGrpPrice" &&
          appContext.user.isHotelUser &&
          appContext.errorMessageAlert.show &&
          appContext.errorMessageAlert.message ==
            Settings.alerts.pricing_field_required
        ) {
          alert(appContext.errorMessageAlert.message);
        }

        if (state.currtab == "tabMtgPrice" && appContext?.user?.isHotelUser) {
          if (groupMeetingData.list.grpsmtgrespond == "Y") {
            if (meetPrcConcessionFlag != "C") {
              alert(Settings.alerts.meeting_field_required);
            }
          }
        }

        if (state.currtab == "tabPayment" && appContext?.user?.isHotelUser) {
          if (groupMeetingData.list.grpsmtgrespond == "Y") {
            if (gmsPaymentFlag != "C") {
              alert(Settings.alerts.payment_field_required);
            }
          }
        }

        setTimeout(() => {
          updateHotelGroupMeeting().then((res) => {
            appContext.setGroupMeetingUpdation(true);
          });
        }, 2000);

        if (state.activeTab === "groupPricing") {
          appContext.setSavePricingStatusClicked(true);
        } else if (state.activeTab === "meeting") {
          appContext.setSaveMeetingStatusClicked(true);
        } else if (state.activeTab === "groupsMeetingsPayment") {
          appContext.setSavePaymentStatusClicked(true);
        } else {
          setState({
            ...state,
            saveEvent: e,
          });
        }
      }
    } else {
      if (appContext?.user?.isHotelUser) {
        if (
          groupMeetingData.list.grpsmtgrespond == "" ||
          groupMeetingData.list.grpsmtgrespond == null
        ) {
          alert(Settings.alerts.marRFP_selection_error);
        }
        if (groupMeetingData.list.grpsmtgrespond == "Y") {
          if (
            groupMeetingData.list.tabgrpgmsflg == "C" &&
            groupMeetingData.list.tabprcgmsflg == "C" &&
            groupMeetingData.list.tabpaygmsflg == "C"
          ) {
          } else {
            if (state.currtab == "tabGrpPrice") {
              if (
                groupMeetingData.list.tabgrpgmsflg == "C" &&
                groupMeetingData.list.tabprcgmsflg != "C"
              ) {
                alert(Settings.alerts.meeting_field_required);
              } else if (
                groupMeetingData.list.tabgrpgmsflg == "C" &&
                groupMeetingData.list.tabpaygmsflg != "C"
              ) {
                alert(Settings.alerts.payment_field_required);
              } else if (groupMeetingData.list.tabgrpgmsflg != "C") {
                saveData();
                alert(Settings.alerts.pricing_field_required);
              }
            } else if (state.currtab == "tabMtgPrice") {
              if (
                groupMeetingData.list.tabprcgmsflg == "C" &&
                groupMeetingData.list.tabpaygmsflg != "C"
              ) {
                alert(Settings.alerts.payment_field_required);
              } else if (groupMeetingData.list.tabprcgmsflg != "C") {
                saveData();
                alert(Settings.alerts.meeting_field_required);
              }
            } else if (state.currtab == "tabPayment") {
              if (groupMeetingData.list.tabpaygmsflg != "C") {
                saveData();
                alert(Settings.alerts.payment_field_required);
              }
            }
          }
        }
      }
      setState({
        ...state,
        saveGroupMeetingEvent: e,
      });
    }
  };

  const saveData = () => {
    const masterGroupMeetingData = { ...masterData };
    const groupMeetingData = { ...state.groupMeetingData };
    const currTab = state.currtab;
    const hotelDetails = {
      formChg: groupMeetingData.list.formChg,
      hotelrfpid: masterGroupMeetingData.hotelrfpid,
      marshaCode: masterGroupMeetingData.marshaCode,
      period: masterGroupMeetingData.period,
      strHotel: JSON.stringify({
        grpsmtgrespond: groupMeetingData.list.offer_in_bt_rfp,
        tabgrpgmsflg: groupMeetingData.list.tabgrpgmsflg,
        tabprcgmsflg: groupMeetingData.list.tabprcgmsflg,
        tabpaygmsflg: groupMeetingData.list.tabpaygmsflg,
      }),
    };
    setLoader(true);
    appContext.setCpacLoader(true);
    API.updateGroupsAndMeeting(currTab, hotelDetails).then((res) => {
      API.getHotelRFPGrpsAndMeetings(masterData).then((data) => {
        setGroupsAndMeetingData(data);
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
        setLoader(false);
        appContext.setCpacLoader(false);
        getTablist();
      });
    });
  };

  const getTablist = () => {
    const groupMeetingData = { ...state.groupMeetingData };
    const tabList = [...Settings.groupMeetingsList.tabs.tablist];
    tabList[0].tabStatus = groupMeetingData.list.tabgrpgmsflg;
    tabList[1].tabStatus = groupMeetingData.list.tabprcgmsflg;
    tabList[2].tabStatus = groupMeetingData.list.tabpaygmsflg;
    return tabList;
  };

  const updateHotelGroupMeeting = () => {
    return new Promise((resolve, reject) => {
      const masterGroupMeetingData = { ...masterData };
      const groupMeetingData = { ...state.groupMeetingData };
      const currTab = state.currtab;
      let showTab;
      if (
        appContext.grpMeetingsPrevSelect != "" &&
        groupMeetingData.list.grpsmtgrespond == ""
      ) {
        if (groupMeetingData.list.grpsmtgrespond == "") {
          if (appContext.grpMeetingsPrevSelect != "") {
            showTab = true;
            groupMeetingData.list.grpsmtgrespond =
              appContext.grpMeetingsPrevSelect;
            groupMeetingData.list.offer_in_bt_rfp =
              appContext.grpMeetingsPrevSelect;
            groupMeetingData.list.offer_in_bt_rfp_text =
              appContext.grpMeetingsPrevSelect == "Y" ? "YES" : "NO";
          } else {
            showTab = false;
          }
        } else {
          showTab = appContext.grpMeetingsPrevSelect == "Y" ? true : false;
        }
      } else {
        showTab = groupMeetingData.list.grpsmtgrespond == "Y" ? true : false;
      }
      setLoader(true);
      appContext.setCpacLoader(true);
      API.updateHotelGroupMeeting(
        currTab,
        groupMeetingData,
        masterGroupMeetingData
      ).then((res) => {
        setIsSaveClicked(false);
        resolve(res);
        API.getHotelRFPGrpsAndMeetings(masterData).then((data) => {
          setGroupsAndMeetingData(data);
          state.currtab = "tabGrpPrice";
          state.activeTab = Settings.groupMeetingsList.tabs.tablist[0].id;
          setState({
            ...state,
            activeTab: state.activeTab,
            currtab: state.currtab,
          });
          setLoader(false);
          appContext.setCpacLoader(false);
        });
      });
    });
  };

  const componentUnload = () => {
    // sessionStorage.setItem("UpdatePricingGrpFlag", "C");
    // sessionStorage.setItem("UpdatePaymentGrpFlag", "C");
    // sessionStorage.setItem("UpdateMeetingGrpFlag", "C");
  };

  const groupMeetingContext = {
    state,
    setState,
    setLoader,
    switchTab,
    handleDropdownChange,
    setGroupsAndMeetingData,
    saveGroupsAndMeeting,
    masterData,
    setMasterData,
    updateHotelGroupMeeting,
    getTablist,
    emptyStateUpdate,
    setEmptystateUpdate,
    componentUnload,
    isSaveClicked,
    setIsSaveClicked,
    meetPrcConcessionFlag,
    setMeetPrcConcessionFlag,
    gmsPaymentFlag,
    setGmsPaymentFlag,
  };

  return (
    <HotelContext.Provider value={groupMeetingContext}>
      {props.children}
    </HotelContext.Provider>
  );
};
export const groupMeetingContextConsumer = HotelContext.Consumer;
export default HotelContext;
