import React, { useState, useEffect } from "react";
import styles from "../UserSearchFilters.css";
import Settings from "../../../userproperties/limitedSalesUsers/static/Settings";
import CSelect from "../../../../common/components/CSelect";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import LimitedSalesUsersContext from "../../../userproperties/limitedSalesUsers/context/LimitedSalesUsersContext";

let searchContextType = null;
export const LimitedSalesUsersSearchFilters = () => {
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const getRefreshObjlimitedsalesUsers =
    sessionStorage.refreshObjlimitedsalesUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjlimitedsalesUsers);

  useEffect(() => {
    searchContextType.setRefreshObjUserSearchCriteria(
      getRefreshObjlimitedsalesUsers
    );
  }, []);
  return (
    <LimitedSalesUsersContext.Consumer>
      {(limitedSalesUsersContext) => {
        searchContextType = limitedSalesUsersContext;
        return (
          <div className={styles.dataTableDiv}>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <td
                    id="ShowAll"
                    className={styles.infoTbleFieldName}
                  >
                    <div className={styles.allusers}>
                      <input
                        name="r_1"
                        id="r_1"
                        type="radio"
                        value={Settings.labels.allValue}
                        onChange={(e) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy: e.target?.value,
                              filterString: "",
                            },
                          });
                          searchContextType.setOnChangeTrigger(
                            true
                          );
                        }}
                        checked={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            false &&
                            searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onChangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria?.searchBy ===
                            Settings.labels.allValue
                            : searchContextType.postData
                              .userSearchCriteria.searchBy ===
                            Settings.labels.allValue
                        }
                      />
                      {Settings.labels.showAllUsers}
                    </div>
                    <div className={styles.sortby}>
                      <span>{Settings.labels.sortBy}{" "}</span>
                      <CSelect
                        name="userSearchCriteria.orderby"
                        id="userSearchCriteria.orderby"
                        ddnOptions={Settings.dropDownOptions}
                        keyField={"id"}
                        valField={"value"}
                        onChange={(event) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              orderby: event.target.value,
                            },
                          });
                          searchContextType.setOnSortbychangeTrigger(
                            true
                          );
                        }}
                        selectedValue={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onSortbychangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria?.orderby
                            : searchContextType.postData
                              ?.userSearchCriteria?.orderby
                        }
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  {showStartingWithFilter ? (
                    <td
                      className="FilterFieldName"
                      dat-nowrap=""
                    >
                      <input
                        type="radio"
                        name="r_1"
                        id="r_1"
                        value={Settings.labels.eid}
                        checked={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            false &&
                            searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onChangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria
                              ?.searchBy ===
                            Settings.labels.eid ||
                            searchContextType.postData
                              .userSearchCriteria.filterString
                            : searchContextType.postData
                              .userSearchCriteria.searchBy ===
                            Settings.labels.eid ||
                            searchContextType.postData
                              .userSearchCriteria.filterString
                        }
                        onChange={(e) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy: e.target?.value,
                              filterString: "",
                            },
                          });
                          searchContextType.setOnChangeTrigger(
                            true
                          );
                        }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        {Settings.labels.eid}
                      </span>
                      <input
                        type="radio"
                        name="r_1"
                        id="r_1"
                        value={Settings.labels.lastNameValue}
                        checked={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            false &&
                            searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onChangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria
                              ?.searchBy ===
                            Settings.labels.lastNameValue
                            : searchContextType.postData
                              .userSearchCriteria.searchBy ===
                            Settings.labels.lastNameValue
                        }
                        onChange={(e) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy: e.target?.value,
                              filterString: "",
                            },
                          });
                          searchContextType.setOnChangeTrigger(
                            true
                          );
                        }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        {Settings.labels.lastName}
                      </span>
                      <div className={styles.startingwith}>
                        <span
                          style={{
                            paddingLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {Settings.labels.startingWith}
                        </span>
                        <input
                          id="filterString"
                          name="filterString"
                          style={{
                            display: "block",
                          }}
                          onChange={(e) => {
                            searchContextType.setPostData({
                              ...searchContextType.postData,
                              userSearchCriteria: {
                                ...searchContextType.postData
                                  .userSearchCriteria,
                                filterString: e.target?.value,
                                searchBy:
                                  e.target?.value === ""
                                    ? Settings.labels.allValue
                                    : searchContextType.postData
                                      .userSearchCriteria
                                      .searchBy ===
                                      Settings.labels
                                        .lastNameValue
                                      ? Settings.labels
                                        .lastNameValue
                                      : Settings.labels.eid,
                              },
                            });
                            searchContextType.setOnFilterchangeTrigger(
                              true
                            );
                          }}
                          value={
                            searchContextType?.refreshObjUserSearchCriteria !==
                              undefined &&
                              !searchContextType.onFilterchangeTrigger
                              ? searchContextType.onChangeTrigger
                                ? searchContextType.postData
                                  .userSearchCriteria
                                  .filterString
                                : searchContextType
                                  ?.refreshObjUserSearchCriteria
                                  ?.userSearchCriteria
                                  ?.filterString
                              : searchContextType.postData
                                .userSearchCriteria.filterString
                          }
                        />
                      </div>
                    </td>
                  ) : (
                    <td style={{ width: "60px" }}></td>
                  )}
                  <td
                    style={{
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      style={{
                        cursor: "default",
                      }}
                      src={btnSearchSmall}
                      onClick={() => {
                        if (
                          searchContextType.postData
                            .userSearchCriteria.filterString ===
                          ""
                        ) {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy:
                                Settings.labels.allValue,
                            },
                          });
                        }
                        searchContextType.onClickSearch();
                      }}
                    />
                  </td>
                </tr>



              </tbody>
            </table>
          </div>
        );
      }}
    </LimitedSalesUsersContext.Consumer>
  );
};
