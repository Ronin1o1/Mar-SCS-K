import React, { Component } from "react";
import CSelect from "../../../../../common/components/CSelect";
import CSearchFilter from "../../../../../common/components/CSearchFilter";
import Submitbtn from "../../../../../common/assets/img/button/btnSubmit.gif";
import Settings from "../static/Settings";
import styles from "./EditAccountPlanSapp.css";
import EditAccountPlanSappApi from "../service/EditAccountPlanSappApi";
import EditAccountPlanSappContext, {
  EditAccountPlanSappContextProvider,
} from "../context/EditAccountPlanSappContext";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";

let contextType = null;

export default class SelectSappAccount extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    contextType.setIsMounted(true);
    EditAccountPlanSappApi.getPeriods().then((data) => {
      contextType.setLinkedMsg(data.linkedMsg);
      const sappAccountData = { ...contextType.state };
      sappAccountData.year = data.periodList;
      contextType.setState({
        ...contextType.state,
        year: sappAccountData.year,
        account: sappAccountData.account,
        isLoaded: true,
      });
      contextType.setSappSelectedData({
        ...contextType.sappSelectedData,
        year: sappAccountData.year[0].period,
      });
      //contextType.onGetInitialSourceAccounts();
    });
  }

  componentWillUnmount() {
    contextType.setIsMounted(false);
  }

  render() {
    return (
      <SalesAdministartionContext.Consumer>
        {() => {
          return (
            <EditAccountPlanSappContextProvider>
              <EditAccountPlanSappContext.Consumer>
                {(accountContext) => {
                  contextType = accountContext;
                  if (contextType.state.isLoaded) {
                    return (
                      <>
                        <div className={styles.table}>
                          <div className={styles.pageheader}>
                            <p className={styles.header}>{Settings.accountSappDetails.heading}</p>
                          </div>
                          
                          {contextType.linkedMsg != null ? (
                            <span className={styles.linkedMsgSpan}>
                              {contextType.linkedMsg}
                            </span>
                          ) : (
                            <>
                              <div>
                                  <span className={styles.fieldNameYear}>
                                    {
                                      Settings.accountSappDetails.formFields
                                        .year.label
                                    }
                                  </span>
                                  <CSelect
                                    id={
                                      Settings.accountSappDetails.formFields
                                        .year.label
                                    }
                                    selectedValue={
                                      contextType.sappSelectedData.year
                                    }
                                    ddnOptions={contextType.state.year}
                                    keyField={
                                      Settings.accountSappDetails.formFields
                                        .year.keyField
                                    }
                                    valField={
                                      Settings.accountSappDetails.formFields
                                        .year.keyField
                                    }
                                    onChange={(event) =>
                                      contextType.onYearChange(event)
                                    }
                                    className={styles.select}
                                  />
                              </div>
                              <div className={styles.noWrapCell}>
                                  <span className={styles.fieldNameAccount}>
                                    {
                                      Settings.accountSappDetails.formFields
                                        .account.label
                                    }
                                  </span>
                                  <CSearchFilter
                                    componentName={
                                      Settings.accountSappDetails.componentName
                                    }
                                    id={
                                      Settings.accountSappDetails.formFields
                                        .account.id
                                    }
                                    selected={
                                      contextType.sappSelectedData.accountrecid
                                    }
                                    data={contextType.state.account}
                                    start={
                                      contextType.sappSelectedData
                                        .accountStartIndex
                                    }
                                    getInitialData={
                                      contextType.onGetInitialSourceAccounts
                                    }
                                    getNextData={
                                      contextType.onGetNextSourceAccounts
                                    }
                                    onSelect={contextType.onSourceAccountSelect}
                                    onChange={
                                      contextType.onSourceAccountsChange
                                    }
                                    onKeyPress={contextType.onAccountKeyPress}
                                    pageSize={
                                      Settings.accountSappDetails.pageSize
                                    }
                                    invalidMessage={
                                      Settings.accountSappDetails.invalidMessage
                                    }
                                    className={styles.filterContainer}
                                    optionsStyle={styles.options}
                                    noData={
                                      contextType.sappSelectedData.noAccounts
                                    }
                                    requiredMessage={
                                      Settings.accountSappDetails
                                        .requiredMessage
                                    }
                                    removeData={contextType.removeData}
                                  />
                              </div>
                              <div className={styles.submitBtnTd}>
                                  <img
                                    src={Submitbtn}
                                    id={
                                      Settings.accountSappDetails.submitButton
                                        .label
                                    }
                                    onClick={contextType.onHandleSubmit}
                                  ></img>
                              </div>
                            </>
                          )}
                        </div>
                        <style>{`
                        @media only screen and (max-width: 1230px) {
                          .page_body_container{
                            min-height: calc(100vh - 89px) !important;
                          }
                        }
                        #search{
                          padding: 6px 10px !important;
                        }
                        `}</style>
                      </>
                    );
                  } else {
                    return null;
                  }
                }}
              </EditAccountPlanSappContext.Consumer>
            </EditAccountPlanSappContextProvider>
          );
        }}
      </SalesAdministartionContext.Consumer>
    );
  }
}
