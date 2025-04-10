import React, { Component } from "react";
import API from "../service/API";
import styles from "./SappAccount.css";
import SappAccountContext, {
  SappAccountContextProvider,
} from "../context/SappAccountContext";
import Settings from "../static/Settings";

import Submitbtn from "../../../../common/assets/img/button/btnSubmit.gif";

import CSelect from "../../../../common/components/CSelect";
import CSearchFilter from "../../../../common/components/CSearchFilter";
import CModal from "../../../../common/components/CModal";

let contextType = null;
//let isComplete = false;
interface IProps {}
interface IState {}
export default class SappAccount extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  getInitialData() {
    return contextType.state.sappAccountData.accountFrom;
  }

  componentDidMount() {
    contextType.setIsMounted(true);
    contextType.isMounted = true;
    contextType.isMounted &&
      API.getPeriods().then((data) => {
        const sappAccountData = { ...contextType.state };
        sappAccountData.fromYear = data;
        sappAccountData.toYear = data;

        contextType.setState({
          ...contextType.state,
          fromYear: sappAccountData.fromYear,
          toYear: sappAccountData.toYear,
          isLoaded: true,
        });

        contextType.setSappSelectedData({
          ...contextType.sappSelectedData,
          fromPeriod: sappAccountData.fromYear[0].period,
          toPeriod: sappAccountData.toYear[0].period,
        });
      });
  }
  componentWillUnmount() {
    contextType.setIsMounted(false);
    contextType.isMounted = false;
  }
  render() {
    return (
      <SappAccountContextProvider>
        <SappAccountContext.Consumer>
          {(accountContext) => {
            contextType = accountContext;
            if (contextType.state.isLoaded) {
              return (
                <>
                  <div>
                    <p className={styles.header}>
                      {Settings.accountSappDetails.heading}
                    </p>
                    <hr className={styles.headerhr} />

                    <CModal
                      title={Settings.accountSappDetails.modalHeading}
                      onClose={contextType.handleModalClose}
                      show={!contextType.isValid}
                    >
                      <div
                        style={{
                          maxWidth: 250,
                          minWidth: 180,
                          padding: "9px 12px",
                        }}
                      >
                        {contextType.state.validationMessage}
                      </div>
                    </CModal>
                    <table className={styles.table}>
                      <tr>
                        <td>
                          <span>
                            {
                              Settings.accountSappDetails.formFields.fromYear
                                .label
                            }
                          </span>
                        </td>
                        <td>
                          <CSelect
                            id={
                              Settings.accountSappDetails.formFields.fromYear
                                .label
                            }
                            selectedValue={
                              contextType.sappSelectedData.fromPeriod
                            }
                            ddnOptions={contextType.state.fromYear}
                            keyField={Settings.accountSappDetails.keyField}
                            valField={Settings.accountSappDetails.keyField}
                            onChange={(event) =>
                              contextType.onFromPeriodChange(event)
                            }
                            className={styles.select}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            {
                              Settings.accountSappDetails.formFields.accountFrom
                                .label
                            }
                          </span>
                        </td>
                        <td>
                          <CSearchFilter
                            id={
                              Settings.accountSappDetails.formFields.accountFrom
                                .id
                            }
                            selected={
                              contextType.sappSelectedData.fromAccountrecid
                            }
                            data={contextType.state.accountFrom}
                            start={
                              contextType.sappSelectedData.fromAccountStartIndex
                            }
                            getInitialData={
                              contextType.onGetInitialSourceAccounts
                            }
                            getNextData={contextType.onGetNextSourceAccounts}
                            onSelect={contextType.onSourceAccountSelect}
                            onChange={contextType.onSourceAccountsChange}
                            pageSize={Settings.accountSappDetails.pageSize}
                            invalidMessage={
                              Settings.accountSappDetails.invalidMessage
                            }
                            className={styles.filterContainer}
                            optionsStyle={styles.options}
                            noData={contextType.sappSelectedData.noFromAccounts}
                            requiredMessage={
                              Settings.accountSappDetails.requiredMessage
                            }
                            removeData={contextType.removeFromData}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          {" "}
                          <span>
                            {
                              Settings.accountSappDetails.formFields.toYear
                                .label
                            }
                          </span>
                        </td>
                        <td>
                          <CSelect
                            id={
                              Settings.accountSappDetails.formFields.toYear.id
                            }
                            selectedValue={
                              contextType.sappSelectedData.toPeriod
                            }
                            ddnOptions={contextType.state.toYear}
                            keyField={Settings.accountSappDetails.keyField}
                            valField={Settings.accountSappDetails.keyField}
                            onChange={(event) =>
                              contextType.onToPeriodChange(event)
                            }
                            className={styles.select}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <span>
                            {" "}
                            {
                              Settings.accountSappDetails.formFields.accountTo
                                .label
                            }
                          </span>
                        </td>
                        <td>
                          <CSearchFilter
                            id={
                              Settings.accountSappDetails.formFields.accountTo
                                .id
                            }
                            selected={
                              contextType.sappSelectedData.toAccountrecid
                            }
                            data={contextType.state.accountTo}
                            start={
                              contextType.sappSelectedData.toAccountStartIndex
                            }
                            getInitialData={
                              contextType.onGetInitialTargetAccounts
                            }
                            getNextData={contextType.onGetNextTargetAccounts}
                            onSelect={contextType.onTargetAccountSelect}
                            onChange={contextType.onTargetAccountsChange}
                            pageSize={Settings.accountSappDetails.pageSize}
                            invalidMessage={
                              Settings.accountSappDetails.invalidMessage
                            }
                            className={styles.filterContainer}
                            optionsStyle={styles.options}
                            noData={contextType.sappSelectedData.noToAccounts}
                            requiredMessage={
                              Settings.accountSappDetails.requiredMessage
                            }
                            removeData={contextType.removeToData}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            tabIndex={0}
                            src={Submitbtn}
                            id={Settings.accountSappDetails.submitButton.label}
                            onClick={contextType.onCopyAccount}
                          ></img>
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              );
            } else {
              return null;
            }
          }}
        </SappAccountContext.Consumer>
      </SappAccountContextProvider>
    );
  }
}
