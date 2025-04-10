import React from "react";
import styles from "./MarshaSearchFilters.css";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import CSelect from "../../../../common/components/CSelect";
import UserEditContext from "../context/UserEditContext";
import Settings from "../static/Settings";

let searchContextType = null;
export const CopySearchFilter = () => {
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
                            <td className="FilterFieldName">
                              <input
                                type="radio"
                                name="r_1"
                                id="r_1"
                                value={Settings.labels.allValue}
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    r_1: e.target?.value,
                                    dialogSearchBy: e.target?.value,
                                    dialogFilterString: "",
                                  });
                                }}
                                checked={
                                  searchContextType.copySearchCriteria.r_1 ===
                                    Settings.labels.allValue ||
                                  searchContextType.copySearchCriteria
                                    .dialogSearchBy === Settings.labels.allValue
                                }
                              />
                              {Settings.labels.showAllUsers}
                            </td>
                            <td>
                              <>&nbsp;</>
                            </td>
                            <td>
                              <>&nbsp;</>
                            </td>
                            <td className="FilterFieldName">
                              {Settings.labels.sortBy}
                              <CSelect
                                name="copyFilterBy"
                                id="copyFilterBy"
                                ddnOptions={[
                                  {
                                    id: "1",
                                    value: "EID",
                                  },
                                  {
                                    id: "2",
                                    value: "Last Name",
                                  },
                                  {
                                    id: "3",
                                    value: "First Name",
                                  },
                                ]}
                                keyField={"id"}
                                valField={"value"}
                                onChange={(event) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    orderby: event.target.value,
                                  });
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="nowrapCell">
                              <input
                                type="radio"
                                name="r_1"
                                id="r_1"
                                value={Settings.tableColumns.eid.header}
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    r_1: e.target?.value,
                                    dialogSearchBy: e.target?.value,
                                    dialogFilterString: "",
                                  });
                                }}
                                checked={
                                  searchContextType.copySearchCriteria
                                    .dialogSearchBy ===
                                  Settings.tableColumns.eid.header
                                }
                              />
                              {Settings.tableColumns.eid.header}
                              <>&nbsp;</>
                              <input
                                type="radio"
                                name="r_1"
                                id="r_1"
                                value={Settings.labels.lastNameValue}
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    r_1: e.target?.value,
                                    dialogSearchBy: e.target?.value,
                                    dialogFilterString: "",
                                  });
                                }}
                                checked={
                                  searchContextType.copySearchCriteria
                                    .dialogSearchBy ===
                                  Settings.labels.lastNameValue
                                }
                              />
                              {Settings.tableColumns.lname.header}
                            </td>
                            <td>
                              <div>{Settings.labels.startingWith}</div>
                              <input
                                id="dialogFilterString"
                                name="dialogFilterString"
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    dialogFilterString: e.target?.value,
                                    dialogSearchBy:
                                      e.target?.value === ""
                                        ? Settings.labels.allValue
                                        : searchContextType.copySearchCriteria
                                            .dialogSearchBy ===
                                          Settings.labels.lastNameValue
                                        ? Settings.labels.lastNameValue
                                        : Settings.tableColumns.eid.header,
                                  });
                                }}
                                value={
                                  searchContextType.copySearchCriteria
                                    .dialogFilterString
                                }
                              />
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td style={{ width: "70px", textAlign: "center" }}>
                              <img
                                onClick={() => {
                                  searchContextType.onCopyClickSearch();
                                }}
                                src={btnSearchSmall}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
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
