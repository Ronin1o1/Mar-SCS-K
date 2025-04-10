import React, { useContext, useEffect, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import Settings from "../static/Settings";

const GroupsAndMeetingsContext = React.createContext({});

export const GroupsAndMeetingsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);

  const [state, setState] = useState({
    data: {
      list: [{}],
    },
  });
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [isFormValueChanged, setIsFormValueChanged] = useState("N");

  const setGroupsMeetingsData = (data) => {
    if (data) {
      const dataList = { ...state.data };
      dataList.list = data;
      setState({
        ...state,
        data: dataList,
      });
    }
  };

  useEffect(() => {
    sessionStorage.setItem(
      "CPACGroupsAndMeetingData",
      JSON.stringify(state?.data)
    );
  }, [state?.data]);

  useEffect(() => {
    if (isFormValueChanged == "Y") {
      const validPage = gengroups_check(true);
      if (validPage == "failed") {
        appContext.setGroupsAndMeetingError({
          show: true,
          msg: Settings.alerts.fillAllGroupMeetingDetails,
        });
      } else {
        appContext.setGroupsAndMeetingError({
          show: false,
          msg: "",
        });
      }
    }
  }, [isFormEdited]);

  const gengroups_check = (navigationCheck) => {
    return parentContext.gengroups_check(navigationCheck, state.data);
  };

  const pricingContext = {
    state,
    setState,
    setGroupsMeetingsData,
    gengroups_check,
    isFormEdited,
    setIsFormEdited,
    isFormValueChanged,
    setIsFormValueChanged,
  };

  return (
    <GroupsAndMeetingsContext.Provider value={pricingContext}>
      {props.children}
    </GroupsAndMeetingsContext.Provider>
  );
};
export const ReportContextConsumer = GroupsAndMeetingsContext.Consumer;
export default GroupsAndMeetingsContext;
