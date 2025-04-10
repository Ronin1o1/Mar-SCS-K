/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import styles from "./LimitedSalesFilters.css";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
import UserEditLimitedSalesContext from "../context/UserEditLimitedSalesContext";
import Settings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

let searchContextType = null;

export const SalesFilters = () => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const getAccountPricing = (contextValue) => {
    return contextValue.state.accountPricingArr?.map((item) => {
      return (
        <option value={item.accountpricingtype}>{item.accountpricing}</option>
      );
    });
  };

  const getAccountSegment = (contextValue) => {
    return contextValue.state.accountSegmentArr?.map((item) => {
      return (
        <option value={item.accounttype}>{item.accounttypedescription}</option>
      );
    });
  };

  return (
    <UserEditLimitedSalesContext.Consumer>
      {(UserEditLimitedSalesContextValue) => {
        searchContextType = UserEditLimitedSalesContextValue;
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
                            <td className={styles.nowrapCell}>
                              {Settings.labels.typeTitle}
                              <select
                                defaultValue={(appContext?.user?.isAdminRole && !appContext?.user?.isSAPPAdmin) ? "C": "*"}
                                name="accountpricingtype"
                                id="accountpricingtypeById"
                                className={styles.drpdwnbox}
                                onChange={(event) => {
                                  searchContextType.setAccountSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    accountpricingtype: event.target.value,
                                  });
                                }}
                              >
                                <option value="*">
                                  {Settings.labels.accountTypeParam}
                                </option>
                                {getAccountPricing(searchContextType)}
                              </select>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.nowrapCell}>
                              {Settings.labels.segmentTitle}
                              <select
                                name="accountSegmentList"
                                id="accountSegmentListById"
                                className={styles.drpdwnbox}
                                onChange={(event) => {
                                  searchContextType.setAccountSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    accountsegment: event.target.value,
                                  });
                                }}
                              >
                                <option value="*">
                                  {Settings.labels.accountSegmentParam}
                                </option>
                                {getAccountSegment(searchContextType)}
                              </select>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className="FilterFieldName">
                              <input
                                type="radio"
                                name="r_1"
                                id="r_1"
                                value={Settings.labels.allValue}
                                onChange={(e) => {
                                  searchContextType.setAccountSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    r_1: e.target?.value,
                                    alphaOrderAcct: "",
                                  });
                                }}
                                checked={
                                  searchContextType.searchCriteria.r_1 ===
                                  Settings.labels.allValue
                                }
                              />
                              {Settings.labels.showAllAccounts}
                            </td>
                            <td>&nbsp;</td>
                            <td></td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.nowrapCell}>
                              <input
                                type="radio"
                                name="r_1"
                                id="r_1"
                                value={Settings.labels.filterValue}
                                onChange={(e) => {
                                  searchContextType.setAccountSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    r_1: e.target?.value,
                                  });
                                }}
                                checked={
                                  searchContextType.searchCriteria.r_1 ===
                                    Settings.labels.filterValue ||
                                  searchContextType.searchCriteria
                                    .alphaOrderAcct
                                }
                              />
                              {Settings.labels.showAccountsStart}
                              <input
                                id="alphaOrderAcct"
                                name="alphaOrderAcct"
                                onChange={(e) => {
                                  searchContextType.setAccountSearchCriteria({
                                    ...searchContextType.searchCriteria,
                                    alphaOrderAcct: e.target?.value,
                                    r_1:
                                      e.target?.value === ""
                                        ? Settings.labels.allValue
                                        : Settings.labels.filterValue,
                                  });
                                }}
                                value={
                                  searchContextType.searchCriteria
                                    .alphaOrderAcct
                                }
                              />
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td style={{ width: "70px", textAlign: "center" }}>
                              <img
                                onClick={() => {
                                  if (
                                    searchContextType.searchCriteria
                                      .alphaOrderAcct === ""
                                  ) {
                                    searchContextType.setAccountSearchCriteria({
                                      ...searchContextType.searchCriteria,
                                      r_1: Settings.labels.allValue,
                                    });
                                  }
                                  searchContextType.onClickSearch();
                                }}
                                src={btnSearchSmall}
                              />
                            </td>
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
    </UserEditLimitedSalesContext.Consumer>
  );
};
