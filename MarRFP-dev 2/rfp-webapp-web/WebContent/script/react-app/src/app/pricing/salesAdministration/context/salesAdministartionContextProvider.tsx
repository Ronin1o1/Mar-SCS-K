import React, { useState } from "react";

const SalesAdministartionContext = React.createContext({});
export const SalesAdministartionContextProvider = (props) => {
  // const [alertmsg, propsmsg] = useState("");
  // const [alertmsgflag, setalertFlag] = useState(false);
  const [state, setState] = useState({
    header: true,
    selectedYear: "",

    period: "",

    gridData: {
      list: [{}],
    },

    showScreenLoader: false,
    newDateValue: "",
    userDetails: {
      list: {},
    },
    alertMsg: "",
    alertMsgflag: false,
  });

  const urlDetails = { ...state };
  const seturlDetails = (data) => {
    urlDetails.period = data.period;

    setState({
      ...state,

      period: data.period,
    });
  };
  const headerChange = (e) => {
    setState({
      ...state,
      header: e,
    });
  };
  const getUserDetails = (data) => {
    if (data) {
      const getUserDetails = { ...state.userDetails };
      getUserDetails.list = data;
      setState({
        ...state,
        userDetails: getUserDetails,
      });
    }
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const onHandleUpdate = () => {
    //To Do function for update functionality
  };
  const setAlertMsgfunc = (alert: boolean, msg: string) => {
    state.alertMsg = msg;
    state.alertMsgflag = alert;
    setState({
      ...state,
      alertMsg: state.alertMsg,
      alertMsgflag: state.alertMsgflag,
    });
  };

  const salesAdminContext = {
    state,
    setState,
    // setGridDataList,
    getUserDetails,
    setLoader,
    seturlDetails,
    headerChange,
    onHandleUpdate,
    setAlertMsgfunc,
  };

  return (
    <SalesAdministartionContext.Provider value={salesAdminContext}>
      {props.children}
    </SalesAdministartionContext.Provider>
  );
};
export const RateProgramContextConsumer = SalesAdministartionContext.Consumer;
export default SalesAdministartionContext;
