import React, { Component } from "react";
import CSelect from "../../../../common/components/CSelect";
import SearchBtnImg from "../../../../common/assets/img/btnSearchSmall.gif";
import AccountStatusListContext from "../context/AccountStatusListContext";
import Settings from "../static/Settings";
import styles from "./AccountStatusFilter.css";
import classnames from "classnames";

export default class AccountStatusFilter extends Component {
  static contextType = AccountStatusListContext;
  constructor(props) {
    super(props);
  }

  handleSearch = () => {
    const highLightRow = document.getElementsByClassName("p-highlight");
    if (highLightRow && highLightRow[0]) {
      highLightRow[0]?.classList?.remove("p-highlight");
    }
    if (
      this.context.state.accountStatusListData.accountStatusUpdate.length > 0
    ) {
      this.context.saveAccountStatusLists();
      //get the latest data
      this.context.searchAccountStatusLists(1);
    } else {
      //get the latest data
      this.context.searchAccountStatusLists(1);
    }
  };

  componentDidMount() {
    if (localStorage.getItem("setLocalStorage") == "Y") {
      document.getElementById("filterSearch").click();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <table className={styles.zero_Height}>
            <tbody>
              <tr>
                <td className={styles.topAlign}>
                  <table
                    className={classnames(
                      styles.Filter,
                      styles.zero_Height,
                      styles.accountStatusFilterTable
                    )}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Period : */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .period.label
                                  }
                                  <CSelect
                                    selectedValue={
                                      localStorage.getItem("Period") != null
                                        ? parseInt(
                                            localStorage.getItem("Period")
                                          )
                                        : this.context.state
                                            .accountStatusListData.defaultPeriod
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.period.id
                                    }
                                    ddnOptions={
                                      this.context.state.accountStatusListData
                                        .accountStatusFilterLists.periodList
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.period.keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.period.valField
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Account Type : */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .accountType.label
                                  }
                                  <CSelect
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.accountType.id
                                    }
                                    ddnOptions={
                                      this.context.state.accountStatusListData
                                        .accountStatusFilterLists
                                        .accountPricingTypeList
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountType.keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountType.valField
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    selectedValue={
                                      localStorage.getItem(
                                        "accountpricingtype"
                                      ) != null
                                        ? localStorage.getItem(
                                            "accountpricingtype"
                                          )
                                        : this.context.state
                                            .accountStatusListData
                                            .defaultAccountTypeValue
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Show Account status with: */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .accountStatusRefList.label
                                  }
                                  <CSelect
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.accountStatusRefList.id
                                    }
                                    ddnOptions={
                                      this.context.state.accountStatusListData
                                        .accountStatusFilterLists
                                        .accountStatusRefList
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountStatusRefList
                                        .keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountStatusRefList
                                        .valField
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    selectedValue={
                                      localStorage.getItem("accountstatus") !=
                                      null
                                        ? parseInt(
                                            localStorage.getItem(
                                              "accountstatus"
                                            )
                                          )
                                        : this.context.state
                                            .accountStatusListData
                                            .defaultaccountStatusRefListValue
                                    }
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <>&nbsp;</>
                        </td>
                        <td>
                          <table className="Filter zero_Height">
                            <tbody>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Show ALL Accounts : */}
                                  <input
                                    type="radio"
                                    key={
                                      this.context.state?.accountStatusListData
                                        ?.searchTerms?.isShowAllAccounts
                                    }
                                    name={
                                      Settings.accountStatusList.filter
                                        .formFields.showGroup
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.showAll.id
                                    }
                                    checked={
                                      this.context?.state?.accountStatusListData
                                        ?.searchTerms?.isShowAllAccounts ||
                                      false
                                    }
                                    value={
                                      Settings.accountStatusList.filter
                                        .formFields.showAll.value
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                  />
                                  <label
                                    htmlFor={
                                      Settings.accountStatusList.filter
                                        .formFields.showAll.value
                                    }
                                  >
                                    {
                                      Settings.accountStatusList.filter
                                        .formFields.showAll.label
                                    }
                                  </label>
                                </td>
                              </tr>
                              <tr>
                                <td className="FilterFieldName nowrapCell">
                                  {/* Show Accounts starting with: */}
                                  <input
                                    type="radio"
                                    key={
                                      this.context?.state?.accountStatusListData
                                        ?.searchTerms?.isStringSearch
                                    }
                                    name={
                                      Settings.accountStatusList.filter
                                        .formFields.showGroup
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.showStart.id
                                    }
                                    value={
                                      Settings.accountStatusList.filter
                                        .formFields.showStart.value
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    checked={
                                      this.context?.state?.accountStatusListData
                                        ?.searchTerms?.isStringSearch || false
                                    }
                                  />
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .showStart.label
                                  }
                                  <input
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.showStart.textId
                                    }
                                    value={
                                      this.context.state.accountStatusListData
                                        .searchTerms.filterString
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    style={{ height: "15px" }}
                                    autoComplete="off"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Account Segment: */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .accountSegment.label
                                  }
                                  <CSelect
                                    selectedValue={
                                      localStorage.getItem("accountsegment") !=
                                      null
                                        ? localStorage.getItem("accountsegment")
                                        : this.context.state
                                            .accountStatusListData
                                            .defaultSegment
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.accountSegment.id
                                    }
                                    ddnOptions={
                                      this.context.state.accountStatusListData
                                        .accountStatusFilterLists
                                        .accountSegmentList
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountSegment.keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.accountSegment.valField
                                    }
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td style={{ width: "30px" }}>
                          <>&nbsp;</>
                        </td>
                        <td>
                          <table className="Filter zero_Height">
                            <tbody>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Sort by: */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .sort.label
                                  }
                                  <CSelect
                                    selectedValue={
                                      localStorage.getItem("orderby") != null
                                        ? localStorage.getItem("orderby")
                                        : this.context.state
                                            .accountStatusListData
                                            .defaultSortByValue
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.sort.id
                                    }
                                    ddnOptions={
                                      this.context?.appContext?.user
                                        ?.isLimitedSalesUser ||
                                      this.context?.appContext?.user
                                        ?.isSalesUser
                                        ? Settings.accountStatusList.filter
                                            .salesRoleSortOptions
                                        : Settings.accountStatusList.filter
                                            .sortOptions
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.sort.keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.sort.valField
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* Show Portfolio */}
                                  <input
                                    type="checkbox"
                                    name={
                                      Settings.accountStatusList.filter
                                        .formFields.showPortfolio.id
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.showPortfolio.id
                                    }
                                    checked={
                                      localStorage.getItem(
                                        "showPortfolioType"
                                      ) != null
                                        ? true
                                        : this.context.state.isShowAllAccounts
                                    }
                                    value={
                                      Settings.accountStatusList.filter
                                        .formFields.showPortfolio.value
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                  />
                                  <label
                                    htmlFor={
                                      Settings.accountStatusList.filter
                                        .formFields.showPortfolio.value
                                    }
                                  >
                                    {
                                      Settings.accountStatusList.filter
                                        .formFields.showPortfolio.label
                                    }
                                  </label>
                                  {/* Portfolio options: */}
                                  {this.context.state.accountStatusListData
                                    .searchTerms.toShowPortfolio ||
                                  localStorage.getItem("showPortfolio") !=
                                    null ? (
                                    <CSelect
                                      id={
                                        Settings.accountStatusList.filter
                                          .formFields.portfolioOption.id
                                      }
                                      //selectedValue="A" //{this.context.state.accountStatusListData.defaultPortfolioOptionByValue}
                                      selectedValue={
                                        localStorage.getItem("showPortfolio") !=
                                        null
                                          ? localStorage.getItem(
                                              "showPortfolio"
                                            )
                                          : "A"
                                      }
                                      ddnOptions={
                                        Settings.accountStatusList.filter
                                          .portfolioOptions
                                      }
                                      onChange={(e) =>
                                        this.context.accountStatusChangeHandler(
                                          e
                                        )
                                      }
                                      keyField={
                                        Settings.accountStatusList.filter
                                          .formFields.portfolioOption.keyField
                                      }
                                      valField={
                                        Settings.accountStatusList.filter
                                          .formFields.portfolioOption.valField
                                      }
                                    />
                                  ) : null}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  {/* PAS Manager: */}
                                  {
                                    Settings.accountStatusList.filter.formFields
                                      .pasManager.label
                                  }
                                  <CSelect
                                    selectedValue={
                                      localStorage.getItem("pasManager") != null
                                        ? parseInt(
                                            localStorage.getItem("pasManager")
                                          )
                                        : this.context.state
                                            .accountStatusListData
                                            .defaultPASManager
                                    }
                                    id={
                                      Settings.accountStatusList.filter
                                        .formFields.pasManager.id
                                    }
                                    ddnOptions={
                                      this.context.state.accountStatusListData
                                        .accountStatusFilterLists.pasManagerList
                                    }
                                    onChange={(e) =>
                                      this.context.accountStatusChangeHandler(e)
                                    }
                                    keyField={
                                      Settings.accountStatusList.filter
                                        .formFields.pasManager.keyField
                                    }
                                    valField={
                                      Settings.accountStatusList.filter
                                        .formFields.pasManager.valField
                                    }
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td style={{ width: "30px" }}>
                          <>&nbsp;</>
                        </td>
                        <td>
                          {/* Search */}
                          <table className="Filter zero_Height">
                            <tbody>
                              <tr>
                                <td>
                                  <>&nbsp;</>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <>&nbsp;</>
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.buttonTD}>
                                  <div className={styles.searchBtnDiv}>
                                    <img
                                      onClick={this.handleSearch}
                                      src={SearchBtnImg}
                                      className={styles.searchBtn}
                                      id={"filterSearch"}
                                    />
                                  </div>
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
  }
}
