import React from "react";
import styles from "./MarshaSearchFilters.css";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import CSelect from "../../../../common/components/CSelect";
import UserEditContext from "../context/UserEditContext";
import Settings from "../static/Settings";

let searchContextType = null;
export const MarshaSearchFilters = () => {
  return (
    <UserEditContext.Consumer>
      {(UserEditContextValue) => {
        searchContextType = UserEditContextValue;
        return (
          <div id="aps" style={{ display: "block" }}>
            <table className={styles.searchFieldsContainer}>
              <tbody>
                <tr>
                  <td>
                    <div id="hotelSearch">
                      <table
                        className={`${styles.Filter} ${styles.zeroHeight}`}
                      >
                        <tbody>
                          <tr>
                            <td className={styles.FilterFieldNameText}>
                              <input
                                type="radio"
                                name="p_1"
                                id="p_1"
                                value={Settings.labels.allValue}
                                onClick={(e) => {
                                  searchContextType.setSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    searchBy: e.target?.value,
                                    p_1: e.target?.value,
                                    alphaOrderProp: "",
                                  });
                                }}
                                checked={
                                  searchContextType.searchCriteria.searchBy ===
                                  Settings.labels.allValue
                                }
                              />
                              {Settings.labels.showAllMarshaCodes}
                            </td>
                            <td>&nbsp;</td>
                            <td></td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.nowrapCell}>
                              <input
                                type="radio"
                                name="p_1"
                                id="p_1"
                                value={Settings.labels.filterValue}
                                onChange={(e) => {
                                  searchContextType.setSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    searchBy: e.target?.value,
                                    p_1: e.target?.value,
                                    alphaOrderProp: "",
                                  });
                                }}
                                checked={
                                  searchContextType.searchCriteria.searchBy ===
                                    Settings.labels.filterValue ||
                                  searchContextType.searchCriteria
                                    .alphaOrderProp
                                }
                              />
                              {Settings.alerts.showMarshaCodeStartsWith}
                              <input
                                id="alphaOrderProp"
                                name="alphaOrderProp"
                                onChange={(e) => {
                                  searchContextType.setSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    alphaOrderProp: e.target?.value,
                                    p_1:
                                      e.target?.value === ""
                                        ? Settings.labels.allValue
                                        : Settings.labels.filterValue,
                                  });
                                }}
                                value={
                                  searchContextType.searchCriteria
                                    .alphaOrderProp
                                }
                              />
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.nowrapCell}>
                              &nbsp;&nbsp;{Settings.labels.filterBy}
                              <CSelect
                                name="filterByName"
                                id="filterById"
                                ddnOptions={[
                                  {
                                    id: 0,
                                    value: "*",
                                  },
                                  {
                                    id: "M",
                                    value: "Managed",
                                  },
                                  {
                                    id: "F",
                                    value: "Franchise",
                                  },
                                ]}
                                keyField={"id"}
                                valField={"value"}
                                onChange={(event) => {
                                  searchContextType.setSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    filterByMorF: event.target.value,
                                  });
                                }}
                              />
                            </td>

                            <td>&nbsp;</td>
                            <td style={{ width: "70px", textAlign: "center" }}>
                              <img
                                onClick={() => {
                                  searchContextType.onClickSearch(
                                    1,
                                    "SearchFilter"
                                  ),
                                    sessionStorage.setItem(
                                      "LSquickSelectMessage",
                                      ""
                                    );
                                }}
                                src={btnSearchSmall}
                              />
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }}
    </UserEditContext.Consumer>
  );
};
