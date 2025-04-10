import _ from "lodash";
import React, { useState, useContext, useEffect, useRef } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import Settings from "../../Price/static/Settings";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const AccountCenterTabsContext = React.createContext({} as any);
export const AccountCenterTabsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [state, setState] = useState({
    activeTab: "statusAccount",
    showScreenLoader: false,
    maxroompools: null,
    pgoosData: [],
    showrebid: null,
    hasaccountspecquests: null,
    groupmeetings: null,
    hasgroupspecquests: null,
    marshaCode: null,
    hotelName: null,
    accountname: null,
    currency: null,
    grpsmtgrespond: null,
    isLocked: null,
    isSelected: null,
    breakinrates: null,
    rateOfferName: null,
    rateLoadStatus: null,
    accountid: null,
    accountrecid: null,
    hotel_accountinfoid: null,
    hotelid: null,
    hotelrfpid: null,
    accountCenterData: {
      data: [{}],
    },
    periodList: {
      list: [{}],
    },
    initialload: null,
    saveEvent: null,
    isInternational: null,
    clickedTabs: [],
    globalSalesHead: null,
  });
  const [isRebidDeclined, setIsRebidDeclined] = useState(false);
  const [rebidStatus, setRebidStatus] = useState("");
  const [rebidAction, setRebidAction] = useState("tabnavigation");
  const [errorMessage, setErrorMessage] = useState("");
  const [tabNavError, setTabNavError] = useState("");
  const [facilityStatus, setFacilityStatus] = useState("");
  const [ratesRulesStatus, setRatesRulesStatus] = useState("");
  const [blackoutStatus, setBlackoutStatus] = useState("");
  const [eligibilityStatus, setEligibilityStatus] = useState("");
  const [btgStatus, setBtgStatus] = useState("");
  const [accSpecificStatus, setAccSpecificStatus] = useState("");
  const [pricingStatus, setPricingStatus] = useState("");
  const [compelBisStatus, setCompelBisStatus] = useState("");
  const [altCxlPolicyTimeId, setAltCxlPolicyTimeId] = useState(0);
  const [genGroupMeetingsStatus, setGenGroupMeetingsStatus] = useState("");
  const [updatePage, setUpdatePage] = useState(false);
  const mounted = useRef();
  const prevAppContext = usePrevious(appContext);
  const prevHotelAccSpecificData = usePrevious(
    JSON.parse(localStorage.getItem("hotelAccountSpecificData"))
  );

  const setAccountCenterData = (data) => {
    if (data) {
      const accountCenterData1 = { ...state.accountCenterData };
      accountCenterData1.data = data;
      accountCenterData1.hotelAccSpecificData =
        data.hotelAccountSpecific.hotelAccountSpecificData;
      if (
        data.hotelAccountSpecific.hotelAccountSpecificData.markComplete === null
      )
        accountCenterData1.hotelAccSpecificData.markComplete = "N";
      if (data) {
        setState({
          ...state,
          accountCenterData: accountCenterData1,
        });
      }
    }
  };
  const setViewPrintList = (data) => {
    if (data) {
      const periodList = { ...state.periodList };
      periodList.list = data;
      setState({
        ...state,
        periodList: periodList,
      });
    }
  };
  const checkBoxHandler = (e) => {
    setState({
      ...state,
      accountCenterData: {
        ...state.accountCenterData,
        hotelAccSpecificData: {
          ...state.accountCenterData.hotelAccSpecificData,
          markComplete: e.target.checked ? "Y" : "N",
        },
      },
    });
    appContext.setIsMarkAsCompleteChecked(e.target.checked);
  };

  const switchTab = (event) => {
    setState({ ...state, activeTab: event.target.id });
  };

  const setHotelData = (data) => {
    if (data) {
      setState({
        ...state,
        globalSalesHead:
          data?.hotelAccountSpecific?.hotelAccountSpecificData?.globalSalesLead,
        maxroompools:
          data.hotelAccountSpecific.hotelAccountSpecificData.maxroompools,
        pgoosData:
          data.hotelAccountSpecific.hotelAccountSpecificData.rateProgDetails,
        showrebid: data.hotelAccountSpecific.hotelAccountSpecificData.showrebid,
        hasaccountspecquests:
          data.hotelAccountSpecific.hotelAccountSpecificData
            .hasaccountspecquests,
        groupmeetings:
          data.hotelAccountSpecific.hotelAccountSpecificData.groupmeetings,
        hasgroupspecquests:
          data.hotelAccountSpecific.hotelAccountSpecificData.hasgroupspecquests,
        marshaCode: data.hotelData.marshaCode,
        hotelName: data.hotelData.hotelName,
        accountname:
          data.hotelAccountSpecific.hotelAccountSpecificData.accountname,
        currency: data.currency,
        grpsmtgrespond:
          data.hotelAccountSpecific.hotelAccountSpecificData.grpsmtgrespond,
        isLocked: data.hotelAccountSpecific.hotelAccountSpecificData.isLocked,
        isSelected:
          data.hotelAccountSpecific.hotelAccountSpecificData.isSelected,
        breakinrates:
          data.hotelAccountSpecific.hotelAccountSpecificData.breakinrates,
        rateOfferName:
          data.hotelAccountSpecific.hotelAccountSpecificData.rateOfferName,
        rateLoadStatus:
          data.hotelAccountSpecific.hotelAccountSpecificData.rateProgDetails,
        accountid: data.hotelAccountSpecific.hotelAccountSpecificData.accountid,
        accountrecid:
          data.hotelAccountSpecific.hotelAccountSpecificData.accountrecid,
        hotel_accountinfoid:
          data.hotelAccountSpecific.hotelAccountSpecificData
            .hotel_accountinfoid,
        hotelid: data.hotelAccountSpecific.hotelAccountSpecificData.hotelid,
        hotelrfpid:
          data.hotelAccountSpecific.hotelAccountSpecificData.hotelrfpid,
        initialload:
          data.hotelAccountSpecific.hotelAccountSpecificData.initialload,
        isInternational:
          data.hotelData?.isInternational && data.hotelData?.isInternational,
      });
      localStorage.setItem(
        "hotel_accountinfoid",
        data.hotelAccountSpecific.hotelAccountSpecificData.hotel_accountinfoid
      );
      localStorage.setItem("hotelData", data.hotelData);
    }
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const hotelspecificData = JSON.parse(
        localStorage.getItem("hotelAccountSpecificData")
      );
      if (
        prevHotelAccSpecificData?.hasgroupspecquests !=
          hotelspecificData?.hasgroupspecquests ||
        prevHotelAccSpecificData?.groupmeetings !=
          hotelspecificData?.groupmeetings ||
        prevHotelAccSpecificData?.grpsmtgrespond !=
          hotelspecificData?.grpsmtgrespond ||
        prevHotelAccSpecificData?.showrebid != hotelspecificData?.showrebid ||
        prevHotelAccSpecificData?.business_case !=
          hotelspecificData?.business_case ||
        prevHotelAccSpecificData?.allow_qmodify !=
          hotelspecificData?.allow_qmodify ||
        prevHotelAccSpecificData?.hasaccountspecquests !=
          hotelspecificData?.hasaccountspecquests ||
        prevAppContext?.isMarkAsCompleteChecked !=
          appContext?.isMarkAsCompleteChecked ||
        prevAppContext?.rateRulesTick != appContext?.rateRulesTick ||
        prevAppContext?.pricingTick != appContext?.pricingTick ||
        prevAppContext?.rebidTick != appContext?.rebidTick ||
        prevAppContext?.facilityTick != appContext?.facilityTick ||
        prevAppContext?.btgTick != appContext?.btgTick ||
        prevAppContext?.btAccGrpTick != appContext?.btAccGrpTick ||
        prevAppContext?.accSpecificTick != appContext?.accSpecificTick ||
        prevAppContext?.blackoutTick != appContext?.blackoutTick ||
        prevAppContext?.compelBisTick != appContext?.compelBisTick ||
        prevAppContext?.eligibilitiesTick != appContext?.eligibilitiesTick ||
        prevAppContext?.isActiveTab != appContext?.isActiveTab ||
        prevAppContext?.genGroupMeetingsTick !=
          appContext?.genGroupMeetingsTick ||
        prevAppContext?.groupsAndMeetingError.show !=
          appContext?.groupsAndMeetingError.show ||
        !_.isEqual(
          prevAppContext?.priceRebidScreenFlags,
          appContext?.priceRebidScreenFlags
        )
      ) {
        if (appContext?.groupsAndMeetingError.show) {
          appContext.setMarkAsCompleteErrorAlert({
            show: appContext?.groupsAndMeetingError.show,
            message: appContext?.groupsAndMeetingError.msg,
            type: "browserAlert",
          });
        } else {
          let bOK;
          if (
            appContext?.groupsAndMeetingError.show == false &&
            appContext?.isActiveTab == "groupsMeetings"
          ) {
            //passing undefined for ratesrules and elig. & Amen. status as those aren't required for checking groups and meetings alert
            bOK = validateDetailsOnMarkAsCompleteChange(
              hotelspecificData,
              "",
              undefined,
              undefined,
              "C"
            );
          } else {
            bOK = validateDetailsOnMarkAsCompleteChange(hotelspecificData, "");
          }

          if (!bOK.bOK) {
            appContext.setMarkAsCompleteErrorAlert({
              show: true,
              message: bOK.msg,
              type: "browserAlert",
            });
          } else {
            appContext.setMarkAsCompleteErrorAlert({
              show: false,
              message: "",
              type: "browserAlert",
            });
          }
        }
      }
    }
  });

  const componentUnload = () => {
    appContext.setMarkAsCompleteErrorAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };

  const gengroups_check = (navigationCheck, stateData?) => {
    let bOK = true;
    let gengroupscheckstatus;
    let data = sessionStorage.getItem("CPACGroupsAndMeetingData");
    if (data !== undefined && data !== null) {
      data = JSON.parse(data);
    }
    const grpMeetingList = stateData ? stateData : data;
    const epicMtgPckg = grpMeetingList?.list?.meetingdaymeetingpckg;
    if (appContext?.user?.isPASorAnySales || appContext?.user?.isHotelUser) {
      if (bOK && grpMeetingList && grpMeetingList?.list) {
        if (
          grpMeetingList.list.negratefifty === "" ||
          grpMeetingList.list.negratefifty === null ||
          grpMeetingList.list.negratehund === "" ||
          grpMeetingList.list.negratehund === null ||
          grpMeetingList.list.negtranshighrate === "" ||
          grpMeetingList.list.negtranshighrate === null ||
          grpMeetingList.list.comprooms === "" ||
          grpMeetingList.list.comprooms === null ||
          grpMeetingList.list.discfb === "" ||
          grpMeetingList.list.discfb === null ||
          grpMeetingList.list.costbrkten === "" ||
          grpMeetingList.list.costbrkten === null ||
          grpMeetingList.list.costbrktwnfive === "" ||
          grpMeetingList.list.costbrktwnfive === null ||
          (epicMtgPckg === "Y" &&
            (grpMeetingList.list.negratefifty === "" ||
              grpMeetingList.list.negratefifty === null ||
              grpMeetingList.list.negratehund === "" ||
              grpMeetingList.list.negratehund === null ||
              grpMeetingList.list.negtranshighrate === "" ||
              grpMeetingList.list.negtranshighrate === null ||
              grpMeetingList.list.comprooms === "" ||
              grpMeetingList.list.comprooms === null ||
              grpMeetingList.list.discfb === "" ||
              grpMeetingList.list.discfb === null ||
              grpMeetingList.list.costbrkten === "" ||
              grpMeetingList.list.costbrkten === null ||
              grpMeetingList.list.costbrktwnfive === "" ||
              grpMeetingList.list.costbrktwnfive === null ||
              grpMeetingList.list.fulldayratefifty === "" ||
              grpMeetingList.list.fulldayratefifty === null ||
              grpMeetingList.list.halfdayratefifty === "" ||
              grpMeetingList.list.halfdayratefifty === null ||
              grpMeetingList.list.fulldayratehund === "" ||
              grpMeetingList.list.fulldayratehund === null ||
              grpMeetingList.list.halfdayratehund === "" ||
              grpMeetingList.list.halfdayratehund === null ||
              grpMeetingList.list.intfeeincldaymtg === "" ||
              grpMeetingList.list.intfeeincldaymtg === null ||
              grpMeetingList.list.lcdcostincldaymtg === "" ||
              grpMeetingList.list.lcdcostincldaymtg === null ||
              grpMeetingList.list.scncostincldaymtg === "" ||
              grpMeetingList.list.scncostincldaymtg === null))
        ) {
          bOK = false;
        }
      }
    }

    if (!bOK) {
      if (appContext?.user?.isPASorAnySales) {
        gengroupscheckstatus = "continue";
      } else {
        if (!isRebidDeclined) {
          gengroupscheckstatus = "failed";
        } else {
          gengroupscheckstatus = "continue";
        }
        if (!navigationCheck && !isRebidDeclined) {
          alert(Settings.alerts.fillAllGroupMeetingDetails);
        }
      }
    } else {
      gengroupscheckstatus = "complete";
    }

    return gengroupscheckstatus;
  };

  const validateDetails = (hotelspecificData, msg) => {
    let bOK;
    bOK = true;
    const bMsg = true;
    let markcomplete = "N";
    let rebidtab;
    let statustab;
    let facilitytab;
    let questtab;
    let blackouttab;
    let cbctab;
    let amenitytab;
    let grouptab;
    let ratestab;
    let gengrouptab;
    let questtabstatus;
    const business_case = sessionStorage.getItem("bussinessCase");
    if (
      (appContext.user?.isPASorAnySales || appContext.user?.isHotelUser) &&
      hotelspecificData !== null &&
      hotelspecificData !== undefined
    ) {
      const markcompleteobj = document.getElementById("hassu.markComplete");
      if (markcompleteobj != null && markcompleteobj.checked)
        markcomplete = "Y";

      if (
        (markcomplete == "Y" && appContext.user?.isPASorAnySales) ||
        appContext.user?.isHotelUser ||
        appContext.user.isLimitedSalesUser
      ) {
        statustab = appContext.pricingTick;
        if (hotelspecificData.showrebid === "Y") {
          rebidtab =
            (appContext.user.isHotelUser ||
              appContext.user.isLimitedSalesUser ||
              (appContext?.user?.isSalesUser && markcomplete == "Y")) &&
            appContext.priceRebidScreenFlags.rebidTab !== ""
              ? appContext.priceRebidScreenFlags.rebidTab
              : appContext.rebidTick;
        }
        facilitytab = appContext.facilityTick;
        if (hotelspecificData.hasaccountspecquests === "Y") {
          questtab = appContext.accSpecificTick;
        }
        blackouttab = appContext.blackoutTick;
        cbctab = appContext.compelBisTick;
        amenitytab =
          hotelspecificData?.showrebid === "Y" &&
          (appContext.user.isHotelUser ||
            appContext.user.isLimitedSalesUser ||
            (appContext?.user?.isSalesUser && markcomplete == "Y")) &&
          appContext.priceRebidScreenFlags.eligAmenityTab !== ""
            ? appContext.priceRebidScreenFlags.eligAmenityTab
            : appContext.eligibilitiesTick;

        if (
          hotelspecificData.hasgroupspecquests === "Y" &&
          hotelspecificData.groupmeetings === "Y"
        ) {
          grouptab = appContext.btAccGrpTick;
        }
        if (
          hotelspecificData.grpsmtgrespond === "Y" &&
          hotelspecificData.groupmeetings === "Y"
        ) {
          gengrouptab = appContext.genGroupMeetingsTick;
        }
        ratestab =
          hotelspecificData?.showrebid === "Y" &&
          (appContext.user.isHotelUser ||
            appContext.user.isLimitedSalesUser ||
            (appContext?.user?.isSalesUser && markcomplete == "Y")) &&
          appContext.priceRebidScreenFlags.ratesRulesTab !== ""
            ? appContext.priceRebidScreenFlags.ratesRulesTab
            : appContext.rateRulesTick;
        // Commented as per L3
        // if (hotelspecificData.showrebid === "Y") {
        //   if (rebidtab != null && rebidtab != "C") {
        //     bOK = false;
        //     msg = Settings.alerts.rebidAlert;
        //   }
        // }

        if (bOK && !isRebidDeclined) {
          if (
            bOK &&
            statustab != null &&
            statustab != "C" &&
            business_case == "Y"
          ) {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.statusAndAccountPricing;
            }
          }
          if (bOK && ratestab != null && ratestab != "C") {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.rateRulesAlert;
              if (business_case != null && business_case == "Y") {
                if (appContext.isActiveTab == "rateRules") {
                  msg = Settings.alerts.rateRulesRoomNight;
                } else {
                  msg += Settings.alerts.rateRulesIncludingRm;
                }
              }
              msg += ".";
            }
          }

          if (bOK && amenitytab != null) {
            if (amenitytab == "R") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                let sections = Settings.alerts.amenitySection1;

                if (
                  hotelspecificData.allow_qmodify === "Y" &&
                  (hotelspecificData.hasaccountspecquests === "Y" ||
                    hotelspecificData.hasgroupspecquests === "Y")
                ) {
                  sections = Settings.alerts.amenitySection2;
                }
                msg =
                  Settings.alerts.sectionAlert1 +
                  `${sections}` +
                  Settings.alerts.sectionAlert2 +
                  ` ${sections}` +
                  Settings.alerts.sectionAlert3;
              }
            }
          }
          if (hotelspecificData.hasaccountspecquests === "Y") {
            questtab =
              questtab !== "C"
                ? appContext.btAccSpecAllDataFilled
                  ? "C"
                  : questtab
                : questtab;
            if (bOK && questtab != null && questtab != "C") {
              if (
                ((appContext.user.isPASAdmin || appContext.user.isSalesUser) &&
                  markcomplete == "Y") ||
                appContext.user.isHotelUser ||
                appContext.user.isLimitedSalesUser
              ) {
                bOK = false;
                msg = Settings.alerts.accountSpecQuestNotFilled;
              }
            }
          }

          if (
            hotelspecificData.hasgroupspecquests === "Y" &&
            hotelspecificData.groupmeetings === "Y"
          ) {
            grouptab =
              grouptab !== "C"
                ? appContext.btAccGrpMeetAllDataFilled
                  ? "C"
                  : grouptab
                : grouptab;
            if (bOK && grouptab != null && grouptab != "C") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                msg = Settings.alerts.AccountGroupsAndMeetings;
              }
            }
          }
          if (
            hotelspecificData.grpsmtgrespond === "Y" &&
            hotelspecificData.groupmeetings === "Y"
          ) {
            if (bOK && gengrouptab != null && gengrouptab != "C") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                msg = Settings.alerts.groupsandMeetings;
              }
            }
          }
          if (
            bOK &&
            facilitytab != null &&
            facilitytab != "C" &&
            business_case == "Y"
          ) {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.rateNoteFacility;
            }
          }
        }
      }

      if (!bOK) {
        if (!appContext.noRedirect) {
          if (
            appContext.isActiveTab == "groupsMeetings" &&
            gengroups_check(true) != "failed"
          ) {
            alert(msg);
            return bOK;
          } else if (
            appContext.isActiveTab == "groupsMeetings" &&
            gengroups_check(true) == "failed"
          ) {
            return bOK;
          } else {
            alert(msg);
            return bOK;
          }
        } else {
          if (
            appContext.isActiveTab == "btAndGroupAccount" &&
            appContext.noRedirect
          ) {
            alert(msg);
            return bOK;
          }
          return bOK;
        }
      }
    }
    return bOK;
  };

  const validateDetailsOnMarkAsCompleteChange = (
    hotelspecificData,
    msg,
    ratesTabTick?,
    priceRebidEligAmenityTick?,
    genGroupTabTick?,
    btAccTick?,
    tabGroupTick?,
    facilityTick?
  ) => {
    let bOK;
    bOK = true;
    const bMsg = true;
    let markcomplete = "N";
    let rebidtab;
    let statustab;
    let facilitytab;
    let questtab;
    let blackouttab;
    let cbctab;
    let amenitytab;
    let grouptab;
    let ratestab;
    let gengrouptab;
    let questtabstatus;
    const business_case = sessionStorage.getItem("bussinessCase");
    if (
      (appContext.user?.isPASorAnySales || appContext.user?.isHotelUser) &&
      hotelspecificData !== null &&
      hotelspecificData !== undefined
    ) {
      if (
        appContext.isMarkAsCompleteChecked != null &&
        appContext.isMarkAsCompleteChecked == true
      )
        markcomplete = "Y";

      if (
        (markcomplete == "Y" && appContext.user?.isPASorAnySales) ||
        appContext.user?.isHotelUser ||
        appContext.user.isLimitedSalesUser
      ) {
        statustab = appContext.pricingTick;
        if (hotelspecificData?.showrebid === "Y") {
          rebidtab =
            (appContext.user.isHotelUser ||
              appContext.user.isLimitedSalesUser) &&
            appContext.priceRebidScreenFlags.rebidTab !== ""
              ? appContext.priceRebidScreenFlags.rebidTab
              : appContext.rebidTick;
        }
        facilitytab = facilityTick ? facilityTick : appContext.facilityTick;
        if (hotelspecificData.hasaccountspecquests === "Y") {
          questtab = btAccTick ? btAccTick : appContext.accSpecificTick;
        }
        blackouttab = appContext.blackoutTick;
        cbctab = appContext.compelBisTick;
        amenitytab = priceRebidEligAmenityTick
          ? priceRebidEligAmenityTick
          : hotelspecificData?.showrebid === "Y" &&
            (appContext.user.isHotelUser ||
              appContext.user.isLimitedSalesUser ||
              (appContext?.user?.isSalesUser && markcomplete == "Y")) &&
            appContext.priceRebidScreenFlags.eligAmenityTab !== ""
          ? appContext.priceRebidScreenFlags.eligAmenityTab
          : appContext.eligibilitiesTick;

        if (
          hotelspecificData.hasgroupspecquests === "Y" &&
          hotelspecificData.groupmeetings === "Y"
        ) {
          grouptab = tabGroupTick ? tabGroupTick : appContext.btAccGrpTick;
        }
        if (
          hotelspecificData.grpsmtgrespond === "Y" &&
          hotelspecificData.groupmeetings === "Y"
        ) {
          gengrouptab = genGroupTabTick
            ? genGroupTabTick
            : appContext.genGroupMeetingsTick;
        }
        ratestab = ratesTabTick
          ? ratesTabTick
          : hotelspecificData?.showrebid === "Y" &&
            (appContext.user.isHotelUser ||
              appContext.user.isLimitedSalesUser ||
              (appContext?.user?.isSalesUser && markcomplete == "Y")) &&
            appContext.priceRebidScreenFlags.ratesRulesTab !== ""
          ? appContext.priceRebidScreenFlags.ratesRulesTab
          : appContext.rateRulesTick;
        // Commented as per L3
        // if (hotelspecificData?.showrebid === "Y") {
        //   if (rebidtab != null && rebidtab != "C") {
        //     bOK = false;
        //     msg = Settings.alerts.rebidAlert;
        //   }
        // }

        if (bOK && !isRebidDeclined) {
          if (
            bOK &&
            statustab != null &&
            statustab != "C" &&
            business_case == "Y"
          ) {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.statusAndAccountPricing;
            }
          }
          if (bOK && ratestab != null && ratestab != "C") {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.rateRulesAlert;
              if (business_case != null && business_case == "Y") {
                if (appContext.isActiveTab == "rateRules") {
                  msg = Settings.alerts.rateRulesRoomNight;
                } else {
                  msg += Settings.alerts.rateRulesIncludingRm;
                }
              }
              msg += ".";
            }
          }

          if (bOK && amenitytab != null) {
            if (amenitytab == "R") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                let sections = Settings.alerts.amenitySection1;

                if (
                  hotelspecificData.allow_qmodify === "Y" &&
                  (hotelspecificData.hasaccountspecquests === "Y" ||
                    hotelspecificData.hasgroupspecquests === "Y")
                ) {
                  sections = Settings.alerts.amenitySection2;
                }
                msg =
                  Settings.alerts.sectionAlert1 +
                  `${sections}` +
                  Settings.alerts.sectionAlert2 +
                  ` ${sections}` +
                  Settings.alerts.sectionAlert3;
              }
            }
          }
          if (hotelspecificData.hasaccountspecquests === "Y") {
            if (bOK && questtab != null && questtab != "C") {
              if (
                ((appContext.user.isPASAdmin || appContext.user.isSalesUser) &&
                  markcomplete == "Y") ||
                appContext.user.isHotelUser ||
                appContext.user.isLimitedSalesUser
              ) {
                bOK = false;
                msg = Settings.alerts.accountSpecQuestNotFilled;
              }
            }
          }

          if (
            hotelspecificData.hasgroupspecquests === "Y" &&
            hotelspecificData.groupmeetings === "Y"
          ) {
            if (bOK && grouptab != null && grouptab != "C") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                msg = Settings.alerts.AccountGroupsAndMeetings;
              }
            }
          }

          if (
            hotelspecificData.grpsmtgrespond === "Y" &&
            hotelspecificData.groupmeetings === "Y"
          ) {
            if (bOK && gengrouptab != null && gengrouptab != "C") {
              if (
                (appContext.user.isPASorAnySales && markcomplete == "Y") ||
                appContext.user.isHotelUser
              ) {
                bOK = false;
                msg = Settings.alerts.groupsandMeetings;
              }
            }
          }
          if (
            bOK &&
            facilitytab != null &&
            facilitytab != "C" &&
            business_case == "Y"
          ) {
            if (
              (appContext.user.isPASorAnySales && markcomplete == "Y") ||
              appContext.user.isHotelUser
            ) {
              bOK = false;
              msg = Settings.alerts.rateNoteFacility;
            }
          }
        }
      }
    }
    return { bOK: bOK, msg: msg };
  };

  const setTabList = (list) => {};
  const accountcentertabsContext = {
    state,
    setState,
    setLoader,
    switchTab,
    setTabList,
    setHotelData,
    setAccountCenterData,
    checkBoxHandler,
    isRebidDeclined,
    setIsRebidDeclined,
    rebidStatus,
    setRebidStatus,
    rebidAction,
    setRebidAction,
    errorMessage,
    setErrorMessage,
    tabNavError,
    setTabNavError,
    facilityStatus,
    setFacilityStatus,
    ratesRulesStatus,
    setRatesRulesStatus,
    altCxlPolicyTimeId,
    setAltCxlPolicyTimeId,
    blackoutStatus,
    setBlackoutStatus,
    eligibilityStatus,
    setEligibilityStatus,
    btgStatus,
    setBtgStatus,
    pricingStatus,
    setPricingStatus,
    accSpecificStatus,
    setAccSpecificStatus,
    compelBisStatus,
    setCompelBisStatus,
    setViewPrintList,
    genGroupMeetingsStatus,
    setGenGroupMeetingsStatus,
    validateDetails,
    setUpdatePage,
    validateDetailsOnMarkAsCompleteChange,
    gengroups_check,
    componentUnload,
  };
  return (
    <AccountCenterTabsContext.Provider value={accountcentertabsContext}>
      {props.children}
    </AccountCenterTabsContext.Provider>
  );
};
export const AccountCenterTabsContextConsumer =
  AccountCenterTabsContext.Consumer;
export default AccountCenterTabsContext;
