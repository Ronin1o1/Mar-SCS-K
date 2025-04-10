import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./editProfile.css";
import editProfileContext, {
  EditProfileContextProvider,
} from "../context/editProfileContext";
import EditProfileContext from "../context/editProfileContext";
import btnInfo from "../../../../../common/assets/img/button/info.gif";
import btnSave from "../../../../../common/assets/img/button/btnSave.gif";
import addBtn2 from "../../../../../common/assets/img/button/btnAdd2.gif";
import addAllBtn2 from "../../../../../common/assets/img/button/btnAddAll2.gif";
import removeBtn2 from "../../../../../common/assets/img/button/btnRemove2.gif";
import removeAllBtn2 from "../../../../../common/assets/img/button/btnRemoveAll2.gif";

import removeBtn from "../../../../../common/assets/img/button/btnRemove.gif";
import removeAllBtn from "../../../../../common/assets/img/button/btnRemoveAll.gif";
import addBtn from "../../../../../common/assets/img/button/btnAdd.gif";
import addAllBtn from "../../../../../common/assets/img/button/btnAddAll.gif";

import selectAllBtn from "../../../../../common/assets/img/button/btnSelectAll.gif";
import unselectAllBtn from "../../../../../common/assets/img/button/btnUnSelectAll.gif";

import searchBtn from "../../../../../common/assets/img/button/btnSearch.gif";

import Settings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";

import QuickSelect from "../../../../../shared/components/quickSelect";
import CSuspense from "../../../../../common/components/CSuspense";
import Utils from "../../../../../common/utils/Utils";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;

const EditProfile = () => {
  const [currentSelectedData, setCurrentSelectedData] = useState([]);
  const { id } = useParams();
  const [prevCheckAvailRow, setPrevCheckAvailRow] = useState();
  const [prevCheckProfileRow, setPrevCheckProfileRow] = useState();
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  let isDoubleClick;
  contextType = EditProfileContext;

  useEffect(() => {
    contextType.getProfileData(id);
    return () => {
      contextType.saveProfile(false);
    };
  }, []);

  const checkboxAvailableColumnsChange = (rowData, event) => {
    const profile = { ...contextType.state.profile };
    const cols = profile.columnsNotInProfile;

    const selectedItemIndex = cols.findIndex(
      (data) => data.column_label === rowData.column_label
    );
    if (event.target.checked) {
      setPrevCheckAvailRow(selectedItemIndex);
      if (
        (prevCheckAvailRow != undefined ||
          prevCheckAvailRow != null ||
          prevCheckAvailRow != "undefined") &&
        event.nativeEvent.shiftKey
      ) {
        // //Shift double click functionality
        if (isDoubleClicked || isDoubleClick) {
          for (let i = selectedItemIndex; i < cols.length; i++) {
            cols[i].isSelected = event.target.checked;
          }
          setIsDoubleClicked(false);
        }
        // //end
        else if (prevCheckAvailRow < selectedItemIndex) {
          for (let i = prevCheckAvailRow + 1; i <= selectedItemIndex; i++) {
            cols[i].isSelected = event.target.checked;
          }
        } else {
          for (let i = selectedItemIndex; i < prevCheckAvailRow; i++) {
            cols[i].isSelected = event.target.checked;
          }
        }
      } else if (
        (event.nativeEvent.shiftKey && isDoubleClicked) ||
        isDoubleClick
      ) {
        for (let i = selectedItemIndex; i < cols.length; i++) {
          cols[i].isSelected = event.target.checked;
        }
        setIsDoubleClicked(false);
      } else {
        cols[selectedItemIndex].isSelected =
          !cols[selectedItemIndex].isSelected;
      }
    } else {
      cols[selectedItemIndex].isSelected = !cols[selectedItemIndex].isSelected;
    }
    contextType.setState({ ...contextType.state, profile });
  };
  const checkboxMovedColumnsChange = (rowData, event) => {
    const profile = { ...contextType.state.profile };
    const cols = profile.profileColumns;

    const selectedItemIndex = cols.findIndex(
      (data) => data.column_label === rowData.column_label
    );
    if (event.target.checked) {
      setPrevCheckProfileRow(selectedItemIndex);
      if (
        (prevCheckProfileRow != null ||
          prevCheckProfileRow != undefined ||
          prevCheckProfileRow != "undefined") &&
        event.nativeEvent.shiftKey
      ) {
        //Shift double click functionality
        if (isDoubleClicked || isDoubleClick) {
          for (let i = selectedItemIndex; i < cols.length; i++) {
            cols[i].isSelected = event.target.checked;
          }
          isDoubleClick = false;
          setIsDoubleClicked(false);
        }
        // //end
        else if (prevCheckProfileRow < selectedItemIndex) {
          for (let i = prevCheckProfileRow + 1; i <= selectedItemIndex; i++) {
            cols[i].isSelected = event.target.checked;
          }
        } else {
          for (let i = selectedItemIndex; i < prevCheckProfileRow; i++) {
            cols[i].isSelected = event.target.checked;
          }
        }
      } else if (
        (event.nativeEvent.shiftKey && isDoubleClicked) ||
        isDoubleClick
      ) {
        for (let i = selectedItemIndex; i < cols.length; i++) {
          cols[i].isSelected = event.target.checked;
        }
        isDoubleClick = false;
        setIsDoubleClicked(false);
      } else {
        cols[selectedItemIndex].isSelected =
          !cols[selectedItemIndex].isSelected;
      }
    } else {
      cols[selectedItemIndex].isSelected = !cols[selectedItemIndex].isSelected;
    }
    contextType.setState({ ...contextType.state, profile });
  };

  // move the selected columns to right
  const moveSelectedColumnsRight = () => {
    const columnCountThatCanBeMoved =
      850 - contextType.state.profile.profileColumns.length;

    const profile = { ...contextType.state.profile };
    if (
      profile.columnsNotInProfile.filter((data) => data.isSelected).length > 0
    ) {
      if (columnCountThatCanBeMoved > 0) {
        const isValid =
          profile.columnsNotInProfile.filter((data) => data.isSelected).length >
          columnCountThatCanBeMoved
            ? false
            : true;
        const columnsSelectedForMove = profile.columnsNotInProfile
          .filter((data) => data.isSelected)
          .splice(0, columnCountThatCanBeMoved);
        let newColumns = Object.assign([], columnsSelectedForMove);
        const arr = [...currentSelectedData, ...columnsSelectedForMove];
        setCurrentSelectedData(arr);
        // remove the moved collumns from source
        profile.columnsNotInProfile = profile.columnsNotInProfile.filter(
          function (objFromA) {
            return !columnsSelectedForMove.find(function (objFromB) {
              return objFromA.column_id === objFromB.column_id;
            });
          }
        );

        //clear the flags in new columns
        newColumns = newColumns.map((data) => {
          data.isSelected = false;
          data.isSearched = false;
          return data;
        });

        // concat to destination
        profile.profileColumns = profile.profileColumns.concat(newColumns);

        const result = profile.profileColumns.filter((obj) => {
          return obj.isSelected === true;
        });

        if (result.length > 0) {
          const index = profile.profileColumns.findIndex(
            (x) => x.column_id === result[0].column_id
          );

          columnsSelectedForMove.sort((a, b) =>
            b.column_id < a.column_id ? -1 : 1
          );

          columnsSelectedForMove.map((obj) => {
            profile.profileColumns.pop();
            profile.profileColumns.splice(index, 0, obj);
          });

          contextType.setState({
            ...contextType.state,
            profile: profile,
            showQuickSelect: false,
            isValid,
            validationMessage: Settings.maxLengthValidation,
          });
        }
        contextType.setState({
          ...contextType.state,
          profile: profile,
          showQuickSelect: false,
          isValid,
          validationMessage: Settings.maxLengthValidation,
        });
      } else {
        contextType.setState({
          ...contextType.state,
          isValid: false,
          validationMessage: Settings.maxLengthValidation,
          showQuickSelect: false,
        });
      }
    }
  };

  // move the selected columns to left
  const moveSelectedColumnsLeft = () => {
    const profile = { ...contextType.state.profile };
    let newColumns = Object.assign(
      [],
      profile.profileColumns.filter((data) => data.isSelected)
    );
    profile.profileColumns = profile.profileColumns.filter(
      (data) => !data.isSelected
    );

    newColumns = newColumns.map((data) => {
      data.isSelected = false;
      data.isSearched = false;
      return data;
    });

    profile.columnsNotInProfile =
      profile.columnsNotInProfile.concat(newColumns);

    contextType.setState({ ...contextType.state, profile: profile });
  };

  // move all the  columns to left
  const moveAllColumnsLeft = () => {
    const profile = { ...contextType.state.profile };
    let newColumns = Object.assign([], profile.profileColumns);

    newColumns = newColumns.map((data) => {
      data.isSelected = false;
      data.isSearched = false;
      return data;
    });
    profile.columnsNotInProfile =
      profile.columnsNotInProfile.concat(newColumns);
    profile.profileColumns = [];
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // move all the  columns to right

  const moveAllColumnsRight = () => {
    //TODP remove static
    const columnCountThatCanBeMoved =
      850 - contextType.state.profile.profileColumns.length;

    const columnCountSelectedForMove =
      contextType.state.profile.columnsNotInProfile.length;

    if (columnCountThatCanBeMoved > 0) {
      const profile = { ...contextType.state.profile };

      let newColumns = Object.assign(
        [],
        profile.columnsNotInProfile.slice(0, columnCountThatCanBeMoved)
      );

      profile.columnsNotInProfile = profile.columnsNotInProfile.slice(
        columnCountThatCanBeMoved,
        contextType.state.profile.columnsNotInProfile.length
      );

      newColumns = newColumns.map((data) => {
        data.isSelected = false;
        data.isSearched = false;
        return data;
      });
      profile.profileColumns = profile.profileColumns.concat(newColumns);

      const isValid = columnCountSelectedForMove > 850 ? false : true;
      const result = profile.profileColumns.filter((obj) => {
        return obj.isSelected === true;
      });

      if (result.length > 0) {
        const index = profile.profileColumns.findIndex(
          (x) => x.column_id === result[0].column_id
        );

        newColumns.sort((a, b) => (b.column_id < a.column_id ? -1 : 1));

        newColumns.map((obj) => {
          profile.profileColumns.pop();
          profile.profileColumns.splice(index, 0, obj);
        });

        contextType.setState({
          ...contextType.state,
          profile: profile,
          isValid,
          validationMessage: Settings.maxLengthValidation,
        });
      }
      contextType.setState({
        ...contextType.state,
        profile: profile,
        isValid,
        validationMessage: Settings.maxLengthValidation,
      });
    } else {
      contextType.setState({
        ...contextType.state,
        isValid: false,
        validationMessage: Settings.maxLengthValidation,
      });
    }
  };

  // move selected columns Up
  const moveSelectedColumnsUp = () => {
    const profile = { ...contextType.state.profile };

    const selectedItems = profile.profileColumns.filter(
      (data) => data.isSelected
    );

    if (selectedItems && selectedItems.length) {
      const list = profile.profileColumns;

      for (let i = 0; i < selectedItems.length; i++) {
        const selectedItem = selectedItems[i];

        const selectedItemIndex = profile.profileColumns.findIndex(
          (data) => data.column_label === selectedItem.column_label
        );

        if (selectedItemIndex !== 0) {
          const movedItem = list[selectedItemIndex];
          const temp = list[selectedItemIndex - 1];
          list[selectedItemIndex - 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          // break;
          list[selectedItemIndex].isSelected = false;
        }
      }
      profile.profileColumns = list;
    }

    contextType.setState({ ...contextType.state, profile: profile });
  };

  // move selected columns to Top
  const moveSelectedColumnsTop = () => {
    const profile = { ...contextType.state.profile };

    const selectedItems = profile.profileColumns.filter(
      (data) => data.isSelected
    );
    selectedItems.reverse();

    if (selectedItems && selectedItems.length) {
      const list = profile.profileColumns;

      for (let i = 0; i < selectedItems.length; i++) {
        const selectedItem = selectedItems[i];

        const selectedItemIndex = profile.profileColumns.findIndex(
          (data) => data.column_label === selectedItem.column_label
        );

        if (selectedItemIndex !== i) {
          const movedItem = list.splice(selectedItemIndex, 1)[0];
          list.unshift(movedItem);
        } else {
          // break;
          list[selectedItemIndex].isSelected = false;
        }
      }
      profile.profileColumns = list;
    }
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // move selected columns Down
  const moveSelectedColumnsDown = () => {
    const profile = { ...contextType.state.profile };

    const selectedItems = profile.profileColumns.filter(
      (data) => data.isSelected
    );

    if (selectedItems && selectedItems.length) {
      const list = profile.profileColumns;

      for (let i = selectedItems.length - 1; i >= 0; i--) {
        const selectedItem = selectedItems[i];

        const selectedItemIndex = profile.profileColumns.findIndex(
          (data) => data.column_label === selectedItem.column_label
        );

        if (selectedItemIndex !== list.length - i) {
          const movedItem = list[selectedItemIndex];
          if (selectedItemIndex + 1 >= list.length) {
            list[selectedItemIndex].isSelected = false;
          } else {
            const temp = list[selectedItemIndex + 1];
            list[selectedItemIndex + 1] = movedItem;
            list[selectedItemIndex] = temp;
            if (selectedItemIndex + 1 == list.length - 1) {
              list[selectedItemIndex + 1].isSelected = false;
            }
          }
        }
        if (selectedItemIndex === list.length - 1) {
          profile.profileColumns[
            profile.profileColumns.findIndex(
              (data) => data.column_label === selectedItem.column_label
            )
          ].isSelected = false;
        } else {
          // break;
        }
      }
      profile.profileColumns = list;
    }
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // move selected columns to bottom
  const moveSelectedColumnsBottom = () => {
    const profile = { ...contextType.state.profile };

    const selectedItems = profile.profileColumns.filter(
      (data) => data.isSelected
    );
    selectedItems.reverse();

    if (selectedItems && selectedItems.length) {
      const list = profile.profileColumns;

      for (let i = selectedItems.length - 1; i >= 0; i--) {
        const selectedItem = selectedItems[i];

        const selectedItemIndex = profile.profileColumns.findIndex(
          (data) => data.column_label === selectedItem.column_label
        );

        if (selectedItemIndex !== list.length - 1) {
          const movedItem = list.splice(selectedItemIndex, 1)[0];
          list.push(movedItem);
        }
        if (selectedItemIndex === list.length - 1) {
          profile.profileColumns[
            profile.profileColumns.findIndex(
              (data) => data.column_label === selectedItem.column_label
            )
          ].isSelected = false;
        } else {
          // break;
        }
      }
      profile.profileColumns = list;
    }
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // select all columns in the grid
  const selectAll = (source) => {
    const profile = { ...contextType.state.profile };
    if (source === "AvailableColumns") {
      let columns = profile.columnsNotInProfile;

      columns = columns.filter((data) => {
        data.isSelected = true;
        return data;
      });
    } else {
      let columns = profile.profileColumns;

      columns = columns.filter((data) => {
        data.isSelected = true;
        return data;
      });
    }
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // unselect  all the columns of the grid
  const unselectAll = (source) => {
    const profile = { ...contextType.state.profile };
    if (source === "AvailableColumns") {
      let columns = profile.columnsNotInProfile;

      columns = columns.filter((data) => {
        data.isSelected = false;
        return data;
      });
    } else {
      let columns = profile.profileColumns;

      columns = columns.filter((data) => {
        data.isSelected = false;
        return data;
      });
    }
    contextType.setState({ ...contextType.state, profile: profile });
  };

  // Quick select definition
  const quickSelectObject = {
    label: Settings.quickSelectObject.label,
    textareaId: Settings.quickSelectObject.textareaId,
    rows: Settings.quickSelectObject.row,
    cols: Settings.quickSelectObject.cols,
    textareaName: Settings.quickSelectObject.textareaName,
  };

  // On Search click
  const submit = (e) => {     // This function is for quick select  fix:- column_id to column_seq
    const currentSelecteDataDup = [...currentSelectedData];
    const columnids = [];
    currentSelectedData.length > 0 &&
      currentSelectedData.map((eachItem) => {
        columnids.push(eachItem.column_seq);
      });
    let profilesnotfound = "";
    let list = e.replace(/[^0-9,]/g, "").replace(/\s/g, "");

    list = list.replace(/\s/g, "");
    const profileArray = list.split(",");
      console.log(profileArray,"Test-profileArray");
    const re = /^[0-9\,]/;
    if (!re.test(list)) {
      contextType.setState({
        ...contextType.state,
        isValid: false,
        validationMessage: Settings.regexValidation,
        showQuickSelect: false,
      });
    } else {
      for (var i = 0; i < profileArray.length; i++) {
        if (profileArray[i] != "") {
          const maxEDIE = Settings.maxEDIE;
          if (profileArray.length > 200) {
            contextType.setState({
              ...contextType.state,
              isValid: false,
              validationMessage: maxEDIE,
              showQuickSelect: false,
            });
            return;
          }
          if (
            currentSelecteDataDup !== null &&
            currentSelecteDataDup.filter(
              (data) => data.column_seq.toString() === profileArray[i]
            ).length > 0
          ) {
            if (currentSelecteDataDup.length > 0) {
              currentSelecteDataDup.map((data) => {
                if (data.column_seq.toString() === profileArray[i]) {
                  data.isSelected = true;
                  currentSelecteDataDup.splice(0, 1);
                  currentSelecteDataDup.filter(
                    (item) => item.column_seq !== profileArray[i]
                  );
                } else {
                  currentSelecteDataDup.filter((data) => {
                    if (columnids.includes(parseInt(profileArray[i]))) {
                      return;
                    } else {
                      profilesnotfound +=
                        profileArray[i]
                          .replace(/[^0-9,]/g, "")
                          .replace(/\s/g, "") + " ";
                    }
                  });
                }
              });
            }
            contextType.setState({
              ...contextType.state,
              showQuickSelect: false,
            });
          } else if (
            contextType.state.profile?.columnsNotInProfile.filter(
              (data) => data.column_seq.toString() === profileArray[i]
            ).length > 0
          ) {
            if (contextType.state.profile?.columnsNotInProfile.length > 0) {
              contextType.state.profile?.columnsNotInProfile.forEach((data) => {
                if (data.column_seq.toString() === profileArray[i]) {
                  data.isSelected = true;
                  return;
                } else {
                  currentSelecteDataDup.filter((data) => {
                    if (columnids.includes(parseInt(profileArray[i]))) {
                      return;
                    } else {
                      profilesnotfound +=
                        profileArray[i]
                          .replace(/[^0-9,]/g, "")
                          .replace(/\s/g, "") + " ";
                    }
                  });
                }
              });
            }
          } else {
            profilesnotfound +=
              profileArray[i].replace(/[^0-9,]/g, "").replace(/\s/g, "") + " ";
          }
        }
      }
    }
    if (profilesnotfound != "") {
      const validMessage = Settings.edieNotFound + profilesnotfound;
      contextType.setState({
        ...contextType.state,
        isValid: false,
        validationMessage: validMessage,
        showQuickSelect: false,
      });
    }
    moveSelectedColumnsRight();
  };

  function findSeq() {
    const colSearchString =
      contextType.searchTerms?.colSearchString?.toUpperCase();
    const seqSearchString =
      contextType.searchTerms?.seqSearchString?.toUpperCase();

    let isValid = true;
    let validMessage = "";
    // If the EDIE number is searched
    if (seqSearchString !== "" && seqSearchString !== null) {
      const profile = contextType.state.profile;
      const columnsNotInProfile = profile.columnsNotInProfile;
      const profileColumns = profile.profileColumns;

      columnsNotInProfile.forEach((v) => {
        v.isSearched = false;
      });
      profileColumns.forEach((v) => {
        v.isSearched = false;
      });

      if (
        columnsNotInProfile.filter(
          (data) => data.column_seq.toString().toUpperCase() === seqSearchString
        ).length > 0
      ) {
        columnsNotInProfile
          .filter(
            (data) =>
              data.column_seq.toString().toUpperCase() === seqSearchString
          )
          .forEach((v) => {
            v.isSearched = true;
            const scrollToElement = document.getElementById(
              `row${v.column_id}`
            );
            if (scrollToElement !== undefined) {
              document.getElementById(`row${v.column_id}`)?.scrollIntoView();
            }
          });
      } else if (
        profileColumns.filter(
          (data) => data.column_seq.toString().toUpperCase() === seqSearchString
        ).length > 0
      ) {
        profileColumns
          .filter(
            (data) =>
              data.column_seq.toString().toUpperCase() === seqSearchString
          )
          .forEach((v) => {
            v.isSearched = true;
            const scrollToElement = document.getElementById(
              `row${v.column_id}`
            );
            if (scrollToElement !== undefined) {
              document.getElementById(`row${v.column_id}`)?.scrollIntoView();
            }
          });
      } else {
        if (seqSearchString) {
          validMessage = `"${seqSearchString}"${Settings.notFound}`;
          isValid = false;
        }
      }

      contextType.setState({
        ...contextType.state,
        profile: profile,
        isValid,
        validationMessage: validMessage,
      });
    }

    // is show all is selected, make API call

    if (
      contextType.searchTerms.showAllColumns &&
      colSearchString === "" &&
      seqSearchString === ""
    ) {
      contextType.getAvailableColumnsList();
    }

    // if show label is selected,  make API call
    if (
      !contextType.searchTerms.showAllColumns &&
      colSearchString !== "" &&
      colSearchString
    ) {
      const profileObj = { ...contextType.state.profile };

      const profileColumnsObj = profileObj.profileColumns;

      profileColumnsObj.forEach((v) => {
        v.isSearched = false;
      });
      let scrollID = "";

      if (
        profileColumnsObj.filter(
          (data) =>
            data.column_label
              .toString()
              .toUpperCase()
              .indexOf(colSearchString) > -1
        ).length > 0
      ) {
        profileColumnsObj
          .filter(
            (data) =>
              data.column_label
                .toString()
                .toUpperCase()
                .indexOf(colSearchString) > -1
          )
          .forEach((v) => {
            v.isSearched = true;
            if (scrollID !== "") {
              scrollID = `row${v.column_id}`;
            }
          });
      }
      contextType.setState({ ...contextType.state, profile: profileObj });
      contextType.getAvailableColumnsList();
      document.getElementById(scrollID)?.scrollIntoView();
    } else {
      contextType.setSearchTerms({
        ...contextType.searchTerms,
        showAllColumns: true,
      });
    }
  }

  // set the selected available columns
  const availableColumnSelected = (column_id) => {
    const profileObj = contextType.state.profile;
    const columnsNotInProfileObj = profileObj.columnsNotInProfile;

    columnsNotInProfileObj.forEach((v) => {
      v.isSearched = false;
    });
    columnsNotInProfileObj
      .filter((data) => data.column_id.toString() === column_id.toString())
      .forEach((v) => {
        v.isSearched = true;
      });
    contextType.setState({
      ...contextType.state,
      profile: profileObj,
    });
  };

  // set the selected profile column
  const profileColumnSelected = (column_id) => {
    const profileObj = contextType.state.profile;
    const profileColumnObj = profileObj.profileColumns;

    profileColumnObj.forEach((v) => {
      v.isSearched = false;
    });
    profileColumnObj
      .filter((data) => data.column_id.toString() === column_id.toString())
      .forEach((v) => {
        v.isSearched = true;
      });
    contextType.setState({
      ...contextType.state,
      profile: profileObj,
    });
  };

  return (
    <EditProfileContextProvider>
      <EditProfileContext.Consumer>
        {(editProfileContext) => {
          contextType = editProfileContext;
          return contextType.isLoading ? (
            <CLoader></CLoader>
          ) : (
            <React.Fragment>
              <div className={styles.MainContainer}>
                <CModal
                  title={Settings.quickSelect}
                  xPosition={-400}
                  yPosition={-100}
                  onClose={(e) => {
                    contextType.setState({
                      ...contextType.state,
                      showQuickSelect: false,
                    });
                  }}
                  show={contextType.state.showQuickSelect}
                >
                  <Suspense fallback={<CSuspense />}>
                    <QuickSelect
                      xPosition={-500}
                      yPosition={-500}
                      quickSelectObject={quickSelectObject}
                      save={(e) => submit(e)}
                      cancel={(e) => {
                        contextType.setState({
                          ...contextType.state,
                          showQuickSelect: false,
                        });
                      }}
                    />
                  </Suspense>
                </CModal>
                <CModal
                  title={Settings.title}
                  onClose={contextType.handleModalClose}
                  show={!contextType.state.isValid}
                  xPosition={-400}
                  yPosition={-100}
                >
                  <div
                    style={{
                      maxWidth: 250,
                      minWidth: 180,
                      padding: "9px 12px",
                    }}
                  >
                    {contextType.state.validationMessage}
                  </div>
                </CModal>

                {contextType.columnDesc ? (
                  <div
                    id={contextType.tooltipId}
                    className={styles.tooltipContainer}
                    style={{
                      left: contextType.tooltipCoordinates.x,
                      top: contextType.tooltipCoordinates.y,
                    }}
                  >
                    {contextType.columnDesc ? contextType.columnDesc : ""}
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.header}>{Settings.pageTitle} </div>
                <table
                  className={styles.menuHght100Height}
                  style={{ verticalAlign: "top", margin: "0px 0px 0px -2px" }}
                >
                  <tbody>
                    <tr>
                      <td className={styles.field_Value} colSpan={4}>
                        <table style={{ borderWidth: "0px" }}>
                          <tbody>
                            <tr>
                              <td className={styles.field_Name}>
                                {Settings.profileName}
                              </td>
                              <td>
                                <input
                                  onKeyPress={Utils.IsAlphaNumeric}
                                  id="profileName"
                                  name="profileName"
                                  style={{ width: "397px", height: "22px" }}
                                  maxLength={100}
                                  size={56}
                                  value={contextType.state.profile.profileName}
                                  onChange={(e) => contextType.onChange(e)}
                                />
                              </td>
                              <td style={{ width: "10px" }}>
                                <>&nbsp;</>
                              </td>
                              <td>
                                <img
                                  src={btnSave}
                                  style={{ cursor: "hand", height: "22px" }}
                                  onClick={() => {
                                    contextType.saveProfile(true);
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <table className={styles.menuHght100Height}>
                          <tbody>
                            <tr>
                              <td colSpan={3}>
                                <table className={styles.zeroHeight}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table
                                          className={`${styles.Filter} ${styles.zeroHeight}`}
                                          style={{
                                            borderTopWidth: "1px",
                                            borderBottomStyle: "solid",
                                            borderRightWidth: "1px",
                                            borderLeftStyle: "solid",
                                            borderTopStyle: "solid",
                                            borderBottomWidth: "1px",
                                            borderRightStyle: "solid",
                                            borderLeftWidth: "1px",
                                            backgroundColor: "#eff0ec",
                                            borderColor: "#cccccc",
                                            marginLeft: "-1px",
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td />

                                              <td
                                                className={`${styles.FilterFieldName} ${styles.nowrapCell}`}
                                              />
                                              <td>
                                                <input
                                                  type="radio"
                                                  name={Settings.showAll.name}
                                                  id={Settings.showAll.id}
                                                  defaultChecked
                                                  checked={
                                                    contextType.searchTerms
                                                      .showAllColumns
                                                  }
                                                  onChange={(e) =>
                                                    contextType.setSearchTerms({
                                                      ...contextType.searchTerms,
                                                      showAllColumns: true,
                                                      colSearchString: "",
                                                    })
                                                  }
                                                />

                                                <span>
                                                  {Settings.showAll.label}
                                                </span>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                className={
                                                  styles.FilterFieldName
                                                }
                                              >
                                                {Settings.findEdie}&nbsp;
                                                <input
                                                  name="seqfind"
                                                  id="seqfind"
                                                  onChange={(e) =>
                                                    contextType.setSearchTerms({
                                                      ...contextType.searchTerms,
                                                      showAllColumns: true,
                                                      colSearchString: "",
                                                      seqSearchString:
                                                        e.target.value,
                                                    })
                                                  }
                                                  style={{
                                                    width: "35px",
                                                  }}
                                                  value={
                                                    contextType.searchTerms
                                                      .seqSearchString
                                                  }
                                                />
                                              </td>

                                              <td
                                                className={`${styles.FilterFieldName} ${styles.nowrapCell}`}
                                              />
                                              <td>
                                                <input
                                                  type="radio"
                                                  name={
                                                    Settings.showMatching.name
                                                  }
                                                  id={Settings.showMatching.id}
                                                  checked={
                                                    !contextType.searchTerms
                                                      .showAllColumns
                                                  }
                                                  onChange={(e) =>
                                                    contextType.setSearchTerms({
                                                      ...contextType.searchTerms,
                                                      showAllColumns: false,
                                                    })
                                                  }
                                                />
                                                {Settings.showMatching.label}
                                                <input
                                                  name="colfind"
                                                  id="colfind"
                                                  onChange={(e) =>
                                                    contextType.setSearchTerms({
                                                      ...contextType.searchTerms,
                                                      showAllColumns: false,
                                                      colSearchString:
                                                        e.target.value,
                                                      seqSearchString: "",
                                                    })
                                                  }
                                                  value={
                                                    contextType.searchTerms
                                                      .colSearchString
                                                  }
                                                  style={{
                                                    width: "370px",
                                                    float: "right",

                                                    marginLeft: "4px",
                                                  }}
                                                />
                                              </td>
                                              <td
                                                className={
                                                  styles.FilterFieldName
                                                }
                                              />
                                              <td
                                                style={{
                                                  width: "72px",
                                                  verticalAlign: "middle",
                                                }}
                                              >
                                                <img
                                                  src={searchBtn}
                                                  onClick={findSeq}
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={3}>
                                <a
                                  href="javascript:void(0);"
                                  onClick={(e) => {
                                    contextType.setState({
                                      ...contextType.state,
                                      showQuickSelect: true,
                                    });
                                  }}
                                >
                                  {Settings.quickSelect}
                                </a>
                              </td>
                            </tr>

                            <tr
                              style={{ height: "100%", float: "left" }}
                              id="gridTRA"
                            >
                              <td
                                style={{ height: "100%", verticalAlign: "top" }}
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    MozUserSelect: "none",
                                    width: "auto",
                                  }}
                                  id="gridNodeA"
                                  className={styles.grid}
                                >
                                  <div
                                    className={styles.gridHeader}
                                    id="gridHeaderA"
                                  >
                                    <table
                                      style={{ height: "32px" }}
                                      className={`${styles.gridRowTable} ${styles.zeroHeight}`}
                                      id="gridTableHeaderA"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            style={{ width: "32px" }}
                                            className={styles.gridCell}
                                          />
                                          <th
                                            style={{ width: "32px" }}
                                            className={styles.gridCell}
                                          >
                                            ID
                                          </th>
                                          <th
                                            style={{ width: "293px" }}
                                            className={styles.gridCell}
                                          >
                                            Available Columns (
                                            <span id="numACols">
                                              {
                                                contextType.state.profile
                                                  ?.columnsNotInProfile?.length
                                              }
                                            </span>
                                            )
                                          </th>{" "}
                                          <th
                                            style={{ width: "53px" }}
                                            className={styles.gridCell}
                                          />
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div
                                    style={{
                                      height: "calc(100vh - 295px)",
                                      overflowY: "auto",
                                    }}
                                    id="gridViewA"
                                    className={styles.gridView}
                                  >
                                    {contextType.state.profile?.columnsNotInProfile?.map(
                                      (rowData) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <div
                                            id={`row${rowData.column_id}`}
                                            className={`${styles.gridRow} ${
                                              rowData.isSearched
                                                ? styles.gridRowbarSelected
                                                : ""
                                            }`}
                                            onClick={() =>
                                              availableColumnSelected(
                                                rowData.column_id
                                              )
                                            }
                                          >
                                            <table
                                              style={{ height: "21px" }}
                                              className={`${styles.gridRowTable} ${styles.zeroHeight}`}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{ width: "32px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      id={rowData.column_id}
                                                      name={rowData.column_id}
                                                      checked={
                                                        rowData.isSelected
                                                      }
                                                      onChange={(e) =>
                                                        checkboxAvailableColumnsChange(
                                                          rowData,
                                                          e
                                                        )
                                                      }
                                                      onDoubleClick={(e) => {
                                                        isDoubleClick = true;
                                                        setIsDoubleClicked(
                                                          true
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                  <td
                                                    style={{ width: "32px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div id="Aseq">
                                                      {rowData.column_seq}
                                                    </div>
                                                  </td>
                                                  <td
                                                    style={{ width: "293px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div id="Acol">
                                                      {rowData.column_label}
                                                    </div>
                                                  </td>
                                                  <td
                                                    style={{ width: "38px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div
                                                      onMouseOut={() =>
                                                        contextType.setColumnDesc(
                                                          ""
                                                        )
                                                      }
                                                      onClick={(e) => {
                                                        contextType.getColumnDescription(
                                                          rowData.column_id
                                                        );
                                                        contextType.setTooltipCoordinates(
                                                          {
                                                            x: e.pageX,
                                                            y: e.pageY - 75,
                                                          }
                                                        );
                                                      }}
                                                      style={{
                                                        display:
                                                          rowData.column_hasDesc ===
                                                          "Y"
                                                            ? ""
                                                            : "none",
                                                      }}
                                                    >
                                                      <img
                                                        src={btnInfo}
                                                        className={
                                                          styles.deleteContainer
                                                        }
                                                      />
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <td
                              width={110}
                              align="center"
                              className={"ediefieldprofilepagearrows"}
                            >
                              <div
                                style={{
                                  width: "0px",
                                }}
                              >
                                <table className={styles.tablestyling}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a href="javascript:void(0);">
                                          <img
                                            src={addBtn2}
                                            alt="addBtn"
                                            onClick={moveSelectedColumnsRight}
                                          />{" "}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="javascript:void(0);">
                                          <img
                                            src={addAllBtn2}
                                            alt="addAllBtn"
                                            onClick={moveAllColumnsRight}
                                          />{" "}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className={styles.height30}></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="javascript:void(0);">
                                          <img
                                            src={removeBtn2}
                                            onClick={moveSelectedColumnsLeft}
                                          />{" "}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="javascript:void(0);">
                                          <img
                                            src={removeAllBtn2}
                                            onClick={moveAllColumnsLeft}
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>

                            <td>
                              <table className={styles.menuHght100Height}>
                                <div
                                  style={{
                                    height: "100%",
                                    MozUserSelect: "none",
                                    width: "auto",
                                  }}
                                  id="gridNodeU"
                                  className={styles.grid}
                                >
                                  <div
                                    className={styles.gridHeader}
                                    id="gridHeaderA"
                                  >
                                    <table
                                      style={{ height: "32px" }}
                                      className={`${styles.gridRowTable} ${styles.zeroHeight}`}
                                      id="gridTableHeaderA"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            style={{ width: "30px" }}
                                            className={styles.gridCell}
                                          />
                                          <th
                                            style={{ width: "30px" }}
                                            className={styles.gridCell}
                                          >
                                            ID
                                          </th>
                                          <th
                                            style={{ width: "290px" }}
                                            className={styles.gridCell}
                                          >
                                            Profile Columns (
                                            <span id="numACols">
                                              {
                                                contextType.state.profile
                                                  ?.profileColumns?.length
                                              }
                                            </span>
                                            )
                                          </th>{" "}
                                          <th
                                            style={{ width: "52px" }}
                                            className={styles.gridCell}
                                          />
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div
                                    style={{
                                      height: "calc(100vh - 295px)",
                                      overflowY: "auto",
                                    }}
                                    id="gridViewU"
                                    className={styles.gridView}
                                  >
                                    {contextType.state.profile?.profileColumns?.map(
                                      (rowData) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <div
                                            id={`row${rowData.column_id}`}
                                            className={`${styles.gridRow} ${
                                              rowData.isSearched
                                                ? styles.gridRowbarSelected
                                                : ""
                                            }`}
                                            onClick={() =>
                                              profileColumnSelected(
                                                rowData.column_id
                                              )
                                            }
                                          >
                                            <table
                                              style={{ height: "21px" }}
                                              className={`${styles.gridRowTable} ${styles.zeroHeight}`}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{ width: "30px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      id={rowData.column_id}
                                                      name={rowData.column_id}
                                                      checked={
                                                        rowData.isSelected
                                                      }
                                                      onChange={(e) =>
                                                        checkboxMovedColumnsChange(
                                                          rowData,
                                                          e
                                                        )
                                                      }
                                                      onDoubleClick={(e) => {
                                                        isDoubleClick = true;
                                                        setIsDoubleClicked(
                                                          true
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                  <td
                                                    style={{ width: "30px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div id="Aseq">
                                                      {rowData.column_seq}
                                                    </div>
                                                  </td>
                                                  <td
                                                    style={{ width: "290px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div id="Acol">
                                                      {rowData.column_label}
                                                    </div>
                                                  </td>
                                                  <td
                                                    style={{ width: "38px" }}
                                                    className={styles.gridCell}
                                                  >
                                                    <div
                                                      onMouseOut={() =>
                                                        contextType.setColumnDesc(
                                                          ""
                                                        )
                                                      }
                                                      onClick={(e) => {
                                                        contextType.getColumnDescription(
                                                          rowData.column_id
                                                        );
                                                        contextType.setTooltipCoordinates(
                                                          {
                                                            x: e.pageX,
                                                            y: e.pageY - 75,
                                                          }
                                                        );
                                                      }}
                                                      style={{
                                                        display:
                                                          rowData.column_hasDesc ===
                                                          "Y"
                                                            ? ""
                                                            : "none",
                                                      }}
                                                    >
                                                      <img
                                                        src={btnInfo}
                                                        className={
                                                          styles.deleteContainer
                                                        }
                                                      />
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </table>
                            </td>

                            <tr className={styles.edieprfilelist}>
                              <td>
                                <img
                                  src={selectAllBtn}
                                  alt="addBtn"
                                  onClick={() => selectAll("AvailableColumns")}
                                />
                                <img
                                  style={{ marginLeft: "30px" }}
                                  src={unselectAllBtn}
                                  alt="addBtn"
                                  onClick={() =>
                                    unselectAll("AvailableColumns")
                                  }
                                />
                              </td>
                              <td />
                              <td>
                                <table className={styles.menuHght100Height}>
                                  <tbody>
                                    <tr>
                                      <td className={styles.nowrapCell}>
                                        <img
                                          src={selectAllBtn}
                                          alt="addBtn"
                                          onClick={() =>
                                            selectAll("ProfileColumns")
                                          }
                                        />
                                        <img
                                          style={{ marginLeft: "30px" }}
                                          src={unselectAllBtn}
                                          alt="addBtn"
                                          onClick={() =>
                                            unselectAll("ProfileColumns")
                                          }
                                        />
                                      </td>
                                      <td style={{ width: "20%" }} />
                                      <td align="right">
                                        <a href="javascript:void(0);">
                                          <img
                                            src={removeBtn}
                                            alt="addBtn"
                                            onClick={moveSelectedColumnsUp}
                                          />
                                        </a>

                                        <a href="javascript:void(0);">
                                          <img
                                            src={removeAllBtn}
                                            alt="addAllBtn"
                                            onClick={moveSelectedColumnsTop}
                                          />
                                        </a>

                                        <a href="javascript:void(0);">
                                          <img
                                            src={addBtn}
                                            onClick={moveSelectedColumnsDown}
                                          />
                                        </a>

                                        <a href="javascript:void(0);">
                                          <img
                                            src={addAllBtn}
                                            onClick={moveSelectedColumnsBottom}
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          );
        }}
      </EditProfileContext.Consumer>
      <style>{`
        .container{
          min-width:910px;
        }
        @media only screen and (max-width: 920px) {
          .page_body_container {
            min-height: calc(100vh - 106px) !important;
          }
          #gridViewA, #gridViewU{
            height: calc(100vh - 305px) !important;
          }
          .ediefieldprofilepagearrows{
            width:65px;
          }
          .footerwidget{
            position:fixed;
          }
        }

      `}</style>
    </EditProfileContextProvider>
  );
};

export default EditProfile;
