import React, { useState } from "react";
import API from "../service/API";

const SignOutContext = React.createContext({});

export const SignOutContextProvider = (props) => {
  const [state, setState] = useState({});

  const signOut = async () => {
    return API.signOut();
  };

  const signOutContext: ISignoutContext = {
    state,
    setState,
    signOut,
  };

  return (
    <SignOutContext.Provider value={signOutContext}>
      {props.children}
    </SignOutContext.Provider>
  );
};

export const SignOutContextConsumer = SignOutContext.Consumer;
export default SignOutContext;
export interface ISignoutContext {
  state?: any;
  setState?: any;
  signOut?: () => any;
}
