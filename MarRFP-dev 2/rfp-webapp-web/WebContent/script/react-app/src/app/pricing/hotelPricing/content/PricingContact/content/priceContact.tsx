import React, { useEffect, useContext } from "react";
import styles from "./PriceContact.css";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import API from "../service/API";
import HotelContext, {
  HotelContextProvider,
} from "../context/pricingContactContextProvider";
import { Layout } from "../../../routing/Layout";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
let parentContextType = null;
function priceContact() {
  const urlParms = useLocation().search;
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");

  useEffect(() => {
    if (appContext.updatedPricingData) {
      contextType.setLoader(false);
      appContext.setCpacLoader(false);
      contextType.state.marshaCode = new URLSearchParams(urlParms).get(
        "MarshaCode"
      );
      contextType.state.hotelName = new URLSearchParams(urlParms).get(
        "HotelName"
      );
      contextType.state.period = new URLSearchParams(urlParms).get("Period");
      const param = {
        marshaCode: marshaCode,
        hotelName: hotelName,
        period: period,
      };

      getdata(param);
    }
  }, [appContext.updatedPricingData]);

  useEffect(() => {
    const rootElem = document.getElementById("root");
    if (rootElem) {
      rootElem.style.minWidth = "1240px";
    }
    return () => {
      rootElem?.removeAttribute("style");
      updatePricingContact();
      appContext.setAllFieldValue(true);
      appContext.setCommonValidAlert(false);
      appContext.setPricingContactFixed(false);
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
        isMultipleAlert: false,
        multipleAlertList: [],
      });
    };
  }, []);

  function getdata(param) {
    // contextType.setLoader(true);
    // API.gethotelrespondent(param)
    //   .then((reData) => {
    // localStorage.setItem("totalAPIData", param);
    if (localStorage.getItem("totalAPIData")) {
      const reData = JSON.parse(localStorage.getItem("totalAPIData"));

      window.sessionStorage.setItem("hotelrfpid", reData.hotelrfpid);

      contextType.totalapidata(reData);
      contextType.setGridDataList(reData.hotelData);

      if (reData.hotelRFPRespondent) {
        setHotelRFPRespondent(reData.hotelRFPRespondent);
        contextType.sethotelRFPRespondent();
        contextType.onContentLoad(reData.hotelRFPRespondent);
      }
      const tempArryContext = contextType.sethotelRFPRespondentEmails(
        reData.hotelRFPRespondentEmails
      );
      contextType.getUserDetails(appContext?.user);
      const tempArray = tempArryContext.list;
      if (
        tempArray &&
        tempArray.length == 4 &&
        tempArray[3].email == null &&
        tempArray[3].personname == null &&
        tempArray[3].persontitle == null &&
        tempArray[3].phonenumber == null &&
        appContext?.user.isHotelUser
      ) {
        appContext.setPricingContactFixed(true);
      } else {
        appContext.setPricingContactFixed(false);
      }
    }

    //   contextType.setLoader(false);
    // })
    // .catch((error) => {
    //   console.log("error...", error);
    //   contextType.setLoader(false);
    // });
  }

  function setHotelRFPRespondent(respondent) {
    const hotelRFPRespondent = contextType.state.hotelRFPRespondent;
    hotelRFPRespondent.list = respondent;
    if (
      respondent.personname !== "" &&
      respondent.email !== "" &&
      respondent.persontitle !== "" &&
      respondent.phonenumber !== "" &&
      respondent.countrycode !== ""
    ) {
      const regEx = Settings.validation.emailValidation;
      if (!regEx.test(respondent.email)) {
        appContext.setPricingEmailValidAlert(true);
      }
    }
    contextType.setState({
      ...contextType.state,
      hotelRFPRespondent: hotelRFPRespondent,
    });
  }

  function getUserDetailsdata() {
    const urs = sessionStorage.getItem("GETUSERDETAILS");
    if (urs) {
      contextType.getUserDetails(JSON.parse(urs));
    } else {
      API.getUserDetails()
        .then((data) => {
          contextType.getUserDetails(data);
        })
        .catch((error) => {
          console.log("error...", error);
        });
    }
  }
  function updatePricingContact() {
    let columnList = [];
    const tempArray = contextType.state.hotelRFPRespondentList.list;

    tempArray.map((d, index) => {
      if (d.hasOwnProperty("hiddenField")) {
        delete d.hiddenField;
      }
      const keys = Object.keys(d);
      keys.map((key) => {
        if (key === "emailtypeid") {
          const jsonPair = {};
          let value = {};
          value = d;
          jsonPair[d[key]] = value;
          columnList.push(jsonPair);
        }
      });
    });

    columnList = columnList.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

    contextType.updateGridDisplay(columnList);
  }
  const onPrimaryContact = (e, field) => {
    const re = Settings.validation.name;
    const updatePrimaryList = contextType.state.hotelRFPRespondent.list;
    if (field === "personname") {
      if (e.target.value == "") {
        appContext.setCommonValidAlert(true);
      } else {
        appContext.setCommonValidAlert(false);
      }
      updatePrimaryList.personname = e.target.value;
    }
    if (field === "email") {
      const regEx = Settings.validation.emailValidation;
      if (e.target.value === "") {
        appContext.setCommonValidAlert(true);
      } else if (!regEx.test(e.target.value)) {
        appContext.setCommonValidAlert(false);
        appContext.setPricingEmailValidAlert(true);
      } else if (regEx.test(e.target.value)) {
        appContext.setPricingEmailValidAlert(false);
        appContext.setCommonValidAlert(false);
      }
      updatePrimaryList.email = e.target.value;
    }
    if (field === "phonenumber") {
      if (e.target.value === "" || !re.test(e.target.value)) {
        appContext.setCommonValidAlert(true);
      } else {
        appContext.setCommonValidAlert(false);
      }
      if (
        e.target.value === "" ||
        Settings.validation.re_phone_number.test(e.target.value)
      ) {
        updatePrimaryList.phonenumber = e.target.value;
      }
    }
    if (field === "persontitle") {
      if (e.target.value == "") {
        appContext.setCommonValidAlert(true);
      } else {
        appContext.setCommonValidAlert(false);
      }
      updatePrimaryList.persontitle = e.target.value;
    }

    if (field === "countrycode") {
      if (e.target.value === "" || re.test(e.target.value)) {
        appContext.setCommonValidAlert(true);
      } else {
        appContext.setCommonValidAlert(false);
      }
      updatePrimaryList.countrycode = e.target.value;
    }
    if (field === "areacitycode") {
      if (e.target.value === "" || re.test(e.target.value)) {
        appContext.setCommonValidAlert(true);
      } else {
        appContext.setCommonValidAlert(false);
      }
      updatePrimaryList.areacitycode = e.target.value;
    }

    if (
      updatePrimaryList.personname == "" ||
      updatePrimaryList.email == "" ||
      updatePrimaryList.phonenumber == "" ||
      updatePrimaryList.persontitle == "" ||
      updatePrimaryList.countrycode == "" ||
      updatePrimaryList.areacitycode == ""
    ) {
      appContext.setCommonValidAlert(true);
    } else {
      appContext.setCommonValidAlert(false);
    }
    contextType.sethotelRFPRespondent(updatePrimaryList);
    contextType.validatePage();
  };

  const onfieldChange = (e, i, field) => {
    const updatedList = contextType.state.hotelRFPRespondentList.list;
    updatedList[i].index = i + 1;
    if (field === "personname") {
      if (e.target.value == "") {
        appContext.setCommonValidAlert(true);
        updatedList[i].personname = null;
      } else {
        appContext.setCommonValidAlert(false);
        updatedList[i].personname = e.target.value;
      }
    }
    if (field === "email") {
      const regEx = Settings.validation.emailValidation;
      if (e.target.value == "") {
        appContext.setCommonValidAlert(true);
        updatedList[i].email = null;
      } else if (e.target.value) {
        const validatedEmail = regEx.test(e.target.value);
        if (validatedEmail) {
          appContext.setCommonValidAlert(false);
          appContext.setSecondayEmailValid(false);
          updatedList[i].email = e.target.value;
        } else {
          appContext.setPricingContactIndex(updatedList[i].index);
          appContext.setCommonValidAlert(false);
          appContext.setSecondayEmailValid(true);
          updatedList[i].email = e.target.value;
        }
      }
    }
    if (field === "phonenumber") {
      if (
        e.target.value == "" ||
        !Settings.validation.re_phone_number.test(e.target.value)
      ) {
        appContext.setCommonValidAlert(true);
        updatedList[i].phonenumber =
          e.target.value === "" ? null : updatedList[i].phonenumber;
      } else {
        appContext.setCommonValidAlert(false);
        updatedList[i].phonenumber = e.target.value;
      }
    }
    if (field === "persontitle") {
      if (e.target.value == "") {
        appContext.setCommonValidAlert(true);
        updatedList[i].persontitle = null;
      } else {
        appContext.setCommonValidAlert(false);
        updatedList[i].persontitle = e.target.value;
      }
    }
    const regEx = Settings.validation.emailValidation;
    if (
      updatedList[3]?.email == null &&
      updatedList[3]?.personname == null &&
      updatedList[3]?.persontitle == null &&
      updatedList[3]?.phonenumber == null
    ) {
      appContext.setPricingContactFixed(true);
    } else {
      appContext.setPricingContactFixed(false);
    }
    if (
      (updatedList[i].email == null &&
        updatedList[i].personname == null &&
        updatedList[i].persontitle == null &&
        updatedList[i].phonenumber == null) ||
      (updatedList[i].email != null &&
        updatedList[i].personname != null &&
        updatedList[i].persontitle != null &&
        updatedList[i].phonenumber != null)
    ) {
      appContext.setCommonValidAlert(false);
    } else {
      appContext.setCommonValidAlert(true);
    }

    appContext.setSecondayEmailValid(false);
    //for (let i = updatedList.length; i > 0; i--) {
    for (let i = 0; i < updatedList.length; i++) {
      if (
        updatedList[i].email !== null &&
        regEx.test(updatedList[i].email) == false
      ) {
        appContext.setPricingContactIndex(i + 1);
        appContext.setSecondayEmailValid(true);
        break;
      }
    }
    const tempsethotelRFPRespondentEmails =
      contextType.sethotelRFPRespondentEmails(updatedList);
  };

  return (
    <Layout>
      <HotelPricingContext.Consumer>
        {(hotelPricing) => {
          parentContextType = hotelPricing;

          return (
            <div>
              {parentContextType?.showLoader ? (
                <CLoader />
              ) : (
                <HotelContextProvider>
                  <HotelContext.Consumer>
                    {(CenterallyPricedAccount) => {
                      contextType = CenterallyPricedAccount;

                      return (
                        <div>
                          {!appContext.updatedPricingData ? (
                            ""
                          ) : (
                            <table className={styles.zeroHeight}>
                              <input type="hidden" />
                              <tbody>
                                <tr>
                                  <td>
                                    <table className={styles.zeroHeight}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {Settings.address.label}
                                          </td>
                                          <td
                                            className={styles.widthSpace}
                                          ></td>
                                          <td className={styles.fieldValue}>
                                            {
                                              contextType.state.gridData.list
                                                .address1
                                            }
                                          </td>
                                        </tr>

                                        <tr>
                                          <td></td>
                                          <td
                                            className={styles.widthSpace}
                                          ></td>
                                          <td className={styles.fieldValue}>
                                            {
                                              contextType.state.gridData.list
                                                .citycountryzip
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {Settings.phoneNumber.label}
                                          </td>
                                          <td
                                            className={styles.widthSpace}
                                          ></td>
                                          <td className={styles.fieldValue}>
                                            {
                                              contextType.state.gridData.list
                                                .main_phone_incl
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.height15}></td>
                                </tr>

                                <tr>
                                  <td className={styles.instructions}>
                                    {Settings.instructions.details}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table className={styles.zeroHeight}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {Settings.pricingContact.name.label}
                                          </td>
                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .personname
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact.name
                                                      .id
                                                  }
                                                  type="text"
                                                  name={
                                                    Settings.pricingContact.name
                                                      .name
                                                  }
                                                  className={
                                                    styles.priceContactInput
                                                  }
                                                  //  onChange={contextType.onPersonName}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "personname"
                                                    );
                                                  }}
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .personname
                                                  }
                                                  maxLength={40}
                                                />
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.pricingContact.title
                                                .label
                                            }
                                          </td>

                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .persontitle
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact
                                                      .title.id
                                                  }
                                                  name={
                                                    Settings.pricingContact
                                                      .title.id
                                                  }
                                                  className={
                                                    styles.priceContactInput
                                                  }
                                                  //  onChange={contextType.onPersonTitle}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "persontitle"
                                                    );
                                                  }}
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .persontitle
                                                  }
                                                  maxLength={40}
                                                />
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.pricingContact.email
                                                .label
                                            }
                                          </td>
                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .email
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact
                                                      .email.id
                                                  }
                                                  name={
                                                    Settings.pricingContact
                                                      .email.name
                                                  }
                                                  className={
                                                    styles.priceContactInput
                                                  }
                                                  onKeyPress={
                                                    Utils.EmailSafeCharsOnly_onkeypress
                                                  }
                                                  //  onChange={contextType.handleChange3}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "email"
                                                    );
                                                  }}
                                                  // onBlur={contextType.enteremail}
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .email
                                                  }
                                                  maxLength={255}
                                                />
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.pricingContact
                                                .countryCode.label
                                            }
                                          </td>
                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .countrycode
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact
                                                      .countryCode.id
                                                  }
                                                  name={
                                                    Settings.pricingContact
                                                      .countryCode.name
                                                  }
                                                  className={
                                                    styles.countryCodeInput
                                                  }
                                                  //  onChange={contextType.onCountyCode}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "countrycode"
                                                    );
                                                  }}
                                                  onKeyPress={(e) =>
                                                    Utils.NumberOnly_onkeypress(
                                                      e,
                                                      "priceContact"
                                                    )
                                                  }
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .countrycode
                                                  }
                                                  maxLength={5}
                                                />
                                                <>&nbsp;</>
                                                <>&nbsp;</>
                                                <em>For example, US=001</em>
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.pricingContact.cityCode
                                                .label
                                            }
                                          </td>
                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .areacitycode
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact
                                                      .cityCode.id
                                                  }
                                                  name={
                                                    Settings.pricingContact
                                                      .cityCode.name
                                                  }
                                                  className={
                                                    styles.cityCodeInput
                                                  }
                                                  //  onChange={contextType.onCityCode}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "areacitycode"
                                                    );
                                                  }}
                                                  onKeyPress={(e) =>
                                                    Utils.NumberOnly_onkeypress(
                                                      e,
                                                      "priceContact"
                                                    )
                                                  }
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .areacitycode
                                                  }
                                                  maxLength={6}
                                                />
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.pricingContact
                                                .contactPhone.label
                                            }
                                          </td>
                                          <td className={styles.fieldValue}>
                                            {appContext?.user?.role ===
                                              "MFPFSALE" ||
                                            appContext?.user?.role ===
                                              "MFPSALES" ? (
                                              <>
                                                {
                                                  contextType.state
                                                    .hotelRFPRespondent.list
                                                    .phonenumber
                                                }
                                              </>
                                            ) : (
                                              <>
                                                <input
                                                  id={
                                                    Settings.pricingContact
                                                      .contactPhone.id
                                                  }
                                                  name={
                                                    Settings.pricingContact
                                                      .contactPhone.name
                                                  }
                                                  className={
                                                    styles.contactPhoneInput
                                                  }
                                                  onKeyPress={(e) =>
                                                    Utils.NumberOnly_onkeypressPhone(
                                                      e,
                                                      "priceContact"
                                                    )
                                                  }
                                                  //  onChange={contextType.onContactPhone}
                                                  onChange={(e) => {
                                                    onPrimaryContact(
                                                      e,
                                                      "phonenumber"
                                                    );
                                                  }}
                                                  value={
                                                    contextType.state
                                                      .hotelRFPRespondent.list
                                                      .phonenumber
                                                  }
                                                  maxLength={10}
                                                />
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.height15}></td>
                                </tr>
                                <tr>
                                  <td className={styles.instructions}>
                                    {
                                      Settings.PriceContactTable
                                        .additionalContact
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div>
                                      <table>
                                        <tr style={{ display: "flex" }}>
                                          <td className={styles.width15}></td>
                                          <td
                                            className={classnames(
                                              styles.fieldName,
                                              styles.additionalContact
                                            )}
                                          >
                                            {Settings.PriceContactTable.name}
                                          </td>
                                          <td
                                            className={classnames(
                                              styles.fieldName,
                                              styles.additionalContact
                                            )}
                                          >
                                            {Settings.PriceContactTable.email}
                                          </td>
                                          <td
                                            className={classnames(
                                              styles.fieldName,
                                              styles.additionalContact
                                            )}
                                          >
                                            {Settings.PriceContactTable.phone}
                                          </td>
                                          <td
                                            className={classnames(
                                              styles.fieldName,
                                              styles.additionalContact
                                            )}
                                          >
                                            {Settings.PriceContactTable.title}
                                          </td>
                                        </tr>
                                      </table>
                                    </div>

                                    {contextType.state.hotelRFPRespondentList.list.map(
                                      (data, index) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <div>
                                            {contextType.state
                                              .hotelRFPRespondentList.list
                                              .length >= 4 &&
                                            data.emailtypeid === 4 ? (
                                              <p
                                                className={styles.pricingStyle}
                                              >
                                                {Settings.specialNote.contact5}
                                              </p>
                                            ) : contextType.state
                                                .hotelRFPRespondentList.list
                                                .length < 4 &&
                                              index ==
                                                contextType.state
                                                  .hotelRFPRespondentList.list
                                                  .length -
                                                  1 ? (
                                              <p
                                                className={styles.pricingStyle}
                                              >
                                                {Settings.specialNote.contact5}
                                              </p>
                                            ) : null}
                                            <table
                                              className={styles.zeroHeight}
                                            >
                                              <tbody>
                                                {!data.hiddenField ? (
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.fieldName
                                                      }
                                                    >
                                                      <span
                                                        className={
                                                          styles.priceContactLabel
                                                        }
                                                        style={{
                                                          marginRight: "0px",
                                                          whiteSpace: "nowrap",
                                                          width: "103px",
                                                          display: "block",
                                                        }}
                                                      >
                                                        {
                                                          Settings
                                                            .pricingContact
                                                            .pricingContacts
                                                        }

                                                        <span
                                                          style={{
                                                            marginLeft: "3px",
                                                          }}
                                                        >
                                                          {contextType.state
                                                            .hotelRFPRespondentList
                                                            .list.length >= 4 &&
                                                          data.emailtypeid === 4
                                                            ? index + 2
                                                            : contextType.state
                                                                .hotelRFPRespondentList
                                                                .list.length <
                                                                4 &&
                                                              index ===
                                                                contextType
                                                                  .state
                                                                  .hotelRFPRespondentList
                                                                  .list.length -
                                                                  1
                                                            ? Settings.pricingcontact5Index
                                                            : index + 2}
                                                        </span>
                                                      </span>
                                                    </td>

                                                    {appContext?.user?.role ===
                                                      "MFPFSALE" ||
                                                    appContext?.user?.role ===
                                                      "MFPSALES" ? (
                                                      <>
                                                        <td
                                                          className={classnames(
                                                            styles.fieldValue,
                                                            styles.priceContactInput,
                                                            styles.priceContactInputReadOnly
                                                          )}
                                                        >
                                                          {data.personname}
                                                        </td>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <td
                                                          className={
                                                            styles.fieldValue
                                                          }
                                                        >
                                                          <input
                                                            type="text"
                                                            onChange={(e) => {
                                                              onfieldChange(
                                                                e,
                                                                index,
                                                                "personname"
                                                              );
                                                            }}
                                                            value={
                                                              data.personname
                                                            }
                                                            className={
                                                              styles.priceContactInput
                                                            }
                                                            maxLength={40}
                                                          />
                                                          <input
                                                            type="hidden"
                                                            value="1"
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                    {appContext?.user?.role ===
                                                      "MFPFSALE" ||
                                                    appContext?.user?.role ===
                                                      "MFPSALES" ? (
                                                      <>
                                                        <td
                                                          className={classnames(
                                                            styles.fieldValue,
                                                            styles.priceContactInput,
                                                            styles.priceContactInputReadOnly
                                                          )}
                                                        >
                                                          {data.email}
                                                        </td>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <td
                                                          className={
                                                            styles.fieldValue
                                                          }
                                                        >
                                                          <input
                                                            onKeyPress={
                                                              Utils.EmailSafeCharsOnly_onkeypress
                                                            }
                                                            onChange={(e) => {
                                                              onfieldChange(
                                                                e,
                                                                index,
                                                                "email"
                                                              );
                                                            }}
                                                            type="text"
                                                            value={data.email}
                                                            className={
                                                              styles.priceContactInput
                                                            }
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                    {appContext?.user?.role ===
                                                      "MFPFSALE" ||
                                                    appContext?.user?.role ===
                                                      "MFPSALES" ? (
                                                      <>
                                                        <td
                                                          className={classnames(
                                                            styles.fieldValue,
                                                            styles.priceContactInput,
                                                            styles.priceContactInputReadOnly
                                                          )}
                                                        >
                                                          {data.phonenumber}
                                                        </td>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <td
                                                          className={
                                                            styles.fieldValue
                                                          }
                                                        >
                                                          <input
                                                            onChange={(e) => {
                                                              onfieldChange(
                                                                e,
                                                                index,
                                                                "phonenumber"
                                                              );
                                                            }}
                                                            type="text"
                                                            onKeyPress={(e) =>
                                                              Utils.NumberOnly_onkeypressPhone(
                                                                e,
                                                                "priceContact"
                                                              )
                                                            }
                                                            value={
                                                              data.phonenumber ===
                                                              null
                                                                ? ""
                                                                : data.phonenumber
                                                            }
                                                            className={
                                                              styles.priceContactInput
                                                            }
                                                            maxLength={25}
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                    {appContext?.user?.role ===
                                                      "MFPFSALE" ||
                                                    appContext?.user?.role ===
                                                      "MFPSALES" ? (
                                                      <>
                                                        <td
                                                          className={classnames(
                                                            styles.fieldValue,
                                                            styles.priceContactInput,
                                                            styles.priceContactInputReadOnly
                                                          )}
                                                        >
                                                          {data.persontitle}
                                                        </td>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <td
                                                          className={
                                                            styles.fieldValue
                                                          }
                                                        >
                                                          <input
                                                            onChange={(e) => {
                                                              onfieldChange(
                                                                e,
                                                                index,
                                                                "persontitle"
                                                              );
                                                            }}
                                                            type="text"
                                                            value={
                                                              data.persontitle
                                                            }
                                                            className={
                                                              styles.priceContactInput
                                                            }
                                                            maxLength={40}
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                  </tr>
                                                ) : null}
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </td>
                                </tr>
                                <tr className={styles.height10}>
                                  <td></td>
                                </tr>
                                <tr>
                                  {/* *****************Special Note:******************* */}
                                  <td className={styles.fielsNameRed}>
                                    {Settings.specialNote.label}
                                    <br />
                                    {Settings.specialNote.priciingContact1}
                                    <br />
                                    {Settings.specialNote.priciingContact2}
                                    <br />
                                    {Settings.specialNote.priciingContact3}
                                    <br />
                                    {Settings.specialNote.priciingContact4}
                                    <br />
                                    {Settings.specialNote.priciingContact5}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>
                      );
                    }}
                  </HotelContext.Consumer>
                </HotelContextProvider>
              )}
            </div>
          );
        }}
      </HotelPricingContext.Consumer>
      <style>{`
        @media only screen and (max-width: 1250px){
          .page_body_container {
              min-height: calc(100vh - 106px) !important;
          }
        }
      `}</style>
    </Layout>
  );
}

export default priceContact;
