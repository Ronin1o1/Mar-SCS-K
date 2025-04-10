import React, { Suspense, useContext, useEffect } from "react";
import styles from "./RateNotesfacility.css";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import API from "../service/API";
import RateNotesFacilityContext, {
  RateNotesFacilityContextProvider,
} from "../context/RateNotesfacilityContext";
import btnSelectaFacility from "../../../../../../../../../common/assets/img/button/btnSelectaFacility.gif";
import btnClose from "../../../../../../../../../common/assets/img/button/btnClose.gif";
import CModal from "../../../../../../../../../common/components/CModal";
import CSuspense from "../../../../../../../../../common/components/CSuspense";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import Utils from "../../../../../../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../../../../../common/components/CLoader";
let contextValue = null;

function RateNotesFacility(props) {
  const parentAccountCenterContext = useContext(AccountCenterTabsContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };
  const reqParam = {
    accountinfoid: setQueryParam("AccountInfoId"),
    hotelid: setQueryParam("HotelId"),
    accountid: props?.data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountid,
  };
  useEffect(() => {
    parentAccountCenterContext?.setState({
      ...parentAccountCenterContext?.state,
      accountId:
      props?.data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountid,
    });
    contextValue.setHotelAccountSpecificData(props?.data?.hotelAccountSpecific?.hotelAccountSpecificData);
    contextValue.setHotelData(props?.data?.hotelData);
    contextValue.setLoader(false);
    API.getRateNoteFacility(reqParam).then((res) => {
      contextValue.getFacilityDetails(res);
      contextValue.facility_check();
    });
    return () => {
      const isSuccess = contextValue.facility_check();
      if (isSuccess != "failed") {
        contextValue.updateRateNotesFacility();
      }
      if (history.action == "POP") {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    };
  }, []);

  useEffect(() => {
    //call the save api, when save button is clicked.
    if (
      appContext.isActiveTab === "rateNotes" &&
      appContext.saveRateNotesClicked
    ) {
      contextValue.updateRateNotesFacility();
      appContext.setRateNotesClicked(false);
      if (
        appContext?.user?.isHotelUser &&
        appContext.errorMessageAlert.message &&
        appContext.errorMessageAlert.show
      ) {
        alert(appContext.errorMessageAlert.message);
      } else if (
        appContext?.user?.isHotelUser &&
        !appContext.errorMessageAlert.show &&
        appContext.markAsCompleteErrorAlert.show
      ) {
        if (appContext.markAsCompleteErrorAlert.message != "") {
          alert(appContext.markAsCompleteErrorAlert.message);
        }
      }
    }
  }, [appContext.saveRateNotesClicked]);

  return (
    <RateNotesFacilityContextProvider>
      <RateNotesFacilityContext.Consumer>
        {(ratenotesfacilityContext) => {
          contextValue = ratenotesfacilityContext;
          return (
            <>
              <CModal
                title={Settings.labels.nearestFacilityTitle}
                onClose={(e) => {
                  contextValue.onSelectFacility(true, props.data);
                }}
                show={contextValue.showSelctFacilityModal}
                xPosition={-250}
                yPosition={-255}
              >
                <Suspense fallback={<CSuspense />}>
                  <div className={styles.modal}>
                    {!contextValue.showSelctFacilityModal ? (
                      <span className="wait">
                        {Settings.labels.loadingMessage}
                      </span>
                    ) : (
                      <table className={styles.menuWdth100_Height}>
                        <tbody>
                          <tr className={styles.top}>
                            <td className={styles.top}>
                              <table className={styles.copyInnerTableContainer}>
                                <tbody>
                                  <tr className={styles.top}>
                                    <td
                                      className={styles.copyInnerTableVertical}
                                    >
                                      {Settings.labels.nearestFacilityReport}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className={styles.weight200}>
                                      {
                                        Settings.labels
                                          .nearestFacilityInstruction
                                      }
                                      <>
                                        <br></br>
                                      </>
                                      {Settings.labels.nearestFacilityWarning}
                                    </td>
                                  </tr>
                                  <hr />
                                  <tr className={styles.height100}>
                                    <td className={styles.heightTop100}>
                                      <div className={styles.gridNode}>
                                        <div className={styles.copyInnerDiv}>
                                          <table
                                            className={`${styles.gridOne} ${styles.zero_Height}`}
                                          >
                                            <tbody>
                                              {contextValue.nearFacilites
                                                .nearFacility.length == 0
                                                ? "No facilities found"
                                                : ""}
                                              {contextValue.nearFacilites.nearFacility.map(
                                                (data, index) => {
                                                  return (
                                                    <>
                                                      <tr key={index}>
                                                        <table>
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .pricingContact
                                                                    .facilityName
                                                                    .label
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {
                                                                  data.businessname
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .pricingContact
                                                                    .streetAddress
                                                                    .label
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {data.address}
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .labels
                                                                    .cityStatePostal
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {data.cityname},{" "}
                                                                {
                                                                  data.stateabbrev
                                                                }
                                                                , {data.zipcode}
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .pricingContact
                                                                    .distance
                                                                    .label
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {console.log(
                                                                  "data ",
                                                                  data
                                                                )}
                                                                {data?.distance?.toFixed(
                                                                  1
                                                                )}
                                                                {" miles "}
                                                                {data.direction}
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .labels
                                                                    .noOfEmp
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {
                                                                  data.siteemployeenumber
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .labels
                                                                    .phoneNumber
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {
                                                                  data.phonenumber
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.boldLabel
                                                                }
                                                              >
                                                                {
                                                                  Settings
                                                                    .labels
                                                                    .typeBusiness
                                                                }
                                                              </td>
                                                              <td>
                                                                <></>
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.weightNormal
                                                                }
                                                              >
                                                                {
                                                                  data.siccode1desc
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <img
                                                                src={
                                                                  btnSelectaFacility
                                                                }
                                                                onClick={() => {
                                                                  contextValue.setFacilityParams(
                                                                    data
                                                                  );
                                                                }}
                                                                className={
                                                                  styles.facilityButton
                                                                }
                                                              />
                                                            </tr>
                                                            <tr>
                                                              <></>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </tr>
                                                      <hr />
                                                    </>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <hr />
                                  <tr>
                                    <td className={styles.buttonCenter}>
                                      <img
                                        src={btnClose}
                                        onClick={() => {
                                          contextValue.onSelectFacility(
                                            true,
                                            props.data
                                          );
                                        }}
                                        className={styles.facilityButton}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </Suspense>
              </CModal>
              <div
                className={` ${styles.pageLayoutOutter} ${
                  styles.scrollDiv
                } ${"updateratenotesfacility"}`}
              >
                {contextValue.state.showLoader ? <CLoader></CLoader> : ""}
                <div>
                  <div id="tabStatus" className={styles.pageLayout}>
                    <form
                      id="acctFacilityForm"
                      name="acctFacilityForm"
                      method="post"
                    >
                      <div
                        className={` ${styles.InstructionHeader} ${styles.marginTop}`}
                      >
                        {Settings.labels.rateNotes}
                      </div>
                      <div className={styles.instructions}>
                        {Settings.labels.internalUse}
                      </div>
                      <table
                        cellSpacing={0}
                        cellPadding={0}
                        className={styles.textData}
                      >
                        <tbody>
                          <tr>
                            <td className={styles.fieldName}>
                              {Settings.labels.lastUpdated}
                            </td>
                            <td className={styles.LastUpdate}></td>
                            <td className={styles.fieldValue}>
                              {contextValue.state.formattedLast_updateratenotes}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={styles.fieldValue}>
                        <textarea
                          id="ratenotes"
                          name="ratenotes"
                          cols={60}
                          rows={11}
                          className={styles.RateText}
                          value={contextValue.state.ratenotes}
                          onChange={() => {
                            contextValue.onPrimaryContact(
                              event,
                              "ratenotes",
                              255
                            );
                          }}
                          onBlur={() => {
                            contextValue.onBlurPrimaryContact(
                              event,
                              "ratenotes",
                              255
                            );
                          }}
                          disabled={parentAccountCenterContext.isRebidDeclined}
                        ></textarea>
                      </div>
                      <div className={styles.InstructionHeader}>
                        {Settings.labels.nearestFacility}
                      </div>
                      <div className={styles.instructions}>
                        {Settings.labels.enterDetails}
                      </div>
                      {contextValue.state.canPickFacility === true && (
                        <div>{Settings.labels.possibleFacilities}</div>
                      )}
                      {contextValue.state.canPickFacility === true && (
                        <div className={styles.instructionsData}>
                          <img
                            src={btnSelectaFacility}
                            onClick={() => {
                              contextValue.onSelectFacility(true, props.data);
                            }}
                            className={styles.facilityButton}
                          />
                        </div>
                      )}
                      <table
                        className={styles.zeroHeight}
                        style={{ borderCollapse: "collapse" }}
                      >
                        <tbody>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.facilityName.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.facilityName.id}
                                type="text"
                                name={Settings.pricingContact.facilityName.name}
                                className={styles.priceContactInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_name",
                                    40
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_name",
                                    40
                                  );
                                }}
                                value={contextValue.state.facility_name}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.streetAddress.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.streetAddress.id}
                                name={
                                  Settings.pricingContact.streetAddress.name
                                }
                                className={styles.priceContactInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_street",
                                    40
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_street",
                                    40
                                  );
                                }}
                                value={contextValue.state.facility_street}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.city.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.city.id}
                                name={Settings.pricingContact.city.name}
                                className={styles.priceContactInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_city",
                                    40
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_city",
                                    40
                                  );
                                }}
                                value={contextValue.state.facility_city}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.stateprovince.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.stateprovince.id}
                                name={
                                  Settings.pricingContact.stateprovince.name
                                }
                                className={styles.priceContactInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_state_prov",
                                    40
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_state_prov",
                                    40
                                  );
                                }}
                                value={contextValue.state.facility_state_prov}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.postalcode.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.postalcode.id}
                                name={Settings.pricingContact.postalcode.name}
                                className={styles.postalcodeInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_zip",
                                    20
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_zip",
                                    20
                                  );
                                }}
                                value={contextValue.state.facility_zip}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.countryregion.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.countryregion.id}
                                name={
                                  Settings.pricingContact.countryregion.name
                                }
                                className={styles.priceContactInput}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "facility_country",
                                    40
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "facility_country",
                                    40
                                  );
                                }}
                                value={contextValue.state.facility_country}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.distance.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.distance.id}
                                name={Settings.pricingContact.distance.name}
                                className={styles.distanceInput}
                                onKeyPress={Utils.AmountNumberOnly_onkeypress}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "distance",
                                    4
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "distance",
                                    4
                                  );
                                }}
                                value={contextValue.state.distance}
                                maxLength={4}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                              &nbsp;
                              {contextValue.state.propertyDistanceUnit ===
                                "KM" && <em>kilometers</em>}
                              &nbsp;
                              {contextValue.state.propertyDistanceUnit ===
                                "MI" && <span>miles</span>}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.directions.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <textarea
                                id={Settings.pricingContact.directions.id}
                                name={Settings.pricingContact.directions.name}
                                cols={60}
                                rows={11}
                                className={styles.directionInput}
                                value={contextValue.state.directionstofacility}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "directionstofacility",
                                    255
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "directionstofacility",
                                    255
                                  );
                                }}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldNames}>
                              {Settings.pricingContact.shuttleCostOneWay.label}
                            </td>
                            <td className={styles.fieldValue}>
                              <input
                                id={
                                  Settings.pricingContact.shuttleCostOneWay.id
                                }
                                name={
                                  Settings.pricingContact.shuttleCostOneWay.name
                                }
                                className={styles.shuttleCostOneWayInput}
                                onKeyPress={Utils.AmountNumberOnly_onkeypress}
                                onChange={() => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "shuttle_cost_one_way",
                                    14
                                  );
                                }}
                                onBlur={() => {
                                  contextValue.onBlurPrimaryContact(
                                    event,
                                    "shuttle_cost_one_way",
                                    14
                                  );
                                }}
                                value={contextValue.state.shuttle_cost_one_way}
                                maxLength={14}
                                disabled={
                                  parentAccountCenterContext.isRebidDeclined
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </RateNotesFacilityContext.Consumer>
    </RateNotesFacilityContextProvider>
  );
}
export default RateNotesFacility;
