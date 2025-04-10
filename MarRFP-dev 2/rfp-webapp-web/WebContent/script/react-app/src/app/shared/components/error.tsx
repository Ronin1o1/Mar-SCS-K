import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import rfplogo_new from "../../../images/rfplogo_new.gif";
import Settings from "../static/Settings";
import styles from "./error.css";

const Error = (): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("popstate", onBackButtonEvent);
  });

  const onBackButtonEvent = (e) => {
    history.go();
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

  const clickRFPlogo = () => {
    let strDest = window.location.href;
    strDest = validateUrl(
      strDest.substring(0, strDest.indexOf("/rfp-webapp-web/")) +
        "/rfp-webapp-web/"
    );
    const strURLArray = [];
    if (strDest != null || strDest.length != 0) {
      strURLArray.push(strDest);
      const strFinalURL = strURLArray[0];
      window.location.replace(strFinalURL);
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <a>
          <img
            src={rfplogo_new}
            alt={Settings.logoTitle}
            onClick={clickRFPlogo}
          />
        </a>
      </div>
      <div className={styles.fieldName}>{Settings.errorMessage}</div>
    </>
  );
};

export default Error;
