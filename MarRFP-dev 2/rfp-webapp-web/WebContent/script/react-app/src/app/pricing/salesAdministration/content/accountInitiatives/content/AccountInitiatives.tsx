import React, { useEffect, useState } from "react";
import { Layout } from "../../../routing/Layout";
import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../../../context/salesAdministartionContextProvider";
import { useLocation } from "react-router-dom";
import AccountInitiativesContext, {
  AccountInitiativesContextProvider,
} from "../context/AccountInitiativesContext";
import styles from "./AccountInitiatives.css";
import EditAccountInitiatives from "./editAccountInitiatives/content/EditAccountInitiatives";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import interceptorStyle from "../../../../../common/components/Interceptors.css";

let contextType = null;
let parentContextType = null;

const AccountInitiatives: React.FC<any> = (props) => {
  const urlParms = useLocation().search;
  const RecID = new URLSearchParams(urlParms).get("accountrecid");
  const yearSel = new URLSearchParams(urlParms).get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");

  const showEditAccountInitiativeModal = (group, item) => {
    contextType.setShowModal(true);
    const data = Object.assign(item, {
      accountrecid: RecID,
      period: yearSel,
      accountName: accname,
    });
    contextType.setSelectedItem(data);
    contextType.setSelectedGroup(group);
  };

  useEffect(() => {
    return () => {
      contextType.updateAccInitiatives("navigate");
    };
  }, []);

  const isLastChild = (arr, index) => {
    return index === arr.length - 1 ? true : false;
  };

  const renderFields = (arr, group): JSX.Element => {
    const fieldset = arr.map((item, ind) => {
      return (
        <td key={item.field_name}>
          <table>
            <tbody>
              <tr className={styles.AccInitiativeTableRows}>
                {isLastChild(arr, ind) ? (
                  <td className={styles.boldTextWidth}>
                    <div>{item.field_id}) </div>
                  </td>
                ) : (
                  <td className={styles.boldText}>
                    <div>{item.field_id}) </div>{" "}
                  </td>
                )}
                <td
                  className={styles.AccIntiativeInputContainer}
                  title={item.initiative_name}
                >
                  {item.isReadOnly === undefined ||
                  item.isReadOnly === null ||
                  item.isReadOnly === false ? (
                    <input
                      type="text"
                      name={item.field_name}
                      id={item.field_name}
                      className={styles.AccInitiativeInputField}
                      value={item.initiative_name}
                      maxLength={40}
                      size={32}
                      onBlur={(event) =>
                        contextType.makeInitiativeLink(event, group, item)
                      }
                      onChange={(e) =>
                        contextType.handleInputChange(e, item, group)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      name={item.field_name}
                      id={item.field_name}
                      value={item.initiative_name}
                      maxLength={40}
                      size={32}
                      className={styles.readOnlyLink}
                      onClick={() =>
                        showEditAccountInitiativeModal(group, item)
                      }
                      readOnly={true}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      );
    });
    return fieldset;
  };

  return (
    <div>
      <SalesAdministartionContextProvider>
        <SalesAdministartionContext.Consumer>
          {(SalesAdministartionContext) => {
            parentContextType = SalesAdministartionContext;
            return (
              <AccountInitiativesContextProvider
                accountRecId={RecID}
                period={yearSel}
                accountName={accname}
              >
                <AccountInitiativesContext.Consumer>
                  {(AccountInitiativesContext) => {
                    contextType = AccountInitiativesContext;

                    return (
                      <div>
                        <Layout
                          IsAccountInitiativeUpdated={() =>
                            contextType.updateAccInitiatives("update")
                          }
                          getlastUpdateDate={contextType.state.lastUpdatedDate}
                          onUpdateValue={lastUpdateDateValueonUpdate}
                        >
                          <div>
                            {contextType.showScreenLoader ? (
                              <img
                                className={styles.screenLoader}
                                src={screenLoader}
                              />
                            ) : (
                              <React.Fragment>
                                {contextType.showPageLoader ? (
                                  <div
                                    className={interceptorStyle.curtain}
                                    style={{
                                      top: "0px",
                                    }}
                                  >
                                    <img
                                      src={screenLoader}
                                      className={interceptorStyle.imageLoader}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div>
                                  <table
                                    className={styles.AccInitiativeTableWidth}
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          {contextType.state.initiative_groups.map(
                                            (group) => {
                                              return (
                                                <table
                                                  key={group.field_group}
                                                  className={
                                                    styles.fullWidthMt20
                                                  }
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.InstructionHeaderAcc
                                                        }
                                                        colSpan={16}
                                                      >
                                                        {group.group_heading}
                                                      </td>
                                                    </tr>
                                                    <tr
                                                      className={styles.oddRow}
                                                    >
                                                      {renderFields(
                                                        group.fields_array.slice(
                                                          0,
                                                          5
                                                        ),
                                                        group
                                                      )}
                                                    </tr>
                                                    <tr
                                                      className={styles.evenRow}
                                                    >
                                                      {renderFields(
                                                        group.fields_array.slice(
                                                          5,
                                                          10
                                                        ),
                                                        group
                                                      )}
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              );
                                            }
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </Layout>
                        {contextType.showModal ? (
                          <EditAccountInitiatives
                            showModal={contextType.showModal}
                            closeModal={contextType.closeModal}
                            initiativeData={contextType.selectedItem}
                            selectedGroup={contextType.selectedGroup}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }}
                </AccountInitiativesContext.Consumer>
              </AccountInitiativesContextProvider>
            );
          }}
        </SalesAdministartionContext.Consumer>
        <style>{`
        @media only screen and (max-width: 982px){
          .container{
            min-width:982px;
          }
          .page_body_container {
            min-height: calc(100vh - 107px) !important;
          }
          .footerwidget{
            position:fixed;
          }
        }
        `}</style>
      </SalesAdministartionContextProvider>
    </div>
  );
};

export default AccountInitiatives;
