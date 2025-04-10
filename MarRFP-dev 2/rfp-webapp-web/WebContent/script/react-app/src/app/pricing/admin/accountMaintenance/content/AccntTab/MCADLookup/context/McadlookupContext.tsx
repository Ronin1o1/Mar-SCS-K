import React, { useState, useEffect } from "react";

// @ts-ignore
import API from "../service/API";

import Settings from "../static/Settings";

const McadlookupContext = React.createContext({});

export const McadlookupContextProvider = (props) => {
  const [mcadResultList, setMcadResultList] = useState([]);
  const [state, setState] = useState({
    formChgStatus: false,
    showScreenLoader: false,
    accounts: [
      {
        infoid: null,
        id: "",
        CompanyName: "",
        CompanyType: "",
        BusinessLevel: "",
        Country: "",
        BusinessName: "",
        Parents: "",
        Location: "",
      },
    ],

    McadResult: {
      McadResultList: [
        {
          accountrecid: 0,
          businessid: null,
          businessname: null,
          parentbusinessid: 0,
          ultimatebusinessid: null,
          globalbusinessid: 0,
          cityname: null,
          stateabbrev: null,
          state: null,
          countrycode: null,
          siccode1desc: null,
          account_nat_key: 0,
          child_count: 0,
          businesslevelcode: null,
          location: null,
          childbusinesslevelcode: null,
          childbusinessleveldesc: null,
          businessleveldesc: null,
          isSelected: false,
          isMoved: false,
        },
      ],
    },
    MCADlookupInfo: {
      accountInfo: {
        data: {},
      },
      mcadDropDowns: {
        countries: [
          {
            data: [],
          },
        ],
      },
      mcadOracleDataList: [],

      mcadSearch: {
        data: [],
      },
      businessLevelDropDowns: {
        businessLevelList: {
          data: [],
        },
      },
    },
    maxMCADLink: 0,
    updatedCheckedState: [],

    mcadAccountDetails: {
      mcadAccountDetaisList: {
        streetaddress: null,
        zipcode: null,
        zipfourcode: null,
        latitude: null,
        longitude: null,
        siccode1: null,
        siteemployeenumber: null,
        areacode: null,
        phonenumber: null,
        lastupdated: null,
        suite: null,
        empalllocations: null,
        primarynaicsdesc: null,
        primarynaicscode: null,
        fortune100flag: null,
        locationcode: null,
        locationdesc: null,
        companytypecode: null,
        companytypedesc: null,
        cbsacodeid: null,
        cbsacodedesc: null,
        businessid: null,
        businessname: null,
        parentbusinessid: null,
        ultimatebusinessid: null,
        globalbusinessid: null,
        cityname: null,
        state: null,
        countrycode: null,
        siccode1desc: null,
        account_nat_key: null,
      },
    },

    McadResultValue: [],
    businessLevelDropDowns: {
      businessLevelList: [
        {
          businessLevelval: 0,
          businessLeveltext: "*",
        },
        {
          businessLevelval: "U",
          businessLeveltext: "Ultimate",
        },
        {
          businessLevelval: "P",
          businessLeveltext: "Parent",
        },
      ],
    },
    businessLevelDropDownsID: {
      businessLevelList: [
        {
          businessLevelval: 0,
          businessLeveltext: "*",
        },
        {
          businessLevelval: "P",
          businessLeveltext: "Parent",
        },
        {
          businessLevelval: "U",
          businessLeveltext: "Ultimate",
        },
      ],
    },
    newChecked: [],
    selected: [],

    setMcadData: {
      searchtype: null,
      businessName: null,
      businessLevel: null,
      businessLevelID: null,
      countryRegion: null,
      ddnBusinessId: null,
      ddnbusinessID: null,
    },
    modalTitle: null,
    isCompleteMcadAccountDetails: false,
    onshowModal: false,
    renderLoading: null,
    isComplete: false,
    isSearchFlag: true,
    isMcadLookUpComplete: false,
    radio: "searchByName",
    onSearchButtonClicked: false,
    onShowMcadAccountDetails: false,
    onShowParentLinkData: false,
    onRightSideData: false,
    ondatatableVisible: false,
    isbusinessNameEmpty: false,
    isBusinessLevelEmpty: false,
    onValidation: false,
    //@ts-ignore
    showDownArrow: true,
    isAlphabet: false,
    searchParent: false,
    mcadItemCounter: 0,
    onshowModalError: false,
    MCADCounter: false,
    onUltimateVisisble: false,
    period: 0,
    isDataSaved: false,
    McadResultValueData: [],
    accountrecid: null,
    postDataResult: {},
    onArrowBtnClicked: false,
    mcadDetailLoad: false,
    noData: false,
    currentLevel: null,
    isDuplicateData: false,
    duplicateBusinessName: "",
    formChg: "N",
    initialMCadOracleData: [],
  });

  useEffect(() => {
    setState(state);
  }, []);

  const setLoader = () => {
    state.showScreenLoader = true;
    setState({
      ...state,
      showScreenLoader: state.showScreenLoader,
    });
  };
  const resetLoader = () => {
    state.showScreenLoader = false;
    setState({
      ...state,
      showScreenLoader: state.showScreenLoader,
    });
  };
  const setAccountData = (data: any, closeModal?: boolean) => {
    if (data) {
      setState({
        ...state,
        accounts: data,
      });
    }
  };

  const showParentlinkData = (businessid) => {
    state.McadResult.McadResultList.map((data) => {
      if (data.businessid === businessid) {
        setLoader();
        API.getParentMCADData(
          "search_for_children",
          data.businessid,
          "U",
          "P"
        ).then((data) => {
          setMacdResultDetails(data);
        });
      }
    });
    if (state.onShowParentLinkData === false) {
      state.onShowParentLinkData = true;
      setMcadResultList(state.McadResult.McadResultList);
    }
  };

  const setMacdResultDetails = (data: any) => {
    let dataList = { ...state.McadResult.McadResultList };
    dataList = data;
    dataList.map((item) => {
      item.isMoved = false;
      item.isSelected = false;
    });
    resetLoader();
    setState({
      ...state,
      McadResult: {
        ...state.McadResult,
        McadResultList: dataList,
      },
    });
  };

  const setMcadAccountDetailsList = (data: any) => {
    let location = "";
    const mcadAccountDetailsData = { ...state };
    mcadAccountDetailsData.mcadAccountDetails.mcadAccountDetaisList = data;
    mcadAccountDetailsData.isCompleteMcadAccountDetails = true;
    mcadAccountDetailsData.onShowMcadAccountDetails = true;

    const cityname =
      mcadAccountDetailsData.mcadAccountDetails.mcadAccountDetaisList.cityname;
    const stateName =
      mcadAccountDetailsData.mcadAccountDetails.mcadAccountDetaisList.state;
    const countrycode =
      mcadAccountDetailsData.mcadAccountDetails.mcadAccountDetaisList
        .countrycode;

    if (cityname != null && cityname !== "") location = cityname;
    if (stateName != null && stateName !== "") location += " " + stateName;
    if (countrycode != null && countrycode !== "") {
      if (location.length > 0) location += ",";
      location += " " + countrycode;
    }
    mcadAccountDetailsData.modalTitle = `${
      mcadAccountDetailsData.mcadAccountDetails.mcadAccountDetaisList
        .businessname
    }${" "}${location}`;

    setState(mcadAccountDetailsData);
  };

  const showMCADDataModel = (selectedData: any) => {
    if (
      selectedData.hasOwnProperty(
        Settings.MCADResultData.tableColumns.Parent.field
      ) &&
      selectedData[Settings.MCADResultData.tableColumns.Parent.field] !== null
    ) {
      if (
        mcadResultList.find(
          (data) => data.businessid === selectedData.businessid
        )
      ) {
        const data = mcadResultList.find(
          (data) => data.businessid === selectedData.businessid
        );
        if (data.accountrecid === null) {
          data.accountrecid = 0;
        }
        API.getAccountMCADdetails(
          data.businessid,
          data.parentbusinessid,
          data.ultimatebusinessid,
          data.globalbusinessid,
          data.businesslevelcode,
          data.accountrecid
        ).then((data) => {
          setMcadAccountDetailsList(data);
        });
      } else if (
        state.McadResult.McadResultList.find(
          (data) => data.businessid === selectedData.businessid
        )
      ) {
        const data = state.McadResult.McadResultList.find(
          (data) => data.businessid === selectedData.businessid
        );
        if (data.accountrecid === null) {
          data.accountrecid = 0;
        }
        API.getAccountMCADdetails(
          data.businessid,
          data.parentbusinessid,
          data.ultimatebusinessid,
          data.globalbusinessid,
          data.businesslevelcode,
          data.accountrecid
        ).then((data) => {
          setMcadAccountDetailsList(data);
        });
      } else if (
        mcadResultList.find(
          (data) => data.businessid === selectedData.businessid
        )
      ) {
        const data = mcadResultList.find(
          (data) => data.businessid === selectedData.businessid
        );
        if (data.accountrecid === null) {
          data.accountrecid = 0;
        }
        API.getAccountMCADdetails(
          data.businessid,
          data.parentbusinessid,
          data.ultimatebusinessid,
          data.globalbusinessid,
          data.businesslevelcode,
          data.accountrecid
        ).then((data) => {
          setMcadAccountDetailsList(data);
        });
      } else if (
        state.McadResult.McadResultList.find(
          (data) => data.businessid === selectedData.businessid
        )
      ) {
        const data = state.McadResult.McadResultList.find(
          (data) => data.businessid === selectedData.businessid
        );
        if (data.accountrecid === null) {
          data.accountrecid = 0;
        }
        API.getAccountMCADdetails(
          data.businessid,
          data.parentbusinessid,
          data.ultimatebusinessid,
          data.globalbusinessid,
          data.businesslevelcode,
          data.accountrecid
        ).then((data) => {
          setMcadAccountDetailsList(data);
        });
      } else if (
        state.MCADlookupInfo.mcadOracleDataList.find(
          (data) => data.businessid === selectedData.businessid
        )
      ) {
        const data = state.MCADlookupInfo.mcadOracleDataList.find(
          (data) => data.businessid === selectedData.businessid
        );
        if (data.businessid === selectedData.businessid) {
          if (data.accountrecid === null) {
            data.accountrecid = 0;
          }
          API.getAccountMCADdetails(
            data.businessid,
            data.parentbusinessid,
            data.ultimatebusinessid,
            data.globalbusinessid,
            data.businesslevelcode,
            data.accountrecid
          ).then((data) => {
            setMcadAccountDetailsList(data);
          });
        }
      }
    } else {
      state.MCADlookupInfo.mcadOracleDataList.map((data) => {
        if (data.businessid === selectedData.businessid) {
          if (data.accountrecid === null) {
            data.accountrecid = 0;
          }
          API.getAccountMCADdetails(
            data.businessid,
            data.parentbusinessid,
            data.ultimatebusinessid,
            data.globalbusinessid,
            data.businesslevelcode,
            data.accountrecid
          ).then((data) => {
            setMcadAccountDetailsList(data);
          });
        }
      });
    }
  };

  const onChangeData = (event) => {
    const { id, value, name } = event.target;
    state.isAlphabet = false;
    state.formChgStatus = true;

    if (name === "search_for_name") {
      state.radio = "searchByName";
      state.isSearchFlag = true;
      state.onValidation = false;
      state.setMcadData[id] = "search_for_name";

      state.setMcadData.businessName = "";

      setState({
        ...state,
        formChgStatus: true,
        setMcadData: state.setMcadData,
        onValidation: state.onValidation,
      });
    } else if (name === "search_for_id") {
      state.radio = "searchByID";
      state.isSearchFlag = false;
      state.onValidation = false;
      state.setMcadData[id] = "search_for_id";
      state.setMcadData.ddnbusinessID = "";

      setState({
        ...state,
        formChgStatus: true,
        setMcadData: state.setMcadData,
        onValidation: state.onValidation,
      });
    } else {
      state.setMcadData[id] = value;
      setState({ ...state, setMcadData: state.setMcadData });
    }

    if (
      state.setMcadData.businessName !== null ||
      state.setMcadData.businessName !== " " ||
      state.setMcadData.businessName !== undefined
    ) {
      state.isbusinessNameEmpty = false;
      setState({
        ...state,
        formChgStatus: true,
        isbusinessNameEmpty: state.isbusinessNameEmpty,
      });
    }
    if (
      state.setMcadData.businessLevel != null ||
      state.setMcadData.businessLevel != " " ||
      state.setMcadData.businessLevel != undefined
    ) {
      state.isBusinessLevelEmpty = false;
      setState({
        ...state,
        formChgStatus: true,
        isBusinessLevelEmpty: state.isBusinessLevelEmpty,
      });
    }

    setState({ ...state, isSearchFlag: state.isSearchFlag });
    if (id === Settings.searchAccount.ddnBusinessIdlbl.id) {
      if (value != "" && value != null) {
        const isnum = /^\d+$/.test(value);
        if (!isnum) {
          state.isAlphabet = true;
          setState({ ...state, isAlphabet: state.isAlphabet });
        } else {
          state.isAlphabet = false;
          setState({ ...state, isAlphabet: state.isAlphabet });
        }
      } else {
        state.isAlphabet = false;
        setState({ ...state, isAlphabet: state.isAlphabet });
      }
    }
  };

  const validate = (event) => {
    const { id, value } = event.target;
    if (id === Settings.searchAccount.ddnBusinessIdlbl.id) {
      const isnum = /^\d+$/.test(value);
      if (isnum) {
      }
    }
  };

  const onChange = (ddn, event) => {
    const { value } = event.target;
    state.setMcadData[ddn] = value;
    const searchType = state.setMcadData.searchtype;
    if (
      (searchType === "search_for_name" &&
        state.setMcadData.businessLevel === "P") ||
      (searchType === "search_for_id" &&
        state.setMcadData.businessLevelID === "P")
    ) {
      state.searchParent = true;
    }
    if (
      (searchType === "search_for_name" &&
        state.setMcadData.businessLevel === "U") ||
      (searchType === "search_for_id" &&
        state.setMcadData.businessLevelID === "U")
    ) {
      state.searchParent = false;
    }
    if (state.setMcadData.businessLevel !== null) {
      state.isBusinessLevelEmpty = false;
    }
    setState({
      ...state,
      formChgStatus: false,
      setMcadData: state.setMcadData,
    });
  };

  const showModal = () => {
    setState({
      ...state,
      onshowModal: !state.onshowModal,
      showDownArrow: !state.showDownArrow,
    });
  };
  const dupDataModal = () => {
    setState({
      ...state,
      isDuplicateData: !state.isDuplicateData,
    });
  };
  const noDataModal = () => {
    setState({
      ...state,
      noData: !state.noData,
    });
  };
  const showModalError = () => {
    state.onshowModalError = !state.onshowModalError;
    setState({ ...state, onshowModalError: state.onshowModalError });
  };

  const showValidation = (closeModal?: boolean) => {
    state.onValidation = !state.onValidation;
    setState({
      ...state,
      onValidation: state.onValidation,
    });
  };

  const handleDelete = (businessid) => {
    state.McadResult.McadResultList.map((data) => {
      if (data.businessid === businessid) {
        data.isMoved = false;
        data.isSelected = false;
      }
    });

    const filteredData = state.MCADlookupInfo.mcadOracleDataList.filter(
      function (e1) {
        return e1.businessid !== businessid;
      }
    );
    state.MCADlookupInfo.mcadOracleDataList = filteredData;
    if (state.MCADlookupInfo.mcadOracleDataList.length === 0)
      state.currentLevel = "-";
    setState({
      ...state,
      formChgStatus: true,
      formChg: "Y",
      McadResult: state.McadResult,
      MCADlookupInfo: {
        ...state.MCADlookupInfo,
        mcadOracleDataList: filteredData,
      },
    });
  };

  const showModalMcadAccount = () => {
    state.onShowMcadAccountDetails = !state.onShowMcadAccountDetails;
    setState({
      ...state,
      onShowMcadAccountDetails: state.onShowMcadAccountDetails,
    });
  };

  const onModalClose = (closeModal?: boolean) => {
    state.onshowModal = !state.onshowModal;
  };

  const returntoParent = () => {
    setLoader();
    API.getAccountMCADResult(
      state.setMcadData.searchtype,
      state.setMcadData.businessName,
      state.setMcadData.businessLevel,
      state.setMcadData.countryRegion,
      state.setMcadData.ddnbusinessID
    ).then((data) => {
      setMacdResultDetails(data);
    });
    state.onShowParentLinkData = false;
  };

  const handleToggle = (businessid) => () => {
    state.McadResult.McadResultList.map((data) => {
      if (data.businessid === businessid) {
        data.isSelected = !data.isSelected;
      }
    });
    setState({
      ...state,
      formChgStatus: true,
      McadResult: state.McadResult,
    });
  };

  const getMCADDataDet = () => {
    setLoader();
    if (state.setMcadData.searchtype === "search_for_name") {
      API.getAccountMCADResult(
        state.setMcadData.searchtype,
        state.setMcadData.businessName,
        state.setMcadData.businessLevel,
        state.setMcadData.countryRegion
      ).then((data) => {
        setMacdResultDetails(data);
      });
    } else if (state.setMcadData.searchtype === "search_for_id") {
      API.getAccountMCADResultID(
        state.setMcadData.searchtype,
        state.setMcadData.ddnbusinessID,
        state.setMcadData.businessLevelID,
        state.setMcadData.countryRegion
      ).then((data) => {
        setMacdResultDetails(data);
      });
    } else {
      API.getAccountMCADResult(
        state.setMcadData.searchtype,
        state.setMcadData.businessName,
        state.setMcadData.businessLevel,
        state.setMcadData.countryRegion
      ).then((data) => {
        setMacdResultDetails(data);
      });
    }
  };

  const onSearchClicked = () => {
    if (state.onShowParentLinkData) state.onShowParentLinkData = false;
    if (
      (state.setMcadData.businessName === null ||
        state.setMcadData.businessName === "") &&
      state.setMcadData.searchtype === "search_for_name"
    ) {
      state.isbusinessNameEmpty = true;
      showValidation();
    } else if (
      (state.setMcadData.businessName !== null ||
        state.setMcadData.businessName !== "") &&
      state.setMcadData.searchtype === "search_for_id" &&
      state.isAlphabet
    ) {
      showValidation();
    } else if (
      (state.setMcadData.businessLevel === null ||
        state.setMcadData.businessLevel === "0") &&
      state.setMcadData.searchtype === "search_for_name"
    ) {
      state.isBusinessLevelEmpty = true;
      showValidation();
    } else if (
      (state.setMcadData.businessLevelID === null ||
        state.setMcadData.businessLevelID === "0") &&
      state.setMcadData.searchtype === "search_for_id"
    ) {
      state.isBusinessLevelEmpty = true;
      showValidation();
    } else {
      onModalClose(true);
      getMCADDataDet();
      state.ondatatableVisible = true;
      state.onUltimateVisisble = true;
      setState({
        ...state,
        ondatatableVisible: state.ondatatableVisible,
      });
    }
  };

  const handleCheckedRight = () => {
    let count;

    if (!validateRowCount()) return;
    const secondTableData = { ...state.MCADlookupInfo };
    const selectedData = state.McadResult.McadResultList.filter(
      (data) => data.isSelected && !data.isMoved
    );
    for (count = 0; count < selectedData.length; count++) {
      if (!validateRowCount()) break;
      const check = isDuplicate(selectedData[count]);
      if (check) continue;
      else {
        selectedData[count].isMoved = selectedData[count].isSelected;
        secondTableData.mcadOracleDataList.push(selectedData[count]);
      }
    }

    setState({
      ...state,
      formChgStatus: true,
      onArrowBtnClicked: true,
      MCADlookupInfo: secondTableData,
      formChg: "Y",
    });
  };
  const validateRowCount = () => {
    const count = state.MCADlookupInfo.mcadOracleDataList.length;

    if (count >= state.maxMCADLink) {
      state.onshowModalError = true;
      setState({ ...state, onshowModalError: state.onshowModalError });
      return false;
    }

    return true;
  };
  const isDuplicate = (dataToMatch) => {
    let count;

    const srcBusName = dataToMatch.businessname;
    const secondTableData = state.MCADlookupInfo.mcadOracleDataList;
    for (count = 0; count < secondTableData.length; count++) {
      if (
        parseInt(secondTableData[count].businessid) ===
        parseInt(dataToMatch.businessid)
      ) {
        state.isDuplicateData = true;
        state.duplicateBusinessName = srcBusName;
        setState({
          ...state,
          isDuplicateData: state.isDuplicateData,
          duplicateBusinessName: srcBusName,
        });
        return true;
      }
    }
    return false;
  };
  const isSameBusinessLevel = (dataToMatch) => {
    let result = false;
    const secondTableData = state.MCADlookupInfo.mcadOracleDataList;
    secondTableData.map((data) => {
      if (
        parseInt(data.businesslevelcode) ===
        parseInt(dataToMatch.businesslevelcode)
      )
        result = true;
    });

    return result;
  };
  const autoSaveData = (callback) => {
    const data = [...state.MCADlookupInfo.mcadOracleDataList];

    let objDest = {};
    let outerkeysobj = 0;
    // @ts-ignore
    const arrObj = data.map((data) =>
      Object.keys(data).forEach((key) => {
        if (key === "businessid") {
          outerkeysobj = data[key];

          const pair = { [outerkeysobj]: data };

          objDest = { ...objDest, ...pair };
        }
      })
    );

    setState({ ...state, postDataResult: objDest });

    Object.keys(data).map((key) => {
      if (typeof data[key] == "boolean") {
        if (data[key]) {
          data[key] = "Y";
        }
      }
    });
    const accountrecid =
      state.accountrecid != null
        ? state.accountrecid
        : sessionStorage.getItem("accountsDataRecId");

    const period =
      state.period != 0
        ? state.period
        : sessionStorage.getItem("accountsDataPeriod");
    setLoader();
    API.updateMCADLookup(objDest, period, accountrecid, state.formChg).then(
      () => {
        resetLoader();
        callback();
      }
    );
  };
  const refreshMacdData = () => {
    let currentLevel = null;
    const accountRecId = state.accountrecid;
    const period = state.period;
    resetState();
    const stateData = { ...state };
    const MCADlookupInfo = stateData.MCADlookupInfo;

    API.getMCADData(accountRecId, period).then((data) => {
      MCADlookupInfo.accountInfo = data.accountInfo;
      MCADlookupInfo.mcadDropDowns = data.mcadDropDowns;
      MCADlookupInfo.mcadOracleDataList = [];

      if (data.mcadOracleDataList === "undefined") {
        MCADlookupInfo.mcadOracleDataList = [];
      } else {
        MCADlookupInfo.mcadOracleDataList = data.mcadOracleDataList;
      }
      if (
        data.mcadOracleDataList != null &&
        data.mcadOracleDataList.length > 0
      ) {
        currentLevel = getBusinesslevelDescription(
          data.mcadOracleDataList[0].businesslevelcode
        );
      }

      MCADlookupInfo.businessLevelDropDowns = state.businessLevelDropDowns;

      MCADlookupInfo.accountInfo.data = data.accountInfo;
      state.currentLevel = currentLevel;
      setState({
        ...state,
        MCADlookupInfo: MCADlookupInfo,
        isComplete: true,
        currentLevel: state.currentLevel,
        onShowParentLinkData: false,
      });
      resetLoader();
    });
  };

  const resetState = () => {
    const initialData = {
      searchtype: "search_for_name",
      businessName: null,
      businessLevel: null,
      businessLevelID: null,
      countryRegion: "US",
      ddnBusinessId: null,
      ddnbusinessID: null,
    };
    state.setMcadData = initialData;
    state.radio = "searchByName";
    state.isSearchFlag = true;
    state.McadResult.McadResultList = [];
    state.searchParent = false;
    state.ondatatableVisible = false;
    state.onShowParentLinkData = false;
    setState({
      ...state,
    });
  };

  function getBusinesslevelDescription(businesslevelcode: string) {
    let level = "";
    if (businesslevelcode != null) {
      if (businesslevelcode === "G") level = "Global";
      else if (businesslevelcode === "U") level = "Ultimate";
      else if (businesslevelcode === "P") level = "Parent";
    }
    return level;
  }

  const mcadlookupContext = {
    state,
    setState,
    refreshMacdData,
    handleDelete,
    handleToggle,
    setAccountData,
    showModal,
    onChange,
    setMcadAccountDetailsList,
    setMacdResultDetails,
    onSearchClicked,
    showMCADDataModel,
    showModalMcadAccount,
    showParentlinkData,
    onChangeData,
    showValidation,
    validate,
    getMCADDataDet,
    autoSaveData,
    returntoParent,
    showModalError,
    handleCheckedRight,
    noDataModal,
    resetState,
    validateRowCount,
    dupDataModal,
    isDuplicate,
    isSameBusinessLevel,
    getBusinesslevelDescription,
    mcadResultList,
    setMcadResultList,
    setLoader,
    resetLoader,
  };

  return (
    <McadlookupContext.Provider value={mcadlookupContext}>
      {props.children}
    </McadlookupContext.Provider>
  );
};

export const McadlookupContextConsumer = McadlookupContext.Consumer;
export default McadlookupContext;
