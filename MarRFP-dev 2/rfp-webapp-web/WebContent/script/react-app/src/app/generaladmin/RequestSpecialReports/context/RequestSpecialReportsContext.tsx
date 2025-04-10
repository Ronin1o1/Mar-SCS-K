import React, { useState } from "react";
import Utils from "../../../pricing/admin/utils/Utils";
import Settings from "../static/Settings";

const RequestSpecialReportsContext = React.createContext({});

export const RequestSpecialReportsContextProvider = (props) => {
  const [reportValue, setReportValue] = useState(null);
  const [period, setPeriod] = useState("");

  const [state, setState] = useState({
    reportType: {
      data: {},
    },
    reportFilter: {
      data: {},
    },
  });
  const setReportType = (data) => {
    if (data) {
      if (data.noFilterOptions.noFilterLists.reportlist != null)
        data.noFilterOptions.noFilterLists.reportlist = Utils.appendJsonObj(
          Settings.blankReport,
          data.noFilterOptions.noFilterLists.reportlist
        );
      setState({
        ...state,
        reportType: data,
      });
    }
  };
  const setReportFilterData = (data) => {
    if (data) {
      setState({
        ...state,
        reportFilter: data,
      });
    }
  };
  const requestSpecialReportsContext = {
    state,
    setState,
    setReportType,
    setReportFilterData,
    reportValue,
    setReportValue,
    period,
    setPeriod,
  };

  return (
    <RequestSpecialReportsContext.Provider value={requestSpecialReportsContext}>
      {props.children}
    </RequestSpecialReportsContext.Provider>
  );
};

export const RequestSpecialReportsContextConsumer =
  RequestSpecialReportsContext.Consumer;
export default RequestSpecialReportsContext;
