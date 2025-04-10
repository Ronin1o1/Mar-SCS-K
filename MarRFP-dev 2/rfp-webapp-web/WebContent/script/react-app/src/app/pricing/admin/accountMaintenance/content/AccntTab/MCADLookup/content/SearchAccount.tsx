import React, { Component } from "react";
import Settings from "../static/Settings";

import McadlookupContext, {
  McadlookupContextProvider,
} from "../context/McadlookupContext";
import styles from "./SearchAccount.css";

import CSelect from "../../../../../../../common/components/CSelect";
//import CModal from "../../../../../../../common/components/CModal";
import searchBtn from "../../../../../../../common/assets/img/button/btnSearchSmall.gif";

//import CSuspense from "../../../../../../../common/components/CSuspense";
import AccountListContext from "../../../../context/AccountListContext";

let contextType = null;
let parentContextType = null;

const accountRecId = null;

const period = null;

interface IState {}
interface IProps {}
interface ISearchCriteria {
  businessname?: string;
  businesslevel?: string;
  country?: string;
  radio?: any;
}

class SearchAccount extends Component<IProps, ISearchCriteria, IState> {
  static contextType = McadlookupContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    document.addEventListener("keydown", this.handleArrowBtn);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleArrowBtn);
  }

  handleArrowBtn = (event) => {
    if (event.keyCode == 39) {
      const focusedElem = document.activeElement;
      if (focusedElem.name && focusedElem.name == "search_for_name") {
        const elm = Array.from(document.getElementsByName("search_for_id"))[0];
        this.context.onChangeData({
          target: { id: elm.id, value: elm.value, name: elm.name },
        });
        elm.focus();
      }
    } else if (event.keyCode == 37) {
      const focusedElem = document.activeElement;
      if (focusedElem.name && focusedElem.name == "search_for_id") {
        const elm = Array.from(
          document.getElementsByName("search_for_name")
        )[0];
        this.context.onChangeData({
          target: { id: elm.id, value: elm.value, name: elm.name },
        });
        elm.focus();
      }
    }
  };

  formSubmissionHandler = () => {
    let searchCriteria: ISearchCriteria;
    searchCriteria.businesslevel = "1";
    searchCriteria.businessname = "2";
    searchCriteria.country = "3";
    this.context.searchAccount(searchCriteria);
  };

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          parentContextType = accountListContext;
          return (
            <McadlookupContext.Consumer>
              {(mcadlookupContext) => {
                contextType = mcadlookupContext;

                if (this.context.state.isComplete) {
                  return (
                    <>
                      <div className={styles.editModelContentDiv}>
                        <div className={styles.gridContainer}>
                          <div className={styles.fieldName}>
                            <table className={styles.tableHeader}>
                              <tr>
                                <td
                                  className={[
                                    styles.headerWidth,
                                    styles.headerFieldName,
                                  ].join(" ")}
                                >
                                  <input
                                    type="radio"
                                    name="search_for_name"
                                    id="searchtype"
                                    onChange={this.context.onChangeData}
                                    value={
                                      Settings.searchAccount.searchByName.id
                                    }
                                    defaultChecked={true}
                                    checked={
                                      this.context.state.radio ===
                                      "searchByName"
                                    }
                                  />
                                  {Settings.searchAccount.searchByName.label}
                                </td>
                                <td className={styles.headerFieldName}>
                                  <input
                                    tabIndex={-1}
                                    type="radio"
                                    name="search_for_id"
                                    id="searchtype"
                                    onChange={this.context.onChangeData}
                                    value={Settings.searchAccount.searchByID.id}
                                    checked={
                                      this.context.state.radio === "searchByID"
                                    }
                                  />
                                  {Settings.searchAccount.searchByID.label}
                                </td>
                              </tr>
                            </table>
                            {this.context.state.isSearchFlag ? (
                              <table className={styles.tableContent}>
                                <tr>
                                  <td
                                    align="left"
                                    className={styles.FilterFieldName250}
                                  >
                                    {
                                      Settings.searchAccount.lblBusinessName
                                        .label
                                    }
                                  </td>
                                  <td className="FilterFieldName" width="300px">
                                    <input
                                      className={styles.width250}
                                      id={
                                        Settings.searchAccount.lblBusinessName
                                          .id
                                      }
                                      onChange={this.context.onChangeData}
                                      value={
                                        this.context.state.setMcadData
                                          .businessName
                                      }
                                    />
                                  </td>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                </tr>
                                <tr></tr>

                                <tr>
                                  <td
                                    align="left"
                                    className={styles.FilterFieldName250}
                                  >
                                    {
                                      Settings.searchAccount.ddnBusinessLevel
                                        .label
                                    }
                                  </td>

                                  <CSelect
                                    id={
                                      Settings.searchAccount.ddnBusinessLevel.id
                                    }
                                    selectedValue={
                                      this.context.state.setMcadData
                                        .businessLevel
                                    }
                                    ddnOptions={
                                      this.context.state.MCADlookupInfo
                                        .businessLevelDropDowns
                                        .businessLevelList
                                    }
                                    keyField={
                                      Settings.searchAccount.businessLevelList
                                        .businessLevelval
                                    }
                                    valField={
                                      Settings.searchAccount.businessLevelList
                                        .businessLeveltext
                                    }
                                    onChange={(event) =>
                                      this.context.onChange(
                                        Settings.searchAccount.ddnBusinessLevel
                                          .id,
                                        event
                                      )
                                    }
                                  />
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    className={styles.FilterFieldName250}
                                  >
                                    {
                                      Settings.searchAccount.ddnCountryRegion
                                        .label
                                    }
                                  </td>
                                  <td width="300px">
                                    <CSelect
                                      id={
                                        Settings.searchAccount.ddnCountryRegion
                                          .id
                                      }
                                      selectedValue={
                                        this.context.state.setMcadData
                                          .countryRegion
                                      }
                                      ddnOptions={
                                        this.context.state.MCADlookupInfo
                                          .mcadDropDowns.countries
                                      }
                                      keyField={
                                        Settings.searchAccount.countries
                                          .countries
                                      }
                                      valField={
                                        Settings.searchAccount.countries
                                          .countryname
                                      }
                                      onChange={(event) =>
                                        this.context.onChange(
                                          Settings.searchAccount
                                            .ddnCountryRegion.id,
                                          event
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <div style={{ alignItems: "end" }}>
                                      <img
                                        src={searchBtn}
                                        id={
                                          Settings.searchAccount.Button1.label
                                        }
                                        onClick={this.context.onSearchClicked}
                                        className={styles.cursorpointer}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            ) : (
                              <table>
                                <tr>
                                  <td className={styles.FilterFieldName250}>
                                    {
                                      Settings.searchAccount.ddnBusinessIdlbl
                                        .label
                                    }
                                  </td>
                                  <td className={styles.width300}>
                                    <input
                                      className={styles.width250bold}
                                      id={
                                        Settings.searchAccount.ddnBusinessIdlbl
                                          .id
                                      }
                                      onChange={this.context.onChangeData}
                                      onBlur={this.context.validate}
                                      value={
                                        this.context.state.setMcadData
                                          .ddnbusinessID
                                      }
                                    />
                                  </td>
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    className={styles.FilterFieldName250}
                                  >
                                    {
                                      Settings.searchAccount.ddnBusinessLevellbl
                                        .label
                                    }
                                  </td>
                                  <CSelect
                                    id={
                                      Settings.searchAccount.ddnBusinessLevellbl
                                        .id
                                    }
                                    selectedValue={
                                      this.context.state.setMcadData
                                        .businessLevelID
                                    }
                                    ddnOptions={
                                      this.context.state
                                        .businessLevelDropDownsID
                                        .businessLevelList
                                    }
                                    keyField={
                                      Settings.searchAccount.businessLevelList
                                        .businessLevelval
                                    }
                                    valField={
                                      Settings.searchAccount.businessLevelList
                                        .businessLeveltext
                                    }
                                    onChange={(event) =>
                                      this.context.onChange(
                                        Settings.searchAccount
                                          .ddnBusinessLevellbl.id,
                                        event
                                      )
                                    }
                                  />

                                  <div>
                                    <img
                                      src={searchBtn}
                                      id={Settings.searchAccount.Button1.label}
                                      className={styles.searchbtn}
                                      onClick={this.context.onSearchClicked}
                                    />
                                  </div>
                                </tr>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              }}
            </McadlookupContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
export default SearchAccount;
