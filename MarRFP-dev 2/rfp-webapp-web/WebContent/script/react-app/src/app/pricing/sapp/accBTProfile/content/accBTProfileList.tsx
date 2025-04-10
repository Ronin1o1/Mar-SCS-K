import React, { Component } from "react";
import styles from "./accBTProfileList.css";
import AccBTProfileListContext, {
  AccBTProfileListContextProvider,
} from "../context/accBTProfileListContext";
import CModal from "../../../../common/components/CModal";
import AccBTProfileListApi from "../service/AccBtProfileListApi";
import Settings from "../../../salesAdministration/content/accBTProfile/static/Settings";
import btnUpdate from "../../../../common/assets/img/btnUpdate.gif";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
let contextType = null;

export default class accBTProfileList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const windowUrl = window.location.hash;
    const queryParams = new URLSearchParams(windowUrl);
    const RecID = queryParams.get("accountrecid");
    const yearSel = queryParams.get("year");
    const accanme = queryParams.get("accountName");

    AccBTProfileListApi.getAccounts(RecID, yearSel).then((data) => {
      contextType.setLoadingProfileData(data);
    });
    contextType.setInitialUserData();
  }

  handleInputValidation = (e, field) => {
    const re = /^[0-9]*$/;
    const updatePrimaryList = contextType.state;
    if (field === "MktPotentialRev") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MktPotentialRev = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "MktPotentialRmNts") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MktPotentialRmNts = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "MarriottBTRev") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MarriottBTRev = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "MarriottBTRmNts") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MarriottBTRmNts = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "HotelPreferredPrgm") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.HotelPreferredPrgm = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "MarriottPreferredPrgm") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MarriottPreferredPrgm = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "BlackoutDaysAllowed") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.BlackoutDaysAllowed = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "BlackoutPeriodAllowed") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.BlackoutPeriodAllowed = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "EstimatedMIShare") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.EstimatedMIShare = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "PreferredPrgmShare") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.PreferredPrgmShare = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "MarriottMembers") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.MarriottMembers = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "DiscountFixedCorprateRate") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.DiscountFixedCorprateRate = e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "PerofBooking") {
      if (e.target.value === "" || re.test(e.target.value)) {
        updatePrimaryList.agenciesMapList[e.target.id].agencybooking =
          e.target.value;
      } else {
        e.target.value = null;
      }
    }
    if (field === "travelAgency") {
      updatePrimaryList.agenciesMapList[e.target.id].agencyname =
        e.target.value;
    }
    if (field === "GDS") {
      updatePrimaryList.agenciesMapList[e.target.id].agencygds = e.target.value;
    }
    if (field === "CompaniesRFP") {
      updatePrimaryList.CompaniesRFP = e.target.value;
    }
    if (field === "PricingMethods") {
      updatePrimaryList.PricingMethods = e.target.value;
    }
    contextType.setData(updatePrimaryList);
    //console.log("updatePrimaryList", updatePrimaryList);
    //let updatedList = contextType.state.adminRespondent.adminRespondentPersonal;
    // updatedList = Utils.checkValidation(e, field, updatedList);
    // contextType.setValidationData(updatedList, field);
  };
  checkUserValidation = () => {
    const maxperiodLImit = contextType.state.maxblackoutperiodslimit;
    if (contextType.state.RequireComissable === null) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.RequirecomReq
      );
      return false;
    } else if (contextType.state.RequireLRA === null) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.RequireLrareq
      );

      return false;
    } else if (
      contextType.state.MktPotentialRev === null ||
      contextType.state.MktPotentialRev === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.MrktPtnReq
      );

      return false;
    } else if (
      contextType.state.MktPotentialRmNts === null ||
      contextType.state.MktPotentialRmNts === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.MrktPtnRmNtsReq
      );

      return false;
    } else if (
      contextType.state.HotelPreferredPrgm === null ||
      contextType.state.HotelPreferredPrgm === ""
    ) {
      contextType.setValidationFunc(Settings.accountBTProfileDetails.PrefPrgm);

      return false;
    } else if (
      contextType.state.DiscountFixedCorprateRate === null ||
      contextType.state.DiscountFixedCorprateRate === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.CorpDiscountReq
      );

      return false;
    } else if (
      contextType.state.BlackoutDaysAllowed === null ||
      contextType.state.BlackoutDaysAllowed === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.blackOutdaysReq
      );

      return false;
    } else if (contextType.state.BlackoutDaysAllowed === "0") {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.blackoutDaysRangeMessage
      );

      return false;
    } else if (
      contextType.state.BlackoutPeriodAllowed >
      contextType.state.maxblackoutperiodslimit
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.daysAllowed + maxperiodLImit
      );

      return false;
    } else if (contextType.state.selectedSegList.length === 0) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.BrandSegRequired
      );

      return false;
    } else if (
      contextType.state.agenciesMapList[1].agencyname === null ||
      contextType.state.agenciesMapList[1].agencyname === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.TravelAgency1req
      );

      return false;
    } else if (
      contextType.state.agenciesMapList[1].agencybooking === null ||
      contextType.state.agenciesMapList[1].agencybooking === ""
    ) {
      contextType.setValidationFunc(
        Settings.accountBTProfileDetails.perBookingReq
      );

      return false;
    } else if (
      contextType.state.agenciesMapList[1].agencygds === null ||
      contextType.state.agenciesMapList[1].agencygds === ""
    ) {
      contextType.setValidationFunc(Settings.accountBTProfileDetails.GDSReq);

      return false;
    }
  };

  UpdateBtProfileData = () => {
    const windowUrl = window.location.hash;
    const queryParams = new URLSearchParams(windowUrl);
    const recID = queryParams.get("accountrecid");
    const year = queryParams.get("year");
    const accanme = queryParams.get("accountName");
    //const rangeValidation = this.handleTabInputValidation(a, val);
    if (contextType.state.alertMessageCheck === false) {
      if (
        contextType.state.userRole == "MFPSALES" ||
        contextType.state.userRole == "MFPSALE"
      ) {
        const validatedUserValidations = this.checkUserValidation();

        if (validatedUserValidations) {
          contextType.setLoader(true);
          contextType.updateValue(recID, year, accanme);
        }
      } else {
        contextType.setLoader(true);
        contextType.updateValue(recID, year, accanme);
      }
    }
    contextType.setLoader(false);
  };

  handleTabInputValidation = (e, fieldName) => {
    const UpdatedFieldVal = contextType.state;
    if (fieldName === "EstimatedMIShare" && e.target.value !== "") {
      if (e.target.value > 0 && e.target.value <= 100) {
        UpdatedFieldVal.EstimatedMIShare = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
      } else {
        // e.target.value = "";
        contextType.setValidationFunc(
          Settings.accountBTProfileDetails.AlertRangeMessage
        );
        UpdatedFieldVal.alertMessageCheck = true;
        //return false;
      }
    }
    if (fieldName === "PreferredPrgmShare" && e.target.value !== "") {
      if (e.target.value > 0 && e.target.value <= 100) {
        UpdatedFieldVal.PreferredPrgmShare = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
      } else {
        // e.target.value = "";
        contextType.setValidationFunc(
          Settings.accountBTProfileDetails.AlertRangeMessage
        );
        UpdatedFieldVal.alertMessageCheck = true;
      }
    }
    if (fieldName === "MarriottMembers" && e.target.value !== "") {
      if (e.target.value > 0 && e.target.value <= 100) {
        UpdatedFieldVal.MarriottMembers = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
      } else {
        // e.target.value = "";
        contextType.setValidationFunc(
          Settings.accountBTProfileDetails.AlertRangeMessage
        );
        UpdatedFieldVal.alertMessageCheck = true;
      }
    }
    if (fieldName === "DiscountFixedCorprateRate" && e.target.value !== "") {
      if (e.target.value > 0 && e.target.value <= 100) {
        UpdatedFieldVal.DiscountFixedCorprateRate = e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
      } else {
        // e.target.value = "";
        contextType.setValidationFunc(
          Settings.accountBTProfileDetails.AlertRangeMessage
        );
        UpdatedFieldVal.alertMessageCheck = true;
      }
    }
    if (fieldName === "PerofBooking" && e.target.value !== "") {
      if (e.target.value > 0 && e.target.value <= 100) {
        UpdatedFieldVal.agenciesMapList[e.target.id].agencybooking =
          e.target.value;
        UpdatedFieldVal.alertMessageCheck = false;
      } else {
        // e.target.value = "";
        contextType.setValidationFunc(
          Settings.accountBTProfileDetails.AlertRangeMessage
        );
        UpdatedFieldVal.alertMessageCheck = true;
      }
    }
    contextType.setData(UpdatedFieldVal);
  };
  handleDropdownSelection = (e, fieldName) => {
    const UpdatedField = contextType.state;
    if (fieldName === "requirecomm") {
      if (e.target.value != "") {
        UpdatedField.RequireComissable = e.target.value;
      } else {
        UpdatedField.RequireComissable = null;
      }
    }
    if (fieldName === "requirelra") {
      if (e.target.value != "") {
        UpdatedField.RequireLRA = e.target.value;
      } else {
        UpdatedField.RequireLRA = null;
      }
    }
    if (fieldName === "listrate") {
      if (e.target.value != "") {
        UpdatedField.ActDirectoryList = e.target.value;
      } else {
        UpdatedField.ActDirectoryList = null;
      }
    }
    if (fieldName === "sep_stay") {
      if (e.target.value != "") {
        UpdatedField.AcrDirectoryExtended = e.target.value;
      } else {
        UpdatedField.AcrDirectoryExtended = null;
      }
    }
    contextType.setData(UpdatedField);
  };
  render() {
    return (
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
                  <div className={styles.mainTableContainer}>
                    <table className={styles.MainTable}>
                      <tbody>
                        <tr>
                          <td valign="top">
                            <div
                              id="overlayscreen"
                              className={styles.OverlayScreenBTProfile}
                            >
                              <div className={styles.overlayDiv}>
                                <img
                                  style={{ verticalAlign: "bottom" }}
                                  src="/rfpprftc/rfp-webapp-web/image/screenloader.gif"
                                />
                              </div>
                            </div>

                            <a
                              href="javascript:void(0);"
                              className={styles.updatebtn}
                            >
                              <img
                                id="update"
                                src={btnUpdate}
                                onClick={this.UpdateBtProfileData}
                              />{" "}
                            </a>

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
                                                  className={styles.colorClass}
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
                                                    <td colSpan={2}>&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="GPP Account: Y/N"
                                                    >
                                                      {
                                                        Settings
                                                          .accountBTProfileDetails
                                                          .GPPAccount
                                                      }{" "}
                                                    </td>
                                                    <td
                                                      style={{ height: "20px" }}
                                                      className="field_Value nowrapCell"
                                                    >
                                                      {contextType.state
                                                        .GPPAccount === "Y"
                                                        ? "Yes"
                                                        : "No"}
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    className={
                                                      contextType.state
                                                        .GPPAccount === "Y"
                                                        ? ""
                                                        : styles.HiddenRow
                                                    }
                                                  >
                                                    <td title="What % ?">
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
                                                      title="Does this account require that rates are commissionable?"
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
                                                          contextType.state
                                                            .RequireComissable
                                                        }
                                                        onChange={(e) => {
                                                          this.handleDropdownSelection(
                                                            e,
                                                            "requirecomm"
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
                                                      title="Does this account require Last Room Availability?"
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
                                                          contextType.state
                                                            .RequireLRA
                                                        }
                                                        onChange={(e) => {
                                                          this.handleDropdownSelection(
                                                            e,
                                                            "requirelra"
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
                                                      title="Potential revenue for BT travelers"
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
                                                          contextType.state
                                                            .MktPotentialRev
                                                        }
                                                        name={
                                                          contextType.state
                                                            .MktPotentialRev
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        value={
                                                          contextType.state
                                                            .MktPotentialRev
                                                        }
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
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
                                                      title="Potential Rmnts for BT Travelers"
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
                                                          contextType.state
                                                            .MktPotentialRmNts
                                                        }
                                                        id={
                                                          contextType.state
                                                            .MktPotentialRmNts
                                                        }
                                                        value={
                                                          contextType.state
                                                            .MktPotentialRmNts
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "MktPotentialRmNts"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="What was the BT Revenue last year?"
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
                                                          contextType.state
                                                            .MarriottBTRev
                                                        }
                                                        id={
                                                          contextType.state
                                                            .MarriottBTRev
                                                        }
                                                        value={
                                                          contextType.state
                                                            .MarriottBTRev
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
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
                                                      className="field_Name nowrapCell"
                                                      title="What were the Total BT rmnts from last year?"
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
                                                          contextType.state
                                                            .MarriottBTRmNts
                                                        }
                                                        id={
                                                          contextType.state
                                                            .MarriottBTRmNts
                                                        }
                                                        value={
                                                          contextType.state
                                                            .MarriottBTRmNts
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "MarriottBTRmNts"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="What % of total Marriott rmnts is BT?"
                                                    >
                                                      {
                                                        Settings
                                                          .accountBTProfileDetails
                                                          .MIShare
                                                      }{" "}
                                                    </td>
                                                    <td className="field_Value nowrapCell">
                                                      <input
                                                        type="text"
                                                        name={
                                                          contextType.state
                                                            .EstimatedMIShare
                                                        }
                                                        id={
                                                          contextType.state
                                                            .EstimatedMIShare
                                                        }
                                                        value={
                                                          contextType.state
                                                            .EstimatedMIShare
                                                        }
                                                        size={3}
                                                        maxLength={3}
                                                        className="Field_Number"
                                                        onBlur={(e) => {
                                                          this.handleTabInputValidation(
                                                            e,
                                                            "EstimatedMIShare"
                                                          );
                                                        }}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "EstimatedMIShare"
                                                          );
                                                        }}
                                                      />
                                                      %
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td className="field_Name">
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
                                                          contextType.state
                                                            .ActDirectoryList
                                                        }
                                                        onChange={(e) => {
                                                          this.handleDropdownSelection(
                                                            e,
                                                            "listrate"
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
                                                    <td className="field_Name">
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
                                                          contextType.state
                                                            .AcrDirectoryExtended
                                                        }
                                                        onChange={(e) => {
                                                          this.handleDropdownSelection(
                                                            e,
                                                            "sep_stay"
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
                                            <td>&nbsp;</td>
                                            <td width={420} valign="top">
                                              <table className="menuWdth100-Height">
                                                <tbody>
                                                  <tr>
                                                    <td colSpan={2}>&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                    <td title="How many properties (industry wide) are in the Preferred program?">
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
                                                          contextType.state
                                                            .HotelPreferredPrgm
                                                        }
                                                        id={
                                                          contextType.state
                                                            .HotelPreferredPrgm
                                                        }
                                                        value={
                                                          contextType.state
                                                            .HotelPreferredPrgm
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "HotelPreferredPrgm"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="How many Marriott properties did the account accept into the BT program?"
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
                                                          contextType.state
                                                            .MarriottPreferredPrgm
                                                        }
                                                        id={
                                                          contextType.state
                                                            .MarriottPreferredPrgm
                                                        }
                                                        value={
                                                          contextType.state
                                                            .MarriottPreferredPrgm
                                                        }
                                                        size={12}
                                                        maxLength={12}
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "MarriottPreferredPrgm"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="What share of the Preferred Program is Marriott?"
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
                                                          contextType.state
                                                            .PreferredPrgmShare
                                                        }
                                                        id={
                                                          contextType.state
                                                            .PreferredPrgmShare
                                                        }
                                                        value={
                                                          contextType.state
                                                            .PreferredPrgmShare
                                                        }
                                                        size={3}
                                                        maxLength={3}
                                                        className="Field_Number"
                                                        onBlur={(e) => {
                                                          this.handleTabInputValidation(
                                                            e,
                                                            "PreferredPrgmShare"
                                                          );
                                                        }}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
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
                                                      className="field_Name nowrapCell"
                                                      title="What percentage of the accounts travelers are Marriott Bonvoy Members?"
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
                                                          contextType.state
                                                            .MarriottMembers
                                                        }
                                                        id={
                                                          contextType.state
                                                            .MarriottMembers
                                                        }
                                                        value={
                                                          contextType.state
                                                            .MarriottMembers
                                                        }
                                                        size={3}
                                                        maxLength={3}
                                                        className="Field_Number"
                                                        onBlur={(e) => {
                                                          this.handleTabInputValidation(
                                                            e,
                                                            "MarriottMembers"
                                                          );
                                                        }}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "MarriottMembers"
                                                          );
                                                        }}
                                                      />
                                                      %
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td className="field_Name nowrapCell">
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
                                                          contextType.state
                                                            .DiscountFixedCorprateRate
                                                        }
                                                        name={
                                                          contextType.state
                                                            .DiscountFixedCorprateRate
                                                        }
                                                        value={
                                                          contextType.state
                                                            .DiscountFixedCorprateRate
                                                        }
                                                        className="Field_Number"
                                                        onBlur={(e) => {
                                                          this.handleTabInputValidation(
                                                            e,
                                                            "DiscountFixedCorprateRate"
                                                          );
                                                        }}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
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
                                                          contextType.state
                                                            .BlackoutDaysAllowed
                                                        }
                                                        name={
                                                          contextType.state
                                                            .BlackoutDaysAllowed
                                                        }
                                                        value={
                                                          contextType.state
                                                            .BlackoutDaysAllowed
                                                        }
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "BlackoutDaysAllowed"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td className="field_Value nowrapCell">
                                                      <b>
                                                        {
                                                          Settings
                                                            .accountBTProfileDetails
                                                            .BlackoutPeriod
                                                        }{" "}
                                                      </b>
                                                    </td>
                                                    <td className="field_Value nowrapCell">
                                                      <input
                                                        type="text"
                                                        size={3}
                                                        maxLength={2}
                                                        id={
                                                          contextType.state
                                                            .BlackoutPeriodAllowed
                                                        }
                                                        name={
                                                          contextType.state
                                                            .BlackoutPeriodAllowed
                                                        }
                                                        value={
                                                          contextType.state
                                                            .BlackoutPeriodAllowed
                                                        }
                                                        className="Field_Number"
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "BlackoutPeriodAllowed"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name nowrapCell"
                                                      title="Which other hotel chains are included in the RFP?"
                                                    >
                                                      {
                                                        Settings
                                                          .accountBTProfileDetails
                                                          .CompInc
                                                      }{" "}
                                                    </td>
                                                    <td className="Field_Name">
                                                      <input
                                                        type="text"
                                                        name={
                                                          contextType.state
                                                            .CompaniesRFP
                                                        }
                                                        id={
                                                          contextType.state
                                                            .CompaniesRFP
                                                        }
                                                        value={
                                                          contextType.state
                                                            .CompaniesRFP
                                                        }
                                                        style={{
                                                          height: "22px",
                                                        }}
                                                        maxLength={100}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
                                                            e,
                                                            "CompaniesRFP"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className="field_Name"
                                                      title="What pricing methods are used  i.e. auction, centralized, website, 2-year, etc.?"
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
                                                        name={
                                                          contextType.state
                                                            .PricingMethods
                                                        }
                                                        id={
                                                          contextType.state
                                                            .PricingMethods
                                                        }
                                                        value={
                                                          contextType.state
                                                            .PricingMethods
                                                        }
                                                        style={{
                                                          HEIGHT: "22px",
                                                          WIDTH: "330px",
                                                        }}
                                                        maxLength={100}
                                                        onChange={(e) => {
                                                          this.handleInputValidation(
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
                                            <td title="Which brands does the account prefer to utilize?">
                                              <span
                                                className={styles.colorClass}
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
                                            className={styles.brandContainer}
                                          >
                                            {contextType.state.brandSegList.map(
                                              (brand, i) => {
                                                return (
                                                  <div
                                                    key={brand.affiliationid}
                                                  >
                                                    <input
                                                      type="CheckBox"
                                                      id={brand.affiliationid}
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
                                                          e.target.checked,
                                                          brand.affiliationid,
                                                          brand.affiliationname
                                                        )
                                                      }
                                                    />{" "}
                                                    {brand.affiliationname}
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
                                          marginBottom: "20%",
                                          overflow: "auto",
                                        }}
                                      >
                                        <tbody>
                                          <tr style={{ height: "15px" }}>
                                            <td />
                                          </tr>
                                          <tr>
                                            <td
                                              className="InstructionHeader nowrapCell"
                                              colSpan={3}
                                              title="Does the account have a preferred travel agency or intermediary that it uses?"
                                            >
                                              {
                                                Settings.accountBTProfileDetails
                                                  .PrefAgency
                                              }
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                width="100%"
                                              >
                                                <div
                                                  className={
                                                    styles.agenciesMapContainer
                                                  }
                                                >
                                                  <tr>
                                                    <td>
                                                      {Object.keys(
                                                        contextType.state
                                                          .agenciesMapList
                                                      ).map((label, index) => {
                                                        return (
                                                          <table
                                                            key={
                                                              contextType.state
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
                                                                  title="Travel Agency Name"
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
                                                                    size={30}
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      this.handleInputValidation(
                                                                        e,
                                                                        "travelAgency"
                                                                      );
                                                                    }}
                                                                  />
                                                                </td>
                                                                <td>&nbsp;</td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  className="nowrapCell"
                                                                  style={{
                                                                    width:
                                                                      "100px",
                                                                  }}
                                                                  title="What % of the accounts total bookings does this agency receive?"
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
                                                                        .agencybooking
                                                                    }
                                                                    maxLength={
                                                                      3
                                                                    }
                                                                    size={30}
                                                                    onBlur={(
                                                                      e
                                                                    ) => {
                                                                      this.handleTabInputValidation(
                                                                        e,
                                                                        "PerofBooking"
                                                                      );
                                                                    }}
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      this.handleInputValidation(
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
                                                                  title="What GDS does this agency use?"
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
                                                                    size={30}
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      this.handleInputValidation(
                                                                        e,
                                                                        "GDS"
                                                                      );
                                                                    }}
                                                                  />
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        );
                                                      })}
                                                    </td>
                                                  </tr>
                                                </div>
                                              </table>
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
    );
  }
}
