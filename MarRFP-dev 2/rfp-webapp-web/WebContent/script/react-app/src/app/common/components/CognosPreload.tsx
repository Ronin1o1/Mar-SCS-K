import React, { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import API from "../../homepage/home/service/API";
import Utils from "../utils/Utils";
import ApplicationContext, { IApplicationContext } from "./ApplicationContext";
import CIFrame from "./CIFrame";
import styles from "./CognosPreload.css";

const CognosPreload = () => {
  const [, setCookie] = useCookies(["CODE", "COGNOS_LOGED_IN"]);
  const [srcUrl, setSetUrl] = useState("");
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const isLocal = window.location.href
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);

  const getCognosURL = () => {
    let url = "";

    // if (checkForParameter("code")) {
    if (Utils.getCookie("CODE") && !Utils.getCookie("COGNOS_LOGED_IN")) {
      const hostname = window.location.hostname;

      if (hostname.includes("extranetdev")) {
        //It is extranetdev
        url =
          "https://extranetdev.marriott.com/CognosMarRFP/Login?cognosCode=";
      } else if (hostname.includes("extranetcloudtest")) {
        //"It is extranetcloudtest"
        url =
          "https://extranetdev.marriott.com/CognosMarRFP/Login?cognosCode=";
      } else {
        url =
          "https://extranetcloud.marriott.com/CognosMarRFP/Login?cognosCode=";
      }
      // const codeValue = getParamValue("code");
      const codeValue = Utils.getCookie("CODE");

      url += codeValue;
    }

    return url;
  };

  const checkForParameter = (paramName) => {
    const url = window.location.search;

    if (url.indexOf(paramName) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const getParamValue = (paramName) => {
    const url = window.location.search.substring(1); //get rid of "?" in querystring

    const qArray = url.split("&"); //get key-value pairs
    for (let i = 0; i < qArray.length; i++) {
      const pArr = qArray[i].split("="); //split key and value
      if (pArr[0] == paramName) return pArr[1]; //return value
    }
  };

  const paramsCode = checkForParameter("code");
  const cookieCode = Utils.getCookie("CODE");
  const campassport = Utils.getCookie("cam_passport");

  const changeHaveCode = useCallback(
    (value) => {
      appContext.setHaveCode(value);
    },
    [appContext.haveCode]
  );
  useEffect(() => {
    if (!isLocal.length) {
      if (paramsCode && !cookieCode) {
        setCookie("CODE", getParamValue("code"));
        changeHaveCode(true);
        setSetUrl(getCognosURL());
      } else if (!paramsCode && !cookieCode) {
        appContext.redirectToReportsLogin();
      } else if (!paramsCode && cookieCode) {
        setSetUrl(getCognosURL());
      }
    }
  }, [Utils.getCookie("CODE"), Utils.getCookie("COGNOS_LOGED_IN")]);

  return (
    <>
      <div id="iframeInitialDiv" className={styles.iframeInitialStyle}>
        {/*Hidden IFrame Div for Login Url */}
        <CIFrame
          height="600"
          width="100%"
          src={srcUrl}
          onload={() => {
            if (srcUrl.length) {
              setCookie("COGNOS_LOGED_IN", true);
            }
          }}
        ></CIFrame>
      </div>
    </>
  );
};

export default CognosPreload;
