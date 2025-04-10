import React from "react";
import { useState } from "react";

const UserPropertiesContext = React.createContext({});
export const UserPropertiesContextProvider = (props) => {
  const [state, setState] = useState({
    userSearchCriteria: {
      searchBy: "ALL",
      filterString: "",
      orderBy: 0,
      strPage: {
        page: 1,
        maxpagelen: 0,
      },
    },
  });
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const handleSearch = () => {};

  const userPropertiesContext = {
    state,
    showStartingWithFilter,
    handleSearch,
    setState,
    setShowStartingWithFilter,
  };
  return (
    <UserPropertiesContext.Provider value={userPropertiesContext}>
      {props.children}
    </UserPropertiesContext.Provider>
  );
};
export const UserPropertiesContextConsumer = UserPropertiesContext.Consumer;
export default UserPropertiesContext;
