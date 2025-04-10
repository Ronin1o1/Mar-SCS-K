import React, {
  Component,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./accBTProfileList.css";
import AccBTProfileListContext, {
  AccBTProfileListContextProvider,
} from "../context/accBTProfileListContext";
import CModal from "../../../../../common/components/CModal";
import AccBTProfileListApi from "../service/AccBtProfileListApi";
import Settings from "../static/Settings";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import { Layout } from "../../../routing/Layout";
import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../../../context/salesAdministartionContextProvider";
import Utils from "../../../shared/Utils";
import { useLocation, useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import classNames from "classnames";
let contextType = null;
let parentContextType = null;

const accBTProfileList = (props) => {
  const urlParms = useLocation().search;
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  const RecID = new URLSearchParams(urlParms).get("accountrecid");
  const yearSel = new URLSearchParams(urlParms).get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");
  const appContext: IApplicationContext = useContext(ApplicationContext);
  useEffect(() => {
    contextType.state.showScreenLoader = true;
    AccBTProfileListApi.getProfileData(RecID, yearSel, accname).then((data) => {
      contextType.state.showScreenLoader = false;
      contextType.setLoadingProfileData(data);
      setlastUpdateDateValue(data.lastupdatedate);

      contextType.setInitialUserData();

      if (
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPFSALE"
      ) {
        contextType.mandatoryCheck();
      }
    });

    return () => {
      UpdateAccountProfileData();
    };
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event
          parentContextType?.setAlertMsgfunc(false, "");
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "custom",
          });
        }
      }
    });
  }, [locationKeys]);

  const UpdateAccountProfileData = () => {
    if (
      contextType.state.userRole == "MFPSALES" ||
      contextType.state.userRole == "MFPFSALE"
    ) {
      const validatedUserValidations = contextType.checkUserValidation();

      if (validatedUserValidations) {
        contextType.updateValue(RecID, yearSel, accname);
        if (contextType?.state?.lastupdateDate) {
          setlastUpdateDateValueonUpdate(contextType?.state?.lastupdateDate);
        }
        setTimeout(() => {
          AccBTProfileListApi.getProfileData(RecID, yearSel, accname).then(
            (data) => {
              contextType.setLoader(false);

              contextType.setLoadingProfileData(data);
              setlastUpdateDateValue(data.lastupdatedate);
            }
          );
        }, 1000);
      }
    } else {
      contextType.updateValue(RecID, yearSel, accname);
      if (contextType?.state?.lastupdateDate) {
        setlastUpdateDateValueonUpdate(contextType?.state?.lastupdateDate);
      }
      setTimeout(() => {
        AccBTProfileListApi.getProfileData(RecID, yearSel, accname).then(
          (data) => {
            contextType.setLoader(false);

            contextType.setLoadingProfileData(data);
            setlastUpdateDateValue(data.lastupdatedate);
          }
        );
      }, 1000);
    }
  };

  const handleInputValidation = (e, field) => {
    let updatePrimaryList = contextType.state;
    updatePrimaryList = Utils.checkInputValidation(e, field, updatePrimaryList);
    contextType.setData(updatePrimaryList);
    if (
      contextType.state.userRole == "MFPSALES" ||
      contextType.state.userRole == "MFPFSALE"
    ) {
      contextType.mandatoryCheck();
      // parentContextType.checkAccountProfileValidation(contextType.state);
    }
  };

  const handleTabInputValidation = (e, fieldName) => {
    let UpdatedFieldVal = contextType.state;
    UpdatedFieldVal = Utils.checkInputTabValidation(
      e,
      fieldName,
      UpdatedFieldVal
    );
    if (UpdatedFieldVal) {
      contextType.setData(UpdatedFieldVal);
    } else {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.AlertRangeMessage
      );
      appContext.setPreventNavigationOnce(true);
    }
  };
  const handleDropdownSelection = (e, fieldName) => {
    const UpdatedField = contextType.state;
    if (e.target.value != "") {
      UpdatedField[fieldName] = e.target.value;
    } else {
      UpdatedField[fieldName] = null;
    }
    contextType.setData(UpdatedField);
    if (
      contextType.state.userRole == "MFPSALES" ||
      contextType.state.userRole == "MFPFSALE"
    ) {
      contextType.mandatoryCheck();
      // parentContextType.checkAccountProfileValidation(contextType.state);
    }
  };

  return (
    <SalesAdministartionContext.Consumer>
      {(SalesAdministartionContext) => {
        parentContextType = SalesAdministartionContext;
        return (
          <Layout
            IsDataUpdate={UpdateAccountProfileData}
            getlastUpdateDate={lastUpdateDateValue}
            onUpdateValue={lastUpdateDateValueonUpdate}
          >
            <AccBTProfileListContextProvider>
              <AccBTProfileListContext.Consumer>
                {(accBTProfileInfoListContext) => {
                  contextType = accBTProfileInfoListContext;

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
                        <div className={styles.BTprofileAlert}>
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
                          <table className={styles.MainTable}>
                            <tbody>
                              <tr>
                                <td valign="top">
                                  <div
                                    id="overlayscreen"
                                    className={styles.OverlayScreenBTProfile}
                                  >
                                    <div className={styles.overlayDiv}>
                                      <img src={screenLoader} />
                                    </div>
                                  </div>

                                  <form
                                    name="thisForm"
                                    id="thisForm"
                                    method="post"
                                    autoComplete="off"
                                  >
                                    <table className="menuWdth100-Height">
                                      <tbody>
                                        <tr>
                                          <td className={styles.formTable}>
                                            <table className="zero-Height">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    colSpan={2}
                                                    className="nowrapCell"
                                                  >
                                                    <i>
                                                      <span
                                                        className={
                                                          styles.colorClass
                                                        }
                                                      >
                                                        {
                                                          Settings
                                                            .accountBTProfileDetails
                                                            .RequiredField
                                                        }
                                                      </span>
                                                    </i>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.GppAccountColumn
                                                    }
                                                  >
                                                    <table className="menuWdth100-Height">
                                                      <tbody>
                                                        <tr>
                                                          <td colSpan={2}>
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .GPPAccountTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .GPPAccount
                                                            }{" "}
                                                          </td>
                                                          <td
                                                            style={{
                                                              height: "20px",
                                                            }}
                                                            className="field_Value nowrapCell"
                                                          >
                                                            {contextType.state
                                                              .GPPAccount ===
                                                            "Y"
                                                              ? "Yes"
                                                              : "No"}
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          className={
                                                            contextType.state
                                                              .GPPAccount ===
                                                            "Y"
                                                              ? styles.fieldNameLabel
                                                              : styles.HiddenRow
                                                          }
                                                        >
                                                          <td
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .DefaultPercentTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .DefaultPercent
                                                            }{" "}
                                                          </td>
                                                          <td>
                                                            {
                                                              contextType.state
                                                                .defaultPercent
                                                            }
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className="nowrapCell"
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .RequireCommTitle
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .RequireComm
                                                              }
                                                            </span>
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <select
                                                              name="btProfile.requirecomm"
                                                              id="btProfile.requirecomm"
                                                              size={1}
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .RequireComissable
                                                              }
                                                              onChange={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "RequireComissable"
                                                                );
                                                              }}
                                                            >
                                                              <option value="" />
                                                              <option value="Y">
                                                                Yes
                                                              </option>
                                                              <option value="N">
                                                                No
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className="nowrapCell"
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .RequireLRATitle
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .RequireLRA
                                                              }
                                                            </span>{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <select
                                                              name="btProfile.requirelra"
                                                              id="btProfile.requirelra"
                                                              size={1}
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .RequireLRA
                                                              }
                                                              onChange={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "RequireLRA"
                                                                );
                                                              }}
                                                            >
                                                              <option value="" />
                                                              <option value="Y">
                                                                Yes
                                                              </option>
                                                              <option value="N">
                                                                No
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className="nowrapCell"
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PotentialRevTitle
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .PotentialRev
                                                              }
                                                            </span>
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.field_Value_Left
                                                            }
                                                          >
                                                            <input
                                                              type="text"
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRev
                                                              }
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRev
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRev
                                                              }
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MktPotentialRev"
                                                                );
                                                              }}
                                                            />
                                                            <span
                                                              className={
                                                                styles.leftColumn
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .USD
                                                              }
                                                            </span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className="nowrapCell"
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PotentialRmntsTitle
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .PotentialRmnts
                                                              }{" "}
                                                            </span>
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRmNts
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRmNts
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MktPotentialRmNts
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MktPotentialRmNts"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .BTRevTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .BTRev
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRev
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRev
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRev
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MarriottBTRev"
                                                                );
                                                              }}
                                                            />
                                                            <span
                                                              className={
                                                                styles.leftColumn
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .USD
                                                              }
                                                            </span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .BTRmNtsTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .BTRmNts
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRmNts
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRmNts
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MarriottBTRmNts
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MarriottBTRmNts"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MIShareTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MIShare
                                                            }{" "}
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .EstimatedMIShare
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .EstimatedMIShare
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .EstimatedMIShare
                                                              }
                                                              size={3}
                                                              maxLength={3}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onBlur={(e) => {
                                                                handleTabInputValidation(
                                                                  e,
                                                                  "EstimatedMIShare"
                                                                );
                                                              }}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "EstimatedMIShare"
                                                                );
                                                              }}
                                                            />
                                                            %
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .ACTDirectoryList
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <select
                                                              name="btProfile.listrate"
                                                              id="btProfile.listrate"
                                                              size={1}
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .ActDirectoryList
                                                              }
                                                              onChange={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "ActDirectoryList"
                                                                );
                                                              }}
                                                            >
                                                              <option value="" />
                                                              <option value="Y">
                                                                Yes
                                                              </option>
                                                              <option value="N">
                                                                No
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .sep_Stay
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <select
                                                              name="btProfile.sep_stay"
                                                              id="btProfile.sep_stay"
                                                              size={1}
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .AcrDirectoryExtended
                                                              }
                                                              onChange={(e) => {
                                                                handleDropdownSelection(
                                                                  e,
                                                                  "AcrDirectoryExtended"
                                                                );
                                                              }}
                                                            >
                                                              <option value="" />
                                                              <option value="Y">
                                                                Yes
                                                              </option>
                                                              <option value="N">
                                                                No
                                                              </option>
                                                            </select>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                  <td width={600} valign="top">
                                                    <table className="menuWdth100-Height">
                                                      <tbody>
                                                        <tr>
                                                          <td colSpan={2}>
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PrefPrgrmTitle
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .PrefPrgrm
                                                              }{" "}
                                                            </span>
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .HotelPreferredPrgm
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .HotelPreferredPrgm
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .HotelPreferredPrgm
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "HotelPreferredPrgm"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MarPrefPrgmTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MarPrefPrgm
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MarriottPreferredPrgm
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MarriottPreferredPrgm
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MarriottPreferredPrgm
                                                              }
                                                              size={12}
                                                              maxLength={12}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MarriottPreferredPrgm"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PrefPrgmShareTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PrefPrgmShare
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .PreferredPrgmShare
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .PreferredPrgmShare
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .PreferredPrgmShare
                                                              }
                                                              size={3}
                                                              maxLength={3}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onBlur={(e) => {
                                                                handleTabInputValidation(
                                                                  e,
                                                                  "PreferredPrgmShare"
                                                                );
                                                              }}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "PreferredPrgmShare"
                                                                );
                                                              }}
                                                            />
                                                            %
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MarrMembersTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .MarrMembers
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .MarriottMembers
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .MarriottMembers
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .MarriottMembers
                                                              }
                                                              size={3}
                                                              maxLength={3}
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onBlur={(e) => {
                                                                handleTabInputValidation(
                                                                  e,
                                                                  "MarriottMembers"
                                                                );
                                                              }}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "MarriottMembers"
                                                                );
                                                              }}
                                                            />
                                                            %
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .ClusterCode
                                                            }{" "}
                                                          </td>
                                                          <td
                                                            height={20}
                                                            className="Field_value"
                                                          >
                                                            {
                                                              contextType.state
                                                                .ClusterCode
                                                            }
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .CorpDiscount
                                                              }{" "}
                                                            </span>
                                                          </td>
                                                          <td className="Field_Name">
                                                            <input
                                                              type="text"
                                                              size={3}
                                                              maxLength={3}
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .DiscountFixedCorprateRate
                                                              }
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .DiscountFixedCorprateRate
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .DiscountFixedCorprateRate
                                                              }
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onBlur={(e) => {
                                                                handleTabInputValidation(
                                                                  e,
                                                                  "DiscountFixedCorprateRate"
                                                                );
                                                              }}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "DiscountFixedCorprateRate"
                                                                );
                                                              }}
                                                            />
                                                            %
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <span
                                                              className={
                                                                styles.colorClass
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountBTProfileDetails
                                                                  .BlackoutDaysPeriod
                                                              }{" "}
                                                            </span>
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              size={3}
                                                              maxLength={3}
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .BlackoutDaysAllowed
                                                              }
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .BlackoutDaysAllowed
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .BlackoutDaysAllowed ==
                                                                  null ||
                                                                contextType
                                                                  .state
                                                                  .BlackoutDaysAllowed ==
                                                                  ""
                                                                  ? ""
                                                                  : contextType
                                                                      .state
                                                                      .BlackoutDaysAllowed
                                                              }
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "BlackoutDaysAllowed"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .BlackoutPeriod
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Value nowrapCell">
                                                            <input
                                                              type="text"
                                                              size={3}
                                                              maxLength={2}
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .BlackoutPeriodAllowed
                                                              }
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .BlackoutPeriodAllowed
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .BlackoutPeriodAllowed ==
                                                                null
                                                                  ? ""
                                                                  : contextType
                                                                      .state
                                                                      .BlackoutPeriodAllowed
                                                              }
                                                              className={
                                                                styles.textRight
                                                              }
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "BlackoutPeriodAllowed"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .CompIncTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .CompInc
                                                            }{" "}
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                          >
                                                            <input
                                                              type="text"
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .CompaniesRFP
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .CompaniesRFP
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .CompaniesRFP
                                                              }
                                                              style={{
                                                                height: "20px",
                                                              }}
                                                              className={
                                                                styles.width330
                                                              }
                                                              maxLength={100}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "CompaniesRFP"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.fieldNameLabel
                                                            }
                                                            title={
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PricingMethodsTitle
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .accountBTProfileDetails
                                                                .PricingMethods
                                                            }{" "}
                                                          </td>
                                                          <td className="field_Name">
                                                            <input
                                                              type="text"
                                                              className={
                                                                styles.width330
                                                              }
                                                              name={
                                                                contextType
                                                                  .state
                                                                  .PricingMethods
                                                              }
                                                              id={
                                                                contextType
                                                                  .state
                                                                  .PricingMethods
                                                              }
                                                              value={
                                                                contextType
                                                                  .state
                                                                  .PricingMethods
                                                              }
                                                              style={{
                                                                height: "20px",
                                                              }}
                                                              maxLength={100}
                                                              onChange={(e) => {
                                                                handleInputValidation(
                                                                  e,
                                                                  "PricingMethods"
                                                                );
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>&nbsp;</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table className="zero-Height">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    title={
                                                      Settings
                                                        .accountBTProfileDetails
                                                        .BrandSegmentTitle
                                                    }
                                                  >
                                                    <span
                                                      className={
                                                        styles.colorClass
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .accountBTProfileDetails
                                                          .BrandSegList
                                                      }
                                                    </span>
                                                  </td>
                                                </tr>
                                                <tr></tr>

                                                <div
                                                  className={
                                                    styles.brandContainer
                                                  }
                                                >
                                                  {contextType.state.brandSegList.map(
                                                    (brand, i) => {
                                                      return (
                                                        <div
                                                          key={
                                                            brand.affiliationid
                                                          }
                                                          className={classNames(
                                                            styles.branditems,
                                                            styles.arrangeDiv,
                                                            styles.pt2
                                                          )}
                                                        >
                                                          <input
                                                            type="CheckBox"
                                                            id={
                                                              brand.affiliationid
                                                            }
                                                            name="selectedAffiliationList"
                                                            defaultValue={
                                                              brand.affiliationid
                                                            }
                                                            checked={
                                                              brand.affiliationstatus ===
                                                              "Y"
                                                                ? true
                                                                : false
                                                            }
                                                            onChange={(e) =>
                                                              contextType.handleCheckBoxes(
                                                                e.target
                                                                  .checked,
                                                                brand.affiliationid,
                                                                brand.affiliationname
                                                              )
                                                            }
                                                          />{" "}
                                                          {
                                                            brand.affiliationname
                                                          }
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              </tbody>
                                            </table>
                                            <table
                                              className="zero-Height"
                                              style={{
                                                marginBottom: "10px",
                                                overflow: "auto",
                                              }}
                                            >
                                              <tbody>
                                                <tr style={{ height: "15px" }}>
                                                  <td />
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={classNames(
                                                      styles.fieldNameLabel,
                                                      styles.prefnameheader
                                                    )}
                                                    colSpan={3}
                                                    title={
                                                      Settings
                                                        .accountBTProfileDetails
                                                        .PreferredAgencyTitle
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .accountBTProfileDetails
                                                        .PrefAgency
                                                    }
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div
                                                      className={
                                                        styles.agenciesMapContainer
                                                      }
                                                    >
                                                      <div>
                                                        {Object.keys(
                                                          contextType.state
                                                            .agenciesMapList
                                                        ).map(
                                                          (label, index) => {
                                                            return (
                                                              <table
                                                                key={
                                                                  contextType
                                                                    .state
                                                                    .agenciesMapList[
                                                                    label
                                                                  ].agencytypeid
                                                                }
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      className="nowrapCell"
                                                                      title={
                                                                        Settings
                                                                          .accountBTProfileDetails
                                                                          .travelAgencyTitle
                                                                      }
                                                                    >
                                                                      <span
                                                                        className={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid ===
                                                                          1
                                                                            ? styles.FontColor
                                                                            : ""
                                                                        }
                                                                      >
                                                                        <b>
                                                                          {
                                                                            contextType
                                                                              .state
                                                                              .agenciesMapList[
                                                                              label
                                                                            ]
                                                                              .agencytypedesc
                                                                          }
                                                                        </b>
                                                                      </span>
                                                                    </td>
                                                                    <td className="nowrapCell">
                                                                      <input
                                                                        type="text"
                                                                        id={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid
                                                                        }
                                                                        name={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid
                                                                        }
                                                                        value={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencyname
                                                                        }
                                                                        maxLength={
                                                                          40
                                                                        }
                                                                        size={
                                                                          30
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          handleInputValidation(
                                                                            e,
                                                                            "agencyname"
                                                                          );
                                                                        }}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      className="nowrapCell"
                                                                      style={{
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      title={
                                                                        Settings
                                                                          .accountBTProfileDetails
                                                                          .PerBookingTitle
                                                                      }
                                                                    >
                                                                      <span
                                                                        className={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid ===
                                                                          1
                                                                            ? styles.FontColor
                                                                            : ""
                                                                        }
                                                                      >
                                                                        <b>
                                                                          {
                                                                            Settings
                                                                              .accountBTProfileDetails
                                                                              .PerBooking
                                                                          }
                                                                        </b>
                                                                      </span>
                                                                    </td>
                                                                    <td className="nowrapCell">
                                                                      <input
                                                                        type="text"
                                                                        id={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid
                                                                        }
                                                                        name={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencybooking
                                                                        }
                                                                        value={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencybooking !==
                                                                          null
                                                                            ? contextType
                                                                                .state
                                                                                .agenciesMapList[
                                                                                label
                                                                              ]
                                                                                .agencybooking
                                                                            : ""
                                                                        }
                                                                        maxLength={
                                                                          3
                                                                        }
                                                                        size={
                                                                          30
                                                                        }
                                                                        onBlur={(
                                                                          e
                                                                        ) => {
                                                                          handleTabInputValidation(
                                                                            e,
                                                                            "PerofBooking"
                                                                          );
                                                                        }}
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          handleInputValidation(
                                                                            e,
                                                                            "PerofBooking"
                                                                          );
                                                                        }}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      className="nowrapCell"
                                                                      style={{
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      title={
                                                                        Settings
                                                                          .accountBTProfileDetails
                                                                          .GDSTtitle
                                                                      }
                                                                    >
                                                                      <span
                                                                        className={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid ===
                                                                          1
                                                                            ? styles.FontColor
                                                                            : ""
                                                                        }
                                                                      >
                                                                        <b>
                                                                          {" "}
                                                                          {
                                                                            Settings
                                                                              .accountBTProfileDetails
                                                                              .GDS
                                                                          }
                                                                        </b>
                                                                      </span>
                                                                    </td>
                                                                    <td className="nowrapCell">
                                                                      <input
                                                                        type="text"
                                                                        id={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencytypeid
                                                                        }
                                                                        name={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencygds
                                                                        }
                                                                        value={
                                                                          contextType
                                                                            .state
                                                                            .agenciesMapList[
                                                                            label
                                                                          ]
                                                                            .agencygds
                                                                        }
                                                                        maxLength={
                                                                          40
                                                                        }
                                                                        size={
                                                                          30
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          handleInputValidation(
                                                                            e,
                                                                            "agencygds"
                                                                          );
                                                                        }}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            );
                                                          }
                                                        )}
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </form>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </React.Fragment>
                  );
                }}
              </AccBTProfileListContext.Consumer>
            </AccBTProfileListContextProvider>
            <style>{`
                .container {
                    min-width:1030px;
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

export default accBTProfileList;
