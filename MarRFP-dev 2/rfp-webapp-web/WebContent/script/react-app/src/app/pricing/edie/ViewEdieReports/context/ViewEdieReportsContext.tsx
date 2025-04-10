import React, { useState } from "react";
//import Utils from "../../../../common/utils/Utils";
import API from "../service/API";
//import Settings from "../static/Settings";

const ViewEdieReportsContext = React.createContext({});

export const ViewEdieReportsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    reportId: null,
    currentReport: null,
    reportUrl: null,
    hiddenUrl: null,
  });

  const setEdieReportsData = (data) => {
    let reportUrl;
    let hiddenUrl;
    setIsLoading(true);
    API.getCognosServerUrl().then((res) => {
      reportUrl = `${res.COGNOS_EXCEL_LOC}__reportName=${data.currentReport}`;
      hiddenUrl = res.COGNOS_LOGIN_URL;

      setState({
        ...state,
        hiddenUrl: hiddenUrl,
        reportUrl: reportUrl,
        currentReport: data.currentReport,
      });
      setIsLoading(false);
    });
  };

  const viewEdieReportsContext = {
    state,
    setState,
    setEdieReportsData,
    isLoading,
    setIsLoading,
  };

  return (
    <ViewEdieReportsContext.Provider value={viewEdieReportsContext}>
      {props.children}
    </ViewEdieReportsContext.Provider>
  );
};

export const ViewEdieReportsContextConsumer = ViewEdieReportsContext.Consumer;
export default ViewEdieReportsContext;
