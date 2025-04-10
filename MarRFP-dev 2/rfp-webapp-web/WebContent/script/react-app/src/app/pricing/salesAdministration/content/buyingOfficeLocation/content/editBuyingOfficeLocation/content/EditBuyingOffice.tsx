import React, { useEffect, Suspense, useContext } from "react";
import EditBuyingOfficeContext, {
  EditBuyingOfficeContextProvider,
} from "../context/EditBuyingOfficeContext";
import { Layout } from "../../../../../routing/Layout";
import styles from "./EditBuyingOffice.css";
import InitModalStyles from "./EditInitiativeModal.css";
import EditInitiatives from "./EditInitiativeModal";
import CSelect from "../../../../../../../common/components/CSelect";
import screenLoader from "../../../../../../../common/assets/img/screenloader.gif";
import interceptorStyle from "../../../../../../../common/components/Interceptors.css";
import Settings from "../static/Settings";
import CModal from "../../../../../../../common/components/CModal";
import CSuspense from "../../../../../../../common/components/CSuspense";
import Utils from "../../../../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";

let contextType = null;

function EditBuyingOffice(params) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  useEffect(() => {
    contextType.getEditLocation();
    return () => {
      if (contextType.methodType !== "update") {
        contextType.updateLocation();
      }
      contextType.componentUnload();
    };
  }, []);

  // Required Fields are in red
  const renderRequiredFieldsSection = () => {
    return (
      <table className={styles.zeroHeight}>
        <tbody>
          <tr>
            <td colSpan={2} className="Cell">
              <i>
                <span className={styles.fontRed}>
                  <b>{Settings.headingNames.requiredFields}</b>
                </span>
              </i>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <table className={styles.menuWdth100Height}>
                <tbody>
                  <tr>
                    <td colSpan={2}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td title={Settings.tooltip.locationName}>
                      <span className={styles.fontRed}>
                        <b>{Settings.fieldLabels.locationName}</b>
                      </span>
                    </td>
                    <td className={styles.locNameField}>
                      <input
                        type="text"
                        id="locationinfo.name"
                        name="locationinfo.name"
                        maxLength={40}
                        className={styles.locationNameInput}
                        value={
                          contextType.state.dataList.data.locationinfo.bl_name
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_name")
                        }
                      />
                    </td>
                  </tr>
                  {contextType.state.dataList.data.us_location === "Y" && (
                    <tr>
                      <td title={Settings.tooltip.orgName}>
                        <span className={styles.fontRed}>
                          <b>{Settings.fieldLabels.organization}</b>
                        </span>
                      </td>
                      <td className="field_Value" id="orgCode">
                        <CSelect
                          ddnOptions={
                            contextType.state.dataList.data.locSalesAreas !==
                            undefined
                              ? contextType.state.dataList.data.locSalesAreas
                              : []
                          }
                          keyField={"salesareaid"}
                          valField={"salesareaname"}
                          onChange={(event) =>
                            contextType.handleCommonChange(
                              event,
                              "bl_salesareaid"
                            )
                          }
                          selectedValue={
                            contextType.state.dataList.data.locationinfo
                              .bl_salesareaid
                          }
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td title={Settings.tooltip.rmnts}>
                      <span className={styles.fontRed}>
                        <b>{Settings.fieldLabels.rmNt}</b>
                      </span>
                    </td>
                    <td className="field_Value">
                      <input
                        maxLength={16}
                        type="text"
                        name="locationinfo.bl_potentialrn"
                        id="locationinfo.bl_potentialrn"
                        value={
                          contextType.state.dataList.data.locationinfo
                            .bl_potentialrn === null
                            ? ""
                            : contextType.state.dataList.data.locationinfo
                                ?.bl_potentialrn
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_potentialrn")
                        }
                        className={styles.Field_Number}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.field_Name}
                      title={Settings.tooltip.totalRevenue}
                    >
                      {Settings.fieldLabels.totalRevenue}
                    </td>
                    <td className="field_Value">
                      <input
                        maxLength={16}
                        type="text"
                        id="locationinfo.bl_potentialrev"
                        name="locationinfo.bl_potentialrev"
                        value={
                          contextType.state.dataList.data.locationinfo
                            .bl_potentialrev === null
                            ? ""
                            : contextType.state.dataList.data.locationinfo
                                ?.bl_potentialrev
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_potentialrev")
                        }
                        className={styles.Field_Number}
                      />
                      <b>&nbsp;&nbsp;USD</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ verticalAlign: "top", paddingLeft: "10px" }}>
              <table className={styles.menuWdth100Height}>
                <tbody>
                  <tr>
                    <td colSpan={2}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td
                      className={styles.InstructionHeader}
                      colSpan={2}
                      title={Settings.tooltip.locationAddress}
                      align="left"
                    >
                      {Settings.fieldLabels.address}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.field_Name}
                      title={Settings.tooltip.streetNumber}
                    >
                      {Settings.fieldLabels.streetNumber}
                    </td>
                    <td className="field_Value">
                      <input
                        type="text"
                        id="locationinfo.bl_address"
                        name="locationinfo.bl_address"
                        maxLength={50}
                        size={25}
                        value={
                          contextType.state.dataList?.data.locationinfo
                            ?.bl_address
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_address")
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.field_Name}
                      title={Settings.tooltip.city}
                    >
                      {Settings.fieldLabels.city}
                    </td>
                    <td className="field_Value">
                      <input
                        type="text"
                        id="locationinfo.bl_city"
                        name="locationinfo.bl_city"
                        value={
                          contextType.state.dataList.data.locationinfo?.bl_city
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_city")
                        }
                        maxLength={20}
                        size={15}
                      />
                    </td>
                  </tr>
                  {contextType.state.dataList.data.us_location === "Y" && (
                    <tr>
                      <td
                        className={styles.field_Name}
                        title={Settings.tooltip.state}
                      >
                        {Settings.fieldLabels.state}
                      </td>
                      <td className="field_Value">
                        <CSelect
                          ddnOptions={
                            contextType.state.dataList.data.locStates !==
                            undefined
                              ? contextType.state.dataList.data.locStates
                              : []
                          }
                          keyField={"state"}
                          valField={"statename"}
                          onChange={(event) =>
                            contextType.handleCommonChange(event, "bl_state")
                          }
                          selectedValue={
                            contextType.state.dataList.data.locationinfo
                              ?.bl_state
                          }
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      className={styles.field_Name}
                      title={Settings.tooltip.zipCode}
                    >
                      {Settings.fieldLabels.zipCode}
                    </td>
                    <td className="field_Value">
                      <input
                        type="text"
                        id="locationinfo.bl_zip"
                        name="locationinfo.bl_zip"
                        className={styles.zipWidth}
                        value={
                          contextType.state.dataList.data.locationinfo
                            .bl_zip === null
                            ? ""
                            : contextType.state.dataList.data.locationinfo
                                ?.bl_zip
                        }
                        onChange={(e) =>
                          contextType.handleCommonChange(e, "bl_zip")
                        }
                        maxLength={10}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.field_Name}
                      title={Settings.tooltip.country}
                    >
                      {contextType.state.dataList.data.us_location === "N"
                        ? Settings.fieldLabels.countryOrRegion
                        : Settings.fieldLabels.country}
                    </td>
                    <td className="field_Value">
                      {contextType.state.dataList.data.us_location === "N" ? (
                        <CSelect
                          ddnOptions={
                            contextType.state.dataList.data.locCountries !==
                            undefined
                              ? contextType.state.dataList.data.locCountries
                              : []
                          }
                          keyField={"country"}
                          valField={"countryname"}
                          onChange={(event) =>
                            contextType.handleCommonChange(event, "bl_country")
                          }
                          selectedValue={
                            contextType.state.dataList.data.locationinfo
                              ?.bl_country
                          }
                        />
                      ) : (
                        "USA"
                      )}
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
    );
  };
  // Office Description/Contacts/Additional Information:
  const renderOfficeDescription = () => {
    return (
      <table>
        <tbody>
          <tr style={{ height: "10px" }}>
            <td />
          </tr>
          <tr>
            <td
              className={styles.field_Name}
              title={Settings.fieldLabels.officeDescription}
            >
              {Settings.fieldLabels.officeDescription}
            </td>
          </tr>
          <tr>
            <td className="field_Value">
              <textarea
                name="locationinfo.bl_overview"
                id="locationinfo.bl_overview"
                rows={4}
                cols={188}
                value={
                  contextType.state.dataList.data.locationinfo?.bl_overview
                }
                onChange={(e) =>
                  contextType.handleCommonChange(e, "bl_overview")
                }
                onKeyPress={(e) => {
                  Utils.checklen_onkeypress(e, 1024);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  //Brand Segment Preference for Location
  const renderBrandSegmentPreference = () => {
    return (
      <table className={styles.tableWidth}>
        <tbody>
          <tr className={styles.rowHeightBrandSegment}>
            <td />
          </tr>
          <tr>
            <td
              className={styles.InstructionHeader}
              colSpan={10}
              title={Settings.tooltip.locationAddress}
              align="left"
            >
              {Settings.fieldLabels.locationAddress}
            </td>
          </tr>
          <span style={{ borderCollapse: "collapse" }}>
            {contextType.state.dataList?.data?.brandSegList?.map(
              (data, brandSegindex) => {
                return (
                  <>
                    {brandSegindex !== 0 && brandSegindex % 5 === 0 ? (
                      <tr>
                        <td></td>
                      </tr>
                    ) : (
                      ""
                    )}
                    <td className={styles.selectedAffiliationList}>
                      {" "}
                      <input
                        type="CheckBox"
                        id="selectedAffiliationList"
                        name="selectedAffiliationList"
                        onChange={(e) =>
                          contextType.handleCheckBoxChange(e, data)
                        }
                        checked={data.affiliationstatus === "Y" ? true : false}
                      />{" "}
                      {data.affiliationname}
                    </td>
                  </>
                );
              }
            )}

            <td />
          </span>
        </tbody>
      </table>
    );
  };
  //Competitor Hotels:
  const renderCompetitorHotels = () => {
    return (
      <table>
        <tbody>
          <tr className={styles.rowHeightBrandSegment}>
            <td />
          </tr>
          <tr>
            <td
              className={styles.field_Name}
              title={Settings.fieldLabels.hotels}
            >
              {Settings.fieldLabels.hotels}
            </td>
          </tr>
          <tr>
            <td className="field_Value">
              <textarea
                name="locationinfo.bl_objectives"
                id="locationinfo.bl_objectives"
                rows={4}
                cols={188}
                value={
                  contextType.state.dataList.data.locationinfo?.bl_objectives
                }
                onChange={(e) =>
                  contextType.handleCommonChange(e, "bl_objectives")
                }
                onKeyPress={(e) => {
                  Utils.checklen_onkeypress(e, 1024);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  //Marriott Contact
  const renderMarriottContact = () => {
    const obj = contextType.state.dataList.data.contactMap;
    return (
      <table>
        <tbody>
          <tr>
            {Object.keys(obj).map((keys, contactIndex) => {
              return (
                <>
                  <td key={contactIndex}>
                    <table>
                      <tbody>
                        <tr>
                          <td
                            className={styles.InstructionHeader}
                            colSpan={2}
                            title={Settings.tooltip.marriottContact}
                            align="left"
                          >
                            {Settings.fieldLabels.marriottContact +
                              (contactIndex + 1)}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}>
                            <span
                              className={contactIndex === 0 && styles.fontRed}
                            >
                              {Settings.fieldLabels.name}
                            </span>
                          </td>
                          <td
                            className={`${styles.nameSelect} ${styles.field_Value}`}
                          >
                            <CSelect
                              ddnOptions={
                                contextType.state.dataList.data.t1_contact !==
                                undefined
                                  ? contextType.state.dataList.data.t1_contact
                                  : []
                              }
                              keyField={"eid"}
                              valField={"name"}
                              onChange={(event) =>
                                contextType.handleMarriottContactChange(
                                  event,
                                  obj[keys].contacttypeid,
                                  "eid"
                                )
                              }
                              selectedValue={obj[keys].eid}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}>
                            {Settings.fieldLabels.title}
                          </td>
                          <td className="field_Value">
                            <input
                              type="text"
                              className={styles.commonInput}
                              maxLength={40}
                              onChange={(event) =>
                                contextType.handleMarriottContactChange(
                                  event,
                                  obj[keys].contacttypeid,
                                  "contactTitle"
                                )
                              }
                              value={obj[keys].contactTitle}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}>
                            {Settings.fieldLabels.phone}
                          </td>
                          <td className="field_Value">
                            <input
                              type="text"
                              className={styles.commonInput}
                              maxLength={40}
                              onChange={(event) =>
                                contextType.handleMarriottContactChange(
                                  event,
                                  obj[keys].contacttypeid,
                                  "contactPhone"
                                )
                              }
                              value={
                                obj[keys].contactPhone === null
                                  ? ""
                                  : obj[keys].contactPhone
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.field_Name}>
                            {Settings.fieldLabels.email}
                          </td>
                          <td className="field_Value">
                            <input
                              type="text"
                              className={styles.commonInput}
                              maxLength={100}
                              onChange={(event) =>
                                contextType.handleMarriottContactChange(
                                  event,
                                  obj[keys].contacttypeid,
                                  "contactEmail"
                                )
                              }
                              onBlur={(event) =>
                                contextType.checkEmail(event.target.value)
                              }
                              value={obj[keys].contactEmail}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };
  //Initiatives and Tasks
  const renderInitiativesAndTasks = () => {
    return (
      <table className={styles.initiative_table}>
        <tbody>
          <tr>
            <td
              colSpan={12}
              className={styles.InstructionHeader}
              title={Settings.tooltip.initiative}
            >
              {Settings.headingNames.initiative}
            </td>
          </tr>
          {contextType.state.dataList.data &&
            contextType.state.dataList.data.initiatives.length > 0 &&
            contextType.state.dataList.data.initiatives.map(
              (eachInitiatives, index) => {
                return (
                  <>
                    {index % 5 === 0 ? (
                      <tr>
                        <td></td>
                      </tr>
                    ) : (
                      ""
                    )}

                    <>
                      <td
                        className={
                          styles.field_Name + " " + styles.intiativeIndexCol
                        }
                      >
                        {index + 1}
                        {")"}
                      </td>
                      <td>
                        {eachInitiatives.isReadOnly ? (
                          <input
                            type="text"
                            name={eachInitiatives.initiative_name}
                            id={eachInitiatives.initiative_name}
                            className={styles.readOnlyLink}
                            value={eachInitiatives.initiative_name}
                            maxLength={20}
                            readOnly={true}
                            onClick={() =>
                              contextType.taskClick(eachInitiatives)
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            name={eachInitiatives.initiative_name}
                            id={eachInitiatives.initiative_name}
                            className={styles.BuyingLocationInputField}
                            value={eachInitiatives.initiative_name}
                            maxLength={20}
                            size={32}
                            onBlur={() => contextType.makeInitiativeLink(index)}
                            onChange={(event) =>
                              contextType.handleInitiativeChange(event, index)
                            }
                          />
                        )}
                      </td>
                    </>
                  </>
                );
              }
            )}
        </tbody>
      </table>
    );
  };

  return (
    <Layout
      IsAcctContactsDelete={() => contextType.deleteLocation()}
      IsAcctLocationsUpdate={() => contextType.updateLocation("update")}
      ShowDeleteButton={true}
      ShowPreviousButton={true}
      editBuyingOfficeLocation={true}
      PrevButtonClick={() => contextType.prevButtonClick()}
    >
      <EditBuyingOfficeContextProvider>
        <EditBuyingOfficeContext.Consumer>
          {(report) => {
            contextType = report;
            return (
              <div>
                {(contextType.showValidationModal ||
                  appContext.onetimeAlert.show) && (
                  <CModal
                    title={Settings.headingNames.modalHeading}
                    onClose={() => contextType.closeValidationModal()}
                    show={
                      contextType.showValidationModal ||
                      appContext.onetimeAlert.show
                    }
                    positionOffset={{ x: "-50%", y: "-50%" }}
                    overlayHeight={Math.max(
                      document.body.scrollHeight,
                      document.body.offsetHeight,
                      document.documentElement.clientHeight,
                      document.documentElement.scrollHeight,
                      document.documentElement.offsetHeight
                    )}
                    overlayTopPosition={"-79px"}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <div
                        className={
                          InitModalStyles.editInitiativesModalContainer
                        }
                      >
                        {contextType.showValidationModal
                          ? contextType.validationMessage
                          : appContext.onetimeAlert.show
                          ? appContext.onetimeAlert.message
                          : null}
                      </div>
                    </Suspense>
                  </CModal>
                )}
                {contextType.showInitiativeModal && (
                  <EditInitiatives
                    editInitiativeData={contextType.editInitiativeData}
                    dataList={contextType.state.dataList}
                    closeModal={contextType.closeModal}
                  />
                )}
                {contextType.showLoader ? (
                  <div className={interceptorStyle.curtain}>
                    <img
                      src={screenLoader}
                      className={interceptorStyle.imageLoader}
                    />
                  </div>
                ) : (
                  <table className={styles.maintableHeight}>
                    <tbody>
                      <tr>
                        <td>
                          {renderRequiredFieldsSection()}
                          {renderOfficeDescription()}
                          {renderBrandSegmentPreference()}
                          {renderCompetitorHotels()}
                          {renderMarriottContact()}
                          {renderInitiativesAndTasks()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            );
          }}
        </EditBuyingOfficeContext.Consumer>
      </EditBuyingOfficeContextProvider>
      <style>{`
          .container{
            min-width:1100px;
          }
        `}</style>
    </Layout>
  );
}

export default EditBuyingOffice;
