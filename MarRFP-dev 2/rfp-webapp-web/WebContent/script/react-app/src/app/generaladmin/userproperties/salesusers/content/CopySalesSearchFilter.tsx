import React from "react";
import styles from "./SalesFilters.css";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import CSelect from "../../../../common/components/CSelect";
import UserEditSalesContext from "../context/UserEditSalesContext";
import Settings from "../static/Settings";

let searchContextType = null;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CopySalesSearchFilter = ({ addSpace = true }) => {
  const checkSelectedFilter = (e) => {
    const searchParams = { ...searchContextType.copySearchCriteria };
    searchParams.dialogFilterString = e.target?.value;
    if (e.target?.value.length >= 0) {
      if (searchParams.dialogSearchBy == Settings.labels.allValue) {
        searchParams.rcopy_1 = Settings.tableColumns.eid.header;
        searchParams.dialogSearchBy = Settings.tableColumns.eid.header;
      }
      if (e.target?.value.length != 0) {
        searchContextType.setCopySearchCriteria(searchParams);
      } else {
        searchParams.dialogSearchBy =
          searchContextType.copySearchCriteria.dialogSearchBy;
        searchContextType.setCopySearchCriteria(searchParams);
      }
    }
  };

  return (
    <UserEditSalesContext.Consumer>
      {(UserEditSalesContextValue) => {
        searchContextType = UserEditSalesContextValue;
        return (
          <div id="aps" style={{ display: "block", backgroundColor: "#eff0ec" }}>
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
                            <td>
                              <input
                                autoFocus
                                type="radio"
                                name="rcopy_1"
                                id="rcopy_1"
                                value={Settings.labels.allValue}
                                onChange={(e) => {
                                  searchContextType.showAllUsersChangeHandler(
                                    e
                                  );
                                }}
                                checked={
                                  searchContextType.copySearchCriteria
                                    .dialogSearchBy === Settings.labels.allValue
                                }
                              />
                              {Settings.labels.showAllUsers}
                            </td>
                            <td style={{ width: "30px" }}>&nbsp;</td>
                            <td className={styles.nowrapCell}>
                              {Settings.labels.sortBy}
                              <CSelect
                                name="copyFilterBy"
                                id="copyFilterBy"
                                ddnOptions={[
                                  {
                                    id: "1",
                                    value: Settings.tableColumns.eid.header,
                                  },
                                  {
                                    id: "2",
                                    value: Settings.tableColumns.lname.header,
                                  },
                                  {
                                    id: "3",
                                    value: Settings.tableColumns.fname.header,
                                  },
                                ]}
                                selectedValue={
                                  searchContextType.copySearchCriteria.orderby
                                }
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
                            <td style={{ width: "30px" }}>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className="nowrapCell">
                              <input
                                type="radio"
                                name="rcopy_1"
                                id="rcopy_1"
                                value={Settings.tableColumns.eid.header}
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    rcopy_1: e.target?.value,
                                    dialogSearchBy: e.target?.value,
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
                                name="rcopy_1"
                                id="rcopy_1"
                                value={Settings.labels.lastNameValue}
                                onChange={(e) => {
                                  searchContextType.setCopySearchCriteria({
                                    ...searchContextType.copySearchCriteria,
                                    rcopy_1: e.target?.value,
                                    dialogSearchBy: e.target?.value,
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
                                  checkSelectedFilter(e);
                                }}
                                value={
                                  searchContextType.copySearchCriteria
                                    .dialogFilterString
                                }
                              />
                            </td>
                            <td style={{ width: "30px" }}>&nbsp;</td>
                            <td style={{ width: "50px", textAlign: "center" }}>
                              <img
                                onClick={() => {
                                  searchContextType.onCopyClickSearch();
                                }}
                                src={btnSearchSmall}
                              />
                            </td>
                          </tr>
                          {addSpace && (
                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                          )}
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
    </UserEditSalesContext.Consumer>
  );
};
