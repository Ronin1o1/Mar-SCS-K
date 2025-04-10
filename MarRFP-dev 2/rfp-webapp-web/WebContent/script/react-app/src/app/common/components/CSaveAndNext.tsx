import React, { useContext, useState } from "react";
import btnPrevious from "../assets/img/button/btnPrevious.gif";
import btnNext from "../assets/img/button/btnNext.gif";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./CSaveAndNext.css";
import CModal from "./CModal";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
import GroupsIntermediariesContext from "../../pricing/salesAdministration/content/GroupsIntermediaries/context/GroupsIntermediariesContext";
import Settings from "../static/Settings";
import LeisureContext from "../../pricing/salesAdministration/content/leisure/context/leisureContext";
import GroupsOverviewContext from "../../pricing/salesAdministration/content/GroupsOverview/context/GroupsOverviewContext";
import PricingStandardsContext from "../../pricing/hotelPricing/content/Standards/context/PricingStandardsContext";

export function CSaveAndNext(props: any) {
  const [traverData, setTraverData] = useState({} as any);
  const [alertFlagdata, setAlertflagdata] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const groupIntermediariesContext = useContext(GroupsIntermediariesContext);
  const groupOverviewContext = useContext(GroupsOverviewContext);
  const leisureContext = useContext(LeisureContext);
  const standardContext = useContext(PricingStandardsContext);
  const findCurrentPageAndPreviousAndNextItems = (arr, path) =>
    arr.reduce((a, item, index) => {
      if (a) return a;
      if (item.children)
        return findCurrentPageAndPreviousAndNextItems(item.children, path);
      if (path.indexOf(item.path) > -1) {
        return {
          previous: index >= 0 ? arr[index - 1] : null,
          current: item,
          next: index >= 0 ? arr[index + 1] : null,
        };
      }
    }, null);

  React.useEffect(() => {
    const data = findCurrentPageAndPreviousAndNextItems(
      props.routes,
      location.pathname?.substring(1)
    );

    setTraverData(data);
  }, [props.routes]);

  const handleNextClick = () => {
    const standardAlert = appContext.isStandardAlertMsg
      ? JSON.parse(appContext.isStandardAlertMsg)
      : "";
    console.log(appContext.isPricingEmailValidAlert, "Emailll");
    console.log(appContext.isCommonValidAlert, "Common");
    console.log(appContext.isAllFieldValue, "All");
    console.log(appContext.isSecondayEmailValid, "22222");
    console.log(appContext.isPricingContactIndex, "priceindexx");

    if (traverData?.current?.path === "CPAC" && appContext.isNoBidAlert) {
      alert(props?.noBidAlertMsg);
    } else if (
      traverData?.current?.path === "PriceContact" &&
      appContext.errorMessageAlert.show
    ) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.isStandardAlert &&
      standardAlert.length != 0
    ) {
      for (const msg of standardAlert) {
        alert(msg);
      }
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.errorMessageAlert.show
    ) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.user.isHotelUser &&
      appContext.isSamePoolSelected
    ) {
      alert("You cannot have the same room pool across room pool groups ");
    } else if (
      traverData?.current?.path === "accBtProfileList" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "accBTOverview" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "groupProfile" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (traverData?.current?.path === "catering" && props.profilealert) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "extendedStay" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "accountPerspective" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (traverData?.current?.path === "DepthOfSale") {
      if (props.nextBtnClick()) {
        navigateToNextPage();
      } else if (appContext.errorMessageAlert.show) {
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
      } else if (props.dosMsgFlag) {
        alert(props?.dosMsgList);
      }
    } else if (traverData?.current?.path === "Blackout" && props.dosMsgFlag) {
      alert(props?.dosMsgList);
    } else if (
      traverData?.current?.path === "eligibilityAmenity" &&
      props.dosMsgFlag
    ) {
      alert(props?.dosMsgList);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.marriottTeamMember &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.buyingOfficeLocation
    ) {
      if (traverData?.next) {
        navigateToNextPage();
      }
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.groupsIntermediaries
    ) {
      if (
        traverData?.current?.path ===
          Settings.cSaveAndNext.groupsIntermediaries &&
        traverData?.next
      ) {
        if (groupIntermediariesContext.validation("update")) {
          navigateToNextPage();
        }
      }
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.leisure &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.groupsOverview &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.acctOverview
    ) {
      if (props.nextBtnClick()) {
        navigateToNextPage();
      }
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.fixedSeason
    ) {
      history.push({
        pathname: traverData?.next?.path,
        search: traverData?.next?.queryString,
        state: Settings.cSaveAndNext.fixedSeason,
      });
    } else if (
      traverData?.current?.path === "GroupsMeetings" &&
      appContext.errorMessageAlert.show
    ) {
      alert(appContext.errorMessageAlert.message);
    } else {
      if (traverData?.next) {
        navigateToNextPage();
      }
    }
  };

  const navigateToNextPage = () => {
    if (
      sessionStorage.getItem("isGroupsAndMeetingFlag") === "false" &&
      traverData?.current?.path === "eligibilityAmenity"
    ) {
      history.push({
        pathname: "CPAC",
        search: traverData?.next?.queryString,
        prevPath: traverData?.current?.path,
      });
    } else {
      history.push({
        pathname: traverData?.next?.path,
        search: traverData?.next?.queryString,
        prevPath: traverData?.current?.path,
      });
    }
  };

  const handlePrevsClick = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const nobidalert = params.get("nobidalert");
    const standardAlert = appContext.isStandardAlertMsg
      ? JSON.parse(appContext.isStandardAlertMsg)
      : "";
    if (traverData?.current?.path === "CPAC" && appContext.isNoBidAlert) {
      alert(props?.noBidAlertMsg);
    } else if (
      traverData?.current?.path === "accBtProfileList" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "accBTOverview" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.isStandardAlert &&
      standardAlert.length != 0
    ) {
      for (const msg of standardAlert) {
        alert(msg);
      }
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.errorMessageAlert.show
    ) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    } else if (
      traverData?.current?.path === "Standards" &&
      appContext.user.isHotelUser &&
      appContext.isSamePoolSelected
    ) {
      alert("You cannot have the same room pool across room pool groups ");
    } else if (
      traverData?.current?.path === "groupProfile" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (traverData?.current?.path === "catering" && props.profilealert) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "extendedStay" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "accountPerspective" &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (traverData?.current?.path === "DepthOfSale") {
      if (props.nextBtnClick()) {
        navigateToPrevPage();
      } else if (appContext.errorMessageAlert.show) {
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
      } else if (props.dosMsgFlag) {
        alert(props?.dosMsgList);
      }
    } else if (traverData?.current?.path === "Blackout" && props.dosMsgFlag) {
      if (props?.dosMsgList !== undefined) {
        alert(props?.dosMsgList);
      }
    } else if (
      traverData?.current?.path === "eligibilityAmenity" &&
      props.dosMsgFlag
    ) {
      alert(props?.dosMsgList);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.marriottTeamMember &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.buyingOfficeLocation
    ) {
      navigateToPrevPage();
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.groupsIntermediaries
    ) {
      if (
        traverData?.current?.path ===
          Settings.cSaveAndNext.groupsIntermediaries &&
        traverData?.previous
      ) {
        if (groupIntermediariesContext.validation("update")) {
          navigateToPrevPage();
        }
      }
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.leisure &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === Settings.cSaveAndNext.groupsOverview &&
      props.profilealert
    ) {
      setAlertflagdata(props.profilealert);
    } else if (
      traverData?.current?.path === "GroupsMeetings" &&
      appContext.errorMessageAlert.show
    ) {
      alert(appContext.errorMessageAlert.message);
    } else {
      if (traverData?.previous) {
        if (traverData?.previous) {
          navigateToPrevPage();
        }
      }
    }
  };

  const navigateToPrevPage = () => {
    if (
      sessionStorage.getItem("isGroupsAndMeetingFlag") === "false" &&
      traverData?.current?.path === "CPAC"
    ) {
      history.push({
        pathname: "eligibilityAmenity",
        search: traverData?.next?.queryString,
        prevPath: traverData?.current?.path,
      });
    } else {
      history.push({
        pathname: traverData?.previous?.path,
        search: traverData?.previous?.queryString,
        prevPath: traverData?.current?.path,
      });
    }
  };

  const setModalClose = () => {
    setAlertflagdata(false);
  };

  return (
    <>
      <React.Fragment>
        <CModal
          title="Alert Message"
          onClose={setModalClose}
          show={alertFlagdata}
          xPosition={-100}
          yPosition={-120}
          closeImgTitle={"OK - Close Message Box"}
          class="customModal"
          overlayHeight={Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          )}
          overlayTopPosition={"-79px"}
        >
          <div className={styles.modalView}>{props?.profileAlertmsg}</div>
        </CModal>

        {traverData?.previous && (
          <img
            className={
              traverData?.current?.path === "accountInitiatives"
                ? styles.pl30
                : styles.prevBtn
            }
            onClick={handlePrevsClick}
            src={btnPrevious}
          ></img>
        )}
        {traverData?.next && (
          <img
            className={styles.nextBtn}
            onClick={handleNextClick}
            src={btnNext}
          ></img>
        )}
      </React.Fragment>
    </>
  );
}
