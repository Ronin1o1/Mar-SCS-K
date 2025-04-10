import React, { useEffect, useState, useContext } from "react";
import styles from "./hotelPriceRouting.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import API from "../service/API";
// import HotelContext, { HotelPricingContext } from '../context/hotelPricingContextProvider';
import Settings from "../static/Settings";
import completedImg from "../../../common/assets/img/completed.gif";
import revisitImg from "../../../common/assets/img/revisit.gif";
import screenLoader from "../../../common/assets/img/screenloader.gif";
import { CSaveAndNext } from "../../../common/components/CSaveAndNext";
import { useLocation } from "react-router-dom";

import HotelPricingContext, {
  HotelPricingContextProvider,
} from "../context/hotelPricingContextProvider";
import { TabName } from "./TabName";
import { tSExpressionWithTypeArguments } from "@babel/types";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import { CLoader } from "../../../common/components/CLoader";
let contextType = null;
let period;
let marshaCode;
let hotelName;
let urlName;
let routes = [];
let congnosEndPointUrl;
let alertpricingcontact5;
export function GlobalHeader(props) {
  const history = useHistory();
  const hideInfo = props.hideInfo;
  const hideButtons = props.hideButtons;
  const [queryString, setQueryString] = useState("");
  const [rfpid, setRfpid] = useState("");
  const [hideAccDetails, setHideAccDetails] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const screenNameValue = (value) => {
    const screenValue =
      contextType?.state?.gridData?.list?.menu?.pricingmenuList;
    let screenflag = false;
    screenValue.forEach((element) => {
      if (element.screenname == value && element.statusid != "C") {
        screenflag = true;
      }
    });
    return screenflag;
  };
  const urlParms = useLocation().search;
  const prevLocationData = useLocation()?.state?.from;
  urlName = useLocation().pathname;
  marshaCode =
    new URLSearchParams(urlParms).get("MarshaCode") ||
    contextType?.state?.marshaCode ||
    appContext?.hotelPricingUrlDetails?.marshaCode;
  hotelName =
    new URLSearchParams(urlParms).get("HotelName") ||
    contextType?.state?.hotelName ||
    appContext?.hotelPricingUrlDetails?.hotelName;
  const hotelrfpidFromParam = new URLSearchParams(urlParms).get("Hotelrfpid");
  const hotelRfpidFromSession = !contextType?.isHotelSelectionChanged
    ? sessionStorage.getItem("hotelrfpid")
    : 0;
  const hotelRfpId =
    hotelrfpidFromParam ||
    contextType?.selectedHotelRfpId ||
    appContext?.hotelPricingUrlDetails?.hotelRfpId ||
    hotelRfpidFromSession;
  const periodFromParam = new URLSearchParams(urlParms).get("Period");
  const [period, setperiod] = useState(
    periodFromParam ||
      contextType?.state?.period ||
      appContext?.hotelPricingUrlDetails?.period
  );

  useEffect(() => {
    const param = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
    };
    contextType.seturlDetails(param);
    contextType.setSelectedHotelRfpId(hotelRfpId);
    appContext?.setHotelPricingUrlDetails({
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
      hotelRfpId: hotelRfpId,
    });
  }, []);

  useEffect(() => {
    if (
      hotelRfpId !== null &&
      hotelRfpId !== "null" &&
      hotelRfpId !== 0 &&
      hotelRfpId !== "0"
    ) {
      contextType.setSelectedHotelRfpId(hotelRfpId);
      appContext?.setHotelPricingUrlDetails({
        marshaCode: marshaCode,
        hotelName: hotelName,
        period: period,
        hotelRfpId: hotelRfpId,
      });
    }
  }, [hotelRfpId]);

  useEffect(() => {
    sessionStorage.setItem("hotelrfpid", contextType?.selectedHotelRfpId);
    appContext?.setHotelPricingUrlDetails({
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
      hotelRfpId: contextType?.selectedHotelRfpId,
    });
    setyear();
  }, [contextType?.selectedHotelRfpId]);

  const getRoutes = (query) => {
    routes = [
      {
        path: "pricinghotelselect",
        name: "pricinghotelselect",

        children: [
          {
            path: "PriceContact",
            name: "PriceContact",
            queryString: query,
          },
          {
            path: "Standards",
            name: "Standards",
            queryString: query,
          },

          {
            path: "Seasons",
            name: "FixedSeason",
            queryString: query,
          },
          {
            path: "DepthOfSale",
            name: "DepthOfSale",
            queryString: query,
          },
          {
            path: "Blackout",
            name: "Blackout",
            queryString: query,
          },
          {
            path: "eligibilityAmenity",
            name: "eligibilityAmenity",
            queryString: query,
          },
          {
            path: "GroupsMeetings",
            name: "GroupsMeetings",
            queryString: query,
          },
          {
            path: "CPAC",
            name: "CPAC",
            queryString: query,
          },
          // {
          //   path: "finishAndSave",
          //   name: "finishAndSave",
          //   queryString: query,
          // },
        ],
      },
    ];
    if (appContext.user?.isPASAdmin) {
      const btObj = {
        path: "btAccountRates",
        name: "btAccountRates",
        queryString: query,
      };
      routes[0].children.splice(8, 0, btObj);
    } else {
      // const btObj = {
      //   path: "CPAC",
      //   name: "CPAC",
      //   queryString: query,
      // };
      routes[0].children.splice(7, 0);
    }
  };

  useEffect(() => {
    if (contextType.state.selectedYear) {
      setperiod(contextType.state.selectedYear);
    }
    const param = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
    };

    contextType.seturlDetails(param);
    appContext?.setHotelPricingUrlDetails({
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
      hotelRfpId: hotelRfpId,
    });

    if (rfpid == "") {
      getdata(param);
    }

    if (!appContext?.user) {
      getUserDetailsdata();
    } else {
      contextType.getUserDetails({ user: appContext?.user });
    }
    if (!appContext?.cognosURL) {
      getCognosUrl();
    }
    if (appContext.user?.isHotelUser && appContext.pricingContactFixed) {
      alertpricingcontact5 = true;
    } else {
      alertpricingcontact5 = false;
    }
    if (appContext.groupMeetingUpdation) {
      appContext.setGroupMeetingUpdation(false);
    }
  }, [rfpid, appContext.groupMeetingUpdation, appContext.pricingContactFixed]);

  const getCognosUrl = () => {
    API.getCongnosUrl()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((data) => {
        congnosEndPointUrl = data.REPORT_ONDEMAND_URL;
        appContext.setCognosURL(data);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };

  function setyear() {
    if (!contextType.state.gridData.list.currentItem) {
      if (localStorage.getItem("totalAPIData")) {
        const totalAPIDataFromSession = JSON.parse(
          localStorage.getItem("totalAPIData")
        );
        if (totalAPIDataFromSession?.hotelrfpid == hotelRfpId) {
          contextType.setGridDataList(
            JSON.parse(localStorage.getItem("totalAPIData"))
          );
        }
      }
    }
    if (contextType.state.selectedYear) {
      const hotelRfp =
        rfpid == 0 || rfpid == "0" || rfpid == null || rfpid == undefined
          ? contextType?.selectedHotelRfpId !== null &&
            contextType?.selectedHotelRfpId !== undefined &&
            contextType?.selectedHotelRfpId !== 0 &&
            contextType?.selectedHotelRfpId !== "0"
            ? contextType?.selectedHotelRfpId
            : sessionStorage.getItem("hotelrfpid")
          : rfpid;
      setperiod(contextType.state.selectedYear);
      const buildQueryString =
        "?&MarshaCode=" +
        marshaCode +
        "&Period=" +
        contextType.state.period +
        "&HotelName=" +
        hotelName +
        "&Hotelrfpid=" +
        +hotelRfp +
        "&HotelId=" +
        contextType.state.gridData?.list?.hotelData?.hotelid;
      getRoutes(buildQueryString);
      setQueryString(buildQueryString);
    } else if (contextType.state.period) {
      setperiod(contextType.state.period);
      const hotelRfp =
        rfpid == 0 || rfpid == "0" || rfpid == null || rfpid == undefined
          ? contextType?.selectedHotelRfpId !== null &&
            contextType?.selectedHotelRfpId !== undefined &&
            contextType?.selectedHotelRfpId !== 0 &&
            contextType?.selectedHotelRfpId !== "0"
            ? contextType?.selectedHotelRfpId
            : sessionStorage.getItem("hotelrfpid")
          : rfpid;
      const buildQueryString =
        "?&MarshaCode=" +
        marshaCode +
        "&Period=" +
        contextType.state.period +
        "&HotelName=" +
        hotelName +
        "&Hotelrfpid=" +
        +hotelRfp +
        "&HotelId=" +
        contextType.state.gridData?.list?.hotelData?.hotelid;
      getRoutes(buildQueryString);
      setQueryString(buildQueryString);
    } else if (appContext?.hotelPricingUrlDetails?.period) {
      const hotelRfp =
        rfpid == 0 || rfpid == "0" || rfpid == null || rfpid == undefined
          ? appContext?.hotelPricingUrlDetails?.hotelRfpId !== null &&
            appContext?.hotelPricingUrlDetails?.hotelRfpId !== undefined &&
            appContext?.hotelPricingUrlDetails?.hotelRfpId !== 0 &&
            appContext?.hotelPricingUrlDetails?.hotelRfpId !== "0"
            ? appContext?.hotelPricingUrlDetails?.hotelRfpId
            : sessionStorage.getItem("hotelrfpid")
          : rfpid;
      setperiod(appContext?.hotelPricingUrlDetails?.period);
      const buildQueryString =
        "?&MarshaCode=" +
        marshaCode +
        "&Period=" +
        appContext?.hotelPricingUrlDetails?.period +
        "&HotelName=" +
        hotelName +
        "&Hotelrfpid=" +
        +hotelRfp +
        "&HotelId=" +
        contextType.state.gridData?.list?.hotelData?.hotelid;
      getRoutes(buildQueryString);
      setQueryString(buildQueryString);
    }
  }
  function getdata(param) {
    const url = urlName.match("PriceContact");
    appContext.setUpdatedPricingData(false);
    if (url != null || !localStorage.getItem("totalAPIData")) {
      localStorage.removeItem("totalAPIData");
      contextType.setLoader(true);
      appContext.setCpacLoader(true);
      let sessionStorageParamData = sessionStorage.getItem(
        "selectedHotelParams"
      );
      if (
        sessionStorageParamData !== null &&
        sessionStorageParamData !== undefined &&
        sessionStorageParamData !== "undefined"
      ) {
        sessionStorageParamData = JSON.parse(sessionStorageParamData);
      }
      if (param.marshaCode == null || param.marshaCode == undefined) {
        if (
          contextType.state.marshaCode !== null &&
          contextType.state.marshaCode !== undefined &&
          contextType.state.marshaCode !== ""
        ) {
          param.marshaCode = contextType.state.marshaCode;
        } else if (
          sessionStorageParamData &&
          sessionStorageParamData?.marshaCode !== null &&
          sessionStorageParamData?.marshaCode !== undefined &&
          sessionStorageParamData?.marshaCode !== ""
        ) {
          param.marshaCode = sessionStorageParamData?.marshaCode;
        }
      }
      if (param.period == null || param.period == undefined) {
        if (
          contextType.state.period !== null &&
          contextType.state.period !== undefined &&
          contextType.state.period !== ""
        ) {
          param.period = contextType.state.period;
        } else if (
          sessionStorageParamData &&
          sessionStorageParamData?.period !== null &&
          sessionStorageParamData?.period !== undefined &&
          sessionStorageParamData?.period !== ""
        ) {
          param.period = sessionStorageParamData?.period;
        }
      }
      if (param.hotelName == null || param.hotelName == undefined) {
        if (
          contextType.state.hotelName !== null &&
          contextType.state.hotelName !== undefined &&
          contextType.state.hotelName !== ""
        ) {
          param.hotelName = contextType.state.hotelName;
        } else if (
          sessionStorageParamData &&
          sessionStorageParamData?.hotelName !== null &&
          sessionStorageParamData?.hotelName !== undefined &&
          sessionStorageParamData?.hotelName !== ""
        ) {
          param.hotelName = sessionStorageParamData?.hotelName;
        }
      }
      setHideAccDetails(true);
      contextType.setShowLoader(true);
      API.gethotelrespondent(param)
        .then((data) => {
          sessionStorage.setItem("hotelrfpid", data.hotelrfpid);
          contextType?.setIsHotelSelectionChanged(false);
          contextType.setLoader(false);
          appContext.setCpacLoader(false);
          contextType.setShowLoader(false);
          setHideAccDetails(false);
          contextType.setGridDataList(data);
          setRfpid(data.hotelrfpid);
          contextType.setSelectedHotelRfpId(data.hotelrfpid);
          sessionStorage.setItem("currency", data.currency);
          sessionStorage.setItem(
            "hotelPricingMarshaCodeName",
            data?.hotelData?.marshaCodeAndName
          );
          appContext?.setHotelPricingUrlDetails({
            marshaCode: marshaCode,
            hotelName: hotelName,
            period: period,
            hotelRfpId: data.hotelrfpid,
            currency: data.currency,
          });
          localStorage.setItem("totalAPIData", JSON.stringify(data));
          if (data.hotelrfpid != "") appContext.setUpdatedPricingData(true);
          const buildQueryString =
            "?&MarshaCode=" +
            marshaCode +
            "&Period=" +
            period +
            "&HotelName=" +
            hotelName +
            "&Hotelrfpid=" +
            data.hotelrfpid +
            "&HotelId=" +
            contextType.state.gridData?.list?.hotelData?.hotelid;
          getRoutes(buildQueryString);
          setQueryString(buildQueryString);
        })
        .catch((error) => {
          contextType.setLoader(false);
          appContext.setCpacLoader(false);
        });
    }
  }

  function getUserDetailsdata() {
    const urs = sessionStorage.getItem("GETUSERDETAILS");
    if (urs) {
      contextType.getUserDetails(JSON.parse(urs));
    } else {
      const urs = sessionStorage.getItem("GETUSERDETAILS");
      if (urs) {
        contextType.getUserDetails(JSON.parse(urs));
      } else {
        API.getUserDetails()
          .then((data) => {
            contextType.getUserDetails(data);
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});
      }
    }
  }
  const navigateToGP = (url) => {
    const standardAlert = appContext.isStandardAlertMsg
      ? JSON.parse(appContext.isStandardAlertMsg)
      : "";
    if (window.location.pathname.includes("CPAC") && appContext.isNoBidAlert) {
      alert(Settings.alert.rowAlert);
    } else if (appContext.user?.isHotelUser && appContext.isStartDateAlert) {
      alert(Settings.alert.emptyStartDate);
    } else if (appContext.user?.isHotelUser && appContext.isEndDateAlert) {
      alert(Settings.alert.emptyEndDate);
    } else if (appContext.user?.isHotelUser && appContext.isDOSAlert) {
      alert(Settings.alert.rangeAlert);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isPASSelected &&
      appContext.isGPPSelected &&
      appContext.isSamePoolSelected &&
      appContext.isRpgonerponeSelected &&
      appContext.isRpgonerptwoSelected &&
      appContext.isRpgtworponeSelected &&
      appContext.isRpgtworptwoSelected &&
      appContext.isRpgthreerponeSelected &&
      appContext.isRpgthreerptwoSelected &&
      appContext.isRtrpgonerponeSelected &&
      appContext.isRtrpgonerptwoSelected &&
      appContext.isRtrpgtworponeSelected &&
      appContext.isRtrpgtworptwoSelected &&
      appContext.isRtrpgthreerponeSelected &&
      appContext.isRtrpgthreerptwoSelected &&
      appContext.isRponerpgoneMustAlsoSelected &&
      appContext.isRponerpgtwoMustAlsoSelected &&
      appContext.isRponerpgoneMustSelected &&
      appContext.isRponerpgthreeMustAlsoSelected
    ) {
      alert(Settings.alert.sameRoomPoolAlert);
      //alert(Settings.alert.PASAlert);
      alert(Settings.alert.GPPAlert);
      alert(Settings.alert.rpgonerponeSelected);
      alert(Settings.alert.rpgonerptwoSelected);
      alert(Settings.alert.rpgtworponeSelected);
      alert(Settings.alert.rpgtworptwoSelected);
      alert(Settings.alert.rpgthreerponeSelected);
      alert(Settings.alert.rpgthreerptwoSelected);
      alert(Settings.alert.rtrpgonerponeSelected);
      alert(Settings.alert.rtrpgonerptwoSelected);
      alert(Settings.alert.rtrpgtworponeSelected);
      alert(Settings.alert.rtrpgtworptwoSelected);
      alert(Settings.alert.rtrpgthreerponeSelected);
      alert(Settings.alert.rtrpgthreerptwoSelected);
      alert(Settings.alert.rponerpgoneMustAlsoSelected);
      alert(Settings.alert.rponerpgtwoMustAlsoSelected);
      alert(Settings.alert.rponerpgoneMustSelected);
      alert(Settings.alert.rponerpgthreeMustAlsoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isPASSelected &&
      appContext.isGPPSelected
    ) {
      //alert(Settings.alert.PASAlert);
      alert(Settings.alert.GPPAlert);
    } else if (appContext.user?.isHotelUser && appContext.isSamePoolSelected) {
      alert(Settings.alert.sameRoomPoolAlert);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgonerponeSelected
    ) {
      alert(Settings.alert.rpgonerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgonerptwoSelected
    ) {
      alert(Settings.alert.rpgonerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgtworponeSelected
    ) {
      alert(Settings.alert.rpgtworponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgtworptwoSelected
    ) {
      alert(Settings.alert.rpgtworptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgthreerponeSelected
    ) {
      alert(Settings.alert.rpgthreerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgthreerptwoSelected
    ) {
      alert(Settings.alert.rpgthreerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgonerponeSelected
    ) {
      alert(Settings.alert.rtrpgonerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgonerptwoSelected
    ) {
      alert(Settings.alert.rtrpgonerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgtworponeSelected
    ) {
      alert(Settings.alert.rtrpgtworponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgtworptwoSelected
    ) {
      alert(Settings.alert.rtrpgtworptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgthreerponeSelected
    ) {
      alert(Settings.alert.rtrpgthreerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRtrpgthreerptwoSelected
    ) {
      alert(Settings.alert.rtrpgthreerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgonerponeSelected
    ) {
      alert(Settings.alert.rpgonerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgonerptwoSelected
    ) {
      alert(Settings.alert.rpgonerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgtworponeSelected
    ) {
      alert(Settings.alert.rpgtworponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgtworptwoSelected
    ) {
      alert(Settings.alert.rpgtworptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgthreerponeSelected
    ) {
      alert(Settings.alert.rpgthreerponeSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRpgthreerptwoSelected
    ) {
      alert(Settings.alert.rpgthreerptwoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRponerpgoneMustAlsoSelected
    ) {
      alert(Settings.alert.rponerpgoneMustAlsoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRponerpgtwoMustAlsoSelected
    ) {
      alert(Settings.alert.rponerpgtwoMustAlsoSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRponerpgoneMustSelected
    ) {
      alert(Settings.alert.rponerpgoneMustSelected);
    } else if (
      appContext.user?.isHotelUser &&
      appContext.isRponerpgthreeMustAlsoSelected
    ) {
      alert(Settings.alert.rponerpgthreeMustAlsoSelected);
    } else if (appContext.user?.isHotelUser && appContext.isPASSelected) {
      //alert(Settings.alert.PASAlert);
    } else if (appContext.user?.isHotelUser && appContext.isGPPSelected) {
      alert(Settings.alert.GPPAlert);
    } else if (appContext.rateNotesValidationErr) {
      alert(appContext.rateNotesValidationMsg);
    } else if (appContext.errorMessageAlert.show) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    } else if (
      appContext.oneTimeNavigationAlert.show &&
      !appContext.oneTimeNavigationAlert.navigate
    ) {
      if (appContext.oneTimeNavigationAlert.message !== "") {
        alert(appContext.oneTimeNavigationAlert.message);
      }
      appContext.setOneTimeNavigationAlert({
        show: false,
        message: "",
        navigate: false,
      });
    } else if (appContext.markAsCompleteErrorAlert.show) {
      if (appContext.markAsCompleteErrorAlert.message !== "") {
        alert(appContext.markAsCompleteErrorAlert.message);
      }
    } else if (
      appContext.user?.isHotelUser &&
      screenNameValue("Pricing Contact") &&
      !alertpricingcontact5 &&
      url !== "Select Hotel Pricing"
    ) {
      alert(Settings.alert.standardalertscpt);
    } else if (
      appContext.user?.isHotelUser &&
      screenNameValue("Standards") &&
      url !== "Select Hotel Pricing"
    ) {
      alert(Settings.alert.standardalertscpt);
    } else if (
      appContext.user?.isHotelUser &&
      screenNameValue("Seasons") &&
      url !== "Select Hotel Pricing"
    ) {
      alert(Settings.alert.seasonalertscpt);
    } else if (appContext.isStandardAlert && standardAlert.length != 0) {
      for (const msg of standardAlert) {
        alert(msg);
      }
    } else if (appContext.blackoutAlertMsgFlag) {
      alert(appContext.blackoutAlertMsg);
    } else {
      if (
        appContext.oneTimeNavigationAlert.show &&
        appContext.oneTimeNavigationAlert.navigate
      ) {
        if (appContext.oneTimeNavigationAlert.message !== "") {
          alert(appContext.oneTimeNavigationAlert.message);
        }
        appContext.setOneTimeNavigationAlert({
          show: false,
          message: "",
          navigate: false,
        });
      }
      if (url == "CPAC") {
        sessionStorage.setItem("searchtype", "A");
        history.push({
          pathname: `${Settings.routes.CPAC}`,
          search: queryString,
          prevPath: urlName,
        });
      } else if (url == "Pricing Contact") {
        history.push({
          pathname: `${Settings.routes.PriceContact}`,
          search: queryString,
          prevPath: urlName,
        });
      } else if (url == "btAccountRates") {
        sessionStorage.setItem("searchtype", "A");
        history.push({
          pathname: `${Settings.routes.btAccountRates}`,
          search: queryString,
          prevPath: urlName,
        });
      } else if (url === "Standards") {
        history.push({
          pathname: `${Settings.routes.Standards}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Seasons") {
        history.push({
          pathname: `${Settings.routes.FixedSeason}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Depth of Sales") {
        history.push({
          pathname: `${Settings.routes.DepthOfSale}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Blackout") {
        history.push({
          pathname: `${Settings.routes.Blackout}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Elig. & Amen.") {
        history.push({
          pathname: `${Settings.routes.EligibilityAmenity}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Groups & Meetings") {
        history.push({
          pathname: `${Settings.routes.GroupsMeetings}`,
          search: queryString,
          from: url,
          prevPath: urlName,
        });
      } else if (url === "Select Hotel Pricing") {
        routes = [];
        history.push({
          pathname: `${Settings.parentRoute}/SelectHotelPricing`,
          search: queryString,
        });
      } else if (url === "SCPT") {
        if (window.location.pathname.includes("SCPT")) {
          history.go(0);
        }
        history.push({
          pathname: `${Settings.parentRoute}/SCPT`,
          search: queryString,
          prevPath: urlName,
        });
      } else if (url === "Multiple Blackout") {
        history.push({
          pathname: `${Settings.routes.blackout}`,
          search: queryString,
          prevPath: urlName,
        });
      } else if (url === "General Pricing") {
        history.push({
          pathname: `${Settings.routes.PriceContact}`,
          search: queryString,
          prevPath: urlName,
        });
      }
    }
  };
  const isAdminOrLimitedSalesOrSalesUser = () => {
    return (
      appContext?.user?.isAdminRole ||
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isSalesUser
    );
  };
  const onNearestAccount = () => {
    sessionStorage.setItem("reportUrl", "");
    const parms = Settings.popupParms;

    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Nearest Facility Report" +
      "&Period=" +
      period +
      "&HotelId=" +
      contextType.state.gridData?.list.hotelData.hotelid;

    window.open(url, "_blank");
  };
  const onNearestAccountExcel = () => {
    sessionStorage.setItem("reportUrl", "");

    const parms = Settings.popupParms;
    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Nearest Facility Excel Report" +
      "&Period=" +
      period +
      "&HotelId=" +
      contextType.state.gridData?.list.hotelData.hotelid;

    window.open(url, "_blank");
  };
  const onSpecialCorporate = (period) => {
    const parms = Settings.popupParms;
    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Special Corporate Pricing Tool Summary Report" +
      "&Period=" +
      period +
      "&HotelId=" +
      contextType.state.gridData?.list.hotelData.hotelid;

    window.open(url, "_blank");
  };
  const onReport = (tabName, year) => {
    const parms = Settings.popupParms;
    let pathname = "";
    if (tabName === Settings.pricingTabs.reportTabs.topTravelMarkets) {
      pathname = window.location.pathname.replace(Settings.replaceStr, "");

      const url =
        window.location.origin +
        window.location.pathname.substring(
          0,
          window.location.pathname.lastIndexOf("/")
        ) +
        "/topTravelMarket?&Period=" +
        year +
        "&HoteId=" +
        contextType.state.gridData?.list.hotelData.hotelid +
        "&ReportName=" +
        tabName;
      window.open(url, "_blank");
    } else {
      const url =
        window.location.origin +
        window.location.pathname.substring(
          0,
          window.location.pathname.lastIndexOf("/")
        ) +
        "/hotelPricingreport?&Period=" +
        year +
        "&HoteId=" +
        contextType.state.gridData?.list.hotelData.hotelid +
        "&ReportName=" +
        tabName;

      window.open(url, "_blank");
    }
  };
  const onToolsResources = (tabName, year) => {
    const parms = Settings.popupParms;

    if (
      tabName == Settings.pricingTabs.toolsTabs.GPPAccountList 
    ) {
      API.generateToolsReport(tabName).then((res) => {
        const url = res.reportServer + "&" + res.queryString;
        window.open(url, "_blank");
      });
    } else if (tabName == Settings.pricingTabs.toolsTabs.BTBookingCost) {
      const url = Settings.api.btBookingCostUrl;
      window.open(url, "_blank");
    } else if (tabName == Settings.pricingTabs.toolsTabs.HotelTraining) {
      const url = Settings.api.hotelTrainingUrl;
      window.open(url, "_blank");
    } else {
      const url =
        window.location.origin +
        window.location.pathname.substring(
          0,
          window.location.pathname.lastIndexOf("/")
        ) +
        "/hotelPricingTools?&Period=" +
        year +
        "&ReportName=" +
        tabName;
      window.open(url, "_blank");
    }
  };

  const checkPrevMenuListStatus = (url) => {
    const menuList = contextType.state.gridData?.list?.menu?.pricingmenuList;
    const bOK = { bOK: true, message: "" };
    if (menuList) {
      const i = menuList.findIndex((f) => f.screenname == url);
      const prevMenus = menuList.slice(0, i);
      if (prevMenus.length > 0) {
        for (let j = 0; j < prevMenus.length; j++) {
          if (prevMenus[j].statusid != "C") {
            if (prevMenus[j].screenname == "Pricing Contact") {
              continue;
            } else if (
              prevMenus[j].screenname == "Standards" &&
              urlName.includes("Standards")
            ) {
              continue;
            } else if (
              prevMenus[j].screenname == "Standards" &&
              url == "Seasons"
            ) {
              bOK.bOK = false;
              bOK.message = Settings.alert.standardalertscpt;
              break;
            } else if (
              prevMenus[j].screenname == "Standards" &&
              url != "Seasons"
            ) {
              bOK.bOK = false;
              bOK.message = Settings.alert.standardalertscptInfo;
              break;
            } else if (prevMenus[j].screenname == "Seasons") {
              bOK.bOK = false;
              bOK.message = Settings.alert.seasonalertscpt;
              break;
            }
          }
        }
      }
    }
    return bOK;
  };

  return (
    <HotelPricingContext.Consumer>
      {(hotelPricing) => {
        contextType = hotelPricing;
        setyear();
        return contextType.state.showScreenLoader ? (
          <img
            style={{
              position: "absolute",
              top: "55%",
              left: "45%",
            }}
            src={screenLoader}
          />
        ) : (
          <div>
            {appContext.cpacLoader ? (
              <span></span>
            ) : (
              <div>
                <div className={`${styles.subMenu} ${styles.subnav}`}>
                  <ul className={styles.subnavigation}></ul>
                  <ul className={styles.subnavigation}>
                    <li
                      className={styles.sublistHeader}
                      onClick={(e) => {
                        sessionStorage.setItem("searchtype", "A");
                        if (appContext.isMbeMandatoryFields) {
                          alert(appContext.mbeMandatoryAlert);
                          e.preventDefault();
                        } else if (
                          appContext.noRedirect &&
                          appContext.user.isHotelUser
                        ) {
                          appContext.setActiveTab("btAndGroupAccount");
                          alert(Settings.alert.emptryAlert);
                          e.preventDefault();
                        } else if (
                          appContext.user.isHotelUser &&
                          appContext.isUpdateHotelMandatoryFields
                        ) {
                          alert(appContext.updateHotelMandatoryAlert);
                          e.preventDefault();
                        } else if (appContext.isPrintAccountContainerAlert) {
                          alert(appContext.printAccountContainerAlert);
                          e.preventDefault();
                        } else {
                          sessionStorage.removeItem("hotelRefreshData");
                          navigateToGP("Select Hotel Pricing");
                        }
                      }}
                    >
                      {/* <Link to="`{Settings.parentRoute}`/SelectHotelPricing"> */}{" "}
                      <a>
                        {Settings.pricingTabs.selectHotel} <br></br>
                        {Settings.pricingTabs.selectHotel1}
                      </a>
                      {/* </Link> */}
                    </li>
                    <li className={styles.sublistHeader}>
                      <a
                        // className={styles.menuPadding}
                        style={{ paddingRight: "20px" }}
                        onClick={(e) => {
                          sessionStorage.setItem("searchtype", "A");
                          if (
                            window.location.pathname.includes("CPAC") &&
                            appContext.isNoBidAlert
                          ) {
                            alert(Settings.alert.rowAlert);
                          } else if (
                            appContext.errorMessageAlert.show &&
                            urlName.includes("PriceContact")
                          ) {
                            appContext.setDisplayNavigationAlert(
                              !appContext.displayNavigationAlert
                            );
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isStartDateAlert
                          ) {
                            alert(Settings.alert.emptyStartDate);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isEndDateAlert
                          ) {
                            alert(Settings.alert.emptyEndDate);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isDOSAlert
                          ) {
                            alert(Settings.alert.rangeAlert);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isPASSelected &&
                            appContext.isGPPSelected &&
                            appContext.isSamePoolSelected
                          ) {
                            alert(Settings.alert.sameRoomPoolAlert);
                            // alert(Settings.alert.PASAlert);
                            alert(Settings.alert.GPPAlert);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isPASSelected &&
                            appContext.isGPPSelected
                          ) {
                            // alert(Settings.alert.PASAlert);
                            alert(Settings.alert.GPPAlert);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isSamePoolSelected
                          ) {
                            alert(Settings.alert.sameRoomPoolAlert);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isPASSelected
                          ) {
                            //  alert(Settings.alert.PASAlert);
                          } else if (
                            appContext.user?.isHotelUser &&
                            appContext.isGPPSelected
                          ) {
                            alert(Settings.alert.GPPAlert);
                          }
                          if (appContext.isMbeMandatoryFields) {
                            alert(appContext.mbeMandatoryAlert);
                            e.preventDefault();
                          } else if (
                            appContext.noRedirect &&
                            appContext.user.isHotelUser
                          ) {
                            appContext.setActiveTab("btAndGroupAccount");
                            alert(Settings.alert.emptryAlert);
                            e.preventDefault();
                          } else if (
                            appContext.user.isHotelUser &&
                            appContext.isUpdateHotelMandatoryFields
                          ) {
                            alert(appContext.updateHotelMandatoryAlert);
                            e.preventDefault();
                          } else if (appContext.isPrintAccountContainerAlert) {
                            alert(appContext.printAccountContainerAlert);
                            e.preventDefault();
                          } else {
                            navigateToGP("General Pricing");
                          }
                        }}
                      >
                        {Settings.pricingTabs.general}
                        <br />
                        {Settings.pricingTabs.Pricing}
                      </a>
                      <ul className={styles.sublist}>
                        {contextType.state.gridData?.list?.menu?.pricingmenuList.map(
                          (data) => {
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <li>
                                <a
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else if (
                                      appContext.noRedirect &&
                                      appContext.user.isHotelUser
                                    ) {
                                      appContext.setActiveTab(
                                        "btAndGroupAccount"
                                      );
                                      alert(Settings.alert.emptryAlert);
                                      e.preventDefault();
                                    } else if (
                                      appContext.user.isHotelUser &&
                                      appContext.isUpdateHotelMandatoryFields
                                    ) {
                                      alert(
                                        appContext.updateHotelMandatoryAlert
                                      );
                                      e.preventDefault();
                                    } else if (
                                      appContext.isPrintAccountContainerAlert
                                    ) {
                                      alert(
                                        appContext.printAccountContainerAlert
                                      );
                                      e.preventDefault();
                                    } else if (
                                      appContext?.user?.isHotelUser &&
                                      !checkPrevMenuListStatus(data.screenname)
                                        .bOK
                                    ) {
                                      alert(
                                        checkPrevMenuListStatus(data.screenname)
                                          .message
                                      );
                                      e.preventDefault();
                                    } else {
                                      navigateToGP(data.screenname);
                                    }
                                  }}
                                >
                                  {!contextType.state.gridData?.list?.menu
                                    .blockPricingScreens ||
                                  data.screenid === 3 ||
                                  data.screenid === 11 ? (
                                    <span>
                                      {data.statusid === "C" ? (
                                        <img
                                          src={completedImg}
                                          className={styles.imgStatus}
                                        />
                                      ) : data.statusid === "R" ? (
                                        <img
                                          src={revisitImg}
                                          className={styles.imgStatus}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {data.screenname}
                                </a>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </li>
                    {!contextType.state.gridData?.list?.menu
                      ?.blockPricingScreens ? (
                      <span className={styles.sublistTitle}>
                        {(appContext.user?.isHotelUser ||
                          appContext.user?.isPASAdmin) &&
                        period > 2020 ? (
                          <li
                            onClick={(e) => {
                              sessionStorage.setItem("searchtype", "A");
                              if (
                                appContext.user?.isHotelUser &&
                                appContext.isGPPSelected
                              ) {
                                alert(Settings.alert.commonSeasonAlert);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Pricing Contact")
                              ) {
                                alert(Settings.alert.standardalertscpt);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Standards")
                              ) {
                                alert(Settings.alert.standardalertscpt);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Seasons")
                              ) {
                                alert(Settings.alert.seasonalertscpt);
                              } else if (
                                appContext.errorMessageAlert.show &&
                                urlName.includes("PriceContact")
                              ) {
                                appContext.setDisplayNavigationAlert(
                                  !appContext.displayNavigationAlert
                                );
                              } else if (appContext.isMbeMandatoryFields) {
                                alert(appContext.mbeMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.markAsCompleteErrorAlert.show
                              ) {
                                if (
                                  appContext.markAsCompleteErrorAlert
                                    .message !== ""
                                ) {
                                  alert(
                                    appContext.markAsCompleteErrorAlert.message
                                  );
                                  e.preventDefault();
                                }
                              } else if (
                                appContext.noRedirect &&
                                appContext.user.isHotelUser
                              ) {
                                appContext.setActiveTab("btAndGroupAccount");
                                alert(Settings.alert.emptryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.user?.isHotelUser &&
                                appContext.pricingContactFixed
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user?.isHotelUser &&
                                alertpricingcontact5
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user.isHotelUser &&
                                appContext.isUpdateHotelMandatoryFields
                              ) {
                                alert(appContext.updateHotelMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.isPrintAccountContainerAlert
                              ) {
                                alert(appContext.printAccountContainerAlert);
                                e.preventDefault();
                              } else {
                                navigateToGP("SCPT");
                              }
                            }}
                          >
                            <a style={{ paddingRight: "5px" }}>
                              {Settings.pricingTabs.scpt}
                              <br></br>
                              {Settings.pricingTabs.scpt1}
                            </a>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <a
                            style={{ paddingRight: "15px" }}
                            onClick={(e) => {
                              sessionStorage.setItem("searchtype", "A");
                              if (
                                appContext.user?.isHotelUser &&
                                contextType.state.gridData?.list?.menu
                                  ?.noPricing === "Y"
                              ) {
                                alert(Settings.alert.cpacalert);
                              } else if (
                                appContext.errorMessageAlert.show &&
                                urlName.includes("PriceContact")
                              ) {
                                appContext.setDisplayNavigationAlert(
                                  !appContext.displayNavigationAlert
                                );
                              } else if (
                                appContext.user?.isHotelUser &&
                                appContext.isGPPSelected
                              ) {
                                alert(Settings.alert.commonSeasonAlert);
                              } else if (appContext.isMbeMandatoryFields) {
                                alert(appContext.mbeMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.markAsCompleteErrorAlert.show
                              ) {
                                if (
                                  appContext.markAsCompleteErrorAlert
                                    .message !== ""
                                ) {
                                  alert(
                                    appContext.markAsCompleteErrorAlert.message
                                  );
                                  e.preventDefault();
                                }
                              } else if (
                                appContext.noRedirect &&
                                appContext.user.isHotelUser
                              ) {
                                appContext.setActiveTab("btAndGroupAccount");
                                alert(Settings.alert.emptryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.user?.isHotelUser &&
                                appContext.pricingContactFixed
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user?.isHotelUser &&
                                alertpricingcontact5
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user.isHotelUser &&
                                appContext.isUpdateHotelMandatoryFields
                              ) {
                                alert(appContext.updateHotelMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.isPrintAccountContainerAlert
                              ) {
                                alert(appContext.printAccountContainerAlert);
                                e.preventDefault();
                              } else {
                                navigateToGP("CPAC");
                              }
                            }}
                          >
                            {Settings.pricingTabs.cpac}
                            <br></br>
                            {Settings.pricingTabs.cpac1}
                          </a>
                        </li>

                        {appContext.user?.isPASAdmin ? (
                          <li>
                            <a
                              style={{ paddingRight: "12.5px" }}
                              onClick={(e) => {
                                sessionStorage.setItem("searchtype", "A");
                                if (appContext.isMbeMandatoryFields) {
                                  alert(appContext.mbeMandatoryAlert);
                                  e.preventDefault();
                                } else if (
                                  appContext.markAsCompleteErrorAlert.show
                                ) {
                                  if (
                                    appContext.markAsCompleteErrorAlert
                                      .message !== ""
                                  ) {
                                    alert(
                                      appContext.markAsCompleteErrorAlert
                                        .message
                                    );
                                    e.preventDefault();
                                  }
                                } else if (
                                  appContext.noRedirect &&
                                  appContext.user.isHotelUser
                                ) {
                                  appContext.setActiveTab("btAndGroupAccount");
                                  alert(Settings.alert.emptryAlert);
                                  e.preventDefault();
                                } else if (
                                  appContext.user.isHotelUser &&
                                  appContext.isUpdateHotelMandatoryFields
                                ) {
                                  alert(appContext.updateHotelMandatoryAlert);
                                  e.preventDefault();
                                } else if (
                                  appContext.isPrintAccountContainerAlert
                                ) {
                                  alert(appContext.printAccountContainerAlert);
                                  e.preventDefault();
                                } else {
                                  navigateToGP("btAccountRates");
                                }
                              }}
                            >
                              {Settings.pricingTabs.bTAccountRates}
                              <br></br>
                              {Settings.pricingTabs.bTAccountRates1}
                            </a>
                          </li>
                        ) : (
                          ""
                        )}

                        <li>
                          <a
                            onClick={(e) => {
                              sessionStorage.setItem("searchtype", "A");
                              if (
                                appContext.user?.isHotelUser &&
                                appContext.isGPPSelected
                              ) {
                                alert(Settings.alert.commonSeasonAlert);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Pricing Contact")
                              ) {
                                alert(Settings.alert.standardalertscpt);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Standards")
                              ) {
                                alert(Settings.alert.standardalertscpt);
                              } else if (
                                appContext.user?.isHotelUser &&
                                screenNameValue("Seasons")
                              ) {
                                alert(Settings.alert.seasonalertscpt);
                              } else if (
                                appContext.errorMessageAlert.show &&
                                urlName.includes("PriceContact")
                              ) {
                                appContext.setDisplayNavigationAlert(
                                  !appContext.displayNavigationAlert
                                );
                              } else if (appContext.isMbeMandatoryFields) {
                                alert(appContext.mbeMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.markAsCompleteErrorAlert.show
                              ) {
                                if (
                                  appContext.markAsCompleteErrorAlert
                                    .message !== ""
                                ) {
                                  alert(
                                    appContext.markAsCompleteErrorAlert.message
                                  );
                                  e.preventDefault();
                                }
                              } else if (
                                appContext.noRedirect &&
                                appContext.user.isHotelUser
                              ) {
                                appContext.setActiveTab("btAndGroupAccount");
                                alert(Settings.alert.emptryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.user?.isHotelUser &&
                                appContext.pricingContactFixed
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user?.isHotelUser &&
                                alertpricingcontact5
                              ) {
                                alert(Settings.alert.pricingContactMandatory);
                              } else if (
                                appContext.user.isHotelUser &&
                                appContext.isUpdateHotelMandatoryFields
                              ) {
                                alert(appContext.updateHotelMandatoryAlert);
                                e.preventDefault();
                              } else if (
                                appContext.isPrintAccountContainerAlert
                              ) {
                                alert(appContext.printAccountContainerAlert);
                                e.preventDefault();
                              } else {
                                navigateToGP("Multiple Blackout");
                              }
                            }}
                          >
                            {Settings.pricingTabs.multipleBlackout}
                            <br></br>
                            {Settings.pricingTabs.multipleBlackout1}
                          </a>
                        </li>

                        <li className="room">
                          <a
                            href="javascript:void(0);"
                            className={styles.menuPadding}
                          >
                            {Settings.pricingTabs.reports}
                          </a>
                          <ul
                            className={styles.sublist}
                            style={{ width: "180px" }}
                          >
                            <li>
                              <a>
                                {
                                  Settings.pricingTabs.reportTabs
                                    .acceptanceStatus
                                }{" "}
                                <span className={styles.arrowadm}>&#9658;</span>
                              </a>
                              <ul className={styles.sublist}>
                                {contextType.state.gridData?.list?.menu?.reportPeriods?.map(
                                  (data) => {
                                    return (
                                      // eslint-disable-next-line react/jsx-key
                                      <li
                                        onClick={(e) => {
                                          sessionStorage.setItem(
                                            "searchtype",
                                            "A"
                                          );
                                          if (appContext.isMbeMandatoryFields) {
                                            alert(appContext.mbeMandatoryAlert);
                                            e.preventDefault();
                                          } else {
                                            onReport(
                                              Settings.pricingTabs.reportTabs
                                                .acceptanceStatus,
                                              data.period
                                            );
                                          }
                                        }}
                                      >
                                        <a>
                                          {data.period}{" "}
                                          {
                                            Settings.pricingTabs.reportTabs
                                              .acceptanceStatus
                                          }
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </li>
                            <li>
                              <a>
                                {
                                  Settings.pricingTabs.reportTabs
                                    .acceptanceStatusExcel
                                }
                                <span className={styles.arrowadm1}>
                                  &#9658;
                                </span>
                              </a>
                              <ul className={styles.sublist}>
                                {contextType.state.gridData?.list?.menu?.reportPeriods?.map(
                                  (data) => {
                                    return (
                                      // eslint-disable-next-line react/jsx-key
                                      <li
                                        onClick={(e) => {
                                          sessionStorage.setItem(
                                            "searchtype",
                                            "A"
                                          );
                                          if (appContext.isMbeMandatoryFields) {
                                            alert(appContext.mbeMandatoryAlert);
                                            e.preventDefault();
                                          } else {
                                            onReport(
                                              Settings.pricingTabs.reportTabs
                                                .acceptanceStatusExcel,
                                              data.period
                                            );
                                          }
                                        }}
                                      >
                                        <a>
                                          {data.period}{" "}
                                          {
                                            Settings.pricingTabs.reportTabs
                                              .acceptanceStatusExcel
                                          }
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </li>
                            <li>
                              <a>
                                {
                                  Settings.pricingTabs.reportTabs
                                    .addendumQuestions
                                }
                                <span className={styles.arrowadm2}>
                                  &#9658;
                                </span>
                              </a>
                              <ul className={styles.sublist}>
                                {contextType.state.gridData?.list?.menu?.reportPeriods?.map(
                                  (data) => {
                                    return (
                                      // eslint-disable-next-line react/jsx-key
                                      <li
                                        onClick={(e) => {
                                          sessionStorage.setItem(
                                            "searchtype",
                                            "A"
                                          );
                                          if (appContext.isMbeMandatoryFields) {
                                            alert(appContext.mbeMandatoryAlert);
                                            e.preventDefault();
                                          } else {
                                            onReport(
                                              Settings.pricingTabs.reportTabs
                                                .addendumQuestions,
                                              data.period
                                            );
                                          }
                                        }}
                                      >
                                        <a>
                                          {data.period}{" "}
                                          {
                                            Settings.pricingTabs.reportTabs
                                              .addendumQuestions
                                          }
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </li>
                            {appContext.user?.isHotelUser ||
                            appContext.user?.isPASAdmin ? (
                              <li
                                onClick={(e) => {
                                  sessionStorage.setItem("searchtype", "A");
                                  if (appContext.isMbeMandatoryFields) {
                                    alert(appContext.mbeMandatoryAlert);
                                    e.preventDefault();
                                  } else {
                                    onReport(
                                      Settings.pricingTabs.reportTabs
                                        .accountPricing,
                                      period
                                    );
                                  }
                                }}
                              >
                                <a>
                                  {period}{" "}
                                  {
                                    Settings.pricingTabs.reportTabs
                                      .accountPricing
                                  }
                                </a>
                              </li>
                            ) : (
                              ""
                            )}

                            {appContext.user?.isHotelUser ||
                            appContext.user?.isPASAdmin ||
                            appContext.user?.isLimitedSalesUser ? (
                              <li
                                onClick={(e) => {
                                  sessionStorage.setItem("searchtype", "A");
                                  if (appContext.isMbeMandatoryFields) {
                                    alert(appContext.mbeMandatoryAlert);
                                    e.preventDefault();
                                  } else {
                                    onReport(
                                      Settings.pricingTabs.reportTabs
                                        .accountDirectory,
                                      period
                                    );
                                  }
                                }}
                              >
                                <a>
                                  {" "}
                                  {period}{" "}
                                  {
                                    Settings.pricingTabs.reportTabs
                                      .accountDirectory
                                  }{" "}
                                </a>
                              </li>
                            ) : (
                              ""
                            )}

                            {!contextType.state.gridData?.list?.hotelData
                              ?.isInternational ? (
                              <span>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onNearestAccount();
                                    }
                                  }}
                                >
                                  <a>
                                    {" "}
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .nearestAccountFacilities
                                    }
                                  </a>
                                </li>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onNearestAccountExcel();
                                    }
                                  }}
                                >
                                  <a>
                                    {" "}
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .nearestAccountFacilitiesExcel
                                    }{" "}
                                  </a>
                                </li>
                              </span>
                            ) : (
                              ""
                            )}

                            <li
                              onClick={(e) => {
                                sessionStorage.setItem("searchtype", "A");
                                if (appContext.isMbeMandatoryFields) {
                                  alert(appContext.mbeMandatoryAlert);
                                  e.preventDefault();
                                } else {
                                  onReport(
                                    Settings.pricingTabs.reportTabs
                                      .topTravelMarkets,
                                    period
                                  );
                                }
                              }}
                            >
                              <a>
                                {period}{" "}
                                {
                                  Settings.pricingTabs.reportTabs
                                    .topTravelMarkets
                                }
                              </a>
                            </li>
                            <li
                              onClick={(e) => {
                                sessionStorage.setItem("searchtype", "A");
                                if (appContext.isMbeMandatoryFields) {
                                  alert(appContext.mbeMandatoryAlert);
                                  e.preventDefault();
                                } else {
                                  onReport(
                                    Settings.pricingTabs.reportTabs.rebidReport,
                                    period
                                  );
                                }
                              }}
                            >
                              <a>
                                {Settings.pricingTabs.reportTabs.rebidReport}
                              </a>
                            </li>

                            {appContext.user?.isHotelUser ||
                            appContext.user?.isPASAdmin ? (
                              <span>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onSpecialCorporate(period);
                                    }
                                  }}
                                >
                                  <a
                                    href="javascript:void(0);"
                                    style={{ marginLeft: "-8px !important" }}
                                  >
                                    {" "}
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .SpecialCorporatePricing
                                    }
                                    <br></br>
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .SpecialCorporatePricing1
                                    }{" "}
                                  </a>
                                </li>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onReport(
                                        Settings.pricingTabs.reportTabs
                                          .SCPTDetailExtract,
                                        period
                                      );
                                    }
                                  }}
                                >
                                  <a>
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .SCPTDetailExtract
                                    }{" "}
                                  </a>
                                </li>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onReport(
                                        Settings.pricingTabs.reportTabs
                                          .SCPTSummaryExtract,
                                        period
                                      );
                                    }
                                  }}
                                >
                                  <a>
                                    {" "}
                                    {
                                      Settings.pricingTabs.reportTabs
                                        .SCPTSummaryExtract
                                    }{" "}
                                  </a>
                                </li>
                                <li
                                  onClick={(e) => {
                                    sessionStorage.setItem("searchtype", "A");
                                    if (appContext.isMbeMandatoryFields) {
                                      alert(appContext.mbeMandatoryAlert);
                                      e.preventDefault();
                                    } else {
                                      onReport(
                                        Settings.pricingTabs.reportTabs
                                          .SummaryTax,
                                        period
                                      );
                                    }
                                  }}
                                >
                                  <a>
                                    {Settings.pricingTabs.reportTabs.SummaryTax}{" "}
                                  </a>
                                </li>
                              </span>
                            ) : (
                              ""
                            )}
                          </ul>
                        </li>
                      </span>
                    ) : (
                      ""
                    )}
                    <li className={styles.sublistHeader}>
                      <a
                        href="javascript:void(0);"
                        className={styles.menuPadding}
                      >
                        {Settings.pricingTabs.tools}
                      </a>
                      <ul className={styles.sublist} style={{ width: "180px" }}>
                        <li
                          onClick={(e) => {
                            sessionStorage.setItem("searchtype", "A");
                            if (appContext.isMbeMandatoryFields) {
                              alert(appContext.mbeMandatoryAlert);
                              e.preventDefault();
                            } else {
                              onToolsResources(
                                Settings.pricingTabs.toolsTabs.BTBookingCost,
                                period
                              );
                            }
                          }}
                        >
                          <a>{Settings.pricingTabs.toolsTabs.BTBookingCost}</a>
                        </li>
                        <li
                          onClick={(e) => {
                            sessionStorage.setItem("searchtype", "A");
                            if (appContext.isMbeMandatoryFields) {
                              alert(appContext.mbeMandatoryAlert);
                              e.preventDefault();
                            } else {
                              onToolsResources(
                                Settings.pricingTabs.toolsTabs.GPPAccountList,
                                period
                              );
                            }
                          }}
                        >
                          <a>
                            {" "}
                            {Settings.pricingTabs.toolsTabs.GPPAccountList}
                          </a>
                        </li>
                        
                        <li
                          onClick={(e) => {
                            sessionStorage.setItem("searchtype", "A");
                            if (appContext.isMbeMandatoryFields) {
                              alert(appContext.mbeMandatoryAlert);
                              e.preventDefault();
                            } else {
                              onToolsResources(
                                Settings.pricingTabs.toolsTabs.HotelTraining,
                                period
                              );
                            }
                          }}
                        >
                          <a>{Settings.pricingTabs.toolsTabs.HotelTraining}</a>
                        </li>
                        <li
                          onClick={(e) => {
                            sessionStorage.setItem("searchtype", "A");
                            if (appContext.isMbeMandatoryFields) {
                              alert(appContext.mbeMandatoryAlert);
                              e.preventDefault();
                            } else {
                              onToolsResources(
                                Settings.pricingTabs.toolsTabs.HotelSelfReport,
                                period
                              );
                            }
                          }}
                        >
                          <a>
                            {" "}
                            {Settings.pricingTabs.toolsTabs.HotelSelf}
                            <br></br>{" "}
                            {Settings.pricingTabs.toolsTabs.HotelSelf1}
                          </a>
                        </li>
                        <li
                          onClick={(e) => {
                            sessionStorage.setItem("searchtype", "A");
                            if (appContext.isMbeMandatoryFields) {
                              alert(appContext.mbeMandatoryAlert);
                              e.preventDefault();
                            } else {
                              onToolsResources(
                                Settings.pricingTabs.toolsTabs.HotelCSRReport,
                                period
                              );
                            }
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.pricingTabs.toolsTabs.HotelCSR
                            } <br></br>{" "}
                            {Settings.pricingTabs.toolsTabs.HotelCSR1}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {hideInfo === true ? (
                  ""
                ) : hideAccDetails == true ? null : (
                  <div id="hotelPricingHeaderSection">
                    <div className={styles.Header}>
                      {contextType.state.gridData?.list?.hotelData
                        ?.marshaCodeAndName
                        ? contextType.state.gridData?.list?.hotelData
                            ?.marshaCodeAndName
                        : prevLocationData == "accountstatus"
                        ? JSON.parse(
                            sessionStorage.getItem("homeSelectedHotel")
                          ).name
                        : hotelName !== undefined &&
                          hotelName !== "undefined" &&
                          hotelName != null
                        ? hotelName.includes(marshaCode)
                          ? hotelName
                          : marshaCode + " - " + hotelName
                        : sessionStorage.getItem(
                            "hotelPricingMarshaCodeName"
                          )}{" "}
                      <span
                        style={{
                          marginLeft: "-3px",
                        }}
                      >
                        : BT Pricing -{" "}
                      </span>
                      <TabName url={urlName} />{" "}
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td
                            className={styles.field_Value}
                            style={{ width: "80px" }}
                          >
                            <b>
                              {Settings.header.Period}
                              {contextType.state.selectedYear
                                ? contextType.state.selectedYear
                                : period}{" "}
                            </b>
                          </td>
                          <td style={{ width: "5px" }} />
                          <td
                            className={styles.field_Value}
                            style={{ width: "300px" }}
                          >
                            <b>{Settings.header.currencyusedinQuotations} </b>
                            {sessionStorage.getItem("currency")}
                          </td>
                          <td style={{ width: "10px" }} />
                          <td>
                            {routes.length && !hideButtons ? (
                              <CSaveAndNext
                                routes={routes}
                                noBidAlert={contextType.state.nobidAlert}
                                noBidAlertMsg={Settings.noBidAlert}
                                pricingAlert={contextType.state.pricingAlert}
                                pricingAlertMsg={contextType.state.pricingMsg}
                                standardFlag={contextType.state.standardFlag}
                                standardList={contextType.state.standardList}
                                dosMsgFlag={contextType.state.dosMsgFlag}
                                dosMsgList={contextType.state.dosMsgList}
                                nextBtnClick={props.nextBtnClick}
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr className={styles.seperator}></hr>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }}
    </HotelPricingContext.Consumer>
  );
}
