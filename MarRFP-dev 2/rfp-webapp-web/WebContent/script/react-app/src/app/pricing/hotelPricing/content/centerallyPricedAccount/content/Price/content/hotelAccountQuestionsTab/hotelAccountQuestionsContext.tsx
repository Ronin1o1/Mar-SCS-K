import React, { useState, useContext, useEffect, useRef } from "react";
import API from "./API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../common/components/ApplicationContext";
import Settings from "./Settings";
import AccountCenterTabsContext from "../../context/AccountCenterTabsContext";

const HotelAccountQuestionsContext = React.createContext({});
export const HotelAccountQuestionsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const [state, setState] = useState({
    activeTab: "btQuestTabs",
    isQuest: false,
    isMeet: false,
    specAnswerBTTag: [],
    specMeetAnswerTag: [],
  });

  const [quest, setQuestState] = useState(false);
  const [meet, setMeetState] = useState(false);
  const [localAccSpecQuestTick, setLocalAccSpecQuestTick] = useState("");
  const [localAccGrpMeetTick, setLocalAccGrpMeetTick] = useState("");

  const accSpecQuestTickRef = useRef();
  accSpecQuestTickRef.current = localAccSpecQuestTick;

  const accGrpMeetTickRef = useRef();
  accGrpMeetTickRef.current = localAccGrpMeetTick;

  useEffect(() => {
    setLocalAccSpecQuestTick(appContext?.accSpecificTick);
  }, [appContext?.accSpecificTick]);

  useEffect(() => {
    setLocalAccGrpMeetTick(appContext?.btAccGrpTick);
  }, [appContext?.btAccGrpTick]);

  const updateQuestions = (isMeetingTab, data) => {
    if (data?.length) {
      data = JSON.parse(JSON.stringify(data));
      if (isMeetingTab) {
        sessionStorage.setItem(
          "accMeetSpecificAnswerTag",
          JSON.stringify(data)
        );
      } else {
        sessionStorage.setItem("specificAnswerBTTag", JSON.stringify(data));
      }
    }
  };

  const switchTab = (event) => {
    if (
      appContext.noRedirect &&
      state.activeTab === "btQuestTabs" &&
      appContext.user.isHotelUser &&
      !parentContext.isRebidDeclined
    ) {
      alert(Settings.instructions.fillAllDetails);
      setActiveTab("btQuestTabs");
    } else if (
      appContext.noRedirect &&
      state.activeTab === "accQuestTab" &&
      appContext.user.isHotelUser &&
      !parentContext.isRebidDeclined
    ) {
      alert(Settings.instructions.fillAllDetails);
      setActiveTab("accQuestTab");
    } else {
      setActiveTab(event.target.id);
    }
  };

  const getTabList = async (param) => {
    let isResQuest = false;
    sessionStorage.removeItem("accMeetSpecificAnswerTag");
    sessionStorage.removeItem("specificAnswerBTTag");
    API.getBTSpecQuest(param).then((databt) => {
      const accSpecNoAns = false;
      if (databt.length > 0) {
        state.isQuest = true;
        isResQuest = true;

        setActiveTab("btQuestTabs");
        updateQuestions(false, databt);
        setState({ ...state, isQuest: true });
        setQuestState(true);
        let value = "";
        let isValidArr1 = true;
        let counter = 0;
        let isValidArr3 = true;
        for (value of databt) {
          if (
            value.editable &&
            (value.answer == null || value.answer == "" || !value.answer.length)
          ) {
            isValidArr1 = false;
            break;
          }
        }
        if (databt.length > 0) {
          for (value of databt) {
            if (
              value.editable &&
              (value.answer == null ||
                value.answer.trim() == "" ||
                !value.answer.length)
            ) {
              counter++;
            }
          }
          if (counter == databt.length) {
            isValidArr3 = false;
          }
        }

        if (databt && databt.length) {
          const unanswered = databt.filter(function (item) {
            return (
              item.editable &&
              (item.answer == null ||
                item.answer?.trim() == "" ||
                item.answer == "")
            );
          });
          if (unanswered.length > 0) {
            appContext.setBtAccSpecAllDataFilled(false);
          }
          if (unanswered.length == 0) {
            appContext.setBtAccSpecAllDataFilled(true);
          }
        }

        if (!isValidArr3) {
          if (
            appContext.user.isPASorAnySales &&
            appContext.accSpecificTick == "C"
          ) {
            appContext.setAccSpecificTick("C");
          } else {
            appContext.setAccSpecificTick("");
          }
        } else if (!isValidArr1) {
          if (
            appContext.user.isPASorAnySales &&
            appContext.accSpecificTick == "C"
          ) {
            appContext.setAccSpecificTick("C");
          } else {
            appContext.setAccSpecificTick("R");
          }
        }
        sessionStorage.setItem("isValidASQ", isValidArr1.toString());
        if (!isValidArr1 && document.getElementById("btQuestTabs-complete")) {
          accSpecNoAns = true;
        }
        getMeetSpecQuest(param, isResQuest, accSpecNoAns);
      } else {
        getMeetSpecQuest(param, isResQuest, accSpecNoAns);
      }
    });
  };

  const getMeetSpecQuest = (param, isResQuest, accSpecNoAns) => {
    API.getMeetSpecQuest(param).then((datagroup) => {
      if (datagroup.length > 0) {
        state.isMeet = true;
        if (!isResQuest) {
          setActiveTab("accQuestTab");
        }
        updateQuestions(true, datagroup);
        setState({ ...state, isMeet: true });
        setMeetState(true);
        let value = "";
        let isValidArr2 = true;
        let counter = 0;
        let isValidArr3 = true;
        for (value of datagroup) {
          if (
            value.editable &&
            (value.answer == null || value.answer == "" || !value.answer.length)
          ) {
            isValidArr2 = false;
            break;
          }
        }
        if (datagroup.length > 0) {
          for (value of datagroup) {
            if (
              value.editable &&
              (value.answer == null ||
                value.answer.trim() == "" ||
                !value.answer.length)
            ) {
              counter++;
            }
          }
          if (counter == datagroup.length) {
            isValidArr3 = false;
          }
        }

        if (datagroup && datagroup.length) {
          const unanswered = datagroup.filter(function (item) {
            return (
              item.editable &&
              (item.answer == null ||
                item.answer?.trim() == "" ||
                item.answer == "")
            );
          });
          if (unanswered.length > 0) {
            appContext.setBtAccGrpMeetAllDataFilled(false);
          }
          if (unanswered.length == 0) {
            appContext.setBtAccGrpMeetAllDataFilled(true);
          }
        }

        if (!isValidArr3) {
          if (
            appContext.user.isPASorAnySales &&
            appContext.btAccGrpTick == "C"
          ) {
            appContext.setBtAccGrpTick("C");
          } else {
            appContext.setBtAccGrpTick("");
          }
        } else if (!isValidArr2) {
          if (
            appContext.user.isPASorAnySales &&
            appContext.btAccGrpTick == "C"
          ) {
            appContext.setBtAccGrpTick("C");
          } else {
            appContext.setBtAccGrpTick("R");
          }
        }
        sessionStorage.setItem("isValidAGM", isValidArr2.toString());
      }
    });
  };

  const setActiveTab = (tab) => {
    setState({ ...state, activeTab: tab });
  };

  const checkMainBtgroupTab = (accSpecQuestTick?, accGrpMeetTick?) => {
    accSpecQuestTick = accSpecQuestTick
      ? accSpecQuestTick
      : accSpecQuestTickRef.current;
    accGrpMeetTick = accGrpMeetTick
      ? accGrpMeetTick
      : accGrpMeetTickRef.current;
    let iscomplete = false;
    const hotelAccSpecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );

    if (
      hotelAccSpecificData?.hasaccountspecquests == "Y" &&
      hotelAccSpecificData?.hasgroupspecquests == "Y"
    ) {
      if (accSpecQuestTick == "C" && accGrpMeetTick == "C") {
        iscomplete = true;
      }
    } else if (
      hotelAccSpecificData?.hasaccountspecquests == "N" &&
      hotelAccSpecificData?.hasgroupspecquests == "Y"
    ) {
      if (accGrpMeetTick == "C") {
        iscomplete = true;
      }
    } else if (
      hotelAccSpecificData?.hasaccountspecquests == "Y" &&
      hotelAccSpecificData?.hasgroupspecquests == "N"
    ) {
      if (accSpecQuestTick == "C") {
        iscomplete = true;
      }
    }
    if (iscomplete) {
      const changedRates = JSON.parse(
        localStorage.getItem("ratesTableValidData")
      );
      const ratesStatus = checkRatesStatus(changedRates);
      const changedAmenities =
        sessionStorage.getItem("changedAmenities") == "false"
          ? false
          : sessionStorage.getItem("changedAmenities") == "true"
          ? true
          : false;
      const changedQuestions =
        sessionStorage.getItem("changedQuestions") == "false"
          ? false
          : sessionStorage.getItem("changedQuestions") == "true"
          ? true
          : false;
      if (
        hotelAccSpecificData?.showrebid === "Y" &&
        (appContext?.user?.isHotelUser ||
          appContext?.user?.isLimitedSalesUser ||
          (appContext?.user?.isSalesUser && appContext.isMarkAsCompleteChecked))
      ) {
        if (!(changedAmenities || ratesStatus || changedQuestions)) {
          iscomplete = false;
        } else {
          parentContext.eligibilityStatus = "C";
          parentContext.setEligibilityStatus("C");
          appContext.eligibilitiesTick = "C";
          appContext.setEligibilitiesTick("C");
          if (
            hotelAccSpecificData?.showrebid === "Y" &&
            (appContext?.user?.isHotelUser ||
              appContext?.user?.isLimitedSalesUser ||
              (appContext?.user?.isSalesUser &&
                appContext.isMarkAsCompleteChecked))
          ) {
            parentContext.ratesRulesStatus = "C";
            parentContext?.setRatesRulesStatus(parentContext.ratesRulesStatus);
            appContext.rateRulesTick = "C";
            appContext.setRateRulesTick(appContext.rateRulesTick);
          }
        }
      }
    }
    if (iscomplete) {
      appContext.btgTick = "C";
      appContext.setBtgTick(appContext.btgTick);
      parentContext?.setBtgStatus("C");
    }
  };

  const checkRatesStatus = (value) => {
    if (value) {
      Object.entries(value).forEach(([key, element]) => {
        if (
          key !== "isAccountRateValid" &&
          key !== "isDateValid" &&
          key !== "isFixedRateValid" &&
          key !== "isLOSValid"
        ) {
          if (element == "Y") {
            return true;
          }
        }
      });
      return false;
    } else {
      return false;
    }
  };

  const hotelAccountQuestContext = {
    state,
    quest,
    meet,
    setState,
    switchTab,
    getTabList,
    updateQuestions,
    setActiveTab,
    checkMainBtgroupTab,
    checkRatesStatus,
  };

  return (
    <HotelAccountQuestionsContext.Provider value={hotelAccountQuestContext}>
      {props.children}
    </HotelAccountQuestionsContext.Provider>
  );
};
export const AccountCenterTabsContextConsumer =
  HotelAccountQuestionsContext.Consumer;
export default HotelAccountQuestionsContext;
