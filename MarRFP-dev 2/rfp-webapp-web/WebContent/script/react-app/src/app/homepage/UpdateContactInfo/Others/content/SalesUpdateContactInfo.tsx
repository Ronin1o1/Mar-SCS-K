/* eslint-disable react/jsx-key */
import React, { useContext, useEffect } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import SalesUpdateContactInfoContext, {
  SalesUpdateContactInfoContextProvider,
} from "../context/SalesUpdateContactInfoContext";
import styles from "../content/SalesUpdateContactInfo.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnAdd2 from "../../../../common/assets/img/button/btnAdd2.gif";
import btnRemove2 from "../../../../common/assets/img/button/btnRemove2.gif";
import btnRemoveAll2 from "../../../../common/assets/img/button/btnRemoveAll2.gif";
import btnAddAll2 from "../../../../common/assets/img/button/btnAddAll2.gif";
import btnAdd from "../../../../common/assets/img/button/btnAdd.gif";
import btnRemove from "../../../../common/assets/img/button/btnRemove.gif";
import btnViewPC from "../../../../common/assets/img/button/btnViewPC.gif";
import Settings from "../../static/Settings";
import APISales from "../service/APISales";
import APILimitedSales from "../service/APILimitedSales";
import APIHotel from "../service/APIHotel";
import Utils from "../../shared/Utils";
import CSelect from "../../../../common/components/CSelect";
//import { defineLocale } from "moment";
import { CPagination } from "../../../../common/components/CPagination";
import { CheckboxListView } from "../../shared/CheckboxListView";
import CModal from "../../../../common/components/CModal";
import { ViewPrimaryContact } from "./ViewPrimaryContact";
import { createPortal } from "react-dom";
let contextType = null;
let isSalesUser = false;
let isLimitedSalesUser = false;
let isHotelUser = false;

const SalesUpdateContactInfo = () => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  useEffect(() => {
    contextType.setLoader(true);

    if (
      appContext.user.role == "MFPSALES" ||
      appContext.user.role == "MFPFSALE"
    ) {
      isSalesUser = true;

      const alreadyAssigned = appContext.alreadyAssigned;
      APISales.getSalesUpdateInfo(alreadyAssigned).then((data) => {
        data !== null &&
          data.marketSalesRegionList.unshift({ regionid: 0, region: "*" });
        if (data.alreadyAssigned) {
          contextType.setAlertModalMsg();
          alert(Settings.updateContactInfo.alreadyAssignedAlert);
        }
        contextType.setPrimaryGridLoader(false);
        contextType.setSalesUpdateInfoData(data, "onmount");
        contextType.setLoader(false);
      });

      if (appContext.user.role == "MFPFSALE") {
        isLimitedSalesUser = true;
        APILimitedSales.getLimitedSalesUpdateInfo().then((data) => {
          contextType.setLimitedSalesUpdateInfoData(data);
        });
      } else {
        isLimitedSalesUser = false;
      }
      isHotelUser = false;
    }

    if (appContext.user.role == "MFPUSER") {
      isHotelUser = true;
      APIHotel.getHotelUpdateInfo().then((data) => {
        contextType.setHotelInfoData(data);
        contextType.setLoader(false);
      });
    }
  }, [appContext.user]);

  useEffect(() => {
    return () => {
      if (
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
      ) {
        if (!contextType.fromSalesUpdateButtonClick) {
          contextType.saveUpdateInfo(appContext.user.role, "unmount", "");
        }
      } else {
        if (!contextType.fromUserUpdateButtonClick) {
          contextType.saveUpdateHomeInfo();
        }
      }
    };
  }, []);

  const handlePaginationAPILimitedHotelSales = (pageNumber: number) => {
    contextType.setPageHotelNumber(pageNumber);
  };

  const handlePaginationAPILimitedAcctSales = (pageNumber: number) => {
    contextType.setPageAcctNumber(pageNumber);
  };

  const onValidation = (e, field, type) => {
    if (type == "Sales") {
      let updatedListSales = contextType.state.Respondent.Personal;
      updatedListSales = Utils.checkValidation(e, field, updatedListSales);
      contextType.setValidationData(updatedListSales, field);
      contextType.validateSalesFields();
    }

    if (type == "Hotel") {
      let updatedList = contextType.state.hotelRespondent;
      updatedList = Utils.checkValidation(e, field, updatedList);
      contextType.setValidationHotelData(updatedList, field);
      contextType.validateHotelFields();
    }
  };

  const Popup = ({
    title = "",
    onClose = null,
    show = false,
    alertModalMsg = "",
  }) => {
    return createPortal(
      <CModal
        key={alertModalMsg}
        title={title}
        onClose={onClose}
        show={show}
        xPosition={-100}
        yPosition={-45}
        closeImgTitle={"Close"}
        overlayHeight="calc(100vh + 85px)"
        overlayTopPosition="-85px"
        overlayWidth="100% !important"
      >
        <div style={{ margin: "10px" }}>{alertModalMsg}</div>
      </CModal>,
      document.body
    );
  };

  return (
    <SalesUpdateContactInfoContextProvider>
      <SalesUpdateContactInfoContext.Consumer>
        {(SalesUpdateContactInfoListContext) => {
          contextType = SalesUpdateContactInfoListContext;

          return (
            <React.Fragment>
              <CModal
                title={Settings.updateContactInfo.salesMudroomModalTitle}
                onClose={() => {
                  contextType.seePrimaryContacts(true);
                }}
                show={contextType.viewPrimaryContactFlag}
                xPosition={-500}
                yPosition={-200}
              >
                <ViewPrimaryContact
                  data={contextType.state.salesMudrromPC}
                  totalPage={contextType.state.totalPCPages}
                  handleChange={contextType.handleClose}
                />
              </CModal>
              <CModal
                title={Settings.updateContactInfo.alertMessage}
                onClose={() => {
                  contextType.alertMessageOnAccount(true);
                }}
                show={contextType.alertOnAccount}
                xPosition={-200}
                yPosition={-100}
              >
                <p className={styles.padding_15}>
                  {Settings.updateContactInfo.primaryAccountsNotSelected}
                </p>
              </CModal>
              <CModal
                title={Settings.updateContactInfo.alertMessage}
                onClose={() => {
                  contextType.alertMessageOnHotel(true);
                }}
                show={contextType.alertOnHotel}
                xPosition={-200}
                yPosition={-100}
              >
                <p className={styles.padding_15}>
                  {Settings.updateContactInfo.hotelsNotPresent}
                </p>
              </CModal>
              <Popup
                title={Settings.updateContactInfo.alertMessage}
                onClose={contextType.closeModalAlert}
                show={contextType.showModalAlert}
                alertModalMsg={contextType.alertModalMsg}
              />
              {contextType.state.showScreenLoader ? (
                <img
                  style={{ position: "absolute", top: "55%", left: "45%" }}
                  src={screenLoader}
                />
              ) : (
                <form>
                  {isHotelUser ? (
                    <table className={styles.fullHeight}>
                      <tbody>
                        <tr>
                          <td className={styles.fullHeighttd}>
                            <table
                              className={`${styles.menuWdth100_Height} ${styles.heightSixtyfive}`}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    className={`${styles.Header} ${styles.center}`}
                                  >
                                    {contextType.state.isHomeUpdate
                                      ? Settings.updateContactInfo
                                          .pageTitleHomeUpdate
                                      : Settings.updateContactInfo.pageTitle}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.center}>
                                    <a href="javascript:void(0);">
                                      <img
                                        src={btnUpdate}
                                        className={`${styles.btnUpdatestyle}`}
                                        alt={
                                          Settings.updateContactInfo.btnUpdate
                                        }
                                        onClick={(e) =>
                                          contextType.saveUpdateHomeInfo(
                                            "onSaveButtonClick"
                                          )
                                        }
                                      />
                                    </a>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                  </td>
                                </tr>
                                <tr
                                  className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                                >
                                  <td className={styles.btnUpdatestyle1} />
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.top}>
                            <table
                              className={`${styles.zero_Height} ${styles.zero_HeightTable} ${styles.marginLeft}`}
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.instructions}>
                                    {Settings.updateContactInfo.instructions}
                                  </td>
                                </tr>
                                <tr className={styles.heightTen}>
                                  <td>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      className={`${styles.menuWdth100_Height}`}
                                    >
                                      <tbody>
                                        <tr>
                                          <td className={styles.colWidth}>
                                            <table
                                              className={styles.zero_Height}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    <label
                                                      style={{
                                                        fontWeight: "normal",
                                                      }}
                                                    >
                                                      {
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personname
                                                      }
                                                    </label>
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personname
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personname
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personname
                                                      }
                                                      maxLength={40}
                                                    />
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .hotelRespondentid
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .hotelRespondentid
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .hotelRespondentid
                                                      }
                                                      maxLength={40}
                                                    />
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent.eid
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent.eid
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent.eid
                                                      }
                                                      maxLength={40}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .title
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personTitle
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personTitle
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .personTitle
                                                      }
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "title",
                                                          "Hotel"
                                                        );
                                                      }}
                                                      maxLength={40}
                                                      size={100}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .email
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent.email
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent.email
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent.email
                                                      }
                                                      maxLength={255}
                                                      size={100}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "email",
                                                          "Hotel"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .countryCode
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .countrycode
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .countrycode
                                                      }
                                                      className={`
                                                      ${styles.heightAndWidth1}
                                                      ${styles.width_51}
                                                      `}
                                                      maxLength={3}
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .countrycode
                                                      }
                                                      size={3}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "countryCode",
                                                          "Hotel"
                                                        );
                                                      }}
                                                    />
                                                    <>
                                                      <>&nbsp;</>
                                                    </>
                                                    <>
                                                      <>&nbsp;</>
                                                    </>
                                                    <em>
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .forEg
                                                      }
                                                    </em>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={`${styles.field_Name} ${styles.nowrapStyle}`}
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .area_cityCode
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .areacitycode
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .areacitycode
                                                      }
                                                      className={`
                                                      ${styles.heightAndWidth1}
                                                      ${styles.width_51}
                                                      `}
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .areacitycode
                                                      }
                                                      maxLength={4}
                                                      size={4}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "areaCode",
                                                          "Hotel"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .phone
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .phonenumber
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .phonenumber
                                                      }
                                                      className={`
                                                      ${styles.heightAndWidth2}
                                                      ${styles.width_106}
                                                      `}
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .phonenumber
                                                      }
                                                      maxLength={10}
                                                      size={10}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "phone",
                                                          "Hotel"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .fax
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .faxnumber
                                                      }
                                                      name={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .faxnumber
                                                      }
                                                      className={`
                                                      ${styles.heightAndWidth2}
                                                      ${styles.width_106}
                                                      `}
                                                      value={
                                                        contextType.state
                                                          .hotelRespondent
                                                          .faxnumber
                                                      }
                                                      maxLength={10}
                                                      size={10}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "fax",
                                                          "Hotel"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table className={styles.fullHeight}>
                      <tbody>
                        <tr>
                          <td className={styles.fullHeighttd}>
                            <table
                              className={`${styles.menuWdth100_Height} ${styles.heightSixtyfive}`}
                            >
                              <tbody>
                                <tr>
                                  {isSalesUser ? (
                                    <td
                                      className={`${styles.Header} ${styles.center}`}
                                    >
                                      {contextType.state.isSalesUpdate
                                        ? Settings.updateContactInfo
                                            .pageTitleSalesUpdate
                                        : Settings.updateContactInfo.pageTitle}
                                    </td>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                                <tr>
                                  <td className={styles.center}>
                                    <a href="javascript:void(0);">
                                      <img
                                        src={btnUpdate}
                                        className={`${styles.btnUpdatestyle}`}
                                        alt={
                                          Settings.updateContactInfo.btnUpdate
                                        }
                                        onClick={(e) =>
                                          contextType.saveUpdateInfo(
                                            appContext.user.role,
                                            "onSaveButtonClick",
                                            ""
                                          )
                                        }
                                      />
                                    </a>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                  </td>
                                </tr>
                                <tr
                                  className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                                >
                                  <td className={styles.btnUpdatestyle1} />
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.top}>
                            <table
                              className={`${styles.zero_Height} ${styles.zero_HeightTable}  ${styles.marginLeft}`}
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.instructions}>
                                    {Settings.updateContactInfo.instructions}
                                  </td>
                                </tr>
                                <tr className={styles.heightTen}>
                                  <td>
                                    <>
                                      <>&nbsp;</>
                                    </>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      className={`${styles.menuWdth100_Height}`}
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            className={
                                              isLimitedSalesUser
                                                ? styles.colWidth
                                                : styles.colWidthLimitedUser
                                            }
                                          >
                                            <table
                                              className={styles.zero_Height}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    <label
                                                      className={
                                                        styles.field_Value
                                                      }
                                                    >
                                                      {
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personname
                                                      }
                                                    </label>
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personname
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personname
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personname
                                                      }
                                                      maxLength={40}
                                                    />
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .salesrespondentid
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .salesrespondentid
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .salesrespondentid
                                                      }
                                                      maxLength={40}
                                                    />
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .eid
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .eid
                                                      }
                                                      type={
                                                        Settings
                                                          .updateContactInfo
                                                          .hidden
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .eid
                                                      }
                                                      maxLength={40}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .title
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personTitle
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personTitle
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .personTitle
                                                      }
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "title",
                                                          "Sales"
                                                        );
                                                      }}
                                                      maxLength={40}
                                                      size={100}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr
                                                  className={
                                                    styles.heightThreeForm
                                                  }
                                                >
                                                  <td
                                                    className={styles.colGap}
                                                  />
                                                </tr>
                                                <tr>
                                                  {isLimitedSalesUser ? (
                                                    <td></td>
                                                  ) : (
                                                    <td
                                                      className={`${styles.field_Name} ${styles.nowrapStyle} ${styles.left_panel_label}`}
                                                    >
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .salesType
                                                      }
                                                    </td>
                                                  )}
                                                  {isLimitedSalesUser ? (
                                                    <td></td>
                                                  ) : (
                                                    <td
                                                      className={
                                                        styles.field_Value
                                                      }
                                                    >
                                                      <select
                                                        id={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleTypeOption
                                                            .id
                                                        }
                                                        name={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleTypeOption
                                                            .keyField
                                                        }
                                                        className={
                                                          styles.dropdown_width
                                                        }
                                                        onChange={(e) => {
                                                          contextType.handleDropdownChange(
                                                            e,
                                                            "salesType"
                                                          );
                                                        }}
                                                      >
                                                        <option value="*">
                                                          {
                                                            Settings
                                                              .updateContactInfo
                                                              .showAll
                                                          }
                                                        </option>
                                                        {contextType.getSalesType()}
                                                      </select>
                                                    </td>
                                                  )}
                                                </tr>
                                                <tr
                                                  className={styles.heightOne}
                                                >
                                                  <td
                                                    className={styles.colGap}
                                                  />
                                                </tr>
                                                <tr>
                                                  {isLimitedSalesUser ? (
                                                    <td></td>
                                                  ) : (
                                                    <td
                                                      className={`${styles.field_Name} ${styles.nowrapStyle} ${styles.left_panel_label}`}
                                                    >
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .salesRegion
                                                      }
                                                    </td>
                                                  )}
                                                  {isLimitedSalesUser ? (
                                                    <td></td>
                                                  ) : (
                                                    <td
                                                      className={
                                                        styles.field_Value
                                                      }
                                                    >
                                                      <select
                                                        id={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleRegionOption
                                                            .id
                                                        }
                                                        name={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleRegionOption
                                                            .keyField
                                                        }
                                                        className={
                                                          styles.dropdown_width
                                                        }
                                                        onChange={(e) => {
                                                          contextType.handleDropdownChange(
                                                            e,
                                                            "salesRegion"
                                                          );
                                                        }}
                                                      >
                                                        <option value="0">
                                                          {
                                                            Settings
                                                              .updateContactInfo
                                                              .showAll
                                                          }
                                                        </option>
                                                        {contextType.getRegionType()}
                                                      </select>
                                                    </td>
                                                  )}
                                                </tr>
                                                <tr
                                                  className={styles.heightOne}
                                                >
                                                  <td
                                                    className={styles.colGap}
                                                  />
                                                </tr>
                                                {contextType.state
                                                  .isMarketSales ? (
                                                  <tr>
                                                    <td
                                                      className={`${styles.field_Name} ${styles.nowrapStyle}`}
                                                    >
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .salesArea
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.field_Value
                                                      }
                                                    >
                                                      <CSelect
                                                        id={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleAreaOption
                                                            .id
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .Respondent.Personal
                                                            .salesregionid
                                                        }
                                                        ddnOptions={
                                                          contextType.state
                                                            .Respondent
                                                            .ResponArray
                                                            .marketSalesRegionList
                                                        }
                                                        className={
                                                          styles.dropdown_width
                                                        }
                                                        onChange={(e) => {
                                                          contextType.handleDropdownChange(
                                                            e,
                                                            "salesArea"
                                                          );
                                                        }}
                                                        keyField={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleAreaOption
                                                            .keyField
                                                        }
                                                        valField={
                                                          contextType.state
                                                            .filter
                                                            .updateInfoSaleAreaOption
                                                            .valField
                                                        }
                                                      />
                                                    </td>
                                                  </tr>
                                                ) : (
                                                  ""
                                                )}
                                              </tbody>
                                            </table>
                                          </td>
                                          <td className={styles.top}>
                                            <table
                                              className={styles.zero_Height}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .email
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .email
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .email
                                                      }
                                                      className={
                                                        styles.heightAndWidth
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .email
                                                      }
                                                      maxLength={255}
                                                      size={100}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "email",
                                                          "Sales"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .countryCode
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .countrycode
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .countrycode
                                                      }
                                                      className={
                                                        styles.heightAndWidth1
                                                      }
                                                      maxLength={3}
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .countrycode
                                                      }
                                                      size={3}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "countryCode",
                                                          "Sales"
                                                        );
                                                      }}
                                                    />
                                                    <>
                                                      <>&nbsp;</>
                                                    </>
                                                    <>
                                                      <>&nbsp;</>
                                                    </>
                                                    <em>
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .forEg
                                                      }
                                                    </em>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={`${styles.field_Name} ${styles.nowrapStyle}`}
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .area_cityCode
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .areacitycode
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .areacitycode
                                                      }
                                                      className={
                                                        styles.heightAndWidth1
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .areacitycode
                                                      }
                                                      maxLength={4}
                                                      size={4}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "areaCode",
                                                          "Sales"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .phone
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .phonenumber
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .phonenumber
                                                      }
                                                      className={
                                                        styles.heightAndWidth2
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .phonenumber
                                                      }
                                                      maxLength={10}
                                                      size={10}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "phone",
                                                          "Sales"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    {
                                                      Settings.updateContactInfo
                                                        .fax
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.field_Value
                                                    }
                                                  >
                                                    <input
                                                      id={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .faxnumber
                                                      }
                                                      name={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .faxnumber
                                                      }
                                                      className={
                                                        styles.heightAndWidth2
                                                      }
                                                      value={
                                                        contextType.state
                                                          .Respondent.Personal
                                                          .faxnumber
                                                      }
                                                      maxLength={10}
                                                      size={10}
                                                      onChange={(e) => {
                                                        onValidation(
                                                          e,
                                                          "fax",
                                                          "Sales"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr className={styles.heightThree}>
                                  <td className={styles.colGap} />
                                </tr>
                                <tr>
                                  <td>
                                    <table>
                                      <tbody>
                                        {contextType.state.isMarketSales ? (
                                          <tr>
                                            <td
                                              className={`${styles.field_Name}${styles.labelLength}`}
                                            >
                                              <span
                                                className={styles.font_bold}
                                              >
                                                {
                                                  Settings.updateContactInfo
                                                    .partMarketSalesOrFunded
                                                }
                                              </span>
                                              <span></span>
                                            </td>
                                          </tr>
                                        ) : (
                                          <tr></tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table>
                                      <tbody>
                                        {contextType.state.isMarketSales ? (
                                          <tr>
                                            <td
                                              className={`${styles.field_Name}${styles.headerwidth}`}
                                            >
                                              <span
                                                className={styles.font_bold}
                                              >
                                                {
                                                  Settings.updateContactInfo
                                                    .availableHotels
                                                }
                                              </span>
                                              <span></span>
                                            </td>
                                            <td
                                              className={
                                                styles.arrow_navigation_width
                                              }
                                            ></td>
                                            <td className={styles.field_Name}>
                                              {
                                                Settings.updateContactInfo
                                                  .hotelsFundingYou
                                              }
                                              <span></span>
                                            </td>
                                          </tr>
                                        ) : (
                                          <tr></tr>
                                        )}
                                        {contextType.state.isMarketSales ? (
                                          <tr>
                                            <td className={styles.top}>
                                              <select
                                                multiple={true}
                                                size={10}
                                                id={
                                                  contextType.state.filter
                                                    .hotelNotSelectedOption.id
                                                }
                                                className={
                                                  styles.heightAndWidth4
                                                }
                                                onChange={(e) => {
                                                  contextType.setHotelNotSelValue(
                                                    e
                                                  );
                                                }}
                                              >
                                                {contextType.state.Respondent
                                                  .ResponArray
                                                  .salesHotelNotSel &&
                                                  contextType.state.Respondent.ResponArray.salesHotelNotSel.map(
                                                    (result) => (
                                                      <option
                                                        id={result.marshaCode}
                                                        value={
                                                          result.marshaCode
                                                        }
                                                      >
                                                        {result.marshaCode} -{" "}
                                                        {result.hotelName}
                                                      </option>
                                                    )
                                                  )}
                                              </select>
                                            </td>
                                            <td>
                                              <table
                                                className={`${styles.zero_Height} ${styles.heightFour}`}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                      <a href="javascript:void(0);">
                                                        <img
                                                          src={btnAdd2}
                                                          className={
                                                            styles.borderZero
                                                          }
                                                          onClick={(e) =>
                                                            contextType.moveRightHotelSelected(
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <a href="javascript:void(0);">
                                                        <img
                                                          src={btnAddAll2}
                                                          className={
                                                            styles.borderZero
                                                          }
                                                          onClick={(e) =>
                                                            contextType.moveAllRightHotelSelected(
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.heightThirty
                                                      }
                                                    />
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <a href="javascript:void(0);">
                                                        <img
                                                          src={btnRemove2}
                                                          className={
                                                            styles.borderZero
                                                          }
                                                          onClick={(e) =>
                                                            contextType.moveLeftHotelSelected(
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <a href="javascript:void(0);">
                                                        <img
                                                          src={btnRemoveAll2}
                                                          className={
                                                            styles.borderZero
                                                          }
                                                          onClick={(e) =>
                                                            contextType.moveAllLeftHotelSelected(
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td className={styles.top}>
                                              <select
                                                multiple={true}
                                                size={10}
                                                id={
                                                  contextType.state.filter
                                                    .selectedHotelOption.id
                                                }
                                                className={
                                                  styles.heightAndWidth4
                                                }
                                                onChange={(e) => {
                                                  contextType.setRemoveHotelValue(
                                                    e
                                                  );
                                                }}
                                              >
                                                {contextType.state.Respondent
                                                  .ResponArray.salesHotelSel2 &&
                                                  contextType.state.Respondent.ResponArray.salesHotelSel2.map(
                                                    (result) => (
                                                      <option
                                                        id={result.marshaCode}
                                                        value={
                                                          result.marshaCode
                                                        }
                                                      >
                                                        {result.marshaCode} -{" "}
                                                        {result.hotelName}
                                                      </option>
                                                    )
                                                  )}
                                              </select>
                                            </td>
                                          </tr>
                                        ) : (
                                          ""
                                        )}
                                        {isLimitedSalesUser &&
                                        contextType.state.Respondent.Personal
                                          .mae == "Y" ? (
                                          <>
                                            <tr>
                                              <td
                                                className={styles.heightThree}
                                              ></td>
                                            </tr>
                                            <tr>
                                              <td
                                                className={styles.instructions}
                                              >
                                                {
                                                  Settings.updateContactInfo
                                                    .limitedSalesAcctMAEText
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <table
                                                  className={`${styles.zero_Height} ${styles.field_Name}`}
                                                >
                                                  <tr>
                                                    <td>
                                                      <table
                                                        className={`${styles.zero_Height} ${styles.field_Name}`}
                                                      >
                                                        <tr>
                                                          <td>
                                                            <table
                                                              className={`${styles.pad1_space2_height_cls} ${styles.filterFieldNameCls}`}
                                                            >
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.normalText
                                                                  }
                                                                >
                                                                  <CPagination
                                                                    totalPages={
                                                                      contextType
                                                                        .state
                                                                        .Respondent
                                                                        .Personal
                                                                        .totalHtlPages
                                                                    }
                                                                    context={
                                                                      contextType
                                                                    }
                                                                    handlePaginationAPI={
                                                                      handlePaginationAPILimitedHotelSales
                                                                    }
                                                                  />
                                                                </td>
                                                              </tr>
                                                              <tr id="gridHTR">
                                                                <td>
                                                                  <div
                                                                    id="gridHNode"
                                                                    className={
                                                                      styles.gridHNode
                                                                    }
                                                                  >
                                                                    <div
                                                                      id="gridHHeader"
                                                                      className={
                                                                        styles.gridHHeader
                                                                      }
                                                                    >
                                                                      <table
                                                                        className={`${styles.gridHOne} ${styles.zero_Height}`}
                                                                        id="gridTableHHeader"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <th
                                                                              className={
                                                                                styles.gridCellFirst
                                                                              }
                                                                            ></th>
                                                                            <th
                                                                              className={
                                                                                styles.HeaderCls
                                                                              }
                                                                            >
                                                                              <b>
                                                                                {
                                                                                  Settings
                                                                                    .updateContactInfo
                                                                                    .hotelTitleText
                                                                                }
                                                                                {
                                                                                  contextType
                                                                                    .state
                                                                                    .Respondent
                                                                                    .ResponArray
                                                                                    .linkedHotels
                                                                                    .length
                                                                                }
                                                                                {
                                                                                  Settings
                                                                                    .updateContactInfo
                                                                                    .endingBracs
                                                                                }
                                                                              </b>
                                                                            </th>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </div>
                                                                    <div
                                                                      className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                                    >
                                                                      {(contextType
                                                                        .state
                                                                        .Respondent
                                                                        .ResponArray
                                                                        .linkedHotels &&
                                                                        contextType
                                                                          .state
                                                                          .Respondent
                                                                          .ResponArray
                                                                          .linkedHotels
                                                                          .length) <=
                                                                      0 ? (
                                                                        <div
                                                                          className={
                                                                            styles.gridRow
                                                                          }
                                                                        >
                                                                          <table
                                                                            className={
                                                                              styles.gridRowTable
                                                                            }
                                                                            id="gridTableView"
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  className={
                                                                                    styles.middle
                                                                                  }
                                                                                >
                                                                                  {
                                                                                    Settings
                                                                                      .updateContactInfo
                                                                                      .noDataFound
                                                                                  }
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </div>
                                                                      ) : (
                                                                        <div>
                                                                          {contextType.state.Respondent.ResponArray.linkedHotels.map(
                                                                            (
                                                                              data
                                                                            ) => {
                                                                              return (
                                                                                <CheckboxListView
                                                                                  data={
                                                                                    data
                                                                                  }
                                                                                  handleChange={
                                                                                    contextType.handleChangeInput
                                                                                  }
                                                                                  type="selectHotel"
                                                                                />
                                                                              );
                                                                            }
                                                                          )}
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.width_10
                                                            }
                                                          ></td>
                                                          <td>
                                                            <table
                                                              className={`${styles.pad1_space2_height_cls} ${styles.filterFieldNameCls}`}
                                                            >
                                                              <tr>
                                                                <td
                                                                  className={
                                                                    styles.normalText
                                                                  }
                                                                >
                                                                  <CPagination
                                                                    totalPages={
                                                                      contextType
                                                                        .state
                                                                        .Respondent
                                                                        .Personal
                                                                        .totalAcctPages
                                                                    }
                                                                    context={
                                                                      contextType
                                                                    }
                                                                    handlePaginationAPI={
                                                                      handlePaginationAPILimitedAcctSales
                                                                    }
                                                                  />
                                                                </td>
                                                              </tr>
                                                              <tr id="gridATR">
                                                                <td>
                                                                  <div
                                                                    id="gridANode"
                                                                    className={
                                                                      styles.gridHNode
                                                                    }
                                                                  >
                                                                    <div
                                                                      id="gridAHeader"
                                                                      className={
                                                                        styles.gridHHeader
                                                                      }
                                                                    >
                                                                      <table
                                                                        className={`${styles.gridHOne} ${styles.zero_Height}`}
                                                                        id="gridTableAHeader"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <th
                                                                              className={
                                                                                styles.gridCellFirst
                                                                              }
                                                                            ></th>
                                                                            <th
                                                                              className={
                                                                                styles.HeaderCls
                                                                              }
                                                                            >
                                                                              <b>
                                                                                {
                                                                                  Settings
                                                                                    .updateContactInfo
                                                                                    .accountTitleText
                                                                                }
                                                                                {
                                                                                  contextType
                                                                                    .state
                                                                                    .Respondent
                                                                                    .ResponArray
                                                                                    .linkedAccounts
                                                                                    .length
                                                                                }
                                                                                {
                                                                                  Settings
                                                                                    .updateContactInfo
                                                                                    .endingBracs
                                                                                }
                                                                              </b>
                                                                            </th>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </div>
                                                                    <div
                                                                      className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                                                    >
                                                                      {(contextType
                                                                        .state
                                                                        .Respondent
                                                                        .ResponArray
                                                                        .linkedAccounts &&
                                                                        contextType
                                                                          .state
                                                                          .Respondent
                                                                          .ResponArray
                                                                          .linkedAccounts
                                                                          .length) <=
                                                                      0 ? (
                                                                        <div
                                                                          className={
                                                                            styles.gridRow
                                                                          }
                                                                        >
                                                                          <table
                                                                            className={
                                                                              styles.gridRowTable
                                                                            }
                                                                            id="gridTableView"
                                                                          >
                                                                            <tbody>
                                                                              <tr>
                                                                                <td
                                                                                  className={
                                                                                    styles.middle
                                                                                  }
                                                                                >
                                                                                  {
                                                                                    Settings
                                                                                      .updateContactInfo
                                                                                      .noDataFound
                                                                                  }
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </div>
                                                                      ) : (
                                                                        <div>
                                                                          {contextType.state.Respondent.ResponArray.linkedAccounts.map(
                                                                            (
                                                                              data
                                                                            ) => {
                                                                              return (
                                                                                <CheckboxListView
                                                                                  data={
                                                                                    data
                                                                                  }
                                                                                  handleChange={
                                                                                    contextType.handleChangeInput
                                                                                  }
                                                                                  type="selectAccount"
                                                                                />
                                                                              );
                                                                            }
                                                                          )}
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        className={`${styles.zero_Height} ${styles.field_Name}`}
                                                      >
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            className={
                                                              styles.width_75
                                                            }
                                                          >
                                                            <a href="javascript:void(0);">
                                                              <img
                                                                src={btnAdd}
                                                                className={
                                                                  styles.borderZero
                                                                }
                                                                onClick={(e) =>
                                                                  contextType.btnAddHotelAccount_onclick(
                                                                    e
                                                                  )
                                                                }
                                                              />
                                                            </a>
                                                          </td>
                                                          <td
                                                            align="center"
                                                            className={
                                                              styles.width_75
                                                            }
                                                          >
                                                            <a href="javascript:void(0);">
                                                              <img
                                                                src={btnRemove}
                                                                className={
                                                                  styles.borderZero
                                                                }
                                                                onClick={(e) =>
                                                                  contextType.btnRemoveHotelAccount_onclick(
                                                                    e
                                                                  )
                                                                }
                                                              />
                                                            </a>
                                                          </td>
                                                          <td>
                                                            <a
                                                              href="javascript:void(0);"
                                                              className={
                                                                styles.paddingLeft_navigation
                                                              }
                                                            >
                                                              <img
                                                                src={btnViewPC}
                                                                className={
                                                                  styles.borderZero
                                                                }
                                                                onClick={(e) =>
                                                                  contextType.seePrimaryContacts(
                                                                    e
                                                                  )
                                                                }
                                                              />
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <table
                                                    className={`${styles.zero_Height} ${styles.field_Name} ${styles.normalText}`}
                                                  >
                                                    <tr>
                                                      <td>
                                                        {
                                                          Settings
                                                            .updateContactInfo
                                                            .primaryAccountHotelTitle
                                                        }
                                                        {contextType.primaryGridLoader
                                                          ? 0
                                                          : contextType.state
                                                              .Respondent
                                                              .ResponArray
                                                              .primaryContact
                                                              .length}
                                                        {
                                                          Settings
                                                            .updateContactInfo
                                                            .endingBracs
                                                        }
                                                      </td>
                                                    </tr>
                                                    <tr
                                                      id="gridPCTR"
                                                      className={
                                                        styles.height_width_100
                                                      }
                                                    >
                                                      <td
                                                        valign="top"
                                                        className={
                                                          styles.height_100_perc
                                                        }
                                                      >
                                                        <div
                                                          id="gridPCNode"
                                                          className={
                                                            styles.gridPCNode
                                                          }
                                                        >
                                                          <div
                                                            id="gridPCHeader"
                                                            className={
                                                              styles.gridPCHeader
                                                            }
                                                          >
                                                            <table
                                                              id="gridTablePCHeader"
                                                              className={`${styles.zero_Height} ${styles.gridHOne}`}
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <th
                                                                    className={
                                                                      styles.width_20
                                                                    }
                                                                  ></th>
                                                                  <th
                                                                    className={` ${styles.gridCellFirst} ${styles.width_400} `}
                                                                  >
                                                                    <a
                                                                      href="javascript:void(0);"
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        contextType.changeOrderBy(
                                                                          0
                                                                        )
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .updateContactInfo
                                                                          .hotelText
                                                                      }
                                                                    </a>
                                                                  </th>
                                                                  <th
                                                                    className={` ${styles.gridCellFirst} ${styles.width_400} `}
                                                                  >
                                                                    <a
                                                                      href="javascript:void(0);"
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        contextType.changeOrderBy(
                                                                          1
                                                                        )
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .updateContactInfo
                                                                          .acctText
                                                                      }
                                                                    </a>
                                                                  </th>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>

                                                          {contextType.primaryGridLoader ? (
                                                            <center>
                                                              <img
                                                                src={
                                                                  screenLoader
                                                                }
                                                              />
                                                            </center>
                                                          ) : (
                                                            <div
                                                              id="primaryContactContainer"
                                                              className={`${
                                                                styles.gridViewHS
                                                              } ${
                                                                styles.scrollDiv
                                                              } 
                                                            ${
                                                              contextType.state
                                                                .Respondent
                                                                .ResponArray
                                                                .primaryContact &&
                                                              contextType.state
                                                                .Respondent
                                                                .ResponArray
                                                                .primaryContact
                                                                .length > 0
                                                                ? styles.width_100_per
                                                                : ""
                                                            }`}
                                                            >
                                                              {(contextType
                                                                .state
                                                                .Respondent
                                                                .ResponArray
                                                                .primaryContact &&
                                                                contextType
                                                                  .state
                                                                  .Respondent
                                                                  .ResponArray
                                                                  .primaryContact
                                                                  .length) <=
                                                              0 ? (
                                                                <div
                                                                  className={
                                                                    styles.gridRow
                                                                  }
                                                                >
                                                                  <table
                                                                    className={
                                                                      styles.gridRowTable
                                                                    }
                                                                    id="gridTableView"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          className={` ${styles.middle} ${styles.backgroundGrey}`}
                                                                        >
                                                                          {
                                                                            Settings
                                                                              .updateContactInfo
                                                                              .noDataFound
                                                                          }
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  {contextType.state.Respondent.ResponArray.primaryContact.map(
                                                                    (data) => {
                                                                      return (
                                                                        <CheckboxListView
                                                                          data={
                                                                            data
                                                                          }
                                                                          handleChange={
                                                                            contextType.handleChangeInput
                                                                          }
                                                                          type="selectPrimaryAcct"
                                                                        />
                                                                      );
                                                                    }
                                                                  )}
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                              <td>&nbsp;</td>
                                            </tr>
                                          </>
                                        ) : (
                                          <td></td>
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              id={
                                contextType.state.Respondent.Personal.acctpage
                                  .page
                              }
                              name={
                                contextType.state.Respondent.Personal.acctpage
                                  .page
                              }
                              type={Settings.updateContactInfo.hidden}
                              className={styles.heightAndWidth}
                              value={
                                contextType.state.Respondent.Personal.acctpage
                                  .page
                              }
                              maxLength={40}
                            />
                            <input
                              id={
                                contextType.state.Respondent.Personal.htlpage
                                  .page
                              }
                              name={
                                contextType.state.Respondent.Personal.htlpage
                                  .page
                              }
                              type={Settings.updateContactInfo.hidden}
                              className={styles.heightAndWidth}
                              value={
                                contextType.state.Respondent.Personal.htlpage
                                  .page
                              }
                              maxLength={40}
                            />
                            <input
                              id={
                                contextType.state.Respondent.Personal
                                  .totalAcctPages
                              }
                              name={
                                contextType.state.Respondent.Personal
                                  .totalAcctPages
                              }
                              type={Settings.updateContactInfo.hidden}
                              className={styles.heightAndWidth}
                              value={
                                contextType.state.Respondent.Personal
                                  .totalAcctPages
                              }
                              maxLength={40}
                            />
                            <input
                              id={
                                contextType.state.Respondent.Personal
                                  .totalHtlPages
                              }
                              name={
                                contextType.state.Respondent.Personal
                                  .totalHtlPages
                              }
                              type={Settings.updateContactInfo.hidden}
                              className={styles.heightAndWidth}
                              value={
                                contextType.state.Respondent.Personal
                                  .totalHtlPages
                              }
                              maxLength={40}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </form>
              )}
            </React.Fragment>
          );
        }}
      </SalesUpdateContactInfoContext.Consumer>
    </SalesUpdateContactInfoContextProvider>
  );
};

export default SalesUpdateContactInfo;
