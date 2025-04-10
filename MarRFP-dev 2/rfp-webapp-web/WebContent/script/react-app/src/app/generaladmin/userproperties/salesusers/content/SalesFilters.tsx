/* eslint-disable react/jsx-key */
import React from "react";
import styles from "./SalesFilters.css";
import btnSearchSmall from "../../../../common/assets/img/button/btnSearchSmall.gif";
//import CSelect from "../../../../common/components/CSelect";
import UserEditSalesContext from "../context/UserEditSalesContext";
import Settings from "../static/Settings";

let searchContextType = null;

export const SalesFilters = () => {
  const getAccountPricing = (contextValue) => {
    let checkedPricing = false;
    return contextValue.state.accountPricingArr?.map((item) => {
      checkedPricing = item.accountpricingtype == "C" ? true : false;
      return (
        <option value={item.accountpricingtype} selected={checkedPricing}>
          {item.accountpricing}
        </option>
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

  const checkSelectedFilter = (e) => {
    const searchParams = { ...searchContextType.searchCriteria };
    searchParams.alphaOrderAcct = e.target?.value;
    if (e.target?.value.length > 0) {
      if (searchParams.r_1 == Settings.labels.allValue) {
        searchParams.r_1 = Settings.labels.filterValue;
      }
    }
    searchContextType.setAccountSearchCriteria(searchParams);
  };

  return (
    <UserEditSalesContext.Consumer>
      {(UserEditSalesContextValue) => {
        searchContextType = UserEditSalesContextValue;
        return (
          <div id="aps" style={{ display: "block", backgroundColor: "#eff0ec"}}>
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
                            <td className="nowrapCell">
                              {Settings.labels.typeTitle}
                              <select
                                name="accountpricingtype"
                                id="accountpricingtypeById"
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
                            <td className="nowrapCell">
                              {Settings.labels.segmentTitle}
                              <select
                                name="accountSegmentList"
                                id="accountSegmentListById"
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
                            <td className="nowrapCell">
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
                                  Settings.labels.filterValue
                                }
                              />
                              {Settings.labels.showAccountsStart}
                              <input
                                id="alphaOrderAcct"
                                name="alphaOrderAcct"
                                onChange={(e) => {
                                  checkSelectedFilter(e);
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
                                  searchContextType.onClickSearch("search");
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
    </UserEditSalesContext.Consumer>
  );
};
