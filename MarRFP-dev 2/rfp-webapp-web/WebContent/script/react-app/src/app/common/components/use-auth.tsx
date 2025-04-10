import React, { useState, useEffect, useContext, createContext } from "react";

import ApplicationContext, { IApplicationContext } from "./ApplicationContext";

const authContext = createContext<any>({});

export function ProvideAuth({ children, user }) {
  const auth = useProvideAuth();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;

  function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signOut = () => {
      //Todo
    };

    useEffect(() => {
      setUser(appContext.user);
    }, []);

    // Return the user object and auth methods
    return {
      user,
      signOut,
    };
  }
}

export const useAuth = () => {
  return useContext(authContext);
};
