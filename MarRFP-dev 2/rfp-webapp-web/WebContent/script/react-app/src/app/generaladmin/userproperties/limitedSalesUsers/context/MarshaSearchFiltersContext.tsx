/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useEffect, useState } from "react";

// Set state variables and function
const MarshaSearchFiltersContext = React.createContext({});

export const MarshaSearchFiltersContextProvider = (props) => {
  const [hotelUsersData, setHotelUsersData] = useState();
  const [searchCriteria, setSearchCriteria] = useState({
    userid: "",
    role: "",
    showProperties: true,
    searchBy: "ALL",
    filterString: "",
    orderby: 0,
    strPage: {
      page: 1,
      maxpagelen: 20,
    },
  });
  const [totalPages, setTotalPages] = useState(22);
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const [pNumber, setPNumber] = useState(1);
  const [resetInput, setResetInput] = useState(false);
  useEffect(() => {}, []);
  const onClickSearch = (pageNumber: number = 1) => {
    const searchFilters = searchCriteria;
  };
  const marshaSearchFiltersContext = {
    searchCriteria,
    totalPages,
    pNumber,
    resetInput,
    showStartingWithFilter,
    hotelUsersData,
    onClickSearch,
    setSearchCriteria,
    setShowStartingWithFilter,
    setTotalPages,
    setPNumber,
    setResetInput,
  };
  return (
    <MarshaSearchFiltersContext.Provider value={marshaSearchFiltersContext}>
      {props.children}
    </MarshaSearchFiltersContext.Provider>
  );
};

export const MarshaSearchFiltersConsumer = MarshaSearchFiltersContext.Consumer;
export default MarshaSearchFiltersContext;
