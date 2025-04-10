import React, { useContext, useState, useEffect, Suspense } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
//import Footer from "./Footer/Footer";

import ROUTENOTFOUND from "./app/common/components/routenotfound/routenotfound";
import { Home } from "./app/homepage/home/content/Home";
import Navbar from "./app/Menu/Navbar/Navbar";
import SubNavbar from "./app/Menu/SubMenu/SubNavbar";
import { HomeContextProvider } from "./app/homepage/home/context/HomeContext";
import masterRoutes from "./app/masterroutes";
//import UpdateContactInfo from "./app/homepage/UpdateContactInfo/Admin/content/UpdateContactInfo";
//import SalesUpdateContactInfo from "./app/homepage/UpdateContactInfo/Others/content/SalesUpdateContactInfo";
import ApplicationContext, {
  IApplicationContext,
} from "./app/common/components/ApplicationContext";
import { ProvideAuth } from "./app/common/components/use-auth";
//import TermsAndConditions from "./app/homepage/TermsandConditions/content/TermsAndConditions";
//import Error from "./app/shared/components/error";
import "./index.css";
import CognosPreload from "./app/common/components/CognosPreload";
import screenloader from "../src/app/common/assets/img/screenloader.gif";
//import CModal from "./app/common/components/CModal";
import Utils from "./app/common/utils/Utils";
//import IdleTimeout from "./app/homepage/IdleMonitor/IdleTimeout";

const IdleTimeout = React.lazy(
  () => import("./app/homepage/IdleMonitor/IdleTimeout")
);

const Error = React.lazy(() => import("./app/shared/components/error"));
const CModal = React.lazy(() => import("./app/common/components/CModal"));
const TermsAndConditions = React.lazy(
  () => import("./app/homepage/TermsandConditions/content/TermsAndConditions")
);
const UpdateContactInfo = React.lazy(
  () =>
    import("./app/homepage/UpdateContactInfo/Admin/content/UpdateContactInfo")
);
const SalesUpdateContactInfo = React.lazy(
  () =>
    import(
      "./app/homepage/UpdateContactInfo/Others/content/SalesUpdateContactInfo"
    )
);
const Footer = React.lazy(() => import("./Footer/Footer"));

const Main = (): JSX.Element => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [agreedtoTerms, setAgreedtoTerms] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showSubNav, setShowSubNav] = useState(true);

  const [showAlert, setshowAlert] = useState(false);
  const [alertMsg, setalertMsg] = useState("");

  useEffect(() => {
    return () => {
      setshowAlert(false);
    };
  }, []);

  useEffect(() => {
    if (appContext.errorMessageAlert.show) {
      if (appContext.errorMessageAlert.type == "browserAlert") {
        if (appContext.errorMessageAlert.isMultipleAlert == true) {
          appContext.errorMessageAlert.multipleAlertList.forEach((msg) => {
            alert(msg);
          });
        } else {
          alert(appContext.errorMessageAlert.message);
        }
      } else if (appContext.errorMessageAlert.type == "confirmAlert") {
        if (confirm(appContext.errorMessageAlert.message)) {
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "confirmAlert",
          });
          setshowAlert(false);
          appContext.setDisplayNavigationAlert(true);
          appContext.navigatetoURL(appContext.confirmURL);
        }
      } else {
        setshowAlert(true);
        setalertMsg(appContext.errorMessageAlert.message);
      }
    } else {
      setshowAlert(false);
    }
  }, [appContext.displayNavigationAlert]);

  useEffect(() => {
    if (appContext.user) {
      setUserDetails(appContext.user);
      setAuthenticated(true);
      setAgreedtoTerms(appContext.user.agreedtoTerms);
    }
    const url = window.location.href.split("/");
    const urlIndex = url.length - 1;
    const endPoint = url[urlIndex];
    if (endPoint === "propertylist" || endPoint.includes("hotelPricingTools")) {
      setShowSubNav(false);
    }
  }, [appContext.user]);

  const routeComponents = () => {
    return masterRoutes.map(({ path, component }, key) => {
      if (authenticated) {
        if (path == "/updatecontactinfo") {
          if (userDetails.role == "MFPADMIN") {
            return (
              <Route path={path} component={UpdateContactInfo} key={key} />
            );
          }

          if (
            userDetails.role == "MFPFSALE" ||
            userDetails.role == "MFPSALES" ||
            userDetails.role == "MFPUSER"
          )
            return (
              <Route path={path} key={key} component={SalesUpdateContactInfo} />
            );
        }
        return <Route path={path} component={component} key={key} />;
      }
    });
  };

  const closeAlert = () => {
    setshowAlert(false);
    appContext.setNavbarClicked(false);
  };

  const url = window.location.href;
  const isLocal = url
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);

  const showLoader = isLocal.length
    ? true
    : appContext.haveCode || Utils.getCookie("CODE");

  return (
    <div className={"container"}>
      <ProvideAuth user={userDetails}>
        <BrowserRouter basename={process.env.APPLICATION_CONTEXT}>
          <Suspense fallback={<img src={screenloader} />}>
            <IdleTimeout />
            {isError ? (
              <Error />
            ) : agreedtoTerms === true ? (
              <div>
                {!showLoader && (
                  <div>
                    <div
                      style={{
                        top: "47%",
                        position: "absolute",
                        left: "47%",
                        zIndex: "999",
                      }}
                    >
                      <img src={screenloader} />
                    </div>
                    <div className={"customLoader"}></div>
                    <style>{`.customLoader {
                        height: 100vh;
                        width: 100vw;
                        position: absolute;
                        background: #ffff;
                        z-index: 100;
                      }`}</style>
                  </div>
                )}
                <CModal
                  title="Alert Message"
                  onClose={closeAlert}
                  show={showAlert}
                  xPosition={-100}
                  yPosition={120}
                  closeImgTitle={"OK - Close Message Box"}
                  componentName={"MainNav"}
                  class="customModal"
                  overlayHeight={Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                  )}
                >
                  <div
                    style={{
                      minWidth: "130px",
                      padding: "9px 12px",
                    }}
                  >
                    {alertMsg}
                  </div>
                </CModal>
                <div className={"page_header_navbar"}>
                  <Navbar user={userDetails} showSubNav={showSubNav} />
                  {showSubNav && <SubNavbar userDetails={userDetails} />}
                </div>
                <div className={"page_body_container"}>
                  <HomeContextProvider>
                    <Switch>
                      <Route exact path="/">
                        <Redirect to={"/home"} />
                      </Route>
                      <Route exact path="/index">
                        <Redirect to={"/home"} />
                      </Route>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/error" component={Error}>
                        {setIsError}
                      </Route>
                      {authenticated} && {routeComponents()}
                      <Route component={ROUTENOTFOUND} />
                    </Switch>
                  </HomeContextProvider>
                </div>
                <div className={"page_footer"}>
                  <Footer DataValue={showSubNav} />
                </div>
                <style>{`
            .page_body_container{
              width: 100%;
              min-height: calc(100vh - 89px);
              height: auto;
              position: relative;
              display: block;
            }
            .page_footer > div{
                position: relative;
                display: block;
                width:100%;
                height:10px;
            }
            
          `}</style>
              </div>
            ) : agreedtoTerms === false ? (
              <TermsAndConditions />
            ) : (
              <div
                style={{
                  top: "47%",
                  position: "absolute",
                  left: "47%",
                }}
              >
                <img src={screenloader} />
              </div>
            )}
            <CognosPreload></CognosPreload>
          </Suspense>
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
};

export default Main;
