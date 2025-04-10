import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
import CModal from "../../common/components/CModal";
import Settings from "../static/Settings";

const CNavLink = (props): JSX.Element => {
  const { to, children, ...rest } = props;
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [showAlert, setshowAlert] = useState(false);
  const [alertMsg, setalertMsg] = useState("");
  const [multipleAlertMessages, setMultipleAlertMessages] = useState(null);

  useEffect(() => {
    return () => {
      setshowAlert(false);
    };
  }, []);

  const checkRedirect = (e) => {
    const res = confirm(Settings.SyncConfirmMessage.toString());
    res
      ? history.location.pathname === to
        ? e.preventDefault()
        : appContext.setIsInProgress(false)
      : e.preventDefault();
  };

  const MultipleCModel = ({ index, showModal, alertModalMsg }) => {
    const [show, setShow] = useState(showModal);
    return createPortal(
      <>
        <CModal
          title={"Alert Message"}
          onClose={() => {
            setShow(false);
            if (index == 0) {
              setMultipleAlertMessages(null);
            }
          }}
          show={show}
          closeImgTitle={"Close"}
          overlayHeight="calc(100vh + 85px)"
          overlayTopPosition="-85px"
          overlayWidth="100% !important"
          opacity={index}
          class={"transformToCenture"}
        >
          <div style={{ margin: "10px" }}>{alertModalMsg}</div>
        </CModal>
        <style>{`
          .transformToCenture {
            transform: translate(-50%,-0%) !important;
          }
        `}</style>
      </>,
      document.body
    );
  };

  const checkNavigate = (e) => {
    sessionStorage.setItem("searchtype", "A");
    appContext.setConfirmURL(to);
    if (to === "/accountstatus") {
      localStorage.removeItem("Period");
      localStorage.removeItem("accountpricingtype");
      localStorage.removeItem("accountstatus");
      localStorage.removeItem("accountsegment");
      localStorage.removeItem("orderby");
      localStorage.removeItem("showPortfolio");
      localStorage.removeItem("showPortfolioType");
      localStorage.removeItem("pasManager");
      localStorage.removeItem("accountStatusList");
      localStorage.removeItem("totalPages");
      localStorage.removeItem("startsWith");
      localStorage.removeItem("setLocalStorage");
    }
    if (to === "/hotelusers") {
      sessionStorage.removeItem("refreshObjHotelUsers");
      sessionStorage.removeItem("hotelUsersPageNo");
    }
    if (to === "/salesusers") {
      sessionStorage.removeItem("refreshObjSalesUsers");
      sessionStorage.removeItem("salesUsersPageNo");
    }
    if (to === "/limitedsalesusers") {
      sessionStorage.removeItem("refreshObjlimitedsalesUsers");
      sessionStorage.removeItem("limitedsalesUsersPageNo");
    }
    const standardAlert = appContext.isStandardAlertMsg
      ? JSON.parse(appContext.isStandardAlertMsg)
      : "";
    appContext.SetShowSubnavbarMenus(false);
    if (appContext.isInProgress) {
      checkRedirect(e);
    } else if (appContext.isNoBidAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rebidAlert);
        e.preventDefault();
      }
    } else if (appContext.noRedirect && appContext.user.isHotelUser) {
      if (
        to != "/updatecontactinfo" ||
        to != "/epic" ||
        to != "/support" ||
        to != "/signOut"
      ) {
        appContext.setActiveTab("btAndGroupAccount");
        alert(Settings.alertMsgs.emptryAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isUpdateHotelMandatoryFields
    ) {
      if (
        to != "/updatecontactinfo" ||
        to != "/epic" ||
        to != "/support" ||
        to != "/signOut"
      ) {
        alert(appContext.updateHotelMandatoryAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.isUpdateAdminAlert ||
      appContext.isUpdateAdminEmailAlert ||
      appContext.isUpdateAccountAlert
    ) {
      if (
        to != "/updatecontactinfo" ||
        to != "/epic" ||
        to != "/support" ||
        to != "/signOut"
      ) {
        if (appContext.isUpdateAdminEmailAlert) {
          setalertMsg(Settings.alertMsgs.adminEmailValidationAlert);
          setshowAlert(true);
        } else if (appContext.isUpdateAccountAlert) {
          showMultipleAlerts(appContext.duplicateAccountErrorMessages);
        } else {
          setalertMsg(Settings.alertMsgs.updateAdminAlert);
          setshowAlert(true);
        }
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.isUpdateSales ||
      appContext.isUpdateLimitedSales ||
      appContext.isUpdateEmailSales
    ) {
      if (
        to != "/updatecontactinfo" ||
        to != "/epic" ||
        to != "/support" ||
        to != "/signOut"
      ) {
        if (appContext.isUpdateEmailSales) {
          setalertMsg(Settings.alertMsgs.salesEmailValidationAlert);
        } else {
          setalertMsg(Settings.alertMsgs.updateSalesAlert);
        }
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
        setshowAlert(true);
      }
    } else if (
      appContext.isUpdateHotelUser ||
      appContext.isUpdateHotelEmailUser
    ) {
      if (
        to != "/updatecontactinfo" ||
        to != "/epic" ||
        to != "/support" ||
        to != "/signOut"
      ) {
        if (appContext.isUpdateHotelEmailUser) {
          setalertMsg(Settings.alertMsgs.hotelEmailValidationAlert);
        } else {
          setalertMsg(Settings.alertMsgs.updateHotelUserAlert);
        }
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
        setshowAlert(true);
      }
    } else if (appContext.isProductValidated) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.emptyProdNameAlert);
        e.preventDefault();
      }
    } else if (appContext.maxLength1024ValidationAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.maxLength1024ValidationAlert);
        e.preventDefault();
      }
    } else if (appContext.extendedStayNeedsMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.extendedStayNeedsMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.orgStructureMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.orgStructureMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.extendedStaySolutionsMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.extendedStaySolutionsMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.accountPoliciesMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.accountPoliciesMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.prefrredMarriottBrandsMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.prefrredMarriottBrandsMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.topExtStayMaxLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.topExtStayMaxLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.totRevenueRangeAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.totRevenueRangeAlert);
        e.preventDefault();
      }
    } else if (appContext.totRmNtsAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.totRmNtsAlert);
        e.preventDefault();
      }
    } else if (appContext.totExtRmNtsAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.totExtRmNtsAlert);
        e.preventDefault();
      }
    } else if (appContext.adoptionRateAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.adoptionRateAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesFullServiceAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesFullServiceAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesContractingAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesContractingAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesSiteSelectionAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesSiteSelectionAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesHousingAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesHousingAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesOnsiteAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesOnsiteAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesResearchAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesResearchAlert);
        e.preventDefault();
      }
    } else if (appContext.grpIntermediariesOtherAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.grpIntermediariesOtherAlert);
        e.preventDefault();
      }
    } else if (appContext.acctPerspectiveOverViewAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.acctPerspectiveOverViewAlert);
        e.preventDefault();
      }
    } else if (appContext.acctPerspectiveOutlookPerspectiveAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.acctPerspectiveOutlookPerspectiveAlert);
        e.preventDefault();
      }
    } else if (appContext.acctPerspectiveDivisionsAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.acctPerspectiveDivisionsAlert);
        e.preventDefault();
      }
    } else if (appContext.acctPerspectiveStrategyAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.acctPerspectiveStrategyAlert);
        e.preventDefault();
      }
    } else if (appContext.acctPerspectiveVulnerabilitiesAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.acctPerspectiveVulnerabilitiesAlert);
        e.preventDefault();
      }
    } else if (appContext.btOverviewByBrandAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.btOverviewByBrandAlert);
        e.preventDefault();
      }
    } else if (appContext.btOverviewBuyingDecisionsLengthAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.btOverviewBuyingDecisionsLengthAlert);
        e.preventDefault();
      }
    } else if (appContext.validEmail) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.emailAlertMsg);
        e.preventDefault();
      }
    } else if (appContext.isStandardAlert && standardAlert.length != 0) {
      for (const msg of standardAlert) {
        alert(msg);
      }
      e.preventDefault();
      appContext.SetShowSubnavbarMenus(true);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgonerponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgonerponeSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgonerptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgonerptwoSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgtworponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgtworponeSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgtworptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgtworptwoSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgthreerponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgthreerponeSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgthreerptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rtrpgthreerptwoSelected);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgonerponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgonerponeSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgonerptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgonerptwoSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgtworponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgtworponeSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgtworptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgtworptwoSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgthreerponeSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgthreerponeSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgthreerptwoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rpgthreerptwoSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgoneMustAlsoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rponerpgoneMustAlsoSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgtwoMustAlsoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rponerpgtwoMustAlsoSelected);
        e.preventDefault();
      }
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgthreeMustAlsoSelected
    ) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(Settings.alertMsgs.rponerpgthreeMustAlsoSelected);
        e.preventDefault();
      }
    } else if (appContext.errorMessageAlert.show) {
      if (to != "/epic" && to != "/support") {
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
        e.preventDefault();
        appContext.setNavbarClicked(true);
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (appContext.preventNavigationOnce) {
      e.preventDefault();
      appContext.SetShowSubnavbarMenus(true);
      appContext.setPreventNavigationOnce(false);
    } else if (appContext.onetimeAlert.show) {
      e.preventDefault();
      appContext.SetShowSubnavbarMenus(true);
    } else if (appContext.isMbeMandatoryFields) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(appContext.mbeMandatoryAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (
      appContext.oneTimeNavigationAlert.show &&
      !appContext.oneTimeNavigationAlert.navigate
    ) {
      e.preventDefault();
      if (appContext.oneTimeNavigationAlert.message !== "") {
        alert(appContext.oneTimeNavigationAlert.message);
      }
      appContext.SetShowSubnavbarMenus(true);
      appContext.setOneTimeNavigationAlert({
        show: false,
        message: "",
        navigate: false,
      });
    } else if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
      appContext.SetShowSubnavbarMenus(true);
      e.preventDefault();
    } else if (appContext.markAsCompleteErrorAlert.show) {
      if (appContext.markAsCompleteErrorAlert.message !== "") {
        alert(appContext.markAsCompleteErrorAlert.message);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else if (appContext.isPrintAccountContainerAlert) {
      if (to != "/epic" || to != "/support" || to != "/signOut") {
        alert(appContext.printAccountContainerAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      }
    } else {
      if (appContext.navigateWithAlert !== "") {
        alert(appContext.navigateWithAlert);
        appContext.setNavigateWithAlert("");
      } else if (
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
      if (to === "/pgoospropagation") {
        appContext.setPgoosPropRefresh(true);
      }
      sessionStorage.removeItem("hotelRefreshData");
      history.push(to);
      setTimeout(() => {
        appContext.SetShowSubnavbarMenus(true);
      }, 1000);
    }
  };

  const isAdminOrLimitedSalesOrSalesUser = () => {
    return (
      appContext?.user?.isAdminRole ||
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isSalesUser
    );
  };

  const showMultipleAlerts = (alertsArray) => {
    setMultipleAlertMessages(alertsArray);
  };

  const closeAlert = () => {
    setshowAlert(false);
  };

  const Popup = () => {
    return createPortal(
      <>
        <CModal
          key={alertMsg}
          title={"Alert Message"}
          onClose={closeAlert}
          show={showAlert}
          xPosition={-100}
          yPosition={-45}
          closeImgTitle={"Close"}
          overlayWidth="100% !important"
        >
          <div style={{ margin: "10px" }}>{alertMsg}</div>
        </CModal>
        {showAlert && <div className="dropdown_over_lay"></div>}
      </>,
      document.body
    );
  };
  return (
    <>
      {multipleAlertMessages?.map((message, index) => (
        <MultipleCModel
          key={index + message}
          showModal={true}
          alertModalMsg={message}
          index={index}
        />
      ))}
      <Popup />
      <NavLink
        {...rest}
        to={to}
        onClick={(e) => {
          checkNavigate(e);
        }}
      >
        {children}
      </NavLink>
      <style>{`
          .dropdown_over_lay{
            height: 500px;
            width: 700px;
            position: absolute;
            top: 0;
            z-index: 10000
          }
        `}</style>
    </>
  );
};
export default CNavLink;
