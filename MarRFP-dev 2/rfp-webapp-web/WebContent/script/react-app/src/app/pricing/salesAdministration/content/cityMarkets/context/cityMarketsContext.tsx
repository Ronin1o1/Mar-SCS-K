import React, { useEffect, useState } from "react";
import { IAccMarkets } from "../interfaces/IAccMarkets";
import API from "../service/API";
import Settings from "../static/Settings";

const CityMarketsContext = React.createContext({});

interface IMarketContextState {
  showScreenLoader: boolean;
  params: {
    accrecid: string;
    year: string;
    accname: string;
  };
  showImportMarket: {
    isOpen: boolean;
    type: string;
    seqId: number;
  };
  showEditMarket: {
    isOpen: false;
    type: string;
    seqId: number;
  };
  showAddDisabled: {
    isOpen: false;
    type: string;
    message: string;
  };
  accMarkets: IAccMarkets;
  locations: any;
  sorting: {
    sortByInter: number;
    sortByUS: number;
  };
}

export const CityMarketsContextProvider = (props): JSX.Element => {
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [state, setState] = useState({
    showScreenLoader: false,
    fileName: null,
    params: {
      accrecid: "",
      year: "",
      accname: "",
    },
    showImportMarket: {
      isOpen: false,
      type: "",
      seqId: -2,
    },
    showEditMarket: {
      isOpen: false,
      type: "",
      seqId: -2,
    },
    showAddDisabled: {
      isOpen: false,
      type: "",
    },
    accMarkets: {},
    locations: {},
    //sorting must be re-integrated into accMarkets before update call
    //This avoids having to call the updateMarkets api endpoint every time the sorting is changed
    sorting: {
      sortByInter: "0",
      sortByUS: "0",
    },
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setParams = (accrecid, year, accname) => {
    setState({
      ...state,
      params: { accrecid: accrecid, year: year, accname: accname },
    });
  };

  const setAccMarkets = (type, value) => {
    setState((prevState) => {
      prevState.accMarkets[type] = value;
      return { ...prevState };
    });
  };

  const toggleShowEditMarket = (seqid?, marketType?) => {
    setState((prevState) => {
      prevState.showEditMarket.isOpen = !prevState.showEditMarket.isOpen;
      prevState.showEditMarket.type = marketType ? marketType : "";
      prevState.showEditMarket.seqId = seqid ? seqid : -1;

      return { ...prevState };
    });
  };

  const toggleShowAddDisabled = (marketType, alert) => {
    if (alert == null || alert === "") {
      alert =
        Settings.alert.addDisabled1 +
        " " +
        (marketType == "US" ? "US Markets" : "International Markets") +
        " " +
        Settings.alert.addDisabled2;
    }
    setState((prevState) => {
      prevState.showAddDisabled.isOpen = !prevState.showAddDisabled.isOpen;
      prevState.showAddDisabled.type = marketType ? marketType : "";
      prevState.showAddDisabled.message = alert;

      return { ...prevState };
    });
  };

  const getAccMarkets = async (
    accountrecid: number,
    accountname: string,
    year: number
  ) => {
    const marketData = await API.getAccMarkets(accountrecid, accountname, year);
    setlastUpdateDateValue(marketData.lastupdatedate);
    setState((prevState) => {
      prevState.accMarkets = marketData;
      prevState.sorting = {
        sortByInter: marketData.sortByInter,
        sortByUS: marketData.sortByUS,
      };
      return { ...prevState };
    });
  };

  const getAccMarketsSorted = async (
    accountrecid: string,
    accountname: string,
    year: string
  ) => {
    const sortedMarketData = await API.getAccMarketsSorted(
      accountrecid,
      accountname,
      year,
      state.sorting.sortByUS,
      state.sorting.sortByInter
    );
    setState((prevState) => {
      prevState.accMarkets = sortedMarketData;
      return { ...prevState };
    });
    return sortedMarketData;
  };

  const deleteMarket = async (recid, marketType) => {
    if (confirm(Settings.delete)) {
      await API.deleteMarket(recid, marketType, state.params.accrecid);
      getAccMarketsSorted(
        state.params.accrecid,
        state.params.accname,
        state.params.year
      );
      // toggleShowEditMarket();
    }
  };

  const deleteMarketModal = async (recid, marketType) => {
    if (confirm(Settings.delete)) {
      await API.deleteMarket(recid, marketType, state.params.accrecid);
      getAccMarketsSorted(
        state.params.accrecid,
        state.params.accname,
        state.params.year
      );
      toggleShowEditMarket();
    }
  };

  const updateMarket = async (recid, marketType, strAccmarket) => {
    if (strAccmarket.marketname == null || strAccmarket.marketname === "") {
      toggleShowAddDisabled(marketType, Settings.alert.marketname);
      return false;
    } else if (
      strAccmarket.curractivity != null &&
      strAccmarket.curractivity.length > 1024
    ) {
      toggleShowAddDisabled(marketType, Settings.alert.curractivity);
      return false;
    } else if (
      strAccmarket.marketpotentialrn == null ||
      strAccmarket.marketpotentialrn === ""
    ) {
      toggleShowAddDisabled(marketType, Settings.alert.marketpotentialrn);
      return false;
    } else if (strAccmarket.notes != null && strAccmarket.notes.length > 1024) {
      toggleShowAddDisabled(marketType, Settings.alert.notes);
      return false;
    } else if (
      marketType == "US" &&
      (strAccmarket.market_state == null || strAccmarket.market_state === "")
    ) {
      toggleShowAddDisabled(marketType, Settings.alert.state);
      return false;
    } else if (
      marketType != "US" &&
      (strAccmarket.market_country == null ||
        strAccmarket.market_country === "")
    ) {
      toggleShowAddDisabled(marketType, Settings.alert.country);
      return false;
    }

    const res = await API.updateMarket(
      recid,
      marketType,
      state.params.accrecid,
      state.params.year,
      strAccmarket
    );
    if (recid == 0) {
      toggleShowEditMarket(0, marketType);
    }

    if (res.data == "Duplicate") {
      alert(Settings.alert.marketExist);
    }
    getAccMarketsSorted(
      state.params.accrecid,
      state.params.accname,
      state.params.year
    );
  };

  const deleteAllMarkets = async (marketURL) => {
    await API.deleteAllMarkets(
      marketURL,
      state.params.year,
      state.params.accrecid,
      state.params.accname
    );
    getAccMarketsSorted(
      state.params.accrecid,
      state.params.accname,
      state.params.year
    );
  };

  const downloadInstruction = async (marketType) => {
    if (marketType == "US-Instruction") {
      await API.downloadInstruction(marketType);
    } else {
      await API.downloadInstructionInt(marketType);
    }
  };

  const downloadTemplate = async (marketType) => {
    if (marketType == "US") {
      await API.downloadTemplate(marketType);
    } else {
      await API.downloadTemplateInt(marketType);
    }
  };
  const exportTemplate = async (marketType) => {
    if (marketType == "US") {
      await API.exportTemplate(marketType, state.params.accrecid);
    } else {
      await API.exportTemplateInt(marketType, state.params.accrecid);
    }
  };

  const importTemplate = async (marketType) => {
    setState((prevState) => {
      prevState.showImportMarket.isOpen = !prevState.showImportMarket.isOpen;
      prevState.showImportMarket.type = marketType ? marketType : "";

      return { ...prevState };
    });

    setState({ ...state, fileName: null });
  };

  const getLocationOptions = async (recid, us_market, seqid) => {
    const locations = await API.getLocations(recid, us_market, seqid);
    setState({ ...state, locations: locations });
  };

  const validateExcel = (file: any, marketType) => {
    if (file != null) {
      const fileName = file.name;
      if (fileName != "") {
        const file_ext = fileName.split(".").pop();
        if (file_ext != "csv") {
          alert(Settings.alert.csvAlert);
          return false;
        }

        if (fileName.indexOf(marketType) == -1) {
          alert(Settings.alert.nameAlert);
          return false;
        }

        return true;
      }
    } else {
      alert(Settings.alert.missingFile);
      return false;
    }
  };

  const fileHandleClick = (file: any) => {
    if (file == undefined || file == null) {
      setState({ ...state, fileName: null });
    }
  };

  const onFileUpload = (file: any, marketType) => {
    const accountrecid = 0;
    if (file != null) {
      setState({ ...state, fileName: file });
    } else if (file == null && state.fileName != null) {
      file = state.fileName;
    }
    if (validateExcel(file, marketType)) {
      setShowScreenLoader(true);
      API.importExcelData(
        file,
        state.params.accrecid,
        state.params.accname,
        state.params.year,
        marketType
      )
        .then((data) => {
          if (data != "") {
            alert(data);
            // getAccMarketsSorted(
            //   state.params.accrecid,
            //   state.params.accname,
            //   state.params.year
            // );
            setShowScreenLoader(false);
          } else {
            setState({
              ...state,
              showImportMarket: { isOpen: false, type: "", seqId: -2 },
            });
            getAccMarketsSorted(
              state.params.accrecid,
              state.params.accname,
              state.params.year
            );
            setShowScreenLoader(false);
          }
        })
        .catch((error) => {
          importTemplate(marketType);
          alert("error in file upload");
        });
    }
  };

  useEffect(() => {
    if (state.params.accrecid) {
      let us_market = "N";
      if (state.showEditMarket?.type == "US") {
        us_market = "Y";
      }
      getLocationOptions(
        state.params.accrecid,
        us_market,
        state.showEditMarket.seqId
      ); //TODO: fix with correct params
    }
  }, [state.params]);

  const cityMarketsContext = {
    state,
    setState,
    toggleShowEditMarket,
    getAccMarkets,
    getAccMarketsSorted,
    updateMarket,
    deleteMarket,
    deleteMarketModal,
    deleteAllMarkets,
    downloadInstruction,
    downloadTemplate,
    importTemplate,
    exportTemplate,
    setParams,
    getLocationOptions,
    setAccMarkets,
    onFileUpload,
    toggleShowAddDisabled,
    lastUpdateDateValue,
    fileHandleClick,
    setLoader,
  };

  return (
    <CityMarketsContext.Provider value={cityMarketsContext}>
      {props.children}
    </CityMarketsContext.Provider>
  );
};

export const CityMarketsContextConsumer = CityMarketsContext.Consumer;
export default CityMarketsContext;

export interface ICityMarketsContext {
  state: IMarketContextState;
  setState;
  setAccMarkets;
  setParams;
  getAccMarkets;
  getAccMarketsSorted;
  updateMarket;
  deleteMarket;
  deleteMarketModal;
  deleteAllMarkets;
  downloadInstruction;
  downloadTemplate;
  importTemplate;
  exportTemplate;
  toggleShowEditMarket;
  getLocationOptions;
  onFileUpload;
  toggleShowAddDisabled;
  lastUpdateDateValue;
  fileHandleClick;
  setLoader;
}
