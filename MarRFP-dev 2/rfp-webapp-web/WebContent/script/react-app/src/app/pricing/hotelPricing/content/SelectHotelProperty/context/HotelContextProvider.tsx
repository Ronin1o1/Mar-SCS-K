import React, { useState } from "react";

const HotelContext = React.createContext({});
export const HotelContextProvider = (props) => {
  const [state, setState] = useState({
    selectedYear: "",
    gridData: {
      list: [],
    },
    periodlist: [],
    selecthotellist: null,
    inputmarshacode: "",
    selectedmarshacode: "",
    hotelName: "",
    hotelData: {
      address1: "",
      address2: "",
      main_phone_incl: "",
    },
    personname: "",

    persontitle: "",
    email: "",
    countrycode: "",
    areacitycode: "",
    phonenumber: "",
    hotelRFPRespondentEmails: [
      {
        personname2: "",
        email2: "",
        phonenumber2: "",
        persontitle2: "",
      },
      {
        personname3: "",
        email3: "",
        phonenumber3: "",
        persontitle3: "",
      },
      {
        personname4: "",
        email4: "",
        phonenumber4: "",
        persontitle4: "",
      },
    ],

    selectedHotelName: "",
    marshaCode: "hi",

    totalPages: 0,
    hotelRfpid: "",
    selecthotelData: [],

    hotelData1: {
      hotelList: [
        {
          marshaCode: "null",
          marshaCodeAndName: "",
          period: null,
        },
      ],
    },
    data: {},
    showAccountLegend: false,
    showAccountOverview: false,
    onShowpage: false,
    currentSelectedId: null,
  });

  const onInputClick = (event) => {
    // state.currentSelectedId = event.target.id;
    setState({ ...state, onShowpage: true });
  };

  const setinputmarshacode = (selectedObj) => {
    if (selectedObj !== "<Please Select a Property>") {
      const inputmarshacode = selectedObj || selectedObj?.inputmarshacode;

      setState({
        ...state,
        inputmarshacode: inputmarshacode,
        selectedmarshacode: inputmarshacode,
      });
    } else {
      const inputmarshacode = selectedObj || selectedObj?.inputmarshacode;

      setState({
        ...state,
        selectedmarshacode: inputmarshacode,
      });
    }
  };

  const sethotelName = (selectedObj) => {
    if (selectedObj) {
      // const hotelName = selectedObj.hotelName;

      setState({
        ...state,

        hotelName: selectedObj.hotelName,
      });
    }
  };

  const setSelectedYear = (selectedObj) => {
    if (selectedObj) {
      const selectedyear = selectedObj.period;
      const hotelRfpid = selectedObj.hotelrfpid;

      setState({
        ...state,
        selectedYear: selectedyear,
        hotelRfpid: hotelRfpid,
      });
    }
  };
  const setHotelListData = (data) => {
    const hotelData = { ...state.hotelData1 };
    hotelData.hotelList = data;

    setState({
      ...state,
      hotelData1: hotelData,
    });
  };

  const handleChange1 = (e) => {
    setState({
      ...state,
      inputmarshacode: e.target.value,
    });
  };
  const setinputmarshacodeOnBlur = (selectedObj) => {
    if (selectedObj !== "<Please Select a Property>") {
      const inputmarshacode = selectedObj || selectedObj?.inputmarshacode;

      setState({
        ...state,
        selectedmarshacode: inputmarshacode,
      });
    } else {
      const inputmarshacode = selectedObj || selectedObj?.inputmarshacode;

      setState({
        ...state,
        selectedmarshacode: inputmarshacode,
      });
    }
  };

  const showAccountLegend = (data) => {
    setState({
      ...state,
      showAccountLegend: !state.showAccountLegend,
    });
  };
  const showAccountOverview = (data) => {
    setState({
      ...state,
      showAccountOverview: !state.showAccountOverview,
    });
  };
  const rateProgramContext = {
    state,
    setState,
    showAccountLegend,
    showAccountOverview,
    handleChange1,
    setHotelListData,
    setSelectedYear,
    sethotelName,
    setinputmarshacode,
    setinputmarshacodeOnBlur,
    onInputClick,
  };

  return (
    <HotelContext.Provider value={rateProgramContext}>
      {props.children}
    </HotelContext.Provider>
  );
};
export const RateProgramContextConsumer = HotelContext.Consumer;
export default HotelContext;
