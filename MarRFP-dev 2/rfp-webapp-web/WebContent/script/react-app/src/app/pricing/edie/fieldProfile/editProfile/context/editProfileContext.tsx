import React, { useState } from "react";
import { IProfile } from "../content/interfaces/IProfile";
import Profile from "../content/models/Profile";

import API from "../service/API";
import Settings from "../static/Settings";

const EditProfileContext = React.createContext({});
export const EditProfileContextProvider = (props) => {
  const [state, setState] = useState({
    edieNumber: null,
    labelSearch: null,
    profile: new Profile(),
    isValid: true,
    validationMessage: "",
    profileId: 0,
    showQuickSelect: false,
    showValidationMessage: true,
  });

  const [searchTerms, setSearchTerms] = useState({
    showAllColumns: true,
    colSearchString: null,
    seqSearchString: null,
  });
  const [profileId, setProfileId] = useState(0);

  const [columnDesc, setColumnDesc] = useState("");

  const [tooltipCoordinates, setTooltipCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const getProfileData = (profile_id) => {
    setIsLoading(true);
    setProfileId(profile_id);
    API.getProfileDetails(profile_id).then((data) => {
      const profileDetailsResponse: IProfile = data;
      const profile = new Profile(profileDetailsResponse);

      setState({ ...state, profile: profile });
      setIsLoading(false);
    });
  };

  const onChange = (event) => {
    const profile = state.profile;

    profile.profileName = event.target.value;
    setState({ ...state, profile: profile });
  };

  const handleModalClose = () => {
    setState({ ...state, isValid: true });
  };

  const saveProfile = (saveFlag) => {
    if (
      state.profile.profileName === "" ||
      state.profile.profileName === null
    ) {
      setState({
        ...state,
        isValid: false,
        validationMessage: Settings.mandatoryProfileName,
      });
    } else {
      let columnList = [];
      //construct data in specific format
      state.profile.profileColumns.map((d, index) => {
        const keys = Object.keys(d);
        keys?.map((key) => {
          if (key === "column_id") {
            const jsonPair = {};
            let value = {};
            value = { value: index + 1 };
            jsonPair[d[key]] = value;
            columnList.push(jsonPair);
          }
        });
      });

      columnList = columnList.reduce(function (result, item) {
        const key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
      }, {});

      const columnListStr = JSON.stringify(columnList);
      const updateProfileObj: any = {};

      updateProfileObj.profile_id = profileId;
      updateProfileObj.formChg = "N";
      updateProfileObj.prevSearch = "ALL";
      updateProfileObj.strSortu = columnListStr;
      updateProfileObj.profileName = state.profile.profileName;
      API.saveColumns(updateProfileObj).then((data) => {
        if (saveFlag) {
          window.location.reload();
        }
      });
    }
  };

  const getColumnDescription = (column_id) => {
    API.getColumnDescription(column_id, profileId).then((data) => {
      setColumnDesc(data);
    });
  };

  const getAvailableColumnsList = () => {
    const searchColumnObj: any = {};
    searchColumnObj.profile_id = profileId;
    searchColumnObj.colfind = searchTerms.showAllColumns
      ? ""
      : searchTerms.colSearchString;
    searchColumnObj.c_1 = searchTerms.showAllColumns ? "ALL" : "FILTER";

    API.getAvailableColumnsList(searchColumnObj).then((data) => {
      const profile = state.profile;
      profile.columnsNotInProfile = data;
      setState({ ...state, profile: profile });
    });
  };

  const editProfileContext = {
    state,
    setState,
    searchTerms,
    setSearchTerms,
    profileId,
    setProfileId,
    onChange,
    getProfileData,
    handleModalClose,
    saveProfile,
    getColumnDescription,
    getAvailableColumnsList,
    columnDesc,
    setColumnDesc,
    tooltipCoordinates,
    setTooltipCoordinates,
    isLoading,
    setIsLoading,
  };

  return (
    <EditProfileContext.Provider value={editProfileContext}>
      {props.children}
    </EditProfileContext.Provider>
  );
};

export const EditProfileContextConsumer = EditProfileContext.Consumer;
export default EditProfileContext;
