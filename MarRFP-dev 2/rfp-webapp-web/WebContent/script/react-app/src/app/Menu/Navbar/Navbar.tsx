import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.css";
import rfplogo_new from "../../../images/rfplogo_new.gif";
import gradient from "../../../images/gradient.gif";
import { MenuList } from "./MenuList";
import { useHistory } from "react-router-dom";
import CNavLink from "../../shared/components/CNavLink";
import Settings from "../../shared/static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
//import { PropertyList } from "../../pricing/hotelPropertyList/content/PropertyList";
import CModal from "../../common/components/CModal";
import { createPortal } from "react-dom";
import Utils from "../../common/utils/Utils";
import SignOutContext from "../../homepage/signOut/context/SignOutContext";

const Navbar = (user) => {
  // const MARFORMS_DEV_URL =
  //   "/marrformsdev/auth/useraccess/MarRFPReg/default.asp";

  const MARFORMS_LOGIN_URL =
  "https://ssm-marriottms.saviyntcloud.com/ECMv6/request/requestHome";
   // "https://extranet.marriott.com/marrforms/auth/useraccess/marRFPReg/Default.asp";

  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const signOutContext: ISignoutContext = useContext(SignOutContext);
  const [showAlert, setshowAlert] = useState(false);
  const [alertMsg, setalertMsg] = useState("");
  const [multipleAlertMessages, setMultipleAlertMessages] = useState(null);
  useEffect(() => {
    return () => {
      setshowAlert(false);
    };
  }, []);

  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index} className={styles.fieldName}>
        {title == "User" && <span>User: {user?.user?.fullName} | </span>}
        {title == "Update Contact Info" &&
          (user?.user?.role == "MFPADMIN" ||
            user?.user?.role == "MFPFSALE" ||
            user?.user?.role == "MFPSALES" ||
            user?.user?.role == "MFPUSER") && (
            <CNavLink to={url}>
              {title}
              <span className={styles.menu}>|</span>{" "}
            </CNavLink>
          )}
        {title == "Add/Update/Delete Properties" &&
          user?.user?.role == "MFPUSER" && (
            <a
              href="javascript:void(0);"
              onClick={() =>
                window.open(
                  `${MARFORMS_LOGIN_URL}`,
                  "MarRFP",
                  "LOCATION=no,MENUBAR=no,SCROLLBARS=no,resizable=no,status=no,toolbar=no,HEIGHT=550,WIDTH=340"
                )
              }
            >
              {title}
              <span className={styles.menu}>|</span>{" "}
            </a>
          )}
        {title != "Support" &&
          title != "Product Catalog" &&
          title != "User" &&
          title != "Update Contact Info" &&
          title != "Add/Update/Delete Properties" &&
          title != "Sign Out" &&
          title != "Home" && (
            <CNavLink to={url}>
              {title}
              <span className={styles.menu}>|</span>{" "}
            </CNavLink>
          )}
        {title == "Sign Out" && (
          <CNavLink to={url}>
            {title}
            <span className={styles.menu}></span>{" "}
          </CNavLink>
        )}
        {title == "Support" && (
          <a
            href="javascript:void(0);"
            onClick={() =>
              window.open(
                `${window.location.origin}${process.env.APPLICATION_CONTEXT}${url}`,
                "MarRFP",
                "LOCATION=no,MENUBAR=no,SCROLLBARS=no,resizable=no,status=no,toolbar=no,HEIGHT=550,WIDTH=330"
              )
            }
          >
            Support<span className={styles.menu}>|</span>
          </a>
        )}
        {title == "Product Catalog" && ( //Epic to Product Catalog
          <a
            href="javascript:void(0);"
            onClick={() =>
              window.open(
                user?.user?.epicUrl,
                "EPIC",
                "LOCATION=yes,MENUBAR=yes,SCROLLBARS=yes,resizable=yes,status=yes,toolbar=yes"
              )
            }
          >
            Product Catalog<span className={styles.menu}>|</span>
          </a>
        )}
        {title == "Home" && (
          <a href="javascript:void(0);" onClick={() => onHomeMenuClick(url)}>
            {title}
            <span className={styles.menu}>|</span>{" "}
          </a>
        )}
      </li>
    );
  });

  const validateUrlExp = new RegExp(/^.*$/);
  const validateUrl = (url) => {
    if (url != "" && url != null) {
      if (url.match(validateUrlExp)) {
        return url;
      } else {
        return "";
      }
    }
  };

  const clickRFPlogo = (e) => {
    appContext.setTimeoutModalOpen(false);
    appContext.setRenewModalOpen(false);
    if (appContext.appSessionTimedOut == true) {
      //redirect to home, which will take u to sso login
      sessionStorage.clear();
      localStorage.clear();
      Utils.clearCookie("MARFPAUTH");
      Utils.clearCookie("LOGGEDINUSER");
      Utils.clearCookie("COGNOS_LOGED_IN");
      Utils.clearCookie("CODE");
      Utils.deleteAllCookies();
      let url = window.location.href;
      signOutContext.signOut().then((data) => {
        console.log("signed out");
      });
      url = validateUrl(
        url.substring(0, url.indexOf("/rfp-webapp-web/")) +
          "/rfp-webapp-web/home"
      );

      window.location.replace(url);
    } else {
      appContext.setConfirmURL("/home");
      const standardAlert = appContext.isStandardAlertMsg
        ? JSON.parse(appContext.isStandardAlertMsg)
        : "";
      sessionStorage.setItem("ROUTENAME", "");
      if (
        appContext.isUpdateSales ||
        appContext.isUpdateLimitedSales ||
        appContext.isUpdateEmailSales
      ) {
        if (appContext.isUpdateEmailSales) {
          setalertMsg(Settings.alertMsgs.salesEmailValidationAlert);
        } else {
          setalertMsg(Settings.alertMsgs.updateSalesAlert);
        }
        e.preventDefault();
        setshowAlert(true);
      } else if (appContext.noRedirect && appContext.user.isHotelUser) {
        //appContext.setActiveTab("btAndGroupAccount");
        alert(Settings.alertMsgs.emptryAlert);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isUpdateHotelMandatoryFields
      ) {
        alert(appContext.updateHotelMandatoryAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      } else if (appContext.isStandardAlert && standardAlert.length != 0) {
        for (const msg of standardAlert) {
          alert(msg);
        }
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.isUpdateHotelUser ||
        appContext.isUpdateHotelEmailUser
      ) {
        if (appContext.isUpdateHotelEmailUser) {
          setalertMsg(Settings.alertMsgs.hotelEmailValidationAlert);
        } else {
          setalertMsg(Settings.alertMsgs.updateHotelUserAlert);
        }
        e.preventDefault();
        setshowAlert(true);
      } else if (appContext.isUpdateAccountAlert) {
        showMultipleAlerts(appContext.duplicateAccountErrorMessages);
        e.preventDefault();
      } else if (appContext.isNoBidAlert) {
        alert(Settings.alertMsgs.rebidAlert);
        e.preventDefault();
      } else if (appContext.validEmail) {
        setalertMsg(Settings.alertMsgs.emailAlertMsg);
        e.preventDefault();
      } else if (appContext.errorMessageAlert.show) {
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
        appContext.setNavbarClicked(true);
        e.preventDefault();
      } else if (appContext.preventNavigationOnce) {
        e.preventDefault();
        appContext.setPreventNavigationOnce(false);
      } else if (appContext.onetimeAlert.show) {
        e.preventDefault();
      } else if (appContext.isMbeMandatoryFields) {
        alert(appContext.mbeMandatoryAlert);
        e.preventDefault();
        appContext.SetShowSubnavbarMenus(true);
      } else if (
        appContext.oneTimeNavigationAlert.show &&
        !appContext.oneTimeNavigationAlert.navigate
      ) {
        e.preventDefault();
        if (appContext.oneTimeNavigationAlert.message !== "") {
          alert(appContext.oneTimeNavigationAlert.message);
        }
        appContext.setOneTimeNavigationAlert({
          show: false,
          message: "",
          navigate: false,
        });
      } else if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgonerponeSelected
      ) {
        alert(Settings.alertMsgs.rtrpgonerponeSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgonerptwoSelected
      ) {
        alert(Settings.alertMsgs.rtrpgonerptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgtworponeSelected
      ) {
        alert(Settings.alertMsgs.rtrpgtworponeSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgtworptwoSelected
      ) {
        alert(Settings.alertMsgs.rtrpgtworptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgthreerponeSelected
      ) {
        alert(Settings.alertMsgs.rtrpgthreerponeSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgthreerptwoSelected
      ) {
        alert(Settings.alertMsgs.rtrpgthreerptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (appContext.markAsCompleteErrorAlert.show) {
        if (appContext.markAsCompleteErrorAlert.message !== "") {
          alert(appContext.markAsCompleteErrorAlert.message);
          setshowAlert(false);
          e.preventDefault();
        }
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRtrpgonerponeSelected
      ) {
        alert(Settings.alertMsgs.rtrpgonerponeSelected);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRpgonerptwoSelected
      ) {
        alert(Settings.alertMsgs.rpgonerptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRpgtworponeSelected
      ) {
        alert(Settings.alertMsgs.rpgtworponeSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRpgtworptwoSelected
      ) {
        alert(Settings.alertMsgs.rpgtworptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRpgthreerponeSelected
      ) {
        alert(Settings.alertMsgs.rpgthreerponeSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRpgthreerptwoSelected
      ) {
        alert(Settings.alertMsgs.rpgthreerptwoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRponerpgoneMustAlsoSelected
      ) {
        alert(Settings.alertMsgs.rponerpgoneMustAlsoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRponerpgtwoMustAlsoSelected
      ) {
        alert(Settings.alertMsgs.rponerpgtwoMustAlsoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (
        appContext.user.isHotelUser &&
        appContext.isRponerpgthreeMustAlsoSelected
      ) {
        alert(Settings.alertMsgs.rponerpgthreeMustAlsoSelected);
        setshowAlert(false);
        e.preventDefault();
      } else if (appContext.isPrintAccountContainerAlert) {
        alert(appContext.printAccountContainerAlert);
        setshowAlert(false);
        e.preventDefault();
      } else {
        appContext.setRetainActiveTab(false);
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
        if (Utils.getCookie("cam_passport")) {
          history.push({
            pathname: "/home",
            state: { refreshTime: new Date().toLocaleString() },
          });
        } else {
          Utils.clearCookie("COGNOS_LOGED_IN");
          Utils.clearCookie("CODE");

          const campassporturl = sessionStorage.getItem("CAM_PASSPORT_URL");
          if (campassporturl) {
            window.location.replace(campassporturl);
          } else {
            let url = window.location.href;
            url = validateUrl(
              url.substring(0, url.indexOf("/rfp-webapp-web/")) +
                "/rfp-webapp-web/home"
            );

            window.location.replace(url);
          }
        }
      }
    }
    sessionStorage.setItem("searchtype", "A");
  };

  const onHomeMenuClick = (url) => {
    sessionStorage.setItem("searchtype", "A");
    appContext.setConfirmURL(url);
    const standardAlert = appContext.isStandardAlertMsg
      ? JSON.parse(appContext.isStandardAlertMsg)
      : "";
    sessionStorage.setItem("ROUTENAME", "");
    appContext.setRetainActiveTab(false);

    if (appContext.isNoBidAlert) {
      setalertMsg(Settings.alertMsgs.rebidAlert);
      setshowAlert(true);
    } else if (appContext.noRedirect && appContext.user.isHotelUser) {
      appContext.setActiveTab("btAndGroupAccount");
      alert(Settings.alertMsgs.emptryAlert);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isUpdateHotelMandatoryFields
    ) {
      alert(appContext.updateHotelMandatoryAlert);
      setshowAlert(false);
    } else if (
      appContext.isUpdateAdminAlert ||
      appContext.isUpdateAdminEmailAlert ||
      appContext.isUpdateAccountAlert
    ) {
      if (appContext.isUpdateAdminEmailAlert) {
        setalertMsg(Settings.alertMsgs.adminEmailValidationAlert);
        setshowAlert(true);
      } else if (appContext.isUpdateAdminAlert) {
        setalertMsg(Settings.alertMsgs.updateAdminAlert);
        setshowAlert(true);
      } else if (appContext.isUpdateAccountAlert) {
        showMultipleAlerts(appContext.duplicateAccountErrorMessages);
      }
    } else if (
      appContext.isUpdateSales ||
      appContext.isUpdateLimitedSales ||
      appContext.isUpdateEmailSales
    ) {
      if (appContext.isUpdateEmailSales) {
        setalertMsg(Settings.alertMsgs.salesEmailValidationAlert);
      } else {
        setalertMsg(Settings.alertMsgs.updateSalesAlert);
      }
      setshowAlert(true);
    } else if (
      appContext.isUpdateHotelUser ||
      appContext.isUpdateHotelEmailUser
    ) {
      if (appContext.isUpdateHotelEmailUser) {
        setalertMsg(Settings.alertMsgs.hotelEmailValidationAlert);
      } else {
        setalertMsg(Settings.alertMsgs.updateHotelUserAlert);
      }
      setshowAlert(true);
    } else if (appContext.maxLength1024ValidationAlert) {
      setalertMsg(Settings.alertMsgs.maxLength1024ValidationAlert);
    } else if (appContext.extendedStayNeedsMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.extendedStayNeedsMaxLengthAlert);
    } else if (appContext.orgStructureMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.orgStructureMaxLengthAlert);
    } else if (appContext.extendedStaySolutionsMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.extendedStaySolutionsMaxLengthAlert);
    } else if (appContext.accountPoliciesMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.accountPoliciesMaxLengthAlert);
    } else if (appContext.prefrredMarriottBrandsMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.prefrredMarriottBrandsMaxLengthAlert);
    } else if (appContext.topExtStayMaxLengthAlert) {
      setalertMsg(Settings.alertMsgs.topExtStayMaxLengthAlert);
    } else if (appContext.totRevenueRangeAlert) {
      setalertMsg(Settings.alertMsgs.totRevenueRangeAlert);
    } else if (appContext.totRmNtsAlert) {
      setalertMsg(Settings.alertMsgs.totRmNtsAlert);
    } else if (appContext.totExtRmNtsAlert) {
      setalertMsg(Settings.alertMsgs.totExtRmNtsAlert);
    } else if (appContext.adoptionRateAlert) {
      setalertMsg(Settings.alertMsgs.adoptionRateAlert);
    } else if (appContext.grpIntermediariesFullServiceAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesFullServiceAlert);
    } else if (appContext.grpIntermediariesContractingAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesContractingAlert);
    } else if (appContext.grpIntermediariesSiteSelectionAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesSiteSelectionAlert);
    } else if (appContext.grpIntermediariesHousingAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesHousingAlert);
    } else if (appContext.grpIntermediariesOnsiteAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesOnsiteAlert);
    } else if (appContext.grpIntermediariesResearchAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesResearchAlert);
    } else if (appContext.grpIntermediariesOtherAlert) {
      setalertMsg(Settings.alertMsgs.grpIntermediariesOtherAlert);
    } else if (appContext.acctPerspectiveOverViewAlert) {
      setalertMsg(Settings.alertMsgs.acctPerspectiveOverViewAlert);
    } else if (appContext.acctPerspectiveOutlookPerspectiveAlert) {
      setalertMsg(Settings.alertMsgs.acctPerspectiveOutlookPerspectiveAlert);
    } else if (appContext.acctPerspectiveDivisionsAlert) {
      setalertMsg(Settings.alertMsgs.acctPerspectiveDivisionsAlert);
    } else if (appContext.acctPerspectiveStrategyAlert) {
      setalertMsg(Settings.alertMsgs.acctPerspectiveStrategyAlert);
    } else if (appContext.acctPerspectiveVulnerabilitiesAlert) {
      setalertMsg(Settings.alertMsgs.acctPerspectiveVulnerabilitiesAlert);
    } else if (appContext.btOverviewByBrandAlert) {
      setalertMsg(Settings.alertMsgs.btOverviewByBrandAlert);
    } else if (appContext.btOverviewBuyingDecisionsLengthAlert) {
      setalertMsg(Settings.alertMsgs.btOverviewBuyingDecisionsLengthAlert);
    } else if (appContext.isStandardAlert && standardAlert.length != 0) {
      for (const msg of standardAlert) {
        alert(msg);
      }
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgonerponeSelected
    ) {
      alert(Settings.alertMsgs.rtrpgonerponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgonerptwoSelected
    ) {
      alert(Settings.alertMsgs.rtrpgonerptwoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgtworponeSelected
    ) {
      alert(Settings.alertMsgs.rtrpgtworponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgtworptwoSelected
    ) {
      alert(Settings.alertMsgs.rtrpgtworptwoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgthreerponeSelected
    ) {
      alert(Settings.alertMsgs.rtrpgthreerponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRtrpgthreerptwoSelected
    ) {
      alert(Settings.alertMsgs.rtrpgthreerptwoSelected);
      setshowAlert(false);
    } else if (appContext.errorMessageAlert.show) {
      if (appContext.errorMessageAlert.show) {
        setshowAlert(false);
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
        appContext.setNavbarClicked(true);
      }
    } else if (appContext.preventNavigationOnce) {
      setshowAlert(false);
      appContext.setPreventNavigationOnce(false);
    } else if (appContext.onetimeAlert.show) {
      setshowAlert(false);
    } else if (appContext.isMbeMandatoryFields) {
      setalertMsg(appContext.mbeMandatoryAlert);
      appContext.SetShowSubnavbarMenus(true);
    } else if (
      appContext.oneTimeNavigationAlert.show &&
      !appContext.oneTimeNavigationAlert.navigate
    ) {
      setshowAlert(false);
      if (appContext.oneTimeNavigationAlert.message !== "") {
        alert(appContext.oneTimeNavigationAlert.message);
      }
      appContext.setOneTimeNavigationAlert({
        show: false,
        message: "",
        navigate: false,
      });
    } else if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgonerponeSelected
    ) {
      alert(Settings.alertMsgs.rpgonerponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgonerptwoSelected
    ) {
      alert(Settings.alertMsgs.rpgonerptwoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgtworponeSelected
    ) {
      alert(Settings.alertMsgs.rpgtworponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgtworptwoSelected
    ) {
      alert(Settings.alertMsgs.rpgtworptwoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgthreerponeSelected
    ) {
      alert(Settings.alertMsgs.rpgthreerponeSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRpgthreerptwoSelected
    ) {
      alert(Settings.alertMsgs.rpgthreerptwoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgoneMustAlsoSelected
    ) {
      alert(Settings.alertMsgs.rponerpgoneMustAlsoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgtwoMustAlsoSelected
    ) {
      alert(Settings.alertMsgs.rponerpgtwoMustAlsoSelected);
      setshowAlert(false);
    } else if (
      appContext.user.isHotelUser &&
      appContext.isRponerpgthreeMustAlsoSelected
    ) {
      alert(Settings.alertMsgs.rponerpgthreeMustAlsoSelected);
      setshowAlert(false);
    } else if (appContext.markAsCompleteErrorAlert.show) {
      if (appContext.markAsCompleteErrorAlert.message !== "") {
        alert(appContext.markAsCompleteErrorAlert.message);
        setshowAlert(false);
      }
    } else if (appContext.isPrintAccountContainerAlert) {
      alert(appContext.printAccountContainerAlert);
      setshowAlert(false);
    } else {
      setshowAlert(false);
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

      history.push({
        pathname: url,
      });
    }
  };
  const closeAlert = () => {
    setshowAlert(false);
  };

  const showMultipleAlerts = (alertsArray) => {
    setMultipleAlertMessages(alertsArray);
  };

  const showMultipleUpdateInfoAlerts = (alertsArray) => {
    setMultipleAlertMessages(alertsArray);
  };

  const isAdminOrLimitedSalesOrSalesUser = () => {
    return (
      appContext?.user?.isAdminRole ||
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isSalesUser
    );
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

  const Popup = () => {
    return createPortal(
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
      </CModal>,
      document.body
    );
  };

  return (
    <nav className={user.showSubNav ? styles.navpadding : ""}>
      {multipleAlertMessages?.map((message, index) => (
        <MultipleCModel
          key={index + message}
          showModal={true}
          alertModalMsg={message}
          index={index}
        />
      ))}
      <Popup />
      <div className={user.showSubNav ? styles.logo : styles.hiddenLabel}>
        <a href="javascript:void(0);">
          <img src={rfplogo_new} alt="" onClick={(e) => clickRFPlogo(e)} />
        </a>
      </div>
      {user.showSubNav && (
        <div className={styles.menuitem} id="menuItemID">
          <ul className={`${styles.menulist} ${"topmainheader"}`}>
            <li>{menuList}</li>
          </ul>
          <div className={styles.rowClass}>
            <div>
              <img src={gradient} alt="" className={styles.menu_one} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
