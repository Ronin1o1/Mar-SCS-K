import React from "react";
import { useState } from "react";
import Utils from "../../../../../common/utils/Utils";
import API from "../service/API";
const KeyContactsContext = React.createContext({});

export const KeyContactsContextProvider = (props) => {
  const [state, setState] = useState({
    showScreenLoader: false,
    checkFields: false,
    currentScreen: "",
    lastupdatedate: "",
    countryRef: [],
    listRevStream: [],
    nextScreen: "",
    revStreamId: 0,
    previousScreen: "",
    stateRef: [],
    contactsMap: {},
    lastUpdate: "",
    maxAcctKeyBuyer: 0,
    contacts: [],
  });
  const [contacts, setContacts] = useState([]);
  const [contactsToUpdate, setContactsToUpdate] = useState([]);
  const [keyContactPopupFlag, setKeyContactPopupFlag] = useState(false);
  const [revStreamIdForContacts, setRevStreamIdForContacts] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [revStreamIdContext, setRevStreamIdContext] = useState(1);
  const [validationMessageForTextAreas, setValidationMessageForTextAreas] =
    useState("");

  const showKeyContactsFor = (refId) => {
    setContacts([]);
    const revStreamId = parseInt(refId);
    setSelectedRevStream(revStreamId);
    const revStreamKeyContacts = buildKeyContactsFor(revStreamId);
    createContactsArray(revStreamKeyContacts);
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setSelectedRevStream = (refId) => {
    setState({ ...state, revStreamId: refId });
  };

  const buildKeyContactsFor = (refId) => {
    return state.contacts.filter((contact) => contact.revStreamType === refId);
  };

  const createContactsArray = (revStreamKeyContacts) => {
    const keyContacts = revStreamKeyContacts;
    const emptyRecordsCount =
      state.maxAcctKeyBuyer - revStreamKeyContacts.length;
    for (let i = 0; i < emptyRecordsCount; i++) {
      keyContacts.push({
        name: "",
      });
    }
    setContacts(keyContacts);
  };

  const makeInitLink = (e, idx) => {
    const updatedContact = contacts;
    updatedContact[idx].name = e.target.value;
    updatedContact[idx].revStreamType = state.revStreamId;
    updatedContact[idx].accountinfoContactId = 0;
    setState({ ...state, contacts: updatedContact });
    setContacts(updatedContact);
    setContactsToUpdate([
      ...contactsToUpdate,
      {
        name: e.target.value,
        revStreamType: state.revStreamId,
        accountinfoContactId: 0,
      },
    ]);
  };

  const updateKeyContacts = async (recID, yearSel, accName) => {
    if (contactsToUpdate.length > 0) {
      setIsLoading(true);
      setLoader(true);
      const formattedContacts = formatContacts();
      const params = {
        strContactsMap: JSON.stringify(formattedContacts),
        revStreamId: revStreamIdContext,
        formChg: "Y",
        period: yearSel,
        accountrecid: recID,
        accountname: accName,
      };
      const postParams = Utils.createPostData(params);
      await API.updateKeyContacts(postParams);
      setContactsToUpdate([]);
      setIsLoading(false);
      setLoader(false);
      showKeyContactsFor(revStreamIdContext);
    }
  };

  const formatContacts = () => {
    return contactsToUpdate.reduce(
      (obj, item, idx) => ({
        ...obj,
        [idx]: item,
      }),
      {}
    );
  };

  const setKeyContactPopup = (flag: boolean) => {
    setKeyContactPopupFlag(flag);
  };

  const KeyContacts = {
    state,
    setState,
    showKeyContactsFor,
    contacts,
    setContacts,
    makeInitLink,
    keyContactPopupFlag,
    setKeyContactPopup,
    revStreamIdForContacts,
    setRevStreamIdForContacts,
    updateKeyContacts,
    setContactsToUpdate,
    isLoading,
    revStreamIdContext,
    setRevStreamIdContext,
    validationMessageForTextAreas,
    setValidationMessageForTextAreas,
    setLoader,
  };
  return (
    <KeyContactsContext.Provider value={KeyContacts}>
      {props.children}
    </KeyContactsContext.Provider>
  );
};
export const keyContactsContextConsumer = KeyContactsContext.Consumer;
export default KeyContactsContext;
