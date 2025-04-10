import React, { useEffect, useState } from "react";
import styles from "./accountPerspective.css";
import CModal from "../../../../../common/components/CModal";
import AccountPerspectiveAPI from "../service/accountPerspectiveAPI";
import Settings from "../static/Settings";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import { Layout } from "../../../routing/Layout";
import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../../../context/salesAdministartionContextProvider";
import Utils from "../../../../../common/utils/Utils";
import { useLocation } from "react-router-dom";
import AccountPerspectiveContext, {
  AccountPerspectiveContextProvider,
} from "../context/accountPerspectiveContext";
let contextType = null;
let parentContextType = null;

const AccountPerspective = (props) => {
  const urlParms = useLocation().search;
  const RecID = new URLSearchParams(urlParms).get("accountrecid");
  const yearSel = new URLSearchParams(urlParms).get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");
  useEffect(() => {
    contextType.state.showScreenLoader = true;
    AccountPerspectiveAPI.getData(RecID, yearSel, accname).then((data) => {
      contextType.state.showScreenLoader = false;
      contextType.setLoadingData(data);
      setlastUpdateDateValue(data.lastUpdate);
    });

    contextType.setInitialUserData();

    return () => {
      onUpdate();
    };
  }, []);

  const onUpdate = () => {
    const checkUsermandatoryValidation =
      contextType.checkUsermandatoryValidation();
    if (checkUsermandatoryValidation) {
      contextType.setLoader(true);
      contextType.updateValue(RecID, yearSel, accname);
      if (contextType?.state?.lastUpdateDate) {
        setlastUpdateDateValueonUpdate(contextType?.state?.lastUpdateDate);
      }
      setTimeout(() => {
        // window.location.reload();
        contextType.setLoader(false);
        AccountPerspectiveAPI.getData(RecID, yearSel, accname).then((data) => {
          contextType.setLoadingData(data);
          setlastUpdateDateValue(data.lastUpdate);
        });
      }, 1000);
    }
  };

  const handleTextInputValidation = (e, field) => {
    const updatePrimaryList = contextType.state.acctPerspective;
    updatePrimaryList[field] = e.target.value;
    const validateData = contextType.checkValidationOnNavigation();
    if (validateData) {
      contextType.setData(updatePrimaryList);
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatePrimaryList = contextType.state.subsidiaries;
    if (e.target.value !== "") {
      updatePrimaryList[index][field] = e.target.value;
    } else {
      updatePrimaryList[index][field] = null;
    }
    contextType.setData(updatePrimaryList);
  };

  return (
    <SalesAdministartionContext.Consumer>
      {(SalesAdministartionContext) => {
        parentContextType = SalesAdministartionContext;
        return (
          <Layout
            IsAcctPerpspectiveDataUpdate={onUpdate}
            getlastUpdateDate={lastUpdateDateValue}
            onUpdateValue={lastUpdateDateValueonUpdate}
          >
            <AccountPerspectiveContextProvider>
              <AccountPerspectiveContext.Consumer>
                {(extendedStayInfoContextContext) => {
                  contextType = extendedStayInfoContextContext;

                  return (
                    <React.Fragment>
                      <CModal
                        title="Alert Message"
                        onClose={contextType.ShowValidateModel}
                        show={contextType.state.validateModal}
                        xPosition={-100}
                        yPosition={-120}
                        closeImgTitle={"OK - Close Message Box"}
                        class="customModal"
                        overlayHeight={Math.max(
                          document.body.scrollHeight,
                          document.body.offsetHeight,
                          document.documentElement.clientHeight,
                          document.documentElement.scrollHeight,
                          document.documentElement.offsetHeight
                        )}
                        overlayTopPosition={"-79px"}
                      >
                        <div className={styles.accPerspectiveAlert}>
                          {contextType.state.message}
                        </div>
                      </CModal>
                      {contextType.state.showScreenLoader ? (
                        <img
                          style={{
                            position: "absolute",
                            top: "55%",
                            left: "45%",
                          }}
                          src={screenLoader}
                        />
                      ) : (
                        <div>
                          <table className="full-height">
                            <tr>
                              <td className={styles.verticalAlign}>
                                <table className={styles.mainContainer}>
                                  <tr>
                                    <td className={styles.fieldName}>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className={styles.instructionHeader}
                                    >
                                      {Settings.labels.accountBusinessOverview}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.fieldName}>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table className={styles.menuWdthHeight}>
                                        <tr>
                                          <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.fieldName}
                                            title={
                                              Settings.labels
                                                .accountBusinessTitle
                                            }
                                          >
                                            {Settings.labels.accountBusiness}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldNameText}>
                                            <textarea
                                              name="acctPerspective.healthtext"
                                              id="acctPerspective.healthtext"
                                              className={styles.textAreaField}
                                              rows={4}
                                              cols={188}
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "healthtext"
                                                );
                                              }}
                                              value={
                                                contextType.state
                                                  ?.acctPerspective?.healthtext
                                              }
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>

                                      <table className={styles.menuWdthHeight}>
                                        <tr>
                                          <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.fieldName}
                                            title={
                                              Settings.labels
                                                .marriottAccountLeaderTitle
                                            }
                                          >
                                            {
                                              Settings.labels
                                                .marriottAccountLeader
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldNameText}>
                                            <textarea
                                              name="acctPerspective.acct_acctindtrends"
                                              id="acctPerspective.acct_acctindtrends"
                                              className={styles.textAreaField}
                                              rows={4}
                                              cols={188}
                                              value={
                                                contextType.state
                                                  ?.acctPerspective
                                                  ?.acct_acctindtrends
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "acct_acctindtrends"
                                                );
                                              }}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  2000
                                                )
                                              }
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>

                                      <table className={styles.menuWdthHeight}>
                                        <tr>
                                          <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.fieldName}
                                            title={
                                              Settings.labels.divisionsTitle
                                            }
                                          >
                                            {Settings.labels.divisions}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldNameText}>
                                            <textarea
                                              name="acctPerspective.divisions"
                                              id="acctPerspective.divisions"
                                              className={styles.textAreaField}
                                              rows={4}
                                              cols={188}
                                              value={
                                                contextType.state
                                                  ?.acctPerspective?.divisions
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "divisions"
                                                );
                                              }}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  2000
                                                )
                                              }
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>

                                      <table className={styles.menuWdthHeight}>
                                        <tr>
                                          <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.fieldName}
                                            title={
                                              Settings.labels
                                                .marriottPerspectiveTitle
                                            }
                                          >
                                            {
                                              Settings.labels
                                                .marriottPerspective
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldNameText}>
                                            <textarea
                                              name="acctPerspective.mar_acctstrategy_obj"
                                              id="acctPerspective.mar_acctstrategy_obj"
                                              className={styles.textAreaField}
                                              rows={4}
                                              cols={188}
                                              value={
                                                contextType.state
                                                  ?.acctPerspective
                                                  ?.mar_acctstrategy_obj
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "mar_acctstrategy_obj"
                                                );
                                              }}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  2000
                                                )
                                              }
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>

                                      <table className={styles.menuWdthHeight}>
                                        <tr>
                                          <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.fieldName}
                                            title={
                                              Settings.labels
                                                .marriottPerspectiveIssuesTitle
                                            }
                                          >
                                            {
                                              Settings.labels
                                                .marriottPerspectiveIssues
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldNameText}>
                                            <textarea
                                              name="acctPerspective.mar_vulnerabilities"
                                              id="acctPerspective.mar_vulnerabilities"
                                              className={styles.textAreaField}
                                              rows={4}
                                              cols={188}
                                              value={
                                                contextType.state
                                                  ?.acctPerspective
                                                  ?.mar_vulnerabilities
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "mar_vulnerabilities"
                                                );
                                              }}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1500
                                                )
                                              }
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                      <div>
                                        <p
                                          className={
                                            styles.instructionHeaderSubsidiaries
                                          }
                                          title={
                                            Settings.labels
                                              .subsidiariesLabelTitle
                                          }
                                        >
                                          {Settings.labels.subsidiariesLabel}
                                        </p>
                                        <div
                                          className={
                                            styles.subsidiariesContainer
                                          }
                                        >
                                          <div className={styles.verticalAlign}>
                                            {contextType.state?.subsidiaries?.map(
                                              (subsidiariesVal, i) => {
                                                return (
                                                  <span
                                                    key={i}
                                                    className={
                                                      styles.fieldNameValue
                                                    }
                                                  >
                                                    {i + 1})
                                                    <input
                                                      type="text"
                                                      className={styles.divName}
                                                      id={i}
                                                      name={i}
                                                      value={
                                                        subsidiariesVal.divname
                                                      }
                                                      size={21}
                                                      maxLength={40}
                                                      onChange={(e) => {
                                                        handleInputChange(
                                                          e,
                                                          i,
                                                          "divname"
                                                        );
                                                      }}
                                                    />
                                                  </span>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                    </React.Fragment>
                  );
                }}
              </AccountPerspectiveContext.Consumer>
            </AccountPerspectiveContextProvider>
            <style>{`
                .container {
                    min-width:1078px;
                }
                @media only screen and (max-width: 1000px){
                  .page_body_container {
                      min-height: calc(100vh - 106px) !important;
                  }
                }
            `}</style>
          </Layout>
        );
      }}
    </SalesAdministartionContext.Consumer>
  );
};

export default AccountPerspective;
