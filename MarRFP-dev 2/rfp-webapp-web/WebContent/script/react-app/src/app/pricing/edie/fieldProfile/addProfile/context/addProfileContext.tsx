import React, { useState } from "react";

import EdieProfile from "../content/Profile";
import { useHistory } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";

const AddProfileContext = React.createContext({});
export const AddProfileContextProvider = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    profileList: new Array<EdieProfile>(),
    selectedprofileid: -1,
    profileName: "",
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      selectedprofileid: event.target.value,
    });
  };

  const setProfileList = (data) => {
    const mntcData = { ...state.profileList };
    console.log(mntcData);
    API.getEdieProfileList().then((data) => {
      const blankProfile = new EdieProfile();
      blankProfile.profile_name = Settings.edieProfileAdd.blankProfile;
      blankProfile.profile_id = -1;
      data = [blankProfile].concat(data);
      setState({ ...state, profileList: data });
    });
  };

  const onChange = (event) => {
    setState({ ...state, profileName: event.target.value });
  };

  const saveProfile = () => {
    if (state.profileName === "") {
      alert(Settings.validation);
    } else {
      const nextURL = Settings.nextURL;
      API.saveProfile(state.selectedprofileid, state.profileName).then(
        (data) => {
          history.push({
            pathname: `${nextURL}/${data}`,
          });
          // window.location.href = `#${nextURL}/${data}`;
        }
      );
    }
  };

  const edieProfileAddContext = {
    state,
    setState,
    onChange,
    setProfileList,
    saveProfile,
    handleChange,
  };

  return (
    <AddProfileContext.Provider value={edieProfileAddContext}>
      {props.children}
    </AddProfileContext.Provider>
  );
};

export const AddProfileContextConsumer = AddProfileContext.Consumer;
export default AddProfileContext;
