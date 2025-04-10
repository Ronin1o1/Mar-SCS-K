import React, { useState, useEffect } from "react";
import styles from "../UserSearchFilters.css";
import CSelect from "../../../../common/components/CSelect";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import HotelUsersContext from "../../../userproperties/hotelusers/context/HotelUsersContext";
import Settings from "../../static/Settings";

let searchContextType = null;
export const HotelUserSearchFilters = () => {
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const getRefreshObjHotelUsers =
    sessionStorage.refreshObjHotelUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjHotelUsers);

  useEffect(() => {
    searchContextType.setRefreshObjUserSearchCriteria(getRefreshObjHotelUsers);
  }, []);
  return (
    <HotelUsersContext.Consumer>
      {(userPropertiesContext) => {
        searchContextType = userPropertiesContext;
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
                      value="ALL"
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
                          "ALL"
                          : searchContextType.postData
                            .userSearchCriteria.searchBy ===
                          "ALL"
                      }
                    />
                    Show ALL Users
                  </div>
                  <div className={styles.sortby}>
                    Sort by:{" "}
                    <CSelect
                      name="userSearchCriteria.orderby"
                      id="userSearchCriteria.orderby"
                      ddnOptions={Settings.sortbyOptins}
                      keyField={"id"}
                      valField={"value"}
                      onChange={(event) => {
                        searchContextType.setPostData({
                          ...searchContextType.postData,
                          userSearchCriteria: {
                            ...searchContextType.postData
                              .userSearchCriteria,
                            orderby: parseInt(
                              event.target.value
                            ),
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
                {showStartingWithFilter && (
                  <tr>
                    <td className={styles.startText}>
                      starting with:
                    </td>
                  </tr>
                )}
                <tr>
                  {showStartingWithFilter ? (
                    <td
                      className={styles.infoTbleFieldName}
                      data-nowrap=""
                    >
                      <input
                        type="radio"
                        name="r_1"
                        id="r_1"
                        value="EID"
                        checked={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            false &&
                            searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onChangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria
                              ?.searchBy === "EID"
                            : searchContextType.postData
                              .userSearchCriteria.searchBy ===
                            "EID"
                        }
                        onChange={(e) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy: e.target?.value,
                            },
                          });
                          searchContextType.setOnChangeTrigger(
                            true
                          );
                        }}
                      />
                      EID
                      <input
                        className={styles.ml2}
                        type="radio"
                        name="r_1"
                        id="r_1"
                        value="LASTNAME"
                        checked={
                          searchContextType?.refreshObjUserSearchCriteria !==
                            undefined &&
                            !searchContextType.onChangeTrigger
                            ? searchContextType
                              ?.refreshObjUserSearchCriteria
                              ?.userSearchCriteria
                              ?.searchBy === "LASTNAME"
                            : searchContextType.postData
                              .userSearchCriteria.searchBy ===
                            "LASTNAME"
                        }
                        onChange={(e) => {
                          searchContextType.setPostData({
                            ...searchContextType.postData,
                            userSearchCriteria: {
                              ...searchContextType.postData
                                .userSearchCriteria,
                              searchBy: e.target?.value,
                            },
                          });
                          searchContextType.setOnChangeTrigger(
                            true
                          );
                        }}
                      />
                      Last Name
                      <input
                        id="filterString"
                        name="filterString"
                        className={styles.startingwith}
                        onChange={(e) => {
                          searchContextType.setHotelFilterStringData(
                            e
                          );
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
                    </td>
                  ) : (
                    <td style={{ width: "60px" }}></td>
                  )}
                  <td
                    style={{
                      width: "70px",
                      textAlign: "center",
                      top: "-3px",
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        cursor: "default",
                      }}
                      src={btnSearchSmall}
                      onClick={() => {
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
    </HotelUsersContext.Consumer>
  );
};
