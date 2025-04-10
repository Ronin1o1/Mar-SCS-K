import React from "react";
import CSelect from "../../../../common/components/CSelect";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import Settings from "../../../userproperties/adminUsers/static/Settings";
import styles from "./AdminUsersSearchFilter.css";

interface IAdminUsersSearchFiltersProps {
  context?: any;
}

const AdminUsersSearchFilters = (props: IAdminUsersSearchFiltersProps) => {
  const { context } = props;
  return (
    <table className={styles.searchFilterTable}>
      <tbody>
        <tr>
          <td className={styles.showAll}>
            <input
              className={styles.radioShowAll}
              name="radioShowAll"
              id="radioShowAll"
              type="radio"
              value={Settings.labels.All}
              onChange={(e) => {
                context?.setPostData({
                  ...context?.postData,
                  userSearchCriteria: {
                    ...context?.postData.userSearchCriteria,
                    searchBy: e.target?.value,
                    filterString: "",
                  },
                });
              }}
              checked={
                context?.postData.userSearchCriteria.searchBy ===
                Settings.labels.All
              }
            />
            {Settings.labels.ShowAllUsers}
          </td>
          <td className={styles.emptyColumn} />
          <td className={styles.sortBy}>
            {Settings.labels.SortBy}
            <CSelect
              name="userSearchCriteria.orderby"
              id="userSearchCriteria.orderby"
              ddnOptions={Settings.sortByOptions}
              keyField={Settings.labels.Id}
              valField={Settings.labels.Value}
              onChange={(event) => {
                context?.setPostData({
                  ...context?.postData,
                  userSearchCriteria: {
                    ...context?.postData.userSearchCriteria,
                    orderby: parseInt(event.target.value),
                  },
                });
              }}
            />
          </td>
          <td className={styles.emptyColumn} />
        </tr>
        <tr style={{ lineHeight: "8px" }}>
          <td className={styles.emptyColumn} />
          <td className={styles.emptyColumn} />
          <td className={styles.emptyColumn} />
          <td className={styles.smallButton} align="center">
            <img
              src={btnSearchSmall}
              onClick={() => {
                context?.onClickSearch();
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdminUsersSearchFilters;
