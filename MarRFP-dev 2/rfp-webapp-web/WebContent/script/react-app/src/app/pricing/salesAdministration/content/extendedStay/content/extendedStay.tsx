import React, { useContext, useEffect, useState } from "react";
import styles from "./extendedStay.css";
import CModal from "../../../../../common/components/CModal";
import ExtendedStayAPI from "../service/extendedStayAPI";
import Settings from "../static/Settings";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import { Layout } from "../../../routing/Layout";
import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../../../context/salesAdministartionContextProvider";
import Utils from "../../../../../common/utils/Utils";
import { useLocation } from "react-router-dom";
import ExtendedStayContext, {
  ExtendedStayContextProvider,
} from "../context/extendedStayContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
let contextType = null;
let parentContextType = null;

const extendedStay = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const RecID = new URLSearchParams(urlParms).get("accountrecid");
  const yearSel = new URLSearchParams(urlParms).get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");
  useEffect(() => {
    contextType.state.showScreenLoader = true;
    ExtendedStayAPI.getData(RecID, yearSel, accname).then((data) => {
      contextType.state.showScreenLoader = false;
      contextType.setLoadingData(data);
      setlastUpdateDateValue(data.lastUpdate);
    });

    contextType.setInitialUserData();

    return () => {
      onUpdate();
    };
  }, []);

  useEffect(() => {
    if (appContext.navbarClicked) {
      contextType.setState({
        ...contextType.state,
        validateModal: false,
      });
    }
  }, [appContext.navbarClicked]);

  const onUpdate = () => {
    const checkUsermandatoryValidation =
      contextType.checkUsermandatoryValidation();
    if (checkUsermandatoryValidation) {
      contextType.updateValue(RecID, yearSel, accname);
      if (contextType?.state?.lastUpdateDate) {
        setlastUpdateDateValueonUpdate(contextType?.state?.lastUpdateDate);
      }
    }
  };
  const handleInputValidation = (event, fieldName) => {
    const fieldValue = contextType.state.extendedstay;
    fieldValue[fieldName] = event.target.value;
    contextType.setData(fieldValue);
  };
  const onPercentChange = (event, fieldName) => {
    const fieldValue = contextType.state.extendedstay;
    fieldValue[fieldName] = event.target.value;
    const validateData = contextType.rangeValidation();
    if (validateData) {
      contextType.setData(fieldValue);
    }
  };
  const handleInputChange = (event, fieldName) => {
    const fieldValue = contextType.state.revStreamDescription;
    fieldValue[fieldName] = event.target.value;
    if (fieldName === `${Settings.field.adopt_rate_bkg_tool}`) {
      const validateData = contextType.adoptratebkgtoolValidation();
      if (validateData) {
        contextType.setData(fieldValue);
      }
    } else {
      contextType.setData(fieldValue);
    }
  };
  const handleTextInputValidation = (e, field) => {
    if (
      field === `${Settings.field.ext_requirements}` ||
      field === `${Settings.field.ext_desc_relocprovider}`
    ) {
      const updatePrimaryList = contextType.state.extendedstay;
      updatePrimaryList[field] = e.target.value;
      const validateData = contextType.checkValidationOnNavigation();
      if (validateData) {
        contextType.setData(updatePrimaryList);
      }
    } else {
      const updatePrimaryList = contextType.state.revStreamDescription;
      updatePrimaryList[field] = e.target.value;
      const validateData = contextType.checkValidationOnNavigation();
      if (validateData) {
        contextType.setData(updatePrimaryList);
      }
    }
  };

  const handlePerInputValidation = (e, fieldName) => {
    if (e.target.value !== "") {
      if (e.target.value > 100 || e.target.value < 0) {
        contextType.setValidationFunc(
          Settings.extendedStayDetails.AlertRangeMessage
        );
      } else {
        if (fieldName === `${Settings.field.adopt_rate_bkg_tool}`) {
          const updatePrimaryList = contextType.state.revStreamDescription;
          updatePrimaryList[fieldName] = e.target.value;
          contextType.setData(updatePrimaryList);
        } else {
          const updatePrimaryList = contextType.state.extendedstay;
          updatePrimaryList[fieldName] = e.target.value;
          contextType.setData(updatePrimaryList);
        }
      }
    }
  };
  const handleDropdownSelection = (e, fieldName) => {
    const UpdatedField = contextType.state.extendedstay;
    if (e.target.value != "") {
      UpdatedField[fieldName] = e.target.value;
    } else {
      UpdatedField[fieldName] = null;
    }
    contextType.setData(UpdatedField);
  };

  return (
    <SalesAdministartionContext.Consumer>
      {(SalesAdministartionContext) => {
        parentContextType = SalesAdministartionContext;
        return (
          <Layout
            IsExtendedStayDataUpdate={onUpdate}
            getlastUpdateDate={lastUpdateDateValue}
            onUpdateValue={lastUpdateDateValueonUpdate}
          >
            <ExtendedStayContextProvider>
              <ExtendedStayContext.Consumer>
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
                        <div className={styles.extendedStayAlert}>
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
                          <table>
                            <tr>
                              <td>
                                <tr>
                                  <td colSpan={2}>&nbsp;</td>
                                </tr>
                                <table className={styles.fullContent}>
                                  <tr>
                                    <td className={styles.leftContainer}>
                                      <p>
                                        <table>
                                          <tr>
                                            <td
                                              colSpan={2}
                                              className={
                                                styles.instructionHeader
                                              }
                                            >
                                              {
                                                Settings.label
                                                  .businessInstruction
                                              }
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className={styles.columnWidth}>
                                              &nbsp;
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan={2}
                                              className={styles.Field_Name}
                                            ></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_Width
                                              }
                                              title={
                                                Settings.label.avgLengthTitle
                                              }
                                            >
                                              {Settings.label.avgLength}
                                            </td>
                                            <td className={styles.Field_Name}>
                                              <input
                                                type="text"
                                                name="extendedstay.ext_avg_len_stay"
                                                id="extendedstay.ext_avg_len_stay"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_avg_len_stay
                                                }
                                                size={20}
                                                maxLength={12}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "ext_avg_len_stay"
                                                  );
                                                }}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_Width
                                              }
                                              title={
                                                Settings.label
                                                  .estimatedStayTitle
                                              }
                                            >
                                              {Settings.label.estimatedStay}
                                            </td>
                                            <td className={styles.Field_Name}>
                                              <input
                                                type="text"
                                                name="extendedstay.est_ttl_spnd"
                                                id="extendedstay.est_ttl_spnd"
                                                value={
                                                  contextType.state.extendedstay
                                                    .est_ttl_spnd
                                                }
                                                size={20}
                                                maxLength={12}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "est_ttl_spnd"
                                                  );
                                                }}
                                              />
                                              {Settings.label.USD}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_Width
                                              }
                                              title={
                                                Settings.label.estExtStayTitle
                                              }
                                            >
                                              {Settings.label.estExtStay}
                                            </td>
                                            <td className={styles.Field_Name}>
                                              <input
                                                type="text"
                                                name="extendedstay.ext_est_ttl_spend_nxtyr"
                                                id="extendedstay.ext_est_ttl_spend_nxtyr"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_est_ttl_spend_nxtyr
                                                }
                                                size={20}
                                                maxLength={12}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "ext_est_ttl_spend_nxtyr"
                                                  );
                                                }}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.spaceColumnWidth
                                              }
                                            >
                                              &nbsp;
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_WidthHeight
                                              }
                                            >
                                              &nbsp;
                                            </td>
                                          </tr>
                                        </table>
                                      </p>
                                    </td>

                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    <td className={styles.headerWidth}>
                                      <p>
                                        <table className="menuWdth100-Height">
                                          <tr>
                                            <td
                                              colSpan={2}
                                              className={
                                                styles.instructionHeader
                                              }
                                            >
                                              {Settings.label.marriottExtHeader}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan={2}
                                              className={styles.Field_Name}
                                              height="18"
                                            >
                                              &nbsp;
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_NameWidthRight
                                              }
                                              align="left"
                                              title={
                                                Settings.label
                                                  .marriottExtStayTitle
                                              }
                                            >
                                              {Settings.label.marriottExtStay}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.rev"
                                                id="extendedstay.rev"
                                                value={
                                                  contextType.state.extendedstay
                                                    .rev
                                                }
                                                maxLength={12}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "rev"
                                                  );
                                                }}
                                              />
                                              {Settings.label.USD}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_NameWidthRight
                                              }
                                              align="left"
                                              title=""
                                            >
                                              {Settings.label.changePrevYear}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.rev_chng_lstyr"
                                                id="extendedstay.rev_chng_lstyr"
                                                value={
                                                  contextType.state.extendedstay
                                                    .rev_chng_lstyr
                                                }
                                                size={5}
                                                maxLength={3}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "rev_chng_lstyr"
                                                  );
                                                }}
                                              />
                                              {Settings.label.percent}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_NameWidthRight
                                              }
                                              align="left"
                                              title={
                                                Settings.label
                                                  .perTotalRevenueTitle
                                              }
                                            >
                                              {Settings.label.perTotalRevenue}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.ext_pct_ttl_rev"
                                                id="extendedstay.ext_pct_ttl_rev"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_pct_ttl_rev
                                                }
                                                size={5}
                                                maxLength={3}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onBlur={(e) => {
                                                  handlePerInputValidation(
                                                    e,
                                                    "ext_pct_ttl_rev"
                                                  );
                                                }}
                                                onChange={(e) => {
                                                  onPercentChange(
                                                    e,
                                                    "ext_pct_ttl_rev"
                                                  );
                                                }}
                                              />
                                              {Settings.label.percent}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_NameWidthRight
                                              }
                                              align="left"
                                              title={
                                                Settings.label
                                                  .totalMarriottExtTitle
                                              }
                                            >
                                              {Settings.label.totalMarriottExt}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.ext_ttl_room_nts"
                                                id="extendedstay.ext_ttl_room_nts"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_ttl_room_nts
                                                }
                                                size={20}
                                                maxLength={12}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onChange={(e) => {
                                                  handleInputValidation(
                                                    e,
                                                    "ext_ttl_room_nts"
                                                  );
                                                }}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_RowWidth
                                              }
                                              title={
                                                Settings.label.marriottMixTitle
                                              }
                                            >
                                              {Settings.label.marriottMix}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.ext_mar_pct_ttl_roomnts"
                                                id="extendedstay.ext_mar_pct_ttl_roomnts"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_mar_pct_ttl_roomnts
                                                }
                                                size={20}
                                                maxLength={3}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onBlur={(e) => {
                                                  handlePerInputValidation(
                                                    e,
                                                    "ext_mar_pct_ttl_roomnts"
                                                  );
                                                }}
                                                onChange={(e) => {
                                                  onPercentChange(
                                                    e,
                                                    "ext_mar_pct_ttl_roomnts"
                                                  );
                                                }}
                                              />
                                              {Settings.label.percent}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className={
                                                styles.Field_Name_RowWidth
                                              }
                                              title={
                                                Settings.label.totalAccountTitle
                                              }
                                            >
                                              {Settings.label.totalAccount}
                                            </td>
                                            <td
                                              className={
                                                styles.Field_NameValueColumn
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="extendedstay.ext_ind_pct_ttl_roomnts"
                                                id="extendedstay.ext_ind_pct_ttl_roomnts"
                                                value={
                                                  contextType.state.extendedstay
                                                    .ext_ind_pct_ttl_roomnts
                                                }
                                                size={20}
                                                maxLength={3}
                                                onKeyPress={
                                                  Utils.NumberOnly_onkeypress
                                                }
                                                className={styles.Field_number}
                                                onBlur={(e) => {
                                                  handlePerInputValidation(
                                                    e,
                                                    "ext_ind_pct_ttl_roomnts"
                                                  );
                                                }}
                                                onChange={(e) => {
                                                  onPercentChange(
                                                    e,
                                                    "ext_ind_pct_ttl_roomnts"
                                                  );
                                                }}
                                              />
                                              {Settings.label.percent}
                                            </td>
                                          </tr>
                                        </table>
                                      </p>
                                    </td>
                                  </tr>
                                </table>

                                <table className={styles.menuWdth100Height}>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={
                                        styles.InstructionHeader_Height
                                      }
                                    >
                                      {Settings.label.businessInfoHeader}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.Field_Name_TextAlign}
                                      title={Settings.label.pricingVehicleTitle}
                                    >
                                      {Settings.label.pricingVehicle}
                                    </td>
                                    <td className={styles.Field_Name}>
                                      <input
                                        type="text"
                                        name="extendedstay.ext_pricingvehicle"
                                        id="extendedstay.ext_pricingvehicle"
                                        value={
                                          contextType.state.extendedstay
                                            .ext_pricingvehicle
                                        }
                                        size={50}
                                        maxLength={100}
                                        onChange={(e) => {
                                          handleInputValidation(
                                            e,
                                            "ext_pricingvehicle"
                                          );
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styles.Field_Name_TextAlign_Width
                                      }
                                    >
                                      {Settings.label.prefHotelProgram}
                                    </td>
                                    <td>
                                      <select
                                        name="extendedstay.ext_preferredrate"
                                        id="extendedstay.ext_preferredrate"
                                        size={1}
                                        value={
                                          contextType.state.extendedstay
                                            .ext_preferredrate
                                        }
                                        onChange={(e) => {
                                          handleDropdownSelection(
                                            e,
                                            "ext_preferredrate"
                                          );
                                        }}
                                      >
                                        <option value=""></option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styles.Field_Name_TextAlignRowWidth
                                      }
                                      title={
                                        Settings.label.onlineBookingToolTitle
                                      }
                                    >
                                      {Settings.label.onlineBookingTool}
                                    </td>
                                    <td className={styles.Field_Name}>
                                      <input
                                        type="text"
                                        name="revStreamDescription.onl_bkg_tool"
                                        id="revStreamDescription.onl_bkg_tool"
                                        value={
                                          contextType.state.revStreamDescription
                                            .onl_bkg_tool
                                        }
                                        size={50}
                                        maxLength={50}
                                        onChange={(e) => {
                                          handleInputChange(e, "onl_bkg_tool");
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styles.Field_Name_TextAlign_Width
                                      }
                                      title={Settings.label.relocationTitle}
                                    >
                                      {Settings.label.relocation}
                                    </td>
                                    <td className={styles.Field_Name}>
                                      <input
                                        type="text"
                                        name="revStreamDescription.relocat_intermediary"
                                        id="revStreamDescription.relocat_intermediary"
                                        value={
                                          contextType.state.revStreamDescription
                                            .relocat_intermediary
                                        }
                                        size={50}
                                        maxLength={50}
                                        onChange={(e) => {
                                          handleInputChange(
                                            e,
                                            "relocat_intermediary"
                                          );
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.Field_Name_TextAlign}
                                      title={Settings.label.adoptionRateTitle}
                                    >
                                      {Settings.label.adoptionRate}
                                    </td>
                                    <td className={styles.Field_Name}>
                                      <input
                                        type="text"
                                        name="revStreamDescription.adopt_rate_bkg_tool"
                                        id="revStreamDescription.adopt_rate_bkg_tool"
                                        value={
                                          contextType.state.revStreamDescription
                                            .adopt_rate_bkg_tool
                                        }
                                        maxLength={3}
                                        size={5}
                                        onKeyPress={Utils.NumberOnly_onkeypress}
                                        className={styles.Field_number}
                                        onBlur={(e) => {
                                          handlePerInputValidation(
                                            e,
                                            "adopt_rate_bkg_tool"
                                          );
                                        }}
                                        onChange={(e) => {
                                          handleInputChange(
                                            e,
                                            "adopt_rate_bkg_tool"
                                          );
                                        }}
                                      />
                                      {Settings.label.percent}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.Field_Name}>
                                      {Settings.label.prefRelocation}{" "}
                                    </td>
                                    <td>
                                      <select
                                        name="extendedstay.ext_prefer_relocprovider"
                                        id="extendedstay.ext_prefer_relocprovider"
                                        size={1}
                                        value={
                                          contextType.state.extendedstay
                                            .ext_prefer_relocprovider
                                        }
                                        onChange={(e) => {
                                          handleDropdownSelection(
                                            e,
                                            "ext_prefer_relocprovider"
                                          );
                                        }}
                                      >
                                        <option value=""></option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styles.Field_Name_TextAlign_Width
                                      }
                                      title={
                                        Settings.label.prefRelocationDescTitle
                                      }
                                    >
                                      {Settings.label.prefRelocationDesc}
                                    </td>
                                    <td className={styles.Field_Name}>
                                      <input
                                        type="text"
                                        name="extendedstay.ext_desc_relocprovider"
                                        id="extendedstay.ext_desc_relocprovider"
                                        value={
                                          contextType.state.extendedstay
                                            .ext_desc_relocprovider
                                        }
                                        size={50}
                                        maxLength={1024}
                                        onChange={(e) => {
                                          handleTextInputValidation(
                                            e,
                                            "ext_desc_relocprovider"
                                          );
                                        }}
                                        onKeyPress={(e) =>
                                          Utils.checklen_onkeypress(e, 1024)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </table>

                                <table className="menuWdth100-Height">
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.Field_Name}
                                      align="left"
                                      title={
                                        Settings.label.relocationStrategyTitle
                                      }
                                    >
                                      {Settings.label.relocationStrategy}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.Field_Name_TextArea}>
                                      <textarea
                                        name="revStreamDescription.inter_strategy"
                                        id="revStreamDescription.inter_strategy"
                                        value={
                                          contextType.state.revStreamDescription
                                            .inter_strategy
                                        }
                                        rows={4}
                                        cols={188}
                                        onKeyPress={(e) =>
                                          Utils.checklen_onkeypress(e, 1024)
                                        }
                                        onChange={(e) => {
                                          handleTextInputValidation(
                                            e,
                                            "inter_strategy"
                                          );
                                        }}
                                      ></textarea>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.Field_Name}
                                      align="left"
                                      title={
                                        Settings.label.extendedStayNeedsTitle
                                      }
                                    >
                                      {Settings.label.extendedStayNeeds}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.Field_Name_TextArea}>
                                      <textarea
                                        name="extendedstay.ext_requirements"
                                        id="extendedstay.ext_requirements"
                                        value={
                                          contextType.state.extendedstay
                                            .ext_requirements
                                        }
                                        rows={4}
                                        cols={188}
                                        onKeyPress={(e) =>
                                          Utils.checklen_onkeypress(e, 1024)
                                        }
                                        onChange={(e) => {
                                          handleTextInputValidation(
                                            e,
                                            "ext_requirements"
                                          );
                                        }}
                                      ></textarea>
                                    </td>
                                  </tr>
                                </table>

                                <table className={styles.menuWdth100Height}>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={styles.Field_Name}
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={styles.instructionHeader}
                                    >
                                      {Settings.label.businessOverviewHeader}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={styles.Field_Name}
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <table className="menuWdth100-Height">
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextAlign
                                            }
                                            title={
                                              Settings.label.orgStructureTitle
                                            }
                                          >
                                            {Settings.label.orgStructure}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextArea
                                            }
                                          >
                                            <textarea
                                              name="revStreamDescription.org_buying_struct"
                                              id="revStreamDescription.org_buying_struct"
                                              value={
                                                contextType.state
                                                  .revStreamDescription
                                                  .org_buying_struct
                                              }
                                              rows={4}
                                              cols={188}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "org_buying_struct"
                                                );
                                              }}
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.Field_Name}>
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <table className="menuWdth100-Height">
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextAlign
                                            }
                                            title={
                                              Settings.label
                                                .extendedStaySolutionTitle
                                            }
                                          >
                                            {
                                              Settings.label
                                                .extendedStaySolution
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextArea
                                            }
                                          >
                                            <textarea
                                              name="revStreamDescription.solutions"
                                              id="revStreamDescription.solutions"
                                              value={
                                                contextType.state
                                                  .revStreamDescription
                                                  .solutions
                                              }
                                              rows={4}
                                              cols={188}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "solutions"
                                                );
                                              }}
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.Field_Name}
                                      width="248"
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <table className="menuWdth100-Height">
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextAlign
                                            }
                                            title={
                                              Settings.label
                                                .acoountPoliciesTitle
                                            }
                                          >
                                            {Settings.label.accountPolicies}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextArea
                                            }
                                          >
                                            <textarea
                                              name="revStreamDescription.policies"
                                              id="revStreamDescription.policies"
                                              value={
                                                contextType.state
                                                  .revStreamDescription.policies
                                              }
                                              rows={4}
                                              cols={188}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "policies"
                                                );
                                              }}
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={styles.Field_Name}
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <table className="menuWdth100-Height">
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextAlign
                                            }
                                            title={
                                              Settings.label
                                                .prefMarriottBrandTitle
                                            }
                                          >
                                            {Settings.label.prefMarriottBrand}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextArea
                                            }
                                          >
                                            <textarea
                                              name="revStreamDescription.pref_brand"
                                              id="revStreamDescription.pref_brand"
                                              value={
                                                contextType.state
                                                  .revStreamDescription
                                                  .pref_brand
                                              }
                                              rows={4}
                                              cols={188}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "pref_brand"
                                                );
                                              }}
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className={styles.Field_Name}
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <table className="menuWdth100-Height">
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextAlign
                                            }
                                            title={
                                              Settings.label
                                                .stayCompetitorsTitle
                                            }
                                          >
                                            {Settings.label.stayCompetitors}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.Field_Name_TextArea
                                            }
                                          >
                                            <textarea
                                              name="revStreamDescription.competitors_bybrand"
                                              id="revStreamDescription.competitors_bybrand"
                                              value={
                                                contextType.state
                                                  .revStreamDescription
                                                  .competitors_bybrand
                                              }
                                              rows={4}
                                              cols={188}
                                              onKeyPress={(e) =>
                                                Utils.checklen_onkeypress(
                                                  e,
                                                  1024
                                                )
                                              }
                                              onChange={(e) => {
                                                handleTextInputValidation(
                                                  e,
                                                  "competitors_bybrand"
                                                );
                                              }}
                                            ></textarea>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
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
              </ExtendedStayContext.Consumer>
            </ExtendedStayContextProvider>
            <style>{`
              .container{
                min-width:1100px;
              }
            `}</style>
          </Layout>
        );
      }}
    </SalesAdministartionContext.Consumer>
  );
};

export default extendedStay;
