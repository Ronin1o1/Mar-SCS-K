import { parseInt } from "lodash";
import React, { useContext, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";

import API from "../service/API";

const PriceEligibilityAmenityContext = React.createContext({});
export const PriceEligibilityAmenityContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const accountCenterTabsContext = useContext(AccountCenterTabsContext);
  const [state, setState] = useState({
    eligibility: [],
    AccountSpecificamenity: null,
    last_updatedamenities: null,
    formattedLast_updatedamenities: null,
    lastupateameneid: null,
    lastupateameneemail: null,
    amenities: [],
    numAudits: null,
    count: null,
    quickAuditAmenInfo: [],
    breakinrates: null,
    isInternational: null,
    rateincludes: [],
    isTopAccount: null,
    showScreenLoader: false,
    handlechangeValue: false,
    eligChng: false,
    amenityChng: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const getEligibilityAmenityPrice = (data) => {
    if (!appContext.switchEligTabFlag) {
      setState({
        ...state,
        eligibility: data.AccountSpecificamenity.eligibility,
        last_updatedamenities:
          data.AccountSpecificamenity.last_updatedamenities,
        formattedLast_updatedamenities:
          data.AccountSpecificamenity.formattedLast_updatedamenities,
        lastupateameneid: data.AccountSpecificamenity.lastupateameneid,
        lastupateameneemail: data.AccountSpecificamenity.lastupateameneemail,
        amenities: data.AccountSpecificamenity.amenities,
        rateincludes: data.AccountSpecificamenity.rateincludes,
        isTopAccount: data.isTopAcc,
        AccountSpecificamenity: data.AccountSpecificamenity,
      });
      sessionStorage.setItem(
        "changedEligData",
        JSON.stringify(data.AccountSpecificamenity.eligibility)
      );
    } else {
      const eligData = sessionStorage.getItem("changedEligData")
        ? JSON.parse(sessionStorage.getItem("changedEligData"))
        : null;
      setState({
        ...state,
        eligibility: eligData
          ? eligData
          : data.AccountSpecificamenity.eligibility,
        last_updatedamenities:
          data.AccountSpecificamenity.last_updatedamenities,
        formattedLast_updatedamenities:
          data.AccountSpecificamenity.formattedLast_updatedamenities,
        lastupateameneid: data.AccountSpecificamenity.lastupateameneid,
        lastupateameneemail: data.AccountSpecificamenity.lastupateameneemail,
        amenities: data.AccountSpecificamenity.amenities,
        rateincludes: data.AccountSpecificamenity.rateincludes,
        isTopAccount: data.isTopAcc,
        AccountSpecificamenity: data.AccountSpecificamenity,
      });
      appContext.setSwitchEligTabFlag(false);
    }
  };

  const handleEligibilityCheck = (data, index, event, accountStatus) => {
    if (event.target.checked === false) {
      data.value = "N";
    } else {
      data.rfpeligibilityid = 12;
      if (
        accountStatus == "L" ||
        accountStatus == "R" ||
        accountStatus == "A"
      ) {
        data.value = "X";
      } else {
        data.value = "Y";
      }

      if (appContext.user.isHotelUser) {
        data.isHotelUser = true;
      }
    }
    const eligibilityData = state.eligibility;
    eligibilityData[index] = data;
    sessionStorage.setItem("changedEligData", JSON.stringify(eligibilityData));
    setState({
      ...state,
      eligibility: eligibilityData,
      handlechangeValue: true,
      eligChng: true,
    });
  };

  const handleAmenityCheck = (data, index, event) => {
    if (appContext.accStatus === "S") {
      data.rfpamenityid = 12;
    }
    if (event.target.checked === false) {
      data.value = "N";
    } else {
      data.value = "Y";
      if (appContext.user.isHotelUser) {
        data.isHotelUser = true;
      }
    }
    const amenitiesData = state.amenities;
    amenitiesData[index] = data;
    sessionStorage.setItem("changedAmenities", "true");

    state.eligibility.map((u) => (u.value = u.value === "X" ? "Y" : u.value));

    setState({
      ...state,
      amenities: amenitiesData,
      handlechangeValue: true,
      amenityChng: true,
    });
    pageValidation();
  };

  const pageValidation = () => {
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    let status;

    if (
      hotelspecificData?.showrebid === "Y" &&
      (appContext.user.isHotelUser ||
        appContext.user.isLimitedSalesUser ||
        (appContext?.user?.isSalesUser &&
          appContext.isMarkAsCompleteChecked)) &&
      accountCenterTabsContext?.eligibilityStatus == "R"
    ) {
      appContext.setPriceRebidScreenFlags({
        rebidTab: appContext.priceRebidScreenFlags.rebidTab,
        ratesRulesTab: "C",
        eligAmenityTab: "C",
      });
      status = accountCenterTabsContext.validateDetailsOnMarkAsCompleteChange(
        hotelspecificData,
        "",
        "C",
        "C"
      );
    } else {
      status = accountCenterTabsContext.validateDetailsOnMarkAsCompleteChange(
        hotelspecificData,
        "",
        undefined,
        "C"
      );
    }

    if (!status.bOK) {
      appContext.setMarkAsCompleteErrorAlert({
        show: true,
        message: status.msg,
        type: "browserAlert",
      });
    } else {
      appContext.setMarkAsCompleteErrorAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };
  const getHotelQuickAuditamenityData = (data) => {
    setState({
      ...state,
      numAudits: data.numAudits,
      breakinrates: data.hotelDetailsData?.breakinrates,
      isInternational:
        data.hotelData?.isInternational &&
        data.hotelDetailsData?.isInternational,
      quickAuditAmenInfo: data.quickAuditAmenInfo
        ? data.quickAuditAmenInfo
        : [],
    });
  };

  const updateEligibilityAmenityPrice = (reqParam, type?) => {
    type = type ? type : null;
    accountCenterTabsContext.setLoader(true);
    const strHotelEligibilityList = [];
    const strHotelAmenityList = [];
    let hasRateInclude = false;
    let hasAmenities = false;
    let showWiFiImageOnChkBoxSymbol = "";
    state.amenities.forEach((i) => {
      strHotelAmenityList.push({ value: i.value, amenityid: i.amenityid });
    });
    if (
      sessionStorage.getItem("ClickedTabs") == "null" ||
      sessionStorage.getItem("ClickedTabs") == "eligibilityAmenity"
    ) {
      state.eligibility.map((u) => (u.value = u.value === "X" ? "Y" : u.value));
    }

    state.eligibility.forEach((i) => {
      strHotelEligibilityList.push({
        value: i.value === "X" ? "Y" : i.value,
        eligibilityid: i.eligibilityid,
      });
    });
    state.rateincludes.forEach((i) => {
      if (
        reqParam.userDetails.user?.isReadOnly ||
        (reqParam.isLocked == "Y" &&
          !reqParam.userDetails.user?.isPASorAnySales)
      ) {
        if (i.value == "Y") {
          hasRateInclude = true;
        }
      }
    });
    state.amenities.forEach((i) => {
      if (
        reqParam.userDetails.user?.isReadOnly ||
        (reqParam.isLocked == "Y" &&
          i.value == "Y" &&
          !reqParam.userDetails.user?.isPASorAnySales) ||
        (i.locked == "Y" && !reqParam.userDetails.user?.isPASAdmin)
      ) {
        if (
          i.amenityid == "AMM_FULLBREAK" ||
          i.amenityid == "AMM_BUFFBREAK" ||
          i.amenityid == "AMM_CONTBREAK"
        ) {
          if (i.value == "Y") {
            hasAmenities = true;
          }
        }
      }
    });
    state.amenities.forEach((i) => {
      if (i.value == "Y" && state.isTopAccount == "Y") {
        showWiFiImageOnChkBoxSymbol = "Y";
      }
    });
    const strHasd = {};
    const data = {
      eligibility: strHotelEligibilityList,
      amenities: strHotelAmenityList,
    };
    strHasd[parseInt(`${reqParam.accountinfoid}`)] = data;
    const param = {
      showRateIncludes:
        state.isInternational ||
        (state.breakinrates == "N" &&
          reqParam.userDetails.user?.isPASorAnySales)
          ? "Y"
          : "N",
      rateIncludesSize: state.rateincludes.length,
      amenitiesSize: state.amenities.length,
      hasRateIncluded: hasRateInclude,
      hasAmenity: hasAmenities,
      acctEligChg: "Y",
      isLimitedAndHotelUsers:
        reqParam.userDetails.user?.hasLimitedHotels &&
        reqParam.userDetails.user?.hasLimitedHotels
          ? "Y"
          : "",
      isSalesAndAdminUsers:
        reqParam.userDetails.user?.isSalesUser ||
        reqParam.userDetails.user?.isPASAdmin
          ? "Y"
          : "",
      showWiFiImageOnChkBox: showWiFiImageOnChkBoxSymbol,
      strHasd: JSON.stringify(strHasd),
    };

    API.updateEligibilityAmenityPriceDetails(param, reqParam).then((res) => {
      accountCenterTabsContext.setLoader(true);
      if (type == "save") {
        API.getEligibilityAmenityPriceList(reqParam).then((res) => {
          accountCenterTabsContext.setLoader(false);
          getEligibilityAmenityPrice(res);
          //appContext.setEligibilitiesTick("C");
        });
      } else {
        accountCenterTabsContext.setLoader(false);
      }
    });
  };

  const priceeligibilityamenityContext = {
    state,
    setState,
    getEligibilityAmenityPrice,
    handleEligibilityCheck,
    handleAmenityCheck,
    updateEligibilityAmenityPrice,
    getHotelQuickAuditamenityData,
    setLoader,
    pageValidation,
  };
  return (
    <PriceEligibilityAmenityContext.Provider
      value={priceeligibilityamenityContext}
    >
      {props.children}
    </PriceEligibilityAmenityContext.Provider>
  );
};
export const PriceEligibilityAmenityContextConsumer =
  PriceEligibilityAmenityContext.Consumer;
export default PriceEligibilityAmenityContext;
