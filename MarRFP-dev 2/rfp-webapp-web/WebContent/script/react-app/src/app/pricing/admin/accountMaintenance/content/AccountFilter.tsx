import React, { Component } from "react";
import AccountListContext from "../context/AccountListContext";
import CSelect from "../../../../common/components/CSelect";
import SearchBtnImg from "../../../../common/assets/img/btnSearchSmall.gif";
import Settings from "../static/Settings";
import styles from "./AccountFilter.css";
import Util from "../../utils/Utils";

export default class AccountFilter extends Component {
  static contextType = AccountListContext;

  constructor(props) {
    super(props);
    this.state = {
      searchTerms: {
        searchperiod: null,
        r_1: null,
        orderby: null,
        accountpricingtype: null,
        filterString: "",
        accountsegment: null,
        strPage: { page: 1 },
        totalPages: null,
        period: null,
      },
      isShowAllAccounts: true,
      isStringSearch: false,
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      searchTerms: this.context?.state?.searchTerms,
      isShowAllAccounts: this.context?.state?.isShowAllAccounts,
      isStringSearch: this.context?.state?.isStringSearch,
    });
  }

  onAccountChangeHandler = (e) => {
    const { type, id, value } = e.target;
    const searchFilterData = { ...this.state.searchTerms };

    let isShowAllAccounts = true;
    let isStringSearch = false;

    if (
      searchFilterData.filterString != null &&
      searchFilterData.filterString != ""
    ) {
      isStringSearch = true;
      isShowAllAccounts = false;
    }

    if (type === "radio" && value === "ALL") {
      searchFilterData.filterString = "";
      isShowAllAccounts = true;
      isStringSearch = false;
    } else if (type === "radio" && value === "FILTER") {
      isShowAllAccounts = false;
      isStringSearch = true;
    }

    if (type === "text" && id === "filterString") {
      if (Util.toggleInputRadio(event)) {
        searchFilterData.filterString = value;
        isShowAllAccounts = false;
        isStringSearch = true;
      }
    }

    if (
      type === "text" &&
      id === Settings.accountList.currentPageId.currentPage
    ) {
      searchFilterData.strPage.page = value;
    }
    if (id == "accountsegment" && value == "All Account Segments") {
      searchFilterData[id] =
        Settings.accountList.allAccountSegments.accountsegment;
    } else {
      searchFilterData[id] = value;
    }

    if (isShowAllAccounts) {
      searchFilterData.r_1 =
        Settings.accountList.filter.formFields.showAll.value;
    } else {
      searchFilterData.r_1 =
        Settings.accountList.filter.formFields.showStart.value;
    }

    this.setState({
      ...this.state,
      searchTerms: searchFilterData,
      isShowAllAccounts: isShowAllAccounts,
      isStringSearch: isStringSearch,
    });
  };

  render() {
    return (
      <table className={styles.gridContainer}>
        <tbody>
          <tr className={styles.rowHeight30}>
            <td>
              {Settings.accountList.filter.formFields.period.label}
              <CSelect
                selectedValue={this.context.state.defaultPeriod}
                id={Settings.accountList.filter.formFields.period.id}
                ddnOptions={
                  this.context.state.accountListData.accountfilterlists
                    .periodList
                }
                keyField={
                  Settings.accountList.filter.formFields.period.keyField
                }
                valField={
                  Settings.accountList.filter.formFields.period.valField
                }
                onChange={(e) => this.context.accountChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="radio"
                name={Settings.accountList.filter.formFields.showGroup}
                id={Settings.accountList.filter.formFields.showAll.id}
                checked={this.state?.isShowAllAccounts}
                value={Settings.accountList.filter.formFields.showAll.value}
                onChange={(e) => this.onAccountChangeHandler(e)}
                onBlur={(e) => this.context.accountChangeHandler(e)}
              />
              <label
                htmlFor={Settings.accountList.filter.formFields.showAll.value}
                style={{ fontWeight: "bold" }}
              >
                {Settings.accountList.filter.formFields.showAll.label}
              </label>
            </td>
            <td>
              {Settings.accountList.filter.formFields.sort.label}

              <CSelect
                selectedValue={this.context.state.defaultSortByValue}
                id={Settings.accountList.filter.formFields.sort.id}
                ddnOptions={Settings.accountList.filter.sortOptions}
                onChange={(e) => this.context.accountChangeHandler(e)}
                keyField={Settings.accountList.filter.formFields.sort.keyField}
                valField={Settings.accountList.filter.formFields.sort.valField}
              />
            </td>
          </tr>
          <tr>
            <td>
              {Settings.accountList.filter.formFields.accountType.label}
              <CSelect
                id={Settings.accountList.filter.formFields.accountType.id}
                ddnOptions={
                  this.context.state.accountListData.accountfilterlists
                    .accountPricingTypeList
                }
                keyField={
                  Settings.accountList.filter.formFields.accountType.keyField
                }
                valField={
                  Settings.accountList.filter.formFields.accountType.valField
                }
                onChange={(e) => this.context.accountChangeHandler(e)}
                selectedValue={this.context.state.defaultAccountTypeValue}
              />
            </td>
            <td>
              <input
                type="radio"
                name={Settings.accountList.filter.formFields.showGroup}
                id={Settings.accountList.filter.formFields.showStart.id}
                value={Settings.accountList.filter.formFields.showStart.value}
                onChange={(e) => this.onAccountChangeHandler(e)}
                checked={this.state?.isStringSearch}
                onBlur={(e) => this.context.accountChangeHandler(e)}
              />
              {Settings.accountList.filter.formFields.showStart.label}
              <input
                id={Settings.accountList.filter.formFields.showStart.textId}
                value={this.state?.searchTerms?.filterString}
                onChange={(e) => this.onAccountChangeHandler(e)}
                autoComplete="off"
                onBlur={(e) => this.context.accountChangeHandler(e)}
              />
            </td>
          </tr>
          <tr className={styles.rowHeight30}>
            <td>
              {Settings.accountList.filter.formFields.accountSegment.label}
              <CSelect
                selectedValue={this.context.state.defaultSegmentValue}
                id={Settings.accountList.filter.formFields.accountSegment.id}
                ddnOptions={
                  this.context.state.accountListData.accountfilterlists
                    .accountSegmentList
                }
                onChange={(e) => this.context.accountChangeHandler(e)}
                keyField={
                  Settings.accountList.filter.formFields.accountSegment.keyField
                }
                valField={
                  Settings.accountList.filter.formFields.accountSegment.valField
                }
              />
            </td>
            <td>&nbsp;</td>
            <td className={styles.searchBtnDiv}>
              <img
                onClick={() => {
                  this.context.setResetInput(true);
                  this.context.searchAccountLists();
                }}
                src={SearchBtnImg}
                className={styles.searchBtn}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
