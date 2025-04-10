import React, { useState } from "react";

import API from "../service/API";
import Settings from "../static/settings";

const EdieProfileListContext = React.createContext({});
export const EdieProfileListContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    edieProfileListData: {
      edieProfileList: [
        {
          profile_id: null,
          profile_name: null,
        },
      ],
    },
    selectedprofile_name: {
      profile_id: null,
      profile_name: null,
    },
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    //activeTab:"EditProfileAdd",
  });

  const setEdieProfileListData = (data: any, closeModal?: boolean) => {
    const edieProfileListData = { ...state.edieProfileListData };
    edieProfileListData.edieProfileList = data;

    console.log("Datavalue", data);
    setState({
      ...state,
      edieProfileListData: edieProfileListData,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const onChange = (event) => {
    const profile_name = { ...state.selectedprofile_name };
    profile_name["profilenameid"] = event.target?.value;
    setState({ ...state, selectedprofile_name: profile_name });
  };

  const onChangeInput = (event) => {
    const profile_name = { ...state.selectedprofile_name };
    profile_name["profile_name"] = event.target.value;
    setState({ ...state, selectedprofile_name: profile_name });
  };

  const showModal = (data, closeModal?: boolean) => {
    let profile_name = { ...state.selectedprofile_name };

    data
      ? (profile_name = {
          profile_id: data.profilenameid,
          profile_name: data.profile_name,
        })
      : (profile_name = {
          profile_id: 0,
          profile_name: "",
        });

    setState({
      ...state,
      selectedprofile_name: profile_name,
      showModal: closeModal ? state.showModal : !state.showModal,
    });
  };

  const deleteProfile = (id: number) => {
    const result = confirm(Settings.confirmDelete);
    if (result) {
      //Logic to delete the item
      setIsLoading(true);
      API.deleteProfile(id).then((data) => {
        API.getEdieProfileList().then((data) => {
          setIsLoading(false);
          setEdieProfileListData(data);
        });
      });
    }
  };

  /* const switchTab = (event) => {
    setState({ ...state, activeTab: event.target.id });
  }; */
  const edieProfileListContext = {
    state,
    setState,
    showModal,
    onChange,
    onChangeInput,
    deleteProfile,
    setEdieProfileListData,
    isLoading,
    setIsLoading,
    //switchTab,
  };

  return (
    <EdieProfileListContext.Provider value={edieProfileListContext}>
      {props.children}
    </EdieProfileListContext.Provider>
  );
};

export const EdieProfileListContextConsumer = EdieProfileListContext.Consumer;
export default EdieProfileListContext;
