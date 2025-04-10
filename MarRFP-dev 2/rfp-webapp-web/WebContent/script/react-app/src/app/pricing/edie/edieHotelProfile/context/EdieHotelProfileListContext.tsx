import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Settings from "../static/Settings";
//import Util from "../../../admin/utils/Utils";
import API from "../service/API";
// import Utils from "../../../../common/utils/Utils";
// import ReactDOM from "react-dom";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";

// Set state variables and function
interface IEdieHotelProfileContext {
  findFilterData: any;
  showFilterOptions: any;
  availData: any;
  selectData: any;
  availGridRows: any;
  selectedGridRows: any;
  showQuickSelectTop: boolean;
  showQuickSelectBottom: boolean;
  panelData: any;
  numItemsSelected?: any;
  numItems?: any;
  //selectedAccount: any;
  getFindFilterData: () => any;
  getShowFilterOptions: () => any;
  getEdieHotelProfileSelectionList: (
    requestPayload: any,
    orderBy?: number
  ) => void;
  deselectBtnClicked: (data: any, data2: any) => void;
  onChangeFieldValue: (
    data: any,
    data2: any,
    data3: any,
    data4: any,
    data5: any,
    data6: any
  ) => void;
  quickSelectTopSaved: (data: any, data2: any, data3: any) => void;
  quickSelectBottomSaved: (data: any, data2: any, data3: any) => void;
  quickSelectGrid1BtnClicked: (data: any) => void;
  quickSelectGrid2BtnClicked: (data: any) => void;
  selectBtnClicked: (data: any, data2: any) => void;
  selectAllBtnClicked: (data: any, data2: any) => void;
  unSelectBtnClicked: (data: any, data2: any) => void;
  unSelectAllBtnClicked: (data: any, data2: any) => void;
  handleOrderChange: (data: any, data2: any) => void;
  handleOrderChangeSelect: (data: any, data2: any) => void;
  getAvailList: (data: any) => void;
  getSelectList: (data: any) => void;
  isMakingRequest: boolean;
  setIsMakingRequest: (isRequest: boolean) => void;
  initialLoadAvail: any;
  initialLoadSelect: any;
}

const EdieHotelProfileListContext = React.createContext(
  {} as IEdieHotelProfileContext
);

const initialPayloadAvail = {
  edieHotelProfileAvailList: null,
  notfound: "",
  tempList: [],
};

const initialPayloadSelect = {
  edieHotelProfileSelectedlList: null,
};

export const EdieHotelProfileListContextProvider = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    edieHotelProfileListData: {
      edieHotelProfileList: [],
    },
    addProfile: {
      profile_name: "",
    },
    updatedEdieHotelProfileList: [],
    selectedHotelAccount: {
      profile_id: null,
      profile_name: "",
    },
  });
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [findFilterData, setFindFilter] = useState([]);
  const [availData, setAvailData] = useState(initialPayloadAvail);
  const [selectData, setSelectData] = useState(initialPayloadSelect);
  const [availGridRows, setAvailGridRows] = useState([]);
  const [selectedGridRows, setSelectedGridRows] = useState([]);
  const [showQuickSelectTop, setShowQuickSelectTop] = useState(false);
  const [showQuickSelectBottom, setShowQuickSelectBottom] = useState(false);
  const [panelData, setPanelData] = useState({});
  const [numItemsSelected, setNumItemsSelected] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [initialLoadAvail, setinitialLoadAvail] = useState(true);
  const [initialLoadSelect, setinitialLoadSelect] = useState(true);
  const [prevSelAvailRow, setPrevSelAvailRow] = useState();
  const [prevSelSelecRow, setPrevSelSelecRow] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // set  list data after fetching from API
  const setEdieHotelProfileListData = (data: any) => {
    data &&
      setState((prevState) => ({
        ...prevState,
        edieHotelProfileListData: {
          ...prevState.edieHotelProfileListData,
          edieHotelProfileList: data,
        },
      }));
  };

  const deleteProfile = (profile_id) => {
    const result = confirm("Are you sure you want to delete this profile?");
    if (result) {
      //Logic to delete the item
      setIsLoading(true);
      API.deleteProfile(profile_id).then((res) => {
        if (res == "success") {
          //get the latest data
          API.getEdieHotelProfiles().then((data) => {
            setEdieHotelProfileListData(data);
            setIsLoading(false);
          });
        }
      });
    }
  };

  const updateSelectedHotelProfile = (profile_id, profile_name) => {
    const selectedHotelAccount = { ...state.selectedHotelAccount };
    selectedHotelAccount.profile_id = profile_id;
    selectedHotelAccount.profile_name = profile_name;

    setState((prevState) => ({
      ...prevState,
      selectedHotelAccount: selectedHotelAccount,
    }));
  };

  const addProfile = (e) => {
    const addProfile = { ...state.addProfile };

    const profile_name = addProfile.profile_name.trim();
    if (profile_name.length > 0) {
      API.addProfile(addProfile.profile_name).then((res) => {
        API.getEdieHotelProfiles().then((data) => {
          setEdieHotelProfileListData(data);
          const profile = data.find((d) => d.profile_name === profile_name);
          updateSelectedHotelProfile(profile.profile_id, profile_name);

          history.push({
            pathname: `${Settings.edieHotelProfileList.edieHotelProfileViewPath}/${profile.profile_id}/${profile.profile_name}`,
          });

          // window.location.href = `#${Settings.edieHotelProfileList.edieHotelProfileViewPath}/${profile.profile_id}/${profile.profile_name}`;
        });
      });
    } else {
      alert("Please enter a profile name");
      e.preventDefault();
    }
  };

  const updateProfileName = () => {
    const updatedEdieHotelProfileList = [...state.updatedEdieHotelProfileList];
    const params = {
      formChg: "Y",
      strEdieHotelProfileList: JSON.stringify(updatedEdieHotelProfileList),
    };

    API.updateProfileName(params).then((res) => {
      if (res == "success") {
        history.push({
          pathname: `${Settings.edieHotelProfileList.editediehotelprofile}`,
        });
      }
    });
  };

  const onAddProfileChange = (event) => {
    const { value } = event.target;
    const addProfile = { ...state.addProfile };
    addProfile.profile_name = value;
    setState({ ...state, addProfile: addProfile });
  };

  const onGridProfileNameEdit = (event) => {
    const { id, value } = event.target;
    let update = false;

    const updatedEdieHotelProfileList = state.updatedEdieHotelProfileList.map(
      (item) => {
        if (item.profile_id == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            profile_name: value,
          };
          update = true;
          return updatedItem;
        }
        return item;
      }
    );

    if (update) {
      setState((prevState) => ({
        ...prevState,
        updatedEdieHotelProfileList: updatedEdieHotelProfileList,
      }));
    } else {
      addItemupdatedEdieHotelProfileList(id, value);
    }

    //update grid values
    const gridValueUpdate =
      state.edieHotelProfileListData.edieHotelProfileList.map((item) => {
        if (item.profile_id == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            profile_name: value,
          };
          return updatedItem;
        }
        return item;
      });

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        edieHotelProfileListData: {
          ...prevState.edieHotelProfileListData,
          edieHotelProfileList: gridValueUpdate,
        },
      }));
    }
  };

  const addItemupdatedEdieHotelProfileList = (id, value) => {
    const updatedEdieHotelProfileList =
      state.updatedEdieHotelProfileList.concat({
        profile_id: parseInt(id),
        changed: "Y",
        profile_name: value,
      });

    setState((prevState) => ({
      ...prevState,
      updatedEdieHotelProfileList: updatedEdieHotelProfileList,
    }));
  };

  const getEdieHotelProfileSelectionList = (param) => {
    setPanelData(param);
    getAvailList(param);
    getSelectList(param);
  };

  const getFindFilterData = () => {
    API.getEdieHotelProfileFindFilter().then((data) => {
      setFindFilter(data);
    });
  };

  const getShowFilterOptions = () => {
    API.showFilterOptions().then((data) => {
      setShowFilterOptions(data);
    });
  };

  // Set API Data for grids's
  const setAPIData = (data: any, type) => {
    if (data && type) {
      if (type == Settings.hotelProfileAvail.getHotelProfileAvail) {
        if (data.length > 0) {
          const newData = [];
          data.map((element) => {
            newData.push({
              marshacode: element.marshaCode,
              hotelname: element.hotelName,
              city: element.city,
              state: element.state,
              country: element.country,
              hotelid: element.hotelid,
            });
          });
          data = newData;
        }

        setAvailGridRows([]);
        setAvailData({
          ...availData,
          edieHotelProfileAvailList: data,
          notfound: data.notfound,
          tempList: data.tempList,
        });
        setNumItems(data.length);
      } else if (type == Settings.hotelProfileAvail.getHotelProfileSelect) {
        const newDataSelectedList = [];
        if (data.length > 0) {
          data.map((element) => {
            newDataSelectedList.push({
              marshacode: element.marshaCode,
              hotelname: element.hotelName,
              city: element.city,
              state: element.state,
              country: element.country,
              hotelid: element.hotelid,
            });
          });

          data = newDataSelectedList;
        }

        setSelectedGridRows([]);
        setSelectData({
          ...selectData,
          edieHotelProfileSelectedlList: data,
        });
        setNumItemsSelected(data.length);
      }
    }
  };

  const getAvailList = (param) => {
    setIsMakingRequest(true);

    API.getHotelProfileAvail(param, state.selectedHotelAccount.profile_id).then(
      (data) => {
        setinitialLoadAvail(false);
        setIsMakingRequest(false);
        setAPIData(data, Settings.hotelProfileAvail.getHotelProfileAvail);
      }
    );
  };

  const getSelectList = (param) => {
    setIsMakingRequest(true);

    API.getHotelProfileSelect(
      param,
      state.selectedHotelAccount.profile_id
    ).then((data) => {
      setIsMakingRequest(false);
      setinitialLoadSelect(false);
      setAPIData(data, Settings.hotelProfileAvail.getHotelProfileSelect);
    });
  };

  const onChangeFieldValue = (
    rowData,
    field,
    param,
    data,
    selectedRows,
    event
  ) => {
    const { checked } = event.target;
    let selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
      field,
      checked,
      selectedRows,
      rowData.hotelid
    );

    if (param == Settings.availableValue) {
      if (checked) {
        setPrevSelAvailRow(rowData.hotelid);
        if (prevSelAvailRow && event.nativeEvent.shiftKey) {
          const prevIndex = data.edieHotelProfileAvailList.findIndex(
            (item) => item.hotelid == prevSelAvailRow
          );
          const currentSelIndex = data.edieHotelProfileAvailList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if(prevIndex < currentSelIndex){
            for (let i = prevIndex + 1; i <= currentSelIndex; i++) {
              data.edieHotelProfileAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.edieHotelProfileAvailList[i].hotelid
              );
            }
          } else {
            for (let i = currentSelIndex; i < prevIndex; i++) {
              data.edieHotelProfileAvailList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.edieHotelProfileAvailList[i].hotelid
              );
            } 
          }
        } else {
          data.edieHotelProfileAvailList.find(
            (item) => item.hotelid == rowData.hotelid
          ).hotelid_checkbox = checked;
        }
      } else {
        data.edieHotelProfileAvailList.find(
          (item) => item.hotelid == rowData.hotelid
        ).hotelid_checkbox = checked;
      }
      setAvailGridRows(selectedArr);
      setAvailData({ ...data });
    }

    if (param == Settings.selectedValue) {
      if (checked) {
        setPrevSelSelecRow(rowData.hotelid);
        if (prevSelSelecRow && event.nativeEvent.shiftKey) {
          const prevIndex = data.edieHotelProfileSelectedlList.findIndex(
            (item) => item.hotelid == prevSelSelecRow
          );
          const currentSelIndex = data.edieHotelProfileSelectedlList.findIndex(
            (item) => item.hotelid == rowData.hotelid
          );
          if(prevIndex < currentSelIndex){
            for (let i = prevIndex + 1; i <= currentSelIndex; i++) {
              data.edieHotelProfileSelectedlList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.edieHotelProfileSelectedlList[i].hotelid
              );
            }
          } else {
            for (let i = currentSelIndex; i < prevIndex; i++) {
              data.edieHotelProfileSelectedlList[i].hotelid_checkbox = checked;
              selectedArr = FilteredGridSelectUtils.getSelectedCheckboxValue(
                field,
                checked,
                selectedRows,
                data.edieHotelProfileSelectedlList[i].hotelid
              );
            }
          }
        } else {
          data.edieHotelProfileSelectedlList.find(
            (item) => item.hotelid == rowData.hotelid
          ).hotelid_checkbox = checked;
        }
      } else {
        data.edieHotelProfileSelectedlList.find(
          (item) => item.hotelid == rowData.hotelid
        ).hotelid_checkbox = checked;
      }
      setSelectedGridRows(selectedArr);
      setSelectData({ ...data });
    }
  };

  const selectBtnClicked = (param, availGridArray) => {
    if (availGridArray.length > 0) {
      API.setEdieHotelProfileAvailUpdate(
        param,
        availGridArray,
        state.selectedHotelAccount.profile_id
      ).then((data) => {
        if (data == Settings.success) {
          getAvailList(param);
          getSelectList(param);
        }
      });
    }
  };

  const unSelectBtnClicked = (param, selectArray) => {
    const selectedArray = selectArray.edieHotelProfileSelectedlList
      .filter((item) => item.hotelid_checkbox == true)
      .map((item) => item.hotelid);

    API.setEdieHotelProfileselectUpdate(
      param,
      selectedArray,
      state.selectedHotelAccount.profile_id
    ).then((data) => {
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  const selectAllBtnClicked = (param, availArray) => {
    const selectedArray = availArray.edieHotelProfileAvailList.map(
      (item) => item.hotelid
    );
    selectBtnClicked(param, selectedArray);
  };

  const unSelectAllBtnClicked = (param, selectArray) => {
    const selectedArray = selectArray.edieHotelProfileSelectedlList.map(
      (item) => item.hotelid
    );

    API.setEdieHotelProfileselectUpdate(
      param,
      selectedArray,
      state.selectedHotelAccount.profile_id
    ).then((data) => {
      if (data == Settings.success) {
        getAvailList(param);
        getSelectList(param);
      }
    });
  };

  const quickSelectGrid1BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setShowQuickSelectTop(value);
  };

  const quickSelectGrid2BtnClicked = (closeModal?: boolean) => {
    const value = closeModal ? !showQuickSelectBottom : showQuickSelectBottom;
    setShowQuickSelectBottom(value);
  };

  const deselectBtnClicked = (param, availGridRowArray) => {
    const data = param;
    const newData = FilteredGridSelectUtils.setCheckox(
      data.edieHotelProfileAvailList,
      availGridRowArray,
      false
    );
    data.edieHotelProfileAvailList = newData;
    setAvailGridRows([]);
    setAvailData(data);
  };

  const quickSelectTopSaved = (param, availgridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        availgridRows.push(element.hotelid);
      });
      setAvailGridRows(availgridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.edieHotelProfileAvailList,
        availgridRows,
        true
      );
      data.edieHotelProfileAvailList = newData;
      setAvailData(data);
    }
    quickSelectGrid1BtnClicked(true);
  };

  const quickSelectBottomSaved = (param, selectGridRows, data) => {
    if (param.length > 0) {
      param.forEach((element) => {
        selectGridRows.push(element.hotelid);
      });
      setSelectedGridRows(selectGridRows);
      const newData = FilteredGridSelectUtils.setCheckox(
        data.edieHotelProfileAvailList,
        selectGridRows,
        true
      );
      data.edieHotelProfileAvailList = newData;
      setSelectData(data);
    }
    quickSelectGrid2BtnClicked(true);
  };

  const handleOrderChange = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setPanelData({ ...paneldata });
    getAvailList(paneldata);
  };

  const handleOrderChangeSelect = (paneldata, param) => {
    paneldata.strFilterValues.orderBy = param - 1;

    setPanelData({ ...paneldata });
    getSelectList(paneldata);
  };

  const edieHotelProfileListContext = {
    state,
    setState,
    setEdieHotelProfileListData,
    deleteProfile,
    addProfile,
    onAddProfileChange,
    updateProfileName,
    onGridProfileNameEdit,
    findFilterData,
    showFilterOptions,
    availData,
    selectData,
    availGridRows,
    selectedGridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    panelData,
    numItemsSelected,
    numItems,
    getFindFilterData,
    getShowFilterOptions,
    getEdieHotelProfileSelectionList,
    deselectBtnClicked,
    onChangeFieldValue,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    setShowQuickSelectTop,
    setShowQuickSelectBottom,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    selectBtnClicked,
    selectAllBtnClicked,
    unSelectBtnClicked,
    unSelectAllBtnClicked,
    handleOrderChange,
    handleOrderChangeSelect,
    updateSelectedHotelProfile,
    getAvailList,
    getSelectList,
    isMakingRequest,
    setIsMakingRequest,
    initialLoadAvail,
    initialLoadSelect,
    isLoading,
    setIsLoading,
  };

  return (
    <EdieHotelProfileListContext.Provider value={edieHotelProfileListContext}>
      {props.children}
    </EdieHotelProfileListContext.Provider>
  );
};

export const EdieHotelProfileListContextConsumer =
  EdieHotelProfileListContext.Consumer;
export default EdieHotelProfileListContext;
