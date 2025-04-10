import React, { useContext, useEffect, useRef, useState } from "react";
import NewWindow from "react-new-window";
import IdleMonitorInnerContent from "./IdleMonitorInnerContent";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
import SignOutContext, {
  ISignoutContext,
} from "../signOut/context/SignOutContext";
import Utils from "../../common/utils/Utils";
import Settings from "../home/static/settings";
import API from "../home/service/API";

let idleEvent;
let idleLogoutEvent;
let countdownInterval;
let timeout;

const IdleTimeout = (props) => {
  const signOutContext: ISignoutContext = useContext(SignOutContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  //for prod by default
  let idleTimeout = 27 * 60 * 1000; //27 * 60 * 1000;
  let idleLogout = 30 * 60; //30mins
  const initialTimeoutTime = 3; // pop up to be shown when 3 minutes are remaining

  const [timerCount, setTimerCount] = useState(initialTimeoutTime * 60); // 3minutes
  const [idleMessage, setIdleMessage] = useState("");
  let prevClickedTime = new Date();

  //for local and dev
  if (
    window.location.href.indexOf("rfptc/") > -1 ||
    window.location.href.indexOf("localhost") > -1
  ) {
    idleTimeout = 7 * 60 * 1000; //7 minutes
    idleLogout = 10 * 60; //10 minutes
  }

  //for Perf same as prod
  if (window.location.href.indexOf("rfpprftc/") > -1) {
    idleTimeout = 27 * 60 * 1000; //27 minutes
    idleLogout = 30 * 60; //30 minutes
  }

  /**
   * Add any other events listeners here
   */
  const events = ["mousedown", "click", "keydown"];

  /**
   * @method sessionTimeout
   * This function is called with each event listener to set a timeout or clear a timeout.
   */
  const sessionTimeout = (e?, type?) => {
    clearSessionTimeout();
    clearSessionInterval();
    clearTimeout(idleEvent);
    clearTimeout(idleLogoutEvent);
    if (type !== "close") {
      onUserActivity();
    }

    idleEvent = setTimeout(() => {
      onIdle();
    }, idleTimeout); //show session warning modal.

    idleLogoutEvent = setTimeout(() => {
      loggingOut();
    }, idleLogout * 1000); //Call logged out on session expire.
  };

  const onUserActivity = () => {
    if (countDownDisplay > 0) {
      //This is to check if within one min if user clicks no need to sync the session
      let timeDiff = new Date().getTime() - prevClickedTime.getTime();
      timeDiff = timeDiff / 1000;
      timeDiff = Math.floor(timeDiff / 60);
      if (timeDiff > 1) {
        //call api
        prevClickedTime = new Date();
        API.syncSession();
      }
    }
  };

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

  const onIdle = () => {
    appContext.setTimeoutModalOpen(true);
    if (!appContext.timeoutModalOpen && !appContext.renewModalOpen) {
      const delay = 1000 * 1;
      setIdleMessage(
        `${Settings.toBeSignedOut1}${initialTimeoutTime}${Settings.toBeSignedOut2}`
      );

      timeout = setTimeout(() => {
        // we are maintaining countdown in seconds, and pop should display in minutes. So need to convert secs to minutes
        let countDown = 180; // 180, 3 minutes
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            countDown = countDown - 60; // subtract one minute
            setTimerCount(countDown);
            if (countDown === 0) {
              setCountDownDisplay(0);
              setTimerCount(0);
              appContext.setAppSessionTimedOut(true);
              setIdleMessage(Settings.signedOut);
              clearSessionInterval();
            } else {
              setIdleMessage(
                `${Settings.toBeSignedOut1}${countDown / 60}${
                  Settings.toBeSignedOut2
                }`
              );
            }
          } else {
            clearSessionTimeout();
          }
        }, 1000 * 60); // refresh remaining time after every minute
      }, delay);
    }
  };

  const handleCloseLink = () => {
    if (appContext.appSessionTimedOut == true) {
      clearAndRedirectToHome();
    } else {
      appContext.setTimeoutModalOpen(false);
      appContext.setRenewModalOpen(false);
      sessionTimeout(null, "close");
      API.syncSession();
    }
  };

  /**
   * @method logOut
   * This function will destroy current user session.
   */
  const loggingOut = () => {
    setTimerCount(0);
    appContext.setAppSessionTimedOut(true);
    setIdleMessage(Settings.signedOut);
    clearSessionInterval();
    setCountDownDisplay(0);
  };

  useEffect(() => {
    for (const e in events) {
      window.addEventListener(events[e], sessionTimeout);
    }

    return () => {
      for (const e in events) {
        window.removeEventListener(events[e], sessionTimeout);
      }
    };
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      sessionTimeout();
    }
  }, [document.readyState]);

  //unload new window
  const unloadComponent = () => {
    if (appContext.appSessionTimedOut == true) {
      clearAndRedirectToHome();
    }
    appContext.setRenewModalOpen(false);
    appContext.setTimeoutModalOpen(false);
    sessionTimeout(null, "close");
    API.syncSession();
  };

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
    setCountDownDisplay(idleLogout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
    setCountDownDisplay(idleLogout);
  };

  const clearAndRedirectToHome = () => {
    //redirect to home, which will take u to sso login
    appContext.setTimeoutModalOpen(false);
    appContext.setRenewModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
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
      url.substring(0, url.indexOf("/rfp-webapp-web/")) + "/rfp-webapp-web/home"
    );

    window.location.replace(url);
  };

  const handleContinueClick = () => {
    appContext.setTimeoutModalOpen(false);
    appContext.setRenewModalOpen(true);
    clearSessionInterval();
    clearSessionTimeout();
    clearTimeout(idleEvent);
    clearTimeout(idleLogoutEvent);
    setCountDownDisplay(idleLogout);
  };

  const handleOkClick = () => {
    try {
      clearAndRedirectToHome();
    } catch (err) {
      console.error(err);
    }
  };

  const [countDownDisplay, setCountDownDisplay] = React.useState(idleLogout);
  const [runTimer, setRunTimer] = React.useState(true);
  React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDownDisplay(idleLogout);
      timerId = setInterval(() => {
        setCountDownDisplay((countDownDisplay) => countDownDisplay - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [runTimer]);

  React.useEffect(() => {
    if (countDownDisplay < 0 && runTimer) {
      setRunTimer(false);
      setCountDownDisplay(0);
    }
  }, [countDownDisplay, runTimer]);

  //const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDownDisplay % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDownDisplay / 60)).padStart(2, 0);

  return (
    <div>
      {(window.location.href.indexOf("rfptc/") > -1 ||
        window.location.href.indexOf("localhost") > -1) && (
        <div style={{ position: "absolute", left: "40%", top: "5px" }}>
          <b>
            Remaining Session Time: {minutes}:{seconds}
          </b>
        </div>
      )}
      {appContext.timeoutModalOpen || appContext.renewModalOpen ? (
        <NewWindow
          features={{ top: 0, left: 0, width: 350, height: 300 }}
          title="MarRFP [Time Out Notification]"
          onUnload={unloadComponent}
          copyStyles={true}
        >
          <IdleMonitorInnerContent
            componentType={
              appContext.timeoutModalOpen
                ? "timeoutModal"
                : appContext.renewModalOpen
                ? "renewModal"
                : ""
            }
            handleCloseLink={handleCloseLink}
            idleMessage={idleMessage}
            timeoutCountdown={timerCount}
            handleContinueClick={handleContinueClick}
            handleOkClick={handleOkClick}
          />
        </NewWindow>
      ) : null}
    </div>
  );
};

export default IdleTimeout;
