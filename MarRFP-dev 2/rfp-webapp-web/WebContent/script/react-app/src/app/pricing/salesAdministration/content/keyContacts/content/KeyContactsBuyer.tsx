import React, { useEffect, useState } from "react";
import Styles from "./KeyContactsBuyer.css";
import btnUpdate from "../../../../../common/assets/img/button/btnUpdate.gif";
import btnDelete from "../../../../../common/assets/img/button/btnDelete.gif";
import btnClose from "../../../../../common/assets/img/button/btnClose.gif";
import KeyContactsContext, {
  KeyContactsContextProvider,
} from "../context/KeyContactsContext";
import CSelect from "../../../../../common/components/CSelect";
import Settings from "../static/Settings";
import API from "../service/API";
import Utils from "../../../../../common/utils/Utils";
import CModal from "../../../../../common/components/CModal";

let contextType = null;

function KeyContactsBuyer(props) {
  const [contactDetails, setContactDetails] = useState({
    accountrecid: null,
    accountinfoid: null,
    name: "",
    title: "",
    phone: "",
    email: "",
    eid: null,
    address: "",
    city: "",
    state: "",
    province: "",
    zip: "",
    country: "",
    contactTypeID: null,
    heading: null,
    buyerInfluence: null,
    buyerInfOther: null,
    buyerResponsibility: "",
    buyerMemberships: null,
    buyerComments: null,
    buyerCustBase: null,
    buyerOther: null,
    revStreamType: 0,
    revStreamName: null,
    buyerType: null,
    accountinfoContactId: 0,
    regionid: 0,
    sequence: null,
    istitleorregion: null,
    accountRelationship: null,
    companyName: null,
  });
  const [keyContacts, setKeyContacts] = useState({
    accountId: "",
    regionRef: [],
    contact_name: "",
    stateRef: [],
    revstream_id: "",
    listRevStream: [],
    countryRef: [],
    infRef: [],
    tm_contact: [],
    travelManager: {
      accountrecid: null,
      accountinfoid: null,
      name: null,
      title: null,
      phone: null,
      email: null,
      eid: null,
      address: null,
      city: null,
      state: null,
      province: null,
      zip: null,
      country: null,
      contactTypeID: null,
      heading: null,
      buyerInfluence: null,
      buyerInfOther: null,
      buyerResponsibility: null,
      buyerMemberships: null,
      buyerComments: null,
      buyerCustBase: null,
      buyerOther: null,
      revStreamType: null,
      revStreamName: null,
      buyerType: null,
      accountinfoContactId: null,
      regionid: null,
      sequence: null,
      istitleorregion: null,
      accountRelationship: null,
      companyName: null,
    },
  });
  useEffect(() => {
    setKeyContacts(props.contactToUpdate);
    setContactDetails(props.contactToUpdate.travelManager);
    addDefaultValuesForCselect();
  }, [props.contactToUpdate]);

  const addDefaultValuesForCselect = () => {
    setKeyContacts({
      ...props.contactToUpdate,
      regionRef: [
        {
          regionid: null,
          regionname: "",
          regionstatus: null,
        },
        ...props.contactToUpdate.regionRef,
      ],
      stateRef: [
        {
          state: "",
          statename: "",
        },
        ...props.contactToUpdate.stateRef,
      ],
      infRef: [
        {
          listId: null,
          listName: "",
          refId: null,
        },
        ...props.contactToUpdate.infRef,
      ],
    });
  };

  const btnUpdateHandler = () => {
    if (!validateKeyContactBuyer()) {
      return;
    }
    if (!validateEmail(contactDetails.email)) {
      return;
    }
    if (!validateTextAreaFields()) {
      return;
    }
    const params = {
      contact_name: contactDetails.name,
      field_seq: 1,
      accountId: contactDetails.accountinfoContactId,
      revstream_id: contactDetails.revStreamType,
      accountrecid: contactDetails.accountrecid,
      period: props.period,
    };
    params.contact_name = contactDetails.name;
    API.updateKeyContact(params, contactDetails).then(() => {
      props.onClose(contactDetails.revStreamType);
      contextType.showKeyContactsFor(contextType.revStreamIdForContacts);
      updateContactsWithUpdatedContact();
      props.setContactsToUpdate([]);
      props.refresh();
    });
  };

  const validateKeyContactBuyer = () => {
    if (!contactDetails.name) {
      alert(Settings.alert.nameNotNull);
      return false;
    }
    return true;
  };

  const validateTextAreaFields = () => {
    if (contextType.validationMessageForTextAreas !== "") {
      contextType.setKeyContactPopup(true);
      return false;
    }
    return true;
  };

  const btnDeleteHandler = () => {
    if (!validateKeyContactBuyer()) {
      return;
    }
    if (!validateEmail(contactDetails.email)) {
      return;
    }
    if (confirm(Settings.alert.deleteConfirmation)) {
      const params = {
        contact_name: contactDetails.name,
        field_seq: 1,
        accountId: contactDetails.accountinfoContactId,
        revstream_id: contactDetails.revStreamType,
        accountrecid: contactDetails.accountrecid,
        period: props.period,
      };
      params.contact_name = contactDetails.name;
      API.deleteKeyContact(params, contactDetails).then(() => {
        props.onClose(contactDetails.revStreamType);
        contextType.showKeyContactsFor(contextType.revStreamIdForContacts);
        props.setContactsToUpdate([]);
        props.refresh();
      });
    }
  };

  const btnCloseHandler = () => {
    props.onClose(contactDetails.revStreamType);
    contextType.showKeyContactsFor(contextType.revStreamIdForContacts);
  };

  const updateContactsWithUpdatedContact = () => {
    const tempContacts = props.contextType.contacts;
    tempContacts[props.openedContactIndex] = contactDetails;
    props.contextType.setContacts(tempContacts);
  };

  const validateEmail = (email: string) => {
    if (email && !Settings.emailValidationRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const stateOnChageHandler = (state) => {
    setContactDetails({
      ...contactDetails,
      state: state,
      country: Settings.screenText.US,
    });
  };

  const countryOnChangeHandler = (e) => {
    if (
      e.target.value != Settings.screenText.US &&
      contactDetails.state != ""
    ) {
      if (confirm(Settings.alert.countryChangeConfirmation)) {
        setContactDetails({
          ...contactDetails,
          state: "",
          country: e.target.value,
        });
      } else {
        setContactDetails({
          ...contactDetails,
          country: Settings.screenText.US,
        });
      }
    } else {
      setContactDetails({ ...contactDetails, country: e.target.value });
    }
  };

  const setFieldLength = (e, fieldName) => {
    if (fieldName === "Responsibility" && e.target.value.length > 1024) {
      contextType.setValidationMessageForTextAreas(
        Settings.alert.areaOfResponsibilityValidation
      );
    } else if (fieldName === "Comments" && e.target.value.length > 1024) {
      contextType.setValidationMessageForTextAreas(
        Settings.alert.commentsValidation
      );
    } else if (fieldName === "Membership" && e.target.value.length > 150) {
      contextType.setValidationMessageForTextAreas(
        Settings.alert.membershipValidation
      );
    } else {
      contextType.setValidationMessageForTextAreas("");
    }
  };

  return (
    <KeyContactsContextProvider>
      <KeyContactsContext.Consumer>
        {(keyContactsContext) => {
          contextType = keyContactsContext;
          return (
            <div className={Styles.modal}>
              <CModal
                title={Settings.screenText.alertMessage}
                onClose={() => {
                  contextType.setKeyContactPopup(false);
                }}
                show={contextType.keyContactPopupFlag}
                xPosition={-300}
                yPosition={-200}
              >
                <div
                  style={{ maxWidth: 350, minWidth: 180, padding: "9px 12px" }}
                >
                  {contextType.validationMessageForTextAreas}
                </div>
              </CModal>
              <form
                name="editKeyContactDialog"
                id="editKeyContactDialog"
                method="post"
                autoComplete="off"
              >
                <input
                  type="text"
                  defaultValue="test"
                  id="focusField"
                  className={Styles.textBoxTest}
                />
                <div
                  id="editKeyContact"
                  style={{ overflowY: "auto" }}
                  className={Styles.divEditKeyContact}
                >
                  <table
                    className={`${Styles.zeroHeight} ${Styles.keyContactLeftMargin}`}
                  >
                    <tbody>
                      <tr style={{ verticalAlign: "top" }}>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.revenueStream}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={keyContacts.listRevStream}
                            keyField={"refId"}
                            valField={"listName"}
                            selectedValue={contactDetails.revStreamType}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                revStreamType: event.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.globalRegion}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={keyContacts.regionRef}
                            keyField={"regionid"}
                            valField={"regionname"}
                            selectedValue={contactDetails.regionid}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                regionid: event.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.relationshipToAccount}:&nbsp;
                        </td>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={Settings.accountRelationship}
                            keyField={"id"}
                            valField={"value"}
                            selectedValue={contactDetails.accountRelationship}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                accountRelationship: event.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.companyName}:{" "}
                        </td>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          <input
                            type="text"
                            name="travelManager.companyName"
                            id="travelManager.companyName"
                            defaultValue={contactDetails?.companyName}
                            className={Styles.textBoxSizeKeyContact}
                            maxLength={255}
                            style={{ width: "326px", height: "18px" }}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                companyName: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell} ${Styles.width60KeyContacts}`}
                        >
                          {Settings.screenText.name}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.name"
                            id="travelManager.name"
                            style={{ width: "296px", height: "18px" }}
                            defaultValue={contactDetails?.name}
                            className={Styles.textBoxSizeWidth300KeyContact}
                            maxLength={40}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                name: e.target.value,
                              });
                            }}
                            onBlur={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                name: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.title}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            defaultValue={contactDetails?.title}
                            name="travelManager.title"
                            id="travelManager.title"
                            style={{ width: "296px", height: "18px" }}
                            className={Styles.textBoxSizeWidth300KeyContact}
                            maxLength={40}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                title: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.address}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.address"
                            id="travelManager.address"
                            defaultValue={contactDetails?.address}
                            style={{ width: "351px", height: "18px" }}
                            className={Styles.textBoxSizeWidth355KeyContact}
                            maxLength={255}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                address: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.city}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.city"
                            id="travelManager.city"
                            defaultValue={contactDetails?.city}
                            size={20}
                            maxLength={40}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                city: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.state}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={keyContacts.stateRef}
                            keyField={"state"}
                            valField={"statename"}
                            selectedValue={contactDetails.state}
                            onChange={(event) => {
                              stateOnChageHandler(event.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.province}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.province"
                            id="travelManager.province"
                            defaultValue={contactDetails?.province}
                            style={{ width: "296px", height: "18px" }}
                            className={Styles.textBoxSizeWidth300KeyContact}
                            maxLength={40}
                            onChange={(e) => {
                              setContactDetails({
                                ...contactDetails,
                                province: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.countryRegion}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <select
                            id="RevStream"
                            name="RevStream"
                            defaultValue={contactDetails.country}
                            value={contactDetails.country}
                            onChange={(event) => {
                              countryOnChangeHandler(event);
                            }}
                          >
                            <option value={Styles.show}></option>
                            {keyContacts.countryRef?.map((data) => (
                              <option
                                key={data.countryname}
                                value={data.country}
                              >
                                {data.countryname}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.zipPostalCode}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.zip"
                            id="travelManager.zip"
                            defaultValue={contactDetails?.zip}
                            size={15}
                            maxLength={20}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                zip: event.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.phone}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.phone"
                            id="travelManager.phone"
                            value={
                              contactDetails?.phone === null
                                ? ""
                                : contactDetails?.phone
                            }
                            size={15}
                            maxLength={25}
                            onChange={(event) => {
                              if (
                                event.target.value === "" ||
                                Settings.re_phone_number.test(
                                  event.target.value
                                )
                              ) {
                                setContactDetails({
                                  ...contactDetails,
                                  phone: event.target.value,
                                });
                              } else {
                                setContactDetails({
                                  ...contactDetails,
                                  phone:
                                    contactDetails.phone === undefined
                                      ? null
                                      : contactDetails.phone,
                                });
                              }
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.email}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <input
                            type="text"
                            name="travelManager.email"
                            id="travelManager.email"
                            defaultValue={contactDetails?.email}
                            style={{ width: "326px", height: "18px" }}
                            className={Styles.textBoxSizeWidth300KeyContact}
                            maxLength={255}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                email: event.target.value,
                              });
                            }}
                            onBlur={(e) => {
                              validateEmail(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.typeOfBuyer}:
                        </td>
                        <td className={Styles.nowrapCell}>
                          <CSelect
                            name="RevStream"
                            id="RevStream"
                            ddnOptions={keyContacts.infRef}
                            keyField={"refId"}
                            valField={"listName"}
                            selectedValue={contactDetails.buyerType}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                buyerType: event.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                          title="What areas is this contact responsible for(i.e. travel, meetings, procurement, etc.)?"
                        >
                          {Settings.screenText.areaOfResponsibility}:
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                          colSpan={7}
                        >
                          <textarea
                            name="travelManager.buyerResponsibility"
                            id="travelManager.buyerResponsibility"
                            className={Styles.textAreaKeyContact}
                            rows={5}
                            cols={125}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                buyerResponsibility: event.target.value,
                              });
                            }}
                            onBlur={(e) => setFieldLength(e, "Responsibility")}
                            onKeyPress={(e) =>
                              Utils.checklen_onkeypress(e, 1024)
                            }
                            defaultValue={contactDetails?.buyerResponsibility}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                          title="Does this contact belong to any Industry groups?"
                        >
                          {Settings.screenText.industryMembership}:
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                          colSpan={7}
                        >
                          <textarea
                            name="travelManager.buyerMemberships"
                            id="travelManager.buyerMemberships"
                            className={Styles.textAreaKeyContact}
                            rows={2}
                            cols={125}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                buyerMemberships: event.target.value,
                              });
                            }}
                            onBlur={(e) => setFieldLength(e, "Membership")}
                            onKeyPress={(e) =>
                              Utils.checklen_onkeypress(e, 150)
                            }
                            defaultValue={contactDetails?.buyerMemberships}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                        >
                          {Settings.screenText.comments}:
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`${Styles.field_Name} ${Styles.nowrapCell}`}
                          colSpan={7}
                        >
                          <textarea
                            name="travelManager.buyerComments"
                            id="travelManager.buyerComments"
                            className={Styles.textAreaKeyContact}
                            rows={5}
                            cols={125}
                            onChange={(event) => {
                              setContactDetails({
                                ...contactDetails,
                                buyerComments: event.target.value,
                              });
                            }}
                            onBlur={(e) => setFieldLength(e, "Comments")}
                            onKeyPress={(e) =>
                              Utils.checklen_onkeypress(e, 1024)
                            }
                            defaultValue={contactDetails?.buyerComments}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table
                  className={`${Styles.zeroHeight} ${Styles.width100KeyContacts}`}
                >
                  <tbody>
                    <tr>
                      <td className={Styles.bottomButtonsKeyContact}>
                        <img
                          onClick={btnUpdateHandler}
                          src={btnUpdate}
                          style={{ marginRight: "8px" }}
                        />
                        &nbsp;&nbsp;
                        <img
                          onClick={btnDeleteHandler}
                          style={{ marginRight: "8px" }}
                          src={btnDelete}
                        />
                        &nbsp;&nbsp;
                        <img
                          onClick={btnCloseHandler}
                          style={{ marginRight: "8px" }}
                          src={btnClose}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          );
        }}
      </KeyContactsContext.Consumer>
    </KeyContactsContextProvider>
  );
}
export default KeyContactsBuyer;
