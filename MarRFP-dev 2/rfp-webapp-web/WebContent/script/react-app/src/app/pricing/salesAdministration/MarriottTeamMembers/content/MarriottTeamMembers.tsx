import React, { Suspense, useContext, useEffect, useState } from "react";
import CSelect from "../../../../common/components/CSelect";
import Settings from "../static/Settings";
import styles from "./MarriottTeamMembers.css";
import MarriottTeamMembersApi from "../service/MarriottTeamMembersApi";
import btnAddStr from "../../../../common/assets/img/button/btnAddStr.gif";
import MarriottTeamMembersContext, {
  MarriottTeamMembersContextProvider,
} from "../context/MarriottTeamMembersContext";
import classnames from "classnames";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import { Layout } from "../../routing/Layout";
import { useLocation } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

let contextType = null;
let period;
let accountrecid;
let accountName;

export default function MarriottTeamMembers(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [lastUpdateDateValue, setLastUpdatedValue] = useState("");
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const urlParms = useLocation().search;
  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  accountName = new URLSearchParams(urlParms).get("accountName");
  useEffect(() => {
    getAcctContacts();
    return () => {
      updateAcctContacts();
    };
  }, []);

  useEffect(() => {
    if (appContext.navbarClicked) {
      contextType.setState({
        ...contextType.state,
        showEmailModal: false,
      });
    }
  }, [appContext.navbarClicked]);

  const getAcctContacts = () => {
    contextType.setLoader(true);
    MarriottTeamMembersApi.getAcctContacts(
      accountrecid,
      accountName,
      period
    ).then((data) => {
      contextType.setLoader(false);
      data.titles.length > 0 && data.titles.unshift({});
      setLastUpdatedValue(data.lastupdatedate);
      contextType.setState({
        ...contextType.state,
        contactList: data.contacts,
        availableContactTypes: data.titles,
      });
    });
  };

  const updateAcctContacts = () => {
    const strContacts = contextType.state.contactList;
    const removingEmptyContacts =
      strContacts.length > 0 &&
      strContacts.filter(
        (item) =>
          (item.name !== null || item.name !== "") &&
          (item.title !== null || item.title !== "") &&
          (item.phone !== null || item.phone !== "") &&
          (item.email !== null || item.email !== "")
      );
    if (contextType.allEmailsAreValid()) {
      contextType.setLoader(true);
      MarriottTeamMembersApi.updateAcctContacts(
        removingEmptyContacts,
        accountrecid,
        "Y"
      ).then((data) => {
        // window.location.reload();
        contextType.setLoader(false);
        getAcctContacts();
      }, []);

      return true;
    } else {
      contextType.setState({ ...contextType.state, showEmailModal: true });

      return false;
    }
  };

  return (
    <Layout
      IsAcctContactsUpdate={updateAcctContacts}
      getlastUpdateDate={lastUpdateDateValue}
    >
      <MarriottTeamMembersContextProvider>
        <MarriottTeamMembersContext.Consumer>
          {(marriottTeamMembersContext) => {
            contextType = marriottTeamMembersContext;
            return (
              <React.Fragment>
                <table className={styles.zeroHeight}>
                  <tbody>
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
                      <tr
                        className={
                          contextType?.state?.contactList?.length > 0
                            ? ""
                            : styles.contentCenter
                        }
                      >
                        <td>
                          <tr>
                            <td className={styles.fieldName}>
                              {
                                Settings.marriottTeamMembers
                                  .availableContactTypes
                              }
                              <CSelect
                                ddnOptions={
                                  contextType.state.availableContactTypes
                                }
                                selectedValue={contextType.state.contactType}
                                keyField={"heading"}
                                valField={"heading"}
                                onChange={(event) =>
                                  contextType.onContactChange(event)
                                }
                              />
                              <img
                                className={styles.btnAdd}
                                onClick={() => contextType.addContact()}
                                src={btnAddStr}
                                id="NewButton"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.vTop} id="contactlist">
                              {contextType.state.contactList.map(
                                (contact, key) => {
                                  return (
                                    <div
                                      key={key}
                                      className={`${styles.contactDiv} ${
                                        key === 0 ? styles.mt8 : ""
                                      }`}
                                    >
                                      <div className={styles.innerRowDiv}>
                                        <table className={styles.zeroHeight}>
                                          <tr>
                                            <td
                                              className={classnames(
                                                styles.InstructionHeader,
                                                styles.nowrapCell
                                              )}
                                              colSpan={2}
                                            >
                                              {contact.heading}
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              className={classnames(
                                                styles.width50,
                                                styles.fieldName,
                                                styles.nowrapCell
                                              )}
                                            >
                                              {
                                                Settings.marriottTeamMembers
                                                  .nameHeader
                                              }
                                            </td>
                                            <td
                                              className={classnames(
                                                styles.nowrapCell
                                              )}
                                            >
                                              <input
                                                type="text"
                                                id={`contacts[${key}].name`}
                                                name={`contacts[${key}].name`}
                                                value={
                                                  contact.name === null
                                                    ? ""
                                                    : contact.name
                                                }
                                                className={styles.nameCol}
                                                maxLength={40}
                                                onChange={(e) =>
                                                  contextType.handleCommonChange(
                                                    e,
                                                    key,
                                                    "name"
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={classnames(
                                                styles.fieldName,
                                                styles.nowrapCell
                                              )}
                                            >
                                              {
                                                Settings.marriottTeamMembers
                                                  .titleHeader
                                              }
                                            </td>
                                            <td
                                              className={classnames(
                                                styles.nowrapCell
                                              )}
                                            >
                                              <input
                                                type="text"
                                                id={`contacts[${key}].title`}
                                                name={`contacts[${key}].title`}
                                                value={
                                                  contact.title === null
                                                    ? ""
                                                    : contact.title
                                                }
                                                className={styles.nameCol}
                                                maxLength={40}
                                                onChange={(e) =>
                                                  contextType.handleCommonChange(
                                                    e,
                                                    key,
                                                    "title"
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={classnames(
                                                styles.fieldName,
                                                styles.nowrapCell
                                              )}
                                            >
                                              {
                                                Settings.marriottTeamMembers
                                                  .phoneHeader
                                              }
                                            </td>
                                            <td
                                              className={classnames(
                                                styles.nowrapCell
                                              )}
                                            >
                                              <input
                                                maxLength={25}
                                                type="text"
                                                id={`contacts[${key}].phone`}
                                                name={`contacts[${key}].phone`}
                                                value={
                                                  contact.phone === null
                                                    ? ""
                                                    : contact.phone
                                                }
                                                onChange={(e) =>
                                                  contextType.handleCommonChange(
                                                    e,
                                                    key,
                                                    "phone"
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={classnames(
                                                styles.fieldName,
                                                styles.nowrapCell
                                              )}
                                            >
                                              {
                                                Settings.marriottTeamMembers
                                                  .emailHeader
                                              }
                                            </td>
                                            <td
                                              className={classnames(
                                                styles.nowrapCell
                                              )}
                                            >
                                              <input
                                                type="text"
                                                id={`contacts[${key}].email`}
                                                name={`contacts[${key}].email`}
                                                value={
                                                  contact.email === null
                                                    ? ""
                                                    : contact.email
                                                }
                                                maxLength={255}
                                                className={styles.nameCol}
                                                onBlur={(e) =>
                                                  contextType.checkEmail(
                                                    e.target.value
                                                  )
                                                }
                                                onChange={(e) =>
                                                  contextType.handleCommonChange(
                                                    e,
                                                    key,
                                                    "email"
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </td>
                          </tr>
                        </td>
                      </tr>
                    )}
                    <CModal
                      title={Settings.marriottTeamMembers.modalHeading}
                      class={"alertmessage"}
                      onClose={() =>
                        contextType.state.showAddButtonModal
                          ? contextType.closeAddButtonModal()
                          : contextType.closeEmailModal()
                      }
                      show={
                        contextType.state.showAddButtonModal
                          ? contextType.state.showAddButtonModal
                          : contextType.state.showEmailModal
                      }
                      overlayHeight={Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.clientHeight,
                        document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight
                      )}
                      overlayTopPosition={"-79px"}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <div
                          className={styles.marriottTeamMebersModalContainer}
                        >
                          {contextType.state.showAddButtonModal
                            ? Settings.marriottTeamMembers.addAlert
                            : Settings.marriottTeamMembers.emailAlert}
                        </div>
                      </Suspense>
                    </CModal>
                  </tbody>
                </table>
                <style>
                  {`
                .alertmessage{
                  position:fixed;
                  left: 42.48%;
                  top: 46.3%;
                }`}{" "}
                </style>
              </React.Fragment>
            );
          }}
        </MarriottTeamMembersContext.Consumer>
      </MarriottTeamMembersContextProvider>
    </Layout>
  );
}
