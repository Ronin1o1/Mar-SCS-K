import React, { useContext, useState, useEffect } from "react";
import styles from "../UserSearchFilters.css";
import CSelect from "../../../../common/components/CSelect";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import SalesUsersContext from "../../../userproperties/salesusers/context/SalesUsersContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

export const SalesUserSearchFilters = () => {
  const searchContextType = useContext(SalesUsersContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);

  const getRefreshObjSalesUsers =
    sessionStorage.refreshObjSalesUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjSalesUsers);

  useEffect(() => {
    searchContextType.setRefreshObjUserSearchCriteria(getRefreshObjSalesUsers);
  }, []);

  return (
    <div className={styles.dataTableDivSales}>
      <table className={`${styles.infoTable} ${styles.salesinfoTable}`}>

        <tr>
          <td
            id="ShowAll"
            className={styles.infoTbleFieldName}
          >
            <input
              name="r_1"
              id="r_1"
              type="radio"
              value="ALL"
              onChange={(e) => {
                appContext.setSalesUserSearch({
                  ...appContext.salesUserSearch,
                  userSearchCriteria: {
                    ...appContext.salesUserSearch
                      .userSearchCriteria,
                    searchBy: e.target?.value,
                    filterString: "",
                  },
                });
                searchContextType.setOnChangeTrigger(true);
              }}
              checked={
                getRefreshObjSalesUsers !== false &&
                  getRefreshObjSalesUsers !== undefined &&
                  !searchContextType.onChangeTrigger
                  ? getRefreshObjSalesUsers
                    ?.userSearchCriteria?.searchBy === "ALL"
                  : appContext.salesUserSearch
                    .userSearchCriteria.searchBy === "ALL"
              }
            />
            Show ALL Users
          </td>
          <td className={styles.infoTbleFieldName}>
            Sort by:{" "}
            <CSelect
              name="userSearchCriteria.orderby"
              id="userSearchCriteria.orderby"
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
                {
                  id: "4",
                  value: "City",
                },
                {
                  id: "5",
                  value: "State/Province/Country/Region",
                },
              ]}
              keyField={"id"}
              valField={"value"}
              selectedValue={
                getRefreshObjSalesUsers !== undefined &&
                  !searchContextType.onSortbychangeTrigger
                  ? getRefreshObjSalesUsers
                    ?.userSearchCriteria?.orderby
                  : appContext.salesUserSearch
                    .userSearchCriteria.orderby
              }
              onChange={(event) => {
                appContext.setSalesUserSearch({
                  ...appContext.salesUserSearch,
                  userSearchCriteria: {
                    ...appContext.salesUserSearch
                      .userSearchCriteria,
                    orderby: event.target.value,
                  },
                });
                searchContextType.setOnSortbychangeTrigger(
                  true
                );
              }}
            />
          </td>
        </tr>
        <tr>
          {showStartingWithFilter ? (
            <>
              <td className={styles.FilterFieldName} data-nowrap="">
                <input
                  type="radio"
                  name="r_1"
                  id="r_1"
                  value="EID"
                  checked={
                    getRefreshObjSalesUsers !== false &&
                      getRefreshObjSalesUsers !== undefined &&
                      !searchContextType.onChangeTrigger
                      ? getRefreshObjSalesUsers
                        ?.userSearchCriteria?.searchBy ===
                      "EID"
                      : appContext.salesUserSearch
                        .userSearchCriteria.searchBy ===
                      "EID"
                  }
                  onChange={(e) => {
                    appContext.setSalesUserSearch({
                      ...appContext.salesUserSearch,
                      userSearchCriteria: {
                        ...appContext.salesUserSearch
                          .userSearchCriteria,
                        searchBy: e.target?.value,
                      },
                    });
                    searchContextType.setOnChangeTrigger(
                      true
                    );
                  }}
                />
                <label className={styles.boldText}>
                  {"EID "}
                </label>
                <input
                  type="radio"
                  name="r_1"
                  id="r_1"
                  value="LASTNAME"
                  checked={
                    getRefreshObjSalesUsers !== undefined &&
                      !searchContextType.onChangeTrigger
                      ? getRefreshObjSalesUsers
                        ?.userSearchCriteria?.searchBy ===
                      "LASTNAME"
                      : appContext.salesUserSearch
                        .userSearchCriteria.searchBy ===
                      "LASTNAME"
                  }
                  onChange={(e) => {
                    appContext.setSalesUserSearch({
                      ...appContext.salesUserSearch,
                      userSearchCriteria: {
                        ...appContext.salesUserSearch
                          .userSearchCriteria,
                        searchBy: e.target?.value,
                      },
                    });
                    searchContextType.setOnChangeTrigger(
                      true
                    );
                  }}
                />
                <label className={styles.boldText}>
                  {"Last Name "}
                </label>

                <div>
                  <label
                    className={` ${styles.boldText} ${styles.displayBlock}`}
                  >
                    {"starting with: "}
                  </label>
                  <input
                    id="filterString"
                    name="filterString"
                    className={styles.salesuserfilter}
                    onChange={(e) => {
                      searchContextType.setFilterStringData(e);
                      searchContextType.setOnFilterchangeTrigger(
                        true
                      );
                    }}
                    value={
                      getRefreshObjSalesUsers !== undefined &&
                        !searchContextType.onFilterchangeTrigger
                        ? searchContextType.onChangeTrigger
                          ? appContext.salesUserSearch
                            .userSearchCriteria.filterString
                          : getRefreshObjSalesUsers
                            ?.userSearchCriteria?.filterString
                        : appContext.salesUserSearch
                          .userSearchCriteria.filterString
                    }
                  />
                </div>
              </td>
            </>
          ) : (
            <td style={{ width: "60px" }}></td>
          )}
          <td></td>
          <td className={styles.searchbtn}>
              <img src={btnSearchSmall}
                onClick={() => {
                  searchContextType.onClickSearch();
                }}
              />
          </td>
        </tr>
      </table>
    </div>
  );
};
