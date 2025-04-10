import React, { useState } from "react";
import Settings from "../static/Settings";
import API from "../service/API";
const CopyAccountContext = React.createContext({});

export const CopyAccountContextProvider = (props) => {
  const [state, setState] = useState({
    showScreenLoader: false,
    accountTierData: {
      accountSegment: {
        data: [],
      },
      fromDate: {
        data: [],
      },
      toDate: {
        data: [],
      },
    },
    copyAccountInfoByTierData: {
      accountSegment: null,
      fromPeriod: null,
      toPeriod: null,
    },

    validationTitle: "",
    validationToFlag: false,
    validationFromFlag: false,
    validateFlag: "",
    isComplete: true,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const onChangeData = (ddn, event) => {
    state.copyAccountInfoByTierData[ddn] = event.target.value;
    setState({
      ...state,
      copyAccountInfoByTierData: state.copyAccountInfoByTierData,
    });
    if (
      state.copyAccountInfoByTierData.fromPeriod !== null &&
      state.copyAccountInfoByTierData.toPeriod !== null &&
      state.copyAccountInfoByTierData.accountSegment !== null
    ) {
      if (ddn === Settings.accountTierDetails.toPeriod) {
        if (
          state.copyAccountInfoByTierData.fromPeriod !== null ||
          state.copyAccountInfoByTierData.fromPeriod !== ""
        ) {
          if (
            state.copyAccountInfoByTierData.toPeriod !== null &&
            state.copyAccountInfoByTierData.fromPeriod >=
              state.copyAccountInfoByTierData.toPeriod
          ) {
            validateToPeriod();
          }
        }
      } else {
        if (state.copyAccountInfoByTierData.toPeriod !== null) {
          if (
            state.copyAccountInfoByTierData.fromPeriod !== null &&
            state.copyAccountInfoByTierData.fromPeriod >=
              state.copyAccountInfoByTierData.toPeriod
          ) {
            validateFromPeriod();
          }
        }
      }
    }
  };

  const copyButtonHandler = () => {
    if (
      state.copyAccountInfoByTierData.accountSegment === null ||
      state.copyAccountInfoByTierData.accountSegment === ""
    ) {
      alert(Settings.accountTierDetails.accountSegmenttalert);
    } else if (
      state.copyAccountInfoByTierData.fromPeriod === null ||
      state.copyAccountInfoByTierData.fromPeriod === ""
    ) {
      alert(Settings.accountTierDetails.accoutFromAlert);
    } else if (
      state.copyAccountInfoByTierData.toPeriod === null ||
      state.copyAccountInfoByTierData.toPeriod === ""
    ) {
      alert(Settings.accountTierDetails.accountToAlert);
    } else {
      if (
        (state.copyAccountInfoByTierData.fromPeriod !== null ||
          state.copyAccountInfoByTierData.fromPeriod !== "") &&
        (state.copyAccountInfoByTierData.toPeriod !== null ||
          state.copyAccountInfoByTierData.toPeriod !== "") &&
        (state.copyAccountInfoByTierData.accountSegment !== null ||
          state.copyAccountInfoByTierData.accountSegment !== "")
      ) {
        if (state.validationFromFlag !== true) {
          if (
            state.copyAccountInfoByTierData.fromPeriod !== null ||
            state.copyAccountInfoByTierData.fromPeriod !== ""
          ) {
            if (
              (state.copyAccountInfoByTierData.toPeriod !== null ||
                state.copyAccountInfoByTierData.toPeriod !== "") &&
              state.copyAccountInfoByTierData.fromPeriod >=
                state.copyAccountInfoByTierData.toPeriod
            ) {
              validateToPeriod();
            }
          }
        } else {
          if (state.copyAccountInfoByTierData.toPeriod !== null) {
            if (
              state.copyAccountInfoByTierData.fromPeriod != null &&
              state.copyAccountInfoByTierData.fromPeriod >=
                state.copyAccountInfoByTierData.toPeriod
            ) {
              validateFromPeriod();
            }
          }
        }
      }
      if (
        (state.copyAccountInfoByTierData.toPeriod !== null ||
          state.copyAccountInfoByTierData.toPeriod !== "") &&
        (state.copyAccountInfoByTierData.fromPeriod !== null ||
          state.copyAccountInfoByTierData.fromPeriod !== "") &&
        (state.copyAccountInfoByTierData.accountSegment !== null ||
          state.copyAccountInfoByTierData.accountSegment !== "") &&
        state.copyAccountInfoByTierData.fromPeriod <
          state.copyAccountInfoByTierData.toPeriod
      ) {
        API.accountCopyBtn(state.copyAccountInfoByTierData).then(() => {
          state.copyAccountInfoByTierData.accountSegment = null;
          state.copyAccountInfoByTierData.fromPeriod = "";
          state.copyAccountInfoByTierData.toPeriod = "";

          setState({
            ...state,
            copyAccountInfoByTierData: state.copyAccountInfoByTierData,
          });
        });
      }
    }
  };

  const validateFromPeriod = () => {
    const copyAccountInfoByTierData = { ...state.copyAccountInfoByTierData };
    setState({
      ...state,
      copyAccountInfoByTierData: copyAccountInfoByTierData,
      validationTitle: state.copyAccountInfoByTierData.fromPeriod,
      validationFromFlag: true,
    });

    if (
      state.copyAccountInfoByTierData.accountSegment !== "" &&
      state.copyAccountInfoByTierData.fromPeriod !== "" &&
      state.copyAccountInfoByTierData.toPeriod !== ""
    ) {
      setTimeout(() => {
        alert(
          Settings.accountTierDetails.validationFrom +
            state.copyAccountInfoByTierData.fromPeriod
        );
      });
    }
  };

  const validateToPeriod = () => {
    const copyAccountInfoByTierData = { ...state.copyAccountInfoByTierData };
    setState({
      ...state,
      copyAccountInfoByTierData: copyAccountInfoByTierData,
      validationTitle: state.copyAccountInfoByTierData.toPeriod,
      validationToFlag: true,
      validationFromFlag: false,
    });

    if (
      state.copyAccountInfoByTierData.accountSegment !== null &&
      state.copyAccountInfoByTierData.fromPeriod !== null &&
      state.copyAccountInfoByTierData.toPeriod !== null
    ) {
      setTimeout(() => {
        alert(
          Settings.accountTierDetails.validationTo +
            state.copyAccountInfoByTierData.toPeriod
        );
      });
    }
  };

  const accountContext = {
    state,
    setState,
    onChangeData,
    validateToPeriod,
    validateFromPeriod,
    copyButtonHandler,
    setLoader,
  };

  return (
    <CopyAccountContext.Provider value={accountContext}>
      {props.children}
    </CopyAccountContext.Provider>
  );
};

export const CopyAccountContextConsumer = CopyAccountContext.Consumer;
export default CopyAccountContext;
