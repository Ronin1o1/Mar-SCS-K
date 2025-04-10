import React, { useState, useEffect } from "react";
import Settings from "../static/Settings";
import Util from "../../../admin/utils/Utils";
import API from "../service/API";
//import Utils from "../../../../common/utils/Utils";

const EDIEColumnDescriptionContext = React.createContext({});

export const EDIEColumnDescriptionContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialEDIEColumnDescData, setInitialEDIEColumnDescData] = useState({
    EDIEColumnDescData: { data: [] },
  });
  const [state, setState] = useState({
    setEDIEColumnDescData: {
      data: [
        {
          column_id: null,
          column_name: null,
          column_label: null,
          column_seq: 0,
          column_order: null,
          column_desc: null,
          epic_path: null,
          logic: null,
          column_hasDesc: null,
          changed: null,
        },
      ],
    },
    setEDIEColumnDescDataFilteredValue: {
      data: [],
    },

    isComplete: false,
    radio: "c_1",
    onSpinner: false,
    searchedEDIECol: {
      c_1: "c_1",
      seqfind: "",
      colfind: "",
      seqfind1: "",
    },

    setEDIEColumnDescDataValue: {
      column_id: null,
      column_name: null,
      column_label: null,
      column_seq: 0,
      column_order: null,
      column_desc: null,
      epic_path: null,
      logic: null,
      column_hasDesc: null,
      changed: null,
    },
    filteredUpdatedValue: [],
    isAlphabet: false,
    dataNotFound: false,
    finalFilteredData: [],
    SelectedValue: null,
    isShowAllAccounts: true,
    isStringSearch: false,
    isSpecialCharacter: false,
    isSeqSelected: false,
    c_1: "ALL",
    dataFiltered: false,
    findSeq: null,
  });

  const setEdieColumnDescription = (data: any) => {};

  const edieChangeHandler = (event) => {
    const searchedEDIEColData = { ...state.searchedEDIECol };

    if (
      searchedEDIEColData.colfind != null &&
      searchedEDIEColData.colfind != ""
    ) {
      state.isStringSearch = true;
      state.isShowAllAccounts = false;
    }

    const { type, id, value } = event.target;
    if (type === "radio" && value === "ALL") {
      searchedEDIEColData.colfind = "";
      searchedEDIEColData.seqfind = "";
      state.radio = "c_1";
      state.searchedEDIECol.c_1 = "c_1";
      state.isShowAllAccounts = true;
      state.isStringSearch = false;
    } else if (type === "radio" && value === "FILTER") {
      state.radio = "c_2";
      state.searchedEDIECol.c_1 = "c_2";
      state.isShowAllAccounts = false;
      state.isStringSearch = true;
    }
    if (type === "text" && id === "colfind") {
      if (Util.toggleInputRadio(event)) {
        searchedEDIEColData.colfind = value;
        searchedEDIEColData.seqfind = "";
        state.radio = "c_2";
        state.isShowAllAccounts = false;
        state.isStringSearch = true;
      }
    }
    if (type === "text" && id === "seqfind") {
      state.radio = "c_1";
      searchedEDIEColData.colfind = "";
      searchedEDIEColData.seqfind = value;
      state.isShowAllAccounts = false;
      state.isStringSearch = true;
      state.isSeqSelected = false;
    }
    setState({ ...state, searchedEDIECol: searchedEDIEColData });
  };

  let prevSearchElement = null;
  let currSearchElement = null;

  const onSearchBtnClicked = () => {
    state.findSeq = "";
    let isFound = false;

    if (
      state.searchedEDIECol.seqfind !== null &&
      state.searchedEDIECol.seqfind !== "" &&
      state.searchedEDIECol.colfind === ""
    ) {
      state.radio = "c_1";

      if (state.searchedEDIECol.seqfind !== "") {
        state.findSeq = state.searchedEDIECol.seqfind;

        const findeEdieData = initialEDIEColumnDescData.data.filter((data) => {
          if (document.getElementById(`row${data.column_seq}`)) {
            document.getElementById(`row${data.column_seq}`).style[
              "backgroundColor"
            ] = "transparent";
          }
          if (data.column_seq == parseInt(state.searchedEDIECol.seqfind)) {
            isFound = true;

            currSearchElement = document.getElementById(
              `row${data.column_seq}`
            );
            if (
              currSearchElement !== undefined &&
              currSearchElement != prevSearchElement
            ) {
              currSearchElement?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              prevSearchElement = currSearchElement;
              currSearchElement.style["backgroundColor"] = "#b6d3f3";
            }
            return data;
          }
        });
        if (isFound === false) {
          // alert(
          //   `${'"'}${state.searchedEDIECol.seqfind}${'" '}${
          //     Settings.edieColumnDesc.alertmessage
          //   }`
          // );
          console.log("not found");
        } else {
          state.setEDIEColumnDescData.data = findeEdieData;

          setState({
            ...state,
            setEDIEColumnDescData: state.setEDIEColumnDescData,
          });
        }
      }

      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      const isnum = /^\d+$/.test(state.searchedEDIECol.seqfind);

      if (format.test(state.searchedEDIECol.seqfind)) {
        state.isSpecialCharacter = true;
        alert(
          `${'"'}${state.searchedEDIECol.seqfind}${'" '}${
            Settings.edieColumnDesc.alertmessage
          }`
        );
      } else if (!isnum) {
        state.isAlphabet = true;
        alert(
          `${'"'}${state.searchedEDIECol.seqfind}${'" '}${
            Settings.edieColumnDesc.alertmessage
          }`
        );
      } else {
        state.isAlphabet = false;
      }
      if (isFound === false && isnum) {
        alert(
          `${'"'}${state.searchedEDIECol.seqfind}${'" '}${
            Settings.edieColumnDesc.alertmessage
          }`
        );
      }

      const newState = { ...state };
      newState.isSeqSelected = true;
      state.isSeqSelected = true;

      setState({ ...state, isSeqSelected: true });
    } else {
      if (state.searchedEDIECol.colfind == "") {
        state.radio = "c_1";
      }
      setIsLoading(true);
      API.OnSearch(state.searchedEDIECol.colfind).then((data) => {
        state.setEDIEColumnDescData.data = data;

        state.gridHeight = "100%";

        setState({
          ...state,
          setEDIEColumnDescData: state.setEDIEColumnDescData,
        });
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      const container = document.getElementsByClassName("ediecolumndescripton");
      if (container && container[0]) {
        container[0].scrollTop = 0;
      }
    }
  }, [isLoading]);

  const onUpdateBtnClicked = () => {
    const filteredData = { ...state.setEDIEColumnDescDataFilteredValue.data };
    if (state.dataFiltered === false) {
      for (const key in filteredData) {
        if (key.indexOf("column_name") === -1) {
          delete filteredData[key].column_name;
        }
        if (key.indexOf("column_id") === -1) {
          delete filteredData[key].column_id;
        }

        if (key.indexOf("column_order") === -1) {
          delete filteredData[key].column_order;
        }
        if (key.indexOf("column_hasDesc") === -1) {
          delete filteredData[key].column_hasDesc;
        }
        state.filteredUpdatedValue.push(filteredData);
      }
      state.dataFiltered = true;
    }

    if (state.searchedEDIECol.c_1 === "c_1") {
      state.c_1 = Settings.edieColumnDesc.All;
    } else {
      state.c_1 = Settings.edieColumnDesc.Filter;
    }

    const seqfind = state.searchedEDIECol.seqfind;
    const colfind = state.searchedEDIECol.colfind;
    const formChg = Settings.edieColumnDesc.formChg;

    const prevSearch = Settings.edieColumnDesc.All;
    setIsLoading(true);

    API.onUpdateEDIEData(
      state.c_1,
      seqfind,
      colfind,
      formChg,
      prevSearch,
      state.filteredUpdatedValue[0]
    ).then((data) => {
      setIsLoading(false);
    });
  };

  const handleChange = (event, rowdata) => {
    const id = event.target.id;
    const value = event.target.value;

    const setEDIEColumnDescData = [...state.setEDIEColumnDescData.data];

    if (id === Settings.edieColumnDesc.tableColumns.epicPath.id) {
      setEDIEColumnDescData.map((data) => {
        if (rowdata.column_seq === data.column_seq) {
          data.epic_path = value;
          data.changed = "Y";
        }
      });
    }
    if (id === Settings.edieColumnDesc.tableColumns.edieLogic.id) {
      setEDIEColumnDescData.map((data) => {
        if (rowdata.column_seq === data.column_seq) {
          data.logic = value;
          data.changed = "Y";
        }
      });
    }
    if (id === Settings.edieColumnDesc.tableColumns.ediedescription.id) {
      setEDIEColumnDescData.map((data) => {
        if (rowdata.column_seq === data.column_seq) {
          data.column_desc = value;
          data.changed = "Y";
        }
      });
    }
    state.setEDIEColumnDescData.data = setEDIEColumnDescData;

    setState({ ...state, setEDIEColumnDescData: state.setEDIEColumnDescData });
  };

  const edieColumnDescContext = {
    state,
    setState,
    setEdieColumnDescription,
    edieChangeHandler,
    onSearchBtnClicked,
    handleChange,
    onUpdateBtnClicked,
    isLoading,
    setIsLoading,
    initialEDIEColumnDescData,
    setInitialEDIEColumnDescData,
  };

  return (
    <EDIEColumnDescriptionContext.Provider value={edieColumnDescContext}>
      {props.children}
    </EDIEColumnDescriptionContext.Provider>
  );
};
export const EDIEColumnDescriptionContextConsumer =
  EDIEColumnDescriptionContext.Consumer;
export default EDIEColumnDescriptionContext;
