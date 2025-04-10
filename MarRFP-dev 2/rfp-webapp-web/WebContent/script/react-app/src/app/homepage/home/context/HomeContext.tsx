import React, { useState, useEffect, useContext } from "react";
import Settings from "../static/settings";
import API from "../service/API";
import ApplicationContext from "../../../common/components/ApplicationContext";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state

export interface IHomeContext {
  SelectHotel: any;
  setSelectHotel: () => void;
  onCloseHandler: () => void;
  state: any;
  setState: () => void;
  getHotelList: (any?) => void;
  getNextHotelList: () => void;
  hotelChangeHandler: () => void;
  hotelSelectHandler: () => void;
  checkedAccount: boolean;
  setCheckedAccount: (boolean) => void;
  active: boolean;
  setActive: (boolean) => void;
  requestDetails: any;
  setRequestDetails: (any) => void;
  isLoading: boolean;
  setIsLoading: (boolean) => void;
  activeTab: string;
  setActiveTab: (string) => void;
  isVisible: boolean;
  setIsVisible: (boolean) => void;
  property: string;
  onPropertyChange: (string) => void;
  invalidInput: string;
  setInvalidInput: (string) => void;
  noDataFlag: boolean;
  setNoDataFlag: (boolean) => boolean;
  userPrefs: any;
  setUserPrefs: (any) => boolean;
}

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const HomeContext = React.createContext({} as IHomeContext);

export const HomeContextProvider = (props) => {
  const applicationContext = useContext(ApplicationContext);
  const defaultHotelName = "";
  const defaultMarshaCode = "";
  const defaultStartIndex = 0;
  const [SelectHotel, setSelectHotel] = useState({
    name: defaultHotelName,
    marshacode: defaultMarshaCode,
    startIndex: defaultStartIndex,
  });
  const [state, setState] = useState({
    hoteListData: [
      {
        name: "",
        marshacode: "",
      },
    ],
  });
  const [checkedAccount, setCheckedAccount] = useState(false);
  const [active, setActive] = useState(true);
  const [requestDetails, setRequestDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cbcRequests");
  const [isVisible, setIsVisible] = useState(false);
  const [property, onPropertyChange] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [noDataFlag, setNoDataFlag] = useState(false);
  const [userPrefs, setUserPrefs] = useState({
    eid: null,
    marshaCode: null,
  });
  const getHotelList = (userPrefs) => {
    setNoDataFlag(false);
    return API.getHotelList(
      SelectHotel.name + "*",
      SelectHotel.startIndex,
      SelectHotel.startIndex + Settings.searchSelect.range
    ).then((res) => {
      setState({
        ...state,
        hoteListData: res.data,
      });
      if (userPrefs != null) {
        const foundHotel = res.data.find((data) => {
          return data.marshacode === userPrefs.marshaCode;
        });
        if (foundHotel != null) {
          setSelectHotel({
            ...SelectHotel,
            marshacode: foundHotel.marshacode,
            name: foundHotel.name,
          });
        }
        homeContext.setIsLoading(true);
        if (applicationContext.retainActiveTab == false) {
          setActiveTab("cbcRequests");
          API.getTabRequest("cbcRequests", userPrefs.marshaCode).then(
            (data) => {
              homeContext.setRequestDetails(data);
              homeContext.setIsLoading(false);
            }
          );
        } else {
          applicationContext.setRetainActiveTab(false);
          API.getTabRequest(activeTab, userPrefs.marshaCode).then((data) => {
            homeContext.setRequestDetails(data);
            homeContext.setIsLoading(false);
          });
        }
      }
    });
  };

  const getNextHotelList = (indices) => {
    setNoDataFlag(false);
    setSelectHotel({
      ...SelectHotel,
      startIndex: indices.start,
    });
    return API.getHotelList(
      SelectHotel.name + "*",
      indices.start,
      indices.end
    ).then((res) => {
      setState({
        ...state,
        hoteListData: res.data,
      });
    });
  };
  const onCloseHandler = () => {
    setSelectHotel({
      ...SelectHotel,
      startIndex: 0,
    });
  };
  const hotelChangeHandler = (event) => {
    setNoDataFlag(false);
    setInvalidInput(null);
    const searchText = event.searchString;
    setSelectHotel({ ...SelectHotel, startIndex: 0 });
    setSelectHotel({
      ...SelectHotel,
      name: searchText,
    });
    return API.getHotelList(
      searchText + "*",
      Settings.searchSelect.startIndex,
      Settings.searchSelect.range
    ).then((response) => {
      if (response != undefined) {
        if (response?.data?.length > 0) {
          setNoDataFlag(false);
          setInvalidInput(null);
          setState({
            ...state,
            hoteListData: response.data,
          });

          const selectedHotel = response.data.find((data) => {
            return data.name == searchText;
          });
          if (selectedHotel != null) {
            setSelectHotel({
              ...SelectHotel,
              marshacode: selectedHotel.marshacode,
              name: selectedHotel.name,
            });
          }
        } else {
          setState({
            ...state,
            hoteListData: [],
          });
          setInvalidInput(Settings.invalidProperty);
          setNoDataFlag(true);
        }
      }
      return response;
    });
  };

  const hotelSelectHandler = (event) => {
    setNoDataFlag(false);
    const { textContent } = event.target;
    const foundHotel = state.hoteListData.find((data) => {
      return data.name === textContent;
    });
    if (foundHotel != null) {
      homeContext.setIsLoading(true);
      API.getTabRequest(activeTab, foundHotel.marshacode).then((data) => {
        homeContext.setRequestDetails(data);
        homeContext.setIsLoading(false);
      });
      SelectHotel.marshacode = foundHotel.marshacode;
      setSelectHotel({
        ...SelectHotel,
        marshacode: SelectHotel.marshacode,
        name: textContent,
        startIndex: 0,
      });
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (SelectHotel.marshacode !== "") {
      sessionStorage.setItem("homeSelectedHotel", JSON.stringify(SelectHotel));
    }
  }, [SelectHotel]);

  useEffect(() => {
    sessionStorage.setItem("homeUserPrefs", JSON.stringify(userPrefs));
  }, [userPrefs]);

  const homeContext = {
    state,
    setState,
    SelectHotel,
    setSelectHotel,
    getHotelList,
    getNextHotelList,
    hotelChangeHandler,
    hotelSelectHandler,
    checkedAccount,
    setCheckedAccount,
    active,
    setActive,
    requestDetails,
    setRequestDetails,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    onCloseHandler,
    isVisible,
    setIsVisible,
    property,
    onPropertyChange,
    invalidInput,
    setInvalidInput,
    noDataFlag,
    setNoDataFlag,
    userPrefs,
    setUserPrefs,
  };

  return (
    <HomeContext.Provider value={homeContext}>
      {props.children}
    </HomeContext.Provider>
  );
};

export const HomeContextConsumer = HomeContext.Consumer;
export default HomeContext;
