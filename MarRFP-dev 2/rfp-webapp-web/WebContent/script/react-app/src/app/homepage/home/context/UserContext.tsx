import React, { useState, useEffect } from "react";
import API from "../service/API";

export const UserDetailsContextData = React.createContext({});

export const UserContext = (props) => {
  const [userDetailsState, setUserDetailsState] = useState({});

  useEffect(() => {
    const urs = sessionStorage.getItem("GETUSERDETAILS");
    if (urs) {
      setUserDetailsState({ JSON.parse(urs) });
    } else {
      API.getUserDetails().then((data) => {
        setUserDetailsState({ data });
        //console.log("RESPONSE IN CONTEXT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "+ data);
      });
    }
  }, []);

  return (
    <UserDetailsContextData.Provider value={userDetailsState}>
      {props.children}
    </UserDetailsContextData.Provider>
  );
};

export default UserContext;
