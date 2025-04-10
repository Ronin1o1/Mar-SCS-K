/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UpdateContactInfoContext, {
  UpdateContactInfoContextProvider,
} from "../context/UpdateContactInfoContext";
import styles from "../content/UpdateContactInfo.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnAdd2 from "../../../../common/assets/img/button/btnAdd2.gif";
import btnRemove2 from "../../../../common/assets/img/button/btnRemove2.gif";
import btnRemoveAll2 from "../../../../common/assets/img/button/btnRemoveAll2.gif";
import btnAddAll2 from "../../../../common/assets/img/button/btnAddAll2.gif";
import Settings from "../../static/Settings";
import API from "../service/API";
import Utils from "../../shared/Utils";
import CSelect from "../../../../common/components/CSelect";
import CModal from "../../../../common/components/CModal";
import { createPortal } from "react-dom";

let contextType = null;

const MultipleCModel = ({ index, showModal, alertModalMsg }) => {
  const [show, setShow] = useState(showModal);
  return createPortal(
    <CModal
      title={"Alert Message"}
      onClose={() => {
        setShow(false);
        if (index == 0) {
          contextType.setMultipleAlertMessages(null);
        }
      }}
      show={show}
      closeImgTitle={"Close"}
      overlayHeight="calc(100vh + 85px)"
      overlayTopPosition="-85px"
      overlayWidth="100% !important"
      opacity={index}
      class={styles.transformToCenture}
    >
      <div style={{ margin: "10px" }}>{alertModalMsg}</div>
    </CModal>,
    document.body
  );
};

const UpdateContactInfo = (): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    contextType.setLoader(true);
    setTimeout(() => {
      API.getAdminUpdateInfo("").then((data) => {
        contextType.setUpdateInfoData(data);
        contextType.setLoader(false);
      });
    }, 500);
  }, []);

  //block redirect if validation doesn't pass
  useEffect(() => {
    const unblock = history.block(() => {
      const validationMessage = contextType.checkValidation();
      if (validationMessage === "DuplicateAccounts") {
        return false;
      } else if (validationMessage) {
        contextType.setAlertModalMsg(validationMessage);
        contextType.setShowModalAlert(true);
        return false;
      }
      saveBeforeUnmount();
      return true;
    });

    return () => {
      unblock();
    };
  }, []);

  useEffect(() => {
    return () => {
      saveBeforeUnmount();
    };
  }, []);

  const saveBeforeUnmount = async () => {
    if (!contextType.fromUpdateButtonClick) {
      await contextType.saveUpdateInfo("save", "", "");
    }
  };

  const onValidation = (e, field) => {
    let updatedList = contextType.state.adminRespondent.adminRespondentPersonal;
    updatedList = Utils.checkValidation(e, field, updatedList);
    contextType.setValidationData(updatedList, field);
    contextType.validateAdminFields();
  };

  const Popup = ({ onClose = null, show = false, alertModalMsg = "" }) => {
    return createPortal(
      <CModal
        key={alertModalMsg}
        title={"Alert Message"}
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
    <UpdateContactInfoContextProvider>
      <UpdateContactInfoContext.Consumer>
        {(UpdateContactInfoListContext) => {
          contextType = UpdateContactInfoListContext;

          return (
            <React.Fragment>
              {contextType?.multipleAlertMessages?.map((message, index) => (
                <MultipleCModel
                  key={index + message}
                  showModal={true}
                  alertModalMsg={message}
                  index={index}
                />
              ))}
              <Popup
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
                                  {contextType.state.isUpdate
                                    ? Settings.updateContactInfo.pageTitleUpdate
                                    : Settings.updateContactInfo.pageTitle}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.center}>
                                  <a href="javascript:void(0);">
                                    <img
                                      src={btnUpdate}
                                      className={`${styles.BtnSave} ${styles.btnUpdatestyle}`}
                                      alt={Settings.updateContactInfo.btnUpdate}
                                      onClick={() =>
                                        contextType.saveUpdateInfo(
                                          "save",
                                          "",
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
                            className={`${styles.zero_Height} ${styles.zero_HeightTable}  ${styles.updateContactMarginLeft}`}
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
                              <tr className={styles.top}>
                                <td className={styles.top}>
                                  <table
                                    className={`${styles.zero_Height} ${styles.top}`}
                                  >
                                    <tbody>
                                      <tr className={styles.top}>
                                        <td className={styles.top}>
                                          <table className={styles.zero_Height}>
                                            <tbody>
                                              <tr className={styles.top}>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .name
                                                  }
                                                </td>
                                                <td>
                                                  {
                                                    contextType.state
                                                      .adminRespondent
                                                      .adminRespondentPersonal
                                                      .personName
                                                  }
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personName
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personName
                                                    }
                                                    type={
                                                      Settings.updateContactInfo
                                                        .hidden
                                                    }
                                                    className={
                                                      styles.heightAndWidth
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personName
                                                    }
                                                    maxLength={40}
                                                  />
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .adminRespondentid
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .adminRespondentid
                                                    }
                                                    type={
                                                      Settings.updateContactInfo
                                                        .hidden
                                                    }
                                                    className={
                                                      styles.heightAndWidth
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .adminRespondentid
                                                    }
                                                    maxLength={40}
                                                  />
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .eid
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .eid
                                                    }
                                                    type={
                                                      Settings.updateContactInfo
                                                        .hidden
                                                    }
                                                    className={
                                                      styles.heightAndWidth
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .eid
                                                    }
                                                    maxLength={40}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .title
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personTitle
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personTitle
                                                    }
                                                    className={
                                                      styles.heightAndWidth
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .personTitle
                                                    }
                                                    maxLength={40}
                                                    size={100}
                                                    onChange={(e) => {
                                                      onValidation(e, "title");
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr
                                                className={styles.heightThree}
                                              >
                                                <td className={styles.colGap} />
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .email
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .email
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .email
                                                    }
                                                    className={
                                                      styles.heightAndWidth
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .email
                                                    }
                                                    maxLength={255}
                                                    size={100}
                                                    onChange={(e) => {
                                                      onValidation(e, "email");
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .countryCode
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .countrycode
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .countrycode
                                                    }
                                                    className={
                                                      styles.heightAndWidth1
                                                    }
                                                    maxLength={3}
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .countrycode
                                                    }
                                                    size={50}
                                                    onChange={(e) => {
                                                      onValidation(
                                                        e,
                                                        "countryCode"
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
                                                      Settings.updateContactInfo
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
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .areacitycode
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .areacitycode
                                                    }
                                                    className={
                                                      styles.heightAndWidth1
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .areacitycode
                                                    }
                                                    maxLength={4}
                                                    size={50}
                                                    onChange={(e) => {
                                                      onValidation(
                                                        e,
                                                        "areaCode"
                                                      );
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .phone
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .phonenumber
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .phonenumber
                                                    }
                                                    className={
                                                      styles.heightAndWidth2
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .phonenumber
                                                    }
                                                    maxLength={10}
                                                    size={80}
                                                    onChange={(e) => {
                                                      onValidation(e, "phone");
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={styles.field_Name}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .fax
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <input
                                                    id={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .faxnumber
                                                    }
                                                    name={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .faxnumber
                                                    }
                                                    className={
                                                      styles.heightAndWidth2
                                                    }
                                                    value={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .faxnumber
                                                    }
                                                    maxLength={10}
                                                    size={80}
                                                    onChange={(e) => {
                                                      onValidation(e, "fax");
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  className={`${styles.field_Name} ${styles.nowrapStyle}`}
                                                >
                                                  {
                                                    Settings.updateContactInfo
                                                      .salesLocation
                                                  }
                                                </td>
                                                <td
                                                  className={styles.field_Value}
                                                >
                                                  <CSelect
                                                    id={
                                                      contextType.state.filter
                                                        .updateInfoLocationOption
                                                        .id
                                                    }
                                                    selectedValue={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentPersonal
                                                        .locationid
                                                    }
                                                    ddnOptions={
                                                      contextType.state
                                                        .adminRespondent
                                                        .adminRespondentArray
                                                        .locationList
                                                    }
                                                    onChange={(e) => {
                                                      contextType.handleDropdownChange(
                                                        e,
                                                        "salesLocation"
                                                      );
                                                    }}
                                                    keyField={
                                                      contextType.state.filter
                                                        .updateInfoLocationOption
                                                        .keyField
                                                    }
                                                    valField={
                                                      contextType.state.filter
                                                        .updateInfoLocationOption
                                                        .valField
                                                    }
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <>
                                                    <>&nbsp;</>
                                                  </>
                                                </td>
                                                <td />
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td>
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
                                        <td className={styles.top}>
                                          <table className={styles.zero_Height}>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  {
                                                    Settings.updateContactInfo
                                                      .salesTypeSelection
                                                  }
                                                </td>
                                              </tr>
                                              <tr className={styles.heightOne}>
                                                <td
                                                  className={styles.colGapTwo}
                                                >
                                                  <table
                                                    className={styles.zeroLeft}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.field_Name
                                                          }
                                                        >
                                                          {
                                                            Settings
                                                              .updateContactInfo
                                                              .availableSalesType
                                                          }
                                                        </td>
                                                        <td />
                                                        <td
                                                          className={
                                                            styles.field_Name
                                                          }
                                                        >
                                                          {
                                                            Settings
                                                              .updateContactInfo
                                                              .selectedSalesType
                                                          }
                                                        </td>
                                                        <td />
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.rowValign
                                                          }
                                                        >
                                                          <select
                                                            multiple={true}
                                                            size={10}
                                                            id={
                                                              contextType.state
                                                                .filter
                                                                .availableSalesOption
                                                                .id
                                                            }
                                                            className={
                                                              styles.heightAndWidth3
                                                            }
                                                            onChange={(e) => {
                                                              contextType.setSaleValue(
                                                                e
                                                              );
                                                            }}
                                                          >
                                                            {contextType.state
                                                              .adminRespondent
                                                              .adminRespondentArray
                                                              .salesTypesNotSel &&
                                                              contextType.state.adminRespondent.adminRespondentArray.salesTypesNotSel.map(
                                                                (result) => (
                                                                  <option
                                                                    id={
                                                                      result.accounttype
                                                                    }
                                                                    value={
                                                                      result.accounttype
                                                                    }
                                                                  >
                                                                    {
                                                                      result.accounttypedescription
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                          </select>
                                                        </td>
                                                        <td
                                                          width={75}
                                                          rowSpan={2}
                                                          className={
                                                            styles.widthCenterAndRow
                                                          }
                                                        >
                                                          <table
                                                            className={`${styles.zero_Height} ${styles.height100} ${styles.width100}`}
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td align="center">
                                                                  <a href="javascript:void(0);">
                                                                    <img
                                                                      src={
                                                                        btnAdd2
                                                                      }
                                                                      className={
                                                                        styles.borderZero
                                                                      }
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        contextType.moveRightSelected(
                                                                          e
                                                                        )
                                                                      }
                                                                    />
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  className={`
                                                                  ${styles.heightTen}, ${styles.height3en}
                                                                  `}
                                                                />
                                                              </tr>
                                                              <tr>
                                                                <td align="center">
                                                                  <a href="javascript:void(0);">
                                                                    <img
                                                                      src={
                                                                        btnRemove2
                                                                      }
                                                                      className={
                                                                        styles.borderZero
                                                                      }
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        contextType.moveLeftSelected(
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
                                                        <td
                                                          className={styles.top}
                                                        >
                                                          <select
                                                            multiple={true}
                                                            size={10}
                                                            id={
                                                              contextType.state
                                                                .filter
                                                                .selectedSalesOption
                                                                .id
                                                            }
                                                            className={
                                                              styles.heightAndWidth3
                                                            }
                                                            onChange={(e) => {
                                                              contextType.setRemoveSaleValue(
                                                                e
                                                              );
                                                            }}
                                                          >
                                                            {contextType.state
                                                              .adminRespondent
                                                              .adminRespondentArray
                                                              .salesTypesSel2 &&
                                                              contextType.state.adminRespondent.adminRespondentArray.salesTypesSel2.map(
                                                                (result) => (
                                                                  <option
                                                                    id={
                                                                      result.accounttype
                                                                    }
                                                                    value={
                                                                      result.accounttype
                                                                    }
                                                                  >
                                                                    {
                                                                      result.accounttypedescription
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                          </select>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <>
                                                    <>&nbsp;</>
                                                  </>
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
                              <tr>
                                <td>{Settings.updateContactInfo.yearName}</td>
                              </tr>
                              <tr>
                                <td>
                                  <table className={styles.borderZero}>
                                    <tbody>
                                      <tr>
                                        <td className={styles.field_Name}>
                                          {Settings.updateContactInfo.year}
                                        </td>
                                        <td className={styles.field_Value}>
                                          <CSelect
                                            id={Settings.filter.periodOption.id}
                                            selectedValue={
                                              contextType.state.adminRespondent
                                                .adminRespondentPersonal.period
                                            }
                                            ddnOptions={
                                              contextType.state.adminRespondent
                                                .adminRespondentPersonal
                                                .periodList
                                            }
                                            onChange={(e) => {
                                              contextType.handleDropdownChange(
                                                e,
                                                "periodList"
                                              );
                                            }}
                                            keyField={
                                              Settings.filter.periodOption
                                                .keyField
                                            }
                                            valField={
                                              Settings.filter.periodOption
                                                .valField
                                            }
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className={styles.primaryDiv}>
                                    <table className={styles.primaryDivTable}>
                                      <tbody>
                                        <tr
                                          style={{
                                            height: "12px",
                                            display: "block",
                                          }}
                                        >
                                          <td>
                                            <>
                                              <>&nbsp;</>
                                            </>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
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
                                                    <span
                                                      style={{
                                                        display: "inline-block",
                                                      }}
                                                    >
                                                      {" "}
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .primarySalesTypeSelection
                                                      }
                                                    </span>
                                                    <>&nbsp;</>

                                                    <span>
                                                      {
                                                        contextType.state
                                                          .adminRespondent
                                                          .numOfPrimaryAvail
                                                      }
                                                    </span>
                                                  </td>
                                                  <td />
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    <span
                                                      style={{
                                                        display: "inline-block",
                                                      }}
                                                    >
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .primarySelectedTypeSelection
                                                      }
                                                    </span>
                                                    <>&nbsp;</>

                                                    <span>
                                                      {
                                                        contextType.state
                                                          .adminRespondent
                                                          .numOfPrimarySelect
                                                      }
                                                    </span>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className={styles.top}>
                                                    <select
                                                      multiple={true}
                                                      size={10}
                                                      id={
                                                        contextType.state.filter
                                                          .primaryAccountOption
                                                          .id
                                                      }
                                                      className={
                                                        styles.heightAndWidth4
                                                      }
                                                      onChange={(e) => {
                                                        contextType.setPrimaryAccountValue(
                                                          e
                                                        );
                                                      }}
                                                    >
                                                      {contextType.state
                                                        .adminRespondent
                                                        .adminRespondentArray
                                                        .primeAccountNotSel &&
                                                        contextType.state.adminRespondent.adminRespondentArray.primeAccountNotSel.map(
                                                          (result) => (
                                                            <option
                                                              id={
                                                                result.accountrecid
                                                              }
                                                              value={
                                                                result.accountrecid
                                                              }
                                                            >
                                                              {
                                                                result.accountname
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </td>
                                                  <td width={75}>
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
                                                                  contextType.moveRightPrimarySelected(
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
                                                                  contextType.moveAllRightPrimarySelected(
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
                                                                  contextType.moveLeftPrimarySelected(
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
                                                                src={
                                                                  btnRemoveAll2
                                                                }
                                                                className={
                                                                  styles.borderZero
                                                                }
                                                                onClick={(e) =>
                                                                  contextType.moveAllLeftPrimarySelected(
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
                                                          .selectedPrimaryAccountOption
                                                          .id
                                                      }
                                                      className={
                                                        styles.heightAndWidth4
                                                      }
                                                      onChange={(e) => {
                                                        contextType.setRemovePrimaryValue(
                                                          e
                                                        );
                                                      }}
                                                    >
                                                      {contextType.state
                                                        .adminRespondent
                                                        .adminRespondentArray
                                                        .primeAccountSel2 &&
                                                        contextType.state.adminRespondent.adminRespondentArray.primeAccountSel2.map(
                                                          (result) => (
                                                            <option
                                                              id={
                                                                result.accountrecid
                                                              }
                                                              value={
                                                                result.accountrecid
                                                              }
                                                            >
                                                              {
                                                                result.accountname
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <>
                                              <>&nbsp;</>
                                            </>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
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
                                                    <span>
                                                      {" "}
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .secSalesTypeSection
                                                      }
                                                    </span>
                                                    <>&nbsp;</>

                                                    <span>
                                                      {
                                                        contextType.state
                                                          .adminRespondent
                                                          .numOfSecAvail
                                                      }
                                                    </span>
                                                  </td>
                                                  <td />
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                  >
                                                    <span>
                                                      {
                                                        Settings
                                                          .updateContactInfo
                                                          .secSelectedTypeSection
                                                      }
                                                    </span>
                                                    <>&nbsp;</>

                                                    <span>
                                                      {
                                                        contextType.state
                                                          .adminRespondent
                                                          .numOfSecSelect
                                                      }
                                                    </span>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className={styles.top}>
                                                    <select
                                                      multiple={true}
                                                      size={10}
                                                      id={
                                                        contextType.state.filter
                                                          .secondaryAccountOption
                                                          .id
                                                      }
                                                      className={
                                                        styles.heightAndWidth4
                                                      }
                                                      onChange={(e) => {
                                                        contextType.setSecondaryValue(
                                                          e
                                                        );
                                                      }}
                                                    >
                                                      {contextType.state
                                                        .adminRespondent
                                                        .adminRespondentArray
                                                        .secAccountNotSel &&
                                                        contextType.state.adminRespondent.adminRespondentArray.secAccountNotSel.map(
                                                          (result) => (
                                                            <option
                                                              id={
                                                                result.accountrecid
                                                              }
                                                              value={
                                                                result.accountrecid
                                                              }
                                                            >
                                                              {
                                                                result.accountname
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.widthThreeFourth
                                                    }
                                                  >
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
                                                                  contextType.moveRightSecondarySelected(
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
                                                                  contextType.moveAllRightSecondarySelected(
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
                                                                  contextType.moveLeftSecondarySelected(
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
                                                                src={
                                                                  btnRemoveAll2
                                                                }
                                                                className={
                                                                  styles.borderZero
                                                                }
                                                                onClick={(e) =>
                                                                  contextType.moveAllLeftSecondarySelected(
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
                                                          .selectedSecondaryAccountOption
                                                          .id
                                                      }
                                                      className={
                                                        styles.heightAndWidth4
                                                      }
                                                      onChange={(e) => {
                                                        contextType.setRemoveSecondaryValue(
                                                          e
                                                        );
                                                      }}
                                                    >
                                                      {contextType.state
                                                        .adminRespondent
                                                        .adminRespondentArray
                                                        .secAccountSel2 &&
                                                        contextType.state.adminRespondent.adminRespondentArray.secAccountSel2.map(
                                                          (result) => (
                                                            <option
                                                              id={
                                                                result.accountrecid
                                                              }
                                                              value={
                                                                result.accountrecid
                                                              }
                                                            >
                                                              {
                                                                result.accountname
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <>
                                    <>&nbsp;</>
                                  </>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <input
                            id={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.marketSelected
                            }
                            name={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.marketSelected
                            }
                            type={Settings.updateContactInfo.hidden}
                            className={styles.heightAndWidth}
                            value={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.marketSelected
                            }
                            maxLength={40}
                          />
                          <input
                            id={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.changingPeriod
                            }
                            name={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.changingPeriod
                            }
                            type={Settings.updateContactInfo.hidden}
                            className={styles.heightAndWidth}
                            value={
                              contextType.state.adminRespondent
                                .adminRespondentPersonal.changingPeriod
                            }
                            maxLength={40}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              )}
            </React.Fragment>
          );
        }}
      </UpdateContactInfoContext.Consumer>
    </UpdateContactInfoContextProvider>
  );
};

export default UpdateContactInfo;
