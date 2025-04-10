import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import Settings from "../static/Settings";
import Api from "../service/SynchronizeUsersApi";

const SynchronizeUsersContext = React.createContext({});

export interface SyncUsersState {
  percentCompleted: number;
  firstLetter: string;
  secondLetter: string;
  synccompleted: string;
}

export const SynchronizeUsersContextProvider = (props) => {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [state, setState] = useState<SyncUsersState>({
    percentCompleted: 0,
    firstLetter: null,
    secondLetter: null,
    synccompleted: null,
  });

  const [currentPath, setCurrentPath] = useState(history.location.href);
  useEffect(() => {
    if (
      state &&
      state.synccompleted != Settings.syncComplete &&
      appContext.isInProgress
    )
      SynchronizeUsers();
  }, [state.percentCompleted]);

  const SynchronizeUsers = () => {
    Api.synchronizeUsers(state).then((data) => {
      if (data.synccompleted == Settings.syncComplete.toString())
        appContext.setIsInProgress(false);
      setState(data);
    });
  };

  const synchronizeUsersContext = {
    state,
    setState,
    SynchronizeUsers,
    currentPath,
    setCurrentPath,
  };
  return (
    <SynchronizeUsersContext.Provider value={synchronizeUsersContext}>
      {props.children}
    </SynchronizeUsersContext.Provider>
  );
};

export const SynchronizeUsersConsumer = SynchronizeUsersContext.Consumer;
export default SynchronizeUsersContext;
