import React, { useEffect, useState } from "react";
import { Layout } from "../../../routing/Layout";
import { useLocation } from "react-router-dom";
import API from "../service/API";
import KeyContactsContext, {
  KeyContactsContextProvider,
} from "../context/KeyContactsContext";
import CSelect from "../../../../../common/components/CSelect";
import CModal from "../../../../../common/components/CModal";
import KeyContactsBuyer from "./KeyContactsBuyer";
import Styles from "./KeyContacts.css";
import Settings from "../static/Settings";
//import { CLoader } from "../../../../../common/components/CLoader";

import screenLoader from "../../../../../common/assets/img/screenloader.gif";

let contextType = null;

function KeyContacts(props) {
  const urlParams = useLocation().search;
  const urlParameters = {
    recID: new URLSearchParams(urlParams).get("accountrecid"),
    yearSel: new URLSearchParams(urlParams).get("year"),
    accName: new URLSearchParams(urlParams).get("accountName"),
  };

  const [revStreamId, setRevStreamId] = useState(1);
  const [contactToUpdate, setContactToUpdate] = useState(null);
  const [openedContactIndex, setOpenedContactIndex] = useState(-1);
  const [refresh, setRefresh] = useState(true);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);

  useEffect(() => {
    getKeyContacts();
  }, [revStreamId, refresh]);

  useEffect(() => {
    return () => {
      updateKeyContacts();
    };
  }, []);

  const getKeyContacts = () => {
    contextType.setLoader(true);

    API.getKeyContacts(
      urlParameters.recID,
      urlParameters.yearSel,
      urlParameters.accName,
      revStreamId
    ).then((data) => {
      contextType.setLoader(false);
      contextType.setState(data);
      contextType.showKeyContactsFor(revStreamId);
      setLastUpdatedDate(data.lastupdatedate);
    });
  };

  const openEditContactModal = (contact, idx) => {
    contextType.setRevStreamIdForContacts(revStreamId);
    setOpenedContactIndex(idx);
    if (!contact.accountrecid) {
      contact.accountrecid = urlParameters.recID;
    }
    API.getEditKeyContact(
      contact.name,
      contact.revStreamType,
      urlParameters.recID,
      urlParameters.yearSel
    ).then((data) => {
      const contactToEdit = data;
      contactToEdit.travelManager = contact;
      setContactToUpdate(contactToEdit);
      contextType.setKeyContactPopup(true);
    });
  };

  const updateKeyContacts = () => {
    contextType
      .updateKeyContacts(
        urlParameters.recID,
        urlParameters.yearSel,
        urlParameters.accName
      )
      .then(() => {
        setRevStreamId(1);
        setRefresh(!refresh);
      });
  };

  return (
    <KeyContactsContextProvider>
      <KeyContactsContext.Consumer>
        {(keyContactsContext) => {
          contextType = keyContactsContext;
          return (
            <Layout
              IsKeyContactsUpdate={() => updateKeyContacts()}
              getlastUpdateDate={lastUpdatedDate}
            >
              <CModal
                title={Settings.screenText.screenTitle}
                onClose={() => {
                  contextType.setKeyContactPopup(false);
                }}
                show={contextType.keyContactPopupFlag}
                xPosition={-415}
                yPosition={-290}
                overlayHeight={Math.max(
                  document.body.scrollHeight,
                  document.body.offsetHeight,
                  document.documentElement.clientHeight,
                  document.documentElement.scrollHeight,
                  document.documentElement.offsetHeight
                )}
                overlayTopPosition={"-79px"}
              >
                <KeyContactsBuyer
                  contactToUpdate={contactToUpdate}
                  period={urlParameters.yearSel}
                  onClose={(id) => {
                    contextType.setKeyContactPopup(false);
                    // setRefresh(!refresh);
                  }}
                  openedContactIndex={openedContactIndex}
                  refresh={() => {
                    setRefresh(!refresh);
                  }}
                  setContactsToUpdate={contextType.setContactsToUpdate}
                  contextType={contextType}
                ></KeyContactsBuyer>
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
                  &nbsp;
                  <table
                    className={`${Styles.zeroHeight} ${Styles.alignLeftKeyContact}`}
                  >
                    <tbody>
                      <tr>
                        <td
                          className={`${Styles.alignLeftKeyContact} ${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.revenueStream}:&nbsp;
                        </td>
                        <td className={Styles.alignLeftKeyContact}>
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={contextType.state.listRevStream}
                            keyField={"refId"}
                            valField={"listName"}
                            selectedValue={revStreamId}
                            onChange={(event) => {
                              contextType.setContactsToUpdate([]);
                              setRevStreamId(event.target.value);
                              contextType.setRevStreamIdContext(
                                event.target.value
                              );
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    className={`${Styles.zeroHeight} ${Styles.alignLeftKeyContact}`}
                  >
                    <tbody>
                      <tr>
                        <td
                          className={`${Styles.alignLeftKeyContact} ${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.nowrapCell} ${Styles.alignLeftKeyContact}`}
                        />
                        <td
                          className={`${Styles.tableTitleWidth120KeyContact} ${Styles.nowrapCell}`}
                        >
                          <b>{Settings.screenText.contactName}</b>
                        </td>
                        <td className={Styles.borderBottomKeyContact}>
                          &nbsp;
                        </td>
                        <td
                          className={`${Styles.tableTitleWidth120KeyContact} ${Styles.nowrapCell}`}
                        >
                          <b>{Settings.screenText.contactTitle}</b>
                        </td>
                        <td className={Styles.borderBottomKeyContact}>
                          &nbsp;
                        </td>
                        <td
                          className={`${Styles.tableTitleWidth50KeyContact} ${Styles.nowrapCell}`}
                        >
                          <b>{Settings.screenText.city}</b>
                        </td>
                        <td className={Styles.borderBottomKeyContact}>
                          &nbsp;
                        </td>
                        <td
                          className={`${Styles.tableTitleWidth50KeyContact} ${Styles.nowrapCell}`}
                        >
                          <b>{Settings.screenText.stateProvice}</b>
                        </td>
                        <td className={Styles.borderBottomKeyContact}>
                          &nbsp;
                        </td>
                        <td
                          className={`${Styles.tableTitleWidth50KeyContact} ${Styles.nowrapCell}`}
                        >
                          <b>{Settings.screenText.countryRegion}</b>
                        </td>
                      </tr>
                      {contextType.contacts.map((contact, idx) => {
                        return (
                          <>
                            {contact.name ? (
                              <tr>
                                <td
                                  className={`${Styles.field_Name} ${Styles.txtAlignRight}`}
                                >
                                  {idx + 1})
                                </td>
                                <td>
                                  <input
                                    id={`contactsName_${idx}`}
                                    name={`contactsMap[${idx}].name`}
                                    type="text"
                                    maxLength={40}
                                    size={25}
                                    value={contact.name}
                                    onClick={() => {
                                      openEditContactModal(contact, idx);
                                    }}
                                    className={Styles.urlTextKeyContact}
                                    title={contact.name}
                                    readOnly
                                  />
                                </td>
                                <td />
                                <td>{contact.title}</td>
                                <td />
                                <td>{contact.city}</td>
                                <td />
                                <td>{contact.state}</td>
                                <td />
                                <td>{contact.country}</td>
                              </tr>
                            ) : (
                              <tr>
                                <td
                                  className={`${Styles.field_Name} ${Styles.txtAlignRight}`}
                                >
                                  {idx + 1})
                                </td>
                                <td>
                                  <input
                                    id={`contactsName_${idx}`}
                                    name={`contactsMap[${idx}].name`}
                                    type="text"
                                    maxLength={40}
                                    size={25}
                                    onBlur={(e) => {
                                      contextType.makeInitLink(e, idx);
                                    }}
                                    className={Styles.textBoxKeyContact}
                                  />
                                </td>
                                <td />
                                <td></td>
                                <td />
                                <td></td>
                                <td />
                                <td></td>
                                <td />
                                <td></td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Layout>
          );
        }}
      </KeyContactsContext.Consumer>
    </KeyContactsContextProvider>
  );
}

export default KeyContacts;
