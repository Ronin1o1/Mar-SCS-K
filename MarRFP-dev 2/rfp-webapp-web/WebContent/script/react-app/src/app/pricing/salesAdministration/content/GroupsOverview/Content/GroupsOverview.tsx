import React, { useEffect, Suspense } from "react";
import { Layout } from "../../../routing/Layout";
import styles from "./GroupsOverview.css";
import Settings from "../static/Settings";
import GroupsOverviewContext, {
  GroupsOverviewContextProvider,
} from "../context/GroupsOverviewContext";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import CSelect from "../../../../../common/components/CSelect";
import Utils from "../../../../../common/utils/Utils";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

let contextType = null;

const GroupsOverview = () => {
  useEffect(() => {
    contextType.setLoader(true);
    contextType.getGroupsOverview();

    return () => {
      contextType.updateGroupsOverview();
    };
  }, []);
  const selectOptions = [
    { key: "", value: "N/A" },
    { key: "Y", value: "Yes" },
    { key: "N", value: "No" },
  ];
  return (
    <GroupsOverviewContextProvider>
      <GroupsOverviewContext.Consumer>
        {(groupsContext) => {
          contextType = groupsContext;
          return (
            <>
              {contextType.showValidationModal && (
                <CModal
                  title={Settings.headingNames.modalHeading}
                  onClose={() => contextType.closeValidationModal()}
                  show={contextType.showValidationModal}
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
                    <div className={styles.alertmodal}>
                      {contextType.validationMessage}
                    </div>
                  </Suspense>
                </CModal>
              )}
              <Layout
                IsGroupsOverviewUpdate={() =>
                  contextType.updateGroupsOverview()
                }
                getlastUpdateDate={contextType.state.lastUpdateDateValue}
              >
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
                  <table className={styles.zeroHeight}>
                    <tr>
                      <td>
                        <table>
                          <tr>
                            <td className={styles.mastertd}>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.fieldHeadings.hotelProgram}
                                  </td>
                                  <td className={styles.fieldName}>
                                    <CSelect
                                      ddnOptions={selectOptions}
                                      valField={"value"}
                                      keyField={"key"}
                                      selectedValue={
                                        contextType.state.grpDetailProfile
                                          ?.grp_hotel_prog
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "grp_hotel_prog"
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    title={Settings.titles.hotelChain}
                                  >
                                    {Settings.fieldHeadings.hotelChain}
                                  </td>
                                  <td className={styles.fieldName}>
                                    <CSelect
                                      ddnOptions={selectOptions}
                                      valField={"value"}
                                      keyField={"key"}
                                      selectedValue={
                                        contextType.state.grpDetailProfile
                                          ?.ismar_pref_brand
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "ismar_pref_brand"
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table>
                          <tr>
                            <td
                              className={styles.fieldName}
                              title={Settings.titles.otherPreferred}
                            >
                              {Settings.fieldHeadings.otherPreferred}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fieldName}>
                              <textarea
                                rows="2"
                                cols="188"
                                value={
                                  contextType.state.grpDetailProfile
                                    ?.num_mar_incl_prog
                                }
                                onChange={(event) =>
                                  contextType.handleCommonChange(
                                    event,
                                    "num_mar_incl_prog",
                                    255
                                  )
                                }
                                onKeyPress={(e) => {
                                  Utils.checklen_onkeypress(e, 255);
                                  contextType.mandatoryCheck(
                                    "num_mar_incl_prog",
                                    255
                                  );
                                }}
                                onPaste={() => {
                                  contextType.mandatoryCheck(
                                    "num_mar_incl_prog",
                                    255
                                  );
                                }}
                              ></textarea>
                            </td>
                          </tr>
                        </table>
                        <table className={styles.zeroHeight}>
                          <tr>
                            <td>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.fieldHeadings.topGroup}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.competitor
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "competitor",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "competitor",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "competitor",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    title={Settings.titles.description}
                                  >
                                    {Settings.fieldHeadings.description}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.prefer_criteria
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "prefer_criteria",
                                          1024
                                        )
                                      }
                                      title={Settings.titles.description}
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "prefer_criteria",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "prefer_criteria",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table className={styles.zeroHeight}>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.InstructionHeader}>
                              {Settings.headers.online}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    title={Settings.titles.smallMeetings}
                                  >
                                    {Settings.fieldHeadings.onlineRfpTool}
                                  </td>
                                  <td className={styles.fieldName}>
                                    <CSelect
                                      ddnOptions={selectOptions}
                                      valField={"value"}
                                      keyField={"key"}
                                      selectedValue={
                                        contextType.state.grpDetailProfile
                                          ?.onl_lead_gen
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "onl_lead_gen"
                                        )
                                      }
                                    />
                                    &nbsp;
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.fieldHeadings.describeRfpTool}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.onl_registration
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "onl_registration",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "onl_registration",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "onl_registration",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table border="0" cellPadding="0" cellSpacing="0">
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className={styles.InstructionHeader}>
                              {Settings.headers.businessOverview}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    align="left"
                                    title={Settings.titles.smallMeetings}
                                  >
                                    {Settings.fieldHeadings.smallMeetings}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.struct_sml_mtg
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "struct_sml_mtg",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "struct_sml_mtg",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "struct_sml_mtg",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    title={Settings.titles.largeMeetings}
                                  >
                                    {Settings.fieldHeadings.largeMeetings}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.struct_lge_mtg
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "struct_lge_mtg",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "struct_lge_mtg",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "struct_lge_mtg",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    className={styles.fieldName}
                                    title={Settings.titles.annualMeetings}
                                  >
                                    {Settings.fieldHeadings.annualMeetings}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.struct_annl_mtg
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "struct_annl_mtg",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "struct_annl_mtg",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "struct_annl_mtg",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.fieldHeadings.groupSolutions}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile
                                          ?.solutions
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "solutions",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "solutions",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "solutions",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.fieldHeadings.other}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.grpDetailProfile &&
                                        contextType.state.grpDetailProfile
                                          .other_group_info === null
                                          ? ""
                                          : contextType.state.grpDetailProfile
                                              ?.other_group_info
                                      }
                                      onChange={(event) =>
                                        contextType.handleCommonChange(
                                          event,
                                          "other_group_info",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "other_group_info",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "other_group_info",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                )}
              </Layout>
            </>
          );
        }}
      </GroupsOverviewContext.Consumer>
      <style>{`
          .container{
            min-width:1000px;
          }
        `}</style>
    </GroupsOverviewContextProvider>
  );
};

export default GroupsOverview;
