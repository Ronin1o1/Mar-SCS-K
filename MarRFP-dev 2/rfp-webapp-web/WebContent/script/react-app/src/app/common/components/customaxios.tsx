import axios from "axios";
import { USERID } from "../../../../config/user/UserId";

const marriottAxios = axios.create({});

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

const responseHandler = (response) => {
  if (
    !window.location.href.includes("/error") &&
    !window.location.href.includes("/noPrivilege")
  ) {
    if (response == "redirect : marrforms" || response?.status == 401) {
      window.location.href =
        "https://extranet.marriott.com/sdm/RequestCenter/myservices/navigate.do?query=serviceid&sid=2077&";
    } else if (response?.status == 403 || response?.status == 500) {
      let strDest = window.location.href;
      strDest = validateUrl(
        strDest.substring(0, strDest.indexOf("/rfp-webapp-web/")) +
          "/rfp-webapp-web/error"
      );

      const strURLArray = [];
      if (strDest != null || strDest.length != 0) {
        strURLArray.push(strDest);
        const strFinalURL = strURLArray[0];
        window.location.replace(strFinalURL);
      }
      return Promise.reject(response);
    }
  }
  return response;
};

const isLocalUrl = () => {
  const url = window.location.href;
  const isLocal = url
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);
  return isLocal.length > 0 ? true : false;
};

const requestHandler = (request) => {
  if (isLocalUrl()) {
    request.headers["iv-user"] = USERID;
    request.headers["rfprole"] = USERID;
  }

  return request;
};

export function requestInterceptor() {
  axios.interceptors.request.use((request) => {
    if (isLocalUrl()) {
      request.headers["iv-user"] = USERID;
      request.headers["rfprole"] = USERID;
    }

    return request;
  });
}

const errorHandler = (error) => {
  if (
    !window.location.href.includes("/error") &&
    !window.location.href.includes("/noPrivilege")
  ) {
    if (error != "" && error.toString().includes("status code 401")) {
      window.location.href =
        "https://extranet.marriott.com/sdm/RequestCenter/myservices/navigate.do?query=serviceid&sid=2077&";
    } else if (
      error != "" &&
      (error.toString().includes("status code 403") ||
        error.toString().includes("status code 500"))
    ) {
      let strDest = window.location.href;
      strDest = validateUrl(
        strDest.substring(0, strDest.indexOf("/rfp-webapp-web/")) +
          "/rfp-webapp-web/error"
      );

      const strURLArray = [];
      if (strDest != null || strDest.length != 0) {
        strURLArray.push(strDest);
        const strFinalURL = strURLArray[0];
        window.location.replace(strFinalURL);
      }
    }
  }
  return Promise.reject(error);
};

marriottAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

marriottAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
export default marriottAxios;
